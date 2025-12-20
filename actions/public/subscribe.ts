"use server";

import { prismadb } from "@/lib/prisma";
import { z } from "zod";

const subscribeSchema = z.object({
    email: z.string().email("Invalid email address"),
    preferences: z.object({
        blog: z.boolean().default(true),
        careers: z.boolean().default(true),
    }).optional(),
});

export async function publicSubscribe(formData: { email: string; preferences?: { blog: boolean; careers: boolean } }) {
    try {
        const validated = subscribeSchema.safeParse(formData);

        if (!validated.success) {
            return { success: false, error: validated.error.issues[0].message };
        }

        const { email, preferences } = validated.data;

        // Check if subscriber exists
        const existing = await prismadb.subscriber.findUnique({
            where: { email },
        });

        if (existing) {
            // Update preferences if they exist, otherwise just return success (idempotent)
            await prismadb.subscriber.update({
                where: { id: existing.id },
                data: {
                    subscribedToBlog: preferences?.blog ?? existing.subscribedToBlog,
                    subscribedToCareers: preferences?.careers ?? existing.subscribedToCareers,
                    isActive: true, // Re-activate if they subscribe again
                },
            });
            return { success: true, message: "Subscription updated!" };
        }

        // Create new subscriber
        await prismadb.subscriber.create({
            data: {
                email,
                firstName: "Guest", // Default for public signup
                subscribedToBlog: preferences?.blog ?? true,
                subscribedToCareers: preferences?.careers ?? true,
            },
        });

        // TODO: Send welcome email via Resend here

        return { success: true, message: "Successfully subscribed!" };
    } catch (error) {
        console.error("[PUBLIC_SUBSCRIBE]", error);
        return { success: false, error: "Something went wrong. Please try again." };
    }
}
