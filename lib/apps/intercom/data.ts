export interface IntercomData {
    conversations: {
        open: number;
        closed: number;
        snoozed: number;
    };
    avgResponseTime: string;
    admins: Array<{
        id: string;
        name: string;
        email: string;
    }>;
    recentConversations: Array<{
        id: string;
        title: string;
        state: string;
        createdAt: string;
        source: string;
    }>;
}

/**
 * Fetch Intercom dashboard data using the Intercom API.
 */
export async function fetchIntercomData(
    credentials: Record<string, string>
): Promise<IntercomData> {
    const accessToken = credentials.accessToken || credentials.access_token;

    if (!accessToken) {
        throw new Error("Intercom access token required");
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Intercom-Version': '2.10'
    };

    // Fetch conversations
    const convoRes = await fetch(
        'https://api.intercom.io/conversations?display_as=plaintext',
        { headers }
    );

    let conversations = { open: 0, closed: 0, snoozed: 0 };
    let recentConversations: Array<{
        id: string;
        title: string;
        state: string;
        createdAt: string;
        source: string;
    }> = [];

    if (convoRes.ok) {
        const convoData = await convoRes.json();
        const convos = convoData.conversations || [];

        conversations = {
            open: convos.filter((c: { state: string }) => c.state === 'open').length,
            closed: convos.filter((c: { state: string }) => c.state === 'closed').length,
            snoozed: convos.filter((c: { state: string }) => c.state === 'snoozed').length
        };

        recentConversations = convos.slice(0, 5).map((c: {
            id: string;
            title?: string;
            state: string;
            created_at: number;
            source?: { type?: string };
        }) => ({
            id: c.id,
            title: c.title || 'Untitled Conversation',
            state: c.state,
            createdAt: new Date(c.created_at * 1000).toISOString(),
            source: c.source?.type || 'unknown'
        }));
    }

    // Fetch admins
    const adminsRes = await fetch('https://api.intercom.io/admins', { headers });
    let admins: Array<{ id: string; name: string; email: string }> = [];

    if (adminsRes.ok) {
        const adminsData = await adminsRes.json();
        admins = (adminsData.admins || []).map((a: { id: string; name: string; email: string }) => ({
            id: a.id,
            name: a.name,
            email: a.email
        }));
    }

    return {
        conversations,
        avgResponseTime: '--', // Would need team stats endpoint
        admins,
        recentConversations
    };
}
