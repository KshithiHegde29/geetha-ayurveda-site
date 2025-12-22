import Link from "next/link";
import { HeroSlider } from "@/components/HeroSlider";

export default function Home() {
  return (
    <main className="py-12">
      <HeroSlider />
      <section className="mt-12">
        <h1 className="text-3xl font-semibold text-black tracking-wide">Ayurveda Research & Formulations</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Publishing articles and resources to support pharmaceutical companies, Ayurvedic colleges, students, and research centers. Explore free content or request premium articles via WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/articles" className="inline-flex items-center rounded-full bg-blue px-5 py-2.5 text-white shadow-sm hover:bg-blue/90">Browse Articles</Link>
        </div>
      </section>

      {/* About Dr. Geetha (merged content) */}
      <section className="mt-12 rounded-2xl p-6 bg-surface border border-eggplant/10 shadow-sm">
        <h2 className="text-2xl font-semibold text-black tracking-wide">About Dr. Geetha</h2>
        <p className="mt-3 max-w-3xl text-muted">
          Dr. Geetha is a researcher and practitioner focused on Ayurvedic formulations, clinical protocols, and education. This site shares free and premium articles, product insights, and services to support pharmaceutical companies, colleges, students, and research centers.
        </p>
      </section>

      <section className="mt-12 grid sm:grid-cols-2 gap-6">
        {["Free Articles", "Premium Articles"].map((label) => (
          <div key={label} className="rounded-2xl p-5 bg-surface text-black border border-eggplant/10 shadow-sm">
            <h3 className="text-lg font-medium tracking-wide">{label}</h3>
            <p className="mt-2 text-sm text-muted">Learn, request, and download resources.</p>
            <div className="mt-4">
              <Link href="/articles" className="text-sm font-medium text-blue hover:underline">Explore</Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
