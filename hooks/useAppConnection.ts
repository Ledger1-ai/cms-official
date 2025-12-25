"use client";

import { useState, useEffect, useCallback } from "react";

interface AppConnection {
    id: string;
    providerId: string;
    displayName: string;
    category: string;
    isActive: boolean;
    profileName?: string;
    profileHandle?: string;
    profileAvatarUrl?: string;
    config?: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}

interface UseAppConnectionResult {
    isConnected: boolean;
    connection: AppConnection | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to check if a specific app is connected and fetch its connection data.
 * Uses 5-minute caching to balance real-time feel with API rate limits.
 */
export function useAppConnection(providerId: string): UseAppConnectionResult {
    const [connection, setConnection] = useState<AppConnection | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchConnection = useCallback(async () => {
        if (!providerId) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`/api/cms/apps/${providerId}/status`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                // 5-minute cache as per architecture decision
                next: { revalidate: 300 }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    // Not connected - this is expected
                    setConnection(null);
                    return;
                }
                throw new Error(`Failed to fetch connection status`);
            }

            const data = await response.json();
            setConnection(data.connection || null);
        } catch (err) {
            console.error(`[useAppConnection] Error for ${providerId}:`, err);
            setError(err instanceof Error ? err.message : "Unknown error");
            setConnection(null);
        } finally {
            setIsLoading(false);
        }
    }, [providerId]);

    useEffect(() => {
        fetchConnection();
    }, [fetchConnection]);

    return {
        isConnected: !!connection?.isActive,
        connection,
        isLoading,
        error,
        refetch: fetchConnection
    };
}

interface AppDashboardData<T = unknown> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    lastUpdated: Date | null;
}

/**
 * Hook to fetch dashboard data for a connected app.
 * Only fetches if the app is connected. Uses 5-minute caching.
 */
export function useAppDashboardData<T = unknown>(
    providerId: string,
    isConnected: boolean
): AppDashboardData<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchData = useCallback(async () => {
        if (!providerId || !isConnected) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`/api/cms/apps/${providerId}/data`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch ${providerId} data`);
            }

            const result = await response.json();
            setData(result.data);
            setLastUpdated(new Date());
        } catch (err) {
            console.error(`[useAppDashboardData] Error for ${providerId}:`, err);
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setIsLoading(false);
        }
    }, [providerId, isConnected]);

    useEffect(() => {
        if (isConnected) {
            fetchData();
        }
    }, [isConnected, fetchData]);

    return {
        data,
        isLoading,
        error,
        refetch: fetchData,
        lastUpdated
    };
}
