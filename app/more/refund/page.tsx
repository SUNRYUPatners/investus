"use client";

import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { BUSINESS_INFO } from "@/lib/businessInfo";

const SECTIONS_KO = [
  {
    title: "유료 상품이 없습니다",
    body: "Investus는 광고 기반의 무료 서비스입니다. 유료 구독(Investus Pro), 전자책, 유료 강의 등 결제가 발생하는 상품을 판매하지 않습니다. 시세·리포트·커뮤니티·투자 교육 콘텐츠는 모두 무료로 제공됩니다.",
  },
  {
    title: "환불 대상",
    body: "판매하는 유료 상품이 없으므로 결제·청약철회·환불 절차가 적용되는 거래가 없습니다. 과거 유료 상품(구독·전자책)은 운영을 종료했습니다.",
  },
  {
    title: "과거 결제 문의",
    body: `과거에 발생한 결제에 대한 문의가 있으시면 이메일로 연락해 주세요.\n\n• 이메일: ${BUSINESS_INFO.email}\n\n확인 후 영업일 기준 3~7일 이내에 안내드립니다.`,
  },
];

const SECTIONS_EN = [
  {
    title: "There are no paid products",
    body: "Investus is a free, ad-supported service. We do not sell any paid subscriptions (Investus Pro), e-books, or paid courses. Prices, reports, community and educational content are all provided free of charge.",
  },
  {
    title: "What this means for refunds",
    body: "Because there are no paid products for sale, there are no payments, withdrawals, or refunds to process. Any previously offered paid products (subscriptions, e-books) have been discontinued.",
  },
  {
    title: "Questions about past charges",
    body: `If you have a question about a charge made in the past, please contact us by email.\n\n• Email: ${BUSINESS_INFO.email}\n\nWe respond within 3–7 business days.`,
  },
];

export default function RefundPage() {
  const locale = useLocaleCode();
  const isKo = locale === "ko";
  const SECTIONS = isKo ? SECTIONS_KO : SECTIONS_EN;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 lg:pb-10">
        <div className="pt-4 pb-2">
          <Link href="/more" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> {isKo ? "더보기" : "More"}
          </Link>
        </div>
        <h1 className="text-lg font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
          {isKo ? "환불정책" : "Refund Policy"}
        </h1>
        <p className="text-[11px] mb-6" style={{ color: "var(--muted)" }}>
          {isKo ? "Investus는 광고 기반 무료 서비스입니다." : "Investus is a free, ad-supported service."}
        </p>

        <div className="flex flex-col gap-5">
          {SECTIONS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl p-4 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <p className="text-sm font-bold mb-2 font-syne" style={{ color: "var(--text)" }}>{s.title}</p>
              <p className="text-[13px] leading-relaxed whitespace-pre-line" style={{ color: "var(--muted)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
