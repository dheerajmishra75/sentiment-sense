import type { SentimentLabel } from "./sentiment";

export interface HistoryEntry {
  id: string;
  preview: string;
  sentiment: SentimentLabel;
  confidence: number;
  timestamp: number;
}

const KEY = "sa.history.v1";
const MAX = 10;

export function readHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function addHistory(entry: Omit<HistoryEntry, "id" | "timestamp">): HistoryEntry[] {
  const next = [
    { ...entry, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, timestamp: Date.now() },
    ...readHistory(),
  ].slice(0, MAX);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
  return next;
}

export function clearHistory(): HistoryEntry[] {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
  return [];
}
