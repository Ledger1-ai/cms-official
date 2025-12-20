"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type EditorContextType = {
    isAdvancedMode: boolean;
    setAdvancedMode: (value: boolean) => void;
    aiModelId: string;
    setAiModelId: (value: string) => void;
    isDemoMode?: boolean;
    onDemoUpsell?: () => void;
};

const EditorContext = createContext<EditorContextType>({
    isAdvancedMode: false,
    setAdvancedMode: () => { },
    aiModelId: "",
    setAiModelId: () => { },
    isDemoMode: false,
    onDemoUpsell: () => { },
});

export function EditorProvider({ children, isDemoMode = false, onDemoUpsell }: { children: ReactNode; isDemoMode?: boolean; onDemoUpsell?: () => void }) {
    const [isAdvancedMode, setAdvancedMode] = useState(false);
    const [aiModelId, setAiModelId] = useState("");

    return (
        <EditorContext.Provider value={{ isAdvancedMode, setAdvancedMode, aiModelId, setAiModelId, isDemoMode, onDemoUpsell }}>
            {children}
        </EditorContext.Provider>
    );
}

export const useEditor = () => useContext(EditorContext);
