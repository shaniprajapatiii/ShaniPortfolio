import { GraduationCap } from "lucide-react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { TIMELINE } from "@/lib/site-data";

export const metadata = {
   title: "About — Shani Prajapati",
   description:
      "About Shani Prajapati — engineering background, education at RGIPT, journey from first lines of code to building AI products.",
   openGraph: {
      title: "About — Shani Prajapati",
      description: "Background, education, journey and philosophy.",
   },
};

export default function AboutPage() {
   return (
      <PageShell>
         <PageHeader
            eyebrow="/ about"
            title="Engineer, problem-solver, builder."
            description="I enjoy building products that solve real problems. Software engineering, for me, is a combination of disciplined problem-solving, continuous learning and creating meaningful impact."
         />

         <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-3 lg:px-8">
            <article className="bento-card flex flex-col gap-6 p-8 lg:col-span-2">
               <div>
                  <h2 className="mb-3 text-2xl font-semibold">Background</h2>
                  <p className="text-muted-foreground">
                     I'm an undergraduate at the Rajiv Gandhi Institute of Petroleum Technology, studying
                     Computer Science & Design Engineering. I started writing code in 2022 and quickly fell
                     into competitive programming — the way it forces clear thinking still shapes how I
                     build today.
                  </p>
               </div>
               <div>
                  <h2 className="mb-3 text-2xl font-semibold">What I care about</h2>
                  <p className="text-muted-foreground">
                     Software that is fast, honest about its limits and pleasant to use. Tools that compress
                     the time between an idea and shipping it. Systems that scale because their design is
                     simple, not because they bury complexity behind abstractions.
                  </p>
               </div>
               <div>
                  <h2 className="mb-3 text-2xl font-semibold">What I'm aiming for</h2>
                  <p className="text-muted-foreground">
                     Short term: world-class engineering internships, top contest performances and a small
                     number of products that real people use. Long term: building infrastructure and tools
                     that make other engineers measurably more productive.
                  </p>
               </div>
            </article>

            <aside className="bento-card flex flex-col gap-5 p-8">
               <div>
                  <GraduationCap className="h-5 w-5 text-ember" />
                  <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                     Education
                  </div>
                  <div className="mt-2 text-lg font-semibold">RGIPT</div>
                  <div className="text-sm text-muted-foreground">
                     B.Tech · Computer Science & Design Engineering
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
                     ].map((course) => (
                        <span key={course} className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[11px]">
                           {course}
                        </span>
                     ))}
                  </div>
               </div>
            </aside>
         </div>

         <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="mb-8">
               <div className="font-mono text-xs uppercase tracking-[0.2em] text-ember">/ journey</div>
               <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">How I got here.</h2>
            </div>
            <ol className="relative border-l border-border pl-8">
               {TIMELINE.map((item) => (
                  <li key={item.year} className="mb-10 last:mb-0">
                     <span className="absolute -left-[7px] mt-1.5 inline-block h-3 w-3 rounded-full border-2 border-ember bg-background" />
                     <div className="font-mono text-xs uppercase tracking-wider text-ember">{item.year}</div>
                     <div className="mt-1 text-xl font-semibold">{item.title}</div>
                     <p className="mt-1 max-w-2xl text-muted-foreground">{item.body}</p>
                  </li>
               ))}
            </ol>
         </section>
      </PageShell>
   );
}