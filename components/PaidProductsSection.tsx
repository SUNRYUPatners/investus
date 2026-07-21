import Link from "next/link";
import {
  SUBSCRIPTION,
  formatSubPrice,
  proPriceSummaryKo,
} from "@/lib/subscription";
import { EBOOK_PRODUCT } from "@/lib/products";

/**
 * 홈 상단 판매 상품 고지 — PG 사전점검이 주식 시세와 혼동하지 않도록
 * 실제 판매·구독 상품명과 판매가를 HTML에 명시합니다.
 */
export function PaidProductsSection() {
  const month = formatSubPrice(SUBSCRIPTION.priceKrw);
  const year = formatSubPrice(SUBSCRIPTION.yearlyPriceKrw);
  const yearList = formatSubPrice(SUBSCRIPTION.yearlyListPriceKrw);
  const ebook = `₩${EBOOK_PRODUCT.priceKrw.toLocaleString("ko-KR")}`;

  return (
    <section
      className="px-4 lg:px-0 pt-4"
      aria-label="판매 상품 및 구독 서비스"
      itemScope
      itemType="https://schema.org/OfferCatalog"
    >
      <meta itemProp="name" content="Investus 판매·구독 상품" />
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-xs font-semibold tracking-widest uppercase font-syne"
          style={{ color: "var(--text)" }}
        >
          판매·구독 상품
        </h2>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          디지털 콘텐츠 · 실물 배송 없음
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {/* Pro 구독 — 추천주식 + 리포트 */}
        <article
          className="rounded-2xl border p-4"
          style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.28)" }}
          itemScope
          itemType="https://schema.org/Product"
        >
          <meta itemProp="name" content={`${SUBSCRIPTION.productName} 구독`} />
          <meta
            itemProp="description"
            content={`${SUBSCRIPTION.includes.join(", ")}. ${proPriceSummaryKo()}`}
          />
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <p className="text-[10px] font-bold mb-0.5" style={{ color: "var(--mint)" }}>
                구독 서비스
              </p>
              <h3 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }} itemProp="name">
                {SUBSCRIPTION.productName}
              </h3>
            </div>
            <Link
              href="/subscribe"
              className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold"
              style={{ background: "var(--mint)", color: "#000" }}
            >
              구독하기
            </Link>
          </div>
          <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            포함 상품: {SUBSCRIPTION.includes.join(" · ")}
          </p>
          <ul className="flex flex-col gap-1.5 mb-1">
            <li
              className="flex items-center justify-between text-[12px] rounded-xl px-3 py-2"
              style={{ background: "rgba(255,255,255,0.03)" }}
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <meta itemProp="priceCurrency" content="KRW" />
              <meta itemProp="price" content={String(SUBSCRIPTION.priceKrw)} />
              <meta itemProp="availability" content="https://schema.org/InStock" />
              <span style={{ color: "var(--muted)" }}>월간 구독</span>
              <span className="font-bold font-syne" style={{ color: "var(--text)" }}>
                {month}
                <span className="text-[10px] font-medium" style={{ color: "var(--muted)" }}>/월</span>
              </span>
            </li>
            <li
              className="flex items-center justify-between text-[12px] rounded-xl px-3 py-2"
              style={{ background: "rgba(0,229,160,0.06)" }}
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <meta itemProp="priceCurrency" content="KRW" />
              <meta itemProp="price" content={String(SUBSCRIPTION.yearlyPriceKrw)} />
              <meta itemProp="availability" content="https://schema.org/InStock" />
              <span style={{ color: "var(--muted)" }}>
                연간 구독
                <span
                  className="ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: "var(--mint)", color: "#000" }}
                >
                  {SUBSCRIPTION.yearlyDiscountPercent}% 할인
                </span>
              </span>
              <span className="text-right">
                <span className="text-[10px] line-through mr-1.5" style={{ color: "var(--muted)" }}>
                  {yearList}
                </span>
                <span className="font-bold font-syne" style={{ color: "var(--mint)" }}>
                  {year}
                  <span className="text-[10px] font-medium" style={{ color: "var(--muted)" }}>/년</span>
                </span>
              </span>
            </li>
          </ul>
        </article>

        {/* 전자책 */}
        <article
          className="rounded-2xl border p-4"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
          itemScope
          itemType="https://schema.org/Product"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <p className="text-[10px] font-bold mb-0.5" style={{ color: "var(--muted)" }}>
                {EBOOK_PRODUCT.kind} · 투자클럽
              </p>
              <h3 className="text-sm font-bold leading-snug" style={{ color: "var(--text)" }} itemProp="name">
                {EBOOK_PRODUCT.name}
              </h3>
            </div>
            <Link
              href={EBOOK_PRODUCT.href}
              className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold border"
              style={{ borderColor: "var(--mint)", color: "var(--mint)" }}
            >
              구매하기
            </Link>
          </div>
          <p className="text-[11px] leading-relaxed mb-2" style={{ color: "var(--muted)" }} itemProp="description">
            {EBOOK_PRODUCT.description}
          </p>
          <div
            className="flex items-center justify-between text-[12px] rounded-xl px-3 py-2"
            style={{ background: "rgba(255,255,255,0.03)" }}
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <meta itemProp="priceCurrency" content="KRW" />
            <meta itemProp="price" content={String(EBOOK_PRODUCT.priceKrw)} />
            <meta itemProp="availability" content="https://schema.org/InStock" />
            <span style={{ color: "var(--muted)" }}>판매가 (일시불)</span>
            <span className="font-bold font-syne" style={{ color: "var(--text)" }}>{ebook}</span>
          </div>
        </article>

        {/* 투자클럽 안내 */}
        <article
          className="rounded-2xl border px-4 py-3"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>투자클럽</h3>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                크리에이터 강의·전자책·리포트 — 채널별 유료 콘텐츠
              </p>
            </div>
            <Link
              href="/wall?tab=creator"
              className="flex-shrink-0 text-[11px] font-bold"
              style={{ color: "var(--mint)" }}
            >
              둘러보기 →
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
