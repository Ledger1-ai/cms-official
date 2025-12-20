import { NextResponse } from 'next/server';
import { prismadb } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { eventType, sourceUrl, destinationUrl, sharePlatform, visitorId } = body;

        // Validate required fields
        if (!eventType || !sourceUrl) {
            return NextResponse.json(
                { error: 'eventType and sourceUrl are required' },
                { status: 400 }
            );
        }

        // Validate event type
        if (!['CLICK', 'SHARE'].includes(eventType)) {
            return NextResponse.json(
                { error: 'eventType must be CLICK or SHARE' },
                { status: 400 }
            );
        }

        // Validate that CTR events have destinationUrl
        if (eventType === 'CLICK' && !destinationUrl) {
            return NextResponse.json(
                { error: 'destinationUrl is required for CLICK events' },
                { status: 400 }
            );
        }

        // Validate that Share events have sharePlatform
        if (eventType === 'SHARE' && !sharePlatform) {
            return NextResponse.json(
                { error: 'sharePlatform is required for SHARE events' },
                { status: 400 }
            );
        }

        // @ts-ignore - BlogEvent model may not be recognized until prisma generate
        await prismadb.blogEvent.create({
            data: {
                eventType,
                sourceUrl,
                destinationUrl: destinationUrl || null,
                sharePlatform: sharePlatform || null,
                visitorId: visitorId || null,
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[BLOG_EVENTS_TRACK_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// GET endpoint for fetching blog events (admin use)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit') || '100');
        const eventType = searchParams.get('eventType');

        const whereClause: any = {};
        if (eventType) {
            whereClause.eventType = eventType;
        }

        // @ts-ignore
        const events = await prismadb.blogEvent.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error("[BLOG_EVENTS_GET_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
