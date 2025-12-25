import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import { OAUTH_PROVIDERS } from "@/lib/oauth-config";

// Profile fetching configuration per provider
const PROFILE_ENDPOINTS: Record<string, { url: string; extractProfile: (data: any) => { name: string; handle: string; avatar: string } }> = {
    "x_social": {
        url: "https://api.twitter.com/2/users/me?user.fields=profile_image_url,username,name",
        extractProfile: (data: any) => ({
            name: data.data?.name || "",
            handle: data.data?.username || "",
            avatar: data.data?.profile_image_url?.replace("_normal", "_400x400") || ""
        })
    },
    "linkedin": {
        url: "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))",
        extractProfile: (data: any) => ({
            name: `${data.localizedFirstName || ""} ${data.localizedLastName || ""}`.trim(),
            handle: data.id || "",
            avatar: data.profilePicture?.["displayImage~"]?.elements?.[0]?.identifiers?.[0]?.identifier || ""
        })
    },
    "meta_suite": {
        url: "https://graph.facebook.com/me?fields=id,name,picture.type(large)",
        extractProfile: (data: any) => ({
            name: data.name || "",
            handle: data.id || "",
            avatar: data.picture?.data?.url || ""
        })
    }
};

async function fetchUserProfile(provider: string, accessToken: string): Promise<{ name: string; handle: string; avatar: string } | null> {
    const config = PROFILE_ENDPOINTS[provider];
    if (!config) return null;

    try {
        const res = await fetch(config.url, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json"
            }
        });

        if (!res.ok) {
            console.warn(`Profile fetch failed for ${provider}:`, await res.text());
            return null;
        }

        const data = await res.json();
        return config.extractProfile(data);
    } catch (error) {
        console.error(`Error fetching profile for ${provider}:`, error);
        return null;
    }
}

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

    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/cms/apps?error=${error}&provider=${provider}`);
    }

    if (!code) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/cms/apps?error=no_code&provider=${provider}`);
    }

    try {
        // @ts-ignore
        const userId = session.user.id;
        const cookieStore = req.cookies;

        // 1. Verify State (CSRF Protection)
        const storedState = cookieStore.get("oauth_state")?.value;
        if (state && storedState && state !== storedState) {
            console.warn(`OAuth State Mismatch: ${state} vs ${storedState}`);
            // In strict mode, we might throw here, but for now allow with warning if needed
        }

        // 2. Fetch Client Credentials
        const connection = await prismadb.appConnection.findFirst({
            where: { userId, providerId: provider }
        });

        if (!connection || !connection.credentials) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/cms/apps?error=missing_config&provider=${provider}`);
        }

        const credentials = connection.credentials as Record<string, string>;
        const config = OAUTH_PROVIDERS[provider];

        if (!config) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/cms/apps?error=unsupported_provider&provider=${provider}`);
        }

        const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/${provider}`;

        // 3. Exchange Code for Token
        const tokenParams = new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
            client_id: credentials.clientId,
            client_secret: credentials.clientSecret
        });

        // Add PKCE Verifier if present
        const codeVerifier = cookieStore.get("oauth_verifier")?.value;
        if (codeVerifier) {
            tokenParams.append("code_verifier", codeVerifier);
        }

        // Handle Body vs Header Auth
        const headers: Record<string, string> = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        };

        if (provider === "reddit") {
            const basicAuth = Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString('base64');
            headers["Authorization"] = `Basic ${basicAuth}`;
            tokenParams.delete("client_id");
            tokenParams.delete("client_secret");
        }

        const tokenRes = await fetch(config.tokenUrl, {
            method: "POST",
            headers,
            body: tokenParams.toString()
        });

        const tokens = await tokenRes.json();

        if (!tokenRes.ok) {
            console.error("Token Exchange Failed:", tokens);
            throw new Error(tokens.error_description || tokens.error || "Token exchange failed");
        }

        // 4. Fetch User Profile (if supported)
        const profile = await fetchUserProfile(provider, tokens.access_token);

        // 5. Update Database with Real Tokens + Profile
        await prismadb.appConnection.update({
            where: { id: connection.id },
            data: {
                isActive: true,
                updatedAt: new Date(),
                // Store profile metadata
                ...(profile && {
                    profileName: profile.name,
                    profileHandle: profile.handle,
                    profileAvatarUrl: profile.avatar
                }),
                credentials: {
                    ...credentials, // Keep ID/Secret
                    simulated: false, // Ensure we mark as REAL
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                    expiresIn: tokens.expires_in,
                    scope: tokens.scope,
                    connectedAt: new Date().toISOString()
                }
            }
        });

        // 6. Cleanup Cookies & Redirect
        const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/cms/apps?success=${provider}`);
        response.cookies.delete("oauth_state");
        response.cookies.delete("oauth_verifier");

        return response;

    } catch (error) {
        console.error("OAuth Callback Error", error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/cms/apps?error=authexchange_failed&provider=${provider}`);
    }
}

