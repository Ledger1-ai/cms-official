import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { EditorProvider } from "@/components/landing/EditorContext";
import { LandingLayoutClient } from "./LandingLayoutClient";

export default async function LandingLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect(`/${locale}/cms/login`);
    }

    // Fetch only necessary fields for the sidebar
    const pages = await prismadb.landingPage.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            slug: true,
            isPublished: true,
            updatedAt: true,
        },
    });

    return (
        <EditorProvider>
            <LandingLayoutClient sidebarProps={{ pages, locale }} >
                {children}
            </LandingLayoutClient>
        </EditorProvider>
    );
}
