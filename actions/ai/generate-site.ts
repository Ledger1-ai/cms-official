
"use server";

import { prismadb } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/actions/audit";

// Mock templates for different industries
const templates: any = {
    home: {
        hero: { title: "Future of {{brand}}", subtitle: "Experience the premium standard in {{industry}}.", primaryAction: "Get Started" },
        features: [
            { title: "Premium Quality", description: "Only the finest materials.", icon: "Shield" },
            { title: "Global Reach", description: "Serving customers worldwide.", icon: "Globe" },
            { title: "24/7 Support", description: "We are here when you need us.", icon: "Zap" }
        ]
    },
    about: {
        hero: { title: "About {{brand}}", subtitle: "Our story of excellence.", primaryAction: "Contact Us" },
        content: "Founded with a vision to revolutionize {{industry}}, {{brand}} has set the gold standard."
    },
    pricing: {
        hero: { title: "Simple Pricing", subtitle: "Choose the plan that fits you.", primaryAction: "View Plans" },
        plans: [
            { plan: "Starter", price: "$29", features: "Basic Access, Support", recommended: "false" },
            { plan: "Pro", price: "$99", features: "All Features, Priority Support", recommended: "true" }
        ]
    }
};

export async function generateSite(data: {
    brandName: string;
    description: string;
    pages: Record<string, boolean>;
    customReqs?: string;
}) {
    console.log("Generating site for:", data.brandName);

    try {
        const createdPages = [];

        for (const [pageKey, isSelected] of Object.entries(data.pages)) {
            if (!isSelected) continue;

            const template = templates[pageKey] || templates.home; // Fallback
            const title = pageKey.charAt(0).toUpperCase() + pageKey.slice(1);
            const slug = pageKey === 'home' ? 'home' : `${pageKey}`;

            // Replace placeholders
            const heroTitle = template.hero?.title.replace("{{brand}}", data.brandName) || title;
            const heroSubtitle = template.hero?.subtitle.replace("{{industry}}", data.description) || "Welcome to our site.";

            // Construct Puck JSON
            // We'll create a structured page based on the type
            let content: any = [];

            if (pageKey === 'header' || pageKey === 'footer') {
                // Component pages
                content = [
                    { type: "ContainerBlock", props: { className: "p-4 bg-slate-900 text-white", id: "nav" } }
                ];
            } else {
                // Formatting content for Puck
                content.push({
                    type: "HeroBlock",
                    props: {
                        title: heroTitle,
                        subtitle: heroSubtitle,
                        primaryAction: template.hero?.primaryAction || "Learn More",
                        bgImage: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1600&q=80"
                    }
                });

                if (template.features) {
                    content.push({
                        type: "FeaturesGridBlock",
                        props: {
                            title: "Why Choose Us",
                            features: template.features
                        }
                    });
                }

                if (pageKey === 'contact') {
                    content.push({
                        type: "HeadingBlock",
                        props: { title: "Contact Us", align: "center", size: "xl" }
                    });
                    content.push({
                        type: "TextBlock",
                        props: { content: "Get in touch with our team at support@ledger.ai", align: "center" }
                    });
                    // Add a mockup form via CodeBlock for now
                    content.push({
                        type: "CodeBlock",
                        props: { code: '<form class="max-w-md mx-auto space-y-4 text-white"><input type="email" placeholder="Email" class="w-full p-2 rounded bg-white/10 border border-white/20" /><button class="w-full bg-indigo-600 p-2 rounded">Send</button></form>' }
                    });
                }

                if (pageKey === 'pricing') {
                    content.push({
                        type: "PricingBlock",
                        props: template.plans[1] // Add the Pro plan
                    });
                }
            }

            // Create or Update Page in DB
            const page = await prismadb.landingPage.upsert({
                where: { slug: slug },
                update: {
                    content: { content, root: { props: { title: data.brandName + " - " + title } } },
                    title: `${data.brandName} - ${title}`,
                    description: `Generated ${title} page for ${data.brandName}`
                },
                create: {
                    slug: slug,
                    title: `${data.brandName} - ${title}`,
                    description: `Generated ${title} page for ${data.brandName}`,
                    content: { content, root: { props: { title: data.brandName + " - " + title } } }
                }
            });
            createdPages.push(page);
        }

        await logActivity("AI Site Generation", "Genius Mode", `Generated ${createdPages.length} pages for brand: ${data.brandName}`);

        revalidatePath("/cms/landing");
        return { success: true, pages: createdPages };

    } catch (error) {
        console.error("Genius Mode Error:", error);
        return { success: false, error: "Failed to generate site." };
    }
}
