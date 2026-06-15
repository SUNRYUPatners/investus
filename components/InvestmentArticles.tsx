"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════
   SVG ILLUSTRATIONS
══════════════════════════════════════════════════════════════════ */

function StockSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Company building */}
      <polygon points="22,46 62,16 102,46" fill="rgba(0,229,160,0.12)" stroke="rgba(0,229,160,0.3)" strokeWidth="1.2"/>
      <rect x="28" y="46" width="68" height="72" rx="2" fill="rgba(0,229,160,0.07)" stroke="rgba(0,229,160,0.25)" strokeWidth="1.2"/>
      <rect x="40" y="56" width="13" height="11" rx="1.5" fill="rgba(0,229,160,0.3)"/>
      <rect x="59" y="56" width="13" height="11" rx="1.5" fill="rgba(0,229,160,0.2)"/>
      <rect x="40" y="73" width="13" height="11" rx="1.5" fill="rgba(0,229,160,0.25)"/>
      <rect x="59" y="73" width="13" height="11" rx="1.5" fill="rgba(0,229,160,0.35)"/>
      <rect x="48" y="90" width="18" height="28" rx="1.5" fill="rgba(0,229,160,0.15)"/>
      <text x="62" y="126" textAnchor="middle" fontSize="8" fill="rgba(0,229,160,0.7)" fontWeight="700">기업</text>
      {/* Arrow */}
      <line x1="108" y1="70" x2="136" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="5,3"/>
      <polygon points="134,65 142,70 134,75" fill="rgba(255,255,255,0.2)"/>
      <text x="122" y="64" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)">매수</text>
      {/* Pie chart - ownership */}
      <circle cx="200" cy="65" r="44" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      {/* Other shareholders big slice */}
      <path d="M200 65 L200 21 A44 44 0 1 1 164.8 87 Z" fill="rgba(255,255,255,0.07)"/>
      {/* My tiny slice highlighted */}
      <path d="M200 65 L200 21 A44 44 0 0 0 164.8 87 Z" fill="rgba(212,175,55,0.5)"/>
      <circle cx="200" cy="65" r="19" fill="rgba(6,6,14,0.85)"/>
      <text x="200" y="62" textAnchor="middle" fontSize="7" fill="rgba(212,175,55,0.9)" fontWeight="700">나의</text>
      <text x="200" y="72" textAnchor="middle" fontSize="7" fill="rgba(212,175,55,0.9)" fontWeight="700">지분</text>
      <text x="200" y="116" textAnchor="middle" fontSize="8" fill="rgba(212,175,55,0.7)" fontWeight="600">소유권 일부</text>
    </svg>
  );
}

function HeatmapSVG() {
  const cells = [
    { x:22,  y:20, w:56, h:36, fill:"rgba(34,197,94,0.6)",   label:"+3.2%", name:"기술" },
    { x:84,  y:20, w:50, h:36, fill:"rgba(34,197,94,0.35)",  label:"+1.8%", name:"헬스케어" },
    { x:140, y:20, w:44, h:36, fill:"rgba(248,113,113,0.5)", label:"-2.1%", name:"에너지" },
    { x:190, y:20, w:68, h:36, fill:"rgba(34,197,94,0.5)",   label:"+2.7%", name:"금융" },
    { x:22,  y:62, w:44, h:32, fill:"rgba(248,113,113,0.35)",label:"-0.9%", name:"소재" },
    { x:72,  y:62, w:62, h:32, fill:"rgba(34,197,94,0.7)",   label:"+4.1%", name:"소비재" },
    { x:140, y:62, w:50, h:32, fill:"rgba(248,113,113,0.6)", label:"-3.4%", name:"부동산" },
    { x:196, y:62, w:62, h:32, fill:"rgba(34,197,94,0.25)",  label:"+0.6%", name:"유틸리티" },
    { x:22,  y:100,w:80, h:24, fill:"rgba(248,113,113,0.45)",label:"-1.5%", name:"통신" },
    { x:108, y:100,w:56, h:24, fill:"rgba(34,197,94,0.55)",  label:"+3.8%", name:"산업재" },
    { x:170, y:100,w:88, h:24, fill:"rgba(248,113,113,0.28)",label:"-0.4%", name:"필수소비재" },
  ];
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {cells.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="3" fill={c.fill}/>
          <text x={c.x + c.w/2} y={c.y + c.h/2 - 5} textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)" fontWeight="700">{c.label}</text>
          <text x={c.x + c.w/2} y={c.y + c.h/2 + 8} textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.65)">{c.name}</text>
        </g>
      ))}
    </svg>
  );
}

function BondSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Grid lines */}
      {[30,55,80,105].map(y => <line key={y} x1="40" y1={y} x2="248" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>)}
      <line x1="40" y1="108" x2="248" y2="108" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <line x1="40" y1="18" x2="40" y2="110" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      {/* X axis labels */}
      <text x="70"  y="120" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">1년</text>
      <text x="120" y="120" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">5년</text>
      <text x="180" y="120" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">10년</text>
      <text x="240" y="120" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">30년</text>
      {/* Y axis */}
      <text x="34" y="110" textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.4)">0</text>
      <text x="34" y="80"  textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.4)">50%</text>
      <text x="34" y="42"  textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.4)">100%</text>
      {/* Stock line - volatile */}
      <polyline points="40,90 70,58 90,75 110,45 130,72 150,38 170,62 190,30 210,50 240,28"
        stroke="rgba(248,113,113,0.8)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Bond line - steady */}
      <polyline points="40,102 70,96 110,88 150,80 190,70 240,58"
        stroke="rgba(0,229,160,0.8)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Labels */}
      <text x="244" y="25" fontSize="7.5" fill="rgba(248,113,113,0.9)" fontWeight="700">주식</text>
      <text x="244" y="54" fontSize="7.5" fill="rgba(0,229,160,0.9)" fontWeight="700">채권</text>
      <text x="140" y="12" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)" fontWeight="600">수익 비교 (30년)</text>
    </svg>
  );
}

function FuturesSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Timeline */}
      <line x1="30" y1="75" x2="250" y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
      {/* Today */}
      <circle cx="60" cy="75" r="8" fill="rgba(0,229,160,0.6)" stroke="rgba(0,229,160,0.9)" strokeWidth="1.5"/>
      <text x="60" y="60" textAnchor="middle" fontSize="8" fill="rgba(0,229,160,0.9)" fontWeight="700">오늘</text>
      <text x="60" y="98" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.5)">계약 체결</text>
      {/* Contract box */}
      <rect x="85" y="60" width="110" height="30" rx="5" fill="rgba(212,175,55,0.12)" stroke="rgba(212,175,55,0.4)" strokeWidth="1.2" strokeDasharray="4,2"/>
      <text x="140" y="73" textAnchor="middle" fontSize="7.5" fill="rgba(212,175,55,0.9)" fontWeight="700">📄 계약서</text>
      <text x="140" y="84" textAnchor="middle" fontSize="6.5" fill="rgba(212,175,55,0.7)">3개월 후 $50에 매수</text>
      {/* Future point */}
      <circle cx="220" cy="75" r="8" fill="rgba(129,140,248,0.6)" stroke="rgba(129,140,248,0.9)" strokeWidth="1.5"/>
      <text x="220" y="60" textAnchor="middle" fontSize="8" fill="rgba(129,140,248,0.9)" fontWeight="700">3개월 후</text>
      <text x="220" y="98" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.5)">인도·정산</text>
      {/* Price arrows */}
      <text x="220" y="24" textAnchor="middle" fontSize="7.5" fill="rgba(34,197,94,0.9)" fontWeight="700">실제가 $62</text>
      <line x1="220" y1="27" x2="220" y2="64" stroke="rgba(34,197,94,0.5)" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="62" y="24" textAnchor="middle" fontSize="7.5" fill="rgba(212,175,55,0.9)" fontWeight="700">계약가 $50</text>
      <line x1="62" y1="27" x2="62" y2="64" stroke="rgba(212,175,55,0.5)" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="140" y="118" textAnchor="middle" fontSize="8" fill="rgba(34,197,94,0.8)" fontWeight="600">수익 +$12 (가격 상승 시)</text>
    </svg>
  );
}

function CpiSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Shopping cart */}
      <path d="M28 35 L38 35 L50 80 L100 80 L112 50 L38 50" stroke="rgba(212,175,55,0.7)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="56" cy="88" r="5" fill="rgba(212,175,55,0.6)"/>
      <circle cx="96" cy="88" r="5" fill="rgba(212,175,55,0.6)"/>
      {/* Items in cart */}
      <line x1="65" y1="50" x2="65" y2="78" stroke="rgba(212,175,55,0.3)" strokeWidth="1"/>
      <line x1="80" y1="50" x2="80" y2="78" stroke="rgba(212,175,55,0.3)" strokeWidth="1"/>
      <line x1="95" y1="50" x2="95" y2="78" stroke="rgba(212,175,55,0.3)" strokeWidth="1"/>
      {/* Price bars over time */}
      <text x="155" y="16" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)" fontWeight="600">물가 상승 추이</text>
      <line x1="128" y1="108" x2="258" y2="108" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <line x1="128" y1="108" x2="128" y2="22" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      {/* Bars */}
      {[
        { x:138, h:45, year:"2020", val:"100" },
        { x:160, h:52, year:"2021", val:"104" },
        { x:182, h:62, year:"2022", val:"113" },
        { x:204, h:70, year:"2023", val:"120" },
        { x:226, h:75, year:"2024", val:"125" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={108-b.h} width="18" height={b.h} rx="2" fill={`rgba(248,113,113,${0.3 + i*0.08})`}/>
          <text x={b.x+9} y={108-b.h-4} textAnchor="middle" fontSize="6.5" fill="rgba(248,113,113,0.9)" fontWeight="600">{b.val}</text>
          <text x={b.x+9} y="118" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.4)">{b.year}</text>
        </g>
      ))}
      {/* Trend line */}
      <polyline points="147,63 169,56 191,46 213,38 235,33"
        stroke="rgba(248,113,113,0.7)" strokeWidth="1.5" fill="none" strokeDasharray="3,2"/>
      <text x="130" y="22" fontSize="7" fill="rgba(255,255,255,0.4)">지수</text>
    </svg>
  );
}

function EtfSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Individual stocks (left) */}
      <text x="55" y="14" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontWeight="600">개별 주식</text>
      {[
        { y:22, name:"AAPL", ret:"+2.1%", c:"rgba(0,229,160,0.5)" },
        { y:42, name:"MSFT", ret:"+1.4%", c:"rgba(0,229,160,0.4)" },
        { y:62, name:"AMZN", ret:"-0.8%", c:"rgba(248,113,113,0.5)" },
        { y:82, name:"NVDA", ret:"+5.2%", c:"rgba(0,229,160,0.6)" },
        { y:102,name:"TSLA", ret:"-2.3%", c:"rgba(248,113,113,0.4)" },
      ].map((s, i) => (
        <g key={i}>
          <rect x="10" y={s.y} width="90" height="17" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          <text x="22" y={s.y+12} fontSize="8.5" fill="rgba(255,255,255,0.8)" fontWeight="700">{s.name}</text>
          <text x="90" y={s.y+12} textAnchor="end" fontSize="8" fill={s.c} fontWeight="600">{s.ret}</text>
        </g>
      ))}
      {/* Arrow */}
      <line x1="106" y1="65" x2="132" y2="65" stroke="rgba(129,140,248,0.5)" strokeWidth="2"/>
      <polygon points="130,60 140,65 130,70" fill="rgba(129,140,248,0.5)"/>
      <text x="119" y="58" textAnchor="middle" fontSize="7" fill="rgba(129,140,248,0.7)">묶기</text>
      {/* ETF basket (right) */}
      <rect x="146" y="22" width="120" height="90" rx="8" fill="rgba(129,140,248,0.1)" stroke="rgba(129,140,248,0.35)" strokeWidth="1.5"/>
      <text x="206" y="38" textAnchor="middle" fontSize="9" fill="rgba(129,140,248,0.9)" fontWeight="800">ETF</text>
      <text x="206" y="52" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.5)">S&amp;P 500</text>
      <text x="206" y="64" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">500개 기업 포함</text>
      <text x="206" y="76" textAnchor="middle" fontSize="6.5" fill="rgba(0,229,160,0.7)">수수료 0.03%/년</text>
      <text x="206" y="90" textAnchor="middle" fontSize="8" fill="rgba(212,175,55,0.9)" fontWeight="700">+1.6%</text>
      <text x="206" y="104" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.4)">오늘 수익률</text>
    </svg>
  );
}

function PerSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* PER formula */}
      <rect x="14" y="14" width="118" height="54" rx="6" fill="rgba(0,229,160,0.07)" stroke="rgba(0,229,160,0.25)" strokeWidth="1.2"/>
      <text x="73" y="30" textAnchor="middle" fontSize="8.5" fill="rgba(0,229,160,0.8)" fontWeight="700">PER (주가수익비율)</text>
      <text x="73" y="46" textAnchor="middle" fontSize="11" fill="rgba(0,229,160,0.95)" fontWeight="800">주가 ÷ EPS</text>
      <text x="73" y="60" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.45)">주가 ÷ 주당순이익</text>
      {/* PBR formula */}
      <rect x="148" y="14" width="118" height="54" rx="6" fill="rgba(212,175,55,0.07)" stroke="rgba(212,175,55,0.25)" strokeWidth="1.2"/>
      <text x="207" y="30" textAnchor="middle" fontSize="8.5" fill="rgba(212,175,55,0.8)" fontWeight="700">PBR (주가순자산비율)</text>
      <text x="207" y="46" textAnchor="middle" fontSize="11" fill="rgba(212,175,55,0.95)" fontWeight="800">주가 ÷ BPS</text>
      <text x="207" y="60" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.45)">주가 ÷ 주당순자산</text>
      {/* Example */}
      <rect x="14" y="76" width="252" height="44" rx="6" fill="rgba(255,255,255,0.04)"/>
      <text x="140" y="90" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.6)" fontWeight="600">예시: 애플 주가 $190 / EPS $6.5</text>
      <text x="140" y="103" textAnchor="middle" fontSize="10" fill="rgba(129,140,248,0.9)" fontWeight="800">PER = 29배  →  29년치 이익이 주가에 반영</text>
      <text x="140" y="116" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.4)">낮을수록 저평가 가능성 (업종 평균과 비교)</text>
    </svg>
  );
}

function DividendSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Company */}
      <rect x="14" y="30" width="60" height="70" rx="3" fill="rgba(0,229,160,0.07)" stroke="rgba(0,229,160,0.25)" strokeWidth="1.2"/>
      <polygon points="10,30 44,8 78,30" fill="rgba(0,229,160,0.1)" stroke="rgba(0,229,160,0.2)" strokeWidth="1"/>
      <rect x="24" y="42" width="11" height="9" rx="1" fill="rgba(0,229,160,0.25)"/>
      <rect x="40" y="42" width="11" height="9" rx="1" fill="rgba(0,229,160,0.3)"/>
      <rect x="24" y="56" width="11" height="9" rx="1" fill="rgba(0,229,160,0.2)"/>
      <rect x="40" y="56" width="11" height="9" rx="1" fill="rgba(0,229,160,0.35)"/>
      <rect x="30" y="72" width="18" height="28" rx="1" fill="rgba(0,229,160,0.15)"/>
      <text x="44" y="108" textAnchor="middle" fontSize="7.5" fill="rgba(0,229,160,0.65)" fontWeight="600">기업</text>
      {/* Falling coins */}
      {[
        { x:108, y:36, delay:0 }, { x:128, y:46, delay:0 }, { x:120, y:26, delay:0 },
        { x:148, y:38, delay:0 }, { x:138, y:58, delay:0 },
      ].map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r="8" fill="rgba(212,175,55,0.45)" stroke="rgba(212,175,55,0.6)" strokeWidth="1"/>
          <text x={c.x} y={c.y+3} textAnchor="middle" fontSize="7" fill="rgba(212,175,55,0.9)" fontWeight="800">$</text>
        </g>
      ))}
      {/* Investor */}
      <circle cx="210" cy="52" r="14" fill="rgba(129,140,248,0.2)" stroke="rgba(129,140,248,0.4)" strokeWidth="1.5"/>
      <text x="210" y="57" textAnchor="middle" fontSize="14">👤</text>
      <text x="210" y="78" textAnchor="middle" fontSize="7.5" fill="rgba(129,140,248,0.8)" fontWeight="600">투자자</text>
      {/* Info */}
      <rect x="14" y="112" width="252" height="14" rx="4" fill="rgba(212,175,55,0.08)"/>
      <text x="140" y="122" textAnchor="middle" fontSize="7.5" fill="rgba(212,175,55,0.8)" fontWeight="600">분기마다 배당금 지급 → 재투자하면 복리 효과!</text>
    </svg>
  );
}

function StartSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Steps */}
      {[
        { step:1, x:10,  y:95,  w:48, color:"rgba(0,229,160,0.5)",  icon:"🏦", label:"증권사\n계좌개설" },
        { step:2, x:64,  y:72,  w:48, color:"rgba(0,229,160,0.55)", icon:"📝", label:"본인인증\nKYC" },
        { step:3, x:118, y:50,  w:48, color:"rgba(0,229,160,0.6)",  icon:"💵", label:"달러\n환전" },
        { step:4, x:172, y:28,  w:48, color:"rgba(212,175,55,0.6)", icon:"🔍", label:"종목\n선택" },
        { step:5, x:226, y:8,   w:44, color:"rgba(212,175,55,0.7)", icon:"✅", label:"매수\n주문" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={s.y} width={s.w} height={120-s.y} rx="3" fill={s.color}/>
          <text x={s.x+s.w/2} y={s.y+16} textAnchor="middle" fontSize="14">{s.icon}</text>
          <text x={s.x+s.w/2} y={s.y+30} textAnchor="middle" fontSize="6.5" fill="rgba(0,0,0,0.8)" fontWeight="700">{s.label.split("\n")[0]}</text>
          <text x={s.x+s.w/2} y={s.y+40} textAnchor="middle" fontSize="6.5" fill="rgba(0,0,0,0.7)">{s.label.split("\n")[1]}</text>
          <circle cx={s.x+s.w/2} cy={s.y-10} r="8" fill={s.color} stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          <text x={s.x+s.w/2} y={s.y-6} textAnchor="middle" fontSize="8" fill="rgba(0,0,0,0.9)" fontWeight="800">{s.step}</text>
        </g>
      ))}
    </svg>
  );
}

function BuffettSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Snowball growing */}
      <text x="140" y="14" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontWeight="600">복리의 마법 — 시간이 쌓일수록 눈덩이처럼</text>
      <circle cx="46" cy="95" r="10" fill="rgba(0,229,160,0.25)" stroke="rgba(0,229,160,0.4)" strokeWidth="1.5"/>
      <text x="46" y="99" textAnchor="middle" fontSize="7" fill="rgba(0,229,160,0.8)" fontWeight="700">$1만</text>
      <text x="46" y="112" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">10년</text>
      <circle cx="110" cy="85" r="18" fill="rgba(0,229,160,0.3)" stroke="rgba(0,229,160,0.5)" strokeWidth="1.5"/>
      <text x="110" y="89" textAnchor="middle" fontSize="7.5" fill="rgba(0,229,160,0.9)" fontWeight="700">$2.6만</text>
      <text x="110" y="112" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">20년</text>
      <circle cx="180" cy="70" r="28" fill="rgba(0,229,160,0.35)" stroke="rgba(0,229,160,0.6)" strokeWidth="1.5"/>
      <text x="180" y="74" textAnchor="middle" fontSize="8" fill="rgba(0,229,160,0.95)" fontWeight="700">$6.7만</text>
      <text x="180" y="112" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">30년</text>
      <circle cx="252" cy="48" r="38" fill="rgba(212,175,55,0.35)" stroke="rgba(212,175,55,0.7)" strokeWidth="2"/>
      <text x="252" y="44" textAnchor="middle" fontSize="8.5" fill="rgba(212,175,55,0.95)" fontWeight="800">$17.4만</text>
      <text x="252" y="56" textAnchor="middle" fontSize="7" fill="rgba(212,175,55,0.75)">연 10%</text>
      <text x="252" y="112" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">40년</text>
    </svg>
  );
}

function MungerSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      <text x="140" y="14" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontWeight="600">다중 사고 모델 — 여러 분야 지식으로 더 나은 결정</text>
      {/* Center */}
      <circle cx="140" cy="72" r="22" fill="rgba(212,175,55,0.2)" stroke="rgba(212,175,55,0.5)" strokeWidth="2"/>
      <text x="140" y="69" textAnchor="middle" fontSize="8" fill="rgba(212,175,55,0.95)" fontWeight="700">의사</text>
      <text x="140" y="80" textAnchor="middle" fontSize="8" fill="rgba(212,175,55,0.95)" fontWeight="700">결정</text>
      {/* Surrounding nodes */}
      {[
        { cx:60,  cy:36,  label:"심리학", emoji:"🧠" },
        { cx:220, cy:36,  label:"수학",   emoji:"📐" },
        { cx:40,  cy:96,  label:"경제학", emoji:"📊" },
        { cx:240, cy:96,  label:"역사",   emoji:"📚" },
        { cx:140, cy:120, label:"물리학", emoji:"⚛️" },
      ].map((n, i) => (
        <g key={i}>
          <line x1={n.cx} y1={n.cy} x2={140} y2={72} stroke="rgba(212,175,55,0.2)" strokeWidth="1.2" strokeDasharray="4,2"/>
          <circle cx={n.cx} cy={n.cy} r="16" fill="rgba(129,140,248,0.12)" stroke="rgba(129,140,248,0.4)" strokeWidth="1.2"/>
          <text x={n.cx} y={n.cy-3} textAnchor="middle" fontSize="10">{n.emoji}</text>
          <text x={n.cx} y={n.cy+11} textAnchor="middle" fontSize="6.5" fill="rgba(129,140,248,0.9)" fontWeight="600">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

function LynchSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      <text x="140" y="14" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontWeight="600">10루타 — 일상 속에서 위대한 기업을 먼저 발견하라</text>
      {/* Consumer experience */}
      <rect x="14" y="24" width="75" height="90" rx="6" fill="rgba(0,229,160,0.07)" stroke="rgba(0,229,160,0.2)" strokeWidth="1.2"/>
      <text x="51" y="38" textAnchor="middle" fontSize="11">🛍️</text>
      <text x="51" y="52" textAnchor="middle" fontSize="7" fill="rgba(0,229,160,0.8)" fontWeight="700">소비자로서</text>
      <text x="51" y="63" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.5)">자주 쓰는</text>
      <text x="51" y="73" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.5)">제품 발견</text>
      <text x="51" y="90" textAnchor="middle" fontSize="10">☕🍔👟</text>
      <text x="51" y="106" textAnchor="middle" fontSize="6.5" fill="rgba(0,229,160,0.6)">스타벅스, 맥도날드...</text>
      {/* Arrow */}
      <polygon points="94,69 106,64 106,74" fill="rgba(255,255,255,0.2)"/>
      <line x1="92" y1="69" x2="104" y2="69" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
      {/* Chart - 10x return */}
      <text x="185" y="28" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontWeight="600">주가 추이</text>
      <line x1="114" y1="108" x2="252" y2="108" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <line x1="114" y1="108" x2="114" y2="24" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <polyline points="114,102 134,98 154,90 174,78 194,62 214,40 234,26 252,18"
        stroke="rgba(212,175,55,0.8)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <circle cx="252" cy="18" r="4" fill="rgba(212,175,55,0.9)"/>
      <text x="248" y="13" textAnchor="end" fontSize="8" fill="rgba(212,175,55,0.9)" fontWeight="800">×10</text>
      <text x="114" y="118" fontSize="6.5" fill="rgba(255,255,255,0.3)">매수</text>
      <text x="246" y="118" textAnchor="end" fontSize="6.5" fill="rgba(255,255,255,0.3)">10년 후</text>
    </svg>
  );
}

function BogleSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      <text x="140" y="14" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontWeight="600">비용의 차이가 30년 후 수익을 결정한다</text>
      {/* Axes */}
      <line x1="36" y1="108" x2="260" y2="108" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      <line x1="36" y1="108" x2="36" y2="22" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      {/* Y labels */}
      <text x="30" y="110" textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.35)">$0</text>
      <text x="30" y="78"  textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.35)">$5만</text>
      <text x="30" y="46"  textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.35)">$10만</text>
      <text x="30" y="24"  textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.35)">$15만</text>
      {/* Index fund line (low cost wins) */}
      <polyline points="36,102 80,92 120,78 160,58 200,38 250,22"
        stroke="rgba(0,229,160,0.85)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Active fund line (fees drag it down) */}
      <polyline points="36,102 80,96 120,88 160,76 200,65 250,58"
        stroke="rgba(248,113,113,0.75)" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="6,3"/>
      {/* Labels */}
      <rect x="152" y="20" width="94" height="14" rx="3" fill="rgba(0,229,160,0.12)"/>
      <text x="199" y="30" textAnchor="middle" fontSize="7.5" fill="rgba(0,229,160,0.9)" fontWeight="700">인덱스 펀드 (수수료 0.03%)</text>
      <rect x="152" y="56" width="94" height="14" rx="3" fill="rgba(248,113,113,0.1)"/>
      <text x="199" y="66" textAnchor="middle" fontSize="7.5" fill="rgba(248,113,113,0.9)" fontWeight="700">액티브 펀드 (수수료 1.5%)</text>
      {/* X axis labels */}
      <text x="36"  y="118" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.3)">현재</text>
      <text x="140" y="118" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.3)">15년</text>
      <text x="248" y="118" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.3)">30년</text>
      {/* Gap annotation */}
      <line x1="250" y1="22" x2="250" y2="58" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2,2"/>
      <text x="262" y="40" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.6)" fontWeight="700">차이</text>
    </svg>
  );
}

function MarksSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      <text x="140" y="14" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontWeight="600">시장 사이클 — 공포와 탐욕은 반복된다</text>
      {/* Sine-like cycle */}
      <path d="M18,75 C38,75 48,28 68,28 C88,28 98,75 118,75 C138,75 148,122 168,122 C188,122 198,75 218,75 C238,75 248,28 262,28"
        stroke="rgba(129,140,248,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Labels on cycle */}
      <circle cx="68"  cy="28"  r="5" fill="rgba(248,113,113,0.8)"/>
      <circle cx="118" cy="75"  r="5" fill="rgba(255,255,255,0.3)"/>
      <circle cx="168" cy="122" r="5" fill="rgba(34,197,94,0.8)"/>
      <circle cx="218" cy="75"  r="5" fill="rgba(255,255,255,0.3)"/>
      <circle cx="262" cy="28"  r="5" fill="rgba(248,113,113,0.8)"/>
      <text x="68"  y="22"  textAnchor="middle" fontSize="7" fill="rgba(248,113,113,0.9)" fontWeight="700">탐욕 고점</text>
      <text x="118" cy="69" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.5)">중간</text>
      <text x="168" y="128" textAnchor="middle" fontSize="8.5" fill="rgba(34,197,94,0.95)" fontWeight="800">🎯 매수 기회</text>
      <text x="218" cy="69" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.5)">중간</text>
      <text x="262" y="22"  textAnchor="middle" fontSize="7" fill="rgba(248,113,113,0.9)" fontWeight="700">다음 고점</text>
      {/* Investor sentiment */}
      <text x="68"  y="50"  textAnchor="middle" fontSize="6.5" fill="rgba(248,113,113,0.7)">😱 "다 팔아!"</text>
      <text x="168" y="110" textAnchor="middle" fontSize="6.5" fill="rgba(34,197,94,0.8)">😨 "세상 끝?"</text>
    </svg>
  );
}

function DalioSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      <text x="140" y="14" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)" fontWeight="600">올웨더 포트폴리오 — 어떤 경제 환경에서도 균형</text>
      {/* Donut chart segments */}
      {/* Long bonds 40% - from top (270°) clockwise */}
      <path d="M140 72 L140 32 A40 40 0 0 1 174.6 92 Z" fill="rgba(0,229,160,0.55)"/>
      {/* Stocks 30% */}
      <path d="M140 72 L174.6 92 A40 40 0 0 1 110 108.7 Z" fill="rgba(129,140,248,0.6)"/>
      {/* Short/Med bonds 15% */}
      <path d="M140 72 L110 108.7 A40 40 0 0 1 101.2 46.8 Z" fill="rgba(212,175,55,0.6)"/>
      {/* Gold 7.5% */}
      <path d="M140 72 L101.2 46.8 A40 40 0 0 1 118.1 33.2 Z" fill="rgba(248,113,113,0.6)"/>
      {/* Commodities 7.5% */}
      <path d="M140 72 L118.1 33.2 A40 40 0 0 1 140 32 Z" fill="rgba(251,191,36,0.6)"/>
      {/* Center hole */}
      <circle cx="140" cy="72" r="20" fill="rgba(6,6,14,0.85)"/>
      <text x="140" y="69" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.7)" fontWeight="700">ALL</text>
      <text x="140" y="79" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.7)" fontWeight="700">WEATHER</text>
      {/* Legend */}
      {[
        { color:"rgba(0,229,160,0.7)",   label:"장기국채  40%" },
        { color:"rgba(129,140,248,0.7)", label:"주식        30%" },
        { color:"rgba(212,175,55,0.7)",  label:"중단기채  15%" },
        { color:"rgba(248,113,113,0.7)", label:"금           7.5%" },
        { color:"rgba(251,191,36,0.7)",  label:"원자재     7.5%" },
      ].map((l, i) => (
        <g key={i}>
          <rect x="196" y={22 + i*20} width="9" height="9" rx="2" fill={l.color}/>
          <text x="209" y={31 + i*20} fontSize="7.5" fill="rgba(255,255,255,0.7)">{l.label}</text>
        </g>
      ))}
    </svg>
  );
}

function DiverSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Left: Concentrated (one stock, big) */}
      <rect x="22" y="30" width="90" height="78" rx="6" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.2)" strokeWidth="1"/>
      <text x="67" y="48" textAnchor="middle" fontSize="7.5" fill="rgba(239,68,68,0.7)" fontWeight="700">집중투자</text>
      <rect x="50" y="56" width="34" height="44" rx="3" fill="rgba(239,68,68,0.4)"/>
      <text x="67" y="83" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.9)" fontWeight="700">TSLA</text>
      <text x="67" y="94" textAnchor="middle" fontSize="7" fill="rgba(239,68,68,0.9)">100%</text>
      <text x="67" y="120" textAnchor="middle" fontSize="7" fill="rgba(239,68,68,0.6)">고위험</text>
      {/* Arrow */}
      <text x="140" y="70" textAnchor="middle" fontSize="16" fill="rgba(255,255,255,0.2)">→</text>
      {/* Right: Diversified */}
      <rect x="162" y="30" width="96" height="78" rx="6" fill="rgba(0,229,160,0.06)" stroke="rgba(0,229,160,0.2)" strokeWidth="1"/>
      <text x="210" y="48" textAnchor="middle" fontSize="7.5" fill="rgba(0,229,160,0.8)" fontWeight="700">분산투자</text>
      {[
        { x:170, label:"AAPL", pct:"25%", h:28 },
        { x:192, label:"NVDA", pct:"20%", h:22 },
        { x:214, label:"SPY", pct:"30%", h:33 },
        { x:236, label:"BND", pct:"15%", h:16 },
        { x:248, label:"GLD", pct:"10%", h:11 },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={100 - b.h} width="14" height={b.h} rx="2" fill={`rgba(0,229,160,${0.3 + i*0.06})`}/>
          <text x={b.x+7} y="113" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.55)">{b.label}</text>
        </g>
      ))}
      <text x="210" y="120" textAnchor="middle" fontSize="7" fill="rgba(0,229,160,0.7)">저위험</text>
    </svg>
  );
}

function DCASVG() {
  const pts = [
    { x:40, y:80, price:"$80" },
    { x:72, y:100, price:"$60" },
    { x:104, y:60, price:"$100" },
    { x:136, y:90, price:"$70" },
    { x:168, y:50, price:"$110" },
    { x:200, y:40, price:"$120" },
    { x:232, y:30, price:"$130" },
  ];
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {[100,80,60,40].map(y => <line key={y} x1="32" y1={y} x2="260" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>)}
      <path d={pathD} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="rgba(0,229,160,0.7)" stroke="rgba(0,229,160,0.3)" strokeWidth="1.5"/>
          <line x1={p.x} y1={p.y+4} x2={p.x} y2="116" stroke="rgba(0,229,160,0.2)" strokeWidth="1" strokeDasharray="2,2"/>
          <text x={p.x} y="124" textAnchor="middle" fontSize="5.5" fill="rgba(0,229,160,0.55)">{p.price}</text>
        </g>
      ))}
      <line x1="32" y1="76" x2="260" y2="76" stroke="rgba(212,175,55,0.5)" strokeWidth="1" strokeDasharray="5,3"/>
      <text x="265" y="79" fontSize="6.5" fill="rgba(212,175,55,0.8)">평균</text>
      <text x="140" y="18" textAnchor="middle" fontSize="8" fill="rgba(0,229,160,0.7)" fontWeight="700">매월 일정금액 자동매수 (DCA)</text>
    </svg>
  );
}

function CompoundSVG() {
  const compoundPts = [0,1,2,3,4,5,6,7,8,9,10].map(i => ({
    x: 30 + i * 22,
    yCompound: 110 - Math.pow(1.1, i) * 8,
    ySimple:   110 - (1 + i * 0.1) * 8,
  }));
  const compPath = compoundPts.map((p,i) => `${i===0?"M":"L"}${p.x},${p.yCompound}`).join(" ");
  const simpPath = compoundPts.map((p,i) => `${i===0?"M":"L"}${p.x},${p.ySimple}`).join(" ");
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      <line x1="28" y1="15" x2="28" y2="112" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <line x1="28" y1="112" x2="262" y2="112" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <path d={simpPath} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeDasharray="5,3"/>
      <path d={compPath} stroke="rgba(0,229,160,0.8)" strokeWidth="2" fill="none"/>
      <circle cx={compoundPts[10].x} cy={compoundPts[10].yCompound} r="4" fill="rgba(0,229,160,0.9)"/>
      <circle cx={compoundPts[10].x} cy={compoundPts[10].ySimple} r="3" fill="rgba(255,255,255,0.4)"/>
      <text x="250" y={compoundPts[10].yCompound - 8} textAnchor="middle" fontSize="6.5" fill="rgba(0,229,160,0.9)" fontWeight="700">복리</text>
      <text x="250" y={compoundPts[10].ySimple + 14} textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.4)">단리</text>
      <text x="140" y="18" textAnchor="middle" fontSize="8" fill="rgba(212,175,55,0.8)" fontWeight="700">복리 vs 단리 — 시간이 지날수록 차이 폭발적 증가</text>
      {["1년","3년","5년","7년","10년"].map((l,i) => (
        <text key={l} x={30 + (i+1)*22*2} y="123" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.3)">{l}</text>
      ))}
    </svg>
  );
}

function PsychSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Emotion cycle */}
      <path d="M30 100 Q 60 30 100 45 Q 140 60 160 40 Q 190 20 220 50 Q 240 65 258 100"
        stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none"/>
      {[
        { x:30, y:100, label:"공포", sub:"매도 충동", color:"rgba(239,68,68,0.8)" },
        { x:100, y:45, label:"흥분", sub:"FOMO 매수", color:"rgba(251,191,36,0.8)" },
        { x:160, y:40, label:"과신", sub:"레버리지", color:"rgba(251,191,36,0.9)" },
        { x:220, y:50, label:"불안", sub:"손절 고민", color:"rgba(239,68,68,0.6)" },
        { x:258, y:100, label:"포기", sub:"최저점 매도", color:"rgba(239,68,68,0.9)" },
      ].map((pt, i) => (
        <g key={i}>
          <circle cx={pt.x} cy={pt.y} r="5" fill={pt.color}/>
          <text x={pt.x} y={pt.y - 10} textAnchor="middle" fontSize="7" fill={pt.color} fontWeight="700">{pt.label}</text>
          <text x={pt.x} y={pt.y - 19} textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.4)">{pt.sub}</text>
        </g>
      ))}
      <text x="140" y="120" textAnchor="middle" fontSize="7.5" fill="rgba(0,229,160,0.7)" fontWeight="600">원칙을 세우면 감정 사이클에서 벗어날 수 있다</text>
    </svg>
  );
}

function TaxSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Dollar to Won */}
      <circle cx="52" cy="55" r="28" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.3)" strokeWidth="1.5"/>
      <text x="52" y="51" textAnchor="middle" fontSize="16" fill="rgba(34,197,94,0.9)" fontWeight="900">$</text>
      <text x="52" y="67" textAnchor="middle" fontSize="7.5" fill="rgba(34,197,94,0.7)">달러 수익</text>
      <text x="105" y="58" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.2)">→</text>
      <circle cx="152" cy="55" r="28" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.3)" strokeWidth="1.5"/>
      <text x="152" y="51" textAnchor="middle" fontSize="14" fill="rgba(251,191,36,0.9)" fontWeight="900">₩</text>
      <text x="152" y="67" textAnchor="middle" fontSize="7.5" fill="rgba(251,191,36,0.7)">원화 환산</text>
      {/* Tax breakdown */}
      <rect x="195" y="22" width="68" height="18" rx="3" fill="rgba(0,229,160,0.3)"/>
      <text x="229" y="35" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.9)" fontWeight="700">수익 250만원 이하 비과세</text>
      <rect x="195" y="46" width="68" height="18" rx="3" fill="rgba(239,68,68,0.35)"/>
      <text x="229" y="59" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.9)" fontWeight="700">초과분 × 22% 양도세</text>
      <rect x="195" y="70" width="68" height="18" rx="3" fill="rgba(99,102,241,0.3)"/>
      <text x="229" y="83" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.9)" fontWeight="700">배당 15% 미국 원천징수</text>
      <text x="140" y="115" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.35)">환율 상승 = 추가 수익 / 환율 하락 = 수익 감소</text>
    </svg>
  );
}

function RiskSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {/* Risk/Return chart */}
      <line x1="30" y1="15" x2="30" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <line x1="30" y1="110" x2="260" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      <text x="26" y="112" textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.35)">0</text>
      <text x="140" y="124" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.35)">위험(리스크) →</text>
      <text x="20" y="65" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.35)" transform="rotate(-90,20,65)">기대 수익률 →</text>
      {[
        { x:55,  y:95, r:6,  label:"현금·예금",  color:"rgba(255,255,255,0.3)" },
        { x:90,  y:80, r:8,  label:"채권",       color:"rgba(99,102,241,0.7)" },
        { x:130, y:65, r:10, label:"배당주",      color:"rgba(251,191,36,0.7)" },
        { x:175, y:48, r:12, label:"성장주",      color:"rgba(0,229,160,0.8)" },
        { x:220, y:32, r:9,  label:"레버리지",    color:"rgba(239,68,68,0.8)" },
      ].map((a, i) => (
        <g key={i}>
          <circle cx={a.x} cy={a.y} r={a.r} fill={a.color}/>
          <text x={a.x} y={a.y + a.r + 10} textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.65)">{a.label}</text>
        </g>
      ))}
      <path d="M 45 100 Q 140 75 235 28" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" strokeDasharray="4,3"/>
    </svg>
  );
}

function FinancialSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      <text x="140" y="13" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.35)" fontWeight="600">3대 재무제표</text>
      <rect x="22" y="22" width="68" height="72" rx="4" fill="rgba(0,229,160,0.12)" stroke="rgba(0,229,160,0.4)" strokeWidth="1"/>
      <text x="56" y="37" textAnchor="middle" fontSize="7.5" fill="rgba(0,229,160,0.9)" fontWeight="700">손익계산서</text>
      <text x="56" y="55" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.75)" fontWeight="700">P/L</text>
      <text x="56" y="70" textAnchor="middle" fontSize="6.5" fill="rgba(0,229,160,0.65)">매출 · 이익</text>
      <text x="56" y="82" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.3)">얼마 벌었나</text>
      <rect x="106" y="22" width="68" height="72" rx="4" fill="rgba(212,175,55,0.1)" stroke="rgba(212,175,55,0.4)" strokeWidth="1"/>
      <text x="140" y="37" textAnchor="middle" fontSize="7.5" fill="rgba(212,175,55,0.9)" fontWeight="700">대차대조표</text>
      <text x="140" y="55" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.75)" fontWeight="700">B/S</text>
      <text x="140" y="70" textAnchor="middle" fontSize="6.5" fill="rgba(212,175,55,0.65)">자산 · 부채 · 자본</text>
      <text x="140" y="82" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.3)">무엇을 갖고 있나</text>
      <rect x="190" y="22" width="68" height="72" rx="4" fill="rgba(96,165,250,0.1)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
      <text x="224" y="37" textAnchor="middle" fontSize="7.5" fill="rgba(96,165,250,0.9)" fontWeight="700">현금흐름표</text>
      <text x="224" y="55" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.75)" fontWeight="700">CF</text>
      <text x="224" y="70" textAnchor="middle" fontSize="6.5" fill="rgba(96,165,250,0.65)">영업 · 투자 · 재무</text>
      <text x="224" y="82" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.3)">현금이 흐르나</text>
      <text x="140" y="118" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.2)">셋을 함께 봐야 기업의 진짜 건강 상태가 보인다</text>
    </svg>
  );
}

function ValuationSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      <rect x="20" y="16" width="240" height="28" rx="5" fill="rgba(0,229,160,0.08)" stroke="rgba(0,229,160,0.5)" strokeWidth="1.5" strokeDasharray="6,3"/>
      <text x="140" y="27" textAnchor="middle" fontSize="7" fill="rgba(0,229,160,0.8)" fontWeight="700">내재가치 (Intrinsic Value)</text>
      <text x="140" y="40" textAnchor="middle" fontSize="11" fill="rgba(0,229,160,0.9)" fontWeight="800">$100</text>
      <rect x="20" y="48" width="240" height="20" rx="3" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" strokeDasharray="4,3"/>
      <text x="140" y="61" textAnchor="middle" fontSize="7.5" fill="rgba(239,68,68,0.75)" fontWeight="700">안전마진 구간 (Margin of Safety) — 30%</text>
      <rect x="20" y="72" width="240" height="28" rx="5" fill="rgba(212,175,55,0.15)" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5"/>
      <text x="140" y="83" textAnchor="middle" fontSize="7" fill="rgba(212,175,55,0.8)" fontWeight="700">매수 가격 (Purchase Price)</text>
      <text x="140" y="96" textAnchor="middle" fontSize="11" fill="rgba(212,175,55,0.9)" fontWeight="800">$70</text>
      <text x="140" y="120" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.2)">내재가치보다 현저히 낮은 가격에서만 매수한다</text>
    </svg>
  );
}

function RebalanceSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      <text x="140" y="14" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.35)" fontWeight="600">포트폴리오 리밸런싱</text>
      <text x="25" y="30" fontSize="7" fill="rgba(239,68,68,0.7)" fontWeight="700">리밸런싱 전 (주식 과다)</text>
      <rect x="25" y="34" width="165" height="17" rx="3" fill="rgba(239,68,68,0.45)"/>
      <text x="107" y="46" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)" fontWeight="700">주식 75%</text>
      <rect x="192" y="34" width="63" height="17" rx="3" fill="rgba(96,165,250,0.4)"/>
      <text x="223" y="46" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)" fontWeight="700">채권 25%</text>
      <text x="140" y="72" textAnchor="middle" fontSize="9" fill="rgba(212,175,55,0.55)">↓ 리밸런싱 실행</text>
      <text x="25" y="90" fontSize="7" fill="rgba(0,229,160,0.7)" fontWeight="700">리밸런싱 후 (목표 복원)</text>
      <rect x="25" y="94" width="132" height="17" rx="3" fill="rgba(0,229,160,0.45)"/>
      <text x="91" y="106" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)" fontWeight="700">주식 60%</text>
      <rect x="159" y="94" width="96" height="17" rx="3" fill="rgba(96,165,250,0.4)"/>
      <text x="207" y="106" textAnchor="middle" fontSize="7.5" fill="rgba(255,255,255,0.9)" fontWeight="700">채권 40%</text>
      <text x="140" y="124" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.2)">목표 비중 이탈 시 연 1~2회 조정</text>
    </svg>
  );
}

function GrahamSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      <line x1="35" y1="15" x2="35" y2="108" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <text x="30" y="20" textAnchor="end" fontSize="6.5" fill="rgba(255,255,255,0.3)">$100</text>
      <text x="30" y="55" textAnchor="end" fontSize="6.5" fill="rgba(255,255,255,0.3)">$70</text>
      <text x="30" y="85" textAnchor="end" fontSize="6.5" fill="rgba(255,255,255,0.3)">$50</text>
      <line x1="35" y1="18" x2="256" y2="18" stroke="rgba(0,229,160,0.7)" strokeWidth="1.5" strokeDasharray="8,3"/>
      <text x="260" y="21" fontSize="6.5" fill="rgba(0,229,160,0.9)" fontWeight="700">내재가치</text>
      <rect x="35" y="18" width="221" height="36" fill="rgba(239,68,68,0.06)"/>
      <text x="145" y="39" textAnchor="middle" fontSize="7.5" fill="rgba(239,68,68,0.6)" fontWeight="600">안전마진 30% 구간</text>
      <line x1="35" y1="54" x2="256" y2="54" stroke="rgba(212,175,55,0.8)" strokeWidth="2"/>
      <text x="260" y="57" fontSize="6.5" fill="rgba(212,175,55,0.9)" fontWeight="700">매수가</text>
      <polyline points="35,75 65,62 90,79 120,54 150,70 190,48 230,65 256,42"
        stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <text x="145" y="120" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.2)">미스터 마켓 — 시장가는 내재가치 주변을 등락한다</text>
    </svg>
  );
}

function FisherSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      {[30,55,80,105].map(y => <line key={y} x1="30" y1={y} x2="256" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
      <line x1="30" y1="108" x2="256" y2="108" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      <line x1="30" y1="15" x2="30" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      {(["1년","5년","10년","20년"] as string[]).map((label, i) => (
        <text key={label} x={58 + i * 56} y="120" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.3)">{label}</text>
      ))}
      <polyline points="30,106 58,98 114,88 170,76 226,64"
        stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="5,3"/>
      <text x="230" y="61" fontSize="6.5" fill="rgba(255,255,255,0.35)">평균</text>
      <polyline points="30,106 58,96 114,78 170,50 226,20"
        stroke="rgba(0,229,160,0.9)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="230" y="17" fontSize="6.5" fill="rgba(0,229,160,0.9)" fontWeight="700">우량성장주</text>
      <text x="143" y="12" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.35)" fontWeight="600">피셔: 탁월한 기업을 영원히 보유하라</text>
    </svg>
  );
}

function RogersSVG() {
  return (
    <svg viewBox="0 0 280 130" fill="none" className="w-full h-auto">
      <rect width="280" height="130" rx="10" fill="rgba(0,0,0,0.3)"/>
      <text x="140" y="12" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.35)" fontWeight="600">원자재 가격 사이클 (15~20년 주기)</text>
      <line x1="25" y1="88" x2="256" y2="88" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <line x1="25" y1="20" x2="25" y2="92" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      <polyline points="25,78 55,50 85,26 115,54 145,78 175,50 205,23 235,50 256,38"
        stroke="rgba(251,146,60,0.85)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="55" y="104" textAnchor="middle" fontSize="6.5" fill="rgba(251,146,60,0.8)">강세장</text>
      <text x="130" y="104" textAnchor="middle" fontSize="6.5" fill="rgba(239,68,68,0.7)">약세장</text>
      <text x="215" y="104" textAnchor="middle" fontSize="6.5" fill="rgba(251,146,60,0.8)">강세장</text>
      <text x="85" y="20" textAnchor="middle" fontSize="6.5" fill="rgba(251,146,60,0.65)">고점</text>
      <text x="145" y="93" textAnchor="middle" fontSize="6.5" fill="rgba(239,68,68,0.7)">저점 (매수 기회)</text>
      <text x="205" y="17" textAnchor="middle" fontSize="6.5" fill="rgba(251,146,60,0.65)">고점</text>
      <text x="140" y="120" textAnchor="middle" fontSize="6.5" fill="rgba(255,255,255,0.2)">로저스: 약세장 저점에서 사서 강세장에 판다</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ARTICLE DATA
══════════════════════════════════════════════════════════════════ */

type Article = {
  id: string;
  title: string;
  summary: string;
  svg: React.ReactNode;
  points: { label: string; text: string }[];
};

const BASICS: Article[] = [
  {
    id: "stock",
    title: "📈 주식이란?",
    summary: "기업의 작은 주인이 되는 것",
    svg: <StockSVG />,
    points: [
      { label: "한 줄 정의", text: "주식은 기업이 자금 조달을 위해 발행하는 소유권 증서입니다. 애플 주식 1주를 사면 당신은 애플의 아주 작은 공동 소유자가 됩니다." },
      { label: "가격이 움직이는 이유", text: "기업 실적 발표, 금리 변동, 경제 뉴스, 투자자 심리에 따라 사고 싶은 사람과 팔고 싶은 사람의 비율이 바뀌면서 주가가 실시간으로 변합니다." },
      { label: "수익을 내는 방법", text: "① 시세 차익 — $100에 사서 $150에 팔면 $50 이익 ② 배당금 — 기업이 벌어들인 이익 일부를 주주에게 현금으로 지급" },
      { label: "초보자 핵심 원칙", text: "이해할 수 있는 사업을 하는 좋은 기업을 합리적 가격에 사서 오래 보유하는 것이 장기 투자의 가장 검증된 방법입니다." },
    ],
  },
  {
    id: "heatmap",
    title: "🗺️ 히트맵이란?",
    summary: "색깔 하나로 시장 전체를 한눈에",
    svg: <HeatmapSVG />,
    points: [
      { label: "한 줄 정의", text: "히트맵은 수백 개의 주식 수익률을 색깔로 표현한 시각화 도구입니다. 초록색은 상승, 빨간색은 하락을 나타내며, 색이 진할수록 변화폭이 큽니다." },
      { label: "어디에 쓰나", text: "시장 전체의 흐름을 5초 만에 파악할 수 있습니다. 어느 섹터(기술, 에너지, 헬스케어 등)가 강하고 약한지, 오늘 시장 분위기가 어떤지 바로 확인 가능합니다." },
      { label: "읽는 법", text: "① 크기 — 시가총액이 클수록 네모가 큼 ② 색 — 초록(상승)/빨강(하락) ③ 밝기 — 진할수록 변화폭 큼. 예: 밝은 초록 = 큰 폭 상승" },
      { label: "활용 팁", text: "시장이 전반적으로 빨간색인데 특정 섹터만 초록이라면 그 섹터로 투자 자금이 몰리고 있다는 신호입니다. 대표 사이트: Finviz.com" },
    ],
  },
  {
    id: "bond",
    title: "📜 채권이란?",
    summary: "국가·기업에게 돈을 빌려주고 이자 받기",
    svg: <BondSVG />,
    points: [
      { label: "한 줄 정의", text: "채권은 국가나 기업이 돈을 빌리기 위해 발행하는 차용증입니다. 내가 채권을 사면 발행자에게 돈을 빌려준 것이고, 만기에 원금 + 이자를 받습니다." },
      { label: "주식과의 차이", text: "주식은 기업 소유권이고 수익이 불확실합니다. 채권은 고정 이자를 받는 계약이라 수익이 예측 가능하고 안정적이지만, 대신 수익률이 낮습니다." },
      { label: "금리와의 관계", text: "금리가 오르면 기존 채권(낮은 이자율)의 매력이 떨어져 채권 가격이 하락합니다. 반대로 금리가 내리면 채권 가격이 오릅니다. 금리와 채권 가격은 반대 방향입니다." },
      { label: "초보자 활용법", text: "포트폴리오의 일부(예: 20-40%)를 채권에 배분하면 주식 폭락 시 완충재 역할을 합니다. 대표 ETF: TLT(미국 20년 국채), AGG(종합 채권)" },
    ],
  },
  {
    id: "futures",
    title: "📆 선물(Futures)이란?",
    summary: "미래 가격을 오늘 미리 정해두는 계약",
    svg: <FuturesSVG />,
    points: [
      { label: "한 줄 정의", text: "선물은 특정 자산을 미래의 정해진 날짜에, 오늘 합의한 가격으로 거래하기로 약속하는 계약입니다. 주식, 원유, 금, 농산물 등 거의 모든 자산에 적용됩니다." },
      { label: "실생활 비유", text: "김치찌개 재료인 배추 농장주와 음식점 주인이 '3개월 후에 배추를 지금 가격으로 사기로' 계약하는 것과 같습니다. 가격 변동 위험을 미리 없애는 것입니다." },
      { label: "투자에서의 역할", text: "① 헤지(리스크 제거) — 기업이 원자재 가격 변동 위험 방어 ② 투기 — 가격 방향에 베팅해 레버리지 수익 추구 ③ 가격 발견 — 시장 기대를 미리 반영" },
      { label: "주의사항", text: "선물은 레버리지 상품이라 소액으로 큰 포지션을 잡을 수 있습니다. 예상과 반대로 움직이면 손실이 투자금보다 커질 수 있어 초보자에게는 위험합니다." },
    ],
  },
  {
    id: "cpi",
    title: "🛒 CPI (소비자물가지수)란?",
    summary: "인플레이션을 측정하는 경제 온도계",
    svg: <CpiSVG />,
    points: [
      { label: "한 줄 정의", text: "CPI(Consumer Price Index)는 소비자가 일상적으로 구매하는 식료품, 에너지, 주거비 등의 물가 변화를 지수로 나타낸 것입니다. 매월 미국 노동부가 발표합니다." },
      { label: "투자에 왜 중요한가", text: "CPI가 높으면(인플레이션) 연방준비제도(Fed)가 금리를 올립니다. 금리가 오르면 기업 비용 증가 + 채권 매력 상승으로 주가가 하락하는 경향이 있습니다." },
      { label: "발표 때 시장이 반응하는 이유", text: "예상보다 CPI가 높게 나오면 → '금리 더 올리겠구나' → 주가 하락. 예상보다 낮게 나오면 → '금리 곧 내리겠다' → 주가 상승. 발표 직후 시장이 요동치는 이유입니다." },
      { label: "확인 방법", text: "미국 노동부 홈페이지(bls.gov) 또는 investing.com의 경제 캘린더에서 CPI 발표 일정과 수치를 무료로 확인할 수 있습니다." },
    ],
  },
  {
    id: "etf",
    title: "🧺 ETF란?",
    summary: "주식 바구니 하나로 500개 기업에 투자",
    svg: <EtfSVG />,
    points: [
      { label: "한 줄 정의", text: "ETF(Exchange-Traded Fund)는 여러 주식을 한데 묶어 주식처럼 거래소에 상장한 금융 상품입니다. SPY 1주를 사면 S&P 500에 속한 미국 대표 기업 500개에 동시 투자됩니다." },
      { label: "개별 주식 대비 장점", text: "① 분산투자 — 한 기업이 망해도 포트폴리오 타격 미미 ② 낮은 수수료 — 연 0.03~0.1% 수준 ③ 소액 투자 가능 ④ 주식처럼 실시간 매매 가능" },
      { label: "대표 ETF", text: "• SPY / VOO — S&P 500 (미국 대형주 500개) • QQQ — 나스닥 100 (기술주 중심) • VTI — 미국 전체 주식 시장 • VEA — 미국 제외 선진국 주식" },
      { label: "초보자 추천 전략", text: "VOO나 VTI 같은 시장 전체 인덱스 ETF에 매월 일정 금액씩 정기 투자(Dollar-Cost Averaging)하면 타이밍 걱정 없이 시장 평균 수익을 추구할 수 있습니다." },
    ],
  },
  {
    id: "per",
    title: "🔢 PER·PBR이란?",
    summary: "주식이 비싼지 싼지 판단하는 잣대",
    svg: <PerSVG />,
    points: [
      { label: "PER (주가수익비율)", text: "주가 ÷ 주당순이익(EPS). 'PER 20배'는 현재 이익 기준으로 20년치 이익이 주가에 녹아있다는 뜻. 성장주는 높고(50배+), 가치주는 낮습니다(10~15배)." },
      { label: "PBR (주가순자산비율)", text: "주가 ÷ 주당순자산(BPS). 'PBR 1배'는 기업이 가진 자산 가치 그대로 거래된다는 뜻. 1배 이하면 자산보다 싸게 팔린다는 의미로 저평가 신호일 수 있습니다." },
      { label: "주의할 점", text: "PER이 낮다고 무조건 좋은 것은 아닙니다. 실적이 악화될 위기라 낮을 수도 있습니다. 반드시 같은 업종의 평균값, 과거 추세와 비교해야 의미 있습니다." },
      { label: "함께 보면 좋은 지표", text: "• ROE — 자본 대비 수익률 (높을수록 좋음) • 부채비율 — 낮을수록 재무 안정 • 영업이익률 — 본업 경쟁력 확인. PER/PBR은 시작점, 나머지로 검증하세요." },
    ],
  },
  {
    id: "dividend",
    title: "💰 배당이란?",
    summary: "기업 이익을 주주에게 나눠주는 현금 선물",
    svg: <DividendSVG />,
    points: [
      { label: "한 줄 정의", text: "배당은 기업이 벌어들인 이익 중 일부를 주주에게 현금(또는 주식)으로 나눠주는 것입니다. 미국 기업은 대부분 분기마다(3개월마다) 배당을 지급합니다." },
      { label: "배당수익률", text: "배당수익률 = 연간 배당금 ÷ 주가 × 100. 예를 들어 $100짜리 주식이 연간 $3 배당 → 배당수익률 3%. 시중 금리와 비교해 투자 매력도를 판단합니다." },
      { label: "배당성장주의 매력", text: "코카콜라, J&J 같은 '배당 귀족주'는 20년 이상 매년 배당금을 늘려왔습니다. 배당금이 복리로 쌓이면 초기 투자금 대비 수익률(YOC)이 수십 %로 불어납니다." },
      { label: "배당 재투자 전략 (DRIP)", text: "받은 배당금으로 주식을 다시 매수하면 복리 효과가 극대화됩니다. $10,000를 배당수익률 4% 주식에 30년간 배당 재투자하면 원금의 3~5배 이상으로 불어납니다." },
    ],
  },
  {
    id: "start",
    title: "🚀 미국주식 시작하기",
    summary: "계좌 개설부터 첫 매수까지 5단계",
    svg: <StartSVG />,
    points: [
      { label: "1단계: 증권사 선택", text: "국내 증권사(키움, 미래에셋, 삼성증권)는 한국어 지원으로 편리합니다. 미국 현지 브로커(Fidelity, Schwab)는 수수료가 낮고 상품이 다양합니다. 처음엔 국내 증권사 추천." },
      { label: "2단계: 환전 & 달러 준비", text: "원화 → 달러로 환전이 필요합니다. 증권사 앱 내 환전 기능을 이용하거나 인터넷 뱅킹으로 환전 후 이체. 환율 스프레드(수수료)를 확인하세요. 수시로 소액씩 환전하는 것이 좋습니다." },
      { label: "3단계: 종목 선택", text: "처음엔 개별 주식보다 ETF(VOO, QQQ)가 안전합니다. 직접 종목을 고르려면 사업을 이해하고 재무제표를 확인하세요. 뉴스에 흔들려 충동 매수하지 않는 것이 핵심입니다." },
      { label: "4단계: 주문 & 세금", text: "시장가 주문(즉시 체결)보다 지정가 주문(원하는 가격 입력)을 권장합니다. 세금: 미국주식 양도소득세는 연간 250만원 초과 수익의 22%, 5월에 직접 신고해야 합니다." },
    ],
  },
  {
    id: "diversification",
    title: "분산투자 — 리스크를 줄이는 핵심 원칙",
    summary: "달걀을 한 바구니에 담지 말라",
    svg: <DiverSVG />,
    points: [
      { label: "분산의 원리", text: "한 종목이 -50% 하락해도, 다른 자산이 상승하면 전체 포트폴리오 손실을 크게 줄일 수 있습니다. 개별 종목 리스크(비시장 리스크)는 분산으로 제거 가능합니다." },
      { label: "섹터 분산", text: "기술주 + 금융 + 헬스케어 + 에너지 + 소비재를 골고루 보유하면, 한 섹터가 무너져도 전체 충격을 완화합니다. 같은 방향으로 움직이는 종목만 모아두면 분산 효과가 없습니다." },
      { label: "자산군 분산", text: "주식 + 채권 + 금 + 현금을 조합하면, 주식이 급락하는 위기 시 채권·금이 방어 역할을 합니다. 2020년 코로나 폭락 때 금은 오히려 상승했습니다." },
      { label: "ETF로 쉽게", text: "SPY(S&P500) 하나를 사면 애플·MS·엔비디아 등 500개 기업에 자동 분산됩니다. 개별 종목 공부 없이도 시장 평균 수익률을 추구할 수 있는 가장 쉬운 방법입니다." },
    ],
  },
  {
    id: "dca",
    title: "달러 비용 평균법 (DCA) — 타이밍 대신 시간으로",
    summary: "매달 일정 금액, 꾸준히 매수하는 전략",
    svg: <DCASVG />,
    points: [
      { label: "DCA란?", text: "시장 가격에 상관없이 매달 일정 금액(예: 50만원)을 자동으로 매수하는 방법입니다. 가격이 높을 때는 적게, 가격이 낮을 때는 많이 사게 되어 자연스럽게 평균 단가를 낮춥니다." },
      { label: "왜 효과적?", text: "\"시장 바닥을 정확히 알고 투자할 수 있다면\" 일시투자가 유리합니다. 하지만 현실에서는 불가능합니다. DCA는 '언제 살지' 고민하는 심리적 부담을 없애 줍니다." },
      { label: "구체적 예시", text: "A주식 가격 $100일 때 $100 투자 → 1주 취득. 다음 달 가격 $50일 때 $100 투자 → 2주 취득. 총 3주를 $200에 매수, 평균단가 $66. 현재 가격 $75이면 이미 수익권." },
      { label: "자동화 팁", text: "증권사 '정기 매수' 기능을 이용하면 자동으로 DCA가 됩니다. 매월 월급날 자동 이체 + 자동 매수 설정 → 아무 생각 없이도 장기 자산 형성이 가능합니다." },
    ],
  },
  {
    id: "compound",
    title: "복리의 마법 — 시간이 돈을 만드는 원리",
    summary: "아인슈타인이 '8번째 불가사의'라 부른 것",
    svg: <CompoundSVG />,
    points: [
      { label: "복리 vs 단리", text: "단리: 원금 1000만원 × 연10% = 매년 100만원씩 증가 → 10년 후 2000만원. 복리: 이자가 원금에 합산되어 재투자 → 10년 후 2593만원. 차이는 작아 보이지만, 30년 후엔 1744만원 vs 17449만원." },
      { label: "72의 법칙", text: "72 ÷ 연간수익률 = 원금이 2배 되는 기간. 연 10% 수익률이면 7.2년마다 원금이 2배. 연 6%면 12년, 연 12%면 6년. S&P500 역사적 평균 연수익률은 약 10%입니다." },
      { label: "시간이 핵심", text: "25세에 1000만원 투자, 65세까지 40년 → 10% 복리 = 4억 5천만원. 35세에 시작하면 같은 기간 30년 → 1억 7천만원. 10년의 차이가 3배 결과를 만듭니다. 시작이 빠를수록 유리합니다." },
      { label: "수수료의 함정", text: "복리는 수수료에도 적용됩니다. 연 수익률 10%에서 운용보수 2%를 빼면 실수익 8%. 30년 후 차이는 원금의 3배 이상. ETF는 보통 연 0.03~0.2%로 매우 저렴합니다." },
    ],
  },
  {
    id: "psychology",
    title: "투자 심리 함정 — 돈을 잃게 만드는 뇌의 버그",
    summary: "행동재무학이 밝혀낸 투자자의 흔한 실수",
    svg: <PsychSVG />,
    points: [
      { label: "손실 회피 편향", text: "+100만원 이익보다 -100만원 손실이 심리적으로 2배 더 아프습니다(Kahneman). 때문에 손실 종목을 오래 들고, 이익 종목은 빨리 파는 '잘못된 매도 패턴'이 생깁니다. 손절의 기준을 미리 정해두세요." },
      { label: "FOMO (상승 추격)", text: "Fear Of Missing Out — 급등한 종목 뉴스를 보며 '나만 못 탔다'는 두려움에 고점에서 매수합니다. 주식은 오르면 올수록 위험도 함께 높아집니다. 이미 오른 버스는 다음 버스를 기다리세요." },
      { label: "확증 편향", text: "내가 산 종목의 좋은 뉴스만 눈에 들어오고, 나쁜 신호는 무시합니다. 의도적으로 반대 의견을 찾아보는 습관을 만들어야 합니다. '이 주식을 왜 팔아야 하나?'를 항상 질문하세요." },
      { label: "해결책", text: "① 매수/매도 기준을 글로 미리 써두기 ② 포트폴리오 목표 비중 정하고 리밸런싱 ③ 하루에 한 번 이상 주가 확인하지 않기 ④ 투자 일지 작성 — 감정이 아닌 원칙으로 결정하세요." },
    ],
  },
  {
    id: "tax",
    title: "미국주식 세금·환율 기초",
    summary: "세후 실수익률이 진짜 수익률입니다",
    svg: <TaxSVG />,
    points: [
      { label: "양도소득세", text: "해외 주식 매도 이익이 연간 250만원을 초과하면, 초과분에 22%(양도세 20% + 지방세 2%)를 납부합니다. 국내 해외 주식형 펀드·ETF(국내 상장)는 다른 세율이 적용될 수 있습니다." },
      { label: "배당소득세", text: "미국 배당금은 미국 세법에 따라 15% 원천징수 후 지급됩니다. 한국에서 금융소득 합산(배당+이자)이 연 2000만원 초과 시 종합소득세 대상이 됩니다." },
      { label: "환율 효과", text: "달러 강세(원/달러 환율 상승) → 달러 수익을 원화로 바꿀 때 추가 이익. 달러 약세 → 수익 감소. 예: $1000 수익, 매수 시 1200원/달러, 매도 시 1400원/달러 → +16.7% 환율 수익 추가." },
      { label: "절세 전략", text: "① 손실 종목 연말 매도 → 이익과 손익 상계(손익통산) ② 연간 250만원 비과세 한도 활용 ③ IRP·ISA 계좌 활용 ④ 배우자 증여(10년간 6억 공제) 후 매도로 절세 가능." },
    ],
  },
  {
    id: "riskreturn",
    title: "리스크와 수익률 — 공짜 점심은 없다",
    summary: "높은 수익에는 반드시 높은 리스크가 따릅니다",
    svg: <RiskSVG />,
    points: [
      { label: "리스크-수익 트레이드오프", text: "예금은 리스크 거의 없지만 수익률도 낮습니다. 성장주는 수익률이 높지만 변동성도 큽니다. 레버리지 ETF는 단기에 2~3배 오를 수 있지만, 같은 속도로 내려갈 수도 있습니다." },
      { label: "변동성(Volatility)", text: "주가가 얼마나 크게 오르내리는지를 나타냅니다. 표준편차로 측정. S&P500 연간 변동성 약 15~20%, 개별 성장주는 30~60%+. 변동성이 크면 단기에 큰 손실을 볼 수 있습니다." },
      { label: "자신의 리스크 허용도", text: "주가 -30% 하락 시 잠을 못 잔다면 공격적인 포트폴리오는 맞지 않습니다. 투자금의 일시적 절반 손실도 견딜 수 있다면 높은 기대 수익률을 추구할 수 있습니다. 자신의 허용 범위를 먼저 파악하세요." },
      { label: "포트폴리오 구성 원칙", text: "주식 비중 = (100 - 나이)%가 전통적 기준. 20대: 주식 80%, 채권·안전자산 20%. 50대: 주식 50%, 채권 50%. 공격적 투자자는 비중을 더 높이고, 보수적이면 낮추세요." },
    ],
  },
  {
    id: "financials",
    title: "📋 재무제표 읽기",
    summary: "기업의 건강 상태를 확인하는 3가지 필수 보고서",
    svg: <FinancialSVG />,
    points: [
      { label: "3대 재무제표 개요", text: "상장 기업은 분기마다 세 가지 필수 재무보고서를 공시합니다. ① 손익계산서(P/L, Income Statement) — 기간 동안 얼마를 벌고 얼마를 썼는지 ② 대차대조표(B/S, Balance Sheet) — 특정 시점에 기업이 가진 자산·부채·자본 ③ 현금흐름표(CF, Cash Flow Statement) — 현금이 어디서 들어오고 어디로 나가는지. 셋을 함께 봐야 기업의 완전한 재무 건강 상태가 보입니다." },
      { label: "손익계산서 핵심 지표", text: "매출(Revenue)에서 매출원가를 빼면 매출총이익, 다시 판관비를 빼면 영업이익(Operating Income), 이자·세금까지 빼면 순이익(Net Income)이 됩니다. 영업이익률(영업이익÷매출×100)이 꾸준히 높고 성장하는 기업이 좋은 투자 대상입니다. 엔비디아의 영업이익률은 55%를 상회하고, 알파벳(구글)은 약 28%를 유지합니다." },
      { label: "현금흐름표가 진짜 중요한 이유", text: "이익(Profit)은 회계 처리 방식에 따라 부풀릴 수 있지만, 현금은 거짓말을 하지 않습니다. 영업현금흐름(Operating Cash Flow)이 순이익보다 크면 기업이 실제로 현금을 잘 창출하고 있다는 신호입니다. 자유현금흐름(FCF = 영업CF - 자본지출)은 배당 지급, 자사주 매입, 신규 투자에 쓸 수 있는 '진짜 여유 현금'입니다." },
      { label: "어디서 확인하나", text: "미국 기업의 재무제표는 SEC EDGAR(edgar.sec.gov)에서 무료로 열람할 수 있습니다. 연간보고서(10-K)와 분기보고서(10-Q)를 확인하세요. 시각화된 형태로 보고 싶다면 Macrotrends.net, 또는 각 증권사 HTS·MTS의 재무분석 탭을 활용하면 더 쉽게 이해할 수 있습니다." },
    ],
  },
  {
    id: "valuation",
    title: "💎 기업 가치 평가",
    summary: "이 주식이 정말 싼지 비싼지 판단하는 법",
    svg: <ValuationSVG />,
    points: [
      { label: "내재가치란?", text: "내재가치(Intrinsic Value)는 기업이 미래에 벌어들일 현금을 현재 가치로 환산한 '진짜 가격'입니다. 현재 시장가가 내재가치보다 낮으면 저평가(매수 기회), 높으면 고평가(주의)입니다. 주식 가격은 단기적으로 시장 심리에 따라 크게 흔들리지만, 장기적으로는 기업의 내재가치 방향으로 수렴하는 경향이 있습니다." },
      { label: "DCF(할인현금흐름) 개념", text: "Discounted Cash Flow — 기업이 향후 10년간 창출할 현금을 예측한 뒤, 할인율(위험도를 반영한 이자율)로 나눠 현재 가치로 환산합니다. 핵심 공식: 내재가치 = Σ(미래 현금흐름 ÷ (1+할인율)^n). 성장률과 할인율 가정에 따라 결과가 크게 달라지므로, DCF는 정밀한 숫자보다 '가치 범위 추정'용으로 활용하는 것이 현명합니다." },
      { label: "간편한 상대 가치 평가법", text: "DCF가 복잡하다면 같은 업종 내 경쟁사와 PER, EV/EBITDA, PSR을 비교하는 상대 평가를 활용하세요. PEG 비율(PER ÷ 연간 성장률)이 1 이하면 성장 대비 저평가 신호입니다. 예를 들어 PER 30배인 기업의 연간 성장률이 35%라면 PEG = 0.86으로, 높은 PER임에도 저평가로 해석할 수 있습니다." },
      { label: "안전마진 원칙", text: "아무리 분석을 잘해도 미래는 불확실합니다. 그래서 벤저민 그레이엄은 내재가치보다 30~40% 낮은 가격에서만 매수하는 '안전마진' 원칙을 강조했습니다. 이 버퍼가 분석 오류, 예상치 못한 사건, 경기 침체로 인한 하방 위험을 흡수합니다. 안전마진이 클수록 손실 가능성은 줄어듭니다." },
    ],
  },
  {
    id: "rebalancing",
    title: "⚖️ 포트폴리오 리밸런싱",
    summary: "목표 자산 비중을 지키는 규율 있는 투자 습관",
    svg: <RebalanceSVG />,
    points: [
      { label: "왜 비중이 무너지나?", text: "처음에 주식 60% + 채권 40%로 시작했더라도, 주식이 크게 오르면 자연스럽게 주식 비중이 75%로 높아집니다. 이 상태에서 주식 폭락이 찾아오면 의도했던 것보다 훨씬 큰 손실을 입게 됩니다. 리밸런싱은 이 비중을 원래 목표로 되돌려 리스크를 항상 통제하는 작업입니다." },
      { label: "리밸런싱의 투자 효과", text: "리밸런싱은 규칙적으로 '비싼 자산을 팔고 싼 자산을 사는' 역발상 행동을 자동화합니다. 2020년 코로나 폭락 직후 주식 비중이 줄어든 포트폴리오를 리밸런싱한 투자자는 자동으로 주식 저점 매수 효과를 얻었습니다. 감정이 아닌 원칙으로 매매하게 해주는 규율 시스템입니다." },
      { label: "언제, 어떻게 하나?", text: "① 시간 기반 — 연 1~2회 정해진 날(예: 1월과 7월)에 무조건 실행 ② 임계값 기반 — 비중이 목표에서 ±5% 이상 벗어날 때 실행. 너무 자주 하면 거래 비용과 세금이 발생해 역효과가 납니다. 장기 투자자에게는 연 1회 정기 리밸런싱만으로도 충분합니다." },
      { label: "세금 효율적인 방법", text: "보유 자산을 매도하면 양도소득세가 발생할 수 있습니다. 이를 피하려면 ① 연간 비과세 한도(250만원) 내에서 처리하거나 ② 새로 입금하는 투자금을 비중이 낮아진 자산에 집중 투자하는 방법을 활용합니다. 이렇게 하면 매도 없이도 비중을 점진적으로 복원할 수 있어 세금 부담을 줄일 수 있습니다." },
    ],
  },
];

const MASTERS: Article[] = [
  {
    id: "buffett",
    title: "🧙 워렌 버핏",
    summary: "가치투자의 살아있는 전설 · 연복리 20% · 60년",
    svg: <BuffettSVG />,
    points: [
      { label: "핵심 철학", text: "\"좋은 가격에 좋은 기업을 사는 것보다, 공정한 가격에 훌륭한 기업을 사는 편이 낫다.\" 경쟁자가 넘볼 수 없는 '해자(moat)'가 있는 기업을 찾아 영원히 보유합니다." },
      { label: "종목 선택 기준", text: "① 이해하기 쉬운 사업 ② 지속 가능한 경쟁 우위(브랜드, 특허, 네트워크 효과) ③ 유능하고 정직한 경영진 ④ 매력적인 가격. 이 4가지가 모두 맞을 때만 투자합니다." },
      { label: "대표 투자 사례", text: "• 코카콜라(1988~현재): 브랜드 해자 + 전 세계 유통망 • 애플(2016~): 생태계 lock-in + 충성 고객 • 아메리칸 익스프레스: 네트워크 효과 + 프리미엄 브랜드" },
      { label: "초보자를 위한 조언", text: "\"대부분의 투자자에게는 저비용 S&P500 인덱스 펀드가 최선이다.\" 버핏은 아내에게도 자신의 사후 재산 90%를 S&P 500 인덱스 펀드에 투자하라고 유언했습니다." },
    ],
  },
  {
    id: "munger",
    title: "🌐 찰리 멍거",
    summary: "다중 사고 모델 · 역발상 · 버핏의 30년 파트너",
    svg: <MungerSVG />,
    points: [
      { label: "핵심 철학", text: "\"세상을 이해하려면 하나의 모델만 갖지 말고, 다양한 학문 분야에서 사고 도구를 가져와야 한다.\" 심리학, 수학, 경제학, 물리학 등 100개 이상의 사고 모델을 활용했습니다." },
      { label: "역발상 투자법", text: "\"역발상으로 생각하라. 항상 역발상으로.\" 어떻게 성공할지 고민하기보다, 어떻게 하면 실패할지를 먼저 생각합니다. 실패 원인을 제거하는 것이 성공의 지름길이라고 믿었습니다." },
      { label: "집중 투자 원칙", text: "버핏보다 더 집중 투자를 선호했습니다. \"분산투자는 무지를 보호하는 수단이다. 자신이 무엇을 하는지 아는 사람에게는 분산투자가 거의 의미 없다.\"" },
      { label: "심리적 편견 극복", text: "자신을 속이는 인간의 본능적 편견 25가지를 경계했습니다. 확증 편향(보고 싶은 것만 보기), 손실 회피, 사회적 증거(남들이 사니까 나도 사기) 등을 항상 의식적으로 피했습니다." },
    ],
  },
  {
    id: "lynch",
    title: "🛍️ 피터 린치",
    summary: "13년 연복리 29% · 10루타 · 아는 것에 투자하라",
    svg: <LynchSVG />,
    points: [
      { label: "핵심 철학", text: "\"당신이 전문 투자자보다 유리한 점은 월스트리트 애널리스트들이 모르는 소비자 정보를 일상에서 먼저 발견할 수 있다는 것이다.\" 스타벅스, 덩킨도너츠, 홈데포를 초기에 발굴했습니다." },
      { label: "10루타(10-bagger) 찾는 법", text: "① 이해하기 쉬운 사업 ② 성장 스토리가 있는 기업 ③ 기관 투자자가 아직 주목하지 않는 소형주 ④ PEG(PER÷성장률)이 1 이하인 기업. 이런 기업을 찾아 장기 보유합니다." },
      { label: "종목 분류 6가지", text: "1) 저성장주 2) 대형우량주 3) 고성장주 4) 경기순환주 5) 회생주 6) 자산주. 각각 투자 방법과 기대 수익이 다릅니다. 자신이 어떤 종류를 사는지 알아야 합니다." },
      { label: "유명한 경고", text: "\"주식 시장에서 돈을 잃는 가장 빠른 방법은 뉴스에 반응하는 것이다.\" 펀드 매니저 시절 휴가를 가도 시장은 계속 잘 작동했습니다. 과도한 거래는 오히려 수익을 갉아먹습니다." },
    ],
  },
  {
    id: "bogle",
    title: "💡 존 보글",
    summary: "뱅가드 창설 · 인덱스 투자의 아버지 · 비용이 답이다",
    svg: <BogleSVG />,
    points: [
      { label: "핵심 철학", text: "\"비용은 확실하고, 수익은 불확실하다.\" 1975년 세계 최초 개인투자자용 인덱스 펀드를 출시했습니다. 그의 철학은 단순합니다: 시장 전체를 사고, 절대 팔지 말고, 비용을 최소화하라." },
      { label: "왜 인덱스 펀드가 이기나", text: "시장은 제로섬 게임입니다. 전체 투자자의 평균 수익은 시장 수익과 같습니다. 여기서 수수료를 빼면 대부분의 액티브 펀드는 시장에 집니다. 장기 데이터: 20년간 90%의 액티브 펀드가 인덱스에 패배." },
      { label: "복리와 비용의 관계", text: "$10,000를 연 7%로 30년 투자 시: 수수료 0.04%면 $74,000, 수수료 1.5%면 $48,000. 비용 차이만으로 $26,000(원금의 2.6배!) 차이가 납니다." },
      { label: "보글의 투자 원칙", text: "① 단순할수록 좋다 ② 시간이 가장 강력한 투자 도구 ③ 주식시장을 예측하려 하지 마라 ④ 주가 하락은 좋은 기회로 생각하고 계속 투자하라 ⑤ 인내심이 수익의 원천이다" },
    ],
  },
  {
    id: "marks",
    title: "🌊 하워드 막스",
    summary: "리스크 관리 · 시장 사이클 이해 · 2차적 사고",
    svg: <MarksSVG />,
    points: [
      { label: "핵심 철학", text: "\"투자에서 가장 중요한 것은 수익이 아니라 리스크를 이해하고 통제하는 것이다.\" 오크트리 캐피탈을 운영하며 1,400억 달러를 운용합니다. 버핏이 그의 메모를 빠짐없이 읽는다고 밝혔습니다." },
      { label: "2차적 사고법", text: "\"1차적 사고: 이 기업은 좋으니까 사야지. 2차적 사고: 모두가 이 기업이 좋다는 걸 알고 있고 이미 주가에 반영됐는지 확인해야지.\" 남들보다 한 발 앞서 생각해야 시장을 이깁니다." },
      { label: "시장 사이클 활용법", text: "공포(저평가)와 탐욕(고평가) 사이클은 반복됩니다. 시장이 공포에 질릴 때 사고, 탐욕으로 넘칠 때 파는 것이 핵심입니다. \"오늘 우리가 어디에 있는지\" 항상 점검해야 합니다." },
      { label: "불확실성 대처법", text: "미래는 알 수 없으므로 '리스크 조정 수익률'에 집중합니다. 어떤 시나리오에서도 치명적 손실을 피하도록 포트폴리오를 구성하는 것이 최우선입니다." },
    ],
  },
  {
    id: "dalio",
    title: "⚖️ 레이 달리오",
    summary: "올웨더 포트폴리오 · 원칙 기반 투자 · 철저한 분산",
    svg: <DalioSVG />,
    points: [
      { label: "핵심 철학", text: "\"분산투자는 투자자의 성배다.\" 세계 최대 헤지펀드 브리지워터 창설자. 경제를 기계처럼 바라보며, 주식·채권·금·원자재를 균형 배분해 어떤 경제 환경에서도 안정적 수익을 추구합니다." },
      { label: "올웨더 포트폴리오", text: "주식 30% + 장기국채 40% + 중단기채 15% + 금 7.5% + 원자재 7.5%. 각 자산은 경제 성장/침체, 인플레이션/디플레이션 환경에서 서로 다르게 반응해 변동성을 크게 줄입니다." },
      { label: "경제 사이클 이해", text: "달리오는 경제를 단기 사이클(5~8년)과 장기 부채 사이클(75~100년)로 설명합니다. 2008년 금융위기와 코로나 충격을 미리 예측했고, 이는 경제 구조에 대한 깊은 이해에서 나왔습니다." },
      { label: "개인 투자자를 위한 교훈", text: "① 과신하지 말 것 — 내가 틀릴 수 있다 ② 상관관계 낮은 자산을 섞어라 ③ 레버리지(빚)는 양날의 검 ④ 원칙을 문서화하고 감정적 결정을 피하라. 그의 책 《원칙》에 상세히 설명되어 있습니다." },
    ],
  },
  {
    id: "graham",
    title: "📚 벤저민 그레이엄",
    summary: "가치투자의 아버지 · 안전마진 · 버핏의 스승",
    svg: <GrahamSVG />,
    points: [
      { label: "핵심 철학", text: "\"투자란 철저한 분석을 통해 원금의 안전과 적절한 수익을 추구하는 것이다. 이를 만족하지 않는 것은 모두 투기다.\" 1934년 출판된 《증권분석(Security Analysis)》과 1949년 《현명한 투자자(The Intelligent Investor)》는 현대 가치투자의 성경입니다. 워렌 버핏은 후자를 '투자에 관해 쓰인 책 중 최고'라고 평가했습니다." },
      { label: "안전마진(Margin of Safety)", text: "그레이엄의 가장 핵심 원칙: 내재가치를 추정한 뒤, 반드시 그보다 상당히 낮은 가격에서만 매수합니다. 내재가치 $100인 주식이라면 $60~$70에 매수해 30~40%의 안전마진을 확보합니다. 이 버퍼가 분석 오류, 불황, 예상 밖 사건을 흡수합니다. 안전마진이 클수록 잃을 가능성이 낮아지는 것이 핵심입니다." },
      { label: "미스터 마켓 비유", text: "그레이엄은 주식시장을 '미스터 마켓(Mr. Market)'에 비유했습니다. 매일 당신의 주식을 사거나 팔겠다며 가격을 제안하는 감정적인 파트너입니다. 기분 좋은 날엔 비싸게, 우울한 날엔 싸게 제안합니다. 투자자의 역할은 이 파트너가 비정상적으로 낮은 가격을 제안할 때만 거래하고, 고점에서는 무시하는 것입니다." },
      { label: "방어적 투자자 기준", text: "① 기업 규모가 충분히 클 것 ② 유동비율 2 이상으로 재무 구조가 탄탄할 것 ③ 최근 20년 이상 배당 지속 지급 ④ 최근 10년간 적자 없음 ⑤ 10년간 EPS 성장률 33% 이상 ⑥ PER 15배 이하 ⑦ PBR 1.5배 이하. 이 7가지를 모두 만족하는 기업만 포트폴리오에 담는 것이 그레이엄의 방어적 투자 전략입니다." },
    ],
  },
  {
    id: "fisher",
    title: "🌱 필립 피셔",
    summary: "성장주 투자의 아버지 · 스커틀버트 · 탁월한 기업을 영원히",
    svg: <FisherSVG />,
    points: [
      { label: "핵심 철학", text: "\"탁월한 기업을 공정한 가격에 사서 영원히 보유하라.\" 1958년 출판된 《위대한 기업에 투자하라(Common Stocks and Uncommon Profits)》는 성장주 투자의 바이블입니다. 버핏은 '나는 85%의 그레이엄과 15%의 피셔로 이루어져 있다'고 말했습니다. 그는 모토롤라 주식을 34년간 보유해 수십 배의 수익을 거뒀습니다." },
      { label: "스커틀버트(Scuttlebutt) 조사법", text: "'소문을 모은다'는 뜻의 이 방법은 기업의 고객, 공급업체, 전직 직원, 경쟁사 직원들을 직접 인터뷰해 기업의 실제 경쟁력을 파악하는 방식입니다. 재무제표 이면의 정성적 정보(경영 문화, R&D 역량, 인재 유지력)가 장기 투자 성과를 결정한다고 믿었습니다. 오늘날에는 Glassdoor, LinkedIn, 제품 리뷰 등으로 유사하게 조사할 수 있습니다." },
      { label: "15가지 원칙 핵심", text: "① 향후 5~10년간 매출이 크게 성장할 시장이 있는가? ② 현재 성장에 안주하지 않고 지속적으로 신제품을 개발하는가? ③ 업계 평균보다 높은 영업이익률을 꾸준히 유지하는가? ④ 우수한 R&D 투자 대비 효과를 내는가? ⑤ 탁월한 영업 조직을 갖추고 있는가? ⑥ 핵심 인재를 유지·성장시키는 시스템이 있는가?" },
      { label: "언제 팔아야 하나", text: "피셔는 좋은 기업을 팔지 않는 것을 핵심 원칙으로 삼았습니다. 매도해야 할 경우는 단 세 가지입니다: ① 처음 매수 이유가 된 사업적 경쟁력이 본질적으로 악화됐을 때 ② 더 매력적인 기회를 발견해 포트폴리오를 교체해야 할 때 ③ 주가가 내재가치 대비 극단적으로 고평가됐을 때. '많이 올랐다'는 이유만으로는 팔면 안 됩니다." },
    ],
  },
  {
    id: "rogers",
    title: "🌏 짐 로저스",
    summary: "퀀텀 펀드 공동 창업 · 원자재 투자 · 글로벌 매크로",
    svg: <RogersSVG />,
    points: [
      { label: "핵심 철학", text: "\"세상이 변하고 있다는 것을 알아채면 그 변화에 투자한다.\" 조지 소로스와 함께 퀀텀 펀드를 설립해 1969~1980년 10년간 4,200% 수익률을 달성했습니다. 30대에 은퇴 후 오토바이로 세계를 두 번 일주하며 직접 투자처를 탐방했고, 현재는 원자재·신흥 시장 투자의 권위자로 알려져 있습니다." },
      { label: "원자재 사이클 투자법", text: "원자재(석유, 금, 구리, 농산물) 가격은 15~20년 주기로 강세장과 약세장이 반복됩니다. 약세장이 길어질수록 광산·에너지 기업들의 신규 투자가 줄어 공급이 부족해지고, 이것이 다음 강세장의 씨앗이 됩니다. 로저스는 원자재 약세장의 저점에서 매수해 강세장 정점 근처에서 매도하는 장기 사이클 전략을 사용합니다." },
      { label: "공부와 직접 조사의 중요성", text: "\"대부분의 투자자들은 아무 조사도 하지 않고 투자한다. 남들보다 그 분야를 더 잘 이해할 때까지 공부하고 나서 투자하라.\" 그는 세계 일주를 직접 하며 국가와 산업을 관찰하고 투자했습니다. 아시아를 횡단한 경험에서 중국·베트남 등의 성장 가능성을 누구보다 일찌감치 확신했습니다." },
      { label: "미래를 보는 시각", text: "로저스는 21세기는 아시아의 시대가 될 것이라 확신해 싱가포르로 이주, 두 딸에게 중국어를 가르쳤습니다. \"역사적으로 제국이 부상할 때 항상 엄청난 자원 수요가 생겼다. 아시아의 성장은 원자재 수요를 구조적으로 증가시킬 것이다.\" 장기 트렌드를 파악하고 그 흐름에 일찍 올라타는 것이 그의 핵심 전략입니다." },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════════════════ */

function ArticleCard({ article }: { article: Article }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border overflow-hidden transition-all"
      style={{ background: "var(--card)", borderColor: open ? "rgba(212,175,55,0.25)" : "var(--border)" }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:opacity-80 transition-opacity"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-snug" style={{ color: "var(--text)" }}>{article.title}</p>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>{article.summary}</p>
        </div>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
          style={{ color: "var(--muted)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div className="px-4 pb-5">
          {/* SVG Illustration */}
          <div className="rounded-xl overflow-hidden mb-4 border"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {article.svg}
          </div>

          {/* Content points */}
          <div className="flex flex-col gap-3">
            {article.points.map(p => (
              <div key={p.label}>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5"
                  style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37" }}>
                  {p.label}
                </span>
                <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   EXPORTS
══════════════════════════════════════════════════════════════════ */

function CollapsibleSection({ title, articles, accent }: { title: string; articles: Article[]; accent: string }) {
  const [more, setMore] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold tracking-widest uppercase font-syne"
          style={{ color: "var(--muted)" }}>
          {title}
        </h2>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${accent}15`, color: accent }}>
          {articles.length}개
        </span>
      </div>
      {/* First article always visible */}
      <ArticleCard article={articles[0]} />
      {/* Rest: expandable */}
      {articles.length > 1 && (
        <div className="mt-2">
          {more && (
            <div className="flex flex-col gap-2 mb-2">
              {articles.slice(1).map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          )}
          <button
            onClick={() => setMore(v => !v)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-semibold transition-opacity active:opacity-70"
            style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}25` }}
          >
            {more ? "접기" : `나머지 ${articles.length - 1}개 더 보기`}
            <ChevronDown
              className="w-3.5 h-3.5 transition-transform duration-300"
              style={{ transform: more ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export function InvestmentBasics() {
  return <CollapsibleSection title="투자 기초 지식" articles={BASICS} accent="rgba(0,229,160,0.9)" />;
}

export function InvestmentMasters() {
  return <CollapsibleSection title="투자 대가들의 전략" articles={MASTERS} accent="rgba(212,175,55,0.9)" />;
}

function ArticleExpanded({ article, accent }: { article: Article; accent: string }) {
  return (
    <div className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: `${accent}25` }}>
      <div className="px-4 pt-4 pb-2">
        <p className="text-sm font-bold leading-snug" style={{ color: "var(--text)" }}>{article.title}</p>
        <p className="text-[11px] mt-0.5 mb-3" style={{ color: "var(--muted)" }}>{article.summary}</p>
      </div>
      <div className="px-4 pb-5">
        <div className="rounded-xl overflow-hidden mb-4 border"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {article.svg}
        </div>
        <div className="flex flex-col gap-3">
          {article.points.map(p => (
            <div key={p.label}>
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5"
                style={{ background: `${accent}15`, color: accent }}>
                {p.label}
              </span>
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InvestmentAllExpanded() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
            투자 기초 지식
          </h2>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(0,229,160,0.1)", color: "rgba(0,229,160,0.9)" }}>
            {BASICS.length}개
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {BASICS.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
            투자 대가들의 전략
          </h2>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(212,175,55,0.12)", color: "#d4af37" }}>
            {MASTERS.length}개
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {MASTERS.map(a => <ArticleCard key={a.id} article={a} />)}
        </div>
      </div>
    </div>
  );
}
