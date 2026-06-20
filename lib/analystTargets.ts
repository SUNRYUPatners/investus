export type AnalystRating =
  | "Strong Buy" | "Buy" | "Outperform" | "Overweight" | "Initiate Buy"
  | "Hold" | "Neutral" | "Equal-Weight" | "Market Perform" | "Sector Weight"
  | "Sell" | "Underperform" | "Underweight";

export type AnalystEntry = {
  firm:     string;       // "Goldman Sachs"
  firmKo:   string;       // "골드만삭스"
  analyst?: string;
  rating:   AnalystRating;
  target:   number;
  date:     string;       // "2026-06-15"
  action?:  "Reiterate" | "Upgrade" | "Downgrade" | "Initiate";
};

export type RatingGroup = "buy" | "hold" | "sell";
export function ratingGroup(r: AnalystRating): RatingGroup {
  if (["Strong Buy","Buy","Outperform","Overweight","Initiate Buy"].includes(r)) return "buy";
  if (["Sell","Underperform","Underweight"].includes(r)) return "sell";
  return "hold";
}

export const ANALYST_TARGETS: Record<string, AnalystEntry[]> = {

  TSLA: [
    { firm: "Wedbush",          firmKo: "웨드부시",       analyst: "Dan Ives",       rating: "Outperform",   target: 550, date: "2026-06-18", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Adam Jonas",     rating: "Overweight",   target: 430, date: "2026-06-12", action: "Reiterate" },
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Mark Delaney",   rating: "Buy",          target: 500, date: "2026-06-14", action: "Reiterate" },
    { firm: "Piper Sandler",    firmKo: "파이퍼샌들러",   analyst: "Alexander Potter",rating: "Overweight",   target: 490, date: "2026-06-16", action: "Reiterate" },
    { firm: "Deutsche Bank",    firmKo: "도이체방크",     analyst: "Emmanuel Rosner", rating: "Buy",          target: 460, date: "2026-06-13", action: "Reiterate" },
    { firm: "Barclays",         firmKo: "바클레이즈",     analyst: "Dan Levy",       rating: "Equal-Weight", target: 315, date: "2026-06-10", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Joseph Spak",    rating: "Neutral",      target: 330, date: "2026-06-07", action: "Reiterate" },
  ],

  NVDA: [
    { firm: "Bank of America",  firmKo: "뱅크오브아메리카", analyst: "Vivek Arya",   rating: "Buy",          target: 195, date: "2026-06-18", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",          analyst: "Harlan Sur",    rating: "Overweight",   target: 188, date: "2026-06-16", action: "Reiterate" },
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",      analyst: "Toshiya Hari",  rating: "Buy",          target: 182, date: "2026-06-15", action: "Reiterate" },
    { firm: "Citi",             firmKo: "씨티",            analyst: "Atif Malik",    rating: "Buy",          target: 198, date: "2026-06-14", action: "Reiterate" },
    { firm: "Needham",          firmKo: "니덤",            analyst: "N. Quinn Bolton",rating: "Buy",          target: 205, date: "2026-06-13", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",      analyst: "Joseph Moore",  rating: "Overweight",   target: 178, date: "2026-06-12", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",             analyst: "Timothy Arcuri", rating: "Buy",         target: 175, date: "2026-06-10", action: "Reiterate" },
  ],

  AAPL: [
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Erik Woodring",  rating: "Overweight",   target: 275, date: "2026-06-18", action: "Reiterate" },
    { firm: "Wedbush",          firmKo: "웨드부시",       analyst: "Dan Ives",       rating: "Outperform",   target: 290, date: "2026-06-16", action: "Reiterate" },
    { firm: "Bank of America",  firmKo: "뱅크오브아메리카",analyst: "Wamsi Mohan",   rating: "Buy",          target: 280, date: "2026-06-14", action: "Reiterate" },
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Michael Ng",     rating: "Buy",          target: 265, date: "2026-06-12", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Samik Chatterjee",rating: "Overweight",  target: 270, date: "2026-06-10", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "David Vogt",     rating: "Neutral",      target: 235, date: "2026-06-08", action: "Reiterate" },
    { firm: "Barclays",         firmKo: "바클레이즈",     analyst: "Tim Long",       rating: "Equal-Weight", target: 225, date: "2026-06-07", action: "Reiterate" },
  ],

  MSFT: [
    { firm: "Wedbush",          firmKo: "웨드부시",       analyst: "Dan Ives",       rating: "Outperform",   target: 535, date: "2026-06-18", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Keith Weiss",    rating: "Overweight",   target: 520, date: "2026-06-16", action: "Reiterate" },
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Kash Rangan",    rating: "Buy",          target: 510, date: "2026-06-14", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Mark Murphy",    rating: "Overweight",   target: 505, date: "2026-06-12", action: "Reiterate" },
    { firm: "Piper Sandler",    firmKo: "파이퍼샌들러",   analyst: "Brent Bracelin", rating: "Overweight",   target: 498, date: "2026-06-10", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Karl Keirstead", rating: "Buy",          target: 495, date: "2026-06-09", action: "Reiterate" },
  ],

  AMZN: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Eric Sheridan",  rating: "Buy",          target: 270, date: "2026-06-18", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Doug Anmuth",    rating: "Overweight",   target: 278, date: "2026-06-16", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Brian Nowak",    rating: "Overweight",   target: 262, date: "2026-06-14", action: "Reiterate" },
    { firm: "Bank of America",  firmKo: "뱅크오브아메리카",analyst: "Justin Post",   rating: "Buy",          target: 282, date: "2026-06-12", action: "Reiterate" },
    { firm: "Barclays",         firmKo: "바클레이즈",     analyst: "Ross Sandler",   rating: "Overweight",   target: 265, date: "2026-06-10", action: "Reiterate" },
    { firm: "Needham",          firmKo: "니덤",           analyst: "Laura Martin",   rating: "Buy",          target: 285, date: "2026-06-09", action: "Reiterate" },
  ],

  META: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Eric Sheridan",  rating: "Buy",          target: 800, date: "2026-06-18", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Brian Nowak",    rating: "Overweight",   target: 810, date: "2026-06-16", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Doug Anmuth",    rating: "Overweight",   target: 820, date: "2026-06-14", action: "Reiterate" },
    { firm: "Bank of America",  firmKo: "뱅크오브아메리카",analyst: "Justin Post",   rating: "Buy",          target: 830, date: "2026-06-12", action: "Reiterate" },
    { firm: "Piper Sandler",    firmKo: "파이퍼샌들러",   analyst: "Thomas Champion", rating: "Overweight",  target: 790, date: "2026-06-10", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Lloyd Walmsley", rating: "Buy",          target: 780, date: "2026-06-09", action: "Reiterate" },
  ],

  GOOGL: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Eric Sheridan",  rating: "Buy",          target: 230, date: "2026-06-18", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Brian Nowak",    rating: "Overweight",   target: 220, date: "2026-06-16", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Doug Anmuth",    rating: "Overweight",   target: 232, date: "2026-06-14", action: "Reiterate" },
    { firm: "Bank of America",  firmKo: "뱅크오브아메리카",analyst: "Justin Post",   rating: "Buy",          target: 235, date: "2026-06-12", action: "Reiterate" },
    { firm: "Barclays",         firmKo: "바클레이즈",     analyst: "Ross Sandler",   rating: "Overweight",   target: 215, date: "2026-06-10", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Lloyd Walmsley", rating: "Buy",          target: 218, date: "2026-06-09", action: "Reiterate" },
  ],

  SPCX: [
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Adam Jonas",     rating: "Overweight",   target: 300, date: "2026-06-17", action: "Initiate" },
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Noah Poponak",   rating: "Buy",          target: 260, date: "2026-06-16", action: "Initiate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Philip Winslow", rating: "Overweight",   target: 305, date: "2026-06-16", action: "Initiate" },
    { firm: "Wedbush",          firmKo: "웨드부시",       analyst: "Dan Ives",       rating: "Outperform",   target: 325, date: "2026-06-15", action: "Initiate" },
    { firm: "Bank of America",  firmKo: "뱅크오브아메리카",analyst: "Ronald Epstein",rating: "Buy",          target: 270, date: "2026-06-15", action: "Initiate" },
    { firm: "Deutsche Bank",    firmKo: "도이체방크",     analyst: "Edison Yu",      rating: "Buy",          target: 280, date: "2026-06-14", action: "Initiate" },
    { firm: "Barclays",         firmKo: "바클레이즈",     analyst: "David Zazula",   rating: "Overweight",   target: 255, date: "2026-06-14", action: "Initiate" },
  ],

  PLTR: [
    { firm: "Wedbush",          firmKo: "웨드부시",       analyst: "Dan Ives",       rating: "Outperform",   target: 210, date: "2026-06-18", action: "Reiterate" },
    { firm: "Citi",             firmKo: "씨티",           analyst: "Tyler Radke",    rating: "Buy",          target: 185, date: "2026-06-16", action: "Upgrade"  },
    { firm: "Needham",          firmKo: "니덤",           analyst: "Mike Cikos",     rating: "Buy",          target: 175, date: "2026-06-14", action: "Reiterate" },
    { firm: "Bank of America",  firmKo: "뱅크오브아메리카",analyst: "Mariana Perez Mora",rating: "Neutral",  target: 135, date: "2026-06-12", action: "Reiterate" },
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Gabriela Borges",rating: "Neutral",      target: 115, date: "2026-06-10", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Sanjit Singh",   rating: "Equal-Weight", target: 110, date: "2026-06-08", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Karl Keirstead", rating: "Buy",          target: 168, date: "2026-06-07", action: "Reiterate" },
  ],

  AMD: [
    { firm: "Bank of America",  firmKo: "뱅크오브아메리카",analyst: "Vivek Arya",    rating: "Buy",          target: 185, date: "2026-06-18", action: "Reiterate" },
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Toshiya Hari",   rating: "Buy",          target: 180, date: "2026-06-16", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Harlan Sur",     rating: "Overweight",   target: 190, date: "2026-06-14", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Joseph Moore",   rating: "Overweight",   target: 175, date: "2026-06-12", action: "Reiterate" },
    { firm: "Piper Sandler",    firmKo: "파이퍼샌들러",   analyst: "Harsh Kumar",    rating: "Overweight",   target: 195, date: "2026-06-10", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Timothy Arcuri", rating: "Buy",          target: 172, date: "2026-06-09", action: "Reiterate" },
    { firm: "Barclays",         firmKo: "바클레이즈",     analyst: "Blayne Curtis",  rating: "Equal-Weight", target: 145, date: "2026-06-07", action: "Reiterate" },
  ],

  NFLX: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Eric Sheridan",  rating: "Buy",          target: 1350, date: "2026-06-18", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Benjamin Swinburne",rating: "Overweight",target: 1380, date: "2026-06-16", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Doug Anmuth",    rating: "Overweight",   target: 1400, date: "2026-06-14", action: "Reiterate" },
    { firm: "Bank of America",  firmKo: "뱅크오브아메리카",analyst: "Jessica Reif",  rating: "Buy",          target: 1420, date: "2026-06-12", action: "Reiterate" },
    { firm: "Needham",          firmKo: "니덤",           analyst: "Laura Martin",   rating: "Buy",          target: 1360, date: "2026-06-10", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "John Hodulik",   rating: "Buy",          target: 1330, date: "2026-06-09", action: "Reiterate" },
  ],

  ORCL: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Kash Rangan",    rating: "Buy",          target: 240, date: "2026-06-18", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Mark Murphy",    rating: "Overweight",   target: 235, date: "2026-06-16", action: "Reiterate" },
    { firm: "Piper Sandler",    firmKo: "파이퍼샌들러",   analyst: "Brent Bracelin", rating: "Overweight",   target: 245, date: "2026-06-14", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Keith Weiss",    rating: "Overweight",   target: 228, date: "2026-06-12", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Karl Keirstead", rating: "Neutral",      target: 195, date: "2026-06-10", action: "Reiterate" },
  ],

  IBM: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "James Schneider",rating: "Neutral",      target: 265, date: "2026-06-16", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Erik Woodring",  rating: "Equal-Weight", target: 260, date: "2026-06-14", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Tien-Tsin Huang",rating: "Overweight",   target: 285, date: "2026-06-12", action: "Reiterate" },
    { firm: "Citi",             firmKo: "씨티",           analyst: "Asiya Merchant", rating: "Buy",          target: 290, date: "2026-06-10", action: "Reiterate" },
    { firm: "Barclays",         firmKo: "바클레이즈",     analyst: "Ramsey El-Assal",rating: "Equal-Weight", target: 255, date: "2026-06-08", action: "Reiterate" },
  ],

  INTC: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Toshiya Hari",   rating: "Neutral",      target: 130, date: "2026-06-18", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Joseph Moore",   rating: "Equal-Weight", target: 125, date: "2026-06-16", action: "Upgrade"  },
    { firm: "Wedbush",          firmKo: "웨드부시",       analyst: "Matt Bryson",    rating: "Outperform",   target: 155, date: "2026-06-14", action: "Reiterate" },
    { firm: "Bank of America",  firmKo: "뱅크오브아메리카",analyst: "Vivek Arya",    rating: "Neutral",      target: 118, date: "2026-06-12", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Harlan Sur",     rating: "Neutral",      target: 122, date: "2026-06-10", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Timothy Arcuri", rating: "Buy",          target: 148, date: "2026-06-09", action: "Reiterate" },
  ],

  JPM: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Richard Ramsden",rating: "Buy",          target: 310, date: "2026-06-16", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Betsy Graseck",  rating: "Overweight",   target: 320, date: "2026-06-14", action: "Reiterate" },
    { firm: "Wells Fargo",      firmKo: "웰스파고",       analyst: "Mike Mayo",      rating: "Overweight",   target: 315, date: "2026-06-12", action: "Reiterate" },
    { firm: "Barclays",         firmKo: "바클레이즈",     analyst: "Jason Goldberg", rating: "Overweight",   target: 305, date: "2026-06-10", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Brennan Hawken", rating: "Neutral",      target: 275, date: "2026-06-08", action: "Reiterate" },
  ],

  RKLB: [
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Adam Jonas",     rating: "Overweight",   target: 35, date: "2026-06-16", action: "Reiterate" },
    { firm: "Canaccord",        firmKo: "캐나코드",       analyst: "Ken Herbert",    rating: "Buy",          target: 38, date: "2026-06-14", action: "Reiterate" },
    { firm: "Deutsche Bank",    firmKo: "도이체방크",     analyst: "Edison Yu",      rating: "Buy",          target: 36, date: "2026-06-12", action: "Reiterate" },
    { firm: "Piper Sandler",    firmKo: "파이퍼샌들러",   analyst: "Charles Minervino",rating: "Overweight", target: 40, date: "2026-06-10", action: "Reiterate" },
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Noah Poponak",   rating: "Neutral",      target: 25, date: "2026-06-08", action: "Reiterate" },
  ],

  CRWD: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Gabriela Borges",rating: "Buy",          target: 420, date: "2026-06-16", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Hamza Fodderwala",rating: "Overweight",  target: 430, date: "2026-06-14", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Brian Essex",    rating: "Overweight",   target: 440, date: "2026-06-12", action: "Reiterate" },
    { firm: "Piper Sandler",    firmKo: "파이퍼샌들러",   analyst: "Rob Owens",      rating: "Overweight",   target: 415, date: "2026-06-10", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Roger Boyd",     rating: "Buy",          target: 410, date: "2026-06-09", action: "Reiterate" },
  ],

  COIN: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Will Nance",     rating: "Buy",          target: 330, date: "2026-06-16", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Kenneth Worthington",rating: "Overweight",target: 350, date: "2026-06-14", action: "Reiterate" },
    { firm: "Canaccord",        firmKo: "캐나코드",       analyst: "Joseph Vafi",    rating: "Buy",          target: 370, date: "2026-06-12", action: "Reiterate" },
    { firm: "Barclays",         firmKo: "바클레이즈",     analyst: "Benjamin Budish",rating: "Equal-Weight", target: 270, date: "2026-06-10", action: "Reiterate" },
    { firm: "Citi",             firmKo: "씨티",           analyst: "Peter Christiansen",rating: "Neutral",   target: 285, date: "2026-06-08", action: "Reiterate" },
  ],

  TSM: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Bruce Lu",       rating: "Buy",          target: 215, date: "2026-06-16", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Charlie Chan",   rating: "Overweight",   target: 220, date: "2026-06-14", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Gokul Hariharan",rating: "Overweight",   target: 225, date: "2026-06-12", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Timothy Arcuri", rating: "Buy",          target: 210, date: "2026-06-10", action: "Reiterate" },
    { firm: "Barclays",         firmKo: "바클레이즈",     analyst: "Simon Coles",    rating: "Overweight",   target: 205, date: "2026-06-08", action: "Reiterate" },
  ],

  SNOW: [
    { firm: "Goldman Sachs",    firmKo: "골드만삭스",     analyst: "Kash Rangan",    rating: "Buy",          target: 230, date: "2026-06-16", action: "Reiterate" },
    { firm: "Morgan Stanley",   firmKo: "모건스탠리",     analyst: "Keith Weiss",    rating: "Overweight",   target: 220, date: "2026-06-14", action: "Reiterate" },
    { firm: "JPMorgan",         firmKo: "JP모건",         analyst: "Mark Murphy",    rating: "Neutral",      target: 185, date: "2026-06-12", action: "Reiterate" },
    { firm: "Piper Sandler",    firmKo: "파이퍼샌들러",   analyst: "Brent Bracelin", rating: "Overweight",   target: 225, date: "2026-06-10", action: "Reiterate" },
    { firm: "UBS",              firmKo: "UBS",            analyst: "Karl Keirstead", rating: "Neutral",      target: 178, date: "2026-06-08", action: "Reiterate" },
  ],
};
