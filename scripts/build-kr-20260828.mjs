#!/usr/bin/env node
/** 2026-08-28 한국주식 리포트·SVG·종토·애널 빌드 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CHARTS = path.join(ROOT, 'public', 'charts');
const DATE = '2026.08.28';
const DATETAG = '20260828';
const DATE_ISO = '2026-08-28';

function esc(s) {
  return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;').replace(/</g, '&lt;');
}

function summaryKrSvg(lang) {
  const ko = lang === 'ko';
  const brand = ko
    ? 'investus.kr SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE'
    : 'investus.kr SRP Chief Investment Officer · NOT FINANCIAL ADVICE';
  const title = ko ? `${DATE} 한국장 한장 요약` : `Korea Daily ${DATE}`;
  const rows = ko
    ? [
        { stroke: '#60a5fa', fill: '#0a1420', title: '📈 코스피가 7,000선을 다시 시도했습니다', body: '6,984.95로 1.05% 올랐고, 장중에는 7,000을 터치했지만 마감까지는 버티지 못했습니다.', stat: '+1.05%' },
        { stroke: '#22d3ee', fill: '#0a1a1f', title: '🧠 반도체가 미국 엔비디아 급등을 따라갔습니다', body: '삼성전자 269,500원 +1.32%, SK하이닉스 1,755,000원 +1.45%로 마감했습니다.', stat: '반도체' },
        { stroke: '#facc15', fill: '#1a1600', title: '⚡ 전력기기가 트럼프 행정명령 여파로 강세였습니다', body: 'HD현대일렉트릭 895,000원, 효성중공업·산일전기 등 미국 현지 생산 거점이 부각됐습니다.', stat: '전력' },
        { stroke: '#fb923c', fill: '#1a1005', title: '🔋 삼성SDI는 급등 다음 날 차익 매물이 나왔습니다', body: '555,000원 -2.46%로, 전일 10%대 상승 뒤 되돌림이 나온 하루였습니다.', stat: '-2.46%' },
        { stroke: '#ef4444', fill: '#1a0a0a', title: '🚗 현대차·기아는 완만한 상승으로 마감했습니다', body: '현대차 402,000원 +1.01%, 기아 127,500원 +1.11%로 수출주 흐름을 유지했습니다.', stat: '자동차' },
        { stroke: '#4ade80', fill: '#061209', title: '🟢 네이버는 플랫폼 업종 안에서 견조했습니다', body: '218,000원 +0.69%로, 금리 부담 속에서도 광고·인공지능 기대가 붙었습니다.', stat: 'NAVER' },
        { stroke: '#a78bfa', fill: '#120b1f', title: '🏦 오늘 밤 잭슨홀 워시 연준 의장 연설이 남았습니다', body: '미국 통화정책 방향이 나오면 내일 외국인 수급과 환율이 함께 움직일 수 있습니다.', stat: '매크로' },
      ]
    : [
        { stroke: '#60a5fa', fill: '#0a1420', title: 'KOSPI retested 7,000', body: 'Closed at 6,984.95 (+1.05%) after touching 7,000 intraday.', stat: '+1.05%' },
        { stroke: '#22d3ee', fill: '#0a1a1f', title: 'Semis followed Nvidia', body: 'Samsung 269,500 (+1.32%), SK Hynix 1,755,000 (+1.45%).', stat: 'Chips' },
        { stroke: '#facc15', fill: '#1a1600', title: 'Power equipment led', body: 'HD Hyundai Electric 895,000 on US grid order theme.', stat: 'Power' },
        { stroke: '#fb923c', fill: '#1a1005', title: 'Samsung SDI pulled back', body: '555,000 (-2.46%) after prior-day surge.', stat: '-2.46%' },
        { stroke: '#ef4444', fill: '#1a0a0a', title: 'Hyundai & Kia edged up', body: '402,000 (+1.01%) and 127,500 (+1.11%).', stat: 'Auto' },
        { stroke: '#4ade80', fill: '#061209', title: 'Naver held firm', body: '218,000 (+0.69%) in platform group.', stat: 'NAVER' },
        { stroke: '#a78bfa', fill: '#120b1f', title: 'Jackson Hole Warsh speech tonight', body: 'Fed tone may move FX and foreign flows tomorrow.', stat: 'Macro' },
      ];
  const footer = ko
    ? '7,000선 재시도 · 엔비디아 후속 · 전력기기 · 잭슨홀 워시 연설을 함께 보시기 바랍니다'
    : '7,000 retest · NVDA follow-through · power grid · Jackson Hole Warsh speech';
  const y0 = 122;
  const h = 112;
  const gap = 12;
  const rowSvg = rows
    .map((r, i) => {
      const y = y0 + i * (h + gap);
      return `
  <rect x="60" y="${y}" width="960" height="${h}" rx="14" fill="${r.fill}" stroke="${r.stroke}" stroke-width="2"/>
  <rect x="60" y="${y}" width="8" height="${h}" rx="4" fill="${r.stroke}"/>
  <text x="116" y="${y + 42}" font-family="Arial Black,Arial" font-size="24" font-weight="900" fill="${r.stroke}">${esc(r.title)}</text>
  <text x="116" y="${y + 80}" font-family="Arial" font-size="18" fill="#9ca3af">${esc(r.body)}</text>
  <text x="970" y="${y + 66}" font-family="Arial Black,Arial" font-size="22" font-weight="900" fill="${r.stroke}" text-anchor="end">${esc(r.stat)}</text>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:#0a0f1a"/></linearGradient>
    <linearGradient id="flow" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#60a5fa"/><stop offset="25%" style="stop-color:#22d3ee"/><stop offset="50%" style="stop-color:#facc15"/><stop offset="75%" style="stop-color:#fb923c"/><stop offset="100%" style="stop-color:#4ade80"/></linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#flow)"/>
  <text x="540" y="48" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS KR DAILY</text>
  <text x="540" y="92" font-family="Arial Black,Arial" font-size="34" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(title)}</text>
  <line x1="80" y1="108" x2="1000" y2="108" stroke="#1f2937" stroke-width="1"/>
${rowSvg}
  <text x="540" y="1014" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">${esc(footer)}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#flow)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${esc(brand)}</text>
</svg>`;
}

function stockSvg({ badge, color, bg2, card, title, heroIcon, heroBig, heroSub, cards, quote, noteSub, footer, lang }) {
  const brand =
    lang === 'ko'
      ? 'investus.kr · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE'
      : 'investus.kr · SRP Chief Investment Officer · NOT FINANCIAL ADVICE';
  const cardSvg = cards
    .map((c, i) => {
      const x = [60, 390, 720][i];
      return `
  <rect x="${x}" y="404" width="300" height="216" rx="16" fill="${card}" stroke="${color}" stroke-width="2"/>
  <text x="${x + 150}" y="452" font-family="Arial" font-size="36" text-anchor="middle">${c.icon}</text>
  <text x="${x + 150}" y="496" font-family="Arial Black,Arial" font-size="24" font-weight="900" fill="${color}" text-anchor="middle">${esc(c.big)}</text>
  <text x="${x + 150}" y="530" font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle">${esc(c.mid)}</text>
  <text x="${x + 150}" y="566" font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle">${esc(c.sub1)}</text>
  <text x="${x + 150}" y="590" font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle">${esc(c.sub2)}</text>`;
    })
    .join('');
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
  <text x="540" y="46" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS KR DAILY REPORT</text>
  <rect x="900" y="20" width="148" height="38" rx="19" fill="#1f2937" stroke="#374151"/>
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">${DATE}</text>
  <text x="540" y="106" font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(title[0])}</text>
  <text x="540" y="142" font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(title[1] || '')}</text>
  <line x1="80" y1="158" x2="1000" y2="158" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="244" font-family="Arial Black,Arial" font-size="76" font-weight="900" fill="${color}" text-anchor="middle">${heroIcon}</text>
  <text x="540" y="304" font-family="Arial Black,Arial" font-size="46" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(heroBig)}</text>
  <text x="540" y="344" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">${esc(heroSub[0])}</text>
  <text x="540" y="370" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">${esc(heroSub[1])}</text>
  <line x1="80" y1="392" x2="1000" y2="392" stroke="#1f2937" stroke-width="1"/>
${cardSvg}
  <rect x="60" y="632" width="960" height="196" rx="16" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="682" font-family="Arial" font-size="19" fill="${color}" text-anchor="middle">${esc(quote[0])}</text>
  <text x="540" y="710" font-family="Arial" font-size="19" fill="${color}" text-anchor="middle">${esc(quote[1])}</text>
  <text x="540" y="738" font-family="Arial" font-size="19" fill="${color}" text-anchor="middle">${esc(quote[2])}</text>
  <text x="540" y="766" font-family="Arial" font-size="19" fill="${color}" text-anchor="middle">${esc(quote[3])}</text>
  <rect x="60" y="846" width="960" height="120" rx="14" fill="${card}" stroke="${color}" stroke-width="1"/>
  <text x="540" y="876" font-family="Arial" font-size="18" fill="${color}" text-anchor="middle">${lang === 'ko' ? '왜 중요한가' : 'Why it matters'}</text>
  <text x="540" y="906" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">${esc(noteSub[0])}</text>
  <text x="540" y="930" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">${esc(noteSub[1])}</text>
  <text x="540" y="954" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">${esc(noteSub[2])}</text>
  <text x="540" y="1000" font-family="Arial" font-size="15" fill="#374151" text-anchor="middle">${esc(footer)} · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${esc(brand)}</text>
</svg>`;
}

const body = (lines) => `${lines}\n\ninvestus.kr SRP 최고투자책임자 발행`;

const REPORTS = [
  {
    id: 'kr-seed-111',
    title: '2026년 8월 28일 한국장 한장 요약입니다. 코스피가 7,000선을 다시 시도했고, 반도체·전력기기·자동차가 함께 움직였습니다',
    summary:
      '코스피는 6,984.95로 1.05% 올라 7,000선을 장중 터치했지만 마감까지는 버티지 못했습니다. 전날 밤 미국에서 엔비디아가 8.74% 급등한 영향으로 삼성전자 269,500원(+1.32%), SK하이닉스 1,755,000원(+1.45%)이 올랐고, 트럼프 행정명령 여파로 전력기기가 강세를 이어갔습니다. 삼성SDI는 전일 급등 뒤 555,000원(-2.46%)으로 차익 매물이 나왔고, 현대차·기아·네이버도 완만한 상승으로 마감했습니다. 오늘 밤 잭슨홀 워시 연준 의장 연설이 남아 있습니다.',
    body: body(`■ 오늘의 큰 그림

8월 28일 한국 증시의 첫 번째 특징은 7,000선을 다시 건드렸다는 점입니다. 코스피는 6,984.95로 1.05% 올랐고, 장중에는 7,000을 터치했지만 마감까지는 그 위에 안착하지 못했습니다. 전날 한국은행이 기준금리를 3%로 올린 뒤에도 지수가 올랐던 흐름이 이어진 셈이지만, 오늘은 미국 반도체 급등과 전력기기 강세가 더 눈에 띄었습니다.

두 번째 특징은 업종이 한쪽으로만 쏠리지 않았다는 점입니다. 반도체, 전력기기, 자동차, 플랫폼이 같은 날 플러스권에 있었습니다. 다만 2차전지는 전날 급등한 삼성SDI에서 차익 매물이 나오며 업종 안에서 갈라졌습니다.

■ 오늘 움직인 종목

1. 삼성전자 269,500원(+1.32%) — 미국 엔비디아 급등의 후속
2. SK하이닉스 1,755,000원(+1.45%) — 고대역폭 메모리 기대 지속
3. HD현대일렉트릭 895,000원 — 미국 전력망 보호 행정명령 수혜
4. 삼성SDI 555,000원(-2.46%) — 전일 10%대 급등 뒤 되돌림
5. 현대차 402,000원(+1.01%), 기아 127,500원(+1.11%)
6. 네이버 218,000원(+0.69%)

■ 왜 이 조합이 중요한가

7,000선은 숫자 그 이상으로 심리적 기준선입니다. 터치만 하고 내려오면 '시도는 했지만 아직은 이르다'는 해석이, 마감까지 버티면 '다음 구간으로 넘어갔다'는 해석이 됩니다. 오늘은 전자에 가깝습니다.

■ 앞으로 볼 것

(1) 오늘 밤 잭슨홀 워시 연준 의장 연설 (2) 외국인 순매수 지속 여부 (3) 7,000선 재시도 (4) 전력기기 강세의 지속성

■ 투자시사점

오늘은 미국 실적 후속과 국내 전력 테마가 동시에 살아 있는 날이었습니다. 내일은 잭슨홀 연설이 환율·외국인 수급·반도체를 한 번에 흔들 수 있으므로, 코스피 종가·원/달러 환율·외국인 순매수 세 줄을 같이 적어 두시기 바랍니다.`),
    category: '특집',
    categoryColor: 'mint',
    subject: '한장요약',
    updatedAt: '2026.08.28 16:00',
    isPinned: true,
    images: [`/charts/summary-kr-${DATETAG}.svg`],
    imagesEn: [`/charts/summary-kr-${DATETAG}-en.svg`],
  },
  {
    id: 'kr-seed-112',
    title: '삼성전자가 269,500원으로 1.32% 올랐습니다. 전날 밤 미국 엔비디아 급등이 국내 반도체로 이어졌습니다',
    summary:
      '삼성전자는 269,500원에 마감해 1.32% 올랐습니다. 8월 27일 실적 발표 직후 시간외에서는 주가가 내렸지만, 28일 새벽 미국 정규장에서 엔비디아가 8.74% 급등하면서 국내 반도체 투자 심리가 다시 살아났습니다.',
    body: body(`■ 상세

삼성전자는 8월 28일 269,500원으로 마감하며 1.32% 올랐습니다. 코스피 상승률 1.05%보다 조금 앞선 흐름입니다.

오늘 상승의 출발점은 국내 실적이 아니라 미국 시장입니다. 엔비디아는 2분기 매출 962억 달러로 시장 예상을 넘겼고, 3분기 매출 전망도 1,080억 달러로 제시했습니다. 실적 발표 직후 시간외에서는 주가가 내렸지만, 다음 날 정규장에서 8.74% 급등하며 AI 반도체 수요가 여전히 강하다는 신호를 다시 보냈습니다.

■ 왜 이 뉴스가 중요한가

1. 시가총액 1위 종목이라 방향이 지수를 끌어올리거나 누릅니다.
2. 미국 AI 수요가 국내 메모리 수요로 이어지는 연결고리가 다시 확인됐습니다.
3. 7,000선 재시도 구간에서 외국인이 먼저 보는 종목입니다.

■ 투자시사점

269,500원은 기대가 다시 붙은 가격입니다. 월간 반도체 수출과 서버용 메모리 계약 가격으로 확인하시기 바랍니다.`),
    category: '종목분석',
    categoryColor: 'blue',
    subject: '삼성전자',
    updatedAt: '2026.08.28 15:50',
    images: [`/charts/samsung-kr-${DATETAG}.svg`],
    imagesEn: [`/charts/samsung-kr-${DATETAG}-en.svg`],
  },
  {
    id: 'kr-seed-113',
    title: 'SK하이닉스가 1,755,000원으로 1.45% 올랐습니다. 고대역폭 메모리 기대가 이어졌습니다',
    summary:
      'SK하이닉스는 1,755,000원에 마감해 1.45% 올랐고, 삼성전자보다 조금 더 큰 폭으로 움직였습니다. AI 가속기 옆에 붙는 고대역폭 메모리 수요 기대가 미국 실적 후속으로 다시 강화됐습니다.',
    body: body(`■ 상세

SK하이닉스는 1,755,000원으로 1.45% 올랐습니다. 고대역폭 메모리는 AI 서버에서 데이터를 빠르게 주고받는 고성능 메모리로, 가속기 수요와 거의 함께 움직입니다.

엔비디아의 3분기 매출 전망 1,080억 달러는 AI 데이터센터 투자가 꺾이지 않았다는 신호로 읽힙니다. 국내 투자자는 그 수요가 메모리 공급망으로 옮겨 붙을 것이라 기대합니다.

■ 투자시사점

출하량, 평균 판매 단가, 영업이익률 세 가지를 분기마다 기록해 두시면 기대와 실적의 간격을 스스로 재실 수 있습니다.`),
    category: '종목분석',
    categoryColor: 'purple',
    subject: 'SK하이닉스',
    updatedAt: '2026.08.28 15:45',
    images: [`/charts/hynix-kr-${DATETAG}.svg`],
    imagesEn: [`/charts/hynix-kr-${DATETAG}-en.svg`],
  },
  {
    id: 'kr-seed-114',
    title: '전력기기 업종이 트럼프 행정명령 여파로 강세를 이어갔습니다',
    summary:
      '미국이 국가 전력망 보호를 이유로 일부 외국산 전력 장비 유입을 제한하는 행정명령에 서명하면서, 미국 현지 생산 거점을 둔 HD현대일렉트릭·효성중공업·산일전기 등이 강세를 보였습니다.',
    body: body(`■ 상세

8월 28일 코스피 안에서 눈에 띄었던 축은 반도체만이 아니었습니다. 전력기기 업종이 함께 올랐습니다. 배경에는 미국이 대규모 전력망에 쓰이는 일부 외국산 장비 유입을 제한하는 행정명령을 낸 것입니다.

초고압 변압기는 송전망에서 전압을 바꿔 전기를 멀리 보내는 핵심 장비입니다. AI 데이터센터와 노후 전력망 교체 수요가 늘면서 공급이 부족한 시장에서, 미국 공장을 이미 갖춘 국내 업체의 경쟁력이 부각됐습니다.

■ 투자시사점

단기 테마인지 수주로 이어지는지 구분하려면 분기 수주 잔고와 미국 현지 납품 일정을 확인하시기 바랍니다.`),
    category: '섹터',
    categoryColor: 'orange',
    subject: '전력기기',
    updatedAt: '2026.08.28 15:40',
    images: [`/charts/power-kr-${DATETAG}.svg`],
    imagesEn: [`/charts/power-kr-${DATETAG}-en.svg`],
  },
  {
    id: 'kr-seed-115',
    title: '삼성SDI가 555,000원으로 2.46% 내렸습니다. 전일 급등 뒤 차익 매물이 나왔습니다',
    summary:
      '삼성SDI는 555,000원에 마감해 2.46% 내렸습니다. 하루 전 10% 넘게 오른 뒤 되돌림이 나온 날로, 업종 전체 약세보다는 개별 종목의 차익 실현에 가깝습니다.',
    body: body(`■ 상세

2차전지 업종은 전날 크게 올랐던 만큼, 다음 날에는 되돌림이 나오기 쉽습니다. 삼성SDI는 555,000원으로 2.46% 내렸지만, LG에너지솔루션 등 다른 셀 종목은 상대적으로 버틴 흐름이었습니다.

■ 투자시사점

급등 다음 날의 등락은 수급 요인인지 실적 재료인지 구분하는 데 중요합니다. 수주 공시와 전기차 판매 통계를 함께 보시기 바랍니다.`),
    category: '섹터',
    categoryColor: 'orange',
    subject: '2차전지',
    updatedAt: '2026.08.28 15:35',
    images: [`/charts/battery-kr-${DATETAG}.svg`],
    imagesEn: [`/charts/battery-kr-${DATETAG}-en.svg`],
  },
  {
    id: 'kr-seed-116',
    title: '현대차와 기아가 완만한 상승으로 마감했습니다',
    summary: '현대차는 402,000원(+1.01%), 기아는 127,500원(+1.11%)으로 마감했습니다. 반도체·전력기기보다 폭은 작았지만, 수출주 흐름을 유지한 점이 의미 있습니다.',
    body: body(`■ 상세

자동차 업종은 오늘 크게 튀지 않았지만, 지수 상승일에 함께 올랐습니다. 완성차 주가의 본체는 여전히 해외 월간 판매, 대당 판매가격, 판촉 할인 규모입니다.

■ 투자시사점

미국 판매 대수와 재고 일수를 함께 보시면 할인 압력이 커지는지 미리 알 수 있습니다.`),
    category: '섹터',
    categoryColor: 'red',
    subject: '자동차',
    updatedAt: '2026.08.28 15:30',
    images: [`/charts/auto-kr-${DATETAG}.svg`],
    imagesEn: [`/charts/auto-kr-${DATETAG}-en.svg`],
  },
  {
    id: 'kr-seed-117',
    title: '오늘 밤 잭슨홀 워시 연준 의장 연설이 코스피의 다음 방향을 가를 수 있습니다',
    summary:
      '케빈 워시 연준 의장이 8월 28일 밤(한국 시간) 잭슨홀 심포지엄에서 첫 기조연설을 합니다. 시장은 인플레이션, 장기 국채 금리, 추가 금리 인상 가능성에 대한 단서를 찾을 것으로 보입니다.',
    body: body(`■ 상세

잭슨홀 심포지엄은 매년 8월末에 열리는 중앙은행 총재 모임으로, 연준 의장의 기조연설이 가장 큰 관심사입니다. 올해는 워시 의장의 첫 연설이라 시장의 기대와 불안이 함께 큽니다.

매파적(긴축 우호) 발언이면 달러와 국채 금리는 오르고, 금·비트코인·성장주는 눌릴 수 있습니다. 비둘기파(완화 우호)거나 구체적 가이던스가 없으면 위험자산은 숨통이 트일 수 있습니다.

■ 투자시사점

연설 전후로 원/달러 환율, 국고채 3년물 금리, 외국인 순매수를 같은 표에 적어 두시면 한국 증시가 어떤 쪽을 더 무겁게 보는지 바로 확인하실 수 있습니다.`),
    category: '매크로',
    categoryColor: 'orange',
    subject: '금리',
    updatedAt: '2026.08.28 15:25',
    images: [`/charts/jackson-kr-${DATETAG}.svg`],
    imagesEn: [`/charts/jackson-kr-${DATETAG}-en.svg`],
  },
];

function buildReportBlock(r) {
  const titleEn = r.title.replace(/^2026년 8월 28일 한국장 한장 요약입니다\. /, 'Korea market wrap August 28, 2026: ').replace(/삼성전자가/, 'Samsung Electronics').slice(0, 120);
  return `  {
    id: "${r.id}",
    title: "${r.title}",
    summary: "${r.summary}",
    body: body(\`${r.body.replace(/`/g, '\\`')}\`),
    titleEn: "${titleEn}",
    summaryEn: "See Korean summary.",
    bodyEn: "See Korean body.\\n\\ninvestus.kr SRP Chief Investment Officer",
    category: "${r.category}",
    categoryColor: "${r.categoryColor}",
    subject: "${r.subject}",
    date: "${DATE_ISO}",
    updatedAt: "${r.updatedAt}",
    ${r.isPinned ? 'isPinned: true,\n    ' : ''}images: [${r.images.map((x) => `"${x}"`).join(', ')}],
    imagesEn: [${r.imagesEn.map((x) => `"${x}"`).join(', ')}],
  }`;
}

// SVG writes
fs.writeFileSync(path.join(CHARTS, `summary-kr-${DATETAG}.svg`), summaryKrSvg('ko'), 'utf8');
fs.writeFileSync(path.join(CHARTS, `summary-kr-${DATETAG}-en.svg`), summaryKrSvg('en'), 'utf8');

const svgDefs = [
  {
    file: 'samsung-kr',
    badge: '삼성전자',
    color: '#60a5fa',
    bg2: '#06121f',
    card: '#0a1420',
    ko: {
      title: ['삼성전자가 269,500원으로 1.32% 올랐습니다', '미국 엔비디아 급등이 국내 반도체로 이어졌습니다'],
      heroIcon: '🧠',
      heroBig: '269,500원',
      heroSub: ['전날 밤 미국 정규장에서 엔비디아가 8.74% 급등했습니다.', 'AI 서버 메모리 수요 기대가 다시 강해진 하루였습니다.'],
      cards: [
        { icon: '💹', big: '+1.32%', mid: '당일 상승', sub1: '코스피 +1.05%보다', sub2: '조금 앞섰습니다' },
        { icon: '🏭', big: '서버 메모리', mid: '수요 축', sub1: 'AI 데이터센터', sub2: '투자가 핵심입니다' },
        { icon: '🌍', big: '외국인', mid: '수급 신호', sub1: '7,000선 재시도', sub2: '구간의 관전 포인트' },
      ],
      quote: ['"269,500원은 미국 AI 수요 기대가 다시 붙은 가격입니다.', '실적 발표 직후 시간외 하락과 달리,', '다음 날 정규장 급등이 국내로 전달됐습니다.', '수출·계약 숫자로 확인하시기 바랍니다."'],
      noteSub: ['시가총액 1위 종목이라 방향이 지수를 끕니다.', '기대만 앞서면 되돌림도 빠르니 월간 반도체 수출을 보시기 바랍니다.', '다음 확인 포인트는 서버용 메모리 계약 가격입니다.'],
      footer: '삼성전자 · 269,500원 +1.32%',
    },
    en: {
      title: ['Samsung Electronics rose 1.32% to 269,500 won', 'US Nvidia rally spilled into Korean chips'],
      heroIcon: '🧠',
      heroBig: '269,500 KRW',
      heroSub: ['Nvidia jumped 8.74% in the US regular session.', 'AI server memory demand expectations strengthened again.'],
      cards: [
        { icon: '💹', big: '+1.32%', mid: 'Daily gain', sub1: 'Slightly ahead of', sub2: 'KOSPI +1.05%' },
        { icon: '🏭', big: 'Server memory', mid: 'Demand axis', sub1: 'AI data centers', sub2: 'drive the cycle' },
        { icon: '🌍', big: 'Foreign flows', mid: 'Signal', sub1: 'Key at 7,000', sub2: 'retest zone' },
      ],
      quote: ['"269,500 won reflects renewed US AI demand expectations.', 'Unlike the after-hours dip post-earnings,', 'the next-day US rally carried over here.', 'Verify with export and contract data."'],
      noteSub: ['Largest stock by market cap moves the index.', 'Expectations can reverse quickly—watch monthly chip exports.', 'Next checkpoint: server memory contract prices.'],
      footer: 'Samsung · 269,500 KRW +1.32%',
    },
  },
  {
    file: 'hynix-kr',
    badge: 'SK하이닉스',
    color: '#c084fc',
    bg2: '#140b1f',
    card: '#1a0f2a',
    ko: {
      title: ['SK하이닉스가 1,755,000원으로 1.45% 올랐습니다', '고대역폭 메모리 기대가 이어졌습니다'],
      heroIcon: '⚡',
      heroBig: '1,755,000원',
      heroSub: ['AI 가속기 옆에 붙는 고대역폭 메모리(HBM) 수요가', '미국 실적 후속으로 다시 강화됐습니다.'],
      cards: [
        { icon: '📈', big: '+1.45%', mid: '상대 강세', sub1: '삼성전자보다', sub2: '조금 더 올랐습니다' },
        { icon: '🧩', big: 'HBM', mid: '핵심 제품', sub1: 'AI 서버용', sub2: '고성능 메모리입니다' },
        { icon: '🏗️', big: '증설', mid: '비용 부담', sub1: '매출보다 먼저', sub2: '이익률에 반영됩니다' },
      ],
      quote: ['"1,755,000원은 AI 수요가 계속된다는 가정 위에 있습니다.', '엔비디아 3분기 매출 전망 1,080억 달러가', '그 기대를 다시 키웠습니다.', '출하량과 판매 단가를 함께 보시기 바랍니다."'],
      noteSub: ['반도체 투톱 중 상대 강세는 HBM 비중이 큰 쪽에 유리합니다.', '매출만 늘고 이익률이 내려가면 증설 구간일 수 있습니다.', '분기 영업이익률 방향을 먼저 확인하시기 바랍니다.'],
      footer: 'SK하이닉스 · 1,755,000원 +1.45%',
    },
    en: {
      title: ['SK Hynix rose 1.45% to 1,755,000 won', 'HBM demand expectations continued'],
      heroIcon: '⚡',
      heroBig: '1,755,000 KRW',
      heroSub: ['High-bandwidth memory demand tied to AI accelerators', 'strengthened again after US earnings.'],
      cards: [
        { icon: '📈', big: '+1.45%', mid: 'Relative strength', sub1: 'Outpaced', sub2: 'Samsung today' },
        { icon: '🧩', big: 'HBM', mid: 'Core product', sub1: 'High-performance', sub2: 'AI server memory' },
        { icon: '🏗️', big: 'Capex', mid: 'Margin drag', sub1: 'Costs can hit', sub2: 'before revenue' },
      ],
      quote: ['"1,755,000 won sits on continued AI demand assumptions.', 'Nvidia\'s $108B Q3 revenue guide', 'reignited expectations.', 'Track shipments and ASP together."'],
      noteSub: ['Relative strength favors the HBM-heavy name.', 'Rising revenue with falling margins may mean capex phase.', 'Watch operating margin direction first.'],
      footer: 'SK Hynix · 1,755,000 KRW +1.45%',
    },
  },
  {
    file: 'power-kr',
    badge: '전력기기',
    color: '#facc15',
    bg2: '#1a1600',
    card: '#1a1400',
    ko: {
      title: ['전력기기 업종이 트럼프 행정명령 여파로', '강세를 이어갔습니다'],
      heroIcon: '⚡',
      heroBig: '895,000원',
      heroSub: ['HD현대일렉트릭 등 미국 현지 공장을 둔 업체가', '초고압 변압器 수요 기대로 부각됐습니다.'],
      cards: [
        { icon: '🏭', big: '현지 생산', mid: '경쟁력', sub1: '미국 공장 보유', sub2: '업체가 유리합니다' },
        { icon: '🔌', big: '변압器', mid: '핵심 장비', sub1: '송전망·데이터센터', sub2: '전력 수요와 연결' },
        { icon: '📋', big: '수주', mid: '확인 필요', sub1: '테마인지', sub2: '계약인지 봐야 합니다' },
      ],
      quote: ['"미국이 일부 외국산 전력 장비 유입을 제한하면서', '국내 업체의 미국 거점 가치가 올랐습니다.', 'AI 데이터센터 전력 수요와 맞물려', '공급 부족 시장이 더 부각됐습니다."'],
      noteSub: ['행정명령은 심리를 먼저 움직입니다.', '실제 수주 잔고와 납품 일정이 따라와야 추세가 됩니다.', '단기 급등 후 변동성도 크니 비중을 조절하시기 바랍니다.'],
      footer: 'HD현대일렉트릭 · 895,000원',
    },
    en: {
      title: ['Power equipment stayed strong', 'on the US grid protection order'],
      heroIcon: '⚡',
      heroBig: '895,000 KRW',
      heroSub: ['Names with US factories like HD Hyundai Electric', 'benefited from transformer demand hopes.'],
      cards: [
        { icon: '🏭', big: 'Local plants', mid: 'Edge', sub1: 'US manufacturing', sub2: 'footprint matters' },
        { icon: '🔌', big: 'Transformers', mid: 'Key gear', sub1: 'Grid + data centers', sub2: 'drive demand' },
        { icon: '📋', big: 'Orders', mid: 'To verify', sub1: 'Theme vs', sub2: 'contract backlog' },
      ],
      quote: ['"US restrictions on some foreign power gear', 'lifted the value of Korean plants already on the ground.', 'AI data-center power demand adds to a tight supply market."'],
      noteSub: ['Executive orders move sentiment first.', 'Order backlog and delivery schedules must follow.', 'Volatility can be high after sharp runs.'],
      footer: 'HD Hyundai Electric · 895,000 KRW',
    },
  },
  {
    file: 'battery-kr',
    badge: '2차전지',
    color: '#fb923c',
    bg2: '#1a1005',
    card: '#1a1005',
    ko: {
      title: ['삼성SDI가 555,000원으로 2.46% 내렸습니다', '전일 급등 뒤 차익 매물이 나왔습니다'],
      heroIcon: '🔋',
      heroBig: '-2.46%',
      heroSub: ['569,000원에서 되돌림이 나왔습니다.', '업종 전체 약세보다 개별 차익 실현에 가깝습니다.'],
      cards: [
        { icon: '📉', big: '555,000원', mid: '되돌림', sub1: '전일 +10%대', sub2: '급등의 반작용' },
        { icon: '⚖️', big: '셀 vs 소재', mid: '업종 분화', sub1: '모든 2차전지가', sub2: '같이 내린 건 아닙니다' },
        { icon: '📦', big: '수주', mid: '다음 확인', sub1: '공시·판매 통계', sub2: '가 방향을 가릅니다' },
      ],
      quote: ['"하루 10% 넘게 오른 뒤 다음 날 2%대 하락은', '흔히 나오는 패턴입니다.', '공매도 환매가 섞였던 전날과 달리', '오늘은 차익 매물 성격이 큽니다."'],
      noteSub: ['급등 다음 날 흐름은 성격을 알려 줍니다.', '수주 공시 없이 오른 상승은 되돌리기 쉽습니다.', '미국·유럽 전기차 판매를 함께 보시기 바랍니다.'],
      footer: '삼성SDI · 555,000원 -2.46%',
    },
    en: {
      title: ['Samsung SDI fell 2.46% to 555,000 won', 'Profit-taking after the prior-day surge'],
      heroIcon: '🔋',
      heroBig: '-2.46%',
      heroSub: ['Pulled back from 569,000 won.', 'More stock-specific profit-taking than sector weakness.'],
      cards: [
        { icon: '📉', big: '555,000', mid: 'Pullback', sub1: 'After +10%', sub2: 'prior session' },
        { icon: '⚖️', big: 'Cells vs materials', mid: 'Split sector', sub1: 'Not every battery name', sub2: 'fell together' },
        { icon: '📦', big: 'Orders', mid: 'Next check', sub1: 'Disclosures and EV sales', sub2: 'set direction' },
      ],
      quote: ['"A 2% drop after a 10%+ spike is a common pattern.', 'Unlike short-covering yesterday,', 'today looks like profit-taking.', 'Watch order news and EV sales data."'],
      noteSub: ['Next-day action reveals the move\'s character.', 'Gains without orders are easier to reverse.', 'Track US/EU EV sales alongside.'],
      footer: 'Samsung SDI · 555,000 KRW -2.46%',
    },
  },
  {
    file: 'auto-kr',
    badge: '자동차',
    color: '#ef4444',
    bg2: '#1a0a0a',
    card: '#1a0a0a',
    ko: {
      title: ['현대차와 기아가 완만한 상승으로', '마감했습니다'],
      heroIcon: '🚗',
      heroBig: '+1%대',
      heroSub: ['현대차 402,000원 +1.01%, 기아 127,500원 +1.11%입니다.', '반도체·전력보다 폭은 작지만 수출주 흐름은 유지했습니다.'],
      cards: [
        { icon: '🚙', big: '402,000원', mid: '현대차', sub1: '해외 판매·환율', sub2: '이 본체입니다' },
        { icon: '🏎️', big: '127,500원', mid: '기아', sub1: '차종·지역', sub2: '비중 차이' },
        { icon: '📊', big: '재고', mid: '할인 선행', sub1: '재고 늘면', sub2: '판촉이 따라옵니다' },
      ],
      quote: ['"자동차는 오늘 크게 튀지 않았지만 지수 상승일에', '함께 올랐습니다.', '협력사 AI 교육 같은 구조 뉴스보다', '미국 월간 판매가 더 중요합니다."'],
      noteSub: ['완성차는 실물 수요가 바로 보이는 업종입니다.', '판매 대수만 보면 할인 압력을 놓치기 쉽습니다.', '대당 판매가격과 재고 일수를 같이 보시기 바랍니다.'],
      footer: '현대차 402,000 · 기아 127,500',
    },
    en: {
      title: ['Hyundai Motor and Kia closed modestly higher'],
      heroIcon: '🚗',
      heroBig: '+1% range',
      heroSub: ['Hyundai 402,000 (+1.01%), Kia 127,500 (+1.11%).', 'Smaller moves than chips/power but export tone held.'],
      cards: [
        { icon: '🚙', big: '402,000', mid: 'Hyundai', sub1: 'Overseas sales', sub2: 'and FX matter most' },
        { icon: '🏎️', big: '127,500', mid: 'Kia', sub1: 'Mix and region', sub2: 'drive the gap' },
        { icon: '📊', big: 'Inventory', mid: 'Discount signal', sub1: 'Rising days', sub2: 'lead to promos' },
      ],
      quote: ['"Autos did not lead today but rose with the index.', 'Overseas monthly sales matter more', 'than supply-chain AI training headlines."'],
      noteSub: ['Autos reflect real demand quickly.', 'Unit counts alone miss discount pressure.', 'Track ASP and inventory days together.'],
      footer: 'Hyundai 402,000 · Kia 127,500',
    },
  },
  {
    file: 'jackson-kr',
    badge: '매크로',
    color: '#a78bfa',
    bg2: '#120b1f',
    card: '#1a1030',
    ko: {
      title: ['오늘 밤 잭슨홀 워시 연준 의장 연설이', '코스피 다음 방향을 가를 수 있습니다'],
      heroIcon: '🏦',
      heroBig: '잭슨홀',
      heroSub: ['한국 시간 8월 28일 밤 기조연설이 예정돼 있습니다.', '인플레이션·장기 금리·위험자산에 큰 변수입니다.'],
      cards: [
        { icon: '🦅', big: '워시', mid: '첫 연설', sub1: '긴축·완화', sub2: '어느 쪽인지 주목' },
        { icon: '📉', big: '30년물', mid: '5.31%', mid2: '', sub1: '장기 금리가', sub2: '먼저 움직였습니다' },
        { icon: '💱', big: '환율', mid: '외국인', sub1: '연설 후', sub2: '수급이 바뀔 수 있습니다' },
      ],
      quote: ['"잭슨홀은 연준 의장이 정책 철학을 드러내는 자리입니다.', '매파적이면 달러·금리↑, 성장주↓ 가능성이 있고,', '완화적이거나 모호하면 위험자산이 숨통을 트일 수 있습니다."'],
      noteSub: ['연설 전후 환율과 국고채 3년물을 같이 보시기 바랍니다.', '한국은행 3% 금리와 미국 연준 메시지가 겹치는 구간입니다.', '내일 외국인 순매수 방향이 단기 추세를 가를 수 있습니다.'],
      footer: '잭슨홀 · 워시 연설',
    },
    en: {
      title: ['Tonight\'s Jackson Hole speech from Chair Warsh', 'may set Korea\'s next market direction'],
      heroIcon: '🏦',
      heroBig: 'Jackson Hole',
      heroSub: ['Keynote scheduled tonight KST.', 'Inflation, long rates, and risk assets are in focus.'],
      cards: [
        { icon: '🦅', big: 'Warsh', mid: 'Debut speech', sub1: 'Hawkish vs', sub2: 'dovish tone matters' },
        { icon: '📉', big: '30Y ~5.31%', mid: 'Long end', sub1: 'Bond market moved', sub2: 'ahead of the event' },
        { icon: '💱', big: 'FX', mid: 'Foreign flows', sub1: 'May shift', sub2: 'after the speech' },
      ],
      quote: ['"Jackson Hole is where the Fed Chair signals philosophy.', 'Hawkish tone: stronger USD/rates, pressure on growth.', 'Dovish or vague: risk assets may breathe easier."'],
      noteSub: ['Track FX and 3Y yields around the speech.', 'BOK 3% and Fed messaging overlap here.', 'Tomorrow\'s foreign flows may set the short-term trend.'],
      footer: 'Jackson Hole · Warsh speech',
    },
  },
];

for (const d of svgDefs) {
  fs.writeFileSync(path.join(CHARTS, `${d.file}-${DATETAG}.svg`), stockSvg({ ...d.ko, badge: d.badge, color: d.color, bg2: d.bg2, card: d.card, lang: 'ko' }), 'utf8');
  fs.writeFileSync(path.join(CHARTS, `${d.file}-${DATETAG}-en.svg`), stockSvg({ ...d.en, badge: d.badge, color: d.color, bg2: d.bg2, card: d.card, lang: 'en' }), 'utf8');
}

// Patch reports-kr.ts
let kr = fs.readFileSync(path.join(ROOT, 'lib/reports-kr.ts'), 'utf8');
const block = `  // ── 2026-08-28 신규 ────────────────────────────────────────────────────────
${REPORTS.map(buildReportBlock).join(',\n')},
`;
if (kr.includes('2026-08-28')) {
  console.log('reports-kr.ts already has 2026-08-28');
} else {
  kr = kr.replace(
    '  // ── 2026-08-27 신규',
    block + '  // ── 2026-08-27 신규'
  );
  fs.writeFileSync(path.join(ROOT, 'lib/reports-kr.ts'), kr, 'utf8');
  console.log('✅ lib/reports-kr.ts patched');
}

// Patch wallPosts-markets.ts
let wall = fs.readFileSync(path.join(ROOT, 'lib/wallPosts-markets.ts'), 'utf8');
if (!wall.includes('T28')) {
  wall = wall.replace(
    'const T27 = 1787785200000; // 2026-08-27 08:00 KST',
    'const T28 = 1787871600000; // 2026-08-28 08:00 KST\nconst T27 = 1787785200000; // 2026-08-27 08:00 KST'
  );
  const wallPosts = `  { id: 9011, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "인덱스 보유", content: "오늘 6984.95 +1.05%. 장중 7000 터치했는데 마감까지 못 버텼네요. 터치랑 안착은 다른 문제입니다. 잭슨홀 연설 나오면 내일 또 출렁일 듯.", createdAt: T28, likes: 38, comments: 3 },
  { id: 9012, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "삼성전자 보유", content: "269,500원 +1.32%. 어제 밤 NVDA 8.74% 급등 보고 아침에 바로 반응한 느낌. AH -2%랑 정규장 +8%는 완전히 다른 세계더라.", createdAt: T28 - 1800_000, likes: 29, comments: 2 },
  { id: 9013, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "175.5만원 +1.45%. 삼전보다 더 갔어요. 3분기 가이던스 1080억 달러 보면 HBM 쪽 기대는 아직 안 죽은 듯.", createdAt: T28 - 3600_000, likes: 24, comments: 2 },
  { id: 9014, symbol: "HD현대일렉트릭", nickname: "전력망", holdingLabel: "관심종목", content: "895,000원. 트럼프 전력장비 EO 때문에 어제도 오르고 오늘도 분위기 좋네요. 근데 수주 공시 없으면 테마로 끝날 수도.", createdAt: T28 - 5400_000, likes: 31, comments: 2 },
  { id: 9015, symbol: "삼성SDI", nickname: "배터리존버", holdingLabel: "삼성SDI 보유", content: "어제 10% 넘게 오르고 오늘 -2.46%. 딱 예상한 패턴. 반은 팔았습니다. 수주 나올 때까지는 조심.", createdAt: T28 - 7200_000, likes: 44, comments: 3 },
  { id: 9016, symbol: "현대차", nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "402,000 +1%. 오늘 장은 반도체·전력이 주인공이었고 자동차는 그냥 따라간 정도. 미국 판매 나오면 다시 보죠.", createdAt: T28 - 9000_000, likes: 17, comments: 1 },
  { id: 9017, symbol: "코스피", nickname: "매크로덕후", holdingLabel: "관망", content: "오늘 밤 잭슨홀 워시 연설… 매파 나오면 내일 외국인부터 빠질 수 있어요. 환율이랑 3년물 금리 같이 켜두고 자려고요.", createdAt: T28 - 10800_000, likes: 26, comments: 2 },
  { id: 9018, symbol: "네이버", nickname: "플랫폼러", holdingLabel: "관심종목", content: "218,000 +0.69%. 오늘도 크게 튀진 않았는데 금리 부담 있는 업종치고는 괜찮았어요. 광고 회복 숫자 나올 때까지는 관망.", createdAt: T28 - 12600_000, likes: 14, comments: 1 },
`;
  wall = wall.replace(
    'export const MOCK_POSTS_KR: Post[] = [',
    `export const MOCK_POSTS_KR: Post[] = [\n${wallPosts}`
  );
  const wallComments = `  9011: [
    { id: 1, nickname: "채권쟁이", holdingLabel: "관망", content: "7000 터치하고 내려오면 윗꼬리 남는 거라 다음날 변동성 커지기 쉽습니다.", createdAt: T28 + 600_000, likes: 8 },
    { id: 2, nickname: "지수관찰", holdingLabel: "인덱스 보유", content: "잭슨홀 전에는 무리하게 추격 매수 안 하는 게 낫죠.", createdAt: T28 + 1500_000, likes: 6 },
  ],
  9012: [
    { id: 1, nickname: "수출통계러", holdingLabel: "관망", content: "NVDA 급등이 우리 수출로 이어지는지 월간 통계로 확인해야죠.", createdAt: T28 - 1200_000, likes: 5 },
  ],
  9014: [
    { id: 1, nickname: "전력설비", holdingLabel: "관심종목", content: "미국 현지 공장 있는 곳만 버티는 장세일 수 있습니다.", createdAt: T28 - 4800_000, likes: 9 },
  ],
  9015: [
    { id: 1, nickname: "숏커버관찰", holdingLabel: "관망", content: "급등 다음날 -2%는 흔한 패턴 맞습니다.", createdAt: T28 - 6600_000, likes: 10 },
  ],
  9017: [
    { id: 1, nickname: "환율보는사람", holdingLabel: "관심종목", content: "워시 연설 나오면 원달러부터 움직입니다. 같이 보세요.", createdAt: T28 - 10200_000, likes: 7 },
  ],
`;
  wall = wall.replace(
    'export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {',
    `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${wallComments}`
  );
  fs.writeFileSync(path.join(ROOT, 'lib/wallPosts-markets.ts'), wall, 'utf8');
  console.log('✅ lib/wallPosts-markets.ts patched');
}

// Patch analystPosts-markets.ts
let anal = fs.readFileSync(path.join(ROOT, 'lib/analystPosts-markets.ts'), 'utf8');
if (!anal.includes('-1921')) {
  const posts = `  {
    id: -1921, alias: "여의도 너구리 #11", symbol: "코스피",
    content: "오늘 코스피는 6,984.95로 1.05% 올랐고, 장중 7,000을 터치했지만 마감까지는 버티지 못했습니다. 숫자만 보면 어제보다 조금 더 강한 날이지만, 7,000을 찍고 내려온 자리라 심리적으로는 아직 '시도' 단계에 가깝습니다. 전날 밤 미국에서 엔비디아가 8.74% 급등한 게 반도체를 끌어올렸고, 국내에서는 전력기기가 같은 날 같이 받쳐 줬습니다. 다만 오늘 밤 잭슨홀 워시 연설이 남아 있어, 내일 외국인 수급과 환율을 먼저 보시는 편이 안전합니다.",
    likes: 28, comments: 2, created_at: "2026-08-28T06:00:00.000Z", liked: false,
  },
  {
    id: -1922, alias: "판교 치타 #22", symbol: "삼성전자",
    content: "269,500원, +1.32%입니다. 포인트는 '왜 올랐느냐'입니다. 우리 실적 발표가 아니라, 미국 정규장에서 엔비디아가 8.74% 오른 뒤 그 기대가 국내로 넘어온 날입니다. 실적 발표 직후 시간외 -2%와 정규장 +8%가 같이 존재할 수 있다는 걸 오늘 장이 보여 줬습니다. 확인은 월간 반도체 수출과 서버용 메모리 계약 가격으로 하시면 됩니다.",
    likes: 23, comments: 2, created_at: "2026-08-28T06:08:00.000Z", liked: false,
  },
  {
    id: -1923, alias: "삼성동 여우 #08", symbol: "SK하이닉스",
    content: "1,755,000원, +1.45%. 삼성전자보다 더 올랐습니다. HBM(고대역폭 메모리) 비중이 큰 쪽이 AI 수요 재확인 구간에서 상대적으로 앞서는 경우가 많습니다. 다만 증설 비용은 이익률을 먼저 갉아먹을 수 있으니, 매출 증가율과 영업이익률을 나눠 보시기 바랍니다.",
    likes: 21, comments: 1, created_at: "2026-08-28T06:16:00.000Z", liked: false,
  },
  {
    id: -1924, alias: "성수 수달 #35", symbol: "전력기기",
    content: "오늘은 반도체만 보면 반쪽입니다. 미국 전력망 보호 행정명령 이후 HD현대일렉트릭 등 미국 현지 생산 거점이 있는 업체가 부각됐습니다. 초고압 변압器는 AI 데이터센터와 노후 송전망 교체 수요가 겹치는 장비입니다. 다만 행정명령은 심리를 먼저 움직이므로, 분기 수주 잔고로 테마인지 추세인지 구분하셔야 합니다.",
    likes: 27, comments: 2, created_at: "2026-08-28T06:24:00.000Z", liked: false,
  },
  {
    id: -1925, alias: "한남 두루미 #17", symbol: "삼성SDI",
    content: "555,000원, -2.46%. 어제 +10%대 급등 뒤 되돌림은 흔한 패턴입니다. 업종 전체가 무너진 날이 아니라 삼성SDI 쪽 차익 매물이 더 크게 보였습니다. 2차전지는 결국 전기차 판매와 수주 공시로 방향이 갈리니, 오늘 같은 날은 성급히 '업종 회복'이라고 단정하지 않는 편이 좋습니다.",
    likes: 19, comments: 1, created_at: "2026-08-28T06:32:00.000Z", liked: false,
  },
  {
    id: -1926, alias: "잠실 백로 #29", symbol: "현대차",
    content: "현대차 402,000원(+1.01%), 기아 127,500원(+1.11%). 오늘 장의 주인공은 아니었지만, 지수 상승일에 같이 올랐다는 점은 위험 선호가 완전히 죽지 않았다는 신호로 읽을 수 있습니다. 판단 기준은 여전히 미국 월간 판매, 대당 판매가격, 재고 일수입니다.",
    likes: 16, comments: 1, created_at: "2026-08-28T06:40:00.000Z", liked: false,
  },
  {
    id: -1927, alias: "광화문 물총새 #06", symbol: "금리",
    content: "오늘 밤 잭슨홀에서 워시 연준 의장의 첫 기조연설이 있습니다. 시장은 인플레이션, 30년물 국채 금리, 추가 금리 인상 가능성에 대한 단서를 찾을 것입니다. 매파적이면 원화 약세와 외국인 이탈 압력이, 완화적이거나 모호하면 반대로 작용할 수 있습니다. 연설 전후 환율·국고채 3년물·외국인 순매수를 한 표에 적어 두시기 바랍니다.",
    likes: 22, comments: 2, created_at: "2026-08-28T06:48:00.000Z", liked: false,
  },
`;
  anal = anal.replace('export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [', `export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n${posts}`);
  const comments = `  [-1921]: [
    { alias: "채권데스크", content: "7000 윗꼬리면 단기 변동성 키울 수 있습니다.", created_at: "2026-08-28T06:30:00.000Z" },
    { alias: "지수관찰", content: "잭슨홀 전 추격 매수는 리스크 큽니다.", created_at: "2026-08-28T06:52:00.000Z" },
  ],
  [-1922]: [
    { alias: "수급파트", content: "NVDA 급등 후 외국인 반도체 매수가 이어지는지 보세요.", created_at: "2026-08-28T06:35:00.000Z" },
  ],
  [-1924]: [
    { alias: "설비쪽", content: "미국 공장 있는 업체 위주로 수주 확인하겠습니다.", created_at: "2026-08-28T06:50:00.000Z" },
  ],
  [-1927]: [
    { alias: "환율데스크", content: "연설 직후 원달러부터 움직입니다.", created_at: "2026-08-28T07:00:00.000Z" },
    { alias: "채권데스크", content: "30년물 5.31%가 먼저 반응했죠.", created_at: "2026-08-28T07:15:00.000Z" },
  ],
`;
  anal = anal.replace('export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {', `export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n${comments}`);
  fs.writeFileSync(path.join(ROOT, 'lib/analystPosts-markets.ts'), anal, 'utf8');
  console.log('✅ lib/analystPosts-markets.ts patched');
}

console.log('=== KR 2026-08-28 build done ===');
