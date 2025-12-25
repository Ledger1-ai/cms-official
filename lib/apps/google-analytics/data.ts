export interface GoogleAnalyticsData {
    realtimeUsers: number;
    users7d: number;
    sessions7d: number;
    pageViews7d: number;
    bounceRate: number;
    avgSessionDuration: string;
    topPages: Array<{
        path: string;
        views: number;
    }>;
    trafficSources: Array<{
        source: string;
        users: number;
    }>;
}

/**
 * Fetch Google Analytics 4 dashboard data using the GA4 Data API.
 */
export async function fetchGoogleAnalyticsData(
    credentials: Record<string, string>,
    config?: Record<string, unknown>
): Promise<GoogleAnalyticsData> {
    const accessToken = credentials.accessToken || credentials.access_token;
    const propertyId = credentials.propertyId || config?.propertyId as string;

    if (!accessToken) {
        throw new Error("Google Analytics access token required");
    }

    if (!propertyId) {
        throw new Error("Google Analytics property ID required");
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    // Fetch real-time data
    let realtimeUsers = 0;
    try {
        const realtimeRes = await fetch(
            `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`,
            {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    metrics: [{ name: 'activeUsers' }]
                })
            }
        );
        if (realtimeRes.ok) {
            const realtimeData = await realtimeRes.json();
            realtimeUsers = parseInt(realtimeData.rows?.[0]?.metricValues?.[0]?.value || '0');
        }
    } catch (e) {
        console.error('[GA4] Realtime fetch failed:', e);
    }

    // Fetch 7-day report
    const reportRes = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
                metrics: [
                    { name: 'activeUsers' },
                    { name: 'sessions' },
                    { name: 'screenPageViews' },
                    { name: 'bounceRate' },
                    { name: 'averageSessionDuration' }
                ]
            })
        }
    );

    let users7d = 0, sessions7d = 0, pageViews7d = 0, bounceRate = 0, avgSessionDuration = '0:00';

    if (reportRes.ok) {
        const reportData = await reportRes.json();
        const row = reportData.rows?.[0]?.metricValues || [];
        users7d = parseInt(row[0]?.value || '0');
        sessions7d = parseInt(row[1]?.value || '0');
        pageViews7d = parseInt(row[2]?.value || '0');
        bounceRate = parseFloat(row[3]?.value || '0');
        const durationSecs = parseFloat(row[4]?.value || '0');
        const mins = Math.floor(durationSecs / 60);
        const secs = Math.floor(durationSecs % 60);
        avgSessionDuration = `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Fetch top pages
    const topPagesRes = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
                dimensions: [{ name: 'pagePath' }],
                metrics: [{ name: 'screenPageViews' }],
                limit: 10
            })
        }
    );

    let topPages: Array<{ path: string; views: number }> = [];
    if (topPagesRes.ok) {
        const topPagesData = await topPagesRes.json();
        topPages = (topPagesData.rows || []).map((row: { dimensionValues?: Array<{ value: string }>; metricValues?: Array<{ value: string }> }) => ({
            path: row.dimensionValues?.[0]?.value || '/',
            views: parseInt(row.metricValues?.[0]?.value || '0')
        }));
    }

    // Fetch traffic sources
    const sourcesRes = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
                dimensions: [{ name: 'sessionSource' }],
                metrics: [{ name: 'activeUsers' }],
                limit: 5
            })
        }
    );

    let trafficSources: Array<{ source: string; users: number }> = [];
    if (sourcesRes.ok) {
        const sourcesData = await sourcesRes.json();
        trafficSources = (sourcesData.rows || []).map((row: { dimensionValues?: Array<{ value: string }>; metricValues?: Array<{ value: string }> }) => ({
            source: row.dimensionValues?.[0]?.value || 'direct',
            users: parseInt(row.metricValues?.[0]?.value || '0')
        }));
    }

    return {
        realtimeUsers,
        users7d,
        sessions7d,
        pageViews7d,
        bounceRate,
        avgSessionDuration,
        topPages,
        trafficSources
    };
}
