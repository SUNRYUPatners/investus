#!/usr/bin/env node
/** Insert 2026-09-15 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20260915-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-15";
const UPDATED = "2026.09.15 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T15 = 1789426800000; // 2026.09.15 08:00 KST
const TAG = "20260915";

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
    ["lib/reports-kr.ts", "kr-seed-192", KR],
    ["lib/reports-safe.ts", "safe-seed-176", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-160", KR_RE],
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
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])}, createdAt: T15 + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T15 + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T15 =")) {
    c = c.replace(
      "const T14 = 1789340400000; // 2026-09-14 08:00 KST",
      "const T15 = 1789426800000; // 2026-09-15 08:00 KST\nconst T14 = 1789340400000; // 2026-09-14 08:00 KST",
    );
  }

  if (!c.includes("id: 9321")) {
    const kr = [
      [9321, "코스피", "육육팔사급락", "인덱스 보유", "유가·금리 겹쳐서 코스피 3.26% 급락, 6684까지 밀림. 외인 3.3조 팔았음"],
      [9322, "삼성전자", "삼성사공사", "삼성전자 보유", "삼성 -4.05%, 외인 순매도 2위(8482억). 개별악재 아니라 매크로 충격이라는 평"],
      [9323, "SK하이닉스", "하이닉스육삼오", "하이닉스 보유", "하이닉스 -6.35%, 외인 순매도 1위(2조652억). ADR은 오히려 +0.94%"],
      [9324, "코스피", "사우디송유관", "관심종목", "사우디 동서송유관 멈춰서 유가 108불. 미10년물도 4.99%까지 뜀"],
      [9325, "현대차", "현대차반토막", "현대차 관심", "현대차 -2.88%, 6월고점대비 반토막. 트럼프 중국차 미국생산 시사발언 겹침"],
      [9326, "KB금융", "케이비이조육백", "KB금융 보유", "하나증권 KB금융 3분기 순익 2조600억 전망(역대최대). 근데 시장하락에 눌려 소폭↓"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T15")}\n`);
    const krC =
      commentPair(9321, ["개인이조구칠", "관망", "개인이 2.97조 받쳤는데도 못 막음"], ["기관일일칠", "관심종목", "기관도 1.17조 팔아서 다같이 눌림"]) +
      commentPair(9322, ["삼성사공사", "삼성전자 보유", "기타법인이 1.4조 받아준게 그나마 다행"], ["메모리업종전체", "관심종목", "코스피 전기전자 업종 전체가 매도우위"]) +
      commentPair(9323, ["하이닉스육삼오", "하이닉스 보유", "오른만큼 되돌림도 큰 고베타 특징"], ["에이치비엠오공", "관심종목", "그래도 HBM 점유율 50%는 여전함"]) +
      commentPair(9324, ["사우디송유관", "관심종목", "복구까지 3~6주 걸린다는 전망"], ["호르무즈연기", "관심종목", "이란·GCC 회담도 갑자기 연기됨"]) +
      commentPair(9325, ["현대차반토막", "현대차 관심", "아직 인터뷰 발언이지 정책은 아님"], ["조지아공장", "관심종목", "조지아 현지생산 기반은 이미 있음"]) +
      commentPair(9326, ["케이비이조육백", "KB금융 보유", "10월말 실제 실적으로 확인해야함"], ["은행최선호주", "관심종목", "은행업종 내 최선호주 의견은 유지됨"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9327")) {
    const safe = [
      [9327, "한장요약", "안전자산화요", "관망", "BTC 7.9만 회복·금 4278 한달최저·유가 108불. FOMC가 이번주 전부 좌우"],
      [9328, "비트코인", "칠구삼구구", "BTC 보유", "주말 7.6만까지 밀렸다가 7.9만대 반등. FOMC인상확률은 92.7%로 뜀"],
      [9329, "금", "금사천이칠팔", "금 ETF", "금값 4278~4298, 한달여만 최저. 금리인상기대+유가급등 겹침"],
      [9330, "이더리움", "이더이오일삼", "관심", "이더 2513달러, 클래리티법 표결 앞두고 관망. ETF는 오히려 유입중"],
      [9331, "원유", "유가백팔달러", "관심", "사우디 송유관 끊겨서 유가 108불. 올해 누적 77% 폭등"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T15")}\n`);
    const sC =
      commentPair(9327, ["십육일게이트", "관망", "FOMC랑 클래리티법 표결 겹치는 한주"], ["안전자산화요", "관망", "금은 내리고 BTC는 오르고 엇갈림"]) +
      commentPair(9328, ["칠구삼구구", "BTC 보유", "탐욕공포지수 70이면 탐욕구간"], ["이티에프유출", "관심", "BTC ETF는 빠지고 ETH ETF는 들어옴"]) +
      commentPair(9329, ["금사천이칠팔", "금 ETF", "중앙은행 순매수는 62%나 늘었음"], ["실질금리부담", "관심", "10년물 4.97~4.99%가 기회비용 키움"]) +
      commentPair(9330, ["이더이오일삼", "관심", "저항선 2542~2550이 다음 관문"], ["클래리티법", "관심", "초당적 지지 부족해서 통과 불확실"]) +
      commentPair(9331, ["유가백팔달러", "관심", "얀부항 비축유 5~7일치뿐이라 급함"], ["복구삼육주", "관심", "복구는 3~6주 걸린다는 전망"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9332")) {
    const re = [
      [9332, "한장요약", "부동산팔육주", "관심", "서울 86주 연속 상승·종부세 14억/12억 확정·월세보증금 6개월째↑"],
      [9333, "매매", "팔육주기록", "관심", "서울아파트 86주 연속 상승, 문재인정부때 기록 넘음. 강남3구는 5주째 하락"],
      [9334, "종부세", "종부세일사일이", "관심", "1주택 종부세 공제 실거주14억·비거주12억 확정. 9억 축소안은 철회됨"],
      [9335, "월세", "월세일구오칠", "월세", "서울 월세보증금 6개월 연속↑, 1.96억. 토허구역 실거주의무가 배경"],
      [9336, "임대주택", "보편형삼육천", "관심", "국토부 내년 임대주택 3만6천가구 공급, 6.2조 투입. 절반이상 청년배정"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T15")}\n`);
    const rC =
      commentPair(9332, ["강북외곽강세", "관심", "강북 강세·강남 약세 양극화가 특징"], ["세부담상한", "관심", "세부담상한 150% 유지된게 완화포인트"]) +
      commentPair(9333, ["팔육주기록", "관심", "누적상승률은 옛 기록의 2배(17.164%)"], ["재건축조정", "관심", "강남·서초는 재건축 매물 조정중"]) +
      commentPair(9334, ["종부세일사일이", "관심", "정기국회 심사에서 세부기준 또 바뀔수 있음"], ["전세대출제한", "관심", "내년1월 비거주 전세대출제한도 같이 봐야함"]) +
      commentPair(9335, ["월세일구오칠", "월세", "반전세 확대가 보증금 상승 배경"], ["강동이칠삼", "관심", "강동구가 273만원으로 가장 크게 뜀"]) +
      commentPair(9336, ["보편형삼육천", "관심", "착공부터 입주까지 몇년 걸림"], ["역세권중형", "관심", "역세권·중형평수로 기존 임대와 다름"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T15 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2323")) {
    console.log("analyst markets -2323 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2323, alias: "여의도 너구리 #13", symbol: "한장요약", content: "이번 주 브리핑입니다. 코스피가 유가·금리 충격에 3.26% 급락해 6,684.37로 마감했습니다. 외국인이 3조2,875억 원, 기관이 1조1,715억 원을 순매도했습니다. 9월 16일 FOMC 결과가 이번 주 최대 변수입니다." },
    { id: -2324, alias: "성수 수달 #37", symbol: "삼성전자", content: "삼성전자가 4.05% 내린 24만9,000원으로 마감했습니다. 외국인 순매도 2위(8,482억 원)에 올랐습니다. 개별 악재가 아니라 유가·금리·AI 속도조절론이 겹친 매크로 충격으로 풀이됩니다." },
    { id: -2325, alias: "판교 치타 #24", symbol: "SK하이닉스", content: "SK하이닉스가 6.35% 급락해 외국인 순매도 1위(2조652억 원)에 올랐습니다. 코스피 전체보다 두 배 가까이 크게 내렸습니다. HBM 점유율 50%는 여전히 유지하고 있습니다." },
    { id: -2326, alias: "삼성동 여우 #10", symbol: "코스피", content: "사우디 동서송유관 중단으로 국제유가가 108달러까지 올랐고, 미 10년물 금리도 4.99%까지 뛰었습니다. FOMC 인상 확률도 87~93%까지 반영됐습니다. 세 부담이 겹쳐 코스피가 흔들렸습니다." },
    { id: -2327, alias: "잠실 백로 #31", symbol: "현대차", content: "현대차가 2.88% 내려 6월 고점 대비 반토막(-50.47%) 수준입니다. 트럼프 대통령의 중국차 미국생산 허용 시사 발언과 유가 급등이 겹쳤습니다. 아직 구체적 정책은 아닌 인터뷰 발언입니다." },
    { id: -2328, alias: "광화문 물총새 #08", symbol: "KB금융", content: "하나증권이 KB금융의 3분기 순이익을 2조600억 원(전년 대비 22% 증가, 역대 최대)으로 전망하며 목표주가를 23만5,000원으로 올렸습니다. 다만 시장 전체 급락에 눌려 주가는 소폭 내렸습니다." },
  ];

  const SAFE_POSTS = [
    { id: -2329, alias: "온체인 매 #05", symbol: "한장요약", content: "비트코인이 주말 저점에서 반등해 7만9,000달러대를 회복했습니다. 금은 한 달여 만에 최저치(4,278~4,298달러)로 내렸고, 유가는 108달러까지 올랐습니다. 9월 16일 FOMC 결과가 모든 안전자산의 다음 방향을 정합니다." },
    { id: -2330, alias: "금벌레 학 #16", symbol: "비트코인", content: "비트코인이 주말 7만6,464달러까지 급락한 뒤 7만9,399달러까지 반등(+2.72%)했습니다. FOMC 인상 확률이 92.7%까지 오른 점이 상승을 제한하는 변수입니다." },
    { id: -2331, alias: "달러 올빼미 #11", symbol: "금", content: "금값이 4,278~4,298달러로 8월 7일 이후 최저치입니다. 금리인상 기대와 유가 급등이 기회비용을 높였습니다. 다만 중앙은행 순매수가 2분기에 62% 늘어 장기 수요는 견고합니다." },
    { id: -2332, alias: "알트 수달 #23", symbol: "이더리움", content: "이더리움이 2,513달러 부근에서 상원의 클래리티법 표결과 FOMC를 동시에 기다리고 있습니다. 비트코인 ETF는 자금이 빠져나가는데 이더리움 ETF에는 꾸준히 들어와 대조적입니다." },
    { id: -2333, alias: "은빛 갈매기 #07", symbol: "원유", content: "사우디 동서송유관 중단과 호르무즈 회담 연기로 국제유가가 108달러까지 올랐습니다. 올해 들어서만 누적 77% 폭등한 상태입니다. 복구까지 3~6주 걸릴 것으로 업계는 내다봤습니다." },
  ];

  const RE_POSTS = [
    { id: -2334, alias: "전세 참새 #04", symbol: "한장요약", content: "서울 아파트값이 86주 연속 올라 역대 최장 기록을 세웠습니다. 정부는 1주택 종부세 기본공제를 실거주 14억·비거주 12억으로 확정했습니다. 월세 보증금도 6개월 연속 오르고 있습니다." },
    { id: -2335, alias: "갱신 백로 #35", symbol: "매매", content: "서울 아파트값이 86주 연속 올라 문재인 정부 시절 기록(85주)을 넘었습니다. 86주간 누적 상승률은 17.164%로 이전 기록의 2배입니다. 다만 강남3구는 5주 연속 하락 중입니다." },
    { id: -2336, alias: "매물 학 #18", symbol: "종부세", content: "정부가 세제개편안을 확정해 1주택 종부세 기본공제를 실거주 14억 원, 비거주 12억 원으로 정리했습니다. 비거주 9억 축소안은 철회됐고 세부담상한도 150%로 유지됩니다." },
    { id: -2337, alias: "정책 너구리 #21", symbol: "월세", content: "서울 아파트 월세 보증금이 6개월 연속 올라 평균 1억9,557만 원입니다. 토지거래허가구역의 실거주 의무로 전세 물량이 줄고 반전세가 늘어난 것이 배경입니다." },
    { id: -2338, alias: "월세 여우 #29", symbol: "임대주택", content: "국토교통부가 내년 주택 공급에 30조 원을 투입하며 보편형 임대주택 3만6,000가구를 새로 공급합니다. 역세권·중형 평수 중심이며 절반 이상을 청년에게 배정합니다." },
  ];

  const KR_COMMENTS = {
    [-2323]: [
      ["인천 갈매기 #54", "개인이 2조9,722억 원을 사들이며 하단을 받쳤습니다."],
      ["합정 수달 #09", "유가·금리·AI 속도조절론 세 가지가 동시에 겹친 하루였습니다."],
    ],
    [-2324]: [
      ["마포 살괭이 #10", "기타법인이 1조4,306억 원을 받아준 점도 함께 봅니다."],
      ["판교 늑대 #92", "HBM 점유율 확대 흐름 자체는 훼손되지 않았습니다."],
    ],
    [-2325]: [
      ["인천 갈매기 #54", "매출이 줄어든 게 아니라 오른 만큼의 되돌림입니다."],
      ["압구정 치타 #46", "ADR은 오히려 올라 국내외 반응이 엇갈렸습니다."],
    ],
    [-2326]: [
      ["잠실 백로 #31", "송유관 복구는 3~6주 걸릴 것으로 업계는 내다봤습니다."],
      ["청담 여우 #13", "9월 16일 FOMC 결과가 다음 확인 포인트입니다."],
    ],
    [-2327]: [
      ["성북 참새 #35", "조지아 등 현지 생산 기반이 대응력을 높여줍니다."],
      ["노원 기러기 #23", "24일 미중 정상회담에서 실제 논의되는지가 관건입니다."],
    ],
    [-2328]: [
      ["여의도 수리 #30", "10월 말 실제 3분기 실적으로 전망치를 확인해야 합니다."],
      ["송파 독수리 #68", "은행업종 내 최선호주 의견은 그대로 유지됐습니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2329]: [
      ["종로 까치 #43", "네 자산 신호가 서로 다른 방향이라 한 줄로 묶지 않겠습니다."],
      ["광화문 여우 #64", "FOMC 전까지는 대체로 관망 국면입니다."],
    ],
    [-2330]: [
      ["여의도 수리 #30", "탐욕·공포지수 70은 탐욕 구간에 해당합니다."],
      ["송파 독수리 #68", "ETF 자금은 비트코인에서 빠지고 이더리움으로 옮겨갔습니다."],
    ],
    [-2331]: [
      ["분당 매 #33", "실질금리 부담과 중앙은행 매수가 서로 상쇄되는 구간입니다."],
      ["한남 재규어 #29", "8월 7일 이후 최저치라는 점을 함께 기억할 만합니다."],
    ],
    [-2332]: [
      ["역삼 판다 #79", "클래리티법은 초당적 지지가 부족해 통과가 불확실합니다."],
      ["해운대 고래 #05", "저항선 2,542~2,550달러 돌파 여부를 지켜봅니다."],
    ],
    [-2333]: [
      ["한남 재규어 #29", "여름 저점 대비로는 이미 50% 급등한 구간입니다."],
      ["마포 살괭이 #10", "호르무즈 협상이 재개되는지가 다음 변수입니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2334]: [
      ["분당 매 #33", "세 신호를 하나의 방향으로 단정하지 않겠습니다."],
      ["한남 재규어 #29", "정기국회 심사에서 세부 기준이 다시 조정될 수 있습니다."],
    ],
    [-2335]: [
      ["성수 너구리 #17", "강북·외곽 강세와 강남 약세가 함께 나타나는 양극화입니다."],
      ["삼성동 올빼미 #21", "다음 주 87주 연속 상승 여부를 확인하겠습니다."],
    ],
    [-2336]: [
      ["역삼 판다 #79", "종부세율 인상 등 다른 요인은 그대로 유지됐습니다."],
      ["해운대 고래 #05", "내년 1월 시행되는 전세대출 제한과도 맞물려 있습니다."],
    ],
    [-2337]: [
      ["한남 재규어 #29", "강동구가 273만 원으로 가장 크게 올랐습니다."],
      ["마포 살괭이 #10", "반전세 확대가 보증금 상승의 핵심 배경입니다."],
    ],
    [-2338]: [
      ["삼성동 올빼미 #21", "착공부터 입주까지 몇 년이 걸리는 중장기 대책입니다."],
      ["판교 늑대 #92", "예산의 국회 심의 통과 여부를 지켜보겠습니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-15 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-15T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-15 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-15T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-15T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("analystPosts-markets: -2323~-2328, -2329~-2333, -2334~-2338");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260915-markets done");
}

main();
