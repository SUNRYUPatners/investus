#!/usr/bin/env node
/** Insert 2026-09-14 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260914-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.14";
const UPDATED = "2026.09.14 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T14SEP = 1789340400000; // 2026.09.14 08:00 KST
const TAG = "20260914";

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
  if (c.includes('id: "seed-1628"')) {
    const next = replaceReportRange(c, "seed-1628", "seed-1610", block);
    if (!next) throw new Error("reports.ts: failed to replace seed-1628~1610");
    write("lib/reports.ts", next);
    console.log("reports.ts: replaced seed-1628~1647");
  } else {
    const idx2 = c.indexOf('id: "seed-1610"');
    if (idx2 === -1) throw new Error("seed-1610 not found");
    const start = c.lastIndexOf("  {", idx2);
    write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
    console.log("reports.ts: inserted seed-1628~1647");
  }

  c = read("lib/reports.ts");
  if (c.includes("  // 2026-09-14\n")) {
    console.log("REPORT_TICKERS: 2026-09-14 already present");
    return;
  }
  let tick = "  // 2026-09-14\n";
  for (const r of US) {
    const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
    tick += `  "${r.id}": [${t}],\n`;
  }
  const mark = "  // 2026-09-12";
  const tIdx = c.indexOf(mark);
  if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-12 marker missing");
  write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
  console.log("REPORT_TICKERS: inserted 2026-09-14");
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
    "10월 1일 로드스터 신청 마감과 10월 6일 EU 표결을 같은 표에 적어 둡니다.",
    "앤스로픽 5,170억 달러는 여러 해에 걸친 합산이라 오늘 지출이 아닙니다.",
  ],
  "oracle-ellison-cancel": [
    "10b5-1 매도 계획 취소는 공시 하루 뒤 나온 결정입니다.",
    "다음에 새 매도 계획이 신고되는지가 확인 포인트입니다.",
  ],
  "roadster-oct1": [
    "참석 신청 마감은 9월 16일 밤 12시(태평양시간)입니다.",
    "실제 성능 숫자는 10월 1일 행사 당일에 나옵니다.",
  ],
  "fed-loss-212b": [
    "3년 누적 2,120억 달러는 회계상 이연 자산으로 처리됩니다.",
    "이번 주 FOMC 결정이 적자 방향을 가르는 다음 신호입니다.",
  ],
  "starlink-48-airlines": [
    "항공사 48곳·항공기 7,000대는 계약 기준 집계입니다.",
    "다음 분기 신규 항공사 계약이 늘어나는지 보겠습니다.",
  ],
  "tsla-q3-delivery-492k": [
    "칼시 예측치는 베팅 평균이라 확정 인도량은 아닙니다.",
    "10월 21일 공식 발표 전까지는 참고 지표로만 보겠습니다.",
  ],
  "anthropic-517b-compute": [
    "5,170억 달러는 12건 계약을 더한 다년 총액입니다.",
    "엔비디아 투자설은 아직 논의 단계 보도입니다.",
  ],
  "tsla-us-ev-share": [
    "테슬라 판매도 16% 줄었지만 시장 전체가 30% 더 줄었습니다.",
    "완전자율주행 구독 지표가 나오면 점유율 배경이 분명해집니다.",
  ],
  "tsla-98yo-driver": [
    "감독 모드 사례 하나로 안전성 전체를 단정하지 않겠습니다.",
    "고령 운전자 이용률 통계가 나오면 더 넓게 볼 수 있습니다.",
  ],
  "starship-v3-thrust-eiffel": [
    "2천만 파운드 추력은 엔진 30여 개를 합친 수치입니다.",
    "실제 비행 시험에서 이 추력이 온전히 나오는지가 다음입니다.",
  ],
  "eu-fsd-vote-oct6": [
    "지금 찬성·찬성신호 합산은 인구 기준 약 62%입니다.",
    "통과 기준(65%·15개국)까지 남은 3개국을 지켜보겠습니다.",
  ],
  "spacex-700-launches": [
    "연도별 발사 수는 재사용 기술이 성숙할수록 늘었습니다.",
    "올해 남은 발사로 작년치(165회)를 넘는지 보겠습니다.",
  ],
  "optimus-v3-reveal-delay": [
    "프레임 비공개는 베끼기를 막기 위한 선택이라고 했습니다.",
    "완전 공개 시점과 양산 목표가 맞아떨어지는지 확인하겠습니다.",
  ],
  "cybercab-austin-demand": [
    "서지 요금은 수요가 공급을 앞선다는 신호로 읽습니다.",
    "차량 대수가 늘며 대기시간이 줄어드는지 지켜보겠습니다.",
  ],
  "vycap-spacex-10t": [
    "10조 달러 전망은 대주주 의견이지 확정치가 아닙니다.",
    "다음 투자 라운드나 상장 시 매겨질 가치를 보겠습니다.",
  ],
  "gigatexas-robot-factory": [
    "건설 속도와 실제 양산 수율은 별개로 보겠습니다.",
    "공장 가동 시점이 다음 실적 발표에서 언급되는지 확인하겠습니다.",
  ],
  "ms-semi-6x-profit": [
    "6배 수익성은 자율주행 완성을 가정한 시나리오입니다.",
    "세미 트럭 자율주행 승인 절차가 다음 확인 포인트입니다.",
  ],
  "spacex-nasdaq100-weight": [
    "비중 확대와 락업 해제가 겹치면 변동성이 커질 수 있습니다.",
    "이번 달 말 실제 비중 조정 발표를 확인하겠습니다.",
  ],
  "tesla-xai-memphis-battery": [
    "메가팩 720대는 데이터센터 전력 급증을 흡수하는 역할입니다.",
    "다른 데이터센터 운영사와도 비슷한 계약이 나오는지 보겠습니다.",
  ],
  "tesla-4680-charging": [
    "핵심은 최고 속도를 얼마나 오래 유지하느냐입니다.",
    "차주들의 실제 충전 후기가 나오는지 지켜보겠습니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ANALYST_COMMENTS.summary;
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  if (c.includes("id: -1227")) {
    console.log("analystPosts US -1227 already — skip");
    return;
  }
  const individuals = US.filter((r) => !r.pinned);
  const posts = individuals.map((r, i) => {
    const id = -1227 - i;
    const comments = i % 3 === 0 ? 2 : 1;
    return {
      id,
      alias: ALIASES[i % ALIASES.length],
      symbol: (r.tickers && r.tickers[0]) || "MACRO",
      content: usAnalystCopy(r, i),
      comments,
      likes: 15 + (i % 8),
      created_at: `2026-09-14T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const block =
    "  // ── 2026-09-14 신규 (19개 · 존댓말 · 구조 혼합) ──────────────────────\n" +
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
  const mark = "  // ── 2026-09-12 신규";
  const idx = c.indexOf(mark);
  if (idx === -1) throw new Error("analyst 2026-09-12 marker missing");
  write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

  c = read("lib/analystPosts.ts");
  const comm =
    "  // ── 2026-09-14 애널 댓글 ──────────────────────\n" +
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
  const cmark = "  // ── 2026-09-12 애널 댓글";
  const cidx = c.indexOf(cmark);
  if (cidx === -1) throw new Error("analyst comments 2026-09-12 marker missing");
  write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
  console.log("analystPosts US: -1227~-" + (1227 + individuals.length - 1));

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "oracle-ellison-cancel": "엘리슨 75억 매도계획 하루만에 접었대. 이유는 안 밝힘",
  "roadster-oct1": "로드스터 10/1 웨이코 공개. 초청장 밝기 올리면 이스터에그 있음",
  "fed-loss-212b": "연준 3년 적자 합쳐서 2120억불. 고금리 오래갔다는 증거",
  "starlink-48-airlines": "스타링크 항공사 48곳·비행기 7천대 넘음. 기내 와이파이 전쟁",
  "tsla-q3-delivery-492k": "칼시 3분기 인도 예측 49.2만대. 한주새 1.3만 늘었대",
  "anthropic-517b-compute": "앤스로픽 계약 합치면 5170억불. 엔비디아도 IPO 투자설",
  "tsla-us-ev-share": "미국 EV 점유율 52%. 근데 시장이 30% 줄어서 그런 것",
  "tsla-98yo-driver": "98세 할아버지 FSD 맡김. 다람쥐 보고 알아서 멈췄대",
  "starship-v3-thrust-eiffel": "스타십3 추력 2천만파운드. 에펠탑 통째로 든다는 비유",
  "eu-fsd-vote-oct6": "EU FSD 표결 10/6. 지금 인구기준 62%까지 왔음",
  "spacex-700-launches": "팰컨 통산 700발. 작년 165회, 올해 벌써 107회",
  "optimus-v3-reveal-delay": "머스크가 옵티머스3 프레임 비공개 이유 밝힘. 베끼기 방지래",
  "cybercab-austin-demand": "오스틴 캡 대기 30~40분, 모델Y는 1분. 서지요금까지 붙음",
  "vycap-spacex-10t": "바이캐피탈 5~7년내 스페이스X 10조불 전망. 지분 3.4% 보유",
  "gigatexas-robot-factory": "기가텍사스 로봇공장 항공샷. 크레인 엄청 빠르게 올라감",
  "ms-semi-6x-profit": "모건스탠리 세미 무인화되면 수익 6배. 아직 가정 시나리오",
  "spacex-nasdaq100-weight": "스페이스X 나스닥100 비중 1.28%→2.82% 예정. 락업해제 겹침",
  "tesla-xai-memphis-battery": "테슬라가 xAI 멤피스에 메가팩 720대. 미국 최대 그리드 배터리",
  "tesla-4680-charging": "4680 셀 500kW 유지시간 늘림. 분당 회복마일도 개선",
};

const WALL_C1 = [
  "이유 안 밝히면 그냥 지분 유지로 봄",
  "이스터에그보다 실제 스펙이 궁금함",
  "적자 나도 세금으로 바로 안 감",
  "항공사 더 늘면 매출 비중 궁금",
  "10/21 실제 발표가 진짜 숫자",
  "5170억은 몇년치 합산이라 매년 지출 아님",
  "완전자율주행 구독자수 나오면 믹서짐",
  "감독모드지 완전무인 아님",
  "엔진 30개 합친 힘이라 개별은 작음",
  "3개국 남았는데 8개국이 후보",
  "재사용 성숙해서 속도 붙은거",
  "양산 가까워지면 공개한대",
  "차량 늘면 대기 줄듯",
  "비상장이라 실제 가치는 IPO때 확정",
  "가동 시작 시점이 관건",
  "무인화 승인이 먼저 나와야",
  "락업해제 물량이 얼마나 나오는지가 변수",
  "데이터센터 전력 급증 완충용",
  "실제 차주 후기 나오면 체감됨",
];

const WALL_C2 = [
  "매도계획은 취소돼도 다시 신고될수 있음",
  "웨이코가 스페이스X 시험장이랑 가까움",
  "금리 내리면 적자도 줄어들듯",
  "속도보다 요금이 더 중요한 사람도 있음",
  "예측시장이라 베팅 평균일 뿐",
  "AWS·구글 계약이 제일 큼",
  "경쟁사들 하이브리드로 후퇴한것도 한몫",
  "고령층 이동권엔 확실히 도움",
  "화성 갈려면 이정도 힘은 필요하긴 함",
  "유럽 승인나면 상징성이 큼",
  "스타링크 수요가 발사속도 밀어줌",
  "경쟁사 베끼기 걱정이 진짜인듯",
  "새차 타보고싶은 호기심도 큼",
  "150억에서 여기까지 온건 확실히 큼",
  "자동차 공장 옆이라 부품망 공유됨",
  "인건비 비중이 커서 나온 가정",
  "지수펀드 기계적 매수라 실적무관",
  "일론이 테슬라·xAI 둘다 이끄니 자연스러움",
  "충전인프라 늘면 체감 더 커짐",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T14SEP")) {
    c = c.replace(
      "const T12SEP = 1789167600000; // 2026.09.12 08:00 KST",
      "const T14SEP = 1789340400000; // 2026.09.14 08:00 KST\nconst T12SEP = 1789167600000; // 2026.09.12 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T12SEP;", "export const LATEST_UPDATE = T14SEP;");
  }
  if (c.includes("id: 121883")) {
    console.log("wall US 121883 already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "매도계획취소", "로드스터웨이코", "연준적자표", "항공사사십팔", "인도량사구이",
    "오백십칠빌리언", "이브점유율", "구팔세할아버지", "에펠탑추력", "유럽표결디데이",
    "칠백번째발사", "프레임비공개", "오스틴서지", "바이캐피탈십조", "로봇공장항공샷",
    "세미육배", "나스닥백비중", "멤피스메가팩", "사륙팔공셀",
  ];
  const posts = individuals.map((r, i) => {
    const id = 121883 + i;
    return [id, (r.tickers && r.tickers[0]) || "MACRO", nick[i] || `체크${i}`, "관심종목", WALL_CONTENT[r.slug] || r.title.slice(0, 80)];
  });
  const block =
    "  // ── 2026-09-14 신규 ────────────────\n" +
    posts
      .map(
        (p, i) =>
          `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T14SEP + ${8 + i * 8}*60_000, likes: ${24 - (i % 10)}, comments: 2 },`,
      )
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  posts.forEach((p, i) => {
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T14SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T14SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `  ],\n`;
  });
  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
  write("lib/wallPosts.ts", c);
  console.log(`wallPosts US: 121883~${121883 + posts.length - 1}`);
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
REPORTS.push(...require('./fix-reports-20260914-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260914 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260914-ko.js", ko);

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
    "scripts/fix-reports-20260914-ko-reports.js",
    "module.exports = " + JSON.stringify(reportsJson, null, 2) + ";\n",
  );
  console.log("fix-reports-20260914-ko.js / ko-reports.js written");
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
    "scripts/fix-reports-20260914-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260914-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260914 done (US)");
}

main();
