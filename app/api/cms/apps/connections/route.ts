import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import { logActivityInternal } from "@/actions/audit";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const connections = await prismadb.appConnection.findMany({
            where: {
                userId: session.user.id,
                isActive: true
            },
            select: {
                id: true,
                providerId: true,
                displayName: true,
                category: true,
                createdAt: true
            }
        });

        return NextResponse.json({ connections });
    } catch (error) {
        console.error("[APPS_CONNECTIONS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const { searchParams } = new URL(req.url);
        const providerId = searchParams.get("providerId");

        if (!providerId) return new NextResponse("Provider ID required", { status: 400 });

        const connection = await prismadb.appConnection.findFirst({
            where: {
                userId: session.user.id,
                providerId,
                isActive: true
            }
        });

        if (!connection) return new NextResponse("Connection not found", { status: 404 });

        await prismadb.appConnection.delete({
            where: { id: connection.id }
        });

        await logActivityInternal(
            session.user.id,
            "DISCONNECT_APP",
            "APPS",
            `Disconnected ${connection.displayName} (${providerId})`
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[APPS_CONNECTIONS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
