#!/usr/bin/env node
/** 2026-08-28 안전자산 + 한국부동산 리포트·SVG·종토·애널 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CHARTS = path.join(ROOT, 'public', 'charts');
const DATE = '2026.08.28';
const DATETAG = '20260828';
const DATE_ISO = '2026-08-28';
const T28 = 1787871600000;

function esc(s) {
  return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;').replace(/</g, '&lt;');
}

function stockSvg({ badge, color, bg2, card, title, heroIcon, heroBig, heroSub, cards, quote, noteSub, footer }) {
  const cardSvg = cards
    .map((c, i) => {
      const x = [60, 390, 720][i];
      return `
  <rect x="${x}" y="420" width="300" height="200" rx="16" fill="${card}" stroke="${color}" stroke-width="2"/>
  <text x="${x + 150}" y="468" font-family="Arial" font-size="34" text-anchor="middle">${c.icon}</text>
  <text x="${x + 150}" y="510" font-family="Arial Black,Arial" font-size="20" font-weight="900" fill="${color}" text-anchor="middle">${esc(c.big)}</text>
  <text x="${x + 150}" y="542" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">${esc(c.mid)}</text>
  <text x="${x + 150}" y="580" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle">${esc(c.sub)}</text>`;
    })
    .join('');
  const heroLines = heroSub.split('\n').map((l, i) =>
    `<text x="540" y="${326 + i * 26}" font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle">${esc(l)}</text>`
  ).join('\n');
  const quoteLines = quote.split('\n').map((l, i) =>
    `<text x="540" y="${688 + i * 28}" font-family="Arial" font-size="17" fill="${color}" text-anchor="middle">${esc(l)}</text>`
  ).join('\n');
  const noteLines = noteSub.split('\n').map((l, i) =>
    `<text x="540" y="${868 + i * 24}" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">${esc(l)}</text>`
  ).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:${bg2}"/></linearGradient>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${color}"/><stop offset="100%" style="stop-color:${color}"/></linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#g)"/>
  <rect x="40" y="20" width="170" height="38" rx="19" fill="${color}30" stroke="${color}" stroke-width="1.5"/>
  <text x="125" y="44" font-family="Arial Black,Arial" font-size="15" font-weight="900" fill="${color}" text-anchor="middle">${esc(badge)}</text>
  <text x="540" y="46" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS DAILY REPORT</text>
  <rect x="900" y="20" width="148" height="38" rx="19" fill="#1f2937" stroke="#374151"/>
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">${DATE}</text>
  <text x="540" y="108" font-family="Arial Black,Arial" font-size="26" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(title)}</text>
  <line x1="80" y1="140" x2="1000" y2="140" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="220" font-family="Arial Black,Arial" font-size="72" font-weight="900" fill="${color}" text-anchor="middle">${heroIcon}</text>
  <text x="540" y="290" font-family="Arial Black,Arial" font-size="40" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(heroBig)}</text>
${heroLines}
  <line x1="80" y1="400" x2="1000" y2="400" stroke="#1f2937" stroke-width="1"/>
${cardSvg}
  <rect x="60" y="640" width="960" height="180" rx="16" fill="#0f172a" stroke="#374151"/>
${quoteLines}
  <rect x="60" y="840" width="960" height="120" rx="14" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="848" font-family="Arial" font-size="17" fill="${color}" text-anchor="middle">왜 중요한가</text>
${noteLines}
  <text x="540" y="1014" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">${esc(footer)}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">investus.kr SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE</text>
</svg>`;
}

function summarySafeSvg() {
  return stockSvg({
    badge: '안전자산', color: '#a78bfa', bg2: '#06121f', card: '#0a1420',
    title: '잭슨홀·30년물 5.31%·비트코인 78,800달러를 한곳에 모았습니다',
    heroIcon: '🛡️', heroBig: 'SAFE',
    heroSub: '비트코인은 잭슨홀 연설을 앞두고 약 78,800달러에서 관망했습니다.\n30년물 국채 5.31%와 워시 연준 의장 메시지가 금·달러·크립토를 함께 흔듭니다.',
    cards: [
      { icon: '₿', big: '~78,800$', mid: '비트코인', sub: '잭슨홀 앞 관망' },
      { icon: '📈', big: '5.31%', mid: '30년물', sub: '장기금리 부담' },
      { icon: '🏛️', big: 'JH', mid: '잭슨홀', sub: '워시 연설' },
    ],
    quote: '"안전자산은 오늘 잭슨홀과 장기금리가 공통 변수입니다.\n비트코인은 위험자산·유동성에, 금은 실질금리·달러에 반응합니다.\n연설 전후 변동성을 대비하시기 바랍니다."',
    noteSub: '잭슨홀은 연준의 통화정책 방향을 알리는 연례 행사입니다.\n30년물 5.31%는 재정·발행 우려가 반영된 수준으로, 금리 재상승 시 금·채권·크립토가 동시에 흔들릴 수 있습니다.\nETF 플로우·DXY·실질금리를 함께 추적하시면 됩니다.',
    footer: 'BTC ~78,800 · 30Y 5.31% · Jackson Hole Warsh · 금·은',
  });
}

function btcSvg() {
  return stockSvg({
    badge: '비트코인', color: '#f59e0b', bg2: '#06121f', card: '#0a1420',
    title: '비트코인은 잭슨홀을 앞두고 약 78,800달러에서 관망했습니다',
    heroIcon: '₿', heroBig: '~78,800$',
    heroSub: '전날 미국 증시 랠리와 30년물 5.31% 상승이 겹치며\n위험자산·유동성 변수를 동시에 보는 구간입니다.',
    cards: [
      { icon: '🏛️', big: 'JH', mid: '잭슨홀', sub: '워시 연설 이벤트' },
      { icon: '📥', big: 'ETF', mid: '수급', sub: '기관 플로우' },
      { icon: '💵', big: 'DXY', mid: '달러', sub: '유동성 변수' },
    ],
    quote: '"비트코인은 디지털 금과 위험자산 두 얼굴을 동시에 가집니다.\n잭슨홀에서 매파적 메시지가 나오면 단기 조정,\n리스크온 신호면 나스닥과 같이 반등할 수 있습니다."',
    noteSub: '잭슨홀 연설은 크립토 변동성의 단기 촉매입니다.\n현물 ETF 순유입이 꺾이면 조정, 유입 지속 시 저점 방어가 나올 수 있습니다.\n펀딩비·청산 규모·달러 지수를 같이 보시기 바랍니다.',
    footer: 'BTC · Jackson Hole · ETF flow · DXY',
  });
}

function goldSvg() {
  return stockSvg({
    badge: '금', color: '#fbbf24', bg2: '#1a1600', card: '#1a1408',
    title: '금은 30년물 5.31%와 잭슨홀을 앞두고 방향을 가리지 못했습니다',
    heroIcon: '🥇', heroBig: 'GOLD',
    heroSub: '장기금리 상승은 금에 부담이지만, 지정학·안전자산 수요는 상방을 받칩니다.\n실질금리와 달러가 방향의 핵심입니다.',
    cards: [
      { icon: '📈', big: '5.31%', mid: '30년물', sub: '금리 부담 요인' },
      { icon: '💵', big: 'DXY', mid: '달러', sub: '역상관 변수' },
      { icon: '🏛️', big: 'JH', mid: '잭슨홀', sub: '연준 메시지' },
    ],
    quote: '"금은 이자가 없는 자산이라 장기금리가 오르면 기회비용이 커집니다.\n반면 불확실성이 커지면 헤지 수요로 금이 강해지기도 합니다.\n오늘은 두 힘이 맞서는 구간입니다."',
    noteSub: '실질금리(명목금리−인플레)가 내려가면 금 매력이 커지는 경우가 많습니다.\n30년물 5.31%는 금에 숨통을 조이지만, 워시 연설이 비둘기적이면 반등 여지가 있습니다.\n금 ETF 보유량·중앙은행 매입·달러 지수를 추적하시면 됩니다.',
    footer: '금 · 30Y 5.31% · 실질금리 · Jackson Hole',
  });
}

function summaryKrreSvg() {
  return stockSvg({
    badge: '부동산', color: '#60a5fa', bg2: '#06121f', card: '#0a1420',
    title: '기준금리 3%·전세·공급 정책을 한곳에 모았습니다',
    heroIcon: '🏢', heroBig: '3.00%',
    heroSub: '한국은행이 기준금리를 3%로 올린 뒤에도 주식은 강했지만,\n부동산은 대출비용·전세·공급 기대가 따로 움직입니다.',
    cards: [
      { icon: '🏦', big: '3%', mid: '기준금리', sub: '대출 부담↑' },
      { icon: '🏠', big: '전세', mid: '수급', sub: '매매 전환 변수' },
      { icon: '🏗️', big: '공급', mid: '정책', sub: '재건축·분양' },
    ],
    quote: '"부동산은 코스피와 다른 축입니다.\n금리 인상은 전세대출·주담대 부담을 키우고,\n공급 정책은 심리를 먼저 움직입니다.\n실수요와 투자 수요를 나눠 보시기 바랍니다."',
    noteSub: '기준금리 3%는 변동금리 대출자의 이자 부담을 키웁니다.\n전세 매물이 줄면 보증금 상승→매수 전환 심리가 살아나기도 합니다.\n국토부 발표·주간 아파트 가격·전세대출 한도를 같이 추적하시면 됩니다.',
    footer: '기준금리 3% · 전세 · 공급정책 · DSR',
  });
}

function policyKrreSvg() {
  return stockSvg({
    badge: '정책', color: '#3b82f6', bg2: '#06121f', card: '#0a1420',
    title: '주택공급·재건축 정책은 기대와 실행 속도가 가격을 가릅니다',
    heroIcon: '🏗️', heroBig: '공급',
    heroSub: '공급 확대 발표는 심리를 먼저 움직이고,\n인허가·착공·입주는 늦게 따라옵니다.',
    cards: [
      { icon: '📋', big: '규제', mid: '완화', sub: '재건축 논의' },
      { icon: '⏱️', big: '시차', mid: '실행', sub: '인허가·착공' },
      { icon: '📊', big: '거래', mid: '심리', sub: '매매·전세' },
    ],
    quote: '"공급 정책은 당장 집이 늘어난다기보다\n앞으로 늘어날 수 있다는 기대에 가깝습니다.\n세부 시행령·안전진단·공사비가 체감을 좌우합니다."',
    noteSub: '재건축 규제 완화도 이주·공사비·안전진단 때문에 체감까지 시간이 걸립니다.\n헤드라인만 보고 매수하기보다 분양·입주 일정표를 확인하시기 바랍니다.\n금리 3% 환경에서는 실행 지연 시 관망이 길어질 수 있습니다.',
    footer: '공급정책 · 재건축 · 시행령 · 입주일정',
  });
}

function jeonseKrreSvg() {
  return stockSvg({
    badge: '전세', color: '#fb923c', bg2: '#1a1005', card: '#1a1008',
    title: '전세 수급이 타이트하면 매매 대기 수요도 흔들립니다',
    heroIcon: '🏠', heroBig: '전세',
    heroSub: '기준금리 3%는 전세대출 한도와 금리 부담을 키웁니다.\n전세가 상승은 일부를 매수로, 일부를 월세로 보냅니다.',
    cards: [
      { icon: '📈', big: '보증금', mid: '상승', sub: '매물 부족 시' },
      { icon: '🏦', big: '3%', mid: '금리', sub: '대출 부담' },
      { icon: '🔄', big: '전환', mid: '매매', sub: '실수요 분기' },
    ],
    quote: '"전세는 거주 비용의 바로미터입니다.\n매물이 줄고 보증금이 오르면 차라리 매수 심리가 살아나기도 하고,\n대출 한도가 막히면 거래가 멈출 수도 있습니다."',
    noteSub: '전세수급동향 지표는 매물·보증금 방향을 보여 줍니다.\n금리 3%에서 전세대출 규제가 강하면 실수요 전환이 막힐 수 있습니다.\n갱신청구권 만기·입주 물량·역전세 리스크를 같이 보시기 바랍니다.',
    footer: '전세 · 금리 3% · 전세대출 · 매매전환',
  });
}

const body = (lines) => `${lines}\n\ninvestus.kr SRP 최고투자책임자 발행`;

const SAFE_REPORTS = `  // ── 2026-08-28 신규 ────────────────────────────────────────────────────────
  {
    id: "safe-seed-103",
    title: "2026년 8월 28일 안전자산 한장 요약입니다. 비트코인 78,800달러·30년물 5.31%·잭슨홀 워시 연설·금·은 흐름을 모았습니다",
    summary: "비트코인은 잭슨홀 연설을 앞두고 약 78,800달러에서 관망했습니다. 30년물 국채 금리 5.31%와 워시 연준 의장 메시지가 금·달러·크립토를 함께 흔드는 구간입니다. 금·은·구리·원유는 실질금리·달러·경기 변수를 따로 보시기 바랍니다.",
    body: \`${body(`■ 오늘의 큰 그림

8월 28일 안전자산 시장의 핵심은 잭슨홀과 장기금리입니다. 비트코인은 약 78,800달러 부근에서 움직였고, 30년물 국채 금리는 5.31%까지 올라 장기 금리 부담이 커졌습니다. 워시 연준 의장의 기조연설이 나오면 위험자산·유동성·달러 방향이 한꺼번에 흔들릴 수 있습니다.

■ 가상화폐
1. 비트코인 — 잭슨홀·ETF 플로우·DXY
2. 이더리움 — 리스크온 베타
3. 솔라나·리플·BNB — 알트 동행

■ 현물
1. 금 — 실질금리·달러·헤지
2. 은 — 산업수요 + 금 동행
3. 구리·원유 — 경기·전력 수요

■ 앞으로 볼 것
(1) 잭슨홀 연설 (2) 30년물 금리 (3) ETF 플로우 (4) DXY`)}\`,
    category: "특집", categoryColor: "mint", subject: "한장요약",
    date: "${DATE_ISO}", updatedAt: "${DATE} 09:00", isPinned: true,
    images: ["/charts/summary-safe-${DATETAG}.svg"],
  },
  {
    id: "safe-seed-104",
    title: "비트코인은 잭슨홀을 앞두고 약 78,800달러에서 관망했습니다",
    summary: "비트코인은 전날 미국 증시 랠리와 30년물 5.31% 상승이 겹치며 위험자산·유동성 변수를 동시에 보는 구간입니다. 잭슨홀 연설이 단기 변동성의 촉매가 될 수 있습니다.",
    body: \`${body(`■ 상세

비트코인은 디지털 금과 위험자산 두 얼굴을 동시에 가집니다. 잭슨홀에서 매파적 메시지가 나오면 단기 조정, 리스크온 신호면 나스닥과 같이 반등할 수 있습니다. 현물 ETF 순유입·펀딩비·달러 지수를 함께 추적하시기 바랍니다.

■ 시나리오
A: 잭슨홀 비둘기 → 리스크온·BTC 반등
B: 매파·30Y 추가 상승 → 조정
C: ETF 유입 지속 → 저점 방어

■ 앞으로 볼 것
(1) 잭슨홀 연설 (2) ETF 플로우 (3) 펀딩비 (4) DXY`)}\`,
    category: "종목분석", categoryColor: "purple", subject: "비트코인",
    date: "${DATE_ISO}", updatedAt: "${DATE} 09:05",
    images: ["/charts/btc-safe-${DATETAG}.svg"],
  },
  {
    id: "safe-seed-105",
    title: "금은 30년물 5.31%와 잭슨홀을 앞두고 방향을 가리지 못했습니다",
    summary: "장기금리 상승은 금에 부담이지만, 지정학·안전자산 수요는 상방을 받칩니다. 실질금리와 달러가 방향의 핵심입니다.",
    body: \`${body(`■ 상세

금은 이자가 없는 자산이라 장기금리가 오르면 기회비용이 커집니다. 30년물 5.31%는 금에 숨통을 조이지만, 워시 연설이 비둘기적이면 반등 여지가 있습니다. 금 ETF 보유량·중앙은행 매입·달러 지수를 추적하시면 됩니다.

■ 시나리오
A: 실질금리 하락·달러 약세 → 금 강세
B: 30Y 추가 상승 → 조정
C: 지정학·안전자산 수요 → 스파이크

■ 앞으로 볼 것
(1) 실질금리 (2) DXY (3) 30년물 (4) ETF 보유`)}\`,
    category: "매크로", categoryColor: "orange", subject: "금",
    date: "${DATE_ISO}", updatedAt: "${DATE} 09:10",
    images: ["/charts/gold-safe-${DATETAG}.svg"],
  },`;

const KRRE_REPORTS = `  // ── 2026-08-28 신규 ────────────────────────────────────────────────────────
  {
    id: "krre-seed-103",
    title: "2026년 8월 28일 부동산 한장 요약입니다. 기준금리 3%·전세·공급 정책을 모았습니다",
    summary: "한국은행이 기준금리를 3%로 올린 뒤에도 주식은 강했지만, 부동산은 대출비용·전세·공급 기대가 따로 움직입니다. 실수요와 투자 수요를 구분해 보시기 바랍니다.",
    body: \`${body(`■ 오늘의 큰 그림

8월 28일 부동산 시장은 금리 3%·전세·공급 정책 세 축으로 봐야 합니다. 코스피가 7,000선을 재시도한 것과 별개로, 부동산은 전세대출·주담대 부담과 공급 기대가 가격과 거래량을 좌우합니다.

■ 핵심
1. 기준금리 3% — 변동금리 대출 부담↑
2. 전세 — 수급 타이트 시 보증금 상방
3. 공급 — 재건축·분양 정책 기대

■ 앞으로 볼 것
(1) 국토부 발표 (2) 주간 아파트 가격 (3) 전세대출 한도 (4) 입주 물량`)}\`,
    category: "특집", categoryColor: "mint", subject: "한장요약",
    date: "${DATE_ISO}", updatedAt: "${DATE} 10:00", isPinned: true,
    images: ["/charts/summary-krre-${DATETAG}.svg"],
  },
  {
    id: "krre-seed-104",
    title: "주택공급·재건축 정책은 기대와 실행 속도가 가격을 가릅니다",
    summary: "공급 확대 발표는 심리를 먼저 움직이고, 인허가·착공·입주는 늦게 따라옵니다. 금리 3% 환경에서는 실행 지연이 관망을 길게 만들 수 있습니다.",
    body: \`${body(`■ 상세

공급 정책은 당장 집이 늘어난다기보다 앞으로 늘어날 수 있다는 기대에 가깝습니다. 재건축 규제 완화도 이주·공사비·안전진단 때문에 체감까지 시간이 걸립니다. 세부 시행령·분양·입주 일정표를 확인하시기 바랍니다.

■ 시나리오
A: 규제 완화 + 사업 가속 → 선호지 강세
B: 발표만·실행 지연 → 관망
C: 금리 3%·DSR → 거래 동결

■ 앞으로 볼 것
(1) 시행령 (2) 안전진단 (3) 공사비 (4) 금리`)}\`,
    category: "매크로", categoryColor: "blue", subject: "정책",
    date: "${DATE_ISO}", updatedAt: "${DATE} 10:05",
    images: ["/charts/policy-krre-${DATETAG}.svg"],
  },
  {
    id: "krre-seed-105",
    title: "전세 수급이 타이트하면 매매 대기 수요도 흔들립니다",
    summary: "기준금리 3%는 전세대출 한도와 금리 부담을 키웁니다. 전세가 상승은 일부를 매수로, 일부를 월세로 보냅니다.",
    body: \`${body(`■ 상세

전세는 거주 비용의 바로미터입니다. 매물이 줄고 보증금이 오르면 차라리 매수 심리가 살아나기도 하고, 대출 한도가 막히면 거래가 멈출 수도 있습니다. 전세수급동향·전세대출·갱신청구권 만기를 추적하시기 바랍니다.

■ 시나리오
A: 전세 상승 → 매수 전환
B: 금리 3%·대출 규제 → 거래 멈춤
C: 역전세·보증 리스크

■ 앞으로 볼 것
(1) 전세수급 (2) 전세대출 (3) 입주 (4) 갱신 만기`)}\`,
    category: "시장분석", categoryColor: "orange", subject: "전세",
    date: "${DATE_ISO}", updatedAt: "${DATE} 10:10",
    images: ["/charts/jeonse-krre-${DATETAG}.svg"],
  },`;

function patchFile(rel, find, insert, unpin) {
  let c = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  if (c.includes('safe-seed-103') || c.includes('krre-seed-103')) {
    console.log(`⏭ ${rel} already patched`);
    return;
  }
  if (unpin) c = c.replace(unpin.from, unpin.to);
  if (!c.includes(find)) throw new Error(`Anchor not found in ${rel}`);
  c = c.replace(find, insert + find);
  fs.writeFileSync(path.join(ROOT, rel), c);
}

function patchMarkets() {
  let w = fs.readFileSync(path.join(ROOT, 'lib/wallPosts-markets.ts'), 'utf8');
  if (!w.includes('id: 9111')) {
    const safePosts = `  { id: 9111, symbol: "비트코인", nickname: "온체인러", holdingLabel: "BTC 보유", content: "78,800달러 부근. 잭슨홀 전이라 솔직히 포지션 줄였어요. 워시 매파 나오면 75k 테스트?", createdAt: T28, likes: 34, comments: 2 },
  { id: 9112, symbol: "금", nickname: "금벌레", holdingLabel: "금 ETF", content: "30년물 5.31%면 금 숨통 조이는데… 잭슨홀 비둘기 나오면 반등?", createdAt: T28 - 1800_000, likes: 22, comments: 2 },
  { id: 9113, symbol: "이더리움", nickname: "스테이커", holdingLabel: "ETH 보유", content: "BTC랑 같이 관망. 리스크온이면 ETH 베타 더 큼.", createdAt: T28 - 3600_000, likes: 15, comments: 1 },
  { id: 9114, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관망", content: "30Y 5.31% + 잭슨홀. 오늘 밤 연설 각오하고 있음.", createdAt: T28 - 5400_000, likes: 19, comments: 1 },
  { id: 9115, symbol: "비트코인", nickname: "ETF추적", holdingLabel: "관심", content: "ETF 플로우 꺾이면 BTC 먼저 반응. DXY 같이 켜두세요.", createdAt: T28 - 7200_000, likes: 17, comments: 1 },

`;
    w = w.replace('export const MOCK_POSTS_SAFE: Post[] = [\n', `export const MOCK_POSTS_SAFE: Post[] = [\n${safePosts}`);
    const safeComments = `  9111: [
    { id: 1, nickname: "헷지러", holdingLabel: "금+BTC", content: "잭슨홀 전엔 레버리지 줄이는 게 맞죠.", createdAt: T28 + 900_000, likes: 6 },
  ],
  9112: [
    { id: 1, nickname: "실질금리", holdingLabel: "관망", content: "5.31% 30Y면 금 압박 맞습니다.", createdAt: T28 - 1200_000, likes: 5 },
  ],

`;
    w = w.replace('export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n', `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${safeComments}`);

    const krrePosts = `  { id: 9211, symbol: "금리", nickname: "대출걱정", holdingLabel: "전세", content: "한은 3% 올렸는데… 전세대출 금리 얼마나 더 오를지. 매매는 더 망설여짐.", createdAt: T28, likes: 28, comments: 2 },
  { id: 9212, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급 발표는 심리만 움직이고 착공은 늦어요. 또 그 패턴.", createdAt: T28 - 2400_000, likes: 18, comments: 1 },
  { id: 9213, symbol: "전세", nickname: "전세러", holdingLabel: "전세", content: "전세 매물 줄면 보증금부터 오릅니다. 근데 3%면 대출 한도가 막혀요.", createdAt: T28 - 4800_000, likes: 21, comments: 2 },
  { id: 9214, symbol: "서울매매", nickname: "실수요자", holdingLabel: "관망", content: "코스피 7000 재시도해도 부동산은 별개. DSR 걸리면 실행 안 됨.", createdAt: T28 - 7200_000, likes: 16, comments: 1 },

`;
    w = w.replace('export const MOCK_POSTS_KR_RE: Post[] = [\n', `export const MOCK_POSTS_KR_RE: Post[] = [\n${krrePosts}`);
    const krreComments = `  9211: [
    { id: 1, nickname: "전세대출", holdingLabel: "관망", content: "3%면 갈아타는 사람 이자 부담 커집니다.", createdAt: T28 + 700_000, likes: 4 },
  ],
  9213: [
    { id: 1, nickname: "월세전환", holdingLabel: "관심", content: "전세→월세로 가는 수요도 늘 수 있어요.", createdAt: T28 - 4200_000, likes: 5 },
  ],

`;
    w = w.replace('export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n', `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${krreComments}`);
    fs.writeFileSync(path.join(ROOT, 'lib/wallPosts-markets.ts'), w);
    console.log('✅ wallPosts-markets.ts patched');
  }

  let a = fs.readFileSync(path.join(ROOT, 'lib/analystPosts-markets.ts'), 'utf8');
  if (!a.includes('id: -1941')) {
    const safeAnalyst = `  {
    id: -1941, alias: "온체인 매 #03", symbol: "비트코인",
    content: "비트코인은 잭슨홀 연설을 앞두고 약 78,800달러에서 관망했습니다.\\n30년물 5.31%와 워시 연준 의장 메시지가 단기 변동성의 촉매가 될 수 있으므로, ETF 플로우와 달러 지수를 함께 추적하시기 바랍니다.",
    likes: 24, comments: 2, created_at: "2026-08-28T09:00:00.000Z", liked: false,
  },
  {
    id: -1942, alias: "금벌레 #17", symbol: "금",
    content: "금은 30년물 5.31% 상승과 잭슨홀을 앞두고 방향을 가리지 못했습니다.\\n장기금리는 부담이지만 지정학·헤지 수요는 상방을 받칩니다. 실질금리와 DXY를 확인하시면 됩니다.",
    likes: 20, comments: 1, created_at: "2026-08-28T09:08:00.000Z", liked: false,
  },
  {
    id: -1943, alias: "매크로올빼미 #31", symbol: "매크로",
    content: "오늘 안전자산의 공통 변수는 잭슨홀과 30년물 5.31%입니다.\\n비트코인·금·채권이 같은 이벤트에 다르게 반응할 수 있으므로, 연설 전후 변동성에 대비하시기 바랍니다.",
    likes: 18, comments: 1, created_at: "2026-08-28T09:16:00.000Z", liked: false,
  },

`;
    a = a.replace('export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n', `export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n${safeAnalyst}`);
    const safeAnalystComments = `  [-1941]: [{ alias: "헷지", content: "잭슨홀 전 레버리지 줄이는 게 맞을까요?", created_at: "2026-08-28T09:40:00.000Z" }],
  [-1942]: [{ alias: "실질금리", content: "5.31%면 금 압박 맞나요?", created_at: "2026-08-28T09:48:00.000Z" }],

`;
    a = a.replace('export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n', `export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n${safeAnalystComments}`);

    const krreAnalyst = `  {
    id: -1951, alias: "정책워처 #01", symbol: "정책",
    content: "기준금리 3%와 공급 정책은 부동산에 서로 다른 신호를 줍니다.\\n공급 발표는 심리를 먼저 움직이고 실행은 늦게 따라오므로, 세부 시행령과 입주 일정을 확인하시기 바랍니다.",
    likes: 22, comments: 1, created_at: "2026-08-28T10:00:00.000Z", liked: false,
  },
  {
    id: -1952, alias: "전세러 #09", symbol: "전세",
    content: "금리 3%는 전세대출 부담을 키웁니다.\\n전세 매물이 줄면 보증금 상승→매수 전환 심리가 살아날 수 있지만, DSR·대출 한도가 실행을 가릴 수 있습니다.",
    likes: 19, comments: 2, created_at: "2026-08-28T10:08:00.000Z", liked: false,
  },
  {
    id: -1953, alias: "실수요 #05", symbol: "서울매매",
    content: "코스피 7,000 재시도와 부동산은 별개 축입니다.\\n주식 강세가 곧바로 매매 심리로 이어지지 않을 수 있으므로, 전세·대출·입주 물량을 따로 보시기 바랍니다.",
    likes: 17, comments: 1, created_at: "2026-08-28T10:16:00.000Z", liked: false,
  },

`;
    a = a.replace('export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n', `export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n${krreAnalyst}`);
    const krreAnalystComments = `  [-1951]: [{ alias: "실수요", content: "시행령 나오면 거래 살아날까요?", created_at: "2026-08-28T10:50:00.000Z" }],
  [-1952]: [{ alias: "월세", content: "전세→월세 전환도 늘 수 있겠네요.", created_at: "2026-08-28T10:58:00.000Z" }],

`;
    a = a.replace('export const MOCK_ANALYST_COMMENTS_KR_RE: Record<number, AnalystMockComment[]> = {\n', `export const MOCK_ANALYST_COMMENTS_KR_RE: Record<number, AnalystMockComment[]> = {\n${krreAnalystComments}`);
    fs.writeFileSync(path.join(ROOT, 'lib/analystPosts-markets.ts'), a);
    console.log('✅ analystPosts-markets.ts patched');
  }
}

// SVG
fs.writeFileSync(path.join(CHARTS, `summary-safe-${DATETAG}.svg`), summarySafeSvg());
fs.writeFileSync(path.join(CHARTS, `btc-safe-${DATETAG}.svg`), btcSvg());
fs.writeFileSync(path.join(CHARTS, `gold-safe-${DATETAG}.svg`), goldSvg());
fs.writeFileSync(path.join(CHARTS, `summary-krre-${DATETAG}.svg`), summaryKrreSvg());
fs.writeFileSync(path.join(CHARTS, `policy-krre-${DATETAG}.svg`), policyKrreSvg());
fs.writeFileSync(path.join(CHARTS, `jeonse-krre-${DATETAG}.svg`), jeonseKrreSvg());
console.log('✅ 6 SVG written');

patchFile('lib/reports-safe.ts', 'export const SEED_REPORTS_SAFE: Report[] = [\n', SAFE_REPORTS, {
  from: /(id: "safe-seed-100"[\s\S]*?)isPinned: true/,
  to: '$1isPinned: false',
});
patchFile('lib/reports-kr-re.ts', 'export const SEED_REPORTS_KR_RE: Report[] = [\n', KRRE_REPORTS, {
  from: /(id: "krre-seed-100"[\s\S]*?)isPinned: true/,
  to: '$1isPinned: false',
});
patchMarkets();
console.log('Done.');
