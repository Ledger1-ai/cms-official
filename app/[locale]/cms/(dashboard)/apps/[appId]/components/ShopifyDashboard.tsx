"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, RefreshCw, AlertCircle, Package } from "lucide-react";
import { useState } from "react";
import { AppConfigModal } from "@/components/cms/apps/AppConfigModal";

export function ShopifyDashboard() {
    const [isConnected, setIsConnected] = useState(false);
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6 animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-[#95BF47]/10 rounded-3xl flex items-center justify-center border border-[#95BF47]/20">
                    <ShoppingBag className="w-10 h-10 text-[#95BF47]" />
                </div>
                <div className="max-w-md space-y-2">
                    <h2 className="text-2xl font-bold text-white">Sync Your Shopify Store</h2>
                    <p className="text-slate-400">
                        Connect your store to manage inventory, track orders, and sync products directly to your CMS content.
                    </p>
                </div>
                <Button
                    size="lg"
                    className="bg-[#95BF47] hover:bg-[#95BF47]/90 text-white"
                    onClick={() => setIsConfigOpen(true)}
                >
                    Connect Store
                    <RefreshCw className="w-4 h-4 ml-2" />
                </Button>

                <AppConfigModal
                    isOpen={isConfigOpen}
                    onClose={() => setIsConfigOpen(false)}
                    app={{
                        id: "shopify",
                        name: "Shopify",
                        icon: "https://cdn.simpleicons.org/shopify/95BF47",
                        description: "E-commerce sync.",
                        category: "Commerce",
                        status: "active",
                        connected: false,
                        author: "Shopify Inc",
                        rating: 4.8,
                        installs: "2M+",
                        updatedAt: "2 days ago"
                    }}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Connected View (Empty Data) */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Store Overview</h2>
                <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Now
                </Button>
            </div>

            <Card className="bg-[#1A1B1E] border-white/10 p-10 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-3 bg-white/5 rounded-full">
                    <Package className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="font-medium text-white">No Recent Orders</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                    Your store is connected but we haven't synced any recent data yet. Click sync to fetch the latest orders.
                </p>
            </Card>
        </div>
    );
}
