"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, ArrowUp, ArrowDown, RefreshCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { updateHeaderConfig } from "@/actions/cms/header-actions";
import Image from "next/image";

interface NavItem {
    label: string;
    href: string;
}

interface HeaderEditorProps {
    initialConfig: any;
}

export default function HeaderEditor({ initialConfig }: HeaderEditorProps) {
    const [isPending, startTransition] = useTransition();

    // State
    const [isActive, setIsActive] = useState(initialConfig?.isActive ?? true);
    const [logoUrl, setLogoUrl] = useState(initialConfig?.logoUrl ?? "/BasaltCMSWide.png");
    const [showCta, setShowCta] = useState(initialConfig?.showCta ?? true);
    const [ctaText, setCtaText] = useState(initialConfig?.ctaText ?? "Get Started");
    const [ctaLink, setCtaLink] = useState(initialConfig?.ctaLink ?? "/create-account");

    const [navItems, setNavItems] = useState<NavItem[]>(initialConfig?.navigationItems && initialConfig.navigationItems.length > 0 ? initialConfig.navigationItems : [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "FAQ", href: "/faq" },
        { label: "Blog", href: "/blog" },
        { label: "Support", href: "/support" }
    ]);

    const handlePullDefaults = () => {
        if (confirm("This will overwrite your current changes with the default template. Continue?")) {
            setNavItems([
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "FAQ", href: "/faq" },
                { label: "Blog", href: "/blog" },
                { label: "Support", href: "/support" }
            ]);
            setLogoUrl("/BasaltCMSWide.png");
            setShowCta(true);
            setCtaText("Get Started");
            setCtaLink("/create-account");
            setIsActive(true);
            toast.info("Reset to default configuration");
        }
    };

    const handleSave = () => {
        startTransition(async () => {
            const result = await updateHeaderConfig({
                logoUrl,
                navigationItems: navItems,
                showCta,
                ctaText,
                ctaLink,
                isActive
            });

            if (result.success) {
                toast.success("Header updated successfully");
            } else {
                toast.error("Failed to update header");
            }
        });
    };

    const addNavItem = () => {
        setNavItems([...navItems, { label: "New Link", href: "/" }]);
    };

    const removeNavItem = (index: number) => {
        setNavItems(navItems.filter((_, i) => i !== index));
    };

    const updateNavItem = (index: number, field: keyof NavItem, value: string) => {
        const newItems = [...navItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setNavItems(newItems);
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === navItems.length - 1) return;

        const newItems = [...navItems];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
        setNavItems(newItems);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-24">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Header Management</h2>
                    <p className="text-slate-400">Customize your global website header.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={handlePullDefaults} disabled={isPending}>
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Pull Defaults
                    </Button>
                    <Button onClick={handleSave} disabled={isPending} className="bg-purple-600 hover:bg-purple-700">
                        {isPending ? "Saving..." : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Push Changes
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Visual Preview (Mock) */}
                <div className="md:col-span-3">
                    <Card className="bg-slate-950 border-slate-800">
                        <CardHeader>
                            <CardTitle>Live Preview (Approximation)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border border-white/10 rounded-lg p-4 bg-[#0F0F1A] flex items-center justify-between">
                                <div className="h-10 w-32 relative">
                                    <Image src={logoUrl} alt="Logo" fill className="object-contain" />
                                </div>
                                <div className="hidden md:flex items-center gap-6">
                                    {navItems.map((item, i) => (
                                        <span key={i} className="text-sm font-medium text-gray-300">{item.label}</span>
                                    ))}
                                </div>
                                {showCta && (
                                    <div className="px-4 py-2 bg-slate-800 rounded-full text-white text-sm font-medium border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                                        {ctaText}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* General Settings */}
                <div className="md:col-span-1 space-y-6">
                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="active-mode">Enable Custom Header</Label>
                                <Switch id="active-mode" checked={isActive} onCheckedChange={setIsActive} />
                            </div>
                            <Separator className="bg-white/10" />
                            <div className="space-y-2">
                                <Label>Logo URL</Label>
                                <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="bg-slate-950 border-slate-800" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-slate-800">
                        <CardHeader>
                            <CardTitle>Call to Action</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="show-cta">Show CTA Button</Label>
                                <Switch id="show-cta" checked={showCta} onCheckedChange={setShowCta} />
                            </div>
                            {showCta && (
                                <>
                                    <div className="space-y-2">
                                        <Label>Button Text</Label>
                                        <Input value={ctaText} onChange={(e) => setCtaText(e.target.value)} className="bg-slate-950 border-slate-800" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Button Link</Label>
                                        <Input value={ctaLink} onChange={(e) => setCtaLink(e.target.value)} className="bg-slate-950 border-slate-800" />
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Navigation Items */}
                <div className="md:col-span-2">
                    <Card className="bg-slate-900 border-slate-800 h-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Navigation Menu</CardTitle>
                                <CardDescription>Manage your top-level menu links.</CardDescription>
                            </div>
                            <Button size="sm" onClick={addNavItem} className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2" /> Add Link
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {navItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-lg border border-white/5 group hover:border-white/10 transition-colors">
                                    <div className="flex flex-col gap-1">
                                        <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-500 hover:text-white" onClick={() => moveItem(index, 'up')} disabled={index === 0}>
                                            <ArrowUp className="h-3 w-3" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-6 w-6 text-slate-500 hover:text-white" onClick={() => moveItem(index, 'down')} disabled={index === navItems.length - 1}>
                                            <ArrowDown className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    <div className="flex-1 grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label className="text-xs text-slate-500">Label</Label>
                                            <Input
                                                value={item.label}
                                                onChange={(e) => updateNavItem(index, 'label', e.target.value)}
                                                className="h-8 bg-slate-900 border-slate-800"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs text-slate-500">Link URL</Label>
                                            <Input
                                                value={item.href}
                                                onChange={(e) => updateNavItem(index, 'href', e.target.value)}
                                                className="h-8 bg-slate-900 border-slate-800"
                                            />
                                        </div>
                                    </div>

                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-400/10" onClick={() => removeNavItem(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}

                            {navItems.length === 0 && (
                                <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-lg">
                                    No navigation links found. Click "Add Link" to create one.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
