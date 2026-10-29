#!/usr/bin/env node
// Evening charts — 2026-10-29: Semi fire + Megacharger, SpaceXSI home buyouts, Tesla Vietnam
"use strict";
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "../public/charts");

function escXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
function base(f1, f2, a1, a2) {
  return `<defs>
    <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${f1}"/><stop offset="100%" stop-color="${f2}"/>
    </linearGradient>
    <linearGradient id="accentG" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0%" stop-color="${a1}"/><stop offset="100%" stop-color="${a2}"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="1080" height="1350" fill="url(#bgG)"/>
  <rect x="0" y="0" width="1080" height="10" fill="url(#accentG)"/>`;
}
function footer(note) {
  return `<rect x="0" y="1340" width="1080" height="10" fill="url(#accentG)"/>
  <text x="40" y="1333" font-family="Arial,sans-serif" font-size="18" fill="#6B7280">investus.kr · Not investment advice · ${escXml(note)} · INVESTUS SRP</text>`;
}
function badge(x, y, w, label, bg, border, tc) {
  return `<rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="${bg}"/>
  <rect x="${x}" y="${y}" width="${w}" height="40" rx="20" fill="none" stroke="${border}" stroke-width="2"/>
  <text x="${x + w / 2}" y="${y + 26}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="17" font-weight="900" fill="${tc}">${escXml(label)}</text>`;
}
function statBox(x, y, w, h, top, big, unit, sub, accent) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#0F1623" stroke="${accent}" stroke-width="2"/>
  <text x="${x + w / 2}" y="${y + 34}" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#9CA3AF">${escXml(top)}</text>
  <text x="${x + w / 2}" y="${y + 96}" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="${accent}">${escXml(big)}</text>
  <text x="${x + w / 2}" y="${y + 128}" text-anchor="middle" font-family="Arial,sans-serif" font-size="21" fill="#D1D5DB">${escXml(unit)}</text>
  <text x="${x + w / 2}" y="${y + 158}" text-anchor="middle" font-family="Arial,sans-serif" font-size="17" fill="#6B7280">${escXml(sub)}</text>`;
}
function msgBox(y, titleText, lines, accentTop, borderColor) {
  const lh = 34;
  const h = 72 + lines.length * lh + 20;
  const textSvg = lines
    .map(
      (ln, i) =>
        `<text x="108" y="${y + 72 + i * lh}" font-family="Arial,sans-serif" font-size="23" fill="${i === lines.length - 1 ? "#FDE68A" : "#E5E7EB"}">${escXml(ln)}</text>`,
    )
    .join("");
  return {
    svg: `<rect x="54" y="${y}" width="972" height="${h}" rx="22" fill="#0F0A00" stroke="${borderColor}" stroke-width="2.5"/>
  <line x1="54" y1="${y + 48}" x2="1026" y2="${y + 48}" stroke="${accentTop}" stroke-width="2"/>
  <text x="108" y="${y + 33}" font-family="Arial Black,Arial,sans-serif" font-size="24" font-weight="900" fill="${accentTop}">${escXml(titleText)}</text>
  ${textSvg}`,
    nextY: y + h + 14,
  };
}
function header(dateLabel, cat, ticker, catColor) {
  return `<text x="40" y="58" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#F9FAFB">investus.kr</text>
  <text x="1040" y="58" text-anchor="end" font-family="Arial,sans-serif" font-size="22" fill="#9CA3AF">${dateLabel}</text>
  ${badge(40, 78, 200, cat, `${catColor}26`, catColor, catColor)}
  ${badge(254, 78, 110, ticker, "rgba(255,255,255,0.08)", catColor, "#F9FAFB")}`;
}
function save(slug, svg) {
  const svgPath = path.join(OUT, `${slug}.svg`);
  fs.writeFileSync(svgPath, svg);
  console.log("  ✓", slug + ".svg");
}

function makeSemi(ko) {
  const red = "#F87171";
  const green = "#34D399";
  const gold = "#FBBF24";
  const gray = "#9CA3AF";
  const hero = ko
    ? `<text x="540" y="188" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="${red}" filter="url(#glow)">Semi 화재 · 1.2MW 충전</text>
  <text x="540" y="236" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="${gray}">헤이워드 I-880 · 충돌 없음 · Pilot 휴게소 개방</text>`
    : `<text x="540" y="188" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="46" font-weight="900" fill="${red}" filter="url(#glow)">Semi fire · 1.2 MW charge</text>
  <text x="540" y="236" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="${gray}">Hayward I-880 · no crash · Pilot truck stops open</text>`;
  const stats = [
    statBox(54, 268, 300, 190, ko ? "고속도로 통제" : "Freeway closed", "~10h", ko ? "남·북 전면 통제" : "both directions", ko ? "수요일 새벽 재개" : "reopened Wed. a.m.", red),
    statBox(390, 268, 300, 190, ko ? "공개 충전 출력" : "Public stalls", "1.2MW", ko ? "파일럿·플라잉J" : "Pilot / Flying J", ko ? "엘라벨·툴레어" : "Ellabell · Tulare", green),
    statBox(726, 268, 300, 190, ko ? "네바다 캐파" : "Nevada capacity", "25,000", ko ? "대/년 양산" : "units / year", ko ? "Q3 투자자 자료" : "Q3 investor deck", gold),
  ].join("\n");
  const mb1 = msgBox(
    490,
    ko ? "🔥 무슨 일이 있었나요" : "🔥 What happened",
    ko
      ? [
          "10월 27일 저녁 헤이워드 I-880, 충돌 없이 Semi 화재",
          "운전자 무사 · 원인 조사 중 · 테슬라 공식 설명 없음",
          "CHP는 유해 연기 위험을 이유로 전 차로를 막았습니다",
          "→ 작은 플릿에서 무충돌 화재는 안전 데이터 포인트입니다",
        ]
      : [
          "Oct 27 evening, Hayward I-880: Semi fire, no crash",
          "Driver unhurt · cause under investigation · Tesla silent",
          "CHP closed all lanes over hazardous chemical smoke risk",
          "→ A no-crash fire in a tiny fleet is a safety data point",
        ],
    red,
    "#7F1D1D",
  );
  const mb2 = msgBox(
    mb1.nextY,
    ko ? "⚡ 같은 주, 인프라는 앞으로 갔습니다" : "⚡ Same week, infrastructure moved",
    ko
      ? [
          "파일럿 엘라벨(조지아) 6스톨 · 다음날 툴레어 플라잉J",
          "다음: 포트 스톡턴 TX, 노스 라스베이거스 · 12곳 공사 중",
          "1.2MW는 30분에 약 60% — 법정 휴게 시간과 맞춰 설계",
          "→ 충전망은 열리는데, 배터리 신뢰 질문이 같이 열립니다",
        ]
      : [
          "Pilot Ellabell, GA (6 stalls) · Flying J Tulare next day",
          "Next: Fort Stockton TX, North Las Vegas · 12 more building",
          "1.2 MW: ~60% in 30 minutes — matches a required rest break",
          "→ The network is opening; battery-trust questions opened too",
        ],
    green,
    "#064E3B",
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base("#120808", "#080404", red, "#F97316")}
  ${header("Oct 29, 2026", ko ? "🔍 종목분석" : "🔍 Analysis", "TSLA", red)}
  ${hero}
  ${stats}
  ${mb1.svg}
  ${mb2.svg}
  ${footer("TSLA Semi")}
</svg>`;
}

function makeHomes(ko) {
  const purple = "#C084FC";
  const gold = "#FBBF24";
  const red = "#F87171";
  const gray = "#9CA3AF";
  const hero = ko
    ? `<text x="540" y="188" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="46" font-weight="900" fill="${purple}" filter="url(#glow)">주택 418채 매입 제안</text>
  <text x="540" y="236" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="${gray}">사우스헤이븐 콜로니얼힐스 · 소음 소송 조건부</text>`
    : `<text x="540" y="188" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="44" font-weight="900" fill="${purple}" filter="url(#glow)">Offer for ~418 homes</text>
  <text x="540" y="236" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="${gray}">Colonial Hills, Southaven · drop the noise suit</text>`;
  const stats = [
    statBox(54, 268, 300, 190, ko ? "매입 목표(보도)" : "Buyout target", "418", ko ? "채 · 미확인" : "homes · unverified", ko ? "중개인 녹취" : "realtor recording", purple),
    statBox(390, 268, 300, 190, ko ? "평균 주택가" : "Avg. home price", "$180K", ko ? "인근 시세" : "local market", ko ? "가디언 인용" : "per The Guardian", gold),
    statBox(726, 268, 300, 190, ko ? "Q3 AI 비중" : "Q3 AI mix", "48%", ko ? "최대 매출 부문" : "largest segment", ko ? "총매출 $14.6B" : "of $14.6B revenue", red),
  ].join("\n");
  const mb1 = msgBox(
    490,
    ko ? "⚖️ 조건부 매입의 구조" : "⚖️ How the offer is structured",
    ko
      ? [
          "시세 매입 + 집단소송 청구권 포기 조건 (가디언·포브스)",
          "18가구 합의 보도 · 10월 9일 이후 등기 5건",
          "회사는 소음 피해를 부인하고 방음벽·정규 발전소를 약속",
          "→ 현금은 작아도, 허가·ESG 리스크는 컴퓨트 확장과 묶입니다",
        ]
      : [
          "Market-value buyout + release of class-action claims",
          "18 owners said yes · 5 deeds since Oct 9 (county records)",
          "Company denies nuisance; cites sound walls and a permanent plant",
          "→ Cheap cash, but permits and ESG sit on the compute ramp",
        ],
    purple,
    "#4C1D95",
  );
  const mb2 = msgBox(
    mb1.nextY,
    ko ? "🔌 왜 투자 이야기인가" : "🔌 Why investors should care",
    ko
      ? [
          "AI 솔루션이 Q3에 처음으로 스페이스X 최대 매출 부문",
          "69기 임시 가스터빈 · 청정대기법 허가 공백 (EPA)",
          "NAACP·환경단체 연방 소송 · 데이터센터 지연 120건+",
          "→ 전력·인허가가 이 부문의 속도 제한입니다",
        ]
      : [
          "AI Solutions was SpaceX's largest Q3 revenue segment",
          "69 temporary gas turbines · Clean Air Act permit gap (EPA)",
          "NAACP federal suit · 120+ data-center delays nationwide",
          "→ Power and permits are the speed limit on this segment",
        ],
    gold,
    "#78350F",
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base("#0C0618", "#050210", purple, "#7C3AED")}
  ${header("Oct 29, 2026", ko ? "🔍 종목분석" : "🔍 Analysis", "SPCX", purple)}
  ${hero}
  ${stats}
  ${mb1.svg}
  ${mb2.svg}
  ${footer("SPCX SpaceXSI")}
</svg>`;
}

function makeVietnam(ko) {
  const mint = "#34D399";
  const blue = "#60A5FA";
  const gold = "#FBBF24";
  const gray = "#9CA3AF";
  const hero = ko
    ? `<text x="540" y="188" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="48" font-weight="900" fill="${mint}" filter="url(#glow)">테슬라, 베트남 진출 확인</text>
  <text x="540" y="236" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="${gray}">채용 공고 · 빈패스트 신차 점유 약 36%</text>`
    : `<text x="540" y="188" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="46" font-weight="900" fill="${mint}" filter="url(#glow)">Tesla confirms Vietnam</text>
  <text x="540" y="236" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" fill="${gray}">Hiring underway · VinFast ~36% of new cars</text>`;
  const stats = [
    statBox(54, 268, 300, 190, ko ? "빈패스트 YTD" : "VinFast YTD", "36%", ko ? "신차 점유" : "new-car share", ko ? "9개월 177,697대" : "177,697 in 9 months", gold),
    statBox(390, 268, 300, 190, ko ? "국가 신차" : "Vietnam market", "495K", ko ? "9개월 합계" : "9-month total", ko ? "2026년 1~9월" : "Jan–Sep 2026", blue),
    statBox(726, 268, 300, 190, ko ? "법인 자본금" : "Charter capital", "~$3M", ko ? "777억 동" : "77.7B dong", ko ? "9월 11일 등록" : "registered Sep 11", mint),
  ].join("\n");
  const mb1 = msgBox(
    490,
    ko ? "📋 확인된 채용 · 아직 없는 것" : "📋 What is confirmed — and what is not",
    ko
      ? [
          "판매·서비스·충전 프로젝트·구매·HR 등 5개 직무",
          "충전 개발자를 뽑는다는 것은 슈퍼차저 계획이 있다는 뜻",
          "가격·트림·매장 위치는 아직 공개되지 않았습니다",
          "→ 태국·필리핀처럼 채용 후 수개월 내 주문 개방 패턴",
        ]
      : [
          "Five roles: sales, service, charging, purchasing, HR",
          "A charging-project hire implies Superchargers, not just ads",
          "No pricing, trims, or store locations have been disclosed",
          "→ Thailand/Philippines playbook: hire, then open orders",
        ],
    mint,
    "#064E3B",
  );
  const mb2 = msgBox(
    mb1.nextY,
    ko ? "🏁 홈그라운드 경쟁의 무게" : "🏁 Home-field math for VinFast",
    ko
      ? [
          "빈패스트 9개월 판매가 토요타~기아 5사 합보다 많음",
          "VF 3는 1만 3천 달러 미만으로 올해 베트남 최다 판매",
          "테슬라는 수입 · 아세안-중국 FTA 승용차 고관세 유지",
          "→ 기회는 열렸고, 가격·관세·충전이 크기를 정합니다",
        ]
      : [
          "VinFast's 9-month volume beat Toyota through Kia combined",
          "The VF 3, under $13,000, is Vietnam's best-selling vehicle",
          "Tesla would import; passenger cars stay on a high-tariff list",
          "→ The door is open; price, tariffs, and charging set the size",
        ],
    gold,
    "#78350F",
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  ${base("#04140E", "#020A08", mint, "#059669")}
  ${header("Oct 29, 2026", ko ? "🔍 종목분석" : "🔍 Analysis", "TSLA", mint)}
  ${hero}
  ${stats}
  ${mb1.svg}
  ${mb2.svg}
  ${footer("TSLA Vietnam")}
</svg>`;
}

(async function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  save("tsla-semi-hayward-20261029", makeSemi(true));
  save("tsla-semi-hayward-20261029-en", makeSemi(false));
  save("spcx-southaven-homes-20261029", makeHomes(true));
  save("spcx-southaven-homes-20261029-en", makeHomes(false));
  save("tsla-vietnam-entry-20261029", makeVietnam(true));
  save("tsla-vietnam-entry-20261029-en", makeVietnam(false));
  console.log("charts written");
})();
