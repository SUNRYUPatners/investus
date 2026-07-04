// Major recurring US economic events — 2026 H2
// Dates based on standard BLS/BEA/Fed release calendars (approximate, may shift ±1-2 days)
// times in UTC; ET release times: 8:30 AM ET = 12:30 UTC, 10:00 AM ET = 14:00 UTC, 2:00 PM ET = 18:00 UTC (summer/EDT)

export type StaticEcoEvent = {
  date: string;   // YYYY-MM-DD
  time: string;   // ISO UTC
  event: string;
  impact: "high" | "medium" | "low";
  country: string;
  unit: string;
  actual: null;
  estimate: null;
  prev: null;
};

export const STATIC_US_ECO_EVENTS: StaticEcoEvent[] = [
  // ── July 2026 ──────────────────────────────────────────────────────────────
  { date:"2026-07-07", time:"2026-07-07T14:00:00Z", event:"ISM Services PMI",          impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-07-08", time:"2026-07-08T14:00:00Z", event:"JOLTS Job Openings",        impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-07-10", time:"2026-07-10T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-07-10", time:"2026-07-10T12:30:00Z", event:"PPI (MoM)",                 impact:"medium", country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-07-15", time:"2026-07-15T12:30:00Z", event:"CPI (YoY)",                 impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-07-15", time:"2026-07-15T12:30:00Z", event:"Core CPI (YoY)",            impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-07-16", time:"2026-07-16T12:30:00Z", event:"Retail Sales (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-07-16", time:"2026-07-16T12:30:00Z", event:"PPI (YoY)",                 impact:"medium", country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-07-17", time:"2026-07-17T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-07-17", time:"2026-07-17T12:30:00Z", event:"Housing Starts",            impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-07-24", time:"2026-07-24T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-07-24", time:"2026-07-24T13:45:00Z", event:"S&P Global PMI Composite",  impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-07-25", time:"2026-07-25T14:00:00Z", event:"New Home Sales",            impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-07-28", time:"2026-07-28T14:00:00Z", event:"Consumer Confidence (CB)",  impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-07-29", time:"2026-07-29T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-07-30", time:"2026-07-30T12:30:00Z", event:"GDP Q2 2026 (Advance)",     impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-07-30", time:"2026-07-30T18:00:00Z", event:"FOMC Rate Decision",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-07-31", time:"2026-07-31T12:30:00Z", event:"PCE Deflator (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-07-31", time:"2026-07-31T12:30:00Z", event:"Employment Cost Index",     impact:"medium", country:"US", unit:"%", actual:null, estimate:null, prev:null },

  // ── August 2026 ────────────────────────────────────────────────────────────
  { date:"2026-08-03", time:"2026-08-03T14:00:00Z", event:"ISM Manufacturing PMI",     impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-08-05", time:"2026-08-05T14:00:00Z", event:"ISM Services PMI",          impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-08-05", time:"2026-08-05T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-08-06", time:"2026-08-06T14:00:00Z", event:"JOLTS Job Openings",        impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-08-07", time:"2026-08-07T12:30:00Z", event:"NFP (Non-Farm Payrolls)",   impact:"high",   country:"US", unit:"K", actual:null, estimate:null, prev:null },
  { date:"2026-08-07", time:"2026-08-07T12:30:00Z", event:"Unemployment Rate",         impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-08-12", time:"2026-08-12T12:30:00Z", event:"CPI (YoY)",                 impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-08-12", time:"2026-08-12T12:30:00Z", event:"Core CPI (YoY)",            impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-08-13", time:"2026-08-13T12:30:00Z", event:"PPI (MoM)",                 impact:"medium", country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-08-14", time:"2026-08-14T12:30:00Z", event:"Retail Sales (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-08-14", time:"2026-08-14T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-08-21", time:"2026-08-21T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-08-25", time:"2026-08-25T14:00:00Z", event:"Consumer Confidence (CB)",  impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-08-27", time:"2026-08-27T12:30:00Z", event:"GDP Q2 2026 (2nd Est.)",    impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-08-28", time:"2026-08-28T12:30:00Z", event:"PCE Deflator (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },

  // ── September 2026 ─────────────────────────────────────────────────────────
  { date:"2026-09-01", time:"2026-09-01T14:00:00Z", event:"ISM Manufacturing PMI",     impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-09-03", time:"2026-09-03T14:00:00Z", event:"ISM Services PMI",          impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-09-04", time:"2026-09-04T12:30:00Z", event:"NFP (Non-Farm Payrolls)",   impact:"high",   country:"US", unit:"K", actual:null, estimate:null, prev:null },
  { date:"2026-09-04", time:"2026-09-04T12:30:00Z", event:"Unemployment Rate",         impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-09-10", time:"2026-09-10T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-09-11", time:"2026-09-11T12:30:00Z", event:"CPI (YoY)",                 impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-09-11", time:"2026-09-11T12:30:00Z", event:"Core CPI (YoY)",            impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-09-12", time:"2026-09-12T12:30:00Z", event:"PPI (MoM)",                 impact:"medium", country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-09-12", time:"2026-09-12T12:30:00Z", event:"Retail Sales (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-09-17", time:"2026-09-17T18:00:00Z", event:"FOMC Rate Decision",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-09-18", time:"2026-09-18T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-09-25", time:"2026-09-25T12:30:00Z", event:"GDP Q2 2026 (3rd Est.)",    impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-09-25", time:"2026-09-25T12:30:00Z", event:"PCE Deflator (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-09-29", time:"2026-09-29T14:00:00Z", event:"Consumer Confidence (CB)",  impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },

  // ── October 2026 ───────────────────────────────────────────────────────────
  { date:"2026-10-01", time:"2026-10-01T14:00:00Z", event:"ISM Manufacturing PMI",     impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-10-02", time:"2026-10-02T12:30:00Z", event:"NFP (Non-Farm Payrolls)",   impact:"high",   country:"US", unit:"K", actual:null, estimate:null, prev:null },
  { date:"2026-10-02", time:"2026-10-02T12:30:00Z", event:"Unemployment Rate",         impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-10-05", time:"2026-10-05T14:00:00Z", event:"ISM Services PMI",          impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-10-07", time:"2026-10-07T14:00:00Z", event:"JOLTS Job Openings",        impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-10-08", time:"2026-10-08T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-10-13", time:"2026-10-13T12:30:00Z", event:"CPI (YoY)",                 impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-10-13", time:"2026-10-13T12:30:00Z", event:"Core CPI (YoY)",            impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-10-14", time:"2026-10-14T12:30:00Z", event:"PPI (MoM)",                 impact:"medium", country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-10-15", time:"2026-10-15T12:30:00Z", event:"Retail Sales (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-10-15", time:"2026-10-15T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-10-22", time:"2026-10-22T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-10-27", time:"2026-10-27T14:00:00Z", event:"Consumer Confidence (CB)",  impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-10-29", time:"2026-10-29T12:30:00Z", event:"GDP Q3 2026 (Advance)",     impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-10-29", time:"2026-10-29T12:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-10-30", time:"2026-10-30T12:30:00Z", event:"PCE Deflator (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },

  // ── November 2026 ──────────────────────────────────────────────────────────
  { date:"2026-11-02", time:"2026-11-02T15:00:00Z", event:"ISM Manufacturing PMI",     impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-11-04", time:"2026-11-04T15:00:00Z", event:"ISM Services PMI",          impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-11-05", time:"2026-11-05T19:00:00Z", event:"FOMC Rate Decision",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-11-06", time:"2026-11-06T13:30:00Z", event:"NFP (Non-Farm Payrolls)",   impact:"high",   country:"US", unit:"K", actual:null, estimate:null, prev:null },
  { date:"2026-11-06", time:"2026-11-06T13:30:00Z", event:"Unemployment Rate",         impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-11-12", time:"2026-11-12T13:30:00Z", event:"CPI (YoY)",                 impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-11-12", time:"2026-11-12T13:30:00Z", event:"Core CPI (YoY)",            impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-11-13", time:"2026-11-13T13:30:00Z", event:"PPI (MoM)",                 impact:"medium", country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-11-14", time:"2026-11-14T13:30:00Z", event:"Retail Sales (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-11-19", time:"2026-11-19T13:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-11-24", time:"2026-11-24T15:00:00Z", event:"Consumer Confidence (CB)",  impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-11-25", time:"2026-11-25T13:30:00Z", event:"GDP Q3 2026 (2nd Est.)",    impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-11-25", time:"2026-11-25T13:30:00Z", event:"PCE Deflator (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },

  // ── December 2026 ──────────────────────────────────────────────────────────
  { date:"2026-12-01", time:"2026-12-01T15:00:00Z", event:"ISM Manufacturing PMI",     impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-12-03", time:"2026-12-03T15:00:00Z", event:"ISM Services PMI",          impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-12-04", time:"2026-12-04T13:30:00Z", event:"NFP (Non-Farm Payrolls)",   impact:"high",   country:"US", unit:"K", actual:null, estimate:null, prev:null },
  { date:"2026-12-04", time:"2026-12-04T13:30:00Z", event:"Unemployment Rate",         impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-12-10", time:"2026-12-10T19:00:00Z", event:"FOMC Rate Decision",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-12-11", time:"2026-12-11T13:30:00Z", event:"CPI (YoY)",                 impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-12-11", time:"2026-12-11T13:30:00Z", event:"Core CPI (YoY)",            impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-12-12", time:"2026-12-12T13:30:00Z", event:"PPI (MoM)",                 impact:"medium", country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-12-16", time:"2026-12-16T13:30:00Z", event:"Retail Sales (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-12-17", time:"2026-12-17T13:30:00Z", event:"Initial Jobless Claims",    impact:"medium", country:"US", unit:"",  actual:null, estimate:null, prev:null },
  { date:"2026-12-23", time:"2026-12-23T13:30:00Z", event:"GDP Q3 2026 (3rd Est.)",    impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
  { date:"2026-12-23", time:"2026-12-23T13:30:00Z", event:"PCE Deflator (MoM)",        impact:"high",   country:"US", unit:"%", actual:null, estimate:null, prev:null },
];
