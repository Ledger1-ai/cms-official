"use server";

import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/cms/audit";

export async function getSubscribers(page = 1, limit = 20, search = "") {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { email: { contains: search, mode: "insensitive" } },
                { firstName: { contains: search, mode: "insensitive" } },
                { lastName: { contains: search, mode: "insensitive" } },
            ];
        }

        const [subscribers, total] = await Promise.all([
            prismadb.subscriber.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            prismadb.subscriber.count({ where }),
        ]);

        return {
            success: true,
            data: subscribers,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page,
                limit
            }
        };
    } catch (error) {
        console.error("[GET_SUBSCRIBERS]", error);
        return { success: false, error: "Failed to fetch subscribers" };
    }
}

export async function addSubscriber(data: { email: string; firstName?: string; lastName?: string }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const existing = await prismadb.subscriber.findUnique({
            where: { email: data.email },
        });

        if (existing) {
            return { success: false, error: "Subscriber already exists" };
        }

        const subscriber = await prismadb.subscriber.create({
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                subscribedToBlog: true,
                subscribedToCareers: true,
            },
        });

        await logActivity("ADD_SUBSCRIBER", "Subscription", `Added subscriber ${data.email}`);
        revalidatePath("/cms/subscriptions");
        return { success: true, data: subscriber };
    } catch (error) {
        console.error("[ADD_SUBSCRIBER]", error);
        return { success: false, error: "Failed to add subscriber" };
    }
}

export async function deleteSubscriber(id: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const sub = await prismadb.subscriber.delete({
            where: { id },
        });

        await logActivity("DELETE_SUBSCRIBER", "Subscription", `Deleted subscriber ${sub.email}`);
        revalidatePath("/cms/subscriptions");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete subscriber" };
    }
}

export async function updateSubscriberPreferences(id: string, updates: { subscribedToBlog?: boolean; subscribedToCareers?: boolean; isActive?: boolean }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await prismadb.subscriber.update({
            where: { id },
            data: updates,
        });

        revalidatePath("/cms/subscriptions");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update preferences" };
    }
}
