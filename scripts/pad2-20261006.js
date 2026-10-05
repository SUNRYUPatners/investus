#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

function extractField(src, id, key) {
  const idx = src.indexOf(`id: "${id}"`);
  const start = src.lastIndexOf("  {", idx);
  const next = src.indexOf("\n  },", idx);
  const block = src.slice(start, next + 5);
  const keyIdx = block.indexOf(`    ${key}: `);
  let i = keyIdx + (`    ${key}: `).length + 1;
  let out = "";
  while (i < block.length) {
    if (block[i] === "\\") {
      const n = block[i + 1];
      out += n === "n" ? "\n" : n === "t" ? "\t" : n === '"' ? '"' : n === "\\" ? "\\" : n;
      i += 2;
      continue;
    }
    if (block[i] === '"') break;
    out += block[i++];
  }
  return { start, next, body: out, src };
}

function setField(src, id, key, value) {
  const idx = src.indexOf(`id: "${id}"`);
  const start = src.lastIndexOf("  {", idx);
  const next = src.indexOf("\n  },", idx);
  let block = src.slice(start, next + 5);
  const keyIdx = block.indexOf(`    ${key}: `);
  let i = keyIdx + (`    ${key}: `).length;
  i++;
  while (i < block.length) {
    if (block[i] === "\\") { i += 2; continue; }
    if (block[i] === '"') break;
    i++;
  }
  block = block.slice(0, keyIdx) + `    ${key}: ${JSON.stringify(value)},` + block.slice(i + 2);
  return src.slice(0, start) + block + src.slice(next + 5);
}

const FILE_OF = (id) =>
  id.startsWith("krre-") ? "lib/reports-kr-re.ts" :
  id.startsWith("kr-") ? "lib/reports-kr.ts" :
  id.startsWith("safe-") ? "lib/reports-safe.ts" :
  "lib/reports.ts";

const FIX = {
  "seed-1894": (b) => b.replace(
    "인가 대수가 늘어도 호출이 따라오지 않으면 주차장의 차일 뿐입니다. 주마다 무인 마일이 늘어난다는 문장은 그 간격을 좁히는 칸입니다. 규제 한 건이 운영을 닫을 수 있어 안전 막대를 먼저 올리는 전략입니다.",
    "호출 완료 건수가 인가를 따라오는지가 현장의 다음 확인입니다. 안전 막대를 먼저 올리는 전략은 규제 한 건이 운영을 닫을 수 있어서입니다.",
  ),
  "seed-1897": (b) => b + "\n\n스토어 아이콘이 먼저 깔리는 주는 출범 공고를 기다리는 줄이 생긴다는 뜻입니다.",
  "seed-1899": (b) => b
    .replace("유럽 큰 나라 등록이 살아나면 지역 믹스 가정이 밝아집니다. 하우스 목표 주가는 그 믹스 위에 있습니다.", "지역 믹스가 밝아지면 인도 해석의 각도가 달라집니다. 하우스 목표 주가는 그 각도 위에 있습니다.")
    .replace("유럽 큰 나라 등록이 살아나면 3분기 인도 해석이 밝아집니다.", "큰 나라 번호판이 살아난 달은 분기 인도를 다시 읽는 힌트입니다.") +
    "\n\n보조금이 줄어도 차체가 등록을 끌어올리는지 보는 칸이 남습니다.",
  "seed-1900": (b) => b + "\n\n회사가 구독 칸을 실적에서 따로 말하는지 가 다음 확인입니다.",
  "seed-1902": (b) => b.replace(
    "연료 가격이 높았던 상반기가 그 이동을 밀었습니다.",
    "기름값이 높았던 반기가 그 이동을 도왔습니다.",
  ),
  "seed-1904": (b) => b + "\n\n의사록이 물가 문장을 강조하면 그 이정표의 온도가 달라집니다.",
  "seed-1906": (b) => b + "\n\n공급 부족이 꺾이는 분기가 이 기울기의 시험입니다. 카드와 공시를 한 칸으로 부르지 않습니다.",
  "seed-1907": (b) => b + "\n\n4분기 가이던스가 그 가속의 지속을 말합니다.",
  "seed-1908": (b) => b + "\n\n양해각서가 나와도 수율까지는 해가 걸립니다.",
  "seed-1910": (b) => b + " 위원회 허가가 다음 달력입니다.",
  "seed-1912": (b) => b
    .replace("오픈웨이트 고객이 붙으면 네오클라우드 매출의 주소가 넓어집니다.", "국내 랩이 조달 이야기를 쉽게 만들면 클라우드 칸의 주소가 넓어집니다.")
    .replace("오픈웨이트 고객이 붙으면 외부 매출 전망이 넓어집니다. 목표 주가는 그 고객 칸을 열어 둡니다.", "조달과 규제가 쉬워지면 외부 매출 전망이 넓어집니다. 목표 주가는 그 칸을 열어 둡니다.") +
    "\n\n모델이 쓸모 있을 때 연산 계약이 매출이 됩니다.",
  "seed-1913": (b) => b + "\n\n채용 공고가 몇 달 이어지면 양산 의지가 숫자로 읽힙니다.",
  "kr-seed-273": (b) => b + "\n\n자회사가 쉬면 지주도 같이 쉽니다. 할인율이 줄어드는 주가 지주의 탄력입니다.",
  "kr-seed-274": (b) => b + "\n\n유럽 공장 가동률 뉴스가 나오면 그 칸을 따로 올립니다. 하루 탄력은 업종 온기일 수 있습니다.",
  "safe-seed-249": (b) => b.replace(
    "인덱스 자리와 원·달러를 한 퍼센트로 나누지 않습니다.",
    "서울 환율은 수급이 더해져 인덱스와 각도가 달라집니다.",
  ),
  "safe-seed-250": (b) => b.replace(
    "인상 확률과 금리를 한 목표로 만들지 않습니다.",
    "회의 표와 장기물은 도구가 다릅니다.",
  ),
  "krre-seed-217": (b) => b.replace(
    "인허가와 입주를 한 단계로 부르지 않습니다.",
    "허가 증가와 실제 입주는 해가 다른 칸입니다.",
  ),
};

const files = {};
for (const id of Object.keys(FIX)) {
  const f = FILE_OF(id);
  files[f] = files[f] || fs.readFileSync(path.join(ROOT, f), "utf8");
  const { body } = extractField(files[f], id, "body");
  const next = FIX[id](body);
  files[f] = setField(files[f], id, "body", next);
  console.log(id, next.replace(/\s+/g, "").length);
}
for (const [f, src] of Object.entries(files)) {
  fs.writeFileSync(path.join(ROOT, f), src);
}
console.log("pad2 done");
