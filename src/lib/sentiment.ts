/**
 * Sentiment analysis engine.
 *
 * Mirrors the methodology of the original notebook:
 *   - NLTK VADER SentimentIntensityAnalyzer (lexicon + rules) as supporting analysis
 *   - CardiffNLP twitter-roberta-base-sentiment as the primary classifier
 *
 * The RoBERTa model runs locally in the browser through ONNX Runtime
 * (transformers.js). No dataset is consulted; any submitted text is tokenized
 * and scored by the model itself.
 */

export type SentimentLabel = "POSITIVE" | "NEUTRAL" | "NEGATIVE";

export interface VaderScores {
  positive: number;
  neutral: number;
  negative: number;
  compound: number;
}

export interface AnalysisResult {
  sentiment: SentimentLabel;
  confidence: number;
  probabilities: { positive: number; neutral: number; negative: number };
  vader: VaderScores;
  characters: number;
  words: number;
}

export const MODEL_ID = "Xenova/twitter-roberta-base-sentiment-latest";

type Classifier = (
  text: string,
  options?: Record<string, unknown>,
) => Promise<Array<{ label: string; score: number }> | Array<Array<{ label: string; score: number }>>>;

let classifierPromise: Promise<Classifier> | null = null;

export type LoadProgress = { status: string; progress?: number };

/** Loads (and caches) the RoBERTa sentiment pipeline in the browser. */
export function loadModel(onProgress?: (p: LoadProgress) => void): Promise<Classifier> {
  if (!classifierPromise) {
    classifierPromise = (async () => {
      const { pipeline, env } = await import("@huggingface/transformers");
      env.allowLocalModels = false;
      const pipe = await pipeline("text-classification", MODEL_ID, {
        dtype: "q8",
        progress_callback: (data: { status?: string; progress?: number }) => {
          const update: LoadProgress = { status: data?.status ?? "loading" };
          if (typeof data?.progress === "number") update.progress = data.progress;
          onProgress?.(update);
        },
      });
      return pipe as unknown as Classifier;
    })().catch((err) => {
      classifierPromise = null;
      throw err;
    });
  }
  return classifierPromise;
}

export function isModelReady() {
  return classifierPromise !== null;
}

function normaliseLabel(raw: string): "positive" | "neutral" | "negative" | null {
  const l = raw.toLowerCase();
  if (l.includes("pos") || l === "label_2") return "positive";
  if (l.includes("neu") || l === "label_1") return "neutral";
  if (l.includes("neg") || l === "label_0") return "negative";
  return null;
}

/** Runs VADER + RoBERTa over arbitrary user text. */
export async function analyzeText(
  text: string,
  onProgress?: (p: LoadProgress) => void,
): Promise<AnalysisResult> {
  const trimmed = text.trim();
  if (!trimmed) throw new Error("EMPTY_TEXT");

  const [{ SentimentIntensityAnalyzer }, classifier] = await Promise.all([
    import("vader-sentiment"),
    loadModel(onProgress),
  ]);

  const v = SentimentIntensityAnalyzer.polarity_scores(trimmed);

  const raw = await classifier(trimmed, { top_k: 3 });
  const flat = (Array.isArray(raw[0]) ? raw[0] : raw) as Array<{ label: string; score: number }>;

  const probabilities = { positive: 0, neutral: 0, negative: 0 };
  for (const entry of flat) {
    const key = normaliseLabel(entry.label);
    if (key) probabilities[key] = entry.score;
  }

  const total = probabilities.positive + probabilities.neutral + probabilities.negative;
  if (total > 0) {
    probabilities.positive /= total;
    probabilities.neutral /= total;
    probabilities.negative /= total;
  }

  const ranked = (Object.entries(probabilities) as Array<[keyof typeof probabilities, number]>).sort(
    (a, b) => b[1] - a[1],
  );
  const [topKey, topScore] = ranked[0];

  return {
    sentiment: topKey.toUpperCase() as SentimentLabel,
    confidence: topScore,
    probabilities,
    vader: { positive: v.pos, neutral: v.neu, negative: v.neg, compound: v.compound },
    characters: trimmed.length,
    words: trimmed.split(/\s+/).filter(Boolean).length,
  };
}

export const EXAMPLE_TEXTS = [
  "I absolutely loved this product. It arrived early and works exactly as described.",
  "This movie was okay. Nothing special, but I didn't dislike it either.",
  "The service was terrible and nobody bothered to reply to my emails.",
  "The experience was disappointing but the staff were helpful and polite.",
];
