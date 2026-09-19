import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { EXAMPLE_TEXTS } from "@/lib/sentiment";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sentiment Analysis — Understand the sentiment behind any text" },
      {
        name: "description",
        content:
          "Paste a review, comment, message or feedback and instantly see whether its sentiment is positive, neutral or negative.",
      },
      { property: "og:title", content: "Sentiment Analysis" },
      {
        property: "og:description",
        content: "Analyze any text for positive, neutral or negative sentiment using VADER and RoBERTa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-5xl px-5 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Text sentiment classification
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Understand the sentiment behind any text.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Paste a review, comment, message, feedback, or any text and instantly analyze whether its
            sentiment is positive, neutral, or negative.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/analyze"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Analyze sentiment
            </Link>
            <Link
              to="/how-it-works"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto w-full max-w-5xl px-5 py-14">
          <h2 className="text-xl font-semibold text-foreground">Try an example</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Select any sentence to open it in the analyzer.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {EXAMPLE_TEXTS.map((text) => (
              <button
                key={text}
                type="button"
                onClick={() => navigate({ to: "/analyze", search: { text } })}
                className="rounded-md border border-border bg-card p-4 text-left text-sm leading-relaxed text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
              >
                “{text}”
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 py-16">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "Works on any text",
              body: "Nothing needs to exist in a dataset. Whatever you paste is tokenized and scored directly by the model.",
            },
            {
              title: "Two complementary methods",
              body: "A transformer classifier gives the final label, while VADER's lexicon and rules provide supporting scores.",
            },
            {
              title: "Transparent numbers",
              body: "You see the full probability split and the VADER compound score, not just a single word.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-md border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
