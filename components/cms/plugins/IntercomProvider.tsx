import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { IntercomScript } from "./IntercomScript";

export async function IntercomProvider() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;

    const connection = await prismadb.appConnection.findFirst({
        where: {
            providerId: "intercom",
            userId: (session.user as any).id,
            isActive: true
        }
    });

    if (!connection || !connection.credentials) return null;

    const { appId } = connection.credentials as { appId?: string };

    if (!appId) return null;

    return <IntercomScript appId={appId} />;
}
