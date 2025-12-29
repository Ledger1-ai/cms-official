import SupportClient from "./SupportClient";
import MarketingLayout from "@/components/marketing/MarketingLayout";

export const metadata = {
    title: "Support - BasaltCMS",
    description: "Get help with BasaltCMS.",
};

export default function SupportPage() {
    return (
        <MarketingLayout variant="blue">
            <SupportClient />
        </MarketingLayout>
    );
}
