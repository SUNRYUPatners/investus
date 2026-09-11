#!/usr/bin/env node
/** Insert 2026-09-12 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KRRE } = require("./data-20260912-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-12";
const UPDATED = "2026.09.12 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T12 = 1789167600000; // 2026.09.12 08:00 KST
const TAG = "20260912";

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
    ["lib/reports-kr.ts", "kr-seed-178", KR],
    ["lib/reports-safe.ts", "safe-seed-164", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-150", KRRE],
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
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])}, createdAt: T12 + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T12 + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T12 =")) {
    c = c.replace(
      "const T11 = 1789081200000; // 2026-09-11 08:00 KST",
      "const T12 = 1789167600000; // 2026-09-12 08:00 KST\nconst T11 = 1789081200000; // 2026-09-11 08:00 KST",
    );
  }

  if (!c.includes("id: 9106")) {
    const kr = [
      [9106, "코스피", "칠천피반납", "인덱스 보유", "어제 6909.91(-1.76%)에 저점 6802. 사흘 만에 7000 내줌. 외인 2.3조·기관 1.2조 매도"],
      [9107, "삼성전자", "이십오만구천", "삼성전자 보유", "259500(-3.53%). 장중 256500. 외인 9167억 매도. 닉스랑 같은 반도체 날씨"],
      [9108, "SK하이닉스", "백팔십일만이", "하이닉스 보유", "1812000(-2.21%). 외인 1조771억 순매도 1위. 금리 경계 하루"],
      [9109, "KB금융", "금융선방", "KB금융 보유", "177900(+2.60%). 지수 빠지는데 은행만 오름. 신한도 +2.36%"],
      [9110, "LG에너지솔루션", "엔솔삼십육만", "관심종목", "360000(-1.37%). 유가 100달러권 원가. 이틀 조정"],
      [9111, "현대차", "완성차할부", "현대차 관심", "382500(-1.67%). 유가·금리 할부 부담. 전날 +0.26% 하루 만에 반납"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T12")}\n`);
    const krC =
      commentPair(9106, ["개인일팔조", "관망", "개인 1.8조가 6800에서 받아준 방파제"], ["칠천피반납", "인덱스 보유", "16일 미국 회의가 다음 주 첫 화면"]) +
      commentPair(9107, ["이십오만구천", "삼성전자 보유", "환율 1345면 외인이 더 예민해짐"], ["메모리날씨", "관심종목", "닉스 -2.21%랑 방향만 같아"]) +
      commentPair(9108, ["백팔십일만이", "하이닉스 보유", "HBM 업황이랑 하루 1조 매도는 시계가 다름"], ["순매도일위", "관심종목", "다음 주 일반 거래일 외인 표가 진짜"]) +
      commentPair(9109, ["금융선방", "KB금융 보유", "자사주·배당 이야기가 받쳐준 하루"], ["은행순환", "관심종목", "반도체에서 금융으로 돈 옮긴 느낌"]) +
      commentPair(9110, ["엔솔삼십육만", "관심종목", "수주 없으면 유가 베타로만 태그"], ["원가백달러", "관심종목", "브렌트 주간 100 위가 원가 줄"]) +
      commentPair(9111, ["완성차할부", "현대차 관심", "판매 공시 전엔 매크로 조정으로 봄"], ["할부금리", "관심종목", "KB 선방이랑 온도가 완전 다름"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9194")) {
    const safe = [
      [9194, "매크로", "물가회의표", "관망", "BTC 7.9만권·금 4320~4377·은 63.6·WTI 101. 16일 인상 확률 85~90%"],
      [9195, "비트코인", "칠만구천권", "BTC 보유", "금요일 7.6만~7.99만 오가다 7.9만 회복. 8만은 아직 심리선"],
      [9196, "금", "사천삼백권", "금 ETF", "온스 4318~4377. 은이 5.48% 빠진 날 금은 1.8%대"],
      [9197, "이더리움", "이더이육백", "관심", "아침 2500에서 오후 2613. 장중 2433~2648. BTC보다 반등 큼"],
      [9198, "은", "은육십삼", "관심", "63.60(-5.48%). 금보다 출렁임 큼. 태양광 원료 줄도 있음"],
      [9199, "원유", "백달러주간", "관심", "WTI 101·브렌트 106. 주간 100 위. 경유 갤런 6달러 첫 돌파"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T12")}\n`);
    const sC =
      commentPair(9194, ["십육일게이트", "관망", "회의 전까지 무이자 자산은 숨 고르기"], ["물가회의표", "관망", "유가랑 금을 한 헤지로 안 묶음"]) +
      commentPair(9195, ["칠만구천권", "BTC 보유", "8만 안착이 다음 확인"], ["장중고점", "관심", "79900은 하루 고점이지 종가가 아님"]) +
      commentPair(9196, ["사천삼백권", "금 ETF", "실질금리가 온스 다음 힌트"], ["금은온도", "관심", "은 5% 빠질 때 금은 덜 흔들림"]) +
      commentPair(9197, ["이더이육백", "관심", "2600선 유지가 주말 숙제"], ["알트반등", "관심", "물가 안도 하루 베타로 봄"]) +
      commentPair(9198, ["은육십삼", "관심", "시장 작아서 퍼센트가 커짐"], ["산업수요", "관심", "태양광 줄은 중기고 오늘은 금리 날"]) +
      commentPair(9199, ["백달러주간", "관심", "하루 -1%여도 주간은 플러스 10%"], ["경유육달러", "관심", "물가 입력이지 금 헤지가 아님"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9298")) {
    const re = [
      [9298, "서울", "키맞춤성북", "관심", "서울 매매 +0.20%인데 성북 +0.42·강남3구 전부 하락. 평균만 보면 오독"],
      [9299, "강남", "오주연속약세", "관심", "강남 -0.35 5주·서초 -0.30·송파 21주 만 하락. 서울 하락은 아님"],
      [9300, "전세", "노원서초키", "관심", "노원 전세 +0.38, 서초 -0.21 4주. 한도 조회부터"],
      [9301, "정책", "공제십사억", "관심", "실거주 종부세 공제 14억, 비거주 12억 유지. 9억 안은 철회. 국회 남음"],
      [9302, "서울", "오름폭둔화", "관심", "매매 0.22→0.20, 전세 0.21→0.19. 둔화지 방향 전환은 다음 주"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T12")}\n`);
    const rC =
      commentPair(9298, ["키맞춤성북", "관심", "상승 축이 강남에서 성북으로 옮김"], ["평균가림막", "관심", "0.20%만 보면 강남 조정이 안 보임"]) +
      commentPair(9299, ["오주연속약세", "관심", "송파 21주 만은 전환 힌트일 뿐"], ["호가체결", "관심", "호가 낮춘 매물이 계속 체결되는지"]) +
      commentPair(9300, ["노원서초키", "관심", "도시 평균 0.19%는 가림막"], ["한도먼저", "관심", "한도 안 나오면 계약서 덮음"]) +
      commentPair(9301, ["공제십사억", "관심", "정부안이지 시행된 세금 아님"], ["세율남음", "관심", "세율·70% 비율은 그대로 남아 있음"]) +
      commentPair(9302, ["오름폭둔화", "관심", "2주 연속 둔화. 구별 실거래부터"], ["가을이사", "관심", "입주 있는 구 전세가 더 내리는지"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T12 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2264")) {
    console.log("analyst markets -2264 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2264, alias: "여의도 너구리 #12", symbol: "한장요약", content: "토요일 브리핑입니다. 어제 코스피 6,909.91(-1.76%)로 장중 6,802까지 밀리며 종가 7,000선을 내줬습니다. 외인 약 2조 3,040억·개인 약 1조 8,658억입니다. KB금융 +2.60%는 반도체와 온도가 달랐습니다." },
    { id: -2265, alias: "성수 수달 #36", symbol: "코스피", content: "사흘 만에 7,000선을 내준 날입니다. 유가 주간 100달러 위와 미국 인상 확률 85~90%가 투심을 눌렀습니다. 개인이 6,800대에서 받아 6,900대로 되돌렸습니다." },
    { id: -2266, alias: "판교 치타 #23", symbol: "삼성전자", content: "259,500원(-3.53%)에 장중 256,500원입니다. 외국인 9,167억 원 순매도입니다. 하이닉스 -2.21%와 같은 메모리 날씨입니다." },
    { id: -2267, alias: "삼성동 여우 #09", symbol: "SK하이닉스", content: "1,812,000원(-2.21%)입니다. 외국인 1조 771억 원으로 유가증권 순매도 1위입니다. 고대역폭 메모리 업황과 하루 수급의 시계가 다릅니다." },
    { id: -2268, alias: "잠실 백로 #30", symbol: "KB금융", content: "177,900원(+2.60%)은 시총 상위 선방입니다. 신한지주 +2.36%와 같이 움직였습니다. 주주환원과 금리 기대가 받친 하루로 읽겠습니다." },
    { id: -2269, alias: "광화문 물총새 #07", symbol: "LG에너지솔루션", content: "360,000원(-1.37%)은 전날에 이은 이틀 조정입니다. 유가 100달러권이 원가와 할부 수요에 붙습니다. 수주 공시는 없는 하루입니다." },
    { id: -2270, alias: "한남 두루미 #18", symbol: "현대차", content: "382,500원(-1.67%)으로 전날 +0.26%를 반납했습니다. 코스피와 낙폭이 비슷합니다. 판매 공시 전엔 유가·할부 배경으로 보겠습니다." },
  ];

  const SAFE_POSTS = [
    { id: -2282, alias: "온체인 매 #04", symbol: "한장요약", content: "비트코인 7만 9천 달러권, 금 온스 4,320~4,377달러, 은 63.60달러, 서부텍사스산 101달러권이 한 표입니다. 16일 인상 확률 85~90%를 기회비용으로 읽겠습니다." },
    { id: -2283, alias: "금벌레 학 #15", symbol: "비트코인", content: "금요일 7만 6천~7만 9,900달러를 오간 뒤 7만 9천 달러권입니다. 소비자물가가 예상과 같아 한숨 돌린 반등입니다. 8만 달러는 아직 심리선입니다." },
    { id: -2284, alias: "달러 올빼미 #10", symbol: "금", content: "온스 약 4,318~4,377달러입니다. 은이 5.48% 빠진 날 금은 1.8%대입니다. 16일 회의와 실질금리가 다음 힌트입니다." },
    { id: -2285, alias: "알트 수달 #22", symbol: "이더리움", content: "아침 2,500달러권에서 오후 약 2,613달러로 회복했습니다. 장중 2,433~2,648달러입니다. 비트코인보다 하루 반등이 컸습니다." },
    { id: -2286, alias: "은빛 갈매기 #06", symbol: "은", content: "온스 63.60달러로 하루 5.48% 내렸습니다. 시장이 작아 퍼센트가 큽니다. 태양광 수요는 중기, 오늘은 금리 날의 변동입니다." },
    { id: -2287, alias: "원유 치타 #19", symbol: "원유", content: "서부텍사스산 101달러권, 브렌트 106달러권입니다. 하루로는 내렸지만 주간 100달러 위입니다. 경유 갤런 6달러는 물가 입력입니다." },
  ];

  const RE_POSTS = [
    { id: -2300, alias: "전세 참새 #03", symbol: "한장요약", content: "오늘은 서울 매매 +0.20%, 성북 +0.42%, 강남3구 하락, 실거주 종부세 공제 14억 원을 나눠 봅니다. 평균과 구별 키, 정부안과 시행을 같은 신호로 보지 않겠습니다." },
    { id: -2301, alias: "갱신 백로 #34", symbol: "서울", content: "서울 0.20% 뒤에 성북 0.42%와 강남3구 하락이 있습니다. 상승 축이 북쪽으로 옮아 간 주입니다. 구별 실거래가 먼저입니다." },
    { id: -2302, alias: "매물 학 #17", symbol: "강남", content: "강남 -0.35% 5주 연속, 서초 -0.30%, 송파 21주 만에 하락입니다. 서울 전체 하락으로 읽지 않겠습니다. 호가를 낮춘 체결이 다음 확인입니다." },
    { id: -2303, alias: "월세 여우 #28", symbol: "전세", content: "노원 전세 +0.38%, 서초 -0.21%(4주 약세)입니다. 도시 평균 0.19%는 가림막입니다. 한도 조회가 계약의 관문입니다." },
    { id: -2304, alias: "정책 너구리 #20", symbol: "정책", content: "실거주 1주택 공제 14억 원, 비거주 12억 원 유지입니다. 9억 원 안은 철회됐습니다. 세율과 70% 비율은 남아 있고 국회 심사가 남았습니다." },
  ];

  const KR_COMMENTS = {
    [-2264]: [
      ["인천 갈매기 #53", "7,000선 반납은 심리선입니다. 개인 1.8조가 하단을 받았습니다."],
      ["합정 수달 #08", "KB +2.60%를 반도체 낙폭과 한 줄로 더하지 않겠습니다."],
    ],
    [-2265]: [
      ["마포 살괭이 #09", "6,802는 시가이자 저점에 가까운 숫자입니다."],
      ["판교 늑대 #91", "16일 회의가 다음 주 투심의 첫 화면입니다."],
    ],
    [-2266]: [
      ["인천 갈매기 #53", "256,500원 저점 되돌림은 금요일 막판입니다."],
      ["압구정 치타 #45", "환율 1,345원권이 외국인 매도와 겹쳤습니다."],
    ],
    [-2267]: [
      ["잠실 백로 #30", "1조 771억 원은 하루 순매도 1위입니다."],
      ["청담 여우 #12", "다음 주 일반 거래일 표가 업황과 수급을 가릅니다."],
    ],
    [-2268]: [
      ["성북 참새 #34", "자사주·배당 체력이 선방의 배경입니다."],
      ["노원 기러기 #22", "신한 +2.36%와 같이 보면 금융 순환입니다."],
    ],
    [-2269]: [
      ["여의도 수리 #29", "이틀 조정이면 전날 낙폭의 연장입니다."],
      ["송파 독수리 #67", "수주가 나오면 유가 베타 위에도 이야기가 켜집니다."],
    ],
    [-2270]: [
      ["분당 매 #32", "월간 판매가 나오면 할부 부담이 실적인지 보입니다."],
      ["성수 너구리 #16", "KB 선방과 완성차 조정을 한 바구니로 보지 않습니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2282]: [
      ["종로 까치 #42", "네 자산을 한 바구니로 보지 않겠습니다."],
      ["광화문 여우 #63", "85~90%는 확률이지 결정이 아닙니다."],
    ],
    [-2283]: [
      ["여의도 수리 #29", "8만 달러는 심리선입니다. 펀드 유출입이 중기입니다."],
      ["송파 독수리 #67", "장중 7만 9,900달러는 고점입니다."],
    ],
    [-2284]: [
      ["분당 매 #32", "집계 화면마다 온스가 조금 다릅니다. 4,300달러대입니다."],
      ["한남 재규어 #28", "은보다 낙폭이 작았던 하루입니다."],
    ],
    [-2285]: [
      ["역삼 판다 #78", "2,600선 유지가 주말 확인입니다."],
      ["해운대 고래 #04", "장중 200달러 폭은 이더 변동성입니다."],
    ],
    [-2286]: [
      ["한남 재규어 #28", "63.60달러와 5.48%를 같이 기억하겠습니다."],
      ["마포 살괭이 #09", "산업 수요는 중기, 오늘은 금리 날입니다."],
    ],
    [-2287]: [
      ["삼성동 올빼미 #20", "주간 100달러 위가 물가 입력입니다."],
      ["판교 늑대 #91", "경유 6달러는 운송 원가 줄입니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2300]: [
      ["분당 매 #32", "다섯 이야기를 한 매수 신호로 보지 않겠습니다."],
      ["한남 재규어 #28", "14억 공제는 정부안이고 국회가 남았습니다."],
    ],
    [-2301]: [
      ["성수 너구리 #16", "성북 0.42%를 서울 강세로 확장하지 않습니다."],
      ["삼성동 올빼미 #20", "평균 0.20%는 가림막입니다."],
    ],
    [-2302]: [
      ["역삼 판다 #78", "5주 연속은 강남 온도이지 서울 하락이 아닙니다."],
      ["해운대 고래 #04", "송파 21주 만 하락은 힌트일 뿐입니다."],
    ],
    [-2303]: [
      ["한남 재규어 #28", "노원 오름과 서초 내림을 한 전세로 보지 않습니다."],
      ["마포 살괭이 #09", "한도 조회가 안 나오면 계약서를 덮습니다."],
    ],
    [-2304]: [
      ["삼성동 올빼미 #20", "9억 원 안 철회가 오늘 수정의 핵심입니다."],
      ["판교 늑대 #91", "세율 인상과 70%는 그대로 남아 있습니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-12 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-12T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-12 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-12T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-12T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("analystPosts-markets: -2264~-2270, -2282~-2287, -2300~-2304");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260912-markets done");
}

main();
