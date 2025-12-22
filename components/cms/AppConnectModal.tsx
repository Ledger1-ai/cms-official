"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import NextImage from "next/image";
import { Loader2, Lock, ArrowRight, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AppIntegration {
    id: string;
    providerId: string;
    name: string;
    icon: string;
    description: string;
}

interface AppConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    app: AppIntegration;
    onSuccess: () => void;
}

export function AppConnectModal({ isOpen, onClose, app, onSuccess }: AppConnectModalProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    // Generic Form State
    const [shopUrl, setShopUrl] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");

    const handleConnect = async () => {
        setLoading(true);
        try {
            if (app.id === "shopify") {
                // Shopify OAUTH Flow
                if (!shopUrl) {
                    toast.error("Please enter your Shopify store URL");
                    setLoading(false);
                    return;
                }

                // Clean URL
                let cleanUrl = shopUrl.replace("https://", "").replace("http://", "").replace(/\/$/, "");
                if (!cleanUrl.includes(".myshopify.com")) {
                    cleanUrl = `${cleanUrl}.myshopify.com`;
                }

                // Redirect to backend auth handler
                router.push(`/api/cms/apps/shopify/auth?shop=${cleanUrl}`);
                return; // Router takes over
            }
            else if (app.id === "woocommerce" || app.id === "wordpress") {
                // Direct API Key Connection
                const res = await fetch("/api/cms/apps/connect", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        providerId: app.id,
                        displayName: app.name,
                        category: app.id === "woocommerce" ? "ECOMMERCE" : "PUBLISHING",
                        credentials: {
                            url: shopUrl,
                            key: apiKey,
                            secret: apiSecret
                        }
                    })
                });

                const data = await res.json();

                if (res.ok) {
                    toast.success(`Successfully connected to ${app.name}`);
                    onSuccess();
                    onClose();
                } else {
                    toast.error(data.error || "Connection failed");
                }
            }
        } catch (error) {
            console.error("Connection error", error);
            toast.error("Failed to connect");
        } finally {
            if (app.id !== "shopify") {
                setLoading(false);
            }
        }
    };

    const renderForm = () => {
        if (app.id === "shopify") {
            return (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="shopUrl" className="text-white">Store URL</Label>
                        <div className="relative">
                            <Input
                                id="shopUrl"
                                value={shopUrl}
                                onChange={(e) => setShopUrl(e.target.value)}
                                placeholder="my-store.myshopify.com"
                                className="pl-4 bg-black border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/50"
                            />
                        </div>
                        <p className="text-xs text-slate-500">
                            Enter your standard .myshopify.com URL. We will redirect you to Shopify to approve permissions.
                        </p>
                    </div>
                </div>
            );
        }

        if (app.id === "woocommerce") {
            return (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-white">Store URL</Label>
                        <Input
                            value={shopUrl}
                            onChange={(e) => setShopUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="bg-black border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white">Consumer Key</Label>
                        <Input
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            type="password"
                            placeholder="ck_..."
                            className="bg-black border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white">Consumer Secret</Label>
                        <Input
                            value={apiSecret}
                            onChange={(e) => setApiSecret(e.target.value)}
                            type="password"
                            placeholder="cs_..."
                            className="bg-black border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
                        />
                    </div>
                    <div className="bg-black p-3 rounded text-xs text-slate-500 border border-white/5">
                        <p className="flex items-center gap-1 mb-1 font-semibold text-slate-300">
                            <Lock className="h-3 w-3" /> API Permissions
                        </p>
                        Ensure you create keys with "Read/Write" permissions in WooCommerce {'>'} Settings {'>'} Advanced {'>'} REST API.
                    </div>
                </div>
            );
        }

        return <p className="text-slate-500 text-sm">Configuration for {app.name} is coming soon.</p>;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-[#0A0A0B] border-white/10 text-white p-0 gap-0 overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-br from-slate-900 to-black p-6 border-b border-white/5 flex items-center gap-4 relative">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative h-12 w-12 rounded-xl bg-white p-1 shadow-lg shrink-0">
                        <NextImage
                            src={app.icon}
                            alt={app.name}
                            fill
                            className="object-contain p-1"
                            unoptimized
                        />
                    </div>
                    <div>
                        <DialogTitle className="text-lg font-bold">Connect {app.name}</DialogTitle>
                        <DialogDescription className="text-slate-400 text-xs">
                            {app.description}
                        </DialogDescription>
                    </div>
                </div>

                <div className="p-6">
                    {renderForm()}
                </div>

                <DialogFooter className="p-6 bg-slate-900/30 border-t border-white/5 flex justify-between items-center">
                    <p className="text-[10px] text-slate-500 text-center w-full md:w-auto md:text-left mb-2 md:mb-0">
                        <Lock className="h-3 w-3 inline mr-1" />
                        Credentials are encrypted.
                    </p>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={onClose} disabled={loading} className="text-slate-400 hover:text-white">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConnect}
                            disabled={loading}
                            variant="gradient"
                            className="min-w-[100px]"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                                <span className="flex items-center gap-2">Connect <ArrowRight className="h-4 w-4" /></span>
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
