import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        // Admin check (consistent with main config route)
        if (!session?.user?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { provider } = body;

        if (!provider) {
            return NextResponse.json({ error: "Provider is required" }, { status: 400 });
        }

        // Transaction to ensure atomicity
        await prismadb.$transaction([
            // 1. Disable ALL configs first
            prismadb.systemAiConfig.updateMany({
                data: { isActive: false }
            }),
            // 2. Enable the selected one
            prismadb.systemAiConfig.update({
                where: { provider: provider },
                data: { isActive: true }
            }),
            // 3. Log the activity
            prismadb.systemActivity.create({
                data: {
                    userId: session.user.id,
                    action: "SET_ACTIVE_AI_PROVIDER",
                    resource: "SYSTEM_AI_CONFIG",
                    details: `Switched Primary System Model to ${provider}`
                }
            })
        ]);

        return NextResponse.json({ success: true, activeProvider: provider });

    } catch (error) {
        console.error("[SYSTEM_AI_SET_ACTIVE]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
