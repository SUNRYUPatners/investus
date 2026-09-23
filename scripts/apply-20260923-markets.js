#!/usr/bin/env node
/** Insert 2026-09-23 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20260923-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-23";
const UPDATED = "2026.09.23 15:31";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T23 = 1790118000000; // 2026-09-23 08:00 KST
const TAG = "20260923";

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
    ["lib/reports-kr.ts", "kr-seed-228", KR],
    ["lib/reports-safe.ts", "safe-seed-209", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-186", KR_RE],
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
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])}, createdAt: T23 + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T23 + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T23 =")) {
    c = c.replace(
      "const T22 = 1790031600000; // 2026-09-22 08:00 KST",
      "const T23 = 1790118000000; // 2026-09-23 08:00 KST\nconst T22 = 1790031600000; // 2026-09-22 08:00 KST",
    );
  }

  if (!c.includes("id: 9412")) {
    const kr = [
      [9412, "코스피", "칠천일이삼시가", "인덱스 보유", "어제 종가 7017.91(+0.15%). 오늘 시가 7153.99(+1.94%) 열고 7100 반납. 추석 24-25 휴장"],
      [9413, "삼성전자", "삼전이십팔만", "삼성전자 보유", "전일 276500. 장중 284000(+2.71%) 고가 285000. 28만 종가면 7월이후 두달만. 배당매수 28일"],
      [9414, "SK하이닉스", "닉스백구십만", "하이닉스 보유", "전일 약 184만 -1.5%. 장중 187만3천 +1.79% 고가 190만. 21일 외인 8121억 판 다음날"],
      [9415, "삼성바이오로직스", "바이오십월일", "관심", "2차조정 회사안 없음. 쟁점 18개. 10/1 3차조정 책임자 참석. 노조 단체행동 준비"],
      [9416, "LG에너지솔루션", "엔솔장중반등", "관심", "21일 352000 -3.3% 다음날. 장중 약 +1.71%. 현대도 +0.69%. 연휴앞 순환"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T23")}\n`);
    const krC =
      commentPair(9412, ["시가칠천일오삼", "관망", "22일도 7161 열고 종가 반납이었음. 패턴 같음"], ["외인장중", "관심종목", "외인 1741억 기관 1490억은 장중. 마감 다시봐야함"]) +
      commentPair(9413, ["삼전이십팔만", "삼성전자 보유", "28만 종가가 남아야 두달만 회복임"], ["배당이팔일", "관심종목", "연휴 끝나고 28일이 바로 배당매수 마감"]) +
      commentPair(9414, ["닉스백구십만", "하이닉스 보유", "190만은 고가지 종가아님"], ["사천삼만주", "관심종목", "21일 외인 판 다음날 가격만 되돌림"]) +
      commentPair(9415, ["바이오십월일", "관심", "회사안이 나와야 교섭이 달력됨"], ["십팔개쟁점", "관심종목", "임금 6.5 vs 4.1이 핵심으로 거론됨"]) +
      commentPair(9416, ["엔솔장중반등", "관심", "하루 +1.71%가 3.3%를 지운건 아님"], ["수주공시", "관심종목", "북미공장 수주가 나와야 바닥 이야기됨"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9417")) {
    const safe = [
      [9417, "한장요약", "팔만육천오백", "관망", "BTC 86558, 금 4359, 이더 2764. 비트펀드 22일 7.15억 나흘연속"],
      [9418, "비트코인", "비트팔만육천오", "BTC 보유", "아침 86558 +1.25%. 주간 +13.9%. 8만6천 위 유지중. ATH랑 31%"],
      [9419, "금", "금사삼오구", "금 ETF", "금 4359.40 +0.4%. 유가 나흘 -9% 뒤 숨고름. 9월펀드 약 50톤"],
      [9420, "이더리움", "이더이칠육사", "관심", "이더 2764 +0.5%. 주간 +15.2%. 이더펀드 22일 1.62억"],
      [9421, "펀드", "나흘칠억", "관심", "비트현물펀드 22일 7.15억. IBIT 3.50 다른상품 2.57. 21일은 9.99억"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T23")}\n`);
    const sC =
      commentPair(9417, ["팔만육천오백", "관망", "가격이랑 펀드 나흘을 같이봐야함"], ["금사삼오구", "관망", "오늘은 금이랑 비트가 같이 오름"]) +
      commentPair(9418, ["비트팔만육천오", "BTC 보유", "8만6천이 여러날 남는지가 다음"], ["시총삼조", "관심", "시총 3.04조. 9만까지 약 4%"]) +
      commentPair(9419, ["금사삼오구", "금 ETF", "4350이 바닥인지가 확인"], ["달러같이", "관심", "달러인덱스랑 유가 옆에 적어야함"]) +
      commentPair(9420, ["이더이칠육사", "관심", "2631 위에서 한계단. 2764는 한시점"], ["이더펀드", "관심", "21일 2.7억 22일 1.62억이 받침"]) +
      commentPair(9421, ["나흘칠억", "관심", "나흘 초록이지 추세확정 아님"], ["이더같이", "관심", "이더펀드 1.62억이랑 줄을 나눠야함"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9422")) {
    const re = [
      [9422, "한장요약", "장관취임", "관심", "홍지선 장관 23일 취임. 주거안정+3기신도시 착공. 안심신탁 3억에 월109만. 전세7.79는 어제칸"],
      [9423, "공급정책", "홍지선취임", "관심", "수급불균형 임대차불안 가계부채 맞물림. 계획숫자 말고 착공입주. 민간장기임대+공공임대"],
      [9424, "전세", "안심신탁백구", "관심", "HUG 전세금 공적관리. 연 4.35% 가정. 3억이면 월 109만. 22일 여의도 센터"],
      [9425, "공급정책", "삼기착공", "관심", "3기신도시 도심을 착공입주로. 인허가 패스트트랙. 119만호랑 다른줄"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T23")}\n`);
    const rC =
      commentPair(9422, ["장관취임", "관심", "사람이랑 제도가 오늘 주제. 7.79는 배경"], ["안심신탁백구", "관심", "109만은 가정수익률. 가입건수가 다음"]) +
      commentPair(9423, ["홍지선취임", "관심", "취임발언이지 착공확정 아님"], ["패스트트랙", "관심종목", "통합심의가 숫자로 나와야 달력됨"]) +
      commentPair(9424, ["안심신탁백구", "관심", "전세금이 공급펀드로 감. 선순환인지 확인필요"], ["보증료삼십사", "관심", "반환보증 34만원 절감은 설명숫자"]) +
      commentPair(9425, ["삼기착공", "관심", "내년 서울입주 17012랑 같이봐야함"], ["유예랑다른줄", "관심", "119만은 2030합. 오늘은 실행속도"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T23 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2412")) {
    console.log("analyst markets -2412 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2412, alias: "여의도 수리 #38", symbol: "한장요약", content: "추석 전날 브리핑입니다. 코스피는 전일 7,017.91로 마감한 뒤 오늘 7,153.99로 열었고 장중 7,100을 내줬습니다. 삼성전자는 장중 28만4,000원, 하이닉스는 한때 190만 원이었습니다." },
    { id: -2413, alias: "성수 너구리 #23", symbol: "코스피", content: "코스피 시가 7,153.99는 전일 종가 7,017.91보다 1.94% 높습니다. 외국인과 기관이 장중 샀고 개인은 팔았습니다. 24~25일 휴장입니다." },
    { id: -2414, alias: "판교 치타 #31", symbol: "삼성전자", content: "삼성전자가 장중 28만4,000원, 고가 28만5,000원입니다. 전일 27만6,500원입니다. 종가가 28만 원 위에 남으면 7월 이후 약 두 달 만입니다." },
    { id: -2415, alias: "삼성동 여우 #17", symbol: "SK하이닉스", content: "SK하이닉스가 장중 187만3,000원, 고가 190만 원입니다. 전일 약 184만 원에서 되돌렸습니다. 21일 외국인 8,121억 원 매도 다음 날입니다." },
    { id: -2416, alias: "잠실 백로 #34", symbol: "삼성바이오로직스", content: "삼성바이오로직스 노사가 10월 1일 3차 사후조정에 나섭니다. 22일 2차에서 회사안이 없었고 쟁점은 18개입니다. 노조는 단체행동을 준비합니다." },
    { id: -2417, alias: "역삼 판다 #88", symbol: "LG에너지솔루션", content: "LG에너지솔루션이 장중 약 1.71% 오르며 21일 3.3% 하락에서 숨 골랐습니다. 현대차도 장중 약 0.69% 올랐습니다. 연휴 앞 순환입니다." },
  ];

  const SAFE_POSTS = [
    { id: -2418, alias: "온체인 매 #12", symbol: "한장요약", content: "비트코인이 아시아 아침 약 8만6,558달러입니다. 금은 약 4,359달러, 이더는 약 2,764달러입니다. 미국 비트코인 현물 펀드는 22일 7억1,470만 달러를 담았습니다." },
    { id: -2419, alias: "금벌레 학 #24", symbol: "비트코인", content: "비트코인 아침 가격은 약 8만6,558달러, 24시간 약 1.25%입니다. 일주일 약 13.9%이고 사상 최고와는 약 31% 거리입니다." },
    { id: -2420, alias: "은빛 갈매기 #14", symbol: "금", content: "금 현물이 온스당 약 4,359.40달러로 0.4% 올랐습니다. 유가가 나흘 동안 9% 넘게 내린 뒤 안정되며 금리 인상 부담이 줄었다는 설명이 붙었습니다." },
    { id: -2421, alias: "알트 수달 #30", symbol: "이더리움", content: "이더리움이 약 2,764달러로 24시간 약 0.5% 올랐습니다. 이더 현물 펀드는 22일 1억6,220만 달러를 담았습니다." },
    { id: -2422, alias: "청산 올빼미 #16", symbol: "펀드", content: "미국 비트코인 현물 펀드가 22일 7억1,470만 달러를 더 담아 나흘 연속입니다. 한 상품이 3억5,030만 달러, 이더 펀드는 같은 날 1억6,220만 달러입니다." },
  ];

  const RE_POSTS = [
    { id: -2423, alias: "전세 참새 #11", symbol: "한장요약", content: "홍지선 신임 국토부 장관이 23일 취임하며 주거 안정과 3기 신도시 착공을 앞에 뒀습니다. HUG 전월세 안심신탁은 전세 3억 원에 월 약 109만 원입니다." },
    { id: -2424, alias: "갱신 백로 #42", symbol: "공급정책", content: "신임 장관은 주택 수급 불균형과 임대차 불안, 가계부채가 맞물려 있다고 진단했습니다. 공급은 계획 숫자가 아니라 착공과 입주로 챙기겠다고 했습니다." },
    { id: -2425, alias: "동북 학 #25", symbol: "전세", content: "전월세 안심신탁은 전세금을 HUG가 관리하고 임대인에게 월 수익을 줍니다. 연 4.35% 가정에서 3억 원이면 월 약 109만 원입니다." },
    { id: -2426, alias: "정책 너구리 #28", symbol: "공급정책", content: "3기 신도시와 도심 주택을 착공·입주로 챙기겠다는 말입니다. 어제 119만 호 목표와 다른 줄의 실행 이야기입니다." },
  ];

  const KR_COMMENTS = {
    [-2412]: [
      ["인천 갈매기 #63", "시가 7,153.99는 출발입니다. 종가가 7,017 위인지를 보겠습니다."],
      ["합정 수달 #18", "바이오 10월 1일과 삼성 28만 원대를 나눠 적겠습니다."],
    ],
    [-2413]: [
      ["마포 살괭이 #19", "외국인 장중 1,741억 원이 마감에도 남는지가 시험입니다."],
      ["판교 늑대 #101", "28일 재개장 갭이 연휴 앞 시가를 얼마나 기억하는지 보겠습니다."],
    ],
    [-2414]: [
      ["인천 갈매기 #63", "28만 원 종가와 28일 배당 매수를 표에 나란히 적겠습니다."],
      ["압구정 치타 #55", "장중 28만5,000원은 고가입니다. 종가가 확인입니다."],
    ],
    [-2415]: [
      ["잠실 백로 #40", "190만 원은 고가입니다. 184만 원 위 종가가 다음입니다."],
      ["청담 여우 #22", "21일 매도 다음 날 되돌림이라 수급은 따로 보겠습니다."],
    ],
    [-2416]: [
      ["역삼 판다 #88", "10월 1일 회사안이 나와야 18개 쟁점이 달력이 됩니다."],
      ["해운대 고래 #14", "장중 약세와 조정 일정을 한 줄로 합치지 않겠습니다."],
    ],
    [-2417]: [
      ["삼성동 올빼미 #30", "하루 1.71%가 21일 3.3%를 지운 것은 아닙니다."],
      ["판교 늑대 #101", "수주 공시와 현대차 동행 여부를 보겠습니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2418]: [
      ["종로 까치 #52", "8만6,000달러와 펀드 7억 달러를 같은 표에 두겠습니다."],
      ["광화문 여우 #73", "금 4,359달러가 비트와 같이 가는지가 오늘 차이입니다."],
    ],
    [-2419]: [
      ["여의도 수리 #39", "8만6,000달러가 여러 날 남는지가 선의 두께입니다."],
      ["송파 독수리 #77", "사상 최고와 31% 거리를 가격과 따로 적겠습니다."],
    ],
    [-2420]: [
      ["역삼 판다 #88", "4,350달러가 바닥인지 달러인덱스와 같이 보겠습니다."],
      ["해운대 고래 #14", "유가 나흘 하락과 금 0.4%를 원인·결과로만 읽겠습니다."],
    ],
    [-2421]: [
      ["분당 매 #42", "2,631달러 위에서 2,764달러가 습관이 되는지가 다음입니다."],
      ["한남 재규어 #38", "이더 펀드 1.62억 달러와 가격을 나눠 적겠습니다."],
    ],
    [-2422]: [
      ["삼성동 올빼미 #30", "나흘 유입이지 추세 확정이 아닙니다."],
      ["판교 늑대 #101", "이더 펀드 1.62억 달러와 비트 7.15억 달러를 따로 보겠습니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2423]: [
      ["성수 너구리 #26", "장관 취임과 안심신탁을 한 정책으로 합치지 않겠습니다."],
      ["삼성동 올빼미 #30", "전세 7.79%는 어제 배경입니다. 오늘은 제도와 사람입니다."],
    ],
    [-2424]: [
      ["역삼 판다 #88", "취임 발언은 목표입니다. 착공 일정이 달력입니다."],
      ["해운대 고래 #14", "인허가 패스트트랙이 숫자로 나오는지를 보겠습니다."],
    ],
    [-2425]: [
      ["한남 재규어 #38", "4.35%와 월 109만 원은 가정입니다. 가입 건수가 확인입니다."],
      ["마포 살괭이 #19", "전세금이 공급 펀드로 가는 줄과 사기 차단 줄을 나누겠습니다."],
    ],
    [-2426]: [
      ["삼성동 올빼미 #30", "119만 호 합과 3기 착공을 한 줄로 합치지 않겠습니다."],
      ["판교 늑대 #101", "내년 서울 입주 1만7,012가구와 착공 실적을 같이 보겠습니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-23 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-23T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-23 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-23T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-23T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("apply-20260923-markets done");
}

main();
