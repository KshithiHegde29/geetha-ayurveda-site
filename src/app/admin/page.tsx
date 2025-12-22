import Link from "next/link";
import { getSession, isAdmin } from "@/lib/auth";

export default async function AdminHome() {
  const session = await getSession();
  const allowed = isAdmin(session);

  if (!allowed) {
    return (
      <div className="py-12">
        <div className="rounded-2xl p-6 bg-surface border border-eggplant/10 shadow-sm">
          <h1 className="text-2xl font-semibold text-black tracking-wide">Admins only</h1>
          <p className="mt-2 text-muted">You must be signed in as the admin to access this area.</p>
          <div className="mt-4">
            <Link href="/login" className="inline-flex items-center rounded-full bg-blue px-4 py-2 text-white hover:bg-blue/90">Sign in</Link>
          </div>
          <p className="mt-3 text-sm text-muted">Once we wire up authentication, this page will automatically restrict access based on your role.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="rounded-2xl p-6 bg-surface border border-eggplant/10 shadow-sm">
        <h1 className="text-2xl font-semibold text-black tracking-wide">Admin dashboard</h1>
        <p className="mt-2 text-muted">Welcome! From here, you’ll be able to create and manage articles.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/admin/articles/new" className="inline-flex items-center rounded-full bg-blue px-4 py-2 text-white hover:bg-blue/90">New Article</Link>
          <Link href="/admin/articles" className="inline-flex items-center rounded-full bg-clean/70 px-4 py-2 text-black hover:bg-clean">Manage Articles</Link>
        </div>
      </div>
    </div>
  );
}
