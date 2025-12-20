"use server";
import { prismadb } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/actions/audit";

export async function saveLandingPage(id: string, data: any) {
    try {
        await prismadb.landingPage.update({
            where: { id },
            data: {
                content: data,
                updatedAt: new Date(),
            },
        });
        revalidatePath(`/cms/landing`);
        revalidatePath(`/landing`);

        await logActivity("Update Landing Page", "Landing Page", `Updated content for page ID: ${id}`);

        return { success: true };
    } catch (error) {
        console.error("Failed to save landing page:", error);
        return { success: false, error: "Failed to save" };
    }
}
