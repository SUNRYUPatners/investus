#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20261006-markets");

const ROOT = path.join(__dirname, "..");
const DATE = "2026-10-06";
const UPDATED = "2026.10.06 08:40";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20261006";
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
        `  { id: ${r.wid}, symbol: ${JSON.stringify(r.subject)}, nickname: ${JSON.stringify(r.nick)}, holdingLabel: ${JSON.stringify(r.hold)}, content: ${JSON.stringify(r.wall)}, createdAt: T06OCT - ${i * 1800000}, likes: ${40 - i}, comments: 2, },`,
    )
    .join("\n");
}

function wallComments(rows) {
  return rows
    .map(
      (r) => `  ${r.wid}: [
    { id: 1, nickname: ${JSON.stringify(r.c1n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c1)}, createdAt: T06OCT + 600000, likes: 4 },
    { id: 2, nickname: ${JSON.stringify(r.c2n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c2)}, createdAt: T06OCT + 1200000, likes: 3 },
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

const krNick = ["칠천삼점이칠", "보합이십칠만", "백팔십사만일", "백십육만스퀘", "삼십칠만엔솔", "기관삼팔일삼"];
const krHold = ["인덱스", "삼성 보유", "하이닉스 보유", "지주 관심", "배터리 보유", "관망"];
const krC1n = ["시가육천구백", "잠정팔일", "에이디알따로", "지주할인", "완성차갈림", "하루외인"];
const krC2n = ["사흘거래", "자사주초중순", "십오일전후", "닉스곱하지마", "수주확정아냐", "키움범위"];
const krAlias = ["여의도 학 #28", "성수 갈매기 #31", "판교 독수리 #74", "삼성동 치타 #52", "잠실 여우 #46", "역삼 수리 #83"];
const krAc1 = ["마포 너구리 #32", "한남 백로 #59", "종로 판다 #22", "광화문 늑대 #40", "분당 까치 #65", "인천 올빼미 #19"];
const krAc2 = ["송파 매 #77", "압구정 고래 #24", "청담 살쾡이 #48", "해운대 재규어 #61", "강남 학 #30", "서초 치타 #55"];
const krA1 = [
  "7,003.74는 금요일 종가입니다. 오늘 시초가가 다음입니다.",
  "보합과 하이닉스 0.44%를 한 평균으로 만들지 않겠습니다.",
  "184만 1,000원은 종가입니다. 예탁증서와 섞지 않겠습니다.",
  "116만 원은 지주 종가입니다. 하이닉스 종가와 나누지 않겠습니다.",
  "37만 1,000원은 배터리입니다. 완성차와 평균 내지 않겠습니다.",
  "3,813억 원은 금요일 하루입니다. 지난주 합과 더하지 않겠습니다.",
];
const krA2 = [
  "이번 주 거래일은 사흘입니다. 의사록과 잠정이 달력입니다.",
  "8일 잠정 눈높이 109조 5,000억 원은 공시 전 숫자입니다.",
  "하이닉스 자사주는 15일 전후가 마지막 주문으로 거론됩니다.",
  "지분 가치와 종가를 한 적정가로 만들지 않겠습니다.",
  "하루 2.91%를 수주 확정으로 부르지 않겠습니다.",
  "키움 6,800~7,300은 주간 범위입니다.",
];

const safeNick = ["요약팔오팔이", "비트팔만오천", "금사천일백오십", "은육십일점칠", "달러백이점오", "십년오점삼일"];
const safeHold = ["BTC 보유", "금 보유", "은 관심", "관망", "금리 관심", "관심"];
const safeC1n = ["고점팔만육", "아침사천", "시각다른은", "인덱스따로", "십년삼십년", "이더같이봄"];
const safeC2n = ["상관영점육", "고용이만구", "일년이십팔", "유로약세", "물가칠십사", "의사록수요일"];
const safeAlias = ["은빛 학 #27", "청산 치타 #53", "원유 까치 #38", "달러 늑대 #49", "금리 백로 #62", "국채 학 #75"];
const safeAc1 = ["노량진 갈매기 #20", "마곡 여우 #44", "송도 수리 #72", "일산 올빼미 #25", "분당 재규어 #33", "노원 치타 #19"];
const safeAc2 = ["강남 너구리 #58", "여의도 판다 #29", "잠실 독수리 #66", "성수 매 #41", "판교 고래 #18", "목동 여우 #52"];
const safeA1 = [
  "8만 5,829.02달러는 종가입니다. 고점과 나란히 두겠습니다.",
  "4,153달러는 동부 오전 시각입니다. 종가로 부르지 않겠습니다.",
  "61.70달러와 61.80달러는 시각이 다릅니다.",
  "102.5는 인덱스입니다. 원·달러와 나누지 않겠습니다.",
  "5.31%는 10년입니다. 30년과 평균 내지 않겠습니다.",
  "표의 네 자리는 시각이 다릅니다. 평균 내지 않겠습니다.",
];
const safeA2 = [
  "0.69는 상관입니다. 하루 수익률과 다른 칸입니다.",
  "고용 2만 9,000명과 금을 한 공식으로 곱하지 않겠습니다.",
  "28.55%는 1년입니다. 하루 2.17%와 섞지 않겠습니다.",
  "유로 1.116이 인덱스 이야기의 앞에 있습니다.",
  "74.0은 물가지수입니다. 금리 퍼센트와 다른 칸입니다.",
  "수요일 의사록이 다음 달력입니다.",
];

const reNick = ["전세팔십육", "매물이만사백", "십오억칠십구", "공공백십구만"];
const reHold = ["관심", "전세 관심", "매매 관심", "정책 관심"];
const reC1n = ["연속팔십육", "이만사백구십", "건수비중", "목표백십구"];
const reC2n = ["입주하반기", "대출한도육억", "육억이십오", "인허가오십"];
const reAlias = ["전세 학 #42", "갱신 치타 #25", "동북 여우 #63", "정책 갈매기 #39"];
const reAc1 = ["마포 백로 #56", "성수 늑대 #30", "송파 까치 #74", "인천 수리 #18"];
const reAc2 = ["광화문 판다 #33", "분당 올빼미 #47", "강남 재규어 #22", "여의도 독수리 #69"];
const reA1 = [
  "86주는 연속 상승입니다. 한 주 숫자와 다른 칸입니다.",
  "2만 497건은 10월 2일 매물입니다.",
  "79%는 건수 비중입니다. 금액 합과 다른 칸입니다.",
  "119만 호는 2030년 목표입니다.",
];
const reA2 = [
  "1만 8,994가구는 하반기 입주 예정입니다.",
  "15억 이하 한도와 전세 매물을 한 칸으로 두지 않겠습니다.",
  "6억 원 이하 25%와 79%를 평균 내지 않겠습니다.",
  "인허가 50%와 입주를 한 단계로 보지 않겠습니다.",
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
    at: `2026-10-06T0${i}:${hourTag}:00.000Z`,
  }));
}

KR.forEach((r, i) => (r.wid = 9550 + i));
SAFE.forEach((r, i) => (r.wid = 9560 + i));
KR_RE.forEach((r, i) => (r.wid = 9570 + i));

const krAn = decorate(KR, krNick, krHold, krC1n, krC2n, krAlias, krAc1, krAc2, krA1, krA2, -2503, "10");
const safeAn = decorate(SAFE, safeNick, safeHold, safeC1n, safeC2n, safeAlias, safeAc1, safeAc2, safeA1, safeA2, -2509, "20");
const reAn = decorate(KR_RE, reNick, reHold, reC1n, reC2n, reAlias, reAc1, reAc2, reA1, reA2, -2515, "30");

insertReports("lib/reports-kr.ts", "kr-seed-264", KR);
insertReports("lib/reports-safe.ts", "safe-seed-239", SAFE);
insertReports("lib/reports-kr-re.ts", "krre-seed-210", KR_RE);

let w = read("lib/wallPosts-markets.ts");
if (!w.includes("const T06OCT")) {
  w = w.replace(
    "const T02OCT = 1790895600000; // 2026-10-02 08:00 KST",
    "const T06OCT = 1791241200000; // 2026-10-06 08:00 KST\nconst T02OCT = 1790895600000; // 2026-10-02 08:00 KST",
  );
}
if (!w.includes("id: 9550")) {
  w = w.replace("export const MOCK_POSTS_KR: Post[] = [\n", "export const MOCK_POSTS_KR: Post[] = [\n" + wallBlock(krAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n" + wallComments(krAn) + "\n");
}
if (!w.includes("id: 9560")) {
  w = w.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", "export const MOCK_POSTS_SAFE: Post[] = [\n" + wallBlock(safeAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n" + wallComments(safeAn) + "\n");
}
if (!w.includes("id: 9570")) {
  w = w.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", "export const MOCK_POSTS_KR_RE: Post[] = [\n" + wallBlock(reAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n" + wallComments(reAn) + "\n");
}
write("lib/wallPosts-markets.ts", w);
console.log("wall markets inserted");

let a = read("lib/analystPosts-markets.ts");
if (!a.includes("id: -2503")) {
  a = a.replace(
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n",
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n  // ── 2026-10-06 KR ──────────────────────\n" + analystPosts(krAn) + "\n",
  );
  a = a.replace(
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n",
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n  // ── 2026-10-06 KR 댓글 ──────────────────────\n" + analystComments(krAn) + "\n",
  );
  a = a.replace(
    "  // ── 2026-10-02 SAFE ──────────────────────\n",
    "  // ── 2026-10-06 SAFE ──────────────────────\n" + analystPosts(safeAn) + "\n  // ── 2026-10-02 SAFE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-02 SAFE 댓글 ──────────────────────\n",
    "  // ── 2026-10-06 SAFE 댓글 ──────────────────────\n" + analystComments(safeAn) + "\n  // ── 2026-10-02 SAFE 댓글 ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-02 KR-RE ──────────────────────\n",
    "  // ── 2026-10-06 KR-RE ──────────────────────\n" + analystPosts(reAn) + "\n  // ── 2026-10-02 KR-RE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-02 KR-RE 댓글 ──────────────────────\n",
    "  // ── 2026-10-06 KR-RE 댓글 ──────────────────────\n" + analystComments(reAn) + "\n  // ── 2026-10-02 KR-RE 댓글 ──────────────────────\n",
  );
  write("lib/analystPosts-markets.ts", a);
  console.log("analyst markets inserted");
} else {
  console.log("analyst markets already");
}
