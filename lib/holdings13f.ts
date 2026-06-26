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
    quarter:        "2025 Q4",
    aum:            "$3,000억",
    disclosureType: "13F",
    filingDate:     "2026-02-14",
    nextFilingDate: "2026-05-15",
    holdings: [
      { symbol: "AAPL",  name: "Apple",                shares: 300000, portfolioPct: 25.4 },
      { symbol: "AXP",   name: "American Express",     shares: 151610, portfolioPct: 16.2 },
      { symbol: "BAC",   name: "Bank of America",      shares: 680233, portfolioPct: 10.8 },
      { symbol: "KO",    name: "Coca-Cola",            shares: 400000, portfolioPct:  9.5 },
      { symbol: "CVX",   name: "Chevron",              shares: 118610, portfolioPct:  5.8 },
      { symbol: "OXY",   name: "Occidental Petroleum", shares: 264175, portfolioPct:  5.1 },
      { symbol: "MCO",   name: "Moody's",              shares:  24669, portfolioPct:  3.2 },
      { symbol: "KHC",   name: "Kraft Heinz",          shares: 325634, portfolioPct:  3.3 },
      { symbol: "CB",    name: "Chubb",                shares:  27033, portfolioPct:  2.9 },
      { symbol: "DVA",   name: "DaVita",               shares:  36095, portfolioPct:  2.2 },
      { symbol: "VRSN",  name: "VeriSign",             shares:  12953, portfolioPct:  1.8 },
      { symbol: "BK",    name: "Bank of New York",     shares:  39959, portfolioPct:  1.5 },
      { symbol: "V",     name: "Visa",                 shares:   3239, portfolioPct:  0.9 },
      { symbol: "SIRI",  name: "SiriusXM",             shares: 108100, portfolioPct:  0.8 },
      { symbol: "C",     name: "Citigroup",            shares:  55244, portfolioPct:  0.6 },
    ],
  },
  {
    id:             "ark",
    name:           "캐시 우드",
    fund:           "ARK Invest (ARKK)",
    emoji:          "🚀",
    color:          "#60a5fa",
    quarter:        "2025 Q4",
    aum:            "$120억",
    disclosureType: "13F",
    filingDate:     "2026-02-14",
    nextFilingDate: "2026-05-15",
    holdings: [
      { symbol: "TSLA",  name: "Tesla",              shares: 10500, portfolioPct: 12.4 },
      { symbol: "COIN",  name: "Coinbase",           shares:  5400, portfolioPct:  9.8 },
      { symbol: "RBLX",  name: "Roblox",             shares: 19200, portfolioPct:  7.4 },
      { symbol: "ROKU",  name: "Roku",               shares:  8600, portfolioPct:  6.3 },
      { symbol: "SHOP",  name: "Shopify",            shares:  8400, portfolioPct:  5.4 },
      { symbol: "PATH",  name: "UiPath",             shares: 32100, portfolioPct:  5.2 },
      { symbol: "NTLA",  name: "Intellia Therapeutics", shares: 12800, portfolioPct:  5.1 },
      { symbol: "SQ",    name: "Block",              shares: 11600, portfolioPct:  4.8 },
      { symbol: "SPOT",  name: "Spotify",            shares:  3400, portfolioPct:  4.1 },
      { symbol: "TWLO",  name: "Twilio",             shares:  9700, portfolioPct:  4.0 },
      { symbol: "Z",     name: "Zillow Group",       shares:  7100, portfolioPct:  3.2 },
      { symbol: "DKNG",  name: "DraftKings",         shares: 15000, portfolioPct:  2.9 },
      { symbol: "TER",   name: "Teradyne",           shares:  5800, portfolioPct:  2.5 },
      { symbol: "CRSP",  name: "CRISPR Therapeutics", shares: 4300, portfolioPct:  2.2 },
      { symbol: "RXRX",  name: "Recursion Pharma",   shares: 22400, portfolioPct:  2.0 },
    ],
  },
  {
    id:             "baron",
    name:           "론 베론",
    fund:           "Baron Capital Management",
    emoji:          "🏰",
    color:          "#f97316",
    quarter:        "2025 Q4",
    aum:            "$310억",
    disclosureType: "13F",
    filingDate:     "2026-02-14",
    nextFilingDate: "2026-05-15",
    holdings: [
      { symbol: "TSLA",  name: "Tesla",              shares:  7500, portfolioPct: 16.8 },
      { symbol: "CSGP",  name: "CoStar Group",       shares: 29100, portfolioPct: 12.1 },
      { symbol: "ACGL",  name: "Arch Capital",       shares: 43200, portfolioPct:  9.6 },
      { symbol: "NU",    name: "Nubank",             shares: 87400, portfolioPct:  8.1 },
      { symbol: "DXCM",  name: "Dexcom",             shares: 14800, portfolioPct:  6.4 },
      { symbol: "BKNG",  name: "Booking Holdings",   shares:   540, portfolioPct:  5.4 },
      { symbol: "RCL",   name: "Royal Caribbean",    shares:  5300, portfolioPct:  4.9 },
      { symbol: "MTN",   name: "Vail Resorts",       shares:  3900, portfolioPct:  4.6 },
      { symbol: "SBAC",  name: "SBA Communications", shares:  4300, portfolioPct:  4.3 },
      { symbol: "HLT",   name: "Hilton Worldwide",   shares:  7000, portfolioPct:  3.9 },
      { symbol: "WST",   name: "West Pharma",        shares:  3300, portfolioPct:  3.5 },
      { symbol: "BURL",  name: "Burlington Stores",  shares:  4200, portfolioPct:  3.0 },
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
    quarter:        "2025 Q4",
    aum:            "$190억",
    disclosureType: "13F",
    filingDate:     "2026-02-14",
    nextFilingDate: "2026-05-15",
    holdings: [
      { symbol: "HLT",   name: "Hilton Worldwide",       shares: 14800, portfolioPct: 18.2 },
      { symbol: "GOOGL", name: "Alphabet",               shares: 19200, portfolioPct: 15.8 },
      { symbol: "CMG",   name: "Chipotle Mexican Grill", shares: 55100, portfolioPct: 14.9 },
      { symbol: "QSR",   name: "Restaurant Brands",      shares: 37400, portfolioPct: 11.5 },
      { symbol: "LOW",   name: "Lowe's",                 shares: 14500, portfolioPct: 11.1 },
      { symbol: "NKE",   name: "Nike",                   shares: 31000, portfolioPct:  9.6 },
      { symbol: "PSA",   name: "Public Storage",         shares:  6200, portfolioPct:  9.2 },
      { symbol: "MKL",   name: "Markel Group",           shares:  2850, portfolioPct:  7.9 },
      { symbol: "PCOR",  name: "Procore Technologies",   shares: 10100, portfolioPct:  4.4 },
      { symbol: "STZ",   name: "Constellation Brands",   shares:  6400, portfolioPct:  3.2 },
      { symbol: "CPNG",  name: "Coupang",                shares: 43000, portfolioPct:  2.9 },
    ],
  },
  {
    id:             "druckenmiller",
    name:           "스탠리 드러켄밀러",
    fund:           "Duquesne Family Office",
    emoji:          "🦅",
    color:          "#fbbf24",
    quarter:        "2025 Q4",
    aum:            "$64억",
    disclosureType: "13F",
    filingDate:     "2026-02-14",
    nextFilingDate: "2026-05-15",
    holdings: [
      { symbol: "NVDA",  name: "NVIDIA",    shares:  5100, portfolioPct: 23.1 },
      { symbol: "META",  name: "Meta",      shares:  3100, portfolioPct: 15.6 },
      { symbol: "MSFT",  name: "Microsoft", shares:  3500, portfolioPct: 15.2 },
      { symbol: "GOOGL", name: "Alphabet",  shares:  2200, portfolioPct: 11.4 },
      { symbol: "LLY",   name: "Eli Lilly", shares:  1280, portfolioPct:  9.6 },
      { symbol: "AMZN",  name: "Amazon",    shares:  2400, portfolioPct:  6.0 },
      { symbol: "CPNG",  name: "Coupang",   shares: 18900, portfolioPct:  5.8 },
      { symbol: "COHR",  name: "Coherent",  shares:  4700, portfolioPct:  5.2 },
      { symbol: "TSLA",  name: "Tesla",     shares:  1900, portfolioPct:  4.8 },
      { symbol: "V",     name: "Visa",      shares:  1000, portfolioPct:  2.6 },
    ],
  },
];

/** 전체 종목 심볼 목록 (중복 제거) */
export const ALL_GURU_SYMBOLS = [
  ...new Set(GURUS.flatMap((g) => g.holdings.map((h) => h.symbol))),
];
