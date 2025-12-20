
import MarketingFooter from "@/app/[locale]/components/MarketingFooter";
import MarketingHeader from "@/app/[locale]/components/MarketingHeader";
import InteractiveBackground from "@/components/marketing/InteractiveBackground";
import FeaturesContent from "@/components/marketing/FeaturesContent";

export const metadata = {
    title: "Features - Ledger1 CMS",
    description: "Explore the powerful features that make Ledger1 CMS the best choice for your content needs.",
};

export default function FeaturesPage() {
    return (
        <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-purple-500/30">
            <InteractiveBackground />
            <MarketingHeader />
            <FeaturesContent />
            <MarketingFooter />
        </div>
    );
}
