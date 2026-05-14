import { Header } from "@/components/Header";
import { ReportFeed } from "@/components/ReportFeed";
import { YoutubeChannels } from "@/components/YoutubeChannels";
import { BookCarousel } from "@/components/BookCarousel";
import Link from "next/link";
import { AdBanner } from "@/components/AdBanner";
import { getLocale } from "@/lib/getLocale";
import { getT } from "@/lib/i18n";

export default async function InsightPage() {
  const locale = await getLocale();
  const t = getT(locale).insight;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-3xl mx-auto px-4 lg:px-8 pb-24 lg:pb-10">
        {/* Title */}
        <div className="pt-5 pb-4">
          <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
            {t.title}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
            {t.subtitle}
          </p>
        </div>

        {/* ── 전자책 배너 ── */}
        <section className="mb-6">
          <Link
            href="/buy"
            className="block rounded-2xl overflow-hidden border active:opacity-90 transition-opacity"
            style={{ borderColor: "rgba(0,229,160,0.25)" }}
          >
            <div
              className="relative px-5 py-5 flex gap-4 items-center"
              style={{
                background: "linear-gradient(135deg, #0d1f18 0%, #0a0c10 60%, #0d1520 100%)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 20% 50%, rgba(0,229,160,0.08) 0%, transparent 60%)",
                }}
              />

              <div
                className="relative w-[68px] h-[96px] rounded-xl flex-shrink-0 flex flex-col items-center justify-center gap-1 shadow-lg"
                style={{
                  background: "linear-gradient(160deg, #0f2d1e, #071510)",
                  border: "1px solid rgba(0,229,160,0.3)",
                  boxShadow: "0 8px 24px rgba(0,229,160,0.15)",
                }}
              >
                <span className="text-2xl">📈</span>
                <p
                  className="text-[7px] font-bold text-center px-1 leading-tight"
                  style={{ color: "var(--mint)" }}
                >
                  {t.bookCoverL1}
                  <br />
                  {t.bookCoverL2}
                </p>
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full mb-2"
                  style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}
                >
                  {t.newRelease}
                </div>
                <p className="text-sm font-bold leading-snug mb-1" style={{ color: "var(--text)" }}>
                  {t.bookTitle}
                </p>
                <p className="text-[11px] mb-2.5" style={{ color: "var(--muted)" }}>
                  {t.bookSubtitle}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold font-mono-num" style={{ color: "var(--mint)" }}>
                    ₩19,900
                  </p>
                  <span
                    className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                    style={{ background: "var(--mint)", color: "#000" }}
                  >
                    {t.buy}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ── 투자 교육 배너 ── */}
        <section className="mb-6">
          <Link
            href="/education"
            className="block rounded-2xl overflow-hidden border active:opacity-90 transition-opacity"
            style={{ borderColor: "rgba(139,92,246,0.25)" }}
          >
            <div
              className="relative px-5 py-5 flex items-center gap-4"
              style={{
                background: "linear-gradient(135deg, #1a0d2e 0%, #0d0d1f 60%, #0a0c10 100%)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 80% 50%, rgba(139,92,246,0.1) 0%, transparent 60%)",
                }}
              />

              <div
                className="relative w-[68px] h-[68px] rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(145deg, #2d1a4e, #1a0d2e)",
                  border: "1px solid rgba(139,92,246,0.35)",
                  boxShadow: "0 8px 24px rgba(139,92,246,0.2)",
                }}
              >
                <span className="text-3xl">🎓</span>
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full mb-2"
                  style={{ background: "rgba(139,92,246,0.2)", color: "#a78bfa" }}
                >
                  {t.exclusiveClass}
                </div>
                <p className="text-sm font-bold leading-snug mb-1" style={{ color: "var(--text)" }}>
                  {t.courseTitle}
                </p>
                <p className="text-[11px] mb-2.5" style={{ color: "var(--muted)" }}>
                  {t.courseSub}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{ color: "#a78bfa" }}>
                    {t.limitedSpots}
                  </p>
                  <span
                    className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                      color: "#fff",
                    }}
                  >
                    {t.apply}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* ── 광고 ── */}
        <section className="mb-4">
          <AdBanner format="auto" />
        </section>

        {/* ── Investus 리포트 ── */}
        <section className="mb-6">
          <ReportFeed />
        </section>

        {/* ── 추천 도서 ── */}
        <section className="mb-6">
          <h2
            className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}
          >
            {t.books}
          </h2>
          <BookCarousel />
        </section>

        {/* ── 유튜브 채널 ── */}
        <section>
          <h2
            className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}
          >
            {t.youtube}
          </h2>
          <YoutubeChannels />
        </section>
      </main>
    </div>
  );
}
