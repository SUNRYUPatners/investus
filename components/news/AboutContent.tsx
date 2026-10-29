import Link from "next/link";
import type { ArticleLocale } from "@/lib/articles";

const COPY = {
  en: {
    title: "About Investus & our editorial policy",
    whoTitle: "Who runs this site",
    who:
      "Investus is an independent investor-research publication focused on the Elon Musk ecosystem — Tesla (TSLA), SpaceX, xAI and the companies that trade around them. It is published by SUNRYU Partners, a Seoul-based research team. Our daily notes are written and reviewed by the Investus editorial desk; the Chief Investment Officer is the responsible editor.",
    standardsTitle: "Editorial standards",
    standards: [
      "Informational, not advice. Everything we publish is research and commentary for information only. It is not investment advice, a recommendation, or a solicitation to buy or sell any security, and we never guarantee a return.",
      "Cite sources. Claims, figures and quotes are tied to a verifiable source — company filings, investor-relations releases, earnings calls, regulators (e.g. SEC EDGAR) or named reporting. Each article links to primary sources so readers can check the underlying material.",
      "Balanced views. We present both the bull and bear case, including risks, counter-arguments and what could go wrong — not only the positive scenario.",
      "Accuracy & corrections. We fact-check figures against primary sources before publishing and correct material errors promptly.",
      "No pay-for-coverage. We do not sell favorable coverage, price targets or stock picks. The site is supported by advertising only; there are no paid subscriptions, courses or products.",
    ],
    contactTitle: "Contact & policies",
    contactLead: "Questions, corrections and source tips are welcome.",
    footerLinks: "About the company · Contact · Privacy · Terms · Legal disclaimer",
  },
  ko: {
    title: "인베스트어스 소개 및 편집 방침",
    whoTitle: "누가 운영하나요",
    who:
      "인베스트어스(Investus)는 일론 머스크 생태계 — 테슬라(TSLA), 스페이스X, xAI 및 관련 기업 — 에 집중하는 독립 투자 리서치 매체입니다. 서울 기반 리서치 팀 선류파트너스(SUNRYU Partners)가 발행하며, 일일 리서치는 인베스트어스 편집팀이 작성·검수합니다. 최고투자책임자(CIO)가 책임 편집자입니다.",
    standardsTitle: "편집 원칙",
    standards: [
      "정보 제공이지 자문이 아닙니다. 모든 콘텐츠는 정보 제공용 리서치·해설이며, 투자 자문이나 매수·매도 권유가 아니고 수익을 보장하지 않습니다.",
      "출처를 밝힙니다. 주장·수치·인용은 확인 가능한 출처(기업 공시, IR 자료, 실적 발표, 규제기관(SEC EDGAR 등), 실명 보도)에 근거합니다. 각 글은 원 출처를 링크로 제공합니다.",
      "균형 잡힌 시각. 긍정 시나리오만이 아니라 강세·약세 양쪽 논거와 리스크·반론을 함께 제시합니다.",
      "정확성과 정정. 발행 전 원 출처로 수치를 팩트체크하며, 중대한 오류는 신속히 정정합니다.",
      "대가성 보도 금지. 호의적 보도·목표주가·종목 추천을 판매하지 않습니다. 본 사이트는 광고로만 운영되며 유료 구독·강의·상품이 없습니다.",
    ],
    contactTitle: "문의 및 정책",
    contactLead: "문의·정정·제보를 환영합니다.",
    footerLinks: "회사 소개 · 문의 · 개인정보 · 이용약관 · 법적 고지",
  },
} as const;

export function AboutContent({ locale }: { locale: ArticleLocale }) {
  const c = COPY[locale];
  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold font-syne mb-4" style={{ color: "var(--text)" }}>
        {c.title}
      </h1>

      <section className="mb-6">
        <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>{c.whoTitle}</h2>
        <p className="text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>{c.who}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>{c.standardsTitle}</h2>
        <ul className="flex flex-col gap-2">
          {c.standards.map((s, i) => (
            <li key={i} className="text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-2">
        <h2 className="text-base font-bold mb-2" style={{ color: "var(--text)" }}>{c.contactTitle}</h2>
        <p className="text-[14px] leading-relaxed mb-2" style={{ color: "var(--muted)" }}>{c.contactLead}</p>
        <nav className="flex flex-wrap gap-x-3 gap-y-1 text-[13px]">
          <Link href="/more/about" className="hover:underline" style={{ color: "var(--mint)" }}>
            {locale === "en" ? "About the company" : "회사 소개"}
          </Link>
          <Link href="/more/contact" className="hover:underline" style={{ color: "var(--mint)" }}>
            {locale === "en" ? "Contact" : "문의"}
          </Link>
          <Link href="/more/privacy" className="hover:underline" style={{ color: "var(--mint)" }}>
            {locale === "en" ? "Privacy" : "개인정보"}
          </Link>
          <Link href="/more/terms" className="hover:underline" style={{ color: "var(--mint)" }}>
            {locale === "en" ? "Terms" : "이용약관"}
          </Link>
          <Link href="/more/disclaimer" className="hover:underline" style={{ color: "var(--mint)" }}>
            {locale === "en" ? "Legal disclaimer" : "법적 고지"}
          </Link>
        </nav>
      </section>
    </article>
  );
}
