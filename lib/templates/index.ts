import { Template } from "./types";
import { saasTemplates } from "./saas";
import { agencyTemplates } from "./agency";
import { portfolioTemplates } from "./portfolio";
import { ecommerceTemplates } from "./ecommerce";
import { businessTemplates } from "./business";
import { eventTemplates } from "./event";
import { healthTemplates } from "./health";
import { educationTemplates } from "./education";
import { financeTemplates } from "./finance";
import { foodTemplates } from "./food";
import { travelTemplates } from "./travel";
import { constructionTemplates } from "./construction";
import { nonprofitTemplates } from "./nonprofit";
import { servicesTemplates } from "./services";
import { lifestyleTemplates } from "./lifestyle";
import { techTemplates } from "./tech";
import { legalTemplates } from "./legal";
import { automotiveTemplates } from "./automotive";
import { entertainmentTemplates } from "./entertainment";
import { hospitalityTemplates } from "./hospitality";
import { sportsTemplates } from "./sports";

export * from "./types";

// Helper to ensure all blocks have unique IDs (fixes React key warning)
const processTemplate = (t: Template): Template => {
    // Defines fonts mapping
    const FONTS = [
        "Inter", "Roboto", "Lato", "Oswald", "Playfair Display",
        "Merriweather", "Montserrat", "Open Sans", "Raleway", "Nunito"
    ];

    // Deterministic font assignment based on template ID characters
    const assignFont = (id: string) => {
        const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return FONTS[sum % FONTS.length];
    };

    // Generic blocks to ensure min 5 blocks
    const extraBlocks = [];
    let currentCount = t.data.content.length;

    const fallbackBlocks = [
        {
            type: "TestimonialBlock",
            props: {
                quote: "This solution completely transformed our business operations.",
                author: "Alex Morgan",
                role: "Director",
                avatar: "https://i.pravatar.cc/150?u=alex",
                marginBottom: "8"
            }
        },
        {
            type: "FaqBlock",
            props: {
                items: [
                    { question: "How do I get started?", answer: "Simply sign up and you can start building immediately." },
                    { question: "Is support available?", answer: "Yes, our team is available 24/7 to assist you." }
                ],
                marginBottom: "12"
            }
        },
        {
            type: "StatsBlock",
            props: {
                stats: [
                    { value: "99%", label: "Satisfaction" },
                    { value: "24/7", label: "Support" },
                    { value: "10k+", label: "Users" }
                ],
                marginBottom: "8"
            }
        }
    ];

    while (currentCount < 5 && fallbackBlocks.length > 0) {
        extraBlocks.push(JSON.parse(JSON.stringify(fallbackBlocks.shift()))); // Deep copy to prevent ref sharing
        currentCount++;
    }

    // Process blocks recursively to ensure all have IDs
    const processContent = (content: any[], prefix: string) => {
        return content.map((block, i) => {
            const newId = `${prefix}-${i}`;
            const newBlock = {
                ...block,
                id: newId,
                _id: newId, // Legacy support
                props: {
                    ...(block.props || {}),
                    id: newId, // Ensure prop ID matches
                }
            };

            // Recurse into zones if they exist (unlikely but safe)
            // Note: Since Puck uses flat data structure for root, zones are usually on 'data' not block.
            // But if we had nested structures in future.
            // For now, root content is enough.

            return newBlock;
        });
    }

    // Handle zones if they existed (safeguard)
    const zones = t.data.zones || {};
    const processedZones: Record<string, any[]> = {};
    Object.keys(zones).forEach(zoneKey => {
        processedZones[zoneKey] = processContent(zones[zoneKey], `zone-${t.id}-${zoneKey}`);
    });

    return {
        ...t,
        data: {
            ...t.data,
            root: {
                ...t.data.root,
                props: {
                    ...(t.data.root?.props || {}),
                    font: (t.data.root?.props as any)?.font || assignFont(t.id)
                } as any
            },
            content: processContent([...t.data.content, ...extraBlocks], `block-${t.id}`),
            zones: processedZones
        }
    };
};

// Combine all templates
export const templates: Template[] = [
    ...saasTemplates,
    ...agencyTemplates,
    ...portfolioTemplates,
    ...ecommerceTemplates,
    ...businessTemplates,
    ...eventTemplates,
    ...healthTemplates,
    ...educationTemplates,
    ...financeTemplates,
    ...foodTemplates,
    ...travelTemplates,
    ...constructionTemplates,
    ...nonprofitTemplates,
    ...servicesTemplates,
    ...lifestyleTemplates,
    ...techTemplates,
    ...legalTemplates,
    ...automotiveTemplates,
    ...entertainmentTemplates,
    ...hospitalityTemplates,
    ...sportsTemplates,
].map(processTemplate);

// ===== HELPER FUNCTIONS =====
export const getTemplatesByCategory = (category: Template["category"]) =>
    templates.filter(t => t.category === category);

export const getTemplateById = (id: string) =>
    templates.find(t => t.id === id);

export const getAllCategories = (): Template["category"][] => {
    const categories = templates.map(t => t.category);
    return Array.from(new Set(categories));
};

export const CATEGORY_LABELS: Record<Template["category"], string> = {
    saas: "SaaS & Startup",
    agency: "Agency & Business",
    portfolio: "Portfolio & Personal",
    ecommerce: "E-Commerce",
    business: "Business & Corporate",
    event: "Events & Conferencing",
    health: "Health & Medical",
    education: "Education & Learning",
    finance: "Finance & Fintech",
    travel: "Travel & Hospitality",
    food: "Food & Restaurant",
    construction: "Construction & Trades",
    nonprofit: "Non-Profit & Charity",
    tech: "Technology & Software",
    legal: "Legal & Law",
    automotive: "Automotive & Transport",
    entertainment: "Entertainment & Media",
    hospitality: "Hospitality & Tourism",
    sports: "Sports & Fitness",
    services: "Home Services",
    lifestyle: "Lifestyle & Wellness"
};
