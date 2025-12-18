"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

export function NoCopy({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prevent = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Block common copy/selection/print shortcuts
      if (
        e.key.toLowerCase() === "c" && (e.metaKey || e.ctrlKey) ||
        e.key.toLowerCase() === "a" && (e.metaKey || e.ctrlKey) ||
        e.key.toLowerCase() === "x" && (e.metaKey || e.ctrlKey) ||
        e.key.toLowerCase() === "s" && (e.metaKey || e.ctrlKey) ||
        e.key.toLowerCase() === "p" && (e.metaKey || e.ctrlKey)
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Attempt to catch screenshot shortcuts (best-effort only)
      if (
        // macOS screenshots: ⌘ + ⇧ + 3/4/5
        e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)
      ) {
        e.preventDefault();
        e.stopPropagation();
        // Briefly blur content to discourage capture
        setBlurred(true);
        setTimeout(() => setBlurred(false), 800);
      }
      // Windows PrintScreen
      if (e.key === "PrintScreen") {
        e.preventDefault();
        e.stopPropagation();
        setBlurred(true);
        setTimeout(() => setBlurred(false), 800);
      }
    };

    el.addEventListener("copy", prevent);
    el.addEventListener("cut", prevent);
    el.addEventListener("contextmenu", prevent);
    el.addEventListener("dragstart", prevent);
    document.addEventListener("keydown", onKeyDown, { capture: true });

    return () => {
      el.removeEventListener("copy", prevent);
      el.removeEventListener("cut", prevent);
      el.removeEventListener("contextmenu", prevent);
      el.removeEventListener("dragstart", prevent);
      document.removeEventListener("keydown", onKeyDown, { capture: true } as any);
    };
  }, []);

  return (
    <div ref={ref} className={`select-none ${blurred ? "blur-sm" : ""}`}>
      {children}
    </div>
  );
}
