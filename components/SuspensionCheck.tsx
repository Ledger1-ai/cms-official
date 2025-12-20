import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import SuspendedOverlay from "@/components/SuspendedOverlay";

const SuspensionCheck = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return null;

        // Wrap DB call in a timeout (e.g. 2000ms) to prevent hanging
        const user = await Promise.race([
            prismadb.users.findUnique({
                where: { id: session.user.id },
                include: { assigned_team: true }
            }),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("SuspensionCheck DB Timeout")), 2000)
            )
        ]) as any;

        if (user?.assigned_team?.status === "SUSPENDED") {
            return <SuspendedOverlay reason={user.assigned_team.suspension_reason} />;
        }
    } catch (error) {
        console.error("SuspensionCheck failed:", error);
        // Fail open - do not block the UI if check fails
        return null;
    }

    return null;
};

export default SuspensionCheck;
