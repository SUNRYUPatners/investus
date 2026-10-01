#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20261002-markets");

const ROOT = path.join(__dirname, "..");
const DATE = "2026-10-02";
const UPDATED = "2026.10.02 08:40";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20261002";
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
        `  { id: ${r.wid}, symbol: ${JSON.stringify(r.subject)}, nickname: ${JSON.stringify(r.nick)}, holdingLabel: ${JSON.stringify(r.hold)}, content: ${JSON.stringify(r.wall)}, createdAt: T02OCT - ${i * 1800000}, likes: ${40 - i}, comments: 2, },`,
    )
    .join("\n");
}

function wallComments(rows) {
  return rows
    .map(
      (r) => `  ${r.wid}: [
    { id: 1, nickname: ${JSON.stringify(r.c1n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c1)}, createdAt: T02OCT + 600000, likes: 4 },
    { id: 2, nickname: ${JSON.stringify(r.c2n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c2)}, createdAt: T02OCT + 1200000, likes: 3 },
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
    { alias: ${JSON.stringify(r.ac1n)}, content: ${JSON.stringify(r.a1)}, created_at: ${JSON.stringify(r.at.replace(":10:00.000Z", ":16:00.000Z").replace(":20:00.000Z", ":26:00.000Z").replace(":30:00.000Z", ":36:00.000Z"))} },
    { alias: ${JSON.stringify(r.ac2n)}, content: ${JSON.stringify(r.a2)}, created_at: ${JSON.stringify(r.at.replace(":10:00.000Z", ":22:00.000Z").replace(":20:00.000Z", ":32:00.000Z").replace(":30:00.000Z", ":42:00.000Z"))} },
  ],`,
    )
    .join("\n");
}

const krNick = ["육천구백칠십일", "이십칠만육천", "백팔십삼만", "백사십이만구", "삼십사만구천", "기관사천일백"];
const krHold = ["인덱스", "삼성 보유", "하이닉스 보유", "바이오 관심", "현대 보유", "관망"];
const krC1n = ["시가육천칠백", "우선주오름", "브이자반등", "발행가액", "삼십오만앞", "오전매도오후"];
const krC2n = ["개인매도", "자사주막바지", "십오일전후", "오공장내년", "교보칠십사", "구월이십일조"];
const krAlias = ["여의도 학 #17", "성수 갈매기 #24", "판교 독수리 #63", "삼성동 치타 #41", "잠실 여우 #35", "역삼 수리 #72"];
const krAc1 = ["마포 너구리 #21", "한남 백로 #48", "종로 판다 #11", "광화문 늑대 #29", "분당 까치 #54", "인천 올빼미 #08"];
const krAc2 = ["송파 매 #66", "압구정 고래 #13", "청담 살쾡이 #37", "해운대 재규어 #50", "강남 학 #19", "서초 치타 #44"];
const krA1 = [
  "6,971.35는 어제 종가입니다. 오늘 시초가가 다음입니다.",
  "우선주 4.76%와 보통주 2.79%를 한 평균으로 만들지 않겠습니다.",
  "174만 9,000원은 장중 저점입니다. 종가는 183만 3,000원입니다.",
  "발행가액 안내와 납입 완료를 같은 단계로 두지 않겠습니다.",
  "34만 9,000원은 35만 원 바로 아래입니다. 오늘 시초가를 보겠습니다.",
  "기관 4,171억 원은 어제 하루입니다. 9월 합과 더하지 않겠습니다.",
];
const krA2 = [
  "외국인 5거래일 연속이되 강도는 줄었다는 문장이 있습니다.",
  "자사주 마지막 주문이 어제 칸입니다.",
  "하이닉스 자사주는 15일 전후가 마지막 주문으로 거론됩니다.",
  "5공장 2027년 가동이 하우스 전망의 자리입니다.",
  "삼성증권 목표 50만 원은 이 종가와 거리를 두고 읽겠습니다.",
  "11시 이후 창구가 돌아선 흐름을 오늘 아침에 다시 보겠습니다.",
];

const safeNick = ["금사천일백오십칠", "비트팔만사천", "이더이천육백", "달러백일점육", "유가구십일"];
const safeHold = ["금 보유", "BTC 보유", "관심", "관망", "관심"];
const safeC1n = ["씨오멕스종가", "펀드유출", "아침시각", "환율따로", "유럽세션"];
const safeC2n = ["고용내일", "고점팔만오", "종가아님", "엔화동조", "구십점사"];
const safeAlias = ["은빛 학 #16", "청산 치타 #42", "원유 까치 #27", "달러 늑대 #38", "금리 백로 #51"];
const safeAc1 = ["노량진 갈매기 #09", "마곡 여우 #33", "송도 수리 #61", "일산 올빼미 #14", "분당 재규어 #22"];
const safeAc2 = ["강남 너구리 #47", "여의도 판다 #18", "잠실 독수리 #55", "성수 매 #30", "판교 고래 #07"];
const safeA1 = [
  "4,157.41달러는 COMEX 자리입니다. 4,182달러와 시각이 다릅니다.",
  "8만 4,778.89달러는 종가입니다. 고점 8만 5,247달러와 나란히 두겠습니다.",
  "2,688.17달러는 동부 오전 9시 30분입니다.",
  "101.60은 어제 오후 3시 22분입니다.",
  "91.80달러는 유럽 세션입니다. 90.42달러와 평균 내지 않겠습니다.",
];
const safeA2 = [
  "금요일 고용이 금의 다음 달력입니다.",
  "현물 펀드 1억 4,800만 달러 유출과 가격 상승을 한 신호로 부르지 않겠습니다.",
  "비트코인 퍼센트를 이더리움에 그대로 붙이지 않겠습니다.",
  "원·달러 1,358.4원과 달러인덱스를 한 퍼센트로 나누지 않겠습니다.",
  "브렌트 100달러와 WTI를 한 배럴로 섞지 않겠습니다.",
];

const reNick = ["광명이순위", "이순위통장", "계양오후다섯", "전매삼년"];
const reHold = ["관심", "청약 준비", "관심", "관심"];
const reC1n = ["일순위끝", "청약금없음", "특별이미닫힘", "실거주별도"];
const reC2n = ["오후다섯시", "분양가팔억", "육백육십삼", "상한제미적용"];
const reAlias = ["전세 학 #31", "갱신 치타 #14", "동북 여우 #52", "정책 갈매기 #28"];
const reAc1 = ["마포 백로 #45", "성수 늑대 #19", "송파 까치 #63", "인천 수리 #07"];
const reAc2 = ["광화문 판다 #22", "분당 올빼미 #36", "강남 재규어 #11", "여의도 독수리 #58"];
const reA1 = [
  "오늘은 광명 2순위와 계양 오후 5시 마감이 같은 날입니다.",
  "2순위는 청약통장으로 신청하고 청약금은 없습니다.",
  "계양 일반공급 창은 오늘 오후 5시에 닫힙니다.",
  "광명 전매 3년은 당첨일부터입니다.",
];
const reA2 = [
  "광명 발표는 10월 12일, 계양은 10월 21일입니다.",
  "59제곱미터 최고 8억 7,900만 원입니다.",
  "663세대와 광명 426세대를 한 오늘 공급으로 더하지 않겠습니다.",
  "계양은 실거주 의무가 없고 전매만 3년입니다.",
];

function decorate(arr, nicks, holds, c1n, c2n, aliases, ac1, ac2, a1, a2, aid0, hourTag) {
  return arr.map((r, i) => ({
    ...r,
    nick: nicks[i],
    hold: holds[i],
    c1n: c1n[i],
    c2n: c2n[i],
    alias: aliases[i],
    ac1n: ac1[i],
    ac2n: ac2[i],
    a1: a1[i],
    a2: a2[i],
    aid: aid0 - i,
    symbol: r.subject,
    likes: 22 - i,
    at: `2026-10-02T0${i}:${hourTag}:00.000Z`,
  }));
}

KR.forEach((r, i) => (r.wid = 9520 + i));
SAFE.forEach((r, i) => (r.wid = 9530 + i));
KR_RE.forEach((r, i) => (r.wid = 9540 + i));

const krAn = decorate(KR, krNick, krHold, krC1n, krC2n, krAlias, krAc1, krAc2, krA1, krA2, -2487, "10");
const safeAn = decorate(SAFE, safeNick, safeHold, safeC1n, safeC2n, safeAlias, safeAc1, safeAc2, safeA1, safeA2, -2493, "20");
const reAn = decorate(KR_RE, reNick, reHold, reC1n, reC2n, reAlias, reAc1, reAc2, reA1, reA2, -2499, "30");

insertReports("lib/reports-kr.ts", "kr-seed-258", KR);
insertReports("lib/reports-safe.ts", "safe-seed-235", SAFE);
insertReports("lib/reports-kr-re.ts", "krre-seed-206", KR_RE);

let w = read("lib/wallPosts-markets.ts");
if (!w.includes("const T02OCT")) {
  w = w.replace(
    "const T01OCT = 1790809200000; // 2026-10-01 08:00 KST",
    "const T02OCT = 1790895600000; // 2026-10-02 08:00 KST\nconst T01OCT = 1790809200000; // 2026-10-01 08:00 KST",
  );
}
if (!w.includes("id: 9520")) {
  w = w.replace("export const MOCK_POSTS_KR: Post[] = [\n", "export const MOCK_POSTS_KR: Post[] = [\n" + wallBlock(krAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n" + wallComments(krAn) + "\n");
}
if (!w.includes("id: 9530")) {
  w = w.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", "export const MOCK_POSTS_SAFE: Post[] = [\n" + wallBlock(safeAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n" + wallComments(safeAn) + "\n");
}
if (!w.includes("id: 9540")) {
  w = w.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", "export const MOCK_POSTS_KR_RE: Post[] = [\n" + wallBlock(reAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n" + wallComments(reAn) + "\n");
}
write("lib/wallPosts-markets.ts", w);
console.log("wall markets inserted");

let a = read("lib/analystPosts-markets.ts");
if (!a.includes("id: -2487")) {
  a = a.replace(
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n",
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n  // ── 2026-10-02 KR ──────────────────────\n" + analystPosts(krAn) + "\n",
  );
  a = a.replace(
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n",
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n  // ── 2026-10-02 KR 댓글 ──────────────────────\n" + analystComments(krAn) + "\n",
  );
  a = a.replace(
    "  // ── 2026-10-01 SAFE ──────────────────────\n",
    "  // ── 2026-10-02 SAFE ──────────────────────\n" + analystPosts(safeAn) + "\n  // ── 2026-10-01 SAFE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-01 SAFE 댓글 ──────────────────────\n",
    "  // ── 2026-10-02 SAFE 댓글 ──────────────────────\n" + analystComments(safeAn) + "\n  // ── 2026-10-01 SAFE 댓글 ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-01 KR-RE ──────────────────────\n",
    "  // ── 2026-10-02 KR-RE ──────────────────────\n" + analystPosts(reAn) + "\n  // ── 2026-10-01 KR-RE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-01 KR-RE 댓글 ──────────────────────\n",
    "  // ── 2026-10-02 KR-RE 댓글 ──────────────────────\n" + analystComments(reAn) + "\n  // ── 2026-10-01 KR-RE 댓글 ──────────────────────\n",
  );
  write("lib/analystPosts-markets.ts", a);
  console.log("analyst markets inserted");
} else {
  console.log("analyst markets already");
}
