"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Small, self-contained ticker search used on the not-found page. Submitting
 * jumps straight to the stock page for the typed symbol. Uses only useRouter so
 * it works even when rendered outside the app's context providers.
 */
export function TickerSearchBox({
  basePath = "",
  placeholder,
  cta,
}: {
  basePath?: string;
  placeholder: string;
  cta: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const go = () => {
    const sym = value.trim().toUpperCase();
    if (!sym) return;
    router.push(`${basePath}/stock/${encodeURIComponent(sym)}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        go();
      }}
      className="flex items-center gap-2 w-full"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="flex-1 min-w-0 rounded-xl px-3 py-2.5 text-sm outline-none border"
        style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
      />
      <button
        type="submit"
        className="flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold no-underline"
        style={{ background: "var(--mint)", color: "var(--on-accent)" }}
      >
        {cta}
      </button>
    </form>
  );
}
