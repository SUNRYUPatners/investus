/**
 * 개별·한장요약 본문 헬퍼
 *
 * 2026-09-30~ 개별: what / more / house
 *   ■ 무슨 일인가요 → ■ 조금만 더 알려드리면 → ■ 기관·하우스 뷰
 * 2026-09-10~09-29 개별: what / more / longTerm / invest (구 4단)
 * 한장요약: summaryBody({ big, invest })
 *
 * 구 lib-*-bodies.js 의 detailBody(상세/왜/시나리오/흐름…) 템플릿 **금지**.
 *
 * 사용:
 *   const { detailBody, summaryBody } = require("./lib-report-bodies");
 *   detailBody({ what: "문단1\n\n문단2\n\n문단3", more: "...", house: "..." })
 */
const BK = "investus.kr SRP 최고투자책임자 발행";

/**
 * @param {{ what: string, more: string, house?: string, longTerm?: string, invest?: string }} x
 *   2026-09-30~: what / more / house — 각각 `\n\n`으로 문단 구분. what≥3문단, more≥2, house≥2.
 *   house가 있으면 3단. 없으면 구 4단(what/more/longTerm/invest).
 */
function detailBody(x) {
  if (x.house) {
    if (!x.what || !x.more) {
      throw new Error("detailBody: what, more, house 모두 필수");
    }
    return [
      `■ 무슨 일인가요\n\n${x.what.trim()}`,
      `■ 조금만 더 알려드리면\n\n${x.more.trim()}`,
      `■ 기관·하우스 뷰\n\n${x.house.trim()}`,
      BK,
    ].join("\n\n");
  }
  if (!x.what || !x.more || !x.longTerm || !x.invest) {
    throw new Error(
      "detailBody: 2026-09-30~ 는 what, more, house. 그 이전은 what, more, longTerm, invest.",
    );
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
