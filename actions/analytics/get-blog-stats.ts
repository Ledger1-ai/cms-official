"use server";

import { prismadb } from "@/lib/prisma";
import { format, subDays } from "date-fns";

export async function getBlogStats() {
    try {
        const now = new Date();
        const thirtyDaysAgo = subDays(now, 30);

        // 1. Total Click Events (CTR)
        // @ts-ignore
        const totalClicks = await prismadb.blogEvent.count({
            where: {
                eventType: 'CLICK',
                createdAt: { gte: thirtyDaysAgo }
            }
        });

        // 2. Total Share Events
        // @ts-ignore
        const totalShares = await prismadb.blogEvent.count({
            where: {
                eventType: 'SHARE',
                createdAt: { gte: thirtyDaysAgo }
            }
        });

        // 3. Unique Blog Posts with Events
        // @ts-ignore
        const uniquePosts = await prismadb.blogEvent.groupBy({
            by: ['sourceUrl'],
            where: {
                createdAt: { gte: thirtyDaysAgo }
            }
        });
        const totalPostsWithEvents = uniquePosts.length;

        // 4. Fetch all events for trending and aggregation
        // @ts-ignore
        const allEvents = await prismadb.blogEvent.findMany({
            where: {
                createdAt: { gte: thirtyDaysAgo }
            },
            select: {
                eventType: true,
                sourceUrl: true,
                sharePlatform: true,
                createdAt: true
            }
        });

        // 5. Daily trend data
        const dailyStats = new Map<string, { clicks: number; shares: number }>();
        for (let i = 0; i < 30; i++) {
            const dateStr = format(subDays(now, i), 'MMM dd');
            dailyStats.set(dateStr, { clicks: 0, shares: 0 });
        }

        allEvents.forEach((event: { eventType: string; createdAt: Date }) => {
            const dateStr = format(event.createdAt, 'MMM dd');
            if (dailyStats.has(dateStr)) {
                const stat = dailyStats.get(dateStr)!;
                if (event.eventType === 'CLICK') {
                    stat.clicks++;
                } else if (event.eventType === 'SHARE') {
                    stat.shares++;
                }
            }
        });

        const chartData = Array.from(dailyStats.entries())
            .map(([date, stats]) => ({
                date,
                "Clicks": stats.clicks,
                "Shares": stats.shares
            }))
            .reverse();

        // 6. Top blog posts by total engagement
        const postEngagement = new Map<string, { clicks: number; shares: number }>();
        allEvents.forEach((event: { eventType: string; sourceUrl: string }) => {
            if (!postEngagement.has(event.sourceUrl)) {
                postEngagement.set(event.sourceUrl, { clicks: 0, shares: 0 });
            }
            const stat = postEngagement.get(event.sourceUrl)!;
            if (event.eventType === 'CLICK') stat.clicks++;
            else if (event.eventType === 'SHARE') stat.shares++;
        });

        const topPosts = Array.from(postEngagement.entries())
            .map(([url, stats]) => ({
                url,
                title: url.split('/').pop()?.replace(/-/g, ' ') || url, // Extract slug as title
                clicks: stats.clicks,
                shares: stats.shares,
                total: stats.clicks + stats.shares
            }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 10);

        // 7. Share distribution by platform
        const platformCounts = new Map<string, number>();
        allEvents
            .filter((e: { eventType: string }) => e.eventType === 'SHARE')
            .forEach((event: { sharePlatform: string | null }) => {
                const platform = event.sharePlatform || 'Unknown';
                platformCounts.set(platform, (platformCounts.get(platform) || 0) + 1);
            });

        const sharePlatforms = Array.from(platformCounts.entries())
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        // 8. KPI Data for dashboard cards
        const kpiData = [
            {
                title: "Link Clicks (30d)",
                metric: totalClicks.toLocaleString(),
                delta: totalClicks > 0 ? "Active" : "No data",
                deltaType: totalClicks > 0 ? "increase" : "unchanged",
                icon: "MousePointerClick"
            },
            {
                title: "Share Clicks (30d)",
                metric: totalShares.toLocaleString(),
                delta: totalShares > 0 ? "Active" : "No data",
                deltaType: totalShares > 0 ? "increase" : "unchanged",
                icon: "Share2"
            },
            {
                title: "Posts Engaged",
                metric: totalPostsWithEvents.toString(),
                delta: "Tracked",
                deltaType: "moderateIncrease",
                icon: "FileText"
            }
        ];

        return {
            chartData,
            topPosts,
            sharePlatforms,
            kpiData,
            summary: {
                totalClicks,
                totalShares,
                totalPostsWithEvents
            }
        };

    } catch (error) {
        console.error("Blog Stats Error", error);
        return null;
    }
}
