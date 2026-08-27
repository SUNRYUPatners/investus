/** 홈·소개 페이지 공통 플랫폼 소개 카피 */
export const PLATFORM_INTRO_KO = {
  lead: [
    "한국주식을 넘어 미국 주식, 비트코인·금, 한국 부동산까지 —",
    "파편화된 투자 데이터를 AI가 하나로 연결합니다.",
    "글로벌 자산의 흐름을 한눈에 파악하고, 최적의 자산 배분 인사이트를 얻어보세요.",
  ],
  title: "AI 기반 차세대 자산관리(WM) 플랫폼",
  footnote:
    "SUNRYU Partners CIO의 일일 리포트 · 실시간 시세 · AI 포트폴리오 인사이트를 무료로 제공합니다.",
} as const;

export const PLATFORM_INTRO_EN = {
  lead: [
    "Beyond Korean stocks — US equities, Bitcoin, gold, and Korean real estate —",
    "AI connects fragmented investment data in one place.",
    "See global asset flows at a glance and get clearer allocation insights.",
  ],
  title: "AI-Powered Next-Generation Wealth Management (WM) Platform",
  footnote:
    "Daily CIO reports, live prices, and AI portfolio insights — free.",
} as const;

export function PlatformIntro({
  className = "",
  locale = "ko",
  variant = "home",
}: {
  className?: string;
  locale?: "ko" | "en";
  variant?: "home" | "about";
}) {
  const copy = locale === "ko" ? PLATFORM_INTRO_KO : PLATFORM_INTRO_EN;
  const leadSize = variant === "about" ? "text-[13px]" : "text-[12px]";

  return (
    <section aria-label={locale === "ko" ? "서비스 소개" : "About Investus"} className={className}>
      <div className={`${leadSize} leading-relaxed space-y-1 mb-3`} style={{ color: "var(--text)" }}>
        {copy.lead.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
        <span className="block font-semibold mb-1.5" style={{ color: "var(--text)" }}>
          {copy.title}
        </span>
        {locale === "ko" && (
          <span className="block mt-2" style={{ color: "var(--mint)" }}>
            {copy.footnote}
          </span>
        )}
      </p>
    </section>
  );
}
