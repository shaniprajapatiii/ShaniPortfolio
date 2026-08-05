import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { TIMELINE } from "@/lib/site-data";

export const metadata = {
   title: "About — Shani Prajapati",
   description:
      "About Shani Prajapati — my background, approach to software, and the tools I rely on to build full-stack products.",
   openGraph: {
      title: "About — Shani Prajapati",
      description: "Background, engineering approach, education, and toolkit.",
   },
};

export default function AboutPage() {
   return (
      <PageShell>
         <PageHeader
            eyebrow="/ about"
            title="Engineer, problem-solver, product builder."
            description="I build thoughtful software with an emphasis on clarity, craftsmanship, and real-world impact. My work bridges full-stack engineering, system design, and practical product thinking."
         />

         <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-3 lg:px-8">
            <article className="bento-card flex flex-col gap-6 p-8 lg:col-span-2">
               <div>
                  <h2 className="mb-3 text-2xl font-semibold">Background</h2>
                  <p className="text-muted-foreground">
                     I study Computer Science & Information Technology at GL Bajaj Institute of Technology and Management. I began writing code in 2022, and that first exposure to Java and algorithms quickly grew into full-stack product work and a passion for engineering systems that feel reliable, polished, and useful.
                  </p>
               </div>
               <div>
                  <h2 className="mb-3 text-2xl font-semibold">What matters most</h2>
                  <p className="text-muted-foreground">
                     I care about building software that solves concrete problems while remaining easy to understand and maintain. That means writing clean code, choosing the right abstractions, shipping fast without sacrificing quality, and staying curious about how systems behave under real conditions.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                     I also care about learning continuously — whether it is new frameworks, system design patterns, or the latest tools that make engineering more productive.
                  </p>
               </div>
               <div>
                  <h2 className="mb-3 text-2xl font-semibold">Where I’m headed</h2>
                  <p className="text-muted-foreground">
                     In the near term, I’m focused on building experience through internships, open-source contributions, and ambitious personal projects. Over time, I want to join a team that values impact, strong engineering practices, and products that help people do more with less friction.
                  </p>
               </div>
               <div className="rounded-3xl border border-border bg-background p-6 text-sm text-muted-foreground">
                  <div className="font-semibold text-foreground">Toolkit highlight</div>
                  <p className="mt-3">
                     My toolkit spans front-end, back-end, data, and AI engineering. I keep a dedicated page for the exact technologies and tools I use most often.
                  </p>
                  <Link
                     href="/toolkit"
                     className="mt-4 inline-flex items-center rounded-md border border-ember bg-ember/10 px-4 py-2 text-sm font-medium text-ember transition hover:bg-ember/20"
                  >
                     View toolkit
                  </Link>
               </div>
            </article>

            <aside className="bento-card flex flex-col gap-5 p-8">
               <div>
                  <GraduationCap className="h-5 w-5 text-ember" />
                  <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                     Education
                  </div>
                  <div className="mt-2 text-lg font-semibold">
                     GL Bajaj Institute of Technology and Management
                  </div>
                  <div className="text-sm text-muted-foreground">
                     B.Tech · Computer Science & Information Technology
                  </div>
                  <div className="text-sm text-muted-foreground">
                     Greater Noida, India
                     <br />
                     2024 – 2028
                  </div>
               </div>
               <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                     Relevant coursework
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                     {[
                        "Data Structures",
                        "Algorithms",
                        "Operating Systems",
                        "DBMS",
                        "Computer Networks",
                        "Machine Learning",
                        "Software Engineering",
                        "Distributed Systems",
                     ].map((course) => (
                        <span
                           key={course}
                           className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[11px]"
                        >
                           {course}
                        </span>
                     ))}
                  </div>
               </div>
               <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                     Toolbox
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                     {[
                        "TypeScript",
                        "React",
                        "Next.js",
                        "Node.js",
                        "Python",
                        "Tailwind CSS",
                        "Git",
                        "Docker",
                     ].map((tool) => (
                        <span
                           key={tool}
                           className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[11px]"
                        >
                           {tool}
                        </span>
                     ))}
                  </div>
               </div>
            </aside>
         </div>

         <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="mb-8">
               <div className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                  / journey
               </div>
               <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  How I got here.
               </h2>
            </div>
            <ol className="relative border-l border-border pl-8">
               {TIMELINE.map((item) => (
                  <li key={item.year} className="mb-10 last:mb-0">
                     <span className="absolute -left-[7px] mt-1.5 inline-block h-3 w-3 rounded-full border-2 border-ember bg-background" />
                     <div className="font-mono text-xs uppercase tracking-wider text-ember">
                        {item.year}
                     </div>
                     <div className="mt-1 text-xl font-semibold">{item.title}</div>
                     <p className="mt-1 max-w-2xl text-muted-foreground">
                        {item.body}
                     </p>
                  </li>
               ))}
            </ol>
         </section>
      </PageShell>
   );
}
