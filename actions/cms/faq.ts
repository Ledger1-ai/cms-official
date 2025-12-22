"use server";

import { prismadb } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/actions/audit";

export async function getFaqs() {
    try {
        const faqs = await prismadb.faq.findMany({
            orderBy: {
                order: "asc",
            },
        });
        return faqs;
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return [];
    }
}

export async function getFaqById(id: string) {
    try {
        const faq = await prismadb.faq.findUnique({
            where: { id },
        });
        return faq;
    } catch (error) {
        console.error("Error fetching FAQ:", error);
        return null;
    }
}

export async function createFaq(data: {
    question: string;
    answer: string;
    category?: string;
    order?: number;
    isVisible?: boolean;
}) {
    try {
        const faq = await prismadb.faq.create({
            data: {
                question: data.question,
                answer: data.answer,
                category: data.category || "General",
                order: data.order || 0,
                isVisible: data.isVisible ?? true,
            },
        });

        await logActivity("Create FAQ", "FAQ", `Created question: ${data.question}`);

        revalidatePath("/cms/faq");
        revalidatePath("/faq");
        return faq;
    } catch (error) {
        console.error("Error creating FAQ:", error);
        throw new Error("Failed to create FAQ");
    }
}

export async function updateFaq(
    id: string,
    data: {
        question?: string;
        answer?: string;
        category?: string;
        order?: number;
        isVisible?: boolean;
    }
) {
    try {
        const faq = await prismadb.faq.update({
            where: { id },
            data,
        });

        await logActivity("Update FAQ", "FAQ", `Updated question ID: ${id}`);

        revalidatePath("/cms/faq");
        revalidatePath("/faq");
        return faq;
    } catch (error) {
        console.error("Error updating FAQ:", error);
        throw new Error("Failed to update FAQ");
    }
}

export async function deleteFaq(id: string) {
    try {
        await prismadb.faq.delete({
            where: { id },
        });

        await logActivity("Delete FAQ", "FAQ", `Deleted question ID: ${id}`);

        revalidatePath("/cms/faq");
        revalidatePath("/faq");
        return { success: true };
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        throw new Error("Failed to delete FAQ");
    }
}

export async function reorderFaqs(items: { id: string; order: number }[]) {
    try {
        const transaction = items.map((item) =>
            prismadb.faq.update({
                where: { id: item.id },
                data: { order: item.order },
            })
        );
        await prismadb.$transaction(transaction);

        await logActivity("Reorder FAQs", "FAQ", "Reordered FAQ list");

        revalidatePath("/cms/faq");
        revalidatePath("/faq");
        return { success: true };
    } catch (error) {
        console.error("Error reordering FAQs:", error);
        throw new Error("Failed to reorder FAQs");
    }
}

export async function seedDefaultFaqs() {
    const defaultFaqs = [
        {
            question: "What makes Ledger1 CMS different from WordPress or Webflow?",
            answer: "Ledger1 is an **AI-First CMS**, designed to automate your digital presence. While we offer a stunning \"Nano Banana\" Visual Builder, our true power explores the \"AI Workforce\" — autonomous agents that handle your SEO, blog writing, content updates, and social distribution 24/7.",
            category: "General",
        },
        {
            question: "How does the \"AI Workforce\" actually work?",
            answer: "Think of it as hiring a team of elite content editors. You can configure AI agents to manage specific parts of your site. They connect to your preferred LLMs (GPT-4o, Claude, Gemini) to automatically generate SEO-optimized blog posts, translate pages, or update documentation based on your brand guidelines.",
            category: "AI Features",
        },
        {
            question: "Is the Visual Builder compatible with custom code?",
            answer: "Yes. We bridge the gap between developers and marketers. You get the speed of a premium drag-and-drop builder for landing pages, but retain full control to inject custom React components, modify global CSS, and access our API for headless implementations.",
            category: "Technical",
        },
        {
            question: "Can I use my own AI API keys?",
            answer: "Absolutely. We support a \"Bring Your Own Key\" (BYOK) model. You can securely store and manage your own API keys for OpenAI, Anthropic, Google, and Perplexity, ensuring you maintain full ownership of your data and usage limits.",
            category: "AI Features",
        },
        {
            question: "How does the \"University\" module help my team?",
            answer: "The University module isn't just for reading — it's for training. You can upload your Standard Operating Procedures (SOPs) and brand voice documents. Your AI agents then \"read\" these materials to ensure every piece of content they generate aligns perfectly with your brand's tone and standards.",
            category: "Features",
        },
        {
            question: "Is Ledger1 CMS secure for enterprise use?",
            answer: "Security is our foundation. We provide granular Role-Based Access Control (RBAC) so you can define exactly what content your editors, writers, and AI agents can touch. All API keys and sensitive data are encrypted with enterprise-grade standards.",
            category: "Security",
        },
        {
            question: "How do I migrate my existing blog or site?",
            answer: "We make it seamless. Our \"Smart Import\" tools allow you to pull content from existing feeds or huge repositories. You can get your legacy content onto our modern, high-performance infrastructure in minutes, not weeks.",
            category: "General",
        },
    ];

    try {
        // Clear existing
        // await prismadb.faq.deleteMany({}); // Optional: decided not to clear to avoid accidental data loss if run multiple times, but for seed it might be expected. Let's just create if count is 0.

        const count = await prismadb.faq.count();
        if (count > 0) {
            return { success: false, message: "FAQs already exist" };
        }

        await Promise.all(
            defaultFaqs.map((faq, index) =>
                prismadb.faq.create({
                    data: {
                        ...faq,
                        order: index,
                    },
                })
            )
        );

        await logActivity("Seed FAQs", "FAQ", "Seeded default FAQs");

        revalidatePath("/cms/faq");
        revalidatePath("/faq");
        return { success: true, message: "FAQs seeded successfully" };
    } catch (error) {
        console.error("Error seeding FAQs:", error);
        throw new Error("Failed to seed FAQs");
    }
}
