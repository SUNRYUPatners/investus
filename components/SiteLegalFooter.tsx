import Link from "next/link";
import { BUSINESS_INFO, ftcBusinessCheckUrl } from "@/lib/businessInfo";
import { PLATFORM_INTRO_KO, PLATFORM_INTRO_EN } from "@/components/PlatformIntro";
import { getLocale } from "@/lib/getLocale";

/**
 * 전역 푸터 — PG 사전점검·전자상거래법 고시용.
 * 홈(/) HTML에 사업자 정보·약관 링크가 포함되어야 크롤러가 통과합니다.
 */
export async function SiteLegalFooter() {
  const locale = await getLocale();
  const isKo = locale === "ko";
  const platformIntro = isKo ? PLATFORM_INTRO_KO : PLATFORM_INTRO_EN;
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
    hostingProvider,
  } = BUSINESS_INFO;

  const ftcUrl = ftcBusinessCheckUrl(registrationNumber);

  return (
    <footer
      className="border-t mt-8 lg:mt-12 pb-safe"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
      aria-label={isKo ? "사업자 정보 및 법적 고지" : "Business info and legal notices"}
    >
      <div className="max-w-[480px] lg:max-w-4xl mx-auto px-4 py-6 lg:py-8">
        <nav
          className="flex flex-wrap gap-x-3 gap-y-1.5 text-[12px] mb-5"
          aria-label={isKo ? "약관 및 정책" : "Terms and policies"}
        >
          <Link href="/shop" className="hover:underline" style={{ color: "var(--text)" }}>
            {isKo ? "유료상품" : "Shop"}
          </Link>
          <span style={{ color: "var(--border)" }} aria-hidden>|</span>
          <Link href="/more/terms" className="hover:underline" style={{ color: "var(--text)" }}>
            {isKo ? "이용약관" : "Terms"}
          </Link>
          <span style={{ color: "var(--border)" }} aria-hidden>|</span>
          <Link href="/more/privacy" className="hover:underline" style={{ color: "var(--text)" }}>
            {isKo ? "개인정보처리방침" : "Privacy"}
          </Link>
          <span style={{ color: "var(--border)" }} aria-hidden>|</span>
          <Link href="/more/contact" className="hover:underline" style={{ color: "var(--text)" }}>
            {isKo ? "문의" : "Contact"}
          </Link>
          <span style={{ color: "var(--border)" }} aria-hidden>|</span>
          <Link href="/more/refund" className="hover:underline" style={{ color: "var(--text)" }}>
            {isKo ? "환불정책" : "Refund Policy"}
          </Link>
          <span style={{ color: "var(--border)" }} aria-hidden>|</span>
          <Link href="/more/disclaimer" className="hover:underline" style={{ color: "var(--muted)" }}>
            {isKo ? "법적고지" : "Legal"}
          </Link>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8 mb-5">
          <div className="mb-5 lg:mb-0">
            <p className="text-[11px] font-semibold mb-1.5" style={{ color: "var(--text)" }}>
              {platformIntro.title}
            </p>
            <p className="text-[11px] leading-relaxed mb-2" style={{ color: "var(--muted)" }}>
              {platformIntro.lead.join(" ")}
            </p>
            <p className="text-[11px] leading-relaxed mb-2" style={{ color: "var(--mint)" }}>
              {platformIntro.footnote}
            </p>
            <Link
              href="/more/about"
              className="text-[11px] font-semibold hover:underline"
              style={{ color: "var(--text)" }}
            >
              {isKo ? "Investus 소개 보기 →" : "About Investus →"}
            </Link>
          </div>

          <div className="text-[11px] leading-relaxed space-y-1" style={{ color: "var(--muted)" }}>
            <p>
              <span className="font-semibold" style={{ color: "var(--text)" }}>
                {companyName}
              </span>
              {" · "}
              {serviceName}
            </p>
            <p>{isKo ? "대표자:" : "CEO:"} {ceoName}</p>
            {registrationNumber ? (
              <p>
                {isKo ? "사업자등록번호:" : "Business Reg:"} {registrationNumber}{" "}
                <a
                  href={ftcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: "var(--mint)" }}
                >
                  {isKo ? "[사업자정보확인]" : "[Verify]"}
                </a>
              </p>
            ) : null}
            {address ? <p>{isKo ? "사업장 주소:" : "Address:"} {address}</p> : null}
            {phone ? <p>{isKo ? "전화번호:" : "Phone:"} {phone}</p> : null}
            <p>
              {isKo ? "이메일:" : "Email:"}{" "}
              <a href={`mailto:${email}`} className="hover:underline" style={{ color: "var(--mint)" }}>
                {email}
              </a>
            </p>
            <p>
              {isKo ? "통신판매업 신고번호:" : "Mail Order Reg:"}{" "}
              {mailOrderNumber || (isKo ? "신고 준비중" : "Pending")}
            </p>
            <p>{isKo ? "호스팅 서비스 제공자:" : "Hosting Provider:"} {hostingProvider}</p>
            <p>{isKo ? "개인정보보호책임자:" : "Privacy Officer:"} {privacyOfficer}</p>
          </div>
        </div>

        <p className="text-[10px] mt-4" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
