import Link from "next/link";
import { articles } from "@/data/articles";

export default function ArticlesPage() {
  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold text-black tracking-wide">Articles</h1>
      <p className="mt-2 text-muted">Free and premium articles on Ayurveda and formulations.</p>
      <ul className="mt-6 grid sm:grid-cols-2 gap-6">
        {articles.map((a) => (
          <li key={a.id} className="rounded-2xl p-5 bg-surface text-black border border-eggplant/10 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">{a.title}</h2>
              <span className={`text-xs px-2 py-1 rounded border border-eggplant/20 ${a.isPremium ? "bg-salmon/20" : "bg-clean/40"}`}>
                {a.isPremium ? "Premium" : "Free"}
              </span>
            </div>
            <p className="mt-2 text-muted">{a.summary}</p>
            <div className="mt-4">
              <Link href={`/articles/${a.slug}`} className="text-sm font-medium text-blue hover:underline">
                Read more
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
