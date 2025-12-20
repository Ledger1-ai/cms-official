"use client";

import { useEditor } from "@/components/landing/EditorContext";
import { LandingPageSidebar } from "@/components/landing/LandingPageSidebar";

export function LandingLayoutClient({
    sidebarProps,
    children
}: {
    sidebarProps: { pages: any[], locale: string },
    children: React.ReactNode
}) {
    const { isAdvancedMode } = useEditor();

    return (
        <div className="flex h-[calc(100vh-4rem)] md:h-screen">
            {!isAdvancedMode && (
                <div id="landing-inner-sidebar-wrapper">
                    <LandingPageSidebar pages={sidebarProps.pages} locale={sidebarProps.locale} />
                </div>
            )}
            <div className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa]">
                {children}
            </div>
        </div>
    );
}
