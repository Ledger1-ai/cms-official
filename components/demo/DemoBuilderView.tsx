"use client";

import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import "@/components/landing/puck-theme.css";
import { puckConfig } from "@/lib/puck.config";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

interface DemoBuilderViewProps {
    onExit: () => void;
}

const initialData: Data = {
    content: [],
    root: { props: { title: "Demo Page" } }
};

export default function DemoBuilderView({ onExit }: DemoBuilderViewProps) {
    return (
        <div className="h-screen flex flex-col bg-[#0a0a0a]">
            {/* Simple Header */}
            <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-black/40 backdrop-blur-md shrink-0 z-50">
                <div className="flex items-center gap-4">
                    <Button onClick={onExit} variant="ghost" size="sm" className="text-slate-400 hover:text-white gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Exit Demo
                    </Button>
                    <span className="text-sm font-medium text-white">Interactive Demo Builder</span>
                </div>
                 <div className="flex items-center gap-2">
                     <Button size="sm" onClick={() => toast.success("This is a demo! Changes aren't saved.")} className="bg-purple-600 hover:bg-purple-700 text-white border-0">
                        <Save className="w-4 h-4 mr-2" />
                        Save Page
                     </Button>
                </div>
            </div>
            
            <div className="flex-1 overflow-hidden" id="puck-demo-container">
                 <Puck
                    config={puckConfig}
                    data={initialData}
                    onPublish={async () => { toast.success("This is a demo! Changes aren't saved.") }}
                 />
            </div>
        </div>
    );
}
