import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars not set (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)");
  _client = createClient(url, key);
  return _client;
}

// Server-only admin client — bypasses RLS. Never use on the client side.
export function getAdminSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  return createClient(url, key, { auth: { persistSession: false } });
}

// Verify a request's JWT and return { email, id }, or null if unauthenticated.
// Usage: const user = await getUserFromRequest(req); if (!user) return 401;
export async function getUserFromRequest(req: NextRequest): Promise<{ email: string; id: string } | null> {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;
  try {
    const { data: { user }, error } = await getAdminSupabase().auth.getUser(token);
    if (error || !user?.email) return null;
    return { email: user.email, id: user.id };
  } catch {
    return null;
  }
}
