"use server";

import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface HeaderConfigData {
    logoUrl?: string;
    navigationItems?: any[]; // Allow flexibility for now
    showCta?: boolean;
    ctaText?: string;
    ctaLink?: string;
    isActive?: boolean;
}

export async function getHeaderConfig() {
    try {
        const config = await (prismadb as any).systemHeaderConfig.findFirst();
        return config || null;
    } catch (error) {
        console.error("Failed to fetch Header config:", error);
        return null;
    }
}

export async function updateHeaderConfig(data: HeaderConfigData) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        // Ensure only one config exists
        const existing = await (prismadb as any).systemHeaderConfig.findFirst();

        if (existing) {
            await (prismadb as any).systemHeaderConfig.update({
                where: { id: existing.id },
                data: {
                    logoUrl: data.logoUrl,
                    navigationItems: data.navigationItems ?? [],
                    showCta: data.showCta,
                    ctaText: data.ctaText,
                    ctaLink: data.ctaLink,
                    isActive: data.isActive
                }
            });
        } else {
            await (prismadb as any).systemHeaderConfig.create({
                data: {
                    logoUrl: data.logoUrl,
                    navigationItems: data.navigationItems ?? [],
                    showCta: data.showCta ?? true,
                    ctaText: data.ctaText ?? "Get Started",
                    ctaLink: data.ctaLink ?? "/create-account",
                    isActive: data.isActive ?? true
                }
            });
        }

        revalidatePath("/", "layout");
        revalidatePath("/[locale]", "layout");
        return { success: true };
    } catch (error) {
        console.error("Failed to update Header config:", error);
        return { success: false, error: "Failed to update settings" };
    }
}
