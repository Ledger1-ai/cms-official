export interface MailchimpData {
    lists: Array<{
        id: string;
        name: string;
        memberCount: number;
    }>;
    totalSubscribers: number;
    avgOpenRate: number;
    avgClickRate: number;
    recentCampaigns: Array<{
        id: string;
        title: string;
        status: string;
        sendTime?: string;
        openRate: number;
        clickRate: number;
    }>;
}

/**
 * Fetch Mailchimp dashboard data using the Mailchimp Marketing API.
 */
export async function fetchMailchimpData(
    credentials: Record<string, string>
): Promise<MailchimpData> {
    const apiKey = credentials.apiKey || credentials.access_token;
    const server = credentials.server || credentials.dc || apiKey?.split('-').pop();

    if (!apiKey || !server) {
        throw new Error("Mailchimp API key and server prefix required");
    }

    const baseUrl = `https://${server}.api.mailchimp.com/3.0`;
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    // Fetch all lists
    const listsRes = await fetch(`${baseUrl}/lists?count=100`, { headers });
    let lists: Array<{ id: string; name: string; memberCount: number }> = [];
    let totalSubscribers = 0;

    if (listsRes.ok) {
        const listsData = await listsRes.json();
        lists = (listsData.lists || []).map((list: { id: string; name: string; stats?: { member_count: number } }) => ({
            id: list.id,
            name: list.name,
            memberCount: list.stats?.member_count || 0
        }));
        totalSubscribers = lists.reduce((sum, l) => sum + l.memberCount, 0);
    }

    // Fetch campaigns for open/click rates
    const campaignsRes = await fetch(`${baseUrl}/campaigns?count=10&status=sent`, { headers });
    let recentCampaigns: Array<{
        id: string;
        title: string;
        status: string;
        sendTime?: string;
        openRate: number;
        clickRate: number;
    }> = [];
    let avgOpenRate = 0;
    let avgClickRate = 0;

    if (campaignsRes.ok) {
        const campaignsData = await campaignsRes.json();
        const campaigns = campaignsData.campaigns || [];

        recentCampaigns = campaigns.map((c: {
            id: string;
            settings?: { title?: string };
            status: string;
            send_time?: string;
            report_summary?: { open_rate?: number; click_rate?: number };
        }) => ({
            id: c.id,
            title: c.settings?.title || 'Untitled',
            status: c.status,
            sendTime: c.send_time,
            openRate: (c.report_summary?.open_rate || 0) * 100,
            clickRate: (c.report_summary?.click_rate || 0) * 100
        }));

        if (recentCampaigns.length > 0) {
            avgOpenRate = recentCampaigns.reduce((sum, c) => sum + c.openRate, 0) / recentCampaigns.length;
            avgClickRate = recentCampaigns.reduce((sum, c) => sum + c.clickRate, 0) / recentCampaigns.length;
        }
    }

    return {
        lists,
        totalSubscribers,
        avgOpenRate,
        avgClickRate,
        recentCampaigns
    };
}
