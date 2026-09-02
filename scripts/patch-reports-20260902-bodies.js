#!/usr/bin/env node
/**
 * 9/2 US 리포트 본문 플레이스홀더 제거 + 섹션 분리
 * - detail ← detailPs (사실·용어 설명만)
 * - longTerm / forward / invest / scenario ← fix-reports-20260902-ko-body-sections.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const REPORTS_PATH = path.join(__dirname, "fix-reports-20260902-ko-reports.js");
const SECTIONS = require("./fix-reports-20260902-ko-body-sections.js");

const BOILER =
  /장기 투자자는 단기 헤드라인과 분기 실적·실행 지표를 분리해 기록하시면 변동성에 흔들리지 않습니다\. 다음 분기 가이던스·규제 공시·수주 일정이 나오면 서사를 검증할 수 있습니다\. 숫자가 확인되기 전에는 「발표」와 「실행」을 구분해 추적하시기 바랍니다\./g;

function stripBoiler(text) {
  return String(text)
    .replace(BOILER, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function patchReport(r) {
  if (Array.isArray(r.detailPs) && r.detailPs.length) {
    r.detail = r.detailPs.join("\n\n");
  } else {
    r.detail = stripBoiler(r.detail);
  }

  const sec = SECTIONS[r.id];
  if (!sec) {
    throw new Error(`missing body sections for ${r.id}`);
  }
  r.longTerm = sec.longTerm;
  r.forward = sec.forward;
  r.invest = sec.invest;
  r.scenario = sec.scenario;

  if (BOILER.test(r.detail) || BOILER.test(r.longTerm) || BOILER.test(r.invest)) {
    throw new Error(`boilerplate still present in ${r.id}`);
  }
}

function jsString(s) {
  return JSON.stringify(s);
}

function serializeReport(r) {
  const lines = [
    "  {",
    `    id: ${jsString(r.id)},`,
    `    slug: ${jsString(r.slug)},`,
    `    category: ${jsString(r.category)},`,
    `    color: ${jsString(r.color)},`,
    `    subject: ${jsString(r.subject)},`,
    `    title: ${jsString(r.title)},`,
    `    summary: ${jsString(r.summary)},`,
    `    titleEn: ${jsString(r.titleEn)},`,
    `    summaryEn: ${jsString(r.summaryEn)},`,
    `    detailPs: [${r.detailPs.map((p) => jsString(p)).join(",")}],`,
    `    whyPoints: [${r.whyPoints.map((p) => jsString(p)).join(",")}],`,
    `    flow: ${jsString(r.flow)},`,
    `    detail: ${jsString(r.detail)},`,
    `    why: ${jsString(r.why)},`,
    `    scenario: ${jsString(r.scenario)},`,
    `    longTerm: ${jsString(r.longTerm)},`,
    `    forward: ${jsString(r.forward)},`,
    `    invest: ${jsString(r.invest)},`,
    "  }",
  ];
  return lines.join("\n");
}

function main() {
  const REPORTS = require("./fix-reports-20260902-ko-reports.js");
  for (const r of REPORTS) patchReport(r);

  const header =
    "// seed-1446 ~ seed-1459 — required by fix-reports-20260902-ko.js\nmodule.exports = [\n";
  const body = REPORTS.map(serializeReport).join(",\n");
  const footer = "\n];\n";

  fs.writeFileSync(REPORTS_PATH, header + body + footer);
  console.log(`patched ${REPORTS.length} reports in fix-reports-20260902-ko-reports.js`);

  require("./replace-reports-20260902-content.js").replaceReportsBlock();
  console.log("lib/reports.ts updated (seed-1446~1459)");
}

if (require.main === module) main();

module.exports = { patchReport, stripBoiler, BOILER };
