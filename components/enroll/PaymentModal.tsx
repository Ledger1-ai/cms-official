"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    planPrice: number;
    onSubmit: () => Promise<void>;
    loading: boolean;
}

export function PaymentModal({ isOpen, onClose, planName, planPrice, onSubmit, loading }: PaymentModalProps) {
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    // Simulate basic validation
    const isValid = cardName && cardNumber.length >= 16 && expiry && cvc.length >= 3;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[480px] bg-black border border-white/10 text-white p-0 overflow-hidden gap-0 shadow-2xl shadow-emerald-900/10">

                {/* Header Section with Gradient */}
                <div className="bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 p-6 border-b border-white/5 relative overflow-hidden backdrop-blur-3xl">
                    <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
                    <div className="relative z-10">
                        <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
                            <ShieldCheck className="h-5 w-5 text-emerald-400" />
                            Secure Checkout
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 mt-1">
                            Complete your enrollment for the <span className="text-white font-medium">{planName}</span> plan.
                        </DialogDescription>
                    </div>
                </div>

                <div className="p-6 space-y-6 bg-black">
                    {/* Order Summary */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                        <div>
                            <p className="text-sm text-slate-400">Subscription</p>
                            <p className="font-semibold text-white">{planName} Plan</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-400">Total</p>
                            <p className="font-bold text-xl text-white">${planPrice}<span className="text-sm text-slate-500 font-normal">/mo</span></p>
                        </div>
                    </div>

                    {/* Card Form */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Cardholder Name</Label>
                            <div className="relative">
                                <Input
                                    className="bg-white/5 border-white/10 text-white focus:border-emerald-500/50 pl-10 h-11 placeholder:text-slate-500"
                                    placeholder="John Doe"
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Card Number</Label>
                            <div className="relative">
                                <Input
                                    className="bg-white/5 border-white/10 text-white focus:border-emerald-500/50 pl-10 h-11 font-mono tracking-widest placeholder:text-slate-500"
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                                />
                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Expiry Date</Label>
                                <Input
                                    className="bg-white/5 border-white/10 text-white focus:border-emerald-500/50 h-11 text-center placeholder:text-slate-500"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    value={expiry}
                                    onChange={(e) => {
                                        let val = e.target.value.replace(/\D/g, '');
                                        if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
                                        setExpiry(val);
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-400 text-xs uppercase tracking-wider font-semibold">CVC</Label>
                                <div className="relative">
                                    <Input
                                        className="bg-white/5 border-white/10 text-white focus:border-emerald-500/50 h-11 pl-10 placeholder:text-slate-500"
                                        placeholder="123"
                                        maxLength={4}
                                        type="password"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value)}
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 flex flex-col gap-3">
                        <Button
                            className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02]"
                            disabled={!isValid || loading}
                            onClick={onSubmit}
                        >
                            {loading ? (
                                <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...</>
                            ) : (
                                `Pay $${planPrice} & Enroll Now`
                            )}
                        </Button>
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                            <Lock className="h-3 w-3" />
                            Payments are secure and encrypted.
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
