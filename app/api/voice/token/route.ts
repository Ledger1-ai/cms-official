
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // 1. Get Configuration from Environment
        // User requested to use specific "realtime" variables
        const realtimeKey = process.env.AZURE_OPENAI_REALTIME_API_KEY;
        const standardKey = process.env.AZURE_OPENAI_API_KEY;
        const apiKey = realtimeKey || standardKey;
        const webrtcUrl = process.env.NEXT_PUBLIC_AZURE_OPENAI_REALTIME_WEBRTC_URL;
        const deployment = process.env.AZURE_OPENAI_REALTIME_DEPLOYMENT || "gpt-realtime";
        const apiVersion = process.env.AZURE_OPENAI_REALTIME_API_VERSION || "2024-10-01-preview";

        // DEBUG LOGGING
        console.log("[VoiceToken] Configuration:");
        console.log("- Key Source:", realtimeKey ? "REALTIME_API_KEY" : (standardKey ? "STANDARD_API_KEY" : "NONE"));
        console.log("- API Key Present:", !!apiKey);
        console.log("- WEBRTC URL:", webrtcUrl || "Missing");
        console.log("- Deployment:", deployment);
        console.log("- Version:", apiVersion);

        if (!apiKey || !webrtcUrl) {
            console.error("[VoiceToken] Missing Keys/URL");
            return NextResponse.json({ error: "Voice AI not configured (Missing Realtime Keys)" }, { status: 500 });
        }

        // 2. Request Ephemeral Token from Azure OpenAI
        // Found working implementation in src/app/api/voice/session/route.ts
        // URL Pattern: {AZURE_OPENAI_ENDPOINT}openai/realtimeapi/sessions
        const resourceEndpoint = process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/+$/, "") || ""; // Remove trailing slash

        console.log("- Resource Endpoint:", resourceEndpoint || "Missing");

        if (!resourceEndpoint) {
            console.error("[VoiceToken] Missing Config: AZURE_OPENAI_ENDPOINT");
            return NextResponse.json({ error: "Missing AZURE_OPENAI_ENDPOINT for token generation" }, { status: 500 });
        }

        // Correct Path: /openai/realtimeapi/sessions
        const sessionUrl = `${resourceEndpoint}/openai/realtimeapi/sessions?api-version=${apiVersion}`;
        console.log("[VoiceToken] Fetching token from sessionUrl:", sessionUrl);

        try {
            const response = await fetch(sessionUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": apiKey,
                },
                body: JSON.stringify({
                    model: deployment,
                    voice: "alloy",
                })
            });

            if (!response.ok) {
                const text = await response.text();
                // If 404, it might mean the path /deployments/... is wrong for this specific endpoint type.
                // But 401 usually means Key is wrong OR Path is checking auth against wrong resource.
                console.error("[VoiceToken] Token Generation Failed:", response.status, text);
                return NextResponse.json({
                    error: "Failed to generate session token",
                    status: response.status,
                    url: sessionUrl,
                    details: text
                }, { status: 500 });
            }

            const data = await response.json();

            // Return token and the original WebRTC URL for client connection
            return NextResponse.json({
                token: data.client_secret?.value,
                url: webrtcUrl
            });

        } catch (e: any) {
            console.error("[VoiceToken] Fetch Error:", e);
            return NextResponse.json({ error: e.message }, { status: 500 });
        }
    } catch (error: any) {
        console.error("Token Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
