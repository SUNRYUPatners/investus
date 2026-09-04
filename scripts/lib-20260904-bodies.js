/** Unique Korean bodies for 2026-09-04 reports */
const BK = "investus.kr SRP 최고투자책임자 발행";

function why(items) {
  return items.map((t, i) => `${i + 1}. ${t}`).join("\n\n");
}

function detailBody(x) {
  const paras = [x.p1, x.p2, x.p3, x.p4].filter(Boolean).join("\n\n");
  return [
    `■ 상세\n\n${paras}`,
    `■ 왜 이 뉴스가 중요한가\n\n${why(x.why)}`,
    `■ 시나리오\n\n**가: ${x.sa}**\n**나: ${x.sb}**\n**다: ${x.sc}**`,
    `■ 오늘까지 흐름\n\n${x.flow}`,
    `■ 장기 투자 관점\n\n${x.longTerm}`,
    `■ 앞으로 볼 것\n\n${x.forward}`,
    `■ 투자시사점\n\n${x.invest}`,
    BK,
  ].join("\n\n");
}

function summaryBody(x) {
  return `■ 오늘의 큰 그림\n\n${x.big}\n\n■ 앞으로 볼 것\n\n${x.forward}\n\n■ 투자시사점\n\n${x.invest}\n\n${BK}`;
}

module.exports = { detailBody, summaryBody, BK, why };
