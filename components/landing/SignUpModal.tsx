"use client";

import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, Save, Layout } from "lucide-react";

interface SignUpModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SignUpModal({ open, onOpenChange }: SignUpModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-slate-950 border-slate-800 text-slate-100 shadow-2xl">
                <DialogHeader className="gap-2">
                    <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                        <Save className="h-6 w-6 text-emerald-500" />
                    </div>
                    <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Save Your Masterpiece
                    </DialogTitle>
                    <DialogDescription className="text-center text-slate-400 text-base">
                        The demo environment is temporary. Create a free account to save your work, publish your site, and unlock all features.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-white/5 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-emerald-500/10">
                                <Layout className="h-4 w-4 text-emerald-400" />
                            </div>
                            <span className="text-sm">Save unlimited projects</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-purple-500/10">
                                <ArrowRight className="h-4 w-4 text-purple-400" />
                            </div>
                            <span className="text-sm">Deploy to custom domains</span>
                        </div>
                    </div>
                </div>

                <DialogFooter className="sm:justify-center gap-3">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="text-slate-400 hover:text-white hover:bg-white/10"
                    >
                        Continue Editing
                    </Button>
                    <Button
                        asChild
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20"
                    >
                        <Link href="/create-account">
                            Create Free Account
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
