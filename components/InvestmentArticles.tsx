"use client";

import { useState, type ReactElement } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const M = "#00e5a0";   // mint
const G = "#d4af37";   // gold
const R = "#ef4444";   // red
const B = "#60a5fa";   // blue
const T = "#e2e8f0";   // text
const L = "#9ca3af";   // light/muted
const D = "#2d3748";   // dark border

type Article = {
  emoji: string;
  title: string;
  desc: string;
  body: string;
  svg?: () => ReactElement;
};

// ── BASICS SVGs ──────────────────────────────────────────────────

const SvgStock = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="20" fontSize="9" fill={L}>회사</text>
    <rect x="14" y="26" width="60" height="70" rx="6" fill="none" stroke={D} strokeWidth="1.5"/>
    <rect x="22" y="34" width="12" height="10" rx="2" fill={B} opacity=".6"/>
    <rect x="38" y="34" width="12" height="10" rx="2" fill={B} opacity=".6"/>
    <rect x="22" y="50" width="12" height="10" rx="2" fill={B} opacity=".4"/>
    <rect x="38" y="50" width="12" height="10" rx="2" fill={B} opacity=".4"/>
    <rect x="28" y="72" width="18" height="24" rx="2" fill={D}/>
    <text x="44" y="62" fontSize="18" fill={L} textAnchor="middle">→</text>
    <text x="14" y="105" fontSize="8" fill={L}>주식 발행</text>
    {/* Pie chart */}
    <circle cx="190" cy="58" r="40" fill="none" stroke={D} strokeWidth="1"/>
    <path d="M190,58 L190,18 A40,40,0,0,1,224.6,78 Z" fill={M} opacity=".7"/>
    <path d="M190,58 L224.6,78 A40,40,0,0,1,162.9,93.5 Z" fill={G} opacity=".7"/>
    <path d="M190,58 L162.9,93.5 A40,40,0,0,1,190,18 Z" fill={B} opacity=".7"/>
    <text x="208" y="52" fontSize="8" fill={T}>A 40%</text>
    <text x="206" y="90" fontSize="8" fill={T}>B 35%</text>
    <text x="152" y="62" fontSize="8" fill={T}>C 25%</text>
    <text x="190" y="106" fontSize="8" fill={L} textAnchor="middle">주주 소유 구조</text>
  </svg>
);

const SvgSP500 = () => {
  const data = [18,26,-6,28,16,-5,30,26,-18,24];
  const years = ["15","16","17","18","19","20","21","22","23","24"];
  return (
    <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
      <line x1="20" y1="85" x2="268" y2="85" stroke={D} strokeWidth="1"/>
      {data.map((v,i)=>{
        const x = 28 + i*24;
        const pos = v>=0;
        const h = Math.abs(v)*1.5;
        const y = pos ? 85-h : 85;
        return <g key={i}>
          <rect x={x} y={y} width="16" height={h} rx="2" fill={pos?M:R} opacity=".8"/>
          <text x={x+8} y="98" fontSize="7" fill={L} textAnchor="middle">{years[i]}</text>
        </g>;
      })}
      <text x="20" y="14" fontSize="9" fill={T} fontWeight="bold">S&amp;P 500 연간 수익률</text>
      <rect x="180" y="6" width="8" height="8" rx="1" fill={M} opacity=".8"/>
      <text x="192" y="14" fontSize="8" fill={L}>양(+)</text>
      <rect x="218" y="6" width="8" height="8" rx="1" fill={R} opacity=".8"/>
      <text x="230" y="14" fontSize="8" fill={L}>음(−)</text>
      <text x="20" y="108" fontSize="8" fill={M}>연평균 +10% (역사적)</text>
    </svg>
  );
};

const SvgFutures = () => (
  <svg viewBox="0 0 280 100" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <line x1="14" y1="55" x2="266" y2="55" stroke={D} strokeWidth="1.5"/>
    {[{x:14,label:"오전 9:30",sub:"장 시작"},{x:80,label:"오후 4:00",sub:"장 마감"},{x:160,label:"심야 선물",sub:"거래중"},{x:240,label:"다음날",sub:"장 시작"}].map((p,i)=>(
      <g key={i}>
        <circle cx={p.x} cy="55" r="5" fill={i===2?G:M} opacity=".9"/>
        <text x={p.x} y="44" fontSize="8" fill={T} textAnchor="middle">{p.label}</text>
        <text x={p.x} y="72" fontSize="7" fill={L} textAnchor="middle">{p.sub}</text>
      </g>
    ))}
    <text x="100" y="38" fontSize="7" fill={R}>장 마감 후</text>
    <path d="M118,50 L152,50" stroke={G} strokeWidth="1.5" strokeDasharray="3,2" markerEnd="url(#arr)"/>
    <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={G}/></marker></defs>
    <text x="120" y="47" fontSize="7" fill={G}>선물로 예측</text>
    <text x="14" y="95" fontSize="8" fill={L}>나스닥 선물 +1% → 기술주 강세 예측 가능</text>
  </svg>
);

const SvgMacro = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    {[
      {x:14,label:"GDP",val:"↑ 2.8%",color:M,sub:"경제성장"},
      {x:84,label:"CPI",val:"↑ 3.2%",color:R,sub:"인플레이션"},
      {x:154,label:"실업률",val:"4.1%",color:B,sub:"노동시장"},
      {x:214,label:"PMI",val:"52.1",color:G,sub:"경기확장"},
    ].map((d,i)=>(
      <g key={i}>
        <rect x={d.x} y="20" width="56" height="72" rx="8" fill="none" stroke={d.color} strokeWidth="1" opacity=".4"/>
        <text x={d.x+28} y="38" fontSize="9" fill={d.color} textAnchor="middle" fontWeight="bold">{d.label}</text>
        <text x={d.x+28} y="58" fontSize="13" fill={d.color} textAnchor="middle" fontWeight="bold">{d.val}</text>
        <text x={d.x+28} y="80" fontSize="7" fill={L} textAnchor="middle">{d.sub}</text>
      </g>
    ))}
    <text x="14" y="105" fontSize="8" fill={L}>주식시장에 직접 영향을 주는 핵심 지표</text>
  </svg>
);

const SvgFOMC = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <rect x="100" y="16" width="80" height="30" rx="6" fill="none" stroke={G} strokeWidth="1.5"/>
    <text x="140" y="36" fontSize="10" fill={G} textAnchor="middle" fontWeight="bold">FOMC 결정</text>
    {/* Rate up */}
    <path d="M100,46 L50,70" stroke={R} strokeWidth="1.5"/>
    <rect x="10" y="70" width="78" height="28" rx="5" fill="none" stroke={R} strokeWidth="1"/>
    <text x="49" y="83" fontSize="8" fill={R} textAnchor="middle">금리 인상 ↑</text>
    <text x="49" y="93" fontSize="7" fill={L} textAnchor="middle">주가 하락 압력</text>
    {/* Rate down */}
    <path d="M180,46 L230,70" stroke={M} strokeWidth="1.5"/>
    <rect x="192" y="70" width="78" height="28" rx="5" fill="none" stroke={M} strokeWidth="1"/>
    <text x="231" y="83" fontSize="8" fill={M} textAnchor="middle">금리 인하 ↓</text>
    <text x="231" y="93" fontSize="7" fill={L} textAnchor="middle">주가 상승 요인</text>
    <text x="14" y="108" fontSize="8" fill={L}>연 8회 FOMC 회의 — 전 세계 금융시장에 영향</text>
  </svg>
);

const SvgBond = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <line x1="30" y1="90" x2="260" y2="90" stroke={D} strokeWidth="1"/>
    <line x1="30" y1="20" x2="30" y2="90" stroke={D} strokeWidth="1"/>
    {["2yr","5yr","10yr","30yr"].map((l,i)=>(
      <text key={i} x={60+i*60} y="102" fontSize="8" fill={L} textAnchor="middle">{l}</text>
    ))}
    <text x="16" y="92" fontSize="7" fill={L} textAnchor="end">수익률</text>
    {/* Normal curve */}
    <polyline points="60,75 120,60 180,45 240,32" fill="none" stroke={M} strokeWidth="2"/>
    <text x="244" y="32" fontSize="8" fill={M}>정상</text>
    {/* Inverted curve */}
    <polyline points="60,45 120,55 180,65 240,78" fill="none" stroke={R} strokeWidth="2" strokeDasharray="4,2"/>
    <text x="244" y="78" fontSize="8" fill={R}>역전</text>
    <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">수익률 곡선(Yield Curve)</text>
    <text x="14" y="108" fontSize="8" fill={R}>역전(2yr&gt;10yr) → 경기침체 전조 신호</text>
  </svg>
);

const SvgEarnings = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">분기별 EPS 비교</text>
    {[{q:"Q1",exp:2.1,act:2.4},{q:"Q2",exp:2.3,act:2.2},{q:"Q3",exp:2.5,act:2.9},{q:"Q4",exp:2.8,act:3.1}].map((d,i)=>{
      const x=30+i*60;
      const eh=d.exp*18; const ah=d.act*18;
      return <g key={i}>
        <rect x={x} y={90-eh} width="16" height={eh} rx="2" fill={B} opacity=".5"/>
        <rect x={x+18} y={90-ah} width="16" height={ah} rx="2" fill={d.act>=d.exp?M:R} opacity=".8"/>
        <text x={x+17} y="102" fontSize="8" fill={L} textAnchor="middle">{d.q}</text>
      </g>;
    })}
    <line x1="14" y1="90" x2="266" y2="90" stroke={D} strokeWidth="1"/>
    <rect x="160" y="6" width="8" height="8" rx="1" fill={B} opacity=".5"/>
    <text x="172" y="14" fontSize="8" fill={L}>컨센서스</text>
    <rect x="218" y="6" width="8" height="8" rx="1" fill={M} opacity=".8"/>
    <text x="230" y="14" fontSize="8" fill={L}>실제</text>
    <text x="14" y="108" fontSize="8" fill={M}>실제 EPS &gt; 컨센서스 = 어닝 서프라이즈</text>
  </svg>
);

const SvgValuation = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">PER 밸류에이션 비교</text>
    {[{label:"PER 12",sub:"저평가",color:M,h:45},{label:"PER 25",sub:"적정",color:G,h:65},{label:"PER 45",sub:"고평가",color:R,h:88}].map((d,i)=>(
      <g key={i}>
        <rect x={26+i*84} y={90-d.h} width="60" height={d.h} rx="4" fill={d.color} opacity=".25"/>
        <rect x={26+i*84} y={90-d.h} width="60" height="4" rx="2" fill={d.color} opacity=".8"/>
        <text x={56+i*84} y={90-d.h-6} fontSize="10" fill={d.color} textAnchor="middle" fontWeight="bold">{d.label}</text>
        <text x={56+i*84} y="102" fontSize="8" fill={L} textAnchor="middle">{d.sub}</text>
      </g>
    ))}
    <line x1="14" y1="90" x2="266" y2="90" stroke={D} strokeWidth="1"/>
    <text x="14" y="108" fontSize="8" fill={L}>동종 업계 평균 PER과 비교하는 것이 중요</text>
  </svg>
);

const SvgFearGreed = () => (
  <svg viewBox="0 0 280 130" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="140" y="16" fontSize="9" fill={T} fontWeight="bold" textAnchor="middle">공포·탐욕지수 (0–100)</text>
    {/* Gauge arcs */}
    <path d="M60,105 A80,80,0,0,1,220,105" fill="none" stroke={R} strokeWidth="14" opacity=".5"/>
    <path d="M100,44 A80,80,0,0,1,220,105" fill="none" stroke={G} strokeWidth="14" opacity=".5"/>
    <path d="M165,28 A80,80,0,0,1,220,105" fill="none" stroke={M} strokeWidth="14" opacity=".5"/>
    {/* Labels */}
    <text x="44" y="118" fontSize="8" fill={R} textAnchor="middle">공포</text>
    <text x="140" y="28" fontSize="8" fill={G} textAnchor="middle">중립</text>
    <text x="238" y="98" fontSize="8" fill={M} textAnchor="middle">탐욕</text>
    {/* Needle at ~72 (탐욕) */}
    <line x1="140" y1="105" x2="198" y2="52" stroke={T} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="140" cy="105" r="5" fill={T}/>
    <text x="140" y="122" fontSize="10" fill={G} textAnchor="middle" fontWeight="bold">72 · 탐욕</text>
    <text x="56" y="128" fontSize="8" fill={L}>0</text>
    <text x="130" y="128" fontSize="8" fill={L}>50</text>
    <text x="224" y="128" fontSize="8" fill={L}>100</text>
  </svg>
);

const SvgBuffett = () => (
  <svg viewBox="0 0 280 100" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">버핏지수 = 시총 ÷ GDP × 100</text>
    {[{label:"75% 이하",sub:"저평가",color:M,w:120},{label:"75–90%",sub:"적정",color:G,w:160},{label:"90–115%",sub:"고평가",color:"#f59e0b",w:200},{label:"115% 이상",sub:"과열",color:R,w:250}].map((d,i)=>(
      <g key={i}>
        <rect x="80" y={22+i*16} width={d.w-80} height="12" rx="3" fill={d.color} opacity={i===2?".9":".4"}/>
        {i===2 && <rect x="80" y={22+i*16} width={d.w-80} height="12" rx="3" fill="none" stroke={d.color} strokeWidth="1.5"/>}
        <text x="76" y={32+i*16} fontSize="7" fill={d.color} textAnchor="end">{d.label}</text>
        <text x={d.w+4} y={32+i*16} fontSize="7" fill={L}>{d.sub}</text>
      </g>
    ))}
    <text x="14" y="98" fontSize="8" fill={L}>현재 미국 버핏지수 ≈ 190% (2024년 기준)</text>
  </svg>
);

const SvgDCA = () => {
  const prices=[100,90,85,110,95,120,105,115,130,125];
  const avg=105;
  return (
    <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
      <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">달러코스트 평균법 (매월 정액 투자)</text>
      <line x1="20" y1="90" x2="268" y2="90" stroke={D} strokeWidth="1"/>
      {prices.map((p,i)=>{
        const x=28+i*24; const h=(p-60)*0.7; const y=90-h;
        return <g key={i}>
          <rect x={x} y={y} width="16" height={h} rx="2" fill={B} opacity=".4"/>
          <text x={x+8} y="100" fontSize="6" fill={L} textAnchor="middle">{i+1}월</text>
        </g>;
      })}
      {/* Average line */}
      <line x1="20" y1={90-(avg-60)*0.7} x2="268" y2={90-(avg-60)*0.7} stroke={M} strokeWidth="1.5" strokeDasharray="4,2"/>
      <text x="22" y={86-(avg-60)*0.7} fontSize="8" fill={M}>평균매수가 $105</text>
    </svg>
  );
};

const SvgStart = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">미국 주식 투자 3단계</text>
    {[{n:"1",label:"증권사 계좌 개설",color:B,x:14,y:75},{n:"2",label:"달러 환전",color:M,x:100,y:55},{n:"3",label:"ETF / 우량주 매수",color:G,x:186,y:35}].map((s,i)=>(
      <g key={i}>
        <rect x={s.x} y={s.y} width="78" height="28" rx="6" fill="none" stroke={s.color} strokeWidth="1.5" opacity=".7"/>
        <circle cx={s.x+12} cy={s.y+14} r="9" fill={s.color} opacity=".8"/>
        <text x={s.x+12} y={s.y+18} fontSize="9" fill="#000" textAnchor="middle" fontWeight="bold">{s.n}</text>
        <text x={s.x+48} y={s.y+11} fontSize="8" fill={T} textAnchor="middle">{s.label}</text>
        {i<2 && <path d={`M${s.x+78},${s.y+14} L${s.x+100},${s.y-6}`} stroke={L} strokeWidth="1" strokeDasharray="3,2"/>}
      </g>
    ))}
    <text x="14" y="108" fontSize="8" fill={L}>추천 첫 매수: VOO, SPY (S&amp;P 500 ETF)</text>
  </svg>
);

const SvgSectors = () => {
  const sectors=[{n:"IT",c:M,a:28.5},{n:"헬스",c:B,a:12},{n:"금융",c:G,a:13.3},{n:"소비재",c:"#a78bfa",a:10.7},{n:"산업",c:"#f59e0b",a:8.5},{n:"기타",c:L,a:27}];
  let cum=0;
  const cx=80, cy=62, r=44;
  return (
    <svg viewBox="0 0 280 118" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
      <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">S&amp;P 500 — 11개 주요 섹터</text>
      {sectors.map((s,i)=>{
        const start=cum; cum+=s.a/100*360;
        const a1=start*Math.PI/180, a2=cum*Math.PI/180;
        const x1=cx+r*Math.cos(a1-Math.PI/2), y1=cy+r*Math.sin(a1-Math.PI/2);
        const x2=cx+r*Math.cos(a2-Math.PI/2), y2=cy+r*Math.sin(a2-Math.PI/2);
        const lg=s.a>18?1:0;
        return <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r},0,${lg},1,${x2},${y2} Z`} fill={s.c} opacity=".75"/>;
      })}
      {sectors.map((s,i)=>(
        <g key={i}>
          <rect x="150" y={8+i*18} width="10" height="10" rx="2" fill={s.c} opacity=".75"/>
          <text x="164" y={17+i*18} fontSize="8" fill={T}>{s.n} {s.a}%</text>
        </g>
      ))}
    </svg>
  );
};

const SvgDividend = () => (
  <svg viewBox="0 0 280 100" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">분기 배당 지급 구조</text>
    <line x1="20" y1="55" x2="260" y2="55" stroke={D} strokeWidth="1.5"/>
    {[{x:50,q:"Q1 3월"},{x:110,q:"Q2 6월"},{x:170,q:"Q3 9월"},{x:230,q:"Q4 12월"}].map((d,i)=>(
      <g key={i}>
        <circle cx={d.x} cy="55" r="6" fill={M} opacity=".8"/>
        <text x={d.x} y="45" fontSize="7" fill={M} textAnchor="middle">$</text>
        <text x={d.x} y="70" fontSize="7" fill={L} textAnchor="middle">{d.q}</text>
        <path d={`M${d.x},49 L${d.x},38`} stroke={M} strokeWidth="1.5"/>
        <text x={d.x} y="32" fontSize="8" fill={M} textAnchor="middle">배당</text>
      </g>
    ))}
    <text x="14" y="92" fontSize="8" fill={L}>배당귀족: 25년 이상 연속 배당 증가 기업</text>
    <text x="14" y="100" fontSize="8" fill={G}>DRIP: 배당금으로 추가 주식 자동 매수 → 복리</text>
  </svg>
);

const SvgTA = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="12" fontSize="9" fill={T} fontWeight="bold">기술적 분석 핵심 지표</text>
    <line x1="14" y1="95" x2="266" y2="95" stroke={D} strokeWidth="1"/>
    {/* Candlesticks */}
    {[[30,60,72,55],[50,55,68,50],[60,58,65,72],[58,72,80,68],[62,68,75,70],[68,70,82,65],[72,65,80,76],[70,76,88,72]].map(([o,c,h,l],i)=>{
      const x=28+i*28; const scale=0.7; const base=95;
      const oy=base-o*scale, cy2=base-c*scale, hy=base-h*scale, ly=base-l*scale;
      const top=Math.min(oy,cy2), bot=Math.max(oy,cy2);
      return <g key={i}>
        <line x1={x+6} y1={hy} x2={x+6} y2={ly} stroke={c>o?M:R} strokeWidth="1.2"/>
        <rect x={x} y={top} width="12" height={Math.max(2,bot-top)} rx="1" fill={c>o?M:R} opacity=".8"/>
      </g>;
    })}
    {/* MA lines */}
    <polyline points="28,62 56,58 84,53 112,49 140,47 168,44 196,41 224,38" fill="none" stroke={G} strokeWidth="1.5"/>
    <polyline points="28,66 56,64 84,60 112,56 140,53 168,50 196,47 224,44" fill="none" stroke={B} strokeWidth="1.5" strokeDasharray="3,2"/>
    <text x="228" y="38" fontSize="7" fill={G}>50일</text>
    <text x="228" y="46" fontSize="7" fill={B}>200일</text>
    <text x="14" y="107" fontSize="8" fill={M}>골든크로스: 50일선이 200일선 상향 돌파 → 매수 신호</text>
  </svg>
);

const SvgFX = () => (
  <svg viewBox="0 0 280 100" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">환율 영향 구조</text>
    <rect x="20" y="30" width="70" height="38" rx="8" fill="none" stroke={M} strokeWidth="1.5"/>
    <text x="55" y="54" fontSize="11" fill={M} textAnchor="middle" fontWeight="bold">KRW</text>
    <rect x="190" y="30" width="70" height="38" rx="8" fill="none" stroke={G} strokeWidth="1.5"/>
    <text x="225" y="54" fontSize="11" fill={G} textAnchor="middle" fontWeight="bold">USD</text>
    <path d="M92,44 L188,44" stroke={T} strokeWidth="1.5" markerEnd="url(#a2)"/>
    <path d="M188,56 L92,56" stroke={T} strokeWidth="1.5" markerEnd="url(#a3)"/>
    <defs>
      <marker id="a2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={T}/></marker>
      <marker id="a3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={T}/></marker>
    </defs>
    <text x="140" y="40" fontSize="7" fill={L} textAnchor="middle">환전</text>
    <text x="140" y="64" fontSize="7" fill={L} textAnchor="middle">수익 실현</text>
    <text x="14" y="85" fontSize="8" fill={R}>원화 약세(달러↑) → 환차익 발생</text>
    <text x="14" y="96" fontSize="8" fill={M}>원화 강세(달러↓) → 환차손 주의</text>
  </svg>
);

const SvgETF = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">ETF = 여러 주식을 한 바구니에</text>
    {/* Basket */}
    <path d="M60,90 Q60,38 140,38 Q220,38 220,90 Z" fill="none" stroke={G} strokeWidth="2"/>
    <line x1="60" y1="90" x2="220" y2="90" stroke={G} strokeWidth="2"/>
    {/* handle */}
    <path d="M100,38 Q140,18 180,38" fill="none" stroke={G} strokeWidth="2"/>
    {/* Stock labels inside */}
    {[{t:"AAPL",x:90,y:60},{t:"MSFT",x:130,y:55},{t:"NVDA",x:165,y:60},{t:"AMZN",x:105,y:76},{t:"GOOG",x:148,y:78}].map((s,i)=>(
      <g key={i}>
        <rect x={s.x-14} y={s.y-9} width="28" height="14" rx="3" fill={M} opacity=".15" stroke={M} strokeWidth=".5"/>
        <text x={s.x} y={s.y} fontSize="7" fill={M} textAnchor="middle" fontWeight="bold">{s.t}</text>
      </g>
    ))}
    <text x="14" y="104" fontSize="8" fill={L}>VOO·SPY(S&amp;P500), QQQ(나스닥) — 낮은 수수료, 분산 효과</text>
  </svg>
);

const SvgBuyback = () => (
  <svg viewBox="0 0 280 100" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">자사주 매입 효과</text>
    {/* Before */}
    <text x="60" y="30" fontSize="8" fill={L} textAnchor="middle">매입 전</text>
    {[0,1,2,3,4,5,6,7,8].map(i=>(
      <circle key={i} cx={22+(i%3)*24} cy={40+Math.floor(i/3)*20} r="8" fill={B} opacity=".4" stroke={B} strokeWidth=".5"/>
    ))}
    <text x="60" y="95" fontSize="7" fill={L} textAnchor="middle">EPS: $2.0</text>
    {/* Arrow */}
    <text x="116" y="58" fontSize="20" fill={G} textAnchor="middle">→</text>
    <text x="116" y="74" fontSize="8" fill={G} textAnchor="middle">자사주 매입</text>
    {/* After */}
    <text x="200" y="30" fontSize="8" fill={L} textAnchor="middle">매입 후</text>
    {[0,1,2,3,4,5].map(i=>(
      <circle key={i} cx={162+(i%3)*24} cy={40+Math.floor(i/3)*20} r="8" fill={M} opacity=".5" stroke={M} strokeWidth=".5"/>
    ))}
    <text x="200" y="95" fontSize="8" fill={M} textAnchor="middle" fontWeight="bold">EPS: $3.0 ↑</text>
    <text x="14" y="107" fontSize="7" fill={L}>주식수 감소 → EPS 증가 → 주주 가치 상승</text>
  </svg>
);

const SvgOptions = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="12" fontSize="9" fill={T} fontWeight="bold">콜(Call) · 풋(Put) 수익 구조</text>
    <line x1="20" y1="65" x2="260" y2="65" stroke={D} strokeWidth="1"/>
    <line x1="140" y1="20" x2="140" y2="100" stroke={D} strokeWidth="1" strokeDasharray="3,2"/>
    <text x="140" y="108" fontSize="8" fill={L} textAnchor="middle">행사가</text>
    {/* Call option */}
    <polyline points="20,73 140,73 260,20" fill="none" stroke={M} strokeWidth="2"/>
    <text x="250" y="18" fontSize="8" fill={M}>콜 ↑</text>
    {/* Put option */}
    <polyline points="20,20 140,73 260,73" fill="none" stroke={R} strokeWidth="2" strokeDasharray="4,2"/>
    <text x="14" y="18" fontSize="8" fill={R}>풋 ↑</text>
    <text x="20" y="55" fontSize="7" fill={M}>수익</text>
    <text x="20" y="80" fontSize="7" fill={R}>손실</text>
    <text x="14" y="107" fontSize="8" fill={L}>콜: 주가 상승 시 수익 / 풋: 주가 하락 시 수익</text>
  </svg>
);

// ── MASTERS SVGs ─────────────────────────────────────────────────

const SvgBuffettPrinciples = () => (
  <svg viewBox="0 0 280 140" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={G} fontWeight="bold">워렌 버핏의 핵심 원칙</text>
    {["이해하는 사업에만 투자하라","훌륭한 경영진을 찾아라","적정 가격에 좋은 기업 매수","장기 보유 — 영원히 보유할 주식만","시장 하락을 두려워 말라","높은 ROE, 낮은 부채 선호","배당·자사주 매입 주주친화 기업"].map((p,i)=>(
      <g key={i}>
        <circle cx="24" cy={28+i*16} r="5" fill={G} opacity=".7"/>
        <text x="30" y={32+i*16} fontSize="8" fill={T}>{p}</text>
      </g>
    ))}
    <text x="14" y="138" fontSize="8" fill={L}>버크셔 해서웨이 60년 연평균 +19.8%</text>
  </svg>
);

const SvgLynch = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={M} fontWeight="bold">피터 린치 — 10루터(10-Bagger) 전략</text>
    <line x1="20" y1="90" x2="260" y2="90" stroke={D} strokeWidth="1"/>
    <line x1="20" y1="20" x2="20" y2="90" stroke={D} strokeWidth="1"/>
    {["1x","2x","5x","10x"].map((l,i)=>(
      <text key={i} x="16" y={88-i*22} fontSize="7" fill={L} textAnchor="end">{l}</text>
    ))}
    <polyline points="20,88 50,82 80,75 110,66 140,58 170,45 200,36 230,26 260,18" fill="none" stroke={M} strokeWidth="2.5"/>
    <circle cx="260" cy="18" r="5" fill={M}/>
    <text x="248" y="14" fontSize="9" fill={M} fontWeight="bold">10x!</text>
    <text x="20" y="45" fontSize="8" fill={G}>일상에서 먼저 발견 → 투자자로 확인</text>
    <text x="14" y="106" fontSize="8" fill={L}>마젤란 펀드 13년 운용 → +2,900% (연 29%)</text>
  </svg>
);

const SvgMunger = () => (
  <svg viewBox="0 0 280 120" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={B} fontWeight="bold">찰리 멍거 — 격자형 정신 모델</text>
    <circle cx="140" cy="70" r="22" fill="none" stroke={B} strokeWidth="2"/>
    <text x="140" y="67" fontSize="8" fill={B} textAnchor="middle">투자</text>
    <text x="140" y="77" fontSize="8" fill={B} textAnchor="middle">결정</text>
    {[{x:60,y:30,l:"심리학"},{x:220,y:30,l:"역사학"},{x:30,y:80,l:"수학"},{x:250,y:80,l:"물리학"},{x:80,y:115,l:"경제학"},{x:200,y:115,l:"생물학"}].map((n,i)=>(
      <g key={i}>
        <line x1={n.x} y1={n.y} x2={140} y2={70} stroke={B} strokeWidth="1" opacity=".4"/>
        <rect x={n.x-20} y={n.y-9} width="40" height="16" rx="4" fill={B} opacity=".15" stroke={B} strokeWidth=".8"/>
        <text x={n.x} y={n.y+3} fontSize="8" fill={B} textAnchor="middle">{n.l}</text>
      </g>
    ))}
  </svg>
);

const SvgBogle = () => (
  <svg viewBox="0 0 280 110" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={M} fontWeight="bold">존 보글 — 비용이 수익을 갉아먹는다</text>
    <text x="14" y="28" fontSize="8" fill={L}>30년 후 $10,000 투자 결과</text>
    {[{label:"인덱스 ETF",fee:"연 0.05%",val:"$174,494",color:M,h:70},{label:"액티브 펀드",fee:"연 1.50%",val:"$117,614",color:R,h:47}].map((d,i)=>(
      <g key={i}>
        <rect x={40+i*120} y={90-d.h} width="80" height={d.h} rx="4" fill={d.color} opacity=".25"/>
        <rect x={40+i*120} y={90-d.h} width="80" height="4" rx="2" fill={d.color} opacity=".9"/>
        <text x={80+i*120} y={90-d.h-8} fontSize="9" fill={d.color} textAnchor="middle" fontWeight="bold">{d.val}</text>
        <text x={80+i*120} y="102" fontSize="8" fill={L} textAnchor="middle">{d.label}</text>
        <text x={80+i*120} y="110" fontSize="7" fill={d.color} textAnchor="middle">{d.fee}</text>
      </g>
    ))}
    <line x1="14" y1="90" x2="266" y2="90" stroke={D} strokeWidth="1"/>
  </svg>
);

const SvgCompound = () => (
  <svg viewBox="0 0 280 115" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={G} fontWeight="bold">복리의 마법 — 연 10% 수익률 기준</text>
    <line x1="30" y1="95" x2="266" y2="95" stroke={D} strokeWidth="1"/>
    <line x1="30" y1="20" x2="30" y2="95" stroke={D} strokeWidth="1"/>
    {["1x","2.6x","6.7x","17.4x","45x"].map((l,i)=>(
      <text key={i} x="26" y={95-i*16} fontSize="6" fill={L} textAnchor="end">{l}</text>
    ))}
    <polyline points="30,93 88,89 146,82 204,67 262,30" fill="none" stroke={G} strokeWidth="2.5"/>
    <path d="M30,95 L88,89 L146,82 L204,67 L262,30 L262,95 Z" fill={G} opacity=".08"/>
    {[[88,89,"10년\n2.6x"],[146,82,"20년\n6.7x"],[204,67,"30년\n17.4x"],[262,30,"40년\n45x"]].map(([x,y,l],i)=>(
      <g key={i}>
        <circle cx={x as number} cy={y as number} r="4" fill={G}/>
        <text x={(x as number)+4} y={(y as number)-6} fontSize="7" fill={G}>{(l as string).split("\n")[0]}</text>
        <text x={(x as number)+4} y={(y as number)+6} fontSize="7" fill={G} fontWeight="bold">{(l as string).split("\n")[1]}</text>
      </g>
    ))}
    <text x="14" y="112" fontSize="8" fill={L}>버핏 자산의 95%는 65세 이후에 쌓임 — 복리의 후폭풍</text>
  </svg>
);

const SvgPortfolio = () => {
  const assets=[{n:"주식",p:60,c:M},{n:"장기채권",p:20,c:B},{n:"중기채권",p:10,c:G},{n:"금",p:7.5,c:G},{n:"원자재",p:2.5,c:L}];
  let cum=0;
  return (
    <svg viewBox="0 0 280 115" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
      <text x="14" y="14" fontSize="9" fill={T} fontWeight="bold">분산 투자 — 자산 배분 예시</text>
      {assets.map((a,i)=>{
        const start=cum; cum+=a.p/100*360;
        const a1=(start-90)*Math.PI/180, a2=(cum-90)*Math.PI/180;
        const cx=80, cy=65, r=42;
        const x1=cx+r*Math.cos(a1), y1=cy+r*Math.sin(a1);
        const x2=cx+r*Math.cos(a2), y2=cy+r*Math.sin(a2);
        return <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r},0,${a.p>50?1:0},1,${x2},${y2} Z`} fill={a.c} opacity=".7"/>;
      })}
      {assets.map((a,i)=>(
        <g key={i}>
          <rect x="150" y={10+i*19} width="10" height="10" rx="2" fill={a.c} opacity=".7"/>
          <text x="164" y={19+i*19} fontSize="8" fill={T}>{a.n} {a.p}%</text>
        </g>
      ))}
      <text x="14" y="110" fontSize="8" fill={L}>연 1~2회 리밸런싱으로 목표 비중 유지</text>
    </svg>
  );
};

const SvgChecklist = () => (
  <svg viewBox="0 0 280 135" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={G} fontWeight="bold">우량주 선별 10가지 기준</text>
    {["강력한 경쟁 해자 (Moat)","일관된 EPS 성장 (5~10년)","높은 ROE (15% 이상)","낮은 부채비율 (50% 이하)","자유현금흐름(FCF) 창출","주주친화 경영진","합리적 밸류에이션","이해 가능한 사업 모델","강력한 브랜드 인지도","장기 성장 산업 위치"].map((c,i)=>(
      <g key={i}>
        <circle cx="22" cy={27+i*10} r="4" fill={M} opacity=".8"/>
        <path d={`M20,${27+i*10} L22,${29+i*10} L25,${25+i*10}`} fill="none" stroke="#000" strokeWidth="1.2"/>
        <text x="30" y={30+i*10} fontSize="7.5" fill={T}>{c}</text>
      </g>
    ))}
  </svg>
);

const SvgGraham = () => (
  <svg viewBox="0 0 280 100" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={B} fontWeight="bold">그레이엄 — 안전마진(Margin of Safety)</text>
    <text x="140" y="30" fontSize="9" fill={L} textAnchor="middle">내재가치</text>
    <rect x="60" y="34" width="160" height="22" rx="4" fill={B} opacity=".25" stroke={B} strokeWidth="1"/>
    <text x="140" y="50" fontSize="10" fill={B} textAnchor="middle" fontWeight="bold">$100</text>
    <text x="140" y="66" fontSize="9" fill={L} textAnchor="middle">매수 기준가 (안전마진 30%)</text>
    <rect x="82" y="70" width="116" height="18" rx="4" fill={M} opacity=".3" stroke={M} strokeWidth="1"/>
    <text x="140" y="83" fontSize="10" fill={M} textAnchor="middle" fontWeight="bold">$70</text>
    <text x="14" y="98" fontSize="8" fill={L}>내재가치보다 30% 이상 낮을 때만 매수 → 손실 방어</text>
  </svg>
);

const SvgFisher = () => (
  <svg viewBox="0 0 280 115" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={M} fontWeight="bold">필립 피셔 — 스커틀버트 방법</text>
    <rect x="110" y="45" width="60" height="28" rx="8" fill={M} opacity=".2" stroke={M} strokeWidth="1.5"/>
    <text x="140" y="63" fontSize="9" fill={M} textAnchor="middle" fontWeight="bold">기업</text>
    {[{x:30,y:30,l:"고객"},{x:220,y:30,l:"경쟁사"},{x:20,y:85,l:"납품업체"},{x:220,y:85,l:"전직직원"},{x:120,y:12,l:"R&D 투자"},{x:140,y:105,l:"성장 잠재력"}].map((n,i)=>(
      <g key={i}>
        <line x1={n.x+20} y1={n.y+8} x2="140" y2="59" stroke={M} strokeWidth="1" opacity=".3"/>
        <rect x={n.x} y={n.y} width="40" height="16" rx="4" fill="none" stroke={M} strokeWidth=".8" opacity=".6"/>
        <text x={n.x+20} y={n.y+10} fontSize="7.5" fill={L} textAnchor="middle">{n.l}</text>
      </g>
    ))}
  </svg>
);

const SvgAllWeather = () => (
  <svg viewBox="0 0 280 120" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={B} fontWeight="bold">레이 달리오 — 올웨더 포트폴리오</text>
    <line x1="140" y1="24" x2="140" y2="108" stroke={D} strokeWidth="1"/>
    <line x1="20" y1="66" x2="260" y2="66" stroke={D} strokeWidth="1"/>
    <text x="80" y="22" fontSize="8" fill={M} textAnchor="middle">성장↑</text>
    <text x="200" y="22" fontSize="8" fill={R} textAnchor="middle">인플레↑</text>
    <text x="80" y="114" fontSize="8" fill={R} textAnchor="middle">성장↓</text>
    <text x="200" y="114" fontSize="8" fill={B} textAnchor="middle">인플레↓</text>
    {[{x:24,y:28,w:110,h:34,c:M,t:"주식 30%"},{x:146,y:28,w:110,h:34,c:R,t:"원자재 7.5%\n금 7.5%"},{x:24,y:70,w:110,h:34,c:R,t:"장기채 40%"},{x:146,y:70,w:110,h:34,c:B,t:"중기채 15%"}].map((d,i)=>(
      <g key={i}>
        <rect x={d.x} y={d.y} width={d.w} height={d.h} rx="4" fill={d.c} opacity=".1" stroke={d.c} strokeWidth=".8"/>
        {d.t.split("\n").map((line,j)=>(
          <text key={j} x={d.x+d.w/2} y={d.y+d.h/2-3+j*12} fontSize="8" fill={d.c} textAnchor="middle">{line}</text>
        ))}
      </g>
    ))}
  </svg>
);

const SvgCycle = () => (
  <svg viewBox="0 0 280 115" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={G} fontWeight="bold">하워드 막스 — 시장 사이클</text>
    <line x1="20" y1="65" x2="266" y2="65" stroke={D} strokeWidth="1"/>
    <path d="M20,65 Q60,20 100,65 Q140,110 180,65 Q220,20 260,65" fill="none" stroke={G} strokeWidth="2"/>
    <circle cx="100" cy="65" r="5" fill={R}/>
    <circle cx="180" cy="65" r="5" fill={M}/>
    <text x="100" y="30" fontSize="8" fill={R} textAnchor="middle">탐욕 정점</text>
    <text x="100" y="42" fontSize="8" fill={R} textAnchor="middle">과열 → 매도</text>
    <text x="180" y="100" fontSize="8" fill={M} textAnchor="middle">공포 저점</text>
    <text x="180" y="110" fontSize="8" fill={M} textAnchor="middle">침체 → 매수</text>
    <text x="14" y="82" fontSize="7" fill={L}>낙관적일 때 위험↑</text>
    <text x="190" y="82" fontSize="7" fill={L}>비관적일 때 기회↑</text>
    <text x="14" y="112" fontSize="8" fill={G}>핵심: "지금 우리가 사이클의 어디에 있는가?"</text>
  </svg>
);

const SvgMindset = () => (
  <svg viewBox="0 0 280 115" className="w-full mb-3 rounded-xl" style={{background:"rgba(255,255,255,0.03)"}}>
    <text x="14" y="14" fontSize="9" fill={M} fontWeight="bold">장기 투자 — 대가들의 공통 원칙</text>
    {/* Mountain */}
    <path d="M20,95 L80,50 L110,65 L150,20 L190,60 L220,45 L260,95 Z" fill="none" stroke={D} strokeWidth="1.5"/>
    <path d="M20,95 L80,50 L110,65 L150,20 L190,60 L220,45 L260,95" fill="none" stroke={M} strokeWidth="2.5" opacity=".6"/>
    {/* Path milestones */}
    {[{x:80,y:50,l:"인내"},{x:110,y:65,l:"단순함"},{x:150,y:20,l:"목표"},{x:220,y:45,l:"감정통제"}].map((p,i)=>(
      <g key={i}>
        <circle cx={p.x} cy={p.y} r="5" fill={M}/>
        <text x={p.x} y={p.y-8} fontSize="7.5" fill={M} textAnchor="middle">{p.l}</text>
      </g>
    ))}
    <text x="14" y="110" fontSize="8" fill={L}>"10년 보유 못 할 주식이면 10분도 보유 말라" — 버핏</text>
  </svg>
);

// ── Article data ──────────────────────────────────────────────────

const BASICS: Article[] = [
  { emoji:"📈", title:"주식이란 무엇인가? 완전 기초부터", desc:"주식의 개념부터 주주의 권리까지, 투자를 처음 접하는 분을 위한 가장 기본적인 설명입니다.", svg: SvgStock, body:"주식(Stock)은 기업의 소유권을 작게 나눈 단위입니다. 기업이 자금을 조달하기 위해 주식을 발행하면, 이를 매수한 투자자는 해당 기업의 부분 소유자(주주)가 됩니다. 주주는 기업의 이익 분배(배당)를 받을 권리와, 주주총회에서 의결권을 행사할 권리를 갖습니다.\n\n주가는 수요와 공급에 의해 실시간으로 결정됩니다. 기업의 실적이 좋거나 미래 성장 기대가 높아지면 주가가 올라가고, 반대의 경우 내려갑니다. 투자자는 주가 상승에 따른 시세차익과 배당수익으로 수익을 얻을 수 있습니다." },
  { emoji:"🇺🇸", title:"S&P 500 완벽 이해: 미국 증시의 척도", desc:"S&P 500이 단순한 지수를 넘어 미국 경제 전체의 건강을 나타내는 이유를 알아봅니다.", svg: SvgSP500, body:"S&P 500은 미국을 대표하는 500개 대형 상장기업의 주가를 시가총액 가중 방식으로 집계한 지수입니다. 애플, 마이크로소프트, 아마존 등 미국 경제를 이끄는 핵심 기업들이 포함되어 있으며, 미국 주식시장 전체 시가총액의 약 80%를 커버합니다.\n\n역사적으로 S&P 500은 연평균 약 10%의 수익률을 기록했습니다. 개별 종목보다 분산 투자 효과가 있어 장기 투자의 기준점으로 널리 사용됩니다. VOO, SPY 같은 ETF를 통해 S&P 500 전체에 간편하게 투자할 수 있습니다." },
  { emoji:"🗺️", title:"선물 지도(Futures Map) 읽는 법: 장 시작 전 시장 예측", desc:"나스닥·S&P·다우 선물이 무엇인지, 심야 선물 움직임으로 다음 날 증시를 어떻게 예측하는지 설명합니다.", svg: SvgFutures, body:"선물(Futures)은 미래의 특정 시점에 정해진 가격으로 자산을 사고팔기로 계약하는 금융상품입니다. 주식시장이 닫혀 있는 야간에도 선물 시장은 거래되기 때문에, 투자자들은 다음 날 장 시작 전 시장 분위기를 파악하는 데 선물 지수를 활용합니다.\n\n나스닥 선물이 +1% 이상이면 기술주 강세, S&P 500 선물이 -0.5% 이하면 전반적 약세 출발 가능성이 높습니다. 단, 선물 방향이 반드시 당일 장 마감 방향과 일치하지는 않습니다." },
  { emoji:"📊", title:"매크로 경제 핵심 지표 완전 정복", desc:"GDP, CPI, PCE, 실업률, PMI 등 주식시장에 직접 영향을 주는 핵심 경제지표를 정리합니다.", svg: SvgMacro, body:"GDP(국내총생산): 한 나라의 경제 규모와 성장률을 나타냅니다. GDP 성장이 예상보다 강하면 주식시장에 호재, 침체 우려 시 악재입니다.\n\nCPI(소비자물가지수) & PCE: 인플레이션을 측정합니다. 연준은 PCE를 선호 지표로 사용하며, 인플레이션이 높으면 금리 인상 → 주식 하락 압력이 생깁니다.\n\n실업률: 노동시장 건강을 나타냅니다. PMI(구매관리자지수): 50 이상이면 경기 확장, 50 미만이면 수축을 의미합니다." },
  { emoji:"🏦", title:"FOMC와 연준(Fed) 완전 이해: 금리가 왜 중요한가", desc:"연방공개시장위원회(FOMC) 회의가 무엇이고, 금리 결정이 주식시장에 어떤 영향을 미치는지 핵심을 정리합니다.", svg: SvgFOMC, body:"연준(Federal Reserve, Fed)은 미국의 중앙은행입니다. FOMC(연방공개시장위원회)는 연 8회 회의를 열어 기준금리를 결정합니다. 이 금리가 미국뿐 아니라 전 세계 금융시장에 영향을 미칩니다.\n\n금리 인상 → 대출 비용 증가 → 기업 이익 감소 → 주가 하락 압력. 금리 인하 → 자금 조달 쉬워짐 → 기업 성장 기대 → 주가 상승 요인. 특히 기술주(성장주)는 금리에 매우 민감합니다." },
  { emoji:"💵", title:"채권과 금리의 기초: 10년물 국채와 역수익률 곡선", desc:"채권 가격과 금리의 역관계, 10년물 국채가 왜 주식시장의 나침반이 되는지 설명합니다.", svg: SvgBond, body:"채권(Bond)은 정부나 기업이 돈을 빌리면서 발행하는 차용증입니다. 채권 가격과 금리는 반대로 움직입니다. 금리가 오르면 기존 채권의 가치가 떨어지고, 금리가 내리면 올라갑니다.\n\n미국 10년물 국채 수익률은 '무위험 수익률'의 기준으로 사용됩니다. 10년물 수익률이 오르면 주식의 상대적 매력이 줄어들어 주가 하락 압력이 생깁니다. 역수익률 곡선(2년물 > 10년물)은 역사적으로 경기침체를 예고하는 신호로 알려져 있습니다." },
  { emoji:"📅", title:"실적 시즌(어닝 시즌) 완전 정복: EPS·가이던스·컨센서스", desc:"분기마다 돌아오는 어닝 시즌에서 투자자가 꼭 확인해야 할 핵심 지표와 해석법을 설명합니다.", svg: SvgEarnings, body:"어닝 시즌은 기업들이 분기 실적을 발표하는 기간입니다(1·4·7·10월). 주요 확인 지표:\n\nEPS(주당순이익): 순이익 ÷ 발행주식수. 컨센서스(애널리스트 예상 평균) 대비 초과 달성 여부가 중요합니다. 가이던스: 기업이 다음 분기/연도 실적 전망을 발표하는 것. 현재 실적보다 미래 가이던스가 주가에 더 큰 영향을 미치는 경우가 많습니다." },
  { emoji:"💰", title:"기업 가치평가 핵심 지표: PER·PBR·EV/EBITDA", desc:"주식이 비싼지 싼지 판단하는 핵심 밸류에이션 지표들을 초보자도 이해하기 쉽게 설명합니다.", svg: SvgValuation, body:"PER(주가수익비율) = 주가 ÷ EPS. PER이 낮으면 상대적으로 저평가, 높으면 성장 기대가 반영된 것입니다. 동종 업계 평균과 비교하는 것이 중요합니다.\n\nPBR(주가순자산비율) = 주가 ÷ BPS(주당순자산). PBR 1 이하는 장부가치보다 싸게 거래되는 것을 의미합니다.\n\nEV/EBITDA: 기업 전체 가치(EV)를 영업 현금흐름(EBITDA)으로 나눈 값. 부채 규모가 다른 기업을 비교할 때 유용합니다." },
  { emoji:"😨", title:"공포·탐욕지수(Fear & Greed Index) 활용법", desc:"시장 심리를 수치화한 공포·탐욕지수를 투자 타이밍에 활용하는 실전 방법을 설명합니다.", svg: SvgFearGreed, body:"공포·탐욕지수는 CNN Money가 만든 지표로 0(극단적 공포)~100(극단적 탐욕) 사이 값으로 시장 심리를 표현합니다. 7가지 지표(변동성, 모멘텀, 수요-공급, 안전자산 수요 등)를 종합해 계산합니다.\n\n투자 활용법: 극단적 공포(0~25) 구간은 역발상적으로 좋은 매수 기회일 수 있습니다. 극단적 탐욕(75~100) 구간은 과열 신호로 주의가 필요합니다." },
  { emoji:"📏", title:"버핏지수로 시장 거품 측정하기", desc:"주식 시장 전체 시가총액을 GDP로 나눈 버핏지수의 의미와 해석 방법을 알아봅니다.", svg: SvgBuffett, body:"버핏지수 = 미국 주식시장 전체 시가총액 ÷ 미국 GDP × 100(%). 워렌 버핏이 2001년 포춘 인터뷰에서 '가장 좋아하는 주식 밸류에이션 지표'라고 언급하면서 이름이 붙었습니다.\n\n해석 기준: 75% 이하 = 저평가, 75~90% = 적정, 90~115% = 약간 고평가, 115% 이상 = 과열. 이 지표는 장기 사이클 분석에 유용하지만, 단기 매매 신호로 사용하기는 어렵습니다." },
  { emoji:"🔄", title:"달러코스트 평균법(DCA): 타이밍 없이 이기는 전략", desc:"시장 타이밍을 맞추지 않아도 장기적으로 수익을 낼 수 있는 정액 분할 매수 전략을 설명합니다.", svg: SvgDCA, body:"DCA(Dollar Cost Averaging)는 특정 종목 또는 ETF를 일정 주기(매월, 매주)에 일정 금액씩 꾸준히 매수하는 방법입니다. 주가가 쌀 때는 더 많은 주수를, 비쌀 때는 더 적은 주수를 사게 되어 평균 매수가를 낮추는 효과가 있습니다.\n\nDCA의 장점: 시장 타이밍을 맞출 필요가 없습니다. 감정적 의사결정을 줄일 수 있습니다. 장기적으로 복리 효과를 극대화할 수 있습니다." },
  { emoji:"🚀", title:"미국 주식 투자 시작하기: 완전 초보 가이드", desc:"증권사 선택부터 첫 종목 매수까지, 미국 주식 투자의 실전 단계를 차례로 안내합니다.", svg: SvgStart, body:"1단계: 증권사 선택. 한국 투자자는 키움증권, 미래에셋, NH투자증권 등 국내 증권사를 통해 미국 주식에 투자할 수 있습니다. 수수료와 환전 비용을 비교하세요.\n\n2단계: 계좌 개설 & 달러 환전. 미국 주식은 달러(USD)로 거래됩니다.\n\n3단계: 첫 매수. 처음에는 S&P 500 ETF(VOO, SPY)나 대형 우량주(AAPL, MSFT)로 시작하는 것을 권장합니다." },
  { emoji:"🏗️", title:"미국 주식 11개 섹터 한눈에 이해하기", desc:"S&P 500을 구성하는 11개 주요 섹터의 특성과 경기 사이클에서의 역할을 설명합니다.", svg: SvgSectors, body:"S&P 500은 GICS 기준 11개 섹터로 분류됩니다. 주요 섹터:\n\n정보기술(IT): AAPL, MSFT, NVDA — 성장 국면에서 강함. 헬스케어: JNJ, LLY — 경기 방어적 성격. 금융: JPM, BAC — 금리 인상 시 수혜. 에너지: XOM, CVX — 유가와 연동. 소비재(필수): 식음료, 생활용품 — 경기침체 방어주." },
  { emoji:"💸", title:"배당주 투자 완전 기초: 배당수익률·배당귀족·DRIP", desc:"매달 현금이 들어오는 배당주 투자의 핵심 개념과 미국 배당귀족 종목 활용법을 설명합니다.", svg: SvgDividend, body:"배당수익률 = 연간 배당금 ÷ 주가 × 100(%). 4%면 주가 $100 기준 연간 $4 배당을 받는다는 의미입니다. 미국 주식은 보통 분기(3개월)마다 배당을 지급합니다.\n\n배당귀족(Dividend Aristocrats): S&P 500 기업 중 25년 이상 연속 배당을 인상한 기업 그룹입니다. JNJ, KO, PG, MMM 등이 포함됩니다. DRIP(배당 재투자 프로그램): 배당금으로 추가 주식을 자동 매수하는 방법으로 복리 효과를 극대화합니다." },
  { emoji:"📉", title:"기술적 분석 기초: 차트 읽는 법과 핵심 지표", desc:"이동평균선·RSI·MACD·지지와 저항선 등 미국 주식 차트 분석의 핵심 도구를 초보자 눈높이로 설명합니다.", svg: SvgTA, body:"이동평균선(MA): 일정 기간의 평균 주가를 나타내는 선. 50일선과 200일선이 가장 많이 사용됩니다. 50일선이 200일선을 상향 돌파하면 '골든크로스(매수 신호)', 하향 이탈하면 '데드크로스(매도 신호)'라고 합니다.\n\nRSI(상대강도지수): 0~100 범위로 과매수(70 이상)/과매도(30 이하) 상태를 판단합니다. MACD: 단기·장기 이동평균선의 차이로 추세 전환을 포착합니다." },
  { emoji:"💱", title:"환율과 달러가 미국 주식에 미치는 영향", desc:"원달러 환율, 달러인덱스(DXY)가 미국 주식 투자 수익률과 기업 실적에 어떤 영향을 주는지 설명합니다.", svg: SvgFX, body:"한국 투자자는 달러로 미국 주식을 사기 때문에 환율 변동이 실질 수익률에 영향을 줍니다. 원화 약세(달러 강세) 시: 환전 비용이 증가하지만, 달러 자산의 원화 환산 가치는 높아집니다.\n\nDXY(달러인덱스): 달러의 상대 강도를 나타내는 지수. DXY가 강세면 신흥국 자금이 미국으로 유입, 약세면 위험 자산 선호 경향이 있습니다." },
  { emoji:"📦", title:"ETF 완전 정복: 종류·선택 기준·주의사항", desc:"인덱스·섹터·테마·레버리지 ETF의 차이와 내 포트폴리오에 맞는 ETF를 고르는 기준을 설명합니다.", svg: SvgETF, body:"ETF(Exchange Traded Fund)는 주식처럼 거래소에서 실시간 매매 가능한 펀드입니다. 종류:\n\n인덱스 ETF: S&P 500(VOO, SPY), 나스닥100(QQQ) 추종. 장기 투자의 핵심. 섹터 ETF: XLK(IT), XLF(금융) 등 특정 업종에 집중. 레버리지/인버스 ETF: TQQQ(3배 레버리지) 등 — 단기 트레이딩용, 장기 보유 비적합.\n\n선택 기준: 수수료율(낮을수록 좋음), 운용 자산 규모(AUM), 추적 오차율을 확인하세요." },
  { emoji:"🏷️", title:"자사주 매입·주식 분할·배당의 진짜 의미", desc:"주가에 영향을 주는 자사주 매입(Buyback), 주식 분할(Stock Split), 특별 배당의 개념과 투자자가 봐야 할 신호를 설명합니다.", svg: SvgBuyback, body:"자사주 매입(Buyback): 기업이 자기 주식을 직접 매수하는 것. 유통 주식 수를 줄여 EPS를 높이고 주주 가치를 높입니다. 경영진이 주가가 저평가됐다고 판단할 때 실시하는 경향이 있습니다.\n\n주식 분할(Stock Split): 예를 들어 10:1 분할이면 $1,000짜리 주식 1주가 $100짜리 10주로 바뀝니다. 총 시가총액은 동일하지만 접근성이 높아집니다." },
  { emoji:"🎰", title:"옵션 기초: 콜·풋·IV·만기일 쉽게 이해하기", desc:"미국 주식에서 자주 등장하는 옵션(콜·풋)의 기본 개념과 개인 투자자가 알아야 할 핵심 용어를 설명합니다.", svg: SvgOptions, body:"옵션은 정해진 가격(행사가)에 주식을 사거나 팔 수 있는 권리를 거래하는 파생상품입니다.\n\n콜옵션(Call): 주식을 행사가에 살 수 있는 권리. 주가 상승 시 수익. 풋옵션(Put): 주식을 행사가에 팔 수 있는 권리. 주가 하락 시 수익. IV(내재 변동성): 실적 발표 전 IV가 급등하는 현상(IV Crush)에 주의하세요. 옵션 거래는 레버리지 특성상 초보자에게 매우 위험합니다." },
];

const MASTERS: Article[] = [
  { emoji:"🦉", title:"워렌 버핏의 투자 원칙: 60년을 관통하는 7가지 지혜", desc:"버크셔 해서웨이 주주서한과 버핏의 연설에서 추린, 세상에서 가장 검증된 투자 원칙을 정리합니다.", svg: SvgBuffettPrinciples, body:"1. 이해하는 사업에만 투자하라(능력 범위, Circle of Competence). 2. 훌륭한 경영진을 찾아라 — 정직함과 능력을 함께 갖춘 CEO. 3. 적정 가격에 훌륭한 기업을 사라 — '훌륭한 기업을 공정한 가격에'가 '평범한 기업을 저렴한 가격에'보다 낫다. 4. 장기 보유 — '영원히 보유할 주식만 사라.' 5. 시장 하락을 두려워 말라 — 공포가 지배할 때 탐욕을 가져라. 6. 배당과 자사주 매입으로 주주 가치를 높이는 기업을 선호하라. 7. 부채가 적고 자기자본이익률(ROE)이 높은 기업을 찾아라." },
  { emoji:"🎯", title:"피터 린치의 10루타 전략: 일상에서 찾는 10배 종목", desc:"마젤란 펀드를 13년간 29배 불린 피터 린치가 일상에서 종목을 발굴하고 언제 사고파는지 설명합니다.", svg: SvgLynch, body:"린치의 핵심 원칙: '직접 쓰는 제품을 만드는 회사에 투자하라.' 소비자로서 먼저 좋은 회사를 발견하고, 나중에 투자자로 확인하라는 뜻입니다.\n\n종목 분류: Slow Growers(완만 성장주), Stalwarts(대형 안정주), Fast Growers(고성장주), Cyclicals(경기 민감주), Turnarounds(회생주), Asset Plays(자산주). '10루터(10-bagger)'는 10배 수익 종목을 뜻합니다." },
  { emoji:"🧠", title:"찰리 멍거의 다학제적 투자 사고법", desc:"버크셔 해서웨이 부회장 찰리 멍거가 말한 정신 모델(Mental Models), 역발상, 심리 편향 극복법을 정리합니다.", svg: SvgMunger, body:"멍거는 '격자형 사고(Latticework of Mental Models)'를 강조했습니다. 투자를 잘 하려면 단순히 금융 지식만이 아니라 심리학, 역사, 물리학, 생물학 등 다양한 학문의 원리를 연결해서 생각해야 한다는 것입니다.\n\n핵심 원칙: 1. 역으로 생각하라(Invert) — '어떻게 성공할까?'보다 '어떻게 실패를 피할까?'를 먼저 생각. 2. 인간 심리 편향을 경계하라. 3. 좋은 기업을 기다리며 집중 투자하라." },
  { emoji:"📚", title:"존 보글의 인덱스 투자 철학: 단순함이 이긴다", desc:"뱅가드 창업자이자 인덱스 펀드의 아버지 존 보글이 평생 강조한 저비용 장기 인덱스 투자의 원칙을 정리합니다.", svg: SvgBogle, body:"보글의 핵심 메시지: '시장을 이길 수 없다면, 시장 자체를 소유하라.' 대부분의 액티브 펀드 매니저들이 장기적으로 인덱스 펀드를 이기지 못하며, 그 이유는 비용 때문입니다.\n\n'비용이 이긴다(Costs Matter)': 수수료 1%가 30년 후 운용 자산의 25%를 갉아먹습니다. '아무것도 하지 말고 그냥 있어라(Don't just do something, stand there)' — 잦은 매매가 수익을 갉아먹는다는 조언입니다." },
  { emoji:"♾️", title:"복리의 마법: 시간이 가장 큰 자산인 이유", desc:"아인슈타인이 '세계 8번째 불가사의'라고 부른 복리의 원리와 장기 투자에서 시간이 왜 핵심인지 설명합니다.", svg: SvgCompound, body:"복리(Compound Interest)는 이자에 이자가 붙는 효과입니다. 연 10% 수익률 기준: 10년 후 원금의 2.6배, 20년 후 6.7배, 30년 후 17.4배, 40년 후 45.3배가 됩니다.\n\n투자 시작 시점이 결정적입니다. 복리의 핵심: '시간 × 일관성 × 수익률.' 버핏 자산의 95%는 65세 이후에 쌓였습니다 — 복리가 뒤로 갈수록 폭발적으로 커지기 때문입니다." },
  { emoji:"🎨", title:"포트폴리오 구성의 기초: 분산투자와 리밸런싱", desc:"달걀을 한 바구니에 담지 마라는 원칙을 실제 포트폴리오에 적용하는 구체적인 방법을 설명합니다.", svg: SvgPortfolio, body:"분산투자는 서로 상관관계가 낮은 자산에 나눠 투자해 전체 포트폴리오의 변동성을 줄이는 전략입니다.\n\n기초 포트폴리오 예시: 성장형 — 주식 80% + 채권 20%. 안정형 — 주식 60% + 채권 30% + 현금 10%. 리밸런싱: 목표 비중에서 벗어난 자산을 원래 비중으로 되돌리는 작업. 연 1~2회 실시하는 것이 일반적입니다." },
  { emoji:"✅", title:"대가들이 말하는 좋은 주식 선별 기준 10가지", desc:"버핏·린치·멍거·보글이 공통으로 강조한 우량주 선별 핵심 기준을 하나의 체크리스트로 정리합니다.", svg: SvgChecklist, body:"1. 강력한 경쟁 해자(Moat) — 브랜드, 특허, 네트워크 효과.\n2. 일관된 이익 성장 — 최소 5~10년간 EPS 증가 추세.\n3. 높은 자기자본이익률(ROE) — 15% 이상이 이상적.\n4. 낮은 부채비율 — 장기부채/자기자본 50% 이하.\n5. 자유현금흐름(FCF) 창출.\n6. 주주 친화적 경영진 — 자사주 매입, 배당 증가 이력.\n7. 합리적인 밸류에이션.\n8. 이해 가능한 사업 모델.\n9. 강력한 브랜드 인지도.\n10. 장기 성장 산업에 위치." },
  { emoji:"🔍", title:"벤저민 그레이엄의 가치투자: 안전마진의 원칙", desc:"워렌 버핏의 스승 벤저민 그레이엄이 창안한 가치투자와 '안전마진' 개념을 초보자 눈높이로 설명합니다.", svg: SvgGraham, body:"그레이엄은 주식을 '사업의 소유권'으로 보고, 내재 가치(Intrinsic Value)보다 충분히 낮은 가격에 살 때만 매수하라고 했습니다. 이 차이를 '안전마진(Margin of Safety)'이라고 합니다.\n\n핵심 원칙: 시장을 '미스터 마켓'이라 불렀습니다 — 매일 감정적으로 가격을 제시하는 조울증 환자 같은 존재. 현명한 투자자는 미스터 마켓의 감정에 흔들리지 않고 내재 가치에 집중합니다." },
  { emoji:"🌱", title:"필립 피셔의 성장주 투자: 스커틀버트와 15가지 원칙", desc:"성장주 투자의 선구자 필립 피셔가 수십 년간 정제한 우수 성장 기업 발굴법과 체크리스트를 설명합니다.", svg: SvgFisher, body:"피셔는 그레이엄의 정량 분석과 달리 기업의 질적 특성에 집중했습니다. '스커틀버트(Scuttlebutt)' 방법: 고객, 경쟁사, 납품업체, 전직 직원 등을 직접 인터뷰해 기업의 실제 모습을 파악하는 것입니다.\n\n15가지 원칙 중 핵심: 1. 매출 성장 잠재력이 수년간 지속될 제품/서비스가 있는가? 2. R&D 투자가 충분한가? 3. 경영진의 정직성과 능력은? 버핏은 자신을 '85% 그레이엄, 15% 피셔'라고 표현했습니다." },
  { emoji:"🌊", title:"레이 달리오의 올웨더 포트폴리오: 모든 경제 환경에서 살아남기", desc:"세계 최대 헤지펀드 브리지워터 창업자 레이 달리오가 설계한 '어떤 경제 환경에서도 무너지지 않는' 포트폴리오를 설명합니다.", svg: SvgAllWeather, body:"달리오는 경제 환경을 4가지로 분류했습니다: 성장 상승·하강 × 인플레이션 상승·하강. 각 환경에서 잘 수행하는 자산을 균형 있게 배분하면 어떤 환경에서도 큰 손실 없이 장기 성장할 수 있다는 개념입니다.\n\n올웨더 배분: 주식 30% + 장기국채 40% + 중기국채 15% + 금 7.5% + 원자재 7.5%. 1926~2013년 기준 연평균 9.7% 수익, 최대 손실 -3.93%를 기록했습니다." },
  { emoji:"⏰", title:"하워드 막스의 시장 사이클 이론: 어디에 서 있는지 알기", desc:"오크트리 캐피털 창업자 하워드 막스가 강조하는 시장 사이클 인식과 역발상 투자의 핵심을 설명합니다.", svg: SvgCycle, body:"막스는 '가장 중요한 것(The Most Important Thing)'에서 시장이 항상 사이클을 따른다고 말합니다. 투자자들의 탐욕과 공포가 반복하면서 주식이 과열과 침체를 반복합니다.\n\n실무 원칙: '지금 우리가 어디에 있는지' 알아야 합니다. 가격이 좋을 때 공격적으로, 나쁠 때 방어적으로. 시장이 낙관적일 때 위험을 더 느끼고, 비관적일 때 기회를 찾아라." },
  { emoji:"🧭", title:"장기 투자 마인드셋: 대가들이 공통으로 강조하는 것", desc:"버핏·린치·멍거·보글이 수십 년간 반복해서 강조한 장기 투자자의 핵심 마인드셋을 정리합니다.", svg: SvgMindset, body:"모든 투자 대가들이 공통으로 강조하는 것:\n\n1. 인내심: '주식시장은 참을성 없는 사람의 돈을 참을성 있는 사람에게 이전하는 장치다.' — 버핏. 2. 단순함: 복잡한 전략보다 단순하고 검증된 방법이 더 효과적입니다. 3. 감정 통제: 시장 하락 시 공황 매도는 최악의 실수입니다. 4. 지속적 학습: 모든 대가들은 평생 독서와 공부를 멈추지 않았습니다. 5. 장기 관점: '10년 이상 보유하지 않을 주식이라면 10분도 보유하지 마라.'" },
];

const SECTIONS = [
  { id: "basics",  badge: "투자 기초 지식",  color: M, articles: BASICS  },
  { id: "masters", badge: "투자 대가 전략",  color: G, articles: MASTERS },
];

function ArticleItem({ article, color }: { article: Article; color: string }) {
  const [open, setOpen] = useState(false);
  const Svg = article.svg;
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start gap-3 p-3.5 active:opacity-80 transition-opacity"
        style={{ background: "var(--card)" }}
      >
        <span className="text-2xl flex-shrink-0 leading-none mt-0.5">{article.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold leading-snug" style={{ color: "var(--text)" }}>
            {article.title}
          </p>
          <p className="text-[11px] mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
            {article.desc}
          </p>
        </div>
        {open
          ? <ChevronUp  className="w-4 h-4 flex-shrink-0 mt-1 opacity-50" style={{ color: "var(--muted)" }} />
          : <ChevronDown className="w-4 h-4 flex-shrink-0 mt-1 opacity-50" style={{ color: "var(--muted)" }} />
        }
      </button>
      {open && (
        <div
          className="px-4 pb-4 pt-3"
          style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}
        >
          {Svg && <Svg />}
          <p className="text-[12px] leading-relaxed whitespace-pre-line" style={{ color: "var(--text)" }}>
            {article.body}
          </p>
        </div>
      )}
    </div>
  );
}

function SectionBlock({ id, badge, color, articles }: typeof SECTIONS[number]) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? articles : articles.slice(0, 1);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: `${color}18`, color }}
        >
          {badge}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {visible.map((article, i) => (
          <ArticleItem key={i} article={article} color={color} />
        ))}
      </div>
      {!expanded && articles.length > 1 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-2 w-full py-2.5 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 active:opacity-80 transition-opacity"
          style={{ background: `${color}10`, color, border: `1px solid ${color}30` }}
        >
          <ChevronDown className="w-3.5 h-3.5" />
          더보기 ({articles.length - 1}개 글 더 보기)
        </button>
      )}
      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-2 w-full py-2.5 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 active:opacity-80 transition-opacity"
          style={{ background: `${color}10`, color, border: `1px solid ${color}30` }}
        >
          <ChevronUp className="w-3.5 h-3.5" />
          접기
        </button>
      )}
    </div>
  );
}

export function InvestmentArticles() {
  return (
    <div className="flex flex-col gap-6">
      {SECTIONS.map((s) => (
        <SectionBlock key={s.id} {...s} />
      ))}
    </div>
  );
}
