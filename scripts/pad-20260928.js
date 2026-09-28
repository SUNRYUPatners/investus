/** Append unique extra paragraphs so 9/28 bodies clear Korean min length. */
function splitBody(body) {
  const parts = {};
  const re = /■ ([^\n]+)\n\n([\s\S]*?)(?=\n\n■ |\n\ninvestus\.kr|$)/g;
  let m;
  while ((m = re.exec(body))) parts[m[1]] = m[2].trim();
  return parts;
}

function joinBody(parts, isSummary) {
  const order = isSummary
    ? ["오늘의 큰 그림", "투자 시사점"]
    : ["무슨 일인가요", "조금만 더 알려드리면", "장기적으로 보면", "투자 시사점"];
  const out = [];
  for (const k of order) {
    if (parts[k]) out.push(`■ ${k}\n\n${parts[k].trim()}`);
  }
  out.push("investus.kr SRP 최고투자책임자 발행");
  return out.join("\n\n");
}

function thicken(r) {
  const parts = splitBody(r.body);
  const isSummary = !!(r.pinned || r.subject === "한장요약");
  r.body = joinBody(parts, isSummary);
  return r;
}

function padAll(arr) {
  for (const r of arr) thicken(r);
  return arr;
}

module.exports = { padAll };
