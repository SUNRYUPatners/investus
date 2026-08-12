import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronLeft, Mail, Phone, MapPin, Building2 } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/businessInfo";
import { getLocale } from "@/lib/getLocale";

export const metadata: Metadata = {
  title: "문의 · 연락처 | Investus",
  description:
    "Investus(인베스트어스) 고객 문의, 광고 제휴, 사업자 연락처. 주식회사 선류파트너스.",
};

export default async function ContactPage() {
  const locale = await getLocale();
  const isKo = locale === "ko";
  const b = BUSINESS_INFO;

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
          {isKo ? "문의 · 연락처" : "Contact"}
        </h1>
        <p className="text-[12px] mb-6 leading-relaxed" style={{ color: "var(--muted)" }}>
          {isKo
            ? "서비스 이용, 구독, 광고·제휴, 개인정보 관련 문의는 아래로 연락해 주세요. 영업일 기준 1~2일 내 회신합니다."
            : "For product, subscription, advertising partnership, or privacy inquiries, contact us below. We typically reply within 1–2 business days."}
        </p>

        <div className="rounded-2xl border p-4 mb-4 space-y-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-start gap-3">
            <Building2 className="w-4 h-4 mt-0.5" style={{ color: "var(--mint)" }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>{isKo ? "상호" : "Company"}</p>
              <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{b.companyName}</p>
              <p className="text-[11px]" style={{ color: "var(--muted)" }}>{b.serviceName} · {isKo ? "대표" : "CEO"} {b.ceoName}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 mt-0.5" style={{ color: "var(--mint)" }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>Email</p>
              <a href={`mailto:${b.email}`} className="text-sm hover:underline" style={{ color: "var(--mint)" }}>
                {b.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 mt-0.5" style={{ color: "var(--mint)" }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>{isKo ? "전화" : "Phone"}</p>
              <a href={`tel:${b.phone.replace(/-/g, "")}`} className="text-sm" style={{ color: "var(--text)" }}>
                {b.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-0.5" style={{ color: "var(--mint)" }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>{isKo ? "사업장 주소" : "Address"}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>{b.address}</p>
              <p className="text-[11px] mt-1" style={{ color: "var(--muted)" }}>
                {isKo ? "사업자등록번호" : "Business Reg."}: {b.registrationNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border p-4 mb-6" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-sm font-bold mb-2" style={{ color: "var(--text)" }}>
            {isKo ? "광고 · 제휴 문의" : "Advertising & partnerships"}
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {isKo
              ? "증권·핀테크·투자 교육 관련 디스플레이 광고 및 제휴는 이메일 제목에 [광고문의]를 넣어 보내 주세요. 사이트에는 Google AdSense 및 Kakao AdFit이 사용될 수 있습니다."
              : "For brokerage, fintech, or investor-education display ads and partnerships, email us with [Ad Inquiry] in the subject. This site may use Google AdSense and Kakao AdFit."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-[12px]">
          <Link href="/more/privacy" className="hover:underline" style={{ color: "var(--mint)" }}>
            {isKo ? "개인정보처리방침" : "Privacy"}
          </Link>
          <Link href="/more/terms" className="hover:underline" style={{ color: "var(--mint)" }}>
            {isKo ? "이용약관" : "Terms"}
          </Link>
          <Link href="/more/about" className="hover:underline" style={{ color: "var(--mint)" }}>
            {isKo ? "소개" : "About"}
          </Link>
        </div>
      </main>
    </div>
  );
}
