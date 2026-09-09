/**
 * 개별·한장요약 본문 헬퍼 (2026-09-10~ 본문 리셋)
 *
 * 구 lib-*-bodies.js 의 detailBody(상세/왜/시나리오/흐름…) 템플릿 **금지**.
 * 초보가 「무슨 일 / 왜 / 뭘 보면 되나」에 답할 수 있게 문단으로 채울 것.
 *
 * 사용:
 *   const { detailBody, summaryBody } = require("./lib-report-bodies");
 *   detailBody({ what: "문단1\n\n문단2\n\n문단3", more: "...", longTerm: "...", invest: "..." })
 */
const BK = "investus.kr SRP 최고투자책임자 발행";

/**
 * @param {{ what: string, more: string, longTerm: string, invest: string }} x
 *   what / more / longTerm / invest — 각각 `\n\n`으로 문단 구분. what≥3문단, more≥2, long≥2, invest≥2.
 */
function detailBody(x) {
  if (!x.what || !x.more || !x.longTerm || !x.invest) {
    throw new Error("detailBody: what, more, longTerm, invest 모두 필수");
  }
  return [
    `■ 무슨 일인가요\n\n${x.what.trim()}`,
    `■ 조금만 더 알려드리면\n\n${x.more.trim()}`,
    `■ 장기적으로 보면\n\n${x.longTerm.trim()}`,
    `■ 투자 시사점\n\n${x.invest.trim()}`,
    BK,
  ].join("\n\n");
}

/**
 * @param {{ big: string, invest: string, forward?: string }} x
 *   big ≥3문단. forward는 선택(구체 일정 있을 때만).
 */
function summaryBody(x) {
  if (!x.big || !x.invest) {
    throw new Error("summaryBody: big, invest 필수");
  }
  const parts = [`■ 오늘의 큰 그림\n\n${x.big.trim()}`];
  if (x.forward && x.forward.trim()) {
    parts.push(`■ 앞으로 볼 것\n\n${x.forward.trim()}`);
  }
  parts.push(`■ 투자 시사점\n\n${x.invest.trim()}`, BK);
  return parts.join("\n\n");
}

module.exports = { detailBody, summaryBody, BK };
