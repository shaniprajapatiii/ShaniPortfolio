"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/site-data";
import { GithubIcon } from "@/components/brand-icons";

export function ProjectsPage() {
   const categories = useMemo(
      () => [
         "All",
         ...Array.from(new Set(PROJECTS.map((project) => project.category))),
      ],
      [],
   );
   const [active, setActive] = useState("All");

   const filtered =
      active === "All"
         ? PROJECTS
         : PROJECTS.filter((project) => project.category === active);

   return (
      <>
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap gap-2">
               {categories.map((category) => (
                  <button
                     key={category}
                     onClick={() => setActive(category)}
                     className={`rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${active === category
                           ? "border-ember bg-ember text-ember-foreground"
                           : "border-border bg-surface text-muted-foreground hover:border-ember/60 hover:text-foreground"
                        }`}
                  >
                     {category}
                  </button>
               ))}
            </div>

            <div className="grid grid-cols-1 gap-4 pb-24 md:grid-cols-2 lg:grid-cols-3">
               {filtered.map((project) => (
                  <article
                     key={project.slug}
                     className="bento-card group flex flex-col p-6"
                  >
                     <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                           {project.category}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                           <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember" />
                           {project.status}
                        </span>
                     </div>
                     <h3 className="mt-4 text-2xl font-semibold tracking-tight transition-colors group-hover:text-ember">
                        {project.name}
                     </h3>
                     <p className="mt-2 flex-1 text-sm text-muted-foreground">
                        {project.description}
                     </p>
                     <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.stack.map((stackItem) => (
                           <span
                              key={stackItem}
                              className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]"
                           >
                              {stackItem}
                           </span>
                        ))}
                     </div>
                     <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                        <a
                           href={project.repo}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-foreground hover:text-ember"
                        >
                           <GithubIcon className="h-3.5 w-3.5" /> Code
                        </a>
                        <a
                           href={project.href}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="ml-auto inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-ember"
                        >
                           Live <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                     </div>
                  </article>
               ))}
            </div>
         </div>
      </>
   );
}
