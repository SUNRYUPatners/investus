#!/usr/bin/env node
/** Replace already-inserted 2026-09-29 report objects from data files. */
const fs = require("fs");
const path = require("path");
const { US } = require("./data-20260929-us");
const { KR, SAFE, KR_RE } = require("./data-20260929-markets");

const ROOT = path.join(__dirname, "..");
const BODY_EN = "See Korean body.\n\ninvestus.kr SRP Chief Investment Officer";

function tsBlock(r, date, updated, tag) {
  const img = `/charts/${r.slug}-${tag}.svg`;
  const imgEn = `/charts/${r.slug}-${tag}-en.svg`;
  const pinned = r.pinned || r.isPinned ? "\n    isPinned: true," : "";
  return `  {
    id: ${JSON.stringify(r.id)},
    title: ${JSON.stringify(r.title)},
    summary: ${JSON.stringify(r.summary)},
    body: ${JSON.stringify(r.body)},
    titleEn: ${JSON.stringify(r.titleEn || r.title)},
    summaryEn: ${JSON.stringify(r.summaryEn || r.summary)},
    bodyEn: ${JSON.stringify(BODY_EN)},
    category: ${JSON.stringify(r.category)},
    categoryColor: ${JSON.stringify(r.color)},
    subject: ${JSON.stringify(r.subject)},
    date: ${JSON.stringify(date)},
    updatedAt: ${JSON.stringify(updated)},${pinned}
    images: [${JSON.stringify(img)}],
    imagesEn: [${JSON.stringify(imgEn)}],
  }`;
}

function replaceReports(file, arr, date, updated, tag) {
  let c = fs.readFileSync(path.join(ROOT, file), "utf8");
  for (const r of arr) {
    const id = r.id;
    const startTok = `    id: ${JSON.stringify(id)}`;
    const idPos = c.indexOf(startTok);
    if (idPos === -1) throw new Error(`${file}: ${id} missing`);
    const start = c.lastIndexOf("  {", idPos);
    const after = c.indexOf("\n  {", idPos + 1);
    if (after === -1) throw new Error(`${file}: ${id} next object missing`);
    const block = tsBlock(r, date, updated, tag) + ",";
    c = c.slice(0, start) + block + c.slice(after);
  }
  fs.writeFileSync(path.join(ROOT, file), c);
  console.log(`${file}: patched ${arr[0].id}~${arr[arr.length - 1].id}`);
}

replaceReports("lib/reports.ts", US, "2026.09.29", "2026.09.29 08:12", "20260929");
replaceReports("lib/reports-kr.ts", KR, "2026-09-29", "2026.09.29 08:12", "20260929");
replaceReports("lib/reports-safe.ts", SAFE, "2026-09-29", "2026.09.29 08:12", "20260929");
replaceReports("lib/reports-kr-re.ts", KR_RE, "2026-09-29", "2026.09.29 08:12", "20260929");
