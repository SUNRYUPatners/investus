/**
 * SEC EDGAR 13F-HR 자동 수집.
 * - data.sec.gov submissions → 최신 13F-HR
 * - 제출 txt / infoTable XML 파싱
 * - CUSIP → ticker (OpenFIGI + 로컬 캐시)
 */
import { kvGetDetail, kvSetDetailEx } from "@/lib/kv";
import { getAdminSupabase } from "@/lib/supabase";
import type { Guru, Holding } from "@/lib/holdings13f";
import { GURUS as SEED_GURUS } from "@/lib/holdings13f";

const SEC_UA = "InvestusBot contact@investus.kr";
const KV_HOLDINGS_KEY = "guru-holdings:v1";
const KV_CUSIP_KEY = "cusip-ticker:v1";
/** 13F는 분기 단위 — 6개월 TTL (다음 공시까지 충분히 유지) */
const HOLDINGS_TTL = 180 * 24 * 60 * 60;
const CUSIP_TTL = 365 * 24 * 60 * 60;
const TOP_N = 15;

export type GuruFilerMeta = {
  id: string;
  cik: string;
  topN?: number;
};

/** 자동 갱신 대상 (STOCK Act 등은 시드 유지) */
export const AUTO_13F_FILERS: GuruFilerMeta[] = [
  { id: "berkshire",     cik: "0001067983" },
  { id: "ark",           cik: "0001697748" },
  { id: "baron",         cik: "0001017918" },
  { id: "ackman",        cik: "0001336528", topN: 12 },
  { id: "druckenmiller", cik: "0001536411" },
];

type RawPos = { name: string; title: string; cusip: string; value: number; shares: number };

type FilingMeta = {
  accession: string;
  filingDate: string;
  reportDate: string;
  filerName: string;
};

type HoldingsPayload = {
  gurus: Guru[];
  accessions: Record<string, string>;
  updatedAt: number;
  source: string;
};

const STORAGE_BUCKET = "guru-cache";
const STORAGE_OBJECT = "holdings-v1.json";

async function saveHoldingsPayload(payload: HoldingsPayload): Promise<boolean> {
  // 1) Supabase Storage (prod-ready — no Upstash / Edge Config write token needed)
  try {
    const sb = getAdminSupabase();
    const bytes = Buffer.from(JSON.stringify(payload), "utf8");
    const { error } = await sb.storage
      .from(STORAGE_BUCKET)
      .upload(STORAGE_OBJECT, bytes, {
        contentType: "application/json",
        upsert: true,
      });
    if (!error) return true;
  } catch { /* fall through */ }

  // 2) Supabase app_kv table (if migration applied)
  try {
    const sb = getAdminSupabase();
    const { error } = await sb.from("app_kv").upsert({
      key: KV_HOLDINGS_KEY,
      value: payload,
      updated_at: new Date().toISOString(),
    });
    if (!error) return true;
  } catch { /* fall through */ }

  // 3) Redis / Edge Config fallback
  return kvSetDetailEx(KV_HOLDINGS_KEY, payload as unknown as Record<string, unknown>, HOLDINGS_TTL);
}

async function loadHoldingsPayload(): Promise<HoldingsPayload | null> {
  try {
    const sb = getAdminSupabase();
    const { data, error } = await sb.storage.from(STORAGE_BUCKET).download(STORAGE_OBJECT);
    if (!error && data) {
      const text = await data.text();
      const parsed = JSON.parse(text) as HoldingsPayload;
      if (parsed?.gurus && Array.isArray(parsed.gurus)) return parsed;
    }
  } catch { /* fall through */ }

  try {
    const sb = getAdminSupabase();
    const { data, error } = await sb
      .from("app_kv")
      .select("value")
      .eq("key", KV_HOLDINGS_KEY)
      .maybeSingle();
    if (!error && data?.value && typeof data.value === "object") {
      return data.value as HoldingsPayload;
    }
  } catch { /* fall through */ }

  const raw = await kvGetDetail(KV_HOLDINGS_KEY);
  if (raw && typeof raw === "object" && Array.isArray((raw as HoldingsPayload).gurus)) {
    return raw as unknown as HoldingsPayload;
  }
  return null;
}

async function secFetch(url: string): Promise<Response> {
  return fetch(url, {
    headers: { "User-Agent": SEC_UA, Accept: "application/json, text/plain, */*" },
    cache: "no-store",
  });
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function latest13F(cik: string): Promise<FilingMeta | null> {
  const cik10 = cik.padStart(10, "0");
  const res = await secFetch(`https://data.sec.gov/submissions/CIK${cik10}.json`);
  if (!res.ok) throw new Error(`submissions ${cik}: HTTP ${res.status}`);
  const d = (await res.json()) as {
    name?: string;
    filings: {
      recent: {
        form: string[];
        filingDate: string[];
        reportDate: string[];
        accessionNumber: string[];
      };
    };
  };
  const r = d.filings.recent;
  for (let i = 0; i < r.form.length; i++) {
    if (r.form[i] === "13F-HR" || r.form[i] === "13F-HR/A") {
      return {
        accession: r.accessionNumber[i],
        filingDate: r.filingDate[i],
        reportDate: r.reportDate[i],
        filerName: d.name ?? cik,
      };
    }
  }
  return null;
}

function parseInfoTableXml(xml: string): RawPos[] {
  const rows: RawPos[] = [];
  const re =
    /<nameOfIssuer>(.*?)<\/nameOfIssuer>\s*<titleOfClass>(.*?)<\/titleOfClass>\s*<cusip>(.*?)<\/cusip>[\s\S]*?<value>(\d+)<\/value>\s*<shrsOrPrnAmt>\s*<sshPrnamt>(\d+)<\/sshPrnamt>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    rows.push({
      name: decodeXml(m[1]).trim(),
      title: decodeXml(m[2]).trim(),
      cusip: m[3].trim().toUpperCase(),
      value: Number(m[4]),
      shares: Number(m[5]),
    });
  }
  return rows;
}

function decodeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchPositions(cik: string, accession: string): Promise<RawPos[]> {
  const cikNum = String(Number(cik));
  const accNoDash = accession.replace(/-/g, "");
  const base = `https://www.sec.gov/Archives/edgar/data/${cikNum}/${accNoDash}`;

  // Prefer dedicated info table XML
  try {
    const idxRes = await secFetch(`${base}/index.json`);
    if (idxRes.ok) {
      const idx = (await idxRes.json()) as { directory?: { item?: { name: string }[] } };
      const names = (idx.directory?.item ?? []).map((i) => i.name);
      const prefer = names.find((n) => /infotable/i.test(n))
        ?? names.find((n) => /\.xml$/i.test(n) && !/primary/i.test(n) && !/xsl/i.test(n));
      if (prefer) {
        await sleep(200);
        const xmlRes = await secFetch(`${base}/${prefer}`);
        if (xmlRes.ok) {
          const rows = parseInfoTableXml(await xmlRes.text());
          if (rows.length > 0) return rows;
        }
      }
    }
  } catch { /* fall through */ }

  await sleep(200);
  const txtRes = await secFetch(`${base}/${accession}.txt`);
  if (!txtRes.ok) throw new Error(`filing txt ${cik}: HTTP ${txtRes.status}`);
  return parseInfoTableXml(await txtRes.text());
}

function normalizeValues(rows: RawPos[]): RawPos[] {
  // Some filers still report value in $000. Median price heuristic.
  const prices = rows.filter((r) => r.shares > 0).map((r) => r.value / r.shares).sort((a, b) => a - b);
  if (prices.length === 0) return rows;
  const mid = prices[Math.floor(prices.length / 2)] ?? 0;
  if (mid > 0 && mid < 2) {
    return rows.map((r) => ({ ...r, value: r.value * 1000 }));
  }
  return rows;
}

function aggregateByCusip(rows: RawPos[]): RawPos[] {
  const map = new Map<string, RawPos>();
  for (const r of rows) {
    if (!r.cusip || r.shares <= 0 || r.value <= 0) continue;
    // Skip puts/calls — title often contains PUT/CALL/OPTION
    const t = r.title.toUpperCase();
    if (/\bPUT\b|\bCALL\b|OPTION/.test(t)) continue;
    const prev = map.get(r.cusip);
    if (prev) {
      prev.value += r.value;
      prev.shares += r.shares;
    } else {
      map.set(r.cusip, { ...r });
    }
  }
  return [...map.values()].sort((a, b) => b.value - a.value);
}

/** Seed + OpenFIGI 캐시 */
const STATIC_CUSIP: Record<string, string> = {
  "037833100": "AAPL", "023135106": "AMZN", "02079K305": "GOOGL", "02079K107": "GOOG",
  "594918104": "MSFT", "30303M102": "META", "67066G104": "NVDA", "88160R101": "TSLA",
  "025816109": "AXP", "191216100": "KO", "060505104": "BAC", "166764100": "CVX",
  "674599105": "OXY", "H1467J104": "CB", "615369105": "MCO", "500754106": "KHC",
  "23918K108": "DVA", "501044101": "KR", "82968B103": "SIRI", "247361702": "DAL",
  "92343E102": "VRSN", "14040H105": "COF", "007903107": "AMD", "G40606104": "CRSP",
  "82509L107": "SHOP", "69608A108": "PLTR", "88025T102": "TEM", "172573104": "CRCL",
  "770700102": "HOOD", "19260Q107": "COIN", "880770102": "TER", "77543R102": "ROKU",
  "771049103": "RBLX", "90184D100": "TWST", "07373V105": "BEAM", "00751Y106": "AAL",
  "00287Y109": "ABBV", "G1151C101": "ACGL", "55354G100": "MSCI", "40171V100": "GWRE",
  "366651107": "IT", "45168D104": "IDXX", "448579102": "H", "302635206": "FIGS",
  "303075105": "FDS", "169905106": "CHH", "75737F108": "RRR", "808513105": "SCHW",
  "49714P106": "KNSL", "22160N109": "CSGP", "91879Q109": "MTN", "11271J107": "BN",
  "90353T100": "UBER", "76131D103": "QSR", "44267T102": "HHH", "42806J700": "HTZ",
  "632307104": "NTRA", "45781V101": "INSM", "874039100": "TSM", "984245100": "YPF",
  "464286400": "EWZ", "09061G101": "BABA", "11135F101": "AVGO",
  "013872106": "AA", "81141R100": "SE", "N8731H102": "STM", "78462F103": "SPY",
  "N62509109": "NAMS", "G4786T105": "TBBB",
};

async function loadCusipCache(): Promise<Record<string, string>> {
  const raw = await kvGetDetail(KV_CUSIP_KEY);
  if (raw && typeof raw === "object") return { ...STATIC_CUSIP, ...(raw as Record<string, string>) };
  return { ...STATIC_CUSIP };
}

async function saveCusipCache(map: Record<string, string>): Promise<void> {
  // Only persist non-static discoveries to keep payload small
  const discovered: Record<string, string> = {};
  for (const [c, t] of Object.entries(map)) {
    if (!STATIC_CUSIP[c]) discovered[c] = t;
  }
  await kvSetDetailEx(KV_CUSIP_KEY, discovered, CUSIP_TTL);
}

async function resolveTickers(cusips: string[], cache: Record<string, string>): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  const missing: string[] = [];
  for (const c of cusips) {
    if (cache[c]) out[c] = cache[c];
    else missing.push(c);
  }
  // OpenFIGI batches of 10
  for (let i = 0; i < missing.length; i += 10) {
    const batch = missing.slice(i, i + 10);
    try {
      const res = await fetch("https://api.openfigi.com/v3/mapping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(batch.map((c) => ({ idType: "ID_CUSIP", idValue: c }))),
      });
      if (!res.ok) continue;
      const data = (await res.json()) as { data?: { ticker?: string; exchCode?: string; securityType2?: string; marketSector?: string }[] }[];
      batch.forEach((cusip, idx) => {
        const entries = data[idx]?.data ?? [];
        const preferred =
          entries.find((e) => e.exchCode === "US" && e.marketSector === "Equity") ??
          entries.find((e) => e.exchCode === "US") ??
          entries[0];
        const ticker = preferred?.ticker?.toUpperCase();
        if (ticker && !/[^\w.]/.test(ticker)) {
          out[cusip] = ticker;
          cache[cusip] = ticker;
        }
      });
    } catch { /* ignore batch */ }
    await sleep(250);
  }
  return out;
}

function formatAum(totalUsd: number): string {
  const eok = Math.round(totalUsd / 100_000_000);
  return `$${eok.toLocaleString("en-US")}억`;
}

function quarterLabel(reportDate: string): string {
  const m = Number(reportDate.slice(5, 7));
  const y = Number(reportDate.slice(0, 4));
  if (m <= 3) return `${y} Q1`;
  if (m <= 6) return `${y} Q2`;
  if (m <= 9) return `${y} Q3`;
  return `${y} Q4`;
}

function nextFilingDeadline(reportDate: string): string {
  // 현재 보고분기 다음 분기의 13F 마감일 (~분기말+45일)
  const y = Number(reportDate.slice(0, 4));
  const m = Number(reportDate.slice(5, 7));
  if (m <= 3) return `${y}-08-14`;
  if (m <= 6) return `${y}-11-14`;
  if (m <= 9) return `${y + 1}-02-14`;
  return `${y + 1}-05-15`;
}

function toHoldings(rows: RawPos[], tickers: Record<string, string>, topN: number): Holding[] {
  const total = rows.reduce((s, r) => s + r.value, 0) || 1;
  const out: Holding[] = [];
  for (const r of rows) {
    const symbol = tickers[r.cusip];
    if (!symbol) continue;
    // Skip duplicate symbols (keep first / largest)
    if (out.some((h) => h.symbol === symbol)) continue;
    out.push({
      symbol,
      name: prettyName(r.name, symbol),
      shares: Math.round(r.shares / 1000), // 천 주
      portfolioPct: Math.round((r.value / total) * 1000) / 10,
    });
    if (out.length >= topN) break;
  }
  return out;
}

function prettyName(issuer: string, symbol: string): string {
  const cleaned = issuer
    .replace(/\bINC\.?\b/gi, "")
    .replace(/\bCORP\.?\b/gi, "")
    .replace(/\bCO\.?\b/gi, "")
    .replace(/\bLTD\.?\b/gi, "")
    .replace(/\bPLC\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || symbol;
}

export type Update13FResult = {
  ok: boolean;
  updated: string[];
  skipped: string[];
  errors: { id: string; error: string }[];
  accession: Record<string, string>;
  kvSaved: boolean;
  redis: boolean;
  at: string;
};

export async function updateAll13FHoldings(force = false): Promise<Update13FResult> {
  const result: Update13FResult = {
    ok: true,
    updated: [],
    skipped: [],
    errors: [],
    accession: {},
    kvSaved: false,
    redis: Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
    at: new Date().toISOString(),
  };

  const existing = await loadHoldingsPayload();

  const accessions = { ...(existing?.accessions ?? {}) };
  const byId = new Map((existing?.gurus ?? SEED_GURUS).map((g) => [g.id, { ...g, holdings: [...g.holdings] }]));
  // Always start from seed metadata for STOCK_ACT names etc.
  for (const seed of SEED_GURUS) {
    if (!byId.has(seed.id)) byId.set(seed.id, { ...seed, holdings: [...seed.holdings] });
  }

  const cusipCache = await loadCusipCache();

  for (const filer of AUTO_13F_FILERS) {
    try {
      await sleep(350);
      const meta = await latest13F(filer.cik);
      if (!meta) {
        result.skipped.push(filer.id);
        continue;
      }
      result.accession[filer.id] = meta.accession;
      if (!force && accessions[filer.id] === meta.accession && (byId.get(filer.id)?.holdings.length ?? 0) > 0) {
        result.skipped.push(filer.id);
        continue;
      }

      await sleep(250);
      let rows = aggregateByCusip(normalizeValues(await fetchPositions(filer.cik, meta.accession)));
      if (rows.length === 0) {
        result.errors.push({ id: filer.id, error: "empty info table" });
        continue;
      }

      const top = rows.slice(0, Math.max(filer.topN ?? TOP_N, 40));
      const tickers = await resolveTickers(top.map((r) => r.cusip), cusipCache);
      const holdings = toHoldings(rows, tickers, filer.topN ?? TOP_N);
      if (holdings.length < 3) {
        result.errors.push({ id: filer.id, error: `ticker resolve failed (${holdings.length})` });
        continue;
      }

      const totalUsd = rows.reduce((s, r) => s + r.value, 0);
      const seed = SEED_GURUS.find((g) => g.id === filer.id);
      const prev = byId.get(filer.id) ?? seed;
      if (!prev) continue;

      byId.set(filer.id, {
        ...prev,
        quarter: quarterLabel(meta.reportDate),
        aum: formatAum(totalUsd),
        disclosureType: "13F",
        filingDate: meta.filingDate,
        nextFilingDate: nextFilingDeadline(meta.reportDate),
        holdings,
      });
      accessions[filer.id] = meta.accession;
      result.updated.push(filer.id);
    } catch (e) {
      result.errors.push({ id: filer.id, error: String(e) });
      result.ok = false;
    }
  }

  await saveCusipCache(cusipCache);

  // Preserve seed order
  const gurus = SEED_GURUS.map((seed) => byId.get(seed.id) ?? seed);

  if (result.updated.length > 0 || !existing?.gurus) {
    const payload: HoldingsPayload = {
      gurus,
      accessions,
      updatedAt: Date.now(),
      source: "edgar-13f",
    };
    const saved = await saveHoldingsPayload(payload);
    result.kvSaved = saved;
    if (!saved) {
      result.ok = false;
      result.errors.push({ id: "_kv", error: "persist failed (Supabase app_kv / Upstash / Edge Config)" });
    } else {
      const check = await loadHoldingsPayload();
      if (!check?.gurus?.length) {
        result.ok = false;
        result.kvSaved = false;
        result.errors.push({ id: "_kv", error: "write ok but read-back empty" });
      }
    }
  }

  return result;
}

export async function getLiveGurus(): Promise<{ gurus: Guru[]; live: boolean; updatedAt: number | null }> {
  const raw = await loadHoldingsPayload();
  if (raw?.gurus && Array.isArray(raw.gurus) && raw.gurus.length > 0) {
    return { gurus: raw.gurus, live: true, updatedAt: raw.updatedAt ?? null };
  }
  return { gurus: SEED_GURUS, live: false, updatedAt: null };
}

export { KV_HOLDINGS_KEY };
