
import MarketingFooter from "@/app/[locale]/components/MarketingFooter";
import MarketingHeader from "@/app/[locale]/components/MarketingHeader";
import InteractiveBackground from "@/components/marketing/InteractiveBackground";
import PricingContent from "@/components/marketing/PricingContent";

export const metadata = {
    title: "Pricing - Ledger1 CMS",
    description: "Simple, transparent pricing for teams of all sizes.",
};

export default function PricingPage() {
    return (
        <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-purple-500/30">
            <InteractiveBackground />
            <MarketingHeader />
            <PricingContent />
            <MarketingFooter />
        </div>
    );
}
