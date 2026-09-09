#!/usr/bin/env node
/** Insert 2026-09-09 US reports, analyst, wall (diverse copy). */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260909-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.09";
const UPDATED = "2026.09.09 08:40";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T09SEP = 1788908400000; // 2026.09.09 08:00 KST
const TAG = "20260909";

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
  if (c.includes('id: "seed-1544"')) {
    console.log("reports.ts: seed-1544 already present — skip");
  } else {
    const block = US.map((r) => tsBlock(r)).join(",\n") + ",\n";
    const idx2 = c.indexOf('id: "seed-1525"');
    if (idx2 === -1) throw new Error("seed-1525 not found");
    const start = c.lastIndexOf("  {", idx2);
    write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
    console.log("reports.ts: inserted seed-1544~1561");
  }

  c = read("lib/reports.ts");
  if (c.includes("  // 2026-09-09\n")) {
    console.log("REPORT_TICKERS: 2026-09-09 already present");
    return;
  }
  let tick = "  // 2026-09-09\n";
  for (const r of US) {
    const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
    tick += `  "${r.id}": [${t}],\n`;
  }
  const mark = "  // 2026-09-08";
  const tIdx = c.indexOf(mark);
  if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-08 marker missing");
  write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
  console.log("REPORT_TICKERS: inserted 2026-09-09");
}

function usAnalystCopy(r, i) {
  // 절대 summary.slice(0, N) 금지 — 문장 중간 절단 → 애널 피드 「접기」상태에서도 글 잘림
  const raw = r.summary.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  let s = raw;
  if (s.length > 420) {
    const cut = s.lastIndexOf("습니다.", 420);
    s = cut >= 80 ? s.slice(0, cut + 4) : s;
  }
  if (!/(습니다|바랍니다|니다)\.?$/.test(s)) {
    // 문장 끝이 아니면 마지막 완전 문장까지만
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

function usAnalystComment(r, i, k) {
  const slug = r.slug || "";
  const pool = {
    summary: [
      ["유럽 「곧」과 텍사스 플릿 대수는 칸을 나눕니다.", "목표가·시나리오는 의견 가중치로만 두겠습니다."],
    ],
    "cybercab-europe-soon": [
      ["곧은 캘린더가 아닙니다. 첫 도시·요금표를 기다리겠습니다.", "미국 실측과 유럽 허가를 한 셀에 넣지 맙시다."],
    ],
    "dallas-robotaxi-hub": [
      ["40대·75대+는 공급입니다. 유료 대기·요금이 다음입니다.", "검증 플릿과 유료 플릿 정의를 나누겠습니다."],
    ],
    "texas-av-fleet-sep8": [
      ["988 대 432는 정의가 같은지부터입니다.", "유료 마일이 비기 전엔 점유율 단정 금지입니다."],
    ],
    "samsung-taylor-ai5": [
      ["풀가동과 양산 출하는 다른 단계입니다.", "AI5 주문과 공장 서사를 한 결론으로 합치지 않겠습니다."],
    ],
    "ai5-40x-codesign": [
      ["40배와 8배를 열로 유지하겠습니다.", "벤치마크 조건·전력이 나오기 전엔 범위로만."],
    ],
    "spacex-pivotal-220": [
      ["220달러는 의견 칸, 시총 +720억은 반응 칸입니다.", "케이던스·스타링크 순증을 먼저 보겠습니다."],
    ],
    "optimus-15k-parts": [
      ["부품 1만 5천과 완제품 출고를 섞지 않겠습니다.", "주당 런레이트 실측 전엔 옵션입니다."],
    ],
    "japan-interest-16tn": [
      ["16.59조 엔은 이자 예산입니다. 입찰 소화율을 옆에 둡니다.", "엔·글로벌 채권 베타를 같이 적죠."],
    ],
    "china-bank-nim": [
      ["NIM 1.4%는 마진 온도계입니다. NPL과 분리합니다.", "한국 수출 파급은 별도 줄로."],
    ],
    "pltr-nbis-sovereign": [
      ["선호와 수주 공시를 같은 가중치로 두지 않겠습니다.", "두 티커 역할을 나눕니다."],
    ],
    "asml-tsmc-12inch-euv": [
      ["마스크 협력과 장비 출하를 한 문장에 섞지 맙시다.", "수율·적용 시점이 다음 게이트입니다."],
    ],
    "oil-30-cathie": [
      ["30달러 시나리오와 현물을 칸으로 나눕니다.", "추론비용 급감과 유가를 인과로 묶지 않겠습니다."],
    ],
    "googl-acn-gemini": [
      ["1,000명은 고투마켓 근육입니다. 수주 전이 아닙니다.", "클라우드 성장·레퍼런스를 보겠습니다."],
    ],
    "europe-auto-cuts": [
      ["4천·5만은 목표입니다. 확정 집행과 분리합니다.", "전기차 판매·현금흐름을 같이 적죠."],
    ],
    "colorado-megapack": [
      ["50MW/200MWh·5천만 달러는 한 건입니다. 백로그로 확장하지 않습니다.", "COD 일정을 캘린더에."],
    ],
    "fsd-v15-florida": [
      ["버전 개방과 플로리다 소수 배치는 다른 신호입니다.", "개입률·대수 추이가 다음입니다."],
    ],
    "unboxed-10s-video": [
      ["영상 10초와 주간 완성 대수는 다릅니다.", "5초 목표는 수율과 같이 보겠습니다."],
    ],
  };
  const pair = (pool[slug] || pool.summary)[0];
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  if (c.includes("id: -1143")) {
    console.log("analystPosts US -1143 already — skip");
    return;
  }
  const posts = US.map((r, i) => {
    const id = -1143 - i;
    const comments = i % 3 === 0 ? 2 : 1;
    return {
      id,
      alias: ALIASES[i % ALIASES.length],
      symbol: r.pinned ? "MACRO" : (r.tickers && r.tickers[0]) || "MACRO",
      content: usAnalystCopy(r, i),
      comments,
      likes: 14 + (i % 8),
      created_at: `2026-09-09T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const block =
    "  // ── 2026-09-09 신규 (18개 · 존댓말 · 구조 혼합) ──────────────────────\n" +
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
  const mark = "  // ── 2026-09-08 신규";
  const idx = c.indexOf(mark);
  if (idx === -1) throw new Error("analyst 2026-09-08 marker missing");
  write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

  c = read("lib/analystPosts.ts");
  const comm =
    "  // ── 2026-09-09 애널 댓글 ──────────────────────\n" +
    posts
      .map((p, i) => {
        const lines = [
          `    { alias: ${JSON.stringify(ALIASES[(i + 3) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(US[i], i, 0))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":04:00.000Z"))} },`,
        ];
        if (p.comments >= 2) {
          lines.push(
            `    { alias: ${JSON.stringify(ALIASES[(i + 7) % ALIASES.length])}, content: ${JSON.stringify(usAnalystComment(US[i], i, 1))}, created_at: ${JSON.stringify(p.created_at.replace(/:00\.000Z$/, ":07:00.000Z"))} },`,
          );
        }
        return `  [${p.id}]: [\n${lines.join("\n")}\n  ],`;
      })
      .join("\n") +
    "\n";
  const cmark = "  // ── 2026-09-08 애널 댓글";
  const cidx = c.indexOf(cmark);
  if (cidx === -1) throw new Error("analyst comments 2026-09-08 marker missing");
  write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
  console.log("analystPosts US: -1143~-" + (1143 + US.length - 1));
}

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T09SEP")) {
    if (c.includes("const T08SEP")) {
      c = c.replace(
        "const T08SEP = 1788822000000; // 2026.09.08 08:00 KST",
        "const T09SEP = 1788908400000; // 2026.09.09 08:00 KST\nconst T08SEP = 1788822000000; // 2026.09.08 08:00 KST",
      );
    } else {
      throw new Error("T08SEP not found in wallPosts.ts");
    }
    c = c.replace("export const LATEST_UPDATE = T08SEP;", "export const LATEST_UPDATE = T09SEP;");
  }
  if (c.includes("id: 121803")) {
    console.log("wall US 121803 already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  // 1 wall post per individual report (exclude summary) — user asked 1:1 with reports
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "유럽곧체크", "댈러스허브러", "텍사스플릿표", "테일러팹메모", "사십배구분",
    "이백이십피티", "옵티머스부품", "십육조엔", "니엠일점사", "소버린묶음",
    "십이인치마스크", "오일삼십가정", "제미니천명", "유럽감원표", "메가팩오천만",
    "에프에스디플로리다", "언박스트영상",
  ];
  const posts = individuals.map((r, i) => {
    const id = 121803 + i;
    const contentMap = {
      "cybercab-europe-soon": "유럽 사이버캡이 곧이라는데 날짜가 없음. 오스틴 요금이랑 칸 나눠야지",
      "dallas-robotaxi-hub": "댈러스에 모델Y 40·사이버캡 75+라… 유료 대기 나오기 전엔 공급 뉴스만",
      "texas-av-fleet-sep8": "웨이모 988 테슬라 432면 격차 크네. 정의 같은지부터 보고 점유율 말하자",
      "samsung-taylor-ai5": "테일러 풀가동이랑 AI5 2나노는 다른 칸. 수율 나오기 전엔 공장 서사로만",
      "ai5-40x-codesign": "40배랑 8배 섞지 말자. 벤치 조건 없는 배수는 범위로만",
      "spacex-pivotal-220": "PT 220에 시총 +720억… 의견이랑 테이프 반응 분리해서 봄",
      "optimus-15k-parts": "부품 1만5천이랑 주당 1k→2.5k는 계획. 출고 숫자 전엔 옵션",
      "japan-interest-16tn": "일본 이자 16.59조엔 사상최고면 입찰·엔부터. 위험자산 베타 같이",
      "china-bank-nim": "중국 은행 NIM 1.4%면 마진 얇다… NPL이랑 한 줄로 합치지 말기",
      "pltr-nbis-sovereign": "국가 AI 선호라는데 수주 공시 전엔 가중치 낮게",
      "asml-tsmc-12inch-euv": "12인치 EUV 마스크 협력은 수율 병목 이슈. 장비 출하랑 섞지 마",
      "oil-30-cathie": "유가 30달러 시나리오랑 추론비용 급감은 인과 아님. 현물이랑 분리",
      "googl-acn-gemini": "제미니 엔터프라이즈 1000명… 인력이지 수주 확정은 아님",
      "europe-auto-cuts": "JLR 4천 VW 5만은 목표. 확정 인원·EV 판매 보고 판단",
      "colorado-megapack": "콜로라도 메가팩 50MW/200MWh 5천만… 한 건이라 백로그로 안 늘림",
      "fsd-v15-florida": "FSD v15 플릿 확대라지만 플로리다는 아직 소수. 대수 추이 보자",
      "unboxed-10s-video": "4K로 10초마다 한 대… 주간 완성 대수랑은 다른 지표",
    };
    return [id, (r.tickers && r.tickers[0]) || "MACRO", nick[i] || `체크${i}`, "관심종목", contentMap[r.slug] || r.title.slice(0, 80)];
  });
  const block =
    "  // ── 2026-09-09 신규 ────────────────\n" +
    posts
      .map(
        (p, i) =>
          `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T09SEP + ${8 + i * 8}*60_000, likes: ${22 - (i % 10)}, comments: 2 },`,
      )
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  posts.forEach((p, i) => {
    const id = p[0];
    const c1 = "숫자 정의부터 표에 남기자";
    const c2 = "다음 게이트만 캘린더에 고정";
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(c1)}, createdAt: T09SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(c2)}, createdAt: T09SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `  ],\n`;
  });
  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
  write("lib/wallPosts.ts", c);
  console.log(`wallPosts US: 121803~${121803 + posts.length - 1}`);
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  console.log("apply-20260909 done (US)");
}

main();
