import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import {
  EXAMPLE_TEXTS,
  analyzeText,
  type AnalysisResult,
  type LoadProgress,
  type SentimentLabel,
} from "@/lib/sentiment";
import { addHistory, clearHistory, readHistory, type HistoryEntry } from "@/lib/history";

const MAX_CHARS = 5000;

export const Route = createFileRoute("/analyze")({
  validateSearch: (search: Record<string, unknown>): { text?: string } =>
    typeof search["text"] === "string" ? { text: search["text"] as string } : {},
  head: () => ({
    meta: [
      { title: "Analyze Text — Sentiment Analysis" },
      {
        name: "description",
        content:
          "Paste any text and analyze its sentiment: positive, neutral or negative, with model confidence and VADER scores.",
      },
      { property: "og:title", content: "Analyze Text — Sentiment Analysis" },
      {
        property: "og:description",
        content: "Run any review, comment or message through VADER and RoBERTa sentiment analysis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalyzePage,
});

const TONE: Record<SentimentLabel, { text: string; bar: string; chip: string }> = {
  POSITIVE: {
    text: "text-positive",
    bar: "bg-positive",
    chip: "border-positive/30 bg-positive/10 text-positive",
  },
  NEUTRAL: {
    text: "text-neutralx",
    bar: "bg-neutralx",
    chip: "border-border bg-surface text-neutralx",
  },
  NEGATIVE: {
    text: "text-negative",
    bar: "bg-negative",
    chip: "border-negative/30 bg-negative/10 text-negative",
  },
};

const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

function AnalyzePage() {
  const { text: initialText } = Route.useSearch();
  const [text, setText] = useState(initialText ?? "");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [progress, setProgress] = useState<LoadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(readHistory());
  }, []);

  useEffect(() => {
    if (initialText) setText(initialText);
  }, [initialText]);

  async function handleAnalyze() {
    const trimmed = text.trim();
    if (trimmed.length < 2) {
      setError("Please enter at least a couple of words to analyze.");
      return;
    }
    setError(null);
    setStatus("loading");
    setProgress(null);
    setResult(null);
    try {
      const res = await analyzeText(trimmed, (p) => setProgress(p));
      setResult(res);
      setStatus("done");
      setHistory(
        addHistory({
          preview: trimmed.slice(0, 90),
          sentiment: res.sentiment,
          confidence: res.confidence,
        }),
      );
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch {
      setStatus("error");
      setError("The analyzer could not finish. Please check your connection and try again.");
    }
  }

  const downloading =
    progress && progress.status !== "ready" && typeof progress.progress === "number"
      ? Math.min(99, Math.round(progress.progress))
      : null;

  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-3xl px-5 py-12">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Analyze text</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Paste any review, comment, message or piece of feedback. The text is analyzed on the spot —
          it does not need to come from any dataset.
        </p>

        <div className="mt-8 rounded-md border border-border bg-card p-5">
          <label htmlFor="input-text" className="text-sm font-medium text-foreground">
            Your text
          </label>
          <textarea
            id="input-text"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
            rows={8}
            placeholder="Paste or type anything here..."
            className="mt-2 w-full resize-y rounded-md border border-input bg-background p-3.5 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-ring/20"
          />

          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {text.length} / {MAX_CHARS} characters
            </span>
            <span>{text.trim() ? text.trim().split(/\s+/).length : 0} words</span>
          </div>

          {error ? <p className="mt-3 text-sm text-negative">{error}</p> : null}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={status === "loading"}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Analyzing sentiment..." : "Analyze sentiment"}
            </button>
            <button
              type="button"
              onClick={() => {
                setText("");
                setResult(null);
                setStatus("idle");
                setError(null);
              }}
              className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Clear
            </button>
          </div>

          {status === "loading" ? (
            <p className="mt-3 text-xs text-muted-foreground">
              {downloading !== null
                ? `Preparing the language model for the first time (${downloading}%). This happens once per browser.`
                : "Analyzing sentiment..."}
            </p>
          ) : null}

          <div className="mt-6 border-t border-border pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Example texts
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {EXAMPLE_TEXTS.map((ex, i) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setText(ex)}
                  className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  Example {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {result ? (
          <div ref={resultRef} className="mt-8 scroll-mt-20 rounded-md border border-border bg-card p-6">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Sentiment
            </p>
            <div className="mt-2 flex flex-wrap items-baseline gap-4">
              <h2 className={`font-serif text-4xl font-semibold ${TONE[result.sentiment].text}`}>
                {result.sentiment}
              </h2>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${TONE[result.sentiment].chip}`}
              >
                Confidence {pct(result.confidence)}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {(
                [
                  ["Positive", result.probabilities.positive, "bg-positive"],
                  ["Neutral", result.probabilities.neutral, "bg-neutralx"],
                  ["Negative", result.probabilities.negative, "bg-negative"],
                ] as const
              ).map(([label, value, bar]) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{label}</span>
                    <span className="font-mono text-xs text-muted-foreground">{pct(value)}</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface">
                    <div
                      className={`h-full rounded-full transition-[width] duration-500 ${bar}`}
                      style={{ width: `${Math.max(1, value * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-border pt-5">
              <h3 className="text-sm font-semibold text-foreground">Supporting analysis (VADER)</h3>
              <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(
                  [
                    ["Positive", result.vader.positive],
                    ["Neutral", result.vader.neutral],
                    ["Negative", result.vader.negative],
                    ["Compound", result.vader.compound],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="rounded-md border border-border bg-surface px-3 py-2.5">
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="mt-0.5 font-mono text-sm text-foreground">{value.toFixed(3)}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">
                {result.words} words · {result.characters} characters analyzed.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setText("");
                setResult(null);
                setStatus("idle");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-6 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Analyze another text
            </button>
          </div>
        ) : null}

        {history.length > 0 ? (
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Recent analyses</h2>
              <button
                type="button"
                onClick={() => setHistory(clearHistory())}
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Clear history
              </button>
            </div>
            <ul className="mt-4 divide-y divide-border rounded-md border border-border bg-card">
              {history.map((h) => (
                <li key={h.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">{h.preview}</span>
                  <span className="flex items-center gap-3 text-xs">
                    <span className={`font-medium ${TONE[h.sentiment].text}`}>{h.sentiment}</span>
                    <span className="font-mono text-muted-foreground">{pct(h.confidence)}</span>
                    <span className="text-muted-foreground">
                      {new Date(h.timestamp).toLocaleString()}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </SiteLayout>
  );
}
