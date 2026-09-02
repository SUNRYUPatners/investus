#!/usr/bin/env node
/** 2026-09-02 wallPosts · analyst comments · markets social · REPORT_TICKERS */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const T02SEP = 1788303600000; // 2026.09.02 08:00 KST
const T02 = T02SEP;

function patchReportsTickers() {
  let c = read('lib/reports.ts');
  if (c.includes('"seed-1445":')) {
    console.log('REPORT_TICKERS: seed-1445 already present');
    return;
  }
  const block = `  // 2026-09-02
  "seed-1445": ['MACRO', 'TSLA', 'SPCX', 'NVDA', 'GOOGL', 'AAPL'],
  "seed-1446": ['TSLA'],
  "seed-1447": ['DELL'],
  "seed-1448": ['PANW'],
  "seed-1449": ['TSLA'],
  "seed-1450": ['SPCX'],
  "seed-1451": ['SPCX'],
  "seed-1452": ['TSLA'],
  "seed-1453": ['SPCX'],
  "seed-1454": ['NVDA', 'AI'],
  "seed-1455": ['GOOGL'],
  "seed-1456": ['GOOGL'],
  "seed-1457": ['GOOGL', 'AMZN'],
  "seed-1458": ['MACRO'],
  "seed-1459": ['AAPL'],
`;
  const marker = '  // 2026-09-01';
  const idx = c.indexOf(marker);
  if (idx === -1) throw new Error('REPORT_TICKERS marker not found');
  write('lib/reports.ts', c.slice(0, idx) + block + c.slice(idx));
  console.log('REPORT_TICKERS: inserted seed-1445~1459');
}

function patchAnalystComments() {
  let c = read('lib/analystPosts.ts');
  if (c.includes('[-976]:')) {
    console.log('analystPosts MOCK comments: -976 already present');
    return;
  }
  const block = `  // 2026-09-02
  [-976]: [{ alias: "댓글_310976", content: "9/2 한장에 반도체·사이버캡 D-1·F14까지 정리 감사합니다", created_at: "2026-09-02T00:10:00.000Z" }],
  [-977]: [
    { alias: "댓글_310977", content: "해상 160척 규모가 B2B ARPU에 얼마나 반영될지 궁금합니다", created_at: "2026-09-02T00:12:00.000Z" },
    { alias: "댓글_310978", content: "V3와 해상 계약을 같이 보라는 말이 도움이 됩니다", created_at: "2026-09-02T00:14:00.000Z" },
  ],
  [-978]: [{ alias: "댓글_310979", content: "사이버캡 45대·구역 264제곱마일이 핵심이네요", created_at: "2026-09-02T00:20:00.000Z" }],
  [-979]: [
    { alias: "댓글_310980", content: "9/15 전후 V3와 F14 일정 겹침을 주목하겠습니다", created_at: "2026-09-02T00:27:00.000Z" },
    { alias: "댓글_310981", content: "용량 10배가 실제 서비스로 이어지는 시점이 관건이겠네요", created_at: "2026-09-02T00:29:00.000Z" },
  ],
  [-980]: [{ alias: "댓글_310982", content: "과학 임무 관점으로 다시 읽어보겠습니다", created_at: "2026-09-02T00:34:00.000Z" }],
  [-981]: [
    { alias: "댓글_310983", content: "D-1 구간 무인 시험 결과가 내일 행사에 나올까요", created_at: "2026-09-02T00:41:00.000Z" },
    { alias: "댓글_310984", content: "공장 시험과 공개 fleet 숫자를 분리해서 보라는 말 공감합니다", created_at: "2026-09-02T00:43:00.000Z" },
  ],
  [-982]: [{ alias: "댓글_310985", content: "급등일에는 기대와 확인을 나누라는 조언 유용합니다", created_at: "2026-09-02T00:48:00.000Z" }],
  [-983]: [
    { alias: "댓글_310986", content: "140억 mi 중 무인 비중은 어디서 확인할 수 있을까요", created_at: "2026-09-02T00:55:00.000Z" },
    { alias: "댓글_310987", content: "24일 만에 10억 mi 증가 속도가 인상적이네요", created_at: "2026-09-02T00:57:00.000Z" },
  ],
  [-984]: [{ alias: "댓글_310988", content: "전력·허가 리스크는 DC·로켓 모두에 해당하겠네요", created_at: "2026-09-02T01:02:00.000Z" }],
  [-985]: [
    { alias: "댓글_310989", content: "GW당 400억 달러 가정의 근거가 궁금합니다", created_at: "2026-09-02T01:10:00.000Z" },
    { alias: "댓글_310990", content: "다음 실적에서 Vera Rubin 일정 언급을 확인하겠습니다", created_at: "2026-09-02T01:12:00.000Z" },
  ],
  [-986]: [{ alias: "댓글_310991", content: "삼성 70% 전망은 분기 HBM 출하로 검증해야겠네요", created_at: "2026-09-02T01:18:00.000Z" }],
  [-987]: [
    { alias: "댓글_310992", content: "테슬라+스페이스X 10억 달러 보유는 테마 ETF 흐름이겠죠", created_at: "2026-09-02T01:25:00.000Z" },
    { alias: "댓글_310993", content: "9/3 전후 ARK flow 같이 보겠습니다", created_at: "2026-09-02T01:27:00.000Z" },
  ],
  [-988]: [{ alias: "댓글_310994", content: "사우디 53억 달러 리전 일정이 핵심이네요", created_at: "2026-09-02T01:32:00.000Z" }],
  [-989]: [
    { alias: "댓글_310995", content: "DC 5375개보다 GW 전력 투입이 중요하다는 말 공감합니다", created_at: "2026-09-02T01:40:00.000Z" },
    { alias: "댓글_310996", content: "칩 주문과 powered DC gap 추적하겠습니다", created_at: "2026-09-02T01:42:00.000Z" },
  ],
  [-990]: [{ alias: "댓글_310997", content: "33엔진 정적점화 후 9/15 전후 발사 창이 변수네요", created_at: "2026-09-02T01:48:00.000Z" }],
`;
  const marker = '  [-961]:';
  const idx = c.indexOf(marker);
  if (idx === -1) throw new Error('MOCK_ANALYST_COMMENTS [-961] not found');
  write('lib/analystPosts.ts', c.slice(0, idx) + block + c.slice(idx));
  console.log('analystPosts: inserted MOCK comments -976~-990');
}

function patchWallPosts() {
  let c = read('lib/wallPosts.ts');
  if (c.includes('T02SEP')) {
    console.log('wallPosts: T02SEP already present');
    return;
  }
  c = c.replace(
    'const T01SEP = 1788217200000; // 2026.09.01 08:00 KST',
    'const T02SEP = 1788303600000; // 2026.09.02 08:00 KST\nconst T01SEP = 1788217200000; // 2026.09.01 08:00 KST',
  );
  c = c.replace('export const LATEST_UPDATE = T01SEP;', 'export const LATEST_UPDATE = T02SEP;');
  const posts = `  // ── 2026-09-02 신규 ────────────────
  { id: 1179, symbol: "MACRO", nickname: "익명_4600", holdingLabel: "관심종목",
    content: "9/2 한장: 기가텍사스 반도체 ~697만SF·사이버캡 45·F14 9/15·웨이모 14도시·공포44",
    createdAt: T02SEP + 8*60_000, likes: 10, comments: 1 },
  { id: 1180, symbol: "TSLA", nickname: "익명_4617", holdingLabel: "관심종목",
    content: "노스캠퍼스 6,974,854SF·오스틴팹 489,600 · 반도체 설비 등록",
    createdAt: T02SEP + 16*60_000, likes: 11, comments: 2 },
  { id: 1181, symbol: "TSLA", nickname: "익명_4634", holdingLabel: "관심종목",
    content: "사이버캡 45대·골든캡·구역 +9% → ~264sq mi · D-1 오스틴",
    createdAt: T02SEP + 24*60_000, likes: 12, comments: 1 },
  { id: 1182, symbol: "SPCX", nickname: "익명_4651", holdingLabel: "관심종목",
    content: "궤도 컴퓨트 2030 매출 1조$ 시나리오 · DC 조직 개편",
    createdAt: T02SEP + 32*60_000, likes: 13, comments: 2 },
  { id: 1183, symbol: "SPCX", nickname: "익명_4668", holdingLabel: "관심종목",
    content: "F14 9/15 최초 궤도 후보 · V3 10× · FCC 42GHz STA",
    createdAt: T02SEP + 40*60_000, likes: 14, comments: 1 },
  { id: 1184, symbol: "NVDA", nickname: "익명_4685", holdingLabel: "관심종목",
    content: "앤스로픽 350억$ 람다 · 텍사스 헛8 DC · 엔비디아 GPU",
    createdAt: T02SEP + 48*60_000, likes: 15, comments: 2 },
  { id: 1185, symbol: "GOOGL", nickname: "익명_4702", holdingLabel: "관심종목",
    content: "유타 지열 396MW · Fervo 파트너십",
    createdAt: T02SEP + 56*60_000, likes: 10, comments: 1 },
  { id: 1186, symbol: "GOOGL", nickname: "익명_4719", holdingLabel: "관심종목",
    content: "웨이모 14개 도시 · 덴버·샌디에이고·탬파 유료",
    createdAt: T02SEP + 64*60_000, likes: 11, comments: 2 },
  { id: 1187, symbol: "DELL", nickname: "익명_4736", holdingLabel: "관심종목",
    content: "DELL EPS 7.04 vs 4.92 · 매출 469억$ vs 445억$",
    createdAt: T02SEP + 72*60_000, likes: 12, comments: 1 },
  { id: 1188, symbol: "PANW", nickname: "익명_4753", holdingLabel: "관심종목",
    content: "PANW EPS 1.02 vs 0.98 · 매출 34.1억$",
    createdAt: T02SEP + 80*60_000, likes: 13, comments: 2 },
  { id: 1189, symbol: "TSLA", nickname: "익명_4770", holdingLabel: "관심종목",
    content: "유럽 8월 프랑스 +279% YoY · 덴마크 +104%",
    createdAt: T02SEP + 88*60_000, likes: 14, comments: 1 },
  { id: 1190, symbol: "AAPL", nickname: "익명_4787", holdingLabel: "관심종목",
    content: "애플, 오픈AI 증거 파괴 주장 · 소송 변수",
    createdAt: T02SEP + 96*60_000, likes: 15, comments: 2 },
  { id: 1191, symbol: "MACRO", nickname: "익명_4804", holdingLabel: "관심종목",
    content: "공포탐욕 44(공포) · 일주 전 56(탐욕)",
    createdAt: T02SEP + 104*60_000, likes: 10, comments: 1 },
  { id: 1192, symbol: "AMZN", nickname: "익명_4821", holdingLabel: "관심종목",
    content: "유튜브 영상 상품 태깅 · 아마존 연동",
    createdAt: T02SEP + 112*60_000, likes: 11, comments: 2 },
  { id: 1193, symbol: "SPCX", nickname: "익명_4838", holdingLabel: "관심종목",
    content: "스페이스X DC 리더십 셰이크업 · 궤도 컴퓨트 맥락",
    createdAt: T02SEP + 120*60_000, likes: 12, comments: 1 },
`;
  const comments = `  // ── 2026-09-02 신규 댓글 ────────────────
  1179: [
    { id: 1, nickname: "익명_6179", holdingLabel: "관심종목", content: "9/2 핵심 포인트네요", createdAt: T02SEP + 8*60_000 + 3*60_000, likes: 4 },
  ],
  1180: [
    { id: 1, nickname: "익명_6180", holdingLabel: "관심종목", content: "697만 SF면 설비 규모가 꽤 크네요", createdAt: T02SEP + 16*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6280", holdingLabel: "관심종목", content: "2029 완공 일정도 같이 봐야겠어요", createdAt: T02SEP + 16*60_000 + 6*60_000, likes: 5 },
  ],
  1181: [
    { id: 1, nickname: "익명_6181", holdingLabel: "관심종목", content: "내일 사이버캡 D-1 맞죠", createdAt: T02SEP + 24*60_000 + 3*60_000, likes: 4 },
  ],
  1182: [
    { id: 1, nickname: "익명_6182", holdingLabel: "관심종목", content: "1조$ 시나리오는 GW 가정이 핵심이겠네요", createdAt: T02SEP + 32*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6282", holdingLabel: "관심종목", content: "DC 조직 개편도 같이 추적할게요", createdAt: T02SEP + 32*60_000 + 6*60_000, likes: 5 },
  ],
  1183: [
    { id: 1, nickname: "익명_6183", holdingLabel: "관심종목", content: "9/15 F14 일정 주목합니다", createdAt: T02SEP + 40*60_000 + 3*60_000, likes: 4 },
  ],
  1184: [
    { id: 1, nickname: "익명_6184", holdingLabel: "관심종목", content: "350억$ 람다 계약 규모가 크네요", createdAt: T02SEP + 48*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6284", holdingLabel: "관심종목", content: "GPU 공급 일정도 봐야겠어요", createdAt: T02SEP + 48*60_000 + 6*60_000, likes: 5 },
  ],
  1185: [
    { id: 1, nickname: "익명_6185", holdingLabel: "관심종목", content: "396MW 지열은 DC 전력 변수죠", createdAt: T02SEP + 56*60_000 + 3*60_000, likes: 4 },
  ],
  1186: [
    { id: 1, nickname: "익명_6186", holdingLabel: "관심종목", content: "14개 도시면 Waymo 스케일이 보이네요", createdAt: T02SEP + 64*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6286", holdingLabel: "관심종목", content: "유료 서비스 도시 수가 관건이겠어요", createdAt: T02SEP + 64*60_000 + 6*60_000, likes: 5 },
  ],
  1187: [
    { id: 1, nickname: "익명_6187", holdingLabel: "관심종목", content: "EPS 비트 폭이 크네요", createdAt: T02SEP + 72*60_000 + 3*60_000, likes: 4 },
  ],
  1188: [
    { id: 1, nickname: "익명_6188", holdingLabel: "관심종목", content: "사이버보안 실적도 좋았군요", createdAt: T02SEP + 80*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6288", holdingLabel: "관심종목", content: "가이던스도 같이 볼게요", createdAt: T02SEP + 80*60_000 + 6*60_000, likes: 5 },
  ],
  1189: [
    { id: 1, nickname: "익명_6189", holdingLabel: "관심종목", content: "프랑스 +279%는 등록 기준이죠?", createdAt: T02SEP + 88*60_000 + 3*60_000, likes: 4 },
  ],
  1190: [
    { id: 1, nickname: "익명_6190", holdingLabel: "관심종목", content: "소송 변수가 커지겠네요", createdAt: T02SEP + 96*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6290", holdingLabel: "관심종목", content: "증거 보전 명령 나올지 봐야겠어요", createdAt: T02SEP + 96*60_000 + 6*60_000, likes: 5 },
  ],
  1191: [
    { id: 1, nickname: "익명_6191", holdingLabel: "관심종목", content: "56→44면 심리가 꽤 식었네요", createdAt: T02SEP + 104*60_000 + 3*60_000, likes: 4 },
  ],
  1192: [
    { id: 1, nickname: "익명_6192", holdingLabel: "관심종목", content: "쇼핑 태깅이 커머스 수익화죠", createdAt: T02SEP + 112*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6292", holdingLabel: "관심종목", content: "크리에이터 수익 구조도 바뀌겠네요", createdAt: T02SEP + 112*60_000 + 6*60_000, likes: 5 },
  ],
  1193: [
    { id: 1, nickname: "익명_6193", holdingLabel: "관심종목", content: "궤도 컴퓨트랑 연결해서 봐야겠어요", createdAt: T02SEP + 120*60_000 + 3*60_000, likes: 4 },
  ],
`;
  const postMarker = '  // ── 2026-09-01 신규 ────────────────';
  const commentMarker = '  // ── 2026-09-01 신규 댓글 ────────────────';
  const pi = c.indexOf(postMarker);
  const ci = c.indexOf(commentMarker);
  if (pi === -1 || ci === -1) throw new Error('wallPosts markers not found');
  c = c.slice(0, pi) + posts + c.slice(pi);
  c = c.slice(0, ci) + comments + c.slice(ci);
  write('lib/wallPosts.ts', c);
  console.log('wallPosts: T02SEP, posts 1179-1193, comments');
}

function patchWallPostsMarkets() {
  let c = read('lib/wallPosts-markets.ts');
  if (c.includes('const T02 =')) {
    console.log('wallPosts-markets: T02 already present');
    return;
  }
  c = c.replace(
    'const T01 = 1788217200000; // 2026-09-01 08:00 KST',
    'const T02 = 1788303600000; // 2026-09-02 08:00 KST\nconst T01 = 1788217200000; // 2026-09-01 08:00 KST',
  );
  const krPosts = `  { id: 9042, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "관심종목", content: "6873.50 +0.90% · 외국인 890억 순매수 · 사이버캡 D-1", createdAt: T02 - 0, likes: 31, comments: 2, },
  { id: 9043, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "관심종목", content: "HBM 70%·HBM3E 5× · +0.82%", createdAt: T02 - 1800000, likes: 30, comments: 2, },
  { id: 9044, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "관심종목", content: "+1.12% · HBM 품귀 전망", createdAt: T02 - 3600000, likes: 29, comments: 2, },
  { id: 9045, symbol: "LG에너지솔루션", nickname: "배터리존버", holdingLabel: "관심종목", content: "+0.55% · 2차전지 지수 받침", createdAt: T02 - 5400000, likes: 28, comments: 2, },
  { id: 9046, symbol: "기아", nickname: "자동차매니아", holdingLabel: "관심종목", content: "+0.91% · 사이버캡 D-1 글로벌", createdAt: T02 - 7200000, likes: 27, comments: 2, },
  { id: 9047, symbol: "NAVER", nickname: "플랫폼러", holdingLabel: "관심종목", content: "-0.34% · 플랫폼 약세", createdAt: T02 - 9000000, likes: 26, comments: 2, },
`;
  const krComments = `  9042: [
    { id: 1, nickname: "수급쟁이", holdingLabel: "관심종목", content: "외국인 890억은 금요일 대비 줄었지만 순매수 전환", createdAt: T02 + 600_000, likes: 5 },
    { id: 2, nickname: "지수관찰", holdingLabel: "관심종목", content: "6870선 회복 확인했습니다.", createdAt: T02 + 1200_000, likes: 4 },
  ],
  9043: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "HBM 70%는 분기 출하로 검증해야죠.", createdAt: T02 - 1200_000, likes: 6 },
    { id: 2, nickname: "수출통계러", holdingLabel: "관심종목", content: "현물 5배는 품귀 신호 맞습니다.", createdAt: T02 - 900_000, likes: 5 },
  ],
  9044: [
    { id: 1, nickname: "HBM러버", holdingLabel: "관심종목", content: "+1.12%는 테마가 수급보다 먼저 반응한 날.", createdAt: T02 - 3000_000, likes: 5 },
    { id: 2, nickname: "이익률체크", holdingLabel: "관심종목", content: "분기 ASP 같이 추적하겠습니다.", createdAt: T02 - 2400_000, likes: 4 },
  ],
  9045: [
    { id: 1, nickname: "배터리존버", holdingLabel: "관심종목", content: "2차전지가 지수 받쳐준 흐름 맞네요.", createdAt: T02 - 4800_000, likes: 5 },
    { id: 2, nickname: "가동률체크", holdingLabel: "관심종목", content: "수주 공시 나올 때까지는 조심.", createdAt: T02 - 4200_000, likes: 4 },
  ],
  9046: [
    { id: 1, nickname: "자동차매니아", holdingLabel: "관심종목", content: "사이버캡 D-1은 완성차 심리 변수죠.", createdAt: T02 - 6600_000, likes: 5 },
    { id: 2, nickname: "미국판매러", holdingLabel: "관심종목", content: "내일 행사 결과 같이 봐야겠어요.", createdAt: T02 - 6000_000, likes: 4 },
  ],
  9047: [
    { id: 1, nickname: "플랫폼러", holdingLabel: "관심종목", content: "반등장에서 플랫폼 약세 패턴이네요.", createdAt: T02 - 8400_000, likes: 4 },
    { id: 2, nickname: "광고업계", holdingLabel: "관심종목", content: "분기 광고 매출 나올 때까지 관망.", createdAt: T02 - 7800_000, likes: 3 },
  ],
`;
  const safePosts = `  { id: 9135, symbol: "비트코인", nickname: "온체인러", holdingLabel: "관심종목", content: "~108248 · 10.8만$ · 공포44", createdAt: T02 - 0, likes: 28, comments: 2, },
  { id: 9136, symbol: "금", nickname: "금벌레", holdingLabel: "관심종목", content: "~3475 · 금>달러 준비자산", createdAt: T02 - 1800000, likes: 27, comments: 2, },
  { id: 9137, symbol: "이더리움", nickname: "이더러", holdingLabel: "관심종목", content: "~4512 · 4500$ 선", createdAt: T02 - 3600000, likes: 26, comments: 2, },
  { id: 9138, symbol: "은", nickname: "실물러", holdingLabel: "관심종목", content: "~38.6 · Au/Ag ratio", createdAt: T02 - 5400000, likes: 25, comments: 2, },
  { id: 9139, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관심종목", content: "DXY 98.2 · 인상 57% · FOMC 9/15~16", createdAt: T02 - 7200000, likes: 24, comments: 2, },
`;
  const safeComments = `  9135: [
    { id: 1, nickname: "ETF추적", holdingLabel: "관심종목", content: "10.8만$ 선과 ETF 순유입 같이 봐야죠.", createdAt: T02 - 3000_000, likes: 5 },
    { id: 2, nickname: "헷지", holdingLabel: "관심종목", content: "공포44면 리스크오프도 변수.", createdAt: T02 - 2400_000, likes: 4 },
  ],
  9136: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "금>달러 준비자산 서사는 중장기 변수.", createdAt: T02 - 4800_000, likes: 5 },
    { id: 2, nickname: "달러보기", holdingLabel: "관심종목", content: "FOMC 9/15~16 전후 변동성 대비.", createdAt: T02 - 4200_000, likes: 4 },
  ],
  9137: [
    { id: 1, nickname: "스테이커", holdingLabel: "관심종목", content: "4500$ 선과 비트 10.8만 같이 보겠습니다.", createdAt: T02 - 6600_000, likes: 5 },
    { id: 2, nickname: "헷지", holdingLabel: "관심종목", content: "스테이킹 수익 vs 2년물 금리도 확인.", createdAt: T02 - 6000_000, likes: 4 },
  ],
  9138: [
    { id: 1, nickname: "실물러", holdingLabel: "관심종목", content: "금·산업 수요 겹치는 날이네요.", createdAt: T02 - 8400_000, likes: 4 },
    { id: 2, nickname: "비율체크", holdingLabel: "관심종목", content: "Au/Ag ratio 같이 추적.", createdAt: T02 - 7800_000, likes: 3 },
  ],
  9139: [
    { id: 1, nickname: "채권데스크", holdingLabel: "관심종목", content: "98선 위·아래 반응 기록하겠습니다.", createdAt: T02 - 10200_000, likes: 5 },
    { id: 2, nickname: "환율데스크", holdingLabel: "관심종목", content: "원·달러 1366.5원과 DXY 연동 맞네요.", createdAt: T02 - 9600_000, likes: 4 },
  ],
`;
  const rePosts = `  { id: 9239, symbol: "서울", nickname: "서울러", holdingLabel: "관심", content: "강남·마포 소폭 반등 · FOMC 전 관망", createdAt: T02 - 0, likes: 28, comments: 2, },
  { id: 9240, symbol: "전세", nickname: "전세러", holdingLabel: "관심", content: "학군·역세권 소폭 반등 · 입주 물량 변수", createdAt: T02 - 1200000, likes: 27, comments: 2, },
  { id: 9241, symbol: "매매", nickname: "실수요자", holdingLabel: "관심", content: "FOMC·세금 부담 관망 · 보합~-0.1%", createdAt: T02 - 2400000, likes: 26, comments: 2, },
  { id: 9242, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급 확대 수사·대출 규제 유지", createdAt: T02 - 3600000, likes: 25, comments: 2, },
`;
  const reComments = `  9239: [
    { id: 1, nickname: "실수요", holdingLabel: "관심", content: "구별 온도 차 큰 날 맞네요.", createdAt: T02 + 600_000, likes: 4 },
    { id: 2, nickname: "전세대출", holdingLabel: "관심", content: "FOMC 결과가 심리 좌우하겠습니다.", createdAt: T02 + 1200_000, likes: 3 },
  ],
  9240: [
    { id: 1, nickname: "전세러", holdingLabel: "관심", content: "입주 물량이 변수 맞습니다.", createdAt: T02 - 600_000, likes: 4 },
    { id: 2, nickname: "대출상담", holdingLabel: "관심", content: "LTV·DSR 규제가 수요를 제한하죠.", createdAt: T02 - 300_000, likes: 3 },
  ],
  9241: [
    { id: 1, nickname: "실수요", holdingLabel: "관심", content: "보합~ -0.1% 구간 맞네요.", createdAt: T02 - 1800_000, likes: 4 },
    { id: 2, nickname: "세제확인", holdingLabel: "관심", content: "세금 부담에 FOMC까지 겹치면 관망.", createdAt: T02 - 1200_000, likes: 3 },
  ],
  9242: [
    { id: 1, nickname: "정책워처", holdingLabel: "관심", content: "공급 수사만으로는 단기 가격 안 잡혀요.", createdAt: T02 - 3000_000, likes: 4 },
    { id: 2, nickname: "전세러", holdingLabel: "관심", content: "대출 규제가 더 직접적 지렛대죠.", createdAt: T02 - 2400_000, likes: 3 },
  ],
`;
  c = c.replace('export const MOCK_POSTS_KR: Post[] = [\n', `export const MOCK_POSTS_KR: Post[] = [\n${krPosts}`);
  c = c.replace('export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n', `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krComments}`);
  c = c.replace('export const MOCK_POSTS_SAFE: Post[] = [\n', `export const MOCK_POSTS_SAFE: Post[] = [\n${safePosts}`);
  c = c.replace('export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n', `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${safeComments}`);
  c = c.replace('export const MOCK_POSTS_KR_RE: Post[] = [\n', `export const MOCK_POSTS_KR_RE: Post[] = [\n${rePosts}`);
  c = c.replace('export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n', `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${reComments}`);
  write('lib/wallPosts-markets.ts', c);
  console.log('wallPosts-markets: KR/Safe/KR-RE 9/2 posts');
}

function patchAnalystMarkets() {
  let c = read('lib/analystPosts-markets.ts');
  if (c.includes('2026-09-02T06:00:00.000Z')) {
    console.log('analystPosts-markets: 9/2 already present');
    return;
  }
  const krPosts = `  { id: -2020, alias: "여의도 너구리 #11", symbol: "코스피", content: "9월 2일 코스피 6,873.50(+0.90%)로 금요일 조정 뒤 반등을 이어갔습니다. 외국인 890억 원 순매수, 기관 891억 원 순매도, 개인 623억 원 순매수입니다. 9월 3일 사이버캡 D-1·FOMC 9/15~16·인상 57%가 겹칩니다.", likes: 28, comments: 2, created_at: "2026-09-02T06:00:00.000Z", liked: false, },
  { id: -2021, alias: "판교 치타 #22", symbol: "삼성전자", content: "삼성전자 +0.82%. HBM 생산능력 70%·HBM3E 현물가 계약가 대비 약 5배 전망이 국내 메모리주에 전달됐습니다. 분기 HBM 출하·평균 판매 가격으로 검증하시기 바랍니다.", likes: 27, comments: 2, created_at: "2026-09-02T06:08:00.000Z", liked: false, },
  { id: -2022, alias: "삼성동 여우 #08", symbol: "SK하이닉스", content: "SK하이닉스 +1.12%로 대형주 중 상대 강세. HBM 품귀 전망과 외국인 순매수 전환 구간이 겹친 날입니다.", likes: 26, comments: 2, created_at: "2026-09-02T06:16:00.000Z", liked: false, },
  { id: -2023, alias: "성수 수달 #35", symbol: "LG에너지솔루션", content: "LG에너지솔루션 +0.55%로 2차전지가 지수 반등을 받쳤습니다. 원·달러 1,366.5원(-2.7원)을 함께 보시면 됩니다.", likes: 25, comments: 2, created_at: "2026-09-02T06:24:00.000Z", liked: false, },
  { id: -2024, alias: "한남 두루미 #17", symbol: "기아", content: "기아 +0.91%. 미국 사이버캡 45대·9월 3일 행사 D-1이 완성차 심리 변수입니다.", likes: 24, comments: 2, created_at: "2026-09-02T06:32:00.000Z", liked: false, },
  { id: -2025, alias: "잠실 백로 #29", symbol: "NAVER", content: "NAVER -0.34%로 반등장에서 플랫폼주는 상대 약세. 반도체·2차전지·완성차가 지수를 이끈 날입니다.", likes: 23, comments: 2, created_at: "2026-09-02T06:40:00.000Z", liked: false, },
`;
  const krComments = `  [-2020]: [
    { alias: "수급파트", content: "외국인 890억은 금요일 대비 줄었지만 순매수 전환이네요.", created_at: "2026-09-02T06:24:00.000Z" },
    { alias: "환율데스크", content: "6870선 회복과 환율 1366.5원 같이 봐야겠습니다.", created_at: "2026-09-02T06:36:00.000Z" },
  ],
  [-2021]: [
    { alias: "메모리사이클", content: "HBM 70%는 분기 출하로 검증해야죠.", created_at: "2026-09-02T06:32:00.000Z" },
    { alias: "수출통계러", content: "현물 5배는 품귀 신호 맞습니다.", created_at: "2026-09-02T06:44:00.000Z" },
  ],
  [-2022]: [
    { alias: "HBM러버", content: "+1.12%는 테마가 수급보다 먼저 반응한 날.", created_at: "2026-09-02T06:40:00.000Z" },
    { alias: "이익률체크", content: "분기 ASP 같이 추적하겠습니다.", created_at: "2026-09-02T06:52:00.000Z" },
  ],
  [-2023]: [
    { alias: "배터리존버", content: "2차전지가 지수 받쳐준 흐름 맞네요.", created_at: "2026-09-02T06:48:00.000Z" },
    { alias: "가동률체크", content: "수주 공시 나올 때까지는 조심.", created_at: "2026-09-02T07:00:00.000Z" },
  ],
  [-2024]: [
    { alias: "자동차매니아", content: "사이버캡 D-1은 글로벌 변수죠.", created_at: "2026-09-02T06:56:00.000Z" },
    { alias: "미국판매러", content: "내일 행사 결과도 같이 보겠습니다.", created_at: "2026-09-02T07:08:00.000Z" },
  ],
  [-2025]: [
    { alias: "플랫폼러", content: "반등장에서 플랫폼 약세 패턴이네요.", created_at: "2026-09-02T07:04:00.000Z" },
    { alias: "광고업계", content: "분기 광고 매출 나올 때까지 관망.", created_at: "2026-09-02T07:16:00.000Z" },
  ],
`;
  const safePosts = `  { id: -2026, alias: "온체인 매 #03", symbol: "비트코인", content: "9월 2일 안전자산 한장 요약입니다. 비트코인 약 108,248달러, 금 약 3,475달러, 이더리움 약 4,512달러, 달러인덱스 98.2. 공포탐욕 44·FOMC 9/15~16·인상 57%가 공통 변수입니다.", likes: 24, comments: 2, created_at: "2026-09-02T09:00:00.000Z", liked: false, },
  { id: -2027, alias: "금벌레 #17", symbol: "비트코인", content: "비트코인 약 108,248달러, 10.8만 달러 심리선 부근. 공포탐욕 44·달러인덱스 98.2와 함께 금리 민감 자산으로 부각됐습니다.", likes: 23, comments: 2, created_at: "2026-09-02T09:08:00.000Z", liked: false, },
  { id: -2028, alias: "금벌레 #17", symbol: "금", content: "금 약 3,475달러. 금 보유액이 달러를 넘는 준비자산 논의와 FOMC 9/15~16이 겹칩니다.", likes: 22, comments: 2, created_at: "2026-09-02T09:16:00.000Z", liked: false, },
  { id: -2029, alias: "이더러 #44", symbol: "이더리움", content: "이더리움 약 4,512달러, 4,500달러 선 위. 비트코인·금과 같은 거시 변수를 공유합니다.", likes: 21, comments: 2, created_at: "2026-09-02T09:24:00.000Z", liked: false, },
  { id: -2030, alias: "매크로올빼미 #31", symbol: "달러인덱스", content: "달러인덱스(DXY) 약 98.2. 9월 인상 57%·FOMC 9/15~16·원·달러 1,366.5원과 함께 비트코인·금·원화 자산의 공통 변수입니다.", likes: 20, comments: 2, created_at: "2026-09-02T09:32:00.000Z", liked: false, },
`;
  const safeComments = `  [-2026]: [
    { alias: "헷지", content: "10.8만·3475·4512·DXY 98.2 네 줄 같이 보겠습니다.", created_at: "2026-09-02T09:24:00.000Z" },
    { alias: "실질금리", content: "공포44면 리스크오프도 변수.", created_at: "2026-09-02T09:36:00.000Z" },
  ],
  [-2027]: [
    { alias: "ETF추적", content: "10.8만$ 선과 ETF 순유입 같이 봐야죠.", created_at: "2026-09-02T09:32:00.000Z" },
    { alias: "헷지", content: "인상 57%면 기회비용 재계산 구간.", created_at: "2026-09-02T09:44:00.000Z" },
  ],
  [-2028]: [
    { alias: "실질금리", content: "금>달러 준비자산 서사는 중장기 변수.", created_at: "2026-09-02T09:40:00.000Z" },
    { alias: "달러보기", content: "FOMC 9/15~16 전후 변동성 대비.", created_at: "2026-09-02T09:52:00.000Z" },
  ],
  [-2029]: [
    { alias: "스테이커", content: "4500$ 선과 비트 10.8만 같이 보겠습니다.", created_at: "2026-09-02T09:48:00.000Z" },
    { alias: "헷지", content: "스테이킹 수익 vs 2년물 금리도 확인.", created_at: "2026-09-02T10:00:00.000Z" },
  ],
  [-2030]: [
    { alias: "채권데스크", content: "98선 위·아래 반응 기록하겠습니다.", created_at: "2026-09-02T09:56:00.000Z" },
    { alias: "환율데스크", content: "원·달러 1366.5원과 DXY 연동 맞네요.", created_at: "2026-09-02T10:08:00.000Z" },
  ],
`;
  const rePosts = `  { id: -2031, alias: "실수요 #05", symbol: "전세", content: "9월 2일 부동산 한장 요약입니다. 전세는 학군·역세권 일부 소폭 반등, 매매는 FOMC·세금 부담으로 관망. 9월 입주 물량·전세대출 규제·인상 57%가 변수입니다.", likes: 22, comments: 2, created_at: "2026-09-02T10:00:00.000Z", liked: false, },
  { id: -2032, alias: "전세러 #09", symbol: "전세", content: "9월 2일 전세는 학군·역세권 일부 소폭 반등, 지방은 약세 지속. 9월 입주 물량·전세대출 규제가 변수입니다.", likes: 21, comments: 2, created_at: "2026-09-02T10:08:00.000Z", liked: false, },
  { id: -2033, alias: "실수요 #05", symbol: "매매", content: "매매는 FOMC·세금 부담으로 관망. 수도권 실거래 지수는 보합~ -0.1% 구간입니다.", likes: 20, comments: 2, created_at: "2026-09-02T10:16:00.000Z", liked: false, },
  { id: -2034, alias: "정책워처 #01", symbol: "정책", content: "9월 정책基調: 공급 확대 수사·대출 규제 유지. FOMC 결과가 주담대·전세대출 심리에 영향을 줄 수 있습니다.", likes: 19, comments: 2, created_at: "2026-09-02T10:24:00.000Z", liked: false, },
`;
  const reComments = `  [-2031]: [
    { alias: "실수요", content: "전세·매매 혼조를 한 줄로 정리해 주셨네요.", created_at: "2026-09-02T10:24:00.000Z" },
    { alias: "전세대출", content: "FOMC 결과가 전세 심리 좌우하겠습니다.", created_at: "2026-09-02T10:36:00.000Z" },
  ],
  [-2032]: [
    { alias: "전세러", content: "입주 물량이 변수 맞습니다.", created_at: "2026-09-02T10:32:00.000Z" },
    { alias: "대출상담", content: "LTV·DSR 규제가 수요를 제한하죠.", created_at: "2026-09-02T10:44:00.000Z" },
  ],
  [-2033]: [
    { alias: "실수요", content: "보합~ -0.1% 구간 맞네요.", created_at: "2026-09-02T10:40:00.000Z" },
    { alias: "세제확인", content: "세금 부담에 FOMC까지 겹치면 관망.", created_at: "2026-09-02T10:52:00.000Z" },
  ],
  [-2034]: [
    { alias: "정책워처", content: "공급 수사만으로는 단기 가격 안 잡혀요.", created_at: "2026-09-02T10:48:00.000Z" },
    { alias: "전세러", content: "대출 규제가 더 직접적 지렛대죠.", created_at: "2026-09-02T11:00:00.000Z" },
  ],
`;
  c = c.replace('export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n', `export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n${krPosts}`);
  c = c.replace('export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n', `export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n${krComments}`);
  c = c.replace('export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n', `export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n${safePosts}`);
  c = c.replace('export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n', `export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n${safeComments}`);
  c = c.replace('export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n', `export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n${rePosts}`);
  c = c.replace('export const MOCK_ANALYST_COMMENTS_KR_RE: Record<number, AnalystMockComment[]> = {\n', `export const MOCK_ANALYST_COMMENTS_KR_RE: Record<number, AnalystMockComment[]> = {\n${reComments}`);
  write('lib/analystPosts-markets.ts', c);
  console.log('analystPosts-markets: KR/Safe/KR-RE 9/2 analyst posts');
}

patchReportsTickers();
patchAnalystComments();
patchWallPosts();
patchWallPostsMarkets();
patchAnalystMarkets();
console.log('done');
