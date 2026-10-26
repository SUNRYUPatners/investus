#!/usr/bin/env node
/** Insert 2026-10-26 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20261026-us");

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
    console.log("reports.ts: already inserted — skip");
  } else {
    const block = missing.map((r) => tsBlock(r)).join(",\n") + ",\n";
    // Insert before seed-2099 (the 2026-10-24 summary)
    const beforeId = "seed-2099";
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
    let tick = "  // 2026-10-26\n";
    for (const r of US) {
      const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
      tick += `  "${r.id}": [${t}],\n`;
    }
    const mark = "  // 2026-10-07";
    const tIdx = c.indexOf(mark);
    if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-10-07 marker missing");
    write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
    console.log("REPORT_TICKERS: inserted 2026-10-26");
  }
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  const firstId = -1665;
  const individuals = US.filter((r) => !r.pinned);
  const posts = individuals.map((r, i) => {
    const id = firstId - i;
    return {
      id,
      alias: ALIASES[i % ALIASES.length],
      symbol: (r.tickers && r.tickers[0]) || "MACRO",
      content: r.analyst,
      comments: 2,
      likes: 18 + (i % 7),
      created_at: `2026-10-26T${String(Math.floor((i * 7) / 60)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });

  const missingPosts = posts.filter((p) => !c.includes(`id: ${p.id}`));
  if (missingPosts.length === 0) {
    console.log("analystPosts already — skip");
  } else {
    const block =
      "  // ── 2026-10-26 (월) 신규 ──────────────────────\n" +
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
    console.log(`analystPosts: inserted ${missingPosts.map((p) => p.id).join(",")}`);
  }

  c = read("lib/analystPosts.ts");
  if (c.includes(`[${firstId}]:`)) {
    console.log("analystPosts comments: already present");
    return;
  }
  const comm =
    "  // ── 2026-10-26 애널 댓글 ──────────────────────\n" +
    posts
      .map((p) => {
        const i = posts.findIndex((x) => x.id === p.id);
        const r = individuals[i];
        const c1 = r.c1 || `${r.subject} 숫자와 다음 일정을 나눠 적겠습니다.`;
        const c2 = r.c2 || "공식 문서가 나오면 이 문장과 대조하겠습니다.";
        return `  [${p.id}]: [
    { alias: ${JSON.stringify(ALIASES[(i + 3) % ALIASES.length])}, content: ${JSON.stringify(c1)}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":04:00.000Z"))} },
    { alias: ${JSON.stringify(ALIASES[(i + 7) % ALIASES.length])}, content: ${JSON.stringify(c2)}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":07:00.000Z"))} },
  ],`;
      })
      .join("\n") +
    "\n";

  const commMark = "export const MOCK_ANALYST_COMMENTS: Record<number, AnalystMockComment[]> = {\n";
  const commIdx = c.indexOf(commMark);
  if (commIdx === -1) throw new Error("MOCK_ANALYST_COMMENTS not found");
  write("lib/analystPosts.ts", c.slice(0, commIdx + commMark.length) + comm + c.slice(commIdx + commMark.length));
  console.log("analystPosts comments: inserted");
}

function insertWallUs() {
  let c = read("lib/wallPosts.ts");

  // Add T26OCT constant
  if (!c.includes("const T26OCT")) {
    c = c.replace(
      "const T24OCT = 1792796400000; // 2026-10-24 09:00 KST (토)",
      "const T26OCT = 1792969200000; // 2026-10-26 08:00 KST (월)\nconst T24OCT = 1792796400000; // 2026-10-24 09:00 KST (토)",
    );
    c = c.replace("export const LATEST_UPDATE = T24OCT;", "export const LATEST_UPDATE = T26OCT;");
    console.log("wallPosts: added T26OCT, updated LATEST_UPDATE");
  }

  const firstId = 122410;
  const individuals = US.filter((r) => !r.pinned);
  const posts = individuals.map((r, i) => {
    const id = firstId + i;
    return [id, (r.tickers && r.tickers[0]) || "MACRO", r.nick || `체크${i}`, "관심종목", r.wall || r.title];
  });

  const missing = posts.filter((p) => !c.includes(`id: ${p[0]}`));
  if (missing.length === 0) {
    console.log("wall posts: already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }

  const block =
    "  // ── 2026-10-26 (월) 신규 ────────────────\n" +
    missing
      .map((p) => {
        const i = posts.findIndex((x) => x[0] === p[0]);
        return `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T26OCT + ${8 + i * 8}*60_000, likes: ${32 - (i % 10)}, comments: 2 },`;
      })
      .join("\n") +
    "\n";

  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  missing.forEach((p) => {
    const i = posts.findIndex((x) => x[0] === p[0]);
    const r = individuals[i];
    const id = p[0];
    const c1 = r.c1 || `${r.subject} 확인`;
    const c2 = r.c2 || "다음 발표가 확인";
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(c1)}, createdAt: T26OCT + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(c2)}, createdAt: T26OCT + ${(15 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `  ],\n`;
  });

  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
  write("lib/wallPosts.ts", c);
  console.log(`wallPosts: inserted ${missing.map((p) => p[0]).join(",")}`);
}

insertReportsTs();
insertAnalystUs();
insertWallUs();
console.log("✓ apply-20261026 done");
