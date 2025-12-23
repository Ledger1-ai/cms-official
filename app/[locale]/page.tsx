import DemoPage from "@/components/demo/DemoPage";
import MarketingFooter from "./components/MarketingFooter";
import { prismadb } from "@/lib/prisma";

export default async function Page() {
    // Fetch social settings to pass to header/footer context if needed
    // MarketingFooter pulls its own, but we need it for DemoPage -> MarketingHeader
    const socialSettings = await prismadb.socialSettings.findFirst();

    return (
        <DemoPage
            footer={<MarketingFooter />}
            socialSettings={socialSettings}
        />
    );
}
