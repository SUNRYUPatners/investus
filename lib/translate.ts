/**
 * Headline translation EN→KO.
 * Google free endpoint often returns 429 from cloud IPs — fall back to MyMemory.
 * Once Google rate-limits, skip it for 10 minutes. Cache successful translations in-process.
 */

let googleBlockedUntil = 0;
const cache = new Map<string, { text: string; at: number }>();
const CACHE_TTL = 60 * 60_000;

function cacheGet(key: string): string | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return hit.text;
}

function cacheSet(key: string, text: string) {
  cache.set(key, { text, at: Date.now() });
  if (cache.size > 500) {
    const first = cache.keys().next().value;
    if (first) cache.delete(first);
  }
}

async function translateViaGoogle(text: string, targetLang: string, sourceLang: string): Promise<string | null> {
  if (Date.now() < googleBlockedUntil) return null;
  const url =
    `https://translate.googleapis.com/translate_a/single` +
    `?client=gtx&sl=${encodeURIComponent(sourceLang)}&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(2_000),
    });
    if (res.status === 429 || res.status === 403) {
      googleBlockedUntil = Date.now() + 10 * 60_000;
      return null;
    }
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") ?? "";
    if (ct.includes("text/html")) {
      googleBlockedUntil = Date.now() + 10 * 60_000;
      return null;
    }
    const data = (await res.json()) as unknown[][];
    const translated = (data?.[0] as unknown[][] | undefined)
      ?.map((s) => (s as unknown[])?.[0] ?? "")
      .join("") ?? "";
    const out = translated.trim();
    return out || null;
  } catch {
    return null;
  }
}

async function translateViaMyMemory(text: string, targetLang: string, sourceLang: string): Promise<string | null> {
  const src = sourceLang === "auto" ? "en" : sourceLang;
  const url =
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(`${src}|${targetLang}`)}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6_000) });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      responseData?: { translatedText?: string };
      responseStatus?: number | string;
    };
    const status = Number(data.responseStatus);
    if (status && status !== 200) return null;
    const out = data.responseData?.translatedText?.trim() ?? "";
    if (!out || /MYMEMORY WARNING/i.test(out)) return null;
    return out;
  } catch {
    return null;
  }
}

export async function translateText(
  text: string,
  targetLang = "ko",
  sourceLang = "en",
): Promise<string> {
  if (!text.trim()) return text;
  const key = `${sourceLang}|${targetLang}|${text}`;
  const cached = cacheGet(key);
  if (cached) return cached;

  const g = await translateViaGoogle(text, targetLang, sourceLang);
  if (g) {
    cacheSet(key, g);
    return g;
  }
  const m = await translateViaMyMemory(text, targetLang, sourceLang);
  if (m) {
    cacheSet(key, m);
    return m;
  }
  return text;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Translate a batch with limited concurrency. */
export async function translateHeadlines(titles: string[]): Promise<string[]> {
  if (titles.length === 0) return [];
  const out = new Array<string>(titles.length);
  const CONCURRENCY = 3;
  let i = 0;

  async function worker() {
    while (i < titles.length) {
      const idx = i++;
      out[idx] = await translateText(titles[idx], "ko", "en");
      await sleep(80);
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, titles.length) }, () => worker()));
  return out;
}
