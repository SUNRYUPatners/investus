/**
 * PG·카카오페이 심사용 판매 상품 목록 (결제 경로 포함).
 */
import { EBOOK_PRODUCT } from "./products";
import { SUBSCRIPTION, formatSubPrice } from "./subscription";

export type ShopProduct = {
  id: string;
  name: string;
  kind: string;
  description: string;
  priceLabel: string;
  priceKrw: number;
  href: string;
  /** 심사·고객용 결제 URL (절대경로) */
  paymentPath: string;
  paymentMethods: string[];
  delivery: string;
};

const SITE = "https://www.investus.kr";

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "pro-monthly",
    name: `${SUBSCRIPTION.productName} (월간 구독)`,
    kind: "디지털 구독",
    description: SUBSCRIPTION.includes.join(" · "),
    priceLabel: `${formatSubPrice(SUBSCRIPTION.priceKrw)}/월`,
    priceKrw: SUBSCRIPTION.priceKrw,
    href: "/subscribe",
    paymentPath: `${SITE}/subscribe`,
    paymentMethods: ["신용·체크카드", "카카오페이", "네이버페이", "토스페이"],
    delivery: "결제 즉시 Pro 기능 활성화 (디지털)",
  },
  {
    id: "pro-yearly",
    name: `${SUBSCRIPTION.productName} (연간 구독)`,
    kind: "디지털 구독",
    description: `연간 ${SUBSCRIPTION.yearlyDiscountPercent}% 할인 · ${SUBSCRIPTION.includes.join(" · ")}`,
    priceLabel: `${formatSubPrice(SUBSCRIPTION.yearlyPriceKrw)}/년`,
    priceKrw: SUBSCRIPTION.yearlyPriceKrw,
    href: "/subscribe",
    paymentPath: `${SITE}/subscribe`,
    paymentMethods: ["신용·체크카드", "카카오페이", "네이버페이", "토스페이"],
    delivery: "결제 즉시 Pro 기능 활성화 (디지털)",
  },
  {
    id: "ebook",
    name: EBOOK_PRODUCT.name,
    kind: EBOOK_PRODUCT.kind,
    description: EBOOK_PRODUCT.description,
    priceLabel: `₩${EBOOK_PRODUCT.priceKrw.toLocaleString("ko-KR")} (일시불)`,
    priceKrw: EBOOK_PRODUCT.priceKrw,
    href: EBOOK_PRODUCT.href,
    paymentPath: `${SITE}/buy`,
    paymentMethods: ["신용·체크카드", "카카오페이"],
    delivery: "결제 후 PDF 안내 이메일 발송 (디지털)",
  },
];

export const SHOP_INDEX_PATH = "/shop";
export const SHOP_INDEX_URL = `${SITE}${SHOP_INDEX_PATH}`;
