#!/usr/bin/env node
/** Insert 2026-09-15 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260915-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.15";
const UPDATED = "2026.09.15 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T15SEP = 1789426800000; // 2026.09.15 08:00 KST
const TAG = "20260915";

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
  const beforeId = "seed-1628";
  const idx = c.indexOf(`id: "${beforeId}"`);
  if (idx === -1) throw new Error(`${beforeId} not found`);
  const start = c.lastIndexOf("  {", idx);
  write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
  console.log(`reports.ts: inserted ${US[0].id}~${US[US.length - 1].id}`);

  c = read("lib/reports.ts");
  if (c.includes("  // 2026-09-15\n")) {
    console.log("REPORT_TICKERS: 2026-09-15 already present");
    return;
  }
  let tick = "  // 2026-09-15\n";
  for (const r of US) {
    const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
    tick += `  "${r.id}": [${t}],\n`;
  }
  const mark = "  // 2026-09-14";
  const tIdx = c.indexOf(mark);
  if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-14 marker missing");
  write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
  console.log("REPORT_TICKERS: inserted 2026-09-15");
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
    "앤스로픽 137억 계약과 실제 나스닥 상장 신고서는 별개로 보겠습니다.",
    "로보택시 1,001대·해외자금 60%는 몇 주 단위로 흐름만 확인하겠습니다.",
  ],
  "foreign-equity-60pct": [
    "60%는 자금흐름 자료 기준이라 다음 분기 발표까지 시차가 있습니다.",
    "달러 지수·국채 금리를 같이 보면 자금 방향이 더 분명해집니다.",
  ],
  "treasury-interest-1-7t": [
    "1.7조 달러는 지금 금리가 그대로 유지된다는 가정 위의 숫자입니다.",
    "이번 주 FOMC 결과가 1.4조냐 1.7조냐를 가르는 다음 신호입니다.",
  ],
  "grok-bot-dau-surge": [
    "닷새 급증이 습관적 이용으로 이어지는지는 몇 주 더 봐야 합니다.",
    "그록 4.8 학습 종료 시점과 이용자 수 변화를 같이 보겠습니다.",
  ],
  "mcd-26mo-low": [
    "26개월 최저치는 주가일 뿐 매장망·브랜드력과는 별개입니다.",
    "다음 실적에서 미국 동일점포매출이 개선되는지가 핵심입니다.",
  ],
  "anthropic-profitable-2q": [
    "흑자 소식은 소수 주주 대상 공유라 감사받은 수치는 아닙니다.",
    "S-1 상장 신고서가 나오면 추정치와 실제 숫자를 비교하겠습니다.",
  ],
  "cybercab-fleet-1001": [
    "1,001대는 오토레인 집계로, 회사 공식 발표와는 시차가 있습니다.",
    "베이에어리어가 무감독으로 전환되는 시점을 다음에 확인하겠습니다.",
  ],
  "fsd-slovenia-global": [
    "국가별 개별 승인이라 슬로베니아 통과가 EU 전체 표결을 보장하진 않습니다.",
    "10월 6일 EU 표결의 실제 찬성국 수를 확인하겠습니다.",
  ],
  "anthropic-rum-137b": [
    "양사 모두 공식 확인은 아직 안 한 보도 단계입니다.",
    "메이스빌 데이터센터 자금 조달이 확정되는지가 다음 확인입니다.",
  ],
  "nvidia-cuda-q-logical": [
    "양자컴퓨팅은 아직 상용화까지 몇 년 더 걸리는 초기 분야입니다.",
    "이 도구를 쓰는 연구기관이 늘어나는지를 다음에 보겠습니다.",
  ],
  "coreweave-gpu-demand": [
    "수요 발언 당일에도 주가는 오히려 내렸다는 점도 함께 봅니다.",
    "늘어난 자본지출 계획만큼 데이터센터 확보 속도를 확인하겠습니다.",
  ],
  "jensen-ai-safety-trump-call": [
    "인터뷰·통화 발언이라 공식 정책 발표와는 구분해서 보겠습니다.",
    "실제 안전 관련 조치가 나오는지를 다음에 확인하겠습니다.",
  ],
  "spacex-revenue-10b-month": [
    "월 100억 달러는 애널리스트 모델링이지 회사 공식 가이던스가 아닙니다.",
    "10-K나 다음 실적 공개에서 확정 숫자를 비교해 보겠습니다.",
  ],
  "roadster-oct1-reveal-locked": [
    "참석 신청 마감은 9월 16일 밤 12시(태평양시간)입니다.",
    "실제 비행 여부와 가격은 10월 1일 행사에서 확인됩니다.",
  ],
  "starlink-subscribers-double": [
    "가입자 2배는 1년 단위 비교라 분기별 성장률은 따로 보겠습니다.",
    "기업·정부용 매출 비중이 계속 커지는지가 다음 관찰 포인트입니다.",
  ],
  "zurich-fsd-insurance-discount": [
    "정확한 할인율은 공개되지 않아 체감 효과는 아직 불명확합니다.",
    "세 번째·네 번째 보험사 사례가 이어지는지 지켜보겠습니다.",
  ],
  "tesla-semi-europe-specs": [
    "유럽 인도는 2027년부터라 지금은 사양 공개 단계입니다.",
    "초기 고객사(물류회사) 계약이 나오는지 확인하겠습니다.",
  ],
  "waymo-vegas-15th-city": [
    "라스베이거스 최초 로보택시는 죽스가 먼저 시작했다는 점도 참고하겠습니다.",
    "테슬라·우버 서비스가 실제 언제 가동되는지 같이 보겠습니다.",
  ],
  "spacex-nvidia-space-computers": [
    "머스크의 '매우 확신' 발언이라 공식 발사 일정과는 구분됩니다.",
    "실제 위성 탑재체 계약이 공개되는지를 다음에 확인하겠습니다.",
  ],
  "grok-4-8-training": [
    "학습 종료가 곧 공개 시점을 뜻하진 않습니다.",
    "강화학습 단계 이후 실제 출시일을 확인하겠습니다.",
  ],
  "xai-datacenter-capacity-model": [
    "이 차트는 공식 공시가 아닌 추정 재구성 모델임을 다시 짚습니다.",
    "실제 전력 계약·투자 발표가 이 궤적과 비슷한지 지켜보겠습니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ANALYST_COMMENTS.summary;
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  const firstId = -1248;
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
      created_at: `2026-09-15T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const block =
    "  // ── 2026-09-15 신규 (20개 · 존댓말 · 구조 혼합) ──────────────────────\n" +
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
  const mark = "  // ── 2026-09-14 신규";
  const idx = c.indexOf(mark);
  if (idx === -1) throw new Error("analyst 2026-09-14 marker missing");
  write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

  c = read("lib/analystPosts.ts");
  const comm =
    "  // ── 2026-09-15 애널 댓글 ──────────────────────\n" +
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
  const cmark = "  // ── 2026-09-14 애널 댓글";
  const cidx = c.indexOf(cmark);
  if (cidx === -1) throw new Error("analyst comments 2026-09-14 marker missing");
  write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
  console.log(`analystPosts US: ${firstId}~${firstId - individuals.length + 1}`);

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "foreign-equity-60pct": "외국인 미국주식 비중 60% 역대최고. 2000·2008때보다 높음",
  "treasury-interest-1-7t": "미국 국채이자 1.7조불 갈수도. 사회보장 지출 넘어설 판",
  "grok-bot-dau-surge": "그록봇 DAU 닷새만에 80%↑. 6.9만→12.2만명",
  "mcd-26mo-low": "맥날 주가 252불, 26개월 최저. 작년 335불에서 계속 빠짐",
  "anthropic-profitable-2q": "앤스로픽 2개분기 연속 흑자. 매출 14배 늘어서 115억불",
  "cybercab-fleet-1001": "사이버캡 1,001대로 늘음. 오스틴197+베이696+기타",
  "fsd-slovenia-global": "FSD 슬로베니아 승인. 절벽길도 잘 달림, EU표결 앞두고 호재",
  "anthropic-rum-137b": "앤스로픽이 럼그룹 137억불 계약 상대였음. 코어위브·네비우스 주가는 내림",
  "nvidia-cuda-q-logical": "엔비디아 양자컴퓨터 오류교정 툴 CUDA-Q Logical 공개",
  "coreweave-gpu-demand": "코어위브 CEO \"GPU 하나로 여러명한테 팔 판\". 근데 주가는 5%↓",
  "jensen-ai-safety-trump-call": "젠슨황 내부고발자 용기있다면서도 AI종말론엔 근거없다고 선긋음. 트럼프가 생방중 전화걸어 농담",
  "spacex-revenue-10b-month": "스페이스X 12월 월매출 100억불 목표설. 근데 애널 추정치일뿐",
  "roadster-oct1-reveal-locked": "로드스터 10/1 확정. 머스크가 드로리안 이미지로 '난다' 암시",
  "starlink-subscribers-double": "스타링크 가입자 1년만에 2배, 1200만명. 미국 위성인터넷 89%↑",
  "zurich-fsd-insurance-discount": "호주 취리히보험 FSD차량 보험료 할인. 사고 7배 적다고",
  "tesla-semi-europe-specs": "테슬라 세미 유럽형 하노버서 공개. 550km, 2027년부터 인도",
  "waymo-vegas-15th-city": "웨이모 라스베가스 15번째 도시로. 테슬라·우버도 곧 진입",
  "spacex-nvidia-space-computers": "머스크 \"내년 스페이스X가 엔비디아 AI컴퓨터 우주로 쏜다\" 확신",
  "grok-4-8-training": "그록 4.8 이번주 학습 끝나고 강화학습 단계로",
  "xai-datacenter-capacity-model": "xAI 데이터센터 전력용량 2027년 18.4GW 추정모델. 공식자료 아님",
};

const WALL_C1 = [
  "60%가 꺾이면 방향전환 신호로 봄",
  "5년물 3.25%까지 내리면 1.4조로 줄어듦",
  "일시적 화제성인지 몇주 더 봐야함",
  "가맹점 방식이라 본사 자본부담은 적음",
  "S-1 나오면 진짜 숫자 확인됨",
  "무감독 지역 넓어지는속도가 관건",
  "EU 표결 65%·15개국 기준 아직 안됨",
  "공식 확인 안된 보도단계임",
  "상용화까진 몇년 더 걸림",
  "수요강해도 캐펙스 부담 커서 주가는 다르게 움",
  "발언은 인터뷰지 정책발표 아님",
  "확정 가이던스 아니라 추정모델",
  "9/16 밤12시 마감이라 서둘러야함",
  "기업용 매출이 소비자용보다 더 빠르게 늚",
  "할인율 구체적으로 안나옴",
  "2027년 인도라 아직 시간 있음",
  "죽스가 라스베가스 로보택시 원조임",
  "발사 일정 구체적으로 안나옴",
  "학습끝 = 공개 아님",
  "공식 공시 아닌 추정 재구성모델",
];

const WALL_C2 = [
  "달러·금리랑 같이 보면 방향 더 보임",
  "이번주 FOMC가 다음 신호",
  "새모델 나오면 다시 변화 생길듯",
  "동일점포매출 개선되는지가 핵심",
  "럼그룹 계약이랑 같은날 나온 소식",
  "뉴저지·미주리서도 테스트 중",
  "슬로베니아는 개별국가 승인일뿐",
  "메이스빌 데이터센터 자금조달이 다음",
  "연구기관 채택 늘어나는지 봄",
  "데이터센터 전력 확보 속도가 변수",
  "실제 안전조치 나오는지 지켜봄",
  "10-K 나오면 실제 숫자 비교됨",
  "실제 비행여부는 행사날 나옴",
  "성장률 둔화되면 포화신호",
  "다른 보험사 사례 이어지는지 봄",
  "초기 물류사 고객 계약이 관건",
  "테슬라·우버 가동시점이 다음",
  "실제 위성탑재체 계약이 나와야함",
  "강화학습 이후 출시일 확인",
  "실제 전력계약 발표랑 비교해야함",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T15SEP")) {
    c = c.replace(
      "const T14SEP = 1789340400000; // 2026.09.14 08:00 KST",
      "const T15SEP = 1789426800000; // 2026.09.15 08:00 KST\nconst T14SEP = 1789340400000; // 2026.09.14 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T14SEP;", "export const LATEST_UPDATE = T15SEP;");
  }
  const firstId = 121902;
  if (c.includes(`id: ${firstId}`)) {
    console.log("wall US already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "외인주식육공", "국채이자일칠조", "그록디에이유", "맥날이오이", "앤스로픽흑자",
    "사이버캡천일대", "슬로베니아절벽", "럼그룹일삼칠", "쿠다큐로지컬", "코어위브수요",
    "젠슨황트럼프콜", "스페이스엑스백억", "로드스터난다", "스타링크이배", "취리히보험할인",
    "세미유럽하노버", "웨이모베가스", "우주컴퓨터확신", "그록사팔학습", "엑스에이아이전력",
  ];
  const posts = individuals.map((r, i) => {
    const id = firstId + i;
    return [id, (r.tickers && r.tickers[0]) || "MACRO", nick[i] || `체크${i}`, "관심종목", WALL_CONTENT[r.slug] || r.title.slice(0, 80)];
  });
  const block =
    "  // ── 2026-09-15 신규 ────────────────\n" +
    posts
      .map(
        (p, i) =>
          `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T15SEP + ${8 + i * 8}*60_000, likes: ${24 - (i % 10)}, comments: 2 },`,
      )
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  posts.forEach((p, i) => {
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T15SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T15SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
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
    "scripts/fix-reports-20260915-ko-reports.js",
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
REPORTS.push(...require('./fix-reports-20260915-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260915 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260915-ko.js", ko);
  console.log("fix-reports-20260915-ko.js / ko-reports.js written");
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
    "scripts/fix-reports-20260915-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260915-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260915 done (US)");
}

main();
