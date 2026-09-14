#!/usr/bin/env node
/** Insert 2026-09-14 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KRRE } = require("./data-20260914-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-14";
const UPDATED = "2026.09.14 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T14 = 1789340400000; // 2026.09.14 08:00 KST
const TAG = "20260914";

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

function replaceReportRange(c, firstId, nextId, block) {
  const first = c.indexOf(`id: "${firstId}"`);
  const next = c.indexOf(`id: "${nextId}"`);
  if (first === -1 || next === -1) return null;
  const start = c.lastIndexOf("  {", first);
  const end = c.lastIndexOf("  {", next);
  return c.slice(0, start) + block + c.slice(end);
}

function insertMarketReports() {
  const jobs = [
    ["lib/reports-kr.ts", "kr-seed-185", KR],
    ["lib/reports-safe.ts", "safe-seed-170", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-155", KRRE],
  ];
  for (const [file, beforeId, arr] of jobs) {
    let c = read(file);
    const block = arr.map((r) => tsBlock(r)).join(",\n") + ",\n";
    if (c.includes(`id: "${arr[0].id}"`)) {
      const next = replaceReportRange(c, arr[0].id, beforeId, block);
      if (!next) throw new Error(`${file}: failed to replace ${arr[0].id}~${beforeId}`);
      write(file, next);
      console.log(`${file}: replaced ${arr[0].id}~${arr[arr.length - 1].id}`);
      continue;
    }
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
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])}, createdAt: T14 + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T14 + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T14 =")) {
    c = c.replace(
      "const T12 = 1789167600000; // 2026-09-12 08:00 KST",
      "const T14 = 1789340400000; // 2026-09-14 08:00 KST\nconst T12 = 1789167600000; // 2026-09-12 08:00 KST",
    );
  }

  if (!c.includes("id: 9303")) {
    const kr = [
      [9303, "코스피", "칠천피재도전", "인덱스 보유", "지난주 아스트라 효과로 7000 뚫었다가 유가·금리에 6909까지 밀림. 이번주 FOMC가 다음 방향키"],
      [9304, "삼성전자", "삼성HBM삼삼", "삼성전자 보유", "HBM 점유율 21→33%. 하이닉스랑 격차 37p에서 17p로 좁혀짐. 하반기 HBM4가 다음 승부처"],
      [9305, "SK하이닉스", "하이닉스오공", "하이닉스 보유", "여전히 1위 50%인데 전분기 58%보다 빠짐. 삼성 추격이 매출 자체 감소는 아님"],
      [9306, "코스피", "밴드육사칠사", "관심종목", "이번주 예상밴드 6400~7400. FOMC 점도표·의장 톤이 유가보다 더 중요할 듯"],
      [9307, "코스피", "아스트라효과", "관심종목", "오픈AI 아스트라 나오고 반도체 투자심리 살아서 7000 넘었었음. 근데 유가에 눌림"],
      [9308, "LG에너지솔루션", "엔솔ESS육조", "엔솔 보유", "테슬라 메가팩 6조 수주. ESS 매출 4.6배 늘어서 전기차 캐즘 보완중"],
      [9309, "현대차", "투트랙이팔이구", "현대차 관심", "2028 엔비디아 먼저, 2029 자체기술 아트리아AI. 포티투닷이랑 같이 개발"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T14")}\n`);
    const krC =
      commentPair(9303, ["개인일팔조", "관망", "개인이 하단 받쳐준게 그나마 다행"], ["외인이조삼", "관심종목", "외인 2.3조 매도는 차익실현 느낌"]) +
      commentPair(9304, ["삼성HBM삼삼", "삼성전자 보유", "HBM4 출하 본격화되면 또 바뀔수도"], ["메모리날씨", "관심종목", "마이크론도 18%로 소폭 빠짐"]) +
      commentPair(9305, ["하이닉스오공", "하이닉스 보유", "시장 전체가 커져서 퍼센트만 준거"], ["엔비디아협력사", "관심종목", "엔비디아 협력사 지위가 여전히 강점"]) +
      commentPair(9306, ["밴드육사칠사", "관심종목", "매파신호 나오면 밴드 하단 테스트할듯"], ["점도표대기", "관심종목", "관심업종은 반도체·ESS·증권 언급됨"]) +
      commentPair(9307, ["아스트라효과", "관심종목", "실제 수주로 이어지는지가 진짜 확인"], ["캐펙스기대", "관심종목", "실제 계약 발표 이어지는지 지켜봄"]) +
      commentPair(9308, ["엔솔ESS육조", "엔솔 보유", "북미 생산능력 50GWh 목표가 핵심"], ["캐즘보완", "관심종목", "삼성SDI도 LFP로 라인 전환중"]) +
      commentPair(9309, ["투트랙이팔이구", "현대차 관심", "첫 출시 모델이 뭐가 될지가 관심"], ["아트리아AI", "관심종목", "아트리아 주행데이터 나오면 신뢰 오를듯"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9310")) {
    const safe = [
      [9310, "한장요약", "세이프브리핑", "관망", "BTC 7.7만권·금 4330~4350·유가 100달러대. 이번주 FOMC가 전부 좌우"],
      [9311, "비트코인", "칠만칠천대기", "BTC 보유", "코인마켓캡 77255, OKX는 76985까지 밀림. 이더가 더 크게 빠짐"],
      [9312, "금", "사천삼백지지선", "금 ETF", "10년물 4.96%인데도 중동 긴장 덕에 4330 지지. 저항은 4400"],
      [9313, "이더리움", "이더이오공오", "관심", "2505달러, 비트보다 더 밀림. 파생거래량 늘어서 단타수요 커짐"],
      [9314, "원유", "호르무즈기대", "관심", "브렌트 104.61·WTI 100.05로 2%대 내림. 그래도 100달러 위"],
      [9315, "달러", "스테이블국채", "관심", "코인베이스 CEO가 스테이블코인이 국채 구조적 매수자래"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T14")}\n`);
    const sC =
      commentPair(9310, ["십육일게이트", "관망", "금리 오르면 무이자자산 다 부담"], ["세이프브리핑", "관망", "달러·금리가 공통 변수라 다 같이 움직임"]) +
      commentPair(9311, ["칠만칠천대기", "BTC 보유", "8만 안착이 다음 확인포인트"], ["국내가격차", "관심", "국내는 1억467만원대"]) +
      commentPair(9312, ["사천삼백지지선", "금 ETF", "실질금리가 다음 힌트"], ["달러인덱스구구", "관심", "달러인덱스 99라 중립적"]) +
      commentPair(9313, ["이더이오공오", "관심", "2500선 지키는지가 주말숙제"], ["점유율이동", "관심", "비트코인 점유율은 오히려 커짐"]) +
      commentPair(9314, ["호르무즈기대", "관심", "8월 저점 68.55에서 50% 급등한거임"], ["고위급회동", "관심", "GCC랑 이란 고위급 만난건 2월 이후 처음"]) +
      commentPair(9315, ["스테이블국채", "관심", "테더·서클 준비금 비중 봐야함"], ["국채신규매수", "관심", "국채시장에 새 매수층 생긴셈"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9316")) {
    const re = [
      [9316, "한장요약", "부동산브리핑", "관심", "전세매물 -12.2%, 매매 -60%, 월세 160만원. 세 신호 다 다른 방향"],
      [9317, "전세", "노도강매물감소", "전세", "중랑 -71.6%로 제일 크게 줄음. 8월 전셋값 7.1억 또 최고치"],
      [9318, "매매", "강남비중구일", "관심", "8월 거래 2322건, 강남3구 비중 9.1%로 역대최저. 분당·광명이 더 올랐음"],
      [9319, "정책", "토허삼공일이", "관심", "토허신청 3012건, 34.8% 감소. 4개월 연속 줄음. 세제개편 지연이 배경"],
      [9320, "전세", "월세백육십만", "월세", "전세 줄고 월세 오름. 세제개편 이후 집주인들 절세용 전환 늘음"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T14")}\n`);
    const rC =
      commentPair(9316, ["키맞춤성북", "관심", "평균만 보면 강남 조정 안보임"], ["가을이사", "관심", "노원·성북 강북 전세가 더 뜀"]) +
      commentPair(9317, ["노도강매물감소", "전세", "노원·성북 강북 전세가 더 뜀"], ["분당일위", "관심", "분당 29.5%가 전국 1위 상승"]) +
      commentPair(9318, ["강남비중구일", "관심", "분당 29.5%가 전국 1위 상승"], ["실거주유예", "관심", "실거주유예 신청은 아직 4.5%뿐"]) +
      commentPair(9319, ["토허삼공일이", "관심", "실거주유예 신청은 아직 4.5%뿐"], ["보증금기회비용", "관심", "보증금 부담 줄지만 매달 나감"]) +
      commentPair(9320, ["월세백육십만", "월세", "보증금 부담 줄지만 매달 나감"], ["한도조회부터", "관심", "한도조회부터 하는게 순서"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T14 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2305")) {
    console.log("analyst markets -2305 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2305, alias: "여의도 너구리 #13", symbol: "한장요약", content: "이번 주 브리핑입니다. 코스피는 지난 금요일 6,909.91(-1.76%)로 마감하며 아스트라 효과로 넘었던 7,000선을 다시 내줬습니다. 15~16일 미국 FOMC가 이번 주 최대 변수이며, 증권사들은 6,400~7,400의 넓은 밴드를 제시했습니다." },
    { id: -2306, alias: "성수 수달 #37", symbol: "삼성전자", content: "삼성전자 HBM 점유율이 21%에서 33%로 올랐습니다. SK하이닉스와 격차는 37%포인트에서 17%포인트로 좁혀졌습니다. 하반기 HBM4 출하 확대가 다음 관찰 포인트입니다." },
    { id: -2307, alias: "판교 치타 #24", symbol: "SK하이닉스", content: "SK하이닉스는 50%로 여전히 1위입니다. 다만 전분기 58%보다는 낮아졌습니다. 시장 전체가 커지는 가운데 삼성전자가 성장분을 더 가져간 결과로 풀이됩니다." },
    { id: -2308, alias: "삼성동 여우 #10", symbol: "코스피", content: "이번 주 코스피는 FOMC·유가·금리 삼중 변수를 앞두고 있습니다. NH투자증권은 6,400~7,400 밴드를 제시했습니다. 점도표와 의장 발언 톤이 유가보다 더 중요하다는 의견이 많습니다." },
    { id: -2309, alias: "잠실 백로 #31", symbol: "코스피", content: "오픈AI의 아스트라 공개로 국내 반도체 투자심리가 살았습니다. 이 영향으로 코스피가 지난 9일 7,000선을 넘었지만, 유가·금리 부담에 되돌림이 나왔습니다." },
    { id: -2310, alias: "광화문 물총새 #08", symbol: "LG에너지솔루션", content: "LG에너지솔루션이 테슬라와 약 6조 원 규모 ESS 계약을 맺었습니다. ESS 매출이 1년 전보다 4.6배 늘며 전기차 캐즘을 보완하고 있습니다." },
    { id: -2311, alias: "한남 두루미 #19", symbol: "현대차", content: "현대차그룹이 2028년 엔비디아 기술, 2029년 자체 기술 '아트리아 AI'를 쓰는 투 트랙 전략을 밝혔습니다. 포티투닷은 5년 안에 데이터양을 추월할 수 있다고 말했습니다." },
  ];

  const SAFE_POSTS = [
    { id: -2312, alias: "온체인 매 #05", symbol: "한장요약", content: "비트코인 7만 7천 달러권, 금 4,330~4,350달러, 유가 100달러대가 이번 주 한 표입니다. FOMC 결과가 모든 안전자산의 다음 방향을 가를 변수입니다." },
    { id: -2313, alias: "금벌레 학 #16", symbol: "비트코인", content: "비트코인이 코인마켓캡 기준 7만 7,255달러에서 OKX 기준 7만 6,985달러까지 내렸습니다. 이더리움이 더 크게 밀리며 비트코인 점유율이 오히려 커졌습니다." },
    { id: -2314, alias: "달러 올빼미 #11", symbol: "금", content: "금값이 4,330~4,350달러권입니다. 미 10년물 금리 4.96%가 부담이지만 중동 긴장이 하락을 막고 있습니다. 지지선 4,300, 저항선 4,400을 보고 있습니다." },
    { id: -2315, alias: "알트 수달 #23", symbol: "이더리움", content: "이더리움이 2,505달러로 비트코인보다 더 크게 밀렸습니다. 파생상품 거래량 증가는 단기 매매 수요가 커졌다는 신호입니다." },
    { id: -2316, alias: "은빛 갈매기 #07", symbol: "원유", content: "국제유가가 호르무즈 임시합의 기대에 2%대 내렸습니다. 브렌트 104.61달러·WTI 100.05달러로, 여전히 100달러 위입니다." },
    { id: -2317, alias: "원유 치타 #20", symbol: "달러", content: "코인베이스 CEO가 스테이블코인을 미 국채의 구조적 매수자로 표현했습니다. 준비금의 상당 부분이 미국 단기 국채로 몰리고 있습니다." },
  ];

  const RE_POSTS = [
    { id: -2318, alias: "전세 참새 #04", symbol: "한장요약", content: "전세 매물 -12.2%, 매매 -60%, 월세 160만 원대까지 왔습니다. 세 신호가 서로 다른 방향이라 하나의 문장으로 합치지 않으려 합니다." },
    { id: -2319, alias: "갱신 백로 #35", symbol: "전세", content: "서울 전세 매물이 1년 새 12.2% 줄었습니다. 중랑구가 71.6%로 감소 폭이 가장 컸고, 8월 평균 전셋값은 7억 1,178만 원으로 또 최고치입니다." },
    { id: -2320, alias: "매물 학 #18", symbol: "매매", content: "8월 서울 아파트 매매가 2,322건으로 전월보다 60% 급감했습니다. 강남3구 거래 비중은 9.1%로 역대 최저이고, 분당·광명 등 비강남권이 더 올랐습니다." },
    { id: -2321, alias: "정책 너구리 #21", symbol: "정책", content: "토지거래허가 신청이 3,012건으로 34.8% 줄었습니다. 4개월 연속 감소이며, 세제개편안 확정 지연이 배경으로 꼽힙니다." },
    { id: -2322, alias: "월세 여우 #29", symbol: "전세", content: "전세가 줄고 월세가 오르며 서울 월세가 160만 원대에 이르렀습니다. 국회입법조사처는 별도의 전월세 종합대책이 필요하다고 지적했습니다." },
  ];

  const KR_COMMENTS = {
    [-2305]: [
      ["인천 갈매기 #54", "7,000선 반납은 심리선입니다. 개인 순매수가 하단을 받쳤습니다."],
      ["합정 수달 #09", "HBM 점유율 변화를 코스피 전체 방향과 한 줄로 묶지 않겠습니다."],
    ],
    [-2306]: [
      ["마포 살괭이 #10", "수율 개선이 실제 물량 증가로 이어진 결과로 보입니다."],
      ["판교 늑대 #92", "다음 분기 HBM4 출하 시점의 점유율이 진짜 확인입니다."],
    ],
    [-2307]: [
      ["인천 갈매기 #54", "매출 자체가 줄어든 게 아니라 비중이 줄어든 겁니다."],
      ["압구정 치타 #46", "엔비디아 선점 협력사 지위는 여전히 강점입니다."],
    ],
    [-2308]: [
      ["잠실 백로 #31", "점도표 톤이 매파냐 비둘기파냐가 밴드 방향을 가릅니다."],
      ["청담 여우 #13", "유가·금리가 함께 안정돼야 반등 여지가 커집니다."],
    ],
    [-2309]: [
      ["성북 참새 #35", "실제 반도체 수주로 이어지는지가 다음 확인입니다."],
      ["노원 기러기 #23", "아스트라 효과는 FOMC 이후 다시 시험대에 오를 겁니다."],
    ],
    [-2310]: [
      ["여의도 수리 #30", "북미 ESS 생산능력 50GWh 목표가 핵심 지표입니다."],
      ["송파 독수리 #68", "전기차 캐즘을 ESS가 보완하는 흐름이 뚜렷합니다."],
    ],
    [-2311]: [
      ["분당 매 #33", "2028년 첫 출시 모델이 투 트랙 전략의 첫 시험대입니다."],
      ["성수 너구리 #17", "아트리아 AI의 실제 주행 데이터가 다음 관찰 포인트입니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2312]: [
      ["종로 까치 #43", "네 자산을 한 바구니 헤지로 묶지 않겠습니다."],
      ["광화문 여우 #64", "FOMC 전까지는 다들 숨 고르기 국면입니다."],
    ],
    [-2313]: [
      ["여의도 수리 #30", "8만 달러 안착 여부가 다음 확인 지표입니다."],
      ["송파 독수리 #68", "비트코인 점유율 상승은 안전선호 이동으로 보입니다."],
    ],
    [-2314]: [
      ["분당 매 #33", "실질금리와 지정학 리스크가 서로 상쇄되는 구간입니다."],
      ["한남 재규어 #29", "4,300~4,400 구간을 지켜보면 됩니다."],
    ],
    [-2315]: [
      ["역삼 판다 #79", "베타가 큰 자산이라 하락도 더 크게 나옵니다."],
      ["해운대 고래 #05", "온체인 활동량이 가격과 별개로 늘어나는지 봅니다."],
    ],
    [-2316]: [
      ["한남 재규어 #29", "여름 저점 대비 50% 급등 구간이라는 점도 기억할 만합니다."],
      ["마포 살괭이 #10", "협상 결렬 시 되돌림 위험도 함께 봐야 합니다."],
    ],
    [-2317]: [
      ["삼성동 올빼미 #21", "발행사 준비금 공개 내역을 확인하면 됩니다."],
      ["판교 늑대 #92", "국채 수요층이 넓어진다는 점은 긍정적입니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2318]: [
      ["분당 매 #33", "세 지표를 한 방향 신호로 단정하지 않겠습니다."],
      ["한남 재규어 #29", "세제개편안 국회 처리가 다음 변수입니다."],
    ],
    [-2319]: [
      ["성수 너구리 #17", "노원·성북 등 강북 전세가 상승세가 두드러집니다."],
      ["삼성동 올빼미 #21", "다음 달 통계에서 감소세 지속 여부를 봅니다."],
    ],
    [-2320]: [
      ["역삼 판다 #79", "비강남·수도권으로 상승 축이 옮겨간 모습입니다."],
      ["해운대 고래 #05", "세제개편안 확정이 관망세를 풀 열쇠입니다."],
    ],
    [-2321]: [
      ["한남 재규어 #29", "강북권 10개구 비중이 절반 가까이입니다."],
      ["마포 살괭이 #10", "실거주 유예 신청은 아직 효과가 작습니다."],
    ],
    [-2322]: [
      ["삼성동 올빼미 #21", "보증금 부담은 줄지만 매달 고정비가 늘어납니다."],
      ["판교 늑대 #92", "국정감사 후속 대책 발표 여부를 지켜봅니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-14 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-14T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-14 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-14T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-14T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("analystPosts-markets: -2305~-2311, -2312~-2317, -2318~-2322");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260914-markets done");
}

main();
