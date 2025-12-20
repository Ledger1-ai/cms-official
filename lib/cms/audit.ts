import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type AuditAction =
    | "CREATE_VENDOR"
    | "UPDATE_VENDOR"
    | "DELETE_VENDOR"
    | "CREATE_VENDOR_FROM_MEDIA"
    | "MEDIA_UPLOAD"
    | "MEDIA_UPDATE"
    | "MEDIA_DELETE"
    | "ADD_SUBSCRIBER"
    | "DELETE_SUBSCRIBER"
    | "UPDATE_SUBSCRIPTION_SETTINGS"
    | "MODULE_ACCESS_GRANT"
    | "MODULE_ACCESS_REVOKE";

export async function logActivity(
    action: AuditAction,
    resource: string,
    details?: string
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return; // Anonymous actions not logged?

        await prismadb.systemActivity.create({
            data: {
                userId: session.user.id,
                action,
                resource,
                details
            }
        });
    } catch (error) {
        console.error("Failed to log activity:", error);
        // Don't throw, just log error so we don't block the main action
    }
}
