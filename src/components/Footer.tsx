import { WHATSAPP_NUMBER } from "@/lib/config";

export function Footer() {
  const text = encodeURIComponent("Hello Dr. Geetha, I'd like to connect.");
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  return (
    <footer className="border-t border-eggplant/20 mt-12 bg-clean/60">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-black/70 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-base">Contact Dr. Geetha</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-blue px-4 py-2 text-white shadow-sm hover:bg-blue/90"
          >
            WhatsApp
          </a>
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p>© {new Date().getFullYear()} Dr. Geetha Ayurveda. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-black">Privacy Policy</a>
            <a href="/terms" className="hover:text-black">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
