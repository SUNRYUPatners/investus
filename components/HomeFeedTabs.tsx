"use client";

import { useState } from "react";
import { Newspaper, FileText } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { HomeNewsFeed } from "@/components/HomeNewsFeed";
import type { HomeArticleCard } from "@/lib/homeArticleCard";

type HomeTab = "news" | "reports";

export function HomeFeedTabs({
  articles,
  children,
}: {
  articles: HomeArticleCard[];
  children: React.ReactNode;
}) {
  const t = useLocale();
  const [tab, setTab] = useState<HomeTab>("news");

  return (
    <div>
      <div
        className="flex gap-1 mx-4 lg:mx-0 mb-4 p-1 rounded-2xl"
        style={{ background: "var(--card)" }}
        role="tablist"
        aria-label={t.homeFeed.tabNews}
      >
        <TabButton
          active={tab === "news"}
          onClick={() => setTab("news")}
          icon={<Newspaper className="w-3.5 h-3.5" />}
          label={t.homeFeed.tabNews}
        />
        <TabButton
          active={tab === "reports"}
          onClick={() => setTab("reports")}
          icon={<FileText className="w-3.5 h-3.5" />}
          label={t.homeFeed.tabReports}
        />
      </div>

      {tab === "news" ? <HomeNewsFeed articles={articles} /> : children}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
      style={
        active
          ? { background: "var(--mint)", color: "#0c1424" }
          : { color: "var(--muted)" }
      }
    >
      {icon}
      {label}
    </button>
  );
}
