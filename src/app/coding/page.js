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
const CELL = 12;
const GAP = 3;

// Real Sun–Sat calendar grid anchored to today.
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

function summarizeHeatmap(data = []) {
   const activeDates = new Set(
      data.filter((entry) => entry.count > 0).map((entry) => entry.date),
   );
   const total = data.reduce((sum, entry) => sum + (entry.count || 0), 0);

   const today = new Date();
   today.setHours(0, 0, 0, 0);

   let maxStreak = 0;
   let current = 0;
   for (let i = 0; i < 365; i += 1) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      const iso = day.toISOString().slice(0, 10);
      if (activeDates.has(iso)) {
         current += 1;
         maxStreak = Math.max(maxStreak, current);
      } else {
         current = 0;
      }
   }

   return { total, activeDays: activeDates.size, maxStreak };
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

function Heatmap({ title, data, accent, unitLabel }) {
   const weeks = buildCalendarWeeks(data, 53);
   const allCells = weeks.flat().filter((cell) => cell.count != null);
   const maxValue = Math.max(...allCells.map((cell) => cell.count), 1);
   const summary = summarizeHeatmap(data);

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
      <div className="bento-card p-6 lg:p-8">
         <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
               <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {title}
               </div>
               <div className="mt-1 text-xl font-semibold">
                  {formatNumber(summary.total)} {unitLabel}s in the past year
               </div>
               <div className="mt-1 font-mono text-xs text-muted-foreground">
                  Total active days: {summary.activeDays} &nbsp;·&nbsp; Max streak: {summary.maxStreak}
               </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
               less
               {[0, 25, 50, 75, 100].map((level) => (
                  <span
                     key={level}
                     className="rounded-[3px]"
                     style={{
                        height: CELL,
                        width: CELL,
                        background: level
                           ? `color-mix(in oklab, ${accent} ${level}%, transparent)`
                           : "color-mix(in oklab, var(--foreground) 8%, var(--surface))",
                     }}
                  />
               ))}
               more
            </div>
         </div>

         <div className="mt-5 overflow-x-auto pb-1">
            <div className="inline-flex flex-col" style={{ gap: GAP }}>
               <div className="flex" style={{ gap: GAP, paddingLeft: 28 + GAP }}>
                  {weeks.map((_, weekIndex) => {
                     const found = monthLabels.find((m) => m.index === weekIndex);
                     return (
                        <div
                           key={weekIndex}
                           className="text-[10px] text-muted-foreground"
                           style={{ width: CELL }}
                        >
                           {found ? found.label : ""}
                        </div>
                     );
                  })}
               </div>

               <div className="flex" style={{ gap: GAP }}>
                  <div className="flex flex-col text-[10px] text-muted-foreground" style={{ gap: GAP, width: 28 }}>
                     {["", "Mon", "", "Wed", "", "Fri", ""].map((label, index) => (
                        <span key={index} style={{ height: CELL, lineHeight: `${CELL}px` }}>
                           {label}
                        </span>
                     ))}
                  </div>

                  {weeks.map((week, weekIndex) => (
                     <div key={weekIndex} className="flex flex-col" style={{ gap: GAP }}>
                        {week.map((cell, dayIndex) => {
                           if (cell.count == null) {
                              return <div key={dayIndex} style={{ height: CELL, width: CELL }} />;
                           }
                           const level = levelForCount(cell.count, maxValue);
                           const opacity = LEVEL_OPACITY[level];
                           const background = opacity
                              ? `color-mix(in oklab, ${accent} ${opacity}%, transparent)`
                              : "color-mix(in oklab, var(--foreground) 8%, var(--surface))";

                           return (
                              <div
                                 key={dayIndex}
                                 className="rounded-[3px] border border-border/20 transition-transform hover:scale-125"
                                 title={`${cell.count} ${unitLabel}${cell.count === 1 ? "" : "s"} on ${cell.date}`}
                                 style={{ height: CELL, width: CELL, background }}
                              />
                           );
                        })}
                     </div>
                  ))}
               </div>
            </div>

            {summary.total === 0 ? (
               <div className="mt-3 rounded-xl bg-surface px-3 py-2 text-center text-xs text-muted-foreground">
                  No recorded activity in the last year, or the live source is temporarily unreachable.
               </div>
            ) : null}
         </div>
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
   const platformSolved = stats.platformSolved ?? [];
   const maxPlatformSolved = Math.max(...platformSolved.map((p) => p.solved ?? 0), 1);

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
         badges: [
            stats.leetcode?.maxContestRating
               ? `Max ${Math.round(stats.leetcode.maxContestRating)}`
               : stats.leetcode?.contestRating
                  ? `Max ${Math.round(stats.leetcode.contestRating)}`
                  : stats.leetcode?.rating
                     ? `Max ${formatNumber(stats.leetcode.rating)}`
                     : "—",
         ],
      },
      {
         platform: "Codeforces",
         handle: stats.codeforces?.handle ?? "—",
         primary: stats.codeforces?.solvedCount ? `${formatNumber(stats.codeforces.solvedCount)} solved` : "—",
         secondary: stats.codeforces?.rating ? `Rating ${stats.codeforces.rating}` : "—",
         url: stats.codeforces?.url ?? "#",
         badges: [stats.codeforces?.maxRating ? `Max ${stats.codeforces.maxRating}` : "—"],
      },
      {
         platform: "CodeChef",
         handle: stats.codechef?.handle ?? "—",
         primary: stats.codechef?.solvedCount ? `${formatNumber(stats.codechef.solvedCount)} solved` : "—",
         secondary: stats.codechef?.rating ? `Rating ${stats.codechef.rating}` : "—",
         url: stats.codechef?.url ?? "#",
         badges: [stats.codechef?.contests?.length ? `${stats.codechef.contests.length} contests` : "—"],
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
            <div className="bento-card p-6 lg:p-8">
               <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                     <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Problems by platform
                     </div>
                     <div className="mt-1 text-xl font-semibold">
                        {formatNumber(stats.problemsSolved)} total problems solved
                     </div>
                  </div>
                  <a
                     href={stats.codolioUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:border-ember/60 hover:text-ember"
                  >
                     View full portfolio on Codolio <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
               </div>
               <div className="mt-6 space-y-3">
                  {platformSolved.map((item) => {
                     const percent = Math.round(((item.solved ?? 0) / maxPlatformSolved) * 100);
                     return (
                        <div key={item.platform}>
                           <div className="flex items-center justify-between font-mono text-sm">
                              <span>{item.platform}</span>
                              <span className="text-muted-foreground">
                                 {item.solved != null ? formatNumber(item.solved) : "—"}
                              </span>
                           </div>
                           <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background">
                              <div
                                 className="h-full rounded-full bg-ember"
                                 style={{ width: `${item.solved ? percent : 0}%` }}
                              />
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </section>

         <section className="mx-auto max-w-7xl space-y-3 px-4 pt-8 sm:px-6 lg:px-8">
            <Heatmap
               title="LeetCode heatmap"
               data={stats.leetcodeHeatmap}
               accent="oklch(0.70 0.16 30)"
               unitLabel="submission"
            />
            <Heatmap
               title="Codeforces heatmap"
               data={stats.codeforcesHeatmap}
               accent="var(--ember)"
               unitLabel="submission"
            />
            <Heatmap
               title="GitHub heatmap"
               data={stats.githubHeatmap}
               accent="oklch(0.70 0.16 180)"
               unitLabel="contribution"
            />
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
                     LC + CF + CodeChef
                  </div>
               </div>
               <div className="mt-5 divide-y divide-border">
                  {contests.length ? (
                     contests.map((contest) => {
                        const positive = contest.delta > 0;
                        const deltaLabel = contest.delta > 0 ? `+${contest.delta}` : `${contest.delta}`;
                        const Wrapper = contest.url ? "a" : "div";
                        const wrapperProps = contest.url
                           ? { href: contest.url, target: "_blank", rel: "noopener noreferrer" }
                           : {};

                        return (
                           <Wrapper
                              key={`${contest.platform}-${contest.name}-${contest.date}`}
                              {...wrapperProps}
                              className="group flex items-start justify-between py-3 first:pt-0"
                           >
                              <div className="min-w-0 pr-3">
                                 <div className="truncate text-sm font-medium group-hover:text-ember">
                                    {contest.name}
                                 </div>
                                 <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                    {contest.platform} · rank {contest.rank?.toLocaleString?.() ?? contest.rank ?? "—"}
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
                           </Wrapper>
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