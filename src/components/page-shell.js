import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export function PageShell({ children }) {
   return (
      <div className="flex min-h-screen flex-col">
         <SiteNav />
         <main className="flex-1">{children}</main>
         <SiteFooter />
      </div>
   );
}

export function PageHeader({ eyebrow, title, description }) {
   return (
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pb-16 lg:pt-24">
         <div className="font-mono text-xs uppercase tracking-[0.2em] text-ember">{eyebrow}</div>
         <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
         </h1>
         {description ? (
            <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
               {description}
            </p>
         ) : null}
      </div>
   );
}