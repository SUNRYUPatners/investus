#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { similarSentence, splitSentences, cleanBody } = require("./lib/report-similarity");
const ROOT = path.join(__dirname, "..");

function unescapeTsChar(n) {
  if (n === "n") return "\n";
  if (n === "t") return "\t";
  if (n === '"') return '"';
  if (n === "\\") return "\\";
  return n;
}
function escapeTs(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}
function extractQuoted(chunk, key) {
  const idx = chunk.indexOf(key);
  if (idx === -1) return { value: "", open: -1, close: -1 };
  let i = idx + key.length;
  while (i < chunk.length && /\s/.test(chunk[i])) i++;
  if (chunk[i] !== '"') return { value: "", open: -1, close: -1 };
  const open = i;
  i++;
  let out = "";
  while (i < chunk.length) {
    if (chunk[i] === "\\") {
      out += unescapeTsChar(chunk[i + 1]);
      i += 2;
      continue;
    }
    if (chunk[i] === '"') break;
    out += chunk[i++];
  }
  return { value: out, open, close: i };
}
function replaceQuoted(chunk, key, newVal) {
  const found = extractQuoted(chunk, key);
  if (found.open < 0) return chunk;
  return chunk.slice(0, found.open + 1) + escapeTs(newVal) + chunk.slice(found.close);
}
function splitSections(body) {
  const parts = {};
  const re = /■ ([^\n]+)\n\n([\s\S]*?)(?=\n\n■ |\n\ninvestus\.kr|$)/g;
  let m;
  while ((m = re.exec(body))) parts[m[1]] = m[2].trim();
  return parts;
}
function joinSections(parts, isSummary) {
  const order = isSummary
    ? ["오늘의 큰 그림", "투자 시사점"]
    : ["무슨 일인가요", "조금만 더 알려드리면", "장기적으로 보면", "투자 시사점"];
  const out = [];
  for (const k of order) if (parts[k]) out.push(`■ ${k}\n\n${parts[k].trim()}`);
  out.push("investus.kr SRP 최고투자책임자 발행");
  return out.join("\n\n");
}

/** 섹션마다 아직 안 쓴 각도만. 숫자 반복·정의 반복 금지. */
const EXTRA = {
  "seed-1796": {
    invest: "동일가중 15배와 러셀 2000 23배는 대형 기술주 할증이 어디에 있는지를 보여 줍니다. 나스닥만 보지 말고 그 두 줄을 같이 적으면 됩니다.",
  },
  "seed-1809": {
    invest: "모델3·Y와 다른 모델 비중이 공시에 따로 적히면, 승용 믹스가 선을 어떻게 채웠는지가 보입니다.",
  },
  "seed-1772": {
    long: "지수가 오르는데 폭이 얇으면, 소수 대형주가 평균을 끌어 올린 날입니다. 여러 업종이 200일선 위로 돌아오는지가 건강입니다.",
  },
  "seed-1711": {
    invest: "설치 비용 20%와 트럭당 16기가 현장 사진·공사 일수와 같이 나오면, 공장 조립이 속도 이야기로 남습니다.",
  },
  "seed-1672": {
    invest: "대당 생산 주기 10분이 실제 출하 대수로 바뀌는지가 다음 확인입니다. 컨베이어가 돌아도 주문 잔고가 비면 양산 이야기는 얇습니다.",
  },
  "seed-1674": {
    invest: "테라팹 부지와 전력·용수 규모가 문서로 나오면 발언이 일정으로 내려옵니다. 지금은 실행력에 대한 평가입니다.",
  },
  "seed-1658": {
    invest: "유휴 GPU가 실제로 0에 가까운지, 신규 클러스터 인도 대기줄이 공시에 나오는지가 수요 과잉의 확인입니다.",
  },
  "seed-1660": {
    invest: "월 매출 목표가 스타링크·컴퓨팅·발사 중 어느 칸에서 채워지는지가 다음 표입니다. 합산만 보면 칸이 가려집니다.",
  },
  "seed-1665": {
    invest: "라스베이거스 유료 호출이 스트립 밖 주거지까지 넓어지는지, 대기 시간이 짧아지는지가 15번째 도시의 밀도 확인입니다.",
  },
  "seed-1667": {
    invest: "학습이 끝나고 강화학습 단계에 들어갔다는 다음 카드가 나오면 4.8이 일정으로 남습니다. 매개변수 숫자만으로는 출시가 아닙니다.",
  },
  "seed-1645": {
    what: "잠정 비중은 지수 편입 전에 운용사들이 미리 그려 보는 숫자입니다. 확정 공시가 나와야 펀드가 의무적으로 따라갑니다.",
  },
  "seed-1646": {
    what: "그리드용 배터리는 발전소처럼 전력망에 붙여 쓰는 대형 저장 장치입니다. 데이터센터 순간 부하를 받아 주는 완충 역할입니다.",
  },
  "seed-1584": {
    invest: "전비 6.1마일과 폭 69인치가 규제 서류와 같은 표에 남는지가 원가 가정의 바닥입니다. 보험 가정이 빠지면 마일당 원가가 다시 올라갑니다.",
  },
  "seed-1587": {
    invest: "부품 발주 금액과 입고 일정이 나오면 5,000대가 생산 달력으로 내려옵니다. 발주와 출고는 다른 단계입니다.",
  },
  "kr-seed-242": {
    invest: "외국인·기관이 하이닉스를 연휴 뒤에도 받치는지가 186만 원대 안착의 확인입니다. 고가 한 점은 종가가 아닙니다.",
  },
  "kr-seed-237": {
    invest: "종가가 장중 190만 원에 얼마나 가까운지가 되돌림의 두께입니다. 고가만 남기고 종가가 멀면 하루 반등으로 읽힙니다.",
  },
  "kr-seed-229": {
    long: "7,000선이 여러 날 종가로 남으면 연기금 한도와 외국인 패시브 흐름이 그 선을 기준으로 다시 잡힙니다. 하루 1.65%는 그 입구입니다.",
  },
  "kr-seed-206": {
    invest: "외국인 순매도가 5거래일에서 멈추는지, 국채금리와 유가가 같이 꺾이는지가 4일 연속 하락의 출구입니다.",
    long: "수출 대형주가 실적으로 버티면 금리·유가 헤드라인은 파동으로 남습니다. 코스피 자릿수는 그 실적 칸이 채웁니다.",
  },
  "kr-seed-188": {
    long: "고대역폭 메모리 공급이 부족한 해에는 하루 외국인 매도가 가격 눈높이를 바로 내리지 못합니다. 출하 코멘트가 그 바닥을 보여 줍니다.",
    invest: "일반 거래일에 외국인이 순매수로 돌아오는지, 삼성전자와 낙폭이 같이 가는지가 업종 날씨입니다.",
  },
  "safe-seed-222": {
    invest: "주간 펀드 6억 8,900만 달러가 다음 주에도 플러스인지가 2,700달러대 지지의 두께입니다.",
  },
  "safe-seed-215": {
    invest: "8만 6천 달러가 아시아 아침이 아니라 뉴욕 종가로도 남는지가 지지 확인입니다. 최고가와의 31% 거리는 별도 줄입니다.",
  },
  "safe-seed-217": {
    invest: "이더 현물 펀드가 비트보다 작은 가격 폭에도 유입을 이어가는지가 상대 강도의 확인입니다.",
  },
  "safe-seed-211": {
    what: "지난주 4,370~4,380달러 밴드는 며칠의 거래 구간입니다. 4,350달러는 그 아래 한 칸입니다.",
    invest: "10년 금리와 달러가 같이 내려오지 않는데도 4,350달러가 여러 날 남으면, 금리만으로 저점이 깨지진 않은 조정입니다.",
  },
  "safe-seed-212": {
    invest: "2,631달러에서 거래가 쌓이는지, 이더 펀드가 따라오는지가 지지 위의 다음 계단입니다.",
  },
  "safe-seed-205": {
    long: "중앙은행이 금을 계속 담는 해에는 4,370달러 밴드가 깨져도 중기 수요 바닥은 남습니다. 하루 밴드는 그 위의 온도입니다.",
  },
  "safe-seed-206": {
    long: "스테이킹과 네트워크 사용량이 늘면 0.02%짜리 하루는 잊히고, 이더 점유율 칸이 두꺼워집니다. 제도 자금이 알트로 넓어지는 그림입니다.",
  },
  "safe-seed-202": {
    invest: "주간 원유 재고와 중동 운송 뉴스가 같은 방향이면 101달러가 경유지인지가 더 분명해집니다.",
  },
  "safe-seed-171": {
    invest: "7만 9천 달러권이 주말 갭을 지나 월요일에도 남는지가 금요일 회복의 확인입니다. 현물 펀드 유출입은 그 옆줄입니다.",
  },
  "safe-seed-173": {
    invest: "장중 저가 2,433달러와 오후 2,613달러를 나란히 두면, 하루 7%가 얇은 반등인지 거래가 받친 회복인지가 보입니다.",
  },
  "safe-seed-174": {
    invest: "금 대비 은의 하루 낙폭이 줄어드는지가 산업 수요가 금리 충격을 받아 내는 속도입니다. 63달러대 지지는 그 첫 선입니다.",
  },
  "safe-seed-175": {
    invest: "경유 갤런당 6달러가 며칠 이어지는지가 물가 입력의 확인입니다. 원유 주간 10%와 하루 하락은 다른 줄입니다.",
  },
  "krre-seed-197": {
    long: "일자리가 지방으로 가면 학교·임대·상업이 따라가 주택 수요 지도가 바뀝니다. 이전 연도가 고시돼야 그 지도가 달력이 됩니다.",
  },
  "krre-seed-157": {
    invest: "압구정·대치 실거래가 호가를 밑도는 주가 늘어나는지가 5주 약세의 두께입니다. 재건축 추진 단지는 별도 줄로 적습니다.",
  },
  "krre-seed-158": {
    invest: "노원 전세 속도가 둔화되는지, 서초 4주 약세가 매물 증가로 설명되는지가 구별 키의 다음 확인입니다.",
  },
};

function addUnique(section, extra, whole) {
  if (!extra) return section;
  const existing = splitSentences(whole);
  const add = extra
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => !existing.some((s) => similarSentence(s, p)));
  if (!add.length) return section;
  return [section, ...add].filter(Boolean).join("\n\n");
}

function processFile(rel) {
  const file = path.join(ROOT, rel);
  const src = fs.readFileSync(file, "utf8");
  const marker = '\n  {\n    id: "';
  const parts = src.split(marker);
  let n = 0;
  const blocks = parts.slice(1).map((chunk) => {
    let block = marker + chunk;
    const id = chunk.match(/^([^"]+)"/)?.[1];
    const extra = id && EXTRA[id];
    if (!extra) return block;
    const subject = extractQuoted(block, "subject:").value;
    const pinned = /isPinned:\s*true/.test(block);
    const isSummary = pinned || subject === "한장요약";
    const bodyFound = extractQuoted(block, "body:");
    if (bodyFound.open < 0) return block;
    const secs = splitSections(bodyFound.value);
    const whole = bodyFound.value;
    if (extra.what) secs["무슨 일인가요"] = addUnique(secs["무슨 일인가요"], extra.what, whole);
    if (extra.more) secs["조금만 더 알려드리면"] = addUnique(secs["조금만 더 알려드리면"], extra.more, whole);
    if (extra.long) secs["장기적으로 보면"] = addUnique(secs["장기적으로 보면"], extra.long, whole);
    if (extra.invest) secs["투자 시사점"] = addUnique(secs["투자 시사점"], extra.invest, whole);
    const next = cleanBody(joinSections(secs, isSummary));
    if (next !== bodyFound.value) {
      block = replaceQuoted(block, "body:", next);
      n++;
    }
    return block;
  });
  const out = parts[0] + blocks.join("");
  if (out !== src) fs.writeFileSync(file, out);
  console.log(`${rel}: filled ${n}`);
}

for (const f of ["lib/reports.ts", "lib/reports-kr.ts", "lib/reports-safe.ts", "lib/reports-kr-re.ts"]) {
  processFile(f);
}
