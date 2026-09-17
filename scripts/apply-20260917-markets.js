#!/usr/bin/env node
/** Insert 2026-09-17 KR + Safe + KR-RE reports, wall, analyst. */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KR_RE } = require("./data-20260917-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-17";
const UPDATED = "2026.09.17 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T17 = 1789599600000; // 2026-09-17 08:00 KST
const TAG = "20260917";

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
    ["lib/reports-kr.ts", "kr-seed-205", KR],
    ["lib/reports-safe.ts", "safe-seed-182", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-170", KR_RE],
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
    { id: 1, nickname: ${JSON.stringify(a[0])}, holdingLabel: ${JSON.stringify(a[1])}, content: ${JSON.stringify(a[2])}, createdAt: T17 + 600000, likes: 5 },
    { id: 2, nickname: ${JSON.stringify(b[0])}, holdingLabel: ${JSON.stringify(b[1])}, content: ${JSON.stringify(b[2])}, createdAt: T17 + 1200000, likes: 4 },
  ],
`;
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T17 =")) {
    c = c.replace(
      "const T16 = 1789513200000; // 2026-09-16 08:00 KST",
      "const T17 = 1789599600000; // 2026-09-17 08:00 KST\nconst T16 = 1789513200000; // 2026-09-16 08:00 KST",
    );
  }

  if (!c.includes("id: 9351")) {
    const kr = [
      [9351, "코스피", "육칠일칠반등", "인덱스 보유", "코스피 5일만에 반등 6717.97(+1.37%). 외인은 6일째 1.68조 팔았는데 기관이 1.21조 받아냄"],
      [9352, "삼성전자", "삼전이나흘끊음", "삼성전자 보유", "삼성전자 25만3500원 +2.01%. 나흘하락 끊음. 외인 4906억 팔고 기관 4121억 삼"],
      [9353, "SK하이닉스", "닉스임단협가결", "하이닉스 보유", "하이닉스 +4.08% 175만9천. 임단협 57.08% 가결 + 인텔 오하이오 공장 임대검토"],
      [9354, "삼성바이오로직스", "바이오공개매수", "관심종목", "삼성바이오 폴리펩타이드 공개매수 시작. 주당 44.31프랑, 전량하면 2.7조. 10/12까지"],
      [9355, "현대차", "현대차이삼육", "현대차 관심", "현대차 362000원 -1.36%. 코스피는 올랐는데 자동차만 반대로 감"],
    ];
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${wallRows(kr, "T17")}\n`);
    const krC =
      commentPair(9351, ["기관만이조일", "관망", "외인 6일째 파는데 기관이 지수 지킨거임"], ["환율일삼육팔", "관심종목", "환율은 9.2원 오른 1368.6원, 주가랑 반대로 감"]) +
      commentPair(9352, ["삼전이나흘끊음", "삼성전자 보유", "장중 247500까지 찍고 254000까지 회복"], ["에이치비엠가이던스", "관심종목", "3분기 HBM 출하 숫자 나오면 수급이랑 따로 봐야함"]) +
      commentPair(9353, ["닉스임단협가결", "하이닉스 보유", "현금 50 주식 50으로 바꿔서 3주만에 통과"], ["오하이오임대", "관심종목", "미국생산은 아직 검토단계, 계약 나오면 그때 숫자"]) +
      commentPair(9354, ["바이오공개매수", "관심종목", "최대주주 55.65%는 이미 응모 확약했음"], ["십일월종결", "관심종목", "11월말 인수 끝나면 상장폐지 추진한다더라"]) +
      commentPair(9355, ["현대차이삼육", "현대차 관심", "반도체만 오르고 자동차는 유가 부담"], ["기아십이만", "관심종목", "기아 정규장 121800, 애프터는 더 약했음"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9356")) {
    const safe = [
      [9356, "한장요약", "연준인상세이프", "관망", "연준 0.25%p 인상 뒤 BTC 75355까지 찍고 75813 회복. 금은 4324로 반등"],
      [9357, "비트코인", "비트칠오팔일삼", "BTC 보유", "발표 한시간만에 75355 찍고 75813으로 되돌림. 이미 90% 반영이라 충격 짧았음"],
      [9358, "금", "금사삼이사", "금 ETF", "금 4324달러 +0.7%. 오전에 4288까지 밀렸다가 달러약세에 반전"],
      [9359, "이더리움", "이더이사백", "관심", "이더 2400선 -4%. BTC보다 더 흔들림. ETF도 1.42억 빠짐"],
      [9360, "원유", "유가백이불", "관심", "WTI 102.43불 -3.2%. 100불 넘긴 다음날 숨고르기. API랑 EIA 재고가 반대로 나옴"],
    ];
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${wallRows(safe, "T17")}\n`);
    const sC =
      commentPair(9356, ["워시물가발언", "관망", "인상 자체보다 연내 추가인상 16명이 더 큼"], ["은육사불", "관망", "은은 장중 64.4불까지, 금보다 출렁임 컸음"]) +
      commentPair(9357, ["비트칠오팔일삼", "BTC 보유", "7.5만 구간 오늘도 지키는지가 관건"], ["이티에프유출", "관심", "15일 현물ETF 4.5억 빠짐, 하루짜리인지 봐야함"]) +
      commentPair(9358, ["금사삼이사", "금 ETF", "200일선 4321이 지지로 거론됨"], ["중앙은행매수", "관심", "2분기 중앙은행 순매수 1년전보다 62% 늘었음"]) +
      commentPair(9359, ["이더이사백", "관심", "청산 3.19억으로 메이저 중 가장 컸음"], ["클래리티여파", "관심", "규제법 막힌 다음날이라 금리보다 예민했음"]) +
      commentPair(9360, ["유가백이불", "관심", "API는 재고 +710만, EIA는 -64만이라 해석이 갈림"], ["사우디복구", "관심", "송유관 복구 안되면 100불 아래 안착 어려움"]);
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9361")) {
    const re = [
      [9361, "한장요약", "이주십팔만", "관심", "서울 정비사업 이주 18만가구 추산. 전세매물 13%↓, 정부는 착공 23.4만호 지원"],
      [9362, "정비사업", "목동이만육천", "관심", "목동 1~14단지 이주대상 26629가구. 2030년 고도제한 전에 인가받으려 속도냄"],
      [9363, "전세", "전세매물삼만칠", "관심", "서울 전월세매물 37386건 1년전보다 13%↓. 대치동은 44.3% 급감"],
      [9364, "공급정책", "동의율칠십", "관심", "재개발 조합설립 동의율 75→70%. 이주비대출은 이달 31일부터 완화"],
    ];
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${wallRows(re, "T17")}\n`);
    const rC =
      commentPair(9361, ["전세칠육일", "관심", "올해 전세 +7.61%, 작년 같은기간의 5배"], ["착공대책이주", "관심", "공급 늘리려면 이삿짐이 먼저 나옴"]) +
      commentPair(9362, ["목동이만육천", "관심", "고도제한 2030년 11월이라 단지들이 서두름"], ["순공급칠사", "관심", "재개발 순공급효과가 7.4%밖에 안된다는 분석도 있음"]) +
      commentPair(9363, ["전세매물삼만칠", "관심", "월세 평균 162만원이 역대 최고라더라"], ["갱신계약늘음", "관심", "이사가기 힘드니 그냥 갱신하는 가구 늘고있음"]) +
      commentPair(9364, ["동의율칠십", "관심", "동의율 낮춰도 현장 조합설립이 늘어야 의미있음"], ["이주비삼십일", "관심", "종전·종후 중 큰값으로 LTV 준다는데 31일부터"]);
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }

  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T17 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2351")) {
    console.log("analyst markets -2351 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2351, alias: "여의도 수리 #34", symbol: "한장요약", content: "어제 브리핑입니다. 코스피가 5거래일 만에 반등해 6,717.97로 마감했습니다. 외국인은 1조6,826억 원을 팔았지만 기관이 1조2,117억 원을 받아냈습니다. 밤사이 연준 인상 이후 오늘 외국인 수급이 반등의 다음 시험입니다." },
    { id: -2352, alias: "성수 너구리 #19", symbol: "삼성전자", content: "삼성전자가 25만3,500원으로 2.01% 오르며 나흘 하락을 끊었습니다. 외국인 4,906억 원 매도에도 기관이 4,121억 원을 사들였습니다. 3분기 HBM 출하 가이던스가 나오면 수급과 따로 적어 두겠습니다." },
    { id: -2353, alias: "판교 치타 #27", symbol: "SK하이닉스", content: "SK하이닉스가 4.08% 오른 175만9,000원입니다. 전임직 재합의안이 찬성 57.08%로 가결됐고, 오후에는 인텔 오하이오 공장 임대 검토 보도가 나왔습니다. 미국 생산은 아직 논의 단계라 계약 공개를 다음에 확인하겠습니다." },
    { id: -2354, alias: "삼성동 여우 #13", symbol: "삼성바이오로직스", content: "삼성바이오로직스가 폴리펩타이드그룹 공개매수를 시작했습니다. 주당 44.31스위스프랑, 전량 응모 시 약 2조7,000억 원입니다. 최대주주 55.65% 응모가 확약됐고 마감은 10월 12일입니다." },
    { id: -2355, alias: "잠실 백로 #30", symbol: "현대차", content: "현대차가 36만2,000원으로 1.36% 내리며 반도체 강세와 갈렸습니다. 코스피는 올랐지만 하락 종목이 더 많은 하루였습니다. 유가와 금리가 진정된 뒤 완성차가 지수와 다시 같은 방향으로 가는지를 보겠습니다." },
  ];

  const SAFE_POSTS = [
    { id: -2356, alias: "온체인 매 #08", symbol: "한장요약", content: "연준이 금리를 0.25%포인트 올린 뒤 비트코인은 7만5,355달러까지 밀렸다가 7만5,813달러로 되돌렸습니다. 금은 4,324달러로 0.7% 반등했고 WTI는 102.43달러로 숨 고르기에 들어갔습니다. 이더는 2,400달러 부근에서 더 크게 흔들렸습니다." },
    { id: -2357, alias: "금벌레 학 #20", symbol: "비트코인", content: "비트코인이 발표 한 시간 만에 저점을 찍고 되돌렸습니다. 이미 90% 넘게 반영된 인상이라 충격은 짧았습니다. 다만 15일 현물 ETF에서 4억5,040만 달러가 빠져, 7만5,000달러 지지와 자금 흐름을 같이 보겠습니다." },
    { id: -2358, alias: "은빛 갈매기 #10", symbol: "금", content: "금 현물이 4,324달러로 0.7% 올랐습니다. 오전에 4,288달러까지 밀렸다가 달러 약세와 유가 조정에 반전했습니다. 200일 평균 4,321달러가 지지선으로 거론됩니다." },
    { id: -2359, alias: "알트 수달 #26", symbol: "이더리움", content: "이더리움이 2,400달러 부근에서 4%대 약세를 이어갔습니다. 청산 3억1,194만 달러로 메이저 중 가장 컸고, 현물 ETF에서도 1억4,230만 달러가 빠졌습니다. 클래리티법 부결 다음 날이라 금리보다 규제 민감도가 더 커 보입니다." },
    { id: -2360, alias: "원유 고래 #04", symbol: "원유", content: "WTI가 102.43달러로 3.2% 내리며 100달러 위 급등 뒤 조정했습니다. API는 재고가 710만 배럴 늘었다고 했고 EIA는 64만 배럴 줄었다고 해 해석이 갈립니다. 사우디 송유관 복구가 다음 가격의 열쇠입니다." },
  ];

  const RE_POSTS = [
    { id: -2361, alias: "전세 참새 #07", symbol: "한장요약", content: "서울 정비사업 이주가 2030년까지 약 18만 가구로 추산됩니다. 전월세 매물은 이미 13% 줄었고 전세는 올해 7.61% 올랐습니다. 정부는 동의율을 70%로 낮춰 23만4,000호 착공을 지원하지만, 공급 전에 이삿짐이 먼저 나옵니다." },
    { id: -2362, alias: "갱신 백로 #38", symbol: "정비사업", content: "목동 1~14단지 이주 대상만 2만6,629가구입니다. 2030년 11월 고도제한 전에 인가를 받으려 속도가 붙고 있습니다. 순차 이주가 현장에서 실제로 이뤄지는지를 확인하겠습니다." },
    { id: -2363, alias: "매물 학 #21", symbol: "전세", content: "서울 아파트 전월세 매물 3만7,386건은 1년 전보다 13% 준 숫자입니다. 대치동은 44.3% 급감했습니다. 7월 평균 월세 162만 원이 역대 최고인 점도 같은 줄에 적어둡니다." },
    { id: -2364, alias: "정책 너구리 #24", symbol: "공급정책", content: "재개발 조합설립 동의율이 75%에서 70%로 낮아집니다. 이주비 대출은 종전·종후 평가액 중 큰 값을 쓰도록 이달 31일부터 바뀝니다. 규칙 변경이 실제 조합 설립으로 이어지는지를 보겠습니다." },
  ];

  const KR_COMMENTS = {
    [-2351]: [
      ["인천 갈매기 #59", "환율은 1,368.6원으로 올라 주가 반등과 반대였습니다."],
      ["합정 수달 #14", "하락 종목이 578개라 체감 온도와 지수가 달랐습니다."],
    ],
    [-2352]: [
      ["마포 살괭이 #15", "장중 24만7,500원까지 찍은 뒤 고가 25만4,000원이었습니다."],
      ["판교 늑대 #97", "삼성전기가 4.86% 올라 전자 계열 온기가 같이 돌았습니다."],
    ],
    [-2353]: [
      ["인천 갈매기 #59", "현금 비중을 40%에서 50%로 올려 3주 만에 통과됐습니다."],
      ["압구정 치타 #51", "미국 생산은 논의 단계라 부지와 일정이 나와야 숫자가 됩니다."],
    ],
    [-2354]: [
      ["잠실 백로 #36", "최대주주 지분 전량 응모 확약이라 인수 성공 가능성은 높습니다."],
      ["청담 여우 #18", "11월 말 종결 뒤 상장폐지와 90% 강제매수 절차가 남습니다."],
    ],
    [-2355]: [
      ["역삼 판다 #84", "기아 정규장 종가는 12만1,800원이었습니다."],
      ["해운대 고래 #10", "유가 100달러와 금리 인상이 완성차 할인율을 같이 올렸습니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2356]: [
      ["종로 까치 #48", "은은 장중 64.4달러까지 올라 금보다 변동이 컸습니다."],
      ["광화문 여우 #69", "연내 추가 인상 전망이 위험자산 할증을 남겨 둡니다."],
    ],
    [-2357]: [
      ["여의도 수리 #35", "15일 ETF 유출은 블랙록과 피델리티가 대부분이었습니다."],
      ["송파 독수리 #73", "클래리티법 부결과 인상이 이틀 연속으로 겹쳤습니다."],
    ],
    [-2358]: [
      ["역삼 판다 #84", "12월물 선물은 4,365달러로 0.8% 올랐습니다."],
      ["해운대 고래 #10", "2분기 중앙은행 순매수가 1년 전보다 62% 늘었습니다."],
    ],
    [-2359]: [
      ["분당 매 #38", "블랙록 ETHA에서만 9,800만 달러가 빠졌습니다."],
      ["한남 재규어 #34", "2,400달러 선이 지지되는지가 다음 관찰 포인트입니다."],
    ],
    [-2360]: [
      ["삼성동 올빼미 #26", "API와 EIA 재고 차이가 774만 배럴입니다."],
      ["판교 늑대 #97", "연준이 유가 100달러를 물가 이유로 명시했습니다."],
    ],
  };

  const RE_COMMENTS = {
    [-2361]: [
      ["성수 너구리 #22", "공급 대책과 전세난이 같은 시기에 겹칠 수 있습니다."],
      ["삼성동 올빼미 #26", "전세 누적 7.61%가 주간으로 더 가팔라지는지를 보겠습니다."],
    ],
    [-2362]: [
      ["역삼 판다 #84", "재개발 순공급 효과가 7.4%에 그친다는 분석도 있습니다."],
      ["해운대 고래 #10", "양천구 이주 지원 용역이 매물로 이어지는지 확인하겠습니다."],
    ],
    [-2363]: [
      ["한남 재규어 #34", "갱신 계약이 늘면 유동 매물은 더 줄어드는 순환입니다."],
      ["마포 살괭이 #15", "대치동 매물 44.3% 감소는 재건축 단지 밀집 영향입니다."],
    ],
    [-2364]: [
      ["삼성동 올빼미 #26", "토지면적 50% 동의 요건은 그대로 유지됩니다."],
      ["판교 늑대 #97", "2028년까지 착공하면 임대주택 인수가격이 100%로 올라갑니다."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-17 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-17T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-17 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-17T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-17T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("analystPosts-markets: -2351~-2355, -2356~-2360, -2361~-2364");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260917-markets done");
}

main();
