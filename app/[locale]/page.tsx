import DemoPage from "@/components/demo/DemoPage";
import MarketingFooter from "./components/MarketingFooter";
import { prismadb } from "@/lib/prisma";
import { getHeaderConfig } from "@/actions/cms/header-actions";

export default async function Page() {
    // Fetch social settings to pass to header/footer context if needed
    // MarketingFooter pulls its own, but we need it for DemoPage -> MarketingHeader
    const socialSettings = await prismadb.socialSettings.findFirst();

    // Fetch Header Config
    const headerConfig = await getHeaderConfig();

    return (
        <DemoPage
            footer={<MarketingFooter />}
            socialSettings={socialSettings}
            headerConfig={headerConfig}
        />
    );
}
