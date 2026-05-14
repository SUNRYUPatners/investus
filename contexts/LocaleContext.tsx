"use client";

import { createContext, useContext } from "react";
import { type Locale, getT } from "@/lib/i18n";

const LocaleContext = createContext<Locale>("ko");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return getT(useContext(LocaleContext));
}

export function useLocaleCode() {
  return useContext(LocaleContext);
}
