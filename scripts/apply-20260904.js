#!/usr/bin/env node
/** Insert 2026-09-04 US + KR + Safe + KR-RE reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260904-us-part3");
const { KR, SAFE, KRRE } = require("./data-20260904-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.04";
const DATE_DASH = "2026-09-04";
const UPDATED = "2026.09.04 08:00";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T04SEP = 1788476400000;

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const ALIASES = [
  "종로 까치 #41", "광화문 여우 #62", "여의도 수리 #28", "송파 독수리 #66",
  "분당 매 #31", "성수 너구리 #15", "역삼 판다 #77", "한남 재규어 #27",
  "삼성동 올빼미 #19", "해운대 고래 #03", "마포 살쾡이 #08", "판교 늑대 #90",
  "인천 갈매기 #52", "압구정 치타 #44", "잠실 백로 #29", "청담 여우 #11",
  "합정 수달 #07", "이태원 부엉이 #18", "성북 참새 #33", "노원 기러기 #21",
  "분당 호랑이 #55", "여의도 학 #12", "강남 표범 #04", "마곡 펠리컨 #63",
];

function tsBlock(r, opts = {}) {
  const date = opts.dashDate ? DATE_DASH : DATE_DOT;
  const bodyHelper = opts.bodyHelper;
  const img = `/charts/${r.slug}-20260904.svg`;
  const imgEn = `/charts/${r.slug}-20260904-en.svg`;
  const pinned = r.pinned || r.isPinned ? "\n    isPinned: true," : "";
  const imageOnly = r.imageOnly ? "\n    imageOnly: true," : "";
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
    updatedAt: ${JSON.stringify(UPDATED)},${pinned}${imageOnly}
    images: [${JSON.stringify(img)}],
    imagesEn: [${JSON.stringify(imgEn)}],
  }`;
}

function insertBeforeId(filePath, beforeId, block) {
  let c = read(filePath);
  if (c.includes(`id: "${block.match(/id: "([^"]+)"/)[1]}"`) && filePath.includes("reports")) {
    const firstId = US[0].id;
    if (c.includes(`id: "${firstId}"`)) {
      console.log(`${filePath}: ${firstId} already present — skip`);
      return c;
    }
  }
  const needle = `id: "${beforeId}"`;
  const idx = c.indexOf(needle);
  if (idx === -1) throw new Error(`${filePath}: ${beforeId} not found`);
  const start = c.lastIndexOf("  {", idx);
  write(filePath, c.slice(0, start) + block + ",\n" + c.slice(start));
  return read(filePath);
}

function insertReportsTs() {
  let c = read("lib/reports.ts");
  if (c.includes('id: "seed-1476"')) {
    console.log("reports.ts: seed-1476 already present — skip");
    return;
  }
  const block = US.map((r) => tsBlock(r)).join(",\n") + ",\n";
  const idx = c.indexOf('  { id: "seed-1461"');
  if (idx === -1) throw new Error("seed-1461 not found");
  write("lib/reports.ts", c.slice(0, idx) + block + c.slice(idx));
  console.log("reports.ts: inserted seed-1476~1499");

  c = read("lib/reports.ts");
  if (c.includes("  // 2026-09-04")) {
    console.log("REPORT_TICKERS: 2026-09-04 already present");
    return;
  }
  let tick = "  // 2026-09-04\n";
  for (const r of US) {
    const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
    tick += `  "${r.id}": [${t}],\n`;
  }
  const mark = "  // 2026-09-03";
  const tIdx = c.indexOf(mark);
  if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-03 marker missing");
  write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
  console.log("REPORT_TICKERS: inserted seed-1476~1499");
}

function insertMarketReports() {
  const jobs = [
    ["lib/reports-kr.ts", "kr-seed-125", KR, true],
    ["lib/reports-safe.ts", "safe-seed-109", SAFE, false],
    ["lib/reports-kr-re.ts", "krre-seed-109", KRRE, false],
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

function analystContent(r, i) {
  // 템플릿 금지 — 실제 카피는 rewrite-analyst-20260904-diverse.js / 수동 작성
  throw new Error("analystContent template disabled — write diverse copy manually");
}

function isoMin(i, extra) {
  const mins = i * 7 + (extra || 0);
  const hh = String(Math.floor(mins / 60)).padStart(2, "0");
  const mm = String(mins % 60).padStart(2, "0");
  return `2026-09-04T${hh}:${mm}:00.000Z`;
}

function buildAnalyst() {
  return US.map((r, i) => {
    const a = analystContent(r, i);
    const id = -1007 - i;
    const alias = ALIASES[i % ALIASES.length];
    const sym = (r.tickers && r.tickers[0]) || "MACRO";
    return {
      id,
      alias,
      symbol: r.pinned ? "MACRO" : sym,
      content: a.content,
      comments: a.comments,
      likes: 12 + (i % 8),
      created_at: isoMin(i, 0),
    };
  });
}

function insertAnalystUs() {
  const posts = buildAnalyst();
  let c = read("lib/analystPosts.ts");
  if (c.includes("id: -1007")) {
    console.log("analystPosts: -1007 already present — skip");
  } else {
    const block =
      "  // ── 2026-09-04 신규 (24개 · 존댓말 · 구조 혼합) ──────────────────────\n" +
      posts
        .map(
          (p) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${p.likes}, comments: ${p.comments}, created_at: ${JSON.stringify(p.created_at)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n";
    const mark = "  // ── 2026-09-03 신규";
    const idx = c.indexOf(mark);
    if (idx === -1) throw new Error("analyst 2026-09-03 marker missing");
    write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));
    console.log("analystPosts: inserted -1007~-1030");
  }

  c = read("lib/analystPosts.ts");
  if (c.includes("  [-1007]:")) {
    console.log("analyst comments: -1007 already present — skip");
    return posts;
  }
  const comm =
    "  // ── 2026-09-04 애널 댓글 ──────────────────────\n" +
    posts
      .map((p, i) => {
        const lines = [];
        lines.push(`    { alias: ${JSON.stringify(ALIASES[(i + 3) % ALIASES.length])}, content: ${JSON.stringify(uniqueAnalystComment(i, 0))}, created_at: ${JSON.stringify(isoMin(i, 3))} },`);
        if (p.comments >= 2) {
          lines.push(`    { alias: ${JSON.stringify(ALIASES[(i + 7) % ALIASES.length])}, content: ${JSON.stringify(uniqueAnalystComment(i, 1))}, created_at: ${JSON.stringify(isoMin(i, 5))} },`);
        }
        return `  [${p.id}]: [\n${lines.join("\n")}\n  ],`;
      })
      .join("\n") +
    "\n";
  const cmark = "  // ── 2026-09-03 애널 댓글";
  const cidx = c.indexOf(cmark);
  if (cidx === -1) throw new Error("analyst comments 2026-09-03 marker missing");
  write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
  console.log("analystPosts comments: inserted -1007~-1030");
  return posts;
}

function uniqueAnalystComment(i, k) {
  throw new Error("uniqueAnalystComment template disabled — write diverse comments manually");
}

function writeFixReports(posts) {
  const reports = US.filter((r) => r.slug !== "summary").map((r) => ({
    id: r.id,
    slug: r.slug,
    category: r.category,
    color: r.color,
    subject: r.subject,
    title: r.title,
    summary: r.summary,
    titleEn: r.titleEn,
    summaryEn: r.summaryEn,
  }));
  write(
    "scripts/fix-reports-20260904-ko-reports.js",
    "module.exports = " + JSON.stringify(reports, null, 2) + ";\n",
  );
  write(
    "scripts/fix-reports-20260904-ko-analyst.js",
    "module.exports = " +
      JSON.stringify(
        posts.map((p) => ({ id: p.id, alias: p.alias, symbol: p.symbol, content: p.content, comments: p.comments })),
        null,
        2,
      ) +
      ";\n",
  );
  const summary = US[0];
  const src = `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const REPORTS = [
  { id: 'seed-1476', slug: 'summary', pinned: true, bodyOnly: true,
    category: '특집', color: 'mint', subject: '한장요약',
    title: ${JSON.stringify(summary.title)},
    summary: ${JSON.stringify(summary.summary)},
    titleEn: ${JSON.stringify(summary.titleEn)},
    summaryEn: ${JSON.stringify(summary.summaryEn)},
  },
];
REPORTS.push(...require('./fix-reports-20260904-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260904 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260904-ko.js", src);
  console.log("wrote fix-reports-20260904-ko*.js");
}

function patchWallUs() {
  // 템플릿·교차시장 댓글 금지 — rewrite-wall-us-20260904-diverse.js / 수동 작성
  console.log("patchWallUs: skipped (use rewrite-wall-us-20260904-diverse.js)");
}

function uniqueWallComment(i, k) {
  throw new Error("uniqueWallComment disabled — never mix KR/Safe/KR-RE phrases into US wall");
}

function patchWallMarkets() {
  let c = read("lib/wallPosts-markets.ts");
  if (c.includes("const T04 =")) {
    console.log("wallPosts-markets: T04 already present");
  } else {
    c = c.replace(
      "const T03 = 1788390000000; // 2026-09-03 08:00 KST",
      "const T04 = 1788476400000; // 2026-09-04 08:00 KST\nconst T03 = 1788390000000; // 2026-09-03 08:00 KST",
    );
  }

  const krPosts = [
    [9060, "코스피", "칠천피존버", "인덱스 보유", "6579.48 +0.26%인데 장중 243포인트나 출렁였어요. 기타법인 1.6조가 받친 강보합이라 외국인 복귀로 착각하면 안 됩니다"],
    [9061, "삼성전자", "반도체장기", "삼성전자 보유", "25만 원 -0.20%. 지수는 올랐는데 1위는 내렸습니다. 자사주 기타법인이라 수급이 좋아 보이는 착시가 있어요"],
    [9062, "SK하이닉스", "HBM러버", "하이닉스 보유", "159.6만 원 -1.05%. 소각 매입이 있어도 베타가 커서 오후 급락 때 더 빠졌습니다"],
    [9063, "LG에너지솔루션", "배터리존버", "LG엔솔 관심", "365,500원 +5.18%. 공시 없이 올랐어요. 목표가 48만 원 이야기만으로 추격하긴 이릅니다"],
    [9064, "현대차", "자동차매니아", "현대차 관심", "383,500원 +1.46%. 환율 1,359원은 좋은데 유가 91달러는 여전히 부담이에요"],
    [9065, "KB금융", "은행주러", "KB금융 관심", "177,900원 +5.20%. 금리 수혜 프레임인데 오늘 밤 고용 하나에 뒤집어질 수 있습니다"],
  ];
  const safePosts = [
    [9152, "매크로", "채권덕후", "관망", "비트 81,254·금 4,470·유가 91달러가 같은 날이에요. 고용 전까지는 한 방향 베팅 안 합니다"],
    [9153, "비트코인", "온체인러", "BTC 보유", "81,254달러 +5.11%. 어떤 기사는 7만 7천을 쓰는데 거래소 종가랑 맞춰봐야 해요"],
    [9154, "금", "금벌레", "금 ETF", "4,470달러로 전날 4,282 저점을 되돌렸어요. 4,500 안착은 고용 보고 판단할게요"],
    [9155, "은", "실물러", "관심", "은 66.8달러. 금보다 출렁여서 비중은 더 작게 가져가려요"],
    [9156, "이더리움", "스테이커", "ETH 보유", "이더 2,400달러, 2,500 아래. 비트 베타가 커서 고용 전 레버리지는 접었습니다"],
    [9157, "WTI", "유가러", "관심", "유가 91.01달러에 서비스 지수 55.4. 90달러가 버티면 금리 기대가 쉽게 안 내려가요"],
  ];
  const rePosts = [
    [9257, "정책", "정책워처", "관심", "종부세 비거주 공제 12억 유지. 9억으로 깎이던 안이 철회된 거라 감세 잔치는 아닙니다"],
    [9258, "종부세", "실수요자", "관심", "실거주 14억이랑 비거주 12억 차이를 고지서로 다시 계산해봐야겠어요"],
    [9259, "전세", "전세러", "관심", "ISA 원상복구면 여윳돈이 집으로만 가진 않을 수도 있어요. 한도 숫자 봐야 합니다"],
    [9260, "매매", "서울러", "관심", "양도 장특 보유공제가 2029년에 사라지면 투자 매각 일정을 지금부터 짜야 해요"],
  ];

  function postsBlock(rows, tVar) {
    return rows
      .map(
        (row, i) =>
          `  { id: ${row[0]}, symbol: ${JSON.stringify(row[1])}, nickname: ${JSON.stringify(row[2])}, holdingLabel: ${JSON.stringify(row[3])}, content: ${JSON.stringify(row[4])}, createdAt: ${tVar} - ${i * 1800000}, likes: ${40 - i}, comments: 2, },`,
      )
      .join("\n");
  }
  function commBlock(ids, tVar, texts) {
    return ids
      .map((id, i) => {
        const pair = texts[i];
        return `  ${id}: [
    { id: 1, nickname: ${JSON.stringify(pair[0][0])}, holdingLabel: "관심종목", content: ${JSON.stringify(pair[0][1])}, createdAt: ${tVar} + ${600000 - i * 1000}, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(pair[1][0])}, holdingLabel: "관심종목", content: ${JSON.stringify(pair[1][1])}, createdAt: ${tVar} + ${1200000 - i * 1000}, likes: 4 },
  ],`;
      })
      .join("\n");
  }

  if (!c.includes("id: 9060")) {
    const krB = postsBlock(krPosts, "T04") + "\n";
    c = c.replace('export const MOCK_POSTS_KR: Post[] = [\n', `export const MOCK_POSTS_KR: Post[] = [\n${krB}`);
    const krC = commBlock(
      [9060, 9061, 9062, 9063, 9064, 9065],
      "T04",
      [
        [["수급쟁이", "243포인트 출렁이면 종가 +0.26%만 보면 안 돼요"], ["유가체크", "기타법인 12일 연속은 자사주 효과로 봐야죠"]],
        [["메모리사이클", "25만 원 지지를 고용 전후로 볼게요"], ["수출통계러", "자사주랑 외국인을 분리해서 적어야겠어요"]],
        [["메모리사이클", "소각이 있어도 베타는 남아요"], ["수출통계러", "159.6만은 전날 급락의 연장으로 보여요"]],
        [["배터리존버", "공시 없는 5%는 관망이 맞다고 봐요"], ["이차전지", "목표가 48만은 의견일 뿐이에요"]],
        [["자동차매니아", "환율이랑 유가가 반대로 당기네요"], ["수출통계러", "사이버캡이랑 국내 판매는 따로 볼게요"]],
        [["은행주러", "5% 추격은 고용 끝나고 할게요"], ["금리보는사람", "연체 라인도 같이 봐야 금리 수혜죠"]],
      ],
    );
    c = c.replace("export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n", `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}\n`);
  }

  if (!c.includes("id: 9152")) {
    const sB = postsBlock(safePosts, "T04") + "\n";
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${sB}`);
    const sC = commBlock(
      [9152, 9153, 9154, 9155, 9156, 9157],
      "T04",
      [
        [["채권덕후", "고용 하나에 금·비트·유가가 같이 움직여요"], ["매크로올빼미", "달러지수 99.6부터 적어두겠습니다"]],
        [["온체인러", "8만 달러 지지가 핵심이에요"], ["ETF추적", "유입 없이 숏커버면 토할 수 있어요"]],
        [["금벌레", "4,282에서 되돌린 거라 4,500은 다음 시험이에요"], ["실질금리", "고용 후 실질금리 대용을 볼게요"]],
        [["실물러", "은은 금 레버리지라 비중 작게"], ["태양광러", "산업 수요 줄은 따로 적어야죠"]],
        [["스테이커", "2,500 아래면 심리선 탈환이 먼저예요"], ["온체인러", "알트 레버리지는 고용 전에 접는 게 맞아요"]],
        [["유가러", "90달러가 버티면 금리 기대가 안 내려가요"], ["인플레체크", "서비스 55.4랑 지불가격을 같이 봐야죠"]],
      ],
    );
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}\n`,
    );
  }

  if (!c.includes("id: 9257")) {
    const rB = postsBlock(rePosts, "T04") + "\n";
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${rB}`);
    const rC = commBlock(
      [9257, 9258, 9259, 9260],
      "T04",
      [
        [["정책워처", "12억 유지는 완화이지 세금이 사라진 게 아니에요"], ["세무사보", "국회에서 숫자가 또 바뀔 수 있어요"]],
        [["실수요자", "실거주 14억 요건 문서를 먼저 볼게요"], ["공동명의", "6억 곱하기 2도 명의 요건이 있어요"]],
        [["전세러", "ISA 한도가 얼마로 확정되는지 시행령 대기"], ["금융상품", "집 대신 계좌 유인이 생길 수는 있어요"]],
        [["서울러", "2029년 장특 폐지면 매각 캘린더를 당겨야 해요"], ["양도세", "거주 연 8%만 남는 구조로 이해했어요"]],
      ],
    );
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}\n`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: KR/SAFE/KRRE T04 posts");
}

function patchAnalystMarkets() {
  // 금지: 「종목 가격(+%)」동일 오프닝 + 「확인했습니다. 숫자부터」댓글 풀
  // → scripts/rewrite-markets-social-20260904-diverse.js / 수동 작성
  console.log("patchAnalystMarkets: skipped (template disabled)");
}

function main() {
  if (US.length !== 24) throw new Error("US length " + US.length);
  insertReportsTs();
  insertMarketReports();
  const posts = insertAnalystUs();
  writeFixReports(posts);
  patchWallUs();
  patchWallMarkets();
  patchAnalystMarkets();
  console.log("apply-20260904 done, US", US.length, "KR", KR.length, "SAFE", SAFE.length, "KRRE", KRRE.length);
}

main();
