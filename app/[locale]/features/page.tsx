import FeaturesContent from "@/components/marketing/FeaturesContent";
import MarketingLayout from "@/components/marketing/MarketingLayout";

export const metadata = {
    title: "Features - Ledger1 CMS",
    description: "Explore the powerful features that make Ledger1 CMS the best choice for your content needs.",
};

export default function FeaturesPage() {
    return (
        <MarketingLayout variant="emerald">
            <FeaturesContent />
        </MarketingLayout>
    );
}
