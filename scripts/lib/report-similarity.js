/** 리포트 본문 유사 문장·문단 판별. 검증기와 정리 스크립트가 같이 쓴다. */
const PARA_JACCARD = 0.38;
const SENT_JACCARD = 0.68;
const MIN_SENT = 10;

function charNgrams(s, n = 3) {
  const t = String(s).replace(/\s+/g, "");
  const g = new Set();
  if (t.length < n) {
    if (t) g.add(t);
    return g;
  }
  for (let i = 0; i <= t.length - n; i++) g.add(t.slice(i, i + n));
  return g;
}

function jaccard(a, b) {
  const A = charNgrams(a);
  const B = charNgrams(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter);
}

function normalize(s) {
  return String(s)
    .replace(/[“”‘’"'·…]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function numbers(s) {
  return String(s).match(/\d[\d,.]*/g) || [];
}

function significantNumbers(s) {
  const fromDigits = numbers(s).filter((n) => n.replace(/\D/g, "").length >= 3);
  const dates = String(s).match(/\d{1,2}월\s*\d{1,2}일/g) || [];
  return [...fromDigits, ...dates];
}

function splitSentences(p) {
  return String(p)
    .split(/(?<=다\.|요\.|니다\.|까\?|까\.|음\.|죠\.|니다\.)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= MIN_SENT);
}

function leadNoun(s) {
  const m = normalize(s).match(/^(.{2,16}?)(?:은|는|이|가)\s/);
  return m ? m[1] : "";
}

function uniqueCores(later, earlier) {
  const earlierN = normalize(earlier);
  return cores(later).filter((x) => !earlierN.includes(x));
}

function similarSentence(a, b) {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na || !nb) return false;
  if (na === nb) return true;
  if (na.length >= 18 && nb.includes(na)) return true;
  if (nb.length >= 18 && na.includes(nb)) return true;
  const j = jaccard(na, nb);
  if (j >= SENT_JACCARD) return true;
  const la = leadNoun(na);
  const lb = leadNoun(nb);
  if (la && la === lb && uniqueCores(nb, na).length < 3) return true;
  const numsA = new Set(significantNumbers(na));
  const numsB = new Set(significantNumbers(nb));
  let nInter = 0;
  for (const x of numsA) if (numsB.has(x)) nInter++;
  if (nInter >= 2 && j >= 0.30 && uniqueCores(nb, na).length < 3) return true;
  return false;
}

function similarPara(a, b) {
  if (similarSentence(a, b)) return true;
  const j = jaccard(a, b);
  if (j >= PARA_JACCARD) return true;
  const sa = splitSentences(a);
  const sb = splitSentences(b);
  let hits = 0;
  for (const x of sa) {
    for (const y of sb) {
      if (similarSentence(x, y)) hits++;
    }
  }
  if (hits >= 2) return true;
  if (hits >= 1 && Math.min(sa.length, sb.length) <= 2 && j >= 0.28) return true;
  return false;
}

const PAD_PREFIXES = [
  /^이 아침 추가로 적어 둘 배경입니다\.?\s*/,
  /^같은 주 숫자만 다시 정리하면\s*/,
  /^초보가 기억하면 좋은 한 줄은\s*[「"]?/,
];

function stripPadPrefix(s) {
  let t = s.trim();
  for (const re of PAD_PREFIXES) t = t.replace(re, "");
  return t.replace(/^[「"]|[」"]$/g, "").trim();
}

function cores(s) {
  return normalize(s)
    .replace(/입니다\.?|습니다\.?|했습니다\.?|됩니다\.?|아닙니다\.?/g, " ")
    .match(/[가-힣]{3,}|\d[\d,.]*[만천억조]?|\d{1,2}월|\d{1,2}일/g) || [];
}

function coveredBySeen(sentence, seenText) {
  if (sentence.length < 40 && /아닙니다/.test(sentence) && seenText.includes("아닙니다")) return true;
  if (/다른 줄입니다/.test(sentence) && seenText.includes("다른 줄입니다")) return true;
  const c = cores(sentence);
  if (c.length < 3) return false;
  const hit = c.filter((x) => seenText.includes(x)).length;
  if (hit / c.length >= 0.55) return true;
  const nums = significantNumbers(sentence);
  if (nums.length >= 1 && nums.every((n) => seenText.includes(n))) {
    const unique = c.filter((x) => !seenText.includes(x));
    if (unique.length <= 3) return true;
  }
  return false;
}

function cleanBody(body) {
  const rawParas = String(body)
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(stripPadPrefix)
    .filter(Boolean);

  const keptParas = [];
  const keptSents = [];
  let seenText = "";

  for (const p of rawParas) {
    if (p.startsWith("■ ")) {
      keptParas.push(p);
      continue;
    }
    if (p.startsWith("investus.kr")) continue;

    if (keptParas.some((k) => !k.startsWith("■ ") && similarPara(k, p))) continue;

    const sents = splitSentences(p);
    if (!sents.length) {
      if (p.length >= MIN_SENT) {
        keptParas.push(p);
        seenText += ` ${p}`;
      }
      continue;
    }
    const kept = [];
    for (const s of sents) {
      if (keptSents.some((k) => similarSentence(k, s))) continue;
      if (seenText.length > 80 && coveredBySeen(s, seenText)) continue;
      kept.push(s);
      keptSents.push(s);
    }
    if (!kept.length) continue;
    const next = kept.join(" ");
    if (keptParas.some((k) => !k.startsWith("■ ") && similarPara(k, next))) continue;
    keptParas.push(next);
    seenText += ` ${next}`;
  }

  let text = keptParas.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
  if (!text.includes("investus.kr SRP 최고투자책임자 발행")) {
    text += "\n\ninvestus.kr SRP 최고투자책임자 발행";
  }
  return text;
}

function findPairs(body) {
  const paras = String(body)
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith("■ ") && p.length >= 40 && !p.startsWith("investus.kr"));
  const pairs = [];
  for (let i = 0; i < paras.length; i++) {
    for (let j = i + 1; j < paras.length; j++) {
      if (similarPara(paras[i], paras[j])) {
        pairs.push({
          i,
          j,
          jaccard: Math.round(jaccard(paras[i], paras[j]) * 100),
          a: paras[i].slice(0, 48),
          b: paras[j].slice(0, 48),
        });
      }
    }
  }
  return pairs;
}

function findRepeatSentences(body) {
  const sents = [];
  for (const p of String(body).split(/\n\n+/)) {
    if (p.startsWith("■ ") || p.startsWith("investus.kr")) continue;
    sents.push(...splitSentences(p));
  }
  const hits = [];
  for (let i = 0; i < sents.length; i++) {
    for (let j = i + 1; j < sents.length; j++) {
      if (similarSentence(sents[i], sents[j])) {
        hits.push({ i, j, a: sents[i].slice(0, 40), b: sents[j].slice(0, 40) });
      }
    }
  }
  return hits;
}

module.exports = {
  PARA_JACCARD,
  SENT_JACCARD,
  jaccard,
  similarPara,
  similarSentence,
  splitSentences,
  cleanBody,
  findPairs,
  findRepeatSentences,
  stripPadPrefix,
  coveredBySeen,
};
