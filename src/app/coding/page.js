import {
   Activity,
   ArrowUpRight,
   Code2,
   Flame,
   Target,
   Trophy,
} from "lucide-react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { getLiveCodingStats } from "@/lib/coding-data";
import { CONTESTS, TOPICS } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export const metadata = {
   title: "Coding — Shani Prajapati",
   description:
      "Competitive programming dashboard — LeetCode, Codeforces and GitHub activity, topic mastery and contest history.",
   openGraph: {
      title: "Coding — Shani Prajapati",
      description: "Live coding dashboard with real LeetCode, Codeforces, CodeChef and GitHub data.",
   },
};

function getHeatmapCounts(values = []) {
   const padded = [...values];
   const weeks = Math.max(26, Math.ceil(padded.length / 7));
   while (padded.length < weeks * 7) {
      padded.unshift({ date: "", count: 0 });
   }
   return padded;
}

function Heatmap({ data, accent }) {
   const values = getHeatmapCounts(data);
   const weeks = values.length / 7;
   const maxValue = Math.max(...values.map((cell) => cell.count), 1);
   const hasActivity = values.some((cell) => cell.count > 0);

   return (
      <div className="rounded-2xl border border-border/50 bg-surface-elevated p-1">
         <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}>
            {Array.from({ length: weeks }).map((_, weekIndex) => (
               <div key={weekIndex} className="grid grid-rows-7 gap-1">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                     const index = weekIndex * 7 + dayIndex;
                     const value = values[index]?.count ?? 0;
                     const opacity = value > 0 ? Math.max(0.14, value / maxValue) : 0.05;
                     const background = value
                        ? `color-mix(in oklab, ${accent} ${Math.round(opacity * 100)}%, transparent)`
                        : "color-mix(in oklab, var(--foreground) 10%, var(--surface))";

                     return (
                        <div
                           key={dayIndex}
                           className="aspect-square rounded-[2px] border border-border/20"
                           title={`${values[index]?.date ?? ""}: ${value}`}
                           style={{ background }}
                        />
                     );
                  })}
               </div>
            ))}
         </div>
         {!hasActivity ? (
            <div className="mt-3 rounded-xl bg-surface px-3 py-2 text-center text-xs text-muted-foreground">
               No recorded activity yet — the heatmap shows the last 26 weeks.
            </div>
         ) : null}
      </div>
   );
}

function formatNumber(value) {
   if (value == null) return "—";
   return typeof value === "number" ? value.toLocaleString() : value;
}

export default async function CodingPage() {
   const stats = await getLiveCodingStats();
   const recentContests = stats.codeforces?.contests?.length ? stats.codeforces.contests : CONTESTS;
   const profiles = [
      {
         platform: "LeetCode",
         handle: stats.leetcode?.handle ?? "shaniprajapatiii",
         primary: stats.leetcode?.solvedCount ? `${formatNumber(stats.leetcode.solvedCount)} solved` : "—",
         secondary: stats.leetcode?.rating ? `Rank ${stats.leetcode.rating}` : "Active practice",
         url: `https://leetcode.com/${stats.leetcode?.handle ?? "shaniprajapatiii"}`,
         badges: [stats.leetcode?.totalContributions ? `${stats.leetcode.totalContributions} contributions` : "Realtime"],
      },
      {
         platform: "Codeforces",
         handle: stats.codeforces?.handle ?? "shaniprajapati",
         primary: stats.codeforces?.rating ? `Rating ${stats.codeforces.rating}` : "—",
         secondary: stats.codeforces?.contestCount ? `${stats.codeforces.contestCount} contests` : "Practice contests",
         url: `https://codeforces.com/profile/${stats.codeforces?.handle ?? "shaniprajapati"}`,
         badges: [stats.codeforces?.maxRating ? `Max ${stats.codeforces.maxRating}` : "Competitive"],
      },
      {
         platform: "CodeChef",
         handle: stats.codechef?.handle ?? "shani_6307",
         primary: stats.codechef?.rating ? `Rating ${stats.codechef.rating}` : "—",
         secondary: stats.codechef?.solvedCount ? `${formatNumber(stats.codechef.solvedCount)} solved` : "Practice problems",
         url: `https://www.codechef.com/users/${stats.codechef?.handle ?? "shani_6307"}`,
         badges: ["Competitive"],
      },
      {
         platform: "GitHub",
         handle: stats.github?.handle ?? "shaniprajapatiii",
         primary: stats.github?.publicRepos ? `${stats.github.publicRepos} repos` : "—",
         secondary: stats.github?.totalContributions ? `${formatNumber(stats.github.totalContributions)} contributions` : "Live commits",
         url: `https://github.com/${stats.github?.handle ?? "shaniprajapatiii"}`,
         badges: [stats.github?.followers ? `${stats.github.followers} followers` : "Open source"],
      },
   ];

   const statCards = [
      {
         icon: Target,
         label: "Problems Solved",
         value: stats.problemsSolved ? `${formatNumber(stats.problemsSolved)}+` : "—",
      },
      {
         icon: Flame,
         label: "Current Streak",
         value: stats.currentStreak != null ? `${stats.currentStreak}d` : "—",
      },
      {
         icon: Trophy,
         label: "Contests",
         value: stats.contestCount != null ? `${stats.contestCount}+` : "—",
      },
      {
         icon: Activity,
         label: "Max Rating",
         value: stats.codeforces?.maxRating ? `${stats.codeforces.maxRating}` : "—",
      },
   ];

   return (
      <PageShell>
         <PageHeader
            eyebrow="/ coding"
            title="Problems, contests and consistency."
            description="Competitive programming is how I keep my edge sharp. Here's a live look at what I'm solving, how often, and where I'm pushing."
         />

         <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
               {statCards.map((stat) => (
                  <div key={stat.label} className="bento-card p-6">
                     <stat.icon className="h-4 w-4 text-ember" />
                     <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {stat.label}
                     </div>
                     <div className="mt-2 text-4xl font-semibold tracking-tight">
                        {stat.value}
                     </div>
                  </div>
               ))}
            </div>
         </section>

         <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="grid gap-3 lg:grid-cols-3">
               {profiles.map((profile) => (
                  <a
                     key={profile.platform}
                     href={profile.url}
                     className="bento-card group flex flex-col p-6"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold uppercase tracking-wider">
                           {profile.platform}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-ember" />
                     </div>
                     <div className="mt-4 text-2xl font-semibold tracking-tight">
                        {profile.primary}
                     </div>
                     <div className="text-sm text-muted-foreground">
                        {profile.secondary}
                     </div>
                     <div className="mt-4 flex flex-wrap gap-1.5">
                        {profile.badges.map((badge) => (
                           <span
                              key={badge}
                              className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]"
                           >
                              {badge}
                           </span>
                        ))}
                     </div>
                     <div className="mt-4 font-mono text-xs text-muted-foreground">
                        @{profile.handle}
                     </div>
                  </a>
               ))}
            </div>
         </section>

         <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="grid gap-3 lg:grid-cols-2">
               <div className="bento-card p-6 lg:p-8">
                  <div className="flex flex-wrap items-end justify-between gap-2">
                     <div>
                        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                           Coding heatmap · Combined platforms
                        </div>
                        <div className="mt-1 text-xl font-semibold">LeetCode + Codeforces activity</div>
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
                     <Heatmap data={stats.combinedCodingHeatmap} accent="var(--ember)" />
                  </div>
               </div>

               <div className="bento-card p-6 lg:p-8">
                  <div className="flex flex-wrap items-end justify-between gap-2">
                     <div>
                        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                           Development heatmap · GitHub
                        </div>
                        <div className="mt-1 text-xl font-semibold">All-time GitHub contributions</div>
                     </div>
                     <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                        less
                        {[0.06, 0.25, 0.5, 0.75, 1].map((level, index) => (
                           <span
                              key={index}
                              className="h-3 w-3 rounded-[2px]"
                              style={{
                                 background: `color-mix(in oklab, var(--accent) ${level * 100}%, transparent)`,
                              }}
                           />
                        ))}
                        more
                     </div>
                  </div>
                  <div className="mt-5">
                     <Heatmap data={stats.githubHeatmap} accent="var(--accent)" />
                  </div>
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
                              <div
                                 className="h-full rounded-full bg-ember"
                                 style={{ width: `${percent}%` }}
                              />
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
                  {recentContests.map((contest) => {
                     const positive = contest.delta > 0;
                     const deltaLabel = contest.delta > 0 ? `+${contest.delta}` : `${contest.delta}`;

                     return (
                        <div
                           key={`${contest.name}-${contest.date}`}
                           className="flex items-start justify-between py-3 first:pt-0"
                        >
                           <div className="min-w-0 pr-3">
                              <div className="truncate text-sm font-medium">
                                 {contest.name}
                              </div>
                              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                 Codeforces · rank {contest.rank.toLocaleString()}
                              </div>
                           </div>
                           <div className="text-right">
                              <div
                                 className={`font-mono text-sm font-semibold ${positive ? "text-ember" : "text-muted-foreground"}`}
                              >
                                 {deltaLabel}
                              </div>
                              <div className="font-mono text-[11px] text-muted-foreground">
                                 {contest.date}
                              </div>
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
