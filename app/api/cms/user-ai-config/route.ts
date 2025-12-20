import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prismadb } from '@/lib/prisma';
import { encryptApiKey, decryptApiKey, maskApiKey } from '@/lib/encryption/api-keys';
import { AiProvider } from '@prisma/client';

/**
 * GET /api/cms/user-ai-config
 * Retrieve all configured user AI providers
 */
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prismadb.users.findUnique({
            where: { email: session.user.email },
            include: { ai_configs: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const configs: Record<string, any> = {};

        user.ai_configs.forEach(config => {
            configs[config.provider] = {
                configured: true,
                masked: maskApiKey(decryptApiKey(config.apiKey)),
                configuration: config.configuration,
                isActive: config.isActive
            };
        });

        return NextResponse.json({ success: true, data: configs });
    } catch (error) {
        console.error('Error fetching user AI configs:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * POST /api/cms/user-ai-config
 * Upsert a user AI provider configuration
 */
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { provider, apiKey, configuration } = body;

        if (!provider || !apiKey) {
            return NextResponse.json({ error: 'Provider and API Key required' }, { status: 400 });
        }

        const user = await prismadb.users.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Validate Provider enum
        const providerEnum = provider.toUpperCase() as AiProvider;
        if (!Object.values(AiProvider).includes(providerEnum)) {
            return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
        }

        const encryptedKey = encryptApiKey(apiKey);

        const config = await prismadb.userAiConfig.upsert({
            where: {
                userId_provider: {
                    userId: user.id,
                    provider: providerEnum
                }
            },
            update: {
                apiKey: encryptedKey,
                configuration: configuration || {},
                isActive: true
            },
            create: {
                userId: user.id,
                provider: providerEnum,
                apiKey: encryptedKey,
                configuration: configuration || {},
                isActive: true
            }
        });



        // LOGGING
        await prismadb.systemActivity.create({
            data: {
                userId: user.id,
                action: "Updated User AI Config",
                resource: "User AI Config",
                details: `Updated configuration for ${providerEnum} (active: true)`
            }
        });

        return NextResponse.json({
            success: true,
            data: {
                provider: providerEnum,
                configured: true,
                masked: maskApiKey(apiKey)
            }
        });

    } catch (error) {
        console.error('Error saving user AI config:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * DELETE /api/cms/user-ai-config
 * Remove a configuration
 */
export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const provider = searchParams.get('provider');

        if (!provider) {
            return NextResponse.json({ error: 'Provider required' }, { status: 400 });
        }

        const user = await prismadb.users.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        await prismadb.userAiConfig.deleteMany({
            where: {
                userId: user.id,
                provider: provider.toUpperCase() as AiProvider
            }
        });



        // LOGGING
        await prismadb.systemActivity.create({
            data: {
                userId: user.id,
                action: "Deleted User AI Config",
                resource: "User AI Config",
                details: `Deleted configuration for ${provider.toUpperCase()}`
            }
        });

        return NextResponse.json({ success: true, message: 'Configuration removed' });

    } catch (error) {
        console.error('Error deleting user AI config:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
