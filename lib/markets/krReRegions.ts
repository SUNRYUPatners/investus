/** 한국부동산원 R-ONE — 아파트 매매지수 등락 · 매매 거래호수 */

export type RegionCell = {
  id: string;
  name: string;
  changePercent: number;
  type: "sale";
};

export type TxnCell = {
  id: string;
  name: string;
  volume: number;
  /** 전월 대비 거래호수 증감률 (%) */
  changePercent: number | null;
};

const SALE_STATBL = "A_2024_00178";
const TXN_STATBL = "A_2024_00554"; // (월) 행정구역별 아파트매매거래현황
const ITM_ID = "100001";
const BASE = "https://www.reb.or.kr/r-one/openapi/SttsApiTblData.do";

type RebRow = {
  CLS_ID?: number;
  CLS_NM?: string;
  CLS_FULLNM?: string;
  WRTTIME_IDTFR_ID?: string;
  DTA_VAL?: string | number;
  ITM_ID?: number | string;
  ITM_NM?: string;
};

function monthKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}${m}`;
}

function prevMonthKey(key: string): string {
  const y = parseInt(key.slice(0, 4), 10);
  const m = parseInt(key.slice(4, 6), 10);
  const d = new Date(y, m - 2, 1);
  return monthKey(d);
}

function periodLabelFromKey(key: string): string {
  return `${key.slice(0, 4)}년 ${parseInt(key.slice(4, 6), 10)}월`;
}

async function fetchMonth(
  statbl: string,
  wrt: string,
  apiKey?: string,
): Promise<RebRow[]> {
  const params = new URLSearchParams({
    STATBL_ID: statbl,
    DTACYCLE_CD: "MM",
    ITM_ID: String(ITM_ID),
    START_WRTTIME: wrt,
    END_WRTTIME: wrt,
    Type: "json",
    pIndex: "1",
    pSize: "1000",
  });
  if (apiKey) params.set("KEY", apiKey);

  const res = await fetch(`${BASE}?${params}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });
  if (!res.ok) throw new Error(`reb ${res.status}`);
  const json = (await res.json()) as { SttsApiTblData?: { row?: RebRow[] }[] };
  const block = json.SttsApiTblData?.[1];
  return block?.row ?? [];
}

async function findLatestMonth(
  statbl: string,
  apiKey?: string,
  maxBack = 8,
): Promise<{ key: string; rows: RebRow[] }> {
  let key = monthKey();
  for (let i = 0; i < maxBack; i++) {
    const rows = await fetchMonth(statbl, key, apiKey);
    if (rows.length > 0) return { key, rows };
    key = prevMonthKey(key);
  }
  return { key, rows: [] };
}

function toSaleRegions(cur: RebRow[], prev: RebRow[]): RegionCell[] {
  const prevMap = new Map<string, number>();
  for (const r of prev) {
    const id = String(r.CLS_ID ?? r.CLS_NM ?? "");
    const v = parseFloat(String(r.DTA_VAL ?? ""));
    if (id && Number.isFinite(v)) prevMap.set(id, v);
  }

  const out: RegionCell[] = [];
  for (const r of cur) {
    const id = String(r.CLS_ID ?? r.CLS_NM ?? "");
    const name = (r.CLS_FULLNM ?? r.CLS_NM ?? id).replace(/^.*?>/, "").trim() || id;
    const curV = parseFloat(String(r.DTA_VAL ?? ""));
    const prevV = prevMap.get(id);
    if (!id || !Number.isFinite(curV) || prevV === undefined || prevV === 0) continue;
    const changePercent = ((curV - prevV) / prevV) * 100;
    out.push({
      id,
      name,
      changePercent: Math.round(changePercent * 100) / 100,
      type: "sale",
    });
  }
  return out.sort((a, b) => b.changePercent - a.changePercent);
}

/** 시도(depth 0)만 — 전국·서울·경기 … */
function sidoRows(rows: RebRow[]): RebRow[] {
  return rows.filter((r) => {
    const full = String(r.CLS_FULLNM ?? r.CLS_NM ?? "");
    return !full.includes(">");
  });
}

function toTxnCells(cur: RebRow[], prev: RebRow[]): TxnCell[] {
  const prevMap = new Map<string, number>();
  for (const r of sidoRows(prev)) {
    const id = String(r.CLS_ID ?? r.CLS_NM ?? "");
    const v = parseFloat(String(r.DTA_VAL ?? ""));
    if (id && Number.isFinite(v)) prevMap.set(id, v);
  }

  const out: TxnCell[] = [];
  for (const r of sidoRows(cur)) {
    const id = String(r.CLS_ID ?? r.CLS_NM ?? "");
    const name = String(r.CLS_NM ?? id);
    const volume = parseFloat(String(r.DTA_VAL ?? ""));
    if (!id || !Number.isFinite(volume)) continue;
    const prevV = prevMap.get(id);
    let changePercent: number | null = null;
    if (prevV !== undefined && prevV > 0) {
      changePercent = Math.round(((volume - prevV) / prevV) * 1000) / 10;
    }
    out.push({ id, name, volume: Math.round(volume), changePercent });
  }
  return out.sort((a, b) => b.volume - a.volume);
}

/** 최신 공표월 아파트 매매지수 전월대비 등락률 */
export async function fetchKrReSaleRegions(): Promise<{
  regions: RegionCell[];
  periodLabel: string;
  source: string;
  limited: boolean;
}> {
  const apiKey = process.env.REB_API_KEY;
  const { key: curKey, rows: cur } = await findLatestMonth(SALE_STATBL, apiKey);
  let prevKey = prevMonthKey(curKey);
  let prev: RebRow[] = [];
  for (let i = 0; i < 4; i++) {
    prev = await fetchMonth(SALE_STATBL, prevKey, apiKey);
    if (prev.length > 0) break;
    prevKey = prevMonthKey(prevKey);
  }

  const regions = toSaleRegions(cur, prev);
  return {
    regions,
    periodLabel: `${periodLabelFromKey(curKey)} 전월대비`,
    source: "한국부동산원 · 전국주택가격동향조사 · 아파트 매매가격지수",
    limited: !apiKey && regions.length <= 5,
  };
}

/** 최신 공표월 시도별 아파트 매매 거래호수 */
export async function fetchKrReTxnVolumes(): Promise<{
  regions: TxnCell[];
  national: number | null;
  periodLabel: string;
  source: string;
  limited: boolean;
}> {
  const apiKey = process.env.REB_API_KEY;
  const { key: curKey, rows: cur } = await findLatestMonth(TXN_STATBL, apiKey);
  let prevKey = prevMonthKey(curKey);
  let prev: RebRow[] = [];
  for (let i = 0; i < 4; i++) {
    prev = await fetchMonth(TXN_STATBL, prevKey, apiKey);
    if (prev.length > 0) break;
    prevKey = prevMonthKey(prevKey);
  }

  const regions = toTxnCells(cur, prev);
  const national = regions.find((r) => r.name === "전국")?.volume ?? null;
  return {
    regions,
    national,
    periodLabel: `${periodLabelFromKey(curKey)} 매매 거래호수`,
    source: "한국부동산원 · 부동산거래현황 · 아파트매매거래현황",
    limited: !apiKey && regions.length <= 5,
  };
}
