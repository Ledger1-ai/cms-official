import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // data: Form data values
        // analytics: { source, medium, campaign, referrer, ip, userAgent }
        const { formId, data, analytics } = body;

        if (!formId || !data) {
            return new NextResponse("Form ID and Data are required", { status: 400 });
        }

        const form = await prismadb.form.findUnique({
            where: { id: formId }
        });

        if (!form) {
            return new NextResponse("Form not found", { status: 404 });
        }

        // Create the submission
        const submission = await prismadb.formSubmission.create({
            data: {
                formId,
                data,
                source: analytics?.source || "direct",
                medium: analytics?.medium,
                campaign: analytics?.campaign,
                referrer: analytics?.referrer,
                ipAddress: analytics?.ipAddress,
                userAgent: analytics?.userAgent
            }
        });

        // Create Support Ticket
        // 1. Try to extract common fields
        let name = "Anonymous";
        let email = "no-reply@basalthq.com";
        let subject = `New Submission: ${form.title}`;
        let message = `Form Submission for ${form.title}\n\n`;

        // Heuristic extraction
        const lowerKeys = Object.keys(data).reduce((acc, key) => {
            acc[key.toLowerCase()] = data[key];
            return acc;
        }, {} as any);

        if (lowerKeys['name'] || lowerKeys['fullname'] || lowerKeys['first name']) {
            name = lowerKeys['name'] || lowerKeys['fullname'] || `${lowerKeys['first name']} ${lowerKeys['last name'] || ''}`;
        }
        if (lowerKeys['email']) email = lowerKeys['email'];
        if (lowerKeys['subject']) subject = lowerKeys['subject'];
        if (lowerKeys['message']) message += lowerKeys['message'];

        // Append all data to message nicely
        message += "\n\n--- Form Data ---\n";
        for (const [key, value] of Object.entries(data)) {
            message += `**${key}**: ${value}\n`;
        }

        // Create the ticket
        const ticket = await prismadb.supportTicket.create({
            data: {
                source: "FORM",
                name,
                email,
                subject,
                message,
                status: "NEW",
                supportType: "GENERAL",
                formSubmission: {
                    connect: { id: submission.id }
                }
            }
        });

        // Link back just to be safe if Prisma didn't do it automatically (though connect should)
        await prismadb.formSubmission.update({
            where: { id: submission.id },
            data: { supportTicketId: ticket.id }
        });

        return NextResponse.json({ success: true, submissionId: submission.id, ticketId: ticket.id });

    } catch (error) {
        console.error("[FORM_SUBMIT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
