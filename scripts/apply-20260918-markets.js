#!/usr/bin/env node
/** Insert 2026-09-18 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20260918-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-18";
const UPDATED = "2026.09.18 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T18 = 1789686000000; // 2026-09-18 08:00 KST
const TAG = "20260918";

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
    ["lib/reports-kr.ts", "kr-seed-210", KR],
    ["lib/reports-safe.ts", "safe-seed-192", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-174", KR_RE],
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
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])}, createdAt: T18 + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T18 + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T18 =")) {
    c = c.replace(
      "const T17 = 1789599600000; // 2026-09-17 08:00 KST",
      "const T18 = 1789686000000; // 2026-09-18 08:00 KST\nconst T17 = 1789599600000; // 2026-09-17 08:00 KST",
    );
  }

  if (!c.includes("id: 9365")) {
    const kr = [
      [9365, "코스피", "육칠일오보합", "인덱스 보유", "코스피 6715.41(-0.04%) 보합. 외인 2.28조 팔고 개인 4136억 기관 1588억 받아냄"],
      [9366, "삼성전자", "삼전이오만이천", "삼성전자 보유", "삼성전자 25만2500원 -0.39%. 장중 25만9천까지 갔다가 외인 5626억에 밀림"],
      [9367, "SK하이닉스", "닉스일조이천", "하이닉스 보유", "하이닉스 174만5천 -0.80%. 외인이 이 종목만 1.23조 팜. 전날 +4% 숨고르기"],
      [9368, "현대차", "현대차삼육삼", "현대차 관심", "현대차 363000원 +0.28%. 어제 -1.36% 하루만에 되돌림. 유가 조정 덕봄"],
      [9369, "KB금융", "케이비일사일", "KB금융 보유", "KB금융 +1.41% 178700원. 연준인상 다음날 은행만 강함. 코스피는 보합"],
      [9370, "코스피", "코스닥팔이이", "관심종목", "코스닥은 822.18(+0.76%)로 코스피랑 방향 갈림. 환율은 1382원대"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T18")}\n`);
    const krC =
      commentPair(9365, ["외인이조이팔", "관망", "반도체 팔아서 지수 보합 만든거임"], ["상승사오삼", "관심종목", "오른종목 453 내린종목 398, 체감은 지수보다 나음"]) +
      commentPair(9366, ["삼전이오만이천", "삼성전자 보유", "고가 259000 찍은건 매수세가 죽은건 아님"], ["에이치비엠출하", "관심종목", "3분기 HBM 숫자 나오면 수급이랑 따로 봐야함"]) +
      commentPair(9367, ["닉스일조이천", "하이닉스 보유", "전날 임단협 가결 호재 하루만에 수급에 밀림"], ["오하이오는검토", "관심종목", "미국생산은 아직 계약 전, 178만5천 회복이 단기확인"]) +
      commentPair(9368, ["현대차삼육삼", "현대차 관심", "반도체 쉴때 자동차 오르는 로테이션"], ["유가백일불", "관심종목", "WTI 101불 조정이 할인율 부담 하루 덜어줌"]) +
      commentPair(9369, ["케이비일사일", "KB금융 보유", "순이자마진 기대가 붙은 하루짜리일수도"], ["대출수요따라", "관심종목", "국내 대출이 안따라오면 마진 이야기 짧아짐"]) +
      commentPair(9370, ["코스닥팔이이", "관심종목", "코스닥만 강하면 대형 반도체 소외 신호"], ["환율일삼팔이", "관심종목", "1380원대면 외인 환차손 부담 남음"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9371")) {
    const safe = [
      [9371, "한장요약", "세이프되돌림", "관망", "BTC 76440(+0.8%) 7.6만 지킴. 금 4380 반등, WTI 101불 조정"],
      [9372, "비트코인", "비트칠육사사공", "BTC 보유", "저점 75064에서 76440으로 되돌림. 이미 반영된 인상이라 둘째날 충격 작음"],
      [9373, "금", "금사삼팔공", "금 ETF", "금 6주저점 반등 4370~4380. 달러랑 유가 쉬면서 저가매수 붙음"],
      [9374, "이더리움", "이더이사사공", "관심", "이더 2430~2440에서 변동 줄음. 전날 -4% 다음 2400선 지킴"],
      [9375, "은", "은육십육", "관심", "은 63~66불. 금 따라붙는데 진폭은 더 큼. 66불 위 유지가 온기 신호"],
      [9376, "원유", "유가백일불", "관심", "WTI 101불 전후 -1~3%. 100불 넘긴 뒤 이틀째 숨고르기. 재고해석은 갈림"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T18")}\n`);
    const sC =
      commentPair(9371, ["금사삼팔공", "관망", "BTC 7.6만이랑 금 4370이 오늘 지지 테스트"], ["은육십육", "관망", "은은 금보다 출렁임, 투기자금 붙었는지 보는 칸"]) +
      commentPair(9372, ["비트칠육사사공", "BTC 보유", "75000 깨지면 다음 지지 찾아야함"], ["이티에프둘째날", "관심", "현물ETF 유출이 하루짜리인지가 선의 두께"]) +
      commentPair(9373, ["금사삼팔공", "금 ETF", "추가인상 남아있어서 반등폭은 제한될수도"], ["달러같이내려", "관심", "달러인덱스랑 금리가 같이 내려야 반등 지속"]) +
      commentPair(9374, ["이더이사사공", "관심", "전날 청산 컸던 자산이 하루 쉬는중"], ["이천사백지지", "관심", "2400 여러번 지키면 급락 짧게 끝난 신호"]) +
      commentPair(9375, ["은육십육", "관심", "산업수요 있어서 금이랑 바닥이 다름"], ["육십삼하단", "관심", "63불 하단 여러번 터치하면 박스 하단 확인"]) +
      commentPair(9376, ["유가백일불", "관심", "100불 아래 며칠 안정돼야 금리부담 줄어듬"], ["재고엇갈림", "관심", "API랑 EIA 방향 맞을때까지 하루씩 흔들림"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9377")) {
    const re = [
      [9377, "한장요약", "실거주이에칠", "관심", "실거주의무 유예 2027년말까지 1년연장. 10/1 시행, 동북권전세 +10.11%"],
      [9378, "공급정책", "유예이십이칠", "관심", "토지거래허가 실거주 2026말→2027말. 갱신포함, 최장 2029, 5/12부터 무주택"],
      [9379, "전세", "동북십점일일", "관심", "동북권 전세 연초대비 +10.11% 11년만 두자릿수. 매물 44.6%↓"],
      [9380, "정비사업", "이공이팔갭", "관심", "2028년 이주 45256 vs 입주 15388, 2.9배. 전세공백 가장 큰 해"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T18")}\n`);
    const rC =
      commentPair(9377, ["서울칠억전세", "관심", "KB서울평균전세 7.1억 +9.2%, 유예랑 같은주"], ["십월일매물", "관심", "10/1 이후 전세매물 늘어봐야 유예 효과"]) +
      commentPair(9378, ["유예이십이칠", "관심", "입주물량은 안늘고 전세놓는 기간만 길어짐"], ["오월십이무주택", "관심", "5/12부터 계속 무주택이어야 대상임"]) +
      commentPair(9379, ["동북십점일일", "관심", "10.15대책 이후 매물 잠긴게 가격 밀어올림"], ["십일년만", "관심", "2015년 이후 첫 두자릿수라 최전선 숫자"]) +
      commentPair(9380, ["이공이팔갭", "관심", "유예는 매물잠김 늦출뿐 2028 입주는 그대로"], ["목동동북", "관심", "이주 임박 동 전세매물 더빠지면 가격 먼저감"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T18 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2365")) {
    console.log("analyst markets -2365 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2365, alias: "여의도 수리 #35", symbol: "한장요약", content: "어제 브리핑입니다. 코스피가 6,715.41로 0.04% 내리며 보합 마감했습니다. 외국인이 2조2,803억 원을 팔았고 개인과 기관이 받아냈습니다. 반도체는 약세, KB금융은 1.41% 강세로 업종이 갈렸습니다." },
    { id: -2366, alias: "성수 너구리 #20", symbol: "코스피", content: "코스피가 2.56포인트 내린 6,715.41입니다. 장중 6,795까지 갔다가 외국인 전기전자 매도에 보합으로 닫혔습니다. 코스닥은 822.18로 올라 방향이 달랐습니다." },
    { id: -2367, alias: "판교 치타 #28", symbol: "삼성전자", content: "삼성전자가 25만2,500원으로 0.39% 내렸습니다. 장중 고가 25만9,000원을 지키지 못했고 외국인이 5,626억 원을 팔았습니다. 전날 2% 반등 뒤 숨 고르기로 보겠습니다." },
    { id: -2368, alias: "삼성동 여우 #14", symbol: "SK하이닉스", content: "SK하이닉스가 174만5,000원으로 0.80% 내리며 외국인 매도 1조2,336억 원의 중심이 됐습니다. 전날 임단협 가결과 미국 생산 검토로 4% 올랐던 종목의 수급 조정입니다." },
    { id: -2369, alias: "잠실 백로 #31", symbol: "현대차", content: "현대차가 36만3,000원으로 0.28% 오르며 전날 1.36% 하락을 하루 만에 되돌렸습니다. 반도체가 쉬는 날 완성차가 소폭 오른 로테이션입니다. 유가 101달러 조정이 할인율 부담을 하루 덜었습니다." },
    { id: -2370, alias: "역삼 판다 #85", symbol: "KB금융", content: "KB금융이 17만8,700원으로 1.41% 올랐습니다. 연준 인상 다음 한국 거래일에 순이자마진 기대가 붙은 흐름입니다. 하루 강세가 추세가 되려면 국내 대출 수요가 따라와야 합니다." },
  ];

  const SAFE_POSTS = [
    { id: -2371, alias: "온체인 매 #09", symbol: "한장요약", content: "비트코인이 7만6,440달러에서 0.8% 오르며 7만6,000달러를 지켰습니다. 금은 4,370~4,380달러로 6주 저점에서 반등했고 WTI는 101달러 안팎에서 조정을 이어갔습니다. 이더는 2,440달러에서 변동이 줄었습니다." },
    { id: -2372, alias: "금벌레 학 #21", symbol: "비트코인", content: "비트코인 24시간 저점은 7만5,064달러였습니다. 이미 반영된 인상이라 둘째 날 충격이 작았고, 7만6,000달러 위에서 되돌렸습니다. 현물 ETF 자금이 따라오는지가 이 선의 두께입니다." },
    { id: -2373, alias: "은빛 갈매기 #11", symbol: "금", content: "금 현물이 6주 저점에서 반등해 4,370~4,380달러를 회복했습니다. 달러와 유가가 하루 쉬며 저가 매수가 붙었습니다. 추가 인상 전망이 남아 있어 반등 폭은 제한될 수 있습니다." },
    { id: -2374, alias: "알트 수달 #27", symbol: "이더리움", content: "이더리움이 2,430~2,440달러에서 2,400달러 선을 지키며 변동이 줄었습니다. 전날 4%대 약세 뒤 하루 쉬는 흐름입니다. ETF 유출이 멈추는지가 지지의 확인입니다." },
    { id: -2375, alias: "은빛 학 #12", symbol: "은", content: "은이 63~66달러에서 금 반등에 따라붙되 진폭은 더 컸습니다. 산업 수요와 안전자산 수요가 겹치는 금속이라 같은 뉴스에도 출렁임이 큽니다. 66달러 위 유지가 금속 온기의 보조 지표입니다." },
    { id: -2376, alias: "원유 고래 #05", symbol: "원유", content: "WTI가 101달러 안팎에서 1~3% 내리며 100달러 위 급등 뒤 조정을 이어갔습니다. 재고 집계는 여전히 엇갈립니다. 100달러 아래에서 며칠 안정되는지가 금리 이야기의 다음 칸입니다." },
  ];

  const RE_POSTS = [
    { id: -2377, alias: "전세 참새 #08", symbol: "한장요약", content: "실거주 의무 유예가 2027년 말까지 1년 연장됩니다. 동북권 전세는 연초 대비 10.11% 올라 11년 만에 두 자릿수이고, 2028년 이주는 입주의 2.9배로 추산됩니다. 유예와 전세 급등이 같은 주에 겹쳤습니다." },
    { id: -2378, alias: "갱신 백로 #39", symbol: "공급정책", content: "토지거래허가구역 실거주 유예가 10월 1일부터 2027년 말까지 적용됩니다. 갱신 계약도 포함하고, 5월 12일부터 무주택이면 최장 2029년까지 미룰 수 있습니다. 입주 물량은 늘지 않고 전세를 놓는 기간만 길어집니다." },
    { id: -2379, alias: "매물 학 #22", symbol: "전세", content: "서울 동북권 전세가 10.11% 오르며 2015년 이후 첫 두 자릿수입니다. 10·15 이후 매물이 44.6% 줄었고 KB 서울 평균 전세는 7억1,178만 원입니다. 10월 유예 이후 매물이 되돌아오는지가 시험입니다." },
    { id: -2380, alias: "정책 너구리 #25", symbol: "정비사업", content: "2028년 서울 이주 4만5,256가구 대비 입주 1만5,388가구로 갭이 2.9배입니다. 누적 이주는 2030년까지 약 18만 가구입니다. 실거주 유예는 매물 잠김을 늦출 뿐 그해 입주를 늘리지는 않습니다." },
  ];

  const KR_COMMENTS = {
    [-2365]: [
      ["인천 갈매기 #60", "환율 1,382원대라 외국인 환차손 부담이 남아 있습니다."],
      ["합정 수달 #15", "KB금융만 1% 넘게 오른 점이 반도체와 달랐습니다."],
    ],
    [-2366]: [
      ["마포 살괭이 #16", "상승 453 대 하락 398이라 종목 수는 오른 쪽이 많았습니다."],
      ["판교 늑대 #98", "코스닥 822.18은 대형 반도체 소외를 보여 줍니다."],
    ],
    [-2367]: [
      ["인천 갈매기 #60", "고가 25만9,000원은 매수세가 완전히 사라진 것은 아닙니다."],
      ["압구정 치타 #52", "3분기 HBM 출하가 나오면 수급과 따로 적겠습니다."],
    ],
    [-2368]: [
      ["잠실 백로 #37", "한 종목 1조 원대 매도가 지수 보합의 큰 축이었습니다."],
      ["청담 여우 #19", "미국 공장 검토는 아직 계약 전이라 수급과 구분해 보겠습니다."],
    ],
    [-2369]: [
      ["역삼 판다 #85", "전날 낙폭 1.36%를 다 메우지는 못한 되돌림입니다."],
      ["해운대 고래 #11", "유가가 100달러 아래에서 안정되는지가 다음 온도입니다."],
    ],
    [-2370]: [
      ["삼성동 올빼미 #27", "순이자마진 기대는 국내 대출이 따라와야 추세가 됩니다."],
      ["판교 늑대 #98", "하루 1.41%만으로 금리 수혜 추세라고 보기는 이릅니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2371]: [
      ["종로 까치 #49", "은 63~66달러 진폭이 금 반등의 보조 지표입니다."],
      ["광화문 여우 #70", "원유 101달러 조정이 물가 재료를 하루 누그러뜨렸습니다."],
    ],
    [-2372]: [
      ["여의도 수리 #36", "7만5,000달러가 깨지면 다음 지지 탐색이 시작됩니다."],
      ["송파 독수리 #74", "ETF 자금이 돌아서야 7만6,000달러 선이 두꺼워집니다."],
    ],
    [-2373]: [
      ["역삼 판다 #85", "4,370달러 지지가 여러 차례 남는지가 바닥 탐색의 확인입니다."],
      ["해운대 고래 #11", "달러인덱스와 금리가 같이 내려가는지를 보겠습니다."],
    ],
    [-2374]: [
      ["분당 매 #39", "전날 4% 하락을 같은 비율로 되돌리라고 보기는 이릅니다."],
      ["한남 재규어 #35", "2,400달러 선을 여러 차례 지키면 급락이 짧게 끝난 신호입니다."],
    ],
    [-2375]: [
      ["삼성동 올빼미 #27", "은 시장이 작아 같은 뉴스에도 출렁임이 큽니다."],
      ["판교 늑대 #98", "66달러 위 종가가 금속 온기가 하루짜리가 아닌지를 가릅니다."],
    ],
    [-2376]: [
      ["인천 갈매기 #60", "API와 EIA 재고가 같은 방향이 될 때까지 해석이 갈립니다."],
      ["합정 수달 #15", "중동 공급이 다시 불거지면 101달러가 바닥이 아닐 수 있습니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2377]: [
      ["성수 너구리 #23", "유예와 동북권 두 자릿수가 같은 주에 겹친 점이 핵심입니다."],
      ["삼성동 올빼미 #27", "서울 평균 전세 7억1,178만 원도 같은 방향의 숫자입니다."],
    ],
    [-2378]: [
      ["역삼 판다 #85", "10월 1일 이후 전세 매물이 늘어야 유예 효과가 보입니다."],
      ["해운대 고래 #11", "최장 2029년까지 미뤄도 2028년 입주 공백은 남습니다."],
    ],
    [-2379]: [
      ["한남 재규어 #35", "매물 44.6% 감소가 10.11% 상승의 직접 배경입니다."],
      ["마포 살괭이 #16", "주간 상승이 10.11% 위로 더 가팔라지는지를 보겠습니다."],
    ],
    [-2380]: [
      ["삼성동 올빼미 #27", "순차 이주가 현장에서 매물로 이어지는지가 관건입니다."],
      ["판교 늑대 #98", "목동·동북권 전세 매물이 더 빠지면 가격이 먼저 움직입니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-18 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-18T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-18 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-18T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-18T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("analystPosts-markets: -2365~-2370, -2371~-2376, -2377~-2380");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260918-markets done");
}

main();
