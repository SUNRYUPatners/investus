"use client";

import { useState } from "react";
import Link from "next/link";
import { ThumbsUp, MessageCircle, Lock, ShieldCheck, Upload, User, Sparkles, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { CreatorCard } from "@/components/CreatorCard";
import { AdBanner } from "@/components/AdBanner";
import { useAuth } from "@/hooks/useAuth";
import { CREATORS } from "@/lib/creators";

const STOCKS = ["AAPL", "NVDA", "TSLA", "MSFT", "AMZN", "META", "GOOGL", "PLTR"];

type Post = {
  id: number;
  symbol: string;
  nickname: string;
  holdingLabel: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
};

const MOCK_POSTS: Post[] = [
  { id: 1,  symbol: "NVDA", nickname: "익명_7829", holdingLabel: "50주 보유",  content: "블랙웰 GPU 수요가 예상보다 훨씬 강하게 나오고 있어요. 데이터센터 투자는 아직 초입이라고 봅니다. 장기 홀딩 유지합니다.", time: "5분 전",   likes: 24, comments: 8  },
  { id: 2,  symbol: "NVDA", nickname: "익명_3341", holdingLabel: "10주 보유",  content: "고점 대비 많이 올라와서 추가 매수는 좀 조심스럽네요. 실적 발표 때까지는 지켜볼 것 같아요.",                             time: "12분 전",  likes: 11, comments: 3  },
  { id: 3,  symbol: "AAPL", nickname: "익명_5512", holdingLabel: "30주 보유",  content: "아이폰 17 AI 기능이 실제로 얼마나 쓸만한지가 핵심인 것 같아요. 중국 회복세랑 같이 봐야 할 듯.",                       time: "23분 전",  likes: 17, comments: 5  },
  { id: 4,  symbol: "AAPL", nickname: "익명_1104", holdingLabel: "200주 보유", content: "버핏이 팔긴 했어도 여전히 최대 보유 종목이죠. 배당 꾸준히 늘리고 바이백도 하고. 이 정도면 그냥 믿고 가는 주식.",    time: "1시간 전", likes: 38, comments: 12 },
  { id: 5,  symbol: "TSLA", nickname: "익명_9917", holdingLabel: "20주 보유",  content: "FSD 구독 모델이 궤도에 오르면 수익 구조 완전히 달라질 텐데. 단기는 힘들어 보여도 2~3년 뷰로 가져가는 중.",          time: "2시간 전", likes: 29, comments: 14 },
  { id: 6,  symbol: "PLTR", nickname: "익명_2278", holdingLabel: "300주 보유", content: "AIP 플랫폼 B2B 계약이 계속 늘고 있어요. 정부 계약에서 민간으로 넘어가는 게 진짜 포인트입니다.",                       time: "3시간 전", likes: 45, comments: 19 },
  { id: 7,  symbol: "MSFT", nickname: "익명_6631", holdingLabel: "15주 보유",  content: "코파일럿 기업 침투율이 생각보다 빠르게 올라오고 있음. 클라우드 + AI 조합이 진짜 무서운 회사.",                         time: "4시간 전", likes: 31, comments: 7  },
];

type VerifyMode = "none" | "upload" | "broker";
type MainTab = "discussion" | "creator";

export default function WallPage() {
  const { user } = useAuth();
  const [mainTab, setMainTab]         = useState<MainTab>("discussion");
  const [selected, setSelected]       = useState("NVDA");
  const [liked, setLiked]             = useState<Set<number>>(new Set());
  const [showVerify, setShowVerify]   = useState(false);
  const [verifyMode, setVerifyMode]   = useState<VerifyMode>("none");
  const [uploadDone, setUploadDone]   = useState(false);

  const posts = MOCK_POSTS.filter((p) => p.symbol === selected);

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleWriteClick = () => {
    if (!user) return;
    setVerifyMode("none");
    setUploadDone(false);
    setShowVerify(true);
  };

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-3xl mx-auto pb-24 lg:pb-10">
        {/* Page title */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <div>
            <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>종목이야기 💬</h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>투자자 커뮤니티 &amp; 크리에이터 마켓</p>
          </div>
          {mainTab === "creator" && (
            <Link href="/creator/setup"
              className="text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
              style={{ background: "var(--mint)", color: "#000" }}>
              <Sparkles className="w-3.5 h-3.5" />크리에이터 되기
            </Link>
          )}
          {mainTab === "discussion" && (
            <div className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border"
              style={{ borderColor: "rgba(0,229,160,0.3)", color: "var(--mint)" }}>
              <Lock className="w-3 h-3" />
              익명 · 보유 인증
            </div>
          )}
        </div>

        {/* Main tab switcher */}
        <div className="flex gap-1 mx-4 mb-4 p-1 rounded-2xl" style={{ background: "var(--card)" }}>
          <button onClick={() => setMainTab("discussion")}
            className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            style={mainTab === "discussion"
              ? { background: "var(--mint)", color: "#000" }
              : { color: "var(--muted)" }}>
            <MessageCircle className="w-3.5 h-3.5" />종목 토론
          </button>
          <button onClick={() => setMainTab("creator")}
            className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            style={mainTab === "creator"
              ? { background: "var(--mint)", color: "#000" }
              : { color: "var(--muted)" }}>
            <Users className="w-3.5 h-3.5" />크리에이터
          </button>
        </div>

        {/* ── DISCUSSION TAB ── */}
        {mainTab === "discussion" && (
          <>
            {/* Stock selector */}
            <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
              {STOCKS.map((sym) => (
                <button key={sym} onClick={() => setSelected(sym)}
                  className="flex-shrink-0 text-xs font-bold font-mono-num px-3 py-1.5 rounded-full border transition-all"
                  style={selected === sym
                    ? { background: "var(--mint)", color: "#000", borderColor: "var(--mint)" }
                    : { background: "var(--card)", color: "var(--muted)", borderColor: "var(--border)" }}>
                  {sym}
                </button>
              ))}
            </div>

            <div className="px-4">
              <AdBanner format="auto" />

              <div className="flex items-start gap-2 rounded-xl p-3 mb-4 border"
                style={{ background: "rgba(0,229,160,0.05)", borderColor: "rgba(0,229,160,0.15)" }}>
                <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--mint)" }} />
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  실제 보유 종목만 토론 참여 가능합니다. 캡쳐 업로드 또는 증권사 연동으로 보유 수량을 인증하면 댓글을 작성할 수 있어요.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {posts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <span className="text-4xl">💬</span>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>아직 게시글이 없습니다</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>첫 번째 의견을 남겨보세요</p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <article key={post.id} className="rounded-2xl p-4 border"
                      style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: "var(--border)", color: "var(--muted)" }}>익</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{post.nickname}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full"
                              style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)" }}>
                              ✓ {post.holdingLabel}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px]" style={{ color: "var(--muted)" }}>{post.time}</span>
                      </div>
                      <p className="text-[13px] leading-relaxed mb-3" style={{ color: "var(--text)" }}>{post.content}</p>
                      <div className="flex items-center gap-4">
                        <button onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1.5 text-xs transition-colors"
                          style={{ color: liked.has(post.id) ? "var(--mint)" : "var(--muted)" }}>
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {post.likes + (liked.has(post.id) ? 1 : 0)}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.comments}
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>

            {/* Write / Login prompt */}
            {user ? (
              <div className="fixed bottom-20 right-4">
                <button onClick={handleWriteClick}
                  className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-black font-bold text-2xl"
                  style={{ background: "var(--mint)", boxShadow: "0 4px 20px rgba(0,229,160,0.4)" }}>
                  ✏️
                </button>
              </div>
            ) : (
              <div className="fixed bottom-20 lg:bottom-6 left-0 right-0 px-4 max-w-[480px] lg:max-w-3xl mx-auto">
                <div className="rounded-2xl p-4 border flex items-center gap-3"
                  style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.2)" }}>
                  <User className="w-5 h-5 flex-shrink-0" style={{ color: "var(--mint)" }} />
                  <p className="flex-1 text-xs" style={{ color: "var(--muted)" }}>글을 작성하려면 로그인이 필요합니다</p>
                  <Link href="/more" className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
                    style={{ background: "var(--mint)", color: "#000" }}>
                    로그인
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── CREATOR TAB ── */}
        {mainTab === "creator" && (
          <div className="px-4">
            {/* Intro banner */}
            <div className="rounded-2xl p-4 mb-5 border"
              style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.1) 0%, rgba(0,229,160,0.03) 100%)", borderColor: "rgba(0,229,160,0.2)" }}>
              <div className="flex items-start gap-3">
                <span className="text-3xl">🏆</span>
                <div>
                  <h2 className="text-sm font-bold font-syne mb-1" style={{ color: "var(--text)" }}>크리에이터 마켓</h2>
                  <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                    실제 계좌 수익률을 공개하고 포트폴리오·강의·전자책으로 구독료를 받으세요.
                    플랫폼 수수료는 <span style={{ color: "var(--mint)", fontWeight: 700 }}>10%</span>만 적용됩니다.
                  </p>
                  <Link href="/creator/setup"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl"
                    style={{ background: "var(--mint)", color: "#000" }}>
                    <Sparkles className="w-3.5 h-3.5" />나도 크리에이터 되기
                  </Link>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { icon: "📊", title: "계좌 연동", desc: "증권사 연동으로 실제 수익률 인증" },
                { icon: "💡", title: "콘텐츠 판매", desc: "강의·전자책·리포트 업로드" },
                { icon: "💰", title: "수익 정산", desc: "구독료의 90% 매월 정산" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl p-3 text-center border"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="text-[10px] font-bold mb-0.5" style={{ color: "var(--text)" }}>{item.title}</div>
                  <div className="text-[9px] leading-tight" style={{ color: "var(--muted)" }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <AdBanner format="auto" />

            {/* Creator list */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>인기 크리에이터</h2>
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>{CREATORS.length}명 활동 중</span>
            </div>

            <div className="flex flex-col gap-3">
              {CREATORS.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Verification modal */}
      {showVerify && user && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowVerify(false)}>
          <div className="w-full max-w-[480px] mx-auto rounded-t-3xl p-6 pb-10"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: "var(--border)" }} />
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6" style={{ color: "var(--mint)" }} />
              <h2 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>보유 종목 인증</h2>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
              종목이야기에 글을 작성하려면 해당 종목의 실제 보유를 인증해야 합니다.
            </p>

            {verifyMode === "none" && (
              <div className="flex gap-3 mb-4">
                <button onClick={() => setVerifyMode("upload")}
                  className="flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <Upload className="w-5 h-5" style={{ color: "var(--mint)" }} />
                  <span className="text-xs font-semibold">캡쳐 업로드</span>
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>HTS/MTS 보유 화면</span>
                </button>
                <button onClick={() => setVerifyMode("broker")}
                  className="flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <ShieldCheck className="w-5 h-5" style={{ color: "var(--mint)" }} />
                  <span className="text-xs font-semibold">증권사 연동</span>
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>자동 보유 확인</span>
                </button>
              </div>
            )}

            {verifyMode === "upload" && !uploadDone && (
              <div className="mb-4">
                <label htmlFor="screenshot-upload"
                  className="w-full flex flex-col items-center gap-3 py-8 rounded-2xl border border-dashed cursor-pointer"
                  style={{ borderColor: "rgba(0,229,160,0.4)", background: "rgba(0,229,160,0.04)" }}>
                  <Upload className="w-8 h-8" style={{ color: "var(--mint)" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>캡쳐 이미지 업로드</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>HTS/MTS 보유 화면 캡쳐를 첨부해주세요</p>
                </label>
                <input id="screenshot-upload" type="file" accept="image/*" className="hidden" onChange={() => setUploadDone(true)} />
                <button onClick={() => setVerifyMode("none")} className="w-full mt-2 py-2 text-xs" style={{ color: "var(--muted)" }}>
                  돌아가기
                </button>
              </div>
            )}

            {verifyMode === "upload" && uploadDone && (
              <div className="mb-4 flex flex-col items-center gap-3 py-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,229,160,0.15)" }}>
                  <ShieldCheck className="w-6 h-6" style={{ color: "var(--mint)" }} />
                </div>
                <p className="text-sm font-bold" style={{ color: "var(--text)" }}>업로드 완료!</p>
                <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
                  검토 후 글쓰기가 활성화됩니다. (데모: 즉시 활성화)
                </p>
                <button onClick={() => setShowVerify(false)}
                  className="mt-2 px-6 py-2.5 rounded-xl text-sm font-bold text-black"
                  style={{ background: "var(--mint)" }}>
                  글 작성하기
                </button>
              </div>
            )}

            {verifyMode === "broker" && (
              <div className="flex flex-col gap-2 mb-4">
                {["키움증권", "삼성증권", "미래에셋증권", "NH투자증권"].map((broker) => (
                  <button key={broker}
                    className="w-full py-3.5 rounded-2xl border text-sm font-semibold flex items-center justify-between px-4"
                    style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                    {broker}
                    <span className="text-xs" style={{ color: "var(--muted)" }}>연동하기 →</span>
                  </button>
                ))}
                <button onClick={() => setVerifyMode("none")} className="w-full mt-1 py-2 text-xs" style={{ color: "var(--muted)" }}>
                  돌아가기
                </button>
              </div>
            )}

            <p className="text-[10px] text-center" style={{ color: "var(--muted)" }}>
              인증 정보는 보유 수량 확인 목적으로만 사용되며 저장되지 않습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
