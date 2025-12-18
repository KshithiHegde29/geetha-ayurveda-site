import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { NoCopy } from "@/components/NoCopy";

function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export default function ArticleDetail({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) return notFound();

  const whatsappText = encodeURIComponent(
    `Hello Dr. Geetha, I would like to download the article PDF: "${article.title}" (slug: ${article.slug}). Please share payment amount and details.`
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  return (
    <article className="py-12">
      <h1 className="text-3xl font-semibold text-black tracking-wide">{article.title}</h1>
      <p className="mt-2 text-muted">Tags: {(article.tags || []).join(", ") || "—"}</p>

      {article.isPremium ? (
        <div className="mt-6 rounded-2xl bg-surface p-6 border border-eggplant/10 shadow-sm">
          <p className="text-black">
            {article.summary}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-blue px-5 py-2.5 text-white shadow-sm hover:bg-blue/90"
            >
              To download article
            </a>
            <span className="text-xs text-muted">
              Redirects to WhatsApp with a prewritten message.
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl bg-surface p-6 border border-eggplant/10 shadow-sm">
          <NoCopy>
            <p className="text-black">{article.content}</p>
          </NoCopy>
        </div>
      )}
    </article>
  );
}
