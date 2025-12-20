"use client";

import { useState } from "react";
import Link from "next/link";
import { Puck, Data, usePuck } from "@measured/puck";
import "@measured/puck/puck.css";
import "@/components/landing/puck-theme.css";
import { puckConfig } from "@/lib/puck.config";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Sparkles, RefreshCcw, LayoutTemplate, Monitor, Tablet, Smartphone, Save } from "lucide-react";
import { TemplateModal } from "@/components/landing/TemplateModal";
import { Template } from "@/lib/puck.templates";
import { EditorProvider } from "@/components/landing/EditorContext";
import { SignUpModal } from "@/components/landing/SignUpModal";
import { useRouter } from "next/navigation";
import { BeautifulModal } from "@/components/landing/BeautifulModal";
import { cn } from "@/lib/utils";
import { getCommonStyleClasses, getCommonInlineStyles } from "@/lib/puck.styling";

const demoPuckConfig = {
    ...puckConfig,
    components: {
        ...puckConfig.components,
        HeroBlock: {
            ...puckConfig.components.HeroBlock,
            // REACT-LEVEL LOCK: Wrap in a 500px rigid cage to prevent Puck expansion
            render: ({ title, subtitle, bgImage, coolMode, primaryAction, secondaryAction, overlayOpacity = "60", overlayGradient = "none", align = "center", minHeight, id, ...styleProps }: any) => (
                <div style={{ height: '500px', width: '100%', overflow: 'hidden', contain: 'strict', isolation: 'isolate' }}>
                    <div id={id} className={cn(
                        "relative px-8 text-center text-white overflow-hidden rounded-xl mx-4",
                        "h-full", // Force height to fill the cage
                        "flex items-center justify-center",
                        getCommonStyleClasses(styleProps)
                    )}
                        style={{ ...getCommonInlineStyles(styleProps) }}
                    >
                        {bgImage && (
                            <div
                                className="absolute inset-0 z-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${bgImage})` }}
                            />
                        )}
                        <div className="absolute inset-0 bg-black z-10" style={{ opacity: parseInt(overlayOpacity) / 100 }} />
                        {overlayGradient !== "none" && (
                            <div className={cn(
                                "absolute inset-0 z-10",
                                overlayGradient === "to-t" && "bg-gradient-to-t from-black/80 to-transparent",
                                overlayGradient === "to-b" && "bg-gradient-to-b from-black/80 to-transparent",
                                overlayGradient === "radial" && "bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]",
                            )} />
                        )}
                        <div className={`relative z-20 max-w-4xl mx-auto flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-2xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{title}</h1>
                            <p className="text-xl md:text-2xl text-slate-200 drop-shadow-md mb-10 max-w-2xl">{subtitle}</p>
                            <div className="flex gap-4 flex-wrap justify-center">
                                <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-slate-200 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 duration-200 font-bold border border-white/50">{primaryAction}</Button>
                                <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 duration-200 font-semibold">{secondaryAction}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
};

const VIEWPORTS = [
    { width: 360, height: "auto" as const, label: "Mobile", icon: <Smartphone size={16} /> },
    { width: 768, height: "auto" as const, label: "Tablet", icon: <Tablet size={16} /> },
    { width: 1280, height: "auto" as const, label: "Desktop", icon: <Monitor size={16} /> },
    { width: 1920, height: "auto" as const, label: "Full HD", icon: <Monitor size={16} /> },
];

interface DemoPuckEditorProps {
    initialData?: Data;
    onExit: () => void;
}

const DEMO_INITIAL_DATA: Data = {
    root: { props: { title: "Demo Page" } },
    content: [
        {
            type: "HeroBlock",
            props: {
                id: "hero-1",
                title: "Build the Future",
                subtitle: "Experience the power of the world's most advanced headless CMS.",
                bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
                primaryAction: "Start Building",
                secondaryAction: "Learn More",
                overlayOpacity: "60",
                align: "center"
            }
        },
        {
            type: "FeaturesGridBlock",
            props: {
                id: "features-1",
                title: "Unmatched Performance",
                features: [
                    { title: "Instant", description: "Sub-millisecond static generation.", icon: "Zap" },
                    { title: "Secure", description: "Enterprise-grade protection.", icon: "Shield" },
                    { title: "Global", description: "Edge cached everywhere.", icon: "Globe" }
                ]
            }
        }
    ]
};

export default function DemoPuckEditor({ initialData, onExit }: DemoPuckEditorProps) {
    // Deep copy initial data to ensure reset works correctly
    const [data, setData] = useState<Data>(initialData || JSON.parse(JSON.stringify(DEMO_INITIAL_DATA)));
    const [isGeniusModalOpen, setIsGeniusModalOpen] = useState(false);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [editorKey, setEditorKey] = useState(0);
    const [activeViewport, setActiveViewport] = useState(VIEWPORTS[2]); // Default to Desktop
    const [showSidebars, setShowSidebars] = useState(true);

    // REMOVED: const [zoom, setZoom] = useState(1);

    const handleGeniusMode = () => {
        setIsGeniusModalOpen(true);
    };

    const handleReset = () => {
        setData(JSON.parse(JSON.stringify(DEMO_INITIAL_DATA)));
        setEditorKey(prev => prev + 1);
        toast.success("Demo Reset");
        setIsResetModalOpen(false);
    };

    const handleSelectTemplate = (template: Template) => {
        const newContent = template.data.content?.map(item => ({
            ...item,
            props: {
                ...item.props,
                id: `block-${Math.random().toString(36).substr(2, 9)}`
            }
        })) || [];

        setData({
            ...template.data,
            content: newContent,
            root: {
                ...template.data.root,
                props: {
                    ...template.data.root.props,
                    title: data.root.props?.title || template.data.root.props?.title || "Demo Page"
                }
            }
        });
        toast.success(`Template "${template.name}" applied`);
        setEditorKey((prev) => prev + 1);
        setIsTemplateModalOpen(false);
    };

    return (
        <EditorProvider isDemoMode={true} onDemoUpsell={handleGeniusMode}>
            <div className="flex flex-col h-screen bg-slate-950">
                {/* Demo Toolbar */}
                <div className="h-14 border-b border-purple-500/20 bg-purple-950/20 backdrop-blur-md flex items-center justify-between px-4 shrink-0 z-50">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={onExit} className="text-slate-400 hover:text-white hover:bg-white/10 h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex flex-col">
                            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400 leading-tight">
                                Demo
                            </span>
                        </div>
                    </div>

                    {/* Viewport Controls - Centered */}
                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5 absolute left-1/2 -translate-x-1/2">
                        {VIEWPORTS.filter(v => v.width < 1920).map((vp) => (
                            <button
                                key={vp.label}
                                onClick={() => setActiveViewport(vp)}
                                className={`p-1.5 rounded-md transition-all ${activeViewport.label === vp.label
                                    ? "bg-white/10 text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                    }`}
                                title={vp.label}
                            >
                                {vp.icon}
                            </button>
                        ))}
                    </div>

                    {/* Actions Group */}
                    <div className="flex items-center gap-2">
                        {/* REMOVED: ZoomControl */}

                        <Button
                            onClick={() => setIsTemplateModalOpen(true)}
                            size="sm"
                            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 text-white border-0 shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] h-8 px-3 text-xs"
                        >
                            <LayoutTemplate className="mr-2 h-3.5 w-3.5" />
                            Templates
                        </Button>

                        <Button
                            onClick={handleGeniusMode}
                            size="sm"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] h-8 px-3 text-xs"
                        >
                            <Sparkles className="mr-2 h-3.5 w-3.5" />
                            Genius
                        </Button>

                        <Button
                            onClick={() => setIsSignUpModalOpen(true)}
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] h-8 px-3 text-xs"
                        >
                            <Save className="mr-2 h-3.5 w-3.5" />
                            Save
                        </Button>

                        <Button
                            onClick={() => setIsResetModalOpen(true)}
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-white h-8 w-8"
                            title="Reset Demo"
                        >
                            <RefreshCcw className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>

                {/* Editor Area */}
                <Puck
                    key={editorKey}
                    config={demoPuckConfig as any}
                    data={data}
                    onChange={setData}
                    headerPath={undefined}
                    viewports={VIEWPORTS}
                    overrides={{
                        headerActions: () => <></>
                    }}
                >
                    <div className="flex h-full overflow-hidden">
                        {showSidebars && (
                            <div className="w-72 border-r border-white/10 bg-black/20 flex flex-col overflow-y-auto p-4 custom-scrollbar">
                                <h3 className="text-white/60 font-semibold text-xs uppercase tracking-wider mb-4 px-2">Components</h3>
                                <Puck.Components />
                            </div>
                        )}

                        <div className="flex-1 relative bg-black/50 overflow-hidden flex flex-col">
                            {/* Scroll Container */}
                            <div className={`flex-1 overflow-y-scroll flex justify-center custom-scrollbar relative ${!showSidebars ? "p-0" : "p-12"}`} id="demo-puck-preview-container">
                                {/* Preview Wrapper - STANDARD, NO ZOOM, NO TRANSFORM */}
                                <div style={{
                                    width: activeViewport.width >= 1280 ? '100%' : activeViewport.width,
                                    margin: '0 auto', // Center it
                                    minHeight: '100vh',
                                    backgroundColor: 'transparent',
                                    boxShadow: activeViewport.width < 1280 ? '0 0 40px -10px rgba(0,0,0,0.5)' : 'none'
                                }}>
                                    <Puck.Preview />
                                </div>
                            </div>
                        </div>

                        {showSidebars && <PropertiesPanel />}
                    </div>
                </Puck>

                {/* Modals */}
                <TemplateModal
                    open={isTemplateModalOpen}
                    onOpenChange={setIsTemplateModalOpen}
                    onSelectTemplate={handleSelectTemplate}
                />

                <SignUpModal
                    open={isSignUpModalOpen}
                    onOpenChange={setIsSignUpModalOpen}
                />

                {/* Genius Upsell Modal */}
                <BeautifulModal
                    isOpen={isGeniusModalOpen}
                    onClose={() => setIsGeniusModalOpen(false)}
                    title="AI Website Generator"
                >
                    <div className="text-center">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
                            <Sparkles className="w-8 h-8 text-purple-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-3">AI Website Generator</h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Describe your dream website and let our AI build the structure, copy, and images for you instantly.
                        </p>
                        <Button
                            className="w-full h-12 text-lg bg-white text-black hover:bg-slate-200 font-bold rounded-full"
                            onClick={() => setIsSignUpModalOpen(true)}
                        >
                            Get Started
                        </Button>
                    </div>
                </BeautifulModal>

                {/* Reset Confirmation Modal */}
                <BeautifulModal
                    isOpen={isResetModalOpen}
                    onClose={() => setIsResetModalOpen(false)}
                    title="Reset Demo?"
                >
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                            <RefreshCcw className="w-8 h-8 text-red-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">Reset Demo Content?</h2>
                        <p className="text-slate-400 mb-8">
                            This will revert all your changes back to the original demo content. This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 h-11 border-white/10 hover:bg-white/5 text-white"
                                onClick={() => setIsResetModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 h-11 bg-red-600 hover:bg-red-500 text-white font-bold"
                                onClick={handleReset}
                            >
                                Reset Demo
                            </Button>
                        </div>
                    </div>
                </BeautifulModal>
            </div>
        </EditorProvider>
    );
}

// Inline Properties Panel
const PropertiesPanel = () => {
    const { appState } = usePuck();

    // Calculate label but be robust against missing state
    const selectedItem = appState?.ui?.itemSelector && appState?.data?.content ? appState.data.content.find(c => c.props.id === appState.ui.itemSelector) : null;
    const label = selectedItem ? (puckConfig.components[selectedItem.type as keyof typeof puckConfig.components]?.label || selectedItem.type) : "Page Properties";

    return (
        <div className="w-80 shrink-0 border-l border-purple-500/10 bg-black/20 flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-white/5 shrink-0">
                <h3 className="text-white font-bold text-xs uppercase tracking-wider truncate" title={label}>
                    {label}
                </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {appState?.data && <Puck.Fields />}
            </div>
        </div>
    );
};
