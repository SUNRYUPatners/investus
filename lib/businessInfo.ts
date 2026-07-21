/**
 * PG·전자상거래 고시용 사업자 정보 (공개 고시).
 * NEXT_PUBLIC_ 환경변수로 오버라이드 가능.
 */
export const BUSINESS_INFO = {
  /** 상호 */
  companyName:
    process.env.NEXT_PUBLIC_BIZ_NAME?.trim() || "주식회사 선류파트너스",
  /** 서비스명 */
  serviceName: "Investus",
  /** 대표자 */
  ceoName:
    process.env.NEXT_PUBLIC_BIZ_CEO?.trim() || "류현우",
  /** 사업자등록번호 */
  registrationNumber:
    process.env.NEXT_PUBLIC_BIZ_NUMBER?.trim() || "790-86-03934",
  /** 사업장 주소 */
  address:
    process.env.NEXT_PUBLIC_BIZ_ADDRESS?.trim() ||
    "서울특별시 강서구 마곡중앙6로 42, 7층 708호(마곡동, 사이언스타)",
  /** 대표 전화번호 */
  phone:
    process.env.NEXT_PUBLIC_BIZ_PHONE?.trim() || "010-3461-2916",
  /** 문의 이메일 */
  email:
    process.env.NEXT_PUBLIC_BIZ_EMAIL?.trim() || "sunryupatners@gmail.com",
  /** 통신판매업 신고번호 (없으면 빈 문자열) */
  mailOrderNumber:
    process.env.NEXT_PUBLIC_BIZ_MAIL_ORDER?.trim() || "",
  /** 개인정보보호 책임자 */
  privacyOfficer:
    process.env.NEXT_PUBLIC_BIZ_PRIVACY_OFFICER?.trim() || "류현우",
} as const;
