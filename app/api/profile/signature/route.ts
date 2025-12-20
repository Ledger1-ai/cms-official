import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismadb } from "@/lib/prisma";

/**
 * GET/POST /api/profile/signature
 * GET: returns { signature_html, signature_meta, signature_updated_at }
 * POST: body { signatureHtml: string, meta?: any } - saves sanitized HTML and meta
 */

// very basic sanitization: strip <script> tags and on* event attributes
function sanitizeSignatureHtml(html: string) {
  try {
    let s = html || "";
    // remove script blocks
    s = s.replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, "");
    // remove inline event handlers e.g., onclick=""
    s = s.replace(/\son[a-z]+\s*=\s*["'][^"']*["']/gi, "");
    // limit overall size to avoid abuse
    if (s.length > 100_000) {
      s = s.slice(0, 100_000);
    }
    return s;
  } catch {
    return html;
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const userSettings = await prismadb.userOutreachSettings.findUnique({
      where: { userId: session.user.id },
      select: {
        signature_html: true,
        signature_meta: true,
        signature_updated_at: true,
      },
    });

    return NextResponse.json(
      {
        signature_html: userSettings?.signature_html || "",
        signature_meta: userSettings?.signature_meta || null,
        signature_updated_at: userSettings?.signature_updated_at || null,
      },
      { status: 200 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[PROFILE_SIGNATURE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

    const payload = await req.json().catch(() => ({}));
    const signatureHtmlRaw = (payload?.signatureHtml ?? "").toString();
    const meta = payload?.meta;

    if (!signatureHtmlRaw || signatureHtmlRaw.trim().length === 0) {
      return new NextResponse("signatureHtml is required", { status: 400 });
    }

    const signatureHtml = sanitizeSignatureHtml(signatureHtmlRaw);

    await prismadb.userOutreachSettings.upsert({
      where: { userId: session.user.id },
      update: {
        signature_html: signatureHtml,
        signature_meta: meta ?? undefined,
        signature_updated_at: new Date() as any,
      },
      create: {
        userId: session.user.id,
        signature_html: signatureHtml,
        signature_meta: meta ?? undefined,
        signature_updated_at: new Date() as any,
      },
    });

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[PROFILE_SIGNATURE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
