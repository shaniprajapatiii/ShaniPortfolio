"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site-data";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteNav() {
   const pathname = usePathname();
   const [open, setOpen] = useState(false);

   return (
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
         <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
               href="/"
               className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
            >
               <span className="inline-block h-2 w-2 rounded-full bg-ember" />
               <span>shani-prajapati</span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
               {NAV.map((item) => {
                  const active =
                     item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                  return (
                     <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${active
                              ? "bg-surface text-foreground"
                              : "text-muted-foreground hover:bg-surface hover:text-foreground"
                           }`}
                     >
                        {item.label}
                     </Link>
                  );
               })}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
               <a
                  href={SITE.resumeUrl}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:border-ember/60 hover:text-ember"
               >
                  <Download className="h-3.5 w-3.5" /> Resume
               </a>
               <ThemeToggle />
            </div>

            <button
               className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
               onClick={() => setOpen((value) => !value)}
               aria-label="Menu"
               aria-expanded={open}
            >
               {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
         </div>

         {open ? (
            <div className="border-t border-border bg-background md:hidden">
               <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
                  <div className="flex flex-col gap-1">
                     {NAV.map((item) => {
                        const active =
                           item.href === "/"
                              ? pathname === "/"
                              : pathname.startsWith(item.href);
                        return (
                           <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className={`rounded-md px-3 py-2 font-mono text-sm uppercase tracking-wider ${active
                                    ? "bg-surface text-foreground"
                                    : "text-muted-foreground"
                                 }`}
                           >
                              {item.label}
                           </Link>
                        );
                     })}
                     <div className="mt-2 flex items-center gap-2">
                        <a
                           href={SITE.resumeUrl}
                           className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs uppercase tracking-wider"
                        >
                           <Download className="h-3.5 w-3.5" /> Resume
                        </a>
                        <ThemeToggle />
                     </div>
                  </div>
               </div>
            </div>
         ) : null}
      </header>
   );
}
