import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import { AppCategory } from "@prisma/client";

export async function POST(req: NextRequest) {
    try {
        // @ts-ignore
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { appId, category, credentials, config, displayName } = body;

        if (!appId || !credentials) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        let validCategory: AppCategory = "UTILITY";
        if (category && Object.values(AppCategory).includes(category as AppCategory)) {
            validCategory = category as AppCategory;
        }

        // Check for existing connection
        const existingConnection = await prismadb.appConnection.findFirst({
            where: {
                // @ts-ignore - Trusting session.user has id when authenticated
                userId: (session.user as any).id,
                providerId: appId
            }
        });

        if (existingConnection) {
            // Update
            const updated = await prismadb.appConnection.update({
                where: { id: existingConnection.id },
                data: {
                    credentials,
                    config: config || {},
                    displayName: displayName || existingConnection.displayName,
                    updatedAt: new Date(),
                    isActive: true
                }
            });
            return NextResponse.json(updated);
        } else {
            // Create
            const created = await prismadb.appConnection.create({
                data: {
                    // @ts-ignore
                    userId: (session.user as any).id,
                    providerId: appId,
                    category: validCategory,
                    displayName: displayName || appId,
                    credentials,
                    config: config || {},
                    isActive: true
                }
            });
            return NextResponse.json(created);
        }

    } catch (error) {
        console.error("[APP_CONFIGURE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
