import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "자주 묻는 질문 (FAQ) | 인베스트어스 Investus",
  description: "인베스트어스(Investus) 서비스에 대한 자주 묻는 질문. 시세 데이터 출처, 실시간 주가 지연 시간, 무료 기능 안내, 개인정보 보호, 투자 책임 안내 등 궁금한 점을 확인하세요.",
  alternates: { canonical: "https://www.investus.kr/more/faq" },
  openGraph: {
    title: "자주 묻는 질문 (FAQ) | 인베스트어스",
    description: "인베스트어스 서비스 이용 안내 — 시세 데이터, 무료 기능, 개인정보 보호 등 FAQ",
    url: "https://www.investus.kr/more/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
