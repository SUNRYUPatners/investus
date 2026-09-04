#!/usr/bin/env node
/**
 * 9/4 KR · Safe · KR-RE 애널·종토방 전량 다양화 + 교차시장 금지.
 * 원인: apply-20260904.js 가 (1) 「종목 가격(+%)」동일 오프닝 (2) 「확인했습니다. 숫자부터」댓글 풀을
 * 티커만 바꿔 찍어 넣음. 미국 풀에 KR 문구를 섞은 것과 같은 패턴.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

function esc(s) {
  return JSON.stringify(s);
}

function replaceExportArrayItems(src, exportName, idOrder, makeLine) {
  // Replace one-liners matching { id: N, ... }, for known ids at head of export
  let out = src;
  for (const id of idOrder) {
    const re = new RegExp(
      `\\{ id: ${id}, alias: "[^"]+", symbol: "[^"]+", content: "[^"]*(?:\\\\.[^"]*)*", likes: \\d+, comments: \\d+, created_at: "[^"]+", liked: false, \\},`,
    );
    if (!re.test(out)) {
      // try multiline wall style
      continue;
    }
    out = out.replace(re, makeLine(id));
  }
  return out;
}

// ── Analyst KR ───────────────────────────────────────────
const KR_ANALYST = {
  [-2051]: {
    alias: "여의도 너구리 #11",
    symbol: "코스피",
    content:
      "장중 243포인트가 출렁인 날을 종가 +0.26%로만 읽으면 놓칩니다. 기타법인 12거래일 연속이 받쳤는데, 그 안에 자사주·소각이 얼마나 섞였는지부터 표로 빼겠습니다.",
  },
  [-2052]: {
    alias: "판교 치타 #22",
    symbol: "삼성전자",
    content:
      "왜 지수만 올리고 시총 1위는 따로 갔을까요? 자사주가 기타법인으로 잡히면 수급이 좋아 보이는 착시가 납니다. 외국인 매도 금액과 자사주 공시를 한 화면에 겹치지 마세요.",
  },
  [-2053]: {
    alias: "삼성동 여우 #08",
    symbol: "SK하이닉스",
    content:
      "소각용 자사주가 있어도 오후 급락 때 더 빠진 건 베타 때문입니다. 환원 이슈로 당일 조정을 막아주진 못했어요. 관망이 맞습니다.",
  },
  [-2054]: {
    alias: "성수 수달 #35",
    symbol: "LG에너지솔루션",
    content:
      "공시 없이 에너지저장·태양광 이야기로만 5%대가 나왔습니다. 목표가 숫자만 보고 추격하기엔 재료 확인이 너무 얇아요.",
  },
  [-2055]: {
    alias: "한남 두루미 #17",
    symbol: "현대차",
    content:
      "원화는 강한데 유가는 90달러대 — 완성차 마진 해석이 하루만에 갈립니다. 미국 사이버캡 뉴스랑 국내 판매는 축을 분리해서 적겠습니다.",
  },
  [-2056]: {
    alias: "잠실 백로 #29",
    symbol: "KB금융",
    content:
      "금리 인상 기대가 되살아나며 금융주가 돌았습니다. 다만 오늘 밤 고용이 기대를 뒤집으면 로테이션이 하루 만에 되돌아갈 수 있어 비중은 작게 둡니다.",
  },
};

const KR_ANALYST_CMT = {
  [-2051]: [
    ["종로 까치 #41", "기타법인 연속이면 ‘외국인 복귀’로 단정하면 안 됩니다. 자사주 비중부터 빼죠."],
    ["분당 매 #31", "243포인트 출렁이면 종가만 보는 매매는 위험해요."],
  ],
  [-2052]: [
    ["디커플러", "시총 1위가 지수와 어긋날 때가 제일 헷갈리죠. 공시 일정 확인 중입니다."],
    ["외국인표", "순매도랑 자사주 매입을 같은 칸에 넣지 마세요."],
  ],
  [-2053]: [
    ["베타주의", "소각은 중기, 오늘 낙폭은 단기 베타. 둘을 섞지 않겠습니다."],
    ["HBM트래커", "분기 ASP 나오기 전엔 비중 추가 안 합니다."],
  ],
  [-2054]: [
    ["공시대기", "수주·공급 계약 나오기 전엔 관망이 맞아요."],
    ["목표가회의", "목표가 48만은 의견일 뿐, 추격 근거로 쓰진 않겠습니다."],
  ],
  [-2055]: [
    ["환율유가", "원화 강세·고유가가 동시에 오면 해석이 갈려요. 둘 다 표에."],
    ["축분리", "로보택시 글로벌이랑 내수 판매는 다른 차트입니다."],
  ],
  [-2056]: [
    ["금리민감", "금융 로테이션은 고용 한 방에 뒤집힙니다. 추격은 발표 후로."],
    ["은행베타", "케이비만 보지 말고 업종 전체 베타도 같이 볼게요."],
  ],
};

// ── Analyst SAFE ─────────────────────────────────────────
const SAFE_ANALYST = {
  [-2057]: {
    alias: "온체인 매 #03",
    symbol: "매크로",
    content:
      "성격이 다른 비트코인·금·유가가 한날 움직이면 원인은 대개 달러·금리입니다. 오늘 밤 비농업 고용 하나에 포지션을 몰아넣진 않겠습니다.",
  },
  [-2058]: {
    alias: "금벌레 #17",
    symbol: "비트코인",
    content:
      "8만 달러를 다시 밟았습니다. 지지가 되면 다음 시험은 고점이고, 깨지면 청산이 먼저입니다. 기사 속 7만 7천과 거래소 종가를 혼동하지 마세요.",
  },
  [-2059]: {
    alias: "금시세 #28",
    symbol: "금",
    content:
      "전날 급락 저점에서 되돌린 금입니다. 달러 약세·인상 기대 완화가 겹쳤는지, 숏커버만인지 — 고용 숫자 나온 뒤 4,500 안착을 보겠습니다.",
  },
  [-2060]: {
    alias: "실물러 #12",
    symbol: "은",
    content:
      "은이 금보다 크게 움직인 날은 산업 수요와 헤지가 동시에 붙은 구간입니다. 금 대비 비중은 작게 유지합니다.",
  },
  [-2061]: {
    alias: "이더러 #44",
    symbol: "이더리움",
    content:
      "비트코인 반등에 연동됐지만 2,500달러 아래입니다. 고용 전 알트 레버리지는 접는 편이 안전해 보여요.",
  },
  [-2062]: {
    alias: "유가러 #44",
    symbol: "WTI",
    content:
      "90달러를 지키는 유가와 서비스 확장 신호가 겹치면 금리 인하 기대가 쉽게 안 내려갑니다. 위험자산이랑 같이 보셔야 합니다.",
  },
};

const SAFE_ANALYST_CMT = {
  [-2057]: [
    ["매크로올빼미", "공통 변수는 고용·달러뿐입니다. 자산별 메모를 분리하세요."],
    ["레버리지줄임", "발표 전 신규 레버리지는 안 키웁니다."],
  ],
  [-2058]: [
    ["온체인러", "8만 지지인지 숏커버인지는 청산 맵이 말해 줍니다."],
    ["종가통일", "거래소 하나로 종가를 고정하세요. 기사마다 다르면 헷갈립니다."],
  ],
  [-2059]: [
    ["실질금리", "4,500 안착은 이틀은 봐야 합니다. 급락 반등은 숏커버일 수도."],
    ["DXY체크", "달러·실질금리가 같이 풀리는지 확인 중."],
  ],
  [-2060]: [
    ["금은비", "은은 금 레버리지에 가깝습니다. 비중을 더 줄입니다."],
    ["산업수요", "PMI·구리를 같이 봐야 산업 은인지 알 수 있어요."],
  ],
  [-2061]: [
    ["심리선", "2,500 탈환이 먼저입니다. 비트만 보고 이더 추격하진 않아요."],
    ["알트관망", "고용 전 알트는 변동성만 키울 수 있습니다."],
  ],
  [-2062]: [
    ["인플레꼬리", "90달러가 버티면 인플레 우려가 남습니다. 10년물이랑 같이."],
    ["서비스확장", "서비스 확장이면 연준 메시지가 매파 쪽으로 기울 수 있어요."],
  ],
};

// ── Analyst KR-RE ────────────────────────────────────────
const RE_ANALYST = {
  [-2063]: {
    alias: "실수요 #05",
    symbol: "정책",
    content:
      "비거주 공제 12억·실거주 14억·상한 150% — 9억으로 깎이던 안이 철회된 ‘완화’이지, 세금이 사라진 잔치는 아닙니다.",
  },
  [-2064]: {
    alias: "정책워처 #01",
    symbol: "종부세",
    content:
      "부부 공동명의면 비거주 6억씩 구조입니다. 공시가·실거주 요건 문서를 먼저 보고, 국회 심사 전까지는 고지서 시뮬레이션만 해 두겠습니다.",
  },
  [-2065]: {
    alias: "전세러 #09",
    symbol: "전세",
    content:
      "ISA 원안 복구 방향이면 여윳돈이 전부 집으로만 가진 않을 수 있습니다. 한도는 시행령 전이니 부동산 유입으로 단정하진 않아요.",
  },
  [-2066]: {
    alias: "강남 두더지 #02",
    symbol: "매매",
    content:
      "2029년 보유기간 공제 폐지·거주는 연 8% — 투자 목적 매각이라면 일정을 지금부터 달력에 올려 두는 편이 낫습니다.",
  },
};

const RE_ANALYST_CMT = {
  [-2063]: [
    ["세무사보", "완화 폭이 제한적이라 매수 신호로 단정하진 않겠습니다."],
    ["국회대기", "심사에서 숫자가 또 바뀔 수 있어요."],
  ],
  [-2064]: [
    ["공동명의", "6억×2도 명의 요건이 있습니다. 서류부터."],
    ["실거주체크", "전입 일정도 표에 넣어야 체감세액이 맞아요."],
  ],
  [-2065]: [
    ["금융상품", "집 대신 계좌 유인이 생길 수는 있어요. 한도 확정 대기."],
    ["축분리", "전세·매매를 한 바구니 묶지 말고 계좌 혜택만 따로."],
  ],
  [-2066]: [
    ["양도세", "거주 공제와 보유기간 공제를 엑셀에서 분리해 두겠습니다."],
    ["매각캘린더", "2029년 전이면 매각 일정을 앞당길 유인이 있습니다."],
  ],
};

// ── Wall KR ──────────────────────────────────────────────
const KR_WALL = [
  {
    id: 9060,
    symbol: "코스피",
    nickname: "칠천피존버",
    holding: "인덱스 보유",
    content:
      "종가는 강보합인데 장중엔 롤러코스터였어요. 기타법인이 받친 자리라 외국인 복귀로 착각하면 다음날 당합니다",
    comments: [
      ["수급쟁이", "기타법인 12일 연속이면 자사주부터 빼서 봐야죠"],
      ["장중폭", "243포인트면 종가 매매는 비추"],
    ],
  },
  {
    id: 9061,
    symbol: "삼성전자",
    nickname: "반도체장기",
    holding: "삼성전자 보유",
    content:
      "지수는 올랐는데 삼전만 따로 간 느낌. 자사주가 기타법인으로 잡히니까 수급이 좋아 보이는 착시가 있음",
    comments: [
      ["메모리사이클", "공시랑 외국인 순매도를 한 칸에 넣지 마세요"],
      ["수출통계러", "25만 원 지지는 고용 전후로 다시 볼게요"],
    ],
  },
  {
    id: 9062,
    symbol: "SK하이닉스",
    nickname: "HBM러버",
    holding: "하이닉스 보유",
    content:
      "소각 매입 있어도 오후 급락 때 더 빠지더라고요. 환원 호재로 당일 베타를 막아주진 못함",
    comments: [
      ["베타주의", "중기 소각이랑 오늘 낙폭은 다른 이야기"],
      ["ASP대기", "분기 숫자 전엔 추격 안 해요"],
    ],
  },
  {
    id: 9063,
    symbol: "LG에너지솔루션",
    nickname: "배터리존버",
    holding: "LG엔솔 관심",
    content:
      "공시 없이 ESS·태양광 이야기로만 튀었네요. 목표가 이야기만으로 따라가긴 이릅니다",
    comments: [
      ["공시대기", "수주 나오기 전엔 관망이 맞아요"],
      ["이차전지", "5%대 공시 없는 날엔 추격 금지"],
    ],
  },
  {
    id: 9064,
    symbol: "현대차",
    nickname: "자동차매니아",
    holding: "현대차 관심",
    content:
      "환율은 좋은데 유가 91달러는 부담. 완성차 되돌림인지 하루짜리인지 아직 모름",
    comments: [
      ["환율유가", "둘이 반대로 당기면 해석이 갈려요"],
      ["축분리", "사이버캡이랑 내수는 따로 적을게요"],
    ],
  },
  {
    id: 9065,
    symbol: "KB금융",
    nickname: "은행주러",
    holding: "KB금융 관심",
    content:
      "금리 수혜로 돌긴 돌았는데 고용 한 방에 뒤집힐 수 있어서 추격은 안 함. 비중 작게만",
    comments: [
      ["금리보는사람", "발표 끝나고 다시 볼게요"],
      ["연체라인", "수혜 프레임이면 연체도 같이 봐야죠"],
    ],
  },
];

const SAFE_WALL = [
  {
    id: 9152,
    symbol: "매크로",
    nickname: "채권덕후",
    holding: "관망",
    content:
      "비트·금·유가가 같은 날 움직이면 한 방향 베팅은 금물. 고용 전까지는 관망이 답이에요",
    comments: [
      ["매크로올빼미", "공통 변수는 달러·금리·고용뿐"],
      ["포지션줄임", "발표 15분만 지켜보고 움직이죠"],
    ],
  },
  {
    id: 9153,
    symbol: "비트코인",
    nickname: "온체인러",
    holding: "BTC 보유",
    content:
      "8만 다시 밟았는데 기사마다 종가가 다르네요. 거래소 하나로 맞추고, 고용 전 레버리지는 접었습니다",
    comments: [
      ["청산맵", "지지인지 숏커버인지 청산부터"],
      ["ETF추적", "유입 없이 반등이면 토할 수 있어요"],
    ],
  },
  {
    id: 9154,
    symbol: "금",
    nickname: "금벌레",
    holding: "금 ETF",
    content:
      "전날 저점에서 되돌린 자리라 4,500 안착은 고용 보고 판단할래요. 급락 반등은 숏커버일 수도",
    comments: [
      ["실질금리", "달러·실질금리 같이 풀리는지"],
      ["이틀관찰", "안착은 하루로 단정 안 함"],
    ],
  },
  {
    id: 9155,
    symbol: "은",
    nickname: "실물러",
    holding: "관심",
    content:
      "금보다 출렁여서 비중은 더 작게. 산업 수요인지 헤지인지 아직 갈림",
    comments: [
      ["금은비", "비율이 줄어드는지 볼게요"],
      ["태양광러", "산업 줄은 따로 적어야죠"],
    ],
  },
  {
    id: 9156,
    symbol: "이더리움",
    nickname: "스테이커",
    holding: "ETH 보유",
    content:
      "비트 베타로 따라온 자리. 2,500 아래면 심리선 탈환이 먼저라 알트 추격은 안 함",
    comments: [
      ["심리선", "2,500 먼저, 그다음 이야기"],
      ["알트접음", "고용 전 알트 레버리지 접었어요"],
    ],
  },
  {
    id: 9157,
    symbol: "WTI",
    nickname: "유가러",
    holding: "관심",
    content:
      "90달러가 버티면 금리 기대가 쉽게 안 내려가요. 서비스 확장이랑 같이 보는 중",
    comments: [
      ["인플레체크", "지불가격 지수랑 같이 봐야죠"],
      ["10년물", "유가·금리·위험자산 삼각"],
    ],
  },
];

const RE_WALL = [
  {
    id: 9257,
    symbol: "정책",
    nickname: "정책워처",
    holding: "관심",
    content:
      "12억 유지가 ‘감세 잔치’는 아니에요. 9억으로 깎이던 안이 철회된 완화일 뿐",
    comments: [
      ["세무사보", "국회에서 또 바뀔 수 있어요"],
      ["실수요자", "상한 150%도 같이 계산해야죠"],
    ],
  },
  {
    id: 9258,
    symbol: "종부세",
    nickname: "실수요자",
    holding: "관심",
    content:
      "실거주 14억이랑 비거주 12억 차이, 고지서로 다시 찍어봐야 체감이 옵니다",
    comments: [
      ["공동명의", "6억×2도 요건이 있어요"],
      ["전입일정", "실거주 서류부터"],
    ],
  },
  {
    id: 9259,
    symbol: "전세",
    nickname: "전세러",
    holding: "관심",
    content:
      "ISA 원상복구면 여윳돈이 집으로만 가진 않을 수도. 한도 숫자 나와야 판단 가능",
    comments: [
      ["금융상품", "계좌 유인이 생길 수는 있어요"],
      ["시행령대기", "한도 확정 전엔 단정 금지"],
    ],
  },
  {
    id: 9260,
    symbol: "매매",
    nickname: "서울러",
    holding: "관심",
    content:
      "2029년 장특 보유공제 사라지면 투자 매각 일정을 지금부터 짜야 해요",
    comments: [
      ["양도세", "거주 8%만 남는 구조로 이해"],
      ["캘린더", "매각 시점을 당겨야 할 수도"],
    ],
  },
];

function patchAnalystPosts(src, map) {
  let out = src;
  for (const [id, p] of Object.entries(map)) {
    const nid = Number(id);
    const re = new RegExp(
      `\\{ id: ${nid}, alias: "[^"]+", symbol: "[^"]+", content: "(?:\\\\.|[^"\\\\])*", likes: (\\d+), comments: (\\d+), created_at: ("[^"]+"), liked: false, \\},`,
    );
    if (!re.test(out)) throw new Error(`analyst post ${nid} not found`);
    out = out.replace(
      re,
      `{ id: ${nid}, alias: ${esc(p.alias)}, symbol: ${esc(p.symbol)}, content: ${esc(p.content)}, likes: $1, comments: $2, created_at: $3, liked: false, },`,
    );
  }
  return out;
}

function patchAnalystComments(src, map, hourPrefix) {
  let out = src;
  for (const [id, pairs] of Object.entries(map)) {
    const nid = Number(id);
    const start = out.indexOf(`  [${nid}]: [`);
    if (start === -1) throw new Error(`analyst comments ${nid} missing`);
    const end = out.indexOf("  ],", start);
    const lines = pairs.map((pair, i) => {
      const mm = String(10 + i * 7).padStart(2, "0");
      // keep roughly same timestamps family
      return `    { alias: ${esc(pair[0])}, content: ${esc(pair[1])}, created_at: "2026-09-04T${hourPrefix}:${mm}:00.000Z" },`;
    });
    const block = `  [${nid}]: [\n${lines.join("\n")}\n  ],`;
    out = out.slice(0, start) + block + out.slice(end + 4);
  }
  return out;
}

function patchWallPosts(src, exportName, rows, tVar) {
  let out = src;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const re = new RegExp(
      `\\{ id: ${r.id}, symbol: "[^"]+", nickname: "[^"]+", holdingLabel: "[^"]+", content: "(?:\\\\.|[^"\\\\])*", createdAt: ${tVar} - \\d+, likes: \\d+, comments: \\d+, \\},`,
    );
    if (!re.test(out)) throw new Error(`wall post ${r.id} not found in ${exportName}`);
    out = out.replace(
      re,
      `{ id: ${r.id}, symbol: ${esc(r.symbol)}, nickname: ${esc(r.nickname)}, holdingLabel: ${esc(r.holding)}, content: ${esc(r.content)}, createdAt: ${tVar} - ${i * 1800000}, likes: ${40 - i}, comments: 2, },`,
    );
  }
  return out;
}

function patchWallComments(src, rows, tVar) {
  let out = src;
  for (const r of rows) {
    const start = out.indexOf(`  ${r.id}: [`);
    if (start === -1) throw new Error(`wall comments ${r.id} missing`);
    const end = out.indexOf("  ],", start);
    const lines = r.comments.map((c, i) => {
      const offset = 600000 - i * 1000 + (i === 1 ? 600000 : 0);
      return `    { id: ${i + 1}, nickname: ${esc(c[0])}, holdingLabel: "관심종목", content: ${esc(c[1])}, createdAt: ${tVar} + ${offset}, likes: ${5 - i} },`;
    });
    const block = `  ${r.id}: [\n${lines.join("\n")}\n  ],`;
    out = out.slice(0, start) + block + out.slice(end + 4);
  }
  return out;
}

function disableApplyTemplates() {
  const p = path.join(ROOT, "scripts/apply-20260904.js");
  let a = fs.readFileSync(p, "utf8");
  a = a.replace(
    /function patchAnalystMarkets\(\) \{[\s\S]*?^\}/m,
    `function patchAnalystMarkets() {
  // 금지: 「종목 가격(+%)」동일 오프닝 + 「확인했습니다. 숫자부터」댓글 풀
  // → scripts/rewrite-markets-social-20260904-diverse.js / 수동 작성
  console.log("patchAnalystMarkets: skipped (template disabled)");
}`,
  );
  // uniqueWallComment already disabled; ensure commentsFor pattern can't be revived silently
  if (!a.includes("template disabled") && a.includes("확인했습니다. 숫자부터")) {
    console.warn("apply still contains template strings — review manually");
  }
  fs.writeFileSync(p, a);
  console.log("✓ apply-20260904.js analyst-markets template disabled");
}

function main() {
  const ap = path.join(ROOT, "lib/analystPosts-markets.ts");
  let a = fs.readFileSync(ap, "utf8");
  a = patchAnalystPosts(a, KR_ANALYST);
  a = patchAnalystPosts(a, SAFE_ANALYST);
  a = patchAnalystPosts(a, RE_ANALYST);
  a = patchAnalystComments(a, KR_ANALYST_CMT, "06");
  a = patchAnalystComments(a, SAFE_ANALYST_CMT, "09");
  a = patchAnalystComments(a, RE_ANALYST_CMT, "10");
  // fix remaining NFP if any
  a = a.replace(/NFP 이후/g, "비농업 고용 이후");
  fs.writeFileSync(ap, a);
  console.log("✓ analystPosts-markets.ts KR/SAFE/KR-RE");

  const wp = path.join(ROOT, "lib/wallPosts-markets.ts");
  let w = fs.readFileSync(wp, "utf8");
  w = patchWallPosts(w, "KR", KR_WALL, "T04");
  w = patchWallPosts(w, "SAFE", SAFE_WALL, "T04");
  w = patchWallPosts(w, "KR_RE", RE_WALL, "T04");
  w = patchWallComments(w, KR_WALL, "T04");
  w = patchWallComments(w, SAFE_WALL, "T04");
  w = patchWallComments(w, RE_WALL, "T04");
  fs.writeFileSync(wp, w);
  console.log("✓ wallPosts-markets.ts KR/SAFE/KR-RE");

  disableApplyTemplates();
}

main();
