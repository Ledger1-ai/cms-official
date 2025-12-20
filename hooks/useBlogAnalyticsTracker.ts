"use client";

import { useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";

interface BlogAnalyticsConfig {
    /** CSS selector for the blog content container. Default: ".blog-content" */
    contentSelector?: string;
    /** CSS selector for share buttons. Default: "[data-share-platform]" */
    shareButtonSelector?: string;
    /** Debounce time in ms to prevent duplicate events. Default: 500 */
    debounceMs?: number;
}

/**
 * React hook for tracking blog engagement events (CTR and Shares).
 * 
 * Usage:
 * ```tsx
 * function BlogPost() {
 *   useBlogAnalyticsTracker();
 *   return (
 *     <div className="blog-content">
 *       <a href="https://example.com">External Link</a>
 *       <button data-share-platform="Twitter">Share on Twitter</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useBlogAnalyticsTracker(config: BlogAnalyticsConfig = {}) {
    const {
        contentSelector = ".blog-content",
        shareButtonSelector = "[data-share-platform]",
        debounceMs = 500,
    } = config;

    const pathname = usePathname();
    const lastEventRef = useRef<{ type: string; url: string; time: number }>({
        type: "",
        url: "",
        time: 0,
    });

    // Get or create visitor ID
    const getVisitorId = useCallback(() => {
        if (typeof window === "undefined") return null;
        let visitorId = localStorage.getItem("cms_visitor_id");
        if (!visitorId) {
            visitorId = crypto.randomUUID();
            localStorage.setItem("cms_visitor_id", visitorId);
        }
        return visitorId;
    }, []);

    // Non-blocking event tracker
    const trackEvent = useCallback(
        async (eventData: {
            eventType: "CLICK" | "SHARE";
            destinationUrl?: string;
            sharePlatform?: string;
        }) => {
            const now = Date.now();
            const eventKey = `${eventData.eventType}-${eventData.destinationUrl || eventData.sharePlatform}`;

            // Debounce duplicate events
            if (
                lastEventRef.current.type === eventKey &&
                now - lastEventRef.current.time < debounceMs
            ) {
                return;
            }

            lastEventRef.current = { type: eventKey, url: pathname, time: now };

            const payload = {
                ...eventData,
                sourceUrl: pathname,
                visitorId: getVisitorId(),
            };

            // Use sendBeacon for non-blocking, or fall back to fetch
            if (navigator.sendBeacon) {
                const blob = new Blob([JSON.stringify(payload)], {
                    type: "application/json",
                });
                navigator.sendBeacon("/api/analytics/blog-events", blob);
            } else {
                fetch("/api/analytics/blog-events", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                    keepalive: true,
                }).catch(() => {
                    // Silent fail - analytics should not break the page
                });
            }
        },
        [pathname, debounceMs, getVisitorId]
    );

    // Handle link clicks within blog content
    const handleLinkClick = useCallback(
        (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const anchor = target.closest("a[href]") as HTMLAnchorElement | null;

            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href) return;

            // Only track external links or links with full URLs
            const isExternal =
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("//");
            const isSamePage = href.startsWith("#");

            if (isExternal && !isSamePage) {
                trackEvent({
                    eventType: "CLICK",
                    destinationUrl: href,
                });
            }
        },
        [trackEvent]
    );

    // Handle share button clicks
    const handleShareClick = useCallback(
        (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const shareButton = target.closest(shareButtonSelector) as HTMLElement | null;

            if (!shareButton) return;

            const platform = shareButton.getAttribute("data-share-platform");
            if (platform) {
                trackEvent({
                    eventType: "SHARE",
                    sharePlatform: platform,
                });
            }
        },
        [shareButtonSelector, trackEvent]
    );

    useEffect(() => {
        // Skip during SSR
        if (typeof window === "undefined") return;

        // Find the blog content container
        const contentContainer = document.querySelector(contentSelector);

        if (contentContainer) {
            contentContainer.addEventListener("click", handleLinkClick as EventListener);
        }

        // Add share button listeners (may be outside content container)
        document.addEventListener("click", handleShareClick as EventListener);

        return () => {
            if (contentContainer) {
                contentContainer.removeEventListener("click", handleLinkClick as EventListener);
            }
            document.removeEventListener("click", handleShareClick as EventListener);
        };
    }, [contentSelector, handleLinkClick, handleShareClick]);

    // Return a manual tracking function for programmatic use
    return {
        trackClick: (destinationUrl: string) =>
            trackEvent({ eventType: "CLICK", destinationUrl }),
        trackShare: (sharePlatform: string) =>
            trackEvent({ eventType: "SHARE", sharePlatform }),
    };
}
