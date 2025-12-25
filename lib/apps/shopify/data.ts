export interface ShopifyData {
    store: {
        name: string;
        domain: string;
        currency: string;
    };
    orders: {
        total: number;
        recent: Array<{
            id: string;
            name: string;
            total: string;
            status: string;
            createdAt: string;
            customerName?: string;
        }>;
    };
    products: {
        total: number;
    };
    revenue: {
        total: number;
        currency: string;
    };
}

/**
 * Fetch Shopify dashboard data using the Shopify Admin API.
 */
export async function fetchShopifyData(
    credentials: Record<string, string>
): Promise<ShopifyData> {
    const { shop, accessToken, url } = credentials;
    const shopDomain = shop || url;

    if (!shopDomain || !accessToken) {
        throw new Error("Shopify shop domain and access token required");
    }

    const baseUrl = shopDomain.includes('myshopify.com')
        ? `https://${shopDomain}`
        : shopDomain;

    const headers = {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
    };

    // Fetch shop info
    const shopRes = await fetch(`${baseUrl}/admin/api/2024-01/shop.json`, { headers });
    const shopData = shopRes.ok ? await shopRes.json() : { shop: {} };

    // Fetch order count
    const orderCountRes = await fetch(`${baseUrl}/admin/api/2024-01/orders/count.json`, { headers });
    const orderCount = orderCountRes.ok ? (await orderCountRes.json()).count : 0;

    // Fetch recent orders
    const ordersRes = await fetch(`${baseUrl}/admin/api/2024-01/orders.json?limit=10&status=any`, { headers });
    const ordersData = ordersRes.ok ? await ordersRes.json() : { orders: [] };

    // Fetch product count
    const productCountRes = await fetch(`${baseUrl}/admin/api/2024-01/products/count.json`, { headers });
    const productCount = productCountRes.ok ? (await productCountRes.json()).count : 0;

    // Calculate total revenue from orders
    const totalRevenue = ordersData.orders?.reduce((sum: number, order: { total_price?: string }) => {
        return sum + parseFloat(order.total_price || '0');
    }, 0) || 0;

    return {
        store: {
            name: shopData.shop?.name || 'Unknown Store',
            domain: shopData.shop?.domain || shopDomain,
            currency: shopData.shop?.currency || 'USD'
        },
        orders: {
            total: orderCount,
            recent: ordersData.orders?.slice(0, 10).map((order: {
                id: number;
                name: string;
                total_price: string;
                financial_status: string;
                created_at: string;
                customer?: { first_name?: string; last_name?: string };
            }) => ({
                id: String(order.id),
                name: order.name,
                total: order.total_price,
                status: order.financial_status,
                createdAt: order.created_at,
                customerName: order.customer
                    ? `${order.customer.first_name || ''} ${order.customer.last_name || ''}`.trim()
                    : undefined
            })) || []
        },
        products: {
            total: productCount
        },
        revenue: {
            total: totalRevenue,
            currency: shopData.shop?.currency || 'USD'
        }
    };
}
