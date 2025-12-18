import { WHATSAPP_NUMBER } from "@/lib/config";

export default function ContactPage() {
  const text = encodeURIComponent("Hello Dr. Geetha, I'd like to connect.");
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="mt-2 text-zinc-700">Reach out for collaboration, services, and article requests.</p>
      <div className="mt-6">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          WhatsApp Dr. Geetha
        </a>
      </div>
    </section>
  );
}
