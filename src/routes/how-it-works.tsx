import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Sentiment Analysis" },
      {
        name: "description",
        content:
          "How the analyzer turns your text into a sentiment label: VADER lexicon scoring plus a RoBERTa transformer classifier.",
      },
      { property: "og:title", content: "How It Works — Sentiment Analysis" },
      {
        property: "og:description",
        content: "From submitted text to probabilities to a final positive, neutral or negative label.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    step: "1",
    title: "Your text",
    body: "You submit any text. It is not matched against a dataset and it does not need to resemble anything seen before.",
  },
  {
    step: "2",
    title: "VADER + RoBERTa",
    body: "VADER scores the wording with a sentiment lexicon and grammatical rules such as negation, intensity and punctuation. In parallel, a RoBERTa transformer trained on social text reads the sentence as a whole.",
  },
  {
    step: "3",
    title: "Sentiment probabilities",
    body: "The transformer produces three probabilities that add up to 100%: positive, neutral and negative.",
  },
  {
    step: "4",
    title: "Final sentiment",
    body: "The highest probability becomes the reported sentiment, and that probability is shown as the confidence. VADER's scores are displayed alongside as supporting analysis.",
  },
];

function HowItWorks() {
  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">How it works</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          The analyzer follows the same approach as the original research notebook: a rule-based
          lexicon method and a pretrained transformer, applied to whatever text you provide.
        </p>

        <pre className="mt-8 overflow-x-auto rounded-md border border-border bg-surface p-5 font-mono text-xs leading-6 text-foreground">{`USER TEXT
   |
   v
VADER + RoBERTa
   |
   v
SENTIMENT PROBABILITIES
   |
   v
FINAL SENTIMENT`}</pre>

        <div className="mt-10 space-y-4">
          {STEPS.map((s) => (
            <div key={s.step} className="flex gap-4 rounded-md border border-border bg-card p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-medium text-primary">
                {s.step}
              </span>
              <div>
                <h2 className="text-base font-semibold text-foreground">{s.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-md border border-border bg-surface p-5">
          <h2 className="text-base font-semibold text-foreground">A note on accuracy</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Sentiment models estimate tone from linguistic patterns. Sarcasm, mixed opinions, domain
            jargon and very short fragments remain genuinely hard, so treat the output as a strong
            indication rather than a guaranteed verdict.
          </p>
        </div>

        <div className="mt-10">
          <Link
            to="/analyze"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Analyze sentiment
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
