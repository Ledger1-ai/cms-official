"use server";

import { getAiSdkModel } from "@/lib/openai";
import { generateObject } from "ai";
import { z } from "zod";

const couponSchema = z.object({
    code: z.string().describe("Length 5-12, alphanumeric, uppercase. Catchy and relevant to the description."),
    type: z.enum(["fixed_cart", "percent", "fixed_product"]).describe("The type of discount."),
    amount: z.number().describe("The discount amount. If percent, between 5 and 50. If fixed, between 10 and 100."),
    description: z.string().describe("Short internal description of the marketing reason."),
    usageLimit: z.number().describe("Recommended usage limit. 0 for unlimited."),
    expiryDate: z.string().optional().describe("ISO date string (YYYY-MM-DD) for expiry, usually 1 month from now, or null if permanent.")
});

export async function generateCouponAI(prompt: string) {
    try {
        const model = await getAiSdkModel("system");

        if (!model) {
            return { success: false, error: "AI System not configured." };
        }

        const { object } = await generateObject({
            model: model,
            schema: couponSchema,
            prompt: `Generate a marketing coupon based on this request: "${prompt}".
            
            Context: E-commerce store.
            Make it attractive and viable.
            Current date: ${new Date().toISOString()}
            `
        });

        // Ensure defaults
        if (object) {
            // Basic validation/cleanup if needed
            if (object.type === 'percent' && object.amount > 100) object.amount = 100;
        }

        return { success: true, data: object };

    } catch (error) {
        console.error("AI Coupon Generation Failed:", error);
        return { success: false, error: "Failed to generate coupon using AI." };
    }
}
