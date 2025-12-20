"use server";

import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { logActivityInternal } from "@/actions/audit";

// CMS Modules available for toggling
const CMS_MODULES = [
    { slug: "dashboard", label: "Dashboard" },
    { slug: "applications", label: "Applications" },
    { slug: "blog", label: "Blog" },
    { slug: "careers", label: "Careers" },
    { slug: "docs", label: "Documentation" },
    { slug: "footer", label: "Footer" },
    { slug: "social", label: "Social Media" },
    { slug: "media", label: "Media Library" },
    { slug: "team", label: "Team & Admins" },
    { slug: "integrations", label: "Integrations" },
    { slug: "settings", label: "Settings" },
    { slug: "activity", label: "Activity Log" },
];

// GET: Fetch user's CMS modules
export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { userId } = await params;
        const user = await prismadb.users.findUnique({
            where: { id: userId },
            select: { cmsModules: true, name: true, email: true },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            modules: CMS_MODULES,
            enabledModules: user.cmsModules || [],
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("[CMS_MODULES_GET]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

// PUT: Update user's CMS modules
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { userId } = await params;
        const body = await request.json();
        const { enabledModules } = body;

        if (!Array.isArray(enabledModules)) {
            return NextResponse.json({ error: "Invalid modules array" }, { status: 400 });
        }

        // Validate modules
        const validSlugs = CMS_MODULES.map((m) => m.slug);
        const filtered = enabledModules.filter((m: string) => validSlugs.includes(m));

        const user = await prismadb.users.update({
            where: { id: userId },
            data: { cmsModules: filtered },
            select: { name: true, email: true, cmsModules: true },
        });

        // Log the activity
        if (session.user.id) {
            await logActivityInternal(
                session.user.id,
                "CMS Modules Updated",
                "Settings",
                `Updated CMS access for ${user.email}: ${filtered.join(", ")}`
            );
        }

        return NextResponse.json({
            success: true,
            enabledModules: user.cmsModules,
        });
    } catch (error) {
        console.error("[CMS_MODULES_PUT]", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
