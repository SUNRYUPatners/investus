#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20261007-markets");

const ROOT = path.join(__dirname, "..");
const DATE = "2026-10-07";
const UPDATED = "2026.10.07 08:40";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20261007";
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
        `  { id: ${r.wid}, symbol: ${JSON.stringify(r.subject)}, nickname: ${JSON.stringify(r.nick)}, holdingLabel: ${JSON.stringify(r.hold)}, content: ${JSON.stringify(r.wall)}, createdAt: T07OCT - ${i * 1800000}, likes: ${40 - i}, comments: 2, },`,
    )
    .join("\n");
}

function wallComments(rows) {
  return rows
    .map(
      (r) => `  ${r.wid}: [
    { id: 1, nickname: ${JSON.stringify(r.c1n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c1)}, createdAt: T07OCT + 600000, likes: 4 },
    { id: 2, nickname: ${JSON.stringify(r.c2n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c2)}, createdAt: T07OCT + 1200000, likes: 3 },
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

const krNick = ["육천구백사십일", "이십칠만이천", "백칠십칠만삼", "삼십구만엔솔", "백삼십일만바", "외인일조칠천"];
const krHold = ["인덱스", "삼성 보유", "하이닉스 보유", "배터리 보유", "바이오 관심", "관망"];
const krC1n = ["시가칠천사십", "내일잠정", "상장설창구", "사십육만목표", "유증발행가", "전기전자창구"];
const krC2n = ["칠천선하루", "백육조눈높이", "자사주십오", "수주삼십기가", "희석수주", "코스닥구백이십"];
const krAlias = ["여의도 학 #29", "성수 갈매기 #32", "판교 독수리 #75", "삼성동 치타 #53", "잠실 여우 #47", "역삼 수리 #84"];
const krAc1 = ["마포 너구리 #33", "한남 백로 #60", "종로 판다 #23", "광화문 늑대 #41", "분당 까치 #66", "인천 올빼미 #20"];
const krAc2 = ["송파 매 #78", "압구정 고래 #25", "청담 살쾡이 #49", "해운대 재규어 #62", "강남 학 #31", "서초 치타 #56"];
const krA1 = [
  "6,941.39는 화요일 종가입니다. 오늘 시초가가 다음입니다.",
  "27만 2,000원은 종가입니다. 내일 잠정과 나란히 두겠습니다.",
  "177만 3,000원은 종가입니다. 솔리다임 상장설과 창구를 나누겠습니다.",
  "39만 원은 배터리 종가입니다. 46만 원 목표와 나란히 두겠습니다.",
  "131만 원은 종가입니다. 신주 발행가와 섞지 않겠습니다.",
  "1조 7,509억 원은 유가증권 하루입니다. 주간 합과 더하지 않겠습니다.",
];
const krA2 = [
  "외국인 1조 7,509억 원 매도가 7,000선을 하루 만에 내줬습니다.",
  "내일 잠정 눈높이 106조 9,435억 원은 공시 전 숫자입니다.",
  "하이닉스 외국인 창구 1조 4,066억 원이 1위입니다.",
  "삼성증권 영업이익 3,517억 원은 추정치입니다.",
  "유상증자 일정과 수주 공시를 한 칸에 더하지 않겠습니다.",
  "코스닥 919.92는 2.98% 오른 종가입니다.",
];

const safeNick = ["요약팔만육천", "비트자정팔육", "금사천일백팔", "이더이천칠백", "달러백일점삼", "십년오점이칠"];
const safeHold = ["관심", "BTC 보유", "금 보유", "이더 관심", "관망", "금리 관심"];
const safeC1n = ["자정뉴욕", "유출일억이", "현물선물", "점유십일", "인덱스원달러", "고점오일사"];
const safeC2n = ["의사록밤", "주간팔만사", "사천이백앞", "시총이점이구", "삼개월고점", "삼십년고점"];
const safeAlias = ["은빛 학 #28", "청산 치타 #54", "원유 까치 #39", "달러 늑대 #50", "금리 백로 #63", "국채 학 #76"];
const safeAc1 = ["노량진 갈매기 #21", "마곡 여우 #45", "송도 수리 #73", "일산 올빼미 #26", "분당 재규어 #34", "노원 치타 #20"];
const safeAc2 = ["강남 너구리 #59", "여의도 판다 #30", "잠실 독수리 #67", "성수 매 #42", "판교 고래 #19", "목동 여우 #53"];
const safeA1 = [
  "8만 6,647달러는 자정 시각입니다. 뉴욕 종가와 나란히 두겠습니다.",
  "8만 5,650달러는 뉴욕 시각입니다. 자정 숫자와 섞지 않겠습니다.",
  "4,180.99달러는 현물입니다. 선물 정산과 나란히 두겠습니다.",
  "2,723달러는 이더입니다. 점유율 11.29%와 나누지 않겠습니다.",
  "101.30은 인덱스입니다. 원·달러 1,343.6원과 나란히 두겠습니다.",
  "5.270%는 이날 10년입니다. 전날 고점 5.34%와 나란히 두겠습니다.",
];
const safeA2 = [
  "오늘 밤 의사록이 금리와 비트코인을 같이 흔들 수 있습니다.",
  "현물 상장지수펀드 유출 1억 2,060만 달러가 같은 칸입니다.",
  "4,156.3달러는 12월 선물 정산입니다.",
  "전체 시가총액 2조 9,100억 달러는 0.14% 줄었습니다.",
  "세 달 고점 시험입니다. 사상 최고와 섞지 않겠습니다.",
  "30년 고점 5.70%는 10년과 평균 내지 않겠습니다.",
];

const reNick = ["매매팔십육주", "영점공구연속", "국감공급", "최소보장삼분"];
const reHold = ["관심", "매매 관심", "정책 관심", "전세 관심"];
const reC1n = ["최장팔십육", "오름폭축소", "대책세개", "십일월십삼"];
const reC2n = ["국감오늘", "오억이하", "착공숫자", "예산팔백사십"];
const reAlias = ["전세 학 #43", "갱신 치타 #26", "동북 여우 #64", "정책 갈매기 #40"];
const reAc1 = ["마포 백로 #57", "성수 늑대 #31", "송파 까치 #75", "인천 수리 #19"];
const reAc2 = ["광화문 판다 #34", "분당 올빼미 #48", "강남 재규어 #23", "여의도 독수리 #70"];
const reA1 = [
  "86주는 매매 최장 기록입니다. 한 주 0.09%와 나란히 두겠습니다.",
  "오름폭이 다섯 주 연속 줄었습니다. 기록과 속도를 나누겠습니다.",
  "오늘 국감은 공급 대책이 착공으로 내려오는지 봅니다.",
  "최소보장 3분의 1은 11월 13일부터입니다.",
];
const reA2 = [
  "전셋값도 86주입니다. 올해 누적 8.18%입니다.",
  "15억 원 이하 거래 약 79%가 같은 달의 옆자리입니다.",
  "한국토지주택공사 부채가 공급 일정 질의입니다.",
  "예산 840억 원, 누적 피해자 4만 936명입니다.",
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
    at: `2026-10-07T0${i}:${hourTag}:00.000Z`,
  }));
}

KR.forEach((r, i) => (r.wid = 9580 + i));
SAFE.forEach((r, i) => (r.wid = 9590 + i));
KR_RE.forEach((r, i) => (r.wid = 9600 + i));

const krAn = decorate(KR, krNick, krHold, krC1n, krC2n, krAlias, krAc1, krAc2, krA1, krA2, -2520, "10");
const safeAn = decorate(SAFE, safeNick, safeHold, safeC1n, safeC2n, safeAlias, safeAc1, safeAc2, safeA1, safeA2, -2526, "20");
const reAn = decorate(KR_RE, reNick, reHold, reC1n, reC2n, reAlias, reAc1, reAc2, reA1, reA2, -2532, "30");

insertReports("lib/reports-kr.ts", "kr-seed-270", KR);
insertReports("lib/reports-safe.ts", "safe-seed-245", SAFE);
insertReports("lib/reports-kr-re.ts", "krre-seed-214", KR_RE);

let w = read("lib/wallPosts-markets.ts");
if (!w.includes("const T07OCT")) {
  w = w.replace(
    "const T06OCT = 1791241200000; // 2026-10-06 08:00 KST",
    "const T07OCT = 1791327600000; // 2026-10-07 08:00 KST\nconst T06OCT = 1791241200000; // 2026-10-06 08:00 KST",
  );
}
if (!w.includes("id: 9580")) {
  w = w.replace("export const MOCK_POSTS_KR: Post[] = [\n", "export const MOCK_POSTS_KR: Post[] = [\n" + wallBlock(krAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n" + wallComments(krAn) + "\n");
}
if (!w.includes("id: 9590")) {
  w = w.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", "export const MOCK_POSTS_SAFE: Post[] = [\n" + wallBlock(safeAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n" + wallComments(safeAn) + "\n");
}
if (!w.includes("id: 9600")) {
  w = w.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", "export const MOCK_POSTS_KR_RE: Post[] = [\n" + wallBlock(reAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n" + wallComments(reAn) + "\n");
}
write("lib/wallPosts-markets.ts", w);
console.log("wall markets inserted");

let a = read("lib/analystPosts-markets.ts");
if (!a.includes("id: -2520")) {
  a = a.replace(
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n",
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n  // ── 2026-10-07 KR ──────────────────────\n" + analystPosts(krAn) + "\n",
  );
  a = a.replace(
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n",
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n  // ── 2026-10-07 KR 댓글 ──────────────────────\n" + analystComments(krAn) + "\n",
  );
  a = a.replace(
    "  // ── 2026-10-06 SAFE ──────────────────────\n",
    "  // ── 2026-10-07 SAFE ──────────────────────\n" + analystPosts(safeAn) + "\n  // ── 2026-10-06 SAFE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-06 SAFE 댓글 ──────────────────────\n",
    "  // ── 2026-10-07 SAFE 댓글 ──────────────────────\n" + analystComments(safeAn) + "\n  // ── 2026-10-06 SAFE 댓글 ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-06 KR-RE ──────────────────────\n",
    "  // ── 2026-10-07 KR-RE ──────────────────────\n" + analystPosts(reAn) + "\n  // ── 2026-10-06 KR-RE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-06 KR-RE 댓글 ──────────────────────\n",
    "  // ── 2026-10-07 KR-RE 댓글 ──────────────────────\n" + analystComments(reAn) + "\n  // ── 2026-10-06 KR-RE 댓글 ──────────────────────\n",
  );
  write("lib/analystPosts-markets.ts", a);
  console.log("analyst markets inserted");
} else {
  console.log("analyst markets already");
}
