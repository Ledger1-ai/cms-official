import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prismadb } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    try {
        // Authenticate user
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Check if user has admin privileges
        // @ts-ignore
        if (!session.user.isAdmin) {
            return new NextResponse('Forbidden', { status: 403 });
        }



        const user = await prismadb.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                custom_features: true,
            },
        });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        return NextResponse.json({ features: user.custom_features || {} });

    } catch (error) {
        console.error('[USER_FEATURES_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // @ts-ignore
        if (!session.user.isAdmin) {
            return new NextResponse('Forbidden', { status: 403 });
        }

        const body = await request.json();
        const { features } = body;

        if (!features) {
            return new NextResponse('Missing features data', { status: 400 });
        }

        const updatedUser = await prismadb.users.update({
            where: {
                id: userId,
            },
            data: {
                custom_features: features,
            },
        });

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.error('[USER_FEATURES_PUT]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
