import { PageHeader, PageShell } from "@/components/page-shell";
import { EXPERIENCE } from "@/lib/site-data";

export const metadata = {
   title: "Experience — Shani Prajapati",
   description:
      "Roles, mentorship, hackathons and open-source contributions by Shani Prajapati.",
   openGraph: {
      title: "Experience — Shani Prajapati",
      description: "Mentorship, hackathons, leadership and research.",
   },
};

export default function ExperiencePage() {
   return (
      <PageShell>
         <PageHeader
            eyebrow="/ experience"
            title="Roles, teams and contributions."
            description="A short list of the places I've shown up, the people I've worked with, and the things we shipped together."
         />

         <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="grid gap-3 lg:grid-cols-2">
               {EXPERIENCE.map((item) => (
                  <article key={`${item.role}-${item.org}`} className="bento-card p-6 lg:p-8">
                     <div className="flex items-start justify-between">
                        <div>
                           <h2 className="text-2xl font-semibold tracking-tight">{item.role}</h2>
                           <div className="mt-1 font-mono text-sm text-ember">{item.org}</div>
                        </div>
                        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                           {item.period}
                        </div>
                     </div>
                     <p className="mt-4 text-muted-foreground">{item.summary}</p>
                     <div className="mt-5 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                           <span key={tag} className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px]">
                              {tag}
                           </span>
                        ))}
                     </div>
                  </article>
               ))}
            </div>
         </div>
      </PageShell>
   );
}