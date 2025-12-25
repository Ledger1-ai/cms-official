import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

/**
 * GET /api/cms/apps/[providerId]/status
 * Returns the connection status for a specific app provider.
 */
export async function GET(
    req: Request,
    { params }: { params: Promise<{ providerId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { providerId } = await params;

        const connection = await prismadb.appConnection.findFirst({
            where: {
                userId: session.user.id,
                providerId,
                isActive: true
            },
            select: {
                id: true,
                providerId: true,
                displayName: true,
                category: true,
                isActive: true,
                profileName: true,
                profileHandle: true,
                profileAvatarUrl: true,
                config: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if (!connection) {
            return NextResponse.json({
                connected: false,
                connection: null
            });
        }

        return NextResponse.json({
            connected: true,
            connection
        });

    } catch (error) {
        console.error(`[APP_STATUS_GET]`, error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
