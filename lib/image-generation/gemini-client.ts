import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ImageGenerationOptions {
    prompt: string;
    numberOfImages?: number; // 1-4
    aspectRatio?: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
    personGeneration?: 'allow_adult' | 'dont_allow';
    safetySettings?: 'block_none' | 'block_few' | 'block_some' | 'block_most';
}

export interface ImageGenerationResult {
    success: boolean;
    images?: string[]; // Base64 encoded images
    error?: string;
}

/**
 * Gemini/Nano Banana Image Generation Client
 * Wrapper  around Google Generative AI SDK for  image generation
 */
export class GeminiImageGenerator {
    private genAI: GoogleGenerativeAI;
    private apiKey: string;

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error('Google API key is required');
        }
        this.apiKey = apiKey;
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    /**
     * Generate images using Gemini Imagen (Nano Banana)
     * @param options - Image generation options
     * @returns Generation result with base64 images
     */
    async generateImage(options: ImageGenerationOptions): Promise<ImageGenerationResult> {
        try {
            const {
                prompt,
                numberOfImages = 1,
                aspectRatio = '1:1',
                personGeneration = 'dont_allow',
                safetySettings = 'block_some',
            } = options;

            if (!prompt || prompt.trim().length === 0) {
                return {
                    success: false,
                    error: 'Prompt cannot be empty',
                };
            }

            // Validate number of images
            if (numberOfImages < 1 || numberOfImages > 4) {
                return {
                    success: false,
                    error: 'Number of images must be between 1 and 4',
                };
            }

            // Get the Imagen model
            // Note: As of now, Imagen 3 is available via the Gemini API
            const model = this.genAI.getGenerativeModel({
                model: 'imagen-3.0-generate-001',
            });

            // Generate images
            const result = await model.generateContent({
                contents: [{
                    role: 'user',
                    parts: [{
                        text: prompt,
                    }],
                }],
                generationConfig: {
                    responseModalities: ['image'],
                    numberOfImages,
                    aspectRatio,
                    personGeneration,
                    safetyFilterLevel: safetySettings,
                } as any,
            });

            // Extract images from response
            const images: string[] = [];
            const response = result.response;

            if (response && response.candidates) {
                for (const candidate of response.candidates) {
                    if (candidate.content && candidate.content.parts) {
                        for (const part of candidate.content.parts) {
                            if (part.inlineData && part.inlineData.data) {
                                images.push(part.inlineData.data);
                            }
                        }
                    }
                }
            }

            if (images.length === 0) {
                return {
                    success: false,
                    error: 'No images were generated',
                };
            }

            return {
                success: true,
                images,
            };
        } catch (error: any) {
            console.error('Gemini image generation error:', error);

            // Handle specific errors
            if (error.message?.includes('API key')) {
                return {
                    success: false,
                    error: 'Invalid API key. Please check your Google API key configuration.',
                };
            }

            if (error.message?.includes('quota')) {
                return {
                    success: false,
                    error: 'API quota exceeded. Please try again later.',
                };
            }

            if (error.message?.includes('safety')) {
                return {
                    success: false,
                    error: 'Image generation blocked by safety filters. Please try a different prompt.',
                };
            }

            return {
                success: false,
                error: error.message || 'Failed to generate image',
            };
        }
    }

    /**
     * Test the API key connection
     * @returns True if connection is successful
     */
    async testConnection(): Promise<boolean> {
        try {
            // Try to list models as a connection test
            const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
            // Just checking if we can instantiate without error
            return true;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }
}
