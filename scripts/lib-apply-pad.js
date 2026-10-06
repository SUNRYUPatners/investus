const EXTRA1 = require("./pad-20261007-extra");
const EXTRA2 = require("./pad-20261007-extra2");
const EXTRA3 = require("./pad-20261007-tail");
const EXTRA = {};
for (const id of new Set([...Object.keys(EXTRA1), ...Object.keys(EXTRA2), ...Object.keys(EXTRA3)])) {
  EXTRA[id] = { ...EXTRA1[id], ...EXTRA2[id], ...EXTRA3[id] };
}

function applyPad(row) {
  const e = EXTRA[row.id];
  if (!e) return row;
  if (e.summary) row.summary = e.summary;
  if (e.replaceMore) {
    row.body = row.body.replace(
      /■ 조금만 더 알려드리면\n\n[\s\S]*?\n\n■ 기관·하우스 뷰/,
      `■ 조금만 더 알려드리면\n\n${e.replaceMore}\n\n■ 기관·하우스 뷰`,
    );
  }
  if (e.replaceHouse) {
    row.body = row.body.replace(
      /■ 기관·하우스 뷰\n\n[\s\S]*?\n\ninvestus\.kr SRP 최고투자책임자 발행/,
      `■ 기관·하우스 뷰\n\n${e.replaceHouse}\n\ninvestus.kr SRP 최고투자책임자 발행`,
    );
  } else if (e.houseInsert) {
    row.body = row.body.replace(
      /\n\ninvestus\.kr SRP 최고투자책임자 발행/,
      `\n\n${e.houseInsert}\n\ninvestus.kr SRP 최고투자책임자 발행`,
    );
  }
  if (e.houseTail) {
    row.body = row.body.replace(
      /\n\ninvestus\.kr SRP 최고투자책임자 발행/,
      `\n\n${e.houseTail}\n\ninvestus.kr SRP 최고투자책임자 발행`,
    );
  }
  if (e.investInsert) {
    row.body = row.body.replace(
      "■ 투자 시사점",
      `${e.investInsert}\n\n■ 투자 시사점`,
    );
  }
  return row;
}

function applyPadAll(arr) {
  arr.forEach(applyPad);
  return arr;
}

module.exports = { applyPad, applyPadAll };
