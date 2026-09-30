#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20261001-markets");

const ROOT = path.join(__dirname, "..");
const DATE = "2026-10-01";
const UPDATED = "2026.10.01 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20261001";
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

function tsBlock(r) {
  const img = `/charts/${r.slug}-${TAG}.svg`;
  const imgEn = `/charts/${r.slug}-${TAG}-en.svg`;
  const pinned = r.pinned ? "\n    isPinned: true," : "";
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
    date: ${JSON.stringify(DATE)},
    updatedAt: ${JSON.stringify(UPDATED)},${pinned}
    images: [${JSON.stringify(img)}],
    imagesEn: [${JSON.stringify(imgEn)}],
  }`;
}

function insertReports(file, beforeId, arr) {
  let c = read(file);
  if (c.includes(`id: "${arr[0].id}"`)) {
    console.log(file, "already");
    return;
  }
  const block = arr.map(tsBlock).join(",\n") + ",\n";
  const idx = c.indexOf(`id: "${beforeId}"`);
  if (idx < 0) throw new Error(beforeId + " missing in " + file);
  const start = c.lastIndexOf("  {", idx);
  write(file, c.slice(0, start) + block + c.slice(start));
  console.log(file, arr[0].id, "→", arr[arr.length - 1].id);
}

function wallBlock(rows) {
  return rows
    .map(
      (r, i) =>
        `  { id: ${r.wid}, symbol: ${JSON.stringify(r.subject)}, nickname: ${JSON.stringify(r.nick)}, holdingLabel: ${JSON.stringify(r.hold)}, content: ${JSON.stringify(r.wall)}, createdAt: T01OCT - ${i * 1800000}, likes: ${40 - i}, comments: 2, },`,
    )
    .join("\n");
}

function wallComments(rows) {
  return rows
    .map(
      (r) => `  ${r.wid}: [
    { id: 1, nickname: ${JSON.stringify(r.c1n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c1)}, createdAt: T01OCT + 600000, likes: 4 },
    { id: 2, nickname: ${JSON.stringify(r.c2n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c2)}, createdAt: T01OCT + 1200000, likes: 3 },
  ],`,
    )
    .join("\n");
}

function analystPosts(rows) {
  return rows
    .map(
      (r) => `  {
    id: ${r.aid}, alias: ${JSON.stringify(r.alias)}, symbol: ${JSON.stringify(r.symbol)},
    content: ${JSON.stringify(r.analyst)},
    likes: ${r.likes}, comments: 2, created_at: ${JSON.stringify(r.at)}, liked: false,
  },`,
    )
    .join("\n");
}

function analystComments(rows) {
  return rows
    .map(
      (r) => `  [${r.aid}]: [
    { alias: ${JSON.stringify(r.c1n)}, content: ${JSON.stringify(r.c1)}, created_at: ${JSON.stringify(r.at.replace(":10:00.000Z", ":16:00.000Z").replace(":20:00.000Z", ":26:00.000Z").replace(":30:00.000Z", ":36:00.000Z"))} },
    { alias: ${JSON.stringify(r.c2n)}, content: ${JSON.stringify(r.c2)}, created_at: ${JSON.stringify(r.at.replace(":10:00.000Z", ":22:00.000Z").replace(":20:00.000Z", ":32:00.000Z").replace(":30:00.000Z", ":42:00.000Z"))} },
  ],`,
    )
    .join("\n");
}

const krNick = ["육천팔백삼십팔", "이십육만팔천", "백칠십칠만", "이조오백이십", "삼십사만오천", "코스닥팔백"];
const krHold = ["인덱스", "삼성 보유", "하이닉스 보유", "관망", "관심", "관심"];
const krC1n = ["시가육천구백", "우선주낙폭", "가격은올리고", "프로그램합계", "오천원하락", "부호갈림"];
const krC2n = ["개인매수", "유안타육십삼", "아이엠삼백오십", "비차익매도", "교보칠십사", "환율삼점구"];
const krAlias = ["여의도 수리 #52", "성수 너구리 #38", "판교 치타 #46", "삼성동 여우 #33", "잠실 백로 #48", "역삼 판다 #55"];

const safeNick = ["금사천일백", "은육십점일", "유가구십점사", "비트팔만사"];
const safeHold = ["관망", "금 보유", "관심", "BTC 보유"];
const safeC1n = ["저녁시각", "아침이천이백", "등락폭없음", "고점되돌림"];
const safeC2n = ["물가삼점사", "은은따로", "해협피격", "근원삼점영"];
const safeAlias = ["은빛 갈매기 #28", "청산 올빼미 #31", "원유 학 #19", "달러 여우 #24"];

const reNick = ["청약한장", "계양본청약", "광명기타", "화서발표"];
const reHold = ["관심", "관심", "관심", "관심"];
const reC1n = ["기타지역오늘", "일반창이틀", "해당은어제", "발표만오늘"];
const reC2n = ["육백육십삼별도", "오십구타입", "계약사흘", "세대수비움"];
const reAlias = ["전세 참새 #26", "갱신 백로 #57", "동북 학 #39", "정책 너구리 #42"];

function decorate(arr, nicks, holds, c1n, c2n, aliases, aid0, hourTag) {
  return arr.map((r, i) => ({
    ...r,
    wid: r.wid,
    nick: nicks[i],
    hold: holds[i],
    c1n: c1n[i],
    c2n: c2n[i],
    alias: aliases[i],
    aid: aid0 - i,
    symbol: r.subject,
    likes: 22 - i,
    at: `2026-10-01T0${i}:${hourTag}:00.000Z`,
  }));
}

KR.forEach((r, i) => (r.wid = 9490 + i));
SAFE.forEach((r, i) => (r.wid = 9500 + i));
KR_RE.forEach((r, i) => (r.wid = 9510 + i));

const krAn = decorate(KR, krNick, krHold, krC1n, krC2n, krAlias, -2473, "10");
const safeAn = decorate(SAFE, safeNick, safeHold, safeC1n, safeC2n, safeAlias, -2479, "20");
const reAn = decorate(KR_RE, reNick, reHold, reC1n, reC2n, reAlias, -2483, "30");

insertReports("lib/reports-kr.ts", "kr-seed-252", KR);
insertReports("lib/reports-safe.ts", "safe-seed-229", SAFE);
insertReports("lib/reports-kr-re.ts", "krre-seed-202", KR_RE);

let w = read("lib/wallPosts-markets.ts");
if (!w.includes("const T01OCT")) {
  w = w.replace(
    "const T30SEP = 1790722800000; // 2026-09-30 08:00 KST",
    "const T01OCT = 1790809200000; // 2026-10-01 08:00 KST\nconst T30SEP = 1790722800000; // 2026-09-30 08:00 KST",
  );
}
if (!w.includes("id: 9490")) {
  w = w.replace("export const MOCK_POSTS_KR: Post[] = [\n", "export const MOCK_POSTS_KR: Post[] = [\n" + wallBlock(krAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n" + wallComments(krAn) + "\n");
}
if (!w.includes("id: 9500")) {
  w = w.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", "export const MOCK_POSTS_SAFE: Post[] = [\n" + wallBlock(safeAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n" + wallComments(safeAn) + "\n");
}
if (!w.includes("id: 9510")) {
  w = w.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", "export const MOCK_POSTS_KR_RE: Post[] = [\n" + wallBlock(reAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n" + wallComments(reAn) + "\n");
}
write("lib/wallPosts-markets.ts", w);
console.log("wall markets inserted");

let a = read("lib/analystPosts-markets.ts");
if (!a.includes("id: -2473")) {
  a = a.replace(
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n",
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n  // ── 2026-10-01 KR ──────────────────────\n" + analystPosts(krAn) + "\n",
  );
  a = a.replace(
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n",
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n  // ── 2026-10-01 KR 댓글 ──────────────────────\n" + analystComments(krAn) + "\n",
  );
  a = a.replace(
    "  // ── 2026-09-30 SAFE ──────────────────────\n",
    "  // ── 2026-10-01 SAFE ──────────────────────\n" + analystPosts(safeAn) + "\n  // ── 2026-09-30 SAFE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-09-30 SAFE 댓글 ──────────────────────\n",
    "  // ── 2026-10-01 SAFE 댓글 ──────────────────────\n" + analystComments(safeAn) + "\n  // ── 2026-09-30 SAFE 댓글 ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-09-30 KR-RE ──────────────────────\n",
    "  // ── 2026-10-01 KR-RE ──────────────────────\n" + analystPosts(reAn) + "\n  // ── 2026-09-30 KR-RE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-09-30 KR-RE 댓글 ──────────────────────\n",
    "  // ── 2026-10-01 KR-RE 댓글 ──────────────────────\n" + analystComments(reAn) + "\n  // ── 2026-09-30 KR-RE 댓글 ──────────────────────\n",
  );
  write("lib/analystPosts-markets.ts", a);
  console.log("analyst markets inserted");
} else {
  console.log("analyst markets already");
}
