"use server";

import { prismadb } from "@/lib/prisma";

export type CouponValidationResult = {
    isValid: boolean;
    discount?: {
        code: string;
        type: "fixed_cart" | "percent" | "fixed_product";
        amount: number;
    };
    error?: string;
};

export async function validateCoupon(code: string): Promise<CouponValidationResult> {
    try {
        if (!code) return { isValid: false, error: "Code is required" };

        const coupon = await prismadb.coupon.findUnique({
            where: { code: code.toUpperCase() }
        });

        if (!coupon) {
            return { isValid: false, error: "Invalid coupon code" };
        }

        if (!coupon.isActive) {
            return { isValid: false, error: "This coupon is no longer active" };
        }

        if (coupon.usageLimit > 0 && coupon.usageCount >= coupon.usageLimit) {
            return { isValid: false, error: "This coupon has reached its usage limit" };
        }

        if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
            return { isValid: false, error: "This coupon has expired" };
        }

        return {
            isValid: true,
            discount: {
                code: coupon.code,
                type: coupon.type as any,
                amount: coupon.amount
            }
        };

    } catch (error) {
        console.error("Coupon validation error:", error);
        return { isValid: false, error: "Error validating coupon" };
    }
}
