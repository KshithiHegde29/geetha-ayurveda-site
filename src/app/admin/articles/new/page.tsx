"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewArticlePage() {
  const r = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      let pdfUrl: string | undefined = undefined;
      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("prefix", "pdfs");
        const up = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const uj = await up.json();
        if (!up.ok || !uj.ok) throw new Error(uj.error || "Upload failed");
        pdfUrl = uj.url as string;
      }
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content, isPremium, pdfUrl }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Create failed");
      r.push("/admin/articles");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-12">
      <div className="rounded-2xl p-6 bg-surface border border-eggplant/10 shadow-sm max-w-2xl">
        <h1 className="text-2xl font-semibold text-black tracking-wide">New Article</h1>
        {error && <p className="mt-3 text-sm text-salmon">{error}</p>}
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input className="w-full rounded-md border border-eggplant/20 bg-clean/40 px-3 py-2" value={title} onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Slug</label>
            <input className="w-full rounded-md border border-eggplant/20 bg-clean/40 px-3 py-2" placeholder="unique-article-slug" value={slug} onChange={(e)=>setSlug(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Content</label>
            <textarea className="w-full rounded-md border border-eggplant/20 bg-clean/40 px-3 py-2 min-h-[160px]" value={content} onChange={(e)=>setContent(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <input id="premium" type="checkbox" checked={isPremium} onChange={(e)=>setIsPremium(e.target.checked)} />
            <label htmlFor="premium" className="text-sm">Premium</label>
          </div>
          <div>
            <label className="block text-sm mb-1">PDF (optional)</label>
            <input type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files?.[0] || null)} />
          </div>
          <button disabled={loading} className="inline-flex items-center rounded-full bg-blue px-4 py-2 text-white hover:bg-blue/90 disabled:opacity-60">{loading?"Saving…":"Create"}</button>
        </form>
      </div>
    </div>
  );
}
