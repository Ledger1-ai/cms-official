"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle, Save } from "lucide-react";
import { toast } from "sonner";
import { AppItem } from "@/components/cms/apps/AppMarketplaceItem";

interface AppConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    app: AppItem | null;
}

// Config Field Definition
type ConfigField = {
    key: string;
    label: string;
    type: "text" | "password" | "oauth";
    placeholder?: string;
    description?: string;
    readOnly?: boolean;
    defaultValue?: string;
};

// Configuration Map
const APP_CONFIGS: Record<string, ConfigField[]> = {
    // Plugins
    "google-analytics": [
        { key: "measurementId", label: "Measurement ID (G-XXXXXXXXXX)", type: "text", placeholder: "G-..." }
    ],

    "algolia": [
        { key: "appId", label: "App ID", type: "text", placeholder: "Algolia App ID" },
        { key: "searchApiKey", label: "Search-Only API Key", type: "password", placeholder: "Key starting with..." }
    ],
    "wordfence": [
        { key: "licenseKey", label: "License Key", type: "password", placeholder: "Enter your Wordfence License Key" }
    ],
    "surge": [
        { key: "merchantId", label: "Wallet ID", type: "text", placeholder: "Surge Wallet ID" },
        { key: "publicKey", label: "Public Key", type: "text", placeholder: "Your Surge Public Key" }
    ],
    "zapier": [
        { key: "webhookUrl", label: "Webhook URL", type: "text", placeholder: "https://hooks.zapier.com/..." }
    ],
    "cloudflare": [
        { key: "zoneId", label: "Zone ID", type: "text" },
        { key: "apiToken", label: "API Token", type: "password" }
    ],

    // Credentials
    "stripe": [
        { key: "publishableKey", label: "Publishable Key", type: "text", placeholder: "pk_live_..." },
        { key: "secretKey", label: "Secret Key", type: "password", placeholder: "sk_live_..." }
    ],

    "hubspot": [
        { key: "accessToken", label: "Private App Access Token", type: "password" }
    ],

    "shopify": [
        { key: "storeDomain", label: "Store Domain (.myshopify.com)", type: "text", placeholder: "your-store.myshopify.com" },
        { key: "adminAccessToken", label: "Admin Access Token", type: "password", placeholder: "shpat_..." }
    ],
    "woocommerce": [
        { key: "storeUrl", label: "Store URL", type: "text", placeholder: "https://your-store.com" },
        { key: "consumerKey", label: "Consumer Key", type: "password", placeholder: "ck_..." },
        { key: "consumerSecret", label: "Consumer Secret", type: "password", placeholder: "cs_..." }
    ],
    "wordpress": [
        { key: "siteUrl", label: "WordPress Site URL", type: "text", placeholder: "https://your-site.com" },
        { key: "username", label: "Username", type: "text" },
        { key: "applicationPassword", label: "Application Password", type: "password", placeholder: "xxxx xxxx xxxx xxxx" }
    ],
    "yoast": [
        { key: "licenseKey", label: "Yoast Premium License Key (Optional)", type: "password" }
    ],

    // Social & OAuth Apps (Real Configuration)
    "x_social": [
        { key: "clientId", label: "Client ID", type: "text", placeholder: "From X Developer Portal" },
        { key: "clientSecret", label: "Client Secret", type: "password" },
        { key: "redirectUri", label: "Redirect URI (Copy to App Settings)", type: "text", readOnly: true, defaultValue: "/api/oauth/callback/x_social" }
    ],
    "reddit": [
        { key: "clientId", label: "Client ID", type: "text", placeholder: "From Reddit Apps" },
        { key: "clientSecret", label: "Client Secret", type: "password" },
        { key: "redirectUri", label: "Redirect URI", type: "text", readOnly: true, defaultValue: "/api/oauth/callback/reddit" }
    ],
    "linkedin": [
        { key: "clientId", label: "Client ID", type: "text", placeholder: "From LinkedIn Developers" },
        { key: "clientSecret", label: "Client Secret", type: "password" },
        { key: "redirectUri", label: "Redirect URI", type: "text", readOnly: true, defaultValue: "/api/oauth/callback/linkedin" }
    ],
    "mailchimp": [
        { key: "clientId", label: "Client ID", type: "text" },
        { key: "clientSecret", label: "Client Secret", type: "password" },
        { key: "dc", label: "Data Center (e.g. us19)", type: "text" }
    ],
    "intercom": [
        { key: "clientId", label: "Client ID", type: "text" },
        { key: "clientSecret", label: "Client Secret", type: "password" }
    ],
    "slack": [
        { key: "clientId", label: "Client ID", type: "text" },
        { key: "clientSecret", label: "Client Secret", type: "password" },
        { key: "webhookUrl", label: "Webhook URL (Optional)", type: "text" }
    ],
    "discord": [
        { key: "clientId", label: "Client ID", type: "text" },
        { key: "clientSecret", label: "Client Secret", type: "password" }
    ],
    "twitch": [
        { key: "clientId", label: "Client ID", type: "text" },
        { key: "clientSecret", label: "Client Secret", type: "password" }
    ],
    "pinterest": [
        { key: "appId", label: "App ID", type: "text" },
        { key: "appSecret", label: "App Secret", type: "password" }
    ],
    "tiktok": [
        { key: "clientKey", label: "Client Key", type: "text" },
        { key: "clientSecret", label: "Client Secret", type: "password" }
    ],
    "snapchat": [
        { key: "clientId", label: "Confidential OAuth Client ID", type: "text" },
        { key: "clientSecret", label: "Client Secret", type: "password" }
    ],
    "meta_suite": [
        { key: "appId", label: "App ID (Facebook/Insta)", type: "text" },
        { key: "appSecret", label: "App Secret", type: "password" }
    ],
    // Web3 / Other
    "farcaster": [
        { key: "signerUuid", label: "Signer UUID", type: "password", placeholder: "Private Signer Key" },
        { key: "fid", label: "Farcaster ID (FID)", type: "text" }
    ],
    "zora": [
        { key: "apiKey", label: "API Key", type: "password", placeholder: "Zora API Key" }
    ],
    "base_app": [
        { key: "rpcUrl", label: "RPC URL (Optional)", type: "text" },
        { key: "privateKey", label: "Deployer Private Key", type: "password" }
    ],
    // Default Fallback for OAuth apps (until real OAuth route is ready)
    "default_oauth": [
        { key: "oauth_connect", label: "Connect Account", type: "oauth" }
    ]
};

export function AppConfigModal({ isOpen, onClose, app }: AppConfigModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({});

    // Reset form when app changes
    useEffect(() => {
        if (isOpen) {
            setFormData({});
            // TODO: Fetch existing config here if we want to pre-fill
        }
    }, [isOpen, app]);

    if (!app) return null;

    // Determine fields
    let fields = APP_CONFIGS[app.id];

    // Auto-detect OAuth apps if not explicitly defined
    const oauthApps = ["youtube", "x_social", "linkedin", "meta_suite", "reddit", "discord", "tiktok", "pinterest", "twitch", "telegram", "snapchat", "threads", "whatsapp_business", "farcaster", "base_app", "zora"];
    if (!fields && oauthApps.includes(app.id)) {
        fields = APP_CONFIGS["default_oauth"];
    }

    if (!fields) {
        // Fallback for missing config
        fields = [
            { key: "apiKey", label: "API Key / Configuration", type: "text", placeholder: "Enter configuration value" }
        ];
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/apps/configure", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    appId: app.id,
                    displayname: app.name,
                    category: app.category.toUpperCase().replace(" & ", "_").replace(" ", "_"), // Simple mapping attempt
                    credentials: formData,
                    config: {}
                })
            });

            if (!res.ok) throw new Error("Failed to save");

            toast.success(`${app.name} configured successfully`);
            onClose();
        } catch (error) {
            toast.error("Failed to save configuration");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthConnect = () => {
        toast.info("Redirecting to Provider...");
        // Valid for future implementation: router.push(`/api/oauth/signin/${app.id}`);
        setTimeout(() => {
            toast.success(`Successfully connected to ${app.name} (Simulated)`);
            onClose();
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-[#1A1B1E] border-white/10 text-white">
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-4">
                        {app.icon && (
                            <img
                                src={app.icon}
                                alt={app.name}
                                className="w-12 h-12 rounded-xl object-contain bg-white/5 p-2 border border-white/10"
                                onError={(e) => {
                                    // Fallback if image fails
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        )}
                        <div>
                            <DialogTitle className="text-xl">{app.name} Configuration</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                {app.description}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {fields.map((field) => (
                        <div key={field.key} className="space-y-2">
                            <Label className="text-slate-300">
                                {field.label}
                                {field.description && <span className="text-xs text-slate-500 ml-2">({field.description})</span>}
                            </Label>

                            {field.type === "oauth" ? (
                                <Button
                                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
                                    onClick={handleOAuthConnect}
                                >
                                    Connect {app.name} Account
                                </Button>
                            ) : (
                                <Input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={field.readOnly ? (typeof window !== "undefined" ? `${window.location.origin}${field.defaultValue}` : field.defaultValue) : (formData[field.key] || "")}
                                    readOnly={field.readOnly}
                                    onChange={(e) => !field.readOnly && setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                    className={`bg-[#0A0A0B] border-white/10 text-white focus:border-blue-500/50 ${field.readOnly && "opacity-60 cursor-copy"}`}
                                />
                            )}
                        </div>
                    ))}

                    {/* Security Notice */}
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>Credentials are encrypted at rest using AES-256 before being stored in the database.</p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} className="hover:bg-white/5 hover:text-white">
                        Cancel
                    </Button>
                    {/* Only show Save for non-OAuth forms, or if mixed */}
                    {fields.some(f => f.type !== "oauth") && (
                        <Button onClick={handleSubmit} disabled={loading} className="bg-white text-black hover:bg-slate-200">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Configuration
                        </Button>
                    )}

                    {/* Explicit Connect Button for OAuth apps that now have fields */}
                    {["x_social", "reddit", "linkedin", "mailchimp", "intercom", "slack", "discord", "twitch", "pinterest", "tiktok", "snapchat", "meta_suite"].includes(app.id) && (
                        <Button
                            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
                            onClick={() => {
                                // Trigger Real OAuth Flow
                                toast.loading(`Initiating ${app.name} connection...`);
                                // In a real scenario, we'd hit looking up the ID from DB, 
                                // but here we can just assume user saved or passed param.
                                // Redirect to /api/oauth/signin/[appId]
                                window.location.href = `/api/oauth/signin/${app.id}`;
                            }}
                        >
                            Connect {app.name} (OAuth)
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
