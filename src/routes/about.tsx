import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { MODEL_ID } from "@/lib/sentiment";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sentiment Analysis" },
      {
        name: "description",
        content:
          "About the Sentiment Analysis project: its origins in a VADER and RoBERTa research notebook, and how the web version works.",
      },
      { property: "og:title", content: "About — Sentiment Analysis" },
      {
        property: "og:description",
        content: "The methodology, models and privacy behind the Sentiment Analysis website.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">About this project</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Sentiment Analysis began as a research notebook comparing two well-established approaches to
          reading tone in written language: NLTK&apos;s VADER sentiment intensity analyzer and
          CardiffNLP&apos;s Twitter-trained RoBERTa classifier. The notebook used a large review
          dataset purely to compare the two methods. This website applies the same methodology to
          text you supply yourself.
        </p>

        <div className="mt-10 space-y-5">
          <section className="rounded-md border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground">The models</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">VADER</span> — a lexicon and rule-based
                analyzer that returns positive, neutral, negative and compound scores.
              </li>
              <li>
                <span className="font-medium text-foreground">RoBERTa</span> — a transformer sentiment
                classifier (<code className="font-mono text-xs">{MODEL_ID}</code>) that outputs a
                probability for each of the three classes. Its result is the reported sentiment.
              </li>
            </ul>
          </section>

          <section className="rounded-md border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground">Privacy</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Analysis runs entirely inside your browser. Your text is never uploaded to a server, and
              your recent analyses are stored only in your own browser&apos;s local storage, where you
              can clear them at any time.
            </p>
          </section>

          <section className="rounded-md border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground">Limitations</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              No sentiment system is correct every time. Irony, mixed opinions and specialised
              vocabulary can all shift a result. The confidence figure reflects the model&apos;s own
              certainty, not a guarantee.
            </p>
          </section>
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
