import IndustryPageContent from "./IndustryPageContent";
import MarketingLayout from "@/components/marketing/MarketingLayout";

export const metadata = {
    title: "Industries | Ledger1CMS Solutions",
    description: "Discover how Ledger1CMS adapts to your specific industry needs. From SaaS to Healthcare, we have you covered.",
};

export default function IndustriesPage() {
    return (
        <MarketingLayout variant="blue">
            <IndustryPageContent />
        </MarketingLayout>
    );
}
