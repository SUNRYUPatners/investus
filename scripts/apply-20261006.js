#!/usr/bin/env node
/** Insert 2026-10-06 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20261006-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.10.06";
const UPDATED = "2026.10.06 08:40";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20261006";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const ALIASES = [
  "마포 살쾡이 #14", "한남 재규어 #55", "여의도 매 #36", "송파 백로 #18",
  "분당 늑대 #22", "성수 판다 #81", "역삼 치타 #09", "광화문 올빼미 #47",
  "삼성동 고래 #61", "해운대 여우 #33", "종로 수리 #70", "판교 까치 #25",
  "인천 너구리 #58", "압구정 독수리 #12", "잠실 갈매기 #84", "청담 학 #06",
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
    const beforeId = "seed-1864";
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
    let tick = "  // 2026-10-06\n";
    for (const r of US) {
      const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
      tick += `  "${r.id}": [${t}],\n`;
    }
    const mark = "  // 2026-10-02";
    const tIdx = c.indexOf(mark);
    if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-10-02 marker missing");
    write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
    console.log("REPORT_TICKERS: inserted 2026-10-06");
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
  ];
  return modes[i % modes.length]();
}

const ANALYST_COMMENTS = {
  "starship-f14": [
    "첫 궤도 고도 약 275킬로미터와 26기 연락을 확인으로 보겠습니다.",
    "다음 발사 창과 함선 엔진 숙제가 달력입니다.",
  ],
  "starlink-v3-26": [
    "기당 1테라비트는 설계 값입니다. 실제 내려받기가 다음입니다.",
    "60기 한 방은 목표입니다. 다음 전개가 확인입니다.",
  ],
  "tsla-uae-fsd": [
    "248은 시나리오 수입니다. 통과 숫자가 아닙니다.",
    "제품 출시 공고가 나오면 구독 칸이 열립니다.",
  ],
  "tsla-apr-hike": [
    "0.50%포인트는 표의 간격입니다. 10월 표가 다음입니다.",
    "3분기 인도와 만료일을 같이 보겠습니다.",
  ],
  "tsla-roadster-oct15": [
    "15일은 날짜입니다. 스펙 표는 무대에서 나옵니다.",
    "야외 악천후가 이유입니다. 양산 연도는 아직입니다.",
  ],
  "umich-sentiment-481": [
    "확정 점수는 48.1입니다. 공식은 넉 달 만에 최저입니다.",
    "10월 예비치와 물가 기대 4.6%를 보겠습니다.",
  ],
  "gates-ai-nuclear": [
    "한 사람의 의견입니다. 조약이 아닙니다.",
    "수출 통제와 안전 평가 합의가 다음 달력입니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = [r.c1, r.c2].filter(Boolean);
  if (pair[k]) return pair[k];
  return k === 0
    ? `${r.subject} 숫자와 다음 일정을 나눠 적겠습니다.`
    : "공식 문서가 나오면 이 문장과 대조하겠습니다.";
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  const firstId = -1478;
  const individuals = US.filter((r) => !r.pinned);
  const posts = individuals.map((r, i) => {
    const id = firstId - i;
    const comments = 2;
    return {
      id,
      alias: ALIASES[i % ALIASES.length],
      symbol: (r.tickers && r.tickers[0]) || "MACRO",
      content: r.analyst,
      comments,
      likes: 15 + (i % 8),
      created_at: `2026-10-06T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const missingPosts = posts.filter((p) => !c.includes(`id: ${p.id}`));
  if (missingPosts.length === 0) {
    console.log("analystPosts US already — skip");
  } else {
    const block =
      (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-10-06 신규 ──────────────────────\n") +
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
    const mark = "  // ── 2026-10-02 신규";
    const idx = c.indexOf(mark);
    if (idx === -1) throw new Error("analyst 2026-10-02 marker missing");
    write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

    c = read("lib/analystPosts.ts");
    const comm =
      (c.includes("  // ── 2026-10-06 애널 댓글") ? "" : "  // ── 2026-10-06 애널 댓글 ──────────────────────\n") +
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
    const cmark = "  // ── 2026-10-02 애널 댓글";
    const cidx = c.indexOf(cmark);
    if (cidx === -1) throw new Error("analyst comments 2026-10-02 marker missing");
    write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
    console.log(`analystPosts US extra: ${missingPosts.map((p) => p.id).join(",")}`);
  }

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "starship-f14": "스타십14 첫궤도 275km T+26분. S41. 26기 전개 연락전부. 걸프착수 31/33. 태평양 11:57 하와이북쪽",
  "starlink-v3-26": "스타링크V3 26기. 기당 1Tbps 이번 26Tbps. 팰컨9 V2미니 약10배. 60기면 약20배. 연락전부",
  "tsla-uae-fsd": "UAE 규제실험실 Tesla Motors FSD Supervised 검증. 두바이랩 248시나리오. 통과숫자아님. 2030 25%",
  "tsla-apr-hike": "미국할부 +0.50%p. 3프리미엄 2.49. Y베이스·프리미엄 1.99. 프로모 9/30전후",
  "tsla-roadster-oct15": "로드스터 행사 10/15로 연기. 야외 악천후. 원래 10/1 맥그리거 와코",
  "umich-sentiment-481": "미시간 9월최종 48.1. 8월51.7 작년55.1. 현재50.9 기대46.3 물가기대4.6. 공식은 넉달최저",
  "gates-ai-nuclear": "게이츠 발언. AI세계협력이 핵협상보다 더 어렵다. 조약아님 의견",
};

const WALL_C1 = [
  "275km는 궤도. 착수는 계획된 바다",
  "1Tbps는 설계. 실제속도가 다음",
  "248은 장면수. 무인허가 아님",
  "0.50%p는 표. 10월표가 다음",
  "15일은 날짜. 스펙은 무대",
  "48.1이 확정. 사상2번째최저와 결이다름",
  "한줄 의견. 제재발표 아님",
];

const WALL_C2 = [
  "26기 며칠뒤 건강이 확인",
  "60기 한방은 목표",
  "출시공고가 구독칸",
  "분기말 인도와 만료 같이",
  "양산연도는 아직",
  "10월예비치랑 4.6% 같이봄",
  "수출통제 초안이 달력",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T06OCT")) {
    c = c.replace(
      "const T02OCT = 1790895600000; // 2026.10.02 08:00 KST",
      "const T06OCT = 1791241200000; // 2026.10.06 08:00 KST\nconst T02OCT = 1790895600000; // 2026.10.02 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T02OCT;", "export const LATEST_UPDATE = T06OCT;");
  }
  const firstId = 122148;
  const individuals = US.filter((r) => !r.pinned);
  const nickBySlug = {
    "starship-telescope": "망원경궤도",
    "starship-300gw": "연산삼백",
    "citi-spcx-12t": "씨티십이조",
    "micron-beat": "마이크론삼삼",
    "model3-camry": "캠리기름",
  };
  const posts = individuals.map((r, i) => {
    const id = firstId + i;
    const nick = r.nick || nickBySlug[r.slug] || `체크${i}`;
    return [id, (r.tickers && r.tickers[0]) || "MACRO", nick, "관심종목", r.wall || r.title];
  });
  const missing = posts.filter((p) => !c.includes(`id: ${p[0]}`));
  if (missing.length === 0) {
    console.log("wall US already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  const block =
    (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-10-06 신규 ────────────────\n") +
    missing
      .map((p) => {
        const i = posts.findIndex((x) => x[0] === p[0]);
        return `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T06OCT + ${8 + i * 8}*60_000, likes: ${24 - (i % 10)}, comments: 2 },`;
      })
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  missing.forEach((p) => {
    const i = posts.findIndex((x) => x[0] === p[0]);
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(individuals[i].c1)}, createdAt: T06OCT + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(individuals[i].c2)}, createdAt: T06OCT + ${(15 + i) * 60_000}, likes: 4 },\n`;
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
    "scripts/fix-reports-20261006-ko-reports.js",
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
REPORTS.push(...require('./fix-reports-20261006-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20261006 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20261006-ko.js", ko);
  console.log("fix-reports-20261006-ko.js / ko-reports.js written");
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
    "scripts/fix-reports-20261006-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20261006-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20261006 done (US)");
}

main();
