import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import { logActivityInternal } from "@/actions/audit";
import { encryptApiKey } from "@/lib/encryption/api-keys";

const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/cms/login?error=UnauthorizedShopifyCallback`);
        }

        const { searchParams } = new URL(req.url);
        const shop = searchParams.get("shop");
        const code = searchParams.get("code");

        // In a real app, verify HMAC here to ensure request came from Shopify.

        if (!shop || !code) {
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/cms/apps?error=MissingParams`);
        }

        // Exchange code for access token
        const accessTokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code
            })
        });

        const tokenData = await accessTokenResponse.json();

        if (!tokenData.access_token) {
            console.error("Shopify token exchange failed", tokenData);
            return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/cms/apps?error=TokenExchangeFailed`);
        }

        // Check for existing
        const existing = await prismadb.appConnection.findFirst({
            where: {
                userId: session.user.id,
                providerId: "shopify",
                displayName: shop, // Use shop url as unique identifier for user
                isActive: true
            }
        });

        if (existing) {
            // Update token
            await prismadb.appConnection.update({
                where: { id: existing.id },
                data: {
                    credentials: {
                        shopUrl: shop,
                        accessToken: encryptApiKey(tokenData.access_token),
                        scope: tokenData.scope
                    }
                }
            });
        } else {
            // Create new
            await prismadb.appConnection.create({
                data: {
                    userId: session.user.id,
                    providerId: "shopify",
                    displayName: shop,
                    category: "ECOMMERCE",
                    credentials: {
                        shopUrl: shop,
                        accessToken: encryptApiKey(tokenData.access_token),
                        scope: tokenData.scope
                    },
                    isActive: true
                }
            });
        }

        await logActivityInternal(
            session.user.id,
            "CONNECT_APP",
            "APPS",
            `Connected Shopify Store: ${shop}`
        );

        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/cms/apps?success=true`);

    } catch (error) {
        console.error("[SHOPIFY_CALLBACK_GET]", error);
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/cms/apps?error=InternalError`);
    }
}
