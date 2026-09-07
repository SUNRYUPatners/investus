#!/usr/bin/env node
/** Insert 2026-09-08 KR + Safe + KR-RE reports, wall, analyst (diverse copy). US handled separately. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KRRE } = require("./data-20260908-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-08";
const UPDATED = "2026.09.08 08:40";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T08 = 1788822000000; // 2026.09.08 08:00 KST
const TAG = "20260908";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const ALIASES = [
  "종로 까치 #41", "광화문 여우 #62", "여의도 수리 #28", "송파 독수리 #66",
  "분당 매 #31", "성수 너구리 #15", "역삼 판다 #77", "한남 재규어 #27",
  "삼성동 올빼미 #19", "해운대 고래 #03", "마포 살괭이 #08", "판교 늑대 #90",
  "인천 갈매기 #52", "압구정 치타 #44", "잠실 백로 #29", "청담 여우 #11",
  "합정 수달 #07", "이태원 부엉이 #18", "성북 참새 #33", "노원 기러기 #21",
  "분당 호랑이 #55", "여의도 학 #12", "강남 표범 #04", "마곡 펠리컨 #63",
];

function tsBlock(r, opts = {}) {
  const date = opts.dashDate ? DATE_DASH : "2026.09.08";
  const img = `/charts/${r.slug}-${TAG}.svg`;
  const imgEn = `/charts/${r.slug}-${TAG}-en.svg`;
  const pinned = r.pinned || r.isPinned ? "\n    isPinned: true," : "";
  const bodyHelper = opts.bodyHelper;
  const bodyField = bodyHelper
    ? `body: body(${JSON.stringify(r.body)}),`
    : `body: ${JSON.stringify(r.body)},`;
  return `  {
    id: ${JSON.stringify(r.id)},
    title: ${JSON.stringify(r.title)},
    summary: ${JSON.stringify(r.summary)},
    ${bodyField}
    titleEn: ${JSON.stringify(r.titleEn || r.title)},
    summaryEn: ${JSON.stringify(r.summaryEn || r.summary)},
    bodyEn: ${JSON.stringify(BODY_EN)},
    category: ${JSON.stringify(r.category)},
    categoryColor: ${JSON.stringify(r.color)},
    subject: ${JSON.stringify(r.subject)},
    date: ${JSON.stringify(date)},
    updatedAt: ${JSON.stringify(UPDATED)},${pinned}
    images: [${JSON.stringify(img)}],
    imagesEn: [${JSON.stringify(imgEn)}],
  }`;
}

function insertMarketReports() {
  const jobs = [
    // bodies already include BK footer — do not wrap with body() again
    ["lib/reports-kr.ts", "kr-seed-150", KR, false],
    ["lib/reports-safe.ts", "safe-seed-140", SAFE, false],
    ["lib/reports-kr-re.ts", "krre-seed-130", KRRE, false],
  ];
  for (const [file, beforeId, arr, bodyHelper] of jobs) {
    let c = read(file);
    if (c.includes(`id: "${arr[0].id}"`)) {
      console.log(`${file}: ${arr[0].id} already present — skip`);
      continue;
    }
    const block = arr.map((r) => tsBlock(r, { dashDate: true, bodyHelper })).join(",\n") + ",\n";
    const idx = c.indexOf(`id: "${beforeId}"`);
    if (idx === -1) throw new Error(`${file}: ${beforeId} not found`);
    const start = c.lastIndexOf("  {", idx);
    write(file, c.slice(0, start) + block + c.slice(start));
    console.log(`${file}: inserted ${arr[0].id}~${arr[arr.length - 1].id}`);
  }
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T08 =")) {
    c = c.replace(
      "const T07 = 1788735600000; // 2026-09-07 08:00 KST",
      "const T08 = 1788822000000; // 2026-09-08 08:00 KST\nconst T07 = 1788735600000; // 2026-09-07 08:00 KST",
    );
  }
  if (!c.includes("id: 9080")) {
    const kr = [
      [9080, "코스피", "칠천피돌파러", "인덱스 보유", "어제 6995 찍고 +4.61%… 7000 직전인데 외인이 삼전·하이닉스에만 몰린 느낌이라 지수=전업종 강세로 안 읽어요"],
      [9081, "삼성전자", "반도체수급러", "삼성전자 보유", "27만 +5.68%에 외인 8800억대면 수급은 세긴 한데, 목표가 40만은 의견이라 종가랑 칸을 나눔"],
      [9082, "SK하이닉스", "HBM베타", "하이닉스 보유", "178만 +8%대면 베타가 지수보다 훨씬 큼. 1.37조 외인만 보고 추격하진 않을게요"],
      [9083, "현대차", "완성차체크", "현대차 관심", "반도체 불꽃인데 현대는 +2.48%만. 환율·유가 표 따로 두고 봄"],
      [9084, "KB금융", "금융동행러", "KB금융 관심", "어제는 −3%대였는데 오늘은 +2%대. 금리 민감은 여전해서 FOMC 전엔 추격 패스"],
      [9085, "삼성바이오로직스", "바이오동행", "삼바 관심", "삼바 +1.31%는 따라가되 덜 감. 수주 공시 없으면 비중 안 키움"],
    ];
    const block = kr
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T08 - ${i * 1800000}, likes: ${42 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${block}\n`);
    const krC = `  9080: [
    { id: 1, nickname: "수급표작성", holdingLabel: "관망", content: "종목별 외인이랑 지수 등락을 한 셀에 넣지 마세요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "칠천피돌파러", holdingLabel: "인덱스 보유", content: "7000 종가+외인 지속일 때만 안착으로 적을게요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9081: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "목표가 상향은 컨센서스 칸, 체결은 수급 칸", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "반도체수급러", holdingLabel: "삼성전자 보유", content: "하이닉스랑 상대 성과만 표에 남겨둘게요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9082: [
    { id: 1, nickname: "HBM베타", holdingLabel: "하이닉스 보유", content: "고베라는 물가·FOMC에 먼저 흔들려요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "외인추적", holdingLabel: "관심종목", content: "1.37조가 이틀 이어지는지가 관건", createdAt: T08 + 1200000, likes: 4 },
  ],
  9083: [
    { id: 1, nickname: "완성차체크", holdingLabel: "현대차 관심", content: "원달러 1340 근처면 채산성 해석이 갈려요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "유가보는사람", holdingLabel: "관심종목", content: "반도체 베타랑 자동차 수요는 시계가 다름", createdAt: T08 + 1200000, likes: 4 },
  ],
  9084: [
    { id: 1, nickname: "금리표러", holdingLabel: "관심종목", content: "NIM이랑 연체를 한 화면에 둬야 착시가 줄어요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "금융동행러", holdingLabel: "KB금융 관심", content: "위험온 날 은행 추격은 사이즈 작게", createdAt: T08 + 1200000, likes: 4 },
  ],
  9085: [
    { id: 1, nickname: "바이오동행", holdingLabel: "삼바 관심", content: "시총 상위 동행이지 수주 증명 아님", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "가동률체크", holdingLabel: "관심종목", content: "공시 나오기 전엔 관망이 맞음", createdAt: T08 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9170")) {
    const safe = [
      [9170, "매크로", "비율체크러", "관망", "비트/금 비율 18온스대 + 상관 0.56… 증폭 금 서사는 이해되는데 레버리지 이유는 아님"],
      [9171, "비트코인", "팔만지지러", "BTC 보유", "80700 안팎이면 8만 안착 테스트. 유입 없으면 숏커버로만 분류"],
      [9172, "금", "온스밴드러", "금 ETF", "4400달러대 금은 느리게, 비트는 빠르게. 비율이랑 상관을 한 줄에 안 넣음"],
      [9173, "은", "은이중성격", "관심", "헤지 옆자리에 산업 수요 줄 따로. 금은비율 벌어지면 해석이 갈림"],
      [9174, "달러", "디엑시공통", "관망", "DXY가 공통 분모인데 원달러만 보면 헷갈림. 두 표로 분리"],
      [9175, "구리", "구리온도계", "관심", "금·비트가 헤지일 때 구리는 성장 온도계. 같이 올랐는지부터"],
    ];
    const block = safe
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T08 - ${i * 1800000}, likes: ${40 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${block}\n`);
    const sC = `  9170: [
    { id: 1, nickname: "매크로올빼미", holdingLabel: "관심종목", content: "상관은 후행이라 앞으로를 보장하진 않아요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "비율체크러", holdingLabel: "관망", content: "FOMC 전엔 사이즈부터 줄일게요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9171: [
    { id: 1, nickname: "ETF추적", holdingLabel: "관심종목", content: "유입 맵이랑 청산 히트맵을 가격 옆에", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "팔만지지러", holdingLabel: "BTC 보유", content: "8만 깨지면 다음 심리는 7.9만 쪽", createdAt: T08 + 1200000, likes: 4 },
  ],
  9172: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "온스 밴드보다 실질금리 방향이 먼저", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "온스밴드러", holdingLabel: "금 ETF", content: "비트만 급락하면 상관이 다시 깨져요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9173: [
    { id: 1, nickname: "은이중성격", holdingLabel: "관심", content: "산업 수요 줄 없으면 헤지 추격 안 함", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "디엑시공통", holdingLabel: "관망", content: "달러 강하면 은이 금보다 더 눌려요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9174: [
    { id: 1, nickname: "디엑시공통", holdingLabel: "관망", content: "원달러랑 DXY를 같은 셀에 넣지 마세요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "금리표러", holdingLabel: "관심종목", content: "회의 전 달러 레버리지는 패스", createdAt: T08 + 1200000, likes: 4 },
  ],
  9175: [
    { id: 1, nickname: "구리온도계", holdingLabel: "관심", content: "재고·중국 수요는 구리 고유 칸", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "비율체크러", holdingLabel: "관망", content: "헤지랑 성장을 한 방향으로만 안 묶음", createdAt: T08 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9280")) {
    const re = [
      [9280, "정책", "정합성체크", "관심", "집 짓겠다는 동네랑 대출 막는 동네가 겹치면 실수요만 힘듦. 공급 헤드라인으로 급매수 안 함"],
      [9281, "전세", "전세대출러", "관심", "전세가보다 은행 한도가 계약 관문. 한도 안 나오면 노룩 계약 유혹 거절"],
      [9282, "강남", "직주학군러", "관심", "매매는 묶여도 전세 실수요는 남아요. 전세가율+대출 가능액부터"],
      [9283, "정책", "세제일정러", "관심", "국회 올라간 세제는 일정이 생긴 관망. 시행령 전 숫자로 매도·매수 안 함"],
    ];
    const block = re
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T08 - ${i * 1800000}, likes: ${38 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${block}\n`);
    const rC = `  9280: [
    { id: 1, nickname: "실수요계산", holdingLabel: "관심종목", content: "입주 캘린더랑 대출 규정을 한 표에", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "정합성체크", holdingLabel: "관심", content: "국감 숫자도 시나리오로만 적을게요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9281: [
    { id: 1, nickname: "전세대출러", holdingLabel: "관심", content: "월세 전환 비율이 매물 신호예요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "보증체크", holdingLabel: "관심종목", content: "등기·확정일자 양보 안 함", createdAt: T08 + 1200000, likes: 4 },
  ],
  9282: [
    { id: 1, nickname: "직주학군러", holdingLabel: "관심", content: "구별 호가·실거래 세 줄로 나눔", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "전세가율러", holdingLabel: "관심종목", content: "전환 압력≠대출 가능", createdAt: T08 + 1200000, likes: 4 },
  ],
  9283: [
    { id: 1, nickname: "세제일정러", holdingLabel: "관심", content: "실거주·투자 목적부터 서류로", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "고지서시뮬", holdingLabel: "관심종목", content: "공시가 시뮬레이션 전에 급매 금지", createdAt: T08 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }
  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T08 KR/SAFE/KR-RE");
}

/** Hand-written diverse analyst posts — no template openings */
function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2150")) {
    console.log("analyst markets -2150 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2150, alias: "여의도 너구리 #11", symbol: "한장요약", content: "화요일 장전입니다. 어제(9/7) 종가만 보면 코스피 6,995(+4.61%)·삼전 27만(+5.68%)·하이닉스 178만(+8.26%)인데, 외국인이 두 종목에만 약 2.25조를 넣었다는 집계가 있습니다. 7,000선·수급·원달러 1,340.5를 세 칸으로 나눠 두겠습니다." },
    { id: -2151, alias: "성수 수달 #35", symbol: "코스피", content: "하루 +308포인트는 헤드라인이 커지기 쉽습니다. 외국인·기관 매수와 개인 매도 골격, 그리고 삼성·하이닉스 집중도를 같은 문장에 넣지 마세요. 7,000은 종가와 수급이 같이 확인할 때만 안착으로 적겠습니다." },
    { id: -2152, alias: "판교 치타 #22", symbol: "삼성전자", content: "270,000원(+5.68%)에 외국인 약 8,817억이 거론됐습니다. 목표가 40만 상향은 의견 칸이고, 체결·수급은 다른 칸입니다. 하이닉스 상대 성과와 원화를 한 표에 겹치지 않게 두겠습니다." },
    { id: -2153, alias: "삼성동 여우 #08", symbol: "SK하이닉스", content: "1,783,000원(+8.26%)은 지수보다 훨씬 큰 베타였고, 외국인 약 1.37조가 붙었습니다. 고베타는 물가·연준에 먼저 흔들립니다. 추격보다 외국인 지속 여부와 현물가를 먼저 보겠습니다." },
    { id: -2154, alias: "잠실 백로 #29", symbol: "현대차", content: "현대차 +2.48%는 반도체 불꽃 속 ‘따라가되 덜 가는’ 완성차 베타입니다. 원·달러 1,340대와 유가·판매를 단기 칸에 두고, 모빌리티 뉴스는 중기 칸에만 남기겠습니다." },
    { id: -2155, alias: "광화문 물총새 #06", symbol: "KB금융", content: "케이비 +2.27%는 위험온·원화 강세와 방향은 같았지만 반도체만큼은 아닙니다. 순이자마진 기대와 연체·할인율을 한 화면에 두고, 회의 전 추격은 하지 않겠습니다." },
    { id: -2156, alias: "한남 두루미 #17", symbol: "삼성바이오로직스", content: "삼바 +1.31%는 시총 상위 동행이지 수주 증명이 아닙니다. 가동률·공시는 중기, 업종 베타·환율은 단기입니다. 급등일 추격보다 상대 성과 표만 남기겠습니다." },
  ];

  const SAFE_POSTS = [
    { id: -2170, alias: "온체인 매 #03", symbol: "한장요약", content: "비트코인 약 8만 724달러, 금 온스 약 4,400달러대, 비율 약 18.17·상관 약 0.56이 한 주에 겹쳤습니다. 어제 이더·티엘티·유가 자리에는 오늘 은·달러·구리를 엽니다. 연준 15~16일 전에 자산별 칸을 나누겠습니다." },
    { id: -2171, alias: "금벌레 학 #14", symbol: "비트코인", content: "8만 달러 안착인지 숏커버인지는 유입과 청산 맵이 가릅니다. 금 상관이 높아져도 레버리지 청산 속도는 암호화폐입니다. 회의 전 사이즈를 먼저 줄이겠습니다." },
    { id: -2172, alias: "달러 올빼미 #09", symbol: "금", content: "온스 4,400달러대는 밴드 앵커이고, 비율 18온스대는 비트코인이 더 빨랐다는 뜻입니다. 실질금리·달러가 안 풀리면 헤지 프레임이 하루짜리가 될 수 있습니다." },
    { id: -2173, alias: "은광 수달 #21", symbol: "은", content: "은은 헤지와 산업이 겹칩니다. 금·비트코인 서사만으로 추격하면 태양광·전자 줄을 놓칩니다. 금은비율과 달러를 같이 보겠습니다." },
    { id: -2174, alias: "디엑시 치타 #18", symbol: "달러", content: "달러인덱스는 금·비트코인·은·구리의 공통 분모입니다. 원·달러 1,340.5와 섞어 읽으면 오독합니다. 회의 전 달러 레버리지는 두지 않겠습니다." },
    { id: -2175, alias: "구리 갈매기 #05", symbol: "구리", content: "헤지 자산 옆에서 구리는 성장·전력망 온도계입니다. 재고·중국 수요는 고유 칸이고, 금과 같은 방향으로만 묶지 않겠습니다." },
  ];

  const RE_POSTS = [
    { id: -2190, alias: "전세 참새 #02", symbol: "한장요약", content: "오늘은 전세 최고가 숫자 반복보다 공급·대출 정합성, 전세대출, 강남 실수요, 세제 국회 일정을 네 칸으로 나눕니다. 공급은 느리고 규제는 빠릅니다. 급매수·급계약은 하지 않겠습니다." },
    { id: -2191, alias: "정책 백로 #33", symbol: "정책", content: "지을 곳과 대출 막는 곳이 겹치면 실수요 자금줄이 먼저 조여집니다. 입주 캘린더와 디에스알·한도를 한 표에 두고, 국감 숫자는 시나리오로만 적겠습니다." },
    { id: -2192, alias: "강남 학 #16", symbol: "전세", content: "전세대출이 조여지면 매물·월세 전환이 평균 전세가보다 먼저 움직입니다. 은행 한도가 계약 관문입니다. 노룩 계약 유혹은 거절하겠습니다." },
    { id: -2193, alias: "매물 여우 #27", symbol: "강남", content: "직주·학군 수요는 매매가 묶여도 전세에 남을 수 있습니다. 전세가율과 대출 가능액을 같이 보지 않으면 ‘사야 한다’로만 읽힙니다. 구별 표를 남기겠습니다." },
    { id: -2194, alias: "실수요 너구리 #19", symbol: "정책", content: "세제 수정안이 국회에 올라 관망에 일정이 생겼습니다. 시행령 전 숫자를 고지서로 쓰지 마세요. 실거주·투자 목적을 서류로 먼저 고정하겠습니다." },
  ];

  const KR_COMMENTS = {
    [-2150]: [
      ["인천 갈매기 #52", "2.25조는 두 종목 합입니다. 전 업종 수급으로 확장하지 않겠습니다."],
      ["청담 여우 #11", "원달러 −9.9와 지수 +4.61을 한 줄로 합치지 말죠."],
    ],
    [-2151]: [
      ["성북 참새 #33", "코스닥 +1%대면 대형 반도체 장세 힌트입니다."],
      ["여의도 학 #12", "7000 안착은 종가 확인 후 적겠습니다."],
    ],
    [-2152]: [
      ["압구정 치타 #44", "목표가 40만은 의견 가중치를 낮게 두겠습니다."],
      ["합정 수달 #07", "27만 지지 여부를 손절 문장에 미리 남깁니다."],
    ],
    [-2153]: [
      ["잠실 백로 #29", "1.37조가 이틀 이어지는지부터 보겠습니다."],
      ["이태원 부엉이 #18", "고베타 사이즈는 회의 전 절반만."],
    ],
    [-2154]: [
      ["노원 기러기 #21", "완성차 상대 성과를 반도체와 분리해 표에."],
      ["분당 호랑이 #55", "유가·환율이 단기 1등입니다."],
    ],
    [-2155]: [
      ["성북 참새 #33", "NIM·연체를 한 화면, 추격은 다음입니다."],
      ["강남 표범 #04", "은행 베타는 반도체와 다릅니다."],
    ],
    [-2156]: [
      ["합정 수달 #07", "수주 공시 전엔 동행으로만 분류합니다."],
      ["마곡 펠리컨 #63", "바이오 베타 작게 유지하겠습니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2170]: [
      ["삼성동 올빼미 #19", "은·달러·구리로 로테이션한 이유를 표에 남기겠습니다."],
      ["판교 늑대 #90", "회의 전 알트·비트 레버리지는 줄입니다."],
    ],
    [-2171]: [
      ["해운대 고래 #03", "유입 없는 반등은 숏커버로만 태그합니다."],
      ["인천 갈매기 #52", "거래소 시각을 고정해 두세요."],
    ],
    [-2172]: [
      ["마포 살괭이 #08", "비율과 상관을 한 문장에 넣지 않겠습니다."],
      ["압구정 치타 #44", "실질금리 대용을 매일 같은 시각에."],
    ],
    [-2173]: [
      ["판교 늑대 #90", "금은비율이 벌어지면 산업 줄을 먼저 봅니다."],
      ["잠실 백로 #29", "은 사이즈는 금보다 작게."],
    ],
    [-2174]: [
      ["인천 갈매기 #52", "DXY와 원달러를 다른 시트에 둡니다."],
      ["청담 여우 #11", "공통 분모가 흔들리면 포트가 같이 흔들립니다."],
    ],
    [-2175]: [
      ["압구정 치타 #44", "구리 재고는 헤지 서사와 분리합니다."],
      ["합정 수달 #07", "성장 금속과 헤지를 한 방향으로만 안 묶습니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2190]: [
      ["분당 매 #31", "네 칸을 한 ‘사라’ 신호로 합치지 않겠습니다."],
      ["한남 재규어 #27", "어제 ATH 숫자와 오늘 정책을 섞지 말죠."],
    ],
    [-2191]: [
      ["성수 너구리 #15", "입주와 대출 시계가 다르다는 점을 먼저 적습니다."],
      ["삼성동 올빼미 #19", "실수요 해당 여부를 서류로 확인하세요."],
    ],
    [-2192]: [
      ["역삼 판다 #77", "한도 조회 없이 가계약 하지 마세요."],
      ["해운대 고래 #03", "월세 전환 비율을 매물 옆에."],
    ],
    [-2193]: [
      ["한남 재규어 #27", "구별 실거래 확인 전엔 추격 신호로 안 씁니다."],
      ["마포 살괭이 #08", "전세가율≠대출 가능."],
    ],
    [-2194]: [
      ["삼성동 올빼미 #19", "국회 일정은 캘린더, 세액은 시뮬레이션."],
      ["판교 늑대 #90", "시행령 전 헤드라인을 확정으로 쓰지 마세요."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-08 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-08T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-08 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-08T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-08T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
      out += `  ],\n`;
    }
    return out;
  }

  // Insert KR posts at top of MOCK_ANALYST_POSTS_KR
  c = c.replace(
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n",
    `export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n${postsBlock("KR", KR_POSTS, 6)}`,
  );
  c = c.replace(
    "export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n",
    `export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n${postsBlock("SAFE", SAFE_POSTS, 9)}`,
  );
  c = c.replace(
    "export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n",
    `export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n${postsBlock("KR-RE", RE_POSTS, 10)}`,
  );

  c = c.replace(
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n",
    `export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n${commentsBlock("KR", KR_COMMENTS, 6)}`,
  );
  c = c.replace(
    "export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n",
    `export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n${commentsBlock("SAFE", SAFE_COMMENTS, 9)}`,
  );
  c = c.replace(
    "export const MOCK_ANALYST_COMMENTS_KR_RE: Record<number, AnalystMockComment[]> = {\n",
    `export const MOCK_ANALYST_COMMENTS_KR_RE: Record<number, AnalystMockComment[]> = {\n${commentsBlock("KR-RE", RE_COMMENTS, 10)}`,
  );

  write("lib/analystPosts-markets.ts", c);
  console.log("analystPosts-markets: -2150~-2156, -2170~-2175, -2190~-2194");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260908-markets done (no deploy)");
}

main();
