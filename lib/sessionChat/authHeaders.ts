import { getSupabase } from "@/lib/supabase";

export async function sessionChatAuthHeaders(): Promise<HeadersInit> {
  try {
    const { data: { session } } = await getSupabase().auth.getSession();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
    return headers;
  } catch {
    return { "Content-Type": "application/json" };
  }
}
