import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logActivity } from "@/actions/audit";
import { handleApiError } from "@/lib/api-error";

// GET - Fetch social settings (public)
export async function GET() {
    try {
        let settings = await prismadb.socialSettings.findFirst();

        // Create default settings if none exist
        if (!settings) {
            settings = await prismadb.socialSettings.create({
                data: {
                    xTwitterUrl: "https://x.com/BasaltAI",
                    discordUrl: "https://discord.gg/vARPqF84Zt",
                }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        return handleApiError(error, "SOCIAL_GET");
    }
}

// PUT - Update social settings (admin only)
export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await req.json();

        // Remove id from body to avoid Prisma errors
        // eslint-disable-next-line
        const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...updateData } = body;

        let settings = await prismadb.socialSettings.findFirst();

        if (!settings) {
            settings = await prismadb.socialSettings.create({ data: updateData });
        } else {
            settings = await prismadb.socialSettings.update({
                where: { id: settings.id },
                data: updateData
            });
        }

        await logActivity(
            "Updated Social Links",
            "Social Media",
            "Updated social media URLs"
        );

        revalidatePath("/");
        return NextResponse.json(settings);
    } catch (error) {
        console.log("[SOCIAL_PUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
