"use client";

import { Header } from "@/components/Header";
import { ChevronLeft, BookOpen, PlayCircle, TrendingUp, Shield, Layers, AlertTriangle, Award } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import Link from "next/link";
import { PlatformIntro } from "@/components/PlatformIntro";
import { useLocaleCode } from "@/contexts/LocaleContext";

export default function AboutPage() {
  const locale = useLocaleCode();
  const isKo   = locale === "ko";

  const DAILY_STEPS = isKo ? [
    { icon: <TrendingUp className="w-4 h-4" />, color: "#10b981", step: "DAILY", title: "홈 — 매일 아침 5분", desc: "미국·한국·안전자산·부동산 네 시장을 홈에서 이어서 봅니다. 전날 시세와 오늘 일정을 한 번에 맞추고, 내 자산을 연동하면 AI가 그 기준으로 정리합니다." },
    { icon: <Layers className="w-4 h-4" />, color: "var(--mint)", step: "REPORT", title: "Investus 리포트 — 최고투자책임자의 시각", desc: "SUNRYU Partners CIO가 직접 분석한 리포트를 인사이트 탭에서 확인하세요. 단순 뉴스 요약이 아닌, 판단에 필요한 핵심만 모은 참고용 분석입니다." },
    { icon: <BookOpen className="w-4 h-4" />, color: "#60a5fa", step: "ASSET", title: "자산 연동 — 아침 AI 분석", desc: "보유 종목을 넣으면 시세·비중·흐름이 홈에 붙습니다. 구글·카카오·네이버로 로그인하면 기기 간에 동기화됩니다." },
    { icon: <PlayCircle className="w-4 h-4" />, color: "#ef4444", step: "ALERT", title: "알림 — 장전 브리핑을 놓치지 않기", desc: "아침 브리핑과 리포트가 올라오면 바로 알려 드립니다. 더보기 → 알림에서 원하는 항목만 켜 두면 됩니다." },
  ] : [
    { icon: <TrendingUp className="w-4 h-4" />, color: "#10b981", step: "DAILY", title: "Home — 5 minutes every morning", desc: "US, Korea, safe assets, and real estate in one home. Recap yesterday and today’s calendar; link holdings so AI frames it around you." },
    { icon: <Layers className="w-4 h-4" />, color: "var(--mint)", step: "REPORT", title: "Investus Reports — CIO Perspective", desc: "Read reports analyzed by the SUNRYU Partners CIO in Insights. Not news dumps — reference analysis for your own decisions." },
    { icon: <BookOpen className="w-4 h-4" />, color: "#60a5fa", step: "ASSET", title: "Link assets — morning AI", desc: "Add holdings and prices, weights, and flow land on Home. Google, Kakao, or Naver keeps them in sync across devices." },
    { icon: <PlayCircle className="w-4 h-4" />, color: "#ef4444", step: "ALERT", title: "Alerts — don’t miss the pre-market brief", desc: "Get pinged when the morning brief and reports drop. Turn on only what you want in More → Notifications." },
  ];

  const PHILOSOPHIES = isKo ? [
    { color: "#10b981", title: "절대 잃지 않는 투자", desc: "수익 극대화 이전에 원금 보존을 최우선합니다. 리스크를 철저히 계산하고, 확신이 없는 자리에는 들어가지 않습니다." },
    { color: "#60a5fa", title: "미국을 축으로, 글로벌 자산까지", desc: "세계 최고 기업이 모인 미국 시장을 축으로 하되, 한국 주식·안전자산·부동산까지 한 화면에서 배분을 봅니다. 선택이 아니라 연결입니다." },
    { color: "#c084fc", title: "실전 데이터 기반", desc: "감이 아닌 데이터로 봅니다. 실시간 시세·섹터 흐름·거시 지표를 모아 아침 브리핑과 포트폴리오 분석에 넣습니다." },
    { color: "#fb923c", title: "투명한 공개 원칙", desc: "운용 철학과 리포트 근거를 공개합니다. 숨길 것이 없는 설명만이 신뢰를 만든다고 믿습니다." },
  ] : [
    { color: "#10b981", title: "Never Lose", desc: "Capital preservation comes before maximizing returns. Risks are calculated meticulously — we never enter without conviction." },
    { color: "#60a5fa", title: "US as the Axis, Global Assets Around It", desc: "The US market is the core — home to the world’s leading companies — with Korean stocks, safe assets, and real estate on the same screen. Connection, not isolation." },
    { color: "#c084fc", title: "Data-Driven", desc: "We look at data, not gut feel. Live prices, sector flows, and macro indicators feed the morning brief and portfolio analysis." },
    { color: "#fb923c", title: "Full Transparency", desc: "Philosophy and report rationale are disclosed. Explanations that can withstand scrutiny earn trust." },
  ];

  const WHY_US = isKo ? [
    ["🌐", "세계 최대 자본 시장", "전 세계 주식시가총액의 약 42%를 차지하는 미국 시장은 유동성, 투명성, 성장성 모든 면에서 압도적입니다."],
    ["🏆", "검증된 글로벌 기업", "Apple, NVIDIA, Microsoft — 세계를 바꾸는 기업들이 상장된 유일한 시장입니다."],
    ["📊", "완벽한 정보 공개", "SEC 규정에 따라 재무·공시 정보가 완전히 공개되어 데이터 기반 투자가 가능합니다."],
    ["⚡", "24시간 글로벌 흐름", "달러 기반 자산으로 글로벌 경제 성장의 수혜를 직접 향유할 수 있습니다."],
    ["🧭", "한국·안전·부동산까지", "미국이 축이지만 배분은 한 시장으로 끝나지 않습니다. 코스피, 비트코인·금, 한국 부동산 흐름을 같은 아침 습관으로 봅니다."],
  ] : [
    ["🌐", "World's Largest Capital Market", "The US market accounts for ~42% of global market cap — unmatched in liquidity, transparency, and growth."],
    ["🏆", "Proven Global Companies", "Apple, NVIDIA, Microsoft — the only market where world-changing companies are listed."],
    ["📊", "Full Disclosure", "SEC regulations mandate complete financial disclosure, enabling true data-driven investing."],
    ["⚡", "Global Growth Exposure", "Dollar-denominated assets let you participate directly in global economic growth."],
    ["🧭", "Korea, Safe Assets, Real Estate", "The US is the axis — allocation does not stop there. KOSPI, Bitcoin and gold, and Korean real estate share the same morning habit."],
  ];

  const STATS = isKo ? [
    { value: "100%+", label: "전 종목 수익률", sub: "보유 전 종목 플러스" },
    { value: "0",     label: "누적 손실 종목", sub: "단 한 종목도 손실 없음" },
    { value: "4",     label: "시장 한 화면",     sub: "미국 · 한국 · 안전 · 부동산" },
    { value: "S/O",   label: "싱글패밀리오피스", sub: "독립 운용 구조" },
  ] : [
    { value: "100%+", label: "All-Position Returns", sub: "Every held position is in the green" },
    { value: "0",     label: "Losing Positions",     sub: "Not a single losing position ever" },
    { value: "4",     label: "Four Markets",        sub: "US · KR · Safe · Real estate" },
    { value: "S/O",   label: "Single Family Office",  sub: "Independent management structure" },
  ];

  const LEGAL_ITEMS = isKo ? [
    "Investus는 투자 정보 제공을 목적으로 운영되는 서비스입니다.",
    "제공되는 리포트·AI 분석·시장 데이터는 모두 참고용이며, 개인별 투자 권유가 아닙니다.",
    "투자 결과에 대한 최종 책임은 투자자 본인에게 있습니다.",
    "원금 손실이 발생할 수 있으며, 과거 수익률은 미래 성과를 보장하지 않습니다.",
  ] : [
    "Investus is a service operated for the purpose of providing investment information.",
    "Reports, AI analysis, and market data are all for reference only and do not constitute personalized investment advice.",
    "All investment outcomes are the sole responsibility of the investor.",
    "Principal loss may occur; past returns do not guarantee future performance.",
  ];

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 lg:pb-10">

        {/* Back */}
        <div className="pt-4 pb-2">
          <Link href="/more" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> {isKo ? "더보기" : "More"}
          </Link>
        </div>

        {/* Hero — 라이트/다크 테마 토큰으로 통일 (하드코딩 다크 패널 제거) */}
        <div className="relative rounded-3xl overflow-hidden p-6 mb-6 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <PlatformIntro locale={isKo ? "ko" : "en"} variant="about" className="relative mb-5" />

          <div className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(var(--mint-rgb),0.1) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }} />
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />

          <div className="relative flex items-center gap-3 mb-5">
            <LogoMark size="lg" shadow />
            <div>
              <p className="text-xl font-bold font-syne" style={{ color: "var(--text)" }}>Investus</p>
              <p className="text-[11px]" style={{ color: "var(--mint)" }}>Invest · US · Together</p>
            </div>
          </div>

          {/* Name meaning */}
          <div className="relative flex flex-col gap-2 mb-5">
            <div className="flex items-start gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                style={{ background: "rgba(var(--mint-rgb),0.12)", color: "var(--mint)" }}>Invest US</span>
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--text)" }}>
                {isKo
                  ? "미국(United States)에 투자하라 — 세계에서 가장 검증된 시장"
                  : "Invest in the United States — the world's most proven market"}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                style={{ background: "rgba(99,102,241,0.12)", color: "#7c6af0" }}>Invest us</span>
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--text)" }}>
                {isKo
                  ? "우리와 함께 투자하라 — 혼자가 아닌, 같은 방향으로"
                  : "Invest with us — together, not alone, in the same direction"}
              </p>
            </div>
          </div>

          <p className="relative text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {isKo ? (
              <>두 가지 의미를 담은 이름처럼,<br />
              Investus는 <span style={{ color: "var(--text)", fontWeight: 600 }}>미국을 축으로</span> 한국·안전자산·부동산까지
              <span style={{ color: "var(--text)", fontWeight: 600 }}> 함께 보는</span>
              AI 자산관리 플랫폼입니다.</>
            ) : (
              <>Like the dual meaning in its name,<br />
              Investus is an AI wealth platform with{" "}
              <span style={{ color: "var(--text)", fontWeight: 600 }}>the US at the core</span> and{" "}
              <span style={{ color: "var(--text)", fontWeight: 600 }}>Korea, safe assets, and real estate</span> on the same screen.</>
            )}
          </p>
        </div>

        {/* Why we built this */}
        <div className="rounded-2xl p-5 mb-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(251,146,60,0.12)", color: "#fb923c" }}>
              <Layers className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold font-syne" style={{ color: "var(--text)" }}>
              {isKo ? "왜 만들었는가" : "Why We Built This"}
            </p>
          </div>
          {isKo ? (
            <>
              <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                인터넷에는 투자 정보가 넘쳐납니다. 그런데 정보가 많을수록 오히려
                <span style={{ color: "var(--text)", fontWeight: 600 }}> 판단이 흐려지고 잘못된 투자</span>로
                이어지는 경우가 많습니다.
              </p>
              <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                Investus는 이 문제에서 출발했습니다.
                수많은 노이즈를 걷어내고, <span style={{ color: "var(--text)", fontWeight: 600 }}>진짜 필요한 핵심 정보만</span>을
                한 곳에 모았습니다.
              </p>
              <div className="rounded-xl p-3"
                style={{ background: "linear-gradient(135deg, rgba(var(--mint-rgb),0.06), rgba(99,102,241,0.06))", border: "1px solid rgba(var(--mint-rgb),0.12)" }}>
                <p className="text-[11px] font-semibold leading-relaxed" style={{ color: "var(--text)" }}>
                  "매일 Investus 하나만 봐도<br />전날 시장 전체를 파악할 수 있어야 한다."
                </p>
                <p className="text-[10px] mt-1.5" style={{ color: "var(--muted)" }}>— 이것이 Investus가 추구하는 기준</p>
              </div>
            </>
          ) : (
            <>
              <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                The internet is flooded with investment information. But more information often leads to
                <span style={{ color: "var(--text)", fontWeight: 600 }}> clouded judgment and bad decisions</span>.
              </p>
              <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                Investus started from this problem — strip away the noise and bring only
                <span style={{ color: "var(--text)", fontWeight: 600 }}> the truly essential information</span> into one place.
              </p>
              <div className="rounded-xl p-3"
                style={{ background: "linear-gradient(135deg, rgba(var(--mint-rgb),0.06), rgba(99,102,241,0.06))", border: "1px solid rgba(var(--mint-rgb),0.12)" }}>
                <p className="text-[11px] font-semibold leading-relaxed" style={{ color: "var(--text)" }}>
                  &quot;Checking Investus once a day should give you a complete picture of the entire previous session.&quot;
                </p>
                <p className="text-[10px] mt-1.5" style={{ color: "var(--muted)" }}>— The standard Investus strives for</p>
              </div>
            </>
          )}
        </div>

        {/* How to use daily */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            {isKo ? "이렇게 활용하세요" : "HOW TO USE IT"}
          </p>
          <div className="flex flex-col gap-2.5">
            {DAILY_STEPS.map((item) => (
              <div key={item.step} className="rounded-2xl p-4 border flex gap-3 items-start"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${item.color}18`, color: item.color }}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-bold tracking-widest" style={{ color: item.color }}>{item.step}</span>
                    <p className="text-xs font-bold" style={{ color: "var(--text)" }}>{item.title}</p>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* E-book */}
        <div className="rounded-2xl p-5 mb-4 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(96,165,250,0.12)", color: "#3b82f6" }}>
              <BookOpen className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold font-syne" style={{ color: "var(--text)" }}>
              {isKo ? "Investus 전자책" : "Investus E-Book"}
            </p>
          </div>
          {isKo ? (
            <>
              <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                SUNRYU Partners CIO가 직접 집필한 전자책입니다.
                수년간의 미국주식 투자 경험에서 걸러낸 <span style={{ color: "#2563eb", fontWeight: 600 }}>핵심만</span>을 담았습니다.
              </p>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                불필요한 이론은 없습니다. 당장 내일 투자에 적용할 수 있는 판단 기준과 원칙만으로 구성되어 있습니다.
              </p>
            </>
          ) : (
            <>
              <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                Written directly by the SUNRYU Partners CIO — distilling years of US stock investing experience into
                <span style={{ color: "#2563eb", fontWeight: 600 }}> only what matters</span>.
              </p>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                No unnecessary theory. Only the decision-making frameworks and principles you can apply to tomorrow&apos;s investments.
              </p>
            </>
          )}
        </div>

        {/* Education */}
        <div className="rounded-2xl p-5 mb-6 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(192,132,252,0.12)", color: "#9333ea" }}>
              <Shield className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold font-syne" style={{ color: "var(--text)" }}>
              {isKo ? "투자 교육" : "Investment Education"}
            </p>
          </div>
          {isKo ? (
            <>
              <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                투자는 어릴 때부터 배워야 합니다. 선진국에서는 금융 교육이 일상이지만,
                대한민국에서는 아직도 <span style={{ color: "#7c3aed", fontWeight: 600 }}>투자 교육이 절대적으로 부족</span>합니다.
              </p>
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                Investus의 투자 교육은 이 공백을 채우기 위해 존재합니다.
                올바른 기준과 사고방식을 갖춘 투자자를 만드는 것 — 그것이 우리가 교육을 하는 이유입니다.
              </p>
            </>
          ) : (
            <>
              <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                Investment education should start early. In developed countries, financial literacy is part of daily life —
                but far too many people encounter investing for the first time only after entering the workforce,
                unprepared and exposed to unverified information.
              </p>
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                Investus education exists to fill that gap — building investors with the right frameworks and mindset from the start.
              </p>
            </>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-[10px] tracking-widest font-syne" style={{ color: "var(--muted)" }}>
            {isKo ? "운영 주체" : "OPERATED BY"}
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* Operator card */}
        <div className="rounded-2xl p-5 mb-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-sunryu.jpeg" alt="SUNRYU Partners" className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div>
              <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>SUNRYU PARTNERS</p>
              <p className="text-[11px]" style={{ color: "var(--mint)" }}>
                {isKo ? "싱글패밀리오피스 · 독립 운용 구조" : "Single Family Office · Independent Management"}
              </p>
            </div>
            <div className="ml-auto">
              <span className="text-[9px] font-semibold px-2 py-1 rounded-full"
                style={{ background: "rgba(var(--mint-rgb),0.12)", color: "var(--mint)", border: "1px solid rgba(var(--mint-rgb),0.2)" }}>
                {isKo ? "법인 운영" : "Corporate"}
              </span>
            </div>
          </div>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {isKo
              ? <>손실 없이, 오직 수익만. 미국주식 전 보유 종목 <span style={{ color: "var(--text)", fontWeight: 600 }}>수익률 100% 이상</span>을 기록한 팀이 만든 투자 정보 플랫폼입니다.</>
              : <>No losses. Profits only. Built by a team that has achieved <span style={{ color: "var(--text)", fontWeight: 600 }}>100%+ returns</span> on every US stock position held.</>}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-2xl font-bold font-syne mb-0.5" style={{ color: "var(--mint)" }}>{s.value}</p>
              <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>{s.label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Investment philosophy */}
        <div className="mb-5">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            {isKo ? "투자 철학" : "INVESTMENT PHILOSOPHY"}
          </p>
          <div className="flex flex-col gap-3">
            {PHILOSOPHIES.map((p) => (
              <div key={p.title} className="rounded-2xl p-4 border flex gap-3 items-start"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: p.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{p.title}</p>
                  <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why US stocks only */}
        <div className="rounded-2xl p-5 mb-5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            {isKo ? "왜 미국을 축으로 하는가" : "WHY THE US AS THE AXIS?"}
          </p>
          <div className="flex flex-col gap-3">
            {WHY_US.map(([icon, title, desc]) => (
              <div key={title as string} className="flex gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text)" }}>{title}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & credentials */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
            <p className="text-[10px] font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
              {isKo ? "법적 고지 및 운영 자격" : "LEGAL & CREDENTIALS"}
            </p>
          </div>

          {/* Certification */}
          <div className="rounded-2xl border p-4 mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(var(--mint-rgb),0.1)", border: "1px solid rgba(var(--mint-rgb),0.2)" }}>
                <Award className="w-5 h-5" style={{ color: "var(--mint)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold mb-0.5" style={{ color: "var(--text)" }}>
                  {isKo
                    ? "금융투자협회 유사투자자문업 사전교육 이수"
                    : "Korea Financial Investment Association — Pre-Education Certificate"}
                </p>
                <p className="text-[11px] mb-2" style={{ color: "var(--muted)" }}>
                  {isKo
                    ? "금융투자교육원 (KIFIN) · 2023년 03월 23일 · 8시간"
                    : "KIFIN (Korea Financial Investment Education Institute) · March 23, 2023 · 8 hours"}
                </p>
                <div className="rounded-lg px-3 py-2" style={{ background: "rgba(var(--mint-rgb),0.05)", border: "1px solid rgba(var(--mint-rgb),0.12)" }}>
                  <p className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>
                    {isKo ? "수료번호 제 26066-2023-90318호" : "Certificate No. 26066-2023-90318"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service nature */}
          <div className="rounded-2xl border p-4 mb-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-xs font-bold mb-2" style={{ color: "var(--text)" }}>
              {isKo ? "서비스 성격 안내" : "Service Nature"}
            </p>
            <div className="flex flex-col gap-2">
              {LEGAL_ITEMS.map((item) => (
                <div key={item} className="flex gap-2 items-start">
                  <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: "var(--muted)" }} />
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warning banner */}
          <div className="rounded-xl px-4 py-3 flex items-start gap-2.5"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.18)" }}>
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#fbbf24" }} />
            <p className="text-[11px] leading-relaxed" style={{ color: "rgba(251,191,36,0.8)" }}>
              {isKo
                ? "Investus는 자본시장법상 투자자문업(인가) 또는 투자일임업 서비스가 아닙니다. 금융투자상품 투자 전 반드시 공인 금융 전문가의 상담을 받으시기 바랍니다."
                : "Investus is not a licensed investment advisory or discretionary management service. Consult a qualified financial professional before making any investment decisions."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs font-bold font-syne mb-1" style={{ color: "var(--text)" }}>Investus</p>
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>
            {isKo ? "미국을 축으로, 글로벌 자산을 아침마다 정리하세요." : "The US at the core — global assets, every morning."}
          </p>
        </div>

      </main>
    </div>
  );
}
