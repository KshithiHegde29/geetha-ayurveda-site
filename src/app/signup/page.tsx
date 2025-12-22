"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!name || name.trim().length < 2) return "Please enter your full name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email.";
    if (!password || password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors(null);
    setMessage(null);

    const err = validate();
    if (err) return setErrors(err);

    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (res.ok) {
      setMessage("Account created. You can now sign in.");
    } else {
      setErrors(data?.error ?? "Could not create account");
    }
  }

  return (
    <div className="mx-auto max-w-md w-full py-12">
      <div className="bg-surface border border-eggplant/10 shadow-sm rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-black tracking-wide">Create account</h1>
        <p className="mt-2 text-sm text-muted">Join to access premium articles and services.</p>

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
            <label className="block text-sm text-black mb-1">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-eggplant/20 bg-clean/40 px-3 py-2 text-black outline-none focus:border-blue/60"
              placeholder="Dr. Geetha"
              autoComplete="name"
            />
          </div>
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
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-sm text-black mb-1">Confirm password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-md border border-eggplant/20 bg-clean/40 px-3 py-2 text-black outline-none focus:border-blue/60"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-full bg-blue px-4 py-2.5 text-white shadow-sm hover:bg-blue/90 disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-muted">
          Already have an account? <Link href="/login" className="text-blue hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
