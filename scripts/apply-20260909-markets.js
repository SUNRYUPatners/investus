#!/usr/bin/env node
/** Insert 2026-09-09 KR + Safe + KR-RE reports, wall, analyst (diverse copy). */
const fs = require("fs");
const path = require("path");
const { KR, SAFE, KRRE } = require("./data-20260909-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DASH = "2026-09-09";
const UPDATED = "2026.09.09 08:40";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T09 = 1788908400000; // 2026.09.09 08:00 KST
const TAG = "20260909";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const ALIASES = [
  "종로 까치 #41", "광화문 여우 #62", "여의도 수리 #28", "송파 독수리 #66",
  "분당 매 #31", "성수 너구리 #15", "역삼 판다 #77", "한남 재규어 #27",
  "삼성동 올빼미 #19", "해운대 고래 #03", "마포 살괭이 #08", "판교 늑대 #90",
  "인천 갈매기 #52", "압구정 치타 #44", "잠실 백로 #29", "청담 여우 #11",
  "합정 수달 #07", "이태원 부엉이 #18", "성북 참새 #33", "노원 기러기 #21",
  "분당 호랑이 #55", "여의도 학 #12", "강남 표범 #04", "마곡 펠리컨 #63",
];

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
    ["lib/reports-kr.ts", "kr-seed-157", KR],
    ["lib/reports-safe.ts", "safe-seed-127", SAFE],
    ["lib/reports-kr-re.ts", "krre-seed-135", KRRE],
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
  if (!c.includes("const T09 =")) {
    c = c.replace(
      "const T08 = 1788822000000; // 2026-09-08 08:00 KST",
      "const T09 = 1788908400000; // 2026-09-09 08:00 KST\nconst T08 = 1788822000000; // 2026-09-08 08:00 KST",
    );
  }

  if (!c.includes("id: 9086")) {
    const kr = [
      [9086, "코스피", "칠천되돌림", "인덱스 보유", "어제 7171까지 찍고 6954로 마감… 고점 대비 되돌림이 핵심이지 −0.58%만 보면 놓침"],
      [9087, "삼성전자", "이십칠만방어", "삼성전자 보유", "276500 넘었다가 269500. 리밸런싱 0.2조 추정은 수급 칸, 테일러는 중기 칸"],
      [9088, "SK하이닉스", "리밸런싱경계", "하이닉스 보유", "+0.56%인데 리밸런싱 1.2조대 매도 추정 겹침. 종가 강세랑 섞지 말자"],
      [9089, "LG에너지솔루션", "엔솔급락체크", "관심종목", "−3.86%면 반도체보다 세게 맞음. 유가·금리 체인으로만 일단 분류"],
      [9090, "현대차", "완성차베타", "현대차 관심", "약 −2%면 유가·할부 수요 쪽. 모빌리티 뉴스는 중기에만"],
      [9091, "KB금융", "금리은행줄", "KB금융 관심", "미 10년 4.8% 서사에 은행 −1%대. NIM이랑 연체 한 화면에"],
    ];
    const block = kr
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T09 - ${i * 1800000}, likes: ${44 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${block}\n`);
    const krC = `  9086: [
    { id: 1, nickname: "수급표작성", holdingLabel: "관망", content: "개인 매도·외인 매수를 지수 등락이랑 한 셀에 넣지 마세요", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "칠천되돌림", holdingLabel: "인덱스 보유", content: "7000 회복은 종가+유가 안정일 때만", createdAt: T09 + 1200000, likes: 4 },
  ],
  9087: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "장중 고가랑 종가 칸을 나눔", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "이십칠만방어", holdingLabel: "삼성전자 보유", content: "리밸런싱 11일 적용 전후 수급만 체크", createdAt: T09 + 1200000, likes: 4 },
  ],
  9088: [
    { id: 1, nickname: "리밸런싱경계", holdingLabel: "하이닉스 보유", content: "비중 상한 매도는 이벤트 수급이에요", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "장비유입러", holdingLabel: "관심종목", content: "한미·주성 상대 성과도 옆에", createdAt: T09 + 1200000, likes: 4 },
  ],
  9089: [
    { id: 1, nickname: "엔솔급락체크", holdingLabel: "관심종목", content: "배터리 수주랑 업종 베타 분리", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "유가보는사람", holdingLabel: "관심종목", content: "브렌트 98 근처면 원가 줄이 먼저", createdAt: T09 + 1200000, likes: 4 },
  ],
  9090: [
    { id: 1, nickname: "완성차베타", holdingLabel: "현대차 관심", content: "판매·인센티브 숫자 나오기 전엔 관망", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "할부수요체크", holdingLabel: "관심종목", content: "금리 급등 구간 추격 패스", createdAt: T09 + 1200000, likes: 4 },
  ],
  9091: [
    { id: 1, nickname: "금리은행줄", holdingLabel: "KB금융 관심", content: "NIM 기대와 주가 급락은 시계가 다름", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "연체표러", holdingLabel: "관심종목", content: "회의 전 은행 레버리지 줄임", createdAt: T09 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9176")) {
    const safe = [
      [9176, "매크로", "확률갈림러", "관망", "폴리마켓 인상 51.5%인데 CME는 더 높다… 시장 간 괴리부터 표에"],
      [9177, "비트코인", "팔만이탈러", "BTC 보유", "78300~78500이면 8만 이탈 후 심리. 금 상관이랑 청산 맵을 한 줄에 안 넣음"],
      [9178, "금", "사천사백밴드", "금 ETF", "4400달러대 금은 느리게, 비트는 빠르게. 확률 숫자로 방향 단정 안 함"],
      [9179, "원유", "브렌트구십팔", "관심", "브렌트 98이면 인플레·위험자산 동시에 건드려. 금이랑 같은 칸 금지"],
      [9180, "달러", "디엑시캘린더", "관망", "CPI 11일·FOMC 15~16이 한 주. 원달러만 보면 오독"],
      [9181, "은", "은이중줄", "관심", "헤지 옆에 산업 수요 줄. 금은비율 벌어지면 해석 갈림"],
    ];
    const block = safe
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T09 - ${i * 1800000}, likes: ${41 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${block}\n`);
    const sC = `  9176: [
    { id: 1, nickname: "매크로올빼미", holdingLabel: "관심종목", content: "확률 괴리는 포지션 차이일 수 있어요", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "확률갈림러", holdingLabel: "관망", content: "회의 전엔 사이즈부터 줄일게요", createdAt: T09 + 1200000, likes: 4 },
  ],
  9177: [
    { id: 1, nickname: "ETF추적", holdingLabel: "관심종목", content: "유입 없는 반등은 숏커버 태그", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "팔만이탈러", holdingLabel: "BTC 보유", content: "다음 심리는 7.8만 지지 여부", createdAt: T09 + 1200000, likes: 4 },
  ],
  9178: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "온스보다 실질금리 방향이 먼저", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "사천사백밴드", holdingLabel: "금 ETF", content: "비트만 급락하면 상관이 깨져요", createdAt: T09 + 1200000, likes: 4 },
  ],
  9179: [
    { id: 1, nickname: "브렌트구십팔", holdingLabel: "관심", content: "재고·감산·지정학을 세 줄로", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "인플레체크", holdingLabel: "관심종목", content: "항공·화학 파급도 옆에", createdAt: T09 + 1200000, likes: 4 },
  ],
  9180: [
    { id: 1, nickname: "디엑시캘린더", holdingLabel: "관망", content: "DXY랑 원달러를 다른 시트에", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "금리표러", holdingLabel: "관심종목", content: "회의 전 달러 레버리지 패스", createdAt: T09 + 1200000, likes: 4 },
  ],
  9181: [
    { id: 1, nickname: "은이중줄", holdingLabel: "관심", content: "산업 수요 줄 없으면 헤지 추격 안 함", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "금은비율러", holdingLabel: "관망", content: "비율이랑 달러를 같이", createdAt: T09 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9284")) {
    const re = [
      [9284, "전세", "팔십팔퍼센트", "관심", "갱신권 없이 88%가 보증금 올림… 평균 4680만. 꼬리 사례랑 평균 섞지 말자"],
      [9285, "전세", "매물이만사", "관심", "서울 전세매물 20432에 −12%. 지수 101.9면 협상력 기울기 신호"],
      [9286, "전세", "월세전환러", "관심", "전세→월세 전환에 가을 이사 겹치면 성급 계약 위험. 한도 조회 먼저"],
      [9287, "정책", "공급규제시계", "관심", "지을 속도랑 규제 속도가 다르면 실수요만 힘듦. 전세 통계랑 한 신호로 안 묶음"],
    ];
    const block = re
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T09 - ${i * 1800000}, likes: ${39 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${block}\n`);
    const rC = `  9284: [
    { id: 1, nickname: "갱신권체크", holdingLabel: "관심종목", content: "갱신권 유무가 인상폭을 가릅니다", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "팔십팔퍼센트", holdingLabel: "관심", content: "1억·3억 꼬리는 분포로만", createdAt: T09 + 1200000, likes: 4 },
  ],
  9285: [
    { id: 1, nickname: "매물이만사", holdingLabel: "관심", content: "구별 표 없으면 도시만으로 계약 금지", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "지수신고", holdingLabel: "관심종목", content: "101.9는 22년 10월 이후 최고 수준", createdAt: T09 + 1200000, likes: 4 },
  ],
  9286: [
    { id: 1, nickname: "월세전환러", holdingLabel: "관심", content: "등기·확정일자 양보 안 함", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "대출한도먼저", holdingLabel: "관심종목", content: "한도 안 나오면 노룩 거절", createdAt: T09 + 1200000, likes: 4 },
  ],
  9287: [
    { id: 1, nickname: "공급규제시계", holdingLabel: "관심", content: "입주 캘린더랑 대출 규정을 한 표에", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "실수요서류", holdingLabel: "관심종목", content: "시행령 전 숫자를 확정으로 안 씀", createdAt: T09 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }
  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T09 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2200")) {
    console.log("analyst markets -2200 already — skip");
    return;
  }

  const KR_POSTS = [
    { id: -2200, alias: "여의도 너구리 #11", symbol: "한장요약", content: "수요일 장전입니다. 어제(9/8) 종가만 보면 코스피 6,954(−0.58%)·장중 7,171 되돌림, 개인 약 3조대 매도·외인·기관 약 6조대 매수입니다. 반도체 리밸런싱(10일)과 유가·금리를 세 칸으로 나누겠습니다." },
    { id: -2201, alias: "성수 수달 #35", symbol: "코스피", content: "−40포인트보다 장중 고점 대비 되돌림이 본문입니다. 외국인 매수와 지수 하락을 한 문장에 넣지 마세요. 7,000 회복은 종가와 유가가 같이 확인할 때만 적겠습니다." },
    { id: -2202, alias: "판교 치타 #22", symbol: "삼성전자", content: "269,500(−0.19%)에 장중 276,500+ 반납입니다. 리밸런싱 추정 매도와 테일러·인공지능5는 칸이 다릅니다. 하이닉스 상대 성과만 표에 남기겠습니다." },
    { id: -2203, alias: "삼성동 여우 #08", symbol: "SK하이닉스", content: "1,793,000(+0.56%)이지만 장중 1,872,000 되돌림과 리밸런싱 약 1.2조 매도 추정이 겹칩니다. 종가 플러스를 수급 안도로 읽지 않겠습니다." },
    { id: -2204, alias: "잠실 백로 #29", symbol: "LG에너지솔루션", content: "348,500(−3.86%)은 시총 상위 중 큰 폭입니다. 유가·금리 체인으로 먼저 분류하고, 수주·가동률은 중기 칸에만 두겠습니다." },
    { id: -2205, alias: "광화문 물총새 #06", symbol: "현대차", content: "약 −2.04%는 완성차 베타입니다. 모빌리티 헤드라인과 섞지 않고 판매·인센티브·유가만 단기 칸에 남기겠습니다." },
    { id: -2206, alias: "한남 두루미 #17", symbol: "KB금융", content: "약 −1.25%는 미 10년물 급등 서사와 방향이 같습니다. 순이자마진 기대와 연체를 한 화면에 두고 회의 전 추격은 하지 않겠습니다." },
  ];

  const SAFE_POSTS = [
    { id: -2220, alias: "온체인 매 #03", symbol: "한장요약", content: "금 온스 약 4,400달러, 비트코인 7만 8천 달러대, 브렌트 약 98달러가 한 주에 겹쳤습니다. 인상 확률은 예측시장과 선물이 갈립니다. 물가 11일·회의 15~16일 전에 자산별 칸을 나누겠습니다." },
    { id: -2221, alias: "금벌레 학 #14", symbol: "비트코인", content: "8만 달러 이탈 후 7만 8.3~8.5만입니다. 금 상관이 높아도 청산 속도는 암호화폐입니다. 유입 맵을 먼저 보겠습니다." },
    { id: -2222, alias: "달러 올빼미 #09", symbol: "금", content: "4,400달러대는 밴드 앵커이고, 인상 51.5% 대 선물 58~66% 괴리가 있습니다. 실질금리·달러가 안 풀리면 헤지 프레임이 하루짜리가 될 수 있습니다." },
    { id: -2223, alias: "원유 갈매기 #05", symbol: "원유", content: "브렌트 약 98·서부텍사스산 약 94는 지정학 프리미엄입니다. 금·비트코인 헤지와 같은 칸에 두지 않겠습니다. 재고와 외교 일정을 분리합니다." },
    { id: -2224, alias: "디엑시 치타 #18", symbol: "달러", content: "달러인덱스는 금·비트·은·유가의 공통 분모입니다. 원·달러만 보면 오독합니다. 회의 전 달러 레버리지는 두지 않겠습니다." },
    { id: -2225, alias: "은광 수달 #21", symbol: "은", content: "은은 헤지와 산업이 겹칩니다. 금·유가 서사만으로 추격하면 태양광·전자 줄을 놓칩니다. 금은비율과 달러를 같이 보겠습니다." },
  ];

  const RE_POSTS = [
    { id: -2240, alias: "전세 참새 #02", symbol: "한장요약", content: "오늘은 갱신권 없는 재계약 인상 비중(약 88%)·평균 4,680만·매물 20,432·지수 101.9·월세 전환·정책 정합성을 나눕니다. 꼬리 사례로 시장을 단정하지 않겠습니다." },
    { id: -2241, alias: "갱신 백로 #33", symbol: "전세", content: "갱신권 유무가 인상폭을 가릅니다. 1억 이상 360건은 꼬리입니다. 평균과 분포를 한 문장에 넣지 않겠습니다." },
    { id: -2242, alias: "매물 학 #16", symbol: "전세", content: "매물 −12%와 지수 101.9는 협상력 신호일 수 있습니다. 구별 대출 가능액 없이 ‘사야 한다’로 읽지 않겠습니다." },
    { id: -2243, alias: "월세 여우 #27", symbol: "전세", content: "전세→월세 전환은 주거비 구조 변화입니다. 가을 이사 시즌에 한도 조회 없는 계약은 거절하겠습니다." },
    { id: -2244, alias: "정책 너구리 #19", symbol: "정책", content: "공급 시계와 규제 시계가 다르면 실수요 자금줄이 먼저 조여집니다. 전세 통계와 정책을 한 신호로 합치지 않겠습니다." },
  ];

  const KR_COMMENTS = {
    [-2200]: [
      ["인천 갈매기 #52", "6조대 외인·기관은 방향이지 전 업종 전환이 아닙니다."],
      ["청담 여우 #11", "유가 98과 지수 −0.58을 한 줄로 합치지 말죠."],
    ],
    [-2201]: [
      ["성북 참새 #33", "코스닥 −1.25%면 중소형 체감이 더 아픕니다."],
      ["여의도 학 #12", "7000 회복은 종가 확인 후 적겠습니다."],
    ],
    [-2202]: [
      ["압구정 치타 #44", "리밸런싱 0.2조는 이벤트 수급 가중치를 낮게."],
      ["합정 수달 #07", "269,500 지지 여부를 손절 문장에 미리."],
    ],
    [-2203]: [
      ["잠실 백로 #29", "1.2조 추정이 사흘에 걸쳐 나오는지 보겠습니다."],
      ["이태원 부엉이 #18", "장비주 상대 성과를 옆에 둡니다."],
    ],
    [-2204]: [
      ["노원 기러기 #21", "엔솔 베타와 반도체 베타를 분리해 표에."],
      ["분당 호랑이 #55", "원재료·수요가 단기 1등입니다."],
    ],
    [-2205]: [
      ["성북 참새 #33", "완성차 상대 성과를 반도체와 분리합니다."],
      ["강남 표범 #04", "유가·할부가 단기 변수입니다."],
    ],
    [-2206]: [
      ["합정 수달 #07", "NIM·연체를 한 화면, 추격은 다음입니다."],
      ["마곡 펠리컨 #63", "은행 베타는 반도체와 다릅니다."],
    ],
  };

  const SAFE_COMMENTS = {
    [-2220]: [
      ["삼성동 올빼미 #19", "원유·달러·은으로 로테이션한 이유를 표에 남기겠습니다."],
      ["판교 늑대 #90", "회의 전 알트·비트 레버리지는 줄입니다."],
    ],
    [-2221]: [
      ["해운대 고래 #03", "유입 없는 반등은 숏커버로만 태그합니다."],
      ["인천 갈매기 #52", "거래소 시각을 고정해 두세요."],
    ],
    [-2222]: [
      ["마포 살괭이 #08", "확률 괴리와 온스를 한 문장에 넣지 않겠습니다."],
      ["압구정 치타 #44", "실질금리 대용을 매일 같은 시각에."],
    ],
    [-2223]: [
      ["판교 늑대 #90", "재고와 지정학을 헤지 서사와 분리합니다."],
      ["잠실 백로 #29", "유가 사이즈는 금보다 이벤트 성격이 큽니다."],
    ],
    [-2224]: [
      ["인천 갈매기 #52", "DXY와 원달러를 다른 시트에 둡니다."],
      ["청담 여우 #11", "공통 분모가 흔들리면 포트가 같이 흔들립니다."],
    ],
    [-2225]: [
      ["압구정 치타 #44", "금은비율이 벌어지면 산업 줄을 먼저 봅니다."],
      ["합정 수달 #07", "은 사이즈는 금보다 작게."],
    ],
  };

  const RE_COMMENTS = {
    [-2240]: [
      ["분당 매 #31", "여섯 칸을 한 ‘사라’ 신호로 합치지 않겠습니다."],
      ["한남 재규어 #27", "꼬리 사례와 평균을 섞지 말죠."],
    ],
    [-2241]: [
      ["성수 너구리 #15", "갱신권 서류 여부를 먼저 확인하세요."],
      ["삼성동 올빼미 #19", "대출 한도가 계약 관문입니다."],
    ],
    [-2242]: [
      ["역삼 판다 #77", "구별 실거래·호가 확인 전엔 추격 안 합니다."],
      ["해운대 고래 #03", "매물 추이를 지수 옆에."],
    ],
    [-2243]: [
      ["한남 재규어 #27", "월세 전환 비율을 매물 신호로만."],
      ["마포 살괭이 #08", "노룩 계약 유혹은 거절합니다."],
    ],
    [-2244]: [
      ["삼성동 올빼미 #19", "입주와 규제 시계가 다르다는 점을 먼저 적습니다."],
      ["판교 늑대 #90", "시행령 전 헤드라인을 확정으로 쓰지 마세요."],
    ],
  };

  function postsBlock(label, posts, hour) {
    return (
      `  // ── 2026-09-09 ${label} ──────────────────────\n` +
      posts
        .map(
          (p, i) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${28 - i}, comments: 2, created_at: ${JSON.stringify(`2026-09-09T${String(hour).padStart(2, "0")}:${String(i * 8).padStart(2, "0")}:00.000Z`)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n"
    );
  }

  function commentsBlock(label, map, hour) {
    let out = `  // ── 2026-09-09 ${label} 댓글 ──────────────────────\n`;
    for (const [id, pairs] of Object.entries(map)) {
      out += `  [${id}]: [\n`;
      out += `    { alias: ${JSON.stringify(pairs[0][0])}, content: ${JSON.stringify(pairs[0][1])}, created_at: "2026-09-09T${String(hour).padStart(2, "0")}:10:00.000Z" },\n`;
      out += `    { alias: ${JSON.stringify(pairs[1][0])}, content: ${JSON.stringify(pairs[1][1])}, created_at: "2026-09-09T${String(hour).padStart(2, "0")}:17:00.000Z" },\n`;
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
  console.log("analystPosts-markets: -2200~-2206, -2220~-2225, -2240~-2244");
}

function main() {
  insertMarketReports();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260909-markets done");
}

main();
