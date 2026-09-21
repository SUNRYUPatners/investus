#!/usr/bin/env node
/** Insert 2026-09-22 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20260922-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-22";
const UPDATED = "2026.09.22 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T22 = 1790031600000; // 2026-09-22 08:00 KST
const TAG = "20260922";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

function tsBlock(r) {
  const img = `/charts/${r.slug}-${TAG}.svg`;
  const imgEn = `/charts/${r.slug}-${TAG}-en.svg`;
  const pinned = r.pinned || r.isPinned ? "\n    isPinned: true," : "";
  return `  {
    id: ${JSON.stringify(r.id)},
    title: ${JSON.stringify(r.title)},
    summary: ${JSON.stringify(r.summary)},
    body: ${JSON.stringify(r.body)},
    titleEn: ${JSON.stringify(r.titleEn || r.title)},
    summaryEn: ${JSON.stringify(r.summaryEn || r.summary)},
    bodyEn: ${JSON.stringify(BODY_EN)},
    category: ${JSON.stringify(r.category)},
    categoryColor: ${JSON.stringify(r.color)},
    subject: ${JSON.stringify(r.subject)},
    date: ${JSON.stringify(DATE_DASH)},
    updatedAt: ${JSON.stringify(UPDATED)},${pinned}
    images: [${JSON.stringify(img)}],
    imagesEn: [${JSON.stringify(imgEn)}],
  }`;
}

function insertMarketReports() {
  const jobs = [
    ["lib/reports-kr.ts", "kr-seed-222", KR],
    ["lib/reports-safe.ts", "safe-seed-203", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-182", KR_RE],
  ];
  for (const [file, beforeId, arr] of jobs) {
    let c = read(file);
    if (c.includes(`id: "${arr[0].id}"`)) {
      console.log(`${file}: already inserted — skip`);
      continue;
    }
    const block = arr.map((r) => tsBlock(r)).join(",\n") + ",\n";
    const idx = c.indexOf(`id: "${beforeId}"`);
    if (idx === -1) throw new Error(`${file}: ${beforeId} not found`);
    const start = c.lastIndexOf("  {", idx);
    write(file, c.slice(0, start) + block + c.slice(start));
    console.log(`${file}: inserted ${arr[0].id}~${arr[arr.length - 1].id}`);
  }
}

function wallRows(rows, tVar) {
  return rows
    .map(
      (r, i) =>
        `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: ${tVar} - ${i * 1800000}, likes: ${44 - i}, comments: 2, },`,
    )
    .join("\n");
}

function commentPair(id, a, b) {
  return `  ${id}: [
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])}, createdAt: T22 + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T22 + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T22 =")) {
    c = c.replace(
      "const T21 = 1789945200000; // 2026-09-21 08:00 KST",
      "const T22 = 1790031600000; // 2026-09-22 08:00 KST\nconst T21 = 1789945200000; // 2026-09-21 08:00 KST",
    );
  }

  if (!c.includes("id: 9397")) {
    const kr = [
      [9397, "코스피", "칠천칠다시", "인덱스 보유", "어제 코스피 7007.72(+1.65%). 7거래일만에 7000 회복. 기관 1.49조 기타법인 1.66조. 외인 현물 -1602억"],
      [9398, "삼성전자", "삼전이십칠만", "삼성전자 보유", "삼성전자 27만4천 +4.98%. 10거래일만에 27만. 외인만 1.07조. 특별배당 4500원 거론 28일까지"],
      [9399, "SK하이닉스", "닉스백팔십육", "하이닉스 보유", "하이닉스 186만8천 +0.59%. 외인 8121억 팜. 삼전 사고 닉스 판 하루"],
      [9400, "LG에너지솔루션", "엔솔삼점삼", "관심", "LG엔솔 352000 -3.3%. 코스피 7000인데 배터리만 빠짐. 전날 363500에서 내려옴"],
      [9401, "현대차", "현대삼오구", "관심", "현대차 359000 -1.64%. 외인 513억 매도 상위. 자동차가 반도체랑 갈림"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T22")}\n`);
    const krC =
      commentPair(9397, ["기관일조오", "관망", "외인 현물은 팔고 선물은 삼. 하루짜리인지가 화요 포인트"], ["환율일삼팔일", "관심종목", "1381원으로 2.3원 내림. 여러날만에 숨고름"]) +
      commentPair(9398, ["삼전이십칠만", "삼성전자 보유", "27만4천 지지가 되면 실적시즌 눈높이 달라짐"], ["배당이팔일", "관심종목", "기준일 30일 배당락 29일. 28일까지 사야함"]) +
      commentPair(9399, ["닉스백팔십육", "하이닉스 보유", "금요일 1조 사더니 하루만에 방향 바뀜"], ["사천삼만주", "관심종목", "외인 약 43만주 팜. 자사주가 가격 받침"]) +
      commentPair(9400, ["엔솔삼점삼", "관심", "7000 회복날에 셀 대형주 소외. 순환 아직"], ["수주공시", "관심종목", "북미공장 수주가 나와야 바닥 이야기됨"]) +
      commentPair(9401, ["현대삼오구", "관심", "지수 +1.65인데 현대만 쉼. 업종 순환 늦음"], ["외인오백십삼", "관심종목", "14만주 매도가 화요일에도 이어지는지"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9403")) {
    const safe = [
      [9403, "한장요약", "팔만육천고점", "관망", "BTC 86047 1월이후 고점. 금 4350, 이더 2667(+3.37%). 숏청산 4.49억"],
      [9404, "비트코인", "비트팔만육천", "BTC 보유", "저녁 86047. 코인게코 85935 +5.8%. 8만은 이제 지지로 읽힘"],
      [9405, "금", "금사삼오공", "금 ETF", "금 4350. 지난주 4370~4380에서 한계단. 비트가 더 빨리 달림"],
      [9406, "이더리움", "이더이육육칠", "관심", "이더 2667 +3.37%. 2631 지지. 비트보다 폭 작음"],
      [9407, "청산", "숏사억오", "관심", "숏청산 4.49억. 강제종료가 연료. 아침 안착이 진짜 테스트"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T22")}\n`);
    const sC =
      commentPair(9403, ["팔만육천고점", "관망", "하룻밤 고점은 지지 아님. 아침숫자 봐야함"], ["금사삼오공", "관망", "금은 쉬고 비트만 달린 아침"]) +
      commentPair(9404, ["비트팔만육천", "BTC 보유", "9만까지 약 4.6%. 8만6천이 남는지가 다음"], ["시총일칠삼", "관심", "시총 1.73조 거래 548억으로 거론됨"]) +
      commentPair(9405, ["금사삼오공", "금 ETF", "4350이 바닥인지 경유인지"], ["달러같이", "관심", "달러인덱스랑 10년물 옆에 적어야함"]) +
      commentPair(9406, ["이더이육육칠", "관심", "2631 여러날 지키면 2700 구간"], ["어떤화면이칠사팔", "관심", "어떤 집계는 2748도 찍음. 아침마다 다시"]) +
      commentPair(9407, ["숏사억오", "관심", "청산은 새 매수 아님. 쇼트가 사면서 닫힘"], ["펀드유입", "관심", "펀드 순유입이 남는지가 선의 두께"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9408")) {
    const re = [
      [9408, "한장요약", "전세칠점이칠", "관심", "서울전세 올해 +7.79%. 동북권 84㎡ 10억. 공적주택 119만호(2030). 내년입주 17012"],
      [9409, "전세", "누적칠점팔", "관심", "9월둘째주까지 +7.79%. 작년동기 1.16%의 4.7배. 2015년 이후 가장 가파름"],
      [9410, "전세", "동북십억", "관심", "성북 동대문 강북 노원에도 84㎡ 전세 10억. 호가랑 계약 섞임"],
      [9411, "공급정책", "공공백십구만", "관심", "국토부 21일. 2030까지 공적 119만호 연 24만. 수도권 92만. 올해 매물 바로 안늘음"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T22")}\n`);
    const rC =
      commentPair(9408, ["전세칠점이칠", "관심", "입주 26951도 작년보다 27.4% 적음"], ["공공백십구만", "관심", "119만은 2030 합. 올해 전세 바로 안풀림"]) +
      commentPair(9409, ["누적칠점팔", "관심", "작년 연간 3.77%도 이미 넘김"], ["입주절벽", "관심", "2027년 17012면 압력 몇년 더감"]) +
      commentPair(9410, ["동북십억", "관심", "모든 동이 10억은 아님. 실거래 반복이 확인"], ["국민평형", "관심", "중저가 전세가 먼저 올라 한강 따라감"]) +
      commentPair(9411, ["공공백십구만", "관심", "착공이 나와야 목표가 달력됨"], ["유예랑다른줄", "관심", "실거주 유예는 시간사고 119만은 집늘리기"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T22 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2397")) {
    console.log("analyst markets -2397 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2397, alias: "여의도 수리 #37", symbol: "한장요약", content: "월요일 브리핑입니다. 코스피가 7,007.72로 1.65% 올라 7거래일 만에 7,000을 다시 넘었습니다. 기관 1조4,923억 원, 기타법인 1조6,585억 원이 샀고 개인은 2조9,789억 원, 외국인은 1,602억 원을 팔았습니다." },
    { id: -2398, alias: "성수 너구리 #22", symbol: "코스피", content: "코스피가 113.49포인트 오른 7,007.72입니다. 외국인은 현물을 팔고 삼성전자만 1조 원 넘게 샀습니다. 원·달러는 2.3원 내린 1,381.0원이었습니다." },
    { id: -2399, alias: "판교 치타 #30", symbol: "삼성전자", content: "삼성전자가 27만4,000원으로 4.98% 올랐습니다. 외국인이 1조715억 원을 샀고, 27만 원 종가는 10거래일 만입니다. 특별배당은 주당 약 4,500원으로 거론되며 28일까지 사야 합니다." },
    { id: -2400, alias: "삼성동 여우 #16", symbol: "SK하이닉스", content: "SK하이닉스가 186만8,000원으로 0.59% 올랐습니다. 외국인은 8,121억 원을 팔아 유가증권 매도 1위였습니다. 삼성전자를 사고 이 종목을 판 교체입니다." },
    { id: -2401, alias: "잠실 백로 #33", symbol: "LG에너지솔루션", content: "LG에너지솔루션이 35만2,000원으로 3.3% 내렸습니다. 코스피가 7,000을 회복한 날 시가총액 상위 배터리가 빠진 하루입니다." },
    { id: -2402, alias: "역삼 판다 #87", symbol: "현대차", content: "현대차가 35만9,000원으로 1.64% 내렸습니다. 외국인은 513억 원을 팔아 매도 상위에 올랐습니다. 자동차가 반도체와 갈린 수급입니다." },
  ];

  const SAFE_POSTS = [
    { id: -2403, alias: "온체인 매 #11", symbol: "한장요약", content: "비트코인이 8만6,047달러까지 오르며 1월 이후 고점을 경신했습니다. 금은 약 4,350달러, 이더는 약 2,667달러입니다. 숏 청산은 4억4,900만 달러로 집계됐습니다." },
    { id: -2404, alias: "금벌레 학 #23", symbol: "비트코인", content: "비트코인 저녁 가격은 약 8만6,047달러입니다. 24시간 약 5.8% 올랐고 8만 달러는 이제 지지로 읽힙니다. 하룻밤 고점이 아침에 남는지가 확인입니다." },
    { id: -2405, alias: "은빛 갈매기 #13", symbol: "금", content: "금 현물이 온스당 약 4,350달러로 지난주 4,370~4,380달러 밴드에서 내려왔습니다. 비트코인이 더 빨리 달린 아침입니다." },
    { id: -2406, alias: "알트 수달 #29", symbol: "이더리움", content: "이더리움이 약 2,667달러로 3.37% 올랐습니다. 2,631달러 지지가 거론되고, 비트코인보다 오름폭은 작았습니다." },
    { id: -2407, alias: "청산 올빼미 #15", symbol: "청산", content: "숏 청산이 약 4억4,900만 달러로 집계됐습니다. 청산은 새 매수가 아니라 쇼트가 사면서 닫히는 흐름입니다. 아침 안착이 다음 확인입니다." },
  ];

  const RE_POSTS = [
    { id: -2408, alias: "전세 참새 #10", symbol: "한장요약", content: "서울 아파트 전세가 올해 7.79% 올랐습니다. 동북권에도 전용 84제곱미터 10억 원대 전세가 나왔고, 정부는 2030년까지 공적주택 119만 호를 공급한다고 밝혔습니다." },
    { id: -2409, alias: "갱신 백로 #41", symbol: "전세", content: "9월 둘째 주까지 서울 전세 누적 상승률은 7.79%입니다. 지난해 같은 기간 1.16%의 약 4.7배이고, 2015년 이후 가장 가파른 구간입니다." },
    { id: -2410, alias: "동북 학 #24", symbol: "전세", content: "성북·동대문·강북·노원에서 전용 84제곱미터 전세 10억 원대 호가와 계약이 잇따릅니다. 모든 동이 10억 원은 아니고, 실거래 반복이 확인입니다." },
    { id: -2411, alias: "정책 너구리 #27", symbol: "공급정책", content: "국토부가 21일 2030년까지 공적주택 119만 호, 연평균 약 24만 호를 공급한다고 밝혔습니다. 수도권 92만 호입니다. 올해 전세 매물을 바로 늘리는 숫자는 아닙니다." },
  ];

  const KR_COMMENTS = {
    [-2397]: [
      ["인천 갈매기 #62", "기타법인 1.66조에는 자사주가 많이 잡히는 구간입니다."],
      ["합정 수달 #17", "엔솔과 현대차가 쉰 점이 반도체 쏠림을 보여 줍니다."],
    ],
    [-2398]: [
      ["마포 살괭이 #18", "외국인 현물 1,602억 원 매도가 둘째 날에도 남는지가 시험입니다."],
      ["판교 늑대 #100", "원·달러 1,381원이 여러 날 내려가는지가 수출주 할인율입니다."],
    ],
    [-2399]: [
      ["인천 갈매기 #62", "27만4,000원 지지와 28일 배당 매수를 표에 나란히 적겠습니다."],
      ["압구정 치타 #54", "배당락 29일 갭이 하루 4.98%를 얼마나 되돌리는지 보겠습니다."],
    ],
    [-2400]: [
      ["잠실 백로 #39", "8,121억 원 매도에도 종가가 오른 것은 자사주 받침입니다."],
      ["청담 여우 #21", "186만8,000원 위에서 외국인이 다시 사는지 보겠습니다."],
    ],
    [-2401]: [
      ["역삼 판다 #87", "7,000 회복 날 배터리 소외는 순환이 늦다는 뜻입니다."],
      ["해운대 고래 #13", "수주 공시가 나와야 35만2,000원이 바닥 이야기가 됩니다."],
    ],
    [-2402]: [
      ["삼성동 올빼미 #29", "자동차와 배터리가 같이 쉬는지가 업종 확인입니다."],
      ["판교 늑대 #100", "외국인 513억 원이 화요일에도 이어지는지 보겠습니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2403]: [
      ["종로 까치 #51", "8만6,000달러와 금 4,350달러가 오늘 지지 테스트입니다."],
      ["광화문 여우 #72", "숏 청산 4.49억 달러는 한 밤의 연료입니다."],
    ],
    [-2404]: [
      ["여의도 수리 #38", "8만 달러가 여러 날 지지로 남는지가 선의 두께입니다."],
      ["송파 독수리 #76", "9만 달러까지 약 4.6%라 아침 안착이 먼저입니다."],
    ],
    [-2405]: [
      ["역삼 판다 #87", "4,350달러가 바닥인지 경유인지 달러인덱스와 같이 보겠습니다."],
      ["해운대 고래 #13", "비트코인 급등과 같은 비율로 금을 해석하지 않겠습니다."],
    ],
    [-2406]: [
      ["분당 매 #41", "2,631달러를 여러 날 지키면 2,700달러가 다음 구간입니다."],
      ["한남 재규어 #37", "한 시점 2,667달러는 지지가 아닙니다."],
    ],
    [-2407]: [
      ["삼성동 올빼미 #29", "청산이 줄어든 뒤에도 가격이 남는지가 확인입니다."],
      ["판교 늑대 #100", "펀드 순유입과 청산은 다른 줄로 적겠습니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2408]: [
      ["성수 너구리 #25", "전세 +7.79%와 내년 입주 1만7,012가구가 같은 방향입니다."],
      ["삼성동 올빼미 #29", "119만 호는 2030년 합이라 올해 매물을 바로 늘리지 않습니다."],
    ],
    [-2409]: [
      ["역삼 판다 #87", "2015년 이후 가장 가파른 구간이라 월간 속도가 다음 확인입니다."],
      ["해운대 고래 #13", "입주 2만6,951가구가 지난해보다 27.4% 적습니다."],
    ],
    [-2410]: [
      ["한남 재규어 #37", "호가 한 줄이 아니라 실거래 반복이 확인입니다."],
      ["마포 살괭이 #18", "신규 10억이면 갱신 보증금과의 격차가 더 벌어집니다."],
    ],
    [-2411]: [
      ["삼성동 올빼미 #29", "연간 착공과 준공이 나와야 목표가 달력이 됩니다."],
      ["판교 늑대 #100", "실거주 유예와 119만 호는 역할이 다른 정책입니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-22 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-22T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-22 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-22T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-22T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
      out += `  ],\n`;
    }
    return out;
  }

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
  console.log("analystPosts-markets: -2397~-2402, -2403~-2407, -2408~-2411");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260922-markets done");
}

main();
