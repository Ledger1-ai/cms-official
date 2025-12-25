
export type OAuthProviderConfig = {
    authUrl: string;
    tokenUrl: string;
    scope: string;
    responseType: string;
    extraParams?: Record<string, string>;
};

export const OAUTH_PROVIDERS: Record<string, OAuthProviderConfig> = {
    "x_social": {
        authUrl: "https://twitter.com/i/oauth2/authorize",
        tokenUrl: "https://api.twitter.com/2/oauth2/token",
        scope: "tweet.read tweet.write users.read offline.access",
        responseType: "code",
        // code_challenge handled dynamically
    },
    "linkedin": {
        authUrl: "https://www.linkedin.com/oauth/v2/authorization",
        tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
        scope: "w_member_social r_liteprofile",
        responseType: "code"
    },
    "reddit": {
        authUrl: "https://www.reddit.com/api/v1/authorize",
        tokenUrl: "https://www.reddit.com/api/v1/access_token",
        scope: "identity submit read",
        responseType: "code",
        extraParams: { duration: "permanent" }
    },
    "mailchimp": {
        authUrl: "https://login.mailchimp.com/oauth2/authorize",
        tokenUrl: "https://login.mailchimp.com/oauth2/token",
        scope: "", // Mailchimp doesn't use scopes in the standard way
        responseType: "code"
    },
    "intercom": {
        authUrl: "https://app.intercom.com/oauth",
        tokenUrl: "https://api.intercom.io/auth/eagle/token",
        scope: "",
        responseType: "code"
    },
    "slack": {
        authUrl: "https://slack.com/oauth/v2/authorize",
        tokenUrl: "https://slack.com/api/oauth.v2.access",
        scope: "chat:write channels:read",
        responseType: "code"
    },
    // Adding others as needed or placeholders
    "discord": {
        authUrl: "https://discord.com/api/oauth2/authorize",
        tokenUrl: "https://discord.com/api/oauth2/token",
        scope: "identify guilds",
        responseType: "code"
    },
    "twitch": {
        authUrl: "https://id.twitch.tv/oauth2/authorize",
        tokenUrl: "https://id.twitch.tv/oauth2/token",
        scope: "user:read:email",
        responseType: "code"
    },
    "meta_suite": {
        authUrl: "https://www.facebook.com/v18.0/dialog/oauth",
        tokenUrl: "https://graph.facebook.com/v18.0/oauth/access_token",
        scope: "pages_show_list,pages_read_engagement,pages_manage_posts",
        responseType: "code"
    }
};
