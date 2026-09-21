#!/usr/bin/env node
/** Insert 2026-09-21 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20260921-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-21";
const UPDATED = "2026.09.21 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T21 = 1789945200000; // 2026-09-21 08:00 KST
const TAG = "20260921";

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
    ["lib/reports-kr.ts", "kr-seed-216", KR],
    ["lib/reports-safe.ts", "safe-seed-197", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-178", KR_RE],
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
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])}, createdAt: T21 + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T21 + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T21 =")) {
    c = c.replace(
      "const T18 = 1789686000000; // 2026-09-18 08:00 KST",
      "const T21 = 1789945200000; // 2026-09-21 08:00 KST\nconst T18 = 1789686000000; // 2026-09-18 08:00 KST",
    );
  }

  if (!c.includes("id: 9381")) {
    const kr = [
      [9381, "코스피", "육팔구사급등", "인덱스 보유", "금요 코스피 6894.23(+2.66%). 외인 4245억 다시사고 기관 1.50조. 개인은 3.59조 팜"],
      [9382, "삼성전자", "삼전이십육만", "삼성전자 보유", "삼성전자 26만1000 +3.37%. 외인 4620억 팔고 기관 7075억 받침. 자사주 74.7%"],
      [9383, "SK하이닉스", "닉스백팔십오", "하이닉스 보유", "하이닉스 185만7천 +6.42% 고가마감. 외인이 이 종목만 1.33조. 삼전이랑 수급 갈림"],
      [9384, "삼성바이오로직스", "바이오보합", "관심", "삼성바이오 139만9천 +0.14%. 코스피 2.66%인데 바이오만 쉼. 헬스케어 -2.63%"],
      [9385, "LG에너지솔루션", "엔솔관망", "관심", "LG엔솔 363500 -0.27%. 2차전지 대형주 관망. 에코프로비엠만 +2.14%"],
      [9386, "코스피", "자사주막바지", "관심종목", "삼전닉스 자사주 합 34.7조. 10월 중순 끝날수도. 코스닥은 827.12(+0.60%)"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T21")}\n`);
    const krC =
      commentPair(9381, ["외인사천이백", "관망", "8거래일만에 사자 전환. 하루짜리인지가 월요 포인트"], ["상승사공칠", "관심종목", "오른종목 407 내린종목 465, 지수는 반도체 독주"]) +
      commentPair(9382, ["삼전이십육만", "삼성전자 보유", "시가=종가 261000, 고가 262000은 못지킴"], ["자사주칠사", "관심종목", "남은 1348만주면 6~7거래일. 10월 수급 비워짐"]) +
      commentPair(9383, ["닉스백팔십오", "하이닉스 보유", "종가가 당일고가라 월요일 지지가 시험"], ["일조삼천", "관심종목", "외인이 삼전 팔고 닉스 산 교체매매"]) +
      commentPair(9384, ["바이오보합", "관심", "위탁생산은 수주가 바닥인데 금요일은 수급이 반도체로감"], ["헬스케어약세", "관심종목", "업종 -2.63%라 상대강도 아직 없음"]) +
      commentPair(9385, ["엔솔관망", "관심", "셀 대형주는 쉬고 소재만 온기. 순환 아직"], ["엘에프피소재", "관심종목", "LFP 공급 기대가 에코프로비엠에만 먼저 붙음"]) +
      commentPair(9386, ["자사주막바지", "관심종목", "기타법인 1.66조가 자사주 칸일 가능성"], ["환율일삼팔삼", "관심종목", "1383원대면 외인 환차손 부담은 남음"]);
    // I accidentally doubled 9385 commentPair - fix below
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9387")) {
    const safe = [
      [9387, "한장요약", "팔만일천지지", "관망", "BTC 81161(-0.21%) 8만 지킴. 금 4370~4380, 10년물 한때 5%. 클라리티 50대49"],
      [9388, "비트코인", "비트팔만일천", "BTC 보유", "오전 81161. 업비트 1억1069만, 김프 -1.53%. 금요 ETF +4.33억달러"],
      [9389, "금", "금사삼칠팔", "금 ETF", "금 4370~4380 밴드 지킴. 10년물 5% 넘긴 뒤에도 큰 붕괴 없음"],
      [9390, "이더리움", "이더이육삼이", "관심", "이더 2632 거의 보합. 김프 -1.55%. 2400에서 올라온 구간 지키는중"],
      [9391, "금리", "십년물오퍼", "관심", "美 10년물 한때 5%. 17일 4.94%. 이자없는 금·비트 할인율 다시 올라감"],
      [9392, "규제", "클라리티막힘", "관심", "클라리티 절차투표 50-49. 60표 필요해서 본회의 못감. 올해 입법 멀어짐"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T21")}\n`);
    const sC =
      commentPair(9387, ["금사삼칠팔", "관망", "8만이랑 4370이 오늘 지지 테스트"], ["십년물오퍼", "관망", "금리가 5% 위에 머물면 반등폭 줄어듬"]) +
      commentPair(9388, ["비트팔만일천", "BTC 보유", "주말고점 82000 넘기는지가 다음"], ["이티에프금요", "관심", "목요일 1.33억에서 금요일 4.33억으로 늘었음"]) +
      commentPair(9389, ["금사삼칠팔", "금 ETF", "4370 깨지면 6주저점 탐색 다시"], ["달러같이", "관심", "달러인덱스랑 금리가 같이 내려야 폭 커짐"]) +
      commentPair(9390, ["이더이육삼이", "관심", "2600 여러날 지키면 회복 확인"], ["점유율유지", "관심", "이더 점유율 11.56%는 거의 안변함"]) +
      commentPair(9391, ["십년물오퍼", "관심", "한번 터치랑 며칠 안착은 다름"], ["연준삼점칠오", "관심", "정책금리 3.75-4%랑 시장금리 따로 봐야함"]) +
      commentPair(9392, ["클라리티막힘", "관심", "본회의 부결이 아니라 문 앞에서 막힌거"], ["위원회해석", "관심", "3월에 비트·이더 상품으로 적어둔 해석은 남음"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9393")) {
    const re = [
      [9393, "한장요약", "갱신오할일", "관심", "서울전세 갱신 51.1%(1~9/20). 매물 23697(-13.3%). 실거주 유예 2027말까지"],
      [9394, "전세", "중랑육일오", "관심", "중랑 갱신 61.5% 서울 최고. 강서 57.8 성북 57.3. 신규보다 갱신이 많아짐"],
      [9395, "공급정책", "유예이공이칠", "관심", "토허 실거주 10/1부터 2027말. 갱신1회면 2029말. 5/12부터 무주택만"],
      [9396, "전세", "매물이만삼천", "관심", "서울전세 매물 23697건 1년전보다 13.3%↓. 신규·갱신 보증금 격차 8.1억"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T21")}\n`);
    const rC =
      commentPair(9393, ["서울칠억전세", "관심", "KB서울평균전세 7.12억이 같은방향 숫자"], ["십월일매물", "관심", "10/1 이후 매물 늘어봐야 유예 효과"]) +
      commentPair(9394, ["중랑육일오", "관심", "동북·서부가 갱신 최전선"], ["십퍼센트피", "관심", "작년 41.1에서 10%p 점프. 매물부족 그대로"]) +
      commentPair(9395, ["유예이공이칠", "관심", "입주물량은 안늘고 전세놓는 기간만 길어짐"], ["오일십이무주택", "관심", "5/12부터 계속 무주택이어야 대상임"]) +
      commentPair(9396, ["매물이만삼천", "관심", "13.3% 더 줄면 전세난 온도 올라감"], ["팔억격차", "관심", "새로 계약하면 8억 더 든다는 이야기"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T21 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2381")) {
    console.log("analyst markets -2381 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2381, alias: "여의도 수리 #36", symbol: "한장요약", content: "금요일 브리핑입니다. 코스피가 6,894.23으로 2.66% 올랐습니다. 외국인 4,245억 원, 기관 1조5,025억 원이 들어왔고 개인은 3조5,872억 원을 팔았습니다. 반도체는 강세, 바이오와 배터리는 쉬었습니다." },
    { id: -2382, alias: "성수 너구리 #21", symbol: "코스피", content: "코스피가 178.82포인트 오른 6,894.23입니다. 상승 407 대 하락 465라 종목 수는 내린 쪽이 많았습니다. 전기전자 4.46%가 지수를 만들었고 금융은 1.73% 내렸습니다." },
    { id: -2383, alias: "판교 치타 #29", symbol: "삼성전자", content: "삼성전자가 26만1,000원으로 3.37% 올랐습니다. 외국인은 4,620억 원을 팔았고 기관이 7,075억 원을 샀습니다. 자사주는 74.69%, 10조3,078억 원까지 진행됐습니다." },
    { id: -2384, alias: "삼성동 여우 #15", symbol: "SK하이닉스", content: "SK하이닉스가 185만7,000원으로 6.42% 오르며 종가가 당일 고가였습니다. 외국인이 1조3,272억 원을 사 유가증권 매수 1위였습니다. 삼성전자를 팔고 이 종목을 산 교체입니다." },
    { id: -2385, alias: "잠실 백로 #32", symbol: "삼성바이오로직스", content: "삼성바이오로직스가 139만9,000원으로 0.14% 오르며 보합에 머물렀습니다. 코스피 2.66%와 헬스케어 −2.63% 사이에서 시가총액 상위 바이오가 소외된 하루입니다." },
    { id: -2386, alias: "역삼 판다 #86", symbol: "LG에너지솔루션", content: "LG에너지솔루션이 36만3,500원으로 0.27% 내렸습니다. 에코프로비엠은 2.14% 올라 소재와 셀 대형주 온도가 갈렸습니다. 배터리 순환은 아직입니다." },
  ];

  const SAFE_POSTS = [
    { id: -2387, alias: "온체인 매 #10", symbol: "한장요약", content: "비트코인이 8만1,161달러에서 0.21% 내리며 8만 달러를 지켰습니다. 금은 4,370~4,380달러, 이더는 2,632달러입니다. 10년물이 한때 5%를 넘겼고 클라리티 절차 투표는 50대 49로 막혔습니다." },
    { id: -2388, alias: "금벌레 학 #22", symbol: "비트코인", content: "비트코인 오전 가격은 8만1,161달러입니다. 업비트 1억1,069만 원, 김치 프리미엄 −1.53%입니다. 금요일 현물 ETF는 4억3,300만 달러 순유입이었습니다." },
    { id: -2389, alias: "은빛 갈매기 #12", symbol: "금", content: "금 현물이 4,370~4,380달러 밴드를 지켰습니다. 10년 금리가 5%를 넘긴 뒤에도 큰 붕괴는 없었습니다. 4,370달러가 여러 차례 남는지가 반등 확인입니다." },
    { id: -2390, alias: "알트 수달 #28", symbol: "이더리움", content: "이더리움이 2,632달러에서 0.02% 내리며 변동이 줄었습니다. 지난주 2,400달러대에서 올라온 구간을 지키는 아침입니다. 점유율은 11.56%로 거의 변하지 않았습니다." },
    { id: -2391, alias: "금리 올빼미 #14", symbol: "금리", content: "미국 10년 국채 금리가 한때 5%를 넘겼습니다. 9월 17일 근처 수치는 4.94%입니다. 이자 없는 금과 비트코인의 할인율이 다시 올라간 주입니다." },
    { id: -2392, alias: "규제 학 #06", symbol: "규제", content: "클라리티 법 절차 투표가 50대 49로 막혔습니다. 60표가 필요해 본회의에 오르지 못했고, 올해 현실적인 입법 경로는 멀어졌습니다. 위원회 해석은 남아 있습니다." },
  ];

  const RE_POSTS = [
    { id: -2393, alias: "전세 참새 #09", symbol: "한장요약", content: "서울 아파트 전세 갱신이 51.1%로 절반을 넘었습니다. 매물은 2만3,697건으로 1년 전보다 13.3% 줄었고, 실거주 유예는 2027년 말까지 늘어 10월 1일 시행됩니다." },
    { id: -2394, alias: "갱신 백로 #40", symbol: "전세", content: "1월부터 9월 20일까지 서울 전세 8만480건 중 갱신이 4만1,145건입니다. 중랑구 61.5%가 가장 높고, 전년 41.1%보다 10%포인트 올랐습니다." },
    { id: -2395, alias: "매물 학 #23", symbol: "공급정책", content: "토지거래허가구역 실거주 유예가 10월 1일부터 2027년 말까지 적용됩니다. 갱신 1회를 더하면 늦어도 2029년 말까지 입주를 미룰 수 있습니다. 5월 12일부터 무주택이어야 합니다." },
    { id: -2396, alias: "정책 너구리 #26", symbol: "전세", content: "9월 19일 서울 전세 매물은 2만3,697건으로 13.3% 줄었습니다. 신규와 갱신 보증금 격차는 약 8.1억 원으로 거론됐습니다. 10월 이후 매물이 돌아와야 유예 효과가 보입니다." },
  ];

  const KR_COMMENTS = {
    [-2381]: [
      ["인천 갈매기 #61", "자사주 34.7조가 10월 중순께 끝날 수 있어 수급 칸이 바뀝니다."],
      ["합정 수달 #16", "바이오와 엔솔이 쉰 점이 반도체 쏠림을 보여 줍니다."],
    ],
    [-2382]: [
      ["마포 살괭이 #17", "원·달러 1,383원대라 외국인 환차손 부담은 남아 있습니다."],
      ["판교 늑대 #99", "코스닥 827.12는 코스피보다 오름폭이 작았습니다."],
    ],
    [-2383]: [
      ["인천 갈매기 #61", "고가 26만2,000원을 월요일에 넘기는지가 단기 확인입니다."],
      ["압구정 치타 #53", "남은 자사주 1,348만 주면 6~7거래일이면 끝날 수 있습니다."],
    ],
    [-2384]: [
      ["잠실 백로 #38", "한 종목 1조 원대 매수가 지수 2.66%의 큰 축이었습니다."],
      ["청담 여우 #20", "185만7,000원 고가 마감이 지지로 바뀌는지 보겠습니다."],
    ],
    [-2385]: [
      ["역삼 판다 #86", "위탁개발생산은 수주가 바닥인데 금요일 수급은 반도체를 향했습니다."],
      ["해운대 고래 #12", "헬스케어 −2.63%가 여러 날 이어지는지가 소외의 길이입니다."],
    ],
    [-2386]: [
      ["삼성동 올빼미 #28", "소재 온기가 셀 대형주로 퍼지는지가 순환의 확인입니다."],
      ["판교 늑대 #99", "36만3,500원 약세가 반복되면 상대 강도가 더 늦어집니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2387]: [
      ["종로 까치 #50", "8만 달러와 금 4,370달러가 오늘 지지 테스트입니다."],
      ["광화문 여우 #71", "클라리티와 10년물 5%는 같은 주의 다른 칸입니다."],
    ],
    [-2388]: [
      ["여의도 수리 #37", "주말 고점 8만2,000달러를 넘기는지가 다음 온도입니다."],
      ["송파 독수리 #75", "금요일 ETF 4억3,300만 달러가 이어지는지가 선의 두께입니다."],
    ],
    [-2389]: [
      ["역삼 판다 #86", "4,370달러가 깨지면 6주 저점 탐색이 다시 열립니다."],
      ["해운대 고래 #12", "달러인덱스와 금리가 같이 내려가야 반등 폭이 커집니다."],
    ],
    [-2390]: [
      ["분당 매 #40", "2,600달러를 여러 날 지키면 회복으로 읽겠습니다."],
      ["한남 재규어 #36", "비트코인 8만 달러와 같은 비율로 해석하지 않겠습니다."],
    ],
    [-2391]: [
      ["삼성동 올빼미 #28", "한 번 5% 터치와 며칠 안착을 구분해 적겠습니다."],
      ["판교 늑대 #99", "정책금리 3.75~4%와 시장금리는 다른 줄입니다."],
    ],
    [-2392]: [
      ["인천 갈매기 #61", "본회의 부결이 아니라 절차 문 앞에서 막힌 표입니다."],
      ["합정 수달 #16", "3월 디지털 상품 해석은 법안이 없어도 남아 있습니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2393]: [
      ["성수 너구리 #24", "갱신 51.1%와 매물 13.3% 감소가 같은 방향입니다."],
      ["삼성동 올빼미 #28", "10월 1일 이후 전세 매물이 늘어야 유예 효과가 보입니다."],
    ],
    [-2394]: [
      ["역삼 판다 #86", "중랑 61.5%가 전세난의 최전선 숫자입니다."],
      ["해운대 고래 #12", "합의 갱신은 5% 상한 밖 조정이 가능합니다."],
    ],
    [-2395]: [
      ["한남 재규어 #36", "입주 물량은 늘지 않고 전세를 놓는 기간만 길어집니다."],
      ["마포 살괭이 #17", "5월 12일부터 무주택이어야 대상입니다."],
    ],
    [-2396]: [
      ["삼성동 올빼미 #28", "2만3,697건 위로 매물이 돌아오는지가 온도입니다."],
      ["판교 늑대 #99", "신규·갱신 격차 8.1억 원이 더 벌어지는지를 보겠습니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-21 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-21T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-21 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-21T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-21T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("analystPosts-markets: -2381~-2386, -2387~-2392, -2393~-2396");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260921-markets done");
}

main();
