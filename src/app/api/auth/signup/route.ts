import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body?.name ?? "").trim();
    const email = (body?.email ?? "").toLowerCase().trim();
    const password = body?.password ?? "";

    if (!name || name.length < 2) return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    if (!password || password.length < 6) return NextResponse.json({ error: "Password too short" }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "Email already in use" }, { status: 409 });

    const hash = await bcrypt.hash(password, 10);
    const isAdmin = process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL;

    await prisma.user.create({
      data: { name, email, passwordHash: hash, role: isAdmin ? "admin" : "user" },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
