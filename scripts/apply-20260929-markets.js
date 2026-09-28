#!/usr/bin/env node
/** Insert 2026-09-29 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20260929-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-29";
const UPDATED = "2026.09.29 08:12";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20260929";

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
    ["lib/reports-kr.ts", "kr-seed-240", KR],
    ["lib/reports-safe.ts", "safe-seed-219", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-194", KR_RE],
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
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])},     createdAt: T29SEP + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T29SEP + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T29SEP")) {
    c = c.replace(
      "const T23 = 1790118000000; // 2026-09-23 08:00 KST",
      "const T29SEP = 1790636400000; // 2026-09-29 08:00 KST\nconst T23 = 1790118000000; // 2026-09-23 08:00 KST",
    );
  }

  if (!c.includes("id: 9440")) {
    const kr = [
      [9440, "코스피", "육천팔백팔십구", "인덱스 보유", "어제 6889.74 -2.70%. 시가 7057.86. 외인 3.60조 기관 1.33조 매도. 오늘은 삼성 배당락"],
      [9441, "삼성전자", "이십칠만배당락", "삼성전자 보유", "어제 270000 -5.43%. 오늘은 배당락. 기준일 내일 30. 우선주 -5.91"],
      [9442, "SK하이닉스", "닉스백칠육팔", "하이닉스 보유", "어제 176만8천 -5.05%. 솔리다임 미상장 검토 소식. 삼성5%대랑 같이"],
      [9443, "SK스퀘어", "스퀘어칠쩜오육", "관심", "어제 -7.56%. 연휴전 +5.03 하루만에 토함. 지주가 본업보다 더뺌"],
      [9444, "LG에너지솔루션", "엔솔삼쩜오육", "관심", "어제 +3.56%. 지수 빨간날 배터리만 강함. 현대 +0.28 바이오 +2.49"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T29SEP")}\n`);
    const krC =
      commentPair(9440, ["육천팔백팔십구", "관망", "7000 내준 하루. 시가가 6889 위인지"], ["배당락오늘", "관심종목", "삼성 배당락이 지수에도 조금 무게"]) +
      commentPair(9441, ["이십칠만배당락", "삼성전자 보유", "어제까지가 마지막 매수였음. 오늘은 권리 빠짐"], ["금리쇼크", "관심종목", "실적호재가 하루를 못막음"]) +
      commentPair(9442, ["닉스백칠육팔", "하이닉스 보유", "솔리다임은 검토지 공시아님"], ["마이크론삼십", "관심종목", "30일 실적 코멘트가 다음"]) +
      commentPair(9443, ["스퀘어칠쩜오육", "관심", "지주 할증이 약한날에 먼저 빠짐"], ["닉스대비", "관심종목", "본업 -5 지주 -7 갭 같이봄"]) +
      commentPair(9444, ["엔솔삼쩜오육", "관심", "순환 하루. 수주공시는 아님"], ["시가확인", "관심종목", "오늘 시가가 강세 잇는지"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9445")) {
    const safe = [
      [9445, "한장요약", "팔만삼천십오", "관망", "BTC 83015, 금 4146, 이더 2667, 은 61.11. 금리에 같이 쉼"],
      [9446, "비트코인", "비트팔만삼공", "BTC 보유", "자정 83015 -1.78%. 업비트 1.1298억. 김프 -0.02. 경고선 82800"],
      [9447, "금", "금사천일사육", "금 ETF", "현물 4145.88 -3.27%. 선물 4176.80. 주말 4285에서 내려옴"],
      [9448, "이더리움", "이더이육육칠", "관심", "이더 2667 -0.59%. 비트보다 덜뺌. 김프 -0.10"],
      [9449, "은", "은육십일", "관심", "은 61.11 -4.92%. 선물 -5.1%. 금보다 더뺌. 주말 64대"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T29SEP")}\n`);
    const sC =
      commentPair(9445, ["팔만삼천십오", "관망", "비트랑 금이 같이 내린 밤"], ["은육십일", "관망", "은이 더 세게 빠짐"]) +
      commentPair(9446, ["비트팔만삼공", "BTC 보유", "82800 아래 몇시간인지"], ["펀딩마이너스", "관심", "미결제 65.2만 비트 감소"]) +
      commentPair(9447, ["금사천일사육", "금 ETF", "4100이 다음 눈금"], ["금리오공일", "관심", "10년 5.2%가 무이자 금속 누름"]) +
      commentPair(9448, ["이더이육육칠", "관심", "2700아래 습관되는지"], ["점유조금", "관심", "비트보다 덜뺀 하루"]) +
      commentPair(9449, ["은육십일", "관심", "61대가 저가인지"], ["금은비율", "관심", "비율 약68. 주말67에서 벌어짐"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9450")) {
    const re = [
      [9450, "한장요약", "계양에이육", "관심", "내일부터 계양A6 사흘청약 663가구. 본청약지연 60%. 내일 집코노미"],
      [9451, "공급정책", "계양육백육십삼", "관심", "59제곱 5.3억 84제곱 7.1억. 전매3년 실거주의무없음. 입주 2029.6"],
      [9452, "공급정책", "지연육십퍼", "관심", "35곳중 21곳 한달이상 지연. 왕숙2 84A 7.32억 추정대비 +30%"],
      [9453, "공급정책", "집코노미삼십", "관심", "내일 코엑스. 안심신탁 상담. 전세금 HUG에 맡김"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T29SEP")}\n`);
    const rC =
      commentPair(9450, ["계양에이육", "관심", "추석끝나자 본청약 달력"], ["지연육십퍼", "관심", "속도정책이랑 현장지연 같은주"]) +
      commentPair(9451, ["계양육백육십삼", "관심", "경쟁률이 다음"], ["대장십월", "관심종목", "부천대장 A-2는 10월 대기"]) +
      commentPair(9452, ["지연육십퍼", "관심", "창릉 S1 150명 본청약 포기"], ["건축비", "관심종목", "기본형 232.8만 7월보다 +4.07%"]) +
      commentPair(9453, ["집코노미삼십", "관심", "상담건수가 가입으로 이어지는지"], ["지티엑스비", "관심", "B노선 2030 개통 목표"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T29 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2442")) {
    console.log("analyst markets -2442 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2442, alias: "여의도 수리 #40", symbol: "한장요약", content: "어제 코스피는 6,889.74로 2.70% 내렸습니다. 삼성전자 27만 원, 오늘은 배당락일입니다. 하이닉스는 176만 8,000원입니다." },
    { id: -2443, alias: "성수 너구리 #25", symbol: "코스피", content: "코스피가 191.18포인트 내린 6,889.74입니다. 외국인 3조 6,010억 원, 기관 1조 3,332억 원을 순매도했습니다." },
    { id: -2444, alias: "판교 치타 #33", symbol: "삼성전자", content: "삼성전자 어제 종가는 27만 원(−5.43%)입니다. 오늘은 배당락일이고 기준일은 내일 30일입니다." },
    { id: -2445, alias: "삼성동 여우 #19", symbol: "SK하이닉스", content: "SK하이닉스는 176만 8,000원으로 5.05% 내렸습니다. 솔리다임 미국 상장 검토 소식이 같은 날에 붙었습니다." },
    { id: -2446, alias: "잠실 백로 #36", symbol: "SK스퀘어", content: "SK스퀘어는 7.56% 내리며 연휴 전 할증을 토해 냈습니다. 하이닉스 본업보다 지주가 더 빠졌습니다." },
    { id: -2447, alias: "역삼 판다 #90", symbol: "LG에너지솔루션", content: "LG에너지솔루션은 3.56% 올랐습니다. 지수가 빠진 날 배터리·바이오가 순환 칸이었습니다." },
  ];

  const SAFE_POSTS = [
    { id: -2448, alias: "온체인 매 #14", symbol: "한장요약", content: "비트코인이 자정께 8만 3,015달러입니다. 금 현물은 약 4,146달러, 은은 61.11달러, 이더는 2,667달러입니다." },
    { id: -2449, alias: "금벌레 학 #26", symbol: "비트코인", content: "비트코인 83,015달러, 1.78% 내렸습니다. 김치 프리미엄은 −0.02%이고 8만 2,800달러가 경고선입니다." },
    { id: -2450, alias: "은빛 갈매기 #16", symbol: "금", content: "금 현물이 4,145.88달러로 3.27% 내렸습니다. 미국 10년 금리 5.2%대가 무이자 금속을 눌렀습니다." },
    { id: -2451, alias: "알트 수달 #32", symbol: "이더리움", content: "이더리움이 2,667달러로 0.59% 내렸습니다. 비트보다 낙폭이 작았습니다." },
    { id: -2452, alias: "청산 올빼미 #18", symbol: "은", content: "은 현물이 61.11달러로 4.92% 내렸습니다. 금보다 더 빠진 하루입니다." },
  ];

  const RE_POSTS = [
    { id: -2453, alias: "전세 참새 #13", symbol: "한장요약", content: "인천 계양 A6가 내일부터 사흘 청약을 받습니다. 본청약 지연 60%와 내일 집코노미 박람회가 같은 화면입니다." },
    { id: -2454, alias: "갱신 백로 #44", symbol: "공급정책", content: "계양 A6는 663가구입니다. 전용 59㎡ 약 5억 3천만 원, 입주는 2029년 6월입니다." },
    { id: -2455, alias: "동북 학 #27", symbol: "공급정책", content: "사전청약 지구 35곳 중 21곳이 본청약을 한 달 이상 미뤘습니다. 왕숙2 확정가는 추정가보다 약 30% 올랐습니다." },
    { id: -2456, alias: "정책 너구리 #30", symbol: "공급정책", content: "내일 코엑스 집코노미에서 안심신탁 상담이 열립니다. 전세금을 보증공사에 맡기는 3자 계약입니다." },
  ];

  const KR_COMMENTS = {
    [-2442]: [
      ["인천 갈매기 #65", "어제 종가 6,889.74와 오늘 배당락을 표에 두겠습니다."],
      ["합정 수달 #20", "외국인 매도가 하루 만에 줄어드는지가 반등 두께입니다."],
    ],
    [-2443]: [
      ["마포 살괭이 #21", "7,000선은 심리적 선입니다. 오늘 시가가 출발입니다."],
      ["판교 늑대 #103", "마이크론 30일 실적이 메모리 심리를 다시 적습니다."],
    ],
    [-2444]: [
      ["인천 갈매기 #65", "배당락 갭과 금리 충격을 한 숫자로 더하지 않겠습니다."],
      ["압구정 치타 #57", "27만 원은 어제 종가입니다. 오늘 시가가 확인입니다."],
    ],
    [-2445]: [
      ["잠실 백로 #42", "솔리다임은 검토입니다. 상장 서류가 확인입니다."],
      ["청담 여우 #24", "176만 8,000원 위 시가가 다음입니다."],
    ],
    [-2446]: [
      ["역삼 판다 #90", "지주 7.56%는 하루 할증이 걷힌 숫자입니다."],
      ["해운대 고래 #16", "하이닉스와 괴리를 같이 보겠습니다."],
    ],
    [-2447]: [
      ["삼성동 올빼미 #32", "3.56%는 어제 상대강도입니다. 수주 공시는 아닙니다."],
      ["판교 늑대 #103", "오늘 시가가 강세를 잇는지가 확인입니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2448]: [
      ["종로 까치 #54", "8만 3,015달러와 금 4,146달러를 같은 표에 두겠습니다."],
      ["광화문 여우 #75", "은이 금보다 더 빠진 밤입니다."],
    ],
    [-2449]: [
      ["여의도 수리 #41", "8만 2,800달러 경고선과 자정 가격을 나눠 적겠습니다."],
      ["송파 독수리 #79", "김치 프리미엄 −0.02%는 국내가 해외와 거의 같다는 뜻입니다."],
    ],
    [-2450]: [
      ["역삼 판다 #90", "4,100달러가 다음 눈금입니다."],
      ["해운대 고래 #16", "10년 5.2%와 달러 인덱스를 같이 보겠습니다."],
    ],
    [-2451]: [
      ["분당 매 #44", "2,700달러 아래가 습관이 되는지가 다음입니다."],
      ["한남 재규어 #40", "비트보다 덜 빠진 하루입니다."],
    ],
    [-2452]: [
      ["삼성동 올빼미 #32", "61달러대가 하루 저가인지가 확인입니다."],
      ["판교 늑대 #103", "금·은 비율 약 68과 금 4,146달러를 같이 보겠습니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2453]: [
      ["성수 너구리 #28", "계양 청약 사흘과 지연 60%를 한 정책으로 합치지 않겠습니다."],
      ["삼성동 올빼미 #32", "내일 박람회는 상담 창구입니다. 청약 접수는 다른 장소입니다."],
    ],
    [-2454]: [
      ["역삼 판다 #90", "경쟁률과 계약률이 다음 숫자입니다."],
      ["해운대 고래 #16", "대장 A-2 10월 공고일이 달력을 두껍게 합니다."],
    ],
    [-2455]: [
      ["한남 재규어 #40", "21곳은 지구 숫자입니다. 단지별 새 공고일이 확인입니다."],
      ["마포 살괭이 #21", "창릉 포기 150명이 다른 단지로 퍼지는지를 보겠습니다."],
    ],
    [-2456]: [
      ["삼성동 올빼미 #32", "안심신탁 가입이 상담 다음입니다."],
      ["판교 늑대 #103", "GTX-B 2030과 앵커기업 명단이 입지를 구체화합니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-29 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-29T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-29 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-29T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-29T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("analystPosts-markets: -2442~-2456");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260929-markets done");
}

main();
