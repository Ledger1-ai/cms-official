import Stripe from "stripe";

export interface StripeData {
    balance: {
        available: number;
        pending: number;
        currency: string;
    };
    customers: {
        total: number;
        recentCount: number;
    };
    netVolume: number;
    recentPayments: Array<{
        id: string;
        amount: number;
        currency: string;
        status: string;
        created: Date;
        customerEmail?: string;
    }>;
    revenueChart: Array<{
        date: string;
        amount: number;
    }>;
}

/**
 * Fetch Stripe dashboard data using the Stripe API.
 */
export async function fetchStripeData(
    credentials: Record<string, string>
): Promise<StripeData> {
    const apiKey = credentials.apiKey || credentials.secret_key || credentials.secretKey;

    if (!apiKey) {
        throw new Error("Stripe API key not found in credentials");
    }

    const stripe = new Stripe(apiKey, {
        apiVersion: "2025-12-15.clover"
    });

    // Fetch balance
    const balance = await stripe.balance.retrieve();
    const availableBalance = balance.available.reduce((sum, b) => sum + b.amount, 0) / 100;
    const pendingBalance = balance.pending.reduce((sum, b) => sum + b.amount, 0) / 100;

    // Fetch customer count
    const customers = await stripe.customers.list({ limit: 1 });
    const totalCustomers = customers.data.length > 0 ?
        (await stripe.customers.list({ limit: 100 })).data.length : 0;

    // Fetch recent payments
    const paymentIntents = await stripe.paymentIntents.list({
        limit: 10,
        expand: ['data.customer']
    });

    const recentPayments = paymentIntents.data.map(pi => ({
        id: pi.id,
        amount: pi.amount / 100,
        currency: pi.currency.toUpperCase(),
        status: pi.status,
        created: new Date(pi.created * 1000),
        customerEmail: typeof pi.customer === 'object' && pi.customer && !('deleted' in pi.customer)
            ? (pi.customer as Stripe.Customer).email || undefined
            : undefined
    }));

    // Fetch balance transactions for net volume and chart
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60);
    const transactions = await stripe.balanceTransactions.list({
        created: { gte: thirtyDaysAgo },
        limit: 100
    });

    const netVolume = transactions.data
        .filter(t => t.type === 'charge' || t.type === 'payment')
        .reduce((sum, t) => sum + t.net, 0) / 100;

    // Group transactions by date for chart
    const dailyTotals: Record<string, number> = {};
    transactions.data.forEach(t => {
        const date = new Date(t.created * 1000).toISOString().split('T')[0];
        dailyTotals[date] = (dailyTotals[date] || 0) + t.net / 100;
    });

    const revenueChart = Object.entries(dailyTotals)
        .map(([date, amount]) => ({ date, amount }))
        .sort((a, b) => a.date.localeCompare(b.date));

    return {
        balance: {
            available: availableBalance,
            pending: pendingBalance,
            currency: balance.available[0]?.currency?.toUpperCase() || "USD"
        },
        customers: {
            total: totalCustomers,
            recentCount: customers.data.length
        },
        netVolume,
        recentPayments,
        revenueChart
    };
}
