"use server";

import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Permissions Check Helper
async function checkAdminAccess() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return false;

    const user = await prismadb.users.findUnique({
        where: { email: session.user.email },
        include: { assigned_role: true }
    });

    const isOwner = session.user.email === (process.env.ADMIN_EMAIL || "info@basalthq.com");
    const isAdmin = user?.assigned_role?.name === "Admin" || user?.is_admin === true;

    return isOwner || isAdmin;
}

export async function getRoles() {
    if (!await checkAdminAccess()) return [];

    try {
        const roles = await prismadb.role.findMany({
            include: {
                _count: {
                    select: { users: true }
                }
            },
            orderBy: { name: 'asc' }
        });

        // Sanitize roles to ensure arrays exist
        return roles.map(role => ({
            ...role,
            cmsModules: role.cmsModules || []
        }));
    } catch (error) {
        console.error("Failed to fetch roles:", error);
        return [];
    }
}

export async function updateRoleModules(roleId: string, modules: string[]) {
    console.log(`[RoleSettings] Updating role ${roleId} modules:`, modules);

    const hasAccess = await checkAdminAccess();
    if (!hasAccess) {
        console.warn("[RoleSettings] Access Denied for user");
        return { error: "Unauthorized: You do not have permission to modify roles." };
    }

    try {
        const result = await prismadb.role.update({
            where: { id: roleId },
            data: {
                cmsModules: modules
            }
        });
        console.log(`[RoleSettings] Update success for ${roleId}`, result);

        revalidatePath("/cms/settings");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update role modules:", error);
        return { error: error.message || "Failed to update modules due to a database error." };
    }
}

export async function createRole(name: string, description: string, color: string = "blue") {
    if (!await checkAdminAccess()) return { error: "Unauthorized" };

    try {
        await prismadb.role.create({
            data: {
                name,
                description,
                color,
                permissions: [],
                cmsModules: []
            }
        });

        revalidatePath("/cms/settings");
        return { success: true };
    } catch (error) {
        console.error("Failed to create role:", error);
        return { error: "Role creation failed (Name might be unique)" };
    }
}

export async function updateRoleDetails(roleId: string, data: { name?: string, description?: string, color?: string }) {
    if (!await checkAdminAccess()) return { error: "Unauthorized" };

    try {
        await prismadb.role.update({
            where: { id: roleId },
            data
        });

        revalidatePath("/cms/settings");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update role details:", error);
        return { error: error.message || "Failed to update role details" };
    }
}
