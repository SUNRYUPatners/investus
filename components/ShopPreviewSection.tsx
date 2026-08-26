import Link from "next/link";
import { SHOP_PRODUCTS, SHOP_INDEX_PATH } from "@/lib/shopProducts";

/** 홈·더보기 — PG 심사용 유료 상품 미리보기 */
export function ShopPreviewSection() {
  return (
    <section className="px-4 lg:px-0 pt-4" aria-label="유료 상품">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
          유료 상품 · 판매 중
        </h2>
        <Link href={SHOP_INDEX_PATH} className="text-[11px] font-semibold" style={{ color: "var(--mint)" }}>
          전체 보기 →
        </Link>
      </div>
      <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        {SHOP_PRODUCTS.filter((p) => p.id !== "pro-yearly").map((p, i) => (
          <div
            key={p.id}
            className={`flex items-center justify-between gap-3 px-4 py-3 ${i > 0 ? "border-t" : ""}`}
            style={{ borderColor: "var(--border)" }}
          >
            <div className="min-w-0">
              <p className="text-[12px] font-bold truncate" style={{ color: "var(--text)" }}>{p.name}</p>
              <p className="text-[10px]" style={{ color: "var(--muted)" }}>{p.priceLabel}</p>
            </div>
            <Link
              href={p.href}
              className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold"
              style={{ background: "var(--mint)", color: "var(--on-accent)" }}
            >
              구매
            </Link>
          </div>
        ))}
        <Link
          href={SHOP_INDEX_PATH}
          className="block text-center py-2.5 text-[11px] font-semibold border-t"
          style={{ borderColor: "var(--border)", color: "var(--mint)", background: "rgba(var(--mint-rgb),0.06)" }}
        >
          스토어에서 결제 경로·상품 상세 보기
        </Link>
      </div>
    </section>
  );
}
