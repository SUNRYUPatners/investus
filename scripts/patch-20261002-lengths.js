#!/usr/bin/env node
/** Rebuild Oct 2 bodies from source data + unique extras (no cross-section repeats). */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20261002-us");
const { KR, SAFE, KR_RE } = require("./data-20261002-markets");
const { findRepeatSentences, findPairs } = require("./lib/report-similarity");

const ROOT = path.join(__dirname, "..");

function walkJsonStringEnd(src, quoteStart) {
  let i = quoteStart + 1;
  while (i < src.length) {
    if (src[i] === "\\") {
      i += 2;
      continue;
    }
    if (src[i] === '"') return i;
    i += 1;
  }
  throw new Error("unclosed JSON string");
}

function replaceField(src, id, field, value) {
  const idIdx = src.indexOf(`id: "${id}"`);
  if (idIdx < 0) throw new Error(`missing ${id}`);
  const key = `${field}: `;
  const fieldIdx = src.indexOf(key, idIdx);
  const nextId = src.indexOf(`\n  {`, idIdx + 8);
  if (fieldIdx < 0 || (nextId > 0 && fieldIdx > nextId)) {
    throw new Error(`${id} ${field} not found`);
  }
  const quoteStart = fieldIdx + key.length;
  if (src[quoteStart] !== '"') throw new Error(`${id} ${field} not a JSON string`);
  const quoteEnd = walkJsonStringEnd(src, quoteStart);
  return src.slice(0, quoteStart) + JSON.stringify(value) + src.slice(quoteEnd + 1);
}

function injectBefore(body, marker, extra) {
  if (!extra) return body;
  if (!body.includes(marker)) throw new Error(`marker missing: ${marker}`);
  return body.replace(marker, `\n\n${extra.trim()}${marker}`);
}

/** Unique extras: avoid repeating 3+ digit numbers already in that report. */
const FIX = {
  "seed-1866": {
    more: "온라인보다 매장 트래픽이 먼저 살아나는지가 북미 회복의 질입니다. 중국 재고가 빠지는 속도가 다음 분기 매출을 가릅니다.",
  },
  "seed-1867": {
    more: "번호판 통계는 출고보다 늦게 나옵니다. 출고가 먼저 늘고 등록이 따라오는 시차가 나라마다 다릅니다.",
  },
  "seed-1868": {
    more: "겨울 보조금 창이 열리면 이 최고가 한 달짜리인지가 가려집니다. 베를린 출고 대기 주수가 줄어드는지도 같이 봅니다. 알프스 남쪽 충전 속도가 출고를 따라오면 다음 달 순위가 두꺼워집니다.",
    house: "아웃퍼폼과 강세 시나리오를 한 평균 목표로 만들지 않습니다. 다음 달 표가 확인입니다.",
  },
  "seed-1869": {
    more: "항구 재고가 빠지는 속도가 다음 달 순위를 가릅니다. 할부 금리가 내려가면 수입 전기차 수요가 더 두꺼워집니다. 서비스 센터 예약 창이 열려 있는지도 인도 체감의 한 줄입니다.",
    house: "아웃퍼폼과 강세 시나리오를 한 평균 목표로 만들지 않습니다.",
  },
  "seed-1871": {
    more: "지상국과 게이트웨이가 따라와야 체감 속도가 바뀝니다. 구독 대기열이 줄면 그 체감이 확인됩니다. 극지방 커버리지가 열리면 선박과 항공 수요가 따로 붙습니다.",
    house: "주당 목표와 기업가치를 한 주가로 나누지 않습니다. 체감 속도가 구독의 다음 숫자입니다.",
  },
  "seed-1872": {
    summary:
      "아마존이 컨스텔레이션에너지와 원전 전력을 20년 계약했습니다. 캘버트클리프스 업그레이드분이 새로 나오는 용량입니다. 골드만삭스 아마존 목표 주가는 375달러입니다.",
    more: "원전은 야간에도 꺼지지 않는 기저 전력입니다. 학습 클러스터가 가스 피킹보다 이 자리를 선호하는 이유입니다. 송전 접속 허가가 나오면 어느 캠퍼스에 붙는지가 확인됩니다.",
    house: "컨빅션 리스트 목표와 전력 계약 한 건을 한 공식으로 곱하지 않습니다.",
  },
  "seed-1874": {
    more: "인하 칸이 비어 있으면 올리거나 멈추는 두 갈래만 남은 표입니다. 위원 발언이 한 명 더 나오면 그 갈래의 무게가 또 움직입니다. 선물 곡선이 평평해지면 동결 쪽이 더 두꺼워집니다.",
    house: "시장 가격과 연말 경로를 한 칸에 두지 않습니다.",
  },
  "seed-1875": {
    more: "현지 언어 음성과 지도 데이터가 구독 창과 같이 열려야 실사용이 됩니다. 승인 문장만으로 주행 가능 구간이 바로 전국이 되지는 않습니다. 보험 특약이 열리면 구독 전환이 빨라집니다.",
    house: "아웃퍼폼과 강세 시나리오를 한 평균 목표로 만들지 않습니다.",
  },
  "seed-1876": {
    more: "의회 청문회나 예산 항목이 나오면 제목과 다른 칸이 열립니다. 민간 로봇 공장 일정은 그 예산과 따로 갑니다. 수출 허가 품목 목록이 나오면 그 칸을 따로 올립니다.",
    house: "아웃퍼폼과 강세 시나리오를 한 평균 목표로 만들지 않습니다.",
  },
  "seed-1877": {
    replace: [
      [
        "스페이스X가 오늘 다시 역사를 쓰려 합니다. 하루에 로켓 세 발입니다.",
        "하루에 궤도 로켓 세 발을 목표로 잡았습니다. 케이프 커내버럴과 본 기지 창이 같은 날에 열립니다.",
      ],
    ],
    more: "재사용 부스터 회전이 같은 날 여러 발을 가능하게 한 전제입니다. 기상 한 방이 세 칸을 한꺼번에 미룰 수 있습니다.",
  },
  "seed-1878": {
    more: "메모리 공급사와 장기 계약을 트는 속도가 원가의 다음 숫자입니다. 대역이 충분하면 용량을 줄여도 학습 스텝이 유지됩니다.",
  },
  "seed-1879": {
    more: "세미 충전 구간과 배차 소프트웨어가 같이 깔려야 허브가 돌아갑니다. 운전 가능 시간을 배터리로 맞추는 일이 배차의 핵심입니다.",
  },
  "seed-1880": {
    summary:
      "미국 2분기 새 테슬라의 절반이 넘는 대수가 판매 시점에 완전자율주행을 골랐습니다. 다음 분기는 그 비율이 더 올라갈 전망입니다. 나중에 구독하는 대수와 더하지 않는 판매 시점 첨부율입니다.",
    more: "판매 사원이 옵션을 먼저 권하는 매장일수록 첨부율이 빨리 올라갑니다. 보험료와 구독료를 같이 설명하는 창이 그 비율을 받칩니다. 시승에서 도심 자율을 보여 주면 선택 비율이 더 올라갑니다.",
    house: "아웃퍼폼과 강세 시나리오를 한 평균 목표로 만들지 않습니다. 매장 설명 창과 실적 첨부율을 한 숫자로 만들지 않습니다. 시승 경험이 선택을 받칩니다.",
  },
  "seed-1881": {
    summary:
      "중국 모델Y 롱이 앞 모터를 새 사양으로 바꿨습니다. 출력과 토크가 올라가고 항속이 늘어 중국 순환 기준 776킬로미터입니다. 롱 트림 가격은 33만 9,000위안, 인도 대기는 3주에서 6주입니다.",
    more: "앞 모터를 바꾸면 겨울 히트펌프 부담이 줄어 실제 항속도 살아날 여지가 있습니다. 시승기가 쌓이면 그 체감이 확인됩니다.",
  },
  "seed-1882": {
    more: "지분이 생기면 안전 규제와 수출 통제가 같은 테이블에 올라옵니다. 민간 라운드 밸류에이션과 정부 지분 가격은 따로 갑니다. 의회의 청문 일정이 나오면 그 칸을 올립니다.",
    house: "인프라 경로와 지분 시나리오를 한 칸에 두지 않습니다.",
  },
  "seed-1883": {
    summary:
      "일본 10년 국채 금리가 3.1299%로 30년 만에 가장 높습니다. 하루 0.0332%포인트 올랐고, 일본 시간 오전 2시 26분 스냅샷입니다. 엔화와 원·달러를 같이 보는 숫자입니다.",
    more: "보험사와 은행의 해외 채권 매도가 환율과 같이 읽히는 자리입니다. 국내 채권 금리가 올라가면 캐리 자금이 돌아옵니다. 수입 물가 경로가 그다음으로 따라옵니다.",
    house: "만기별 금리 곡선과 현물환율을 한 숫자로 만들지 않습니다. 보험사 포지션과 정책 전망을 한 경로로 묶지 않습니다. 스냅샷과 종가를 섞지 않습니다.",
  },
  "seed-1884": {
    summary:
      "칼시 예측시장은 테슬라 3분기 인도 50만 대 확률을 20%로 봅니다. 아주 강세라는 평가가 붙어 있습니다. 공식 인도 공시가 나오면 그 대수가 확정됩니다. 예측시장 가격입니다.",
    more: "생산 리듬이 인도를 받치면 예측시장 가격이 공시 전에 먼저 움직입니다. 해상 운송 대기 선박 수가 그 리듬의 힌트입니다. 공장 가동률 사진이 나오면 그 힌트가 두꺼워집니다.",
    house: "아웃퍼폼과 강세 시나리오를 한 평균 목표로 만들지 않습니다. 해상 대기와 공시 대수를 한 칸에 더하지 않습니다. 가동률이 힌트입니다.",
  },
  "seed-1885": {
    summary:
      "2027년형 모델3와 모델Y가 중국·호주·뉴질랜드에서 차량투로드를 엽니다. 차 배터리로 캠핑 장비와 공구, 아웃렛 어댑터를 켭니다. 이미 나온 차에는 나중에 넣지 못하고, 다른 나라는 뒤에 열립니다.",
    more: "캠핑과 공사 현장에서 발전기 대신 차를 쓰는 수요가 이 기능을 받칩니다. 어댑터 재고가 먼저 깔리는 시장이 체감이 빠릅니다. 안전 규격 인증이 열리면 다른 나라도 따라옵니다.",
    house: "아웃퍼폼과 강세 시나리오를 한 평균 목표로 만들지 않습니다. 캠핑 수요와 양방향 충전을 한 기능으로 부르지 않습니다.",
  },
  "seed-1886": {
    replace: [
      [
        "칼시가 올린 한 줄입니다.",
        "칼시가 올린 한 줄이고, 올해와 내년의 공식 성장률 숫자는 속보치에서 확인합니다.",
      ],
    ],
    more: "생산성이 한 해에 뛰어오르려면 공장 가동과 소프트웨어 배포가 같이 가야 합니다. 공식 속보치는 분기가 닫힌 뒤에야 나옵니다. 고용 시간과 산출이 같이 올라야 그 비전이 숫자로 확인됩니다.",
    house: "생산성 비전과 고용 표를 한 성장률로 나누지 않습니다.",
  },
  "seed-1887": {
    summary:
      "무디스는 미국 데이터센터가 2030년까지 전력 45기가와트를 더하려면 1,100억 달러가 필요하다고 추정합니다. 아마존 원전 계약은 그 나라 전체 그림 안의 한 줄입니다.",
    replace: [
      [
        "1,100억 달러는 그 용량을 붙이는 송전·발전 투자입니다.",
        "송전과 발전을 나라에 붙이는 무디스의 투자 추정입니다.",
      ],
    ],
    more: "송전선 허가 기간이 발전소보다 더 긴 경우가 많습니다. 전력이 있어도 전선이 없으면 데이터센터가 켜지지 않습니다. 주 단위 허가 병목이 투자 일정을 가릅니다.",
    house: "유틸리티 설비투자와 클라우드 성장을 한 배수로 보지 않습니다.",
  },
  "kr-seed-266": {
    more: "고대역 메모리 할당이 서버 쪽에 먼저 가면 주가 민감도가 커집니다. 자사주 창이 닫힌 뒤의 수급이 다음 시험입니다. 고객사 배정 공시가 나오면 그 민감도가 숫자로 확인됩니다.",
  },
  "kr-seed-267": {
    summary:
      "삼성바이오로직스는 142만 9,000원으로 2.73% 올랐습니다. 유상증자 신주 발행가액 안내 공시가 나온 날이고, 셀트리온은 3.32% 같이 올랐습니다. 제약 대형주 마감입니다.",
    more: "청약 창이 열리면 유통 물량 계산이 다시 쓰입니다. 기존 주주 배정 비율이 나오면 그 계산이 닫힙니다.",
    house: "수주 잔고와 하루 상승을 한 적정가로 만들지 않습니다. 증설 일정과 종가를 한 공식으로 곱하지 않습니다. 배정 비율이 유통을 가릅니다. 납입이 다음 확인입니다.",
  },
  "kr-seed-268": {
    summary:
      "현대차는 34만 9,000원으로 1.16% 올랐습니다. 원·달러가 1,358.4원으로 5.6원 오른 날의 완성차이고, 기아는 0.44% 올랐습니다. 수출 채산성 마감입니다.",
    more: "수출 채산성은 환율이 받치고, 내수 수요는 할부 금리가 가릅니다. 두 힘이 같은 방향으로 겹친 오후입니다. 미국 재고 일수가 줄어들면 그 채산성이 더 두꺼워집니다.",
    house: "원가 절감 일정과 하루 종가를 한 목표로 묶지 않습니다.",
  },
  "kr-seed-269": {
    more: "프로그램 매매와 창구 매매를 한 외국인으로 부르면 부호가 섞입니다. 시간대별 순매수가 돌아서는 시각을 따로 둡니다.",
  },
  "safe-seed-239": {
    invest: "야간 선물과 낮 종가를 한 줄로 잇지 않습니다. 고용 표가 나오면 안전자산 칸을 다시 씁니다.",
  },
  "safe-seed-240": {
    more: "실질금리가 올라가면 실물 자산이 눌립니다. 보석 수요보다 금리 칸이 먼저 움직인 하루입니다. 중앙은행 매입 소식이 나오면 그 칸이 다시 열립니다.",
    house: "실질금리 경로와 장신구 수요를 한 등락으로 평균 내지 않습니다.",
  },
  "safe-seed-241": {
    more: "현물 창구가 빠져도 선물 포지션이 받치면 가격이 버팁니다. 옵션 만기 주가 그 힘의 다음 시험입니다. 채굴 난이도가 같이 움직이면 그 버팀이 더 두꺼워집니다.",
  },
  "safe-seed-242": {
    summary:
      "이더리움은 10월 1일 동부 오전 9시 30분에 2,688.17달러입니다. 같은 시각 비트코인은 8만 3,448.09달러이고, 이더리움 하루 등락 폭은 그 표에 없습니다.",
    more: "스테이킹 보상과 가스비가 이더리움 독자 칸입니다. 비트코인 등락을 그대로 옮기지 않습니다. 레이어2 수수료가 내려가면 그 독자 칸이 더 선명해집니다.",
    house: "스테이킹 수익과 현물 펀드 수요를 한 경로로 묶지 않습니다. 아침 스냅샷을 하루 등락으로 나누지 않습니다. 오후 표가 다음입니다.",
  },
  "safe-seed-243": {
    summary:
      "달러인덱스는 오후 3시 22분 101.60으로 전날 101.45보다 올랐습니다. 원·달러는 1,358.4원으로 5.6원 올랐고, 성장과 고용 전망이 달러를 받쳤습니다.",
    more: "무역가중 바스켓이라 유로와 엔이 같이 약해져야 인덱스가 오릅니다. 원·달러 혼자 움직인 날과 바스켓 날을 나눕니다. 관광 시즌 달러 수요가 겹치면 인덱스가 더 버팁니다.",
    house: "무역가중 바스켓과 양자 환율을 한 퍼센트로 나누지 않습니다. 고용 표가 나오면 바스켓 칸을 다시 씁니다. 금요일입니다.",
  },
  "safe-seed-244": {
    summary:
      "WTI는 유럽 세션 기준 91.80달러로 1.5% 올랐습니다. 브렌트는 100달러를 다시 넘보았고, COMEX 표의 90.42달러와는 시각이 다른 자리입니다. 유럽 세션입니다.",
    more: "정제마진이 같이 살아나면 재고보다 수요가 앞에 있는 주입니다. 전략비축 방출 이야기가 나오면 그 칸을 따로 올립니다. 계절 난방 수요가 겹치면 그 프리미엄이 더 남습니다.",
    house: "정제마진과 공급 차질을 하루 평균 유가로 만들지 않습니다.",
  },
  "krre-seed-210": {
    invest: "접수 마감 시각과 당첨 발표일을 한 단계로 부르지 않습니다. 두 단지의 분양가를 한 평균으로 만들지 않습니다.",
  },
  "krre-seed-211": {
    more: "학교와 지하철 거리가 청약 가점보다 실거주를 가릅니다. 모델하우스 대기 줄이 그 경쟁의 체감입니다.",
  },
  "krre-seed-212": {
    more: "신생아 우선과 일반 추첨은 같은 날 창이어도 자격 칸이 다릅니다. 마감 직전 접속 몰림이 경쟁률을 왜곡할 수 있습니다.",
  },
  "krre-seed-213": {
    summary:
      "광명 에듀하임은 투기과열지구·청약과열지역의 민영입니다. 분양가 상한제는 적용되지 않고, 최초 당첨일부터 전매가 3년입니다. 소유권 이전 등기를 마치면 3년이 찬 것으로 봅니다.",
    more: "전매가 막히면 단기 시세 차익보다 실거주·임대 가정이 앞에 옵니다. 중도금 대출 한도가 그 가정의 다음 숫자입니다. 잔금 대출 금리가 내려가면 그 가정이 더 버팁니다.",
  },
};

function expandBody(body, fix, isSummary) {
  let next = body;
  if (fix.replace) {
    for (const [from, to] of fix.replace) {
      if (!next.includes(from)) console.warn("replace miss:", from.slice(0, 48));
      next = next.replace(from, to);
    }
  }
  if (isSummary) {
    if (fix.big) next = injectBefore(next, "\n\n■ 투자 시사점", fix.big);
    if (fix.invest) next = injectBefore(next, "\n\ninvestus.kr SRP", fix.invest);
    return next;
  }
  if (fix.what) next = injectBefore(next, "\n\n■ 조금만 더 알려드리면", fix.what);
  if (fix.more) next = injectBefore(next, "\n\n■ 기관·하우스 뷰", fix.more);
  if (fix.house) next = injectBefore(next, "\n\ninvestus.kr SRP", fix.house);
  return next;
}

function applyFile(file, rows) {
  let src = fs.readFileSync(path.join(ROOT, file), "utf8");
  let n = 0;
  for (const r of rows) {
    const fix = FIX[r.id];
    if (!fix) continue;
    const isSummary = r.pinned || r.subject === "한장요약";
    if (fix.summary) src = replaceField(src, r.id, "summary", fix.summary);
    const body = expandBody(r.body, fix, isSummary);
    const reps = findRepeatSentences(body);
    const pairs = findPairs(body);
    if (reps.length || pairs.length) {
      console.warn(
        `${r.id}: sim ${reps.length} pair ${pairs.length} len ${body.length}` +
          (reps[0] ? ` | ${reps[0].a.slice(0, 40)}` : ""),
      );
    }
    src = replaceField(src, r.id, "body", body);
    n += 1;
  }
  fs.writeFileSync(path.join(ROOT, file), src);
  console.log(`${file}: patched ${n}`);
}

applyFile("lib/reports.ts", US);
applyFile("lib/reports-kr.ts", KR);
applyFile("lib/reports-safe.ts", SAFE);
applyFile("lib/reports-kr-re.ts", KR_RE);
