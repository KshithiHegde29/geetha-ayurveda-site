import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export type SessionUser = {
  id?: string;
  email?: string | null;
  name?: string | null;
  role?: "admin" | "user";
} | null;

export async function getSession(): Promise<SessionUser> {
  const session = await getServerSession(authOptions);
  return session?.user as any;
}

export function isAdmin(user: SessionUser): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (user && (user as any).role === "admin") return true;
  return !!user && !!adminEmail && user.email === adminEmail;
}
