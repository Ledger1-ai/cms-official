import { prismadb } from "@/lib/prisma";
import { Render, Data } from "@measured/puck";
import { puckConfig } from "@/lib/puck.config";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string[];
        locale: string;
    }>;
}

export default async function Page(props: PageProps) {
    const params = await props.params;

    const slugPath = params?.slug?.join("/") || "";

    // Find page by slug (we might need to handle the slug storage better, but for now assuming slug matches)
    const page = await prismadb.landingPage.findUnique({
        where: { slug: slugPath },
    });

    if (!page || !page.content) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-black">
            <Render config={puckConfig} data={page.content as Data} />
        </main>
    );
}
