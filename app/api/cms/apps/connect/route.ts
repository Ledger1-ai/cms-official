import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import { logActivityInternal } from "@/actions/audit";
import { encryptApiKey } from "@/lib/encryption/api-keys";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const { providerId, displayName, category, credentials } = body;

        if (!providerId || !credentials) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        // Check for existing active connection
        const existing = await prismadb.appConnection.findFirst({
            where: {
                userId: session.user.id,
                providerId,
                isActive: true
            }
        });

        if (existing) {
            return NextResponse.json({ error: "App already connected" }, { status: 409 });
        }

        // Encrypt sensitive fields
        const safeCredentials = { ...credentials };

        if (safeCredentials.key) {
            safeCredentials.key = encryptApiKey(safeCredentials.key);
        }
        if (safeCredentials.secret) {
            safeCredentials.secret = encryptApiKey(safeCredentials.secret);
        }
        if (safeCredentials.accessToken) {
            safeCredentials.accessToken = encryptApiKey(safeCredentials.accessToken);
        }

        const connection = await prismadb.appConnection.create({
            data: {
                userId: session.user.id,
                providerId,
                displayName: displayName || providerId,
                category,
                credentials: safeCredentials,
                isActive: true
            }
        });

        await logActivityInternal(
            session.user.id,
            "CONNECT_APP",
            "APPS",
            `Connected ${displayName} (${providerId})`
        );

        return NextResponse.json({ success: true, connection });

    } catch (error) {
        console.error("[APPS_CONNECT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
