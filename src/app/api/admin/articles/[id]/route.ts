import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, isAdmin } from "@/lib/auth";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  content: z.string().min(1).optional(),
  isPremium: z.boolean().optional(),
  pdfUrl: z.string().url().nullable().optional().or(z.literal(""))
});

export async function PATCH(_: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!isAdmin(session)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const json = await _.json();
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });

  const data = parsed.data as any;
  if (data.pdfUrl === "") data.pdfUrl = null;

  try {
    const updated = await prisma.article.update({ where: { id: params.id }, data });
    return NextResponse.json({ ok: true, item: updated });
  } catch (e: any) {
    if (e?.code === "P2025") return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    if (e?.code === "P2002") return NextResponse.json({ ok: false, error: "Slug already exists" }, { status: 409 });
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!isAdmin(session)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  try {
    await prisma.article.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.code === "P2025") return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
