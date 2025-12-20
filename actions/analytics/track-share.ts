"use server";

import { prismadb } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function trackShare(url: string, platform: string) {
    try {
        console.log(`[Analytics] Tracking share: ${platform} - ${url}`);

        // Log the event directly. We don't link to a Post ID in the BlogEvent schema currently,
        // we use sourceUrl to group them.
        await prismadb.blogEvent.create({
            data: {
                eventType: "SHARE",
                sourceUrl: url,
                sharePlatform: platform,
                // destinationUrl is optional, could be the intent URL if we wanted.
            }
        });

        console.log(`[Analytics] Recorded share for url: ${url}`);
        revalidatePath("/cms/analytics"); // Update dashboard
        return { success: true };

    } catch (error) {
        console.error("[Analytics] trackShare error:", error);
        return { success: false, error: "Failed to track" };
    }
}
