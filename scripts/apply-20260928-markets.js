#!/usr/bin/env node
/** Insert 2026-09-28 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20260928-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-28";
const UPDATED = "2026.09.28 08:39";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T28 = 1790550000000; // 2026-09-28 08:00 KST
const TAG = "20260928";

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
    ["lib/reports-kr.ts", "kr-seed-234", KR],
    ["lib/reports-safe.ts", "safe-seed-214", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-190", KR_RE],
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
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])}, createdAt: T28 + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T28 + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T28 =")) {
    c = c.replace(
      "const T23 = 1790118000000; // 2026-09-23 08:00 KST",
      "const T28 = 1790550000000; // 2026-09-28 08:00 KST\nconst T23 = 1790118000000; // 2026-09-23 08:00 KST",
    );
  }

  if (!c.includes("id: 9426")) {
    const kr = [
      [9426, "코스피", "칠천팔십재개장", "인덱스 보유", "전일 종가 7080.92(+0.90%). 고가 7153.99. 오늘 재개장. 내일 삼성 배당락"],
      [9427, "삼성전자", "배당막차이팔", "삼성전자 보유", "전일 285500(+3.25%). 오늘이 3분기 배당 마지막 매수. 기준일 30 배당락 29. 약30조"],
      [9428, "SK하이닉스", "닉스백팔육이", "하이닉스 보유", "전일 186만2천 +1.20%. 고가 190만. 삼성 28만대랑 같이 움직임"],
      [9429, "현대차", "현대삼오삼오", "관심", "전일 353500 -1.94%. 지수 초록인데 자동차만 쉼. 연휴앞 순환"],
      [9430, "SK스퀘어", "스퀘어백십구", "관심", "전일 119만 +5.03%. 하이닉스 지주가 본업보다 더 달림"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T28")}\n`);
    const krC =
      commentPair(9426, ["칠천팔십재개장", "관망", "7080은 전일종가. 시가 나오면 바꿈"], ["배당락내일", "관심종목", "29일 배당락이 지수에도 조금 무게줌"]) +
      commentPair(9427, ["배당막차이팔", "삼성전자 보유", "오늘까지 사야 배당받음. 장후 20시까지"], ["삼십조현금", "관심종목", "주당 4500~4604는 추정. 이사회가 확정"]) +
      commentPair(9428, ["닉스백팔육이", "하이닉스 보유", "190만은 고가지 종가아님"], ["반도체묶음", "관심종목", "삼성 285500이랑 나란히 보면됨"]) +
      commentPair(9429, ["현대삼오삼오", "관심", "하루 -1.94%가 수출을 지운건 아님"], ["엔솔제자리", "관심종목", "엔솔은 +0.29%. 자동차랑 배터리 다른줄"]) +
      commentPair(9430, ["스퀘어백십구", "관심", "지주 5%는 하루 할증. 119만이 남는지가 다음"], ["닉스대비", "관심종목", "본업 +1.2% 지주 +5% 갭 같이봄"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9431")) {
    const safe = [
      [9431, "한장요약", "팔만사천육백", "관망", "BTC 84601, 금 4285, 이더 2713, 은 64. 비트펀드 주간 24억"],
      [9432, "비트코인", "비트팔만사육", "BTC 보유", "주말 84601. 23일 86558에서 내려옴. 펀드 주간 24억. 경고선 82800~83000"],
      [9433, "금", "금사천이팔오", "금 ETF", "금 4285. 주간종가 4287.25 -2.08%. 4300 반납. 저가 4244"],
      [9434, "이더리움", "이더이칠일삼", "관심", "이더 2713. 펀드 주간 6.89억. 2800에서 밀림"],
      [9435, "은", "은육십사", "관심", "은 64 근처. 주간 -3~4%. 주초 66~67에서 내려옴. 지지 63"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T28")}\n`);
    const sC =
      commentPair(9431, ["팔만사천육백", "관망", "가격은 내려도 펀드는 담은 주"], ["금사천이팔오", "관망", "금이랑 비트가 같이 쉼"]) +
      commentPair(9432, ["비트팔만사육", "BTC 보유", "84600이 여러날 남는지가 다음"], ["펀드이십사억", "관심", "IBIT 약12억 다른상품 약7억"]) +
      commentPair(9433, ["금사천이팔오", "금 ETF", "4244 저가 위가 확인"], ["달러같이", "관심", "달러인덱스랑 금리 옆에 적어야함"]) +
      commentPair(9434, ["이더이칠일삼", "관심", "2631 위에서 한계단. 2713은 한시점"], ["이더펀드", "관심", "주간 6.89억이 받침"]) +
      commentPair(9435, ["은육십사", "관심", "63 위 종가가 다음"], ["금은비율", "관심", "비율 67. 금이 먼저 바닥인지"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9436")) {
    const re = [
      [9436, "한장요약", "만이천호전환", "관심", "3기 분양전환 1.2만호 순수임대로 검토. 부천대장 최단기착공. 공공기관 2차이전"],
      [9437, "공급정책", "분양전환임대", "관심", "이미 사전청약 착공 단지는 제외. 분양예정이던 집이 임대로 남음"],
      [9438, "공급정책", "부천대장착공", "관심", "최단기 착공 모델. 계획숫자 말고 흙. 다른 3기가 따라올수있음"],
      [9439, "공급정책", "기관이차이전", "관심", "공공기관 2차 이전. 세종 새만금. 일자리 가면 집수요도 움직임"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T28")}\n`);
    const rC =
      commentPair(9436, ["만이천호전환", "관심", "어제 취임 안심신탁이랑 다른줄"], ["부천대장착공", "관심", "1.2만은 검토. 고시가 달력"]) +
      commentPair(9437, ["분양전환임대", "관심", "사전청약 받은사람은 다른줄"], ["제외목록", "관심종목", "제외 단지 목록이 나와야 숫자확정"]) +
      commentPair(9438, ["부천대장착공", "관심", "착공고시일이 다음"], ["패스트트랙", "관심종목", "인허가가 빨라야 올해 매물됨"]) +
      commentPair(9439, ["기관이차이전", "관심", "1차 이전이랑 다른 다음칸"], ["세종새만금", "관심", "기관 목록이랑 이전연도가 확인"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T28 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2427")) {
    console.log("analyst markets -2427 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2427, alias: "여의도 수리 #39", symbol: "한장요약", content: "재개장 아침 브리핑입니다. 코스피는 전일 7,080.92로 마감했고 오늘은 삼성전자 3분기 배당 마지막 매수일입니다. 삼성 종가는 28만 5,500원, 하이닉스는 186만 2,000원입니다." },
    { id: -2428, alias: "성수 너구리 #24", symbol: "삼성전자", content: "삼성전자 전일 종가는 28만 5,500원(+3.25%)입니다. 오늘까지 사야 3분기 배당을 받습니다. 기준일 30일, 배당락 29일이고 현금 약 30조 원이 거론됩니다." },
    { id: -2429, alias: "판교 치타 #32", symbol: "SK하이닉스", content: "SK하이닉스 전일 종가는 186만 2,000원(+1.20%)입니다. 고가는 190만 원입니다. 삼성전자 28만 원대와 같이 움직인 반도체 묶음입니다." },
    { id: -2430, alias: "삼성동 여우 #18", symbol: "현대차", content: "현대차는 전일 35만 3,500원으로 1.94% 내렸습니다. 코스피와 삼성전자가 오른 날 자동차는 쉬었습니다." },
    { id: -2431, alias: "잠실 백로 #35", symbol: "SK스퀘어", content: "SK스퀘어는 전일 119만 원으로 5.03% 올랐습니다. 하이닉스를 품은 지주가 본업보다 더 달린 하루입니다." },
    { id: -2432, alias: "역삼 판다 #89", symbol: "코스피", content: "코스피 전일 종가는 7,080.92입니다. 24~25일 휴장 뒤 오늘 재개장하고 내일 삼성 배당락을 앞둡니다. 장중 시가는 아침 기준 아직 없습니다." },
  ];

  const SAFE_POSTS = [
    { id: -2433, alias: "온체인 매 #13", symbol: "한장요약", content: "비트코인이 주말 약 8만 4,601달러입니다. 금은 약 4,285달러, 이더는 약 2,713달러, 은은 약 64달러입니다. 비트 현물 펀드는 주간에 약 24억 달러를 담았습니다." },
    { id: -2434, alias: "금벌레 학 #25", symbol: "비트코인", content: "비트코인 주말 가격은 약 8만 4,601달러입니다. 23일 약 8만 6,558달러에서 내려왔습니다. 주간 펀드 24억 달러와 경고선 8만 3천 달러를 같이 보겠습니다." },
    { id: -2435, alias: "은빛 갈매기 #15", symbol: "금", content: "금 현물이 온스당 약 4,285달러로 한 주를 마쳤습니다. 주간 종가 약 4,287.25달러, 한 주 2.08% 내렸고 4,300달러를 내줬습니다." },
    { id: -2436, alias: "알트 수달 #31", symbol: "이더리움", content: "이더리움이 약 2,713달러입니다. 이더 현물 펀드는 같은 주간에 약 6억 8,900만 달러를 담았습니다." },
    { id: -2437, alias: "청산 올빼미 #17", symbol: "은", content: "은 현물이 온스당 약 64달러로 한 주를 마쳤습니다. 한 주 약 3~4% 내렸고 63달러가 지지로 거론됩니다." },
  ];

  const RE_POSTS = [
    { id: -2438, alias: "전세 참새 #12", symbol: "한장요약", content: "3기 신도시 분양전환 임대 약 1만 2,000호를 순수 공공임대로 돌리는 검토가 나왔습니다. 부천 대장지구 최단기 착공과 공공기관 2차 이전이 같은 화면입니다." },
    { id: -2439, alias: "갱신 백로 #43", symbol: "공급정책", content: "분양전환 임대 약 1만 2,000호를 순수 임대로 남기는 검토입니다. 이미 사전청약했거나 착공한 단지는 빠집니다." },
    { id: -2440, alias: "동북 학 #26", symbol: "공급정책", content: "부천 대장지구는 최단기 착공 모델로 현장이 다시 열렸습니다. 계획 호수가 아니라 흙이 움직이는 줄입니다." },
    { id: -2441, alias: "정책 너구리 #29", symbol: "공급정책", content: "공공기관 2차 이전과 세종·새만금이 주택 수요를 옮기는 줄로 올랐습니다. 일자리가 가면 집 수요도 같이 움직입니다." },
  ];

  const KR_COMMENTS = {
    [-2427]: [
      ["인천 갈매기 #64", "전일 종가 7,080.92와 오늘 배당 막차를 표에 두겠습니다."],
      ["합정 수달 #19", "장중 시가가 나오면 그 칸을 바꾸겠습니다."],
    ],
    [-2428]: [
      ["마포 살괭이 #20", "오늘까지 사야 배당을 받습니다. 29일이 배당락입니다."],
      ["판교 늑대 #102", "주당 확정액은 이사회가 다음 달 말에 정합니다."],
    ],
    [-2429]: [
      ["인천 갈매기 #64", "190만 원은 고가입니다. 186만 2,000원 위 종가가 다음입니다."],
      ["압구정 치타 #56", "삼성 28만 5,500원과 나란히 적겠습니다."],
    ],
    [-2430]: [
      ["잠실 백로 #41", "하루 −1.94%가 수출 칸을 지운 것은 아닙니다."],
      ["청담 여우 #23", "오늘 시가가 전일 약세를 이으면 순환이 이어집니다."],
    ],
    [-2431]: [
      ["역삼 판다 #89", "지주 5.03%는 하루 할증입니다. 119만 원이 남는지가 확인입니다."],
      ["해운대 고래 #15", "하이닉스 +1.20%와 갭을 같이 보겠습니다."],
    ],
    [-2432]: [
      ["삼성동 올빼미 #31", "7,080.92는 전일 종가입니다. 오늘 시가가 출발입니다."],
      ["판교 늑대 #102", "29일 배당락 갭과 7,150 매물을 나란히 보겠습니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2433]: [
      ["종로 까치 #53", "8만 4,600달러와 펀드 24억 달러를 같은 표에 두겠습니다."],
      ["광화문 여우 #74", "금 4,285달러가 비트와 같이 쉬는지가 오늘 차이입니다."],
    ],
    [-2434]: [
      ["여의도 수리 #40", "8만 4,600달러가 여러 날 남는지가 선의 두께입니다."],
      ["송파 독수리 #78", "8만 3천 달러 경고선과 펀드 24억 달러를 나눠 적겠습니다."],
    ],
    [-2435]: [
      ["역삼 판다 #89", "4,244달러 저가 위 종가가 확인입니다."],
      ["해운대 고래 #15", "한 주 2%와 4,300달러 이탈을 같이 보겠습니다."],
    ],
    [-2436]: [
      ["분당 매 #43", "2,713달러가 2,700대 습관이 되는지가 다음입니다."],
      ["한남 재규어 #39", "이더 펀드 6.89억 달러와 가격을 나눠 적겠습니다."],
    ],
    [-2437]: [
      ["삼성동 올빼미 #31", "63달러 위 종가가 은의 다음 확인입니다."],
      ["판교 늑대 #102", "금·은 비율 67과 금 4,285달러를 같이 보겠습니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2438]: [
      ["성수 너구리 #27", "1만 2,000호 전환과 부천 대장을 한 정책으로 합치지 않겠습니다."],
      ["삼성동 올빼미 #31", "어제 취임·안심신탁은 배경입니다. 오늘은 임대 전환과 착공입니다."],
    ],
    [-2439]: [
      ["역삼 판다 #89", "사전청약·착공 단지는 빠집니다. 제외 목록이 달력입니다."],
      ["해운대 고래 #15", "확정 고시가 나와야 1만 2,000호가 숫자가 됩니다."],
    ],
    [-2440]: [
      ["한남 재규어 #39", "최단기는 목표입니다. 착공 고시일이 확인입니다."],
      ["마포 살괭이 #20", "다른 3기 지구가 따라오는지가 시범의 성적입니다."],
    ],
    [-2441]: [
      ["삼성동 올빼미 #31", "2차 이전 기관 목록과 이전 연도를 보겠습니다."],
      ["판교 늑대 #102", "3기 착공과 이 줄을 한 공급 숫자로 합치지 않겠습니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-28 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-28T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-28 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-28T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-28T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("analystPosts-markets: -2412~-2417, -2418~-2422, -2423~-2426");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260928-markets done");
}

main();
