"use server";

import { prismadb } from "@/lib/prisma";
import { logActivity } from "@/actions/audit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getSupportTickets(limit = 20) {
    try {
        // @ts-ignore
        const tickets = await prismadb.supportTicket.findMany({
            take: limit,
            orderBy: {
                createdAt: "desc",
            }
        });
        return tickets;
    } catch (error) {
        console.error("Failed to fetch support tickets:", error);
        return [];
    }
}

export async function getUnreadTicketCount() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return 0;

    // Check admin
    const user = await prismadb.users.findUnique({ where: { email: session.user.email } });
    if (!user?.is_admin && user?.email !== "info@basalthq.com") return 0;

    const count = await prismadb.supportTicket.count({
        where: {
            status: "NEW"
        }
    });

    return count;
}

export async function deleteTicket(ticketId: string) {
    try {
        // Fetch ticket before deleting to log details
        // @ts-ignore
        const ticket = await prismadb.supportTicket.findUnique({
            where: { id: ticketId }
        });

        if (!ticket) {
            return { success: false, error: "Ticket not found" };
        }

        // @ts-ignore
        await prismadb.supportTicket.delete({
            where: {
                id: ticketId
            }
        });

        // Log activity
        await logActivity(
            "DELETED TICKET",
            `Ticket #${ticket.id.slice(-6)}`, // Shorten ID for readability
            `Deleted support ticket from ${ticket.email}: "${ticket.subject}"`
        );

        return { success: true };
    } catch (error) {
        console.error("Failed to delete ticket:", error);
        return { success: false, error: "Failed to delete ticket" };
    }
}
