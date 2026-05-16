"use client";

import { useState, useEffect } from "react";
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

// Mock posts — comment counts reflect actual stored comments (0 until real users join)
const MOCK_POSTS: Post[] = [
  { id: 1,  symbol: "NVDA", nickname: "익명_7291", holdingLabel: "20주 보유",  content: "트럼프가 NVDA $1M+ 개인 매수 공시 낸 거 봤어요? 중국 칩 허가 발표 직전에 산 거잖아요. 어떻게 이 타이밍에... 어쨌든 최강 호재 시그널인 건 맞음.", time: "방금",    likes: 41, comments: 0 },
  { id: 2,  symbol: "NVDA", nickname: "익명_3804", holdingLabel: "10주 보유",  content: "중국 $50B 시장이 열리면 이번 분기 가이던스 완전히 달라지는 거 아닌가요? 텐센트·알리바바·바이두 다 GPU 쓰면... 분기 매출 $5~8B 더 올라가는 거잖아요.", time: "8분 전",  likes: 33, comments: 0 },
  { id: 3,  symbol: "NVDA", nickname: "익명_6612", holdingLabel: "5주 보유",   content: "의회 반발 변수가 있다는 거 잊지 맙시다. 작년 H100 수출 제한 기억나죠? 너무 빨리 흥분하지 말고 허가가 실제로 집행되는지 지켜봐야 해요.",             time: "22분 전", likes: 14, comments: 0 },
  { id: 4,  symbol: "AAPL", nickname: "익명_5512", holdingLabel: "30주 보유",  content: "아이폰 17 AI 기능이 실제로 얼마나 쓸만한지가 핵심인 것 같아요. 중국 회복세랑 같이 봐야 할 듯.",                                                       time: "23분 전", likes: 17, comments: 0 },
  { id: 5,  symbol: "AAPL", nickname: "익명_1104", holdingLabel: "200주 보유", content: "버핏이 팔긴 했어도 여전히 최대 보유 종목이죠. 배당 꾸준히 늘리고 바이백도 하고. 이 정도면 그냥 믿고 가는 주식.",                                         time: "1시간 전",likes: 38, comments: 0 },
  { id: 6,  symbol: "TSLA", nickname: "익명_9917", holdingLabel: "20주 보유",  content: "FSD 구독 모델이 궤도에 오르면 수익 구조 완전히 달라질 텐데. 단기는 힘들어 보여도 2~3년 뷰로 가져가는 중.",                                               time: "2시간 전",likes: 29, comments: 0 },
  { id: 7,  symbol: "TSLA", nickname: "익명_4421", holdingLabel: "50주 보유",  content: "일론 머스크 DOGE 복귀 후 테슬라 집중 다시 시작했다는 뉴스 나왔죠. 로보택시 일정도 재확인 필요해 보여요.",                                               time: "3시간 전",likes: 22, comments: 0 },
  { id: 8,  symbol: "MSFT", nickname: "익명_6631", holdingLabel: "15주 보유",  content: "코파일럿 기업 침투율이 생각보다 빠르게 올라오고 있음. 클라우드 + AI 조합이 진짜 무서운 회사.",                                                           time: "4시간 전",likes: 31, comments: 0 },
  { id: 9,  symbol: "AMZN", nickname: "익명_8812", holdingLabel: "8주 보유",   content: "AWS 성장률 다시 가속되는 거 보이시나요? AI 인프라 수요로 클라우드 3사 다 수혜인데 AMZN이 제일 저평가 같아요.",                                          time: "5시간 전",likes: 26, comments: 0 },
  { id: 10, symbol: "META", nickname: "익명_2290", holdingLabel: "12주 보유",  content: "라마 4 오픈소스로 공개하면서 AI 생태계 주도권 가져가는 전략인 듯. 광고 매출에 AI 타게팅 붙으면 이익률 더 올라갈 거라 봅니다.",                          time: "6시간 전",likes: 19, comments: 0 },
  { id: 11, symbol: "PLTR", nickname: "익명_2278", holdingLabel: "300주 보유", content: "AIP 플랫폼 B2B 계약이 계속 늘고 있어요. 정부 계약에서 민간으로 넘어가는 게 진짜 포인트입니다.",                                                           time: "7시간 전",likes: 45, comments: 0 },
  { id: 12, symbol: "GOOGL", nickname: "익명_3317", holdingLabel: "5주 보유",  content: "제미나이 2.5 Pro가 GPT-4o 벤치마크 거의 따라잡았어요. 검색 AI 오버뷰 수익화 모델만 완성되면 재평가 구간 온다고 봅니다.",                              time: "8시간 전",likes: 33, comments: 0 },
];

type VerifyMode = "none" | "upload" | "broker" | "broker-notice";
type MainTab = "discussion" | "creator";

// Format ISO timestamp to Korean relative time
function relTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "방금";
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  return `${Math.floor(h / 24)}일 전`;
}

export default function WallPage() {
  const { user } = useAuth();
  const [mainTab, setMainTab]             = useState<MainTab>("discussion");
  const [selected, setSelected]           = useState("NVDA");
  const [liked, setLiked]                 = useState<Set<number>>(new Set());
  const [showVerify, setShowVerify]       = useState(false);
  const [verifyMode, setVerifyMode]       = useState<VerifyMode>("none");
  const [uploadDone, setUploadDone]       = useState(false);
  const [hasCreatorProfile, setHasCreatorProfile] = useState(false);
  const [dbPosts, setDbPosts]             = useState<Post[] | null>(null);
  const [postsLoading, setPostsLoading]   = useState(true);

  useEffect(() => {
    try {
      const c = localStorage.getItem("investus_my_creator");
      setHasCreatorProfile(!!c);
    } catch {}
  }, []);

  // Fetch real posts from Supabase; fall back to mock if table absent or empty
  useEffect(() => {
    setPostsLoading(true);
    setDbPosts(null);

    async function load() {
      try {
        const { getSupabase } = await import("@/lib/supabase");
        const sb = getSupabase();
        const { data, error } = await sb
          .from("wall_posts")
          .select("id, symbol, nickname, holding_label, content, created_at, likes, wall_comments(count)")
          .eq("symbol", selected)
          .order("created_at", { ascending: false })
          .limit(30);

        if (!error && data && data.length > 0) {
          setDbPosts(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data as any[]).map((p) => ({
              id:           p.id,
              symbol:       p.symbol,
              nickname:     p.nickname,
              holdingLabel: p.holding_label,
              content:      p.content,
              time:         relTime(p.created_at),
              likes:        p.likes ?? 0,
              comments:     (p.wall_comments?.[0]?.count as number) ?? 0,
            }))
          );
        }
      } catch {
        // no table yet — use mock data
      } finally {
        setPostsLoading(false);
      }
    }

    load();
  }, [selected]);

  const posts = (dbPosts ?? MOCK_POSTS).filter((p) => p.symbol === selected);

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
            hasCreatorProfile ? (
              <Link href="/creator/dashboard"
                className="text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                style={{ background: "var(--mint)", color: "#000" }}>
                ✦ 내 채널 관리
              </Link>
            ) : (
              <Link href="/creator/setup"
                className="text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                style={{ background: "var(--mint)", color: "#000" }}>
                <Sparkles className="w-3.5 h-3.5" />크리에이터 되기
              </Link>
            )
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
                {postsLoading ? (
                  [1, 2, 3].map((k) => (
                    <div key={k} className="rounded-2xl p-4 border animate-pulse"
                      style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-full" style={{ background: "var(--border)" }} />
                        <div className="h-3 w-24 rounded" style={{ background: "var(--border)" }} />
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="h-3 rounded" style={{ background: "var(--border)" }} />
                        <div className="h-3 w-4/5 rounded" style={{ background: "var(--border)" }} />
                      </div>
                      <div className="h-3 w-16 rounded" style={{ background: "var(--border)" }} />
                    </div>
                  ))
                ) : posts.length === 0 ? (
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
            {hasCreatorProfile ? (
              <Link href="/creator/dashboard"
                className="rounded-2xl p-4 mb-5 border flex items-center gap-4 active:opacity-80 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, rgba(0,229,160,0.12) 0%, rgba(0,229,160,0.03) 100%)",
                  borderColor: "rgba(0,229,160,0.3)",
                  textDecoration: "none",
                }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "rgba(0,229,160,0.1)" }}>
                  ✦
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold font-syne mb-0.5" style={{ color: "var(--text)" }}>내 크리에이터 채널</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>콘텐츠 작성 · 프로필 수정 · 인증 관리</p>
                </div>
                <span className="text-xs font-bold flex-shrink-0" style={{ color: "var(--mint)" }}>관리 →</span>
              </Link>
            ) : (
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
            )}

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
                    onClick={() => setVerifyMode("broker-notice")}
                    className="w-full py-3.5 rounded-2xl border text-sm font-semibold flex items-center justify-between px-4 active:opacity-70 transition-opacity"
                    style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                    {broker}
                    <span className="text-xs" style={{ color: "var(--mint)" }}>연동하기 →</span>
                  </button>
                ))}
                <button onClick={() => setVerifyMode("none")} className="w-full mt-1 py-2 text-xs" style={{ color: "var(--muted)" }}>
                  돌아가기
                </button>
              </div>
            )}

            {verifyMode === "broker-notice" && (
              <div className="mb-4">
                <div className="flex flex-col items-center gap-3 py-6 mb-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: "rgba(0,229,160,0.10)" }}>
                    🔧
                  </div>
                  <p className="text-sm font-bold text-center" style={{ color: "var(--text)" }}>
                    증권사 직접 연동 준비 중
                  </p>
                  <p className="text-xs text-center leading-relaxed px-4" style={{ color: "var(--muted)" }}>
                    현재 증권사 API 연동 기능을 준비하고 있습니다.{"\n"}
                    지금은 HTS/MTS 보유 화면 캡쳐 업로드로{"\n"}
                    대신 인증해 주세요.
                  </p>
                </div>
                <button
                  onClick={() => { setVerifyMode("upload"); }}
                  className="w-full py-3 rounded-2xl text-sm font-bold text-black mb-2 active:opacity-80 transition-opacity"
                  style={{ background: "var(--mint)" }}>
                  캡쳐 업로드로 인증하기
                </button>
                <button onClick={() => setVerifyMode("broker")} className="w-full py-2 text-xs" style={{ color: "var(--muted)" }}>
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
