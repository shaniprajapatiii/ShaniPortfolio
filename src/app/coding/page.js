import { Activity, ArrowUpRight, Code2, Flame, Target, Trophy } from "lucide-react";
import { PageHeader, PageShell } from "@/components/page-shell";
import { getLiveCodingStats } from "@/lib/coding-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
   title: "Coding — Shani Prajapati",
   description:
      "Competitive programming dashboard — LeetCode, Codeforces, CodeChef and GitHub activity, topic mastery and contest history.",
   openGraph: {
      title: "Coding — Shani Prajapati",
      description: "Live coding dashboard with real LeetCode, Codeforces, CodeChef and GitHub data.",
   },
};

function formatNumber(value) {
   if (value == null) return "—";
   return typeof value === "number" ? value.toLocaleString() : value;
}

const MONTH_LABELS = [
   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Builds a real Sun–Sat calendar grid (like GitHub's contribution graph)
// anchored to today, instead of just chunking a flat array into rows of 7.
function buildCalendarWeeks(data = [], weeksCount = 53) {
   const countByDate = new Map(data.map((entry) => [entry.date, entry.count]));
   const today = new Date();
   today.setHours(0, 0, 0, 0);

   const start = new Date(today);
   start.setDate(start.getDate() - weeksCount * 7 + 1);
   start.setDate(start.getDate() - start.getDay()); // rewind to Sunday

   const weeks = [];
   const cursor = new Date(start);

   while (cursor <= today) {
      const week = [];
      for (let day = 0; day < 7; day += 1) {
         const iso = cursor.toISOString().slice(0, 10);
         const inRange = cursor <= today;
         week.push({
            date: iso,
            count: inRange ? countByDate.get(iso) ?? 0 : null,
            month: cursor.getMonth(),
            dayOfMonth: cursor.getDate(),
         });
         cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
   }
   return weeks;
}

function levelForCount(count, max) {
   if (!count || count <= 0) return 0;
   const ratio = count / max;
   if (ratio > 0.75) return 4;
   if (ratio > 0.5) return 3;
   if (ratio > 0.25) return 2;
   return 1;
}

const LEVEL_OPACITY = { 0: null, 1: 25, 2: 50, 3: 75, 4: 100 };

function Heatmap({ data, accent }) {
   const weeks = buildCalendarWeeks(data, 53);
   const allCells = weeks.flat().filter((cell) => cell.count != null);
   const maxValue = Math.max(...allCells.map((cell) => cell.count), 1);
   const hasActivity = allCells.some((cell) => cell.count > 0);

   const monthLabels = [];
   let lastMonth = null;
   weeks.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay.month !== lastMonth && firstDay.dayOfMonth <= 7) {
         monthLabels.push({ index: weekIndex, label: MONTH_LABELS[firstDay.month] });
         lastMonth = firstDay.month;
      }
   });

   return (
      <div className="overflow-x-auto">
         <div style={{ minWidth: `${weeks.length * 13 + 28}px` }}>
            <div
               className="grid text-[10px] text-muted-foreground"
               style={{
                  gridTemplateColumns: `28px repeat(${weeks.length}, 12px)`,
                  gap: "3px",
               }}
            >
               <div />
               {weeks.map((_, weekIndex) => {
                  const found = monthLabels.find((m) => m.index === weekIndex);
                  return <div key={weekIndex}>{found ? found.label : ""}</div>;
               })}
            </div>

            <div
               className="mt-1 grid"
               style={{
                  gridTemplateColumns: `28px repeat(${weeks.length}, 12px)`,
                  gridTemplateRows: "repeat(7, 12px)",
                  gridAutoFlow: "column",
                  gap: "3px",
               }}
            >
               <div className="row-span-7 grid grid-rows-7 gap-[3px] text-[10px] text-muted-foreground">
                  <span />
                  <span>Mon</span>
                  <span />
                  <span>Wed</span>
                  <span />
                  <span>Fri</span>
                  <span />
               </div>
               {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-rows-7 gap-[3px]" style={{ gridColumn: weekIndex + 2 }}>
                     {week.map((cell, dayIndex) => {
                        if (cell.count == null) {
                           return <div key={dayIndex} className="h-[12px] w-[12px]" />;
                        }
                        const level = levelForCount(cell.count, maxValue);
                        const opacity = LEVEL_OPACITY[level];
                        const background = opacity
                           ? `color-mix(in oklab, ${accent} ${opacity}%, transparent)`
                           : "color-mix(in oklab, var(--foreground) 8%, var(--surface))";

                        return (
                           <div
                              key={dayIndex}
                              className="h-[12px] w-[12px] rounded-[3px] border border-border/20"
                              title={`${cell.date}: ${cell.count} submission${cell.count === 1 ? "" : "s"}`}
                              style={{ background }}
                           />
                        );
                     })}
                  </div>
               ))}
            </div>
         </div>

         {!hasActivity ? (
            <div className="mt-3 rounded-xl bg-surface px-3 py-2 text-center text-xs text-muted-foreground">
               No recorded activity in the last year, or the live source is temporarily unreachable.
            </div>
         ) : null}
      </div>
   );
}

const LEVEL_STYLES = {
   Strong: "border-ember/60 bg-ember/15 text-ember",
   Comfortable: "border-border bg-background text-foreground",
   Learning: "border-border bg-background text-muted-foreground",
};

export default async function CodingPage() {
   const stats = await getLiveCodingStats();
   const topics = stats.topics ?? [];
   const maxTopicSolved = Math.max(...topics.map((topic) => topic.solved), 1);
   const contests = stats.contests ?? [];
   const recentSolved = stats.recentSolved ?? [];

   const profiles = [
      {
         platform: "LeetCode",
         handle: stats.leetcode?.handle ?? "—",
         primary: stats.leetcode?.solvedCount ? `${formatNumber(stats.leetcode.solvedCount)} solved` : "—",
         secondary: stats.leetcode?.contestRating
            ? `Contest rating ${stats.leetcode.contestRating}`
            : stats.leetcode?.rating
               ? `Rank ${formatNumber(stats.leetcode.rating)}`
               : "—",
         url: stats.leetcode?.url ?? "#",
         badges: [stats.leetcode?.totalContributions ? `${stats.leetcode.totalContributions} active days` : "—"],
      },
      {
         platform: "Codeforces",
         handle: stats.codeforces?.handle ?? "—",
         primary: stats.codeforces?.rating ? `Rating ${stats.codeforces.rating}` : "—",
         secondary: stats.codeforces?.contestCount ? `${stats.codeforces.contestCount} contests` : "—",
         url: stats.codeforces?.url ?? "#",
         badges: [stats.codeforces?.maxRating ? `Max ${stats.codeforces.maxRating}` : "—"],
      },
      {
         platform: "CodeChef",
         handle: stats.codechef?.handle ?? "—",
         primary: stats.codechef?.rating ? `Rating ${stats.codechef.rating}` : "—",
         secondary: stats.codechef?.solvedCount ? `${formatNumber(stats.codechef.solvedCount)} solved` : "—",
         url: stats.codechef?.url ?? "#",
         badges: ["No public tag/contest API"],
      },
      {
         platform: "GitHub",
         handle: stats.github?.handle ?? "—",
         primary: stats.github?.publicRepos ? `${stats.github.publicRepos} repos` : "—",
         secondary: stats.github?.totalContributions ? `${formatNumber(stats.github.totalContributions)} contributions` : "—",
         url: stats.github?.url ?? "#",
         badges: [stats.github?.followers ? `${stats.github.followers} followers` : "—"],
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
         label: "Max CF Rating",
         value: stats.codeforces?.maxRating ? `${stats.codeforces.maxRating}` : "—",
      },
   ];

   return (
      <PageShell>
         <PageHeader
            eyebrow="/ coding"
            title="Problems, contests and consistency."
            description="Competitive programming is how I keep my edge sharp. Everything below is fetched live from LeetCode, Codeforces, CodeChef and GitHub on every page load."
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
            <div className="grid gap-3 lg:grid-cols-4">
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
                           Coding heatmap · LeetCode + Codeforces
                        </div>
                        <div className="mt-1 text-xl font-semibold">Submission activity</div>
                     </div>
                     <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                        less
                        {[0, 25, 50, 75, 100].map((level) => (
                           <span
                              key={level}
                              className="h-3 w-3 rounded-[3px]"
                              style={{
                                 background: level
                                    ? `color-mix(in oklab, var(--ember) ${level}%, transparent)`
                                    : "color-mix(in oklab, var(--foreground) 8%, var(--surface))",
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
                        <div className="mt-1 text-xl font-semibold">Contribution activity</div>
                     </div>
                     <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                        less
                        {[0, 25, 50, 75, 100].map((level) => (
                           <span
                              key={level}
                              className="h-3 w-3 rounded-[3px]"
                              style={{
                                 background: level
                                    ? `color-mix(in oklab, var(--accent) ${level}%, transparent)`
                                    : "color-mix(in oklab, var(--foreground) 8%, var(--surface))",
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
               <div className="flex items-center justify-between">
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                     Topic strength
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                     LeetCode + Codeforces, merged
                  </div>
               </div>
               <div className="mt-5 space-y-4">
                  {topics.length ? (
                     topics.map((topic) => {
                        const percent = Math.round((topic.solved / maxTopicSolved) * 100);
                        return (
                           <div key={topic.name}>
                              <div className="flex items-center justify-between gap-3">
                                 <span className="text-sm font-medium">{topic.name}</span>
                                 <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs text-muted-foreground">
                                       {topic.solved}
                                    </span>
                                    <span
                                       className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${LEVEL_STYLES[topic.level]}`}
                                    >
                                       {topic.level}
                                    </span>
                                 </div>
                              </div>
                              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background">
                                 <div
                                    className="h-full rounded-full bg-ember transition-[width]"
                                    style={{ width: `${percent}%` }}
                                 />
                              </div>
                           </div>
                        );
                     })
                  ) : (
                     <div className="rounded-xl bg-background px-4 py-6 text-center text-sm text-muted-foreground">
                        Topic data unavailable right now — LeetCode or Codeforces may be rate-limiting requests.
                     </div>
                  )}
               </div>
            </div>

            <div className="bento-card p-6 lg:col-span-2">
               <div className="flex items-center justify-between">
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                     Recent contests
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                     CF + LeetCode
                  </div>
               </div>
               <div className="mt-5 divide-y divide-border">
                  {contests.length ? (
                     contests.map((contest) => {
                        const positive = contest.delta > 0;
                        const deltaLabel = contest.delta > 0 ? `+${contest.delta}` : `${contest.delta}`;

                        return (
                           <div
                              key={`${contest.platform}-${contest.name}-${contest.date}`}
                              className="flex items-start justify-between py-3 first:pt-0"
                           >
                              <div className="min-w-0 pr-3">
                                 <div className="truncate text-sm font-medium">
                                    {contest.name}
                                 </div>
                                 <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                    {contest.platform} · rank {contest.rank?.toLocaleString?.() ?? contest.rank}
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
                     })
                  ) : (
                     <div className="py-6 text-center text-sm text-muted-foreground">
                        No contest history available right now.
                     </div>
                  )}
               </div>
            </div>
         </section>

         <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="bento-card p-6 lg:p-8">
               <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-ember" />
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                     Recently solved
                  </div>
               </div>
               <div className="mt-5 divide-y divide-border">
                  {recentSolved.length ? (
                     recentSolved.map((item) => (
                        <a
                           key={`${item.platform}-${item.title}-${item.date}`}
                           href={item.url}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="group flex items-center justify-between gap-3 py-3 first:pt-0"
                        >
                           <div className="min-w-0">
                              <div className="truncate text-sm font-medium group-hover:text-ember">
                                 {item.title}
                              </div>
                              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                 {item.platform} · {item.date}
                              </div>
                           </div>
                           <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-ember" />
                        </a>
                     ))
                  ) : (
                     <div className="py-6 text-center text-sm text-muted-foreground">
                        No recent solves available right now.
                     </div>
                  )}
               </div>
            </div>
         </section>

         <div className="h-20" />
      </PageShell>
   );
}