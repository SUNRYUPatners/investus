"use client";

// Thin re-export so all existing `import { useAuth } from "@/hooks/useAuth"` continue to work.
export type { AuthUser } from "@/contexts/AuthContext";
export { useAuthCtx as useAuth } from "@/contexts/AuthContext";
