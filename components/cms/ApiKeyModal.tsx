"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, Link, Key, ShieldCheck, ExternalLink, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    provider: {
        id: string;
        name: string;
        apiKeyLink?: string;
    };
    currentStatus?: {
        configured: boolean;
        masked: string | null;
        configuration?: any;
    };
    onSuccess: () => void;
}

export function ApiKeyModal({ isOpen, onClose, provider, currentStatus, onSuccess }: ApiKeyModalProps) {
    // Dynamic fields state
    const [apiKey, setApiKey] = useState("");
    const [config, setConfig] = useState<Record<string, string>>({});

    const [showApiKey, setShowApiKey] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Determine config type
    const isLegacy = provider.id === "google"; // Nano Banana uses legacy API
    const isAzure = provider.id === "azure";
    const isAws = provider.id === "aws";

    useEffect(() => {
        if (isOpen) {
            setApiKey("");
            setConfig(currentStatus?.configuration || {});
        }
    }, [isOpen, currentStatus]);

    const handleSave = async () => {
        if (!apiKey.trim() && !currentStatus?.configured) return;
        // If re-saving without changing key, keep partial udpates? 
        // For simplicity, require key on first save, optional on update if valid.

        setIsSaving(true);
        try {
            const endpoint = isLegacy ? '/api/cms/api-keys' : '/api/cms/user-ai-config';

            const payload: any = {
                provider: provider.id === 'google_standard' ? 'google' : provider.id,
                apiKey: apiKey || undefined, // Send undefined if empty to not overwrite? 
                // Actually simple logic: Always send key if provided. Backend handles encryption.
            };

            // Handling legacy vs new structure
            if (isLegacy) {
                payload.apiKey = apiKey;
            } else {
                payload.apiKey = apiKey;
                payload.configuration = config;
            }

            // Validation 
            if (!apiKey && !currentStatus?.configured) {
                toast.error("API Key is required");
                setIsSaving(false);
                return;
            }
            // For AWS/Azure, validation
            if (isAws && (!config.region)) {
                toast.error("Region is required for AWS");
                setIsSaving(false);
                return;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success(`${provider.name} configured successfully`);
                setApiKey("");
                onSuccess();
                onClose();
            } else {
                toast.error(data.error || 'Failed to save configuration');
            }
        } catch (error) {
            toast.error('Failed to save configuration');
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleRemove = async () => {
        if (!confirm(`Are you sure you want to remove your ${provider.name} configuration?`)) return;

        try {
            const endpoint = isLegacy ? `/api/cms/api-keys?provider=${provider.id}` : `/api/cms/user-ai-config?provider=${provider.id}`;

            const response = await fetch(endpoint, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Configuration removed successfully');
                onSuccess();
                onClose();
            } else {
                toast.error('Failed to remove configuration');
            }
        } catch (error) {
            toast.error('Error removing configuration');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-[#0A0A0B]/95 backdrop-blur-2xl border-white/10 text-white shadow-2xl ring-1 ring-white/5">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <Key className="h-5 w-5 text-cyan-400" />
                        Configure {provider.name}
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        {isAws ? "Enter your Access Key, Secret, and Region." :
                            isAzure ? "Enter your API Key and Resource Name." :
                                "Enter your API key to enable AI features."}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-2">

                    {/* Azure Specific Fields */}
                    {isAzure && (
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resource Name</Label>
                            <Input
                                placeholder="my-azure-openai-resource"
                                value={config.resourceName || ""}
                                onChange={(e) => setConfig({ ...config, resourceName: e.target.value })}
                                className="bg-black/40 border-white/10 text-white"
                            />
                        </div>
                    )}

                    {/* AWS Specific Fields */}
                    {isAws && (
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">AWS Region</Label>
                            <Input
                                placeholder="us-east-1"
                                value={config.region || ""}
                                onChange={(e) => setConfig({ ...config, region: e.target.value })}
                                className="bg-black/40 border-white/10 text-white"
                            />
                        </div>
                    )}

                    {/* Standard API Key (or Secret Key for AWS) */}
                    <div className="space-y-2">
                        <Label htmlFor="api-key" className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                            {isAws ? "Secret Access Key" : "API Key"}
                        </Label>
                        <div className="relative">
                            <Input
                                id="api-key"
                                type={showApiKey ? "text" : "password"}
                                placeholder={isAws ? "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" : "sk-..."}
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                className="bg-black/40 border-white/10 text-white focus:border-cyan-400/50 focus:ring-cyan-400/20 rounded-lg py-3 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowApiKey(!showApiKey)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                            >
                                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {provider.apiKeyLink && (
                            <p className="text-xs text-slate-500">
                                Get your key from{" "}
                                <a
                                    href={provider.apiKeyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                                >
                                    {provider.name} Dashboard <ExternalLink className="h-3 w-3" />
                                </a>
                            </p>
                        )}
                    </div>

                    {/* AWS Access Key ID */}
                    {isAws && (
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Access Key ID</Label>
                            <Input
                                placeholder="AKIAIOSFODNN7EXAMPLE"
                                value={config.accessKeyId || ""}
                                onChange={(e) => setConfig({ ...config, accessKeyId: e.target.value })}
                                className="bg-black/40 border-white/10 text-white"
                            />
                        </div>
                    )}

                    {currentStatus?.configured && (
                        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-green-400">
                                Configured: {currentStatus.masked || "••••••••"}
                            </span>
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    {currentStatus?.configured && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleRemove}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 mr-auto"
                        >
                            Remove
                        </Button>
                    )}
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="text-slate-400 hover:text-white hover:bg-white/5"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold"
                        >
                            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
