#!/usr/bin/env node
/** Insert 2026-09-10 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KRRE } = require("./data-20260910-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-10";
const UPDATED = "2026.09.10 08:50";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T10 = 1788994800000; // 2026.09.10 08:00 KST
const TAG = "20260910";

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
    ["lib/reports-kr.ts", "kr-seed-164", KR],
    ["lib/reports-safe.ts", "safe-seed-152", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-140", KRRE],
  ];
  for (const [file, beforeId, arr] of jobs) {
    let c = read(file);
    if (c.includes(`id: "${arr[0].id}"`)) {
      console.log(`${file}: ${arr[0].id} already present — skip`);
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

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T10 =")) {
    c = c.replace(
      "const T09 = 1788908400000; // 2026-09-09 08:00 KST",
      "const T10 = 1788994800000; // 2026-09-10 08:00 KST\nconst T09 = 1788908400000; // 2026-09-09 08:00 KST",
    );
  }

  if (!c.includes("id: 9092")) {
    const kr = [
      [9092, "코스피", "칠천피재돌파", "인덱스 보유", "어제 7051(+1.40%)에 고점 7112. 33거래일 만에 종가 7000 위. 개인 −2.5조·기관 +9005억을 등락이랑 한 셀에 넣지 마"],
      [9093, "코스피", "수급오일치", "관심종목", "기관 5거래일 연속 매수인데 외인은 −1702억. 코스닥은 외인 +2980억이라 시장이 갈림"],
      [9094, "삼성전자", "이십칠만보합", "삼성전자 보유", "269500 보합. 장중 275000 반납. 하이닉스 +3.51%랑 온도 다름"],
      [9095, "SK하이닉스", "백팔십오만", "하이닉스 보유", "1856000(+3.51%)에 장중 1883000. 반도체 지수 +2.88%랑 같이 보되 종가만 추격 금지"],
      [9096, "LG에너지솔루션", "엔솔육퍼", "관심종목", "371000(+6.46%)면 중국 배터리 규제 스필오버+ESS 쪽. 수주랑 베타 분리"],
      [9097, "삼성전기", "전장전기체크", "관심종목", "1404000(+2.48%). 패키지·전장 축. 삼성전자 보합이랑 한 줄로 안 묶음"],
      [9098, "현대차", "완성차영점칠", "현대차 관심", "+0.78%면 지수·엔솔보다 작음. 유가 101·금리 4.83%가 할부 줄"],
    ];
    const block = kr
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T10 - ${i * 1800000}, likes: ${44 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${block}\n`);
    const krC = `  9092: [
    { id: 1, nickname: "수급표작성", holdingLabel: "관망", content: "개인 2.5조 매도는 이벤트 수급 칸이에요", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "칠천피재돌파", holdingLabel: "인덱스 보유", content: "고점 7112 반납을 종가랑 같이 적죠", createdAt: T10 + 1200000, likes: 4 },
  ],
  9093: [
    { id: 1, nickname: "기관오일", holdingLabel: "관심종목", content: "5일 연속이 전환인지는 다음 주 확인", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "외인갈림", holdingLabel: "관심종목", content: "코스피 외인 매도·코스닥 외인 매수를 한 문장 금지", createdAt: T10 + 1200000, likes: 4 },
  ],
  9094: [
    { id: 1, nickname: "이십칠만보합", holdingLabel: "삼성전자 보유", content: "장중 고가 반납은 수급이지 펀더 아님", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "메모리비교", holdingLabel: "관심종목", content: "하이닉스 상대 성과만 옆에 둠", createdAt: T10 + 1200000, likes: 4 },
  ],
  9095: [
    { id: 1, nickname: "백팔십오만", holdingLabel: "하이닉스 보유", content: "장중 188.3만이 저항인지 내일 확인", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "반도체베타", holdingLabel: "관심종목", content: "KRX 반도체 +2.88%랑 종목 베타 분리", createdAt: T10 + 1200000, likes: 4 },
  ],
  9096: [
    { id: 1, nickname: "엔솔육퍼", holdingLabel: "관심종목", content: "규제 헤드라인이랑 ESS 수요를 두 줄로", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "원가줄체크", holdingLabel: "관심종목", content: "유가 100달러권이 원가 칸에 먼저", createdAt: T10 + 1200000, likes: 4 },
  ],
  9097: [
    { id: 1, nickname: "전장전기체크", holdingLabel: "관심종목", content: "기판·카메라 믹스가 안 나오면 추격 패스", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "패키지축", holdingLabel: "관심종목", content: "삼성전자 보합과 전기 강세를 섞지 마", createdAt: T10 + 1200000, likes: 4 },
  ],
  9098: [
    { id: 1, nickname: "완성차영점칠", holdingLabel: "현대차 관심", content: "판매·인센티브 전엔 상대 성과만 적음", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "할부금리줄", holdingLabel: "관심종목", content: "10년 4.83%면 완성차 레버리지 줄임", createdAt: T10 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9182")) {
    const safe = [
      [9182, "매크로", "안전자산표", "관망", "BTC 7.82만·금 4375·브렌트 101·엔 153이 한 아침. 바이백 60억 해도 10년 4.83%"],
      [9183, "비트코인", "팔만실패", "BTC 보유", "8만 재돌파 실패 78208. ETF 4665만 유출·청산 1.52억. 금이랑 속도가 다름"],
      [9184, "금", "사천삼칠오", "금 ETF", "현물 4375(+0.58%)·선물 4451. 비트보다 느림. 실질금리 칸 따로"],
      [9185, "이더리움", "이더약세", "관심", "2464(−0.59%). 1년 전 4311 대비 약 42% 아래. BTC 베타로만 안 봄"],
      [9186, "원유", "브렌트백일", "관심", "브렌트 101+·WTI 96+. 금 헤지랑 같은 칸 금지. 지정학 프리미엄"],
      [9187, "엔", "엔백오삼", "관망", "달러엔 153이면 2월 이후 엔 강세. BOJ 0.25pt는 기대지 결정 아님"],
    ];
    const block = safe
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T10 - ${i * 1800000}, likes: ${41 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${block}\n`);
    const sC = `  9182: [
    { id: 1, nickname: "매크로올빼미", holdingLabel: "관심종목", content: "자산마다 시계가 달라서 한 방향 베팅 안 함", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "안전자산표", holdingLabel: "관망", content: "물가 이틀 앞에 알트 레버리지 줄임", createdAt: T10 + 1200000, likes: 4 },
  ],
  9183: [
    { id: 1, nickname: "ETF추적", holdingLabel: "관심종목", content: "유출 있는 날 반등은 숏커버 태그", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "팔만실패", holdingLabel: "BTC 보유", content: "다음 심리는 8만 재돌파 여부", createdAt: T10 + 1200000, likes: 4 },
  ],
  9184: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "온스보다 실질금리 방향이 먼저예요", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "사천삼칠오", holdingLabel: "금 ETF", content: "선물 4451이랑 현물을 같은 칸에 안 넣음", createdAt: T10 + 1200000, likes: 4 },
  ],
  9185: [
    { id: 1, nickname: "이더약세", holdingLabel: "관심", content: "1년 낙폭이랑 당일 −0.59%는 시계가 다름", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "알트베타", holdingLabel: "관심종목", content: "BTC만 보고 이더 추격하진 않음", createdAt: T10 + 1200000, likes: 4 },
  ],
  9186: [
    { id: 1, nickname: "브렌트백일", holdingLabel: "관심", content: "재고·감산·지정학을 세 줄로 적어요", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "인플레체크", holdingLabel: "관심종목", content: "항공·화학 파급은 옆에만", createdAt: T10 + 1200000, likes: 4 },
  ],
  9187: [
    { id: 1, nickname: "엔백오삼", holdingLabel: "관망", content: "원달러랑 달러엔을 다른 시트에", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "보이제기대", holdingLabel: "관심종목", content: "9월 28일권 회의 전 캐리 레버리지 패스", createdAt: T10 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9288")) {
    const re = [
      [9288, "정책", "종부세유지", "관심", "비거주 1주택 공제 12억 유지·상한 150%. 9억 인하·200%는 철회. 전세 매물이랑 한 신호 금지"],
      [9289, "전세", "전세만이구", "관심", "서울 전세매물 19902(−12.8% YoY). 구별 표 없으면 도시만으로 계약 안 함"],
      [9290, "전세", "월세만이육", "관심", "월세 매물 16921(−11.9%). 전세 감소랑 같은 방향이어도 전환 비율은 별도"],
      [9291, "정책", "청년임대예산", "관심", "2027 공공임대+서울 보증금 이자 최대 2억·연 2.0%. 19~39·소득 5천만. 한도 조회 먼저"],
      [9292, "서울매매", "과표사십사", "관심", "과표 12억≈시가 44억대. 중저가 전월세난이랑 대상이 다름. 시행령 전 세액 확정 금지"],
    ];
    const block = re
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T10 - ${i * 1800000}, likes: ${39 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${block}\n`);
    const rC = `  9288: [
    { id: 1, nickname: "공제십이억", holdingLabel: "관심종목", content: "실거주 14억이랑 비거주 12억 차등을 유지", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "종부세유지", holdingLabel: "관심", content: "공정시장가액 70%는 내년 칸", createdAt: T10 + 1200000, likes: 4 },
  ],
  9289: [
    { id: 1, nickname: "전세만이구", holdingLabel: "관심", content: "아실 1일 기준이라 주간 추이를 옆에", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "구별호가", holdingLabel: "관심종목", content: "대출 가능액 없이 평균만 보고 계약 금지", createdAt: T10 + 1200000, likes: 4 },
  ],
  9290: [
    { id: 1, nickname: "월세만이육", holdingLabel: "관심", content: "전세→월세 전환은 주거비 구조 변화", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "가을이사", holdingLabel: "관심종목", content: "등기·확정일자 양보 안 함", createdAt: T10 + 1200000, likes: 4 },
  ],
  9291: [
    { id: 1, nickname: "청년임대예산", holdingLabel: "관심", content: "생애 한 번인 경우가 많아 대기부터", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "소득오천만", holdingLabel: "관심종목", content: "기혼 6천만 한도도 서류로 확인", createdAt: T10 + 1200000, likes: 4 },
  ],
  9292: [
    { id: 1, nickname: "과표사십사", holdingLabel: "관심", content: "고가 보유세 대상과 중저가 시장을 나눔", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "고지서대기", holdingLabel: "관심종목", content: "시행령 전 헤드라인을 세액으로 안 씀", createdAt: T10 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }
  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T10 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2250")) {
    console.log("analyst markets -2250 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2250, alias: "여의도 너구리 #11", symbol: "한장요약", content: "목요일 장전입니다. 어제(9/9) 코스피 7,051.64(+1.40%)로 33거래일 만에 종가 7,000 위입니다. 개인 −2.4971조·기관 +9,005억·외인 −1,702억을 등락과 칸을 나누겠습니다." },
    { id: -2251, alias: "성수 수달 #35", symbol: "코스피", content: "기관 5거래일 연속 매수가 본문입니다. 코스닥은 외인 +2,980억·개인 −2,817억으로 방향이 갈립니다. 지수 +1.40%만 보고 전 업종 전환으로 읽지 않겠습니다." },
    { id: -2252, alias: "판교 치타 #22", symbol: "삼성전자", content: "269,500원 보합에 장중 275,000원 반납입니다. 하이닉스 +3.51%와 온도가 다릅니다. 테일러 서사는 중기 칸에만 두겠습니다." },
    { id: -2253, alias: "삼성동 여우 #08", symbol: "SK하이닉스", content: "1,856,000원(+3.51%, +63,000원)에 장중 1,883,000원입니다. 반도체 지수 14,217.16(+2.88%)과 같이 보되, 종가 강세를 수급 안도로 읽지 않겠습니다." },
    { id: -2254, alias: "잠실 백로 #29", symbol: "LG에너지솔루션", content: "371,000원(+6.46%)은 시총 상위 중 큰 폭입니다. 중국 배터리 규제 스필오버와 ESS를 두 줄로 적고, 유가 100달러권은 원가 칸에 두겠습니다." },
    { id: -2255, alias: "광화문 물총새 #06", symbol: "삼성전기", content: "1,404,000원(+2.48%)은 패키지·전장 축입니다. 삼성전자 보합과 한 문장으로 합치지 않겠습니다. 믹스 공시 전엔 추격하지 않습니다." },
    { id: -2256, alias: "한남 두루미 #17", symbol: "현대차", content: "388,000원(+0.78%)은 지수·엔솔보다 작은 움직임입니다. 브렌트 101달러권과 미국 10년 4.83%를 할부·연료비 칸에만 남기겠습니다." },
  ];

  const SAFE_POSTS = [
    { id: -2270, alias: "온체인 매 #03", symbol: "한장요약", content: "비트코인 약 7만 8,208달러, 금 온스 약 4,375달러, 브렌트 101달러, 달러·엔 153엔이 한 표입니다. 바이백 60억 달러에도 10년물은 약 4.83%입니다. 물가 10·11일 전에 자산별 칸을 나누겠습니다." },
    { id: -2271, alias: "금벌레 학 #14", symbol: "비트코인", content: "8만 달러 회복 실패 후 약 7만 8,208달러입니다. 현물 ETF 4,665만 달러 유출·청산 약 1억 5,187만 달러입니다. 금 상관과 청산 속도를 한 줄에 넣지 않겠습니다." },
    { id: -2272, alias: "달러 올빼미 #09", symbol: "금", content: "현물 약 4,375달러(+0.58%), 12월 선물 약 4,451달러입니다. 비트코인보다 느린 헤지입니다. 실질금리·달러가 안 풀리면 하루짜리 헤지가 됩니다." },
    { id: -2273, alias: "알트 수달 #21", symbol: "이더리움", content: "약 2,464달러(−0.59%)이고, 1년 전 약 4,311달러 대비 약 42% 아래입니다. 비트코인 베타만으로 추격하지 않겠습니다." },
    { id: -2274, alias: "원유 갈매기 #05", symbol: "원유", content: "브렌트 101달러 위, 서부텍사스산 96달러 위입니다. 금·비트코인 헤지와 같은 칸에 두지 않겠습니다. 재고와 외교 일정을 분리합니다." },
    { id: -2275, alias: "엔 치타 #18", symbol: "엔", content: "달러·엔 153엔 안팎은 2월 이후 엔이 가장 강한 구간으로 설명됐습니다. 일본은행 0.25%포인트는 기대입니다. 원·달러와 시트를 나누겠습니다." },
  ];

  const RE_POSTS = [
    { id: -2290, alias: "전세 참새 #02", symbol: "한장요약", content: "오늘은 종부세 공제 12억 유지·상한 150%·전세 매물 19,902·월세 16,921·청년 임대 예산을 나눕니다. 세제와 전세를 한 ‘사라’ 신호로 합치지 않겠습니다." },
    { id: -2291, alias: "갱신 백로 #33", symbol: "정책", content: "비거주 1주택 기본공제 9억 인하안이 철회되고 12억 원이 유지됐습니다. 세부담 상한 200%도 150%로 남았습니다. 공정시장가액 70%는 내년 칸입니다." },
    { id: -2292, alias: "매물 학 #16", symbol: "전세", content: "서울 아파트 전세 매물 19,902건(−12.8%)입니다. 구별 대출 가능액 없이 도시 평균만 보고 계약하지 않겠습니다." },
    { id: -2293, alias: "월세 여우 #27", symbol: "전세", content: "월세 매물 16,921건(−11.9%)입니다. 전세 감소와 방향이 같아도 전환 비율은 별도 줄입니다. 가을 이사에 한도 조회 없는 계약은 거절하겠습니다." },
    { id: -2294, alias: "정책 너구리 #19", symbol: "정책", content: "2027년 예산에 공공임대 확대와 서울 임차보증금 이자지원(최대 2억 원, 연 2.0%)이 있습니다. 자격·대기가 관문입니다. 시행령 전 숫자를 확정으로 쓰지 않겠습니다." },
  ];

  const KR_COMMENTS = {
    [-2250]: [
      ["인천 갈매기 #52", "33거래일 만의 종가 7,000은 레벨이지 전 업종 전환이 아닙니다."],
      ["청담 여우 #11", "PPI·CPI와 지수 +1.40%를 한 줄로 합치지 말죠."],
    ],
    [-2251]: [
      ["성북 참새 #33", "코스닥 외인 매수와 코스피 외인 매도를 갈라 적겠습니다."],
      ["여의도 학 #12", "기관 5일 연속이 다음 주에도 이어지는지 보겠습니다."],
    ],
    [-2252]: [
      ["압구정 치타 #44", "275,000원 반납을 지지 문장에 미리 적어둡니다."],
      ["합정 수달 #07", "보합을 약세로 단정하지 않겠습니다."],
    ],
    [-2253]: [
      ["잠실 백로 #29", "장중 1,883,000원 저항 여부를 내일 확인합니다."],
      ["이태원 부엉이 #18", "반도체 지수와 종목 베타를 옆에 둡니다."],
    ],
    [-2254]: [
      ["노원 기러기 #21", "엔솔 베타와 반도체 베타를 분리해 표에."],
      ["분당 호랑이 #55", "ESS 수요는 중기, 당일 +6.46%는 단기입니다."],
    ],
    [-2255]: [
      ["성북 참새 #33", "패키지 믹스가 안 나오면 비중을 키우지 않습니다."],
      ["강남 표범 #04", "전장 축은 완성차 판매와 시계가 다릅니다."],
    ],
    [-2256]: [
      ["합정 수달 #07", "상대 성과 칸에 지수·엔솔을 같이 적습니다."],
      ["마곡 펠리컨 #63", "유가·금리 앞에서 완성차 레버리지는 줄입니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2270]: [
      ["삼성동 올빼미 #19", "유가·금·엔을 한 헤지 칸에 넣지 않겠습니다."],
      ["판교 늑대 #90", "물가 발표 전 암호화폐 레버리지는 줄입니다."],
    ],
    [-2271]: [
      ["해운대 고래 #03", "유출이 있는 반등은 커버로만 태그하겠습니다."],
      ["인천 갈매기 #52", "같은 거래소 시각으로 종가를 고정하세요."],
    ],
    [-2272]: [
      ["마포 살괭이 #08", "현물과 선물 온스를 한 문장에 넣지 않겠습니다."],
      ["압구정 치타 #44", "온스 옆에는 실질금리 대용을 같은 시각에 적겠습니다."],
    ],
    [-2273]: [
      ["판교 늑대 #90", "1년 낙폭을 당일 등락의 이유로 쓰지 않습니다."],
      ["잠실 백로 #29", "이더 사이즈는 비트보다 작게."],
    ],
    [-2274]: [
      ["인천 갈매기 #52", "브렌트와 WTI를 다른 줄에 둡니다."],
      ["청담 여우 #11", "지정학 프리미엄이 빠지면 인플레 줄이 먼저입니다."],
    ],
    [-2275]: [
      ["압구정 치타 #44", "캐리 청산은 빠르고 국내 물가는 느립니다."],
      ["합정 수달 #07", "회의 성명이 나오기 전엔 기대만 적습니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2290]: [
      ["분당 매 #31", "여섯 칸을 한 매수 신호로 합치지 않겠습니다."],
      ["한남 재규어 #27", "과표 44억대와 중저가 매물을 섞지 말죠."],
    ],
    [-2291]: [
      ["성수 너구리 #15", "고지서가 나오기 전엔 세액을 확정으로 안 씁니다."],
      ["삼성동 올빼미 #19", "실거주 14억 차등을 표에 남깁니다."],
    ],
    [-2292]: [
      ["역삼 판다 #77", "구별 실거래·호가 확인 전엔 추격 안 합니다."],
      ["해운대 고래 #03", "전년 2만 2,823과 비교열을 유지합니다."],
    ],
    [-2293]: [
      ["한남 재규어 #27", "월세 전환 비율을 매물 신호로만."],
      ["마포 살괭이 #08", "노룩 계약 유혹은 거절합니다."],
    ],
    [-2294]: [
      ["삼성동 올빼미 #19", "소득·연령 자격이 대기보다 먼저입니다."],
      ["판교 늑대 #90", "한도 조회 없는 계약은 거절하세요."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-10 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-10T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-10 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-10T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-10T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("analystPosts-markets: -2250~-2256, -2270~-2275, -2290~-2294");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260910-markets done");
}

main();
