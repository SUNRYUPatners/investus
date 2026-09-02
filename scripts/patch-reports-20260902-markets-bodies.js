#!/usr/bin/env node
/**
 * 9/2 KR · Safe · KR-RE 리포트 본문 플레이스홀더 제거 + 섹션 분리 + Safe 가격 정정
 */
const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "topics-20260902-kr-markets-data.js");
const SECTIONS = require("./fix-reports-20260902-ko-markets-body-sections.js");

const BOILER_KR =
  /장기 투자자는 단기 수급과 분기 실적·정책 일정을 분리해 기록하시기 바랍니다\./g;

const SUMMARY_FILLER =
  / 코스피 약 6,875·외국인 약 890억 순매수·FOMC 9\/15~16 변수입니다\.( 코스피 약 6,875·외국인 약 890억 순매수·FOMC 9\/15~16 변수입니다\.)*/g;

const TEXT_FIELDS = [
  "summary",
  "summaryBody",
  "detail",
  "why",
  "scenario",
  "flow",
  "longTerm",
  "forward",
  "invest",
  "title",
];

function stripBoiler(text) {
  return String(text)
    .replace(BOILER_KR, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanSummary(text) {
  return stripBoiler(String(text).replace(SUMMARY_FILLER, "").trim());
}

function fixSafePrices(text) {
  return String(text)
    .replace(/79,?500달러/g, "108,248달러")
    .replace(/79\.5K/g, "108K")
    .replace(/~79\.5K/g, "~108K")
    .replace(/2,?520달러/g, "3,475달러")
    .replace(/~2520/g, "~3475")
    .replace(/2500달러/g, "3,450달러")
    .replace(/108K\(9\/1\)→~79\.5K\(9\/2\)/g, "9/2 ~108K·공포탐욕 44")
    .replace(/~108K\(9\/1\)→~79\.5K\(9\/2\) 재가격/g, "9/2 ~108K·DXY ~98.2")
    .replace(
      /비트코인 약 79,500달러는 9\/1 10\.8만 달러대 대비 조정 구간에서 재가격된 가격대입니다/,
      "비트코인 약 108,248달러는 10.8만 달러 심리선 부근입니다. 공포·탐욕 지수 44(1주 전 56)와 FOMC 9/15~16이 겹칩니다",
    );
}

function patchReport(r) {
  if (r.id.startsWith("safe-")) {
    for (const k of TEXT_FIELDS) {
      if (r[k]) r[k] = fixSafePrices(r[k]);
    }
  }

  for (const k of ["detail", "summaryBody", "why", "flow"]) {
    if (r[k]) r[k] = stripBoiler(r[k]);
  }
  if (r.summary) r.summary = cleanSummary(r.summary);

  const sec = SECTIONS[r.id];
  if (!sec) throw new Error(`missing sections for ${r.id}`);

  if (r.type === "summary") {
    if (sec.summaryTail) {
      r.summaryBody = stripBoiler(r.summaryBody);
      if (!r.summaryBody.endsWith(sec.summaryTail.slice(0, 20))) {
        r.summaryBody = `${r.summaryBody}\n\n${sec.summaryTail}`;
      }
    } else {
      r.summaryBody = stripBoiler(r.summaryBody);
    }
    r.forward = sec.forward;
    r.invest = sec.invest;
  } else {
    r.longTerm = sec.longTerm;
    r.forward = sec.forward;
    r.invest = sec.invest;
    if (sec.scenario) r.scenario = sec.scenario;
  }

  const hay = JSON.stringify(r);
  if (BOILER_KR.test(hay)) {
    throw new Error(`boilerplate remains in ${r.id}`);
  }
}

function serializeData(data) {
  return `/** 2026-09-02 KR / Safe / KR-RE report Korean content */\nmodule.exports = ${JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, "$1:")};\n`;
}

function main() {
  const data = require("./topics-20260902-kr-markets-data.js");
  for (const key of ["KR", "SAFE", "KRRE"]) {
    for (const r of data[key]) patchReport(r);
  }

  fs.writeFileSync(DATA_PATH, serializeData(data));
  console.log("patched topics-20260902-kr-markets-data.js");

  require("./fix-reports-20260902-ko-markets.js");
  console.log("regenerated lib/reports-kr.ts, reports-safe.ts, reports-kr-re.ts");
}

if (require.main === module) main();

module.exports = { stripBoiler, patchReport, BOILER_KR };
