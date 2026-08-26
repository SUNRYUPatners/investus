import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteLegalFooter } from "@/components/SiteLegalFooter";
import { SHOP_INDEX_URL, SHOP_PRODUCTS } from "@/lib/shopProducts";
import { BUSINESS_INFO } from "@/lib/businessInfo";

export const metadata: Metadata = {
  title: "유료 상품 · 스토어 | Investus",
  description:
    "Investus Pro 구독(월 5,900원·연간 할인)과 투자 전략 전자책(19,900원)을 구매할 수 있습니다. 카카오페이·카드 결제 지원.",
  alternates: { canonical: SHOP_INDEX_URL },
  robots: { index: true, follow: true },
};

export default function ShopPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 lg:px-8 pt-5 pb-10">
        <h1 className="text-lg font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
          Investus 유료 상품
        </h1>
        <p className="text-[12px] leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
          아래 상품은 현재 판매 중이며, 각 상품 페이지에서 바로 결제할 수 있습니다.
          시세·오늘자 리포트 등 기본 기능은 무료이며, Pro 구독·전자책은 유료 상품입니다.
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {SHOP_PRODUCTS.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border p-4"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
              itemScope
              itemType="https://schema.org/Product"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold mb-0.5" style={{ color: "var(--mint)" }}>
                    {p.kind} · 판매 중
                  </p>
                  <h2 className="text-sm font-bold leading-snug" style={{ color: "var(--text)" }} itemProp="name">
                    {p.name}
                  </h2>
                </div>
                <Link
                  href={p.href}
                  className="flex-shrink-0 px-4 py-2 rounded-xl text-[12px] font-bold"
                  style={{ background: "var(--mint)", color: "var(--on-accent)" }}
                >
                  구매하기
                </Link>
              </div>

              <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }} itemProp="description">
                {p.description}
              </p>

              <div
                className="rounded-xl px-3 py-2.5 mb-2 text-[12px]"
                style={{ background: "rgba(255,255,255,0.03)" }}
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <meta itemProp="priceCurrency" content="KRW" />
                <meta itemProp="price" content={String(p.priceKrw)} />
                <meta itemProp="availability" content="https://schema.org/InStock" />
                <div className="flex justify-between gap-2">
                  <span style={{ color: "var(--muted)" }}>판매가</span>
                  <span className="font-bold font-syne" style={{ color: "var(--text)" }}>{p.priceLabel}</span>
                </div>
              </div>

              <dl className="text-[11px] space-y-1.5" style={{ color: "var(--muted)" }}>
                <div className="flex gap-2">
                  <dt className="w-16 flex-shrink-0 font-semibold" style={{ color: "var(--text)" }}>결제경로</dt>
                  <dd>
                    <a href={p.paymentPath} className="break-all underline" style={{ color: "var(--mint)" }}>
                      {p.paymentPath}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 flex-shrink-0 font-semibold" style={{ color: "var(--text)" }}>결제수단</dt>
                  <dd>{p.paymentMethods.join(" · ")}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 flex-shrink-0 font-semibold" style={{ color: "var(--text)" }}>제공방식</dt>
                  <dd>{p.delivery}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <section
          className="rounded-2xl border p-4 mb-6 text-[11px] leading-relaxed"
          style={{ background: "rgba(var(--mint-rgb),0.06)", borderColor: "rgba(var(--mint-rgb),0.25)" }}
          aria-label="결제 경로 요약"
        >
          <h2 className="text-xs font-bold mb-2 font-syne" style={{ color: "var(--text)" }}>
            결제 경로 요약 (PG 심사용)
          </h2>
          <ol className="list-decimal list-inside space-y-1" style={{ color: "var(--muted)" }}>
            <li>
              <strong style={{ color: "var(--text)" }}>스토어</strong>{" "}
              <a href={SHOP_INDEX_URL} className="underline" style={{ color: "var(--mint)" }}>
                {SHOP_INDEX_URL}
              </a>
              {" "}→ 상품 선택 → 구매하기
            </li>
            <li>
              <strong style={{ color: "var(--text)" }}>Pro 구독</strong>{" "}
              <a href="https://www.investus.kr/subscribe" className="underline" style={{ color: "var(--mint)" }}>
                https://www.investus.kr/subscribe
              </a>
            </li>
            <li>
              <strong style={{ color: "var(--text)" }}>전자책</strong>{" "}
              <a href="https://www.investus.kr/buy" className="underline" style={{ color: "var(--mint)" }}>
                https://www.investus.kr/buy
              </a>
            </li>
            <li>
              <strong style={{ color: "var(--text)" }}>더보기</strong>{" "}
              <a href="https://www.investus.kr/more" className="underline" style={{ color: "var(--mint)" }}>
                https://www.investus.kr/more
              </a>
              {" "}→ Pro 구독 가격 안내
            </li>
          </ol>
        </section>

        <section className="rounded-2xl border p-4 mb-2 text-[11px] leading-relaxed" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-xs font-bold mb-2 font-syne" style={{ color: "var(--text)" }}>판매자 정보</h2>
          <p style={{ color: "var(--muted)" }}>
            상호: {BUSINESS_INFO.companyName}<br />
            대표: {BUSINESS_INFO.ceoName}<br />
            사업자등록번호: {BUSINESS_INFO.registrationNumber}<br />
            주소: {BUSINESS_INFO.address}<br />
            연락처: {BUSINESS_INFO.phone} · {BUSINESS_INFO.email}
          </p>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/more/terms" className="underline" style={{ color: "var(--mint)" }}>이용약관</Link>
            <Link href="/more/refund" className="underline" style={{ color: "var(--mint)" }}>환불정책</Link>
            <Link href="/more/privacy" className="underline" style={{ color: "var(--mint)" }}>개인정보처리방침</Link>
          </p>
        </section>
      </main>

      <SiteLegalFooter />
    </div>
  );
}
