#!/usr/bin/env node
/** Insert 2026-09-17 US reports, analyst, wall. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260917-us");

const ROOT = path.join(__dirname, "..");
const DATE_DOT = "2026.09.17";
const UPDATED = "2026.09.17 08:20";
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";
const TAG = "20260917";

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
    const beforeId = "seed-1669";
    const idx = c.indexOf(`id: "${beforeId}"`);
    if (idx === -1) throw new Error(`${beforeId} not found`);
    const start = c.lastIndexOf("  {", idx);
    write("lib/reports.ts", c.slice(0, start) + block + c.slice(start));
    console.log(`reports.ts: inserted ${missing[0].id}~${missing[missing.length - 1].id}`);
  }

  c = read("lib/reports.ts");
  let tickAdded = 0;
  let tickSrc = c;
  for (const r of US) {
    if (tickSrc.includes(`"${r.id}": [`)) continue;
    const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
    const line = `  "${r.id}": [${t}],\n`;
    const after1712 = tickSrc.indexOf(`"seed-1712": ['RATES'],\n`);
    if (after1712 !== -1) {
      const insertAt = after1712 + `"seed-1712": ['RATES'],\n`.length;
      tickSrc = tickSrc.slice(0, insertAt) + line + tickSrc.slice(insertAt);
      tickAdded++;
      continue;
    }
    const mark = "  // 2026-09-16";
    const tIdx = tickSrc.indexOf(mark);
    if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-16 marker missing");
    tickSrc = tickSrc.slice(0, tIdx) + line + tickSrc.slice(tIdx);
    tickAdded++;
  }
  if (tickAdded) {
    write("lib/reports.ts", tickSrc);
    console.log(`REPORT_TICKERS: added ${tickAdded} rows`);
  } else if (c.includes("  // 2026-09-17\n")) {
    console.log("REPORT_TICKERS: 2026-09-17 already present");
  } else {
    let tick = "  // 2026-09-17\n";
    for (const r of US) {
      const t = (r.tickers || ["MACRO"]).map((x) => `'${x}'`).join(", ");
      tick += `  "${r.id}": [${t}],\n`;
    }
    const mark = "  // 2026-09-16";
    const tIdx = c.indexOf(mark);
    if (tIdx === -1) throw new Error("REPORT_TICKERS 2026-09-16 marker missing");
    write("lib/reports.ts", c.slice(0, tIdx) + tick + c.slice(tIdx));
    console.log("REPORT_TICKERS: inserted 2026-09-17");
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
  summary: [
    "만장일치 인상·스타십 시총 급등·모기지 8개월 하락은 각각 다른 이야기라 한 화면에 묶지 않겠습니다.",
    "9/22 스타십 14차 비행 성공 여부가 오늘 숫자 중 가장 먼저 갈립니다.",
  ],
  "fed-rate-hike-25bp": [
    "이번 인상은 시장이 91% 확률로 이미 예상했던 결과입니다.",
    "18명 중 16명이 예상한 연내 추가 인상 시점을 다음에 확인하겠습니다.",
  ],
  "cybercab-us-nationwide-expansion": [
    "팬 계정 집계라 회사 공식 차량 수와는 차이가 있습니다.",
    "목격 지역과 실제 서비스 개시 사이엔 시차가 있다는 점을 같이 봅니다.",
  ],
  "cybercab-australia-newzealand": [
    "전시 단계라 실제 서비스 일정과는 구분해서 보겠습니다.",
    "우핸들 국가라 별도 인증 절차가 필요할 수 있습니다.",
  ],
  "spacex-space-force-shotwell": [
    "자율권 확보와 실제 위성 배치 사이엔 시차가 있습니다.",
    "발언 수준이라 구체적 설계안 공개를 다음에 확인하겠습니다.",
  ],
  "tesla-norway-200k": [
    "노르웨이는 보조금 환경이 특수해 다른 나라와 비교해서 봐야 합니다.",
    "보조금이 더 줄어들 때 판매 속도가 유지되는지가 다음 관전 포인트입니다.",
  ],
  "tesla-solar-factory-houston": [
    "세제혜택 승인 단계라 실제 착공 시점은 아직 확정 전입니다.",
    "9,712개 일자리 이행 여부를 착공 이후 확인하겠습니다.",
  ],
  "raptor-engine-evolution": [
    "부품 감소가 실제 제작비용 절감으로 이어지는지 지켜보겠습니다.",
    "랩터3 양산 속도가 스타십 생산 속도를 가를 변수입니다.",
  ],
  "optimus-starlink-integration": [
    "통신 방식이 아직 검토 단계라 최종 확정안과는 다를 수 있습니다.",
    "실제 작동 시연 공개 시점을 다음에 확인하겠습니다.",
  ],
  "model-y-collision-survival": [
    "개인 사례라 통계적 안전성 지표와는 구분해서 보겠습니다.",
    "공식 충돌시험 성적과 함께 봐야 하는 사례입니다.",
  ],
  "tsla-357-price-tom-lee-rally": [
    "350달러 구간 이탈 여부가 다음 매매 신호로 꼽힙니다.",
    "톰 리 발언은 시장 전반 전망이라 개별 종목과는 구분해서 보겠습니다.",
  ],
  "fsd-spain-ron-baron": [
    "투자자 개인 평가라 정식 규제승인과는 별개 사안입니다.",
    "유럽 정식 서비스 승인 시점을 다음에 확인하겠습니다.",
  ],
  "starlink-collision-avoidance-qatar": [
    "회피 기동 증가는 궤도 혼잡도 증가와도 연결되는 지표입니다.",
    "항공사 채택 속도가 이 성장세를 계속 뒷받침하는지 보겠습니다.",
  ],
  "starship-flight14-market-reaction": [
    "9/22 실제 비행 성공 여부가 첫 시험대입니다.",
    "발사당 매출 시나리오는 이론적 계산이라 실제 계약과는 다릅니다.",
  ],
  "morgan-stanley-nvda-hbm-37pct": [
    "추산치라 실제 수요는 투자 계획에 따라 달라질 수 있습니다.",
    "구글·AMD 자체칩 수요 확대 속도를 다음에 확인하겠습니다.",
  ],
  "spacex-colossus-pollution-study": [
    "특정 기간·지점 조사라 시설 확장 이후도 계속 지켜봐야 합니다.",
    "위성데이터 기반 검증이라 신뢰도 있는 방법론으로 평가됩니다.",
  ],
  "taylor-foundry-ai5-chip-production": [
    "시제품 단계라 양산 시점은 수율에 따라 달라질 수 있습니다.",
    "어떤 차종에 먼저 탑재되는지를 다음에 확인하겠습니다.",
  ],
  "tesla-austin-robotaxi-power-infra": [
    "허가 서류가 추가정보 요청 단계라 착공 시점은 미확정입니다.",
    "사이버캡 배터리가 더 작아 실제 대수는 추정치보다 늘 수 있습니다.",
  ],
  "sk-hynix-intel-memory-talks": [
    "논의 단계라 구체 계약 내용은 아직 공개 전입니다.",
    "노사 재합의안 시행이 생산계획 추진에 주는 영향을 보겠습니다.",
  ],
  "hanmi-semiconductor-terafab-deal": [
    "테라팹 부지·규모가 미확정이라 매출 기여 시점도 불확실합니다.",
    "전공정 HPSP·후공정 한미반도체 계약이 같이 진행되는 점이 눈에 띕니다.",
  ],
  "novo-nordisk-anthropic-ai-partnership": [
    "제휴 발표 단계라 구체적 적용 질환은 아직 비공개입니다.",
    "개발기간 단축 효과가 실제로 확인되는 시점을 보겠습니다.",
  ],
  "tesla-accordion-supercharger": [
    "설치비용 20% 절감이 실제 확장속도에 반영되는지 보겠습니다.",
    "좁은 도심 부지 적용 사례가 늘어나는지도 같이 확인하겠습니다.",
  ],
  "uwm-mortgage-8month-losing-streak": [
    "8개월 연속 하락은 짧지 않은 흐름이라 구조적 둔화로 볼 수 있습니다.",
    "이번주 금리인상이 모기지금리에 미치는 영향을 다음에 확인하겠습니다.",
  ],
  "tesla-fsd-85pct-streak": [
    "한 이용자의 앱 화면이라 회사 공식 집계와는 다릅니다.",
    "비슷한 비율이 다른 이용자에게서도 반복되는지를 보겠습니다.",
  ],
  "tsla-spcx-merger-hint": [
    "발언 해석일 뿐이라 공시나 주총 안건이 나와야 사실이 됩니다.",
    "9월 22일 스타십 비행처럼 달력에 적힌 일정을 먼저 확인하겠습니다.",
  ],
};

function usAnalystComment(r, k) {
  const pair = ANALYST_COMMENTS[r.slug] || ANALYST_COMMENTS.summary;
  return pair[k];
}

function insertAnalystUs() {
  let c = read("lib/analystPosts.ts");
  const firstId = -1288;
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
      created_at: `2026-09-17T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z`,
      slug: r.slug,
    };
  });
  const missingPosts = posts.filter((p) => !c.includes(`id: ${p.id}`));
  if (missingPosts.length === 0) {
    console.log("analystPosts US already — skip");
  } else {
    const block =
      (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-17 신규 (24개 · 존댓말 · 구조 혼합) ──────────────────────\n") +
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
    const mark = "  // ── 2026-09-16 신규";
    const idx = c.indexOf(mark);
    if (idx === -1) throw new Error("analyst 2026-09-16 marker missing");
    write("lib/analystPosts.ts", c.slice(0, idx) + block + c.slice(idx));

    c = read("lib/analystPosts.ts");
    const comm =
      (c.includes("  // ── 2026-09-17 애널 댓글") ? "" : "  // ── 2026-09-17 애널 댓글 ──────────────────────\n") +
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
    const cmark = "  // ── 2026-09-16 애널 댓글";
    const cidx = c.indexOf(cmark);
    if (cidx === -1) throw new Error("analyst comments 2026-09-16 marker missing");
    write("lib/analystPosts.ts", c.slice(0, cidx) + comm + c.slice(cidx));
    console.log(`analystPosts US extra: ${missingPosts.map((p) => p.id).join(",")}`);
  }

  writeFixAnalyst(posts);
}

const WALL_CONTENT = {
  "fed-rate-hike-25bp": "연준 기준금리 0.25%p 인상 3.75~4%. 새의장 워시 첫회의서 12대0 만장일치",
  "cybercab-us-nationwide-expansion": "사이버캡 필라델피아·LA·노스리지·메릴랜드까지 목격 확산중",
  "cybercab-australia-newzealand": "사이버캡 호주·뉴질랜드 첫 전시. 짙은금빛 차체 그대로 노출",
  "spacex-space-force-shotwell": "우주군 22억불 위성망 설계자율권 스페이스X에. 숏웰 \"존재 안했어야\" 발언",
  "tesla-norway-200k": "테슬라 노르웨이 등록 20만대 돌파. 전기차 5대중 1대꼴",
  "tesla-solar-factory-houston": "테슬라 휴스턴 태양광공장 101억불 세제혜택 승인. 9712개 일자리",
  "raptor-engine-evolution": "랩터엔진 1→2→3세대로 오히려 부품 줄어듦. 추력은 더 세짐",
  "optimus-starlink-integration": "옵티머스 두뇌에 스타링크 통신망 스타마인드 이미 탑재됐다는 관측",
  "model-y-collision-survival": "모델Y 시속84마일 정면충돌서 생존. 다음차도 또 모델Y 선택",
  "tsla-357-price-tom-lee-rally": "테슬라 357불 거래중. 톰리 \"4분기 생애최대랠리\" 전망",
  "fsd-spain-ron-baron": "FSD 스페인서 2년간 46만km 검증. 론배런 \"믿기지않는다\" 극찬",
  "starlink-collision-avoidance-qatar": "스타링크 6개월간 20만7152회 충돌회피. 카타르항공 2500만명 연결",
  "starship-flight14-market-reaction": "스타십14차 9/22확정 소식에 스페이스X 시총 500억불 급등",
  "morgan-stanley-nvda-hbm-37pct": "모건스탠리 엔비디아 HBM수요 점유율 37.3% 추산. 구글36%·AMD12%",
  "spacex-colossus-pollution-study": "콜로서스1 데이터센터 주변 오염증가 없다는 멤피스대 연구결과",
  "taylor-foundry-ai5-chip-production": "테일러파운드리서 테슬라 AI5칩 시제품생산 시작. 양산은 연말~내년초",
  "tesla-austin-robotaxi-power-infra": "오스틴 로보택시기지에 하루 840대분 충전전력 설비중",
  "sk-hynix-intel-memory-talks": "SK하이닉스 인텔 오하이오공장 빌려 美메모리생산 검토중",
  "hanmi-semiconductor-terafab-deal": "한미반도체 테라팹 AI칩라인 패키징장비 공급계약 확보",
  "novo-nordisk-anthropic-ai-partnership": "노보노디스크 앤트로픽과 AI신약개발 제휴 발표",
  "tesla-accordion-supercharger": "테슬라 아코디언슈퍼차저 공장에서 미리접어 설치비 20%↓",
  "uwm-mortgage-8month-losing-streak": "美최대모기지사 UWM 8개월연속 하락. 역대최장 기록",
  "tesla-fsd-85pct-streak": "테슬라 FSD 통계 540마일 중 462마일(85%). 35일 연속 기록",
  "tsla-spcx-merger-hint": "머스크가 테슬라·스페이스X 협력 거론. 합병은 해석이고 공시는 없음",
};

const WALL_C1 = [
  "시장은 이미 91%확률로 예상했었음",
  "팬계정 집계라 회사 공식수치 아님",
  "전시단계, 실제서비스 일정은 아직임",
  "자율권 확보일뿐 설계안은 비공개",
  "보조금 줄어드는데도 속도 안죽음",
  "세제혜택 승인, 착공은 아직 안함",
  "부품줄어도 추력은 더 세짐",
  "통신방식 아직 검토단계라고",
  "개인사례라 통계안전성과는 구분",
  "350불 밑으로 가면 매도 커질수도",
  "정식승인과 투자자평가는 별개임",
  "궤도 혼잡도도 같이 늘어나는거임",
  "9/22 실제비행 성공여부가 관건",
  "추산치라 실제수요는 달라질수있음",
  "특정기간 조사라 계속 지켜봐야함",
  "시제품단계, 양산은 수율에 달림",
  "허가 아직 추가정보요청 단계임",
  "논의단계, 구체계약은 미공개",
  "부지·규모 미확정, 매출기여도 불확실",
  "제휴발표뿐, 적용질환은 비공개",
  "설치비 20%↓가 실제확장에 반영되는지",
  "8개월 연속이면 짧은흐름 아님",
  "개인화면이라 회사공식집계는 아님",
  "발언해석일뿐 공시나 주총은 아직",
];

const WALL_C2 = [
  "연내 추가인상 몇번 나오는지 봐야함",
  "목격지역과 실제서비스는 시차있음",
  "우핸들국가라 별도인증 필요할듯",
  "구체 위성설계 공개시점이 다음",
  "다른유럽시장 보조금인하때도 봐야함",
  "9712개 일자리 이행여부 확인할것",
  "랩터3 양산속도가 관전포인트",
  "실제 작동시연 공개시점 기다림",
  "공식충돌시험 성적표도 같이 봐야함",
  "톰리 발언은 종목과는 별개 얘기",
  "유럽 정식서비스 승인시점이 다음",
  "항공사 채택속도 계속되는지 봄",
  "발사당 매출은 이론적 계산일뿐",
  "구글·AMD 자체칩 확대속도 봄",
  "시설확장 이후도 계속 검증 필요",
  "어떤 차종에 먼저 탑재되는지 봄",
  "사이버캡은 배터리작아 대수 더 늘수도",
  "노사합의 시행이 생산계획에 주는영향",
  "전공정·후공정 한국업체 둘다 참여중",
  "개발기간 단축효과 확인이 다음",
  "좁은 도심부지 적용사례 늘어나는지",
  "이번주 금리인상 영향이 다음변수",
  "다른 이용자 화면에서도 반복되는지",
  "9/22 스타십이 확인가능한 일정임",
];

function insertWallUs() {
  let c = read("lib/wallPosts.ts");
  if (!c.includes("const T17SEP")) {
    c = c.replace(
      "const T16SEP = 1789513200000; // 2026.09.16 08:00 KST",
      "const T17SEP = 1789599600000; // 2026.09.17 08:00 KST\nconst T16SEP = 1789513200000; // 2026.09.16 08:00 KST",
    );
    c = c.replace("export const LATEST_UPDATE = T16SEP;", "export const LATEST_UPDATE = T17SEP;");
  }
  const firstId = 121942;
  const individuals = US.filter((r) => !r.pinned);
  const nick = [
    "연준금리인상", "사이버캡확산", "사이버캡호주", "우주군계약", "노르웨이이십만",
    "태양광공장백일", "랩터엔진삼세대", "옵티머스스타링크", "모델와이생존", "테슬라삼오칠불",
    "에프에스디스페인", "스타링크충돌회피", "스타십십사차", "엔비디아에이치비엠", "콜로서스오염연구",
    "에이아이오칩", "오스틴전력설비", "하이닉스인텔", "한미반도체테라팹", "노보노디스크앤트로픽",
    "아코디언차저", "유더블유엠팔개월", "에프에스드팔십오", "합병힌트발언",
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
    (c.includes(`id: ${firstId}`) ? "" : "  // ── 2026-09-17 신규 ────────────────\n") +
    missing
      .map((p) => {
        const i = posts.findIndex((x) => x[0] === p[0]);
        return `  { id: ${p[0]}, symbol: ${JSON.stringify(p[1])}, nickname: ${JSON.stringify(p[2])}, holdingLabel: ${JSON.stringify(p[3])},\n    content: ${JSON.stringify(p[4])},\n    createdAt: T17SEP + ${8 + i * 8}*60_000, likes: ${24 - (i % 10)}, comments: 2 },`;
      })
      .join("\n") +
    "\n";
  if (c.includes(`id: ${firstId}`)) {
    const mark = "  // ── 2026-09-16 신규";
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
    commBlock += `    { id: ${id}1, nickname: ${JSON.stringify(posts[(i + 1) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C1[i])}, createdAt: T17SEP + ${(12 + i) * 60_000}, likes: 5 },\n`;
    commBlock += `    { id: ${id}2, nickname: ${JSON.stringify(posts[(i + 3) % posts.length][2])}, holdingLabel: "관심종목", content: ${JSON.stringify(WALL_C2[i])}, createdAt: T17SEP + ${(15 + i) * 60_000}, likes: 4 },\n`;
    commBlock += `  ],\n`;
  });
  if (c.includes("121963: [") && missing[0][0] !== firstId) {
    const needle = "    { id: 1219632, nickname: \"사이버캡호주\", holdingLabel: \"관심종목\", content: \"이번주 금리인상 영향이 다음변수\", createdAt: T17SEP + 2160000, likes: 4 },\n  ],\n";
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
    "scripts/fix-reports-20260917-ko-reports.js",
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
REPORTS.push(...require('./fix-reports-20260917-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260917 source loaded', REPORTS.length);
}
`;
  write("scripts/fix-reports-20260917-ko.js", ko);
  console.log("fix-reports-20260917-ko.js / ko-reports.js written");
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
    "scripts/fix-reports-20260917-ko-analyst.js",
    "module.exports = " + JSON.stringify(arr, null, 2) + ";\n",
  );
  console.log("fix-reports-20260917-ko-analyst.js written");
}

function main() {
  insertReportsTs();
  insertAnalystUs();
  insertWallUs();
  writeFixReports();
  console.log("apply-20260917 done (US)");
}

main();
