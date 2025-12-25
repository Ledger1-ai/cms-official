export interface ConnectedSocialProfile {
    providerId: string;
    profileName: string | null;
    profileHandle: string | null;
    profileAvatarUrl: string | null;
    isActive: boolean;
}

/**
 * Maps our platform IDs to provider IDs in the database
 */
export const PLATFORM_TO_PROVIDER_MAP: Record<string, string> = {
    "x": "x_social",
    "linkedin": "linkedin",
    "facebook": "meta_suite",
    "instagram": "meta_suite",
    "youtube": "youtube",
    "web3": "farcaster"
};

/**
 * Reverse mapping for provider to platform
 */
export const PROVIDER_TO_PLATFORM_MAP: Record<string, string> = {
    "x_social": "x",
    "linkedin": "linkedin",
    "meta_suite": "facebook",
    "youtube": "youtube",
    "farcaster": "web3"
};
