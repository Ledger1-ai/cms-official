import SupportClient from "./SupportClient";
import MarketingLayout from "@/components/marketing/MarketingLayout";

export const metadata = {
    title: "Support - Ledger1CMS",
    description: "Get help with Ledger1CMS.",
};

export default function SupportPage() {
    return (
        <MarketingLayout variant="blue">
            <SupportClient />
        </MarketingLayout>
    );
}
