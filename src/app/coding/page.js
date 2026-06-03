import {
   Activity,
   ArrowUpRight,
   Code2,
   Flame,
   Target,
   Trophy,
} from "lucide-react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { CODING_PROFILES, CONTESTS, TOPICS } from "@/lib/site-data";

export const metadata = {
   title: "Coding — Shani Prajapati",
   description:
      "Competitive programming dashboard — LeetCode, Codeforces and GitHub activity, topic mastery and contest history.",
   openGraph: {
      title: "Coding — Shani Prajapati",
      description: "500+ problems solved, 100+ contests. Live coding dashboard.",
   },
};

function Heatmap() {
   const weeks = 26;
   const days = 7;
   const cells = [];

   for (let index = 0; index < weeks * days; index += 1) {
      const value = (Math.sin(index * 0.37) + Math.cos(index * 0.13)) * 0.5 + 0.5;
      cells.push(Math.max(0, Math.min(4, Math.round(value * 4))));
   }

   return (
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}>
         {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
               {Array.from({ length: days }).map((_, dayIndex) => {
                  const value = cells[weekIndex * days + dayIndex];
                  const opacity = [0.06, 0.2, 0.4, 0.7, 1][value];

                  return (
                     <div
                        key={dayIndex}
                        className="aspect-square rounded-[2px]"
                        style={{
                           background: `color-mix(in oklab, var(--ember) ${opacity * 100}%, transparent)`,
                        }}
                     />
                  );
               })}
            </div>
         ))}
      </div>
   );
}

export default function CodingPage() {
   return (
      <PageShell>
         <PageHeader
            eyebrow="/ coding"
            title="Problems, contests and consistency."
            description="Competitive programming is how I keep my edge sharp. Here's a live look at what I'm solving, how often, and where I'm pushing."
         />

         <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
               {[
                  { icon: Target, label: "Problems Solved", value: "550+" },
                  { icon: Flame, label: "Current Streak", value: "365d" },
                  { icon: Trophy, label: "Contests", value: "120+" },
                  { icon: Activity, label: "Max Rating", value: "1742" },
               ].map((stat) => (
                  <div key={stat.label} className="bento-card p-6">
                     <stat.icon className="h-4 w-4 text-ember" />
                     <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                     </div>
                     <div className="mt-2 text-4xl font-semibold tracking-tight">{stat.value}</div>
                  </div>
               ))}
            </div>
         </section>

         <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="grid gap-3 lg:grid-cols-3">
               {CODING_PROFILES.map((profile) => (
                  <a key={profile.platform} href={profile.url} className="bento-card group flex flex-col p-6">
                     <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold uppercase tracking-wider">
                           {profile.platform}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-ember" />
                     </div>
                     <div className="mt-4 text-2xl font-semibold tracking-tight">{profile.primary}</div>
                     <div className="text-sm text-muted-foreground">{profile.secondary}</div>
                     <div className="mt-4 flex flex-wrap gap-1.5">
                        {profile.badges.map((badge) => (
                           <span key={badge} className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                              {badge}
                           </span>
                        ))}
                     </div>
                     <div className="mt-4 font-mono text-xs text-muted-foreground">@{profile.handle}</div>
                  </a>
               ))}
            </div>
         </section>

         <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="bento-card p-6 lg:p-8">
               <div className="flex flex-wrap items-end justify-between gap-2">
                  <div>
                     <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Activity · Last 6 months
                     </div>
                     <div className="mt-1 text-xl font-semibold">Daily contributions & submissions</div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                     less
                     {[0.06, 0.25, 0.5, 0.75, 1].map((level, index) => (
                        <span
                           key={index}
                           className="h-3 w-3 rounded-[2px]"
                           style={{
                              background: `color-mix(in oklab, var(--ember) ${level * 100}%, transparent)`,
                           }}
                        />
                     ))}
                     more
                  </div>
               </div>
               <div className="mt-5">
                  <Heatmap />
               </div>
            </div>
         </section>

         <section className="mx-auto grid max-w-7xl gap-3 px-4 pt-8 sm:px-6 lg:grid-cols-5 lg:px-8">
            <div className="bento-card p-6 lg:col-span-3">
               <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Topic distribution
               </div>
               <div className="mt-5 space-y-3">
                  {TOPICS.map((topic) => {
                     const percent = Math.min(100, topic.solved);

                     return (
                        <div key={topic.name}>
                           <div className="flex items-center justify-between font-mono text-sm">
                              <span>{topic.name}</span>
                              <span className="text-muted-foreground">
                                 {topic.solved} · {topic.level}
                              </span>
                           </div>
                           <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background">
                              <div className="h-full rounded-full bg-ember" style={{ width: `${percent}%` }} />
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>

            <div className="bento-card p-6 lg:col-span-2">
               <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Recent contests
               </div>
               <div className="mt-5 divide-y divide-border">
                  {CONTESTS.map((contest) => {
                     const positive = contest.delta.startsWith("+");

                     return (
                        <div key={contest.name} className="flex items-start justify-between py-3 first:pt-0">
                           <div className="min-w-0 pr-3">
                              <div className="truncate text-sm font-medium">{contest.name}</div>
                              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                 {contest.platform} · rank {contest.rank.toLocaleString()}
                              </div>
                           </div>
                           <div className="text-right">
                              <div className={`font-mono text-sm font-semibold ${positive ? "text-ember" : "text-muted-foreground"}`}>
                                 {contest.delta}
                              </div>
                              <div className="font-mono text-[11px] text-muted-foreground">{contest.date}</div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </section>

         <div className="h-20" />
      </PageShell>
   );
}