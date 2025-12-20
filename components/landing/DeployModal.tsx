"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Rocket, Globe, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { publishLandingPage } from "@/actions/cms/publish-landing-page";

export function DeployModal({ pageId, pageSlug, lastPublishedAt }: { pageId: string, pageSlug: string, lastPublishedAt?: Date | null }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeploy = async () => {
        setIsLoading(true);
        try {
            const result = await publishLandingPage(pageId);
            if (result.success) {
                toast.success("Page Published Successfully", {
                    description: `Your changes are now live at /landing/${pageSlug}`
                });
                setIsOpen(false);
            } else {
                toast.error("Deployment Failed", { description: result.error });
            }
        } catch (e) {
            toast.error("Deployment Failed", { description: "An unexpected error occurred." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20">
                    <Rocket className="mr-2 h-4 w-4" /> Deploy to Live
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md border-white/10 bg-zinc-950 text-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Globe className="h-5 w-5 text-emerald-500" />
                        Deploy to Production
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        You are about to push your draft changes to the live website.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex gap-3 items-start">
                        <AlertTriangle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div className="text-sm text-slate-300">
                            <strong>Ready to go live?</strong><br />
                            This will overwrite the current live version. The public URL is:<br />
                            <span className="text-emerald-400 font-mono mt-1 block">/landing/{pageSlug}</span>
                        </div>
                    </div>
                    {lastPublishedAt && (
                        <p className="text-xs text-slate-500 text-center">
                            Last published: {new Date(lastPublishedAt).toLocaleString()}
                        </p>
                    )}
                </div>

                <DialogFooter className="flex sm:justify-between gap-2">
                    <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                        Cancel
                    </Button>
                    <Button onClick={handleDeploy} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? "Deploying..." : "Confirm Deployment"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
