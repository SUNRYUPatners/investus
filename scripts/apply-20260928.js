#!/usr/bin/env node
/** Insert 2026-09-28 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260928-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.28";
const UPDATED = "2026.09.28 08:39";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20260928";

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
    const beforeId = "seed-1774";
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
    let tick = "  // 2026-09-28\n";
    for (const r of US) {
      const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
      tick += `  "${r.id}": [${t}],\n`;
    }
    const mark = "  // 2026-09-23";
    const tIdx = c.indexOf(mark);
    if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-23 marker missing");
    write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
    console.log("REPORT_TICKERS: inserted 2026-09-28");
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
  "norway-ev-98": [
    "화면의 98%와 8월 공식 98.7%는 같은 방향입니다. 모델Y +300%는 월간 파일이 아닙니다.",
    "9월 월말 공식과 올해 누적 1위를 같이 보겠습니다.",
  ],
  "nvda-china-rtx5500": [
    "100만 장은 검토입니다. 12월 선적과 허가 문서가 확인입니다.",
    "최상위 연결망 칩과 RTX 프로 5500을 한 줄로 합치지 않겠습니다.",
  ],
  "burry-ai-dotcom": [
    "설비와 닷컴 겹침은 한 투자자의 비교입니다. 가동률과 소프트웨어 매출이 다음입니다.",
    "돈이 먼저 가도 쓰임이 따라오면 엔진이 됩니다.",
  ],
  "nasdaq-23x-pe": [
    "나스닥 100 23배는 향후 12개월 이익 기준입니다. 다음 분기 이익이 확인입니다.",
    "에스앤피 19배와 나란히 두면 기술 할증이 보입니다.",
  ],
  "apollo-agentic-run": [
    "에이전트 인출은 경고입니다. 이미 무너진 은행 이야기가 아닙니다.",
    "이체 속도 규제 초안이 나오면 달력으로 적겠습니다.",
  ],
  "spacex-10b-efficiency": [
    "100억 달러는 화면의 비상장 가치입니다. 오늘 밤 14번째 비행이 다음입니다.",
    "650회 착륙과 스타링크 1천만을 습관으로 보겠습니다.",
  ],
  "bezos-blue-30b": [
    "300억 달러는 사반세기 창립자 현금입니다. 뉴글렌 비행이 확인입니다.",
    "스페이스X 오늘 밤과 한 승부로 합치지 않겠습니다.",
  ],
  "grok-reliability": [
    "오늘은 점수표가 아니라 멈추지 않는 업무 칸입니다.",
    "실제 완수율이 나오면 설명을 데이터로 바꾸겠습니다.",
  ],
  "grok-bot-rewards": [
    "500달러는 한 예시입니다. 다음 지급일과 참여 수가 확인입니다.",
    "엑스 게시 두 배 조건이 글 수를 끌어올리는지를 보겠습니다.",
  ],
  "aapl-vision-pro": [
    "후속 헤드셋은 빠르면 2028년 말입니다. 안경이 먼저라는 줄이 입구입니다.",
    "올해 판매와 안경 공개일을 나눠 적겠습니다.",
  ],
  "newsom-memecoin": [
    "시행은 2027년 1월 1일입니다. 모든 토큰 금지가 아닙니다.",
    "플랫폼이 어떤 코인을 가리는지가 세칙입니다.",
  ],
  "starship-f14-faa": [
    "창은 한국 밤 9시 15분입니다. 궤도 진입과 26기 전개가 확인입니다.",
    "13번째 비행은 궤도에 남지 않았습니다. 오늘은 첫 유료 칸입니다.",
  ],
  "musk-moon-mars": [
    "해마다 두 배는 발언입니다. 공장 출고와 비행 간격이 달력입니다.",
    "카르다쇼프 날짜는 의견이니 생산 숫자와 따로 적겠습니다.",
  ],
  "top10-3066t": [
    "스페이스X 1.958조 달러 7위는 하루 시총입니다. 종가가 확인입니다.",
    "100억 달러 효율 화면과 시총은 다른 줄입니다.",
  ],
  "cybercab-nv-fl": [
    "네바다와 플로리다 상업이 출발입니다. 호출 건수가 다음입니다.",
    "캘리포니아는 내년 중반입니다. 오스틴 요금과 나눠 적겠습니다.",
  ],
  "starship-hourly": [
    "매시간은 2~3년 목표입니다. 연속 비행 간격이 확인입니다.",
    "오늘 밤 한 번이 성공해야 다음 간격 이야기가 열립니다.",
  ],
  "tsla-q3-471k": [
    "47만 1천 대는 예측 선입니다. 10월 초 공식 인도가 확정입니다.",
    "2분기 공식은 48만 126대입니다. 화면 48만 125와 1대 차이입니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ["숫자를 구분해 적겠습니다.", "다음 공시를 기다리겠습니다."];
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  const firstId = -1385;
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
      created_at: `2026-09-28T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const missingPosts = posts.filter((p) => !c.includes(`id: ${p.id}`));
  if (missingPosts.length === 0) {
    console.log("analystPosts US already — skip");
  } else {
    const block =
      (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-28 신규 (17개 · 존댓말 · 구조 혼합) ──────────────────────\n") +
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
    const mark = "  // ── 2026-09-23 신규";
    const idx = c.indexOf(mark);
    if (idx === -1) throw new Error("analyst 2026-09-23 marker missing");
    write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

    c = read("lib/analystPosts.ts");
    const comm =
      (c.includes("  // ── 2026-09-28 애널 댓글") ? "" : "  // ── 2026-09-28 애널 댓글 ──────────────────────\n") +
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
    const cmark = "  // ── 2026-09-23 애널 댓글";
    const cidx = c.indexOf(cmark);
    if (cidx === -1) throw new Error("analyst comments 2026-09-23 marker missing");
    write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
    console.log(`analystPosts US extra: ${missingPosts.map((p) => p.id).join(",")}`);
  }

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "norway-ev-98": "노르웨이 화면 올해 98% 전기차. 모델Y 300% 앞선다는 줄. 8월공식 배터리전기 98.7. 그달 Y는 19위",
  "nvda-china-rtx5500": "중국 알리바바 바이트댄스에 RTX프로5500. 바이트 100만장 검토. 12월출하 장당 약1.3만달러",
  "burry-ai-dotcom": "버리 AI설비 닷컴이랑 겹침. 칩 데이터센터 돈먼저. 쓰임이 따라오는지가 질문. 의견",
  "nasdaq-23x-pe": "나스닥100 향후이익 23배. SPX 19. 동일가중 중형 15. 러셀2000도 23. NTM",
  "apollo-agentic-run": "아폴로 에이전트가 예금 초단위 이체하면 인출될수있음. 경고지 사고아님",
  "spacex-10b-efficiency": "스페이스X 화면 비상장 100억. 착륙650+ 스타링크1천만 드래곤60+. 힘95% 스타십",
  "bezos-blue-30b": "베이조스 블루오리진 2000년부터 약300억 투입. 뉴글렌 비행쌓는중. 창립자현금",
  "grok-reliability": "그록4.7 에이전트 멈추지않음. 점수표 아님. 어제46점이랑 다른장면",
  "grok-bot-rewards": "그록봇 창작자보상 격주. 예시 2주에 500달러. 엑스게시 2배. 엑스머니",
  "aapl-vision-pro": "비전프로 생명유지. 후속 빠르면 2028말 늦으면 2029초. 안경이 먼저",
  "newsom-memecoin": "캘리포니아 AB2409 서명. 공인얼굴 밈코인 막음. 시행 2027.1.1 민사 40-0 78-0",
  "starship-f14-faa": "스타십14 오늘밤 동부8:15 한국21:15. 면허26일개정. 스타링크V3 26기 첫유료",
  "musk-moon-mars": "머스크 달화성 생산 해마다 2배+. 발언이지 올해착륙확정아님. 오늘밤14가 사다리",
  "top10-3066t": "세계시총10곳 30.66조. NVDA 5.434조 AAPL 4.977조 SPCX 1.958조 7위",
  "cybercab-nv-fl": "사이버캡 상업 네바다 플로리다. 캘리포니아 내년중반. 유료호출",
  "starship-hourly": "스타십 2~3년안에 매시간. 지금은 며칠간격. 오늘밤14가 한칸",
  "tsla-q3-471k": "테슬라3분기 인도 471k 넘길지 예측시장. 2분기공식 480126. 마감 10/2 동부자정",
};

const WALL_C1 = [
  "300%는 화면. 8월공식은 Y 19위",
  "100만장은 검토. 12월 배가 확인",
  "겹친그림이지 공식전망 아님",
  "23배는 NTM. 이익이 따라와야함",
  "경고지 이미 무너진은행 아님",
  "100억은 화면숫자. 오늘밤 비행",
  "300억은 사반세기 사재",
  "완수율이 나와야 신뢰가 데이터",
  "500은 예시. 참여수가 다음",
  "후속은 28말. 안경일정이 입구",
  "27년 시행. 모든토큰금지 아님",
  "21:15 창. 궤도랑 26기 전개",
  "2배는 발언. 출고가 달력",
  "1.958조는 하루시총. 종가확인",
  "두주 상업. 호출건수가 다음",
  "매시간은 목표. 연속간격 확인",
  "471k는 예측. 10월초 공식",
];

const WALL_C2 = [
  "9월 월말파일이랑 연간1위 같이봄",
  "최상위 연결망이랑 이카드 다른줄",
  "가동률이랑 구독매출이 따라오는지",
  "SPX 19배랑 나란히 보면 할증보임",
  "이체속도 초안이 나오면 달력",
  "착륙횟수랑 스타링크가입 같이",
  "뉴글렌 수주가 나와야 씨앗됨",
  "어제46점이랑 오늘신뢰 나눠적음",
  "게시2배 조건이 글을 끌어올리는지",
  "올해판매랑 안경공개일 분리",
  "플랫폼이 어떤코인을 가리는지",
  "13번은 궤도 못남. 오늘은 유료",
  "공장출고랑 비행간격이 확인",
  "100억 효율화면이랑 시총은 다른줄",
  "캘리포니아 허가랑 요금 나눠봄",
  "오늘밤 성공해야 다음간격 열림",
  "2분기 480126이랑 나란히",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T28SEP")) {
    c = c.replace(
      "const T23SEP = 1790118000000; // 2026.09.23 08:00 KST",
      "const T28SEP = 1790550000000; // 2026.09.28 08:00 KST\nconst T23SEP = 1790118000000; // 2026.09.23 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T23SEP;", "export const LATEST_UPDATE = T28SEP;");
  }
  const firstId = 122039;
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "노르웨이구팔", "중국오오공", "버리닷컴", "나스닥이십삼배", "에이전트인출",
    "착륙육백오십", "블루삼십억", "그록신뢰", "그록오백달러", "비전이공이에잇",
    "밈코인법", "스타십십사", "달화성두배", "시총삼십조", "네바다플로리다",
    "매시간발사", "인도사칠일",
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
    (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-28 신규 ────────────────\n") +
    missing
      .map((p) => {
        const i = posts.findIndex((x) => x[0] === p[0]);
        return `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T28SEP + ${8 + i * 8}*60_000, likes: ${24 - (i % 10)}, comments: 2 },`;
      })
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  missing.forEach((p) => {
    const i = posts.findIndex((x) => x[0] === p[0]);
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T28SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T28SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
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
    "scripts/fix-reports-20260928-ko-reports.js",
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
REPORTS.push(...require('./fix-reports-20260928-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260928 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260928-ko.js", ko);
  console.log("fix-reports-20260928-ko.js / ko-reports.js written");
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
    "scripts/fix-reports-20260928-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260928-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260928 done (US)");
}

main();
