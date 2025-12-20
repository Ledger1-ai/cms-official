"use server";

import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";
import { logActivity } from "@/actions/audit";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: {
    name?: string;
    password?: string;
    timezone?: string;
    region?: string;
}) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) throw new Error("Unauthorized");

        const updateData: any = {};
        const changes: string[] = [];

        if (data.name) {
            updateData.name = data.name;
            changes.push("name");
        }

        if (data.password) {
            if (data.password.length < 6) throw new Error("Password must be at least 6 characters");
            const hashedPassword = await bcrypt.hash(data.password, 12);
            updateData.password = hashedPassword;
            changes.push("password");
        }

        if (data.timezone) {
            updateData.timezone = data.timezone;
            changes.push("timezone");
        }

        if (data.region) {
            updateData.region = data.region;
            changes.push("region");
        }

        if (Object.keys(updateData).length === 0) {
            return { success: true, message: "No changes made" };
        }

        await prismadb.users.update({
            where: { id: session.user.id },
            data: updateData,
        });

        // Log the activity
        await logActivity(
            "Updated Profile",
            "User Settings",
            `Updated ${changes.join(", ")}`
        );

        revalidatePath("/", "layout"); // Revalidate all layouts to update sidebar name
        return { success: true };
    } catch (error: any) {
        console.error("Profile update failed:", error);
        return { error: error.message || "Failed to update profile" };
    }
}
