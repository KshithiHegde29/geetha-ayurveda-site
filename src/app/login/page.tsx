"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email.";
    }
    if (!password || password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors(null);
    setMessage(null);

    const err = validate();
    if (err) {
      setErrors(err);
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      // Fetch session to decide redirect based on role
      try {
        const s = await fetch("/api/auth/session", { cache: "no-store" }).then((r) => r.json());
        const role = s?.user?.role ?? "user";
        router.push(role === "admin" ? "/admin" : "/dashboard");
        return;
      } catch {}
      setMessage("Signed in successfully.");
    } else {
      setErrors("Invalid email or password.");
    }
  }

  return (
    <div className="mx-auto max-w-md w-full py-12">
      <div className="bg-surface border border-eggplant/10 shadow-sm rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-black tracking-wide">Log in</h1>
        <p className="mt-2 text-sm text-muted">Welcome back! Enter your details below.</p>

        {errors && (
          <div className="mt-4 rounded-md border border-salmon/40 bg-salmon/10 px-3 py-2 text-sm text-black">
            {errors}
          </div>
        )}
        {message && (
          <div className="mt-4 rounded-md border border-blue/40 bg-blue/10 px-3 py-2 text-sm text-black">
            {message}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm text-black mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-eggplant/20 bg-clean/40 px-3 py-2 text-black outline-none focus:border-blue/60"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm text-black mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-eggplant/20 bg-clean/40 px-3 py-2 text-black outline-none focus:border-blue/60"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-full bg-blue px-4 py-2.5 text-white shadow-sm hover:bg-blue/90 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-muted">
          New here? <Link href="/signup" className="text-blue hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
