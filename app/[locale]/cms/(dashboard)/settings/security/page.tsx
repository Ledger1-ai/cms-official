import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prismadb } from "@/lib/prisma";
import SecuritySettingsClient from "./SecuritySettingsClient";

export default async function SecurityPage() {
    const session = await getServerSession(authOptions);
    
    // 1. Immediate Session Check
    if (!session?.user?.email) {
        redirect("/cms/dashboard");
    }

    // 2. Strict DB Role Verification
    try {
        const user = await prismadb.users.findUnique({
            where: { email: session.user.email },
            include: { assigned_role: true }
        });

        const isOwner = session.user.email === "info@basalthq.com";
        const isAdmin = user?.assigned_role?.name === "Admin" || user?.is_admin === true;

        if (!isOwner && !isAdmin) {
            // Strict Gate: Bounce unauthorized users immediately
            redirect("/cms/dashboard");
        }
    } catch (error) {
        // Fail safe
        console.error("Security Page Access Error:", error);
        redirect("/cms/dashboard");
    }

    // 3. Render Client Component only if specific checks pass
    return <SecuritySettingsClient />;
}
