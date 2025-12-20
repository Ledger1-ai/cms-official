import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";

// GET handler (from previous step) remains implicitly available if we just append to the file or rewrite it.
// Next.js App Router allows multiple method exports in the same route file.

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const validUser = await prismadb.users.findUnique({
            where: { id: session.user.id },
            select: { googleApiKey: true }
        });

        const tokens = await prismadb.gmail_Tokens.findMany({
            where: {
                user: session.user.id,
            },
            select: {
                provider: true,
            },
        });

        const connectedProviders: Record<string, boolean> = {};

        tokens.forEach((token) => {
            connectedProviders[token.provider.toLowerCase()] = true;
        });

        // Legacy Nano Banana / Gemini Key Check
        if (validUser?.googleApiKey) {
            connectedProviders["google"] = true;
        }

        return NextResponse.json(connectedProviders);
    } catch (error) {
        console.error("[SOCIAL_STATUS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const provider = searchParams.get("provider");

        if (!provider) {
            return new NextResponse("Missing provider param", { status: 400 });
        }

        // Map UI provider ID to DB provider ID if necessary
        // UI IDs: "twitter", "linkedin", "microsoft" -> DB: "twitter", "linkedin", "azure-ad"
        const providerMap: Record<string, string> = {
            "twitter": "twitter",
            "linkedin": "linkedin",
            "microsoft": "azure-ad",
            "github": "github",
            "google_social": "google",
        };

        const dbProvider = (providerMap[provider] || provider).toLowerCase();

        await prismadb.gmail_Tokens.deleteMany({
            where: {
                user: session.user.id,
                provider: dbProvider
            }
        });

        // LOGGING
        await prismadb.systemActivity.create({
            data: {
                userId: session.user.id,
                action: "Disconnected Social Account",
                resource: "Social Integration",
                details: `Disconnected ${dbProvider} account`
            }
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("[SOCIAL_STATUS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
