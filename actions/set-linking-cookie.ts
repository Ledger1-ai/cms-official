"use server";

import { cookies } from "next/headers";

export async function setLinkingCookie(userId: string) {
    if (!userId) return;

    const cookieStore = await cookies();

    // Set cookie explicitly with Lax (safe for OAuth redirects) and path root
    // 5 minutes expiration
    cookieStore.set("cms_linking_user", userId, {
        path: "/",
        maxAge: 300,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // Secure only in prod to avoid localhost issues
    });

    console.log(`[setLinkingCookie] Cookie set for user: ${userId}`);
}
