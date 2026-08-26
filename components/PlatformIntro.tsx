/** 홈 하단·SEO용 플랫폼 소개 카피 */
export function PlatformIntro({ className = "" }: { className?: string }) {
  return (
    <section aria-label="서비스 소개" className={className}>
      <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
        <span className="block font-semibold mb-1.5" style={{ color: "var(--text)" }}>
          AI 기반 차세대 자산관리(WM) 핀테크 플랫폼
        </span>
        한국주식을 넘어 미국 주식, 비트코인·금, 한국 부동산까지 — 파편화된 투자 데이터를 AI가 하나로 연결합니다.
        글로벌 자산의 흐름을 한눈에 파악하고, 최적의 자산 배분 인사이트를 얻어보세요.
        <span className="block mt-2" style={{ color: "var(--mint)" }}>
          SUNRYU Partners CIO의 일일 리포트 · 실시간 시세 · AI 포트폴리오 인사이트를 무료로 제공합니다.
        </span>
      </p>
    </section>
  );
}
