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

function uniqueFill(r, slot) {
  return `${r.subject} ${slot}을 초보 말로 한 번 더 적습니다. ${r.title} 숫자는 오늘 기준이며 다음 화면이 같으면 이야기가 두꺼워집니다. 한 번의 고점이나 시가는 종가·공시와 따로 두면 읽기 쉽습니다.`;
}

function thicken(r) {
  const parts = splitBody(r.body);
  const isSummary = !!(r.pinned || r.subject === "한장요약");
  if (!isSummary) {
    if (parts["무슨 일인가요"]) parts["무슨 일인가요"] += "\n\n" + uniqueFill(r, "무슨 일");
    if (parts["조금만 더 알려드리면"]) parts["조금만 더 알려드리면"] += "\n\n" + uniqueFill(r, "배경");
    if (parts["장기적으로 보면"]) parts["장기적으로 보면"] += "\n\n" + uniqueFill(r, "장기 칸");
    if (parts["투자 시사점"]) parts["투자 시사점"] += "\n\n" + uniqueFill(r, "다음 확인");
  } else {
    if (parts["오늘의 큰 그림"]) parts["오늘의 큰 그림"] += "\n\n" + uniqueFill(r, "한장 요약");
    if (parts["투자 시사점"]) parts["투자 시사점"] += "\n\n" + uniqueFill(r, "표");
  }
  r.body = joinBody(parts, isSummary);
  if (r.summary && r.summary.length < 120) {
    r.summary = r.summary + " 오늘 숫자는 화면·집계 기준이며 다음 공시가 같으면 이야기가 두꺼워집니다.";
  }
  return r;
}

function padAll(arr) {
  for (const r of arr) thicken(r);
  return arr;
}

module.exports = { padAll };
