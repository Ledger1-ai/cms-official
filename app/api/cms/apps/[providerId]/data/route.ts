import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import { decryptApiKey } from "@/lib/encryption/api-keys";

// Provider-specific data handlers
import { fetchStripeData } from "@/lib/apps/stripe/data";
import { fetchShopifyData } from "@/lib/apps/shopify/data";
import { fetchGoogleAnalyticsData } from "@/lib/apps/google-analytics/data";
import { fetchAlgoliaData } from "@/lib/apps/algolia/data";
import { fetchMailchimpData } from "@/lib/apps/mailchimp/data";
import { fetchHubSpotData } from "@/lib/apps/hubspot/data";
import { fetchIntercomData } from "@/lib/apps/intercom/data";
import { fetchSlackData } from "@/lib/apps/slack/data";
import { fetchCloudflareData } from "@/lib/apps/cloudflare/data";
import { fetchSocialData } from "@/lib/apps/social/data";
import { fetchWordPressData } from "@/lib/apps/wordpress/data";
import { fetchSurgeData } from "@/lib/apps/surge/data";
import { fetchWordfenceData } from "@/lib/apps/wordfence/data";
import { fetchZapierData } from "@/lib/apps/zapier/data";
import { fetchYoastData } from "@/lib/apps/yoast/data";

export const dynamic = 'force-dynamic';

// Map of provider IDs to their data fetching functions
const DATA_HANDLERS: Record<string, (credentials: Record<string, string>, config?: Record<string, unknown>) => Promise<unknown>> = {
    stripe: fetchStripeData,
    shopify: fetchShopifyData,
    "google-analytics": fetchGoogleAnalyticsData,
    algolia: fetchAlgoliaData,
    mailchimp: fetchMailchimpData,
    hubspot: fetchHubSpotData,
    intercom: fetchIntercomData,
    slack: fetchSlackData,
    cloudflare: fetchCloudflareData,
    wordpress: fetchWordPressData,
    surge: fetchSurgeData,
    wordfence: fetchWordfenceData,
    zapier: fetchZapierData,
    yoast: fetchYoastData,
    // Social platforms all use the same handler with providerId passed
    x_social: (creds, config) => fetchSocialData("x_social", creds, config),
    linkedin: (creds, config) => fetchSocialData("linkedin", creds, config),
    reddit: (creds, config) => fetchSocialData("reddit", creds, config),
    discord: (creds, config) => fetchSocialData("discord", creds, config),
    youtube: (creds, config) => fetchSocialData("youtube", creds, config),
    twitch: (creds, config) => fetchSocialData("twitch", creds, config),
    pinterest: (creds, config) => fetchSocialData("pinterest", creds, config),
    tiktok: (creds, config) => fetchSocialData("tiktok", creds, config),
    snapchat: (creds, config) => fetchSocialData("snapchat", creds, config),
    meta_suite: (creds, config) => fetchSocialData("meta_suite", creds, config),
};

/**
 * GET /api/cms/apps/[providerId]/data
 * Fetches real-time dashboard data for a connected app.
 */
export async function GET(
    req: Request,
    { params }: { params: Promise<{ providerId: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { providerId } = await params;

        // Find active connection
        const connection = await prismadb.appConnection.findFirst({
            where: {
                userId: session.user.id,
                providerId,
                isActive: true
            }
        });

        if (!connection) {
            return NextResponse.json({
                error: "App not connected",
                data: null
            }, { status: 404 });
        }

        // Get the data handler for this provider
        const handler = DATA_HANDLERS[providerId];

        if (!handler) {
            // Provider exists but no data handler implemented yet
            return NextResponse.json({
                data: null,
                message: `Data handler not implemented for ${providerId}`,
                connected: true
            });
        }

        // Decrypt credentials for API calls
        const credentials = connection.credentials as Record<string, string>;
        const decryptedCreds: Record<string, string> = {};

        for (const [key, value] of Object.entries(credentials)) {
            if (typeof value === "string" && value.startsWith("enc:")) {
                try {
                    decryptedCreds[key] = decryptApiKey(value);
                } catch {
                    decryptedCreds[key] = value;
                }
            } else {
                decryptedCreds[key] = value;
            }
        }

        // Fetch data from the provider's API
        const data = await handler(decryptedCreds, connection.config as Record<string, unknown> | undefined);

        return NextResponse.json({
            data,
            lastUpdated: new Date().toISOString()
        });

    } catch (error) {
        console.error(`[APP_DATA_GET]`, error);
        return NextResponse.json({
            error: "Failed to fetch data",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
