import Link from "next/link";
import { ArrowUpRight, BookOpen, Code2, Terminal, Trophy, Zap, Cpu } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { GithubIcon } from "@/components/brand-icons";
import { FOCUS, METRICS, PROJECTS, SITE } from "@/lib/site-data";
import { getLiveCodingStats } from "@/lib/coding-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const featured = PROJECTS.filter((project) => project.featured);
  const codingStats = await getLiveCodingStats();

  const problemsSolved = codingStats.problemsSolved ? `${codingStats.problemsSolved}+` : "—";
  const contestCount = codingStats.contestCount ? `${codingStats.contestCount}+` : "—";
  const codeforcesRating = codingStats.codeforces?.maxRating ?? "—";
  const githubContributions = codingStats.github?.totalContributions
    ? codingStats.github.totalContributions.toLocaleString()
    : "—";


  const heroMetrics = [
    ...METRICS,
    { value: problemsSolved, label: "Problems Solved" },
    { value: contestCount, label: "Contests" },
  ];

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
              Available for internships · 2026
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Shani Prajapati.
              <br />
              <span className="text-muted-foreground">Builds software that</span>{" "}
              <span className="text-ember">thinks.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Aspiring Software engineer, competitive programmer and product builder. Currently shipping
              full-stack apps and exploring AI engineering, system design and browser internals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-md bg-ember px-4 py-2.5 font-mono text-sm font-medium text-ember-foreground transition-transform hover:-translate-y-0.5"
              >
                View projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/coding"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-sm font-medium hover:border-ember/60"
              >
                Coding profile
              </Link>
              <a
                href={SITE.resumeUrl}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-sm font-medium hover:border-ember/60"
              >
                Resume
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="ember-glow relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  ~/now
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  <span className="h-2 w-2 rounded-full bg-ember" />
                </div>
              </div>
              <div className="mt-4 space-y-2 font-mono text-sm leading-relaxed">
                <div>
                  <span className="text-ember">→</span> shipping <span className="text-foreground">The Clover</span>
                </div>
                <div>
                  <span className="text-ember">→</span> studying <span className="text-foreground">system design</span>
                </div>
                <div>
                  <span className="text-ember">→</span> grinding <span className="text-foreground">codeforces rounds</span>
                </div>
                <div>
                  <span className="text-ember">→</span> writing <span className="text-foreground">notes & essays</span>
                </div>
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Stack today
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["TypeScript", "React", "Node", "Postgres", "Python", "Rust"].map((stackItem) => (
                    <span key={stackItem} className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px]">
                      {stackItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {heroMetrics.map((metric, index) => (
            <div key={metric.label} className="bento-card group p-6">
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {String(index + 1).padStart(2, "0")} · {metric.label}
              </div>
              <div className="mt-4 text-4xl font-semibold tracking-tight transition-colors group-hover:text-ember sm:text-5xl">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-ember">/ featured</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Selected projects
            </h2>
          </div>
          <Link href="/projects" className="hidden font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-ember sm:inline-flex">
            All projects →
          </Link>
        </div>

        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-3 md:grid-cols-6">
          {featured.map((project, index) => {
            const span = index === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2";

            return (
              <a
                key={project.slug}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`bento-card group relative flex flex-col justify-between overflow-hidden p-6 ${span}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" />
                      {project.status}
                    </span>
                  </div>
                  <h3 className={`mt-4 font-semibold tracking-tight transition-colors group-hover:text-ember ${index === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                    {project.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">{project.tagline}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, index === 0 ? 5 : 3).map((stackItem) => (
                      <span key={stackItem} className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                        {stackItem}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
                </div>
              </a>
            );
          })}

          <Link href="/coding" className="bento-card group relative flex flex-col justify-between overflow-hidden p-6 md:col-span-2">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-ember" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Coding
                </span>
              </div>
              <div className="mt-4 font-mono text-3xl font-semibold text-ember">{problemsSolved}</div>
              <div className="text-sm text-muted-foreground">problems · {contestCount} contests · CF {codeforcesRating}</div>
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-ember">
              View dashboard →
            </div>
          </Link>

          <Link href="/articles" className="bento-card group relative flex flex-col justify-between overflow-hidden p-6 md:col-span-2">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-ember" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Writing
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-snug group-hover:text-ember">
                Latest: A Mental Model for React Server Components
              </h3>
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-ember">
              Read articles →
            </div>
          </Link>

          <a href={SITE.socials.github} target="_blank" rel="noopener noreferrer" className="bento-card group relative flex flex-col justify-between overflow-hidden p-6 md:col-span-2">
            <div>
              <div className="flex items-center gap-2">
                <GithubIcon className="h-4 w-4 text-ember" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Open Source
                </span>
              </div>
              <div className="mt-4 font-mono text-3xl font-semibold">{githubContributions}</div>
              <div className="text-sm text-muted-foreground">contributions this year</div>
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-ember">
              github.com/shaniprajapatiii →
            </div>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="bento-card grid gap-8 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
              / currently learning
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Always building, always studying.</h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              I treat learning the way I treat shipping — small, consistent, compounding. These are
              the threads I'm actively pulling on right now.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {FOCUS.map((focusItem, index) => {
              const Icon = [Cpu, Zap, Terminal, Code2][index % 4];

              return (
                <div key={focusItem} className="rounded-lg border border-border bg-background p-4">
                  <Icon className="h-4 w-4 text-ember" />
                  <div className="mt-3 font-medium">{focusItem}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}