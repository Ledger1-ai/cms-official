"use server";

import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getSecuritySettings() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return null;

    // Strict DB Check
    const user = await prismadb.users.findUnique({
        where: { email: session.user.email },
        include: { assigned_role: true }
    });

    const isOwner = session.user.email === "info@basalthq.com";
    const isAdmin = user?.assigned_role?.name === "Admin" || user?.is_admin === true;

    if (!isOwner && !isAdmin) {
        return null;
    }

    try {
        let config = await prismadb.systemSecurityConfig.findFirst();

        if (!config) {
            config = await prismadb.systemSecurityConfig.create({
                data: {
                    twoFactor: true,
                    publicRegistration: false,
                    sessionTimeout: true,
                    ipWhitelist: false,
                    auditLog: true,
                    strongPasswords: true,
                    whitelistedIps: []
                }
            });
        }
        return config;
    } catch (error) {
        console.error("Failed to fetch security settings:", error);
        return null;
    }
}

export async function updateSecuritySettings(data: {
    twoFactor?: boolean;
    publicRegistration?: boolean;
    sessionTimeout?: boolean;
    ipWhitelist?: boolean;
    auditLog?: boolean;
    strongPasswords?: boolean;
    whitelistedIps?: string[];
}) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { error: "Unauthorized" };

    // Strict DB Check
    const user = await prismadb.users.findUnique({
        where: { email: session.user.email },
        include: { assigned_role: true }
    });

    const isOwner = session.user.email === "info@basalthq.com";
    const isAdmin = user?.assigned_role?.name === "Admin" || user?.is_admin === true;

    if (!isOwner && !isAdmin) {
        return { error: "Unauthorized" };
    }

    try {
        // Upsert approach (update first found or create)
        // Since findFirst doesn't support update, we find first then update by ID
        let config = await prismadb.systemSecurityConfig.findFirst();

        if (config) {
            await prismadb.systemSecurityConfig.update({
                where: { id: config.id },
                data: { ...data }
            });
        } else {
            await prismadb.systemSecurityConfig.create({
                data: {
                    twoFactor: true,
                    publicRegistration: false,
                    sessionTimeout: true,
                    ipWhitelist: false,
                    auditLog: true,
                    strongPasswords: true,
                    whitelistedIps: [],
                    ...data
                }
            });
        }

        revalidatePath("/cms/settings/security");
        return { success: true };
    } catch (error) {
        console.error("Failed to update security settings:", error);
        return { error: "Failed to update settings" };
    }
}

export async function performSecurityKillSwitch() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    // Strict DB Check
    const user = await prismadb.users.findUnique({
        where: { email: session.user.email },
        include: { assigned_role: true }
    });

    const isOwner = session.user.email === "info@basalthq.com";
    const isAdmin = user?.assigned_role?.name === "Admin" || user?.is_admin === true;

    if (!isOwner && !isAdmin) {
        throw new Error("Unauthorized - Security Level Too Low");
    }

    try {
        console.log("INITIATING SECURITY KILL SWITCH - REQUESTED BY " + session.user.email);

        // 1. Disable all System AI Configs
        await prismadb.systemAiConfig.updateMany({
            data: { isActive: false }
        });

        // 2. Disable all User AI Configs
        await prismadb.userAiConfig.updateMany({
            data: { isActive: false }
        });

        // 3. Disable all App Connections (OAuth Apps)
        await prismadb.appConnection.updateMany({
            data: { isActive: false }
        });

        // 4. Delete all Gmail/Social Tokens (System-wide disconnect)
        // using deleteMany on gmail_Tokens
        await prismadb.gmail_Tokens.deleteMany({});

        // 5. Update Security Config to reflect state (optional, but good for UI)
        // For now just logging
        console.log("KILL SWITCH EXECUTED SUCCESSFULLY");

        revalidatePath("/cms/settings/security");
        return { success: true, message: "All AI models disabled and integrations disconnected." };
    } catch (error) {
        console.error("KILL SWITCH FAILED:", error);
        return { success: false, error: "Critical failure during kill switch execution." };
    }
}
