// 2026-07-23 정정 배포: Capacity 리포트 재작성 + Cathie Wood 신규
// 실행: node scripts/gen-fix-20260723-late.js
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');

const PSYM = {
  TSLA: { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  SPCX: { fg:'#c084fc', fg2:'#a78bfa', bg2:'#140b1f', card:'#1a0f2a' },
};
function esc(s){return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g,'&amp;').replace(/</g,'&lt;');}
function E(o){const r={};for(const k in o)r[k]=typeof o[k]==='string'?esc(o[k]):o[k];return r;}

function pickTitleFont(len) {
  if (len <= 30) return 30;
  if (len <= 40) return 26;
  if (len <= 52) return 22;
  return 20;
}

function tpl(oRaw) {
  const o = E(oRaw);
  const p = PSYM[oRaw.symbol];
  const badge = o.badge || o.symbol;
  const titleFont = pickTitleFont(oRaw.title.length);
  const cards = oRaw.cards.map((cRaw, i) => {
    const c = E(cRaw);
    const x = [60, 390, 720][i];
    return `
  <rect x="${x}" y="402" width="300" height="190" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x+150}" y="452" font-family="Arial" font-size="40" text-anchor="middle">${c.icon}</text>
  <text x="${x+150}" y="502" font-family="Arial Black,Arial" font-size="26" font-weight="900" fill="${p.fg}" text-anchor="middle">${c.big}</text>
  <text x="${x+150}" y="536" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">${c.mid}</text>
  <text x="${x+150}" y="566" font-family="Arial" font-size="18" fill="#6b7280" text-anchor="middle">${c.sub}</text>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:${p.bg2}"/></linearGradient>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${p.fg}"/><stop offset="100%" style="stop-color:${p.fg2}"/></linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#g)"/>
  <rect x="40" y="20" width="150" height="38" rx="19" fill="${p.fg}30" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="115" y="44" font-family="Arial Black,Arial" font-size="16" font-weight="900" fill="${p.fg}" text-anchor="middle">${badge}</text>
  <text x="540" y="46" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS DAILY REPORT</text>
  <rect x="900" y="20" width="148" height="38" rx="19" fill="#1f2937" stroke="#374151"/>
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">2026.07.23</text>
  <text x="540" y="102" font-family="Arial Black,Arial" font-size="${titleFont}" font-weight="900" fill="#f9fafb" text-anchor="middle">${o.title}</text>
  <line x1="80" y1="120" x2="1000" y2="120" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="256" font-family="Arial Black,Arial" font-size="110" font-weight="900" fill="${p.fg}" text-anchor="middle" opacity=".12">${o.heroIcon}</text>
  <text x="540" y="256" font-family="Arial Black,Arial" font-size="94" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.heroIcon}</text>
  <text x="540" y="316" font-family="Arial Black,Arial" font-size="46" font-weight="900" fill="#f9fafb" text-anchor="middle">${o.heroBig}</text>
  <text x="540" y="356" font-family="Arial" font-size="22" fill="#9ca3af" text-anchor="middle">${o.heroSub}</text>
  <line x1="80" y1="384" x2="1000" y2="384" stroke="#1f2937" stroke-width="1"/>
${cards}
  <rect x="60" y="612" width="960" height="180" rx="16" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="656" font-family="Arial" font-size="20" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.quoteLabel}</text>
  <text x="540" y="700" font-family="Arial" font-size="24" fill="${p.fg}" text-anchor="middle">${o.quoteKo}</text>
  <text x="540" y="740" font-family="Arial" font-size="20" fill="#e5e7eb" text-anchor="middle">${o.quoteEn}</text>
  <text x="540" y="776" font-family="Arial" font-size="18" fill="#6b7280" text-anchor="middle">${o.source}</text>
  <rect x="60" y="812" width="960" height="100" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
  <text x="540" y="852" font-family="Arial" font-size="22" fill="${p.fg}" text-anchor="middle">${o.noteHead}</text>
  <text x="540" y="886" font-family="Arial" font-size="19" fill="#9ca3af" text-anchor="middle">${o.noteSub}</text>
  <text x="540" y="974" font-family="Arial" font-size="20" fill="#374151" text-anchor="middle">${o.footer} · 2026.07.23</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.brand}</text>
</svg>`;
}

const BRAND_KO = 'INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BRAND_EN = 'INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE';

const T = [
// Capacity 재작성 (정정)
{ file:'tsla-capacity-chart', symbol:'TSLA',
  ko:{ title:'TSLA 캐파 차트 업데이트 · Cybercab >125K · Semi Commissioning', heroIcon:'🏭', heroBig:'Cybercab >125K', heroSub:'설치 연간 캐파 차트: Cybercab Production · Semi Commissioning · 상하이 Model 3/Y >950K 최대',
    cards:[{icon:'🚕',big:'>125K/년',mid:'Cybercab 연간 캐파',sub:'Production 상태'},{icon:'🚛',big:'Semi',mid:'Nevada 커밋션 단계',sub:'양산 진입 직전'},{icon:'🇨🇳',big:'>950K',mid:'상하이 Model 3/Y',sub:'전 세계 최대 자동차 사이트'}],
    quoteLabel:'SAWYER MERRITT · TESLA 캐파 차트', quoteKo:'"Tesla가 설치 연간 제조 캐파 차트를 업데이트해 공유"', quoteEn:'"Tesla has released an updated installed annual manufacturing capacity chart"',
    source:'출처: Sawyer Merritt · 2026.07.22',
    noteHead:'왜 중요한가: Cybercab Production·Semi Commissioning은 상용화 다음 단계 진입 신호', noteSub:'CA M3/MY >550K · Berlin MY >375K · TX MY >250K · Cybertruck >125K · Energy 40+20+6 GWh',
    footer:'TSLA · 캐파 차트 업데이트 (정정)', brand:BRAND_KO },
  en:{ title:'TSLA Capacity Chart Update · Cybercab >125K · Semi Commissioning', heroIcon:'🏭', heroBig:'Cybercab >125K', heroSub:'Cybercab in Production · Semi in Commissioning · Shanghai Model 3/Y >950K largest',
    cards:[{icon:'🚕',big:'>125K/yr',mid:'Cybercab annual capacity',sub:'Production status'},{icon:'🚛',big:'Semi',mid:'Nevada · Commissioning',sub:'just before mass production'},{icon:'🇨🇳',big:'>950K',mid:'Shanghai Model 3/Y',sub:'largest auto site globally'}],
    quoteLabel:'SAWYER MERRITT · TESLA CAPACITY CHART', quoteKo:'"Tesla 캐파 차트 업데이트 공유"', quoteEn:'"Tesla has released an updated installed annual manufacturing capacity chart"',
    source:'Source: Sawyer Merritt · 2026.07.22',
    noteHead:'Why it matters: Cybercab Production and Semi Commissioning are next-stage commercialization signals', noteSub:'CA M3/Y >550K · Berlin Y >375K · TX Y >250K · Cybertruck >125K · Energy 40+20+6 GWh',
    footer:'TSLA · Capacity Chart Update (Correction)', brand:BRAND_EN } },

// Cathie Wood on SpaceX 신규
{ file:'spcx-cathie-wood-bull', symbol:'SPCX',
  ko:{ title:'SPCX · Cathie Wood — 세계사상 가장 중요한 기업 될 수 있다', heroIcon:'🌌', heroBig:'ARK · Wood', heroSub:'재사용 로켓 10년 리드 · Starlink 통신 재편 · 궤도 데이터센터 · 저비용 프런티어 AI 리더 잠재력',
    cards:[{icon:'🚀',big:'10년 리드',mid:'재사용 로켓 기술',sub:'경쟁사 대비 격차'},{icon:'📡',big:'Starlink',mid:'통신 산업 재편 중',sub:'글로벌 사업으로 확장'},{icon:'🛰️',big:'궤도 DC',mid:'궤도 데이터센터',sub:'저비용 프런티어 AI 리더'}],
    quoteLabel:'CATHIE WOOD (ARK INVEST) · DOGEDESIGNER 정리', quoteKo:'"SpaceX가 세계 역사상 가장 중요한 기업 중 하나가 될 수 있다"', quoteEn:'"SpaceX could become one of the most important companies in global history"',
    source:'출처: Cathie Wood · DogeDesigner 인용 · 2026.07.22',
    noteHead:'오늘 GOOGL SPCX 지분 $9.8B 미실현 이익·텍사스 대형 DC 검토 보도와 방향 일치', noteSub:'차트: SPCX 어제 종가 $123.54(+3.08%) · 최근 6/12~7/21 -44% 하락 후 반등 구간',
    footer:'SPCX · Cathie Wood 강세 견해', brand:BRAND_KO },
  en:{ title:'SPCX · Cathie Wood — Could Become Most Important Company in History', heroIcon:'🌌', heroBig:'ARK · Wood', heroSub:'~10-yr reusable rocket lead · Starlink reshapes telecom · orbital data centers · low-cost frontier AI leadership',
    cards:[{icon:'🚀',big:'~10-yr',mid:'Reusable rocket lead',sub:'vs peers'},{icon:'📡',big:'Starlink',mid:'Reshaping telecom',sub:'into a global business'},{icon:'🛰️',big:'Orbital DC',mid:'Orbital data centers',sub:'low-cost frontier AI leader'}],
    quoteLabel:'CATHIE WOOD (ARK INVEST) · VIA DOGEDESIGNER', quoteKo:'"SpaceX가 세계사상 가장 중요한 기업 될 수 있다"', quoteEn:'"SpaceX could become one of the most important companies in global history"',
    source:'Source: Cathie Wood · via DogeDesigner · 2026.07.22',
    noteHead:'Aligns with today\'s GOOGL SPCX $9.8B re-mark and Texas DC report', noteSub:'Chart: SPCX $123.54 (+3.08%) yesterday · rebound from a 6/12–7/21 -44% drawdown',
    footer:'SPCX · Cathie Wood Bull View', brand:BRAND_EN } },
];

let n = 0;
for (const t of T) {
  const koWith = { ...t.ko, symbol: t.symbol };
  const enWith = { ...t.en, symbol: t.symbol };
  fs.writeFileSync(path.join(OUT, `${t.file}-20260723.svg`),    tpl(koWith));
  fs.writeFileSync(path.join(OUT, `${t.file}-20260723-en.svg`), tpl(enWith));
  n += 2;
}

// 이전 잘못된 파일 삭제
const oldFiles = ['tsla-capacity-plus-105k-20260723.svg', 'tsla-capacity-plus-105k-20260723-en.svg'];
for (const f of oldFiles) {
  const p = path.join(OUT, f);
  if (fs.existsSync(p)) { fs.unlinkSync(p); console.log(`🗑️  삭제: ${f}`); }
}

console.log(`✅ ${n} SVG 재/신규 생성 완료`);
