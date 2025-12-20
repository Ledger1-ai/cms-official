"use server";

import { getAiSdkModel } from "@/lib/openai";
import { generateText } from "ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function askEditorAi(message: string, context: string, modelOptions?: { modelId: string; provider: string }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return { error: "Unauthorized" };
        }

        const model = await getAiSdkModel(session.user.id, modelOptions);
        if (!model) {
            return { error: "No AI model configured" };
        }

        const systemPrompt = `You are an expert AI Web Design Assistant integrated into a CMS (Puck Editor).
You help users build landing pages by generating content or modifying the page structure.

**Available Components (Blocks):**
- Layout: HeroBlock, ColumnsBlock (2 cols), ContainerBlock, DividerBlock, FeaturesGridBlock
- Marketing: PricingBlock, StatsBlock, FaqBlock
- Basic: HeadingBlock, TextBlock, ButtonBlock, ImageBlock, CardBlock, CodeBlock

**Data Structure (JSON):**
The page is defined by a JSON object with:
- \`root\`: { props: { title: string } }
- \`content\`: Array of objects { type: "BlockName", props: { ... } }

**Instructions:**
1. If the user asks to generate a page, section, or modify the layout, you MUST generate the corresponding JSON structure.
2. Return the JSON inside a markdown code block: \`\`\`json { ... } \`\`\`.
3. If the user provides valid JSON context, respect it or transform it into the Puck structure if needed.
4. Keep the text explanation concise. Explain what you changed or generated.

User Context: ${context}`;

        const { text } = await generateText({
            model,
            system: systemPrompt,
            messages: [
                { role: "user", content: message }
            ],
            temperature: 0.7,
        });

        // Parse JSON if present
        let data = null;
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```([\s\S]*?)```/);
        if (jsonMatch) {
            try {
                const parsed = JSON.parse(jsonMatch[1]);
                // Basic validation for Puck structure
                if (parsed.content || parsed.root) {
                    data = parsed;
                }
            } catch (e) {
                console.error("Failed to parse AI generated JSON", e);
            }
        }

        return { success: true, text, data };
    } catch (error) {
        console.error("[ASK_EDITOR_AI_ERROR]", error);
        return { error: "Failed to generate response" };
    }
}
