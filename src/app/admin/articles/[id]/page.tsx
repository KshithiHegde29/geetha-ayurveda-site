import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const item = await prisma.article.findUnique({ where: { id: params.id } });
  if (!item) {
    return (
      <div className="py-12">
        <p className="text-muted">Article not found.</p>
        <div className="mt-3"><Link className="text-blue hover:underline" href="/admin/articles">Back</Link></div>
      </div>
    );
  }
  return (
    <div className="py-12">
      <div className="rounded-2xl p-6 bg-surface border border-eggplant/10 shadow-sm max-w-2xl">
        <h1 className="text-2xl font-semibold text-black tracking-wide">Edit: {item.title}</h1>
        <p className="mt-2 text-sm text-muted">Simple edit via API calls can be added here later. For now, you can delete this article via the API or we can add a client form like the create page.</p>
        <div className="mt-4"><Link className="text-blue hover:underline" href="/admin/articles">Back to list</Link></div>
      </div>
    </div>
  );
}
