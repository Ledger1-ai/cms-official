"use server";

import { prismadb } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/actions/audit";

export async function publishLandingPage(pageId: string) {
    try {
        const page = await prismadb.landingPage.findUnique({
            where: { id: pageId },
        });

        if (!page) {
            return { success: false, error: "Page not found" };
        }

        // Copy content -> publishedContent
        await prismadb.landingPage.update({
            where: { id: pageId },
            data: {
                publishedContent: page.content,
                isPublished: true
            }
        });

        await logActivity("Publish Landing Page", "Landing Page", `Published page: ${page.title}`);

        revalidatePath(`/landing/${page.slug}`);
        return { success: true };
    } catch (error) {
        console.error("Publish error:", error);
        return { success: false, error: "Failed to publish page" };
    }
}
