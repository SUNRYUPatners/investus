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

/**
 * Lazy admin client for module-scope usage. Returns a proxy that creates the
 * real admin client on first property access, so importing a route that keeps
 * a module-level `const supabase = getAdminSupabaseLazy()` does NOT read
 * SUPABASE_SERVICE_ROLE_KEY at build time (page-data collection). At runtime,
 * the first `.from(...)` call builds the real client exactly as before.
 */
export function getAdminSupabaseLazy(): SupabaseClient {
  let real: SupabaseClient | null = null;
  const resolve = () => (real ??= getAdminSupabase());
  return new Proxy({} as SupabaseClient, {
    get(_target, prop, receiver) {
      const client = resolve() as unknown as Record<string | symbol, unknown>;
      const value = client[prop];
      return typeof value === "function"
        ? (value as (...args: unknown[]) => unknown).bind(client)
        : Reflect.get(client as object, prop, receiver);
    },
  });
}

// Verify a request's JWT and return { email, id }, or null if unauthenticated.
// Usage: const user = await getUserFromRequest(req); if (!user) return 401;
export async function getUserFromRequest(
  req: NextRequest,
): Promise<{ email: string; id: string; nickname: string } | null> {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;
  try {
    const { data: { user }, error } = await getAdminSupabase().auth.getUser(token);
    if (error || !user?.email) return null;
    const meta = user.user_metadata?.nickname;
    const nickname =
      typeof meta === "string" && meta.trim().length >= 2
        ? meta.trim().slice(0, 16)
        : `투자자_${user.email.split("@")[0]?.slice(-4) ?? "user"}`;
    return { email: user.email, id: user.id, nickname };
  } catch {
    return null;
  }
}
