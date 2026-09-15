#!/usr/bin/env node
/** Insert 2026-09-16 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20260916-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-16";
const UPDATED = "2026.09.16 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T16 = 1789513200000; // 2026.09.16 08:00 KST
const TAG = "20260916";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

function tsBlock(r) {
  const img = `/charts/${r.slug}-${TAG}.svg`;
  const imgEn = `/charts/${r.slug}-${TAG}-en.svg`;
  const pinned = r.pinned || r.isPinned ? "\n    isPinned: true," : "";
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
    date: ${JSON.stringify(DATE_DASH)},
    updatedAt: ${JSON.stringify(UPDATED)},${pinned}
    images: [${JSON.stringify(img)}],
    imagesEn: [${JSON.stringify(imgEn)}],
  }`;
}

function insertMarketReports() {
  const jobs = [
    ["lib/reports-kr.ts", "kr-seed-199", KR],
    ["lib/reports-safe.ts", "safe-seed-181", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-165", KR_RE],
  ];
  for (const [file, beforeId, arr] of jobs) {
    let c = read(file);
    if (c.includes(`id: "${arr[0].id}"`)) {
      console.log(`${file}: already inserted — skip`);
      continue;
    }
    const block = arr.map((r) => tsBlock(r)).join(",\n") + ",\n";
    const idx = c.indexOf(`id: "${beforeId}"`);
    if (idx === -1) throw new Error(`${file}: ${beforeId} not found`);
    const start = c.lastIndexOf("  {", idx);
    write(file, c.slice(0, start) + block + c.slice(start));
    console.log(`${file}: inserted ${arr[0].id}~${arr[arr.length - 1].id}`);
  }
}

function wallRows(rows, tVar) {
  return rows
    .map(
      (r, i) =>
        `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: ${tVar} - ${i * 1800000}, likes: ${44 - i}, comments: 2, },`,
    )
    .join("\n");
}

function commentPair(id, a, b) {
  return `  ${id}: [
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])}, createdAt: T16 + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T16 + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T16 =")) {
    c = c.replace(
      "const T15 = 1789426800000; // 2026-09-15 08:00 KST",
      "const T16 = 1789513200000; // 2026-09-16 08:00 KST\nconst T15 = 1789426800000; // 2026-09-15 08:00 KST",
    );
  }

  if (!c.includes("id: 9337")) {
    const kr = [
      [9337, "코스피", "육육이칠사일", "인덱스 보유", "코스피 4일연속 하락 6627.26. 외인 5일째 순매도(1.57조)"],
      [9338, "삼성전자", "삼전이오이공", "삼성전자 보유", "삼성전자 장중 25만2천까지 갔다가 결국 -0.20%로 마감. 반등 실패"],
      [9339, "SK하이닉스", "하이닉스일칠이구", "하이닉스 보유", "하이닉스도 172만9천까지 반등했다가 -0.41%. 외인 순매도 1위(1조27억)"],
      [9340, "현대차", "현대차삼육팔오", "현대차 관심", "현대차 +0.27% 반등, 기아는 -1.53%. 계열사끼리 방향 갈림"],
      [9341, "KB금융", "케이비삼일구", "KB금융 보유", "KB금융 3분기 역대최대 순익전망(하나증권 2조600억)에도 -3.19%"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T16")}\n`);
    const krC =
      commentPair(9337, ["개인팔삼일구", "관망", "개인·기타법인이 받쳤는데도 4일째 못 막음"], ["미국채오공사", "관심종목", "미10년물 2007년 이후 최고치가 배경"]) +
      commentPair(9338, ["기타법인일육", "관심종목", "기타법인이 1.6조 받아준게 그나마 다행"], ["필라델피아오팔육", "관심종목", "전날 미국 반도체지수 -5.86%였는데 국내는 선방"]) +
      commentPair(9339, ["하이닉스일칠이구", "하이닉스 보유", "오전 반등, 오후 반납 패턴 반복"], ["에이치비엠오공", "관심종목", "그래도 HBM 점유율 50%는 여전함"]) +
      commentPair(9340, ["현대차삼육팔오", "현대차 관심", "전날 -3.92% 급락 반발매수로 보임"], ["기아일이이", "관심종목", "기아는 오히려 더 밀림, 개별수급 차이"]) +
      commentPair(9341, ["케이비삼일구", "KB금융 보유", "10월말 실제실적으로 전망치 확인해야함"], ["금융주전반", "관심종목", "삼성생명도 -4.19%로 금융주 전체 약세"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9342")) {
    const safe = [
      [9342, "한장요약", "클래리티부결", "관망", "클래리티법 상원 부결·BTC 4%급락·XRP 15%↓·유가4개월최고"],
      [9343, "비트코인", "비트칠오팔오이", "BTC 보유", "클래리티법 부결직후 BTC 4.37%급락 7.58만불. ETF는 오히려 순유입"],
      [9344, "엑스알피", "엑스알피일이칠", "관심", "XRP 14.58%급락 1.27불, 주요코인중 최대낙폭. 표결전엔 2불기대감있었음"],
      [9345, "원유", "유가백팔칠오", "관심", "사우디·리비아 겹쳐서 브렌트 108.75불, 4개월최고. WTI는 4.38%↑"],
      [9346, "금", "금사이구삼", "금 ETF", "금값 4293불로 오히려 하락. 유가발 인플레우려가 금리인상전망 키움"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T16")}\n`);
    const sC =
      commentPair(9342, ["십육일게이트", "관망", "영구폐기 아니라 절차표결 실패일뿐"], ["재표결가능", "관망", "양원조정 절차 남아있어서 재추진여지 있음"]) +
      commentPair(9343, ["비트칠오팔오이", "BTC 보유", "7.4만~7.5만 구간 지켜지는지가 관건"], ["청산육칠칠", "관심", "24시간 청산 6.77억불, ETH가 가장컸음"]) +
      commentPair(9344, ["엑스알피일이칠", "관심", "레버리지 롱포지션 청산이 낙폭 키움"], ["규제기대실망", "관심", "규제명확성 최대수혜기대주였어서 실망이 더 큼"]) +
      commentPair(9345, ["유가백팔칠오", "관심", "사우디송유관 복구시점이 다음 관전포인트"], ["리비아유전", "관심", "리비아 유전가동 중단도 겹쳤음"]) +
      commentPair(9346, ["금사이구삼", "금 ETF", "10년물 금리 2007년이후 최고치가 부담"], ["중앙은행매수", "관심", "그래도 중앙은행 순매수는 2분기 62%↑"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9347")) {
    const re = [
      [9347, "한장요약", "토허이구일", "관심", "토허구역 291곳 해제·재초환 46곳 2.17조·실거주유예 1년연장 제안"],
      [9348, "토지허가", "토허해제이구일", "관심", "잠삼대청 291곳 토허구역 해제. 재건축14곳만 유지"],
      [9349, "재초환", "재초환이일칠", "관심", "서울재건축 46곳 재초환 2조1690억 예고. 조합원 반발+행정소송"],
      [9350, "실거주유예", "실거주유예일년", "관심", "여당 토허구역 실거주유예 1년더 연장 제안. 세입자있는집 대상"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T16")}\n`);
    const rC =
      commentPair(9347, ["잠삼대청이구일", "관심", "재건축14곳만 빼고 나머지는 실거주의무 없어짐"], ["재초환반발", "관심", "부담금 수억원대라 조합원 반발 커짐"]) +
      commentPair(9348, ["잠삼대청이구일", "관심", "조합설립인가 기준으로 2027년까지 순차해제"], ["압구정여의도", "관심", "압구정·여의도·목동·성수는 이번에도 유지"]) +
      commentPair(9349, ["재초환이일칠", "관심", "용산한강맨션이 6.8억으로 최고수준"], ["실거래가지수이의", "관심", "부동산원 실거래가지수 적용에 정비업계 이의제기"]) +
      commentPair(9350, ["실거주유예일년", "관심", "올해말 마감이라 연장안되면 내년거래 경색"], ["세입자계약갱신", "관심", "임대차 계약갱신 허용도 같이 제안됨"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T16 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2339")) {
    console.log("analyst markets -2339 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2339, alias: "여의도 수리 #33", symbol: "한장요약", content: "이번 주 브리핑입니다. 코스피가 미국 국채금리·국제유가 부담으로 4거래일 연속 내려 6,627.26으로 마감했습니다. 외국인이 5거래일째 순매도(1조5,735억 원)를 이어갔습니다. 미국 10년물 금리와 유가의 안정 여부가 이번 주 최대 변수입니다." },
    { id: -2340, alias: "성수 너구리 #18", symbol: "삼성전자", content: "삼성전자와 SK하이닉스가 장중 각각 1.41%, 2.73%까지 올랐다가 오후 들어 다시 밀려 약보합 마감했습니다. SK하이닉스는 또 외국인 순매도 1위(1조27억 원)에 올랐습니다. 두 회사의 자사주 매입이 매도 물량 일부를 받아냈습니다." },
    { id: -2341, alias: "판교 치타 #26", symbol: "현대차", content: "현대차가 전날 급락에 대한 반발 매수로 0.27% 오른 반면 기아는 1.53% 내려 계열사끼리 방향이 갈렸습니다. 두 회사 모두 미국 현지 생산 기반이 있어 관세 리스크 대응력은 있다는 평가입니다." },
    { id: -2342, alias: "삼성동 여우 #12", symbol: "KB금융", content: "KB금융이 하나증권의 3분기 역대 최대 순익 전망(2조600억 원)에도 3.19% 내렸습니다. 시장 전체 하락 압력이 개별 종목의 좋은 소식을 압도한 하루였습니다. 10월 말 실제 실적으로 전망치를 확인해야 합니다." },
  ];

  const SAFE_POSTS = [
    { id: -2343, alias: "온체인 매 #07", symbol: "한장요약", content: "미국 상원이 클래리티법 절차표결을 부결시키면서 비트코인이 4% 넘게 급락하고 엑스알피는 14.58% 급락했습니다. 국제유가는 사우디·리비아 공급차질로 4개월 만에 최고치를 찍었고 금값은 오히려 내렸습니다. 이번 주 FOMC 결과가 다음 방향을 정합니다." },
    { id: -2344, alias: "금벌레 학 #19", symbol: "비트코인", content: "비트코인이 클래리티법 부결 직후 4.37% 급락해 7만5,852달러를 기록했습니다. 다만 현물 ETF에는 2억7,275만 달러가 순유입돼 저가 매수 수요도 일부 확인됩니다. 7만4,000~7만5,000달러 구간 방어 여부가 다음 관전 포인트입니다." },
    { id: -2345, alias: "알트 수달 #25", symbol: "엑스알피", content: "엑스알피가 14.58% 급락해 주요 디지털자산 중 가장 큰 낙폭을 기록했습니다. 규제 명확성의 최대 수혜 기대주였던 만큼 실망 매물도 가장 크게 몰렸습니다. 이번 표결 실패가 영구 폐기는 아니라는 점도 함께 봐야 합니다." },
    { id: -2346, alias: "은빛 갈매기 #09", symbol: "원유·금", content: "국제유가는 사우디·리비아 공급차질로 4개월 만에 최고치(브렌트 108.75달러)를 찍었지만 금값은 인플레 우려로 오른 금리 부담에 눌려 4,293달러까지 내렸습니다. 두 자산이 반대로 움직인 하루였습니다." },
  ];

  const RE_POSTS = [
    { id: -2347, alias: "전세 참새 #06", symbol: "한장요약", content: "정부가 잠실·삼성·대치·청담 아파트 291곳의 토지거래허가구역을 해제했지만 재건축 14곳은 유지했습니다. 서울 재건축 46곳에는 재초환 부담금 2조1,690억 원이 예고됐습니다. 여당은 실거주 의무 유예를 1년 더 연장하자고 제안했습니다." },
    { id: -2348, alias: "갱신 백로 #37", symbol: "토지허가", content: "잠실·삼성·대치·청담 아파트 305곳 가운데 291곳이 토지거래허가구역에서 풀렸습니다. 안전진단 통과 재건축 14곳만 투기 우려로 지정이 유지됩니다. 2027년까지 조합설립인가 기준으로 순차 해제될 예정입니다." },
    { id: -2349, alias: "매물 학 #20", symbol: "재초환", content: "서울 재건축 46곳에 재초환 부담금 2조1,690억 원이 예고돼 조합원 반발이 커지고 있습니다. 용산 한강맨션은 1인당 최대 6억8,000만 원에 달합니다. 정비업계는 부담금 산정 방식에 이의를 제기하며 행정소송을 준비하고 있습니다." },
    { id: -2350, alias: "정책 너구리 #23", symbol: "실거주유예", content: "여당이 토지거래허가구역 내 실거주 의무 유예를 내년까지 1년 더 연장하고 계약갱신도 허용하자고 제안했습니다. 현재 유예 신청 기한은 올해 말까지라, 연장 없이는 내년 거래가 다시 경색될 수 있습니다." },
  ];

  const KR_COMMENTS = {
    [-2339]: [
      ["인천 갈매기 #58", "개인과 기타법인이 받쳤는데도 4일째 하락을 못 막았습니다."],
      ["합정 수달 #13", "미 10년물 금리가 2007년 이후 최고치까지 오른 게 배경입니다."],
    ],
    [-2340]: [
      ["마포 살괭이 #14", "필라델피아 반도체지수가 전날 5.86% 빠졌는데 국내는 선방했습니다."],
      ["판교 늑대 #96", "HBM 점유율 확대 흐름 자체는 훼손되지 않았습니다."],
    ],
    [-2341]: [
      ["인천 갈매기 #58", "전날 두 회사 모두 관세·수요 우려로 동반 급락했었습니다."],
      ["압구정 치타 #50", "조지아 등 현지 생산기반이 관세 대응력을 높여줍니다."],
    ],
    [-2342]: [
      ["잠실 백로 #35", "삼성생명도 -4.19%로 금융주 전반이 약세였습니다."],
      ["청담 여우 #17", "대출성장과 일회성비용 소멸이 순익전망의 핵심 배경입니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2343]: [
      ["종로 까치 #47", "영구폐기가 아니라 절차표결 실패라는 점을 다시 짚습니다."],
      ["광화문 여우 #68", "이번주 FOMC 전까지는 관망 흐름이 이어질 듯합니다."],
    ],
    [-2344]: [
      ["여의도 수리 #34", "ETF 순유입은 저가매수 수요가 일부 유지됐다는 신호입니다."],
      ["송파 독수리 #72", "24시간 청산 6.77억달러 중 ETH가 가장 컸습니다."],
    ],
    [-2345]: [
      ["역삼 판다 #83", "레버리지 롱포지션 청산이 낙폭을 더 키웠습니다."],
      ["해운대 고래 #09", "재표결 시도와 후속 소송 여부를 지켜봐야 합니다."],
    ],
    [-2346]: [
      ["분당 매 #37", "10년물 금리 상승이 금 보유의 기회비용을 키웠습니다."],
      ["한남 재규어 #33", "중앙은행 순매수는 2분기 기준 62% 늘었습니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2347]: [
      ["성수 너구리 #21", "해제와 부담금 부과가 같은 날 동시에 나온 점이 특징입니다."],
      ["삼성동 올빼미 #25", "실거주유예 제안이 실제 법제화로 이어지는지 지켜보겠습니다."],
    ],
    [-2348]: [
      ["역삼 판다 #83", "압구정·여의도·목동·성수는 이번에도 지정이 유지됐습니다."],
      ["해운대 고래 #09", "해제 이후 실제 거래량 변화를 확인해야 합니다."],
    ],
    [-2349]: [
      ["한남 재규어 #33", "래미안 트리니원은 1인당 3.2억원 수준입니다."],
      ["마포 살괭이 #14", "행정소송 결과에 따라 부담금이 조정될 수 있습니다."],
    ],
    [-2350]: [
      ["삼성동 올빼미 #25", "연말 시한을 앞두고 있어 국회 처리 속도가 중요합니다."],
      ["판교 늑대 #96", "계약갱신 허용까지 통과되면 세입자 부담도 줄어듭니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-16 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-16T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-16 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-16T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-16T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
      out += `  ],\n`;
    }
    return out;
  }

  c = c.replace(
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n",
    `export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n${postsBlock("KR", KR_POSTS, 6)}`,
  );
  c = c.replace(
    "export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n",
    `export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n${postsBlock("SAFE", SAFE_POSTS, 9)}`,
  );
  c = c.replace(
    "export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n",
    `export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n${postsBlock("KR-RE", RE_POSTS, 10)}`,
  );

  c = c.replace(
    "export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n",
    `export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {\n${commentsBlock("KR", KR_COMMENTS, 6)}`,
  );
  c = c.replace(
    "export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n",
    `export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {\n${commentsBlock("SAFE", SAFE_COMMENTS, 9)}`,
  );
  c = c.replace(
    "export const MOCK_ANALYST_COMMENTS_KR_RE: Record<number, AnalystMockComment[]> = {\n",
    `export const MOCK_ANALYST_COMMENTS_KR_RE: Record<number, AnalystMockComment[]> = {\n${commentsBlock("KR-RE", RE_COMMENTS, 10)}`,
  );

  write("lib/analystPosts-markets.ts", c);
  console.log("analystPosts-markets: -2339~-2342, -2343~-2346, -2347~-2350");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260916-markets done");
}

main();
