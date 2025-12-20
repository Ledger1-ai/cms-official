
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma"; // Use lib/prisma explicitly
import { getAiClient } from "@/lib/ai-helper"; // We'll create this next
import { streamText } from 'ai';

export const maxDuration = 300; // 5 minutes

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { messages, modelId } = await req.json();

    // 1. Get User Team
    const user = await prismadb.users.findUnique({
      where: { email: session.user.email },
      include: { assigned_team: true }
    });

    if (!user?.assigned_team) {
      return new NextResponse("Team not found", { status: 400 });
    }

    // 2. Get AI Client (Unified)
    const { client, model, provider } = await getAiClient(user.assigned_team.id);

    // 3. Create Stream
    const result = streamText({
      model: model,
      messages,
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.log("[CHAT_COMPLETION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
