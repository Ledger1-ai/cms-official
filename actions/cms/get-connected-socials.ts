"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";
import { ConnectedSocialProfile } from "@/lib/social-utils";

// Known social provider IDs
const SOCIAL_PROVIDERS = ["x_social", "linkedin", "meta_suite", "youtube", "farcaster"];

/**
 * Fetches all connected social platforms for the current user
 * Returns profile metadata for use in the Universal Broadcast preview
 */
export async function getConnectedSocials(): Promise<ConnectedSocialProfile[]> {
    const session = await getServerSession(authOptions);

    // @ts-ignore
    if (!session?.user?.id) {
        return [];
    }

    try {
        const connections = await prismadb.appConnection.findMany({
            where: {
                // @ts-ignore
                userId: session.user.id,
                isActive: true,
                providerId: { in: SOCIAL_PROVIDERS }
            },
            select: {
                providerId: true,
                profileName: true,
                profileHandle: true,
                profileAvatarUrl: true,
                isActive: true
            }
        });

        return connections;
    } catch (error) {
        console.error("[GET_CONNECTED_SOCIALS]", error);
        return [];
    }
}
