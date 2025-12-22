import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, isAdmin } from "@/lib/auth";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  content: z.string().min(1),
  isPremium: z.boolean().optional().default(false),
  pdfUrl: z.string().url().optional().or(z.literal(""))
});

export async function GET() {
  const items = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!isAdmin(session)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const json = await req.json();
  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }
  const { title, slug, content, isPremium, pdfUrl } = parsed.data as any;
  try {
    const created = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        isPremium: !!isPremium,
        pdfUrl: pdfUrl || null,
        authorId: session?.user?.id as string | undefined,
      },
    });
    return NextResponse.json({ ok: true, item: created });
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json({ ok: false, error: "Slug already exists" }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
