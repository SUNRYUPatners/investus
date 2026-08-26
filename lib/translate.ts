/**
 * Headline translation EN→KO.
 * Google free endpoint is often 429 from cloud IPs — fall back to MyMemory.
 * Keep concurrency low so the fallback provider does not throttle.
 */

async function translateViaGoogle(text: string, targetLang: string, sourceLang: string): Promise<string | null> {
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
      signal: AbortSignal.timeout(4_000),
    });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") ?? "";
    if (ct.includes("text/html")) return null;
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
    const res = await fetch(url, { signal: AbortSignal.timeout(7_000) });
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
  const g = await translateViaGoogle(text, targetLang, sourceLang);
  if (g) return g;
  const m = await translateViaMyMemory(text, targetLang, sourceLang);
  if (m) return m;
  return text;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Translate a batch with low concurrency + small gap (provider-friendly). */
export async function translateHeadlines(titles: string[]): Promise<string[]> {
  if (titles.length === 0) return [];
  const out = new Array<string>(titles.length);
  const CONCURRENCY = 2;
  let i = 0;

  async function worker() {
    while (i < titles.length) {
      const idx = i++;
      out[idx] = await translateText(titles[idx], "ko", "en");
      await sleep(120);
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, titles.length) }, () => worker()));
  return out;
}
