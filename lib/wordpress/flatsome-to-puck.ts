/**
 * Flatsome Shortcode to Puck Converter
 * 
 * Parses raw Flatsome shortcodes (e.g. [section], [row], [col], [button])
 * and converts them into native Puck blocks with proper styling.
 * 
 * CRITICAL: This parser outputs NATIVE Puck blocks (HeadingBlock, TextBlock, Button)
 * NOT raw HTML in RichTextBlock.
 */

import { Data } from "@measured/puck";

interface PuckBlock {
    type: string;
    props: Record<string, any>;
}

function generateId(): string {
    return `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Parse shortcode attributes like: bg_color="#2a3d55" padding="60px"
 */
function parseShortcodeAttributes(attrString: string): Record<string, string> {
    const attrs: Record<string, string> = {};
    const regex = /(\w+)=["']([^"']*)["']/g;
    let match;
    while ((match = regex.exec(attrString)) !== null) {
        attrs[match[1]] = match[2];
    }
    return attrs;
}

/**
 * Strip HTML tags and get plain text
 */
function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Extract color from inline style
 */
function extractColor(html: string): string | undefined {
    const colorMatch = html.match(/color:\s*([^;"']+)/i);
    if (colorMatch) {
        const c = colorMatch[1].trim().toLowerCase();
        // Map to Puck color presets or return raw hex
        if (c === 'white' || c === '#fff' || c === '#ffffff') return 'white';
        if (c === 'black' || c === '#000' || c === '#000000') return 'black';
        return colorMatch[1].trim(); // Return raw color for customTextColor
    }
    return undefined;
}

/**
 * Parse HTML content inside [ux_text] into native Puck blocks
 */
function parseHtmlToNativeBlocks(html: string, sectionTextColor?: string): PuckBlock[] {
    const blocks: PuckBlock[] = [];

    // Remove empty tags and normalize
    let content = html
        .replace(/<p[^>]*>\s*<\/p>/gi, '')
        .replace(/<div[^>]*>\s*<\/div>/gi, '')
        .trim();

    if (!content) return blocks;

    // Split by major block elements
    const elements = content.split(/(?=<h[1-6]|<p\s|<p>|<blockquote|<div)/i).filter(s => s.trim());

    for (const element of elements) {
        const trimmed = element.trim();
        if (!trimmed) continue;

        // HEADING: <h1>...<h6>
        const headingMatch = trimmed.match(/<(h[1-6])([^>]*)>([\s\S]*?)<\/\1>/i);
        if (headingMatch) {
            const tag = headingMatch[1].toLowerCase();
            const attrs = headingMatch[2];
            const innerHtml = headingMatch[3];

            const sizeMap: Record<string, string> = {
                'h1': '6xl', 'h2': '4xl', 'h3': '3xl', 'h4': '2xl', 'h5': 'xl', 'h6': 'lg'
            };

            const textColor = extractColor(attrs) || sectionTextColor;
            const title = stripHtml(innerHtml);

            if (title) {
                blocks.push({
                    type: 'HeadingBlock',
                    props: {
                        id: generateId(),
                        title: title,
                        size: sizeMap[tag] || 'xl',
                        align: 'center',
                        customTextColor: textColor
                    }
                });
            }
            continue;
        }

        // PARAGRAPH: <p>...</p>
        const pMatch = trimmed.match(/<p([^>]*)>([\s\S]*?)<\/p>/i);
        if (pMatch) {
            const attrs = pMatch[1];
            const innerHtml = pMatch[2];
            const text = stripHtml(innerHtml);
            const textColor = extractColor(attrs) || sectionTextColor;

            if (text) {
                blocks.push({
                    type: 'TextBlock',
                    props: {
                        id: generateId(),
                        content: text,
                        align: 'center',
                        customTextColor: textColor
                    }
                });
            }
            continue;
        }

        // BLOCKQUOTE: <blockquote>...</blockquote>
        const quoteMatch = trimmed.match(/<blockquote([^>]*)>([\s\S]*?)<\/blockquote>/i);
        if (quoteMatch) {
            const attrs = quoteMatch[1];
            const innerHtml = quoteMatch[2];
            const text = stripHtml(innerHtml);

            // Check for border-left (testimonial style)
            const hasBorder = attrs.includes('border-left') || attrs.includes('border:');

            if (text) {
                if (hasBorder) {
                    const containerId = generateId();
                    blocks.push({
                        type: 'ContainerBlock',
                        props: {
                            id: containerId,
                            layout: 'stack',
                            gap: 'sm',
                            paddingX: '4',
                            borderWidth: '2',
                            borderColor: 'white/10' // Neutral border - no colored styling
                        }
                    });
                    // Note: Zones will be handled by caller
                } else {
                    blocks.push({
                        type: 'TextBlock',
                        props: {
                            id: generateId(),
                            content: text,
                            align: 'center',
                            fontStyle: 'italic'
                        }
                    });
                }
            }
            continue;
        }

        // Plain text (no tags or unrecognized)
        const plainText = stripHtml(trimmed);
        if (plainText && plainText.length > 2) {
            blocks.push({
                type: 'TextBlock',
                props: {
                    id: generateId(),
                    content: plainText,
                    align: 'center',
                    customTextColor: sectionTextColor
                }
            });
        }
    }

    return blocks;
}

/**
 * Parse inner content of a section (handles [row], [col], [ux_text], [button])
 */
function parseInnerContent(content: string, sectionAttrs: Record<string, string>): PuckBlock[] {
    const blocks: PuckBlock[] = [];
    const sectionTextColor = sectionAttrs.text_color || sectionAttrs.color;

    // Remove [row] and [col] wrappers - we flatten the structure
    let cleaned = content
        .replace(/\[\/?row[^\]]*\]/gi, '')
        .replace(/\[\/?col[^\]]*\]/gi, '');

    // Parse [button] shortcodes
    const buttonRegex = /\[button\s+([^\]]*)\]/gi;
    let buttonMatch;
    const buttonPositions: { index: number; block: PuckBlock }[] = [];

    while ((buttonMatch = buttonRegex.exec(cleaned)) !== null) {
        const attrs = parseShortcodeAttributes(buttonMatch[1]);
        buttonPositions.push({
            index: buttonMatch.index,
            block: {
                type: 'Button',
                props: {
                    id: generateId(),
                    label: attrs.text || 'Click Me',
                    href: attrs.link || attrs.url || '#',
                    variant: attrs.style === 'link' ? 'ghost' : 'default'
                }
            }
        });
    }

    // Parse [ux_text] blocks
    const uxTextRegex = /\[ux_text([^\]]*)\]([\s\S]*?)\[\/ux_text\]/gi;
    let uxMatch;
    const textPositions: { index: number; blocks: PuckBlock[] }[] = [];

    while ((uxMatch = uxTextRegex.exec(cleaned)) !== null) {
        const attrs = parseShortcodeAttributes(uxMatch[1]);
        const innerHtml = uxMatch[2];
        const textColor = attrs.text_color || sectionTextColor;
        const nativeBlocks = parseHtmlToNativeBlocks(innerHtml, textColor);

        textPositions.push({
            index: uxMatch.index,
            blocks: nativeBlocks
        });
    }

    // Merge all blocks in order of appearance
    const allItems: { index: number; items: PuckBlock[] }[] = [
        ...buttonPositions.map(b => ({ index: b.index, items: [b.block] })),
        ...textPositions.map(t => ({ index: t.index, items: t.blocks }))
    ];

    allItems.sort((a, b) => a.index - b.index);

    for (const item of allItems) {
        blocks.push(...item.items);
    }

    return blocks;
}

/**
 * Main converter function
 */
export function flatsomeToPuck(rawContent: string): Data {
    const content: PuckBlock[] = [];
    const zones: Record<string, PuckBlock[]> = {};

    // 1. Remove Gutenberg wrappers
    let cleanedContent = rawContent
        .replace(/<!-- wp:html -->/g, '')
        .replace(/<!-- \/wp:html -->/g, '')
        .trim();

    // 2. Check for [section] shortcodes
    if (cleanedContent.includes('[section')) {
        const sectionRegex = /\[section\s*([^\]]*)\]([\s\S]*?)\[\/section\]/gi;
        let match;

        while ((match = sectionRegex.exec(cleanedContent)) !== null) {
            const attrString = match[1];
            const innerContent = match[2];
            const attrs = parseShortcodeAttributes(attrString);

            const sectionId = generateId();

            // Map Flatsome attributes to Puck props
            const backgroundColor = attrs.bg_color || attrs.bg || undefined;
            const padding = attrs.padding || '60px';

            content.push({
                type: 'Section',
                props: {
                    id: sectionId,
                    backgroundColor: backgroundColor,
                    padding: padding
                }
            });

            // Parse inner content into native blocks
            const innerBlocks = parseInnerContent(innerContent, attrs);
            zones[`${sectionId}:content`] = innerBlocks;
        }
    } else {
        // No sections, parse as flat content
        const innerBlocks = parseInnerContent(cleanedContent, {});
        content.push(...innerBlocks);
    }

    return {
        content,
        zones,
        root: { props: { title: "Imported Page" } }
    };
}
