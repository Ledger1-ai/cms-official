"use server";

import { prismadb } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getClients(query?: string) {
    try {
        const where: any = {
            assigned_team: {
                isNot: null
            }
        };

        if (query) {
            where.OR = [
                { name: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
                { assigned_team: { name: { contains: query, mode: "insensitive" } } }
            ];
        }

        const users = await prismadb.users.findMany({
            where: {
                ...where,
                email: { not: "admin@ledger1.ai" },
            },
            include: {
                assigned_team: {
                    include: {
                        assigned_plan: true
                    }
                },
                assigned_role: true
            },
            orderBy: { created_on: 'desc' }
        });

        return users.filter(u => u.assigned_team);
    } catch (error) {
        console.error("Failed to get clients:", error);
        return [];
    }
}

// Updated to match SubscriptionClient requirement
export async function getSubscribers(page: number = 1, limit: number = 20, query: string = "") {
    try {
        const where: any = {};
        if (query) {
            where.OR = [
                { email: { contains: query, mode: "insensitive" } },
                { firstName: { contains: query, mode: "insensitive" } },
                { lastName: { contains: query, mode: "insensitive" } }
            ];
        }

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            prismadb.newsletterSubscriber.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prismadb.newsletterSubscriber.count({ where })
        ]);

        return {
            success: true,
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    } catch (error) {
        console.error("Failed to get subscribers:", error);
        return { success: false, error: "Failed to fetch subscribers" };
    }
}

// Backward compatibility alias if needed, or strictly use getSubscribers
export async function getNewsletterSubscribers(query?: string) {
    // Reuse new logic but return array (old behavior)
    const result = await getSubscribers(1, 1000, query); // Default to first 1000
    return result.success ? result.data : [];
}

export async function addSubscriber(data: { email: string, firstName?: string, lastName?: string }) {
    try {
        if (!data.email) return { success: false, error: "Email is required" };

        const existing = await prismadb.newsletterSubscriber.findFirst({
            where: { email: data.email }
        });

        if (existing) {
            return { success: false, error: "Subscriber already exists" };
        }

        await prismadb.newsletterSubscriber.create({
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                status: "SUBSCRIBED",
                source: "Admin Manual Add"
            }
        });

        revalidatePath("/cms/subscriptions/newsletter");
        return { success: true };
    } catch (error) {
        console.error("Add subscriber error:", error);
        return { success: false, error: "Failed to add subscriber" };
    }
}

export async function deleteSubscriber(id: string) {
    try {
        await prismadb.newsletterSubscriber.delete({ where: { id } });
        revalidatePath("/cms/subscriptions/newsletter");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete subscriber" };
    }
}

export async function updateSubscriberPreferences(id: string, data: { subscribedToBlog?: boolean, subscribedToCareers?: boolean }) {
    try {
        await prismadb.newsletterSubscriber.update({
            where: { id },
            data
        });
        revalidatePath("/cms/subscriptions/newsletter");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update preferences" };
    }
}
