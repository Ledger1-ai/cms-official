
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import { WordPressService } from "@/lib/wordpress/service";
import { htmlToPuckBlocks } from "@/lib/wordpress/html-to-puck";
import { logActivity } from "@/actions/audit";
import { importLogger } from "@/lib/wordpress/import-logger";

// Helper to fetch image and convert to Base64
async function fetchImageAsBase64(url: string, mimeType: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        return `data:${mimeType};base64,${base64}`;
    } catch (error) {
        console.error("Image fetch error:", error);
        throw error;
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions as any) as any;
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { type, items, url } = body; // type: 'media' | 'posts' | 'pages' | 'url', items: ids[] | "all"

        const userId = (session.user as any).id;
        const wpService = new WordPressService(userId);
        const results = {
            success: [] as string[],
            failed: [] as string[]
        };

        if (type === "media") {
            let mediaItemsToProcess: any[] = [];

            if (items === "all") {
                mediaItemsToProcess = await wpService.getMedia(1, 100);
            } else if (Array.isArray(items)) {
                for (const id of items) {
                    try {
                        const media = await wpService.getMediaById(id);
                        mediaItemsToProcess.push(media);
                    } catch (e) {
                        results.failed.push(id.toString());
                    }
                }
            } else {
                return new NextResponse("Invalid items for media import", { status: 400 });
            }

            for (const wpMedia of mediaItemsToProcess) {
                const id = wpMedia.id;
                try {
                    const base64Data = await fetchImageAsBase64(wpMedia.source_url, wpMedia.mime_type);

                    await (prismadb as any).mediaItem.create({
                        data: {
                            url: base64Data,
                            filename: wpMedia.title.rendered || `wp-media-${id}`,
                            mimeType: wpMedia.mime_type,
                            size: 0,
                            title: wpMedia.title.rendered,
                            altText: wpMedia.alt_text,
                            description: `Imported from WordPress (ID: ${id})`,
                            isPublic: true,
                            source: "wordpress",
                            userId: userId
                        }
                    });

                    results.success.push(id.toString());
                } catch (error) {
                    console.error(`Failed to import media ${id}:`, error);
                    results.failed.push(id.toString());
                }
            }
            await logActivity("WP_IMPORT", "WordPress", `Imported ${results.success.length} media items`);

        } else if (type === "pages" || type === "posts" || type === "url") {
            let postsToProcess: any[] = [];

            if (type === "url") {
                if (!url) return new NextResponse("URL is required for url import type", { status: 400 });

                // Extract slug
                const cleanUrl = url.replace(/\/$/, "");
                const slug = cleanUrl.split("/").pop();

                if (!slug) return new NextResponse("Could not parse slug from URL", { status: 400 });

                // Try finding logic
                let foundPost = await wpService.getPageBySlug(slug);
                let postType = 'page';

                if (!foundPost) {
                    foundPost = await wpService.getPostBySlug(slug);
                    postType = 'post';
                }

                if (foundPost) {
                    postsToProcess.push({ ...foundPost, type: postType });
                } else {
                    return new NextResponse("Content not found on WordPress", { status: 404 });
                }

            } else if (items === "all") {
                const allPosts = type === 'pages' ? await wpService.getPages(1, 50) : await wpService.getPosts(1, 50);
                postsToProcess = allPosts.map(p => ({ ...p, type: type === 'pages' ? 'page' : 'post' }));
            } else if (Array.isArray(items)) {
                for (const id of items) {
                    try {
                        const post = type === 'pages' ? await wpService.getPageById(id) : await wpService.getPostById(id);
                        postsToProcess.push({ ...post, type: type === 'pages' ? 'page' : 'post' });
                    } catch (e) {
                        results.failed.push(id.toString());
                    }
                }
            }

            for (const post of postsToProcess) {
                const id = post.id;
                try {
                    let contentHtml = post.content.rendered;
                    const title = post.title.rendered;
                    const slug = post.slug;
                    const postType = (post as any).type || 'page';
                    const pageLink = post.link || '';

                    // STRATEGY: Prefer Raw Shortcodes (Source) -> Fallback to Scraped HTML
                    importLogger.reset(title);
                    importLogger.log('INIT', `Processing: "${title}" (${postType}, ID: ${id})`, { pageLink });

                    let usedScrapedContent = false;
                    let rawSourceContent = '';

                    // 1. Try XML-RPC first (Reliable raw content bypass)
                    try {
                        const xmlPost = await wpService.xmlRpcCall('wp.getPost', [id]);
                        if (xmlPost && xmlPost.raw) {
                            const contentMatch = xmlPost.raw.match(/<member><name>post_content<\/name><value><string>([\s\S]*?)<\/string><\/value>/);
                            if (contentMatch) {
                                let extracted = contentMatch[1];
                                extracted = extracted.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
                                extracted = extracted.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
                                rawSourceContent = extracted;
                                importLogger.sourceXmlRpc(true, rawSourceContent.length);
                            }
                        }
                    } catch (e) {
                        importLogger.sourceXmlRpc(false);
                    }

                    // 2. Fallback to API context=edit
                    if (!rawSourceContent) {
                        try {
                            const rawPost = postType === 'page'
                                ? await wpService.getPageWithRawContent(id)
                                : await wpService.getPostWithRawContent(id);
                            if (rawPost.content?.raw) {
                                rawSourceContent = rawPost.content.raw;
                                importLogger.sourceRestApi(true, rawSourceContent.length);
                            }
                        } catch (e) {
                            importLogger.sourceRestApi(false);
                        }
                    }

                    // 3. DECISION: ALWAYS prefer scraped HTML for visual fidelity
                    // Raw shortcodes often have wrong bg_color (e.g., #ffffff when site shows #0B1C2A)
                    // because Flatsome's visual styling comes from theme settings, not shortcode attributes
                    
                    if (pageLink) {
                        try {
                            importLogger.log('SOURCE', `Scraping for visual fidelity: ${pageLink}`);
                            const scrapedHtml = await wpService.scrapePageHtml(pageLink);

                            if (scrapedHtml && scrapedHtml.length > 500) {
                                contentHtml = scrapedHtml;
                                usedScrapedContent = true;
                                importLogger.sourceScrape(true, scrapedHtml.length);
                                importLogger.sourceDecision('scrape', false);
                                importLogger.log('SOURCE', `Scraped HTML has inline styles for accurate backgrounds`);
                            } else {
                                importLogger.log('WARN', `Scraped HTML too small (${scrapedHtml?.length || 0} chars), falling back to raw`);
                            }
                        } catch (e: any) {
                            importLogger.sourceScrape(false);
                            importLogger.log('WARN', `Scrape failed: ${e.message}, falling back to raw`);
                        }
                    }
                    
                    // Fallback to raw shortcodes if scrape failed
                    if (!usedScrapedContent && rawSourceContent) {
                        contentHtml = rawSourceContent;
                        usedScrapedContent = true;
                        importLogger.sourceDecision(rawSourceContent.includes('[section') ? 'xml-rpc' : 'rest-api', rawSourceContent.includes('[section'));
                        importLogger.log('SOURCE', `Fallback to raw content (may have incorrect bg_color)`);
                    }

                    const excerpt = post.excerpt?.rendered || '';

                    // Extract featured image from _embedded data
                    let featuredImageUrl = '';
                    const featuredMedia = (post as any)._embedded?.['wp:featuredmedia'];
                    if (featuredMedia && featuredMedia.length > 0) {
                        featuredImageUrl = featuredMedia[0].source_url || '';
                    }

                    // Build Puck content blocks
                    const puckContent: any[] = [];
                    const puckZones: Record<string, any[]> = {};

                    // If we used scraped content (OR Raw Source), convert to individual Puck blocks
                    if (usedScrapedContent) {
                        // Parse HTML into individual editable blocks
                        const baseUrl = pageLink ? new URL(pageLink).origin : '';
                        importLogger.log('PARSE', `Starting conversion of ${contentHtml.length} chars`);
                        const { content: parsedBlocks, zones: parsedZones } = htmlToPuckBlocks(contentHtml, baseUrl);
                        importLogger.log('PARSE', `✓ Created ${parsedBlocks.length} blocks, ${Object.keys(parsedZones || {}).length} zones`);
                        
                        // Log each block type
                        for (const block of parsedBlocks) {
                            importLogger.blockCreated(block.type, block.props);
                        }
                        
                        puckContent.push(...parsedBlocks);
                        if (parsedZones) Object.assign(puckZones, parsedZones);
                        
                        console.log(importLogger.getSummary());
                    } else {
                        // Standard import: add structured blocks
                        // 1. Featured Image Block (if available)
                        if (featuredImageUrl) {
                            puckContent.push({
                                type: "ImageBlock",
                                props: {
                                    id: `hero-${id}`,
                                    src: featuredImageUrl,
                                    alt: title,
                                    aspectRatio: "16:9",
                                    rounded: "lg"
                                }
                            });
                        }

                        // 2. Heading Block
                        puckContent.push({
                            type: "HeadingBlock",
                            props: {
                                id: `heading-${id}`,
                                title: title,
                                size: "xl",
                                align: "left",
                                marginBottom: "4"
                            }
                        });

                        // 3. Excerpt/Intro Block (if available) - NATIVE BLOCK ONLY
                        if (excerpt && excerpt.trim()) {
                            const cleanExcerpt = excerpt.replace(/<[^>]*>/g, '').trim();
                            if (cleanExcerpt) {
                                puckContent.push({
                                    type: "TextBlock",
                                    props: {
                                        id: `excerpt-${id}`,
                                        content: cleanExcerpt,
                                        align: "left"
                                    }
                                });
                            }
                        }

                        // 4. Main Content Block (Parsed)
                        // Use htmlToPuckBlocks to detect Flatsome shortcodes or split HTML
                        const { content: parsedContent, zones: parsedZones } = htmlToPuckBlocks(contentHtml);
                        if (parsedContent.length > 0) {
                            puckContent.push(...parsedContent);
                            if (parsedZones) Object.assign(puckZones, parsedZones);
                        } else {
                            // Fallback if parser returns nothing - NATIVE BLOCK ONLY
                            const cleanContent = contentHtml.replace(/<[^>]*>/g, '').trim();
                            if (cleanContent) {
                                puckContent.push({
                                    type: "TextBlock",
                                    props: {
                                        id: `content-${id}`,
                                        content: cleanContent,
                                        align: "left"
                                    }
                                });
                            }
                        }
                    }

                    const puckData = {
                        root: { props: { title: title } },
                        content: puckContent,
                        zones: puckZones
                    };


                    const existing = await (prismadb as any).landingPage.findFirst({
                        where: {
                            OR: [
                                { wordpressPostId: id },
                                { slug: slug }
                            ]
                        }
                    });

                    let finalSlug = slug;
                    // If slug collision but NOT same WP ID, rename
                    if (existing && existing.wordpressPostId !== id) {
                        finalSlug = `${slug}-${Date.now()}`;
                    }

                    if (existing && existing.wordpressPostId === id) {
                        await (prismadb as any).landingPage.update({
                            where: { id: existing.id },
                            data: {
                                title: title,
                                content: puckData,
                                wordpressPostId: id,
                                wordpressPostType: postType,
                                wordpressPostDate: new Date(post.date)
                            }
                        });
                    } else {
                        await (prismadb as any).landingPage.create({
                            data: {
                                title: title,
                                slug: finalSlug,
                                description: `Imported from WordPress ${postType} (ID: ${id})`,
                                content: puckData,
                                isPublished: false,
                                wordpressPostId: id,
                                wordpressPostType: postType,
                                wordpressPostDate: new Date(post.date)
                            }
                        });
                    }

                    results.success.push(id.toString());
                } catch (error) {
                    console.error(`Failed to import item ${id}:`, error);
                    results.failed.push(id.toString());
                }
            }
            await logActivity("WP_IMPORT", "WordPress", `Imported ${results.success.length} items`);
        } else {
            return new NextResponse("Invalid request type", { status: 400 });
        }

        return NextResponse.json({
            message: `Import complete. Success: ${results.success.length}, Failed: ${results.failed.length}`,
            results
        });

    } catch (error: any) {
        console.error("[WP_IMPORT]", error);

        // Handle specific HTML/Connection error
        if (error.message.includes("returned HTML")) {
            return new NextResponse(error.message, { status: 400 });
        }

        return new NextResponse(error.message || "Import failed", { status: 500 });
    }
}
