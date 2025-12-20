import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "de", "cz", "uk"];
const publicPages = ["/", "/sign-in", "/pricing", "/about", "/contact", "/terms", "/privacy", "/features", "/roadmap", "/blog", "/docs"];

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale: "en",
});

const authMiddleware = withAuth(
    // Note: The middleware function will only be invoked if the authorized callback returns true.
    function onSuccess(req) {
        // If it's an API route, do NOT run intlMiddleware, just pass through
        if (req.nextUrl.pathname.startsWith("/api")) {
            return NextResponse.next();
        }
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;

                // Public API routes - Always allow
                // Add more public API patterns here if needed (e.g. /api/auth is handled by next-auth automatically usually, but good to be explicit if needed)
                // Actually next-auth handles /api/auth internally before this middleware might catch it if configured right, 
                // but robustly:
                if (
                    path.startsWith("/api/webhooks") ||
                    path.startsWith("/api/public") ||
                    path.startsWith("/api/auth")
                ) {
                    return true;
                }

                // Check for CMS or protected API
                // CMS routes: anything with /cms that isn't login
                // Note: Check for locale prefixes too? 
                // /en/cms/dashboard -> path includes /cms
                // /cms/dashboard -> path includes /cms
                const isCmsRoute = path.includes("/cms") && !path.includes("/cms/login");

                // API routes: All API routes (except the public ones above) require token
                const isApiRoute = path.startsWith("/api");

                if (isCmsRoute || isApiRoute) {
                    return !!token;
                }

                // Default allow for other routes (marketing pages)
                return true;
            },
        },
        pages: {
            signIn: "/en/cms/login", // Redirect to login if unauthorized
        },
    }
);

export function proxy(req: NextRequest) {
    // Regex to check if the path is a public file or next internals
    // We exclude API from this check because we WANT to run auth middleware on API
    const excludePattern = /^(\/_next|\/voicehub|.*\\..*)/;

    if (excludePattern.test(req.nextUrl.pathname)) {
        return;
    }

    return (authMiddleware as any)(req);
}

export const config = {
    // Match all paths except internal next stuff and static files
    matcher: ["/((?!_next|voicehub|.*\\..*).*)"],
};
