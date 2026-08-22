import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { KanagamLogo } from "@/components/KanagamLogo";
import { ALL_SERVICES, getServiceBySlug } from "@/lib/services";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/service/$slug")({
  beforeLoad: ({ params }) => {
    if (!getServiceBySlug(params.slug)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const svc = getServiceBySlug(params.slug);
    return {
      meta: [
        { title: `${svc?.title ?? "Service"} — Kanagam Technology Solutions` },
        { name: "description", content: svc?.description ?? "" },
      ],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const svc = getServiceBySlug(slug)!;
  const Icon = svc.icon;
  const others = ALL_SERVICES.filter((s) => s.slug !== svc.slug);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background font-sans text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-stage)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.25] [background-image:var(--grain)]" />

      {/* Simple Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-3">
            <KanagamLogo size="md" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[0.65rem] tracking-[0.2em] text-foreground uppercase font-semibold transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Detail Content */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase font-mono">
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>{svc.group}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary">{svc.title}</span>
        </div>

        {/* Title Block */}
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <span className="text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
                {svc.category}
              </span>
              <h1 className="font-display mt-1 text-[clamp(1.7rem,4vw,2.6rem)] leading-tight font-bold tracking-tight text-foreground">
                {svc.title}
              </h1>
            </div>
          </div>

          {svc.badge && (
            <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[0.6rem] tracking-[0.2em] text-primary uppercase font-mono font-medium">
              <Sparkles className="h-3 w-3" />
              {svc.badge}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {svc.description}
        </p>

        {/* Highlights */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-xl backdrop-blur-md">
          <h2 className="text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
            {svc.highlightsTitle}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {svc.highlights.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 rounded-xl border border-border/70 bg-background p-4 text-sm font-normal text-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Row */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            hash="institutional-inquire"
            className="group inline-flex items-center gap-2 rounded-full bg-[#4B1D3F] dark:bg-[#D7AB6A] px-8 py-3.5 text-xs font-bold tracking-[0.22em] text-white dark:text-[#4B1D3F] uppercase shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <span>Partner With Us</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/student-enquire"
            className="rounded-full border border-primary/40 bg-primary/10 px-8 py-3.5 text-xs font-bold tracking-[0.22em] text-primary uppercase transition-colors hover:bg-primary/20"
          >
            Student Enquire
          </Link>
        </div>

        {/* Explore Other Areas */}
        <div className="mt-16 rounded-2xl border border-primary/30 bg-card/80 p-6 shadow-lg backdrop-blur-md">
          <h3 className="text-center text-[0.65rem] tracking-[0.25em] text-primary uppercase font-mono font-bold">
            Explore Our Other Focus Areas
          </h3>
          <ul className="mt-4 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => {
              const OtherIcon = other.icon;
              return (
                <li key={other.slug}>
                  <Link
                    to="/service/$slug"
                    params={{ slug: other.slug }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs transition-colors hover:bg-primary/10 hover:text-primary ${
                      other.group === svc.group ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <OtherIcon className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="truncate">{other.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
