export interface SlackData {
    workspace: {
        name: string;
        domain: string;
    };
    channels: {
        total: number;
        list: Array<{
            id: string;
            name: string;
            memberCount: number;
            isPrivate: boolean;
        }>;
    };
    alertsSent24h: number;
}

/**
 * Fetch Slack dashboard data using the Slack Web API.
 */
export async function fetchSlackData(
    credentials: Record<string, string>
): Promise<SlackData> {
    const accessToken = credentials.accessToken || credentials.access_token || credentials.bot_token;

    if (!accessToken) {
        throw new Error("Slack access token required");
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    // Fetch workspace info
    const teamRes = await fetch('https://slack.com/api/team.info', { headers });
    let workspace = { name: 'Unknown', domain: '' };

    if (teamRes.ok) {
        const teamData = await teamRes.json();
        if (teamData.ok) {
            workspace = {
                name: teamData.team?.name || 'Unknown',
                domain: teamData.team?.domain || ''
            };
        }
    }

    // Fetch channels
    const channelsRes = await fetch(
        'https://slack.com/api/conversations.list?types=public_channel,private_channel&limit=100',
        { headers }
    );

    let channels = { total: 0, list: [] as Array<{ id: string; name: string; memberCount: number; isPrivate: boolean }> };

    if (channelsRes.ok) {
        const channelsData = await channelsRes.json();
        if (channelsData.ok) {
            const channelsList = channelsData.channels || [];
            channels = {
                total: channelsList.length,
                list: channelsList.slice(0, 10).map((c: {
                    id: string;
                    name: string;
                    num_members?: number;
                    is_private?: boolean;
                }) => ({
                    id: c.id,
                    name: c.name,
                    memberCount: c.num_members || 0,
                    isPrivate: c.is_private || false
                }))
            };
        }
    }

    // Note: Alerts sent would be tracked in AppSyncLog, not from Slack API
    // This would need to query our database for messages sent via Slack integration

    return {
        workspace,
        channels,
        alertsSent24h: 0 // Would query AppSyncLog for this
    };
}
