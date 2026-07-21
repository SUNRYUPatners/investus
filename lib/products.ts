/**
 * 판매·구독 상품 가격 (PG 사전점검·결제 UI 공통).
 * 주식 시세와 구분되도록 홈에 상품명+판매가를 명시합니다.
 */

export const EBOOK_PRODUCT = {
  name: "절대로 잃지 말고 미래에 투자하라",
  kind: "전자책(디지털 콘텐츠)",
  priceKrw: 19_900,
  href: "/buy",
  description:
    "SUNRYU Partners CIO의 미국주식 투자 전략 전자책. 결제 후 PDF를 이메일로 즉시 제공합니다.",
} as const;
