import Stripe from "stripe";
import { prismadb } from "@/lib/prisma";

export async function getStripeClient(userId: string) {
    const connection = await prismadb.appConnection.findFirst({
        where: {
            userId: userId,
            providerId: "stripe",
            isActive: true
        }
    });

    if (!connection || !connection.credentials) {
        throw new Error("Stripe is not configured for this user");
    }

    const { secretKey } = connection.credentials as { secretKey?: string };

    if (!secretKey) {
        throw new Error("Stripe secret key is missing");
    }

    return new Stripe(secretKey, {
        apiVersion: "2025-12-15.clover", // Updated to match installed type definition
        typescript: true,
    });
}
