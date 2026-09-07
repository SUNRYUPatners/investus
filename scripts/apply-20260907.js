#!/usr/bin/env node
/** Insert 2026-09-07 US + KR + Safe + KR-RE reports, analyst, wall (diverse copy). */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260907-us");
const { KR, SAFE, KRRE } = require("./data-20260907-markets");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.07";
const DATE_DASH = "2026-09-07";
const UPDATED = "2026.09.07 08:40";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T07SEP = 1788735600000; // 2026.09.07 08:00 KST
const TAG = "20260907";

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

function tsBlock(r, opts = {}) {
  const date = opts.dashDate ? DATE_DASH : DATE_DOT;
  const img = `/charts/${r.slug}-${TAG}.svg`;
  const imgEn = `/charts/${r.slug}-${TAG}-en.svg`;
  const pinned = r.pinned || r.isPinned ? "\n    isPinned: true," : "";
  const bodyHelper = opts.bodyHelper;
  const bodyField = bodyHelper
    ? `body: body(${JSON.stringify(r.body)}),`
    : `body: ${JSON.stringify(r.body)},`;
  return `  {
    id: ${JSON.stringify(r.id)},
    title: ${JSON.stringify(r.title)},
    summary: ${JSON.stringify(r.summary)},
    ${bodyField}
    titleEn: ${JSON.stringify(r.titleEn || r.title)},
    summaryEn: ${JSON.stringify(r.summaryEn || r.summary)},
    bodyEn: ${JSON.stringify(BODY_EN)},
    category: ${JSON.stringify(r.category)},
    categoryColor: ${JSON.stringify(r.color)},
    subject: ${JSON.stringify(r.subject)},
    date: ${JSON.stringify(date)},
    updatedAt: ${JSON.stringify(UPDATED)},${pinned}
    images: [${JSON.stringify(img)}],
    imagesEn: [${JSON.stringify(imgEn)}],
  }`;
}

function insertReportsTs() {
  let c = read("lib/reports.ts");
  if (c.includes('id: "seed-1501"')) {
    console.log("reports.ts: seed-1501 already present — skip");
  } else {
    const block = US.map((r) => tsBlock(r)).join(",\n") + ",\n";
    const idx = c.indexOf('  {\n    id: "seed-1476"');
    const idx2 = c.indexOf('id: "seed-1476"');
    const start = idx !== -1 ? idx : c.lastIndexOf("  {", idx2);
    if (idx2 === -1) throw new Error("seed-1476 not found");
    write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
    console.log("reports.ts: inserted seed-1501~1524");
  }

  c = read("lib/reports.ts");
  if (c.includes("  // 2026-09-07\n")) {
    console.log("REPORT_TICKERS: 2026-09-07 already present");
    return;
  }
  let tick = "  // 2026-09-07\n";
  for (const r of US) {
    const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
    tick += `  "${r.id}": [${t}],\n`;
  }
  const mark = "  // 2026-09-04";
  const tIdx = c.indexOf(mark);
  if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-04 marker missing");
  write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
  console.log("REPORT_TICKERS: inserted");
}

function insertMarketReports() {
  const jobs = [
    ["lib/reports-kr.ts", "kr-seed-144", KR, true],
    ["lib/reports-safe.ts", "safe-seed-130", SAFE, false],
    ["lib/reports-kr-re.ts", "krre-seed-124", KRRE, false],
  ];
  for (const [file, beforeId, arr, bodyHelper] of jobs) {
    let c = read(file);
    if (c.includes(`id: "${arr[0].id}"`)) {
      console.log(`${file}: ${arr[0].id} already present — skip`);
      continue;
    }
    const block = arr.map((r) => tsBlock(r, { dashDate: true, bodyHelper })).join(",\n") + ",\n";
    const idx = c.indexOf(`id: "${beforeId}"`);
    if (idx === -1) throw new Error(`${file}: ${beforeId} not found`);
    const start = c.lastIndexOf("  {", idx);
    write(file, c.slice(0, start) + block + c.slice(start));
    console.log(`${file}: inserted ${arr[0].id}~${arr[arr.length - 1].id}`);
  }
}

/** Diverse US analyst one-liners — structure rotated, no shared template */
function usAnalystCopy(r, i) {
  const s = r.summary.replace(/\n/g, " ").slice(0, 120);
  const modes = [
    () => `오늘 포인트만 남깁니다. ${r.title.replace(/습니다$/, "습니다")}`,
    () => `왜 지금 적나요? ${s}`,
    () => `${r.subject} 축입니다. ${s}`,
    () => `회의부터 하겠습니다. ${s} 확인 전에는 비중을 키우지 않겠습니다.`,
    () => `숫자만 먼저: ${s}`,
    () => `현장감으로 보면 ${s} 다음 주 지표와 같이 보시면 됩니다.`,
  ];
  return modes[i % modes.length]();
}

function usAnalystComment(r, i, k) {
  const opts = [
    [`이 숫자는 주간 표에만 남기고, 레버리지는 다음 확인 뒤로 미루겠습니다.`, `동의합니다. 해석보다 일정표가 먼저네요.`],
    [`의견·예측이면 태그를 달아 두겠습니다. 공시와는 가중치가 다릅니다.`, `예측시장·소셜 확률은 분위기 지표로만 쓰죠.`],
    [`경쟁사 자본조달과 자사 플릿 모델을 한 줄로 합치지 않겠습니다.`, `마일당 단가 표가 있으면 논쟁이 짧아집니다.`],
    [`하드웨어 시험 완료와 발사일 확정은 다른 칸입니다.`, `스택·통합 캠페인 일정을 따로 적어둡니다.`],
  ];
  return opts[i % opts.length][k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  if (c.includes("id: -1100")) {
    console.log("analystPosts US -1100 already — skip");
    return;
  }
  const posts = US.map((r, i) => {
    const id = -1100 - i;
    const comments = i % 3 === 0 ? 2 : 1;
    return {
      id,
      alias: ALIASES[i % ALIASES.length],
      symbol: r.pinned ? "MACRO" : (r.tickers && r.tickers[0]) || "MACRO",
      content: usAnalystCopy(r, i),
      comments,
      likes: 12 + (i % 9),
      created_at: `2026-09-07T${String(Math.floor((i * 7) / 60)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}:00.000Z`,
    };
  });
  const block =
    "  // ── 2026-09-07 신규 (24개 · 존댓말 · 구조 혼합) ──────────────────────\n" +
    posts
      .map(
        (p) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${p.likes}, comments: ${p.comments}, created_at: ${JSON.stringify(p.created_at)}, liked: false,
  },`,
      )
      .join("\n") +
    "\n";
  const mark = "  // ── 2026-09-04 신규";
  const idx = c.indexOf(mark);
  if (idx === -1) throw new Error("analyst 2026-09-04 marker missing");
  write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

  c = read("lib/analystPosts.ts");
  const comm =
    "  // ── 2026-09-07 애널 댓글 ──────────────────────\n" +
    posts
      .map((p, i) => {
        const lines = [
          `    { alias: ${JSON.stringify(ALIASES[(i + 3) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(US[i], i, 0))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":03:00.000Z"))} },`,
        ];
        if (p.comments >= 2) {
          lines.push(
            `    { alias: ${JSON.stringify(ALIASES[(i + 7) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(US[i], i, 1))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":05:00.000Z"))} },`,
          );
        }
        return `  [${p.id}]: [\n${lines.join("\n")}\n  ],`;
      })
      .join("\n") +
    "\n";
  const cmark = "  // ── 2026-09-04 애널 댓글";
  const cidx = c.indexOf(cmark);
  if (cidx === -1) throw new Error("analyst comments marker missing");
  write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
  console.log("analystPosts US: -1100~-1123");

  write(
    "scripts/fix-reports-20260907-ko-analyst.js",
    "module.exports = " +
      JSON.stringify(
        posts.map((p) => ({ id: p.id, alias: p.alias, symbol: p.symbol, content: p.content, comments: p.comments })),
        null,
        2,
      ) +
      ";\n",
  );
}

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (c.includes("const T07SEP")) {
    console.log("wall US T07SEP already — skip posts maybe");
  } else {
    c = c.replace(
      "const T04SEP = 1788476400000; // 2026.09.04 08:00 KST",
      "const T07SEP = 1788735600000; // 2026.09.07 08:00 KST\nconst T04SEP = 1788476400000; // 2026.09.04 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T04SEP;", "export const LATEST_UPDATE = T07SEP;");
  }
  if (c.includes("id: 1300")) {
    console.log("wall US 1300 already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  const posts = [
    [1300, "TSLA", "전비실측러", "테슬라 보유", "주말에 전비 6.1마일/킬로와트시 이야기 많이 보이는데, 슬라이드랑 실도로를 따로 적을게요. 5시간 탔다는 후기랑 같이 보면 체감은 커요"],
    [1301, "TSLA", "앱순위체크", "관심종목", "로보택시 앱이 여행 앱 1위 찍었다는 건 설치 순위지 매출 1위는 아니죠. 그래도 우버랑 같은 화면에서 비교되는 건 의미 있음"],
    [1302, "TSLA", "요금비교러", "관망", "3시간 92.51달러 vs 우버 200달러 추정… 시범 루프 요금일 수 있어서 통근 평균으로 확대는 안 함"],
    [1303, "SPCX", "F14준비러", "관심종목", "41호기·부스터21 정적화염까지 끝났으면 다음은 스택이네요. 발사일 나오기 전엔 케이던스 확정 안 함"],
    [1304, "NVDA", "지분포트폴", "엔비디아 보유", "전략 투자 합계 990억 달러면 칩만 파는 회사가 아님. 허깅페이스 인수랑 축이 겹침"],
    [1305, "GOOGL", "웨이모부채", "관망", "웨이모 첫 부채 30억 달러+·가산금리 500bp 이상 이야기… 플릿 키우려면 돈이 필요한 건 분명함"],
    [1306, "MACRO", "주거불안체크", "관심", "Can't Afford Home 검색이 금융위기 때보다 높다는데, 금리·주택 심리 변수로만 표에 남겨둘게요"],
    [1307, "MACRO", "연준디커플", "관망", "이번 달 미 연준만 동결 쪽으로 가고 유럽·영국·일본은 인상 쪽이라면 달러·성장주 해석이 갈라짐"],
  ];
  const block =
    "  // ── 2026-09-07 신규 ────────────────\n" +
    posts
      .map(
        (p, i) =>
          `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T07SEP + ${8 + i * 8}*60_000, likes: ${18 - i}, comments: 2 },`,
      )
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  const comments = {
    1300: [
      ["앱순위체크", "전비는 EPA 조정 전후를 구분해야 헷갈림이 줄어요"],
      ["요금비교러", "실도로 공개되면 그때 다시 맞추죠"],
    ],
    1301: [
      ["전비실측러", "1위 배지가 며칠 가는지도 궁금함"],
      ["텍사스플릿", "설치랑 일 이용 건수는 완전 다른 지표"],
    ],
    1302: [
      ["로보택시덕후", "FSD V15 무인 체감 후기가 더 중요할 듯"],
      ["원가회의론", "픽업·하차 동선 수정 필요하다는 말도 같이 적어야"],
    ],
    1303: [
      ["미확인필터", "정적화염 성공≠허가 완료"],
      ["비상장호가러", "통합 캠페인 사진 나오면 일정 감이 생길 듯"],
    ],
    1304: [
      ["공시읽는사람", "990억은 평가액·장부가 구분이 필요할 수 있음"],
      ["판교늑대", "소프트웨어 생태계 쪽 베팅으로 읽음"],
    ],
    1305: [
      ["런던라이드", "테슬라 소유자 모델이랑 자본구조가 완전 다름"],
      ["마일단가러", "부채로 키우는 플릿 vs 고객 소유 플릿"],
    ],
    1306: [
      ["연준디커플", "검색량=매수 시그널은 아님. 불안 지표"],
      ["채권덕후", "모기지·임금이랑 같이 보면 설득력 생김"],
    ],
    1307: [
      ["주거불안체크", "물가 지표 나오기 전엔 동결도 조건부"],
      ["유가러", "고유가가 다시 인플레 논쟁 키울 수 있음"],
    ],
  };
  let commBlock = "";
  for (const [id, pairs] of Object.entries(comments)) {
    commBlock += `  ${id}: [\n`;
    pairs.forEach((pair, j) => {
      commBlock += `    { id: ${id}${j + 1}, nickname: ${JSON.stringify(pair[0])}, holdingLabel: "관심종목", content: ${JSON.stringify(pair[1])}, createdAt: T07SEP + ${(10 + Number(id) % 10 + j) * 60_000}, likes: ${4 + j} },\n`;
    });
    commBlock += `  ],\n`;
  }
  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
  write("lib/wallPosts.ts", c);
  console.log("wallPosts US: 1300~1307");
}

function insertMarketsSocial() {
  let c = read("lib/wallPosts-markets.ts");
  if (!c.includes("const T07 =")) {
    c = c.replace(
      "const T04 = 1788476400000; // 2026-09-04 08:00 KST",
      "const T07 = 1788735600000; // 2026-09-07 08:00 KST\nconst T04 = 1788476400000; // 2026-09-04 08:00 KST",
    );
  }
  if (!c.includes("id: 9070")) {
    const kr = [
      [9070, "코스피", "칠천피존버", "인덱스 보유", "금요일 6687 찍고 주말 넘겼는데, 이번 주는 물가·옵션만기·FOMC가 한 주에 몰려요. 자사주 방패만 믿고 추격하진 않을게요"],
      [9071, "삼성전자", "반도체장기", "삼성전자 보유", "자사주가 기타법인으로 잡히니까 수급이 예뻐 보이는데, 남은 물량이 줄면 하단이 얇아질 수 있어서 진행률만 따로 적어요"],
      [9072, "SK하이닉스", "HBM러버", "하이닉스 보유", "ADR이 밤에 세게 올랐다는 이야기랑 현물 164만 선을 같은 표에 두면 착시가 나요. 축을 나눠야"],
      [9073, "LG에너지솔루션", "배터리존버", "LG엔솔 관심", "금요일엔 배터리만 처진 느낌이었어요. 반도체 강세랑 디커플이면 추격 근거가 약함"],
      [9074, "현대차", "자동차매니아", "현대차 관심", "보합으로 숨 고른 날. 오만 수소버스 뉴스는 모멘텀이지 당기 실적은 아니라서 워치만"],
      [9075, "KB금융", "은행주러", "KB금융 관심", "금융주가 하루 크게 조이면 금리 민감도 재확인. 이번주 물가 나오기 전엔 비중 추가 안 함"],
    ];
    const block = kr
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T07 - ${i * 1800000}, likes: ${40 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_KR: Post[] = [\n", `export const MOCK_POSTS_KR: Post[] = [\n${block}\n`);
    const krC = `  9070: [
    { id: 1, nickname: "외국인추적", holdingLabel: "관망", content: "옵션만기 주는 선물이 현물을 흔들 수 있어서 종가만 보면 안 돼요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "수급쟁이", holdingLabel: "관심종목", content: "기타법인=자사주 비중부터 빼고 외국인을 봐야죠", createdAt: T07 + 1200000, likes: 4 },
  ],
  9071: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "자사주 소진 속도가 예상보다 빠르다는 보도도 있어서 종료 시점을 적어둘게요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "수출통계러", holdingLabel: "관심종목", content: "지수랑 1위가 같이 간 날은 그래도 수급 착시가 덜해요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9072: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "ADR 갭은 시차로 메워질 수 있어서 개장 초만 보고 단정 안 함", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "소각은 중기, 오늘 베타는 단기. 둘 다 표에", createdAt: T07 + 1200000, likes: 4 },
  ],
  9073: [
    { id: 1, nickname: "이차전지", holdingLabel: "관심종목", content: "업종 대비 더 빠진 건지부터 확인해야", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "배터리존버", holdingLabel: "LG엔솔 관심", content: "수주 공시 없으면 반등 추격은 패스", createdAt: T07 + 1200000, likes: 4 },
  ],
  9074: [
    { id: 1, nickname: "수출통계러", holdingLabel: "관심종목", content: "모빌리티 해외 뉴스는 테마로만 분류할게요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "환율·유가 둘 다 표에 두고 주초 흐름 볼게요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9075: [
    { id: 1, nickname: "금리보는사람", holdingLabel: "관심종목", content: "물가 서프라이즈면 금융 로테이션이 하루 만에 뒤집혀요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "은행주러", holdingLabel: "KB금융 관심", content: "연체·마진도 같이 봐야 금리 수혜죠", createdAt: T07 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {\n${krC}`,
    );
  }

  if (!c.includes("id: 9160")) {
    const safe = [
      [9160, "매크로", "상관체크러", "관망", "비트랑 금 상관이 50% 넘었다는 주말 메모… 나스닥 베타만 보던 프레임을 잠시 접고 안전자산 축도 같이 볼게요"],
      [9161, "비트코인", "온체인러", "BTC 보유", "8만 달러 안팎에서 주말 횡보. 81400 찍고 내려온 자리라 지지 테스트로만 인식"],
      [9162, "금", "금벌레", "금 ETF", "금이 비트랑 같이 움직이면 ‘기술주 대리’가 아니라 ‘통화·금리’ 쪽 해석이 늘어나요"],
      [9163, "이더리움", "스테이커", "ETH 보유", "비트 베타가 큰 날은 알트 레버리지부터 접는 게 속 편함. 물가 주간이라 더"],
      [9164, "금리", "채권덕후", "관망", "월러 동결 기대가 50%대면 아직 동전 던지기. CPI 나오기 전 TLT 추격은 패스"],
      [9165, "WTI", "유가러", "관심", "고유가가 인플레 재점화하면 동결 시나리오가 흔들려요. 유가 밴드를 금리 표 옆에"],
    ];
    const block = safe
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T07 - ${i * 1800000}, likes: ${38 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_SAFE: Post[] = [\n", `export const MOCK_POSTS_SAFE: Post[] = [\n${block}\n`);
    const sC = `  9160: [
    { id: 1, nickname: "매크로올빼미", holdingLabel: "관심종목", content: "상관은 후행이라 앞으로 방향을 보장하진 않아요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "달러보는사람", holdingLabel: "관심종목", content: "DXY랑 같이 적어야 설득력이 생겨요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9161: [
    { id: 1, nickname: "ETF추적", holdingLabel: "관심종목", content: "유입 없이 숏커버면 되돌림이 빠를 수 있음", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "온체인러", holdingLabel: "BTC 보유", content: "8만 지지가 깨지면 다음 심리는 7.9만 쪽", createdAt: T07 + 1200000, likes: 4 },
  ],
  9162: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "금은 실질금리 대용이랑 같이 보면 덜 헷갈려요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "금벌레", holdingLabel: "금 ETF", content: "주중 물가 전엔 비중 유지가 기본", createdAt: T07 + 1200000, likes: 4 },
  ],
  9163: [
    { id: 1, nickname: "스테이커", holdingLabel: "ETH 보유", content: "이더는 비트보다 출렁여서 포지션 절반만", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "온체인러", holdingLabel: "관심종목", content: "알트 레버리지는 FOMC 전 접는 편", createdAt: T07 + 1200000, likes: 4 },
  ],
  9164: [
    { id: 1, nickname: "채권덕후", holdingLabel: "관망", content: "확률 50%면 포지션도 반만", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "금리보는사람", holdingLabel: "관심종목", content: "CPI 서프라이즈 시나리오를 미리 적어둘게요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9165: [
    { id: 1, nickname: "인플레체크", holdingLabel: "관심종목", content: "유가 90달러대가 버티면 서비스 물가도 같이 봐요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "유가러", holdingLabel: "관심", content: "지정학 헤드라인은 단기, 재고는 중기", createdAt: T07 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {\n${sC}`,
    );
  }

  if (!c.includes("id: 9270")) {
    const re = [
      [9270, "전세", "전세러", "관심", "서울 평균 전세 7.1억 넘었다는 숫자… 매물 줄어 ‘노룩 계약’ 이야기도 같이 들려요. 급하면 더 비싸짐"],
      [9271, "강남", "서울러", "관심", "송파는 전세가 매매보다 더 오른다는 집계. 세제 때문에 매매만 식고 전세는 달리는 구간"],
      [9272, "매물", "실수요자", "관심", "전세 물건이 한 달 새 줄면 가격표보다 매물 수가 먼저 신호예요"],
      [9273, "정책", "정책워처", "관심", "종부세·세제 개편안은 관망 구간. 실거주 압력과 전세 부족이 동시에 오면 세입자만 힘듦"],
    ];
    const block = re
      .map(
        (r, i) =>
          `  { id: ${r[0]}, symbol: ${JSON.stringify(r[1])}, nickname: ${JSON.stringify(r[2])}, holdingLabel: ${JSON.stringify(r[3])}, content: ${JSON.stringify(r[4])}, createdAt: T07 - ${i * 1800000}, likes: ${36 - i}, comments: 2, },`,
      )
      .join("\n");
    c = c.replace("export const MOCK_POSTS_KR_RE: Post[] = [\n", `export const MOCK_POSTS_KR_RE: Post[] = [\n${block}\n`);
    const rC = `  9270: [
    { id: 1, nickname: "갭투자경계", holdingLabel: "관심종목", content: "보증금 올리면 임차만 더 조여요. 매물 수부터", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "전세러", holdingLabel: "관심", content: "가계약부터 걸라는 말이 나올 정도면 수급이 기울어진 거죠", createdAt: T07 + 1200000, likes: 4 },
  ],
  9271: [
    { id: 1, nickname: "서울러", holdingLabel: "관심", content: "전세>매매 상승이면 전세가율도 같이 봐야", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "정책워처", holdingLabel: "관심", content: "강남은 매매 위축·전세 강세 조합이 자주 나와요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9272: [
    { id: 1, nickname: "실수요자", holdingLabel: "관심", content: "매물 실종이면 호가 협상력이 집주인으로 가요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "전세러", holdingLabel: "관심", content: "입주 물량 달력도 같이 적어둘게요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9273: [
    { id: 1, nickname: "정책워처", holdingLabel: "관심", content: "법안 확정 전 감세 잔치로 읽으면 위험해요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "실수요자", holdingLabel: "관심", content: "실거주 전환 압력이 전세 매물을 더 줄일 수 있음", createdAt: T07 + 1200000, likes: 4 },
  ],
`;
    c = c.replace(
      "export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {\n${rC}`,
    );
  }
  write("lib/wallPosts-markets.ts", c);
  console.log("wallPosts-markets: T07 KR/SAFE/KR-RE");
}

function insertAnalystMarkets() {
  let c = read("lib/analystPosts-markets.ts");
  if (c.includes("id: -2100")) {
    console.log("analyst markets -2100 already — skip");
    return;
  }
  const mkAlias = [
    "여의도 너구리 #11", "판교 치타 #22", "삼성동 여우 #08", "성수 수달 #35",
    "한남 두루미 #17", "잠실 백로 #29", "광화문 물총새 #06",
  ];
  const krPosts = KR.map((r, i) => ({
    id: -2100 - i,
    alias: mkAlias[i % mkAlias.length],
    symbol: r.subject,
    content:
      i === 0
        ? `월요일 브리핑입니다. ${r.summary.replace(/\n/g, " ").slice(0, 140)}`
        : i % 2 === 0
          ? `${r.subject}만 보면 놓칩니다. ${r.summary.replace(/\n/g, " ").slice(0, 130)}`
          : `왜 ${r.subject}인가요? ${r.summary.replace(/\n/g, " ").slice(0, 130)}`,
    comments: 2,
    likes: 28 - i,
    created_at: `2026-09-07T06:${String(i * 8).padStart(2, "0")}:00.000Z`,
  }));
  const safePosts = SAFE.map((r, i) => ({
    id: -2120 - i,
    alias: ["온체인 매 #03", "금벌레 학 #14", "달러 올빼미 #09", "스테이킹 수달 #21", "채권 치타 #18", "유가 갈매기 #05"][i],
    symbol: r.subject,
    content:
      i === 0
        ? `안전자산 한장입니다. ${r.summary.replace(/\n/g, " ").slice(0, 140)}`
        : `${r.subject} 축: ${r.summary.replace(/\n/g, " ").slice(0, 130)}`,
    comments: 2,
    likes: 26 - i,
    created_at: `2026-09-07T09:${String(i * 8).padStart(2, "0")}:00.000Z`,
  }));
  const rePosts = KRRE.map((r, i) => ({
    id: -2140 - i,
    alias: ["전세 참새 #02", "강남 학 #16", "매물 여우 #27", "정책 백로 #33", "실수요 너구리 #19"][i],
    symbol: r.subject,
    content:
      i === 0
        ? `부동산 한장입니다. ${r.summary.replace(/\n/g, " ").slice(0, 140)}`
        : `${r.subject}: ${r.summary.replace(/\n/g, " ").slice(0, 130)}`,
    comments: 2,
    likes: 24 - i,
    created_at: `2026-09-07T10:${String(i * 8).padStart(2, "0")}:00.000Z`,
  }));

  function postsBlock(arr, label) {
    return (
      `  // ── 2026-09-07 ${label} ──────────────────────\n` +
      arr
        .map(
          (p) =>
            `  { id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)}, content: ${JSON.stringify(p.content)}, likes: ${p.likes}, comments: ${p.comments}, created_at: ${JSON.stringify(p.created_at)}, liked: false, },`,
        )
        .join("\n") +
      "\n"
    );
  }
  function commentsBlock(arr, label) {
    return (
      `  // ── 2026-09-07 ${label} 댓글 ──────────────────────\n` +
      arr
        .map((p, i) => {
          const c1 = [
            "숫자와 해석을 칸으로 나누겠습니다.",
            "주간 일정표에 먼저 붙이겠습니다.",
            "추격보다 확인 라인이 우선입니다.",
            "축이 다른 뉴스는 합치지 않겠습니다.",
          ][i % 4];
          const c2 = [
            "동의합니다. 레버리지는 지표 뒤로요.",
            "표로 남기면 노이즈가 줄어요.",
            "다음 공시·통계를 기다리겠습니다.",
            "관망이 맞는 구간으로 봅니다.",
          ][i % 4];
          return `  [${p.id}]: [
    { alias: ${JSON.stringify(ALIASES[(i + 2) % ALIASES.length])}, content: ${JSON.stringify(c1)}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":10:00.000Z"))} },
    { alias: ${JSON.stringify(ALIASES[(i + 5) % ALIASES.length])}, content: ${JSON.stringify(c2)}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":17:00.000Z"))} },
  ],`;
        })
        .join("\n") +
      "\n"
    );
  }

  c = c.replace(
    "export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n",
    `export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [\n${postsBlock(krPosts, "KR")}`,
  );
  // SAFE / KR_RE exports
  if (c.includes("export const MOCK_ANALYST_POSTS_SAFE")) {
    c = c.replace(
      "export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n",
      `export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [\n${postsBlock(safePosts, "SAFE")}`,
    );
  }
  if (c.includes("export const MOCK_ANALYST_POSTS_KR_RE")) {
    c = c.replace(
      "export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n",
      `export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [\n${postsBlock(rePosts, "KR-RE")}`,
    );
  }

  // comments maps
  for (const [name, arr, label] of [
    ["MOCK_ANALYST_COMMENTS_KR", krPosts, "KR"],
    ["MOCK_ANALYST_COMMENTS_SAFE", safePosts, "SAFE"],
    ["MOCK_ANALYST_COMMENTS_KR_RE", rePosts, "KR-RE"],
  ]) {
    const needle = `export const ${name}: Record<number, AnalystMockComment[]> = {\n`;
    if (!c.includes(needle)) throw new Error(name + " missing");
    c = c.replace(needle, needle + commentsBlock(arr, label));
  }
  write("lib/analystPosts-markets.ts", c);
  console.log("analystPosts-markets: KR/SAFE/KR-RE 9/7");
}

function main() {
  insertReportsTs();
  insertMarketReports();
  insertAnalystUs();
  insertWallUs();
  insertMarketsSocial();
  insertAnalystMarkets();
  console.log("apply-20260907 done");
}

main();
