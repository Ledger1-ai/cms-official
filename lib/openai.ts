import { createAzure } from "@ai-sdk/azure";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { prismadb } from "@/lib/prisma";
import { decryptApiKey } from "@/lib/encryption/api-keys";

export function isReasoningModel(modelId: string | undefined | null): boolean {
    if (!modelId) return false;
    // o1 models (OpenAI) do not support temperature. gpt-5 might not either.
    return modelId.toLowerCase().includes("o1") || modelId.toLowerCase().includes("gpt-5");
}

import { createAnthropic } from "@ai-sdk/anthropic";
import { createMistral } from "@ai-sdk/mistral";
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";

// ... existing imports

export async function getAiSdkModel(userId: string | "system", preferredProvider?: string | any) {
    // 0. CHECK DB CONFIGURATION (Unified AI Config)
    try {
        const configs = await prismadb.systemAiConfig.findMany({
            where: { isActive: true }
        });

        // Convert to map for easy access
        const configMap = configs.reduce((acc, conf) => {
            acc[conf.provider] = conf;
            return acc;
        }, {} as Record<string, any>);

        // Helper to SAFELY decrypt if needed
        const getDecryptedKey = (key: string) => {
            if (!key) return "";

            // CRITICAL FIX: Detection of corrupted/masked keys
            // If the key contains multiple asterisks, it was likely saved as a masked string from the UI.
            // In this case, we treat it as INVALID so we fall back to .env logic.
            if (key.includes("***")) {
                console.warn("[getAiSdkModel] Detected masked/hidden key in DB. Ignoring and falling back to environment variables.");
                return "";
            }

            // Check for potential encryption format (IV:Hex)
            if (key.includes(':') && key.length > 32) {
                try {
                    return decryptApiKey(key);
                } catch (e) {
                    // Fallback to raw if not actually encrypted or failed
                    return key;
                }
            }
            return key;
        };

        // 0. CHECK DB CONFIGURATION (Unified AI Config)
        // Helper to create SDK model
        const createModelFromConfig = (conf: any, overrideModelId?: string) => {
            const { provider, apiKey, defaultModelId, baseUrl, configuration } = conf;
            const finalApiKey = getDecryptedKey(apiKey);

            // ... (rest of key checks)
            if (!finalApiKey && !["OLLAMA", "AWS"].includes(provider)) {
                return null;
            }

            const modelId = overrideModelId || defaultModelId || "gpt-4o";

            console.log(`[getAiSdkModel] Using Provider: ${provider}, Model: ${modelId}`);

            if (provider === "ANTHROPIC") {
                const anthropic = createAnthropic({ apiKey: finalApiKey, baseURL: baseUrl });
                return anthropic(modelId);
            }
            if (provider === "GOOGLE") {
                const google = createGoogleGenerativeAI({ apiKey: finalApiKey, baseURL: baseUrl });
                return google(modelId);
            }
            if (provider === "MISTRAL") {
                const mistral = createMistral({ apiKey: finalApiKey, baseURL: baseUrl });
                return mistral(modelId);
            }
            if (provider === "OPENAI") {
                const openai = createOpenAI({ apiKey: finalApiKey, baseURL: baseUrl });
                return openai(modelId);
            }
            if (provider === "AWS") {
                const region = configuration?.region || "us-east-1";
                const accessKeyId = configuration?.accessKeyId;
                const secretAccessKey = finalApiKey;
                if (!accessKeyId || !secretAccessKey) return null;
                const bedrock = createAmazonBedrock({ region, accessKeyId, secretAccessKey });
                return bedrock(modelId);
            }
            if (provider === "AZURE") {
                // ... Azure Logic (Simplified for brevity, reusing existing structure but passing modelId)
                // NOTE: The previous complex Azure logic needs to be preserved or readapted. 
                // To minimize risk, I will rely on the fact that we can re-use the *same* logic block 
                // if I can refactor it slightly.
                // Actually, simpler: I'll just let the original logic run but use `modelId` variable I defined above.
                // But wait, the original logic is inline in the huge function.
                // I should likely just update the `modelId` variable usage in the existing large block?
                // NO, I am replacing `createModelFromConfig`.
                // I will Copy-Paste the Azure logic from the file into here.

                // Azure Logic Reuse:
                if (baseUrl && baseUrl.includes("anthropic")) {
                    let anthropicBaseUrl = baseUrl;
                    if (anthropicBaseUrl.endsWith("/messages")) anthropicBaseUrl = anthropicBaseUrl.substring(0, anthropicBaseUrl.length - "/messages".length);
                    if (anthropicBaseUrl.endsWith("/")) anthropicBaseUrl = anthropicBaseUrl.slice(0, -1);
                    const anthropic = createAnthropic({ apiKey: finalApiKey, baseURL: anthropicBaseUrl });
                    return anthropic(configuration?.deploymentId || modelId);
                }
                const isMaaS = baseUrl && (baseUrl.includes("services.ai.azure.com") || baseUrl.includes("models.ai.azure.com"));
                if (isMaaS) {
                    let maasBaseUrl = baseUrl;
                    if (!maasBaseUrl.endsWith("/v1")) maasBaseUrl = `${maasBaseUrl.endsWith("/") ? maasBaseUrl.slice(0, -1) : maasBaseUrl}/v1`;
                    const maasClient = createOpenAI({ apiKey: finalApiKey, baseURL: maasBaseUrl, name: "azure-maas" });
                    return maasClient.chat((configuration?.deploymentId || modelId).toLowerCase());
                }
                const azureConfig: any = { apiKey: finalApiKey, apiVersion: configuration?.apiVersion || "2024-08-01-preview" };
                if (baseUrl) azureConfig.baseURL = baseUrl;
                else azureConfig.resourceName = configuration?.resourceName || "panopticon";
                const azure = createAzure(azureConfig);
                return azure(configuration?.deploymentId || modelId);
            }
            if (["GROK", "DEEPSEEK", "PERPLEXITY"].includes(provider)) {
                let finalBaseUrl = baseUrl;
                if (!finalBaseUrl) {
                    if (provider === "GROK") finalBaseUrl = "https://api.x.ai/v1";
                    if (provider === "DEEPSEEK") finalBaseUrl = "https://api.deepseek.com/v1";
                    if (provider === "PERPLEXITY") finalBaseUrl = "https://api.perplexity.ai";
                }
                const generic = createOpenAI({ apiKey: finalApiKey, baseURL: finalBaseUrl, name: provider.toLowerCase() });
                return generic(modelId);
            }
            return null;
        };

        // 1. Specific Request
        if (preferredProvider && typeof preferredProvider === 'object') {
            const { provider, modelId } = preferredProvider as any;
            if (configMap[provider]) {
                const model = createModelFromConfig(configMap[provider], modelId);
                if (model) return model;
            }
        }


        // 1. If user asks for specific provider (future proofing for dropdown) or we infer it
        // For now, we cycle through priority

        // User requested "Use [added] model... instead of .env"
        // We prioritizing ANY active DB config over .env

        // Priority: Check AZURE first since user explicitly mentioned it
        // Also check AWS if active
        if (configMap["AZURE"]) {
            const model = createModelFromConfig(configMap["AZURE"]);
            if (model) return model;
        }
        if (configMap["AWS"]) {
            const model = createModelFromConfig(configMap["AWS"]);
            if (model) return model;
        }

        if (configMap["ANTHROPIC"]) return createModelFromConfig(configMap["ANTHROPIC"]);
        if (configMap["GOOGLE"]) return createModelFromConfig(configMap["GOOGLE"]);
        if (configMap["GROK"]) return createModelFromConfig(configMap["GROK"]);
        if (configMap["DEEPSEEK"]) return createModelFromConfig(configMap["DEEPSEEK"]);
        if (configMap["PERPLEXITY"]) return createModelFromConfig(configMap["PERPLEXITY"]);
        if (configMap["MISTRAL"]) return createModelFromConfig(configMap["MISTRAL"]);
        if (configMap["OPENAI"]) return createModelFromConfig(configMap["OPENAI"]);

    } catch (e) {
        console.error("[getAiSdkModel] Error loading system config", e);
    }

    // ---------------------------------------------------------
    // FALLBACK: EXISTING .ENV LOGIC
    // ---------------------------------------------------------

    // 1. Get Environment Variables
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    let apiVersion = process.env.AZURE_OPENAI_API_VERSION;

    // ... (rest of existing Azure logic) ...


    // SAFETY FIX: Clamp future/invalid versions to stable
    if (apiVersion === "2025-01-01-preview") {
        console.warn("[getAiSdkModel] WARN: Downgrading '2025-01-01-preview' to '2024-08-01-preview'.");
        apiVersion = "2024-08-01-preview";
    }
    // Default if missing
    if (!apiVersion) apiVersion = "2024-08-01-preview";

    // CRITICAL: Checks all common aliases for the deployment name
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT || process.env.AZURE_DEPLOYMENT_ID || process.env.AZURE_OPENAI_MODEL_NAME;

    // 2. Define Azure Factory
    const getSystemAzure = () => {
        if (!apiKey) return null;

        // Auto-extract resource name
        let resourceName = process.env.AZURE_OPENAI_RESOURCE_NAME;
        if (!resourceName && endpoint) {
            try {
                const url = new URL(endpoint);
                resourceName = url.hostname.split('.')[0];
                console.log(`[getAiSdkModel] Extracted Azure Resource Name: ${resourceName}`);
            } catch (e) {
                console.error("Failed to parse Azure Endpoint URL", e);
            }
        }

        // STRATEGY A: Resource Name with Deployment URLs (The Official Fix)
        // We enable `useDeploymentBasedUrls: true` to prevent the SDK from using the new /v1/ MaaS paths
        // which caused 404s/400s. This restores the classic /deployments/ structure.
        if (resourceName && deploymentName) {
            console.log(`[getAiSdkModel] Azure Config (ENV): Resource=${resourceName}, Deployment=${deploymentName}, Version=${apiVersion}`);

            const azure = createAzure({
                resourceName,
                apiKey,
                apiVersion,
                useDeploymentBasedUrls: true, // <--- THE CRITICAL FIX
            });
            return azure(deploymentName);
        }

        // Strategy B: Endpoint/BaseURL (with Forced Deployment flag)
        if (endpoint && deploymentName) {
            console.log(`[getAiSdkModel] Initializing Azure Client (BaseURL ENV): Endpoint=${endpoint}, Deployment=${deploymentName}, Version=${apiVersion}`);
            const azure = createAzure({
                baseURL: endpoint,
                apiKey,
                apiVersion,
                useDeploymentBasedUrls: true, // Force consistent behavior
            });
            return azure(deploymentName);
        }

        return null;
    };

    // 3. User BYOK Logic (Google/OpenAI) - Only if not "system"
    if (userId !== "system") {
        const user = await prismadb.users.findUnique({
            where: { id: userId },
            select: { googleApiKey: true, openaiApiKey: true, team_id: true }
        });

        // Smart Fallback for Google (Nano Banana / Gemini Users)
        // If the user has a Google Key but NOT an OpenAI key, we might want to default to Google?
        // However, for strict "Blog Post" generation via Azure, we should keep Azure as priority unless user explicitly selects otherwise.

        // Use Google if user explicitly has it and we might want to use it? 
        // For now, to fix the BUG, we prioritize the System Azure (as requested "Use sources from .env").
        // But if we want to support the previous "Google BYOK" feature:
        if (user?.googleApiKey) {
            // If we ever need to route to Google based on model name, we'd do it here.
            // But since we are fixing the "Resource not found" Azure error, we focus on returning the Azure client successfully.
        }
    }

    // 4. Return the System Azure Model (Default)
    const systemAzure = getSystemAzure();
    if (systemAzure) {
        return systemAzure;
    }

    // 5. Fallback to OpenAI (if Env Vars set)
    if (process.env.OPENAI_API_KEY) {
        const openai = createOpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: "https://api.openai.com/v1"
        });
        return openai("gpt-4o"); // Default for standard OpenAI
    }

    throw new Error("No valid AI configuration found. Check AZURE_OPENAI_API_KEY and AZURE_OPENAI_DEPLOYMENT in .env");
}

