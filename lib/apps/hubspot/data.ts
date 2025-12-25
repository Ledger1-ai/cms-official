export interface HubSpotData {
    contacts: {
        total: number;
        recent: Array<{
            id: string;
            email: string;
            firstName?: string;
            lastName?: string;
            createdAt: string;
        }>;
    };
    deals: {
        total: number;
        totalValue: number;
        currency: string;
        stages: Array<{
            stage: string;
            count: number;
            value: number;
        }>;
    };
    companies: {
        total: number;
    };
}

/**
 * Fetch HubSpot CRM dashboard data using the HubSpot API.
 */
export async function fetchHubSpotData(
    credentials: Record<string, string>
): Promise<HubSpotData> {
    const accessToken = credentials.accessToken || credentials.access_token;

    if (!accessToken) {
        throw new Error("HubSpot access token required");
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    // Fetch contacts
    const contactsRes = await fetch(
        'https://api.hubapi.com/crm/v3/objects/contacts?limit=10&properties=email,firstname,lastname,createdate',
        { headers }
    );

    let contacts = { total: 0, recent: [] as Array<{ id: string; email: string; firstName?: string; lastName?: string; createdAt: string }> };

    if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        contacts = {
            total: contactsData.total || contactsData.results?.length || 0,
            recent: (contactsData.results || []).map((c: { id: string; properties: { email?: string; firstname?: string; lastname?: string; createdate?: string } }) => ({
                id: c.id,
                email: c.properties.email || '',
                firstName: c.properties.firstname,
                lastName: c.properties.lastname,
                createdAt: c.properties.createdate || ''
            }))
        };
    }

    // Fetch deals
    const dealsRes = await fetch(
        'https://api.hubapi.com/crm/v3/objects/deals?limit=100&properties=amount,dealstage,dealname',
        { headers }
    );

    let deals = { total: 0, totalValue: 0, currency: 'USD', stages: [] as Array<{ stage: string; count: number; value: number }> };

    if (dealsRes.ok) {
        const dealsData = await dealsRes.json();
        const dealsList = dealsData.results || [];

        const stageMap: Record<string, { count: number; value: number }> = {};
        let totalValue = 0;

        dealsList.forEach((d: { properties: { amount?: string; dealstage?: string } }) => {
            const amount = parseFloat(d.properties.amount || '0');
            const stage = d.properties.dealstage || 'unknown';
            totalValue += amount;

            if (!stageMap[stage]) {
                stageMap[stage] = { count: 0, value: 0 };
            }
            stageMap[stage].count++;
            stageMap[stage].value += amount;
        });

        deals = {
            total: dealsData.total || dealsList.length,
            totalValue,
            currency: 'USD',
            stages: Object.entries(stageMap).map(([stage, data]) => ({
                stage,
                count: data.count,
                value: data.value
            }))
        };
    }

    // Fetch companies count
    const companiesRes = await fetch(
        'https://api.hubapi.com/crm/v3/objects/companies?limit=1',
        { headers }
    );

    let companiesTotal = 0;
    if (companiesRes.ok) {
        const companiesData = await companiesRes.json();
        companiesTotal = companiesData.total || 0;
    }

    return {
        contacts,
        deals,
        companies: { total: companiesTotal }
    };
}
