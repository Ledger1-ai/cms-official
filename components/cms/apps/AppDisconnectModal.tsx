"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppItem } from "./AppMarketplaceItem";
import { AlertTriangle, Trash2 } from "lucide-react";

interface AppDisconnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    app: AppItem | null;
}

export function AppDisconnectModal({ isOpen, onClose, onConfirm, app }: AppDisconnectModalProps) {
    if (!app) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#0A0A0B] border-white/10 text-white sm:max-w-[425px]">
                <DialogHeader className="flex flex-col items-center text-center gap-4 pt-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="space-y-2">
                        <DialogTitle className="text-xl">Disconnect {app.name}?</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Are you sure you want to disconnect <strong>{app.name}</strong>? This will remove its integration from your dashboard and stop any data sync tasks.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <div className="my-4 bg-red-500/5 border border-red-500/10 rounded-lg p-3 text-xs text-red-400">
                    <strong>Warning:</strong> Any active widgets or workflows relying on this app will stop working immediately.
                </div>

                <DialogFooter className="flex gap-2 sm:justify-center w-full">
                    <Button variant="outline" onClick={onClose} className="flex-1 border-white/10 hover:bg-white/5 hover:text-white">
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white border-0"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Disconnect
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
