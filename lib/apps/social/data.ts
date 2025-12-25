export interface SocialData {
    profile: {
        id: string;
        name: string;
        handle: string;
        avatarUrl?: string;
        followersCount: number;
        followingCount: number;
    };
    metrics: {
        impressions7d: number;
        engagementRate: number;
        postsCount: number;
    };
    recentPosts: Array<{
        id: string;
        content: string;
        likes: number;
        comments: number;
        shares: number;
        createdAt: string;
    }>;
}

// Platform-specific API configurations
const PLATFORM_APIS: Record<string, {
    profileUrl: string;
    metricsUrl?: string;
    postsUrl?: string;
    parseProfile: (data: unknown) => SocialData['profile'];
    parsePosts?: (data: unknown) => SocialData['recentPosts'];
}> = {
    x_social: {
        profileUrl: 'https://api.twitter.com/2/users/me?user.fields=public_metrics,profile_image_url',
        postsUrl: 'https://api.twitter.com/2/users/{id}/tweets?max_results=10&tweet.fields=public_metrics,created_at',
        parseProfile: (data: unknown) => {
            const d = data as { data?: { id: string; name: string; username: string; profile_image_url?: string; public_metrics?: { followers_count: number; following_count: number } } };
            return {
                id: d.data?.id || '',
                name: d.data?.name || '',
                handle: `@${d.data?.username || ''}`,
                avatarUrl: d.data?.profile_image_url,
                followersCount: d.data?.public_metrics?.followers_count || 0,
                followingCount: d.data?.public_metrics?.following_count || 0
            };
        },
        parsePosts: (data: unknown) => {
            const d = data as { data?: Array<{ id: string; text: string; public_metrics?: { like_count: number; reply_count: number; retweet_count: number }; created_at: string }> };
            return (d.data || []).map(p => ({
                id: p.id,
                content: p.text,
                likes: p.public_metrics?.like_count || 0,
                comments: p.public_metrics?.reply_count || 0,
                shares: p.public_metrics?.retweet_count || 0,
                createdAt: p.created_at
            }));
        }
    },
    linkedin: {
        profileUrl: 'https://api.linkedin.com/v2/me',
        parseProfile: (data: unknown) => {
            const d = data as { id?: string; localizedFirstName?: string; localizedLastName?: string };
            return {
                id: d.id || '',
                name: `${d.localizedFirstName || ''} ${d.localizedLastName || ''}`.trim(),
                handle: '',
                followersCount: 0,
                followingCount: 0
            };
        }
    },
    discord: {
        profileUrl: 'https://discord.com/api/v10/users/@me',
        parseProfile: (data: unknown) => {
            const d = data as { id?: string; username?: string; global_name?: string; avatar?: string };
            return {
                id: d.id || '',
                name: d.global_name || d.username || '',
                handle: `@${d.username || ''}`,
                avatarUrl: d.avatar ? `https://cdn.discordapp.com/avatars/${d.id}/${d.avatar}.png` : undefined,
                followersCount: 0,
                followingCount: 0
            };
        }
    },
    twitch: {
        profileUrl: 'https://api.twitch.tv/helix/users',
        parseProfile: (data: unknown) => {
            const d = data as { data?: Array<{ id: string; display_name: string; login: string; profile_image_url?: string }> };
            return {
                id: d.data?.[0]?.id || '',
                name: d.data?.[0]?.display_name || '',
                handle: `@${d.data?.[0]?.login || ''}`,
                avatarUrl: d.data?.[0]?.profile_image_url,
                followersCount: 0,
                followingCount: 0
            };
        }
    },
    reddit: {
        profileUrl: 'https://oauth.reddit.com/api/v1/me',
        parseProfile: (data: unknown) => {
            const d = data as { id?: string; name?: string; icon_img?: string; subreddit?: { subscribers: number } };
            return {
                id: d.id || '',
                name: d.name || '',
                handle: `u/${d.name || ''}`,
                avatarUrl: d.icon_img?.split('?')[0],
                followersCount: d.subreddit?.subscribers || 0,
                followingCount: 0
            };
        }
    },
    youtube: {
        profileUrl: 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true',
        parseProfile: (data: unknown) => {
            const d = data as { items?: Array<{ id: string; snippet?: { title: string; customUrl?: string; thumbnails?: { default?: { url: string } } }; statistics?: { subscriberCount: string } }> };
            return {
                id: d.items?.[0]?.id || '',
                name: d.items?.[0]?.snippet?.title || '',
                handle: d.items?.[0]?.snippet?.customUrl || '',
                avatarUrl: d.items?.[0]?.snippet?.thumbnails?.default?.url,
                followersCount: parseInt(d.items?.[0]?.statistics?.subscriberCount || '0'),
                followingCount: 0
            };
        }
    },
    meta_suite: {
        profileUrl: 'https://graph.facebook.com/v18.0/me?fields=id,name,picture',
        parseProfile: (data: unknown) => {
            const d = data as { id?: string; name?: string; picture?: { data?: { url: string } } };
            return {
                id: d.id || '',
                name: d.name || '',
                handle: '',
                avatarUrl: d.picture?.data?.url,
                followersCount: 0,
                followingCount: 0
            };
        }
    },
    tiktok: {
        profileUrl: 'https://open.tiktokapis.com/v2/user/info/',
        parseProfile: (data: unknown) => {
            const d = data as { data?: { user?: { open_id: string; display_name: string; avatar_url: string; follower_count: number; following_count: number } } };
            return {
                id: d.data?.user?.open_id || '',
                name: d.data?.user?.display_name || '',
                handle: '',
                avatarUrl: d.data?.user?.avatar_url,
                followersCount: d.data?.user?.follower_count || 0,
                followingCount: d.data?.user?.following_count || 0
            };
        }
    },
    pinterest: {
        profileUrl: 'https://api.pinterest.com/v5/user_account',
        parseProfile: (data: unknown) => {
            const d = data as { username?: string; profile_image?: string; follower_count?: number; following_count?: number };
            return {
                id: d.username || '',
                name: d.username || '',
                handle: `@${d.username || ''}`,
                avatarUrl: d.profile_image,
                followersCount: d.follower_count || 0,
                followingCount: d.following_count || 0
            };
        }
    },
    snapchat: {
        profileUrl: '',
        parseProfile: () => ({
            id: '',
            name: 'Snapchat User',
            handle: '',
            followersCount: 0,
            followingCount: 0
        })
    }
};

/**
 * Fetch social media dashboard data for any supported platform.
 */
export async function fetchSocialData(
    providerId: string,
    credentials: Record<string, string>,
    config?: Record<string, unknown>
): Promise<SocialData> {
    const accessToken = credentials.accessToken || credentials.access_token;

    if (!accessToken) {
        throw new Error(`${providerId} access token required`);
    }

    const platformConfig = PLATFORM_APIS[providerId];

    if (!platformConfig) {
        // Return minimal data for unsupported platforms
        return {
            profile: {
                id: '',
                name: providerId,
                handle: '',
                followersCount: 0,
                followingCount: 0
            },
            metrics: {
                impressions7d: 0,
                engagementRate: 0,
                postsCount: 0
            },
            recentPosts: []
        };
    }

    const headers: Record<string, string> = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    // Special headers for some platforms
    if (providerId === 'twitch') {
        headers['Client-Id'] = credentials.clientId || config?.clientId as string || '';
    }

    // Fetch profile data
    let profile: SocialData['profile'] = {
        id: '',
        name: '',
        handle: '',
        followersCount: 0,
        followingCount: 0
    };

    if (platformConfig.profileUrl) {
        try {
            const profileRes = await fetch(platformConfig.profileUrl, { headers });
            if (profileRes.ok) {
                const profileData = await profileRes.json();
                profile = platformConfig.parseProfile(profileData);
            }
        } catch (e) {
            console.error(`[Social:${providerId}] Profile fetch failed:`, e);
        }
    }

    // Fetch recent posts if available
    let recentPosts: SocialData['recentPosts'] = [];

    if (platformConfig.postsUrl && platformConfig.parsePosts) {
        try {
            const postsUrl = platformConfig.postsUrl.replace('{id}', profile.id);
            const postsRes = await fetch(postsUrl, { headers });
            if (postsRes.ok) {
                const postsData = await postsRes.json();
                recentPosts = platformConfig.parsePosts(postsData);
            }
        } catch (e) {
            console.error(`[Social:${providerId}] Posts fetch failed:`, e);
        }
    }

    // Calculate engagement metrics
    const totalEngagement = recentPosts.reduce((sum, p) => sum + p.likes + p.comments + p.shares, 0);
    const engagementRate = profile.followersCount > 0 && recentPosts.length > 0
        ? (totalEngagement / recentPosts.length / profile.followersCount) * 100
        : 0;

    return {
        profile,
        metrics: {
            impressions7d: 0, // Would need analytics endpoints
            engagementRate: Math.round(engagementRate * 100) / 100,
            postsCount: recentPosts.length
        },
        recentPosts
    };
}
