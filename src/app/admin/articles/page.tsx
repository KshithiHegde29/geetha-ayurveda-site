import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession, isAdmin } from "@/lib/auth";

export default async function AdminArticlesPage() {
  const session = await getSession();
  if (!isAdmin(session)) {
    return (
      <div className="py-12">
        <div className="rounded-2xl p-6 bg-surface border border-eggplant/10 shadow-sm">
          <h1 className="text-2xl font-semibold text-black tracking-wide">Admins only</h1>
          <p className="mt-2 text-muted">Please sign in as the admin to manage articles.</p>
          <div className="mt-4"><Link href="/login" className="inline-flex items-center rounded-full bg-blue px-4 py-2 text-white hover:bg-blue/90">Sign in</Link></div>
        </div>
      </div>
    );
  }

  const items = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="py-12">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-black tracking-wide">Articles</h1>
        <Link href="/admin/articles/new" className="inline-flex items-center rounded-full bg-blue px-4 py-2 text-white hover:bg-blue/90">New Article</Link>
      </div>
      <div className="rounded-2xl bg-surface border border-eggplant/10 shadow-sm divide-y divide-eggplant/10">
        {items.length === 0 && <p className="p-6 text-muted">No articles yet.</p>}
        {items.map((a) => (
          <div key={a.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-black">{a.title}</p>
              <p className="text-sm text-muted">/{a.slug} {a.isPremium ? "· premium" : ""}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/articles/${a.id}`} className="text-blue hover:underline text-sm">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
