import { NextResponse } from 'next/server';
import { prismadb } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, history } = body;

        if (!message) {
            return new NextResponse("Missing message", { status: 400 });
        }

        // 1. Generate AI Response
        // In a real scenario, call OpenAI/Anthropic here using the history.
        // For now, we simulate a helpful response.
        const aiReply = generateMockResponse(message);

        // 2. Log to Support Ticket System
        // We look for an active "AI_AGENT" ticket for this session (simulated by latest open one or create new)
        // Since we don't have a session ID token from client yet, let's just create a new ticket for "AI Conversation" for now
        // or append to a conceptual "Recent AI Chat".
        // To keep it simple for MVP: Create a NEW ticket or update last one if recently created.
        // Let's simplified: Create a ticket named "AI Chat [Date]" and update messages. 
        // Better: Just store it.

        // For the "Support Inbox" integration, we want to see this chat.
        // We'll Create a ticket if it's the *start* of a conversation, or just log valid interactions?
        // Let's create a ticket for each "Session".
        // Since managing session ID on client is proper way but extra work, 
        // I'll skip complex session tracking and just "Create Ticket" on first message, 
        // but for this MVP, I'm just saving the message to a "System Log" style ticket or 
        // creating a new ticket for every conversation is too noisy.

        // Strategy: Create a single ticket for "Anonymous Web User" if not exists, or just create one per chat start.
        // Let's just Return response for now and maybe create a ticket "AI Inquiry" so it shows in inbox.

        // We will create a fresh ticket for this interaction so the admin sees "New AI Chat".
        // In a real app, you'd debounce this or use a session ID to append messages.

        await prismadb.supportTicket.create({
            data: {
                source: "AI_AGENT",
                name: "AI Web Visitor",
                email: "visitor@web.ai", // Placeholder
                subject: `AI Chat: ${message.substring(0, 30)}...`,
                message: `User: ${message}\nAI: ${aiReply}`,
                messages: [...(history || []), { role: 'user', content: message }, { role: 'assistant', content: aiReply }],
                status: "NEW"
            }
        });

        return NextResponse.json({ reply: aiReply });
    } catch (error) {
        console.error("[SUPPORT_CHAT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

function generateMockResponse(input: string): string {
    const lower = input.toLowerCase();
    if (lower.includes("price") || lower.includes("cost")) return "Our pricing starts at $0 for the Free tier. The Individual Pro plan is $50/month. You can check the Pricing page for more details!";
    if (lower.includes("support") || lower.includes("help")) return "We offer community support for free users and priority 24/7 support for Pro plans. You can also email us at support@ledger1crm.com.";
    if (lower.includes("hello") || lower.includes("hi")) return "Hello! How can I help you with Ledger1 CRM today?";
    return "That's a great question. I'd recommend checking our documentation or submitting a support ticket for a detailed answer from our team.";
}
