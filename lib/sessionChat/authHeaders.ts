import { getSupabase } from "@/lib/supabase";
import { getOrCreateGuestId, SESSION_CHAT_GUEST_KEY } from "@/lib/sessionChat/guestId";

export async function sessionChatAuthHeaders(): Promise<HeadersInit> {
  try {
    const { data: { session } } = await getSupabase().auth.getSession();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
    if (typeof window !== "undefined") {
      try {
        const guest = localStorage.getItem(SESSION_CHAT_GUEST_KEY) ?? getOrCreateGuestId();
        if (/^\d{8}$/.test(guest)) headers["X-Session-Guest-Id"] = guest;
      } catch { /* ignore */ }
    }
    return headers;
  } catch {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (typeof window !== "undefined") {
      try {
        const guest = getOrCreateGuestId();
        headers["X-Session-Guest-Id"] = guest;
      } catch { /* ignore */ }
    }
    return headers;
  }
}
