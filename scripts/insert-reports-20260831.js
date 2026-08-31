#!/usr/bin/env node
// 2026-08-31 Investus report insert — patches lib/*.ts BEFORE 2026-08-29 blocks
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TAG = '20260831';
const DATE = '2026.08.31';
const DATE_ISO = '2026-08-31';
const UPDATED = '2026.08.31 08:00';
const T31AU = 1788130800000;
const BODY_EN = 'See Korean body.\\n\\ninvestus.kr SRP Chief Investment Officer';
const BK = 'investus.kr SRP 최고투자책임자 발행';

const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const write = (f, c) => fs.writeFileSync(path.join(ROOT, f), c);
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

function patch(content, marker, insert, label) {
  if (!content.includes(marker)) throw new Error(`Marker not found (${label}): ${marker.slice(0, 60)}`);
  return content.replace(marker, insert + marker);
}

function body(sections) {
  return sections.join('\n\n') + '\n\n' + BK;
}

function makeBody(detail, why, scenario, flow, longTerm, forward, invest) {
  const parts = [`■ 상세\n\n${detail}`, `■ 왜 이 뉴스가 중요한가\n\n${why}`];
  if (scenario) parts.push(`■ 시나리오\n\n${scenario}`);
  parts.push(
    `■ 오늘까지 흐름\n\n${flow}`,
    `■ 장기 투자 관점\n\n${longTerm}`,
    `■ 앞으로 볼 것\n\n${forward}`,
    `■ 투자시사점\n\n${invest}`,
  );
  return body(parts);
}

function krBodyFn(lines) {
  return `\`${esc(body(lines))}\``;
}

function bodyText(r) {
  if (!r.bodyLines) return '""';
  const text = typeof r.bodyLines === 'string' ? r.bodyLines : body(r.bodyLines);
  return `\`${esc(text)}\``;
}

function reportObj(r) {
  const img = `/charts/${r.slug}-${TAG}.svg`;
  const imgEn = `/charts/${r.slug}-${TAG}-en.svg`;
  const pinned = r.pinned ? '\n    isPinned: true, imageOnly: true,' : '';
  const b = bodyText(r);
  return `  { id: "${r.id}", title: '${esc(r.title)}', summary: '${esc(r.summary)}',
    body: ${b},
    titleEn: '${esc(r.titleEn || r.title)}',
    summaryEn: '${esc(r.summaryEn || 'See Korean summary.')}',
    bodyEn: "${BODY_EN}",
    category: '${r.category}', categoryColor: '${r.color}', subject: '${esc(r.subject)}',
    date: "${DATE}", updatedAt: "${UPDATED}",
    images: ["${img}"],
    imagesEn: ["${imgEn}"],${pinned}
  }`;
}

function krReportObj(r) {
  const img = `/charts/${r.slug}-${TAG}.svg`;
  const imgEn = `/charts/${r.slug}-${TAG}-en.svg`;
  const pinned = r.pinned ? '\n    isPinned: true,' : '';
  return `  {
    id: "${r.id}",
    title: "${esc(r.title)}",
    summary: "${esc(r.summary)}",
    body: ${bodyText(r)},
    titleEn: "${esc(r.titleEn || r.title)}",
    summaryEn: "See Korean summary.",
    bodyEn: "${BODY_EN}",
    category: "${r.category}",
    categoryColor: "${r.color}",
    subject: "${esc(r.subject)}",
    date: "${DATE_ISO}",
    updatedAt: "${UPDATED}",${pinned}
    images: ["${img}"],
    imagesEn: ["${imgEn}"],
  }`;
}

// ── US reports seed-1416 … 1429 ─────────────────────────────────────────────

const US = [
  {
    id: 'seed-1416', slug: 'summary', pinned: true,
    category: '특집', color: 'mint', subject: '한장요약',
    title: '2026년 8월 31일 한장 요약입니다. 에이전트 메모리 24배·로마 망원경·NVDA 200억 달러 SPCX·사이버캡 9/3·SPY 저변동·터빈 2030 매진을 모았습니다',
    summary: '에이전트 메모리 수요가 2030년까지 24배 늘 수 있다는 전망과 HBM 2026~27년 품귀가 함께 거론됐습니다. 로마 우주 망원경이 10.15톤짜리 팔콘 헤비로 발사됐고, 엔비디아의 200억 달러 스페이스X 지분 논의가 부각됐습니다. 테슬라 사이버캡 전용 행사는 9월 3일 오스틴에서 열리며, SPY 주간 변동성은 2004년 12월 이후 최저 근처입니다. 풍력·터빈 수요는 2030년까지 매진 상태로 전해졌습니다.',
    titleEn: 'Daily snapshot August 31, 2026: agent memory 24x, Roman telescope, NVDA $20B SpaceX, Cybercab Sept 3, SPY low vol, turbines sold out',
    summaryEn: 'Agent memory demand may rise 24x by 2030 with HBM tight through 2026-27. Roman launched on Falcon Heavy, Nvidia-SpaceX stake talk resurfaced, Cybercab event is Sept 3 in Austin, SPY vol is near 2004 lows, and turbines are sold out through 2030.',
    bodyLines: null,
  },
  {
    id: 'seed-1417', slug: 'agent-memory-goldman',
    category: '섹터', color: 'purple', subject: '인공지능',
    title: '에이전트 메모리 수요가 2030년까지 약 24배 늘 수 있고 HBM은 2026~27년 품귀가 이어질 수 있다는 전망이 나왔습니다',
    summary: '인공지능 에이전트 확산을 가정하면 메모리 수요가 2030년까지 약 24배 늘 수 있다는 장기 전망이 제시됐습니다. 고대역폭 메모리(HBM)는 2026~27년 품귀가 이어질 수 있고, 에이전트 한 번 호출에 토큰 사용량이 5~30배 늘 수 있습니다.',
    tickers: ['AI', 'NVDA', 'MU'],
    bodyLines: makeBody(
      '에이전트는 사용자 질문에 한 번 답하는 챗봇과 다릅니다. 검색·계산·코딩·API 호출을 연속으로 수행하는 프로그램에 가깝습니다. 그래서 같은 사용자 수라도 GPU뿐 아니라 메모리에 오가는 데이터량이 크게 늘어납니다.\n\n장기 전망에서는 2030년까지 에이전트 관련 메모리 수요가 약 24배 늘 수 있다는 추정이 나왔습니다. 고대역폭 메모리(HBM)는 AI 가속기 옆에 붙어 데이터를 빠르게 주고받는 칩으로, 2026~27년까지 품귀가 이어질 수 있다는 전망도 함께 제시됐습니다. 에이전트 한 번 실행에 쓰이는 토큰(텍스트 조각)은 5~30배까지 늘 수 있다는 점도 핵심입니다.',
      '1. AI 투자 논의가 「GPU 몇 장」에서 「메모리 몇 기가바이트」로 옮겨가고 있습니다. 수요를 칩 단위가 아니라 데이터 트래픽 단위로 읽어야 합니다.\n\n2. HBM 품귀는 메모리 업체의 가격·제품 Mix에 직접 연결됩니다. 범용 DRAM과 달리 고객 맞춤형 물량이 많아 가격 협상력이 다릅니다.\n\n3. 에이전트 상용화가 늘면 추론(inference) 수요가 학습(training) 수요와 분리됩니다. 추론은 24시간 돌아가므로 메모리 대역폭이 병목이 되기 쉽습니다.\n\n4. 24배 전망은 가정에 민감합니다. 그러나 방향성은 분명합니다. AI 워크로드가 길어질수록 메모리 wall이 커집니다.\n\n5. 국내 SK하이닉스·삼성전자 실적에도 같은 논리가 적용됩니다. HBM mix가 올라가는 분기부터 실적 가시성이 달라집니다.',
      '**A: 에이전트 출시가 예상보다 빠르면 2026~27 HBM 품귀가 더 길어질 수 있습니다.**\n**B: 모델 효율 개선으로 토큰 사용이 줄면 24배 전망은 하향 조정될 수 있습니다.**\n**C: 클라우드 업체가 자체 메모리 아키텍처를 쓰면 공급자 mix가 바뀔 수 있습니다.**',
      '이번 주 국내외에서 에이전트·HBM 테마가 SK하이닉스 주가와 엇갈리며 부각됐습니다. 장기 수요 전망은 강하지만 단기에는 외국인 매도와 지수 조정이 먼저 반영됐습니다.',
      '메모리 산업은 2016~18년 범용 DRAM 호황 뒤 2019~20년 급락을 겪었습니다. 이번 사이클은 AI·HBM·고객 맞춤형 비중이 커져 과거와 다른 구조입니다. 2030년까지 tight supply 전망이 맞다면, 단기 주가 조정은 장기 공급자에게 유리한 진입 구간으로 기록될 수 있습니다. 다만 capex 과잉이 다시 나오면 2028년 이후 전망은 바뀔 수 있습니다.',
      '(1) 분기 HBM 출하량과 ASP (2) 주요 CSP의 에이전트 상용 일정 (3) OpenAI·Google·Meta의 inference capex (4) SK하이닉스·마이크론·삼성 HBM roadmap (5) 2026~27 supply gap 추정치 변화',
      '에이전트 메모리는 「테마」가 아니라 「용량 계획」 문제입니다. 투자 시에는 GPU 발표 수치와 HBM attach rate를 같은 표에 두시기 바랍니다. 장기 투자자라면 2026~27 품귀가 실적 Mix로 전환되는 분기를 기준점으로 삼으시면 됩니다.',
    ),
  },
  {
    id: 'seed-1418', slug: 'roman-space-telescope',
    category: 'BREAKING', color: 'purple', subject: '스페이스X',
    title: '로마 우주 망원경이 10.15톤짜리 팔콘 헤비 13번째 비행으로 발사됐습니다',
    summary: '8월 30일 오전 7시 26분(동부) 팔콘 헤비 13번째 비행으로 10.15톤급 로마 망원경이 지구 2차 궤도(L2) 향해 올라갔습니다. 과학 임무용 대형 광학 위성이 상업 재사용 로켓으로 발사된 사례입니다.',
    tickers: ['SPCX'],
    bodyLines: makeBody(
      '로마(Roman) 우주 망원경은 암흑물질·외계행성 탐색 등을 위한 NASA 과학 임무입니다. 8월 30일 오전 7시 26분(동부) 텍사스에서 팔콘 헤비 13번째 비행(FH13)으로 발사됐고, 화물 중량은 10.15톤입니다. 목표는 지구에서 약 150만 km 떨어진 지구 2차 궤도(L2)로, 허블급 2.4m 주 거울을 실었습니다.\n\nL2는 태양·지구 중력이 맞서 관측에 유리한 위치입니다. 대형 과학 위성이 재사용 로켓으로 올라가면 발사 비용·일정 협상 구조가 달라집니다.',
      '1. 헤비급 대형 화물 실적은 정부·과학 계약 협상에 영향을 줍니다. 신뢰성 숫자는 상업 발사 cadence와 같이 쌓입니다.\n\n2. 같은 주 AI·우주·위성 뉴스가 겹치며 「우주 경제」 내러티브가 다시 부각됐습니다.\n\n3. 과학 임무는 직접 매출보다 브랜드·기술 신뢰성에 기여합니다.\n\n4. L2 전개·개막 일정이 다음 가시적 마일스톤입니다.\n\n5. 대형 위성 AI 페이로드(2027 Q4) 일정과 같은 생태계 안에서 읽힙니다.',
      '**A: L2 도달·개막이 예정대로면 우주 과학+cadence 신뢰 동시 강화**\n**B: 전개 지연 시 과학 일정만 미뤄지고 상업 cadence와 분리**\n**C: 대형 과학 발사 증가 시 헤비급 수요 재평가**',
      'FH13은 8월 30일 발사됐고, 같은 주 스타베이스 수자원·AI 위성·NVDA-SPCX 지분 논의가 겹쳤습니다.',
      '스페이스X는 2010년대 Falcon 9 재사용으로 발사 비용 구조를 바꿨습니다. 2020년대에는 Starship·헤비·위성 인터넷으로 「운송+인프라」로 확장 중입니다. 과학 위성 성공은 장기적으로 상업·정부 고객에게 같은 로켓을 파는 신뢰 자료가 됩니다.',
      '(1) L2 도달 확인 (2) 첫 light 일정 (3) FH cadence (4) NASA·ESA 후속 계약 (5) AI 위성 Q4 2027 로드맵',
      '비상장 SPCX를 직접 살 수 없는 투자자는 cadence·대형 화물 실적·위성 서비스 일정을 간접 지표로 쓰시면 됩니다. Roman은 단기 earnings가 아니라 5년 execution track record에 더 가깝습니다.',
    ),
  },
  {
    id: 'seed-1419', slug: 'nvda-spacex-stake',
    category: '종목분석', color: 'blue', subject: '엔비디아',
    title: '엔비디아가 스페이스X 지분 200억 달러 규모로 매수할 가능성이 예측시장에서 크게 올랐습니다',
    summary: '8월 29일 기준 예측시장에서 엔비디아의 200억 달러 스페이스X 지분 매수 확률이 급등했습니다. AI 칩과 위성·발사 인프라 연결 시나리오가 다시 거론됐습니다.',
    tickers: ['NVDA', 'SPCX'],
    bodyLines: makeBody(
      '200억 달러 규모 스페이스X 지분 매수는 아직 공식 확인된 거래가 아닙니다. 8월 29일 예측시장에서 확률이 크게 올랐고, 시장은 AI 데이터센터와 저궤도 위성망을 연결하는 시나리오에 더 많은 관심을 두고 있습니다.\n\n궤도 AI 위성은 지상망이 약한 구간에서 추론을 돌릴 수 있습니다. 엔비디아 칩 탑재 위성 서비스 2027 Q4 목표와 맞물립니다.',
      '1. NVDA 투자 논의가 칩 판매를 넘어 compute placement로 확장됩니다.\n\n2. 비상장 지분 거래는 공시·규제·실행 리스크가 큽니다.\n\n3. 예측시장 확률은 확정이 아니라 관심 온도계입니다.\n\n4. SPCX valuation과 NVDA cash·buyback 정책이 함께 봐야 합니다.\n\n5. 위성 AI가 상용화되면 TAM story가 hardware에서 service로 이동합니다.',
      '**A: 공식 발표 시 NVDA+space basket 재평가**\n**B: 무발표 시 단기 기대만 정리**\n**C: 부분 partnership(칩 공급)만 확인될 수도**',
      'Roman 발사·AI 위성 Q4 2027·Kalshi odds 급등이 같은 주에 나왔습니다.',
      '엔비디아는 PC GPU에서 data center AI로 10년간 TAM을 확장해 왔습니다. 다음 5년은 「지상 data center」에서 「지상+궤도」로 story가 넓어질 수 있는지가 관심사입니다. stake가 real이면 vertical integration, 아니면 supply deal 수준으로도 의미 있습니다.',
      '(1) 공식 발표 (2) 2027 Q4 AI satellite launch count (3) NVDA capex·M&A commentary (4) SPCX funding round rumors (5) regulatory review',
      'NVDA 주가에 직접 반영되기 전까지는 odds 변화만으로 포지션을 키우기보다, confirmed deal vs chip supply contract를 구분해 추적하시기 바랍니다.',
    ),
  },
  {
    id: 'seed-1420', slug: 'starbase-water-rights',
    category: '종목분석', color: 'purple', subject: '스페이스X',
    title: '스타베이스 인근 444에이커 수자원 권리가 최대 2억 2,000만 달러에 거래될 수 있다고 전해졌습니다',
    summary: '텍사스 스타베이스 주변 444에이커(약 180만㎡) 수자원 권리가 최대 2억 2,000만 달러 규모로 거래될 수 있다고 전해졌습니다. 대형 로켓 시험·발사 cadence 확대의 선행 투자로 읽힙니다.',
    tickers: ['SPCX'],
    bodyLines: makeBody(
      '스타베이스는 텍사스 남부의 스페이스X 발사·시험 허브입니다. 444에이커 수자원 권리가 최대 2억 2,000만 달러에 거래될 수 있다는 보도는, 발사 빈도를 늘리기 위한 토지·상하수 인프라 확보의 일환으로 해석됩니다.\n\n대형 로켓 시험은 소음·소화수·냉각수 수요가 큽니다. cadence 경쟁은 로켓 성능만이 아니라 현장 인프라도 포함합니다.',
      '1. 발사 cadence는 물리적 인프라 한계를 먼저 맞습니다.\n\n2. 토지·수자원 deal은 capacity expansion leading indicator입니다.\n\n3. 지역 환경·규제가 장기 bottleneck이 될 수 있습니다.\n\n4. capex가 늘면 free cash flow narrative와 trade-off입니다.\n\n5. Starbase와 Louisiana campus가 같은 infra race입니다.',
      '**A: deal close → cadence target 상향 기대**\n**B: 환경 litigation → 일정 지연**\n**C: infra spend만 늘고 발사는 flat**',
      '루이지애나 지반 조사·Roman 발사·수자원 deal이 같은 주 infra theme로 묶였습니다.',
      '항공·우주 산업은 1960년대 이후 「few launches」에서 2020년대 「rapid reuse」로 이동 중입니다. infra 선행 투자는 5년 뷰에서 cadence monetization의 전제입니다.',
      '(1) deal closing (2) launch license (3) monthly launch count (4) environmental filings (5) capex guide',
      'SPCX 간접 투자자는 발사 횟수와 infra capex를 같은 dashboard에 두시기 바랍니다.',
    ),
  },
  {
    id: 'seed-1421', slug: 'spcx-ai-satellites',
    category: '종목분석', color: 'purple', subject: '스페이스X',
    title: '2027년 4분기부터 엔비디아 칩 탑재 AI 위성 서비스가 시작될 수 있다는 일정이 거론됐습니다',
    summary: '엔비디아 칩을 탑재한 AI 위성 서비스가 2027년 4분기 시작될 수 있다는 일정이 거론됐습니다. 궤도 추론은 지상망이 약한 구간의 데이터 처리를 가능하게 합니다.',
    tickers: ['SPCX', 'NVDA'],
    bodyLines: makeBody(
      'AI 위성은 센서·이미지 데이터를 궤도에서 바로 분석합니다. 2027 Q4 엔비디아 칩 탑재 서비스 일정은 상용화 timeline이 분기 단위로 내려온 사례입니다.\n\n해상·군·재난·농업 등 지연에 민감한 use case가 초기 수요입니다.',
      '1. 일정 구체화는 execution risk 감소에 기여합니다.\n\n2. NVDA는 chip seller에서 space compute participant로 story 확장.\n\n3. 서비스 revenue model(구독 vs capacity)이 valuation key.\n\n4. regulation·spectrum·export control 변수.\n\n5. ground AI capex와 substitute/compete 관계.',
      '**A: on-time launch → space-AI revenue line visible**\n**B: delay → narrative only**\n**C: hybrid ground-orbit split architecture**',
      'NVDA stake odds·Roman·AI satellite timeline이 같은 ecosystem news flow입니다.',
      '위성 인터넷이 connectivity에서 compute로 확장하는 그림은 10년 story입니다. 2027 Q4는 첫 commercial proof point 후보입니다.',
      '(1) first launch manifest (2) pricing (3) latency SLA (4) export licenses (5) customer LOIs',
      '칩주·발사사·서비스 operator 중 어디에 margin이 남는지 추적하시기 바랍니다.',
    ),
  },
  {
    id: 'seed-1422', slug: 'elon-solar-turbine',
    category: '종목분석', color: 'mint', subject: '테슬라',
    title: '연간 100기가와트급 태양광과 스페이스X·테슬라의 사내 풍력 터빈 주조 계획이 거론됐습니다',
    summary: '연간 100GW 태양광 목표와 스페이스X·테슬라의 in-house 풍력 터빈 주조 계획이 함께 거론됐습니다. AI·EV·로켓 전력 수요가 발전 장비 vertical integration으로 이어지는 그림입니다.',
    tickers: ['TSLA', 'SPCX'],
    bodyLines: makeBody(
      '100GW/yr solar는 국가 단위 설치량을 넘는 목표입니다. 터빈 in-house casting는 공급 지연·가격 변동을 줄이려는 수직 통합입니다.\n\nAI data center·Megafactory·Starbase 모두 24/7 전력이 필요합니다.',
      '1. power bottleneck이 chip bottleneck만큼 중요해짐.\n\n2. energy equipment OEM과 customer 경계 blur.\n\n3. 100GW announcement vs actual install gap 주의.\n\n4. grid interconnect still external bottleneck.\n\n5. Tesla Energy narrative reinforcement.',
      '**A: factory announcements → equipment orders visible**\n**B: regulatory delay → solar/turbine story only**\n**C: third-party suppliers still win share**',
      '터빈 2030 sold out·AI 15GW delay·100GW solar가 same power theme.',
      '테슬라는 2010년 EV, 2020년 AI/robotaxi, 2020년대 후반 energy infra로 story arc 확장 중입니다. energy가 real이면 TAM multiple expansion입니다.',
      '(1) factory site (2) turbine casting capex (3) solar cell capacity (4) utility interconnect queue (5) Tesla Energy revenue',
      'TSLA 투자 시 automotive margin만이 아니라 generation equipment optionality를 메모에 포함하시기 바랍니다.',
    ),
  },
  {
    id: 'seed-1423', slug: 'elon-ai-power-bottleneck',
    category: '섹터', color: 'purple', subject: '인공지능',
    title: '약 15기가와트 AI 연산 설비가 2027년까지 전력·변압기·배선·냉각 문제로 가동하지 못할 수 있다는 전망이 나왔습니다',
    summary: '약 15GW AI compute가 transformer·wiring·cooling 병목으로 2027까지 power-on 못할 수 있다는 전망이 나왔습니다. AI 경쟁은 silicon에서 grid infra로 이동하고 있습니다.',
    tickers: ['AI', 'NVDA'],
    bodyLines: makeBody(
      'GPU/HBM order는 front-end news, power-on은 back-end reality입니다. 15GW는 대형 발전단지 여러 개 규모입니다.\n\n변압기 lead time 2~3년, cooling·water permit, utility interconnection이 병목입니다.',
      '1. hyperscaler earnings에서 power delay language 주목.\n\n2. grid equipment makers new alpha pocket.\n\n3. data center without power is stranded capex.\n\n4. regional disparity (Texas vs Virginia vs Europe).\n\n5. nuclear·gas·renewable mix debate intensifies.',
      '**A: infra catches up → delayed GPU revenue recognized later**\n**B: persistent delay → order cut rumors**\n**C: onsite generation (solar/gas) accelerates**',
      '100GW solar·turbine sold out·15GW delay가 same week power stack narrative.',
      '2010s cloud build-out도 처음엔 chip, 나중엔 power가 issue였습니다. AI는 scale가 더 커서 infra cycle이 더 길 수 있습니다.',
      '(1) utility interconnection queue (2) transformer lead times (3) hyperscaler power-on dates (4) EPC backlog (5) on-site generation projects',
      'NVDA multiples에 implicit하는 data center build 가정이 power reality check를 받는 구간입니다. infra names를 pair trade로 보시기 바랍니다.',
    ),
  },
  {
    id: 'seed-1424', slug: 'arkk-tsla-spcx-flow',
    category: '매크로', color: 'red', subject: '금리',
    title: 'ARKK·테슬라·스페이스X 관련 ETF 자금 흐름이 같은 주에 크게 움직였습니다',
    summary: 'ARKK 약 6억 달러, 테슬라 약 3.91억 달러 규모 관련 ETF 자금 흐름이 부각됐습니다. 혁신·로bo택시·우주 테마가 one basket으로 trade되는지 확인할 구간입니다.',
    tickers: ['MACRO', 'TSLA', 'SPCX'],
    bodyLines: makeBody(
      'ETF flow는 개별 headline보다 theme-level risk appetite를 보여 줍니다. ARKK ~$600M, TSLA ~$391M move는 innovation sleeve repositioning signal일 수 있습니다.\n\nSPCX는 pre-IPO proxy로 ETF·private fund·theme names에 capital이 연결됩니다.',
      '1. passive inflow는 reversal 시 volatility amplify.\n\n2. Cybercab Sept 3가 TSLA flow catalyst.\n\n3. space theme correlates with ARKK on risk-on days.\n\n4. rate shocks hit both via duration.\n\n5. flow ≠ fundamental confirmation.',
      '**A: inflows continue into Cybercab → momentum**\n**B: outflows on hawkish data → correlation sell**\n**C: divergence (TSLA up, ARKK flat) → stock-specific**',
      'SPY low vol week에 theme ETF flow는 diverge할 수 있습니다.',
      '2020년 ARK inflow era와 2022 outflow era를 거치며 ETF flow가 growth valuation에 feedback loop를 만든 history가 있습니다. 2026에는 AI+autonomy+space가 new bundle입니다.',
      '(1) ARKK daily flow (2) TSLA options skew (3) space ETF creations (4) Sept 3 event (5) 2Y yield',
      'single-stock vs basket exposure를 flow dashboard로 정리하시기 바랍니다.',
    ),
  },
  {
    id: 'seed-1425', slug: 'tsla-cybercab-sept3',
    category: 'BREAKING', color: 'mint', subject: '테슬라',
    title: '운전석·페달 없는 사이버캡 전용 행사가 9월 3일 텍사스 오스틴에서 열립니다',
    summary: '사이버캡 전용 행사가 9월 3일 오스틴에서 열립니다. 차량 목표가 3만 달러, 운행비 마일당 0.20달러. 무인 전용 로보택시가 calendar event가 됐습니다.',
    tickers: ['TSLA'],
    bodyLines: makeBody(
      'Cybercab는 steering wheel·pedal 없는 purpose-built robotaxi입니다. Sept 3 Austin event는 vehicle reveal·geofence·regulatory path·unit economics($30K, $0.20/mi)를 동시에 확인할 자리입니다.\n\nModel Y retrofit과 다릅니다.',
      '1. date fix는 execution risk down on 5Y view.\n\n2. $0.20/mile은 ride-hail cost benchmark.\n\n3. permit scope determines scalability.\n\n4. production timing vs event hype gap.\n\n5. TSLA options vol into Sept 3.',
      '**A: live unmanned demo → re-rate**\n**B: prototype only → sell the news**\n**C: delay → narrative reset**',
      'Cybercab geofence expansion·Sept 3 date·Robotaxi Thursday rumor same theme week.',
      '로bo택시 narrative는 2016 «Full Self-Driving soon»에서 2026 «dated event»로 evolved. history상 calendar+vehicle+price overlap은 milestone입니다.',
      '(1) unmanned footage (2) geofence map (3) production timeline (4) regulatory filings (5) $0.20/mile assumptions',
      'event trade vs 5Y autonomy option: 행사 전후 48h vol 확대 가능. long-term holder는 permit·miles driven data에 focus하시기 바랍니다.',
    ),
  },
  {
    id: 'seed-1426', slug: 'spy-low-volatility',
    category: '매크로', color: 'red', subject: '연준',
    title: 'SPY 주간 변동성이 2004년 12월 이후 최저 근처이며 8월 28일 769.35달러(-0.23%)로 마감했습니다',
    summary: 'SPY weekly vol이 Dec 2004 이후 최저 근처입니다. close $769.35, -0.23% on Aug 28. quiet surface 아래 Sept hike odds 57.5%가 남아 있습니다.',
    tickers: ['MACRO'],
    bodyLines: makeBody(
      'Low vol ≠ low risk. SPY $769.35, -0.23% on Aug 28 after Jackson Hole. Sept hike odds ~57.5%, jobs Sept 4, FOMC Sept 15-16 ahead.\n\nComplacency in vol often precedes macro data shocks.',
      '1. VIX·skew can rise before SPY moves.\n\n2. 2Y yield leads equity vol.\n\n3. low weekly vol can mean crowded positioning.\n\n4. Sept seasonality mixed.\n\n5. Mag7 event week adds idiosyncratic vol.',
      '**A: soft jobs → vol crush continues**\n**B: hot CPI → vol spike**\n**C: hawkish FOMC → correlation sell**',
      'Jackson Hole hawkish → front-end rates up → SPY still quiet into week-end.',
      '2004 low-vol periods preceded 2005 tightening cycle volatility. rate path uncertainty eventually shows in vol, often on data days.',
      '(1) VIX (2) SPY implied vol (3) Sept 4 jobs (4) Sept CPI (5) FOMC statement',
      'index level만 보면 calm; options·2Y· hike odds를 same screen에 두시기 바랍니다.',
    ),
  },
  {
    id: 'seed-1427', slug: 'big-tech-week',
    category: '매크로', color: 'blue', subject: '연준',
    title: '이번 주 빅테크는 애플 최고운영책임자(CEO) 후보 논의와 테슬라 로보택시 목요일 일정이 겹칩니다',
    summary: 'Apple COO succession rumor와 Tesla robotaxi Thursday schedule가 same week. Mag7 idiosyncratic vol 가능성이 큽니다.',
    tickers: ['MACRO', 'TSLA'],
    bodyLines: makeBody(
      'Apple COO는 product execution·supply chain 핵심 role입니다. Tesla Thursday robotaxi schedule는 autonomy re-test. Mag7 correlation rises on leadership+autonomy headlines.\n\nCalendar-driven vol week for tech.',
      '1. COO news hits supply chain confidence.\n\n2. robotaxi date hits TSLA beta.\n\n3. sector ETFs move on largest weights.\n\n4. event vol ≠ earnings vol.\n\n5. hedge cost rises into dated events.',
      '**A: orderly COO plan + robotaxi demo → sector bid**\n**B: surprise negative → Mag7 drawdown**\n**C: stock-specific divergence increases**',
      'Cybercab Sept 3 adjacent to Thursday robotaxi mention; Apple rumor parallel.',
      'Mag7 leadership transitions (Jobs→Cook era etc.) show ops leadership matters for multi-year execution premium. autonomy is similar ops+software bet.',
      '(1) Apple leadership statements (2) Tesla Thursday schedule detail (3) QQQ implied vol (4) Mag7 breadth (5) Sept 3 overlap',
      'index hedge vs single-name event: week of dated catalysts favors defined-risk structures.',
    ),
  },
  {
    id: 'seed-1428', slug: 'hobby-spending-ath',
    category: '매크로', color: 'orange', subject: '연준',
    title: '미국 취미·여가 소비가 재화 지출 가운데 5%를 넘어 사상 최고 수준에 도달했다는 데이터가 나왔습니다',
    summary: '미국 취미·여가 소비가 재화 지출 가운데 5%를 넘어 사상 최고 수준에 도달했다는 데이터가 나왔습니다. 금리가 높은 환경에서도 체험·취미 지출이 일부 카테고리에서 견조하다는 신호로 읽힙니다.',
    tickers: ['MACRO'],
    bodyLines: makeBody(
      '5% hobby share of goods spending is record. contradicts simple «high rates kill discretionary» story. outdoor, gaming, collectibles, leisure gear benefit scattered.\n\npost-pandemic experience preference persists.',
      '1. consumer slowdown is uneven across categories.\n\n2. hobby ATH coexists with macro caution.\n\n3. retail stock picking > sector ETF.\n\n4. wealth effect vs income effect mix.\n\n5. tariff/goods price noise in data.',
      '**A: soft landing → hobby stays strong**\n**B: labor weakness → hobby rolls over late**\n**C: inflation re-accel → goods mix shifts**',
      'same week as hawkish Fed talk yet micro consumer resilience datapoint.',
      '2008 이후 low-rate era boosted experiences; 2022-24 high-rate era did not kill hobby line—structural shift possible.',
      '(1) next retail sales split (2) leisure goods CPI (3) credit card spend by category (4) employment in leisure (5) holiday guide',
      'macro bear thesis에 micro hobby strength counterexample; stock level analysis 필요.',
    ),
  },
  {
    id: 'seed-1429', slug: 'turbines-sold-out',
    category: '종목분석', color: 'mint', subject: '테슬라',
    title: '풍력·에너지 터빈 수요가 2030년까지 매진 상태라는 전망이 나왔습니다',
    summary: '풍력·에너지 터빈 수요가 2030년까지 매진 상태라는 전망이 나왔습니다. 연간 100기가와트급 태양광·사내 터빈 주조 계획과 겹쳐 전력 인프라 투자가 한 묶음으로 읽힙니다.',
    tickers: ['TSLA', 'SPCX'],
    bodyLines: makeBody(
      'Sold out through 2030 implies price, lead time, vertical integration pressure. AI+EV+data center power pull simultaneously.\n\nTesla/SpaceX in-house casting tries to bypass OEM backlog.',
      '1. energy equipment supercycle narrative.\n\n2. OEM margins vs integrator capture.\n\n3. 2030 sold out = long lead indicator not quarterly EPS.\n\n4. grid still bottleneck beyond turbine.\n\n5. policy/tax credit sensitivity.',
      '**A: backlog converts → OEM rally**\n**B: in-house success → integrator captures margin**\n**C: demand slip → backlog unwind 2028+**',
      '100GW solar + turbine sold out + 15GW power delay = power stack week.',
      '2000s wind boom-bust repeated supply chain lesson; 2020s AI power may extend boom with different players (hyperscaler+integrator).',
      '(1) OEM order books (2) casting factory announcements (3) interconnection queue (4) PPA prices (5) policy credits',
      'energy infra를 TSLA/SPCX story의 second engine으로 track하시기 바랍니다.',
    ),
  },
];

// ── KR kr-seed-125 … 130 ────────────────────────────────────────────────────

const KR = [
  { id: 'kr-seed-125', slug: 'summary-kr', pinned: true, category: '특집', color: 'mint', subject: '한장요약',
    title: '2026년 8월 31일 한국장 한장 요약입니다. 코스피 6,788.88 -1.79%·외국인 8.3조·SemiCon Taiwan·FOMC·고용 9/4를 모았습니다',
    summary: '코스피 6,788.88(-1.79%), 외국인 순매도 약 8조 3,153억 원, SemiCon Taiwan 8/31 개막, FOMC 9/15-16, 9/4 고용, 9월 인상 57.5%. SK하이닉스 -4.45%, KB금융 +2.08%.',
    bodyLines: body(['■ 오늘의 큰 그림', '코스피 6788.88 -1.79%, 외국인 매도 우위, 금융주 상대 강세.', '■ 앞으로 볼 것', '(1) SemiCon Taiwan (2) 9/4 jobs (3) FOMC (4) foreign flow turn (5) 6800 reclaim', '■ 투자시사점', '환율·외국인·9월 hike odds 세 줄을 한 표에 두시기 바랍니다.']),
  },
  { id: 'kr-seed-126', slug: 'samsung-cxmt', category: '종목분석', color: 'blue', subject: '삼성전자',
    title: 'CXMT 실적 급증과 삼성전자 1조 5,000억 원 자사주 매입·-3.38% 조정이 같은 주에 부각됐습니다',
    summary: 'CXMT H1 +874% 보도, 삼성전자 1.5조 buyback, -3.38%. supply vs shareholder return collision.',
    bodyLines: makeBody('CXMT 중국 memory expansion vs Samsung 1.5T buyback.', '1. supply fear 2. buyback support 3. HBM mix key 4. export data 5. ASP path', '**A tight HBM** **B price war** **C mix shift**', 'Aug 28 foreign sell hit semis.', 'Memory cycles differ when custom HBM share rises.', '(1) monthly exports (2) ASP (3) buyback pace (4) CXMT capacity (5) HBM revenue share', 'Track mix not headline price.'),
  },
  { id: 'kr-seed-127', slug: 'skhynix-agent-memory', category: '종목분석', color: 'orange', subject: 'SK하이닉스',
    title: 'SK하이닉스 -4.45% 조정과 에이전트 메모리·HBM 2026~27 품귀 전망이 겹쳤습니다',
    summary: '-4.45% day move vs 24x agent memory / HBM tight 2026-27 outlook.',
    bodyLines: makeBody('Foreign sell -4.45% vs long HBM/agent demand.', '1. flows vs fundamentals 2. HBM mix 3. agent token growth 4. Indiana/Yongin capex 5. margin path', '**A flows reverse** **B HBM pricing up** **C capex overshoot**', 'Same week as US agent memory note.', 'Hynix HBM arc from 2023 shortage to 2027+ custom mix.', '(1) HBM revenue % (2) ASP (3) foreign flows (4) capex (5) customer guidance', 'Separate daily flow from HBM mix trajectory.'),
  },
  { id: 'kr-seed-128', slug: 'hyundai-cid', category: '종목분석', color: 'blue', subject: '현대차',
    title: '현대차 CID 업데이트 실망으로 3.73% 하락했습니다',
    summary: 'CID infotainment disappointment, -3.73%. software UX premium thesis tested.',
    bodyLines: makeBody('CID central display UX missed expectations.', '1. software as premium driver 2. OTA cadence 3. EV/SW revenue 4. competition 5. multiple impact', '**A fix in next OTA** **B repeated misses hurt premium** **C peer leapfrog**', 'Down more than index on software headline.', 'Auto valuation increasingly includes SW execution.', '(1) OTA notes (2) SW revenue (3) EV orders (4) China mix (5) margin guide', 'Watch SW roadmap delivery not just launches.'),
  },
  { id: 'kr-seed-129', slug: 'kb-financial', category: '종목분석', color: 'blue', subject: 'KB금융',
    title: 'KB금융 +2.08%로 하락장에서 금융주 강세를 이끌었습니다',
    summary: '+2.08% vs KOSPI -1.79%; Sept hike odds 57.5% help NIM hopes.',
    bodyLines: makeBody('KB +2.08% on rate hike hopes.', '1. NIM expansion 2. sector rotation 3. credit quality still matters 4. dividend 5. vs growth selloff', '**A rates up banks win** **B credit event** **C curve inversion hurt**', 'Financials outperformed semis same day.', 'Rate cycles often rotate into banks late in hike cycle.', '(1) NIM guide (2) loan growth (3) dividend (4) credit cost (5) FX', 'Pair KB with 2Y US yield monitor.'),
  },
  { id: 'kr-seed-130', slug: 'foreign-flow-kr', category: '시장분석', color: 'mint', subject: '수급',
    title: '이번 주 외국인 순매도가 약 8조 3,153억 원 수준으로 집계됐습니다',
    summary: 'Weekly foreign net sell ~8.3153T won; chip-heavy; FX-rate-flow divergence possible.',
    bodyLines: makeBody('Weekly foreign sell ~8.3T, concentrated large chips.', '1. weekly vs daily 2. ETF/hedge flows 3. FX linkage 4. sector split 5. turn timing', '**A buyback turn** **B more sell on US data** **C passive only**', 'Post-Jackson Hole repositioning.', 'Foreign ownership level still structurally important for KOSPI.', '(1) daily foreign (2) USD/KRW (3) Sept odds (4) top10 net (5) weekly ETF', 'Do not overfit one weekly print.'),
  },
];

const SAFE = [
  { id: 'safe-seed-109', slug: 'summary-safe', pinned: true, category: '특집', color: 'mint', subject: '한장요약',
    title: '2026년 8월 31일 안전자산 한장 요약입니다. BTC ~78,128·ETH ~2,459·금 ~4,635·인상 57.5%를 모았습니다',
    summary: 'BTC ~78128, ETH ~2459, gold ~4635, Sept hike 57.5%. safe assets repricing with rates.',
    bodyLines: body(['■ 오늘의 큰 그림', 'BTC 78K test, gold 4635, ETH 2459, hike odds elevated.', '■ 앞으로 볼 것', '(1) 2Y yield (2) DXY (3) ETF flows (4) Sept jobs (5) gold 4600-4700 band', '■ 투자시사점', '금리·달러·ETF 유입 세 변수를 같이 추적하시기 바랍니다.']),
  },
  { id: 'safe-seed-110', slug: 'btc-safe', category: '시장분석', color: 'orange', subject: '비트코인',
    title: '비트코인 ~78,128달러, 7만 8,000달러 선 재테스트',
    summary: 'BTC ~78128 retests 78K; rate-sensitive non-yield asset.',
    bodyLines: makeBody('$78,128, $78K band, rate odds 57.5%.', '1. opportunity cost 2. ETF flows 3. liquidations 4. DXY 5. correlation with gold', '**A hold 78K** **B break on hot CPI** **C short squeeze**', 'Post-Jackson Hole macro driver.', 'BTC institutional era since 2024 ETF still rate-sensitive.', '(1) ETF net (2) funding (3) liqs (4) 2Y (5) 78000 break/hold', 'Flows + rates on one screen.'),
  },
  { id: 'safe-seed-111', slug: 'gold-safe', category: '시장분석', color: 'orange', subject: '금',
    title: '금 ~4,635달러, 실질금리·달러 변수 재점검',
    summary: 'Gold ~4635/oz; real rates and dollar drive.',
    bodyLines: makeBody('Spot gold ~4635.', '1. real rates 2. DXY 3. geopolitical bid 4. central bank buying 5. vs BTC', '**A real rates peak gold bid** **B dollar rally press** **C stagflation bid**', 'Pulled back from higher prints recent weeks.', 'Gold 2020s bull includes fiscal/geopolitical layer beyond real rates.', '(1) real yield (2) DXY (3) 4600 support (4) 4700 resist (5) ETF holdings', '4600-4700 band watch.'),
  },
  { id: 'safe-seed-112', slug: 'eth-safe', category: '시장분석', color: 'orange', subject: '이더리움',
    title: '이더리움 ~2,459달러, BTC와 같은 거시 변수 연동',
    summary: 'ETH ~2459; macro linked; $2500 psychological.',
    bodyLines: makeBody('ETH ~2459, BTC macro beta.', '1. BTC correlation 2. staking yield vs rates 3. gas/L2 medium term 4. ETF narrative 5. 2500 level', '**A beta rally** **B decorrelate on upgrade** **C macro drag**', '2500 line context.', 'ETH utility thesis vs macro beta coexist.', '(1) BTC ETH ratio (2) gas (3) staking APR vs 2Y (4) 2400-2500 (5) ETF', 'Medium-term fundamentals, near-term rates.'),
  },
  { id: 'safe-seed-113', slug: 'silver-safe', category: '시장분석', color: 'orange', subject: '은',
    title: '은, 금·산업 수요 겹치는 안전자산으로 부각',
    summary: 'Silver: precious + industrial; solar/electronics link.',
    bodyLines: makeBody('Silver industrial+p investment demand.', '1. gold/silver ratio 2. solar demand 3. growth sensitivity 4. precious basket 5. volatility vs gold', '**A gold rally lag catch-up** **B industrial drag** **C ratio mean revert**', 'Part of precious metals week.', 'Silver often higher beta to gold in moves.', '(1) Au/Ag ratio (2) solar installs (3) gold direction (4) industrial PMI (5) ETF', 'Complement gold not duplicate.'),
  },
];

const KRRE = [
  { id: 'krre-seed-109', slug: 'summary-krre', pinned: true, category: '특집', color: 'mint', subject: '한장요약',
    title: '2026년 8월 31일 부동산 한장 요약입니다. 서울 +0.29%·강남 -0.11%·중랑 +0.56%·전세 +0.22%',
    summary: 'Seoul sale +0.29%, Gangnam -0.11% 3wk down, Jungnang +0.56%, jeonse +0.22%.',
    bodyLines: body(['■ 오늘의 큰 그림', 'Seoul average up but Gangnam down, outer north up, jeonse +0.22%.', '■ 앞으로 볼 것', '(1) Gangnam trend (2) outer Seoul persistence (3) jeonse ratio (4) tax policy (5) loan rules', '■ 투자시사점', '평균 한 줄이 아니라 구별 heat map으로 보시기 바랍니다.']),
  },
  { id: 'krre-seed-110', slug: 'gangnam-decline', category: '시장분석', color: 'purple', subject: '정책',
    title: '강남·서초 3주 연속 하락, 세제개편 부담',
    summary: 'Gangnam -0.11%, Seocho -0.05% third week; tax reform pressure.',
    bodyLines: makeBody('Gangnam/Seocho 3-week decline, tax burden on high-end.', '1. tax reform 2. forced sales 3. vs outer Seoul 4. transaction volume 5. jeonse linkage', '**A stabilize** **B deeper correction** **C policy tweak**', 'Southeast cluster weak 0.03%.', 'High-end policy shocks rotate demand outward historically.', '(1) Gangnam weekly (2) forced listings (3) tax detail (4) mortgage rules (5) jeonse ratio Gangnam', 'District-level not city average.'),
  },
  { id: 'krre-seed-111', slug: 'outer-seoul-surge', category: '시장분석', color: 'orange', subject: '전세',
    title: '중랑 +0.56% 등 외곽·강북 상승이 서울 평균을 이끌었습니다',
    summary: 'Jungnang +0.56%, north 14 districts avg 0.40%, affordability rotation.',
    bodyLines: makeBody('Outer/north Seoul led +0.29% city avg.', '1. affordability migration 2. vs Gangnam discount 3. jeonse co-move 4. supply 5. loan limits', '**A continue rotation** **B mean revert** **C policy caps outer**', 'Jeonse +0.22% same week.', 'Seoul price tier rotation recurring theme.', '(1) district table (2) jeonse/sale gap (3) transaction count (4) loan DSR (5) north vs south', 'Read as tier rotation not city heat.'),
  },
  { id: 'krre-seed-112', slug: 'jeonse-rise', category: '시장분석', color: 'orange', subject: '전세',
    title: '서울 전세 +0.22%, 전주 0.19%에서 확대',
    summary: 'Seoul jeonse +0.22% from 0.19%; supply shortage factor.',
    bodyLines: makeBody('Jeonse +0.22%, Gyeonggi +0.19%.', '1. listing shortage 2. sale linkage 3. wolse shift 4. policy programs 5. jeonse-to-price ratio', '**A continue if listings tight** **B policy supply ease** **C rate hurt demand**', 'Rising where sale also strong.', 'Jeonse scarcity post-jeonse fraud era persists.', '(1) jeonse ratio by gu (2) listing count (3) safe-trust program (4) loan rate (5) wolse premium', 'Ratio more important than weekly %.'),
  },
];

function buildUsBlock() {
  return US.map(reportObj).join(',\n') + ',\n';
}
function buildKrBlock() { return KR.map(krReportObj).join(',\n') + ',\n'; }
function buildSafeBlock() { return SAFE.map(krReportObj).join(',\n') + ',\n'; }
function buildKrreBlock() { return KRRE.map(krReportObj).join(',\n') + ',\n'; }

function buildTickers() {
  const lines = ['  // 2026-08-31'];
  for (const r of US) {
    if (!r.tickers) { lines.push(`  "${r.id}": ['MACRO', 'NVDA', 'TSLA', 'SPCX', 'AI'],`); continue; }
    lines.push(`  "${r.id}": [${r.tickers.map(t => `'${t}'`).join(', ')}],`);
  }
  return lines.join('\n') + '\n';
}

function buildWallPosts() {
  const posts = [
    [1149,'MACRO','익명_4000','에이전트 메모리 24배 전망. HBM 26~27 품귀'],
    [1150,'AI','익명_4017','토큰 5~30배 늘면 메모리가 병목'],
    [1151,'SPCX','익명_4034','로마 망원경 FH13 10.15t L2 향해'],
    [1152,'NVDA','익명_4051','SPCX 200억 달러 지분? 예측시장 확률 급등'],
    [1153,'SPCX','익명_4068','스타베이스 수자원 444ac 최대 2.2억'],
    [1154,'SPCX','익명_4085','AI 위성 2027 Q4 NVDA 칩 탑재'],
    [1155,'TSLA','익명_4102','100GW 태양광+터빈 주조 in-house'],
    [1156,'AI','익명_4119','AI 15GW 전력 못 켠다는 병목'],
    [1157,'MACRO','익명_4136','ARKK 6억 TSLA 3.91억 flow'],
    [1158,'TSLA','익명_4153','사이버캡 9/3 오스틴 3만달러 0.2/mi'],
    [1159,'MACRO','익명_4170','SPY 변동성 2004년 이후 최저 근처'],
    [1160,'MACRO','익명_4187','애플 COO + 테슬라 목요일 로보택시'],
    [1161,'MACRO','익명_4204','취미지출 5% ATH'],
    [1162,'TSLA','익명_4221','터빈 2030까지 매진'],
    [1163,'NVDA','익명_4238','에이전트+우주+칩 한 주에 다 모임'],
  ];
  let out = '  // ── 2026-08-31 신규 ────────────────\n';
  posts.forEach(([id, sym, nick, content], i) => {
    out += `  { id: ${id}, symbol: "${sym}", nickname: "${nick}", holdingLabel: "관심종목",\n    content: "${content}",\n    createdAt: T31AU + ${(i+1)*8}*60_000, likes: ${10+(i%6)}, comments: ${1+(i%2)} },\n`;
  });
  return out;
}

function buildWallComments() {
  let out = '  // ── 2026-08-31 신규 댓글 ────────────────\n';
  for (let id = 1149; id <= 1163; id++) {
    out += `  ${id}: [\n`;
    out += `    { id: 1, nickname: "익명_${5000+id}", holdingLabel: "관심종목", content: "이번 주 핵심 포인트네요", createdAt: T31AU + ${(id-1148)*8}*60_000 + 3*60_000, likes: 4 },\n`;
    out += `    { id: 2, nickname: "익명_${5100+id}", holdingLabel: "관심종목", content: "다음 지표도 같이 봐야겠어요", createdAt: T31AU + ${(id-1148)*8}*60_000 + 6*60_000, likes: 5 },\n`;
    out += `  ],\n`;
  }
  return out;
}

function buildAnalystPosts() {
  const items = [
    [-946,'종로 까치 #41','MACRO','오늘 한 화면: 에이전트 메모리 24배·Roman FH13·NVDA $20B SPCX·Cybercab 9/3·SPY 저변동·터빈 2030 매진.'],
    [-947,'광화문 여우 #62','AI','에이전트 한 번 호출에 토큰 5~30배. HBM 2026~27 품귀면 메모리 Mix가 실적을 이끕니다.'],
    [-948,'여의도 수리 #28','SPCX','Roman 10.15t FH13 발사. L2 도달·개막 일정이 다음 확인 포인트입니다.'],
    [-949,'송파 독수리 #66','NVDA','SPCX $20B stake는 아직 미확인. odds 변화만으로 포지션 키우기보다 공식 발표를 기다리시기 바랍니다.'],
    [-950,'분당 매 #31','SPCX','스타베이스 444ac 수자원 deal은 cadence 확대 선행 지표로 읽힙니다.'],
    [-951,'성수 너구리 #15','SPCX','AI 위성 2027 Q4 NVDA 칩. 궤도 compute timeline이 분기 단위로 내려왔습니다.'],
    [-952,'역삼 판다 #77','TSLA','100GW solar + in-house turbine casting. power bottleneck이 chip만큼 중요해집니다.'],
    [-953,'삼성동 올빼미 #19','AI','~15GW AI compute power-on delay. transformer·cooling이 새 병목입니다.'],
    [-954,'한남 재규어 #27','MACRO','ARKK ~$600M, TSLA ~$391M flow. theme basket risk appetite thermometer.'],
    [-955,'해운대 고래 #03','TSLA','Cybercab Sept 3 Austin. $30K, $0.20/mi. calendar event로 execution risk down.'],
    [-956,'마포 살쾡이 #08','MACRO','SPY weekly vol near Dec 2004 lows. quiet surface, Sept hike 57.5% still live.'],
    [-957,'판교 늑대 #90','MACRO','Big Tech week: Apple COO rumor + Tesla robotaxi Thursday. Mag7 idiosyncratic vol.'],
    [-958,'인천 갈매기 #52','MACRO','Hobby spending >5% of goods ATH. consumer slowdown is category-uneven.'],
    [-959,'종로 까치 #41','TSLA','Turbines sold out through 2030. energy equipment supercycle narrative.'],
    [-960,'광화문 여우 #62','NVDA','Agent memory + space AI + stake talk: NVDA story widens from chips to compute placement.'],
  ];
  let out = '  // ── 2026-08-31 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────\n';
  items.forEach(([id, alias, symbol, content], i) => {
    const min = String(i * 7).padStart(2, '0');
    out += `  {\n    id: ${id}, alias: "${alias}", symbol: "${symbol}",\n    content: "${content}",\n    likes: ${12+(i%5)}, comments: ${1+(i%2)}, created_at: "2026-08-31T00:${min}:00.000Z", liked: false,\n  },\n`;
  });
  return out;
}

function buildAnalystComments() {
  return `  [-946]: [{ alias: "댓글_310946", content: "한 화면 정리 감사합니다", created_at: "2026-08-31T00:10:00.000Z" }],\n  [-955]: [{ alias: "댓글_310955", content: "9/3 행사 전후 변동성 조심", created_at: "2026-08-31T01:10:00.000Z" }],\n`;
}

function buildKrWall() {
  const posts = [
    [9029,'코스피','칠천피존버','6788.88 -1.79%. 이번 주 SemiCon·FOMC·9/4 고용'],
    [9030,'삼성전자','반도체장기','CXMT +874% vs 자사주 1.5조. 공급 vs 환원'],
    [9031,'SK하이닉스','HBM러버','-4.45%인데 에이전트 메모리 24배 전망'],
    [9032,'현대차','자동차매니아','CID 실망 -3.73%. SW 프리미엄 테스트'],
    [9033,'KB금융','은행주러','+2.08% 금리 기대'],
    [9034,'수급','외국인추적','주간 외국인 8.3조 순매도'],
    [9035,'코스피','매크로덕후','9월 인상 57.5%·환율·수급 세 줄'],
  ];
  let out = '';
  posts.forEach(([id, sym, nick, content], i) => {
    out += `  { id: ${id}, symbol: "${sym}", nickname: "${nick}", holdingLabel: "관심종목", content: "${content}", createdAt: T31 - ${i*1800_000}, likes: ${30-i}, comments: ${2}, },\n`;
  });
  return out;
}

function buildSafeWall() {
  const posts = [
    [9125,'비트코인','온체인러','~78128, 78K 재테스트'],
    [9126,'금','금벌레','~4635, 실질금리 변수'],
    [9127,'이더리움','이더러','~2459, 2500 선'],
    [9128,'은','실물러','금+산업 수요, Au/Ag ratio'],
    [9129,'매크로','채권덕후','인상 57.5%, BTC·금 같이 재가격'],
  ];
  let out = '';
  posts.forEach(([id, sym, nick, content], i) => {
    out += `  { id: ${id}, symbol: "${sym}", nickname: "${nick}", holdingLabel: "관심종목", content: "${content}", createdAt: T31 - ${i*1800_000}, likes: ${28-i}, comments: ${2}, },\n`;
  });
  return out;
}

function buildKrreWall() {
  const posts = [
    [9225,'서울매매','실수요자','서울 +0.29%, 강남 -0.11% 3주'],
    [9226,'강남','강남권','세제 부담 급매'],
    [9227,'전세','전세러','전세 +0.22%'],
    [9228,'중랑','외곽거주','중랑 +0.56%'],
  ];
  let out = '';
  posts.forEach(([id, sym, nick, content], i) => {
    out += `  { id: ${id}, symbol: "${sym}", nickname: "${nick}", holdingLabel: "${sym==='실수요자'?'관망':'관심'}", content: "${content}", createdAt: T31 - ${i*2400_000}, likes: ${26-i}, comments: ${2}, },\n`;
  });
  return out;
}

function buildKrAnalyst() {
  const items = [
    [-1968,'여의도 너구리 #11','코스피','8월 31일 한국장 한장 요약입니다. 코스피는 6,788.88로 1.79% 내렸고, 이번 주 외국인 순매도는 약 8조 3,153억 원 규모로 집계됐습니다. SemiCon Taiwan(8/31), 9월 4일 미국 고용, 9월 15~16일 FOMC, 9월 인상 확률 57.5%가 같은 주 변수입니다.'],
    [-1969,'판교 치타 #22','삼성전자','삼성전자는 중국 CXMT 대비 +874% 수출 증가와 1조 5,000억 원 자사주 매입을 발표했지만 주가는 3.38% 내렸습니다. HBM mix와 월간 수출 통계로 기대와 실적의 간격을 확인하시기 바랍니다.'],
    [-1970,'삼성동 여우 #08','SK하이닉스','SK하이닉스는 4.45% 하락했지만, 에이전트 메모리 24배·HBM 2026~27 품귀 전망은 장기 수요 story를 유지합니다. 단기 수급과 장기 mix를 분리해 보시면 됩니다.'],
    [-1971,'성수 수달 #35','현대차','현대차는 CID(차량 내 정보·디스플레이) 기대에 대한 실망으로 3.73% 내렸습니다. 소프트웨어 프리미엄은 발표가 아니라 상용 일정과 수율로 증명됩니다.'],
    [-1972,'한남 두루미 #17','KB금융','KB금융은 2.08% 올랐습니다. 9월 인상 확률 57.5%와 2년물 금리를 함께 보시면 금융주 방향을 잡기 쉽습니다.'],
    [-1973,'잠실 백로 #29','수급','이번 주 외국인 순매도 약 8.3조 원은 반도체 비중이 큰 편입니다. 환율·외국인 순매수·인상 확률 세 줄이 같이 정리될 때 지수도 방향을 잡습니다.'],
  ];
  let out = '';
  items.forEach(([id, alias, sym, content], i) => {
    out += `  { id: ${id}, alias: "${alias}", symbol: "${sym}", content: "${content}", likes: ${28-i}, comments: 2, created_at: "2026-08-31T06:${String(i*8).padStart(2,'0')}:00.000Z", liked: false, },\n`;
  });
  return out;
}

function buildSafeAnalyst() {
  const items = [
    [-1991,'온체인 매 #03','비트코인','비트코인은 약 78,128달러 부근입니다. 78,000달러 선 재시험과 9월 인상 확률 57.5%가 같은 축입니다. 현물 상장지수펀드 순유입을 함께 보시기 바랍니다.'],
    [-1992,'금벌레 #17','금','금은 약 4,635달러 부근입니다. 실질금리와 달러 지수가 방향을 좌우하며, 4,600~4,700달러 구간이 단기 기준선입니다.'],
    [-1993,'이더러 #44','이더리움','이더리움은 약 2,459달러로 2,500달러 선을 시험했습니다. 매크로 베타가 커서 금리 기대와 같이 움직입니다.'],
    [-1994,'실물러 #22','은','은은 귀금속·산업 수요가 겹칩니다. 금 대비 은 비율(금은비)로 상대 매력을 보시면 됩니다.'],
    [-1995,'매크로올빼미 #31','매크로','9월 인상 확률 57.5%로 비트코인·금·채권이 함께 재가격되는 구간입니다. 이자를 주지 않는 자산이 먼저 반응합니다.'],
  ];
  let out = '';
  items.forEach(([id, alias, sym, content], i) => {
    out += `  { id: ${id}, alias: "${alias}", symbol: "${sym}", content: "${content}", likes: ${24-i}, comments: 2, created_at: "2026-08-31T09:${String(i*8).padStart(2,'0')}:00.000Z", liked: false, },\n`;
  });
  return out;
}

function buildKrreAnalyst() {
  const items = [
    [-1984,'실수요 #05','서울매매','서울 아파트 매매가는 0.29% 올랐지만 강남구는 3주 연속 -0.11%로 내렸습니다. 중랑구 +0.56%, 전세 +0.22%로 지역·전세를 나눠 보셔야 합니다.'],
    [-1985,'정책워처 #01','강남','강남·서초는 세제개편 부담으로 급매물이 늘며 하락세가 이어졌습니다. 고가 주택과 외곽 상승의 대비가 핵심입니다.'],
    [-1986,'전세러 #09','전세','전세가격은 0.22% 올랐습니다. 매물 부족과 전월세 전환 흐름이 겹치면 상승 폭이 커질 수 있습니다.'],
    [-1987,'외곽분석 #12','중랑','외곽·강북 상승은 affordability rotation 신호입니다. 서울 평균 한 줄만 보면 놓치기 쉽습니다.'],
  ];
  let out = '';
  items.forEach(([id, alias, sym, content], i) => {
    out += `  { id: ${id}, alias: "${alias}", symbol: "${sym}", content: "${content}", likes: ${22-i}, comments: 2, created_at: "2026-08-31T10:${String(i*8).padStart(2,'0')}:00.000Z", liked: false, },\n`;
  });
  return out;
}

function main() {
  console.error(
    'DEPRECATED: insert-reports-20260831.js는 영문 스켈레톤을 삽입합니다. 재실행 금지.\n' +
      '한글 본문은 scripts/fix-reports-20260831-ko.js 및 fix-reports-20260831-ko-markets.js 사용.',
  );
  process.exit(1);
  if (read('lib/wallPosts.ts').includes('T31AU')) {
    console.log('already inserted — skip');
    return;
  }
  // lib/reports.ts
  let c = read('lib/reports.ts');
  c = c.replace(/(\{ id: "seed-1401"[\s\S]*?)isPinned: true/, '$1isPinned: false');
  c = patch(c, '  // ── 2026-08-29 신규 ──────────────────────────────────────────────────────', `${buildUsBlock()}`, 'SEED_REPORTS');
  c = patch(c, '  // 2026-08-29\n  "seed-1401"', `${buildTickers()}`, 'TICKERS');
  write('lib/reports.ts', c);

  c = read('lib/reports-kr.ts');
  c = patch(c, '  // ── 2026-08-29 신규 ────────────────────────────────────────────────────────', `${buildKrBlock()}`, 'KR seeds');
  write('lib/reports-kr.ts', c);

  c = read('lib/reports-safe.ts');
  c = patch(c, '  // ── 2026-08-29 신규 ────────────────────────────────────────────────────────', `${buildSafeBlock()}`, 'SAFE seeds');
  write('lib/reports-safe.ts', c);

  c = read('lib/reports-kr-re.ts');
  c = patch(c, '  // ── 2026-08-29 신규 ────────────────────────────────────────────────────────', `${buildKrreBlock()}`, 'KRRE seeds');
  write('lib/reports-kr-re.ts', c);

  c = read('lib/wallPosts.ts');
  c = patch(c, 'const T29AU = 1787958000000; // 2026.08.29 08:00 KST', `const T31AU = 1788130800000; // 2026.08.31 08:00 KST\nconst T29AU = 1787958000000; // 2026.08.29 08:00 KST`, 'T31AU');
  c = c.replace('export const LATEST_UPDATE = T29AU;', 'export const LATEST_UPDATE = T31AU;');
  c = patch(c, '  // ── 2026-08-29 신규 ────────────────', `${buildWallPosts()}`, 'wall posts');
  c = patch(c, '  // ── 2026-08-29 신규 댓글 ────────────────', `${buildWallComments()}`, 'wall comments');
  write('lib/wallPosts.ts', c);

  c = read('lib/analystPosts.ts');
  c = patch(c, '  // ── 2026-08-29 신규 (15개 · 존댓말 · 구조 혼합) ──────────────────────', `${buildAnalystPosts()}`, 'analyst');
  c = patch(c, '  [-931]:', `${buildAnalystComments()}`, 'analyst comments');
  write('lib/analystPosts.ts', c);

  c = read('lib/wallPosts-markets.ts');
  c = patch(c, 'const T29 = 1787958000000; // 2026-08-29 08:00 KST', `const T31 = 1788130800000; // 2026-08-31 08:00 KST\nconst T29 = 1787958000000; // 2026-08-29 08:00 KST`, 'T31 markets');
  c = patch(c, '  { id: 9021, symbol: "코스피"', `${buildKrWall()}`, 'KR wall');
  c = patch(c, '  { id: 9121, symbol: "비트코인"', `${buildSafeWall()}`, 'SAFE wall');
  c = patch(c, '  { id: 9221, symbol: "서울매매"', `${buildKrreWall()}`, 'KRRE wall');
  write('lib/wallPosts-markets.ts', c);

  c = read('lib/analystPosts-markets.ts');
  c = patch(c, '    id: -1961, alias: "여의도 너구리 #11", symbol: "코스피",', `${buildKrAnalyst()}`, 'KR analyst');
  c = patch(c, '    id: -1971, alias: "온체인 매 #03", symbol: "비트코인",', `${buildSafeAnalyst()}`, 'SAFE analyst');
  c = patch(c, '    id: -1981, alias: "실수요 #05", symbol: "서울매매",', `${buildKrreAnalyst()}`, 'KRRE analyst');
  write('lib/analystPosts-markets.ts', c);

  console.log('inserted');
}

main();
