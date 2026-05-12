import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;
function getClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

/**
 * Batch-translate English news headlines to Korean using Claude Haiku.
 * Returns original titles if API key missing or on any error.
 */
export async function translateHeadlines(titles: string[]): Promise<string[]> {
  if (titles.length === 0) return [];
  const ai = getClient();
  if (!ai) return titles;

  try {
    const numbered = titles.map((t, i) => `${i + 1}. ${t}`).join("\n");
    const msg = await ai.messages.create({
      model:      "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content:
          `Translate these English financial news headlines to Korean. ` +
          `Return ONLY a JSON array of strings (same order, same count). No explanation.\n\n` +
          numbered,
      }],
    });

    const text = msg.content.find((b) => b.type === "text")?.text ?? "";
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return titles;
    const parsed: unknown = JSON.parse(match[0]);
    if (!Array.isArray(parsed) || parsed.length !== titles.length) return titles;
    return (parsed as unknown[]).map((s, i) =>
      typeof s === "string" && s.trim() ? s.trim() : titles[i]
    );
  } catch {
    return titles;
  }
}
