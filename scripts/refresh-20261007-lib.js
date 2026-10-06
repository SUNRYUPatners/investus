#!/usr/bin/env node
/** Replace Oct 7 title/summary/body in lib reports from padded data files. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20261007-us");
const { KR, SAFE, KR_RE } = require("./data-20261007-markets");

const ROOT = path.join(__dirname, "..");

function readJsonString(src, quoteIdx) {
  let i = quoteIdx + 1;
  while (i < src.length) {
    if (src[i] === "\\") {
      i += 2;
      continue;
    }
    if (src[i] === '"') return { end: i, raw: src.slice(quoteIdx, i + 1) };
    i++;
  }
  throw new Error("unterminated string at " + quoteIdx);
}

function replaceField(src, id, field, value) {
  const idTok = `id: "${id}"`;
  const idIdx = src.indexOf(idTok);
  if (idIdx < 0) throw new Error("missing " + id);
  const key = `${field}: `;
  const kIdx = src.indexOf(key, idIdx);
  if (kIdx < 0 || kIdx > idIdx + 800) throw new Error(id + " " + field);
  const q = src.indexOf('"', kIdx + key.length - 1);
  const cur = readJsonString(src, q);
  return src.slice(0, q) + JSON.stringify(value) + src.slice(cur.end + 1);
}

function patchFile(rel, rows) {
  let src = fs.readFileSync(path.join(ROOT, rel), "utf8");
  for (const r of rows) {
    src = replaceField(src, r.id, "summary", r.summary);
    src = replaceField(src, r.id, "body", r.body);
  }
  fs.writeFileSync(path.join(ROOT, rel), src);
  console.log(rel, rows.length, "updated");
}

patchFile("lib/reports.ts", US);
patchFile("lib/reports-kr.ts", KR);
patchFile("lib/reports-safe.ts", SAFE);
patchFile("lib/reports-kr-re.ts", KR_RE);
