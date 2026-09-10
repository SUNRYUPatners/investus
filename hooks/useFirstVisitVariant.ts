"use client";

import { useEffect, useState } from "react";
import {
  assignFirstVisitVariant,
  ONBOARDED_EVENT,
  readOnboarded,
  type FirstVisitVariant,
} from "@/lib/firstVisitVariant";

export function useFirstVisitVariant() {
  const [variant, setVariant] = useState<FirstVisitVariant | null>(null);
  const [onboarded, setOnboarded] = useState(true);

  useEffect(() => {
    setVariant(assignFirstVisitVariant());
    setOnboarded(readOnboarded());
    const onDone = () => setOnboarded(true);
    window.addEventListener(ONBOARDED_EVENT, onDone);
    return () => window.removeEventListener(ONBOARDED_EVENT, onDone);
  }, []);

  return { variant, onboarded, ready: variant !== null };
}
