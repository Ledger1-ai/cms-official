import { NextResponse } from 'next/server';
import { prismadb } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, phone, company, supportType, subject, message, attachmentUrl, source } = body;

        if (!firstName || !lastName || !email || !message) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // Combine name for legacy support or display
        const fullName = `${firstName} ${lastName}`;

        // @ts-ignore
        const ticket = await prismadb.supportTicket.create({
            data: {
                name: fullName,
                firstName,
                lastName,
                email,
                phone,
                company,
                supportType: supportType || "GENERAL",
                subject: subject || "No Subject",
                message,
                attachmentUrl,
                source: source || "UNKNOWN",
                status: "NEW"
            }
        });

        // Log system activity (optional, but good for tracking)
        // Ignoring to keep it simple or maybe logging as system?
        // Let's just return success.

        return NextResponse.json(ticket);
    } catch (error) {
        console.error("[SUPPORT_CREATE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
