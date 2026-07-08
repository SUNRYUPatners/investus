/**
 * Free Google Translate endpoint — no API key required.
 * Translates a batch of English headlines to Korean in parallel.
 */
async function translateOne(text: string): Promise<string> {
  const url =
    `https://translate.googleapis.com/translate_a/single` +
    `?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(5_000) });
  if (!res.ok) return text;
  const data = await res.json() as unknown[][];
  // Response[0] is an array of [translated_chunk, original_chunk, ...]
  const translated = (data?.[0] as unknown[][] | undefined)
    ?.map((s) => (s as unknown[])?.[0] ?? "")
    .join("") ?? "";
  return translated.trim() || text;
}

export async function translateHeadlines(titles: string[]): Promise<string[]> {
  if (titles.length === 0) return [];
  try {
    return await Promise.all(titles.map(translateOne));
  } catch {
    return titles;
  }
}
