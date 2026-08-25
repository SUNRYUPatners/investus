import { createHmac } from "crypto";

export function makeAnonNick(email: string): string {
  const secret = process.env.ANON_SALT?.trim() || "investus-wall";
  const hex = createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex").slice(0, 8);
  return `익명_${hex}`;
}
