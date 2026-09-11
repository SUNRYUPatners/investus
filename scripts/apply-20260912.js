#!/usr/bin/env node
/** Insert 2026-09-12 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260912-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.12";
const UPDATED = "2026.09.12 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T12SEP = 1789167600000; // 2026.09.12 08:00 KST
const TAG = "20260912";

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);

const ALIASES = [
  "종로 까치 #41", "광화문 여우 #62", "여의도 수리 #28", "송파 독수리 #66",
  "분당 매 #31", "성수 너구리 #15", "역삼 판다 #77", "한남 재규어 #27",
  "삼성동 올빼미 #19", "해운대 고래 #03", "마포 살괭이 #08", "판교 늑대 #90",
  "인천 갈매기 #52", "압구정 치타 #44", "잠실 백로 #29", "청담 여우 #11",
  "합정 수달 #07", "이태원 부엉이 #18",
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

function replaceReportRange(c, firstId, nextId, block) {
  const first = c.indexOf(`id: "${firstId}"`);
  const next = c.indexOf(`id: "${nextId}"`);
  if (first === -1 || next === -1) return null;
  const start = c.lastIndexOf("  {", first);
  const end = c.lastIndexOf("  {", next);
  return c.slice(0, start) + block + c.slice(end);
}

function insertReportsTs() {
  let c = read("lib/reports.ts");
  const block = US.map((r) => tsBlock(r)).join(",\n") + ",\n";
  if (c.includes('id: "seed-1610"')) {
    const next = replaceReportRange(c, "seed-1610", "seed-1588", block);
    if (!next) throw new Error("reports.ts: failed to replace seed-1610~1588");
    write("lib/reports.ts", next);
    console.log("reports.ts: replaced seed-1610~1627");
  } else {
    const idx2 = c.indexOf('id: "seed-1588"');
    if (idx2 === -1) throw new Error("seed-1588 not found");
    const start = c.lastIndexOf("  {", idx2);
    write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
    console.log("reports.ts: inserted seed-1610~1627");
  }

  c = read("lib/reports.ts");
  if (c.includes("  // 2026-09-12\n")) {
    console.log("REPORT_TICKERS: 2026-09-12 already present");
    return;
  }
  let tick = "  // 2026-09-12\n";
  for (const r of US) {
    const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
    tick += `  "${r.id}": [${t}],\n`;
  }
  const mark = "  // 2026-09-11";
  const tIdx = c.indexOf(mark);
  if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-11 marker missing");
  write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
  console.log("REPORT_TICKERS: inserted 2026-09-12");
}

function usAnalystCopy(r, i) {
  const raw = r.summary.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  let s = raw;
  if (s.length > 380) {
    const cut = s.lastIndexOf("습니다.", 380);
    s = cut >= 80 ? s.slice(0, cut + 4) : s;
  }
  if (!/(습니다|바랍니다|니다)\.?$/.test(s)) {
    const cut = s.lastIndexOf("습니다.");
    if (cut >= 40) s = s.slice(0, cut + 4);
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
    "18일 발사창과 12월 연산 매출을 같은 날짜로 보지 않겠습니다.",
    "주택 57.9%는 집 시장 표에만 남기겠습니다.",
  ],
  "japan-fsd-2026": [
    "올해 일본 허가가 나오면 구독 이야기가 더 분명해집니다.",
    "홍콩 전시와 일본 소프트웨어 문을 따로 보겠습니다.",
  ],
  "starship-vs-newglenn": [
    "124미터와 80.90메가뉴턴은 오늘 화면에 찍힌 스펙입니다.",
    "18일 비행이 스펙을 실적으로 옮겨 줍니다.",
  ],
  "starship-f14-sep18": [
    "기본 창은 18일 아침, 예비는 19일입니다.",
    "스타링크 3세대가 실제로 실리는지를 보겠습니다.",
  ],
  "cybercab-hk-tokyo": [
    "홍콩은 보여 주는 차입니다. 유료 호출과는 단계가 다릅니다.",
    "다음 전시장 도쿄 날짜가 나오면 옆에 적겠습니다.",
  ],
  "fsd-v15": [
    "15번은 다음 큰 버전 이름입니다. 차에 내려가는 날이 확인입니다.",
    "위험 예측이 빨라진다는 문장을 사고율 증명으로 읽지 않겠습니다.",
  ],
  "tsla-2030s-scale": [
    "연 216억·800억 달러는 2030년대 가정입니다.",
    "유료 구독 건수와 출고 대수가 나오면 가정이 검증됩니다.",
  ],
  "semi-nv-sep24": [
    "24일 행사에서 연간 대수가 나오는지를 보겠습니다.",
    "초대장은 출고 시작이 아닙니다.",
  ],
  "nvda-electricity": [
    "새로운 전기는 비유입니다. 설비 투자 가이던스가 숫자입니다.",
    "38기가와트 계획과 같은 주의 배경으로 읽겠습니다.",
  ],
  "cybercab-devon-15": [
    "데본 15대는 주차장 목격입니다. 앱 등록이 다음입니다.",
    "홍콩 전시 대수와 더하지 않겠습니다.",
  ],
  "housing-seller-579": [
    "57.9%는 매도 초과이지 집값 하루 급락이 아닙니다.",
    "모기지 금리와 16일 회의가 다음 화면입니다.",
  ],
  "starship-f15-hw": [
    "부스터 22 극저온은 지상 기밀 시험입니다.",
    "14번째 결과 뒤에 15번째 창이 분명해집니다.",
  ],
  "germany-fsd-kba": [
    "8월 8일 공문은 두 경로 검토입니다. 승인은 아직입니다.",
    "네덜란드 임시를 독일이 받는지가 다음 공문입니다.",
  ],
  "ms-semi-12k": [
    "월 1만 2천~1만 8천 달러는 증권사 의견입니다.",
    "24일 공장과 소프트웨어 일정을 같이 보겠습니다.",
  ],
  "starlink-5g-2028": [
    "2027년 발사, 2028년 상반기 서비스가 입에서 나온 창입니다.",
    "지금 접시 공유기와 세대를 나눠 적겠습니다.",
  ],
  "msft-38gw": [
    "12에서 38기가와트는 2032년 목표입니다.",
    "분기 설비 투자가 나오면 계획이 속도가 됩니다.",
  ],
  "ark-cybercab-025": [
    "마일당 0.25달러는 규모가 커진 뒤의 그림입니다.",
    "38만에서 100만 마일은 한 플릿의 누적입니다.",
  ],
  "spcx-ai-111b": [
    "12월 1일부터 월 11억 1천만 달러가 시작된다고 했습니다.",
    "1,000억 달러는 12월 속도의 연율입니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ANALYST_COMMENTS.summary;
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  if (c.includes("id: -1209")) {
    console.log("analystPosts US -1209 already — skip");
    return;
  }
  const posts = US.map((r, i) => {
    const id = -1209 - i;
    const comments = i % 3 === 0 ? 2 : 1;
    return {
      id,
      alias: ALIASES[i % ALIASES.length],
      symbol: r.pinned ? "MACRO" : (r.tickers && r.tickers[0]) || "MACRO",
      content: usAnalystCopy(r, i),
      comments,
      likes: 15 + (i % 8),
      created_at: `2026-09-12T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const block =
    "  // ── 2026-09-12 신규 (18개 · 존댓말 · 구조 혼합) ──────────────────────\n" +
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
  const mark = "  // ── 2026-09-11 신규";
  const idx = c.indexOf(mark);
  if (idx === -1) throw new Error("analyst 2026-09-11 marker missing");
  write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

  c = read("lib/analystPosts.ts");
  const comm =
    "  // ── 2026-09-12 애널 댓글 ──────────────────────\n" +
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
  const cmark = "  // ── 2026-09-11 애널 댓글";
  const cidx = c.indexOf(cmark);
  if (cidx === -1) throw new Error("analyst comments 2026-09-11 marker missing");
  write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
  console.log("analystPosts US: -1209~-" + (1209 + US.length - 1));

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "japan-fsd-2026": "일본 사장이 올해 안에 FSD 먼저 켠대. 사이버캡은 그 다음 계단이래",
  "starship-vs-newglenn": "스타십 124m·80.90MN, 뉴글렌 98m·19.93MN. 스펙 한 장 비교",
  "starship-f14-sep18": "스타십 14 창 9/18 7:15-9:14 CDT. 첫 매출 비행에 스타링크 3세대",
  "cybercab-hk-tokyo": "캡 홍콩 9/9 아시아 첫 공개, 다음이 도쿄. 전시장이지 호출 아님",
  "fsd-v15": "FSD 15번이 위험 예측 더 빠르고 충돌 회피 좋아진대. 감독 모드 업데이트",
  "tsla-2030s-scale": "2030년대 가정: FSD 구독 연 216억, 로보택시 800억. 의견이지 실적 아님",
  "semi-nv-sep24": "네바다 세미 공장 개장 초대가 9/24. 전기 트럭 건물 오픈 행사",
  "nvda-electricity": "젠슨이 AI를 새 전기라고 함. 비유고 이번 분기 숫자는 아님",
  "cybercab-devon-15": "펜실베니아 데본 주차장에 캡 15대 대기. 앱에 올랐는지는 다음",
  "housing-seller-579": "미국 집 매도자가 매수자보다 57.9% 많대. 8월 기록. 집값 -57% 아님",
  "starship-f15-hw": "14번도 안 떴는데 부스터22·선박42 극저온 끝. 15번 준비 중",
  "germany-fsd-kba": "독일 KBA가 EU 표결 전 네덜란드 임시 승인 받을 길 검토. 아직 허가 아님",
  "ms-semi-12k": "모건스탠리 세미+자율이면 월 1.2~1.8만달러. 증권사 의견",
  "starlink-5g-2028": "CFO가 27년 발사 28년 상반기 우주 5G. 지금 문자 다이렉트랑 세대 다름",
  "msft-38gw": "MS 데이터센터 12GW에서 2032년 38GW+. 6년짜리 전력 목표",
  "ark-cybercab-025": "캡 마일당 0.25달러 그림 + 플릿 구매 폼. 시험 마일 38만→100만",
  "spcx-ai-111b": "12/1부터 연산 계약 월 11.1억달러. 연율 1000억은 12월 속도",
};

const WALL_C1 = [
  "일본 허가 날짜가 나오면 구독이 보여",
  "80.90MN이 18일 점화에서 확인되면 스펙이 실적",
  "예비일 19일도 달력에 적어둬",
  "도쿄 전시 일정 뜨면 알려줘",
  "차에 15번 내려가는 날이 진짜 뉴스",
  "가정 숫자는 표에 가정이라고 쓰자",
  "24일 연간 대수 나오면 공장 이야기지",
  "전기 비유는 클라우드 설비투자랑 같이 보자",
  "15대가 앱 지도에 뜨는지가 다음",
  "57.9%는 매물 많다는 온도야",
  "극저온 다음이 정적 화재",
  "공문은 검토지 도장 아님",
  "월 매출 가정은 출고 뒤에나",
  "27년 첫 위성 발사 뉴스를 기다리자",
  "분기 설비투자가 38GW의 속도",
  "0.25달러는 2030 규모 가정",
  "12월 장부에 11.1억이 찍히면 확신",
];

const WALL_C2 = [
  "홍콩 금색 캡이랑 일본 FSD는 다른 문",
  "뉴글렌이랑 한 판에서 비교한 게 오늘 화면",
  "3세대 스타링크 탑재가 매출 비행의 증거",
  "전시장 조명이랑 데본 주차장 역할이 다름",
  "감독 모드지 무인 호출 아님",
  "세미 10만대는 공장 초대장과 거리 있음",
  "디젤 코 없는 흰 세미 얼굴이 사진",
  "MS 38GW가 같은 주 전력 숫자",
  "유타 7대랑 더하면 안 됨",
  "16일 회의가 모기지 다음 장면",
  "18일 결과 보고 15번 창 잡히겠지",
  "일본 2026이랑 독일 검토는 나라별",
  "24일 행사 초청장이 먼저",
  "접시 공유기랑 5G 휴대폰은 세대 다름",
  "칩 자리=전력이라는 게 핵심",
  "플릿 폼에 계약 붙는지가 실전",
  "로켓·통신·연산이 한 회사 세 제품",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T12SEP")) {
    c = c.replace(
      "const T11SEP = 1789081200000; // 2026.09.11 08:00 KST",
      "const T12SEP = 1789167600000; // 2026.09.12 08:00 KST\nconst T11SEP = 1789081200000; // 2026.09.11 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T11SEP;", "export const LATEST_UPDATE = T12SEP;");
  }
  if (c.includes("id: 121866")) {
    console.log("wall US 121866 already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "일본에프에스디", "백이십사미터", "구십팔발사창", "홍콩금캡", "십오번안전",
    "이천삼십년대", "네바다구이사", "새전기발언", "데본십오대", "매도오칠구",
    "부스터이십이", "독일검토공문", "세미만이팔", "우주오쥐", "삼십팔기가",
    "마일영점이오", "십이월연산",
  ];
  const posts = individuals.map((r, i) => {
    const id = 121866 + i;
    return [id, (r.tickers && r.tickers[0]) || "MACRO", nick[i] || `체크${i}`, "관심종목", WALL_CONTENT[r.slug] || r.title.slice(0, 80)];
  });
  const block =
    "  // ── 2026-09-12 신규 ────────────────\n" +
    posts
      .map(
        (p, i) =>
          `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T12SEP + ${8 + i * 8}*60_000, likes: ${24 - (i % 10)}, comments: 2 },`,
      )
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  posts.forEach((p, i) => {
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T12SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T12SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `  ],\n`;
  });
  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
  write("lib/wallPosts.ts", c);
  console.log(`wallPosts US: 121866~${121866 + posts.length - 1}`);
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
REPORTS.push(...require('./fix-reports-20260912-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260912 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260912-ko.js", ko);

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
    "scripts/fix-reports-20260912-ko-reports.js",
    "module.exports = " + JSON.stringify(reportsJson, null, 2) + ";\n",
  );
  console.log("fix-reports-20260912-ko.js / ko-reports.js written");
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
    "scripts/fix-reports-20260912-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260912-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260912 done (US)");
}

main();
