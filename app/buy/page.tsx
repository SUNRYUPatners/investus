"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CheckCircle, Copy, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";

const BOOK = {
  title:  "절대로 잃지 말고 미래에 투자하라",
  author: "SUNRYU Partners CIO",
  desc:   "잃지 않는 투자의 원칙부터 미래 유망 섹터까지 — 실전 중심의 미국주식 투자 전략",
  price:  19900,
};

const ACCOUNT = {
  bank:   "카카오뱅크",
  number: "3333-22-2070396",
  holder: "류현우",
};

function fmt(n: number) {
  return "₩" + n.toLocaleString("ko-KR");
}

/* ── 입금 안내 화면 ── */
function TransferScreen({ name, email }: { name: string; email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(ACCOUNT.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-xl mx-auto px-4 lg:px-8 pt-4 pb-12">
        <Link href="/buy" className="inline-flex items-center gap-1 text-xs mb-5"
          style={{ color: "var(--muted)" }}>
          <ChevronLeft className="w-3.5 h-3.5" /> 돌아가기
        </Link>

        {/* 완료 아이콘 */}
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,229,160,0.15)" }}>
            <CheckCircle className="w-8 h-8" style={{ color: "var(--mint)" }} />
          </div>
          <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
            아래 계좌로 입금해주세요
          </p>
          <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
            입금 확인 후 PDF를 이메일로 발송해드립니다
          </p>
        </div>

        {/* 계좌 정보 카드 */}
        <div className="rounded-2xl border p-5 mb-4"
          style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.25)" }}>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "var(--muted)" }}>은행</span>
              <span className="text-sm font-bold" style={{ color: "var(--text)" }}>{ACCOUNT.bank}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "var(--muted)" }}>예금주</span>
              <span className="text-sm font-bold" style={{ color: "var(--text)" }}>{ACCOUNT.holder}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "var(--muted)" }}>계좌번호</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-mono" style={{ color: "var(--text)" }}>
                  {ACCOUNT.number}
                </span>
                <button onClick={copy}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all"
                  style={{
                    background: copied ? "rgba(0,229,160,0.2)" : "rgba(255,255,255,0.06)",
                    color: copied ? "var(--mint)" : "var(--muted)",
                  }}>
                  <Copy className="w-3 h-3" />
                  {copied ? "복사됨" : "복사"}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t"
              style={{ borderColor: "var(--border)" }}>
              <span className="text-xs" style={{ color: "var(--muted)" }}>입금액</span>
              <span className="text-lg font-bold" style={{ color: "var(--mint)" }}>{fmt(BOOK.price)}</span>
            </div>
          </div>
        </div>

        {/* 안내 */}
        <div className="rounded-xl p-4 border mb-4"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}>
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
            <span className="font-semibold" style={{ color: "var(--text)" }}>입금자명</span>에{" "}
            <span className="font-bold" style={{ color: "var(--mint)" }}>{name}</span>
            {" "}으로 입력해주세요.{"\n"}
            {email && (
              <>
                확인 후{" "}
                <span className="font-semibold" style={{ color: "var(--text)" }}>{email}</span>
                {" "}로 PDF를 발송해드립니다.
              </>
            )}
            {!email && "확인 후 sunryupatners@gmail.com으로 이메일 주소를 알려주시면 PDF를 발송해드립니다."}
          </p>
        </div>

        <a href="mailto:sunryupatners@gmail.com?subject=전자책 입금 완료"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-xs font-semibold border transition-opacity hover:opacity-80"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          입금 완료 후 메일로 알려주기
        </a>
      </main>
    </div>
  );
}

export default function BuyPage() {
  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errMsg,      setErrMsg]      = useState("");
  const [loading,     setLoading]     = useState(false);
  const [done,        setDone]        = useState(false);

  const handleSubmit = async () => {
    if (!name.trim())  { setErrMsg("이름을 입력해주세요."); return; }
    if (!termsAgreed)  { setErrMsg("구매 조건 및 환불정책에 동의해주세요."); return; }

    setErrMsg("");
    setLoading(true);

    try {
      await fetch("/api/book-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
    } catch { /* 알림 실패해도 계속 진행 */ }

    setLoading(false);
    setDone(true);
  };

  if (done) return <TransferScreen name={name} email={email} />;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-xl mx-auto px-4 lg:px-8 pt-4 pb-12 lg:pb-10">
        <Link href="/insight" className="inline-flex items-center gap-1 text-xs mb-5"
          style={{ color: "var(--muted)" }}>
          <ChevronLeft className="w-3.5 h-3.5" /> 인사이트
        </Link>

        <h1 className="text-base font-bold font-syne mb-5" style={{ color: "var(--text)" }}>
          전자책 구매
        </h1>

        {/* 상품 카드 */}
        <div className="rounded-2xl p-4 border mb-5 flex gap-4"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="w-[72px] h-[100px] rounded-xl flex-shrink-0 flex flex-col items-center justify-center gap-1 shadow-lg"
            style={{
              background: "linear-gradient(160deg, #0f2d1e, #071510)",
              border:     "1px solid rgba(0,229,160,0.3)",
              boxShadow:  "0 8px 24px rgba(0,229,160,0.15)",
            }}>
            <span className="text-2xl">📈</span>
            <p className="text-[7px] font-bold text-center px-1 leading-tight"
              style={{ color: "var(--mint)" }}>
              절대로 잃지말고<br />미래에 투자
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold leading-snug mb-1" style={{ color: "var(--text)" }}>
              {BOOK.title}
            </p>
            <p className="text-[11px] mb-2" style={{ color: "var(--muted)" }}>{BOOK.author}</p>
            <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
              {BOOK.desc}
            </p>
            <p className="text-lg font-bold font-mono-num" style={{ color: "var(--mint)" }}>
              {fmt(BOOK.price)}
            </p>
          </div>
        </div>

        {/* 구매자 정보 */}
        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            구매자 정보
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-[11px] w-10 flex-shrink-0" style={{ color: "var(--muted)" }}>이름</span>
              <input type="text" placeholder="홍길동 (필수)" value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none" style={{ color: "var(--text)" }} />
            </div>
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-[11px] w-10 flex-shrink-0" style={{ color: "var(--muted)" }}>이메일</span>
              <input type="email" placeholder="PDF 받을 이메일 (선택)" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none" style={{ color: "var(--text)" }} />
            </div>
          </div>
        </div>

        {/* 결제 수단 */}
        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            결제 수단
          </p>

          {/* 계좌이체 — 활성 */}
          <div className="flex items-center gap-3 rounded-2xl border p-4 mb-2"
            style={{ background: "var(--card)", borderColor: "var(--mint)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(0,229,160,0.12)" }}>
              <span className="text-lg">🏦</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: "var(--text)" }}>계좌이체</p>
              <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                카카오뱅크 · 수수료 없음
              </p>
            </div>
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "var(--mint)" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: "var(--mint)" }} />
            </div>
          </div>

          {/* 카드/간편결제 — 준비중 */}
          <div className="grid grid-cols-2 gap-2 opacity-40 pointer-events-none select-none">
            {[
              { icon: <CreditCard className="w-5 h-5" />, label: "신용·체크카드" },
              { icon: <span className="text-base font-black text-[#0064FF]">toss</span>, label: "토스페이" },
              { icon: <span className="text-lg">💛</span>, label: "카카오페이" },
              { icon: <span className="text-base font-black text-[#03C75A]">N</span>, label: "네이버페이" },
            ].map(({ icon, label }) => (
              <div key={label}
                className="flex flex-col items-center gap-1.5 py-3 rounded-2xl border relative"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                {icon}
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>{label}</span>
                <span className="absolute top-1.5 right-1.5 text-[8px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}>
                  준비중
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 환불 정책 */}
        <div className="rounded-xl p-4 border mb-4"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}>
          <p className="text-[10px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            <span className="font-bold" style={{ color: "var(--text)" }}>환불 정책{"\n"}</span>
            전자책(디지털 콘텐츠)은 전자상거래법 제17조에 따라 다운로드 전 7일 이내 청약철회가 가능합니다.
            단, 파일을 다운로드하신 경우 환불이 제한될 수 있습니다.
            환불 문의: sunryupatners@gmail.com
          </p>
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)} className="mt-0.5 flex-shrink-0" />
            <span className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
              위 구매 조건 및 환불정책을 확인하였으며, 전자책 구매에 동의합니다.
            </span>
          </label>
        </div>

        {errMsg && (
          <p className="text-xs mb-4 text-center" style={{ color: "#ef4444" }}>{errMsg}</p>
        )}

        <button onClick={handleSubmit} disabled={loading}
          className="w-full py-4 rounded-2xl text-base font-bold text-black active:opacity-80 transition-opacity disabled:opacity-60"
          style={{ background: "var(--mint)", boxShadow: "0 4px 24px rgba(0,229,160,0.3)" }}>
          {loading
            ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />처리중…</span>
            : `${fmt(BOOK.price)} 계좌이체로 구매하기`}
        </button>

        <p className="text-[10px] text-center mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
          입금 확인 후 PDF 다운로드 링크를 이메일로 발송해드립니다
        </p>
      </main>
    </div>
  );
}
