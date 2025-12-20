import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prisma";

// GET /api/v1/forms/[formId]
// Retrieve form configuration/schema (Headless Form)
export async function GET(
    req: Request,
    { params }: { params: { formId: string } }
) {
    try {
        if (!params.formId) {
            return new NextResponse("Form ID Required", { status: 400 });
        }

        const form = await prismadb.form.findUnique({
            where: { id: params.formId }
        });

        if (!form) {
            return new NextResponse("Form not found", { status: 404 });
        }

        // Return public configuration
        return NextResponse.json({
            id: form.id,
            title: form.title,
            description: form.description,
            status: form.status,
            config: form.content, // The fields schema
            project: form.project,
            createdAt: form.createdAt
        });

    } catch (error) {
        console.error("[FORM_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// POST /api/v1/forms/[formId]
// Submit data to the form
export async function POST(
    req: Request,
    { params }: { params: { formId: string } }
) {
    try {
        const body = await req.json();
        const { data, analytics } = body;
        const formId = params.formId;

        if (!formId) {
            return new NextResponse("Form ID Required", { status: 400 });
        }

        const form = await prismadb.form.findUnique({
            where: { id: formId }
        });

        if (!form) {
            return new NextResponse("Form not found", { status: 404 });
        }

        if (form.status !== "ACTIVE") {
            return new NextResponse("Form is not active", { status: 403 });
        }

        // Create the submission
        const submission = await prismadb.formSubmission.create({
            data: {
                formId,
                data: data || {}, // Flexibly accept whatever
                source: analytics?.source || "api",
                medium: analytics?.medium,
                campaign: analytics?.campaign,
                referrer: analytics?.referrer,
                ipAddress: analytics?.ipAddress,
                userAgent: req.headers.get("user-agent") || analytics?.userAgent
            }
        });

        // OPTIONAL: Integrate Support Ticket creation similar to the main route
        // For efficiency, we'll keep it simple here, or we can copy the logic if needed.
        // Let's assume for "Endpoint per form" users might want standard webhook-like behavior first.
        // But to maintain consistency with the app, let's minimally create the ticket link if possible.

        // ... (Ticket creation logic omitted for brevity unless requested, can be added)

        return NextResponse.json({
            success: true,
            id: submission.id,
            message: "Submission received"
        });

    } catch (error) {
        console.error("[FORM_SUBMIT_V1]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
