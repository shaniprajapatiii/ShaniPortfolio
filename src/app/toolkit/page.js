import { Code2, Cpu, Database, Sparkles } from "lucide-react";
import { PageHeader, PageShell } from "@/components/page-shell";

export const metadata = {
   title: "Toolkit — Shani Prajapati",
   description:
      "The technologies, frameworks, and tools I use to build web applications, engineer systems, and keep learning.",
   openGraph: {
      title: "Toolkit — Shani Prajapati",
      description: "My active development toolkit and favorite technologies.",
   },
};

const TOOL_CATEGORIES = [
   {
      title: "Core technologies",
      description:
         "The languages, frameworks, and platforms I use daily to build products and prototypes.",
      icon: <Code2 className="h-5 w-5" />,
      items: [
         "TypeScript",
         "React",
         "Next.js",
         "Node.js",
         "Express.js",
         "Tailwind CSS",
      ],
   },
   {
      title: "Backend & data",
      description:
         "Tools for APIs, databases, data workflows, and server-side reliability.",
      icon: <Database className="h-5 w-5" />,
      items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "REST APIs", "GraphQL"],
   },
   {
      title: "AI & automation",
      description:
         "AI-focused tooling for prototyping models, building data workflows, and automating tasks.",
      icon: <Sparkles className="h-5 w-5" />,
      items: [
         "Python",
         "PyTorch",
         "LangChain",
         "OpenAI",
         "NLP",
         "Automation Scripts",
      ],
   },
   {
      title: "Developer workflow",
      description:
         "The tools and practices that keep my work fast, reliable, and easy to iterate on.",
      icon: <Cpu className="h-5 w-5" />,
      items: ["Git", "GitHub", "Docker", "VS Code", "Jest", "Postman"],
   },
];

export default function ToolkitPage() {
   return (
      <PageShell>
         <PageHeader
            eyebrow="/ toolkit"
            title="My toolkit for building modern software."
            description="A snapshot of the technologies and tools I rely on to ship full-stack apps, collaborate effectively, and keep growing as an engineer."
         />

         <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
               <section className="bento-card p-8">
                  <h2 className="text-2xl font-semibold">What I use most</h2>
                  <p className="mt-4 text-muted-foreground">
                     My toolkit is centered around strong fundamentals, modern web
                     architecture, and the ability to move quickly. I choose tools that
                     help me build clean user experiences, reliable backend services,
                     and scalable engineering workflows.
                  </p>
                  <div className="mt-6 space-y-4">
                     <div>
                        <div className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                           Front-end
                        </div>
                        <p className="mt-2 text-muted-foreground">
                           I build interactive web experiences with component-driven UIs,
                           server rendering, and polished styling.
                        </p>
                     </div>
                     <div>
                        <div className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                           Back-end
                        </div>
                        <p className="mt-2 text-muted-foreground">
                           I design APIs and data services that are easy to reason about,
                           test, and scale with real usage.
                        </p>
                     </div>
                     <div>
                        <div className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                           Learning
                        </div>
                        <p className="mt-2 text-muted-foreground">
                           I stay curious with system design patterns, machine learning
                           concepts, and practical tools that make projects better.
                        </p>
                     </div>
                  </div>
               </section>

               <aside className="bento-card p-8">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                     Quick snapshot
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold">
                     Effective, opinionated, practical.
                  </h3>
                  <p className="mt-4 text-muted-foreground">
                     These are the frameworks and workflows I return to when I want to
                     build something that feels complete and maintainable.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                     {[
                        "Component-driven UIs",
                        "API-first services",
                        "Developer automation",
                        "Data-informed decisions",
                     ].map((value) => (
                        <div
                           key={value}
                           className="rounded-3xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground"
                        >
                           {value}
                        </div>
                     ))}
                  </div>
               </aside>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
               {TOOL_CATEGORIES.map((category) => (
                  <section key={category.title} className="bento-card p-8">
                     <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-ember/10 text-ember">
                           {category.icon}
                        </span>
                        <div>
                           <h3 className="text-xl font-semibold">{category.title}</h3>
                           <p className="mt-1 text-sm text-muted-foreground">
                              {category.description}
                           </p>
                        </div>
                     </div>
                     <div className="mt-6 grid gap-2 sm:grid-cols-2">
                        {category.items.map((item) => (
                           <div
                              key={item}
                              className="rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground"
                           >
                              {item}
                           </div>
                        ))}
                     </div>
                  </section>
               ))}
            </div>

            <section className="mt-10 rounded-3xl border border-border bg-surface p-8">
               <div className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                  How I use it
               </div>
               <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-3xl border border-border bg-background p-6 text-sm text-muted-foreground">
                     <div className="font-semibold text-foreground">Build</div>
                     <p className="mt-2">
                        Rapid prototyping with Next.js and TypeScript, then shipping
                        production-ready experiences with polished interfaces and
                        reliable APIs.
                     </p>
                  </div>
                  <div className="rounded-3xl border border-border bg-background p-6 text-sm text-muted-foreground">
                     <div className="font-semibold text-foreground">Inspect</div>
                     <p className="mt-2">
                        Debugging and performance work with browser devtools, logging,
                        and incremental testing so every release is more stable than the
                        last.
                     </p>
                  </div>
                  <div className="rounded-3xl border border-border bg-background p-6 text-sm text-muted-foreground">
                     <div className="font-semibold text-foreground">Improve</div>
                     <p className="mt-2">
                        Continuous learning through reading, building, and applying new
                        concepts from system design, AI, and modern engineering
                        practices.
                     </p>
                  </div>
               </div>
            </section>
         </div>
      </PageShell>
   );
}
