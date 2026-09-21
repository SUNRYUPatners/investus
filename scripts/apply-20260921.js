#!/usr/bin/env node
/** Insert 2026-09-21 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260921-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.21";
const UPDATED = "2026.09.21 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20260921";

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
    const beforeId = "seed-1715";
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
    let tick = "  // 2026-09-21\n";
    for (const r of US) {
      const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
      tick += `  "${r.id}": [${t}],\n`;
    }
    const mark = "  // 2026-09-18";
    const tIdx = c.indexOf(mark);
    if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-18 marker missing");
    write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
    console.log("REPORT_TICKERS: inserted 2026-09-21");
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
  "tsla-fsd-v14310": [
    "버전이 차에 내려가야 품질 이야기가 숫자로 바뀝니다.",
    "주차·드문 장면 개입 통계가 안내문과 같은 방향인지 보겠습니다.",
  ],
  "tsla-fsd-fallen-tree": [
    "한 편의 영상은 통계가 아닙니다. 비슷한 장애물이 반복돼야 합니다.",
    "클립 소프트웨어와 14.3.10이 같은 숫자인지도 구분해 적겠습니다.",
  ],
  "tsla-roadster-reservations": [
    "환불되는 5,000달러만으로는 수요를 세지 않겠습니다.",
    "10일 송금이 들어온 예약만 확정 칸에 두겠습니다.",
  ],
  "tsla-roadster-waco-oct1": [
    "비행 제한 고시가 나와야 베팅이 사실로 바뀝니다.",
    "로켓 연동은 회사 발표 전이라 일정표에 넣지 않겠습니다.",
  ],
  "us-equity-inflows-942b": [
    "12개월 합이라 다음 한 달이 뒤집혀도 합은 한동안 남습니다.",
    "공식 1,396억과 민간 줄을 나눠 보겠습니다.",
  ],
  "nvda-stock-portfolio-63b": [
    "스페이스X는 6월 12일 상장한 SPCX입니다. 비상장이 아닙니다.",
    "다음 13F에서 인텔·스페이스X 비중이 유지되는지 보겠습니다.",
  ],
  "nvda-cursor-spacex-ai": [
    "사용 증언은 계약 금액이 아닙니다.",
    "지분 13F와 인터뷰 한 줄을 한 칸에 합치지 않겠습니다.",
  ],
  "tsla-cybercab-chicago-24": [
    "목격은 유료 호출이 아닙니다. 허가와 앱 화면을 기다리겠습니다.",
    "오스틴 숫자와 시카고 영상을 한 합으로 세지 않겠습니다.",
  ],
  "musk-xi-whitehouse-dinner": [
    "공식 명단 전이라 관측으로만 적겠습니다.",
    "만찬과 중국 감독 주행 허가는 다른 문서입니다.",
  ],
  "tsla-robotaxi-36-cities": [
    "채용은 지도의 초안입니다. 출근 날짜가 나와야 일정입니다.",
    "공고 도시와 목격 도시를 한 줄에 합치지 않겠습니다.",
  ],
  "spacex-fcc-gen3-100k": [
    "접수는 심사 시작이지 10만 기 발사가 아닙니다.",
    "부분 허가 기수와 스타십 비행을 같이 보겠습니다.",
  ],
  "us-china-tariff-talks": [
    "300억 달러는 거론된 규모입니다. 세율 표가 나와야 원가에 붙습니다.",
    "11월 10일 기한이 실제로 미뤄지는지 확인하겠습니다.",
  ],
  "starlink-v3-nvl72-starmind": [
    "25기가와트는 목표이지 지금 궤도 전력이 아닙니다.",
    "위성에 베라 루빈 상자가 실렸다는 명세가 나오는지 보겠습니다.",
  ],
  "tsla-austin-driverless-record": [
    "등록 70%는 매출이 아닙니다. 유료 호출이 막대를 따라와야 합니다.",
    "전체 240회와 무인 비중을 나눠 보겠습니다.",
  ],
  "boring-austin-sanantonio": [
    "허가와 착공이 나와야 지도 한 줄이 공사입니다.",
    "보링과 상장 스페이스X를 한 매출로 합치지 않겠습니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ["숫자를 구분해 적겠습니다.", "다음 공시를 기다리겠습니다."];
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  const firstId = -1336;
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
      created_at: `2026-09-21T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const missingPosts = posts.filter((p) => !c.includes(`id: ${p.id}`));
  if (missingPosts.length === 0) {
    console.log("analystPosts US already — skip");
  } else {
    const block =
      (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-21 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────\n") +
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
    const mark = "  // ── 2026-09-18 신규";
    const idx = c.indexOf(mark);
    if (idx === -1) throw new Error("analyst 2026-09-18 marker missing");
    write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

    c = read("lib/analystPosts.ts");
    const comm =
      (c.includes("  // ── 2026-09-21 애널 댓글") ? "" : "  // ── 2026-09-21 애널 댓글 ──────────────────────\n") +
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
    const cmark = "  // ── 2026-09-18 애널 댓글";
    const cidx = c.indexOf(cmark);
    if (cidx === -1) throw new Error("analyst comments 2026-09-18 marker missing");
    write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
    console.log(`analystPosts US extra: ${missingPosts.map((p) => p.id).join(",")}`);
  }

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "tsla-fsd-v14310": "FSD 14.3.10이 차에 내려오기 시작함. 화면은 2026.27.10. 주차랑 드문장면 학습 올렸다는 안내",
  "tsla-fsd-fallen-tree": "감독주행이 쓰러진 나뭇가지 보고 경로 바꿈. 핸들 안 잡음. 급정지만 한 장면 아님",
  "tsla-roadster-reservations": "로드스터 예약 다시 열림. 오늘 5천불 환불되고 10일 안에 4만5천 전신해야 확정",
  "tsla-roadster-waco-oct1": "10/1 와코 상공 비행제한 베팅 퍼짐. 로켓 연동은 아직 추측. 회사발표 아님",
  "us-equity-inflows-942b": "외국인 12개월 美주식 9420억달러 순유입. 공식기관만 1396억. 민간이 대부분",
  "nvda-stock-portfolio-63b": "엔비디아 주식포트 631억. 인텔 47.5% + SPCX 33.3% = 80%. 6/12 상장분",
  "nvda-cursor-spacex-ai": "젠슨황이 커서 쓴다고 함. 스페이스X 코딩도구. 지분공시랑은 다른 사용증언",
  "tsla-cybercab-chicago-24": "시카고에서 사이버캡 하루 최소 24대 목격. 유료호출 화면은 없음. 오스틴이랑 다른 도시",
  "musk-xi-whitehouse-dinner": "머스크 백악관 시진핑 만찬 초청 보도. 공식명단 전. 허가 보장 아님",
  "tsla-robotaxi-36-cities": "로보택시 안전요원 공고가 36개 도시. 원격으로 막힌 차 돕는 자리. 출근일 아직",
  "spacex-fcc-gen3-100k": "스타링크 3세대 최대 10만기 신청. 9/18 접수. 허가 아님. 325~475km",
  "us-china-tariff-talks": "미중 뉴욕에서 서로 관세 300억달러 줄이는 대화 보도. 서명 전. 11/10 연장 거론",
  "starlink-v3-nvl72-starmind": "머스크, 위성마다 베라루빈 NVL72. 10테라비트·250kW. 25GW는 목표",
  "tsla-austin-driverless-record": "오스틴 무인 사이버캡 목격 기록. 등록비율 2주만에 30→70%. 목격은 매출 아님",
  "boring-austin-sanantonio": "보링이 오스틴~샌안토니오 80마일 터널 준비. 200mph+면 2.5시간→30분. 허가 전",
};

const WALL_C1 = [
  "버전이 차에 내려가야 품질이 숫자됨",
  "한 클립은 통계 아님. 반복돼야 실력",
  "5천불 환불분으로는 수요 못 셈",
  "고시 나오기 전엔 베팅일 뿐",
  "12개월 합이라 다음달 뒤집힐수도",
  "SPCX는 상장분임. 비상장 아님",
  "쓰는거랑 들고있는거 다른칸임",
  "목격이랑 유료호출은 시차있음",
  "명단 나오기 전엔 관측으로만",
  "공고 도시가 출근으로 바뀌는지가 다음",
  "접수는 심사시작이지 발사 아님",
  "300억은 거론 규모. 세율표가 나와야함",
  "25GW는 목표지 지금 궤도전력 아님",
  "등록 70%는 매출 아님. 호출 따라와야",
  "허가·착공 나와야 지도가 공사됨",
];

const WALL_C2 = [
  "주차 개입통계가 안내문이랑 같은방향인지",
  "클립 버전이 14.3.10이랑 같은숫자인지",
  "10일 송금 들어온 예약만 확정칸",
  "로켓 장면 나와야 추측이 사실됨",
  "공식 1396억이랑 민간 줄 나눠봐야함",
  "다음 13F에서 비중 유지되는지봄",
  "다른 대기업 이름 더 나오는지가 확인",
  "시카고 허가서랑 앱화면이 다음",
  "만찬이랑 중국FSD 허가는 다른문서",
  "유료 먼저 뜨는 도시랑 채용도시 대조",
  "부분허가 기수랑 스타십이 같이가야함",
  "11/10 기한 실제로 미뤄지는지",
  "위성에 상자 실렸다는 명세가 나와야함",
  "유료호출이 9/19 막대 따라오는지",
  "보링이랑 SPCX 주가 한줄로 합치지말것",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T21SEP")) {
    c = c.replace(
      "const T18SEP = 1789686000000; // 2026.09.18 08:00 KST",
      "const T21SEP = 1789945200000; // 2026.09.21 08:00 KST\nconst T18SEP = 1789686000000; // 2026.09.18 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T18SEP;", "export const LATEST_UPDATE = T21SEP;");
  }
  const firstId = 121990;
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "에프에스드새버전", "나뭇가지회피", "로드스터오천", "와코십월일", "외인구사공억",
    "엔비디아포트", "커서쓴다", "시카고이십사", "만찬관측", "삼십육도시채용",
    "스타링크십만", "관세삼백억", "베라루빈위성", "오스틴칠십", "보링삼십분",
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
    (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-21 신규 ────────────────\n") +
    missing
      .map((p) => {
        const i = posts.findIndex((x) => x[0] === p[0]);
        return `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T21SEP + ${8 + i * 8}*60_000, likes: ${24 - (i % 10)}, comments: 2 },`;
      })
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  missing.forEach((p) => {
    const i = posts.findIndex((x) => x[0] === p[0]);
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T21SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T21SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
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
    "scripts/fix-reports-20260921-ko-reports.js",
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
REPORTS.push(...require('./fix-reports-20260921-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260921 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260921-ko.js", ko);
  console.log("fix-reports-20260921-ko.js / ko-reports.js written");
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
    "scripts/fix-reports-20260921-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260921-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260921 done (US)");
}

main();
