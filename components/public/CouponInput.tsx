"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Check, X, Tag } from "lucide-react";
import { validateCoupon, CouponValidationResult } from "@/actions/public/coupons";
import { motion, AnimatePresence } from "framer-motion";

export function CouponInput() {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [result, setResult] = useState<CouponValidationResult | null>(null);

    const handleApply = async () => {
        if (!code.trim()) return;

        setStatus("loading");
        setResult(null);

        try {
            const res = await validateCoupon(code);
            setResult(res);
            setStatus(res.isValid ? "success" : "error");
        } catch (error) {
            setStatus("error");
            setResult({ isValid: false, error: "Something went wrong" });
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium mb-1">
                <Tag className="w-4 h-4 text-primary" />
                <span>Have a promo code?</span>
            </div>

            <div className="flex gap-2">
                <Input
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setStatus("idle");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleApply()}
                    className="bg-black/30 border-white/10 font-mono"
                    disabled={status === "success"}
                />
                <Button
                    onClick={handleApply}
                    disabled={status === "loading" || !code || status === "success"}
                    className="min-w-[80px]"
                    variant={status === "success" ? "outline" : "default"}
                >
                    {status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : status === "success" ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                        "Apply"
                    )}
                </Button>
            </div>

            <AnimatePresence mode="wait">
                {status === "error" && result?.error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                    >
                        <X className="h-3 w-3" />
                        <span>{result.error}</span>
                    </motion.div>
                )}

                {status === "success" && result?.discount && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                    >
                        <div className="flex justify-between items-baseline">
                            <span className="text-emerald-400 font-bold">Coupon Applied!</span>
                            <span className="text-white font-mono text-sm">
                                {result.discount.type === 'percent'
                                    ? `-${result.discount.amount}%`
                                    : `-$${result.discount.amount}`}
                            </span>
                        </div>
                        <p className="text-slate-400 text-xs mt-1">
                            {result.discount.code} is valid and ready to use.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
