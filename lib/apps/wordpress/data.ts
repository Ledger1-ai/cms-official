import { decryptApiKey } from "@/lib/encryption/api-keys";

export interface WordPressData {
    site: {
        name: string;
        url: string;
        description: string;
    };
    content: {
        posts: number;
        pages: number;
        media: number;
        comments: number;
    };
    recentPosts: Array<{
        id: number;
        title: string;
        status: string;
        date: string;
        link: string;
    }>;
    syncStatus: {
        lastSync?: string;
        status: string;
    };
}

/**
 * Fetch WordPress dashboard data using the WordPress REST API.
 */
export async function fetchWordPressData(
    credentials: Record<string, string>
): Promise<WordPressData> {
    const { url, username, application_password } = credentials;

    if (!url || !username || !application_password) {
        throw new Error("WordPress URL, username, and application password required");
    }

    // Decrypt password if encrypted
    const password = application_password.startsWith('enc:')
        ? decryptApiKey(application_password)
        : application_password;

    const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

    const headers = {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
    };

    // Fetch site info
    let site = { name: 'WordPress Site', url: baseUrl, description: '' };
    try {
        const siteRes = await fetch(`${baseUrl}/wp-json`, { headers });
        if (siteRes.ok) {
            const siteData = await siteRes.json();
            site = {
                name: siteData.name || 'WordPress Site',
                url: siteData.url || baseUrl,
                description: siteData.description || ''
            };
        }
    } catch (e) {
        console.error('[WordPress] Site info fetch failed:', e);
    }

    // Fetch content counts
    let content = { posts: 0, pages: 0, media: 0, comments: 0 };

    try {
        // Posts count
        const postsRes = await fetch(`${baseUrl}/wp-json/wp/v2/posts?per_page=1`, { headers });
        if (postsRes.ok) {
            content.posts = parseInt(postsRes.headers.get('X-WP-Total') || '0');
        }

        // Pages count
        const pagesRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages?per_page=1`, { headers });
        if (pagesRes.ok) {
            content.pages = parseInt(pagesRes.headers.get('X-WP-Total') || '0');
        }

        // Media count
        const mediaRes = await fetch(`${baseUrl}/wp-json/wp/v2/media?per_page=1`, { headers });
        if (mediaRes.ok) {
            content.media = parseInt(mediaRes.headers.get('X-WP-Total') || '0');
        }

        // Comments count
        const commentsRes = await fetch(`${baseUrl}/wp-json/wp/v2/comments?per_page=1`, { headers });
        if (commentsRes.ok) {
            content.comments = parseInt(commentsRes.headers.get('X-WP-Total') || '0');
        }
    } catch (e) {
        console.error('[WordPress] Content counts fetch failed:', e);
    }

    // Fetch recent posts
    let recentPosts: WordPressData['recentPosts'] = [];
    try {
        const recentRes = await fetch(`${baseUrl}/wp-json/wp/v2/posts?per_page=5&orderby=date&order=desc`, { headers });
        if (recentRes.ok) {
            const postsData = await recentRes.json();
            recentPosts = postsData.map((p: { id: number; title: { rendered: string }; status: string; date: string; link: string }) => ({
                id: p.id,
                title: p.title.rendered,
                status: p.status,
                date: p.date,
                link: p.link
            }));
        }
    } catch (e) {
        console.error('[WordPress] Recent posts fetch failed:', e);
    }

    return {
        site,
        content,
        recentPosts,
        syncStatus: {
            status: 'Connected'
        }
    };
}
