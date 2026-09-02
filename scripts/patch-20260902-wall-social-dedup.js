#!/usr/bin/env node
/** 9/2 종토방·애널 중복 제거 + 9/1 잔존 숫자 정정 + 댓글 고유화 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}
function write(rel, c) {
  fs.writeFileSync(path.join(ROOT, rel), c);
}

function removeBlock(src, startNeedle, endNeedle) {
  const start = src.indexOf(startNeedle);
  if (start === -1) return src;
  const end = src.indexOf(endNeedle, start + startNeedle.length);
  if (end === -1) throw new Error(`end marker not found after ${startNeedle.slice(0, 40)}`);
  return src.slice(0, start) + src.slice(end);
}

function removeCommentBlock(src, postId) {
  const re = new RegExp(`\\n  ${postId}: \\[[\\s\\S]*?\\],\\n`, "m");
  return src.replace(re, "\n");
}

function patchWallMarkets() {
  let c = read("lib/wallPosts-markets.ts");

  // 중복·9/1 잔존 배치 제거 (9042~9047, 9135~9139, 9239~9242)
  const krDup =
    `  { id: 9042, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "관심종목", content: "6873.50 +0.90% · 외국인 890억 순매수 · 사이버캡 D-1", createdAt: T02 - 0, likes: 31, comments: 2, },
  { id: 9043, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "관심종목", content: "HBM 70%·HBM3E 5× · +0.82%", createdAt: T02 - 1800000, likes: 30, comments: 2, },
  { id: 9044, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "관심종목", content: "+1.12% · HBM 품귀 전망", createdAt: T02 - 3600000, likes: 29, comments: 2, },
  { id: 9045, symbol: "LG에너지솔루션", nickname: "배터리존버", holdingLabel: "관심종목", content: "+0.55% · 2차전지 지수 받침", createdAt: T02 - 5400000, likes: 28, comments: 2, },
  { id: 9046, symbol: "기아", nickname: "자동차매니아", holdingLabel: "관심종목", content: "+0.91% · 사이버캡 D-1 글로벌", createdAt: T02 - 7200000, likes: 27, comments: 2, },
  { id: 9047, symbol: "NAVER", nickname: "플랫폼러", holdingLabel: "관심종목", content: "-0.34% · 플랫폼 약세", createdAt: T02 - 9000000, likes: 26, comments: 2, },
`;
  if (c.includes(krDup)) c = c.replace(krDup, "");

  const safeDup = `  { id: 9135, symbol: "비트코인", nickname: "온체인러", holdingLabel: "관심종목", content: "~108248 · 10.8만$ · 공포44", createdAt: T02 - 0, likes: 28, comments: 2, },
  { id: 9136, symbol: "금", nickname: "금벌레", holdingLabel: "관심종목", content: "~3475 · 금>달러 준비자산", createdAt: T02 - 1800000, likes: 27, comments: 2, },
  { id: 9137, symbol: "이더리움", nickname: "이더러", holdingLabel: "관심종목", content: "~4512 · 4500$ 선", createdAt: T02 - 3600000, likes: 26, comments: 2, },
  { id: 9138, symbol: "은", nickname: "실물러", holdingLabel: "관심종목", content: "~38.6 · Au/Ag ratio", createdAt: T02 - 5400000, likes: 25, comments: 2, },
  { id: 9139, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관심종목", content: "DXY 98.2 · 인상 57% · FOMC 9/15~16", createdAt: T02 - 7200000, likes: 24, comments: 2, },
`;
  if (c.includes(safeDup)) c = c.replace(safeDup, "");

  const reDup = `  { id: 9239, symbol: "서울", nickname: "서울러", holdingLabel: "관심", content: "강남·마포 소폭 반등 · FOMC 전 관망", createdAt: T02 - 0, likes: 28, comments: 2, },
  { id: 9240, symbol: "전세", nickname: "전세러", holdingLabel: "관심", content: "학군·역세권 소폭 반등 · 입주 물량 변수", createdAt: T02 - 1200000, likes: 27, comments: 2, },
  { id: 9241, symbol: "매매", nickname: "실수요자", holdingLabel: "관심", content: "FOMC·세금 부담 관망 · 보합~-0.1%", createdAt: T02 - 2400000, likes: 26, comments: 2, },
  { id: 9242, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급 확대 수사·대출 규제 유지", createdAt: T02 - 3600000, likes: 25, comments: 2, },
`;
  if (c.includes(reDup)) c = c.replace(reDup, "");

  // 9/2 KR 게시글·댓글 교체
  const krPostsOld = `  { id: 9048, symbol: "코스피", nickname: "종토_9048", holdingLabel: "관심종목", content: "6875 +0.9% · 외국인 890억 순매수 · Cybercab D-1", createdAt: T02 - 0, likes: 30, comments: 2, },
  { id: 9049, symbol: "삼성전자", nickname: "종토_9049", holdingLabel: "관심종목", content: "+1.8% · HBM · 외국인 수급", createdAt: T02 - 1800000, likes: 29, comments: 2, },
  { id: 9050, symbol: "SK하이닉스", nickname: "종토_9050", holdingLabel: "관심종목", content: "+1.6% · HBM 테마", createdAt: T02 - 3600000, likes: 28, comments: 2, },
  { id: 9051, symbol: "현대차", nickname: "종토_9051", holdingLabel: "관심종목", content: "Cybercab D-1 · 완성차 심리", createdAt: T02 - 5400000, likes: 27, comments: 2, },
  { id: 9052, symbol: "코스피", nickname: "종토_9052", holdingLabel: "관심종목", content: "외국인 890억 · 환율 1366.5", createdAt: T02 - 7200000, likes: 26, comments: 2, },
  { id: 9053, symbol: "환율", nickname: "종토_9053", holdingLabel: "관심종목", content: "1366.5원 · 외국인 순매수 연동", createdAt: T02 - 9000000, likes: 25, comments: 2, },`;

  const krPostsNew = `  { id: 9048, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "인덱스 보유", content: "6,875 +0.9%로 9/1 6,812 대비 수급이 살아났어요. 외국인 412억→890억 전환은 체감 큽니다. 다만 기관·개인이 역방향이면 지수만 오르는 날일 수 있어요.", createdAt: T02 - 0, likes: 38, comments: 2, },
  { id: 9049, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "삼성전자 보유", content: "삼전 +1.8%는 코스피 +0.9%보다 두 배 빠르게 움직였습니다. HBM 테마 맞는데 사이버캡 D-1 전이라 내일 변동성 각오 중이에요.", createdAt: T02 - 1800000, likes: 31, comments: 2, },
  { id: 9050, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "하이닉스 +1.6%. 삼전 +1.8%랑 같이 올랐는데 외국인 890억이 업종 전체에 퍼진 건지 종목별 순매수는 따로 봐야 합니다.", createdAt: T02 - 3600000, likes: 29, comments: 2, },
  { id: 9051, symbol: "현대차", nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "사이버캡 45대·지오펜스 확대 뉴스에 완성차도 같이 움직였어요. 국내 실적보다 글로벌 로보택시 심리가 먼저인 날입니다.", createdAt: T02 - 5400000, likes: 27, comments: 2, },
  { id: 9052, symbol: "코스피", nickname: "외국인추적", holdingLabel: "관망", content: "외국인 890억 순매수인데 환율은 1,366.5원으로 원화 강세예요. 둘이 같이 오면 우호적이지만 하루만으로 추세라고 보긴 어렵습니다.", createdAt: T02 - 7200000, likes: 26, comments: 2, },
  { id: 9053, symbol: "환율", nickname: "환율보는사람", holdingLabel: "관심종목", content: "1,369.2→1,366.5원, 약 2.7원 강세. 수출주는 환율만 보고 판단하면 틀리기 쉬워서 그날 외국인 수급을 같이 적어두려고요.", createdAt: T02 - 9000000, likes: 24, comments: 2, },`;

  c = c.replace(krPostsOld, krPostsNew);

  // SAFE: 잘못된 가격 9141~9145 수정
  const safePostsOld = `  { id: 9141, symbol: "비트코인", nickname: "종토_9141", holdingLabel: "관심종목", content: "~79500 · FOMC 9/15", createdAt: T02 - 0, likes: 30, comments: 2, },
  { id: 9142, symbol: "금", nickname: "종토_9142", holdingLabel: "관심종목", content: "~2520 · 실질금리", createdAt: T02 - 1800000, likes: 29, comments: 2, },
  { id: 9143, symbol: "이더리움", nickname: "종토_9143", holdingLabel: "관심종목", content: "BTC 연동 · 스테이킹", createdAt: T02 - 3600000, likes: 28, comments: 2, },
  { id: 9144, symbol: "은", nickname: "종토_9144", holdingLabel: "관심종목", content: "금+산업 · Au/Ag", createdAt: T02 - 5400000, likes: 27, comments: 2, },
  { id: 9145, symbol: "매크로", nickname: "종토_9145", holdingLabel: "관심종목", content: "9/3 Cybercab · 9/15 FOMC", createdAt: T02 - 7200000, likes: 26, comments: 2, },`;

  const safePostsNew = `  { id: 9141, symbol: "비트코인", nickname: "온체인러", holdingLabel: "BTC 보유", content: "108,248달러, 10.8만$ 심리선 부근이에요. 공포탐욕 44(1주 전 56)면 리스크온보다는 조심스러운 구간 같습니다.", createdAt: T02 - 0, likes: 32, comments: 2, },
  { id: 9142, symbol: "금", nickname: "금벌레", holdingLabel: "금 ETF", content: "금 3,475달러. 코스피 +0.9%인데 금도 버티는 날이면 매크로 헤지 수요가 섞인 걸로 봅니다.", createdAt: T02 - 1800000, likes: 28, comments: 2, },
  { id: 9143, symbol: "이더리움", nickname: "스테이커", holdingLabel: "ETH 보유", content: "이더 4,512달러, 4,500$ 선 위. 단기엔 BTC·금리 베타가 크고 스테이킹 수익은 2년물 국채랑 비교 중이에요.", createdAt: T02 - 3600000, likes: 26, comments: 2, },
  { id: 9144, symbol: "은", nickname: "실물러", holdingLabel: "관심", content: "은은 금보다 변동성이 커서 금 3,475 강세 때 추격하고 PMI 둔화면 먼저 약해지는 패턴이 반복됩니다.", createdAt: T02 - 5400000, likes: 23, comments: 2, },
  { id: 9145, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관망", content: "DXY 98.2·인상 57%·FOMC 9/15~16. 이번 주 사이버캡·고용까지 겹치면 BTC·금·코스피가 같이 재가격될 수 있어요.", createdAt: T02 - 7200000, likes: 25, comments: 2, },`;

  c = c.replace(safePostsOld, safePostsNew);

  // KR-RE: 종토_9244~9249 문장형으로
  const rePostsOld = `  { id: 9244, symbol: "서울", nickname: "종토_9244", holdingLabel: "관심종목", content: "강남·마포 소폭 · 구별 온도차", createdAt: T02 - 0, likes: 30, comments: 2, },
  { id: 9245, symbol: "전세", nickname: "종토_9245", holdingLabel: "관심종목", content: "입주·LTV 변수", createdAt: T02 - 1800000, likes: 29, comments: 2, },
  { id: 9246, symbol: "매매", nickname: "종토_9246", holdingLabel: "관심종목", content: "FOMC 관망", createdAt: T02 - 3600000, likes: 28, comments: 2, },
  { id: 9247, symbol: "정책", nickname: "종토_9247", holdingLabel: "관심종목", content: "공급+규제", createdAt: T02 - 5400000, likes: 27, comments: 2, },
  { id: 9248, symbol: "경기", nickname: "종토_9248", holdingLabel: "관심종목", content: "외곽 수요 vs 입주", createdAt: T02 - 7200000, likes: 26, comments: 2, },
  { id: 9249, symbol: "부산", nickname: "종토_9249", holdingLabel: "관심종목", content: "지역별 격차", createdAt: T02 - 9000000, likes: 25, comments: 2, },`;

  const rePostsNew = `  { id: 9244, symbol: "서울", nickname: "서울러", holdingLabel: "관심", content: "강남·마포는 소폭 반등인데 외곽은 다릅니다. 서울 평균 한 줄만 보면 구별 온도차를 놓치기 쉬워요.", createdAt: T02 - 0, likes: 28, comments: 2, },
  { id: 9245, symbol: "전세", nickname: "전세러", holdingLabel: "관심", content: "학군·역세권 전세는 버티는데 9월 입주 물량이 변수예요. 보증금은 오늘 숫자보다 다음 달 공급이 먼저입니다.", createdAt: T02 - 1200000, likes: 27, comments: 2, },
  { id: 9246, symbol: "매매", nickname: "실수요자", holdingLabel: "관심", content: "FOMC·세금 부담으로 매매는 관망이 이어집니다. 가격보다 거래량이 먼저 줄어드는 패턴이에요.", createdAt: T02 - 2400000, likes: 26, comments: 2, },
  { id: 9247, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급 확대 수사는 심리부터 움직이고 LTV·DSR 규제가 수요에 바로 닿습니다. 구호랑 숫자를 분리해서 봐야 해요.", createdAt: T02 - 3600000, likes: 25, comments: 2, },
  { id: 9248, symbol: "경기", nickname: "경기거주", holdingLabel: "관심", content: "수도권 외곽은 GTX 기대와 입주 물량이 동시에 변수입니다. 서울 뉴스만 보고 경기 판단하면 왜곡되기 쉽습니다.", createdAt: T02 - 4800000, likes: 24, comments: 2, },
  { id: 9249, symbol: "부산", nickname: "부산러", holdingLabel: "관심", content: "부산·제주는 관광·이전 수요가 섞여 서울이랑 사이클이 다릅니다. 거래량 얇은 지역은 하루 체감이 크게 왜곡돼요.", createdAt: T02 - 6000000, likes: 23, comments: 2, },`;

  c = c.replace(rePostsOld, rePostsNew);

  write("lib/wallPosts-markets.ts", c);

  // 댓글 블록 교체 (별도 패스 — 정규식)
  c = read("lib/wallPosts-markets.ts");
  for (const id of [9042, 9043, 9044, 9045, 9046, 9047, 9135, 9136, 9137, 9138, 9139, 9239, 9240, 9241, 9242]) {
    c = removeCommentBlock(c, id);
  }

  const krComments = `  9048: [
    { id: 1, nickname: "수급쟁이", holdingLabel: "관망", content: "기관이 팔았는지 집계 다시 봐야겠네요.", createdAt: T02 + 600_000, likes: 5 },
    { id: 2, nickname: "지수관찰", holdingLabel: "인덱스 보유", content: "6,900선은 아직 심리 구간 맞습니다.", createdAt: T02 + 1200_000, likes: 4 },
  ],
  9049: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "HBM은 분기 ASP로 검증해야죠.", createdAt: T02 - 1200_000, likes: 6 },
    { id: 2, nickname: "수출통계러", holdingLabel: "관망", content: "사이버캡은 글로벌 변수라 내일이 더 중요해요.", createdAt: T02 - 900_000, likes: 5 },
  ],
  9050: [
    { id: 1, nickname: "이익률체크", holdingLabel: "하이닉스 보유", content: "하이닉스 단독 순매수도 같이 볼게요.", createdAt: T02 - 3000_000, likes: 5 },
    { id: 2, nickname: "장비쪽사람", holdingLabel: "관망", content: "CapEx 우려 나오면 마진 가이던스가 먼저입니다.", createdAt: T02 - 2400_000, likes: 4 },
  ],
  9051: [
    { id: 1, nickname: "미국판매러", holdingLabel: "관심", content: "9/3 행사 결과가 단기 촉매겠죠.", createdAt: T02 - 6600_000, likes: 5 },
    { id: 2, nickname: "완성차존버", holdingLabel: "현대차 관심", content: "국내 월간 수출도 같이 추적하겠습니다.", createdAt: T02 - 6000_000, likes: 4 },
  ],
  9052: [
    { id: 1, nickname: "환율덕후", holdingLabel: "관망", content: "DXY랑 원달러 같이 적어두는 게 맞아요.", createdAt: T02 - 8400_000, likes: 4 },
    { id: 2, nickname: "개인투자", holdingLabel: "관망", content: "지수만 오르고 개인은 손실 나는 날도 많습니다.", createdAt: T02 - 7800_000, likes: 3 },
  ],
  9053: [
    { id: 1, nickname: "수출주러", holdingLabel: "관심종목", content: "환율↓=수출주↓만 고정하면 틀리기 쉽습니다.", createdAt: T02 - 10200_000, likes: 5 },
    { id: 2, nickname: "채권쟁이", holdingLabel: "관망", content: "9/4 고용 나오면 환율부터 움직일 겁니다.", createdAt: T02 - 9600_000, likes: 4 },
  ],`;

  const safeComments = `  9141: [
    { id: 1, nickname: "ETF추적", holdingLabel: "BTC 보유", content: "현물 ETF 순유입이 이어지는지 먼저 볼게요.", createdAt: T02 + 600_000, likes: 5 },
    { id: 2, nickname: "헷지러", holdingLabel: "관망", content: "공포44면 레버리지는 줄이는 게 맞죠.", createdAt: T02 + 1200_000, likes: 4 },
  ],
  9142: [
    { id: 1, nickname: "실질금리", holdingLabel: "관망", content: "금은 이자 없어서 금리 기대에 민감합니다.", createdAt: T02 - 1200_000, likes: 5 },
    { id: 2, nickname: "달러보기", holdingLabel: "관심", content: "DXY 98.2 방향이 같이 중요해요.", createdAt: T02 - 900_000, likes: 4 },
  ],
  9143: [
    { id: 1, nickname: "스테이커", holdingLabel: "ETH 보유", content: "ETH/BTC 비율도 같이 기록하겠습니다.", createdAt: T02 - 3000_000, likes: 4 },
    { id: 2, nickname: "온체인러", holdingLabel: "관심", content: "4,500$ 선 지지되는지가 단기 포인트.", createdAt: T02 - 2400_000, likes: 3 },
  ],
  9144: [
    { id: 1, nickname: "비율체크", holdingLabel: "관심", content: "금은비 극단이면 상대가치 논쟁 나옵니다.", createdAt: T02 - 4800_000, likes: 4 },
    { id: 2, nickname: "실물러", holdingLabel: "관심", content: "태양광 수요 뉴스도 챙기겠습니다.", createdAt: T02 - 4200_000, likes: 3 },
  ],
  9145: [
    { id: 1, nickname: "미장러", holdingLabel: "관망", content: "9/4 고용이 확률부터 흔들 겁니다.", createdAt: T02 - 6600_000, likes: 5 },
    { id: 2, nickname: "환율데스크", holdingLabel: "관심", content: "원·달러 1366.5랑 DXY 같이 보는 게 맞네요.", createdAt: T02 - 6000_000, likes: 4 },
  ],`;

  const reComments = `  9244: [
    { id: 1, nickname: "실수요", holdingLabel: "관심", content: "구별로 온도 차 큰 날 맞습니다.", createdAt: T02 + 600_000, likes: 4 },
    { id: 2, nickname: "전세대출", holdingLabel: "관심", content: "FOMC 전엔 관망 거래 늘기 쉽죠.", createdAt: T02 + 1200_000, likes: 3 },
  ],
  9245: [
    { id: 1, nickname: "대출상담", holdingLabel: "관심", content: "9월 입주 일정 먼저 확인하겠습니다.", createdAt: T02 - 600_000, likes: 4 },
    { id: 2, nickname: "전세러", holdingLabel: "관심", content: "LTV·DSR이 수요를 바로 제한합니다.", createdAt: T02 - 300_000, likes: 3 },
  ],
  9246: [
    { id: 1, nickname: "세제확인", holdingLabel: "관심", content: "거래량 없으면 가격만 보면 오해하기 쉽습니다.", createdAt: T02 - 1800_000, likes: 4 },
    { id: 2, nickname: "실수요", holdingLabel: "관심", content: "급매물 늘면 하방 신호일 수 있어요.", createdAt: T02 - 1200_000, likes: 3 },
  ],
  9247: [
    { id: 1, nickname: "정책워처", holdingLabel: "관심", content: "시행령 바뀌는지부터 볼게요.", createdAt: T02 - 3000_000, likes: 4 },
    { id: 2, nickname: "전세러", holdingLabel: "관심", content: "공급 수사랑 규제 숫자는 시간 축이 다릅니다.", createdAt: T02 - 2400_000, likes: 3 },
  ],
  9248: [
    { id: 1, nickname: "GTX기대", holdingLabel: "관심", content: "철도 일정이 가격에 반영되는 시차가 있어요.", createdAt: T02 - 4200_000, likes: 4 },
    { id: 2, nickname: "경기거주", holdingLabel: "관심", content: "외곽은 입주 물량 체크가 먼저입니다.", createdAt: T02 - 3600_000, likes: 3 },
  ],
  9249: [
    { id: 1, nickname: "부산러", holdingLabel: "관심", content: "해운대·센텀은 버티는데 외곽은 다릅니다.", createdAt: T02 - 5400_000, likes: 4 },
    { id: 2, nickname: "제주민", holdingLabel: "관심", content: "관광 수요는 계절성이 커요.", createdAt: T02 - 4800_000, likes: 3 },
  ],`;

  for (const [id, block] of [
    [9048, krComments],
    [9141, safeComments],
    [9244, reComments],
  ]) {
    c = removeCommentBlock(c, id);
  }
  c = c.replace(
    "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krComments}\n`,
  );
  c = c.replace(
    "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${safeComments}\n`,
  );
  c = c.replace(
    "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${reComments}\n`,
  );

  // 보일러플레이트 댓글 일괄 제거
  c = c.replace(
    /\n  \d+: \[\n    \{ id: 1, nickname: "댓글러"[\s\S]*?Cybercab D-1 같이 봐야죠"[\s\S]*?\],\n/g,
    "\n",
  );

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: dedup + unique 9/2 posts/comments");
}

function patchAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  c = c.replace(
    `  { id: -2021, alias: "판교 치타 #22", symbol: "삼성전자", content: "삼성전자 +0.82%. HBM 생산능력 70%·HBM3E 현물가 계약가 대비 약 5배 전망이 국내 메모리주에 전달됐습니다. 분기 HBM 출하·평균 판매 가격으로 검증하시기 바랍니다.", likes: 27, comments: 2, created_at: "2026-09-02T06:08:00.000Z", liked: false, },`,
    `  { id: -2021, alias: "판교 치타 #22", symbol: "삼성전자", content: "삼성전자 +1.8%로 코스피 +0.9%보다 강했습니다. 외국인 약 890억 원 순매수와 HBM 수요가 겹친 날입니다. 분기 HBM 출하·ASP로 검증하시기 바랍니다.", likes: 27, comments: 2, created_at: "2026-09-02T06:08:00.000Z", liked: false, },`,
  );
  c = c.replace(
    `  { id: -2022, alias: "삼성동 여우 #08", symbol: "SK하이닉스", content: "SK하이닉스 +1.12%로 대형주 중 상대 강세. HBM 품귀 전망과 외국인 순매수 전환 구간이 겹친 날입니다.", likes: 26, comments: 2, created_at: "2026-09-02T06:16:00.000Z", liked: false, },`,
    `  { id: -2022, alias: "삼성동 여우 #08", symbol: "SK하이닉스", content: "SK하이닉스 +1.6%로 삼성전자 +1.8%와 함께 반도체 대형주가 지수를 이끌었습니다. 외국인 순매수 확대 구간입니다.", likes: 26, comments: 2, created_at: "2026-09-02T06:16:00.000Z", liked: false, },`,
  );
  c = c.replace(
    `  { id: -2023, alias: "성수 수달 #35", symbol: "LG에너지솔루션", content: "LG에너지솔루션 +0.55%로 2차전지가 지수 반등을 받쳤습니다. 원·달러 1,366.5원(-2.7원)을 함께 보시면 됩니다.", likes: 25, comments: 2, created_at: "2026-09-02T06:24:00.000Z", liked: false, },`,
    `  { id: -2023, alias: "한남 두루미 #17", symbol: "현대차", content: "현대차그룹은 사이버캡 45대·9월 3일 행사 D-1 글로벌 자율주행 뉴스에 민감하게 반응했습니다. 국내 실적·수출·환율 1,366.5원이 중기 변수입니다.", likes: 25, comments: 2, created_at: "2026-09-02T06:24:00.000Z", liked: false, },`,
  );
  c = c.replace(
    `  { id: -2024, alias: "한남 두루미 #17", symbol: "기아", content: "기아 +0.91%. 미국 사이버캡 45대·9월 3일 행사 D-1이 완성차 심리 변수입니다.", likes: 24, comments: 2, created_at: "2026-09-02T06:32:00.000Z", liked: false, },`,
    `  { id: -2024, alias: "광화문 물총새 #06", symbol: "환율", content: "원·달러 약 1,366.5원(9/1 1,369.2원 대비 원화 강세). 외국인 약 890억 원 순매수와 겹친 날입니다. DXY·9/4 고용을 같이 추적하시기 바랍니다.", likes: 24, comments: 2, created_at: "2026-09-02T06:32:00.000Z", liked: false, },`,
  );
  c = c.replace(
    `  { id: -2025, alias: "잠실 백로 #29", symbol: "NAVER", content: "NAVER -0.34%로 반등장에서 플랫폼주는 상대 약세. 반도체·2차전지·완성차가 지수를 이끈 날입니다.", likes: 23, comments: 2, created_at: "2026-09-02T06:40:00.000Z", liked: false, },`,
    `  { id: -2025, alias: "잠실 백로 #29", symbol: "코스닥", content: "9/2 장은 반도체·완성차 중심이었습니다. 코스피 6,875(+0.9%)·외국인 890억 순매수·사이버캡 D-1·FOMC 9/15~16을 같은 달력에 두시기 바랍니다.", likes: 23, comments: 2, created_at: "2026-09-02T06:40:00.000Z", liked: false, },`,
  );
  write("lib/analystPosts-markets.ts", c);
  console.log("analystPosts-markets: 9/2 KR facts aligned with reports");
}

patchWallMarkets();
patchAnalystMarkets();
console.log("done");
