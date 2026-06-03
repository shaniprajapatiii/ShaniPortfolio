import Link from "next/link";
import { Mail } from "lucide-react";
import { NAV, SITE } from "@/lib/site-data";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";

export function SiteFooter() {
   return (
      <footer className="mt-24 border-t border-border bg-surface/40">
         <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
            <div>
               <div className="font-mono text-sm font-semibold tracking-tight">
                  <span className="text-ember">$</span> {SITE.name.toLowerCase().replace(/\s+/g, "-")}
               </div>
               <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                  Software engineer building products at the intersection of algorithms, AI and the web.
               </p>
            </div>

            <div>
               <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Navigate
               </div>
               <div className="mt-3 grid grid-cols-2 gap-y-1.5 text-sm">
                  {NAV.map((item) => (
                     <Link key={item.href} href={item.href} className="text-foreground/80 hover:text-ember">
                        {item.label}
                     </Link>
                  ))}
               </div>
            </div>

            <div>
               <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Elsewhere
               </div>
               <div className="mt-3 flex flex-col gap-2 text-sm">
                  <a href={SITE.socials.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground/80 hover:text-ember">
                     <GithubIcon className="h-4 w-4" /> GitHub
                  </a>
                  <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground/80 hover:text-ember">
                     <LinkedinIcon className="h-4 w-4" /> LinkedIn
                  </a>
                  <a href={`mailto:${SITE.email}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-foreground/80 hover:text-ember">
                     <Mail className="h-4 w-4" /> {SITE.email}
                  </a>
               </div>
            </div>
         </div>
         <div className="border-t border-border">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
               <span className="font-mono">© {new Date().getFullYear()} {SITE.name}</span>
               <span className="font-mono">Built with Next.js · Tailwind v4</span>
            </div>
         </div>
      </footer>
   );
}