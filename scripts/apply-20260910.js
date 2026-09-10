#!/usr/bin/env node
/** Insert 2026-09-10 US reports, analyst, wall (unique copy). */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260910-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.10";
const UPDATED = "2026.09.10 08:50";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const T10SEP = 1788994800000; // 2026.09.10 08:00 KST
const TAG = "20260910";

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
  if (c.includes('id: "seed-1562"')) {
    console.log("reports.ts: seed-1562 already present — skip");
  } else {
    const block = US.map((r) => tsBlock(r)).join(",\n") + ",\n";
    const idx2 = c.indexOf('id: "seed-1544"');
    if (idx2 === -1) throw new Error("seed-1544 not found");
    const start = c.lastIndexOf("  {", idx2);
    write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
    console.log("reports.ts: inserted seed-1562~1587");
  }

  c = read("lib/reports.ts");
  if (c.includes("  // 2026-09-10\n")) {
    console.log("REPORT_TICKERS: 2026-09-10 already present");
    return;
  }
  let tick = "  // 2026-09-10\n";
  for (const r of US) {
    const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
    tick += `  "${r.id}": [${t}],\n`;
  }
  const mark = "  // 2026-09-09";
  const tIdx = c.indexOf(mark);
  if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-09 marker missing");
  write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
  console.log("REPORT_TICKERS: inserted 2026-09-10");
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
    "경제 두 배 발언과 텍사스 437대는 칸을 나눕니다.",
    "바이백 60억과 10년 4.83%를 한 줄의 완화로 합치지 않겠습니다.",
  ],
  "musk-ai-robots-double": [
    "10년 두 배는 생산성 가정입니다. 공장 대수와 섞지 않겠습니다.",
    "옵티머스 부품 발주는 다른 표에 두겠습니다.",
  ],
  "florida-cybercab-i275": [
    "금색 사이버캡 고속도로는 현장이지 유료 요금이 아닙니다.",
    "오스틴 배치 숫자와 I-275를 한 셀에 넣지 않겠습니다.",
  ],
  "fcc-starlink-spectrum": [
    "1000메가헤르츠 이상은 대역폭 허가입니다. 가입자 숫자와 분리합니다.",
    "12기가와 42기가는 서로 다른 창입니다.",
  ],
  "texas-fleet-437": [
    "437대·오늘 +5는 등록 집계입니다. 유료 마일과 섞지 맙시다.",
    "모델Y 388·사이버캡 49 비중을 점유율로 단정하지 않겠습니다.",
  ],
  "goldman-cybercab-cpm": [
    "마일당 30센트 저렴은 $2만~3만 가정입니다. 현행 원가와 분리합니다.",
    "웨이모 비교는 시나리오 칸에만 두겠습니다.",
  ],
  "lyft-waymo-nashville": [
    "내슈빌 제휴는 공급 뉴스입니다. LYFT −8.25%와 인과로 묶지 않겠습니다.",
    "요금표·대기 공개 전엔 점유율 단정 금지입니다.",
  ],
  "nvda-nvl72-710b": [
    "7,100억 달러는 2027년 전망입니다. 랙 대수 +50%와 가격을 나눕니다.",
    "출하·전력 계약이 나오기 전엔 범위로만 두겠습니다.",
  ],
  "dell-trump-331": [
    "2월 10일 최대 500만 달러와 +331%는 다른 시계입니다.",
    "종가 535.25달러를 영구 추세로 쓰지 않겠습니다.",
  ],
  "treasury-buyback-6b": [
    "60억 달러는 규모입니다. 10년 4.83% 반응과 칸을 나눕니다.",
    "물가 이틀이 다음 게이트입니다.",
  ],
  "unboxed-paint-70": [
    "도장 −70%와 사이클 10초 미만은 공장 가정입니다.",
    "사이버캡 무도장과 양산 대수를 한 문장에 넣지 않겠습니다.",
  ],
  "ship-42-massey": [
    "42호기는 두 번째 시험 라운드입니다. 궤도 성공과 섞지 않겠습니다.",
    "발사 창이 열리기 전엔 일정만 적습니다.",
  ],
  "spcx-unlock-319m": [
    "3.19억 주는 90일 창입니다. 다음 180일 블록과 분리합니다.",
    "종가 −3.86%를 락업 소화로 단정하지 않겠습니다.",
  ],
  "musk-mcap-348t": [
    "합산 3.48조는 시총 산술입니다. 지배력 가정과 칸을 나눕니다.",
    "스페이스엑스와 테슬라 비중을 한 베팅으로 묶지 않겠습니다.",
  ],
  "spcx-closed-loop": [
    "엑스 하루 3.5억 게시와 그록 4.7은 제품 칸입니다.",
    "스타마인드 2027~28은 계획이라 가중치를 낮춥니다.",
  ],
  "sp500-eps-367": [
    "달력 EPS 367은 +34% 추정입니다. 연초 15% 뷰와 열을 나눕니다.",
    "가정치가 바뀌면 표를 새로 만들겠습니다.",
  ],
  "starship-v4-140m": [
    "랩터 9기·약 140미터는 설계입니다. 비행 실측과 분리합니다.",
    "컴퓨팅 위성 2027~29는 연도 칸에만 둡니다.",
  ],
  "starlink-hawker-faa": [
    "호커 700·800·900은 기종 허가 축입니다.",
    "1기가·100메가·20밀리초는 목표 성능이라 실측과 나눕니다.",
  ],
  "dc-capex-316t": [
    "2050년까지 미국 15.1조는 누적 가정입니다. 내년 1조~1.2조와 시계가 다릅니다.",
    "지역 배분을 한 장의 확정으로 쓰지 않겠습니다.",
  ],
  "g7-yields-2008": [
    "2008년 이후 최고 차입은 국가별 범위입니다. 영국이 상단입니다.",
    "바이백과 같은 칸에 넣지 않겠습니다.",
  ],
  "googl-finland-15b": [
    "150억 달러 이상은 인프라 공약입니다. 착공과 분리합니다.",
    "풍력·94메가와트 배터리·22년 원전 계약을 한 줄로 합치지 않겠습니다.",
  ],
  "googl-tesla-semi-tx": [
    "세미 25대는 노선 파일럿입니다. 전국 물류와 확장하지 않겠습니다.",
    "휴스턴–댈러스만 표에 남기겠습니다.",
  ],
  "cybercab-cpm-specs": [
    "69인치 폭·47.6킬로와시는 스펙입니다. 마일당 원가와 칸을 나눕니다.",
    "전비 6.1마일은 현장·가정 정의를 확인하겠습니다.",
  ],
  "fsd-ace-1439": [
    "소프트웨어 2026.27.6과 감독 완전자율 14.3.9는 버전 칸입니다.",
    "개입률이 나오기 전엔 기능을 매출로 읽지 않겠습니다.",
  ],
  "austin-1000-cybercab": [
    "최대 1,000대는 준비 범위입니다. 오늘 등록 49대와 섞지 않겠습니다.",
    "종가 +4.17%를 허가 확정으로 읽지 않겠습니다.",
  ],
  "optimus-5000-parts": [
    "5,000대 부품 발주는 발주이지 출고가 아닙니다.",
    "주당 조립 대수가 나오기 전엔 옵션입니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ANALYST_COMMENTS.summary;
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  if (c.includes("id: -1161")) {
    console.log("analystPosts US -1161 already — skip");
    return;
  }
  const posts = US.map((r, i) => {
    const id = -1161 - i;
    const comments = i % 3 === 0 ? 2 : 1;
    return {
      id,
      alias: ALIASES[i % ALIASES.length],
      symbol: r.pinned ? "MACRO" : (r.tickers && r.tickers[0]) || "MACRO",
      content: usAnalystCopy(r, i),
      comments,
      likes: 14 + (i % 8),
      created_at: `2026-09-10T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const block =
    "  // ── 2026-09-10 신규 (26개 · 존댓말 · 구조 혼합) ──────────────────────\n" +
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
  const mark = "  // ── 2026-09-09 신규";
  const idx = c.indexOf(mark);
  if (idx === -1) throw new Error("analyst 2026-09-09 marker missing");
  write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

  c = read("lib/analystPosts.ts");
  const comm =
    "  // ── 2026-09-10 애널 댓글 ──────────────────────\n" +
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
  const cmark = "  // ── 2026-09-09 애널 댓글";
  const cidx = c.indexOf(cmark);
  if (cidx === -1) throw new Error("analyst comments 2026-09-09 marker missing");
  write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
  console.log("analystPosts US: -1161~-" + (1161 + US.length - 1));

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "musk-ai-robots-double": "경제 두 배라는데 10년 가정임. 공장 대수 나오기 전엔 부품 5천이랑 칸 나눠야지",
  "florida-cybercab-i275": "금색 사이버캡이 I-275로 세인트피터즈버그 방향이라… 현장이지 요금표는 아님",
  "fcc-starlink-spectrum": "스타링크가 12기가·42기가에서 1000메가헤르츠 이상이라. 가입자 숫자랑 섞지 마",
  "texas-fleet-437": "텍사스 437대, 오늘 +5(모델Y 1·사이버캡 4). 유료 마일 전엔 등록 집계만",
  "goldman-cybercab-cpm": "마일당 30센트 싸다는 2~3만 달러 가정. 웨이모 비교는 시나리오 칸",
  "lyft-waymo-nashville": "리프트+웨이모 내슈빌인데 LYFT 14.90에 −8.25%. 제휴랑 주가 인과로 안 묶음",
  "nvda-nvl72-710b": "NVL72 2027년 7100억·+214%. 랙 대수 +50%랑 가격을 따로 봄",
  "dell-trump-331": "2월 10일 최대 500만 달러 사놓고 +331%면 개인 베팅 이야기. 종가 535는 테이프",
  "treasury-buyback-6b": "장기 바이백 60억으로 세 배. 근데 10년 4.83%면 규모랑 금리 반응 분리",
  "unboxed-paint-70": "도장 −70%·사이클 10초 미만·면적 −40%. 사이버캡 무도장이랑 양산 대수 다름",
  "ship-42-massey": "매시의 42호기 두 번째 시험이라. 궤도 성공이랑 칸 나누자",
  "spcx-unlock-319m": "락업 3.19억 주(7%) 90일 창. SPCX 147.55 −3.86%를 소화로 단정 금지",
  "musk-mcap-348t": "합산 3.48조(SPCX 2.02·TSLA 1.45). 산술이지 지배력 확정은 아님",
  "spcx-closed-loop": "엑스 하루 3.5억·그록 비즈니스 30달러·4.7은 9월 12일권. 스타마인드는 27~28",
  "sp500-eps-367": "S&P EPS 2026년 367(+34%) vs 275. 연초 15% 뷰보다 두 배 이상",
  "starship-v4-140m": "V4 랩터 9기·약 140미터(+16m). 컴퓨팅 위성은 27/28/29 연도 칸",
  "starlink-hawker-faa": "호커 700/800/900 항공 스타링크. 1기가·100메가·20ms는 목표 성능",
  "dc-capex-316t": "2050년까지 미국 15.1조·내년 1~1.2조. 50~70%가 미국이라는데 누적이랑 연간 나눠",
  "g7-yields-2008": "G7 차입 2008 이후 최고권. 영국이 상단. 바이백이랑 한 문장 금지",
  "googl-finland-15b": "구글 핀란드 150억 이상. 풍력+94MW 배터리+22년 원전. 착공 전엔 공약",
  "googl-tesla-semi-tx": "세미 25대 휴스턴–댈러스. 파일럿이지 전국 물류 아님",
  "cybercab-cpm-specs": "폭 69인치·화면 22·47.6kWh·6.1mi/kWh·3113lbs. 스펙이랑 마일당 원가 분리",
  "fsd-ace-1439": "SW 2026.27.6 ACE에 감독 FSD 14.3.9. 개입률 전엔 기능=매출 아님",
  "austin-1000-cybercab": "오스틴 사이버캡 최대 1000대 준비. TSLA 368.81 +4.17%는 테이프, 등록 49랑 섞지 마",
  "optimus-5000-parts": "옵티머스 부품 5000대 발주. 출고 숫자 나오기 전엔 발주 칸만",
};

const WALL_C1 = [
  "발언이랑 출고 대수는 시계가 다름",
  "고속도로 현장은 허가 범위부터 확인",
  "기가헤르츠 창이 두 개라 표를 나눔",
  "오늘 +5가 주간 추세인지는 다음 집계",
  "2만~3만 가정 깨지면 30센트도 빈칸",
  "내슈빌 요금표 나오기 전엔 관망",
  "214%는 전망이라 출하 실측이 다음",
  "개인 매수 규모랑 종가 성과 분리하자",
  "PPI 10일·CPI 11일이 금리 게이트",
  "도장 공장이 실제로 줄었는지 면적부터",
  "두 번째 시험이면 실패 시나리오도 칸에",
  "90일 창이랑 180일 블록을 달력에",
  "합산 시총은 가중치 없는 산술임",
  "그록 4.7 날짜는 대략이라 확정 아님",
  "연초 15%랑 지금 34% 열을 유지",
  "140미터는 설계도, 비행은 별도",
  "FAA 기종 허가가 다음 확인",
  "내년 1조와 2050 누적을 한 셀 금지",
  "국가별 상단·하단을 범위로만",
  "22년 계약은 전력 칸, 캡엑스와 분리",
  "25대 운행 지표가 나와야 확장 논의",
  "전비 6.1이 사이클 평균인지부터",
  "버전 번호만으로 개입률 추정 금지",
  "1000대는 상한, 오늘 대수가 실측",
  "부품 발주서랑 조립 라인을 나누자",
];

const WALL_C2 = [
  "전력·허가가 빈칸이면 가정 가중치 낮춤",
  "세인트피터즈버그 방향은 지오펜스 힌트",
  "단말기 출하랑 스펙트럼은 다른 줄",
  "사이버캡 11.2%를 점유율로 읽지 마",
  "웨이모 CPM이랑 전제를 같이 적기",
  "LYFT 급락은 수급일 수도 있음",
  "랙 구성이 바뀌면 매출 산술도 바뀜",
  "500만 달러는 과거 이벤트 칸",
  "바이백 규모만으로 금리 하락 단정 금지",
  "무도장 차체와 도장 −70%는 다른 제품",
  "매시 시험 일정을 캘린더에만",
  "내부자 매도 공시가 있으면 옆에 둠",
  "티커별 유동성이 달라서 한 베팅 금지",
  "시트당 30달러는 기업 매출 힌트일 뿐",
  "가정치 리비전 나오면 표 새로",
  "컴퓨팅 위성 연도는 계획 가중치",
  "지연 20ms는 항공 링크 목표",
  "미국 50~70%는 범위지 확정 배분 아님",
  "영국 상단이 글로벌 금리의 전부 아님",
  "원전 절반 출력은 상한 표현",
  "구글·네보이아 역할 나워서 보기",
  "중량 3113파운드는 스펙 시트",
  "ACE랑 감독 모드를 같은 기능으로 안 봄",
  "NHTSA 범위와 시가 반응 분리",
  "5천대 부품이 몇 분기 분량인지부터",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T10SEP")) {
    if (c.includes("const T09SEP")) {
      c = c.replace(
        "const T09SEP = 1788908400000; // 2026.09.09 08:00 KST",
        "const T10SEP = 1788994800000; // 2026.09.10 08:00 KST\nconst T09SEP = 1788908400000; // 2026.09.09 08:00 KST",
      );
    } else {
      throw new Error("T09SEP not found in wallPosts.ts");
    }
    c = c.replace("export const LATEST_UPDATE = T09SEP;", "export const LATEST_UPDATE = T10SEP;");
  }
  if (c.includes("id: 121820")) {
    console.log("wall US 121820 already — skip");
    write("lib/wallPosts.ts", c);
    return;
  }
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "경제두배체크", "금캡이275", "스펙트럼천메가", "텍사스사삼칠", "골드만씨피엠",
    "내슈빌리프트", "엔브이엘칠일", "델삼삼일", "바이백육십억", "도장칠십컷",
    "사십이호기", "락업삼억", "시총삼조", "클로즈드루프", "이피에스삼육칠",
    "브이사백사십", "호커에프에이에이", "디씨캡엑스", "지세븐금리", "핀란드십오",
    "세미이십오", "캡스펙표", "에이스일사", "오스틴천대", "옵티머스오천",
  ];
  const posts = individuals.map((r, i) => {
    const id = 121820 + i;
    return [id, (r.tickers && r.tickers[0]) || "MACRO", nick[i] || `체크${i}`, "관심종목", WALL_CONTENT[r.slug] || r.title.slice(0, 80)];
  });
  const block =
    "  // ── 2026-09-10 신규 ────────────────\n" +
    posts
      .map(
        (p, i) =>
          `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T10SEP + ${8 + i * 8}*60_000, likes: ${22 - (i % 10)}, comments: 2 },`,
      )
      .join("\n") +
    "\n";
  c = c.replace("export const MOCK_POSTS: Post[] = [\n", `export const MOCK_POSTS: Post[] = [\n${block}`);

  let commBlock = "";
  posts.forEach((p, i) => {
    const id = p[0];
    commBlock += `  ${id}: [\n`;
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T10SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T10SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `  ],\n`;
  });
  c = c.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    `export const MOCK_COMMENTS: Record<number, Comment[]> = {\n${commBlock}`,
  );
  write("lib/wallPosts.ts", c);
  console.log(`wallPosts US: 121820~${121820 + posts.length - 1}`);
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
REPORTS.push(...require('./fix-reports-20260910-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260910 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260910-ko.js", ko);

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
    "scripts/fix-reports-20260910-ko-reports.js",
    "module.exports = " + JSON.stringify(reportsJson, null, 2) + ";\n",
  );
  console.log("fix-reports-20260910-ko.js / ko-reports.js written");
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
    "scripts/fix-reports-20260910-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260910-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260910 done (US)");
}

main();
