#!/usr/bin/env node
/** Insert 2026-09-11 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KRRE } = require("./data-20260911-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-11";
const UPDATED = "2026.09.11 08:50";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T11 = 1789081200000; // 2026.09.11 08:00 KST
const TAG = "20260911";

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
    ["lib/reports-kr.ts", "kr-seed-171", KR],
    ["lib/reports-safe.ts", "safe-seed-158", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-145", KRRE],
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
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])}, createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T11 + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T11 =")) {
    c = c.replace(
      "const T10 = 1788994800000; // 2026-09-10 08:00 KST",
      "const T11 = 1789081200000; // 2026-09-11 08:00 KST\nconst T10 = 1788994800000; // 2026-09-10 08:00 KST",
    );
  }

  if (!c.includes("id: 9099")) {
    const kr = [
      [9099, "코스피", "칠천피사수", "인덱스 보유", "어제 7033.92(−0.25%)에 저점 6898. 종가 7000은 지킴. 외인 −2.48조랑 등락을 한 셀에 넣지 마"],
      [9100, "코스피", "네마녀수급", "관심종목", "선물옵션 만기+리밸런싱. 기타법인 +1.67조는 자사주 칸. 기관 6일 연속 매수"],
      [9101, "삼성전자", "이십육만구천", "삼성전자 보유", "269000(−0.19%). 장중 263500 되돌림. 외인 −1.41조·기관 +1.01조"],
      [9102, "SK하이닉스", "백팔십오만삼", "하이닉스 보유", "1853000(−0.16%)에 저점 1811000. 외인 −1.78조. 리밸런싱이랑 종가 분리"],
      [9103, "LG에너지솔루션", "엔솔일점육", "관심종목", "365000(−1.62%). 전날 +6.46% 다음날. 유가 101이 원가 줄"],
      [9104, "삼성바이오로직스", "삼바이퍼", "관심종목", "1423000(−2.00%). 제약 베타. 반도체 외인 매도 연장으로 안 읽음"],
      [9105, "현대차", "완성차영점이", "현대차 관심", "+0.26%면 지수·엔솔이랑 온도 다름. 유가 101·금리 4.92%가 할부 줄"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T11")}\n`);
    const krC =
      commentPair(9099, ["수급표작성", "관망", "외인 2.48조는 이벤트 수급 칸이에요"], ["칠천피사수", "인덱스 보유", "저점 6898 되돌림을 종가랑 같이 적죠"]) +
      commentPair(9100, ["기관육일", "관심종목", "6일 연속이 전환인지는 다음 주 확인"], ["자사주방파", "관심종목", "기타법인 1.67조를 추세 매수로 읽지 마"]) +
      commentPair(9101, ["이십육만구천", "삼성전자 보유", "장중 저가 반납은 수급이지 펀더 아님"], ["메모리비교", "관심종목", "하이닉스 −0.16%랑 온도만 옆에 둠"]) +
      commentPair(9102, ["백팔십오만삼", "하이닉스 보유", "장중 181.1만이 지지인지는 내일 확인"], ["리밸런싱줄", "관심종목", "지수 변경 매물이랑 종가 약보합 분리"]) +
      commentPair(9103, ["엔솔일점육", "관심종목", "전날 급등 되돌림이랑 유가 칸을 두 줄로"], ["원가줄체크", "관심종목", "브렌트 101이 원가 칸에 먼저"]) +
      commentPair(9104, ["삼바이퍼", "관심종목", "수주 없으면 하루 베타로만 태그"], ["제약갈림", "관심종목", "의료정밀 상승이랑 바이오 낙폭이 업종 안에서도 갈림"]) +
      commentPair(9105, ["완성차영점이", "현대차 관심", "판매·인센티브 전엔 상대 성과만 적음"], ["할부금리줄", "관심종목", "10년 4.92%면 완성차 레버리지 줄임"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9188")) {
    const safe = [
      [9188, "매크로", "물가금리표", "관망", "BTC 7.7만권·금 4365·브렌트 101.21·10년 4.92%가 한 아침. PPI 5.4%를 완화로 읽지 마"],
      [9189, "비트코인", "칠만칠천권", "BTC 보유", "8만 재돌파 실패. 77~78k. 금이랑 속도가 다름. 할인율 4.92% 칸 따로"],
      [9190, "금", "사천삼육오", "금 ETF", "온스 4365, 4400 아래. 8월 ETF 180억이랑 하루 가격 시계 다름"],
      [9191, "이더리움", "이더이사육공", "관심", "2460권. BTC 베타. 알트 레버 먼저 줄임"],
      [9192, "원유", "브렌트백일이", "관심", "브렌트 101.21(+3.36%). 7/23 이후 첫 종가 100. 금 헤지랑 같은 칸 금지"],
      [9193, "금리", "십년사구이", "관망", "10년 4.92%(+0.08). PPI 5.4 vs 5.3. CPI·9/16이 게이트"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T11")}\n`);
    const sC =
      commentPair(9188, ["할인율체크", "관망", "무이자 자산 기회비용이 커진 아침"], ["물가금리표", "관망", "유가랑 금을 한 헤지로 안 묶음"]) +
      commentPair(9189, ["칠만칠천권", "BTC 보유", "8만은 심리선이지 스위치 아님"], ["이티에프유출", "관심", "유출이 며칠 이어지는지가 중기"]) +
      commentPair(9190, ["사천삼육오", "금 ETF", "실질금리 칸을 온스랑 같이 적죠"], ["사천사백아래", "관심", "4400 회복 전엔 추격 패스"]) +
      commentPair(9191, ["이더이사육공", "관심", "BTC 베타만으로 알트 안 늘림"], ["레버먼저", "관심", "물가 주간에 알트부터 줄임"]) +
      commentPair(9192, ["브렌트백일이", "관심", "종가 100은 테이프, 재고가 다음"], ["지정학프리미엄", "관심", "금 온스랑 같은 헤지 아님"]) +
      commentPair(9193, ["십년사구이", "관망", "바이백이랑 금리 상승을 완화로 안 봄"], ["피피아이오사", "관심", "CPI 나오기 전 경로 확정 금지"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9293")) {
    const re = [
      [9293, "서울", "키맞춤서울", "관심", "서울 매매 +0.20%인데 강북 +0.33·강남3구 전부 하락. 평균만 보면 오독"],
      [9294, "강남", "강남세구하락", "관심", "강남 −0.35·서초 −0.30·송파 −0.02. 5주·낙폭확대·21주 만. 서울 하락은 아님"],
      [9295, "전세", "노원서초전세", "관심", "노원 전세 +0.38, 서초 −0.21. 입주 칸이랑 대단지 칸이 다름. 한도 조회 먼저"],
      [9296, "공급", "목동팔십오", "관심", "브라운스톤 목동 85세대 중 일반 29. 계약 11~12일. 단지 규모랑 일반 창 분리"],
      [9297, "서울", "오름폭둔화", "관심", "매매 0.22→0.20, 전세 0.21→0.19. 둔화지 하락 전환은 아님. 구별 실거래부터"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T11")}\n`);
    const rC =
      commentPair(9293, ["키맞춤서울", "관심", "강남 약세를 서울 하락으로 읽지 마"], ["강북삼삼", "관심", "강북 0.33%를 평균 옆에 둠"]) +
      commentPair(9294, ["강남세구하락", "관심", "송파 21주 만 하락은 전환 힌트일 뿐"], ["호가체결", "관심", "호가 낮춘 매물이 체결되는지 다음"]) +
      commentPair(9295, ["노원서초전세", "관심", "도시 평균 0.19%는 가림막"], ["한도관문", "관심", "한도 안 나오면 노룩 거절"]) +
      commentPair(9296, ["목동팔십오", "관심", "85는 단지, 29가 일반 창"], ["임의공급추첨", "관심", "가점 없는 추첨·후분양 조건부터"]) +
      commentPair(9297, ["오름폭둔화", "관심", "2주 연속 둔화지 방향 전환은 다음 주"], ["구별실거래", "관심", "평균 상승으로 급매수 안 함"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T11 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2257")) {
    console.log("analyst markets -2257 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2257, alias: "여의도 너구리 #12", symbol: "한장요약", content: "금요일 장전입니다. 어제(9/10) 코스피 7,033.92(−0.25%)로 장중 6,898까지 밀렸다 종가 7,000을 지켰습니다. 외인 −2조 4,820억·기타법인 +1조 6,670억을 등락과 칸을 나누겠습니다." },
    { id: -2258, alias: "성수 수달 #36", symbol: "코스피", content: "네 마녀의 날과 반도체 리밸런싱이 본문입니다. 코스닥은 기관 +1조 3,488억입니다. 지수 −0.25%만 보고 전 업종 약세로 읽지 않겠습니다." },
    { id: -2259, alias: "판교 치타 #23", symbol: "삼성전자", content: "269,000원(−0.19%)에 장중 263,500원 되돌림입니다. 하이닉스 −0.16%와 온도가 비슷합니다. 자사주 방파제는 중기 칸에만 두겠습니다." },
    { id: -2260, alias: "삼성동 여우 #09", symbol: "SK하이닉스", content: "1,853,000원(−0.16%)에 장중 1,811,000원입니다. 외국인 −1조 7,797억과 종가 약보합을 인과로 묶지 않겠습니다." },
    { id: -2261, alias: "잠실 백로 #30", symbol: "LG에너지솔루션", content: "365,000원(−1.62%)은 전날 +6.46% 다음날입니다. 유가 101달러 원가와 ESS를 두 줄로 적겠습니다." },
    { id: -2262, alias: "광화문 물총새 #07", symbol: "삼성바이오로직스", content: "1,423,000원(−2.00%)은 제약 베타입니다. 반도체 외인 매도와 한 문장으로 합치지 않겠습니다. 수주 공시 전엔 추격하지 않습니다." },
    { id: -2263, alias: "한남 두루미 #18", symbol: "현대차", content: "389,000원(+0.26%)은 지수·엔솔보다 다른 움직임입니다. 브렌트 101달러와 미국 10년 4.92%를 할부·연료비 칸에만 남기겠습니다." },
  ];

  const SAFE_POSTS = [
    { id: -2276, alias: "온체인 매 #04", symbol: "한장요약", content: "비트코인 7만 7천 달러권, 금 온스 약 4,365달러, 브렌트 101.21달러, 10년물 4.92%가 한 표입니다. 생산자물가 5.4%를 완화로 읽지 않겠습니다. 자산별 칸을 나누겠습니다." },
    { id: -2277, alias: "금벌레 학 #15", symbol: "비트코인", content: "8만 달러 회복 실패 후 7만 7천~7만 8천 달러권입니다. 10년 4.92%가 할인율입니다. 금 상관과 청산 속도를 한 줄에 넣지 않겠습니다." },
    { id: -2278, alias: "달러 올빼미 #10", symbol: "금", content: "현물 약 4,365달러, 4,400달러 아래입니다. 8월 ETF 180억 달러와 하루 가격은 시계가 다릅니다. 실질금리 칸을 따로 두겠습니다." },
    { id: -2279, alias: "알트 수달 #22", symbol: "이더리움", content: "약 2,460달러권입니다. 비트코인 베타만으로 추격하지 않겠습니다. 알트 레버리지부터 줄입니다." },
    { id: -2280, alias: "원유 갈매기 #06", symbol: "원유", content: "브렌트 101.21달러, 7월 23일 이후 첫 종가 100달러입니다. 금·비트코인 헤지와 같은 칸에 두지 않겠습니다. 재고와 외교 일정을 분리합니다." },
    { id: -2281, alias: "금리 치타 #19", symbol: "금리", content: "10년물 4.92%(+0.08%포인트)는 2023년 10월 이후 최고권입니다. 생산자물가 5.4%와 칸을 나눕니다. 소비자물가·9월 16일이 게이트입니다." },
  ];

  const RE_POSTS = [
    { id: -2295, alias: "전세 참새 #03", symbol: "한장요약", content: "오늘은 서울 매매 +0.20%·강남3구 동반 하락·노원 전세 +0.38%·목동 85세대를 나눕니다. 평균과 구별 키를 한 ‘사라’ 신호로 합치지 않겠습니다." },
    { id: -2296, alias: "갱신 백로 #34", symbol: "서울", content: "강북 14개구 매매 +0.33%, 강남3구는 모두 내렸습니다. 도시 평균 0.20%는 가림막입니다. 구별 실거래 전엔 추격하지 않습니다." },
    { id: -2297, alias: "매물 학 #17", symbol: "강남", content: "강남 −0.35%·서초 −0.30%·송파 −0.02%입니다. 5주 연속·낙폭 확대·21주 만 하락입니다. 서울 전체 하락으로 읽지 않겠습니다." },
    { id: -2298, alias: "월세 여우 #28", symbol: "전세", content: "노원 전세 +0.38%, 서초 −0.21%(잠원·반포 입주)입니다. 도시 평균만 보고 계약하지 않겠습니다. 한도 조회가 관문입니다." },
    { id: -2299, alias: "정책 너구리 #20", symbol: "공급", content: "브라운스톤 목동은 전체 85세대, 일반 29세대입니다. 계약 9월 11~12일, 입주 2027년 1월입니다. 단지 규모와 일반 창을 나누겠습니다." },
  ];

  const KR_COMMENTS = {
    [-2257]: [
      ["인천 갈매기 #53", "종가 7,000 사수는 레벨이지 전 업종 방어가 아닙니다."],
      ["합정 수달 #08", "기타법인 자사주와 외국인 매도를 한 문장 금지입니다."],
    ],
    [-2258]: [
      ["마포 살괭이 #09", "만기·리밸런싱은 하루 변동성 칸입니다."],
      ["판교 늑대 #91", "코스닥 기관 매수와 코스피 외인 매도를 갈라 적겠습니다."],
    ],
    [-2259]: [
      ["인천 갈매기 #53", "263,500원 저점 되돌림은 수급이지 펀더가 아닙니다."],
      ["압구정 치타 #45", "자사주 잔량을 추세 전환으로 안 읽습니다."],
    ],
    [-2260]: [
      ["잠실 백로 #30", "1,811,000원이 지지인지는 다음 날 확인입니다."],
      ["청담 여우 #12", "외국인 1.78조를 종가 약보합의 원인으로 단정하지 않습니다."],
    ],
    [-2261]: [
      ["성북 참새 #34", "전날 +6.46% 되돌림과 유가 원가를 두 줄로."],
      ["노원 기러기 #22", "수주 공시 전엔 배터리 추격 안 합니다."],
    ],
    [-2262]: [
      ["여의도 수리 #29", "제약 베타와 반도체 수급을 섞지 않습니다."],
      ["송파 독수리 #67", "위탁생산 가동률이 다음 게이트입니다."],
    ],
    [-2263]: [
      ["분당 매 #32", "상대 성과만 적고 로보택시 뉴스는 중기에만."],
      ["성수 너구리 #16", "할부 금리 4.92%면 완성차 레버리지 줄입니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2276]: [
      ["종로 까치 #42", "네 자산을 한 방향 헤지로 합치지 않겠습니다."],
      ["광화문 여우 #63", "PPI와 10년물을 완화 한 줄로 안 씁니다."],
    ],
    [-2277]: [
      ["여의도 수리 #29", "8만 달러는 심리면입니다. ETF 유출이 중기입니다."],
      ["송파 독수리 #67", "금 온스와 청산 속도를 한 줄에 넣지 않습니다."],
    ],
    [-2278]: [
      ["분당 매 #32", "4,400달러 아래는 현물 칸입니다. ETF 유입과 시계가 다릅니다."],
      ["한남 재규어 #28", "실질금리가 안 풀리면 하루짜리 헤지입니다."],
    ],
    [-2279]: [
      ["역삼 판다 #78", "알트 레버리지부터 줄입니다."],
      ["해운대 고래 #04", "스마트계약 지표는 중기 칸에만 둡니다."],
    ],
    [-2280]: [
      ["한남 재규어 #28", "101.21달러는 종가입니다. 재고가 다음입니다."],
      ["마포 살괭이 #09", "금 헤지와 유가 프리미엄을 한 칸에 두지 않습니다."],
    ],
    [-2281]: [
      ["삼성동 올빼미 #20", "4.92%는 시장 가격, 5.4%는 통계입니다."],
      ["판교 늑대 #91", "9월 16일 전 경로를 확정하지 않습니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2295]: [
      ["분당 매 #32", "다섯 칸을 한 매수 신호로 합치지 않겠습니다."],
      ["한남 재규어 #28", "강남 하락과 목동 공급을 섞지 말죠."],
    ],
    [-2296]: [
      ["성수 너구리 #16", "평균 0.20%는 가림막입니다. 구별 표가 먼저입니다."],
      ["삼성동 올빼미 #20", "강북 0.33%를 서울 강세로 확장하지 않습니다."],
    ],
    [-2297]: [
      ["역삼 판다 #78", "세 구 하락을 서울 하락으로 안 읽습니다."],
      ["해운대 고래 #04", "호가 조정 체결이 다음 확인입니다."],
    ],
    [-2298]: [
      ["한남 재규어 #28", "입주 물량 칸과 대단지 수요 칸을 나눕니다."],
      ["마포 살괭이 #09", "한도 조회가 안 나오면 계약서를 덮습니다. 노원 전세 키와 묶지 않습니다."],
    ],
    [-2299]: [
      ["삼성동 올빼미 #20", "85와 29를 한 숫자의 공급으로 안 씁니다."],
      ["판교 늑대 #91", "추첨·후분양 조건을 계약 전에 확인합니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-11 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-11T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-11 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-11T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-11T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("analystPosts-markets: -2257~-2263, -2276~-2281, -2295~-2299");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260911-markets done");
}

main();
