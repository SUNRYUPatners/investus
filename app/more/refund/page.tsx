"use client";

import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { BUSINESS_INFO } from "@/lib/businessInfo";

const SECTIONS_KO = [
  {
    title: "1. 적용 범위",
    body: "본 환불정책은 Investus(이하 \"서비스\")가 제공하는 유료 디지털 콘텐츠·구독 상품(Investus Pro 구독, 전자책 등)의 결제·청약철회·환불에 적용됩니다. 실물 상품 배송은 없으며, 결제 완료 즉시 디지털로 제공됩니다.",
  },
  {
    title: "2. Investus Pro 구독 (월간·연간)",
    body: "• 월간 구독: 결제일로부터 1개월간 이용 가능합니다.\n• 연간 구독: 결제일로부터 1년간 이용 가능합니다.\n• 결제 수단: 신용·체크카드, 카카오페이, 네이버페이, 토스페이 등 (포트원 결제)\n• 구독은 이용 기간 종료 시 동일 주기로 자동 갱신될 수 있으며, 갱신 전 해지하면 다음 결제가 청구되지 않습니다.\n• 해지: 서비스 내 구독 관리 또는 문의 이메일로 요청할 수 있습니다. 해지 후에도 이미 결제된 이용 기간의 종료일까지는 이용이 가능합니다.",
  },
  {
    title: "3. 구독 청약철회·환불",
    body: "전자상거래 등에서의 소비자보호에 관한 법률에 따라, 디지털 콘텐츠는 제공이 개시된 경우 청약철회가 제한될 수 있습니다.\n\n• 유료 기능을 한 번도 이용하지 않은 경우: 결제일로부터 7일 이내 전액 환불을 요청할 수 있습니다.\n• 유료 기능(Pro 전용 리포트·기능 등)을 이용한 경우: 디지털 콘텐츠 제공이 개시된 것으로 보아 환불이 제한될 수 있습니다.\n• 연간 구독의 중도 해지: 원칙적으로 잔여 기간에 대한 비례 환불은 제공하지 않습니다. 단, 서비스 장애 등 운영자 귀책으로 이용이 현저히 불가능한 경우 협의 후 환불할 수 있습니다.\n• 자동결제 오류·중복 결제: 확인 후 전액 환불합니다.",
  },
  {
    title: "4. 전자책(디지털 콘텐츠) 환불",
    body: "• 다운로드·열람 전: 결제일로부터 7일 이내 청약철회 및 전액 환불이 가능합니다.\n• 파일 다운로드 또는 열람을 시작한 경우: 전자상거래법 제17조에 따라 청약철회가 제한될 수 있습니다.\n• 파일이 손상되었거나 제공되지 않은 경우: 재제공 또는 전액 환불합니다.",
  },
  {
    title: "5. 환불 절차",
    body: `환불 요청 시 아래 정보를 기재해 이메일로 문의해 주세요.\n\n• 이메일: ${BUSINESS_INFO.email}\n• 기재 사항: 결제 일시, 결제 수단, 주문·결제 금액, 요청 사유, 가입 이메일(또는 주문 이메일)\n\n접수 후 영업일 기준 3~7일 이내에 처리 결과를 안내하며, 승인된 환불은 결제 수단에 따라 카드사·간편결제사 정책에 따른 기간 내에 반영됩니다.`,
  },
  {
    title: "6. 무료 서비스",
    body: "광고 기반 무료 기능(시세, 일부 리포트·커뮤니티 등)에는 유료 결제가 없으므로 본 환불정책의 적용 대상이 아닙니다.",
  },
  {
    title: "부칙",
    body: "본 환불정책은 2026년 7월 21일부터 시행됩니다. 변경 시 서비스 내 공지 또는 본 페이지를 통해 안내합니다.",
  },
];

const SECTIONS_EN = [
  {
    title: "1. Scope",
    body: "This Refund Policy applies to paid digital content and subscriptions offered by Investus (Investus Pro, ebooks, etc.). There is no physical shipping; access is granted digitally upon payment.",
  },
  {
    title: "2. Investus Pro (Monthly / Annual)",
    body: "• Monthly: access for 1 month from the payment date.\n• Annual: access for 1 year from the payment date.\n• Payment methods: card, Kakao Pay, Naver Pay, Toss Pay, etc. (via PortOne).\n• Subscriptions may auto-renew; cancel before renewal to stop the next charge.\n• Cancel via in-app subscription management or by email. Access continues until the end of the already-paid period.",
  },
  {
    title: "3. Subscription Withdrawal & Refunds",
    body: "Under Korean e-commerce consumer protection law, withdrawal may be limited once digital content delivery has begun.\n\n• If paid features were never used: full refund within 7 days of payment.\n• If Pro features were used: refund may be limited as delivery is deemed commenced.\n• Mid-term cancellation of annual plans: no pro-rata refund by default, except for operator fault making service unusable.\n• Duplicate or erroneous charges: full refund after verification.",
  },
  {
    title: "4. Ebook Refunds",
    body: "• Before download/viewing: full refund within 7 days of payment.\n• After download or viewing starts: withdrawal may be limited by law.\n• If the file is corrupt or not delivered: re-delivery or full refund.",
  },
  {
    title: "5. How to Request a Refund",
    body: `Email ${BUSINESS_INFO.email} with payment date, method, amount, reason, and account/order email.\n\nWe respond within 3–7 business days. Approved refunds follow card/pay-provider timelines.`,
  },
  {
    title: "6. Free Features",
    body: "Ad-supported free features are not subject to this policy.",
  },
  {
    title: "Supplementary Provisions",
    body: "This policy takes effect as of July 21, 2026. Changes will be posted on this page or via notices.",
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
          {isKo ? "최종 개정일: 2026년 7월 21일" : "Last updated: July 21, 2026"}
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
