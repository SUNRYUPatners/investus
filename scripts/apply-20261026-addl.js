#!/usr/bin/env node
/** Insert 2026-10-26 additional reports (seed-2106~2110): META FCF / Cybercab Texas / SpaceX neoclouds / Gerstner / Starlink */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20261026-us-addl");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.10.26";
const UPDATED = "2026.10.26 09:00";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20261026";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const ALIASES = [
  "마포 살쾡이 #14", "한남 재규어 #55", "여의도 매 #36", "송파 백로 #18",
  "분당 늑대 #22", "성수 판다 #81", "역삼 치타 #09", "광화문 올빼미 #47",
  "삼성동 고래 #61", "해운대 여우 #33", "종로 수리 #70", "판교 까치 #25",
  "인천 너구리 #58", "압구정 독수리 #12", "잠실 갈매기 #84", "청담 학 #06",
];

function tsBlock(r) {
  const img = `/charts/${r.slug}-${TAG}.png`;
  const imgEn = `/charts/${r.slug}-${TAG}-en.png`;
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
    updatedAt: ${JSON.stringify(UPDATED)},
    images: [${JSON.stringify(img)}],
    imagesEn: [${JSON.stringify(imgEn)}],
  }`;
}

function insertReportsTs() {
  let c = read("lib/reports.ts");
  const missing = US.filter((r) => !c.includes(`id: "${r.id}"`));
  if (missing.length === 0) {
    console.log("reports.ts: already inserted — skip");
  } else {
    const block = missing.map((r) => tsBlock(r)).join(",\n") + ",\n";
    // Insert before seed-2099 (right after seed-2105)
    const beforeId = "seed-2099";
    const idx = c.indexOf(`id: "${beforeId}"`);
    if (idx === -1) throw new Error(`${beforeId} not found`);
    const start = c.lastIndexOf("  {", idx);
    write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
    console.log(`reports.ts: inserted ${missing[0].id}~${missing[missing.length - 1].id}`);
  }

  // REPORT_TICKERS — insert after seed-2105 entry, before // 2026-10-07
  c = read("lib/reports.ts");
  if (c.includes(`"${US[0].id}": [`)) {
    console.log("REPORT_TICKERS: already present");
  } else {
    let tick = "";
    for (const r of US) {
      const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
      tick += `  "${r.id}": [${t}],\n`;
    }
    const mark = "  // 2026-10-07";
    const tIdx = c.indexOf(mark);
    if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-10-07 marker missing");
    write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
    console.log("REPORT_TICKERS: inserted seed-2106~2110");
  }

  // Update seed-2100 summary title to include additional topics
  c = read("lib/reports.ts");
  const oldTitle = "한장요약 2026-10-26 — SPCX 328M주 잠금해제 발효 · 합병위 탐색 · SpaceX Q3 +161% · Tesla FSD 174만 · 10Y 5%";
  const newTitle = "한장요약 2026-10-26 — SPCX 328M주 잠금해제 · 합병위 탐색 · SpaceX Q3 +161% · Tesla FSD 174만 · META FCF 첫 적자 · Cybercab 텍사스 970대 · 네오클라우드 붕괴";
  const oldTitleEn = "Daily Summary 2026-10-26 — SPCX 328M unlock live · merger committee · SpaceX Q3 +161% · TSLA FSD 1.74M · 10Y yield 5%";
  const newTitleEn = "Daily Summary 2026-10-26 — SPCX 328M unlock · merger committee · SpaceX Q3 +161% · TSLA FSD 1.74M · META FCF first negative · Cybercab Texas 970 · neoclouds collapse";

  if (c.includes(oldTitle)) {
    c = c.replace(oldTitle, newTitle);
    console.log("seed-2100 title: updated");
  } else {
    console.log("seed-2100 title: already updated or not found — skip");
  }
  if (c.includes(oldTitleEn)) {
    c = c.replace(oldTitleEn, newTitleEn);
    console.log("seed-2100 titleEn: updated");
  }
  write("lib/reports.ts", c);
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  const firstId = -1670; // -1665~-1669 already used by apply-20261026.js
  const posts = US.map((r, i) => {
    const id = firstId - i;
    return {
      id,
      alias: ALIASES[(i + 8) % ALIASES.length], // offset to avoid same aliases
      symbol: (r.tickers && r.tickers[0]) || "MACRO",
      content: r.analyst,
      comments: 2,
      likes: 21 + (i % 7),
      created_at: `2026-10-26T0${String(1 + Math.floor((i * 9) / 60)).padStart(1, "0")}:${String((i * 9) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });

  const missingPosts = posts.filter((p) => !c.includes(`id: ${p.id}`));
  if (missingPosts.length === 0) {
    console.log("analystPosts addl: already — skip");
  } else {
    const block =
      "  // ── 2026-10-26 (월) 추가 ──────────────────────\n" +
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
    const mark = "  // ── 2026-10-24 (토) 주말 자체수집 ──────────────";
    const idx = c.indexOf(mark);
    if (idx === -1) throw new Error("analyst 2026-10-24 marker missing");
    write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));
    console.log(`analystPosts addl: inserted ${missingPosts.map((p) => p.id).join(",")}`);
  }

  c = read("lib/analystPosts.ts");
  if (c.includes(`[${firstId}]:`)) {
    console.log("analystPosts addl comments: already present");
    return;
  }
  const comm =
    "  // ── 2026-10-26 추가 애널 댓글 ──────────────────────\n" +
    posts
      .map((p) => {
        const i = posts.findIndex((x) => x.id === p.id);
        const r = US[i];
        const c1 = r.c1 || `${r.subject} 숫자와 다음 일정을 나눠 적겠습니다.`;
        const c2 = r.c2 || "공식 문서가 나오면 이 문장과 대조하겠습니다.";
        return `  [${p.id}]: [
    { alias: ${JSON.stringify(ALIASES[(i + 4) % ALIASES.length])}, content: ${JSON.stringify(c1)}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":04:00.000Z"))} },
    { alias: ${JSON.stringify(ALIASES[(i + 9) % ALIASES.length])}, content: ${JSON.stringify(c2)}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":07:00.000Z"))} },
  ],`;
      })
      .join("\n") +
    "\n";

  const commMark = "export const MOCK_ANALYST_COMMENTS: Record<number, AnalystMockComment[]> = {\n";
  const commIdx = c.indexOf(commMark);
  if (commIdx === -1) throw new Error("MOCK_ANALYST_COMMENTS not found");
  write("lib/analystPosts.ts", c.slice(0, commIdx + commMark.length) + comm + c.slice(commIdx + commMark.length));
  console.log("analystPosts addl comments: inserted");
}

function insertWallUs() {
  let c = read("lib/wallPosts.ts");

  const firstId = 122415; // 122410~122414 already used by apply-20261026.js
  const posts = US.map((r, i) => {
    const id = firstId + i;
    return [id, (r.tickers && r.tickers[0]) || "MACRO", r.nick || `체크${i}`, "관심종목", r.wall || r.title];
  });

  const missing = posts.filter((p) => !c.includes(`id: ${p[0]}`));
  if (missing.length === 0) {
    console.log("wall posts addl: already — skip");
    return;
  }

  const block =
    "  // ── 2026-10-26 (월) 추가 ────────────────\n" +
    missing
      .map((p) => {
        const i = posts.findIndex((x) => x[0] === p[0]);
        return `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T26OCT + ${80 + i * 8}*60_000, likes: ${28 - (i % 8)}, comments: 2 },`;
      })
      .join("\n") +
    "\n";

  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  missing.forEach((p) => {
    const i = posts.findIndex((x) => x[0] === p[0]);
    const r = US[i];
    const id = p[0];
    const c1 = r.c1 || `${r.subject} 확인`;
    const c2 = r.c2 || "다음 발표가 확인";
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 2) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(c1)}, createdAt: T26OCT + ${(90 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 4) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(c2)}, createdAt: T26OCT + ${(93 + i) * 60_000}, likes: 3 },\n`;
    commBlock += `  ],\n`;
  });

  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
  write("lib/wallPosts.ts", c);
  console.log(`wallPosts addl: inserted ${missing.map((p) => p[0]).join(",")}`);
}

insertReportsTs();
insertAnalystUs();
insertWallUs();
console.log("✓ apply-20261026-addl done");
