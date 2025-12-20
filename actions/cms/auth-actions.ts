"use server";

import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hash } from "bcryptjs";
import { logActivityInternal } from "@/actions/audit";

export async function updatePassword(password: string) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        if (password.length < 6) {
            return { success: false, error: "Password must be at least 6 characters" };
        }

        const hashedPassword = await hash(password, 12);

        await prismadb.users.update({
            where: { id: session.user.id },
            data: {
                password: hashedPassword,
                forcePasswordReset: false
            }
        });

        await logActivityInternal(
            session.user.id,
            "Changed Password",
            "Security",
            "User successfully changed their password"
        );

        return { success: true };
    } catch (error: any) {
        console.error("Failed to update password", error);
        return { success: false, error: "Failed to update password" };
    }
}
