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
  holdings:       Holding[];
};

export const GURUS: Guru[] = [
  {
    id:             "berkshire",
    name:           "워렌 버핏",
    fund:           "Berkshire Hathaway",
    emoji:          "🎩",
    color:          "#fb923c",
    quarter:        "2025 Q1",
    aum:            "$2,900억",
    disclosureType: "13F",
    holdings: [
      { symbol: "AAPL",  name: "Apple",                shares: 300000, portfolioPct: 26.2 },
      { symbol: "AXP",   name: "American Express",     shares: 151610, portfolioPct: 15.5 },
      { symbol: "BAC",   name: "Bank of America",      shares: 680233, portfolioPct: 10.4 },
      { symbol: "KO",    name: "Coca-Cola",            shares: 400000, portfolioPct:  9.3 },
      { symbol: "CVX",   name: "Chevron",              shares: 118610, portfolioPct:  6.0 },
      { symbol: "OXY",   name: "Occidental Petroleum", shares: 264175, portfolioPct:  5.0 },
      { symbol: "MCO",   name: "Moody's",              shares:  24669, portfolioPct:  3.1 },
      { symbol: "KHC",   name: "Kraft Heinz",          shares: 325634, portfolioPct:  3.4 },
      { symbol: "CB",    name: "Chubb",                shares:  27033, portfolioPct:  2.8 },
      { symbol: "DVA",   name: "DaVita",               shares:  36095, portfolioPct:  2.1 },
      { symbol: "VRSN",  name: "VeriSign",             shares:  12953, portfolioPct:  1.7 },
      { symbol: "BK",    name: "Bank of New York",     shares:  39959, portfolioPct:  1.4 },
      { symbol: "V",     name: "Visa",                 shares:   3239, portfolioPct:  0.8 },
      { symbol: "ALLY",  name: "Ally Financial",       shares:  29000, portfolioPct:  0.7 },
      { symbol: "C",     name: "Citigroup",            shares:  55244, portfolioPct:  0.6 },
    ],
  },
  {
    id:             "ark",
    name:           "캐시 우드",
    fund:           "ARK Invest (ARKK)",
    emoji:          "🚀",
    color:          "#60a5fa",
    quarter:        "2025 Q1",
    aum:            "$140억",
    disclosureType: "13F",
    holdings: [
      { symbol: "TSLA",  name: "Tesla",             shares: 10250, portfolioPct: 11.8 },
      { symbol: "COIN",  name: "Coinbase",          shares:  5140, portfolioPct:  9.4 },
      { symbol: "RBLX",  name: "Roblox",            shares: 18700, portfolioPct:  7.2 },
      { symbol: "ROKU",  name: "Roku",              shares:  8320, portfolioPct:  6.1 },
      { symbol: "PATH",  name: "UiPath",            shares: 31400, portfolioPct:  5.8 },
      { symbol: "SHOP",  name: "Shopify",           shares:  8110, portfolioPct:  5.1 },
      { symbol: "EXAS",  name: "Exact Sciences",    shares:  9870, portfolioPct:  5.3 },
      { symbol: "SQ",    name: "Block",             shares: 11230, portfolioPct:  4.6 },
      { symbol: "TWLO",  name: "Twilio",            shares:  9540, portfolioPct:  4.2 },
      { symbol: "SPOT",  name: "Spotify",           shares:  3290, portfolioPct:  3.8 },
      { symbol: "CRSP",  name: "CRISPR Therapeutics", shares: 4120, portfolioPct: 3.4 },
      { symbol: "Z",     name: "Zillow Group",      shares:  6830, portfolioPct:  3.1 },
      { symbol: "DKNG",  name: "DraftKings",        shares: 14520, portfolioPct:  2.8 },
      { symbol: "TER",   name: "Teradyne",          shares:  5640, portfolioPct:  2.4 },
      { symbol: "BEAM",  name: "Beam Therapeutics", shares:  8910, portfolioPct:  2.1 },
    ],
  },
  {
    id:             "baron",
    name:           "론 베론",
    fund:           "Baron Capital Management",
    emoji:          "🏰",
    color:          "#f97316",
    quarter:        "2025 Q1",
    aum:            "$300억",
    disclosureType: "13F",
    holdings: [
      { symbol: "TSLA",  name: "Tesla",              shares:  7240, portfolioPct: 16.2 },
      { symbol: "CSGP",  name: "CoStar Group",       shares: 28400, portfolioPct: 11.8 },
      { symbol: "ACGL",  name: "Arch Capital",       shares: 42100, portfolioPct:  9.4 },
      { symbol: "NU",    name: "Nubank",             shares: 85200, portfolioPct:  7.8 },
      { symbol: "DXCM",  name: "Dexcom",            shares: 14300, portfolioPct:  6.2 },
      { symbol: "MTN",   name: "Vail Resorts",       shares:  3800, portfolioPct:  5.8 },
      { symbol: "BKNG",  name: "Booking Holdings",   shares:   520, portfolioPct:  5.1 },
      { symbol: "RCL",   name: "Royal Caribbean",    shares:  5100, portfolioPct:  4.7 },
      { symbol: "SBAC",  name: "SBA Communications", shares:  4200, portfolioPct:  4.2 },
      { symbol: "HLT",   name: "Hilton Worldwide",   shares:  6800, portfolioPct:  3.8 },
      { symbol: "WST",   name: "West Pharma",        shares:  3200, portfolioPct:  3.4 },
      { symbol: "BURL",  name: "Burlington Stores",  shares:  4100, portfolioPct:  2.9 },
    ],
  },
  {
    id:             "pelosi",
    name:           "낸시 펠로시",
    fund:           "Paul Pelosi (하원의원 공시)",
    emoji:          "🏛️",
    color:          "#f472b6",
    quarter:        "2025 Q1",
    aum:            "비공개",
    disclosureType: "STOCK_ACT",
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
    id:             "ackman",
    name:           "빌 애크먼",
    fund:           "Pershing Square",
    emoji:          "♟️",
    color:          "#a78bfa",
    quarter:        "2025 Q1",
    aum:            "$180억",
    disclosureType: "13F",
    holdings: [
      { symbol: "HLT",   name: "Hilton Worldwide",       shares: 14450, portfolioPct: 17.8 },
      { symbol: "GOOGL", name: "Alphabet",               shares: 18700, portfolioPct: 15.2 },
      { symbol: "CMG",   name: "Chipotle Mexican Grill", shares: 54300, portfolioPct: 14.6 },
      { symbol: "QSR",   name: "Restaurant Brands",      shares: 36800, portfolioPct: 11.3 },
      { symbol: "LOW",   name: "Lowe's",                 shares: 14200, portfolioPct: 10.9 },
      { symbol: "NKE",   name: "Nike",                   shares: 30500, portfolioPct:  9.4 },
      { symbol: "PSA",   name: "Public Storage",         shares:  6120, portfolioPct:  9.1 },
      { symbol: "MKL",   name: "Markel Group",           shares:  2810, portfolioPct:  7.8 },
      { symbol: "PCOR",  name: "Procore Technologies",   shares:  9840, portfolioPct:  4.3 },
      { symbol: "STZ",   name: "Constellation Brands",   shares:  6210, portfolioPct:  3.1 },
      { symbol: "CPNG",  name: "Coupang",                shares: 42300, portfolioPct:  2.8 },
    ],
  },
  {
    id:             "druckenmiller",
    name:           "스탠리 드러켄밀러",
    fund:           "Duquesne Family Office",
    emoji:          "🦅",
    color:          "#fbbf24",
    quarter:        "2025 Q1",
    aum:            "$60억",
    disclosureType: "13F",
    holdings: [
      { symbol: "NVDA",  name: "NVIDIA",    shares:  4850, portfolioPct: 22.3 },
      { symbol: "MSFT",  name: "Microsoft", shares:  3420, portfolioPct: 15.4 },
      { symbol: "META",  name: "Meta",      shares:  2910, portfolioPct: 14.8 },
      { symbol: "GOOGL", name: "Alphabet",  shares:  2100, portfolioPct: 11.2 },
      { symbol: "LLY",   name: "Eli Lilly", shares:  1230, portfolioPct:  9.4 },
      { symbol: "CPNG",  name: "Coupang",   shares: 18400, portfolioPct:  7.8 },
      { symbol: "COHR",  name: "Coherent",  shares:  4560, portfolioPct:  6.1 },
      { symbol: "AMZN",  name: "Amazon",    shares:  2280, portfolioPct:  5.8 },
      { symbol: "TSLA",  name: "Tesla",     shares:  1840, portfolioPct:  4.6 },
      { symbol: "V",     name: "Visa",      shares:   980, portfolioPct:  2.6 },
    ],
  },
];

/** 전체 종목 심볼 목록 (중복 제거) */
export const ALL_GURU_SYMBOLS = [
  ...new Set(GURUS.flatMap((g) => g.holdings.map((h) => h.symbol))),
];
