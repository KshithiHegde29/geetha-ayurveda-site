"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur border-b border-eggplant/10 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl text-black">Dr. Geetha Ayurveda</Link>
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm px-3 py-1.5 rounded-full ${
                  active
                    ? "bg-blue text-white"
                    : "text-black/70 hover:text-black hover:bg-clean/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
