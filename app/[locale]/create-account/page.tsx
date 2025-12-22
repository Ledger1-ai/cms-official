import MarketingLayout from "@/components/marketing/MarketingLayout";
import CreateAccountForm from "./CreateAccountForm";

export const metadata = {
    title: "Create Account | Ledger1CMS",
    description: "Join the future of content management.",
};

export default function CreateAccountPage() {
    return (
        <MarketingLayout variant="default">
            <CreateAccountForm />
        </MarketingLayout>
    );
}
