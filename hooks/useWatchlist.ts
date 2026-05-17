"use client";

import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useAuth } from "./useAuth";

export function useWatchlist() {
  const { user } = useAuth();
  const key = user ? `uss_watchlist_${user.id}` : "uss_watchlist";
  const [list, setList] = useLocalStorage<string[]>(key, []);

  // On first login, migrate generic watchlist to the user-specific key
  useEffect(() => {
    if (!user) return;
    const userKey = `uss_watchlist_${user.id}`;
    const stored = localStorage.getItem(userKey);
    if (!stored || JSON.parse(stored).length === 0) {
      const generic = localStorage.getItem("uss_watchlist");
      if (generic) {
        const parsed = JSON.parse(generic);
        if (parsed.length > 0) setList(parsed);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const add    = (sym: string) => setList((p) => p.includes(sym) ? p : [...p, sym]);
  const remove = (sym: string) => setList((p) => p.filter((s) => s !== sym));
  const toggle = (sym: string) => setList((p) => p.includes(sym) ? p.filter((s) => s !== sym) : [...p, sym]);
  const has    = (sym: string, cur: string[]) => cur.includes(sym);

  return { list, add, remove, toggle, has };
}
