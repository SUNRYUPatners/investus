#!/usr/bin/env node
/** Insert 2026-09-08 US reports, analyst, wall (diverse copy). Markets: hooks only — document skip. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260908-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.08";
const DATE_DASH = "2026-09-08";
const UPDATED = "2026.09.08 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T08SEP = 1788822000000; // 2026.09.08 08:00 KST
const TAG = "20260908";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const ALIASES = [
  "종로 까치 #41", "광화문 여우 #62", "여의도 수리 #28", "송파 독수리 #66",
  "분당 매 #31", "성수 너구리 #15", "역삼 판다 #77", "한남 재규어 #27",
  "삼성동 올빼미 #19", "해운대 고래 #03", "마포 살괭이 #08", "판교 늑대 #90",
  "인천 갈매기 #52", "압구정 치타 #44", "잠실 백로 #29", "청담 여우 #11",
  "합정 수달 #07", "이태원 부엉이 #18", "성북 참새 #33", "노원 기러기 #21",
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
  if (c.includes('id: "seed-1525"')) {
    console.log("reports.ts: seed-1525 already present — skip");
  } else {
    const block = US.map((r) => tsBlock(r)).join(",\n") + ",\n";
    const idx = c.indexOf('  {\n    id: "seed-1501"');
    const idx2 = c.indexOf('id: "seed-1501"');
    const start = idx !== -1 ? idx : c.lastIndexOf("  {", idx2);
    if (idx2 === -1) throw new Error("seed-1501 not found");
    write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
    console.log("reports.ts: inserted seed-1525~1543");
  }

  c = read("lib/reports.ts");
  if (c.includes("  // 2026-09-08\n")) {
    console.log("REPORT_TICKERS: 2026-09-08 already present");
    return;
  }
  let tick = "  // 2026-09-08\n";
  for (const r of US) {
    const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
    tick += `  "${r.id}": [${t}],\n`;
  }
  const mark = "  // 2026-09-07";
  const tIdx = c.indexOf(mark);
  if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-07 marker missing");
  write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
  console.log("REPORT_TICKERS: inserted 2026-09-08");
}

/** Diverse US analyst — structure rotated, no shared template openings */
function usAnalystCopy(r, i) {
  const s = r.summary.replace(/\n/g, " ").slice(0, 140);
  const modes = [
    () => `표에 숫자만 남깁니다. ${s}`,
    () => `현장 질문부터입니다. ${r.title}`,
    () => `${r.subject}만 따로 보면 ${s}`,
    () => `회의록 한 줄: ${s} 확인 전 비중은 유지하겠습니다.`,
    () => `캘린더 기준으로 보면 ${s}`,
    () => `가정과 실측을 갈랐습니다. ${s}`,
    () => `리스크 칸에 먼저 씁니다. ${s}`,
    () => `다음 게이트만 적습니다. ${r.title.replace(/습니다$/, "는지 보겠습니다")}`,
  ];
  return modes[i % modes.length]();
}

function usAnalystComment(r, i, k) {
  const opts = [
    [`요금·대기는 주간 중앙값으로만 남기고, 마진 칸은 비워 두겠습니다.`, `동의합니다. 연휴 샘플과 평일을 합치지 맙시다.`],
    [`미확인 보도는 가중치 0이 기본입니다. 공시 숫자만 모델에 넣겠습니다.`, `공급망 감사 통과 여부가 다음 관문이네요.`],
    [`승인국 수와 구독 대수를 열로 나누겠습니다.`, `10월 표결은 이벤트 리스크로만 표기합니다.`],
    [`롤링 −2%는 과거 고통이지 미래 보증이 아닙니다.`, `듀레이션과 물가 시나리오를 같이 적죠.`],
    [`목표주가는 의견 칸, 유료 마일은 실측 칸입니다.`, `가정 민감도를 먼저 보겠습니다.`],
    [`준설·극저온은 케이던스 선행 지표로만 체크합니다.`, `확정 발사일과 현장 톤을 분리합시다.`],
  ];
  return opts[i % opts.length][k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  if (c.includes("id: -1124")) {
    console.log("analystPosts US -1124 already — skip");
    return;
  }
  const posts = US.map((r, i) => {
    const id = -1124 - i;
    const comments = i % 3 === 0 ? 2 : 1;
    return {
      id,
      alias: ALIASES[i % ALIASES.length],
      symbol: r.pinned ? "MACRO" : (r.tickers && r.tickers[0]) || "MACRO",
      content: usAnalystCopy(r, i),
      comments,
      likes: 14 + (i % 8),
      created_at: `2026-09-08T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
    };
  });
  const block =
    "  // ── 2026-09-08 신규 (19개 · 존댓말 · 구조 혼합) ──────────────────────\n" +
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
  const mark = "  // ── 2026-09-07 신규";
  const idx = c.indexOf(mark);
  if (idx === -1) throw new Error("analyst 2026-09-07 marker missing");
  write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

  c = read("lib/analystPosts.ts");
  const comm =
    "  // ── 2026-09-08 애널 댓글 ──────────────────────\n" +
    posts
      .map((p, i) => {
        const lines = [
          `    { alias: ${JSON.stringify(ALIASES[(i + 3) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(US[i], i, 0))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":04:00.000Z"))} },`,
        ];
        if (p.comments >= 2) {
          lines.push(
            `    { alias: ${JSON.stringify(ALIASES[(i + 7) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(US[i], i, 1))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":07:00.000Z"))} },`,
          );
        }
        return `  [${p.id}]: [\n${lines.join("\n")}\n  ],`;
      })
      .join("\n") +
    "\n";
  const cmark = "  // ── 2026-09-07 애널 댓글";
  const cidx = c.indexOf(cmark);
  if (cidx === -1) throw new Error("analyst comments 2026-09-07 marker missing");
  write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
  console.log("analystPosts US: -1124~-1142");
}

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T08SEP")) {
    if (c.includes("const T07SEP")) {
      c = c.replace(
        "const T07SEP = 1788735600000; // 2026.09.07 08:00 KST",
        "const T08SEP = 1788822000000; // 2026.09.08 08:00 KST\nconst T07SEP = 1788735600000; // 2026.09.07 08:00 KST",
      );
    } else {
      throw new Error("T07SEP not found in wallPosts.ts");
    }
    c = c.replace("export const LATEST_UPDATE = T07SEP;", "export const LATEST_UPDATE = T08SEP;");
  }
  if (c.includes("id: 1310")) {
    console.log("wall US 1310 already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  const posts = [
    [1310, "TSLA", "오스틴요금러", "테슬라 보유", "노동절에 사이버캡 6.15달러·대기 15분 찍힌 거 봤는데, 연휴랑 평일 출퇴근은 표 칸을 나눠야 할 듯. 모델Y보다 3달러 싸다는 건 같은 화면 비교로만"],
    [1311, "TSLA", "언박스트초시계", "관심종목", "10초 미만이면 이론상 미친 처리량인데 수율 칸이 비어 있음. 5초 목표는 비전으로 두고 주간 완성 대수 나올 때까지 대기"],
    [1312, "TSLA", "유럽승인맵", "관망", "슬로베니아까지 여섯이면 지도는 예뻐지는데 독일·프랑스 칸은 아직 빈칸. 10월 표결은 이벤트 리스크로만 적을게요"],
    [1313, "MACRO", "국채롤링체크", "관심", "장기채 10년 롤링 −2%면 과거가 아팠다는 거지 내년이 자동 상승은 아님. 물가·발행 같이 봐야"],
    [1314, "MACRO", "엔개입추적", "관망", "일본이 해외증권 880억 달러 판 달이면 수급 쇼크 가능. 연속인지 일회인지가 핵심"],
    [1315, "TSLA", "미확인필터", "관심종목", "옵티머스 5천 발주·1만5천 목표 이야기는 미확인으로 따로 둠. 감사 통과 전엔 모델에 안 넣음"],
    [1316, "SPCX", "Ship42체크", "관심", "극저온 끝났으면 다음은 랩터. 비행 곧이라는 말과 날짜 공지는 가중치가 다름"],
    [1317, "NVDA", "칩외교메모", "엔비디아 보유", "칩 접근권이 외교 카드가 됐다는 건 전략재 서사인데, 분기 매출로 바로 환산하진 않을게요"],
  ];
  const block =
    "  // ── 2026-09-08 신규 ────────────────\n" +
    posts
      .map(
        (p, i) =>
          `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T08SEP + ${8 + i * 8}*60_000, likes: ${20 - i}, comments: 2 },`,
      )
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  const comments = {
    1310: [
      ["언박스트초시계", "대기가 줄어야 시간당 매출이 살아남"],
      ["유럽승인맵", "지오펜스 차량 수도 같이 적어야지"],
    ],
    1311: [
      ["오스틴요금러", "사이클이랑 출고는 다른 지표죠"],
      ["미확인필터", "양산 주간 숫자 나오기 전엔 원가 확정 금지"],
    ],
    1312: [
      ["오스틴요금러", "구독 가격·출시일이 매출 스위치"],
      ["국채롤링체크", "소국 여섯이랑 대형국 일정을 섞지 말자"],
    ],
    1313: [
      ["엔개입추적", "실질금리랑 같이 보면 설득력 생김"],
      ["칩외교메모", "성장주 할인율이랑 한 화면에"],
    ],
    1314: [
      ["국채롤링체크", "미 10년물 입찰 소화율도 옆에"],
      ["Ship42체크", "엔캐리 청산 구간이면 위험자산 출렁임"],
    ],
    1315: [
      ["언박스트초시계", "주당 런레이트랑 연간 누적 헷갈리지 말기"],
      ["오스틴요금러", "공시 나오기 전 레버리지는 패스"],
    ],
    1316: [
      ["미확인필터", "정적화염·스택이 다음 체크"],
      ["칩외교메모", "케이던스 기대를 테슬라에 이식 금지"],
    ],
    1317: [
      ["엔개입추적", "라이선스·동맹 수요는 옵션으로만"],
      ["국채롤링체크", "지정학 프리미엄이랑 규제 리스크는 세트"],
    ],
  };
  let commBlock = "";
  for (const [id, pairs] of Object.entries(comments)) {
    commBlock += `  ${id}: [\n`;
    pairs.forEach((pair, j) => {
      commBlock += `    { id: ${id}${j + 1}, nickname: ${JSON.stringify(pair[0])}, holdingLabel: "관심종목", content: ${JSON.stringify(pair[1])}, createdAt: T08SEP + ${(10 + Number(id) % 10 + j) * 60_000}, likes: ${5 + j} },\n`;
    });
    commBlock += `  ],\n`;
  }
  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
  write("lib/wallPosts.ts", c);
  console.log("wallPosts US: 1310~1317");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  console.log("apply-20260908 done (US only — markets deferred; no kr/safe/kr-re insert this run)");
}

main();
