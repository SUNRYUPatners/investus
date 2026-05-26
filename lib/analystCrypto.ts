import { createHmac } from "crypto";

// One-way HMAC hash of user ID — server secret never stored in DB.
// Even if Supabase is fully compromised, alias cannot be linked back to a real identity
// without also having the ANON_SALT env var.
export function hashUserId(userId: string, suffix = ""): string {
  const salt = process.env.ANON_SALT;
  if (!salt) throw new Error("ANON_SALT env var is not set");
  return createHmac("sha256", salt).update(userId + suffix).digest("hex");
}

// Deterministic alias from the hash (district + animal + number, no raw userId)
export function aliasFromHash(h: string): string {
  // Convert first 8 hex chars to a number for distribution
  const n = parseInt(h.slice(0, 8), 16);
  const districts = ["여의도", "강남", "을지로", "서초", "광화문", "마포"];
  const animals   = ["독수리", "황소", "여우", "곰", "사자", "올빼미", "늑대", "호랑이", "표범"];
  const district  = districts[n % districts.length];
  const animal    = animals[((n >> 3) % animals.length + animals.length) % animals.length];
  const num       = String(((n >> 6) % 90) + 10);
  return `${district} ${animal} #${num}`;
}

// Generate both hash and alias together
export function anonymize(userId: string): { userHash: string; alias: string } {
  const userHash = hashUserId(userId);
  return { userHash, alias: aliasFromHash(userHash) };
}

// Hash used for like deduplication — separate suffix so it can't be correlated with userHash
export function likerHash(userId: string): string {
  return hashUserId(userId, ":like");
}
