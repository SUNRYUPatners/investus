"use client";

import { useLocalStorage } from "./useLocalStorage";

export function useWatchlist() {
  const [list, setList] = useLocalStorage<string[]>("uss_watchlist", []);

  const add    = (sym: string) => setList((p) => p.includes(sym) ? p : [...p, sym]);
  const remove = (sym: string) => setList((p) => p.filter((s) => s !== sym));
  const toggle = (sym: string) => setList((p) => p.includes(sym) ? p.filter((s) => s !== sym) : [...p, sym]);
  const has    = (sym: string, cur: string[]) => cur.includes(sym);

  return { list, add, remove, toggle, has };
}
