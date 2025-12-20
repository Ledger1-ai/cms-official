import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/actions/audit";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const project = searchParams.get("project");
        const limit = searchParams.get("limit");

        // Simple auth check - adjust based on your auth implementation
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const forms = await prismadb.form.findMany({
            where: {
                ...(project ? { project } : {}),
            },
            include: {
                _count: {
                    select: { submissions: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            ...(limit ? { take: parseInt(limit) } : {})
        });

        return NextResponse.json(forms);
    } catch (error) {
        console.error("[FORMS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { title, description, project, content, isPublic } = body;

        if (!title) {
            return new NextResponse("Title is required", { status: 400 });
        }

        const form = await prismadb.form.create({
            data: {
                title,
                description,
                project,
                content,
                isPublic: isPublic || false,
                status: body.status || "DRAFT",
                createdById: session.user.id
            }
        });

        await logActivity("CREATE_FORM", "Form", `Created form: ${title}`);

        return NextResponse.json(form);
    } catch (error) {
        console.error("[FORMS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { id, title, description, project, content, isPublic } = body;

        if (!id) {
            return new NextResponse("ID is required", { status: 400 });
        }

        const form = await prismadb.form.update({
            where: { id },
            data: {
                title,
                description,
                project,
                content,
                isPublic,
                status: body.status // Allow updating status
            }
        });

        await logActivity("UPDATE_FORM", "Form", `Updated form: ${title || form.title}`);

        return NextResponse.json(form);

    } catch (error) {
        console.error("[FORMS_PUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return new NextResponse("ID is required", { status: 400 });
        }

        await prismadb.form.delete({
            where: { id }
        });

        await logActivity("DELETE_FORM", "Form", `Deleted form ID: ${id}`);

        return new NextResponse("Deleted", { status: 200 });

    } catch (error) {
        console.error("[FORMS_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
