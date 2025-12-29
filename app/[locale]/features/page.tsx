import FeaturesContent from "@/components/marketing/FeaturesContent";
import MarketingLayout from "@/components/marketing/MarketingLayout";

export const metadata = {
    title: "Features - Basalt CMS",
    description: "Explore the powerful features that make Basalt CMS the best choice for your content needs.",
};

export default function FeaturesPage() {
    return (
        <MarketingLayout variant="emerald">
            <FeaturesContent />
        </MarketingLayout>
    );
}
