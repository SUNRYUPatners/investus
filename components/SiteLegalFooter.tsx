import Link from "next/link";
import { BUSINESS_INFO } from "@/lib/businessInfo";

/**
 * 전역 푸터 — PG 사전점검·전자상거래법 고시용.
 * 홈(/) HTML에 사업자 정보·약관 링크가 포함되어야 크롤러가 통과합니다.
 */
export function SiteLegalFooter() {
  const {
    companyName,
    serviceName,
    ceoName,
    registrationNumber,
    address,
    phone,
    email,
    mailOrderNumber,
    privacyOfficer,
  } = BUSINESS_INFO;

  return (
    <footer
      className="border-t mt-8 lg:mt-12 pb-safe"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
      aria-label="사업자 정보 및 법적 고지"
    >
      <div className="max-w-[480px] lg:max-w-4xl mx-auto px-4 py-6 lg:py-8">
        <nav
          className="flex flex-wrap gap-x-3 gap-y-1.5 text-[12px] mb-5"
          aria-label="약관 및 정책"
        >
          <Link href="/more/terms" className="hover:underline" style={{ color: "var(--text)" }}>
            이용약관
          </Link>
          <span style={{ color: "var(--border)" }} aria-hidden>|</span>
          <Link href="/more/privacy" className="hover:underline" style={{ color: "var(--text)" }}>
            개인정보처리방침
          </Link>
          <span style={{ color: "var(--border)" }} aria-hidden>|</span>
          <Link href="/more/refund" className="hover:underline" style={{ color: "var(--text)" }}>
            환불정책
          </Link>
          <span style={{ color: "var(--border)" }} aria-hidden>|</span>
          <Link href="/more/disclaimer" className="hover:underline" style={{ color: "var(--muted)" }}>
            법적고지
          </Link>
        </nav>

        <div className="text-[11px] leading-relaxed space-y-1" style={{ color: "var(--muted)" }}>
          <p>
            <span className="font-semibold" style={{ color: "var(--text)" }}>
              {companyName}
            </span>
            {" · "}
            {serviceName}
          </p>
          <p>대표자: {ceoName}</p>
          {registrationNumber ? (
            <p>사업자등록번호: {registrationNumber}</p>
          ) : null}
          {address ? <p>사업장 주소: {address}</p> : null}
          {phone ? <p>전화번호: {phone}</p> : null}
          <p>
            이메일:{" "}
            <a href={`mailto:${email}`} className="hover:underline" style={{ color: "var(--mint)" }}>
              {email}
            </a>
          </p>
          {mailOrderNumber ? <p>통신판매업 신고번호: {mailOrderNumber}</p> : null}
          <p>개인정보보호책임자: {privacyOfficer}</p>
        </div>

        <p className="text-[10px] mt-4" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
