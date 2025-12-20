"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Schema definition for the form fields
// This matches the frontend FormField interface
const FormFieldSchema = z.object({
    id: z.string().describe("Unique identifier for the field (e.g., 'first_name')"),
    type: z.enum([
        "text",
        "email",
        "tel",
        "url",
        "textarea",
        "select",
        "radio",
        "checkbox",
        "date",
        "file",
    ]).describe("The input type of the field"),
    label: z.string().describe("Human-readable label for the field"),
    placeholder: z.string().optional().describe("Placeholder text for inputs"),
    required: z.boolean().default(false).describe("Whether the field is required"),
    options: z.array(z.string()).optional().describe("Options for select, radio, or checkbox types"),
    width: z.enum(["full", "half"]).default("full").describe("Visual width of the field container"),
    helpText: z.string().optional().describe("Helper text or tooltip for the field"),
});

const FormGenerationSchema = z.object({
    title: z.string().describe("Suggested title for the form"),
    description: z.string().describe("Short description of what the form is for"),
    fields: z.array(FormFieldSchema).describe("List of fields to include in the form"),
});

export async function generateFormFields(prompt: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        const { object } = await generateObject({
            model: openai("gpt-4o"),
            schema: FormGenerationSchema,
            prompt: `Create a professional form structure based on this request: "${prompt}".
      
      Ensure the fields are logical, user-friendly, and cover all necessary information implied by the prompt.
      For 'select', 'radio', or 'checkbox' types, provide realistic and comprehensive options.
      Use 'half' width for related short fields (e.g., First Name + Last Name) to improve layout.
      
      Return a JSON object with a title, description, and list of fields.`,
        });

        return {
            success: true,
            data: object
        };

    } catch (error) {
        console.error("AI Form Generation Error:", error);
        return {
            success: false,
            error: "Failed to generate form. Please try again."
        };
    }
}
