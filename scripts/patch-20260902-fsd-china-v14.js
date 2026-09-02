#!/usr/bin/env node
/** 9/2 누락: 중국 FSD(V14) 직원 내부 시험 · 상하이 기가 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const ROOT = path.join(__dirname, "..");

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}
function write(rel, c) {
  fs.writeFileSync(path.join(ROOT, rel), c);
}

const BODY = `■ 상세

최근 소셜 미디어에서는 중국 상하이 기가팩토리(Giga Shanghai)에서 테슬라 직원 거의 전원을 대상으로 FSD(완전자율주행) V14 내부 시험이 진행 중이라는 **미확인 보도**가 돌았습니다. 첨부 사진에는 상하이 사무실의 「GIGA SHANGHAI」 표지가 함께 올라왔습니다.

FSD V14는 기존 V13·유럽 롤아웃 버전과 **별개 소프트웨어 세대**로 읽힙니다. 오스틴 사이버캡 45대·지오펜스 확대(미국)와 **지역·규제·승인 경로가 다릅니다**. 중국은 완전자율주행 상용 허가가 엄격해, 「직원 대상 내부 시험」과 「소비자 출시」 사이 간격이 길 수 있습니다.

이 내용은 **공식 보도자료·규제 승인 공문이 아닌 제3자 전언(rumor)** 입니다. 직원 대상 베타는 실제로 자주 쓰이는 방식이지만, 규모·버전·시점은 회사 확인 전까지 **가설**로 두셔야 합니다. 중국 당국·현지 JV 파트너 승인 여부가 상용화보다 먼저입니다.

■ 왜 이 뉴스가 중요한가

1. **미국 로보택시(사이버캡 D-1)와 별개 축**입니다. 같은 FSD라도 중국 V14 내부 시험은 아시아 수요·데이터·승인 이야기입니다.

2. **상하이 기가는 중국 내수·수출의 허브**입니다. 직원 fleet 시험이 사실이라면 현지 도로·교통 규칙 데이터가 쌓일 수 있습니다.

3. **중국 FSD 승인은 TSLA 밸류에이션의 장기 변수**입니다. 미국 fleet 확대만으로는 중국 프리미엄을 대체하기 어렵습니다.

4. **미확인 보도**이므로 단기 주가는 「기대」에 민감하고, 확인 없이는 되돌림이 올 수 있습니다.

5. 9월 3일 오스틴 사이버캡 행사와 **같은 주**에 겹치면 「글로벌 자율주행」 내러티브가 강해질 수 있으나, **지역별 진실은 따로 검증**해야 합니다.

■ 시나리오

**A: 내부 시험이 확인되고 규제 논의가 시작되면 중장기 옵션 가치가 붙을 수 있습니다.**
**B: 루머만 돌고 공식 확인이 없으면 단기 테마로 끝날 수 있습니다.**
**C: 미·중 규제·지정학 변수로 승인이 지연되면 소프트웨어 진척과 상용 시점이 엇갈릴 수 있습니다.**

■ 오늘까지 흐름

9/2 미국 쪽은 사이버캡 45대·기가텍사스 반도체 면적이 부각됐고, **중국 쪽은 FSD V14 직원 내부 시험 루머**가 별도로 올라왔습니다. 같은 날짜라도 **스토리는 분리**해 기록하는 것이 맞습니다.

■ 장기 투자 관점

테슬라는 2019년 이후 중국 상하이 기가를 통해 현지 생산·판매를 키워 왔고, FSD는 지역별 규제 때문에 **미국과 출시 속도가 다릅니다**. 장기 투자자에게 중국 FSD는 「얼마나 빨리 팔리느냐」보다 **「언제 승인·출시 가능하냐」** 가 더 큰 질문입니다.

직원 대상 내부 시험은 상용화 직전 단계에서 흔히 나오는 신호일 수 있지만, 반복된 루머만으로는 분기 실적·마진에 바로 연결되지 않습니다. 5년 뷰에서는 중국 승인·현지 경쟁(BYD 등)·데이터 규제가 함께 봐야 합니다.

■ 앞으로 볼 것

(1) 테슬라·중국 규제 당국의 **공식 발표**가 있는지 확인하시기 바랍니다.

(2) FSD V14가 **어떤 기능 세트**인지(도심·고속·주차·무인 여부) 정의를 구분하시기 바랍니다.

(3) 상하이 기가 **직원 차량 등록·OTA 로그** 등 간접 지표가 나오는지 추적하시면 됩니다.

(4) 9월 3일 오스틴 행사에서 **중국 일정 언급**이 있는지 체크하시기 바랍니다.

(5) 미국 사이버캡 숫자와 **중국 내부 시험**을 같은 표에 넣지 말고 지역별로 나누시기 바랍니다.

■ 투자시사점

이번 소식은 **확인된 공시가 아니라 미확인 내부 시험 보도**입니다. 포지션을 키우기 전에 공식 확인·규제 문서를 우선하시기 바랍니다.

미국 로보택시 테마가 강한 날에도 중국 FSD는 **별도 추적 축**입니다. 한 줄 루머로 5년 뷰를 바꾸기보다 체크리스트에만 올려 두시면 됩니다.

단기 변동성(9/3 행사)과 중국 승인(분기~연 단위)은 시간 축이 다릅니다. 레버리지는 전자에, 기록은 후자에 맞추시면 됩니다.

investus.kr SRP 최고투자책임자 발행`;

const REPORT_BLOCK = `  { id: "seed-1460", title: '중국 상하이 기가에서 FSD V14 직원 대상 내부 시험이 진행 중이라는 미확인 보도가 나왔습니다', summary: '소셜 미디어 보도에 따르면 중국 상하이 기가팩토리에서 테슬라 직원 거의 전원을 대상으로 FSD(완전자율주행) V14 내부 시험이 진행 중이라는 전언이 돌았습니다. 공식 승인·공시는 아니며, 미국 오스틴 사이버캡 45대·9월 3일 행사와는 지역·규제 축이 다른 별개 이슈입니다.',
    body: \`${BODY.replace(/`/g, "\\`")}\`,
    titleEn: 'Unconfirmed report: FSD V14 internal employee testing at Giga Shanghai, China',
    summaryEn: 'Social posts allege near-company-wide FSD V14 internal testing at Giga Shanghai; not official approval—separate from US Cybercab 45 and Sept 3 Austin event.',
    bodyEn: "See Korean body.\\n\\ninvestus.kr SRP Chief Investment Officer",
    category: 'BREAKING', categoryColor: 'mint', subject: '테슬라',
    date: "2026.09.02", updatedAt: "2026.09.02 08:00",
    images: ["/charts/tsla-fsd-v14-china-internal-20260902.svg"],
    imagesEn: ["/charts/tsla-fsd-v14-china-internal-20260902-en.svg"],
  },
`;

function addTopic() {
  const p = "scripts/topics-20260902-data.js";
  let c = read(p);
  const needle = "add('cybercab-45-golden', 'L5', 'TSLA', {";
  if (c.includes("tsla-fsd-v14-china-internal")) {
    console.log("topics: fsd-china already present");
    return;
  }
  const insert = `add('tsla-fsd-v14-china-internal', 'L3', 'TSLA', {
  badge: 'TSLA', title: '중국 상하이 기가에서 FSD V14 직원 대상 내부 시험 미확인 보도가 나왔습니다',
  heroIcon: '🇨🇳', heroBig: 'FSD V14',
  heroSub: '직원 거의 전원 대상 내부 시험이라는 전언입니다. 공식 승인·공시가 아닌 미확인 보도이며, 미국 사이버캡과 지역·규제 축이 다릅니다.',
  cards: [
    { icon:'🏭', big:'상하이', mid:'기가팩토리', sub:'Giga Shanghai' },
    { icon:'👥', big:'직원', mid:'내부 시험', sub:'미확인 보도' },
    { icon:'📋', big:'V14', mid:'소프트웨어', sub:'미국과 별개' },
  ],
  quote: '중국 FSD 상용 승인은 미국 fleet 숫자와 별개입니다. 루머 단계에서는 공식 확인·규제 문서를 우선하시기 바랍니다.',
  noteSub: '미확인 보도입니다. 9/3 오스틴 사이버캡·중국 V14 시험은 같은 날짜라도 스토리를 분리해 추적하시기 바랍니다.',
  footer: 'TSLA · 중국 FSD V14',
}, {
  badge: 'TSLA', title: 'Unconfirmed: FSD V14 internal employee testing at Giga Shanghai',
  heroIcon: '🇨🇳', heroBig: 'FSD V14',
  heroSub: 'Alleged near-company-wide internal test—not official approval; separate from US Cybercab.',
  cards: [
    { icon:'🏭', big:'Shanghai', mid:'Giga', sub:'China hub' },
    { icon:'👥', big:'Staff', mid:'Internal', sub:'Unconfirmed' },
    { icon:'📋', big:'V14', mid:'Software', sub:'vs US fleet' },
  ],
  quote: 'China FSD approval is a separate regulatory track from Austin Cybercab counts.',
  noteSub: 'Treat as rumor until official confirmation. Track US and China autonomy on separate lines.',
  footer: 'TSLA · China FSD V14',
});

`;
  write(p, c.replace(needle, insert + needle));
  console.log("topics: added tsla-fsd-v14-china-internal");
}

function genSvg() {
  execSync("node scripts/gen-reports-20260902.js", { cwd: ROOT, stdio: "inherit" });
}

function patchReports() {
  let c = read("lib/reports.ts");
  if (c.includes("seed-1460")) {
    console.log("reports: seed-1460 already present");
    return;
  }
  c = c.replace(
    `  { id: "seed-1446", title: '테슬라 기가 텍사스`,
    REPORT_BLOCK + `  { id: "seed-1446", title: '테슬라 기가 텍사스`,
  );
  c = c.replace(
    `title: '2026년 9월 2일 한장 요약입니다. 기가텍사스 반도체 697만 SF·델·PANW 실적·사이버캡 45대·SpaceX 궤도연산·F14·Anthropic 350억 달러·Waymo 14개 도시를 모았습니다'`,
    `title: '2026년 9월 2일 한장 요약입니다. 기가텍사스 반도체·중국 FSD V14 내부시험(미확인)·델·PANW·사이버캡 45·SpaceX·F14·Anthropic·Waymo 14개 도시를 모았습니다'`,
  );
  c = c.replace(
    `첫째, 테슬라·텍사스입니다. 기가 텍사스 북캠퍼스`,
    `첫째, 테슬라·자율주행입니다. 중국 상하이 기가에서 FSD V14 직원 대상 내부 시험이 진행 중이라는 **미확인 보도**가 올라왔습니다(공식 승인 아님). 미국 쪽은 기가 텍사스 북캠퍼스`,
  );
  c = c.replace(
    `"seed-1446": ['TSLA'],`,
    `"seed-1460": ['TSLA'],\n  "seed-1446": ['TSLA'],`,
  );
  write("lib/reports.ts", c);
  console.log("reports: seed-1460 + summary tickers");
}

function patchWall() {
  let c = read("lib/wallPosts.ts");
  if (c.includes("id: 1194,")) {
    console.log("wallPosts: 1194 already present");
    return;
  }
  const post = `  { id: 1194, symbol: "TSLA", nickname: "익명_4855", holdingLabel: "관심종목",
    content: "상하이 기가에서 FSD V14 직원 내부 시험 루머… 미국 사이버캡이랑 완전 다른 축이네요. 공식 확인 전까진 조심",
    createdAt: T02SEP + 128*60_000, likes: 13, comments: 2 },
`;
  c = c.replace(
    "  // ── 2026-09-01 신규 ────────────────",
    post + "  // ── 2026-09-01 신규 ────────────────",
  );
  const comments = `  1194: [
    { id: 1, nickname: "익명_6194", holdingLabel: "관심종목", content: "중국 승인 일정이 더 중요하죠", createdAt: T02SEP + 128*60_000 + 3*60_000, likes: 4 },
    { id: 2, nickname: "익명_6294", holdingLabel: "관심종목", content: "V14랑 오스틴 45대는 따로 봐야겠어요", createdAt: T02SEP + 128*60_000 + 6*60_000, likes: 5 },
  ],
`;
  c = c.replace(
    "  // ── 2026-09-01 신규 댓글 ────────────────",
    comments + "  // ── 2026-09-01 신규 댓글 ────────────────",
  );
  write("lib/wallPosts.ts", c);
  console.log("wallPosts: 1194");
}

function patchAnalyst() {
  let c = read("lib/analystPosts.ts");
  const comments = `  [-991]: [
    { alias: "분당 매 #31", content: "미국 사이버캡이랑 중국 V14는 같은 FSD라도 스토리가 다르네요. 공식 확인 전까지는 루머로 분류하겠습니다.", created_at: "2026-09-02T01:12:00.000Z" },
    { alias: "역삼 판다 #77", content: "중국 규제 승인 일정이 나오면 그때 다시 보겠습니다.", created_at: "2026-09-02T01:18:00.000Z" },
  ],
`;
  if (!c.includes("id: -991,")) {
    const post = `  {
    id: -991, alias: "여의도 수리 #28", symbol: "TSLA",
    content: "중국 상하이 기가에서 FSD V14 직원 대상 내부 시험이 진행 중이라는 **미확인 보도**가 올라왔습니다. 공식 승인·공시는 아닙니다.\\n미국 오스틴 사이버캡 45대·9월 3일 행사와 지역·규제 축이 다릅니다. 중국 FSD 상용 승인은 별도 변수이므로 루머와 확인을 분리해 기록하시기 바랍니다.",
    likes: 17, comments: 2, created_at: "2026-09-02T01:05:00.000Z", liked: false,
  },
`;
    c = c.replace(
      "  // ── 2026-09-01 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────",
      post + "  // ── 2026-09-01 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────",
    );
    c = c.replace(
      `— Apple OpenAI 증거 파기 주장`,
      `— 중국 상하이 FSD V14 직원 내부 시험(미확인 보도)\\n— Apple OpenAI 증거 파기 주장`,
    );
  }
  if (!c.includes("[-991]:")) {
    c = c.replace("  // 2026-09-01", comments + "  // 2026-09-01");
  }
  write("lib/analystPosts.ts", c);
  console.log("analystPosts: -991");
}

addTopic();
genSvg();
patchReports();
patchWall();
patchAnalyst();
console.log("patch-20260902-fsd-china-v14: done");
