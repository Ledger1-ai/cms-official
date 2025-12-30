"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Edit, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Coupon {
    id: string;
    code: string;
    type: "fixed_cart" | "percent" | "fixed_product";
    amount: number;
    description: string;
    productIds: string[];
    usageCount: number;
    usageLimit: number;
    expiryDate: string;
}

interface CouponsTableProps {
    data: Coupon[];
    onEdit: (coupon: Coupon) => void;
    onDelete: (id: string) => void;
}

export function CouponsTable({ data, onEdit, onDelete }: CouponsTableProps) {
    if (data.length === 0) {
        return (
            <div className="text-center py-20 bg-[#0A0A0B] border border-white/5 rounded-xl">
                <p className="text-slate-500">No coupons found. Create one to get started.</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0A0A0B]">
            <Table>
                <TableHeader className="bg-white/5">
                    <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-slate-300">Code</TableHead>
                        <TableHead className="text-slate-300">Type</TableHead>
                        <TableHead className="text-slate-300">Amount</TableHead>
                        <TableHead className="text-slate-300">Description</TableHead>
                        <TableHead className="text-slate-300">Usage / Limit</TableHead>
                        <TableHead className="text-slate-300">Expiry Date</TableHead>
                        <TableHead className="text-right text-slate-300">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((coupon) => (
                        <TableRow key={coupon.id} className="border-white/5 hover:bg-white/5">
                            <TableCell className="font-mono text-white font-medium">
                                <span className="bg-white/10 px-2 py-1 rounded border border-white/10 text-emerald-400">
                                    {coupon.code}
                                </span>
                            </TableCell>
                            <TableCell className="text-slate-400 capitalize">
                                {coupon.type.replace("_", " ")}
                            </TableCell>
                            <TableCell className="text-white font-bold">
                                {coupon.type === "percent" ? `${coupon.amount}%` : `$${coupon.amount.toFixed(2)}`}
                            </TableCell>
                            <TableCell className="text-slate-400 max-w-[200px] truncate" title={coupon.description}>
                                {coupon.description || "-"}
                            </TableCell>
                            <TableCell className="text-slate-400">
                                {coupon.usageCount} / {coupon.usageLimit > 0 ? coupon.usageLimit : "∞"}
                            </TableCell>
                            <TableCell className="text-slate-400">
                                {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : "Never"}
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-[#1A1B1E] border-white/10 text-slate-200">
                                        <DropdownMenuItem onClick={() => {
                                            navigator.clipboard.writeText(`https://store.example.com?coupon=${coupon.code}`);
                                            toast.success("Coupon link copied to clipboard");
                                        }} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                            <Share2 className="mr-2 h-4 w-4 text-blue-400" /> Share Link
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => {
                                            navigator.clipboard.writeText(coupon.code);
                                            toast.success("Code copied to clipboard");
                                        }} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                            <Copy className="mr-2 h-4 w-4" /> Copy Code
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onEdit(coupon)} className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onDelete(coupon.id)} className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10">
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
