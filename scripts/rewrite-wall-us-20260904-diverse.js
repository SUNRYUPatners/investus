#!/usr/bin/env node
/**
 * 9/4 미국 종토방 — 템플릿·시장 혼선(종부세/KB/LG엔솔) 제거.
 * 리포트 24개 1:1 복붙 대신 주제 커버 8개 + 글마다 다른 댓글.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const POSTS_BLOCK = `  // ── 2026-09-04 신규 ────────────────
  { id: 1210, symbol: "TSLA", nickname: "로보택시덕후", holdingLabel: "테슬라 일부",
    content: "어제 오스틴 행사 끝나고 376달러까지 뛰었는데, 나는 주가보다 앱에 뜬 4.20달러 요금이 더 궁금해요. 프로모션인지 기준 요금인지만 알면 논쟁이 달라지거든요",
    createdAt: T04SEP + 8*60_000, likes: 14, comments: 2 },
  { id: 1211, symbol: "TSLA", nickname: "전비체크러", holdingLabel: "관심종목",
    content: "전비 165와트시/마일이 루시드·모델3보다 낮다는데… 슬라이드 숫자라 실도로 나오면 또 달라질 수도 있음. 일단 적어만 둘게요",
    createdAt: T04SEP + 16*60_000, likes: 11, comments: 1 },
  { id: 1212, symbol: "TSLA", nickname: "텍사스플릿", holdingLabel: "테슬라 보유",
    content: "420대 중에 무인 인가가 45대뿐이면 아직 ‘플릿 대량’ 말은 과한 거 아님? 감독자 있는 차랑 따로 세야 할 듯",
    createdAt: T04SEP + 24*60_000, likes: 16, comments: 2 },
  { id: 1213, symbol: "TSLA", nickname: "원가회의론", holdingLabel: "관망",
    content: "마일당 20센트 운용비는 예쁘긴 한데 보험·유휴 넣으면 30~40센트 이야기 나오잖아요. 지금 단가로 밸류 확정은 이릅니다",
    createdAt: T04SEP + 32*60_000, likes: 12, comments: 1 },
  { id: 1214, symbol: "UBER", nickname: "런던라이드", holdingLabel: "우버 관심",
    content: "런던 우버·웨이브가 넓어졌대도 운전석에 사람 앉으면 웨이모랑은 단계가 다름. ‘자율’ 단어만으로 테슬라랑 직접 비교하진 말자",
    createdAt: T04SEP + 40*60_000, likes: 13, comments: 2 },
  { id: 1215, symbol: "NVDA", nickname: "공시읽는사람", holdingLabel: "엔비디아 보유",
    content: "허깅페이스 인수 공시 숫자만 보면 주주 쪽 119억+잔류 보상 최대 10억으로 합쳐 약 129억. 공시라서 최소한 규모는 확실함",
    createdAt: T04SEP + 48*60_000, likes: 15, comments: 2 },
  { id: 1216, symbol: "SPCX", nickname: "비상장호가러", holdingLabel: "관심종목",
    content: "스페이스X 호가 150달러·시총 2조 달러 이야기 도는데, 비상장은 호가창이 얇을 수 있어서 헤드라인만 믿진 않을게요. 전력 1.4GW 쪽이 더 와닿음",
    createdAt: T04SEP + 56*60_000, likes: 10, comments: 1 },
  { id: 1217, symbol: "SPCX", nickname: "미확인필터", holdingLabel: "관망",
    content: "루이지애나 메탄 설비 100억 달러 제안요청서? 아직 확인 안 된 거면 워치리스트만. 스타십 42호기 극저온은 그래도 시험 단계라 따로 봄",
    createdAt: T04SEP + 64*60_000, likes: 12, comments: 2 },
`;

const COMMENTS_BLOCK = `  // ── 2026-09-04 신규 댓글 ────────────────
  1210: [
    { id: 1, nickname: "요금표러", holdingLabel: "관심종목", content: "4.20이 고정이면 단가 논쟁 게임이 바뀌죠. 앱 캡처 더 있으면 공유해주세요", createdAt: T04SEP + 8*60_000 + 3*60_000, likes: 5 },
    { id: 2, nickname: "행사후폭풍", holdingLabel: "테슬라 관심", content: "+5%는 분위기 반영 커 보여요. 나는 무인 인가 대수부터 주간으로 남길래요", createdAt: T04SEP + 8*60_000 + 6*60_000, likes: 4 },
  ],
  1211: [
    { id: 1, nickname: "배터리스펙", holdingLabel: "관심종목", content: "비교군 속도·적재 조건이 같아야 전비 비교가 의미가 있어요", createdAt: T04SEP + 16*60_000 + 3*60_000, likes: 4 },
  ],
  1212: [
    { id: 1, nickname: "인가트래커", holdingLabel: "관심종목", content: "45/420이면 비율이 얇음. 다음 주 인가 증가분만 따로 볼게요", createdAt: T04SEP + 24*60_000 + 3*60_000, likes: 6 },
    { id: 2, nickname: "보험궁금", holdingLabel: "관망", content: "감독자 유무가 보험료에 바로 붙을 텐데… 그 숫자도 나오면 좋겠다", createdAt: T04SEP + 24*60_000 + 6*60_000, likes: 3 },
  ],
  1213: [
    { id: 1, nickname: "버스비교러", holdingLabel: "관심종목", content: "버스 1달러/마일이랑 비교는 설득력 있는데 유휴률이 관건이죠", createdAt: T04SEP + 32*60_000 + 3*60_000, likes: 4 },
  ],
  1214: [
    { id: 1, nickname: "안전드라이버", holdingLabel: "우버 관심", content: "안전 드라이버 단계면 마케팅 ‘자율’이랑 현실이 갈려요", createdAt: T04SEP + 40*60_000 + 3*60_000, likes: 5 },
    { id: 2, nickname: "플랫폼vsOEM", holdingLabel: "관심종목", content: "우버가 기사 쪽이랑 속도 늦춘다는 보도랑 같은 주에 겹친 게 포인트", createdAt: T04SEP + 40*60_000 + 6*60_000, likes: 4 },
  ],
  1215: [
    { id: 1, nickname: "공시조항러", holdingLabel: "엔비디아 보유", content: "현금이랑 잔류 보상 비중이 어떻게 나뉘는지 조항 한 번 더 볼게요", createdAt: T04SEP + 48*60_000 + 3*60_000, likes: 5 },
    { id: 2, nickname: "오픈소스덕후", holdingLabel: "관심종목", content: "허깅페이스면 소프트웨어 스택 강화 신호로 읽는 중. 하드웨어만의 싸움은 아님", createdAt: T04SEP + 48*60_000 + 6*60_000, likes: 4 },
  ],
  1216: [
    { id: 1, nickname: "전력병목", holdingLabel: "관심종목", content: "1.4GW → 연말 2GW+ 이야기면 칩보다 전원이 먼저 막힐 수도", createdAt: T04SEP + 56*60_000 + 3*60_000, likes: 5 },
  ],
  1217: [
    { id: 1, nickname: "루머필터", holdingLabel: "관망", content: "미확인 100억은 패스. 극저온 시험 통과 여부만 체크리스트에 넣을래요", createdAt: T04SEP + 64*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "스타십팔로워", holdingLabel: "관심종목", content: "42호기 vs 41호기 어디가 다른지 시험 항목만 정리해두면 좋겠어요", createdAt: T04SEP + 64*60_000 + 6*60_000, likes: 3 },
  ],
`;

function main() {
  const wallPath = path.join(ROOT, "lib/wallPosts.ts");
  let c = fs.readFileSync(wallPath, "utf8");

  const pStart = c.indexOf("  // ── 2026-09-04 신규 ────────────────");
  const pEnd = c.indexOf("  // ── 2026-09-03 신규 ────────────────");
  if (pStart === -1 || pEnd === -1) throw new Error("wall posts markers missing");
  c = c.slice(0, pStart) + POSTS_BLOCK + c.slice(pEnd);

  const cStart = c.indexOf("  // ── 2026-09-04 신규 댓글 ────────────────");
  const cEnd = c.indexOf("  // ── 2026-09-03 신규 댓글 ────────────────");
  if (cStart === -1 || cEnd === -1) throw new Error("wall comments markers missing");
  c = c.slice(0, cStart) + COMMENTS_BLOCK + c.slice(cEnd);

  fs.writeFileSync(wallPath, c);
  console.log("✓ lib/wallPosts.ts 9/4 posts 8개 + comments (US-only)");

  // disable bad templates in apply script
  const applyPath = path.join(ROOT, "scripts/apply-20260904.js");
  let a = fs.readFileSync(applyPath, "utf8");
  a = a.replace(
    /function patchWallUs\(\) \{[\s\S]*?^\}/m,
    `function patchWallUs() {
  // 템플릿·교차시장 댓글 금지 — rewrite-wall-us-20260904-diverse.js / 수동 작성
  console.log("patchWallUs: skipped (use rewrite-wall-us-20260904-diverse.js)");
}`,
  );
  a = a.replace(
    /function uniqueWallComment\(i, k\) \{[\s\S]*?^\}/m,
    `function uniqueWallComment(i, k) {
  throw new Error("uniqueWallComment disabled — never mix KR/Safe/KR-RE phrases into US wall");
}`,
  );
  fs.writeFileSync(applyPath, a);
  console.log("✓ apply-20260904.js wall templates disabled");
}

main();
