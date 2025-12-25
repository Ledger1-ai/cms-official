"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sparkles, Loader2, Calendar as CalendarIcon, Dice5 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Coupon } from "./CouponsTable";

interface CouponModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (coupon: Partial<Coupon>) => void;
    initialData?: Coupon | null;
}

export function CouponModal({ isOpen, onClose, onSave, initialData }: CouponModalProps) {
    const [formData, setFormData] = useState<Partial<Coupon>>({
        code: "",
        type: "fixed_cart",
        amount: 0,
        description: "",
        usageLimit: 0,
        expiryDate: ""
    });

    // Reset or Load Data
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData(initialData);
            } else {
                setFormData({
                    code: "",
                    type: "fixed_cart",
                    amount: 0,
                    description: "",
                    usageLimit: 0,
                    expiryDate: ""
                });
            }
        }
    }, [isOpen, initialData]);

    const [isGenerating, setIsGenerating] = useState(false);

    const generateCode = async () => {
        setIsGenerating(true);
        // Mock AI generation
        await new Promise(r => setTimeout(r, 600));
        const adjectives = ["SUPER", "MEGA", "FLASH", "SUMMER", "WINTER", "WELCOME"];
        const nouns = ["SALE", "DEAL", "OFFER", "GIFT", "BONUS"];
        const randomCode = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${Math.floor(Math.random() * 99)}`;

        setFormData(prev => ({ ...prev, code: randomCode }));
        setIsGenerating(false);
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1B1E] border-white/10 text-white sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Coupon" : "Create New Coupon"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Coupon Code</Label>
                        <div className="flex gap-2">
                            <Input
                                value={formData.code}
                                onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                placeholder="e.g. SUMMERSALE25"
                                className="bg-black/40 border-white/10 font-mono tracking-wider"
                            />
                            <Button variant="outline" size="icon" onClick={generateCode} disabled={isGenerating} title="Generate with AI">
                                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-amber-400" />}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description <span className="text-slate-500 text-xs">(Optional)</span></Label>
                        <Textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Internal notes about this promotion..."
                            className="bg-black/40 border-white/10 resize-none h-20"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Discount Type</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(v: any) => setFormData({ ...formData, type: v })}
                            >
                                <SelectTrigger className="bg-black/40 border-white/10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1B1E] border-white/10 text-white">
                                    <SelectItem value="fixed_cart">Fixed Cart Discount</SelectItem>
                                    <SelectItem value="percent">Percentage Discount</SelectItem>
                                    <SelectItem value="fixed_product">Fixed Product Discount</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Amount</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                    {formData.type === 'percent' ? '%' : '$'}
                                </span>
                                <Input
                                    type="number"
                                    value={formData.amount}
                                    onChange={e => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                                    className="bg-black/40 border-white/10 pl-7"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Usage Limit</Label>
                            <Input
                                type="number"
                                value={formData.usageLimit || ""}
                                onChange={e => setFormData({ ...formData, usageLimit: parseInt(e.target.value) })}
                                placeholder="0 for unlimited"
                                className="bg-black/40 border-white/10"
                            />
                        </div>
                        <div className="space-y-2 flex flex-col pt-1">
                            <Label className="mb-1.5">Expiry Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-black/40 border-white/10 hover:bg-white/5",
                                            !formData.expiryDate && "text-slate-500"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.expiryDate ? format(new Date(formData.expiryDate), "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-[#1A1B1E] border-white/10" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={formData.expiryDate ? new Date(formData.expiryDate) : undefined}
                                        onSelect={(d) => setFormData({ ...formData, expiryDate: d?.toISOString() })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} className="hover:bg-white/10">Cancel</Button>
                    <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                        {initialData ? "Save Changes" : "Create Coupon"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
