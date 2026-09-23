#!/usr/bin/env node
/** Insert 2026-09-23 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260923-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.23";
const UPDATED = "2026.09.23 15:31";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20260923";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const ALIASES = [
  "종로 까치 #41", "광화문 여우 #62", "여의도 수리 #28", "송파 독수리 #66",
  "분당 매 #31", "성수 너구리 #15", "역삼 판다 #77", "한남 재규어 #27",
  "삼성동 올빼미 #19", "해운대 고래 #03", "마포 살괭이 #08", "판교 늑대 #90",
  "인천 갈매기 #52", "압구정 치타 #44", "잠실 백로 #29", "청담 여우 #11",
];

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
    date: ${JSON.stringify(DATE_DOT)},
    updatedAt: ${JSON.stringify(UPDATED)},${pinned}
    images: [${JSON.stringify(img)}],
    imagesEn: [${JSON.stringify(imgEn)}],
  }`;
}

function insertReportsTs() {
  let c = read("lib/reports.ts");
  const missing = US.filter((r) => !c.includes(`id: "${r.id}"`));
  if (missing.length === 0) {
    console.log("reports.ts: US already inserted — skip");
  } else {
    const block = missing.map((r) => tsBlock(r)).join(",\n") + ",\n";
    const beforeId = "seed-1756";
    const idx = c.indexOf(`id: "${beforeId}"`);
    if (idx === -1) throw new Error(`${beforeId} not found`);
    const start = c.lastIndexOf("  {", idx);
    write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
    console.log(`reports.ts: inserted ${missing[0].id}~${missing[missing.length - 1].id}`);
  }

  c = read("lib/reports.ts");
  if (c.includes(`"${US[0].id}": [`)) {
    console.log("REPORT_TICKERS: already present");
  } else {
    let tick = "  // 2026-09-23\n";
    for (const r of US) {
      const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
      tick += `  "${r.id}": [${t}],\n`;
    }
    const mark = "  // 2026-09-22";
    const tIdx = c.indexOf(mark);
    if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-21 marker missing");
    write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
    console.log("REPORT_TICKERS: inserted 2026-09-23");
  }
}

function usAnalystCopy(r, i) {
  const raw = r.summary.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  let s = raw;
  if (s.length > 380) {
    const cut = s.lastIndexOf("습니다.", 380);
    s = cut >= 80 ? s.slice(0, cut + 4) : s;
  }
  const modes = [
    () => `오늘 화면의 숫자부터입니다. ${s}`,
    () => `현장 메모입니다. ${r.title}`,
    () => `${r.subject} 카드입니다. ${s}`,
    () => `회의 한 줄로 남깁니다. ${s}`,
    () => `달력에 먼저 적습니다. ${s}`,
    () => `의견과 일정을 구분해 둡니다. ${s}`,
    () => `초보용으로 풀면 ${s}`,
    () => `다음 확인만 적습니다. ${s}`,
    () => `한장에 안 묶고 이 주제로만 봅니다. ${s}`,
    () => `정의부터 확인합니다. ${s}`,
  ];
  return modes[i % modes.length]();
}

const ANALYST_COMMENTS = {
  "tsla-zetscale-2500": [
    "2,500대 중 테슬라 할당이 나와야 주문이 인도가 됩니다.",
    "네바다 공장 주간 출고와 허브 10곳 배치를 같이 보겠습니다.",
  ],
  "tsla-us-soldout-2026": [
    "모델Y L은 긴 축거 6인승입니다. 론치 시리즈는 롱레인지가 아닙니다.",
    "우편번호별 인도 창이 2026년으로 당겨지는지를 보겠습니다.",
  ],
  "nasdaq-27226-ath": [
    "차트 종가 27,226.40이 27,200 위를 며칠 지키는지가 확인입니다.",
    "기사와 차트 숫자가 1~2포인트 다를 수 있어 화면을 기준으로 적겠습니다.",
  ],
  "tsla-norway-sep-2956": [
    "2,956대는 중간 집계입니다. 월말 공식 파일이 확정입니다.",
    "2위부터 9위 합 1,850대와 격차를 같이 보겠습니다.",
  ],
  "tsla-robotaxi-2dollar": [
    "마일당 2달러는 분석입니다. 회사 공시가 아닙니다.",
    "원격 감독 비율과 실제 요금이 나와야 계산이 달력이 됩니다.",
  ],
  "tsla-cybercab-austin-1216": [
    "12.16달러는 한 건입니다. 같은 구간 다음 요금을 보겠습니다.",
    "대기 10분과 근처 모델Y 네 대를 공급 신호로 적겠습니다.",
  ],
  "spacex-grokbot-175": [
    "175%와 20만 명은 화면 주장입니다. 거래소 종가와 배치 대수가 확인입니다.",
    "현장 영상이 나오면 채용 숫자를 바꿔 적겠습니다.",
  ],
  "grok-47-aa": [
    "지능 지수 46점은 한 시험입니다. 모든 업무 순위가 아닙니다.",
    "입력 2달러, 출력 6달러와 코딩 칸 다음 대결을 보겠습니다.",
  ],
  "anthropic-5gw": [
    "5기가와트는 목표입니다. 수전 계약과 가동이 나와야 확정입니다.",
    "칩 입고와 실제 메가와트를 나란히 보겠습니다.",
  ],
  "meta-muse-paypal": [
    "페이팔 52.89달러는 하루 주가입니다. 뮤즈 결제 건수가 다음입니다.",
    "은행 평은 의견이니 거래 숫자와 따로 적겠습니다.",
  ],
  "spacex-715-acres": [
    "임시 금지 기각이지 본안 승리가 아닙니다. 소송은 이어집니다.",
    "715에이커와 683에이커, 등기 날짜를 같이 보겠습니다.",
  ],
  "tsla-fsd-mattress": [
    "한 클립이지 사고 통계가 아닙니다. 같은 버전 개입 횟수가 다음입니다.",
    "차 화면에 14.3.10이 찍혀야 배포입니다.",
  ],
  "spacex-starlink-v35": [
    "3.5세대는 그림입니다. 발사 호기와 펼쳐진 패널이 증빙입니다.",
    "3세대 30킬로와트와 4세대 250킬로와트를 사다리로 적겠습니다.",
  ],
  "musk-ai-2028": [
    "2027~2028은 발언입니다. 제품 일정표에 넣지 않겠습니다.",
    "그록 점수와 규제 허가를 나란히 보겠습니다.",
  ],
  "tsla-cybercab-nyc": [
    "낮 시험이지 유료 개시가 아닙니다. 주 허가가 달력입니다.",
    "홀랜드 터널 목격과 오스틴 요금을 나눠 적겠습니다.",
  ],
  "tsla-grok-incar": [
    "공식 안내와 시연이 겹친 하루입니다. 장착 나라가 다음입니다.",
    "스타벅스 주문은 시연이지 모든 차의 기본이 아닙니다.",
  ],
  "us-hh-399-stocks": [
    "39.9%는 한 시점 비율입니다. 매수 신호로 읽지 않겠습니다.",
    "다음 분기 비율과 나스닥 최고가를 같이 보겠습니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ["숫자를 구분해 적겠습니다.", "다음 공시를 기다리겠습니다."];
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  const firstId = -1368;
  const individuals = US.filter((r) => !r.pinned);
  const posts = individuals.map((r, i) => {
    const id = firstId - i;
    const comments = i % 3 === 0 ? 2 : 1;
    return {
      id,
      alias: ALIASES[i % ALIASES.length],
      symbol: (r.tickers && r.tickers[0]) || "MACRO",
      content: usAnalystCopy(r, i),
      comments,
      likes: 15 + (i % 8),
      created_at: `2026-09-23T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const missingPosts = posts.filter((p) => !c.includes(`id: ${p.id}`));
  if (missingPosts.length === 0) {
    console.log("analystPosts US already — skip");
  } else {
    const block =
      (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-23 신규 (17개 · 존댓말 · 구조 혼합) ──────────────────────\n") +
      missingPosts
        .map(
          (p) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${p.likes}, comments: ${p.comments}, created_at: ${JSON.stringify(p.created_at)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n";
    const mark = "  // ── 2026-09-22 신규";
    const idx = c.indexOf(mark);
    if (idx === -1) throw new Error("analyst 2026-09-21 marker missing");
    write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

    c = read("lib/analystPosts.ts");
    const comm =
      (c.includes("  // ── 2026-09-23 애널 댓글") ? "" : "  // ── 2026-09-23 애널 댓글 ──────────────────────\n") +
      missingPosts
        .map((p) => {
          const i = posts.findIndex((x) => x.id === p.id);
          const lines = [
            `    { alias: ${JSON.stringify(ALIASES[(i + 3) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(individuals[i], 0))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":04:00.000Z"))} },`,
          ];
          if (p.comments >= 2) {
            lines.push(
              `    { alias: ${JSON.stringify(ALIASES[(i + 7) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(individuals[i], 1))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":07:00.000Z"))} },`,
            );
          }
          return `  [${p.id}]: [\n${lines.join("\n")}\n  ],`;
        })
        .join("\n") +
      "\n";
    const cmark = "  // ── 2026-09-22 애널 댓글";
    const cidx = c.indexOf(cmark);
    if (cidx === -1) throw new Error("analyst comments 2026-09-21 marker missing");
    write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
    console.log(`analystPosts US extra: ${missingPosts.map((p) => p.id).join(",")}`);
  }

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "tsla-zetscale-2500": "화물동맹 ZET SCALE 전기8등급 2500대. 테슬라 주공급. 켄워스 볼보 RIDE 예비. 네바다 공장 이틀뒤",
  "tsla-us-soldout-2026": "미국 모델3 Y 2026 새주문 거의소진. Y L 론치 끝. 후륜 사륜도 거의끝. 론치는 롱레인지 아님",
  "nasdaq-27226-ath": "나스닥 차트종가 27226.40 사상최고. 고가 27227.74. 시가 26039.51 저가 24425.34",
  "tsla-norway-sep-2956": "노르웨이 9월중간 모델Y 2956대 1위. 2~9위 합 1850. 월말공식 전 화면숫자",
  "tsla-robotaxi-2dollar": "로보택시 마일당 총이익 2달러 분석. 원격10대1 비용0.60~1.00 요금3~5. 공시아님",
  "tsla-cybercab-austin-1216": "오스틴 사이버캡 12.16달러 대기10분. 2201 Dee Cunnes. 근처 모델Y 4대",
  "spacex-grokbot-175": "스페이스X 그록봇 소식에 175% 올랐다는 설명. 채용20만 회피 주장. 실적공시 아님",
  "grok-47-aa": "그록4.7 지능지수 46점. 4.6보다 +2. 입력2달러 출력6달러. 코딩칸에서 한모델 앞섬",
  "anthropic-5gw": "한 AI회사 연말 계산용량 5기가와트 목표. 수전계약 전. 가동은 아직",
  "meta-muse-paypal": "메타뮤즈 페이팔 익스피디아. 페이팔 52.89 +0.51%. 은행평은 의견",
  "spacex-715-acres": "연방법원 715에이커 교환 임시금지 기각. 넘기는땅 715 받는땅 683. 본안 이어짐",
  "tsla-fsd-mattress": "FSD 14.3.10 고속도로 매트리스 회피. 한클립이지 사고통계 아님",
  "spacex-starlink-v35": "스타링크 3.5세대 그림. 전력 약150kW 내려받기 3~5Tb. 3세대 30kW 확인",
  "musk-ai-2028": "머스크, AI가 내년말 늦어도 2028 모든분야 앞선다. 발언이지 출시일정 아님",
  "tsla-cybercab-nyc": "사이버캡 뉴욕 낮시험. 홀랜드터널 맨해튼 진입 목격. 유료개시 아님",
  "tsla-grok-incar": "차안 그록 일정 메일 파일 핸즈프리. 스타벅스+FSD14.3.10 시연. 모든차 기본아님",
  "us-hh-399-stocks": "미국 가계 순자산 39.9%가 주식. 집계 사상최고. 비율이지 매수신호 아님",
};

const WALL_C1 = [
  "2500대 중 테슬라 할당이 나와야함",
  "Y L은 긴축거 6인승. 롱레인지 아님",
  "27200 위를 며칠 지키는지가 다음",
  "2956은 중간집계. 월말공식이 확정",
  "2달러는 분석이지 공시 아님",
  "12.16은 한건. 같은구간 다음요금",
  "175%는 화면주장. 거래소종가 확인",
  "46점은 한시험. 모든업무 순위아님",
  "5GW는 목표. 수전계약이 다음",
  "결제건수가 나와야 파트너십이 숫자",
  "임시금지 기각이지 본안승리 아님",
  "한클립이지 사고통계 아님",
  "3.5는 그림. 발사호기가 증빙",
  "발언이지 가이던스 아님",
  "낮시험이지 유료개시 아님",
  "시연이지 모든차 기본아님",
  "39.9%는 한시점. 매수신호 아님",
];

const WALL_C2 = [
  "네바다 주간출고랑 허브10곳 같이봄",
  "우편번호 인도창이 26년으로 당겨지는지",
  "차트랑 기사 1~2포인트 차이남",
  "2~9위 합 1850이랑 격차 같이봄",
  "원격비율이랑 실제요금이 나와야함",
  "대기10분이랑 근처4대가 공급신호",
  "현장영상이 나오면 20만명 숫자 바꿈",
  "토큰가격이랑 코딩칸 다음대결",
  "칩입고랑 실제 메가와트 나란히",
  "은행평은 의견. 거래숫자랑 분리",
  "715 vs 683 등기날짜 같이봄",
  "차화면에 14.3.10 찍혀야 배포",
  "3세대 30kW 4세대 250kW 사다리",
  "그록점수랑 허가 나란히 봄",
  "주허가가 나와야 뉴욕이 달력",
  "장착나라랑 사용횟수가 다음",
  "다음분기 비율이랑 나스닥최고 같이",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T23SEP")) {
    c = c.replace(
      "const T22SEP = 1790031600000; // 2026.09.22 08:00 KST",
      "const T23SEP = 1790118000000; // 2026.09.23 08:00 KST\nconst T22SEP = 1790031600000; // 2026.09.22 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T22SEP;", "export const LATEST_UPDATE = T23SEP;");
  }
  const firstId = 122022;
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "이천오백세미", "미국소진", "나스닥만이천", "노르웨이이구오육", "마일당이달러",
    "십이점이육", "그록봇백칠십오", "그록사점이칠", "오기가와트", "뮤즈페이팔",
    "칠백십오에이커", "매트리스회피", "브이삼점이오", "이공이팔발언", "뉴욕터널",
    "차안그록", "가계삼구구",
  ];
  const posts = individuals.map((r, i) => {
    const id = firstId + i;
    return [id, (r.tickers && r.tickers[0]) || "MACRO", nick[i] || `체크${i}`, "관심종목", WALL_CONTENT[r.slug] || r.title.slice(0, 80)];
  });
  const missing = posts.filter((p) => !c.includes(`id: ${p[0]}`));
  if (missing.length === 0) {
    console.log("wall US already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  const block =
    (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-23 신규 ────────────────\n") +
    missing
      .map((p) => {
        const i = posts.findIndex((x) => x[0] === p[0]);
        return `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T23SEP + ${8 + i * 8}*60_000, likes: ${24 - (i % 10)}, comments: 2 },`;
      })
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  missing.forEach((p) => {
    const i = posts.findIndex((x) => x[0] === p[0]);
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T23SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T23SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `  ],\n`;
  });
  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
  write("lib/wallPosts.ts", c);
  console.log(`wallPosts US extra: ${missing.map((p) => p[0]).join(",")}`);
}

function writeFixReports() {
  const summary = US[0];
  const details = US.slice(1);
  const reportsJson = details.map((r) => ({
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
    "scripts/fix-reports-20260923-ko-reports.js",
    "module.exports = " + JSON.stringify(reportsJson, null, 2) + ";\n",
  );
  const ko = `#!/usr/bin/env node
const REPORTS = [
  { id: ${JSON.stringify(summary.id)}, slug: ${JSON.stringify(summary.slug)}, pinned: true, bodyOnly: true,
    category: ${JSON.stringify(summary.category)}, color: ${JSON.stringify(summary.color)}, subject: ${JSON.stringify(summary.subject)},
    title: ${JSON.stringify(summary.title)},
    summary: ${JSON.stringify(summary.summary)},
    titleEn: ${JSON.stringify(summary.titleEn)},
    summaryEn: ${JSON.stringify(summary.summaryEn)},
  },
];
REPORTS.push(...require('./fix-reports-20260923-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260923 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260923-ko.js", ko);
  console.log("fix-reports-20260923-ko.js / ko-reports.js written");
}

function writeFixAnalyst(posts) {
  const arr = posts.map((p) => ({
    id: p.id,
    alias: p.alias,
    symbol: p.symbol,
    content: p.content,
    comments: p.comments,
  }));
  write(
    "scripts/fix-reports-20260923-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260923-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260923 done (US)");
}

main();
