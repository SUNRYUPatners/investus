/**
 * 네이버 금융 실시간 — 한국 주식/지수 라이브 시세
 * polling.finance.naver.com (목업 금지, 실호가만)
 */

export type NaverLiveQuote = {
  code: string;
  name?: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
};

type NaverItem = {
  cd: string;
  nm?: string;
  nv: number; // last
  cv: number; // change
  cr: number; // change %
  aq?: number; // volume
  pcv?: number;
};

function parseArea(json: unknown, areaName: string): NaverItem[] {
  const root = json as {
    result?: { areas?: { name: string; datas?: NaverItem[] }[] };
  };
  const area = root?.result?.areas?.find((a) => a.name === areaName);
  return area?.datas ?? [];
}

/** 종목코드 6자리 리스트 → 실시간 호가 */
export async function fetchNaverStockQuotes(codes: string[]): Promise<Map<string, NaverLiveQuote>> {
  const out = new Map<string, NaverLiveQuote>();
  if (codes.length === 0) return out;
  const cleaned = codes.map((c) => c.replace(/\.KS$/i, "").trim()).filter(Boolean);
  const q = `SERVICE_ITEM:${cleaned.join(",")}`;
  try {
    const res = await fetch(
      `https://polling.finance.naver.com/api/realtime?query=${encodeURIComponent(q)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "*/*",
          "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
          Referer: "https://finance.naver.com/",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) return out;
    const json = await res.json();
    for (const row of parseArea(json, "SERVICE_ITEM")) {
      if (!row?.cd || !(row.nv > 0)) continue;
      out.set(row.cd, {
        code: row.cd,
        name: row.nm,
        price: row.nv,
        change: row.cv,
        changePercent: row.cr,
        volume: row.aq ?? 0,
      });
      // also key as Yahoo-style
      out.set(`${row.cd}.KS`, out.get(row.cd)!);
    }
  } catch { /* ignore */ }
  return out;
}

/** 코스피/코스닥 지수 — 네이버는 지수×100으로 줌 */
export async function fetchNaverIndices(): Promise<Map<string, NaverLiveQuote>> {
  const out = new Map<string, NaverLiveQuote>();
  try {
    const res = await fetch(
      `https://polling.finance.naver.com/api/realtime?query=${encodeURIComponent("SERVICE_INDEX:KOSPI,KOSDAQ")}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "*/*",
          "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
          Referer: "https://finance.naver.com/",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) return out;
    const json = await res.json();
    for (const row of parseArea(json, "SERVICE_INDEX")) {
      if (!row?.cd || !(row.nv > 0)) continue;
      const price = row.nv / 100;
      const change = row.cv / 100;
      const q: NaverLiveQuote = {
        code: row.cd,
        price,
        change,
        changePercent: row.cr,
        volume: row.aq ?? 0,
      };
      out.set(row.cd, q);
      if (row.cd === "KOSPI") out.set("^KS11", q);
      if (row.cd === "KOSDAQ") out.set("^KQ11", q);
    }
  } catch { /* ignore */ }
  return out;
}
