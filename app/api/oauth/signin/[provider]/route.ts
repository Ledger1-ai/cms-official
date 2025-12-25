import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import { OAUTH_PROVIDERS } from "@/lib/oauth-config";
import crypto from "crypto";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ provider: string }> }
) {
    const { provider } = await params;
    // @ts-ignore
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // @ts-ignore
    const userId = session.user.id;

    // 1. Look up Client Credentials from DB
    const connection = await prismadb.appConnection.findFirst({
        where: { userId, providerId: provider }
    });

    if (!connection || !connection.credentials) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/cms/apps?error=missing_config&provider=${provider}`);
    }

    const credentials = connection.credentials as Record<string, string>;
    const clientId = credentials.clientId;

    // Check Config
    const config = OAUTH_PROVIDERS[provider];
    if (!config) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/cms/apps?error=unsupported_provider&provider=${provider}`);
    }

    if (!clientId) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/cms/apps?error=missing_client_id&provider=${provider}`);
    }

    // 2. Prepare OAuth Parameters
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/${provider}`;
    const state = crypto.randomBytes(16).toString("hex");

    // Rename to queryParams to avoid conflict with route 'params'
    const queryParams = new URLSearchParams({
        response_type: config.responseType,
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: config.scope,
        state: state,
        ...(config.extraParams || {})
    });

    // 3. Handle PKCE (Required for X/Twitter)
    let codeVerifier = "";
    if (provider === "x_social") {
        codeVerifier = crypto.randomBytes(32).toString("base64url");
        const codeChallenge = crypto
            .createHash("sha256")
            .update(codeVerifier)
            .digest("base64url");

        queryParams.append("code_challenge", codeChallenge);
        queryParams.append("code_challenge_method", "S256");
    }

    // 4. Construct Redirect
    const authUrl = `${config.authUrl}?${queryParams.toString()}`;

    // 5. Respond with Redirect & Cookies (for State/Verifier)
    const response = NextResponse.redirect(authUrl);

    // Set cookies for verification in callback
    response.cookies.set("oauth_state", state, { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/api/oauth" });

    if (codeVerifier) {
        response.cookies.set("oauth_verifier", codeVerifier, { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/api/oauth" });
    }

    return response;
}
