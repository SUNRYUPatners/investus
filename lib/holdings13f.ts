/**
 * 13F / STOCK Act 공시 스냅샷 (시드 / 폴백)
 *
 * 라이브 데이터는 SEC EDGAR 크론(`/api/cron/13f-update`)이
 * Upstash KV(`guru-holdings:v1`)에 저장하고 `/api/guru-holdings`로 서빙한다.
 * 이 파일의 GURUS는 KV 미스·STOCK Act(수시 공시)용 폴백이다.
 */
export type Holding = {
  symbol:       string;
  name:         string;
  shares:       number;  // 천 주 단위
  portfolioPct: number;  // 포트폴리오 비중 %
};

export type DisclosureType = "13F" | "STOCK_ACT";

export type Guru = {
  id:             string;
  name:           string;
  fund:           string;
  emoji:          string;
  color:          string;
  quarter:        string;
  aum:            string;
  disclosureType: DisclosureType;
  filingDate:     string;  // SEC 공시일 (YYYY-MM-DD)
  nextFilingDate: string;  // 다음 공시 예정일
  holdings:       Holding[];
};

export const GURUS: Guru[] = [
  {
    id:             "berkshire",
    name:           "워렌 버핏",
    fund:           "Berkshire Hathaway",
    emoji:          "🎩",
    color:          "#fb923c",
    quarter:        "2026 Q1",
    aum:            "$2,631억",
    disclosureType: "13F",
    filingDate:     "2026-05-15",
    nextFilingDate: "2026-08-14",
    holdings: [
      { symbol: "AAPL",  name: "Apple",                shares: 227918, portfolioPct: 22.0 },
      { symbol: "AXP",   name: "American Express",     shares: 151611, portfolioPct: 17.4 },
      { symbol: "KO",    name: "Coca-Cola",            shares: 400000, portfolioPct: 11.6 },
      { symbol: "BAC",   name: "Bank of America",      shares: 513625, portfolioPct:  9.5 },
      { symbol: "CVX",   name: "Chevron",              shares:  84376, portfolioPct:  6.6 },
      { symbol: "OXY",   name: "Occidental Petroleum", shares: 264941, portfolioPct:  6.6 },
      { symbol: "GOOGL", name: "Alphabet",             shares:  54250, portfolioPct:  5.9 },
      { symbol: "CB",    name: "Chubb",                shares:  34249, portfolioPct:  4.2 },
      { symbol: "MCO",   name: "Moody's",              shares:  24670, portfolioPct:  4.1 },
      { symbol: "KHC",   name: "Kraft Heinz",          shares: 325635, portfolioPct:  2.8 },
      { symbol: "DVA",   name: "DaVita",               shares:  30101, portfolioPct:  1.8 },
      { symbol: "KR",    name: "Kroger",               shares:  50000, portfolioPct:  1.4 },
      { symbol: "SIRI",  name: "SiriusXM",             shares: 124807, portfolioPct:  1.1 },
      { symbol: "DAL",   name: "Delta Air Lines",      shares:  39809, portfolioPct:  1.0 },
      { symbol: "VRSN",  name: "VeriSign",             shares:   8990, portfolioPct:  0.8 },
    ],
  },
  {
    id:             "ark",
    name:           "캐시 우드",
    fund:           "ARK Invest (ARKK)",
    emoji:          "🚀",
    color:          "#60a5fa",
    quarter:        "2026 Q1",
    aum:            "$129억",
    disclosureType: "13F",
    filingDate:     "2026-05-12",
    nextFilingDate: "2026-08-14",
    holdings: [
      { symbol: "TSLA",  name: "Tesla",                shares:  2800, portfolioPct: 8.2 },
      { symbol: "AMD",   name: "AMD",                  shares:  2700, portfolioPct: 4.3 },
      { symbol: "CRSP",  name: "CRISPR Therapeutics",  shares: 11300, portfolioPct: 4.2 },
      { symbol: "SHOP",  name: "Shopify",              shares:  4200, portfolioPct: 3.9 },
      { symbol: "PLTR",  name: "Palantir",             shares:  3100, portfolioPct: 3.5 },
      { symbol: "TEM",   name: "Tempus AI",            shares:  9600, portfolioPct: 3.4 },
      { symbol: "CRCL",  name: "Circle Internet",      shares:  4500, portfolioPct: 3.4 },
      { symbol: "HOOD",  name: "Robinhood",            shares:  6000, portfolioPct: 3.2 },
      { symbol: "COIN",  name: "Coinbase",             shares:  2400, portfolioPct: 3.2 },
      { symbol: "TER",   name: "Teradyne",             shares:  1200, portfolioPct: 2.9 },
      { symbol: "ROKU",  name: "Roku",                 shares:  3800, portfolioPct: 2.8 },
      { symbol: "RBLX",  name: "Roblox",               shares:  5900, portfolioPct: 2.6 },
      { symbol: "TWST",  name: "Twist Bioscience",     shares:  6300, portfolioPct: 2.3 },
      { symbol: "BEAM",  name: "Beam Therapeutics",    shares: 12100, portfolioPct: 2.3 },
      { symbol: "AMZN",  name: "Amazon",               shares:  1400, portfolioPct: 2.2 },
    ],
  },
  {
    id:             "baron",
    name:           "론 베론",
    fund:           "Baron Capital Management",
    emoji:          "🏰",
    color:          "#f97316",
    quarter:        "2026 Q1",
    aum:            "$331억",
    disclosureType: "13F",
    filingDate:     "2026-05-15",
    nextFilingDate: "2026-08-14",
    holdings: [
      { symbol: "TSLA",  name: "Tesla",                shares: 11900, portfolioPct: 13.4 },
      { symbol: "ACGL",  name: "Arch Capital",         shares: 16700, portfolioPct:  4.8 },
      { symbol: "MSCI",  name: "MSCI",                 shares:  2700, portfolioPct:  4.4 },
      { symbol: "GWRE",  name: "Guidewire",            shares:  6600, portfolioPct:  3.0 },
      { symbol: "IT",    name: "Gartner",              shares:  5900, portfolioPct:  2.8 },
      { symbol: "IDXX",  name: "IDEXX Laboratories",   shares:  1600, portfolioPct:  2.8 },
      { symbol: "H",     name: "Hyatt Hotels",         shares:  6300, portfolioPct:  2.8 },
      { symbol: "FIGS",  name: "FIGS",                 shares: 60000, portfolioPct:  2.7 },
      { symbol: "FDS",   name: "FactSet",              shares:  3800, portfolioPct:  2.5 },
      { symbol: "CHH",   name: "Choice Hotels",        shares:  7700, portfolioPct:  2.4 },
      { symbol: "RRR",   name: "Red Rock Resorts",     shares: 13400, portfolioPct:  2.2 },
      { symbol: "SCHW",  name: "Charles Schwab",       shares:  7500, portfolioPct:  2.1 },
      { symbol: "KNSL",  name: "Kinsale Capital",      shares:  2000, portfolioPct:  2.1 },
      { symbol: "CSGP",  name: "CoStar Group",         shares: 16300, portfolioPct:  2.0 },
      { symbol: "MTN",   name: "Vail Resorts",         shares:  5000, portfolioPct:  1.9 },
    ],
  },
  {
    id:             "pelosi",
    name:           "낸시 펠로시",
    fund:           "Paul Pelosi (하원의원 공시)",
    emoji:          "🏛️",
    color:          "#f472b6",
    quarter:        "2025 Q4",
    aum:            "비공개",
    disclosureType: "STOCK_ACT",
    filingDate:     "2026-01-22",
    nextFilingDate: "수시 공시",
    holdings: [
      { symbol: "NVDA",  name: "NVIDIA",             shares:   200, portfolioPct: 28.4 },
      { symbol: "AAPL",  name: "Apple",              shares:   500, portfolioPct: 18.2 },
      { symbol: "MSFT",  name: "Microsoft",          shares:   300, portfolioPct: 12.1 },
      { symbol: "GOOGL", name: "Alphabet",           shares:   150, portfolioPct: 10.3 },
      { symbol: "PANW",  name: "Palo Alto Networks", shares:   280, portfolioPct:  8.7 },
      { symbol: "CRWD",  name: "CrowdStrike",        shares:   190, portfolioPct:  7.2 },
      { symbol: "AVGO",  name: "Broadcom",           shares:    80, portfolioPct:  6.1 },
      { symbol: "AMZN",  name: "Amazon",             shares:   210, portfolioPct:  4.8 },
      { symbol: "NXPI",  name: "NXP Semiconductors", shares:   310, portfolioPct:  4.2 },
    ],
  },
  {
    id:             "leopold",
    name:           "레오폴드 아셴브레너",
    fund:           "Situational Awareness Capital",
    emoji:          "🤖",
    color:          "#34d399",
    quarter:        "2025 Q4",
    aum:            "비공개",
    disclosureType: "STOCK_ACT",
    filingDate:     "2026-01-10",
    nextFilingDate: "수시 공시",
    holdings: [
      { symbol: "SPCX",  name: "SpaceX (SPCX ETF)",  shares:   530, portfolioPct: 34.6 },
      { symbol: "NVDA",  name: "NVIDIA",              shares:   210, portfolioPct: 24.1 },
      { symbol: "TSLA",  name: "Tesla",               shares:   310, portfolioPct: 18.3 },
      { symbol: "SNDK",  name: "SanDisk",             shares:   240, portfolioPct: 12.8 },
      { symbol: "MSFT",  name: "Microsoft",           shares:   180, portfolioPct:  6.4 },
      { symbol: "META",  name: "Meta",                shares:   110, portfolioPct:  3.8 },
    ],
  },
  {
    id:             "ackman",
    name:           "빌 애크먼",
    fund:           "Pershing Square",
    emoji:          "♟️",
    color:          "#a78bfa",
    quarter:        "2026 Q1",
    aum:            "$137억",
    disclosureType: "13F",
    filingDate:     "2026-05-15",
    nextFilingDate: "2026-08-14",
    holdings: [
      { symbol: "BN",    name: "Brookfield",             shares: 59697, portfolioPct: 17.6 },
      { symbol: "AMZN",  name: "Amazon",                 shares: 11452, portfolioPct: 17.4 },
      { symbol: "UBER",  name: "Uber",                   shares: 29959, portfolioPct: 15.7 },
      { symbol: "MSFT",  name: "Microsoft",              shares:  5654, portfolioPct: 15.3 },
      { symbol: "QSR",   name: "Restaurant Brands",      shares: 22645, portfolioPct: 12.2 },
      { symbol: "META",  name: "Meta",                   shares:  2661, portfolioPct: 11.1 },
      { symbol: "HHH",   name: "Howard Hughes",          shares: 18852, portfolioPct:  8.7 },
      { symbol: "GOOG",  name: "Alphabet (Class C)",     shares:   312, portfolioPct:  0.7 },
      { symbol: "HTZ",   name: "Hertz",                  shares: 15241, portfolioPct:  0.5 },
      { symbol: "GOOGL", name: "Alphabet (Class A)",     shares:    32, portfolioPct:  0.1 },
    ],
  },
  {
    id:             "druckenmiller",
    name:           "스탠리 드러켄밀러",
    fund:           "Duquesne Family Office",
    emoji:          "🦅",
    color:          "#fbbf24",
    quarter:        "2026 Q1",
    aum:            "$29억",
    disclosureType: "13F",
    filingDate:     "2026-05-15",
    nextFilingDate: "2026-08-14",
    holdings: [
      { symbol: "NTRA",  name: "Natera",                 shares:  3064, portfolioPct: 20.9 },
      { symbol: "INSM",  name: "Insmed",                 shares:  1154, portfolioPct:  6.4 },
      { symbol: "TSM",   name: "TSMC",                   shares:   495, portfolioPct:  5.7 },
      { symbol: "YPF",   name: "YPF",                    shares:  3236, portfolioPct:  5.1 },
      { symbol: "EWZ",   name: "iShares MSCI Brazil",    shares:  3436, portfolioPct:  4.5 },
      { symbol: "TBBB",  name: "BBB Foods",              shares:  3109, portfolioPct:  3.7 },
      { symbol: "AA",    name: "Alcoa",                  shares:  1493, portfolioPct:  3.4 },
      { symbol: "NAMS",  name: "NewAmsterdam Pharma",    shares:  3070, portfolioPct:  3.4 },
      { symbol: "SE",    name: "Sea Limited",            shares:  1100, portfolioPct:  3.1 },
      { symbol: "STM",   name: "STMicroelectronics",     shares:  2613, portfolioPct:  3.1 },
      { symbol: "AVGO",  name: "Broadcom",               shares:   196, portfolioPct:  2.1 },
    ],
  },
];

/** 전체 종목 심볼 목록 (중복 제거) */
export const ALL_GURU_SYMBOLS = [
  ...new Set(GURUS.flatMap((g) => g.holdings.map((h) => h.symbol))),
];

/** nextFilingDate(YYYY-MM-DD) 가 지났으면 true — UI 경고용 */
export function isGuruFilingOverdue(guru: Guru, now = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(guru.nextFilingDate)) return false;
  const [y, m, d] = guru.nextFilingDate.split("-").map(Number);
  const due = new Date(Date.UTC(y, m - 1, d));
  return now.getTime() > due.getTime();
}
