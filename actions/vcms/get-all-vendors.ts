"use server";

import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getAllVendors() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return { success: false, error: "Unauthorized" };
        }

        const vendors = await prismadb.vendorProfile.findMany({
            orderBy: { name: 'asc' },
            include: {
                business_cards: {
                    select: { url: true, isBusinessCard: true }
                }
            }
        });

        // Safe serialization for Client Components
        const safeVendors = vendors.map(v => ({
            ...v,
            createdAt: v.createdAt ? v.createdAt.toISOString() : null,
            updatedAt: v.updatedAt ? v.updatedAt.toISOString() : null,
            coi_expiry: v.coi_expiry ? v.coi_expiry.toISOString() : null,
            license_expiry: v.license_expiry ? v.license_expiry.toISOString() : null,
        }));

        return { success: true, data: safeVendors };

    } catch (error) {
        console.error("[GET_VENDORS_ERROR]", error);
        return { success: false, error: "Failed to fetch vendors" };
    }
}
