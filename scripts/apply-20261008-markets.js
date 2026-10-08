#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20261008-markets");

const ROOT = path.join(__dirname, "..");
const DATE = "2026-10-08";
const UPDATED = "2026.10.08 08:40";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20261008";
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
        `  { id: ${r.wid}, symbol: ${JSON.stringify(r.subject)}, nickname: ${JSON.stringify(r.nick)}, holdingLabel: ${JSON.stringify(r.hold)}, content: ${JSON.stringify(r.wall)}, createdAt: T08OCT - ${i * 1800000}, likes: ${40 - i}, comments: 2, },`,
    )
    .join("\n");
}

function wallComments(rows) {
  return rows
    .map(
      (r) => `  ${r.wid}: [
    { id: 1, nickname: ${JSON.stringify(r.c1n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c1)}, createdAt: T08OCT + 600000, likes: 4 },
    { id: 2, nickname: ${JSON.stringify(r.c2n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c2)}, createdAt: T08OCT + 1200000, likes: 3 },
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

const krNick = ["육천팔백삼", "이십육만팔천", "백칠십이만삼", "엘지십퍼", "코스닥팔구팔", "외인이조육천"];
const krHold = ["인덱스", "삼성 보유", "하이닉스 보유", "LG전자 관심", "코스닥 관심", "관망"];
const krC1n = ["개인이조오천", "잠정오늘", "장중일칠칠", "영업칠팔일팔", "주성십일", "기관육천칠"];
const krC2n = ["외국인이조육", "장중이칠구", "이틀약세", "일조기대", "삼전전기사", "전기전자창구"];
const krAlias = ["여의도 학 #30", "성수 갈매기 #33", "판교 독수리 #76", "삼성동 치타 #54", "잠실 여우 #48", "역삼 수리 #85"];
const krAc1 = ["마포 너구리 #34", "한남 백로 #61", "종로 판다 #24", "광화문 늑대 #42", "분당 까치 #67", "인천 올빼미 #21"];
const krAc2 = ["송파 매 #79", "압구정 고래 #26", "청담 살쾡이 #50", "해운대 재규어 #63", "강남 학 #32", "서초 치타 #57"];
const krA1 = [
  "6,803.90은 수요일 종가입니다. 오늘 시초가가 다음입니다.",
  "26만 8,500원은 종가입니다. 오늘 잠정과 나란히 두겠습니다.",
  "172만 3,000원은 종가입니다. 장중 177만 9,000원과 나누겠습니다.",
  "영업이익 7,818억 원은 공시입니다. 1조 기대와 나란히 두겠습니다.",
  "코스닥 898.43은 2.34% 하락 종가입니다.",
  "외국인 2조 6,087억 원 순매도가 하루 수급입니다.",
];
const krA2 = [
  "개인 2조 5,611억 원 순매수가 하단을 받았습니다.",
  "장중 27만 9,500원을 반납한 뒤 잠정으로 갑니다.",
  "이틀 연속 약세와 자사주 종료 임박을 같이 보겠습니다.",
  "LG이노텍·LG 동반 하락은 계열 파급입니다.",
  "주성 11.13%는 장비 차익 실현 칸입니다.",
  "기관 6,727억 원 순매도도 같은 표에 둡니다.",
];

const safeNick = ["요약팔만삼천", "비트팔만삼", "금사천일백", "달러백이점오", "십년오점삼오", "브렌트백"];
const safeHold = ["관심", "BTC 보유", "금 보유", "관망", "금리 관심", "원유 관심"];
const safeC1n = ["팔만이천벽", "이티에프들쭉", "지지시험", "십팔개월고", "이천이년후", "호르무즈"];
const safeC2n = ["의사록다음", "팔만지지", "달리오비중", "금리같이", "모기지칠육", "백달러복귀"];
const safeAlias = ["은빛 학 #29", "청산 치타 #55", "원유 까치 #40", "달러 늑대 #51", "금리 백로 #64", "국채 학 #77"];
const safeAc1 = ["노량진 갈매기 #22", "마곡 여우 #46", "송도 수리 #74", "일산 올빼미 #27", "분당 재규어 #35", "노원 치타 #21"];
const safeAc2 = ["강남 너구리 #60", "여의도 판다 #31", "잠실 독수리 #68", "성수 매 #43", "판교 고래 #20", "목동 여우 #54"];
const safeA1 = [
  "8만 3천 달러 부근과 금 4,100달러를 같은 표에 둡니다.",
  "8만 7,200달러 실패와 ETF 유출입을 나누겠습니다.",
  "4,100달러는 지지 시험입니다. 달리오 장기 비중과 나란히 둡니다.",
  "102.50은 18개월 고점 부근입니다.",
  "5.35%는 2002년 4월 이후 최고 부근입니다.",
  "브렌트 100달러는 호르무즈 프리미엄입니다.",
];
const safeA2 = [
  "FOMC 의사록이 다음 촉매입니다.",
  "10월 5일 유출·6일 유입은 하루 단위입니다.",
  "금 10~15% 논리는 장기 포트 이야기입니다.",
  "달러 강세와 비트·금을 한 속도로만 보지 않겠습니다.",
  "30년 5.7%·모기지 7.63%를 10년과 평균 내지 않겠습니다.",
  "통항 정상화가 다음 확인입니다.",
];

const reNick = ["전세팔십육주", "십오억팔십", "서울육십구", "중랑십건"];
const reHold = ["관심", "전세 관심", "매매 관심", "실거래 관심"];
const reC1n = ["팔십육주전세", "육억이십오", "평균구억", "도봉팔건"];
const reC2n = ["매매전환고민", "초고가축소", "월초누적", "강남이년"];
const reAlias = ["전세 학 #44", "갱신 치타 #27", "동북 여우 #65", "실거래 갈매기 #41"];
const reAc1 = ["마포 백로 #58", "성수 늑대 #32", "송파 까치 #76", "인천 수리 #20"];
const reAc2 = ["광화문 판다 #35", "분당 올빼미 #49", "강남 재규어 #24", "여의도 독수리 #71"];
const reA1 = [
  "86주는 전세 연속 상승입니다. 매매 주수와 나란히 두지 않겠습니다.",
  "15억 원 이하 약 80%는 대출 한도 구간입니다.",
  "10월 69건은 월초 누적입니다.",
  "중랑 10건·도봉 8건이 거래량 상위입니다.",
];
const reA2 = [
  "전세가율 중위 52.2%는 같은 달의 옆자리입니다.",
  "6억 원 이하 비중 25%를 초고가 축소와 나누겠습니다.",
  "평균 9억 1,792만 원과 중앙값을 섞지 않겠습니다.",
  "강남 2건 평균 27억은 외곽 거래와 칸을 나눕니다.",
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
    at: `2026-10-08T0${i}:${hourTag}:00.000Z`,
  }));
}

KR.forEach((r, i) => (r.wid = 9604 + i));
SAFE.forEach((r, i) => (r.wid = 9610 + i));
KR_RE.forEach((r, i) => (r.wid = 9616 + i));

const krAn = decorate(KR, krNick, krHold, krC1n, krC2n, krAlias, krAc1, krAc2, krA1, krA2, -2536, "10");
const safeAn = decorate(SAFE, safeNick, safeHold, safeC1n, safeC2n, safeAlias, safeAc1, safeAc2, safeA1, safeA2, -2542, "20");
const reAn = decorate(KR_RE, reNick, reHold, reC1n, reC2n, reAlias, reAc1, reAc2, reA1, reA2, -2548, "30");

insertReports("lib/reports-kr.ts", "kr-seed-276", KR);
insertReports("lib/reports-safe.ts", "safe-seed-251", SAFE);
insertReports("lib/reports-kr-re.ts", "krre-seed-218", KR_RE);

let w = read("lib/wallPosts-markets.ts");
if (!w.includes("const T08OCT")) {
  w = w.replace(
    "const T07OCT = 1791327600000; // 2026-10-07 08:00 KST",
    "const T08OCT = 1791414000000; // 2026-10-08 08:00 KST\nconst T07OCT = 1791327600000; // 2026-10-07 08:00 KST",
  );
}
if (!w.includes("id: 9604")) {
  w = w.replace("export const MOCK_POSTS_KR: Post[] = [\n", "export const MOCK_POSTS_KR: Post[] = [\n" + wallBlock(krAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n" + wallComments(krAn) + "\n");
}
if (!w.includes("id: 9610")) {
  w = w.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", "export const MOCK_POSTS_SAFE: Post[] = [\n" + wallBlock(safeAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n" + wallComments(safeAn) + "\n");
}
if (!w.includes("id: 9616")) {
  w = w.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", "export const MOCK_POSTS_KR_RE: Post[] = [\n" + wallBlock(reAn) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n" + wallComments(reAn) + "\n");
}
write("lib/wallPosts-markets.ts", w);
console.log("wall markets inserted");

let a = read("lib/analystPosts-markets.ts");
if (!a.includes("id: -2536")) {
  a = a.replace(
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n",
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n  // ── 2026-10-08 KR ──────────────────────\n" + analystPosts(krAn) + "\n",
  );
  a = a.replace(
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n",
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n  // ── 2026-10-08 KR 댓글 ──────────────────────\n" + analystComments(krAn) + "\n",
  );
  a = a.replace(
    "  // ── 2026-10-07 SAFE ──────────────────────\n",
    "  // ── 2026-10-08 SAFE ──────────────────────\n" + analystPosts(safeAn) + "\n  // ── 2026-10-07 SAFE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-07 SAFE 댓글 ──────────────────────\n",
    "  // ── 2026-10-08 SAFE 댓글 ──────────────────────\n" + analystComments(safeAn) + "\n  // ── 2026-10-07 SAFE 댓글 ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-07 KR-RE ──────────────────────\n",
    "  // ── 2026-10-08 KR-RE ──────────────────────\n" + analystPosts(reAn) + "\n  // ── 2026-10-07 KR-RE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-10-07 KR-RE 댓글 ──────────────────────\n",
    "  // ── 2026-10-08 KR-RE 댓글 ──────────────────────\n" + analystComments(reAn) + "\n  // ── 2026-10-07 KR-RE 댓글 ──────────────────────\n",
  );
  write("lib/analystPosts-markets.ts", a);
  console.log("analyst markets inserted");
} else {
  console.log("analyst markets already");
}
