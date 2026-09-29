#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20260930-markets");

const ROOT = path.join(__dirname, "..");
const DATE = "2026-09-30";
const UPDATED = "2026.09.30 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20260930";
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
        `  { id: ${r.id}, symbol: ${JSON.stringify(r.symbol)}, nickname: ${JSON.stringify(r.nick)}, holdingLabel: ${JSON.stringify(r.hold)}, content: ${JSON.stringify(r.content)}, createdAt: T30SEP - ${i * 1800000}, likes: ${40 - i}, comments: 2, },`,
    )
    .join("\n");
}

function wallComments(rows) {
  return rows
    .map(
      (r) => `  ${r.id}: [
    { id: 1, nickname: ${JSON.stringify(r.c1n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c1)}, createdAt: T30SEP + 600000, likes: 4 },
    { id: 2, nickname: ${JSON.stringify(r.c2n)}, holdingLabel: "관심", content: ${JSON.stringify(r.c2)}, createdAt: T30SEP + 1200000, likes: 3 },
  ],`,
    )
    .join("\n");
}

function analystPosts(rows) {
  return rows
    .map(
      (r) => `  {
    id: ${r.aid}, alias: ${JSON.stringify(r.alias)}, symbol: ${JSON.stringify(r.symbol)},
    content: ${JSON.stringify(r.content)},
    likes: ${r.likes}, comments: 2, created_at: ${JSON.stringify(r.at)}, liked: false,
  },`,
    )
    .join("\n");
}

function analystComments(rows) {
  return rows
    .map(
      (r) => `  [${r.aid}]: [
    { alias: ${JSON.stringify(r.c1n)}, content: ${JSON.stringify(r.c1)}, created_at: ${JSON.stringify(r.at.replace(":00:00.000Z", ":06:00.000Z"))} },
    { alias: ${JSON.stringify(r.c2n)}, content: ${JSON.stringify(r.c2)}, created_at: ${JSON.stringify(r.at.replace(":00:00.000Z", ":12:00.000Z"))} },
  ],`,
    )
    .join("\n");
}

const krWall = [
  { id: 9460, symbol: "코스피", nick: "육천팔백칠십", hold: "인덱스", content: "어제 코스피 6870.81, 0.27% 하락. 외국인이 2조 9033억을 팔고 개인이 1조 1433억을 샀습니다.", c1n: "낙폭만회", c1: "장중 6782까지 갔다가 종가는 6870입니다.", c2n: "전기전자", c2: "외국인 매도의 대부분이 반도체 두 종목이었습니다." },
  { id: 9461, symbol: "삼성전자", nick: "이십칠만이천오백", hold: "삼성 보유", content: "배당락인데 272500으로 0.93% 올랐습니다. 266000에 열렸다가 276000까지 갔네요.", c1n: "권리소멸", c1: "배당 권리가 빠진 날인데 플러스입니다.", c2n: "유안타육십삼", c2: "목표 63만은 어제 종가랑 많이 벌어져 있습니다." },
  { id: 9462, symbol: "SK하이닉스", nick: "백칠십육만오천", hold: "하이닉스 보유", content: "176만 5천으로 마감, 장중엔 173만 6천까지 밀렸습니다. 외국인 1조 5564억 매도 1위.", c1n: "보합인데손바꿈", c1: "가격은 보합인데 거래대금이 시장 1위였습니다.", c2n: "아이엠삼백오십", c2: "목표 350만은 유지인데 어제는 수급이 먼저였습니다." },
  { id: 9463, symbol: "LG에너지솔루션", nick: "삼십오만이천오백", hold: "관심", content: "엔솔 352500, 3.16% 하락. 지수보다 더 빠졌고 어제 강세랑은 반대입니다.", c1n: "미래에셋오십일", c1: "목표 51만 매수는 그대로고 어제는 수급입니다.", c2n: "엔에이치사십팔", c2: "ESS 수주 메모랑 하루 하락을 한 칸에 안 둡니다." },
  { id: 9464, symbol: "현대차", nick: "현대일점이칠", hold: "관심", content: "현대차 1.27% 하락. 삼성 배당락 반랑이랑 다른 줄입니다.", c1n: "매수유지", c1: "삼성증권 목표 50만은 낮췄지만 매수는 남겼습니다.", c2n: "파업대수", c2: "3분기 차질 대수랑 하루 등락은 다른 표입니다." },
  { id: 9465, symbol: "삼성전기", nick: "백오십이만팔천", hold: "관심", content: "삼성전기 152만 8천, 1.93% 상승. 서버 부품 2900억 계약이 붙었습니다.", c1n: "리드타임", c1: "기판 납기가 48주라는 메모가 계약이랑 따로입니다.", c2n: "하나삼백만", c2: "목표 300만은 수주 금액이랑 단위가 다릅니다." },
];

const safeWall = [
  { id: 9470, symbol: "한장요약", nick: "팔만삼천육백", hold: "관망", content: "비트 83607, 금 현물 4163 반등, 은 61.05, 유가 92.60. 선물 급락이랑 현물을 섞지 마세요.", c1n: "시계다름", c1: "포춘 시각이랑 다른 기사 시각이 조금 다릅니다.", c2n: "해협", c2: "유가 90 위가 금리 기대를 키운 밤입니다." },
  { id: 9471, symbol: "비트코인", nick: "비트팔만삼육", hold: "BTC 보유", content: "83607달러, 전일 꼭지보다 538달러. 주말 8.5만은 되돌렸습니다.", c1n: "시총", c1: "1.33조 달러는 그 시각 표입니다.", c2n: "배분", c2: "현물 펀드 장기 배분이랑 하루 등락은 시계가 다릅니다." },
  { id: 9472, symbol: "금", nick: "금사천일육삼", hold: "금 보유", content: "현물 4162.84, 하루 1.14% 반등. 은은 61달러에서 거의 멈춤.", c1n: "이십톤", c1: "8월 중국 20.2톤은 월간이지 화요일 47달러의 원인은 아닙니다.", c2n: "선물따로", c2: "선물 큰 하락 숫자랑 현물 반등은 다른 표입니다." },
  { id: 9473, symbol: "이더리움", nick: "이더이육구삼", hold: "관심", content: "이더 2694달러 전후. 다른 시각은 2698, 1.8%로 적혔습니다.", c1n: "업글아님", c1: "재료는 금리·유가 쪽이고 이더 업그레이드는 아닙니다.", c2n: "이십사달러", c1: "하루 24달러로 수수료 전망을 확인하진 못합니다." },
  { id: 9474, symbol: "은", nick: "은육십일공오", hold: "관심", content: "은 현물 61.05, 금보다 조용. 선물 표 60.65랑 평균 내지 마세요.", c1n: "비율", c1: "금은 비율 68은 금이 반등을 맡은 날입니다.", c2n: "산업", c2: "태양광 수요가 약하면 은이 금을 덜 따라갑니다." },
  { id: 9475, symbol: "원유", nick: "유가구십이", hold: "관심", content: "WTI 92.60달러. 해협 협상은 더디고 우회 관은 하루 350만 배럴 보도.", c1n: "가스따로", c1: "천연가스 3달러 하락이랑 원유를 한 등락으로 안 봅니다.", c2n: "프리미엄", c2: "우회 물량이 늘면 90달러대 프리미엄은 얇아집니다." },
];

const reWall = [
  { id: 9480, symbol: "한장요약", nick: "계양이백오십일", hold: "관심", content: "오늘부터 계양 일반 접수. 이번 모집 251, 일반 38. 광명은 426가구.", c1n: "육백육십삼", c1: "663은 공급 규모고 오늘 용지는 251입니다.", c2n: "발표둘", c2: "광명 10월 12일, 계양 10월 21일입니다." },
  { id: 9481, symbol: "공급정책", nick: "일반서른여덟", hold: "관심", content: "계양 특별 213, 일반 38. 당첨자 접수는 17~18일에 이미 끝났습니다.", c1n: "사흘", c1: "오늘부터 10월 2일까지입니다.", c2n: "이십일일", c2: "경쟁률은 10월 21일에 나옵니다." },
  { id: 9482, symbol: "공급정책", nick: "광명사백이십육", hold: "관심", content: "광명 에듀하임 426, 일반 190 특별 236. 발표는 10월 12일.", c1n: "특별더많음", c1: "일반 경쟁률만 보면 236가구가 빠집니다.", c2n: "계양이랑다름", c2: "공공 본청약이랑 자격 규칙이 다릅니다." },
  { id: 9483, symbol: "공급정책", nick: "구백삼십오밖", hold: "관심", content: "지방 8건 935가구 합계에는 계양이 없습니다. 진주는 29일 칸.", c1n: "두번셈", c1: "935에 251을 더하면 공공이 두 번입니다.", c2n: "지역제한", c2: "전국 합을 경쟁률처럼 읽지 않습니다." },
];

// fix typo c1 on safe wall eth - I used c1 twice. Fix in array... I'll patch below if the object has c1 overwritten.
safeWall[3].c2 = "하루 24달러로 수수료 전망을 확인하진 못합니다.";

const krAn = KR.map((r, i) => ({
  aid: -2457 - i,
  alias: ["여의도 수리 #41", "성수 너구리 #26", "판교 치타 #34", "삼성동 여우 #20", "잠실 백로 #37", "역삼 판다 #91"][i],
  symbol: r.subject,
  content: r.summary,
  likes: 22 - i,
  at: `2026-09-30T0${i}:10:00.000Z`,
  c1n: "마감확인",
  c2n: "하우스따로",
  c1: r.title,
  c2: i === 0 ? "외국인 2조 9천억과 삼성 배당락 반등을 한 표에 둡니다." : "목표주가와 어제 등락은 다른 칸입니다.",
}));
const safeAn = SAFE.map((r, i) => ({
  aid: -2463 - i,
  alias: ["은빛 갈매기 #17", "알트 수달 #33", "청산 올빼미 #19", "달러 여우 #12", "원유 학 #08", "금 백로 #21"][i],
  symbol: r.subject,
  content: r.summary,
  likes: 18 - i,
  at: `2026-09-30T0${i}:20:00.000Z`,
  c1n: "시각확인",
  c2n: "표나누기",
  c1: r.title,
  c2: "현물과 선물, 하루 가격과 장기 배분을 섞지 않겠습니다.",
}));
const reAn = KR_RE.map((r, i) => ({
  aid: -2469 - i,
  alias: ["전세 참새 #14", "갱신 백로 #45", "동북 학 #28", "정책 너구리 #31"][i],
  symbol: r.subject,
  content: r.summary,
  likes: 16 - i,
  at: `2026-09-30T0${i}:30:00.000Z`,
  c1n: "가구확인",
  c2n: "발표일",
  c1: r.title,
  c2: "663과 251, 광명 426을 한 경쟁률로 평균 내지 않겠습니다.",
}));

insertReports("lib/reports-kr.ts", "kr-seed-246", KR);
insertReports("lib/reports-safe.ts", "safe-seed-224", SAFE);
insertReports("lib/reports-kr-re.ts", "krre-seed-198", KR_RE);

let w = read("lib/wallPosts-markets.ts");
if (!w.includes("const T30SEP")) {
  w = w.replace(
    "const T29SEP = 1790636400000; // 2026-09-29 08:00 KST",
    "const T30SEP = 1790722800000; // 2026-09-30 08:00 KST\nconst T29SEP = 1790636400000; // 2026-09-29 08:00 KST",
  );
}
if (!w.includes("id: 9460")) {
  w = w.replace("export const MOCK_POSTS_KR: Post[] = [\n", "export const MOCK_POSTS_KR: Post[] = [\n" + wallBlock(krWall) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n" + wallComments(krWall) + "\n");
}
if (!w.includes("id: 9470")) {
  w = w.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", "export const MOCK_POSTS_SAFE: Post[] = [\n" + wallBlock(safeWall) + "\n");
  w = w.replace("export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n" + wallComments(safeWall) + "\n");
}
if (!w.includes("id: 9480")) {
  w = w.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", "export const MOCK_POSTS_KR_RE: Post[] = [\n" + wallBlock(reWall) + "\n");
  w = w.replace("export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n", "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n" + wallComments(reWall) + "\n");
}
write("lib/wallPosts-markets.ts", w);
console.log("wall markets inserted");

let a = read("lib/analystPosts-markets.ts");
if (!a.includes("id: -2457")) {
  a = a.replace(
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n",
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n  // ── 2026-09-30 KR ──────────────────────\n" + analystPosts(krAn) + "\n",
  );
  a = a.replace(
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n",
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n  // ── 2026-09-30 KR 댓글 ──────────────────────\n" + analystComments(krAn) + "\n",
  );
  a = a.replace(
    "  // ── 2026-09-29 SAFE ──────────────────────\n",
    "  // ── 2026-09-30 SAFE ──────────────────────\n" + analystPosts(safeAn) + "\n  // ── 2026-09-29 SAFE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-09-29 SAFE 댓글 ──────────────────────\n",
    "  // ── 2026-09-30 SAFE 댓글 ──────────────────────\n" + analystComments(safeAn) + "\n  // ── 2026-09-29 SAFE 댓글 ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-09-29 KR-RE ──────────────────────\n",
    "  // ── 2026-09-30 KR-RE ──────────────────────\n" + analystPosts(reAn) + "\n  // ── 2026-09-29 KR-RE ──────────────────────\n",
  );
  a = a.replace(
    "  // ── 2026-09-29 KR-RE 댓글 ──────────────────────\n",
    "  // ── 2026-09-30 KR-RE 댓글 ──────────────────────\n" + analystComments(reAn) + "\n  // ── 2026-09-29 KR-RE 댓글 ──────────────────────\n",
  );
  write("lib/analystPosts-markets.ts", a);
  console.log("analyst markets inserted");
} else {
  console.log("analyst markets already");
}
