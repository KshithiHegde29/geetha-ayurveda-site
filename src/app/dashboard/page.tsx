import Link from "next/link";
import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) {
    return (
      <div className="py-12">
        <div className="rounded-2xl p-6 bg-surface border border-eggplant/10 shadow-sm">
          <h1 className="text-2xl font-semibold text-black tracking-wide">Welcome</h1>
          <p className="mt-2 text-muted">Please sign in to view your dashboard.</p>
          <div className="mt-4"><Link href="/login" className="inline-flex items-center rounded-full bg-blue px-4 py-2 text-white hover:bg-blue/90">Sign in</Link></div>
        </div>
      </div>
    );
  }

  // Placeholder: purchase tracking not implemented yet
  const purchasedCount = 0;

  return (
    <div className="py-12">
      <div className="rounded-2xl p-6 bg-surface border border-eggplant/10 shadow-sm">
        <h1 className="text-2xl font-semibold text-black tracking-wide">Dashboard</h1>
        <p className="mt-2 text-muted">Signed in as {user.email}</p>
        <div className="mt-6 grid sm:grid-cols-3 gap-6">
          <div className="rounded-2xl p-5 bg-clean/40 border border-eggplant/10">
            <p className="text-sm text-muted">Purchased articles</p>
            <p className="text-2xl font-semibold text-black mt-1">{purchasedCount}</p>
          </div>
          <div className="rounded-2xl p-5 bg-clean/40 border border-eggplant/10">
            <p className="text-sm text-muted">Explore more</p>
            <Link href="/articles" className="text-blue hover:underline">Browse articles</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
