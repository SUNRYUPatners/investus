#!/usr/bin/env node
/** Insert 2026-09-16 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260916-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.16";
const UPDATED = "2026.09.16 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T16SEP = 1789513200000; // 2026.09.16 08:00 KST
const TAG = "20260916";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const ALIASES = [
  "종로 까치 #41", "광화문 여우 #62", "여의도 수리 #28", "송파 독수리 #66",
  "분당 매 #31", "성수 너구리 #15", "역삼 판다 #77", "한남 재규어 #27",
  "삼성동 올빼미 #19", "해운대 고래 #03", "마포 살괭이 #08", "판교 늑대 #90",
  "인천 갈매기 #52", "압구정 치타 #44", "잠실 백로 #29", "청담 여우 #11",
  "합정 수달 #07", "이태원 부엉이 #18", "성북 참새 #35", "노원 기러기 #23",
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
  if (c.includes(`id: "${US[0].id}"`)) {
    console.log("reports.ts: US already inserted — skip");
    return;
  }
  const block = US.map((r) => tsBlock(r)).join(",\n") + ",\n";
  const beforeId = "seed-1648";
  const idx = c.indexOf(`id: "${beforeId}"`);
  if (idx === -1) throw new Error(`${beforeId} not found`);
  const start = c.lastIndexOf("  {", idx);
  write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
  console.log(`reports.ts: inserted ${US[0].id}~${US[US.length - 1].id}`);

  c = read("lib/reports.ts");
  if (c.includes("  // 2026-09-16\n")) {
    console.log("REPORT_TICKERS: 2026-09-16 already present");
    return;
  }
  let tick = "  // 2026-09-16\n";
  for (const r of US) {
    const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
    tick += `  "${r.id}": [${t}],\n`;
  }
  const mark = "  // 2026-09-15";
  const tIdx = c.indexOf(mark);
  if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-15 marker missing");
  write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
  console.log("REPORT_TICKERS: inserted 2026-09-16");
}

function usAnalystCopy(r, i) {
  const raw = r.summary.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  let s = raw;
  if (s.length > 380) {
    const cut = s.lastIndexOf("습니다.", 380);
    s = cut >= 80 ? s.slice(0, cut + 4) : s;
  }
  const modes = [
    () => `오늘 화면의 숫자부터입니다. ${s}`,
    () => `현장 메모입니다. ${r.title}`,
    () => `${r.subject} 카드입니다. ${s}`,
    () => `회의 한 줄로 남깁니다. ${s}`,
    () => `달력에 먼저 적습니다. ${s}`,
    () => `의견과 일정을 구분해 둡니다. ${s}`,
    () => `초보용으로 풀면 ${s}`,
    () => `다음 확인만 적습니다. ${s}`,
    () => `한장에 안 묶고 이 주제로만 봅니다. ${s}`,
    () => `정의부터 확인합니다. ${s}`,
  ];
  return modes[i % modes.length]();
}

const ANALYST_COMMENTS = {
  summary: [
    "합병설·궤도비행·금리 5%대는 서로 다른 이야기라 한 화면에 묶지 않겠습니다.",
    "9/17 새벽 FOMC 결과가 오늘 숫자 중 가장 먼저 갈립니다.",
  ],
  "tsla-spcx-merger-speculation": [
    "예측시장 확률은 베팅 심리일 뿐 이사회 결의와는 다릅니다.",
    "머스크의 즉답 회피가 공식 검토 착수를 뜻하진 않습니다.",
  ],
  "grok-text-while-driving": [
    "설명서 등재라 실제 배포 시점은 아직 공지되지 않았습니다.",
    "음성비서 범위가 넓어질수록 소프트웨어 구독 가치도 같이 봐야 합니다.",
  ],
  "china-humanoid-robot-factory": [
    "10분당 1대가 실제 양산 수율로 이어지는지는 몇 달 더 봐야 합니다.",
    "가격이 실제로 내려가는지가 로봇 산업 확산의 다음 신호입니다.",
  ],
  "cybercab-us-expansion": [
    "목격 대수는 팬 계정 집계라 회사 공식 차량 수와는 차이가 있습니다.",
    "새 도시마다 무감독 전환 시점이 다르다는 점을 같이 기록해 둡니다.",
  ],
  "jensen-terafab-musk-comment": [
    "비행기 대화 일화라 실제 투자·부지 결정과는 아직 거리가 있습니다.",
    "테라팹 부지·규모가 공개되는 시점을 다음에 확인하겠습니다.",
  ],
  "jensen-ai-safety-open-models": [
    "80%라는 숫자는 최근 투자 라운드 표본 기준이라 전체 업계 비율과는 다를 수 있습니다.",
    "자율규제 발언이라 실제 정책 방향과는 분리해서 보겠습니다.",
  ],
  "ai-token-usage-4-quintillion": [
    "2030년 전망치는 리서치사 모델링이라 실측치는 매 분기 갱신됩니다.",
    "에이전틱 AI 비중이 실제로 커지는지를 다음 지표로 보겠습니다.",
  ],
  "ubs-palantir-pt-250": [
    "목표주가 상향은 한 증권사 의견이라 다른 하우스 뷰와 같이 봐야 합니다.",
    "정부·기업 계약 갱신 속도가 실제 실적으로 이어지는지가 다음 확인입니다.",
  ],
  "starship-flight14-launch": [
    "발사 일정은 기상·기술 점검에 따라 며칠 밀릴 수 있습니다.",
    "궤도 진입 후 재진입까지 전 구간 성공 여부를 지켜보겠습니다.",
  ],
  "starlink-v3-flight14-capacity": [
    "1테라비피에스는 설계 목표치라 실제 궤도상 성능은 발사 후 확인됩니다.",
    "26기 전량이 정상 궤도에 안착하는지가 다음 확인 포인트입니다.",
  ],
  "spacex-ai-compute-demand": [
    "발표를 예고했을 뿐 구체적 내용·시점은 아직 공개되지 않았습니다.",
    "컴퓨팅 임대 매출이 실제 재무제표 항목으로 분리 공시되는지 보겠습니다.",
  ],
  "tesla-europe-sales-rebound": [
    "주간 반등이라도 분기 누적(QTD)은 여전히 전분기보다 낮다는 점을 같이 봅니다.",
    "다음 몇 주 판매량이 이어지는지가 반등의 진짜 신호입니다.",
  ],
  "tesla-semi-europe-hannover": [
    "박람회 발표 단계라 실제 유럽 인도는 2027년부터입니다.",
    "초기 고객사(물류회사) 계약 체결 여부를 다음에 확인하겠습니다.",
  ],
  "tesla-fsd-insurance-discount": [
    "콜로라도 등 일부 주 사례라 전국 확대 시점은 아직 불명확합니다.",
    "실제 이용자 체감 보험료 인하 후기가 늘어나는지 지켜보겠습니다.",
  ],
  "tesla-fsd-accessibility-foppe": [
    "개인 사례라 통계적 안전성 지표와는 구분해서 보겠습니다.",
    "비슷한 접근성 사례가 더 나오는지가 다음 관찰 포인트입니다.",
  ],
  "model-y-l-aero-cd": [
    "공기저항계수 차이는 작지만 고속 주행 효율에는 꾸준히 반영됩니다.",
    "실제 고속도로 주행 효율(Wh/km) 실측치가 나오면 비교하겠습니다.",
  ],
  "treasury-10y-5-percent": [
    "5%대는 장중 기록이라 종가 기준 수준과는 약간 다를 수 있습니다.",
    "9/17 새벽 FOMC 결과가 금리 방향을 다시 흔들 다음 변수입니다.",
  ],
  "oil-tanker-freight-record": [
    "용선료 기록은 특정 항로 기준이라 다른 항로는 수준이 다릅니다.",
    "운임이 몇 주 더 유지되는지가 실제 물류비 반영 여부를 가릅니다.",
  ],
  "moody-ai-power-plants-110b": [
    "1,100억 달러는 신용평가사 추산이라 실제 투자 확정액과는 차이가 있습니다.",
    "발전소는 착공부터 준공까지 수년이 걸린다는 점을 같이 기록해 둡니다.",
  ],
  "morgan-stanley-tsla-pt-840": [
    "840달러는 불케이스(강세 시나리오)라 기본 시나리오 목표가와는 다릅니다.",
    "로보택시·세미트럭 매출이 실제로 잡히는 시점을 다음에 확인하겠습니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ANALYST_COMMENTS.summary;
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  const firstId = -1268;
  if (c.includes(`id: ${firstId}`)) {
    console.log("analystPosts US already — skip");
    return;
  }
  const individuals = US.filter((r) => !r.pinned);
  const posts = individuals.map((r, i) => {
    const id = firstId - i;
    const comments = i % 3 === 0 ? 2 : 1;
    return {
      id,
      alias: ALIASES[i % ALIASES.length],
      symbol: (r.tickers && r.tickers[0]) || "MACRO",
      content: usAnalystCopy(r, i),
      comments,
      likes: 15 + (i % 8),
      created_at: `2026-09-16T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const block =
    "  // ── 2026-09-16 신규 (20개 · 존댓말 · 구조 혼합) ──────────────────────\n" +
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
  const mark = "  // ── 2026-09-15 신규";
  const idx = c.indexOf(mark);
  if (idx === -1) throw new Error("analyst 2026-09-15 marker missing");
  write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

  c = read("lib/analystPosts.ts");
  const comm =
    "  // ── 2026-09-16 애널 댓글 ──────────────────────\n" +
    posts
      .map((p, i) => {
        const lines = [
          `    { alias: ${JSON.stringify(ALIASES[(i + 3) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(individuals[i], 0))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":04:00.000Z"))} },`,
        ];
        if (p.comments >= 2) {
          lines.push(
            `    { alias: ${JSON.stringify(ALIASES[(i + 7) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(individuals[i], 1))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":07:00.000Z"))} },`,
          );
        }
        return `  [${p.id}]: [\n${lines.join("\n")}\n  ],`;
      })
      .join("\n") +
    "\n";
  const cmark = "  // ── 2026-09-15 애널 댓글";
  const cidx = c.indexOf(cmark);
  if (cidx === -1) throw new Error("analyst comments 2026-09-15 marker missing");
  write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
  console.log(`analystPosts US: ${firstId}~${firstId - individuals.length + 1}`);

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "tsla-spcx-merger-speculation": "폴리마켓 테슬라·스페이스X 합병확률 52%. 머스크는 질문에 즉답 피함",
  "grok-text-while-driving": "테슬라 모델Y 설명서에 그록 음성문자·전화 기능 등재됨",
  "china-humanoid-robot-factory": "중국 휴머노이드로봇 10분마다 1대 찍는 양산공장 오픈. 세계최초",
  "cybercab-us-expansion": "사이버캡 피츠버그서 18대 동시목격. 올버니·유타·파사데나도 확산중",
  "jensen-terafab-musk-comment": "젠슨황 \"머스크면 테라팹 해낼거다\" 비행기서 오래 얘기했다고",
  "jensen-ai-safety-open-models": "젠슨황 \"AI 새규제 필요없다\" 오픈모델 신생기업 80% 씀",
  "ai-token-usage-4-quintillion": "에버코어 2030년 AI토큰 연4경개 전망. 에이전틱AI가 주범",
  "ubs-palantir-pt-250": "UBS 팔란티어 목표가 220→250불 상향. 매수의견 유지",
  "starship-flight14-launch": "스타십 14차 9/22 확정. 고도275km 6바퀴 첫 궤도비행",
  "starlink-v3-flight14-capacity": "스타링크 V3 위성 1기당 1Tbps, 기존 10배. 26기면 26Tbps",
  "spacex-ai-compute-demand": "숏웰 사장 \"컴퓨팅임대 정말 좋은사업\" AI수요 강하다고 발표예고",
  "tesla-europe-sales-rebound": "테슬라 유럽 주간판매 88%↑ 6400대. 근데 분기누적은 아직 -26%",
  "tesla-semi-europe-hannover": "테슬라세미 하노버IAA서 유럽확장 공개. 1900만km 누적운행",
  "tesla-fsd-insurance-discount": "테슬라 FSD쓰면 보험료 최대60%↓ 주문화면서 바로 견적",
  "tesla-fsd-accessibility-foppe": "팔없는 존포피씨 FSD로 500마일 장거리이동. \"삶을 바꿔놓았다\"",
  "model-y-l-aero-cd": "6인승 모델Y L 공기저항 0.216, 5인승 0.220보다 더 낮음",
  "treasury-10y-5-percent": "美10년물 국채금리 장중5.041%. 2007년 이후 최고치",
  "oil-tanker-freight-record": "초대형유조선 하루용선료 사상최초 100만불 돌파",
  "moody-ai-power-plants-110b": "무디스 \"美 AI붐 뒷받침하려면 발전소 1100억불 필요\"",
  "morgan-stanley-tsla-pt-840": "모건스탠리 테슬라 불케이스 목표가 840불. 로보택시·세미가 근거",
};

const WALL_C1 = [
  "베팅확률일뿐 이사회결의랑은 다름",
  "실제 배포시점은 아직 공지안됨",
  "실제 양산수율은 몇달 더 봐야함",
  "팬계정 집계라 회사 공식수치는 아님",
  "비행기 일화라 투자결정과는 거리있음",
  "80%는 최근 투자라운드 표본기준",
  "2030년 전망치라 매분기 갱신됨",
  "한 증권사 의견, 다른 하우스뷰도 같이 봐야함",
  "기상·기술점검따라 며칠 밀릴수있음",
  "설계목표치, 실제성능은 발사후 확인",
  "구체적 내용·시점 아직 공개안됨",
  "분기누적(QTD)은 아직 마이너스임",
  "유럽인도는 2027년부터, 지금은 공개단계",
  "일부 주 사례, 전국확대는 불명확",
  "개인사례라 통계적 안전성과는 구분",
  "차이 작지만 고속주행에 꾸준히 반영",
  "장중기록, 종가기준과는 약간 다름",
  "특정항로 기준, 다른항로는 수준다름",
  "신용평가사 추산, 실제투자액과 차이있음",
  "불케이스라 기본시나리오와는 다름",
];

const WALL_C2 = [
  "머스크 즉답회피가 공식검토 착수는 아님",
  "소프트웨어 구독가치도 같이 봐야함",
  "가격 실제로 내려가는지가 다음신호",
  "새도시마다 무감독전환 시점 다름",
  "테라팹 부지·규모 공개시점이 다음",
  "자율규제 발언, 정책방향과는 분리해서 봄",
  "에이전틱AI 비중 커지는지 다음지표",
  "정부·기업계약 갱신속도가 실적으로 이어지는지",
  "궤도진입~재진입 전구간 성공여부 지켜봄",
  "26기 전량 정상궤도 안착여부가 포인트",
  "임대매출 재무제표에 분리공시되는지 봄",
  "다음 몇주 판매량 이어지는지가 진짜신호",
  "초기 물류사 고객계약 체결여부 확인",
  "실제 체감 보험료인하 후기 늘어나는지",
  "비슷한 접근성 사례 더 나오는지 봄",
  "실제 고속도로 효율실측치 나오면 비교",
  "9/17 새벽 FOMC가 금리 다시 흔들 변수",
  "운임 몇주 더 유지되는지가 관건",
  "발전소는 착공~준공 수년걸림",
  "로보택시·세미 매출 실제 잡히는 시점 확인",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T16SEP")) {
    c = c.replace(
      "const T15SEP = 1789426800000; // 2026.09.15 08:00 KST",
      "const T16SEP = 1789513200000; // 2026.09.16 08:00 KST\nconst T15SEP = 1789426800000; // 2026.09.15 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T15SEP;", "export const LATEST_UPDATE = T16SEP;");
  }
  const firstId = 121922;
  if (c.includes(`id: ${firstId}`)) {
    console.log("wall US already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "합병설오이", "그록음성문자", "중국로봇공장", "사이버캡피츠버그", "테라팹머스크면",
    "젠슨황규제불필요", "토큰사경전망", "팔란티어이오공", "스타십구이이", "스타링크브이삼",
    "컴퓨팅수요강함", "유럽판매팔팔", "세미하노버", "에프에스디육공", "포피씨오공공",
    "모델와이엘공기", "국채금리오공사", "유조선백만불", "무디스일일공", "모건스탠리팔사공",
  ];
  const posts = individuals.map((r, i) => {
    const id = firstId + i;
    return [id, (r.tickers && r.tickers[0]) || "MACRO", nick[i] || `체크${i}`, "관심종목", WALL_CONTENT[r.slug] || r.title.slice(0, 80)];
  });
  const block =
    "  // ── 2026-09-16 신규 ────────────────\n" +
    posts
      .map(
        (p, i) =>
          `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T16SEP + ${8 + i * 8}*60_000, likes: ${24 - (i % 10)}, comments: 2 },`,
      )
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  posts.forEach((p, i) => {
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T16SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T16SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `  ],\n`;
  });
  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
  write("lib/wallPosts.ts", c);
  console.log(`wallPosts US: ${firstId}~${firstId + posts.length - 1}`);
}

function writeFixReports() {
  const summary = US[0];
  const details = US.slice(1);
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
    "scripts/fix-reports-20260916-ko-reports.js",
    "module.exports = " + JSON.stringify(reportsJson, null, 2) + ";\n",
  );
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
REPORTS.push(...require('./fix-reports-20260916-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260916 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260916-ko.js", ko);
  console.log("fix-reports-20260916-ko.js / ko-reports.js written");
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
    "scripts/fix-reports-20260916-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260916-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260916 done (US)");
}

main();
