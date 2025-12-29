"use server";

import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getSeoConfig() {
    try {
        const config = await prismadb.systemSeoConfig.findFirst();
        return config || null;
    } catch (error) {
        console.error("Failed to fetch SEO config:", error);
        return null;
    }
}

export async function updateSeoConfig(data: any) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        // Ensure only one config exists
        const existing = await prismadb.systemSeoConfig.findFirst();

        if (existing) {
            await prismadb.systemSeoConfig.update({
                where: { id: existing.id },
                data: {
                    globalTitle: data.globalTitle,
                    globalDescription: data.globalDescription,
                    ogImage: data.ogImage,
                    ogTitle: data.ogTitle,
                    ogDescription: data.ogDescription,
                    twitterCard: data.twitterCard,
                    twitterImage: data.twitterImage,
                    twitterTitle: data.twitterTitle,
                    twitterDescription: data.twitterDescription,
                    faviconUrl: data.faviconUrl,
                }
            });
        } else {
            await prismadb.systemSeoConfig.create({
                data: {
                    globalTitle: data.globalTitle,
                    globalDescription: data.globalDescription,
                    ogImage: data.ogImage,
                    //... other fields can rely on defaults or be explicit if needed
                    ...data
                }
            });
        }

        revalidatePath("/", "layout");
        revalidatePath("/[locale]", "layout"); // Ensure individual locale roots update
        return { success: true };
    } catch (error) {
        console.error("Failed to update SEO config:", error);
        return { success: false, error: "Failed to update settings" };
    }
}

// Mock AI generation for now - connection to actual AI would go here
export async function generateAiMetadata(prompt: string) {
    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
        title: `Basalt CMS | The Intelligent Visual Builder`, // Placeholder
        description: `Build, scale, and manage your digital presence with the world's most powerful AI-assisted visual CMS. Create stunning landing pages, manage content, and deploy AI agents instantly.`
    };
}
