#!/usr/bin/env node
/** Insert 2026-09-18 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260918-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.18";
const UPDATED = "2026.09.18 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20260918";

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
  const missing = US.filter((r) => !c.includes(`id: "${r.id}"`));
  if (missing.length === 0) {
    console.log("reports.ts: US already inserted — skip");
  } else {
    const block = missing.map((r) => tsBlock(r)).join(",\n") + ",\n";
    const beforeId = "seed-1690";
    const idx = c.indexOf(`id: "${beforeId}"`);
    if (idx === -1) throw new Error(`${beforeId} not found`);
    const start = c.lastIndexOf("  {", idx);
    write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
    console.log(`reports.ts: inserted ${missing[0].id}~${missing[missing.length - 1].id}`);
  }

  c = read("lib/reports.ts");
  if (c.includes(`"${US[0].id}": [`)) {
    console.log("REPORT_TICKERS: already present");
  } else {
    let tick = "  // 2026-09-18\n";
    for (const r of US) {
      const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
      tick += `  "${r.id}": [${t}],\n`;
    }
    const mark = "  // 2026-09-17";
    const tIdx = c.indexOf(mark);
    if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-17 marker missing");
    write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
    console.log("REPORT_TICKERS: inserted 2026-09-18");
  }
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
  "summary": [
    "스타십 일정·메가팩 누적·삼성 테일러 칩은 각각 다른 이야기라 한 화면에 묶지 않겠습니다.",
    "9월 28일 허가와 14차 비행 결과가 오늘 숫자 중 가장 먼저 갈립니다.",
  ],
  "starship-f14-sept28": [
    "허가 나오기 전엔 카운트다운 확정 아닙니다.",
    "26기 배치 성공이 V3 달력의 첫 칸입니다.",
  ],
  "model-y-spain-275": [
    "한 달 집계라 다음 달 순위가 추세를 가릅니다.",
    "보조금이 더 줄어드는 나라 점유율도 같이 보겠습니다.",
  ],
  "foreign-us-stocks-vs-bonds": [
    "이번 세기 세 번째라 드문 조합입니다.",
    "다음 분기 국제자금 통계가 같은 방향인지 확인하겠습니다.",
  ],
  "tesla-solar-shade-3x": [
    "설계 숫자와 가구 발전량이 따라오는지 보겠습니다.",
    "메가팩 공장 소식과는 다른 가정용 에너지 칸입니다.",
  ],
  "tesla-megapack-77gwh": [
    "다음 분기 출하가 13.5기가와트시를 넘기는지 보겠습니다.",
    "텍사스 3공장 가동이 속도를 가를 변수입니다.",
  ],
  "spacex-156-startup-data": [
    "장외 호가가 얇아 하루 시총 출렁임이 큽니다.",
    "데이터 매입은 논의와 서명을 구분해 적겠습니다.",
  ],
  "openai-millennium-prize": [
    "사람 검증 전에는 증명 선반에 올리지 않겠습니다.",
    "연구소 공식 코멘트가 나오면 그때 사실이 됩니다.",
  ],
  "tesla-ai5-samsung-taylor": [
    "수율이 나와야 원가 10% 발언이 설득력을 얻습니다.",
    "2027년 어느 차종에 먼저 탑재되는지 확인하겠습니다.",
  ],
  "nebius-gpu-plus20": [
    "다른 임대 업체가 따라가는지가 업계 물가입니다.",
    "10월 이후 재계약 공지를 같이 보겠습니다.",
  ],
  "cybercab-dallas-atlanta": [
    "목격과 유료 운행 사이엔 시차가 있습니다.",
    "두 도시 허가 문서가 나오는지를 다음에 보겠습니다.",
  ],
  "tesla-megacharger-1.2mw": [
    "상자 출하와 사이트 영업 개시 사이가 짧아야 의미 있습니다.",
    "세미 인도와 기둥 수가 같이 가는지 보겠습니다.",
  ],
  "optimus-china-audit-rumor": [
    "미확인 관측이라 도시 이름만 외우지 않겠습니다.",
    "10월 전후 생산 사진이 확인 관문입니다.",
  ],
  "openai-mccarthy-spacex": [
    "채용 한 건이 바로 매출은 아닙니다.",
    "다음 기업 고객 발표 속도를 보겠습니다.",
  ],
  "google-spirit-10m": [
    "항공사 인수가 아니라 파일 값 1,000만 달러입니다.",
    "계약 종결 여부가 다음 확인입니다.",
  ],
  "us-japan-550b-chips": [
    "협의 봉투라 의회 승인 전엔 착공이 아닙니다.",
    "부지와 분담 비율이 문서로 나오는 시점을 보겠습니다.",
  ],
  "musk-starship-million-tons": [
    "목표이지 내년 실적이 아닙니다.",
    "연간 발사 횟수가 두 자릿수로 가는지가 현실 점검입니다.",
  ],
  "jensen-nvda-double-chips": [
    "개수 이야기라 금액 성장과는 다를 수 있습니다.",
    "다음 분기 GPU 출하가 경로의 초입인지 보겠습니다.",
  ],
  "cathie-starship-1b-launch": [
    "산술이지 수주 장부가 아닙니다.",
    "연 발사 횟수부터 세면 천장 가정과 비교하기 쉽습니다.",
  ],
  "harvard-spcx-51pct": [
    "주식 포트 기준이라 전체 기부금과는 범위가 다를 수 있습니다.",
    "다음 분기 비중이 유지되는지를 보겠습니다.",
  ],
  "cybercab-cabin-30cents": [
    "목표 단가지 오늘 앱 요금표는 아닙니다.",
    "오스틴 결제 화면이 나오는지 확인하겠습니다.",
  ],
  "ron-baron-fsd-chip": [
    "회사 그림과 실적표 숫자를 구분해 적겠습니다.",
    "FSD 주행거리와 칩 원가가 표에 붙는지 보겠습니다.",
  ],
  "starlink-v3-1000-sats": [
    "14차 26기가 이 달력의 첫 칸입니다.",
    "이후 비행당 60기 체제가 시작되는지 세겠습니다.",
  ],
  "huawei-2-ai-chips": [
    "로드맵이지 지금 성능표 승리가 아닙니다.",
    "2027년 시제품 숫자가 공개되는지를 보겠습니다.",
  ],
  "musk-optimus-cool": [
    "짧은 평은 양산 일정이 아닙니다.",
    "공식 생산 장면이 나오면 그때 숫자가 붙습니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ANALYST_COMMENTS.summary;
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  const firstId = -1312;
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
      created_at: `2026-09-18T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const missingPosts = posts.filter((p) => !c.includes(`id: ${p.id}`));
  if (missingPosts.length === 0) {
    console.log("analystPosts US already — skip");
  } else {
    const block =
      (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-18 신규 (24개 · 존댓말 · 구조 혼합) ──────────────────────\n") +
      missingPosts
        .map(
          (p) => `  {
    id: ${p.id}, alias: ${JSON.stringify(p.alias)}, symbol: ${JSON.stringify(p.symbol)},
    content: ${JSON.stringify(p.content)},
    likes: ${p.likes}, comments: ${p.comments}, created_at: ${JSON.stringify(p.created_at)}, liked: false,
  },`,
        )
        .join("\n") +
      "\n";
    const mark = "  // ── 2026-09-17 신규";
    const idx = c.indexOf(mark);
    if (idx === -1) throw new Error("analyst 2026-09-17 marker missing");
    write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

    c = read("lib/analystPosts.ts");
    const comm =
      (c.includes("  // ── 2026-09-18 애널 댓글") ? "" : "  // ── 2026-09-18 애널 댓글 ──────────────────────\n") +
      missingPosts
        .map((p) => {
          const i = posts.findIndex((x) => x.id === p.id);
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
    const cmark = "  // ── 2026-09-17 애널 댓글";
    const cidx = c.indexOf(cmark);
    if (cidx === -1) throw new Error("analyst comments 2026-09-17 marker missing");
    write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
    console.log(`analystPosts US extra: ${missingPosts.map((p) => p.id).join(",")}`);
  }

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "starship-f14-sept28": "스타십14차 9/22→9/28 월 오전8:15 ET. 첫궤도+스타링크V3 26기",
  "model-y-spain-275": "스페인 모델Y 판매가 2위 비테슬라EV보다 275% 많음",
  "foreign-us-stocks-vs-bonds": "외국인이 美주식 순매수가 국채보다 큼. 이번세기 세번째",
  "tesla-solar-shade-3x": "테슬라 태양광 패널 3구역. 그늘에서 +25%/+33% 출력",
  "tesla-megapack-77gwh": "메가팩 77GWh 65개국. 가동률 99.3% 라스롭40+텍사스50",
  "spacex-156-startup-data": "SPCX 154.81달러 +2.60% 시총 +510억. 실패스타트업 데이터 논의",
  "openai-millennium-prize": "OpenAI가 밀레니엄 수학난제 또하나 접근. 검증은 사람",
  "tesla-ai5-samsung-taylor": "삼성 테일러팹서 테슬라 AI5 2nm 시험생산. 공급목표 2027",
  "nebius-gpu-plus20": "Nebius GPU임대 10/1부터 약 20% 인상. 이미깔린칩 사용료",
  "cybercab-dallas-atlanta": "사이버캡 댈러스·애틀랜타 목격. 유료개업 아님 데이터수집",
  "tesla-megacharger-1.2mw": "세미용 메가차저 사전조립 첫출하. V4 기둥당 1.2MW",
  "optimus-china-audit-rumor": "옵티머스 중국4도시 공급망감사 미확인. 10월양산은 관측",
  "openai-mccarthy-spacex": "OpenAI, 스페이스X 매카시 전세계영업부사장 영입",
  "google-spirit-10m": "구글 스피릿항공 내부자료 1000만달러. 항공사인수 아님",
  "us-japan-550b-chips": "미일 반도체공장 550억달러 협의 시작. 아직 최종서명 아님",
  "musk-starship-million-tons": "머스크 스타십 연 100만~1000만톤 궤도 목표. 내년실적 아님",
  "jensen-nvda-double-chips": "젠슨황 엔비디아 내년 칩판매 올해의 2배 전망. 개수 이야기",
  "cathie-starship-1b-launch": "캐시우드 스타십 발사당 10억불. 연1만회면 2030년 10조 산술",
  "harvard-spcx-51pct": "하버드 기부금 2분기 주식42억 중 SPCX 51.5%. TSMC 7.9%",
  "cybercab-cabin-30cents": "오스틴 사이버캡 무핸들 객실. 요금 마일당 30~40센트 거론",
  "ron-baron-fsd-chip": "머스크, 자체칩 엔비디아대비 2~3배·원가10% FSD 100억마일",
  "starlink-v3-1000-sats": "V3 1000기 떠야 가입자 재가속. F14 26기 이후 60기/회",
  "huawei-2-ai-chips": "화웨이 2027년 AI칩 2종 예고. 로드맵이지 벤치 승리 아님",
  "musk-optimus-cool": "머스크 옵티머스 멋지다 짧은평. 양산일정 아님 태도신호",
};

const WALL_C1 = [
  "허가 나오기전엔 카운트다운 확정아님",
  "한달 집계라 다음달 순위가 추세임",
  "이번세기 세번째라 드문조합임",
  "설계숫자와 실제발전량은 따로봐야함",
  "다음분기 출하가 13.5GWh 넘기는지",
  "장외호가 얇아서 하루시총 출렁임큼",
  "사람검증 전엔 증명으로 안적음",
  "수율나와야 원가10% 발언이 설득력",
  "다른임대업체 따라가는지가 물가임",
  "목격이랑 유료운행은 시차있음",
  "상자출하랑 사이트개업 사이가 짧아야함",
  "미확인관측, 도시이름만 외우지말것",
  "채용한건이 바로 매출은 아님",
  "항공사인수 아니고 파일값 1000만불",
  "협의봉투, 의회승인전엔 착공아님",
  "목표지 내년실적 아님",
  "개수이야기라 금액성장과는 다를수있음",
  "산술이지 수주장부 아님",
  "주식포트기준, 전체기부금이랑 범위다름",
  "목표단가지 오늘앱요금표는 아님",
  "회사그림이랑 실적표숫자는 구분",
  "14차 26기가 달력 첫칸임",
  "로드맵이지 지금벤치승리 아님",
  "짧은평은 양산일정 아님",
];

const WALL_C2 = [
  "26기 배치성공이 V3달력 첫칸",
  "보조금더줄어드는나라 점유율도봄",
  "다음분기 국제자금이 같은방향인지",
  "메가팩공장 소식이랑은 다른칸임",
  "텍사스3공장 가동이 속도변수",
  "데이터매입은 논의랑 서명 구분",
  "연구소 공식코멘트 나오면 사실",
  "2027년 어느차종 먼저탑재되는지",
  "10월이후 재계약공지 같이봄",
  "두도시 허가문서 나오는지가 다음",
  "세미인도랑 기둥수가 같이가는지",
  "10월전후 생산사진이 확인관문",
  "다음 기업고객발표 속도봄",
  "계약종결여부가 다음확인",
  "부지랑 분담비율 문서로 나오는시점",
  "연간발사횟수 두자릿수가 현실점검",
  "다음분기 GPU출하가 경로초입인지",
  "연발사횟수부터 세면 비교쉬움",
  "다음분기 비중 유지되는지봄",
  "오스틴 결제화면 나오는지확인",
  "FSD주행거리랑 칩원가가 표에붙는지",
  "이후 비행당 60기체제 시작되는지",
  "2027 시제품숫자 공개되는지",
  "공식생산장면 나오면 그때숫자",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T18SEP")) {
    c = c.replace(
      "const T17SEP = 1789599600000; // 2026.09.17 08:00 KST",
      "const T18SEP = 1789686000000; // 2026.09.18 08:00 KST\nconst T17SEP = 1789599600000; // 2026.09.17 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T17SEP;", "export const LATEST_UPDATE = T18SEP;");
  }
  const firstId = 121966;
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "스타십구이팔", "스페인모델와이", "외국인주식국채", "태양광그늘개선", "메가팩칠십칠",
    "스페이스엑스시총", "오픈에이아이난제", "삼성테일러칩", "네비우스임대", "사이버캡댈러스",
    "메가차저세미", "옵티머스중국관측", "오픈에이아이영입", "구글스피릿자료", "미일반도체공장",
    "스타십백만톤", "젠슨황두배", "캐시우드발사", "하버드스페이스엑스", "사이버캡삼십센트",
    "론배런칩에프에스드", "브이스리천기", "화웨이이칩", "옵티머스멋지다",
  ];
  const posts = individuals.map((r, i) => {
    const id = firstId + i;
    return [id, (r.tickers && r.tickers[0]) || "MACRO", nick[i] || `체크${i}`, "관심종목", WALL_CONTENT[r.slug] || r.title.slice(0, 80)];
  });
  const missing = posts.filter((p) => !c.includes(`id: ${p[0]}`));
  if (missing.length === 0) {
    console.log("wall US already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  const block =
    (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-18 신규 ────────────────\n") +
    missing
      .map((p) => {
        const i = posts.findIndex((x) => x[0] === p[0]);
        return `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T18SEP + ${8 + i * 8}*60_000, likes: ${24 - (i % 10)}, comments: 2 },`;
      })
      .join("\n") +
    "\n";
  if (c.includes(`id: ${firstId}`)) {
    const mark = "  // ── 2026-09-17 신규";
    const idx = c.indexOf(mark);
    if (idx === -1) throw new Error("wall 2026-09-16 marker missing");
    c = c.slice(0, idx) + block + c.slice(idx);
  } else {
    c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);
  }

  let commBlock = "";
  missing.forEach((p) => {
    const i = posts.findIndex((x) => x[0] === p[0]);
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T18SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T18SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `  ],\n`;
  });
  if (c.includes("121963: [") && missing[0][0] !== firstId) {
    const needle = "    { id: 1219632, nickname: \"사이버캡호주\", holdingLabel: \"관심종목\", content: \"이번주 금리인상 영향이 다음변수\", createdAt: T18SEP + 2160000, likes: 4 },\n  ],\n";
    if (!c.includes(needle)) throw new Error("wall 121963 comment block not found");
    c = c.replace(needle, needle + commBlock);
  } else {
    c = c.replace(
      "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
      `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
    );
  }
  write("lib/wallPosts.ts", c);
  console.log(`wallPosts US extra: ${missing.map((p) => p[0]).join(",")}`);
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
    "scripts/fix-reports-20260918-ko-reports.js",
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
REPORTS.push(...require('./fix-reports-20260918-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260918 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260918-ko.js", ko);
  console.log("fix-reports-20260918-ko.js / ko-reports.js written");
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
    "scripts/fix-reports-20260918-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260918-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260918 done (US)");
}

main();
