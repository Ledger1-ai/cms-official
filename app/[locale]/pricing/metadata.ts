import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Basalt – AI Sales & Support Engine",
    description: "Automated prospecting, social intelligence, and 24/7 AI agents that never sleep.",
    openGraph: {
        title: "Basalt – AI Sales & Support Engine",
        description: "Automated prospecting, social intelligence, and 24/7 AI agents that never sleep.",
        url: "https://crm.basalthq.com",
        type: "website",
        images: [
            {
                url: "/images/opengraph-image.png",
            },
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Basalt CMS | Enterprise AI Visual Builder",
        description: "Transparent pricing for high-growth teams.",
        images: ["/images/opengraph-image.png"],
    },
};
