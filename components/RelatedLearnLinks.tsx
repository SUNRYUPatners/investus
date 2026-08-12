import Link from "next/link";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

const RELATED: { keywords: RegExp; hrefs: string[] }[] = [
  { keywords: /금리|연준|FOMC|CPI|인플레|매크로|채권/, hrefs: ["/learn/macro-rates", "/learn/bonds"] },
  { keywords: /ETF|VOO|SPY|QQQ|인덱스/, hrefs: ["/learn/etf", "/learn/kr-us-etf"] },
  { keywords: /나스닥|NASDAQ|기술주/, hrefs: ["/learn/nasdaq", "/learn/sectors"] },
  { keywords: /S&P|S＆P|대형주|지수/, hrefs: ["/learn/sp500", "/learn/buffett-indicator"] },
  { keywords: /실적|어닝|EPS|가이던스/, hrefs: ["/learn/earnings-season", "/learn/financial-statements"] },
  { keywords: /비트코인|암호화|코인|BTC/, hrefs: ["/learn/crypto"] },
  { keywords: /금|유가|원자재|오일/, hrefs: ["/learn/commodities"] },
  { keywords: /배당|리츠|REIT/, hrefs: ["/learn/dividend", "/learn/reits"] },
  { keywords: /세금|ISA|연금/, hrefs: ["/learn/us-stock-tax", "/learn/korea-accounts"] },
  { keywords: /심리|공포|탐욕|FOMO/, hrefs: ["/learn/fear-greed", "/learn/investing-psychology"] },
  { keywords: /PER|밸류|가치/, hrefs: ["/learn/valuation", "/learn/value-investing"] },
  { keywords: /옵션|콜|풋/, hrefs: ["/learn/options"] },
  { keywords: /환율|달러|원\/달러/, hrefs: ["/learn/usd-krw"] },
];

function pickRelated(text: string, limit = 3) {
  const hrefs: string[] = [];
  for (const rule of RELATED) {
    if (rule.keywords.test(text)) {
      for (const h of rule.hrefs) {
        if (!hrefs.includes(h)) hrefs.push(h);
      }
    }
    if (hrefs.length >= limit) break;
  }
  if (hrefs.length < limit) {
    for (const a of LEARN_ARTICLES) {
      if (!hrefs.includes(a.href)) hrefs.push(a.href);
      if (hrefs.length >= limit) break;
    }
  }
  return hrefs
    .slice(0, limit)
    .map((h) => LEARN_ARTICLES.find((a) => a.href === h))
    .filter(Boolean) as typeof LEARN_ARTICLES;
}

export function RelatedLearnLinks({ title, summary }: { title: string; summary?: string }) {
  const related = pickRelated(`${title} ${summary ?? ""}`);
  if (related.length === 0) return null;

  return (
    <div
      className="mt-4 pt-3 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 font-syne" style={{ color: "var(--muted)" }}>
        관련 심화 가이드
      </p>
      <div className="flex flex-col gap-1.5">
        {related.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="text-[12px] font-medium flex items-center gap-1.5"
            style={{ color: "var(--mint)", textDecoration: "none" }}
          >
            <span>{a.emoji}</span>
            <span className="underline-offset-2 hover:underline">{a.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
