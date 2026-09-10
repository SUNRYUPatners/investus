#!/usr/bin/env node
/** Insert 2026-09-11 US reports, analyst, wall (unique copy). */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260911-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.11";
const UPDATED = "2026.09.11 08:50";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T11SEP = 1789081200000; // 2026.09.11 08:00 KST
const TAG = "20260911";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const ALIASES = [
  "종로 까치 #41", "광화문 여우 #62", "여의도 수리 #28", "송파 독수리 #66",
  "분당 매 #31", "성수 너구리 #15", "역삼 판다 #77", "한남 재규어 #27",
  "삼성동 올빼미 #19", "해운대 고래 #03", "마포 살괭이 #08", "판교 늑대 #90",
  "인천 갈매기 #52", "압구정 치타 #44", "잠실 백로 #29", "청담 여우 #11",
  "합정 수달 #07", "이태원 부엉이 #18", "성북 참새 #33", "노원 기러기 #21",
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
    date: ${JSON.stringify(DATE_DOT)},
    updatedAt: ${JSON.stringify(UPDATED)},${pinned}
    images: [${JSON.stringify(img)}],
    imagesEn: [${JSON.stringify(imgEn)}],
  }`;
}

function insertReportsTs() {
  let c = read("lib/reports.ts");
  if (c.includes('id: "seed-1588"')) {
    console.log("reports.ts: seed-1588 already present — skip");
  } else {
    const block = US.map((r) => tsBlock(r)).join(",\n") + ",\n";
    const idx2 = c.indexOf('id: "seed-1562"');
    if (idx2 === -1) throw new Error("seed-1562 not found");
    const start = c.lastIndexOf("  {", idx2);
    write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
    console.log("reports.ts: inserted seed-1588~1609");
  }

  c = read("lib/reports.ts");
  if (c.includes("  // 2026-09-11\n")) {
    console.log("REPORT_TICKERS: 2026-09-11 already present");
    return;
  }
  let tick = "  // 2026-09-11\n";
  for (const r of US) {
    const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
    tick += `  "${r.id}": [${t}],\n`;
  }
  const mark = "  // 2026-09-10";
  const tIdx = c.indexOf(mark);
  if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-10 marker missing");
  write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
  console.log("REPORT_TICKERS: inserted 2026-09-11");
}

function usAnalystCopy(r, i) {
  const raw = r.summary.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  let s = raw;
  if (s.length > 420) {
    const cut = s.lastIndexOf("습니다.", 420);
    s = cut >= 80 ? s.slice(0, cut + 4) : s;
  }
  if (!/(습니다|바랍니다|니다)\.?$/.test(s)) {
    const cut = s.lastIndexOf("습니다.");
    if (cut >= 40) s = s.slice(0, cut + 4);
  }
  const modes = [
    () => `표에 숫자만 남깁니다. ${s}`,
    () => `현장 질문부터입니다. ${r.title}`,
    () => `${r.subject}만 따로 보면 ${s}`,
    () => `회의록 한 줄로 정리합니다. ${s}`,
    () => `캘린더 기준으로 보면 ${s}`,
    () => `가정과 실측을 갈랐습니다. ${s}`,
    () => `리스크 칸에 먼저 씁니다. ${s}`,
    () => `다음 게이트만 적습니다. ${s}`,
    () => `한장으로 안 묶습니다. ${s}`,
    () => `정의부터 확인합니다. ${s}`,
  ];
  return modes[i % modes.length]();
}

const ANALYST_COMMENTS = {
  summary: [
    "라우터 4 스펙과 10년 4.92%는 칸을 나눕니다.",
    "보링 230억과 사이버캡 전비를 한 줄의 테슬라로 합치지 않겠습니다.",
  ],
  "starlink-router-4": [
    "와이파이 7은 실내 규격입니다. 위성 속도와 섞지 않겠습니다.",
    "510대는 동시 접속 상한입니다. 요금제와 분리합니다.",
  ],
  "cybercab-cd-165": [
    "공기저항 0.2 미만은 에너지 칸입니다. 마일당 원가와 분리합니다.",
    "전륜구동은 부품 축입니다. 유타 7대와 섞지 않겠습니다.",
  ],
  "tsla-fsd-awesome": [
    "97.2%는 분모가 없는 스트릭입니다. 개입 정의를 먼저 적겠습니다.",
    "발언은 평가이지 규제 승인이 아닙니다.",
  ],
  "spcx-starship-revenue": [
    "매출 비행은 계약·보험·허가입니다. 1,000억은 확신 칸입니다.",
    "부스터 22 극저온과 시계를 나누겠습니다.",
  ],
  "nvda-pltr-stack": [
    "가장 중요하다는 말은 평가입니다. 수주 전엔 가중치를 낮춥니다.",
    "내부자 매도와 스택 그림을 한 문장에 넣지 않겠습니다.",
  ],
  "ust-10y-492": [
    "4.92%는 시장 가격입니다. 바이백 규모와 완화로 합치지 않겠습니다.",
    "생산자물가 5.4%는 다른 시계입니다.",
  ],
  "slovenia-fsd-free": [
    "두 달은 체험입니다. 유럽 전역 허가로 읽지 않겠습니다.",
    "자그레브 무인과 감독 모드를 나누겠습니다.",
  ],
  "xai-dc-overhaul": [
    "122일은 과거 속도입니다. 재설계는 자본지출 일정입니다.",
    "테라팹 기초와 현장을 나누겠습니다.",
  ],
  "sh22-cryo-f15": [
    "극저온은 지상 기밀 시험입니다. 비행 성공과 섞지 않겠습니다.",
    "42호기는 비행 15 후보입니다. 창이 열리기 전엔 일정만 적습니다.",
  ],
  "boring-3b-23b": [
    "30억은 조달, 150km는 계획입니다. 개통과 분리합니다.",
    "테슬라 시총과 한 베팅으로 묶지 않겠습니다.",
  ],
  "robotaxi-app-hue": [
    "앱 색은 제품 다듬기입니다. 등록 대수와 섞지 않겠습니다.",
    "유타 7대가 앱에 없는 것과 칸을 나눕니다.",
  ],
  "terafab-foundation": [
    "40~50%는 사진 비교입니다. 양산 수율이 아닙니다.",
    "데이터센터 재설계와 현장을 나누겠습니다.",
  ],
  "pony-zagreb-nvda": [
    "22km는 시연입니다. 유료 마일로 읽지 않겠습니다.",
    "유럽 첫 사례를 전역 허가로 확장하지 않겠습니다.",
  ],
  "cybercab-rider-guide": [
    "9월 4일 문서는 안내서입니다. 요금표가 아닙니다.",
    "호출 도시가 열리기 전엔 준비 칸만 둡니다.",
  ],
  "utah-7-cybercab": [
    "7대는 현장 목격입니다. 텍사스 등록과 더하지 않겠습니다.",
    "핸들 있는 차는 시험·이동일 수 있습니다. 앱 미등록이면 유료가 아닙니다.",
  ],
  "optimus-germany": [
    "채용은 공장 준비입니다. 출고 대수와 섞지 않겠습니다.",
    "부품 5,000대 발주와 칸을 나눕니다.",
  ],
  "starlink-direct-expand": [
    "9월 28일은 확대 창입니다. 가입자 실적이 아닙니다.",
    "라우터 4와 제품이 다릅니다. 통신사 요금을 기다리겠습니다.",
  ],
  "nvda-insider-600m": [
    "두 공시 합이 6억입니다. 실적 가속 실패로 단정하지 않겠습니다.",
    "종가 −0.91%는 테이프입니다. 스택 발언과 분리합니다.",
  ],
  "blackrock-tsla-6m": [
    "600만 주는 2분기 공시입니다. 오늘 플릿과 시계가 다릅니다.",
    "패시브를 액티브 확신으로 읽지 않겠습니다.",
  ],
  "spcx-orbital-compute": [
    "내년 첫 위성은 실증입니다. 별자리 완성과 나눕니다.",
    "스타십 매출 비행과 한 문장에 넣지 않겠습니다.",
  ],
  "congress-spcx-buy": [
    "1천~1만 5천은 구간입니다. 정확한 주수는 없습니다.",
    "일곱 번째를 수급 전환으로 쓰지 않겠습니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ANALYST_COMMENTS.summary;
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  if (c.includes("id: -1187")) {
    console.log("analystPosts US -1187 already — skip");
    return;
  }
  const posts = US.map((r, i) => {
    const id = -1187 - i;
    const comments = i % 3 === 0 ? 2 : 1;
    return {
      id,
      alias: ALIASES[i % ALIASES.length],
      symbol: r.pinned ? "MACRO" : (r.tickers && r.tickers[0]) || "MACRO",
      content: usAnalystCopy(r, i),
      comments,
      likes: 14 + (i % 8),
      created_at: `2026-09-11T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const block =
    "  // ── 2026-09-11 신규 (22개 · 존댓말 · 구조 혼합) ──────────────────────\n" +
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
  const mark = "  // ── 2026-09-10 신규";
  const idx = c.indexOf(mark);
  if (idx === -1) throw new Error("analyst 2026-09-10 marker missing");
  write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

  c = read("lib/analystPosts.ts");
  const comm =
    "  // ── 2026-09-11 애널 댓글 ──────────────────────\n" +
    posts
      .map((p, i) => {
        const lines = [
          `    { alias: ${JSON.stringify(ALIASES[(i + 3) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(US[i], 0))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":04:00.000Z"))} },`,
        ];
        if (p.comments >= 2) {
          lines.push(
            `    { alias: ${JSON.stringify(ALIASES[(i + 7) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(US[i], 1))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":07:00.000Z"))} },`,
          );
        }
        return `  [${p.id}]: [\n${lines.join("\n")}\n  ],`;
      })
      .join("\n") +
    "\n";
  const cmark = "  // ── 2026-09-10 애널 댓글";
  const cidx = c.indexOf(cmark);
  if (cidx === -1) throw new Error("analyst comments 2026-09-10 marker missing");
  write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
  console.log("analystPosts US: -1187~-" + (1187 + US.length - 1));

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "starlink-router-4": "라우터4가 와이파이7·기기 510·3500평방피트. 실내 규격이지 위성 속도 아님",
  "cybercab-cd-165": "캡 Cd 0.2 미만·165Wh/mi·첫 전륜. 마일당 원가 의견이랑 칸 나눠",
  "tsla-fsd-awesome": "FSD 훌륭하다 + 97.2%·177.7마일 스트릭. 분모 없는 한 구간임",
  "spcx-starship-revenue": "다음 스타십이 매출 비행일 수 있다는데 1000억 ARR은 확신 칸. 계약 전엔 시험이랑 분리",
  "nvda-pltr-stack": "팔란티어가 엔터프라이즈 스택 핵심이라. 칩 매출이랑 구독 인식 다름. 내부자 매도랑 섞지 마",
  "ust-10y-492": "10년 4.92%(+0.08). 2023년 10월 이후 최고권. 바이백이랑 완화로 한 줄 금지",
  "slovenia-fsd-free": "슬로베니아 FSD 두 달 무상. 체험이지 유럽 허가 아님. 자그레브 무인이랑 다름",
  "xai-dc-overhaul": "xAI 센터를 안정성으로 다시 짠다. 122일 속도 뒤 장애. 테라팹이랑 현장 다름",
  "sh22-cryo-f15": "부스터22 극저온 통과, 비행15는 42호기. 지상 시험이지 발사 성공 아님",
  "boring-3b-23b": "보링 30억 조달·가치 230억·UAE 150km+. 개통 전엔 계획. 테슬라 시총이랑 합치지 마",
  "robotaxi-app-hue": "로보택시 앱 색을 캡 도장이랑 맞춤. 제품이지 대수 아님. 유타 7대는 앱 미등록",
  "terafab-foundation": "테라팹 1단계 기초가 한 달 전보다 40~50%. 사진 비교지 수율 아님",
  "pony-zagreb-nvda": "포니+베르네 자그레브 22km 무인, 엔비디아 드라이브. 시연이지 유료 호출 아님",
  "cybercab-rider-guide": "북미 캡 라이더 가이드 9/4. 안내서지 요금표 아님. 호출 도시 따로",
  "utah-7-cybercab": "유타 플레전트그로브 핸들 캡 7대. 텍사스 등록이랑 더하지 마. 앱엔 없음",
  "optimus-germany": "홀츠게를링겐 옵티머스 기어트레인 채용. 공장 준비지 출고 아님. 5천대 발주랑 분리",
  "starlink-direct-expand": "다이렉트 9/28 일본 밖(미·캐·뉴질 후 필리핀). 휴대폰 문사지 라우터4 아님",
  "nvda-insider-600m": "스티븐스 지난주 6억+ 매도. 9/2 184만주 222.26, 9/4 102만주 230.51. 종가 223.67 −0.91%",
  "blackrock-tsla-6m": "블랙록 2분기 TSLA 600만주. 지난 분기 공시. 오늘 플릿이랑 시계 다름",
  "spcx-orbital-compute": "CFO가 내년 첫 궤도 컴퓨팅 위성이라. 실증이지 별자리 완성 아님",
  "congress-spcx-buy": "살라자르 SPCX 1천~1만5천 구간, 6월 이후 7번째. IBM·머크도 같은 공시. 소액 신호",
};

const WALL_C1 = [
  "와이파이7이 위성 속도는 아님",
  "165Wh/mi가 실도로인지는 다음",
  "97.2% 분모부터 확인하자",
  "매출 비행은 페이로드 고객이 게이트",
  "스택 평가는 수주 전엔 가중치 낮춤",
  "PPI 5.4%랑 4.92%를 한 완화로 안 봄",
  "두 달 무상 뒤 전환율이 매출",
  "재설계 기간엔 연산이 덜 나옴",
  "극저온 다음이 정적 화재",
  "150km는 계획 킬로, 개통이 아님",
  "색 맞춘 건 대기시간 힌트일 뿐",
  "기초 40%를 양산으로 읽지 마",
  "22km 한 경로를 유럽 허가로 확장 금지",
  "가이드 PDF랑 요금표는 다름",
  "핸들 있는 7대는 시험차일 수도",
  "채용 공고는 라인 가동이 아님",
  "9/28은 창이지 가입자 실적 아님",
  "내부자 매도를 실적 실패로 단정 금지",
  "2분기 13F는 이미 지난 스냅샷",
  "첫 위성은 실증, 용량 넣지 마",
  "구간 공시는 정확한 주수가 없음",
];

const WALL_C2 = [
  "다이렉트랑 라우터를 한 제품으로 안 묶음",
  "전륜 부품 수율이 빈칸이면 가정 낮춤",
  "슬로베니아 무상이랑 스트릭은 다른 나라",
  "1000억 ARR은 수주 잔고가 아님",
  "자그레브 시연이랑 팔란티어는 다른 층",
  "CPI랑 9/16 회의가 다음 게이트",
  "감독 모드랑 무인 시연을 나누자",
  "가동률 공지 나오기 전엔 용량 확정 금지",
  "비행 15 창이 열리기 전엔 일정만",
  "두바이 루프랑 150km를 한 셀 금지",
  "텍사스 등록이랑 앱 색은 다른 줄",
  "툴 반입이 기초 다음 확인",
  "요금·지오펜스 전엔 점유율 단정 금지",
  "북미 문서지 유럽 가이드 아님",
  "유타 허가 나오기 전엔 공급 아님",
  "주당 조립이 나와야 원가 곡선",
  "통신사 요금표가 다음 숫자",
  "추가 폼4가 있으면 옆에 둠",
  "다음 13F 전엔 추격 패스",
  "다운링크·전력이 궤도 병목",
  "락업 물량이랑 소액 PTR 분리",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T11SEP")) {
    c = c.replace(
      "const T10SEP = 1788994800000; // 2026.09.10 08:00 KST",
      "const T11SEP = 1789081200000; // 2026.09.11 08:00 KST\nconst T10SEP = 1788994800000; // 2026.09.10 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T10SEP;", "export const LATEST_UPDATE = T11SEP;");
  }
  if (c.includes("id: 121845")) {
    console.log("wall US 121845 already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "라우터사백십", "캡전비백육오", "스트릭구칠", "스타십매출창", "팔란티어스택",
    "십년사구이", "슬로베니아무상", "콜로서스재설계", "부스터이십이", "보링이십삼조",
    "앱색맞춤", "테라팹사십", "자그레브이십이", "라이더구사", "유타일곱대",
    "홀츠기어", "다이렉트구이팔", "내부자육억", "블랙록육백만", "궤도내년첫",
    "의회일곱",
  ];
  const posts = individuals.map((r, i) => {
    const id = 121845 + i;
    return [id, (r.tickers && r.tickers[0]) || "MACRO", nick[i] || `체크${i}`, "관심종목", WALL_CONTENT[r.slug] || r.title.slice(0, 80)];
  });
  const block =
    "  // ── 2026-09-11 신규 ────────────────\n" +
    posts
      .map(
        (p, i) =>
          `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T11SEP + ${8 + i * 8}*60_000, likes: ${22 - (i % 10)}, comments: 2 },`,
      )
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  posts.forEach((p, i) => {
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T11SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T11SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `  ],\n`;
  });
  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
  write("lib/wallPosts.ts", c);
  console.log(`wallPosts US: 121845~${121845 + posts.length - 1}`);
}

function writeFixReports() {
  const summary = US[0];
  const details = US.slice(1);
  const ko = `#!/usr/bin/env node
const REPORTS = [
  { id: ${JSON.stringify(summary.id)}, slug: ${JSON.stringify(summary.slug)}, pinned: true, bodyOnly: true,
    category: ${JSON.stringify(summary.category)}, color: ${JSON.stringify(summary.color)}, subject: ${JSON.stringify(summary.subject)},
    title: ${JSON.stringify(summary.title)},
    summary: ${JSON.stringify(summary.summary)},
    titleEn: ${JSON.stringify(summary.titleEn)},
    summaryEn: ${JSON.stringify(summary.summaryEn)},
  },
];
REPORTS.push(...require('./fix-reports-20260911-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260911 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260911-ko.js", ko);

  const reportsJson = details.map((r) => ({
    id: r.id,
    slug: r.slug,
    category: r.category,
    color: r.color,
    subject: r.subject,
    title: r.title,
    summary: r.summary,
    titleEn: r.titleEn,
    summaryEn: r.summaryEn,
  }));
  write(
    "scripts/fix-reports-20260911-ko-reports.js",
    "module.exports = " + JSON.stringify(reportsJson, null, 2) + ";\n",
  );
  console.log("fix-reports-20260911-ko.js / ko-reports.js written");
}

function writeFixAnalyst(posts) {
  const arr = posts.map((p) => ({
    id: p.id,
    alias: p.alias,
    symbol: p.symbol,
    content: p.content,
    comments: p.comments,
  }));
  write(
    "scripts/fix-reports-20260911-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260911-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260911 done (US)");
}

main();
