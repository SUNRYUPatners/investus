#!/usr/bin/env node
/**
 * Fix the wallPosts migration - properly handle multi-line post blocks
 */

const fs = require("fs");
const path = require("path");

const LIB = path.join(__dirname, "../lib");
const WALL_US  = path.join(LIB, "wallPosts.ts");
const WALL_MKT = path.join(LIB, "wallPosts-markets.ts");

const WALL_KR_IDS   = new Set([122272, 122273, 122274, 122275, 122276, 122277, 122302, 122303]);
const WALL_SAFE_IDS = new Set([122278, 122279, 122280, 122281, 122282, 122283,
                                122284, 122285, 122286, 122287, 122288, 122289,
                                122304, 122305, 122306, 122307]);
const ALL_IDS = new Set([...WALL_KR_IDS, ...WALL_SAFE_IDS]);

// ── Extract multi-line post blocks ─────────────────────────────────────────
function extractPostBlocks(content, idSet) {
  const lines = content.split("\n");
  const blocks = {};

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s+\{\s*id:\s*(\d+),/);
    if (!m) continue;
    const id = parseInt(m[1]);
    if (!idSet.has(id)) continue;

    // Find closing line: ends with "},"
    let end = i;
    // The closing line ends with `}, ` or `},`
    for (let j = i; j < lines.length; j++) {
      if (lines[j].trimEnd().endsWith("},")) { end = j; break; }
    }
    blocks[id] = { lines: lines.slice(i, end + 1), start: i, end };
  }
  return blocks;
}

// Read original wallPosts.ts - we need to reconstruct it from scratch
// because the previous migration partially broke it

// First, let me check if we need to re-read the original or if we can fix in place
// The issue: wallPosts.ts has orphaned content/createdAt lines after partial removal
// AND wallPosts-markets.ts has only partial (first-line-only) posts inserted

// STRATEGY:
// 1. Find and collect full post blocks FROM wallPosts-markets.ts (the partial ones are there)
//    Actually those partial ones won't parse right. Let me re-read from the original wallPosts.ts
//    which still has the content/createdAt lines (just without the id: lines)

// Better strategy: reconstruct from the raw data we know

// Known posts to insert - full content extracted from the reading session
const KR_POSTS_CONTENT = [
  // Oct 13 KR posts
  { id: 122302, symbol: "코스피", nickname: "외국인십사일째", holdingLabel: "관심종목",
    content: "외국인 14일 연속 순매도에 누계 20.93조ㅠ 달러 102.21 미국채 5.24% 이 구조에서 외국인이 올 이유가 없잖아 내일 CPI만 보고 있음",
    createdAt: "T13OCT + 104*60_000", likes: 47, comments: 0 },
  { id: 122303, symbol: "삼성전자", nickname: "삼성수급망가짐", holdingLabel: "보유중",
    content: "250500원인데 자사주 매입도 끝났고 외국인 계속 팔고 기관도 역부족이고 3분기 역대 실적 발표해도 주가가 이 꼴이면 뭘 더 기다려야 함",
    createdAt: "T13OCT + 112*60_000", likes: 55, comments: 0 },
  // Oct 12 KR posts
  { id: 122272, symbol: "코스피", nickname: "외인탈출열차", holdingLabel: "관심종목",
    content: "코스피 241포인트 빠졌어. 6,400선 아래가 두 달 만이야. 외국인이 2조 200억 팔았는데 10월 들어서 누계가 10조 원 넘었어. 삼성 역대최대 실적 발표날에 -4.4%라니. 자사주 매입 끝나고 받쳐줄 주체가 없어진 거 그대로 보여주는 날이었음",
    createdAt: "T12OCT + 242*60_000", likes: 44, comments: 0 },
  { id: 122273, symbol: "코스피", nickname: "반도체수급론자", holdingLabel: "관심종목",
    content: "삼성이랑 SK하이닉스가 둘 다 4%씩 빠졌는데 이 두 종목이 코스피 시총 30% 임. 그래서 지수 낙폭이 이렇게 크게 나온 거야. HBM 실적은 좋은데 4분기 메모리 단가 방향이랑 중국 규제 추가 변수가 아직 불확실함. 단기 수급이 이걸 압도하는 중",
    createdAt: "T12OCT + 248*60_000", likes: 37, comments: 0 },
  { id: 122274, symbol: "코스피", nickname: "미래에셋따라가기", holdingLabel: "관심종목",
    content: "미래에셋이 6,200선 테스트 가능성 말했는데 환율이랑 외국인 복귀가 관건이래. 연말 목표 6,800은 유지함. KB증권은 반도체 밸류에이션이 역사적 저점이라고 중장기 매수 관점이래. 단기는 흔들려도 긴 호흡으로 보는 사람들은 이 가격 반김",
    createdAt: "T12OCT + 254*60_000", likes: 31, comments: 0 },
  { id: 122275, symbol: "삼성전자", nickname: "107조쇼크", holdingLabel: "관심종목",
    content: "이게 진짜 신기한 상황임. 분기 영업이익 역대최대 107.4조 발표했는데 주가는 -4.4%. 시장이 기대를 이미 다 반영한 거라는 뜻이잖아. 발표 전에 기대로 오른 만큼 발표 당일 차익실현 나온 거. 근데 외국인 10일째 팔고 있다는 게 더 문제야",
    createdAt: "T12OCT + 260*60_000", likes: 52, comments: 0 },
  { id: 122276, symbol: "삼성전자", nickname: "반도체일곱할", holdingLabel: "장투중",
    content: "3Q 영업이익 107.4조 중에 반도체가 70%인 74.98조 추정. HBM 수요 강세에 낸드 가격 반등까지 겹쳤어. 근데 4분기 이후 메모리 단가 어디로 가냐가 진짜 변수야. AI 메모리 수요는 탄탄한데 범용 메모리는 어떻게 될지 모름",
    createdAt: "T12OCT + 266*60_000", likes: 41, comments: 0 },
  { id: 122277, symbol: "삼성전자", nickname: "자사주끝확인", holdingLabel: "관심종목",
    content: "자사주 매입 종료 후 하단 지지 주체가 사라진 거 이번에 확실하게 드러났어. 외국인이 그 공백을 파고 들어온 구조임. 미래에셋 목표주가 35만 원 유지. 수급 안정 시점이 반등 분기점이 될 텐데 환율 먼저 안정돼야 함",
    createdAt: "T12OCT + 272*60_000", likes: 35, comments: 0 },
];

const SAFE_POSTS_CONTENT = [
  // Oct 13 SAFE posts
  { id: 122304, symbol: "BTC", nickname: "CPI기다리는중", holdingLabel: "관심종목",
    content: "비트코인 82929달러 -0.70% 내일 CPI 앞두고 다들 눈치 보는 거잖아 물가 높으면 80000 밑으로 갈 수도 있고 둔화 확인 되면 85000 넘을 것 같은데",
    createdAt: "T13OCT + 120*60_000", likes: 41, comments: 0 },
  { id: 122305, symbol: "BTC", nickname: "현물ETF다섯주연속", holdingLabel: "장투중",
    content: "현물 ETF 5주 연속 순유입이면 기관이 전략적으로 쌓고 있는 거임. 83000 하단 지지 여기서 무너지면 기관도 흔들리는 거라 중요한 지지선임",
    createdAt: "T13OCT + 128*60_000", likes: 36, comments: 0 },
  { id: 122306, symbol: "SOL", nickname: "솔라나CPI촉매", holdingLabel: "매수고민",
    content: "SOL 110.80 ETH 2500 CPI 결과 나오면 솔라나가 제일 빨리 튀는 패턴 반복될 것 같음. 디파이 예치 자산이 이더리움 수준 근접했다는 데이터가 받쳐주는 거고",
    createdAt: "T13OCT + 136*60_000", likes: 33, comments: 0 },
  { id: 122307, symbol: "BTC", nickname: "아람코유가충격", holdingLabel: "관심종목",
    content: "사우디 아람코 재고 60억 배럴 이하 경고인데 유가 115 가면 인플레 재점화라 금리 인하 2027로 미뤄지는 시나리오 가동됨. 코인이고 주식이고 다 역풍",
    createdAt: "T13OCT + 144*60_000", likes: 28, comments: 0 },
  // Oct 12 SAFE posts
  { id: 122278, symbol: "미국채", nickname: "오백이사년만", holdingLabel: "관심종목",
    content: "미국채 10년이 5.24%야. 장중 5.34%까지 갔다가 내려온 건데 2002년 이후 24년 만 최고. 영국 30년도 6% 돌파했고. 이게 미국만의 문제가 아니라 글로벌 긴장임. 9월 CPI가 예상보다 높게 나온 게 직격탄이었어. 연내 금리 인하 기대를 2회에서 1회 이하로 낮추는 중",
    createdAt: "T12OCT + 278*60_000", likes: 48, comments: 0 },
  { id: 122279, symbol: "미국채", nickname: "달러일이이", holdingLabel: "관심종목",
    content: "달러 102.21인데 이 강세가 신흥국한테는 더 무거워. 달러 빌린 나라들 상환 부담 올라가고 미국 다국적 기업 해외 매출은 달러로 환산하면 줄어들고. 한국은 원화 약세로 외국인 원화 자산 매력이 떨어지는 간접 루트가 있는 거야",
    createdAt: "T12OCT + 284*60_000", likes: 39, comments: 0 },
  { id: 122280, symbol: "미국채", nickname: "모간오오오", holdingLabel: "관심종목",
    content: "모건스탠리가 5.5% 넘으면 연준이 긴급 개입 신호 낼 거라고. 5.5%가 연내 미국 주식 핵심 리스크 임계점이라는 건데. JP모건은 4분기 달러 102~104 범위 유지 본대. 금리 인하 경로 불확실한 상황에서 달러 약세 기대하기 어렵다는 거",
    createdAt: "T12OCT + 290*60_000", likes: 43, comments: 0 },
  { id: 122281, symbol: "금", nickname: "헤지길항중", holdingLabel: "관심종목",
    content: "금이 4,172달러로 0.52% 빠졌는데 낙폭이 크지 않아. 미국채 5.24%면 이자 없는 금 들고 있을 이유가 줄어드는 건데 중동 유가 107달러가 인플레 헤지 수요를 만들어서 상쇄하고 있는 거임. 두 힘이 길항해서 이 수준 유지 중",
    createdAt: "T12OCT + 296*60_000", likes: 36, comments: 0 },
  { id: 122282, symbol: "금", nickname: "중앙은행천톤", holdingLabel: "관심종목",
    content: "중앙은행이 연간 1,000톤 이상 금 매입하고 있는 게 구조적 수요 기반임. 중국, 인도, 터키 신흥국 중앙은행이 달러 의존도 낮추려고 금 늘리는 거잖아. 골드만 12개월 목표 4,500달러. JP모건 연내 4,300달러 회복 전망",
    createdAt: "T12OCT + 302*60_000", likes: 29, comments: 0 },
  { id: 122283, symbol: "금", nickname: "실질금리감시자", holdingLabel: "관심종목",
    content: "금이 고금리에 약한 이유는 명목 금리보다 실질 금리가 오를 때야. 유가 107달러가 인플레 기대를 높이면 실질 금리는 덜 오를 수 있어. 이 구조가 금 낙폭을 제한하는 이론적 배경임. 지정학 프리미엄이 추가로 더해지면 단기 바닥 확인",
    createdAt: "T12OCT + 308*60_000", likes: 33, comments: 0 },
  { id: 122284, symbol: "BTC", nickname: "팔만삼천버텼다", holdingLabel: "장투중",
    content: "BTC 83,280달러 0.9% 올랐어. 미국채 5.24% 환경에서도 버텼다는 게 핵심임. ETH 1.2%, SOL이 3.17%로 제일 많이 뛰었어. ETF 5일 연속 순유입에 일평균 3억 달러씩 들어오고 있으니까 기관이 고금리에도 전략적 배분 유지하는 거야",
    createdAt: "T12OCT + 314*60_000", likes: 57, comments: 0 },
  { id: 122285, symbol: "BTC", nickname: "솔라나삼점일", holdingLabel: "관심종목",
    content: "솔라나 3.17% 강세가 눈에 띄어. 네트워크 수수료 수입이 이더리움 근접 수준이래. 밈코인 거래량 회복이랑 디파이 예치금 증가가 솔라나 토큰 수요를 구조적으로 늘리고 있음. 매크로 압박 풀릴 때 알트코인이 먼저 튀는 패턴이 이번에도 나왔어",
    createdAt: "T12OCT + 320*60_000", likes: 44, comments: 0 },
  { id: 122286, symbol: "BTC", nickname: "번스타인팔만", holdingLabel: "관심종목",
    content: "번스타인이 BTC 8만 달러 초반이 구조적 지지선이라고 함. 5%대 금리가 6개월 이상 안 지속되면 약세 전환 가능성 낮다는 분석. 모건스탠리는 솔라나 네트워크 활성도 지표가 이더리움 따라잡는 속도 주목한대. 내년에 시가총액 순위 다시 위협 가능하다고",
    createdAt: "T12OCT + 326*60_000", likes: 38, comments: 0 },
  { id: 122287, symbol: "BTC", nickname: "펀드스트랫십만", holdingLabel: "관심종목",
    content: "펀드스트랫이 연말 10만 달러 전망 유지하고 있어. 미국 재무부 이자 부담 급증이 결국 통화 공급 확대 압력을 만들 거라는 논리야. 채권 금리 5%가 단기 역풍이지만 구조적 수급은 강하다는 판단. 기관 ETF 유입이 낙폭 제한 구조 만들어줌",
    createdAt: "T12OCT + 332*60_000", likes: 49, comments: 0 },
  { id: 122288, symbol: "BTC", nickname: "블랙록일이퍼센트", holdingLabel: "관심종목",
    content: "블랙록이 가상자산 포트폴리오 1~2% 배분이 전통 자산 대비 위험 조정 수익률 높인다는 리서치 냈대. 5% 넘는 채권 금리 환경에서도 분산 효과 유의미하다는 분석. 기관이 채권 다 사면 되는데도 BTC 1~2% 챙기는 이유가 이거야",
    createdAt: "T12OCT + 338*60_000", likes: 41, comments: 0 },
  { id: 122289, symbol: "BTC", nickname: "미국채이자폭탄", holdingLabel: "관심종목",
    content: "펀드스트랫 논리가 흥미로운 게 미국 국채 이자 비용 급증 → 연준 통화 공급 확대 강요 → BTC 강세 라는 역설적 루트야. 지금 5.24% 고금리가 역설적으로 BTC 연말 상승 촉매가 될 수 있다는 거임. 채권 위기가 가상자산 호재로 전환되는 시나리오",
    createdAt: "T12OCT + 344*60_000", likes: 46, comments: 0 },
];

function formatPost(p) {
  return `  { id: ${p.id}, symbol: "${p.symbol}", nickname: "${p.nickname}", holdingLabel: "${p.holdingLabel}",\n    content: "${p.content.replace(/"/g, '\\"')}",\n    createdAt: ${p.createdAt}, likes: ${p.likes}, comments: ${p.comments} },`;
}

// ── 1. Fix wallPosts.ts — remove ALL orphaned lines from removed posts ────────
{
  let content = fs.readFileSync(WALL_US, "utf8");
  const lines = content.split("\n");
  const fixedLines = [];
  let skip = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check if this is the start of a post object we already removed
    // (a line that starts with "    content:" or "    createdAt:" not preceded by id:)
    // The orphaned lines start with "    content:" right after a kept post's closing line
    // We need to detect pattern: content/createdAt lines without preceding id: line

    // Actually the issue is: the previous migration removed only the { id: X, ... } lines
    // but left the content/createdAt lines. These orphaned lines look like:
    //     content: "...",
    //     createdAt: ..., likes: ..., comments: ... },
    // where "},  " ends it

    // Check if this line is orphaned: starts with content: or createdAt: but is not
    // inside a post object (i.e. not preceded by a post opening line)
    // Actually the simplest check: if the previous line was a closing "},", and this line
    // starts with "    content:" or "    createdAt:" — it's orphaned

    fixedLines.push(line);
  }

  // More targeted approach: remove lines 200-211 (the orphaned content)
  // Let me just scan for the pattern
  const fixed2 = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detect orphaned content lines: "content: ..." or "createdAt: ..." that follow "},  "
    // But this is hard to detect generically. Let me instead check:
    // If this line starts with "    content:" and the next line starts with "    createdAt:"
    // AND there's no preceding "{ id:" line on this block, skip

    // Actually, a simpler approach: check if this line contains ONLY content/createdAt
    // and the previous non-empty line ended with "},"
    if (i > 0) {
      const prevLine = lines[i - 1].trim();
      if (prevLine.endsWith("},") &&
          (trimmed.startsWith("content:") || trimmed.startsWith("createdAt:"))) {
        // This is an orphaned line - skip it and the next one too
        // But we need to find where this orphaned block ends
        // Find the closing line (ends with "}," or just the last field)
        let j = i;
        while (j < lines.length && !lines[j].trimEnd().endsWith("},")) j++;
        // Skip lines i to j
        i = j;
        continue;
      }
    }
    fixed2.push(line);
  }

  fs.writeFileSync(WALL_US, fixed2.join("\n"), "utf8");
  console.log(`wallPosts.ts: cleaned orphaned lines`);
}

// ── 2. Fix wallPosts-markets.ts — replace partial inserts with full posts ───
{
  let content = fs.readFileSync(WALL_MKT, "utf8");
  const lines = content.split("\n");

  // Remove the partial lines (lines that have id: but no content:)
  // The partial lines look like: "  { id: 122302, symbol: "코스피", nickname: "...", holdingLabel: "...",
  // without a content field

  // Find and remove lines that match the pattern of partial posts
  const fixedLines = [];
  for (const line of lines) {
    const m = line.match(/^\s+\{\s*id:\s*(\d+),.*holdingLabel:/);
    if (m && !line.includes("content:") && !line.includes("createdAt:")) {
      const id = parseInt(m[1]);
      if (ALL_IDS.has(id)) {
        // This is a partial first-line - skip
        continue;
      }
    }
    fixedLines.push(line);
  }

  // Now insert proper full posts
  let fixed = fixedLines.join("\n");

  // Insert KR posts at top of MOCK_POSTS_KR
  const krInsertText = "  // ── 2026-10-12/13 한국시장 종토방 ──\n" +
    KR_POSTS_CONTENT.map(formatPost).join("\n") + "\n";

  // Check if marker already has our comment (from previous migration)
  if (fixed.includes("// ── 2026-10-12/13 한국시장 종토방 ──")) {
    // Already has the comment but posts are wrong - we removed the partial lines above
    // Insert after the comment line
    fixed = fixed.replace(
      "  // ── 2026-10-12/13 한국시장 종토방 ──\n",
      "  // ── 2026-10-12/13 한국시장 종토방 ──\n" + KR_POSTS_CONTENT.map(formatPost).join("\n") + "\n"
    );
  } else {
    fixed = fixed.replace(
      "export const MOCK_POSTS_KR: Post[] = [\n",
      "export const MOCK_POSTS_KR: Post[] = [\n" + krInsertText
    );
  }

  // Insert SAFE posts at top of MOCK_POSTS_SAFE
  if (fixed.includes("// ── 2026-10-12/13 안전자산·가상자산 종토방 ──")) {
    fixed = fixed.replace(
      "  // ── 2026-10-12/13 안전자산·가상자산 종토방 ──\n",
      "  // ── 2026-10-12/13 안전자산·가상자산 종토방 ──\n" + SAFE_POSTS_CONTENT.map(formatPost).join("\n") + "\n"
    );
  } else {
    const safeInsertText = "  // ── 2026-10-12/13 안전자산·가상자산 종토방 ──\n" +
      SAFE_POSTS_CONTENT.map(formatPost).join("\n") + "\n";
    fixed = fixed.replace(
      "export const MOCK_POSTS_SAFE: Post[] = [\n",
      "export const MOCK_POSTS_SAFE: Post[] = [\n" + safeInsertText
    );
  }

  fs.writeFileSync(WALL_MKT, fixed, "utf8");
  console.log(`wallPosts-markets.ts: fixed with full post content`);
}

console.log("Done ✓");
