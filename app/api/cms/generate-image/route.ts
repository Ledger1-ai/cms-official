import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
// Force rebuild
import { prismadb } from '@/lib/prisma';
import { decryptApiKey } from '@/lib/encryption/api-keys';
import { GeminiImageGenerator, ImageGenerationOptions } from '@/lib/image-generation/gemini-client';

/**
 * POST /api/cms/generate-image
 * Generate images using user's Google API key and Gemini Imagen
 */
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get user's encrypted API key
        const user = await prismadb.users.findUnique({
            where: { email: session.user.email },
            select: {
                googleApiKey: true,
            },
        });

        if (!user || !user.googleApiKey) {
            return NextResponse.json(
                {
                    error: 'No Google API key configured. Please configure your API key in Settings > Integrations.',
                    code: 'NO_API_KEY'
                },
                { status: 400 }
            );
        }

        // Decrypt the API key
        let apiKey: string;
        try {
            apiKey = decryptApiKey(user.googleApiKey);
        } catch (error) {
            return NextResponse.json(
                { error: 'Failed to decrypt API key. Please reconfigure your API key.' },
                { status: 500 }
            );
        }

        // Parse request body
        const body = await req.json();
        const {
            prompt,
            numberOfImages = 1,
            aspectRatio = '1:1',
            personGeneration = 'dont_allow',
            safetySettings = 'block_some',
        } = body as ImageGenerationOptions;

        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        // Create Gemini client and generate image
        const geminiClient = new GeminiImageGenerator(apiKey);
        const result = await geminiClient.generateImage({
            prompt,
            numberOfImages,
            aspectRatio,
            personGeneration,
            safetySettings,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || 'Image generation failed' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                images: result.images,
                prompt,
                numberOfImages: result.images?.length || 0,
            },
        });
    } catch (error: any) {
        console.error('Image generation error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/cms/generate-image/test
 * Test the user's Google API key connection
 */
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get user's encrypted API key
        const user = await prismadb.users.findUnique({
            where: { email: session.user.email },
            select: {
                googleApiKey: true,
            },
        });

        if (!user || !user.googleApiKey) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'No Google API key configured'
                },
                { status: 400 }
            );
        }

        // Decrypt and test connection
        try {
            const apiKey = decryptApiKey(user.googleApiKey);
            const geminiClient = new GeminiImageGenerator(apiKey);
            const isConnected = await geminiClient.testConnection();

            return NextResponse.json({
                success: isConnected,
                message: isConnected
                    ? 'Connection successful'
                    : 'Connection failed. Please check your API key.',
            });
        } catch (error) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid API key or connection failed'
                },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error('Connection test error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
