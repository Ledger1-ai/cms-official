import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";

/**
 * GET/POST /api/profile/outreach-prompt
 * GET: returns user's outreach_prompt_default (text) and outreach_prompt_updated_at
 * POST: body { promptText: string } - saves user's default outreach prompt
 */

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const userSettings = await prismadb.userOutreachSettings.findUnique({
      where: { userId: session.user.id },
      select: {
        outreach_prompt_default: true,
        outreach_prompt_updated_at: true,
      },
    });

    return NextResponse.json(
      {
        promptText: userSettings?.outreach_prompt_default || "",
        updatedAt: userSettings?.outreach_prompt_updated_at || null,
      },
      { status: 200 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[PROFILE_PROMPT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const payload = await req.json().catch(() => ({}));
    const promptTextRaw = (payload?.promptText ?? "").toString();

    if (!promptTextRaw || promptTextRaw.trim().length === 0) {
      return new NextResponse("promptText is required", { status: 400 });
    }

    // Truncate extremely long prompt to prevent abuse
    const promptText = promptTextRaw.length > 50000 ? promptTextRaw.slice(0, 50000) : promptTextRaw;

    await prismadb.userOutreachSettings.upsert({
      where: { userId: session.user.id },
      update: {
        outreach_prompt_default: promptText,
        outreach_prompt_updated_at: new Date() as any,
      },
      create: {
        userId: session.user.id,
        outreach_prompt_default: promptText,
        outreach_prompt_updated_at: new Date() as any,
      },
    });

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[PROFILE_PROMPT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
