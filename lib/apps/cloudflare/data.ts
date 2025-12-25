export interface CloudflareData {
    zone: {
        id: string;
        name: string;
        status: string;
    };
    analytics: {
        requests: number;
        bandwidth: string;
        threats: number;
        uniqueVisitors: number;
    };
    firewall: {
        status: string;
        rulesActive: number;
    };
    ssl: {
        status: string;
        certificateExpiry?: string;
    };
}

/**
 * Fetch Cloudflare dashboard data using the Cloudflare API v4.
 */
export async function fetchCloudflareData(
    credentials: Record<string, string>,
    config?: Record<string, unknown>
): Promise<CloudflareData> {
    const apiToken = credentials.apiToken || credentials.api_token;
    const zoneId = credentials.zoneId || config?.zoneId as string;

    if (!apiToken) {
        throw new Error("Cloudflare API token required");
    }

    const headers = {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
    };

    // If no zone ID, try to get zones list
    let activeZoneId = zoneId;
    let zoneName = '';
    let zoneStatus = 'unknown';

    if (!activeZoneId) {
        const zonesRes = await fetch('https://api.cloudflare.com/client/v4/zones?per_page=1', { headers });
        if (zonesRes.ok) {
            const zonesData = await zonesRes.json();
            if (zonesData.result?.[0]) {
                activeZoneId = zonesData.result[0].id;
                zoneName = zonesData.result[0].name;
                zoneStatus = zonesData.result[0].status;
            }
        }
    }

    if (!activeZoneId) {
        throw new Error("No Cloudflare zone found");
    }

    // Fetch zone details if not already fetched
    if (!zoneName) {
        const zoneRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${activeZoneId}`, { headers });
        if (zoneRes.ok) {
            const zoneData = await zoneRes.json();
            zoneName = zoneData.result?.name || '';
            zoneStatus = zoneData.result?.status || 'unknown';
        }
    }

    // Fetch analytics for past 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const analyticsRes = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${activeZoneId}/analytics/dashboard?since=${since}&continuous=true`,
        { headers }
    );

    let analytics = { requests: 0, bandwidth: '0 B', threats: 0, uniqueVisitors: 0 };

    if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        const totals = analyticsData.result?.totals || {};
        const requests = totals.requests?.all || 0;
        const bandwidth = totals.bandwidth?.all || 0;
        const threats = totals.threats?.all || 0;
        const uniques = totals.uniques?.all || 0;

        // Format bandwidth
        let bandwidthStr = '0 B';
        if (bandwidth > 1e9) bandwidthStr = `${(bandwidth / 1e9).toFixed(2)} GB`;
        else if (bandwidth > 1e6) bandwidthStr = `${(bandwidth / 1e6).toFixed(2)} MB`;
        else if (bandwidth > 1e3) bandwidthStr = `${(bandwidth / 1e3).toFixed(2)} KB`;
        else bandwidthStr = `${bandwidth} B`;

        analytics = {
            requests,
            bandwidth: bandwidthStr,
            threats,
            uniqueVisitors: uniques
        };
    }

    // Fetch firewall rules count
    const firewallRes = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${activeZoneId}/firewall/rules`,
        { headers }
    );

    let firewall = { status: 'Active', rulesActive: 0 };
    if (firewallRes.ok) {
        const firewallData = await firewallRes.json();
        firewall.rulesActive = firewallData.result?.length || 0;
    }

    // Fetch SSL status
    const sslRes = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${activeZoneId}/ssl/verification`,
        { headers }
    );

    let ssl = { status: 'Unknown', certificateExpiry: undefined as string | undefined };
    if (sslRes.ok) {
        const sslData = await sslRes.json();
        ssl.status = sslData.result?.[0]?.status || 'Unknown';
    }

    return {
        zone: {
            id: activeZoneId,
            name: zoneName,
            status: zoneStatus
        },
        analytics,
        firewall,
        ssl
    };
}
