import PricingContent from "@/components/marketing/PricingContent";
import MarketingLayout from "@/components/marketing/MarketingLayout";

export const metadata = {
    title: "Pricing - Ledger1 CMS",
    description: "Simple, transparent pricing for teams of all sizes.",
};

export default function PricingPage() {
    return (
        <MarketingLayout variant="gold">
            <PricingContent />
        </MarketingLayout>
    );
}
