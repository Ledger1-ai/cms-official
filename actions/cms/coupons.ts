"use server";

import { prismadb } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Type definitions matching the Prisma model for client usage
export interface CouponData {
    id?: string;
    code: string;
    type: "fixed_cart" | "percent" | "fixed_product"; // matching generic string type in schema but enforcing enum in app
    amount: number;
    description?: string;
    productIds: string[];
    usageLimit: number;
    expiryDate?: string | Date | null;
}

export async function getCoupons() {
    try {
        const coupons = await prismadb.coupon.findMany({
            orderBy: { createdAt: "desc" }
        });

        // Convert dates to strings for safe client-side serialization if needed, 
        // strictly speaking Next.js server actions handle Dates, but let's be safe for pure JSON consumers.
        // For now, we return as is, Next.js typically handles Date objects in Server Actions.
        return { success: true, data: coupons };
    } catch (error) {
        console.error("Failed to fetch coupons:", error);
        return { success: false, error: "Failed to fetch coupons" };
    }
}

export async function createCoupon(data: CouponData) {
    try {
        const coupon = await prismadb.coupon.create({
            data: {
                code: data.code,
                type: data.type,
                amount: data.amount,
                description: data.description,
                productIds: data.productIds,
                usageLimit: data.usageLimit,
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
                isActive: true
            }
        });
        revalidatePath("/cms/coupons");
        return { success: true, data: coupon };
    } catch (error: any) {
        console.error("Failed to create coupon:", error);
        if (error.code === 'P2002') {
            return { success: false, error: "Coupon code already exists" };
        }
        return { success: false, error: "Failed to create coupon" };
    }
}

export async function updateCoupon(id: string, data: Partial<CouponData>) {
    try {
        const updateData: any = { ...data };
        if (data.expiryDate) {
            updateData.expiryDate = new Date(data.expiryDate);
        }
        // If expiryDate is null explicitly?
        if (data.expiryDate === null) {
            updateData.expiryDate = null;
        }

        const coupon = await prismadb.coupon.update({
            where: { id },
            data: updateData
        });
        revalidatePath("/cms/coupons");
        return { success: true, data: coupon };
    } catch (error) {
        console.error("Failed to update coupon:", error);
        return { success: false, error: "Failed to update coupon" };
    }
}

export async function deleteCoupon(id: string) {
    try {
        await prismadb.coupon.delete({
            where: { id }
        });
        revalidatePath("/cms/coupons");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete coupon:", error);
        return { success: false, error: "Failed to delete coupon" };
    }
}
