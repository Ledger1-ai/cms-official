"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Mail, X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { publicSubscribe } from "@/actions/public/subscribe";
import { motion, AnimatePresence } from "framer-motion";

export default function SubscriptionOverlay() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // State
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [preferences, setPreferences] = useState({ blog: true, careers: true });
    const [submitting, setSubmitting] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    // Check for manual trigger via URL
    useEffect(() => {
        if (searchParams?.get("newsletter") === "true") {
            setIsOpen(true);
        }
    }, [searchParams]);

    // Handle Scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400 && !hasScrolled) {
                const dismissed = localStorage.getItem("subscription_dismissed");
                const subscribed = localStorage.getItem("is_subscribed");

                if (!subscribed && !dismissed) {
                    setHasScrolled(true);
                    setIsOpen(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasScrolled]);

    const handleClose = (open: boolean) => {
        if (!open) {
            setIsOpen(false);
            // If it was opened via URL, remove the param
            if (searchParams?.get("newsletter") === "true") {
                const params = new URLSearchParams(searchParams.toString());
                params.delete("newsletter");
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            }

            // Mark as dismissed for this session/day if closed without subscribing
            if (!localStorage.getItem("is_subscribed")) {
                localStorage.setItem("subscription_dismissed", "true");
            }
        }
    };

    const handleSubscribe = async () => {
        if (!email) return;
        setSubmitting(true);
        try {
            const res = await publicSubscribe({ email, preferences });
            if (res.success) {
                toast.success(res.message);
                localStorage.setItem("is_subscribed", "true");
                setIsOpen(false);
                setEmail("");
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px] !bg-zinc-950 border-zinc-800 text-white shadow-2xl">
                <DialogHeader className="space-y-3">
                    <div className="mx-auto bg-blue-500/20 p-3 rounded-full w-fit">
                        <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <DialogTitle className="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Stay in the inner circle
                    </DialogTitle>
                    <DialogDescription className="text-center text-slate-400 text-base leading-relaxed">
                        Get the latest insights on AI agents, career opportunities, and platform updates directly to your inbox.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <Input
                        placeholder="Enter your email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black text-white border-zinc-700 placeholder:text-zinc-500 focus:border-blue-500 h-11"
                    />

                    <div className="space-y-3 bg-black/50 p-4 rounded-lg border border-zinc-900">
                        <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">I want to receive:</Label>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="blog"
                                    checked={preferences.blog}
                                    onCheckedChange={(c) => setPreferences(p => ({ ...p, blog: !!c }))}
                                    className="border-zinc-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <Label htmlFor="blog" className="text-sm font-medium cursor-pointer text-zinc-300">Blog Posts & Updates</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="careers"
                                    checked={preferences.careers}
                                    onCheckedChange={(c) => setPreferences(p => ({ ...p, careers: !!c }))}
                                    className="border-zinc-700 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                                />
                                <Label htmlFor="careers" className="text-sm font-medium cursor-pointer text-zinc-300">Career Opportunities</Label>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    onClick={handleSubscribe}
                    disabled={submitting || !email}
                    variant="glow"
                    className="w-full h-12 text-lg font-bold text-white shadow-xl shadow-purple-500/20"
                >
                    {submitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Subscribe Now"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
