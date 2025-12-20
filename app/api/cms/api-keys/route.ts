import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
// Force rebuild
import { prismadb } from '@/lib/prisma';
import { encryptApiKey, decryptApiKey, maskApiKey, validateGoogleApiKey } from '@/lib/encryption/api-keys';

type Provider = 'google' | 'openai' | 'anthropic' | 'mistral' | 'perplexity';

const PROVIDER_FIELD_MAP: Record<Provider, { key: string, date: string }> = {
    google: { key: 'googleApiKey', date: 'googleApiKeyUpdatedAt' },
    openai: { key: 'openaiApiKey', date: 'openaiApiKeyUpdatedAt' },
    anthropic: { key: 'anthropicApiKey', date: 'anthropicApiKeyUpdatedAt' },
    mistral: { key: 'mistralApiKey', date: 'mistralApiKeyUpdatedAt' },
    perplexity: { key: 'perplexityApiKey', date: 'perplexityApiKeyUpdatedAt' },
};

/**
 * GET /api/cms/api-keys
 * Retrieve user's API keys (masked)
 */
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prismadb.users.findUnique({
            where: { email: session.user.email },
            select: {
                googleApiKey: true,
                googleApiKeyUpdatedAt: true,
                openaiApiKey: true,
                openaiApiKeyUpdatedAt: true,
                anthropicApiKey: true,
                anthropicApiKeyUpdatedAt: true,
                mistralApiKey: true,
                mistralApiKeyUpdatedAt: true,
                perplexityApiKey: true,
                perplexityApiKeyUpdatedAt: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const responseData: Record<string, any> = {};

        // Process all providers
        (Object.keys(PROVIDER_FIELD_MAP) as Provider[]).forEach((provider) => {
            const fieldMap = PROVIDER_FIELD_MAP[provider];
            // @ts-ignore - dynamic access to user object
            const encryptedKey = user[fieldMap.key];
            // @ts-ignore
            const updatedAt = user[fieldMap.date];

            const hasKey = !!encryptedKey;

            responseData[provider] = {
                configured: hasKey,
                masked: hasKey ? maskApiKey(decryptApiKey(encryptedKey)) : null,
                updatedAt: updatedAt,
            };
        });

        return NextResponse.json({
            success: true,
            data: responseData,
        });
    } catch (error) {
        console.error('Error fetching API keys:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * POST /api/cms/api-keys
 * Save or update user's API keys
 */
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { provider, apiKey } = body;

        if (!provider || !apiKey) {
            return NextResponse.json({ error: 'Provider and API key are required' }, { status: 400 });
        }

        if (!Object.keys(PROVIDER_FIELD_MAP).includes(provider)) {
            return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
        }

        // Basic validation based on provider prefix
        if (provider === 'google' && !validateGoogleApiKey(apiKey)) {
            return NextResponse.json({ error: 'Invalid Google key format (starts with AIza...)' }, { status: 400 });
        }
        if (provider === 'openai' && !apiKey.startsWith('sk-')) {
            // OpenAI keys usually start with sk-
            // Loosening check slightly as they change formats, but sk- is standard
            return NextResponse.json({ error: 'Invalid OpenAI key format (usually starts with sk-)' }, { status: 400 });
        }
        if (provider === 'anthropic' && !apiKey.startsWith('sk-ant-')) {
            return NextResponse.json({ error: 'Invalid Anthropic key format (starts with sk-ant-)' }, { status: 400 });
        }

        const encryptedKey = encryptApiKey(apiKey);
        const fieldMap = PROVIDER_FIELD_MAP[provider as Provider];

        // Dynamic update
        const updateData = {
            [fieldMap.key]: encryptedKey,
            [fieldMap.date]: new Date(),
        };

        await prismadb.users.update({
            where: { email: session.user.email },
            data: updateData,
        });

        return NextResponse.json({
            success: true,
            message: `${provider} API key saved successfully`,
            data: {
                provider,
                configured: true,
                masked: maskApiKey(apiKey),
                updatedAt: new Date(),
            },
        });
    } catch (error) {
        console.error('Error saving API key:', error);
        return NextResponse.json({ error: 'Failed to save API key' }, { status: 500 });
    }
}

/**
 * DELETE /api/cms/api-keys
 * Remove user's API key
 */
export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const provider = searchParams.get('provider');

        if (!provider || !Object.keys(PROVIDER_FIELD_MAP).includes(provider)) {
            return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
        }

        const fieldMap = PROVIDER_FIELD_MAP[provider as Provider];

        const updateData = {
            [fieldMap.key]: null,
            [fieldMap.date]: null,
        };

        await prismadb.users.update({
            where: { email: session.user.email },
            data: updateData,
        });

        return NextResponse.json({
            success: true,
            message: `${provider} API key removed successfully`,
        });
    } catch (error) {
        console.error('Error deleting API key:', error);
        return NextResponse.json({ error: 'Failed to delete API key' }, { status: 500 });
    }
}
