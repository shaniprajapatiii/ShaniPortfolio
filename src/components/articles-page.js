"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/lib/site-data";

export function ArticlesPage() {
   const categories = useMemo(
      () => [
         "All",
         ...Array.from(new Set(ARTICLES.map((article) => article.category))),
      ],
      [],
   );
   const [active, setActive] = useState("All");
   const list =
      active === "All"
         ? ARTICLES
         : ARTICLES.filter((article) => article.category === active);

   return (
      <>
         <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
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

            <div className="divide-y divide-border border-y border-border">
               {list.map((article) => (
                  <a
                     key={article.slug}
                     href="#"
                     className="group flex flex-col gap-2 py-6 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                  >
                     <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                           <span className="text-ember">{article.category}</span>
                           <span>·</span>
                           <span>{article.readTime}</span>
                           <span>·</span>
                           <span>{article.date}</span>
                        </div>
                        <h2 className="mt-2 text-2xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-ember">
                           {article.title}
                        </h2>
                        <p className="mt-1 max-w-2xl text-muted-foreground">
                           {article.description}
                        </p>
                     </div>
                     <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
                  </a>
               ))}
            </div>
         </div>
      </>
   );
}
