/** 한국부동산원 R-ONE — (월) 지역별 매매지수_아파트 MoM 변동률 */

export type RegionCell = {
  id: string;
  name: string;
  changePercent: number;
  type: "sale";
};

const STATBL_ID = "A_2024_00178";
const ITM_ID = "100001";
const BASE = "https://www.reb.or.kr/r-one/openapi/SttsApiTblData.do";

type RebRow = {
  CLS_ID?: number;
  CLS_NM?: string;
  CLS_FULLNM?: string;
  WRTTIME_IDTFR_ID?: string;
  DTA_VAL?: string | number;
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

async function fetchMonth(wrt: string, apiKey?: string): Promise<RebRow[]> {
  const params = new URLSearchParams({
    STATBL_ID,
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

function toRegions(cur: RebRow[], prev: RebRow[]): RegionCell[] {
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

/** 최신 공표월 아파트 매매지수로 전월대비 등락률 계산 (공표 지연 시 최대 8개월 역추적) */
export async function fetchKrReSaleRegions(): Promise<{
  regions: RegionCell[];
  periodLabel: string;
  source: string;
  limited: boolean;
}> {
  const apiKey = process.env.REB_API_KEY;
  let curKey = monthKey();
  let cur: RebRow[] = [];

  for (let i = 0; i < 8; i++) {
    cur = await fetchMonth(curKey, apiKey);
    if (cur.length > 0) break;
    curKey = prevMonthKey(curKey);
  }

  let prevKey = prevMonthKey(curKey);
  let prev: RebRow[] = [];
  for (let i = 0; i < 4; i++) {
    prev = await fetchMonth(prevKey, apiKey);
    if (prev.length > 0) break;
    prevKey = prevMonthKey(prevKey);
  }

  const regions = toRegions(cur, prev);
  const y = curKey.slice(0, 4);
  const m = curKey.slice(4, 6);
  return {
    regions,
    periodLabel: `${y}년 ${parseInt(m, 10)}월 전월대비`,
    source: "한국부동산원 · 전국주택가격동향조사 · 아파트 매매가격지수",
    limited: !apiKey && regions.length <= 5,
  };
}
