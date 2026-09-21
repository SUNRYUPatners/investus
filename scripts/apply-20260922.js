#!/usr/bin/env node
/** Insert 2026-09-22 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260922-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.22";
const UPDATED = "2026.09.22 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20260922";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const ALIASES = [
  "종로 까치 #41", "광화문 여우 #62", "여의도 수리 #28", "송파 독수리 #66",
  "분당 매 #31", "성수 너구리 #15", "역삼 판다 #77", "한남 재규어 #27",
  "삼성동 올빼미 #19", "해운대 고래 #03", "마포 살괭이 #08", "판교 늑대 #90",
  "인천 갈매기 #52", "압구정 치타 #44", "잠실 백로 #29", "청담 여우 #11",
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
    const beforeId = "seed-1740";
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
    let tick = "  // 2026-09-22\n";
    for (const r of US) {
      const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
      tick += `  "${r.id}": [${t}],\n`;
    }
    const mark = "  // 2026-09-21";
    const tIdx = c.indexOf(mark);
    if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-21 marker missing");
    write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
    console.log("REPORT_TICKERS: inserted 2026-09-22");
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
  "tsla-fsd-v15": [
    "차에 찍힌 버전 숫자가 나와야 관측이 배포가 됩니다.",
    "매개변수 추정과 무인 운행 시간을 나란히 보겠습니다.",
  ],
  "ms-tsla-spcx-stack": [
    "두 회사는 따로 상장되어 있습니다. 합병은 공식 문서가 없습니다.",
    "공동 제품이나 공급 계약이 공시에 오르는지 보겠습니다.",
  ],
  "tsla-fsd-czechia": [
    "테슬라 유럽이 알린 승인이고, 차 화면에 내려가야 배포입니다.",
    "10월 6일 표결의 15표와 인구 65%를 같이 보겠습니다.",
  ],
  "spacex-reuse-2027": [
    "완전 재사용은 목표입니다. 착륙 후 바로 다시 뜨는 장면이 증빙입니다.",
    "설계가 가능하다고 한 말과 발사 일정을 구분해 적겠습니다.",
  ],
  "meta-petal-cable": [
    "초당 1페타비트와 2029년 개통은 목표입니다. 착공이 다음입니다.",
    "NEC·스미토모·오렌지 이름이 계약으로 굳는지 보겠습니다.",
  ],
  "us-dc-over-housing": [
    "7,520억 달러가 7,480억 달러를 넘긴 분기는 한 칸입니다.",
    "다음 분기에도 설비 투자가 주택을 위에 두는지 보겠습니다.",
  ],
  "tsla-cybercab-china-interior": [
    "실내 영상은 양산 사양이 아닙니다. 판매 일정이 나와야 합니다.",
    "중국 공장과 미국 허브를 한 매출로 읽지 않겠습니다.",
  ],
  "musk-intelligence-exponential": [
    "지수 성장은 발언입니다. 제품 일정표에 넣지 않겠습니다.",
    "다음에 나오는 모델 점수와 배포 날짜를 보겠습니다.",
  ],
  "tsla-fsd-collision-evasion": [
    "14.3.10이 차에 내려가야 회피 기능이 통계가 됩니다.",
    "하드웨어 3 라이트와 본편 묶음을 나눠 보겠습니다.",
  ],
  "tsla-cybercab-econ-120": [
    "마일당 1.20달러는 인터뷰입니다. 앱 요금표가 나와야 합니다.",
    "25센트 운행비와 5센트 전력은 대담 숫자로만 적겠습니다.",
  ],
  "tsla-models-1m-km": [
    "2017년부터 뛴 한 대의 택시입니다. 플릿 평균이 아닙니다.",
    "배터리와 모터가 100만 킬로미터를 견딘 정비가 다음입니다.",
  ],
  "grok-47": [
    "입력 2달러, 출력 6달러는 4.6과 같습니다. 반값 베팅은 다른 줄입니다.",
    "점수 표가 며칠 뒤에도 같은 칸에 있는지 보겠습니다.",
  ],
  "tsla-vegas-cybercab-5000": [
    "네바다 5,000대 상한과 테슬라 1년 2,000~2,500대는 허가 이야기입니다.",
    "야간 시험과 유료 호출 화면을 구분해 적겠습니다.",
  ],
  "tsla-optimus-regulatory": [
    "프리몬트 요청 276193은 접수입니다. 허가가 아닙니다.",
    "ISO 13482와 10218이 승인 문서에 찍히는지 보겠습니다.",
  ],
  "spacex-starship-7days-v3": [
    "7일은 21일 글 기준이라 28일 근처입니다. 허가가 달력입니다.",
    "운영용 3세대 26기와 부스터 21호기가 같이 떠야 말이 숫자입니다.",
  ],
  "sp500-breadth-49": [
    "9월 18일 49.50%는 4월 이후 가장 얇은 폭입니다.",
    "지수가 올라도 200일선 위 종목 수가 늘는지 보겠습니다.",
  ],
  "tsla-model-y-l-soldout": [
    "모델Y L은 긴 축거 6인승입니다. 론치 시리즈는 출시 한정 사양이고, 롱레인지와 다른 이름입니다.",
    "창이 2026년으로 당겨지는지, 더 밀리는지를 보겠습니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ["숫자를 구분해 적겠습니다.", "다음 공시를 기다리겠습니다."];
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  const firstId = -1351;
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
      created_at: `2026-09-22T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const missingPosts = posts.filter((p) => !c.includes(`id: ${p.id}`));
  if (missingPosts.length === 0) {
    console.log("analystPosts US already — skip");
  } else {
    const block =
      (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-22 신규 (17개 · 존댓말 · 구조 혼합) ──────────────────────\n") +
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
    const mark = "  // ── 2026-09-21 신규";
    const idx = c.indexOf(mark);
    if (idx === -1) throw new Error("analyst 2026-09-21 marker missing");
    write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

    c = read("lib/analystPosts.ts");
    const comm =
      (c.includes("  // ── 2026-09-22 애널 댓글") ? "" : "  // ── 2026-09-22 애널 댓글 ──────────────────────\n") +
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
    const cmark = "  // ── 2026-09-21 애널 댓글";
    const cidx = c.indexOf(cmark);
    if (cidx === -1) throw new Error("analyst comments 2026-09-21 marker missing");
    write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
    console.log(`analystPosts US extra: ${missingPosts.map((p) => p.id).join(",")}`);
  }

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "tsla-fsd-v15": "로보택시 다음 열쇠가 FSD 15라는 관측. 파라미터 100억 vs 14번 10억. 회사 안내문 없음",
  "ms-tsla-spcx-stack": "TSLA+SPCX가 물리AI 스택으로 겹친다는 분석. 따로 상장. 합병은 소셜과장",
  "tsla-fsd-czechia": "체코 감독주행 승인. 테슬라유럽 알림. EU 7번째. 10/6 표결 15표+65%",
  "spacex-reuse-2027": "머스크, 스타십 완전재사용 2027 극히유력. 설계가능. 일정은 아직 목표",
  "meta-petal-cable": "메타 페탈 해저망. 미-프 7000km 1Pbps. 2029 개통 목표. NEC·스미토모·오렌지",
  "us-dc-over-housing": "美 2분기 정보처리설비 7520억 > 주택 7480억. 컴퓨터투자가 집을 넘음",
  "tsla-cybercab-china-interior": "사이버캡 중국 실내 영상. 양산사양 아님. 판매일정 아직",
  "musk-intelligence-exponential": "머스크, 지능이 지수로 큰다. 발언. 제품일정 아님",
  "tsla-fsd-collision-evasion": "FSD 14.3.10 3번째묶음. 자동충돌회피. HW3 라이트도 14.2",
  "tsla-cybercab-econ-120": "사이버캡 운행 25센트 전력 5센트. 테슬라 마일당 1.20. 인터뷰지 공시아님",
  "tsla-models-1m-km": "모델S 택시 100만km. 2017년부터 BC. 한대 기록이지 플릿평균 아님",
  "grok-47": "그록 4.7 나옴. 입력2달러 출력6달러 4.6이랑 같음. 점수만 한단계",
  "tsla-vegas-cybercab-5000": "라스베이거스 야간시험. 네바다 5000대 상한. 테슬라 1년 2~2.5천",
  "tsla-optimus-regulatory": "옵티머스 프리몬트 요청 276193. ISO 13482/10218. 접수지 허가아님",
  "spacex-starship-7days-v3": "머스크 7일뒤 첫 궤도스타십에 스타링크V3 26기. 부스터21. 허가대기",
  "sp500-breadth-49": "S&P 종목 49.50%만 200일선 위. 9/18. 4월초 이후 가장 얇은폭",
  "tsla-model-y-l-soldout": "모델Y L(긴축거 6인승) 론치시리즈 2026 미국 소진. 새주문 27년 1-2월. 롱레인지 아님",
};

const WALL_C1 = [
  "버전 숫자에 15가 찍혀야 관측이 배포됨",
  "따로 상장임. 합병공시 없음",
  "차 화면에 내려가야 승인이지 배포",
  "착륙후 바로 재점화가 증빙임",
  "착공이 나와야 2029가 달력됨",
  "다음분기에도 설비가 주택 위인지",
  "실내영상이랑 양산은 시차있음",
  "발언이지 가이던스 아님",
  "회피가 통계로 나와야 품질임",
  "앱 요금표가 나와야 1.20이 사실",
  "한대 100만이지 평균 아님",
  "반값베팅이랑 공식표 다른줄",
  "유료호출 화면이 다음",
  "접수는 심사시작이지 허가아님",
  "허가가 나와야 28일 근처가 확정",
  "지수강해도 종목반은 200일 아래",
  "창이 26년으로 당겨지는지가 다음",
];

const WALL_C2 = [
  "파라미터 추정이랑 무인시간 나눠봄",
  "공동제품 공시가 나오면 그때 묶음",
  "10/6 15표+인구65%가 다음관문",
  "2027은 목표지 확정일정 아님",
  "1Pbps는 목표용량. 개통때 확인",
  "한분기 역전이라 추세는 더봐야함",
  "중국공장 매출이랑 미국허브 분리",
  "다음 모델점수랑 배포일을 봄",
  "HW3 라이트랑 본편 묶음 구분",
  "25센트 5센트도 대담숫자임",
  "정비기록이 나와야 내구 증빙",
  "점수표가 며칠뒤에도 같은칸인지",
  "네바다 5000이랑 테슬라 2천은 허가",
  "ISO번호가 승인문서에 찍히는지",
  "V3 26기 펼쳐져야 말이 숫자됨",
  "200일선 위 종목수가 늘어야 건강",
  "주간생산이 창을 당기는지 봄",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T22SEP")) {
    c = c.replace(
      "const T21SEP = 1789945200000; // 2026.09.21 08:00 KST",
      "const T22SEP = 1790031600000; // 2026.09.22 08:00 KST\nconst T21SEP = 1789945200000; // 2026.09.21 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T21SEP;", "export const LATEST_UPDATE = T22SEP;");
  }
  const firstId = 122005;
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "십오관측", "스택겹침", "체코승인", "재사용이칠", "페탈해저",
    "설비가주택", "중국실내", "지수지능", "충돌회피", "마일일이이",
    "백만킬로", "그록사점이칠", "베가스오천", "옵티머스접수", "칠일궤도",
    "사할폭", "론치이칠",
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
    (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-22 신규 ────────────────\n") +
    missing
      .map((p) => {
        const i = posts.findIndex((x) => x[0] === p[0]);
        return `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T22SEP + ${8 + i * 8}*60_000, likes: ${24 - (i % 10)}, comments: 2 },`;
      })
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  missing.forEach((p) => {
    const i = posts.findIndex((x) => x[0] === p[0]);
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T22SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T22SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `  ],\n`;
  });
  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
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
    "scripts/fix-reports-20260922-ko-reports.js",
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
REPORTS.push(...require('./fix-reports-20260922-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260922 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260922-ko.js", ko);
  console.log("fix-reports-20260922-ko.js / ko-reports.js written");
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
    "scripts/fix-reports-20260922-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260922-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260922 done (US)");
}

main();
