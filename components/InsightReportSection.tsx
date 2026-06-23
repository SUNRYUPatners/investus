"use client";

import { useState } from "react";
import { ReportFeed } from "@/components/ReportFeed";

export function InsightReportSection() {
  const [lang, setLang] = useState<"ko" | "en">("ko");

  return (
    <div>
      <div className="flex justify-end mb-3">
        <button
          onClick={() => setLang((l) => (l === "ko" ? "en" : "ko"))}
          className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full transition-opacity active:opacity-70"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "var(--muted)",
          }}
        >
          {lang === "ko" ? "🌐 English" : "🇰🇷 한국어"}
        </button>
      </div>
      <ReportFeed lang={lang} />
    </div>
  );
}
