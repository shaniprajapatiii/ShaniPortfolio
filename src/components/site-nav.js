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
      <header className="sticky top-0 z-50 w-full pt-3 pb-2 px-4 sm:px-6 lg:px-8">
         <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            {/* Left: Name Capsule */}
            <div className="flex items-center rounded-full border border-border/80 bg-surface/80 px-4 py-2 shadow-sm backdrop-blur-md transition-all hover:border-ember/50">
               <Link
                  href="/"
                  className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-ember"
               >
                  <span className="relative flex h-2 w-2">
                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
                     <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
                  </span>
                  <span>shani-prajapati</span>
               </Link>
            </div>

            {/* Middle: Nav Links Box */}
            <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/80 bg-surface/80 p-1.5 shadow-sm backdrop-blur-md">
               {NAV.map((item) => {
                  const active =
                     item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                  return (
                     <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-full px-3.5 py-1.5 font-mono text-[13px] font-medium uppercase tracking-wider transition-all duration-200 ${
                           active
                              ? "bg-background text-ember shadow-xs font-semibold border border-border/60"
                              : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                        }`}
                     >
                        {item.label}
                     </Link>
                  );
               })}
            </nav>

            {/* Right: Separate Action Box (Resume & Theme Button) */}
            <div className="hidden md:flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 p-1.5 px-2 shadow-sm backdrop-blur-md">
               <a
                  href={SITE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background px-4 py-1.5 font-mono text-[13px] font-medium uppercase tracking-wider text-foreground transition-all hover:border-ember/60 hover:bg-ember hover:text-ember-foreground shadow-xs"
               >
                  <Download className="h-3.5 w-3.5" />
                  <span>Resume</span>
               </a>
               <ThemeToggle />
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-2 rounded-full border border-border/80 bg-surface/80 p-1.5 px-2 shadow-sm backdrop-blur-md">
               <ThemeToggle />
               <button
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background text-foreground transition-colors hover:border-ember/60 hover:text-ember"
                  onClick={() => setOpen((value) => !value)}
                  aria-label="Toggle Menu"
                  aria-expanded={open}
               >
                  {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
               </button>
            </div>
         </div>

         {/* Mobile Dropdown Box */}
         {open && (
            <div className="mt-3 mx-auto max-w-7xl rounded-2xl border border-border/80 bg-surface/95 p-4 shadow-xl backdrop-blur-xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
               <div className="flex flex-col gap-1.5">
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
                           className={`rounded-xl px-4 py-2.5 font-mono text-sm font-medium uppercase tracking-wider transition-colors ${
                              active
                                 ? "bg-background text-ember font-semibold border border-border/60"
                                 : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                           }`}
                        >
                           {item.label}
                        </Link>
                     );
                  })}
                  <div className="mt-2 pt-2 border-t border-border/60 flex items-center gap-2">
                     <a
                        href={SITE.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/60 bg-background py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground hover:border-ember/60 hover:bg-ember hover:text-ember-foreground transition-colors shadow-xs"
                     >
                        <Download className="h-4 w-4" />
                        <span>Download Resume</span>
                     </a>
                  </div>
               </div>
            </div>
         )}
      </header>
   );
}

