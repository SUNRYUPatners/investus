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
  /** Naver ms: PREOPEN | OPEN | CLOSE | ... */
  marketStatus?: string;
};

type NaverItem = {
  cd: string;
  nm?: string;
  nv: number; // last
  sv?: number; // previous close
  cv: number; // change (absolute magnitude)
  cr: number; // change % (absolute for stocks; signed for indices)
  rf?: string; // 1=상한 2=상승 3=보합 4=하한 5=하락
  aq?: number; // volume
  pcv?: number;
  ms?: string; // PREOPEN | OPEN | CLOSE
};

/** 종목 SERVICE_ITEM: cv·cr는 절댓값만 오고 rf(또는 nv vs sv)로 방향 판별 */
function signedStockChange(row: NaverItem): number {
  const cv = Math.abs(row.cv ?? 0);
  if (cv === 0) return 0;
  if (row.rf === "5" || row.rf === "4") return -cv;
  if (row.rf === "2" || row.rf === "1") return cv;
  if (row.rf === "3") return 0;
  if (row.sv != null && row.sv > 0) return row.nv >= row.sv ? cv : -cv;
  return row.cv;
}

function signedStockChangePercent(row: NaverItem): number {
  const cr = Math.abs(row.cr ?? 0);
  if (cr === 0) return 0;
  if (row.rf === "5" || row.rf === "4") return -cr;
  if (row.rf === "2" || row.rf === "1") return cr;
  if (row.rf === "3") return 0;
  if (row.sv != null && row.sv > 0) return row.nv >= row.sv ? cr : -cr;
  return row.cr;
}

type NaverMobileDay = {
  localTradedAt?: string;
  closePrice?: string;
  compareToPreviousClosePrice?: string;
  compareToPreviousPrice?: { code?: string };
  fluctuationsRatio?: string;
  accumulatedTradingVolume?: number;
};

function parseKrPrice(s: string | undefined): number {
  if (!s) return 0;
  return Number(s.replace(/,/g, "")) || 0;
}

function signedFromMobile(row: NaverMobileDay): number {
  const raw = parseKrPrice(row.compareToPreviousClosePrice);
  if (raw === 0) return 0;
  const code = row.compareToPreviousPrice?.code;
  if (code === "5" || code === "4") return -Math.abs(raw);
  if (code === "2" || code === "1") return Math.abs(raw);
  return raw;
}

/** 장 시작 전(PREOPEN): polling cr=0 → 전일 완료 세션 등락률 */
async function fetchNaverMobilePrevDay(code: string): Promise<Pick<NaverLiveQuote, "change" | "changePercent"> | null> {
  const row = await fetchNaverMobileDayRow(
    `https://m.stock.naver.com/api/stock/${encodeURIComponent(code)}/price?pageSize=3&page=1`,
  );
  if (!row) return null;

  const changePercent = parseFloat(row.fluctuationsRatio ?? "0");
  if (!Number.isFinite(changePercent)) return null;

  return {
    change: signedFromMobile(row),
    changePercent,
  };
}

/** 지수 — PREOPEN 시 전일 종가·등락 (모바일 0번 = 최근 완료 거래일) */
async function fetchNaverMobileIndexEod(
  indexCode: "KOSPI" | "KOSDAQ",
): Promise<NaverLiveQuote | null> {
  const row = await fetchNaverMobileDayRow(
    `https://m.stock.naver.com/api/index/${indexCode}/price?pageSize=2&page=1`,
  );
  if (!row) return null;

  const price = parseKrPrice(row.closePrice);
  const changePercent = parseFloat(row.fluctuationsRatio ?? "0");
  if (!(price > 0) || !Number.isFinite(changePercent)) return null;

  return {
    code: indexCode,
    price,
    change: signedFromMobile(row),
    changePercent,
    volume: 0,
    marketStatus: "PREOPEN",
  };
}

async function fetchNaverMobileDayRow(url: string): Promise<NaverMobileDay | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/json",
        Referer: "https://m.stock.naver.com/",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as NaverMobileDay[];
    if (!Array.isArray(rows) || rows.length === 0) return null;

    const today = rows[0];
    const todayPct = Math.abs(parseFloat(today?.fluctuationsRatio ?? "0"));
    const todayVol = today?.accumulatedTradingVolume ?? 0;
    const prev = rows[1];
    const prevVol = prev?.accumulatedTradingVolume ?? 0;

    const usePrev =
      prev &&
      (todayPct === 0 ||
        (prevVol > 0 && todayVol > 0 && todayVol < prevVol * 0.08));

    return usePrev ? prev : today;
  } catch {
    return null;
  }
}

async function enrichPreopenFromMobile(
  out: Map<string, NaverLiveQuote>,
  codes: string[],
): Promise<void> {
  const preopen = [...out.values()].some((q) => q.marketStatus === "PREOPEN");
  if (!preopen) return;

  const needFix = codes.filter((c) => {
    const key = c.replace(/\.KS$/i, "");
    const q = out.get(key) ?? out.get(`${key}.KS`);
    return q && q.changePercent === 0;
  });
  if (needFix.length === 0) return;

  const CHUNK = 8;
  for (let i = 0; i < needFix.length; i += CHUNK) {
    const chunk = needFix.slice(i, i + CHUNK);
    const results = await Promise.all(
      chunk.map(async (code) => {
        const key = code.replace(/\.KS$/i, "");
        const prev = await fetchNaverMobilePrevDay(key);
        return { key, prev };
      }),
    );
    for (const { key, prev } of results) {
      if (!prev) continue;
      const existing = out.get(key) ?? out.get(`${key}.KS`);
      if (!existing) continue;
      const updated: NaverLiveQuote = {
        ...existing,
        change: prev.change,
        changePercent: prev.changePercent,
      };
      out.set(key, updated);
      out.set(`${key}.KS`, updated);
    }
    if (i + CHUNK < needFix.length) {
      await new Promise<void>((r) => setTimeout(r, 80));
    }
  }
}

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
        change: signedStockChange(row),
        changePercent: signedStockChangePercent(row),
        volume: row.aq ?? 0,
        marketStatus: row.ms,
      });
      // also key as Yahoo-style
      out.set(`${row.cd}.KS`, out.get(row.cd)!);
    }
    await enrichPreopenFromMobile(out, cleaned);
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
        marketStatus: row.ms,
      };
      out.set(row.cd, q);
      if (row.cd === "KOSPI") out.set("^KS11", q);
      if (row.cd === "KOSDAQ") out.set("^KQ11", q);
    }

    const preopen = [...out.values()].some((q) => q.marketStatus === "PREOPEN");
    if (preopen) {
      const [kospiEod, kosdaqEod] = await Promise.all([
        fetchNaverMobileIndexEod("KOSPI"),
        fetchNaverMobileIndexEod("KOSDAQ"),
      ]);
      if (kospiEod) {
        out.set("KOSPI", kospiEod);
        out.set("^KS11", kospiEod);
      }
      if (kosdaqEod) {
        out.set("KOSDAQ", kosdaqEod);
        out.set("^KQ11", kosdaqEod);
      }
    }
  } catch { /* ignore */ }
  return out;
}
