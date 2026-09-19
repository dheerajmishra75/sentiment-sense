import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/analyze", label: "Analyze" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5">
          <Link to="/" className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Sentiment<span className="text-primary"> Analysis</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="text-sm transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/analyze"
              className="rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Analyze text
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground md:hidden"
          >
            Menu
          </button>
        </div>

        {open ? (
          <nav className="border-t border-border bg-background px-5 py-3 md:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Sentiment Analysis — VADER and RoBERTa text classification.</p>
          <p>Results are model estimates, not absolute judgements.</p>
        </div>
      </footer>
    </div>
  );
}
