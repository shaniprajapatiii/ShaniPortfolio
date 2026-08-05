const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "shaniprajapatiii";
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || "shaniprajapatiii";
const CODEFORCES_HANDLE = process.env.CODEFORCES_HANDLE || "shaniprajapati";
const CODECHEF_HANDLE = process.env.CODECHEF_HANDLE || "shani_6307";
const CODOLIO_USERNAME = process.env.CODOLIO_USERNAME || "shaniprajapati";

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, { ...options, cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
};


const parseGithubContributions = (html) => {
  const rectMatches = [
    ...html.matchAll(
      /<rect[^>]*data-count="(\d+)"[^>]*data-date="([^"]+)"[^>]*>/g,
    ),
  ];
  if (rectMatches.length) {
    return rectMatches.map((match) => ({
      date: match[2],
      count: Number(match[1]),
    }));
  }

  const cellTags = [
    ...html.matchAll(/<td\b[^>]*data-date="[^"]*"[^>]*>/g),
  ].map((match) => match[0]);

  const cells = cellTags
    .map((tag) => ({
      date: tag.match(/data-date="([^"]+)"/)?.[1],
      id: tag.match(/\bid="([^"]+)"/)?.[1],
      level: tag.match(/data-level="([^"]+)"/)?.[1],
    }))
    .filter((cell) => cell.date);

  const tooltipById = new Map(
    [...html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g)].map(
      (match) => [match[1], match[2].trim()],
    ),
  );

  return cells.map((cell) => {
    const tooltipText = cell.id ? tooltipById.get(cell.id) : null;
    const countMatch = tooltipText?.match(/^(\d+)\s+contribution/i);
    const count = countMatch
      ? Number(countMatch[1])
      : Number(cell.level) > 0
        ? Number(cell.level) // fall back to the 0–4 intensity bucket
        : 0;
    return { date: cell.date, count };
  });
};

const buildStreak = (calendar = []) => {
  if (!calendar.length) return 0;
  const sorted = [...calendar].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  let streak = 0;
  for (let index = sorted.length - 1; index >= 0; index -= 1) {
    if (sorted[index].count > 0) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
};

const safeInt = (value) => {
  const number = Number(String(value).replace(/[^0-9]/g, ""));
  return Number.isFinite(number) ? number : null;
};

// --- Cross-platform topic merging -----------------------------------------
const TOPIC_ALIASES = {
  dp: "Dynamic Programming",
  "dynamic programming": "Dynamic Programming",
  graphs: "Graphs",
  graph: "Graphs",
  "dfs and similar": "Graphs",
  trees: "Trees",
  tree: "Trees",
  strings: "Strings",
  string: "Strings",
  greedy: "Greedy",
  "binary search": "Binary Search",
  "two pointers": "Two Pointers",
  arrays: "Arrays",
  array: "Arrays",
  backtracking: "Backtracking",
  bitmasks: "Bit Manipulation",
  "bit manipulation": "Bit Manipulation",
  math: "Math",
  sortings: "Sorting",
  sorting: "Sorting",
  hashing: "Hash Table",
  "hash table": "Hash Table",
  "data structures": "Data Structures",
  "constructive algorithms": "Constructive Algorithms",
  implementation: "Implementation",
  "number theory": "Number Theory",
  combinatorics: "Combinatorics",
  geometry: "Geometry",
  "shortest paths": "Graphs",
  dsu: "Union Find",
  "union find": "Union Find",
};

const canonicalTopic = (name) => {
  const key = name.trim().toLowerCase();
  if (TOPIC_ALIASES[key]) return TOPIC_ALIASES[key];
  return name
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const mergeTopics = (leetcodeTopics = [], codeforcesTopics = []) => {
  const merged = new Map();
  const add = (name, solved) => {
    const key = canonicalTopic(name);
    merged.set(key, (merged.get(key) ?? 0) + solved);
  };

  leetcodeTopics.forEach((topic) => add(topic.name, topic.solved));
  codeforcesTopics.forEach((topic) => add(topic.name, topic.solved));

  const sorted = Array.from(merged.entries())
    .map(([name, solved]) => ({ name, solved }))
    .sort((a, b) => b.solved - a.solved)
    .slice(0, 10);

  const n = sorted.length;
  return sorted.map((item, index) => {
    const percentile = n <= 1 ? 0 : index / (n - 1);
    const level =
      percentile < 0.34 ? "Strong" : percentile < 0.67 ? "Comfortable" : "Learning";
    return { ...item, level };
  });
};

const mergeContests = (...lists) =>
  lists
    .flat()
    .filter(Boolean)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8);

// --- GitHub ------------------------------------------------------------
export async function fetchGithubStats() {
  const [profileData, contributionsHtml] = await Promise.all([
    fetchJson(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        accept: "application/vnd.github.v3+json",
        "user-agent": "Mozilla/5.0",
      },
    }),
    fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions`, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "user-agent": "Mozilla/5.0",
      },
      cache: "no-store",
    }).then((res) => {
      if (!res.ok)
        throw new Error(`GitHub contributions fetch failed ${res.status}`);
      return res.text();
    }),
  ]);

  const contributions = parseGithubContributions(contributionsHtml);
  const totalContributions = contributions.reduce(
    (sum, item) => sum + item.count,
    0,
  );
  const yearContributionsMatch = contributionsHtml.match(
    /<h2[^>]*>([\d,]+) contributions in the last year<\/h2>/i,
  );
  const yearContributions = yearContributionsMatch
    ? safeInt(yearContributionsMatch[1])
    : totalContributions;

  return {
    handle: GITHUB_USERNAME,
    url: `https://github.com/${GITHUB_USERNAME}`,
    publicRepos: profileData.public_repos ?? null,
    followers: profileData.followers ?? null,
    totalContributions: yearContributions,
    contributions,
  };
}

// --- LeetCode ------------------------------------------------------------
export async function fetchLeetCodeStats() {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        tagProblemCounts {
          advanced { tagName tagSlug problemsSolved }
          intermediate { tagName tagSlug problemsSolved }
          fundamental { tagName tagSlug problemsSolved }
        }
        userCalendar {
          streak
          totalActiveDays
          submissionCalendar
        }
        profile {
          ranking
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
        attendedContestsCount
      }
      userContestRankingHistory(username: $username) {
        attended
        rating
        ranking
        contest {
          title
          titleSlug
          startTime
        }
      }
      recentAcSubmissionList(username: $username, limit: 15) {
        title
        titleSlug
        timestamp
      }
    }
  `;

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
      Referer: `https://leetcode.com/${LEETCODE_USERNAME}`,
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({ query, variables: { username: LEETCODE_USERNAME } }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode fetch failed: ${response.status}`);
  }

  const json = await response.json();
  if (json?.errors?.length) {
    throw new Error(json.errors[0]?.message || "LeetCode GraphQL error");
  }

  const matchedUser = json?.data?.matchedUser;
  if (!matchedUser) {
    throw new Error("LeetCode user not found");
  }

  const submissionCalendarRaw = matchedUser?.userCalendar?.submissionCalendar;
  const calendar = submissionCalendarRaw
    ? Object.entries(JSON.parse(submissionCalendarRaw)).map(
      ([timestamp, count]) => ({
        date: new Date(Number(timestamp) * 1000).toISOString().slice(0, 10),
        count: Number(count),
      }),
    )
    : [];

  const allSubmissions = matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
  const solvedEntry = allSubmissions.find(
    (entry) => entry.difficulty === "All",
  );

  const tagGroups = matchedUser?.tagProblemCounts ?? {};
  const topics = [
    ...(tagGroups.fundamental ?? []),
    ...(tagGroups.intermediate ?? []),
    ...(tagGroups.advanced ?? []),
  ]
    .filter((tag) => tag.problemsSolved > 0)
    .map((tag) => ({ name: tag.tagName, solved: tag.problemsSolved }));

  const recentSolved = (json?.data?.recentAcSubmissionList ?? []).map(
    (item) => ({
      title: item.title,
      url: `https://leetcode.com/problems/${item.titleSlug}/`,
      platform: "LeetCode",
      date: new Date(Number(item.timestamp) * 1000).toISOString().slice(0, 10),
    }),
  );

  const contestHistory = (json?.data?.userContestRankingHistory ?? [])
    .filter((entry) => entry.attended)
    .sort((a, b) => a.contest.startTime - b.contest.startTime);

  const contestsFull = contestHistory.map((entry, index) => ({
    name: entry.contest.title,
    rank: entry.ranking,
    delta:
      index === 0
        ? 0
        : Math.round(entry.rating - contestHistory[index - 1].rating),
    date: new Date(entry.contest.startTime * 1000).toISOString().slice(0, 10),
    platform: "LeetCode",
    url: entry.contest.titleSlug
      ? `https://leetcode.com/contest/${entry.contest.titleSlug}/`
      : "https://leetcode.com/contest/",
  }));

  return {
    handle: LEETCODE_USERNAME,
    url: `https://leetcode.com/${LEETCODE_USERNAME}`,
    solvedCount: solvedEntry?.count ?? null,
    totalContributions: matchedUser?.userCalendar?.totalActiveDays ?? null,
    streak: matchedUser?.userCalendar?.streak ?? buildStreak(calendar),
    contributions: calendar,
    rating: matchedUser?.profile?.ranking ?? null,
    contestRating: json?.data?.userContestRanking?.rating
      ? Math.round(json.data.userContestRanking.rating)
      : null,
    contestGlobalRanking: json?.data?.userContestRanking?.globalRanking ?? null,
    attendedContestsCount:
      json?.data?.userContestRanking?.attendedContestsCount ?? null,
    topics,
    recentSolved,
    contests: contestsFull.slice(-8).reverse(),
  };
}

// --- Codeforces ------------------------------------------------------------
export async function fetchCodeforcesStats() {
  const [infoData, ratingData, statusData] = await Promise.all([
    fetchJson(
      `https://codeforces.com/api/user.info?handles=${CODEFORCES_HANDLE}`,
      { headers: { accept: "application/json" } },
    ),
    fetchJson(
      `https://codeforces.com/api/user.rating?handle=${CODEFORCES_HANDLE}`,
      { headers: { accept: "application/json" } },
    ),
    fetchJson(
      `https://codeforces.com/api/user.status?handle=${CODEFORCES_HANDLE}&from=1&count=10000`,
      { headers: { accept: "application/json" } },
    ).catch(() => ({ status: "FAILED", result: [] })),
  ]);

  const user = infoData?.result?.[0];
  const ratingHistory = ratingData?.result ?? [];
  const submissions = statusData?.result ?? [];

  const solvedProblems = new Map();
  submissions.forEach((submission) => {
    if (submission.verdict === "OK") {
      const key = `${submission.problem.contestId}-${submission.problem.index}`;
      if (!solvedProblems.has(key)) {
        solvedProblems.set(key, submission.problem);
      }
    }
  });

  const tagCounts = new Map();
  solvedProblems.forEach((problem) => {
    (problem.tags ?? []).forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    });
  });
  const topics = Array.from(tagCounts.entries())
    .map(([name, solved]) => ({ name, solved }))
    .sort((a, b) => b.solved - a.solved)
    .slice(0, 15);

  const submissionsByDate = submissions.reduce((map, submission) => {
    const date = new Date(submission.creationTimeSeconds * 1000)
      .toISOString()
      .slice(0, 10);
    map[date] = (map[date] ?? 0) + 1;
    return map;
  }, {});
  const heatmap = Object.entries(submissionsByDate).map(([date, count]) => ({
    date,
    count,
  }));

    const formatSecondsDate = (secs) => {
      if (!Number.isFinite(secs)) return null;
      try {
        const d = new Date(secs * 1000);
        return Number.isFinite(d.getTime()) ? d.toISOString().slice(0, 10) : null;
      } catch {
        return null;
      }
    };

    const contests = ratingHistory
    .slice(-8)
    .reverse()
    .map((item) => ({
      name: item.contestName,
      rank: item.rank,
      delta: item.newRating - item.oldRating,
        date: formatSecondsDate(item.contestStartTimeSeconds) || "—",
      platform: "Codeforces",
      url: `https://codeforces.com/contest/${item.contestId}`,
    }));

  const seenRecent = new Set();
  const recentSolved = submissions
    .filter((submission) => submission.verdict === "OK")
    .sort((a, b) => b.creationTimeSeconds - a.creationTimeSeconds)
    .filter((submission) => {
      const key = `${submission.problem.contestId}-${submission.problem.index}`;
      if (seenRecent.has(key)) return false;
      seenRecent.add(key);
      return true;
    })
    .slice(0, 10)
    .map((submission) => ({
      title: `${submission.problem.index}. ${submission.problem.name}`,
      url: `https://codeforces.com/problemset/problem/${submission.problem.contestId}/${submission.problem.index}`,
      platform: "Codeforces",
      date: new Date(submission.creationTimeSeconds * 1000)
        .toISOString()
        .slice(0, 10),
    }));

  return {
    handle: CODEFORCES_HANDLE,
    url: `https://codeforces.com/profile/${CODEFORCES_HANDLE}`,
    rating: user?.rating ?? null,
    maxRating: user?.maxRating ?? null,
    contestCount: ratingHistory.length,
    solvedCount: solvedProblems.size || null,
    topics,
    contests,
    heatmap,
    recentSolved,
  };
}

// --- CodeChef ------------------------------------------------------------

export async function fetchCodeChefStats() {
  const response = await fetch(
    `https://www.codechef.com/users/${CODECHEF_HANDLE}`,
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "user-agent": "Mozilla/5.0",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`CodeChef fetch failed: ${response.status}`);
  }

  const html = await response.text();
  const ratingMatch = html.match(
    /<div[^>]*class="rating-number"[^>]*>([\d]+)/i,
  );
  const solvedMatch = html.match(/Fully Solved[\s\S]*?<div[^>]*>([\d,]+)/i);

  let contests = [];
  const ratingArrayMatch = html.match(/var\s+all_rating\s*=\s*(\[[\s\S]*?\]);/);
  if (ratingArrayMatch) {
    try {
      const parsed = JSON.parse(ratingArrayMatch[1]);
      contests = parsed
        .slice(-8)
        .map((entry, index, arr) => ({
          name: entry.name,
          rank: safeInt(entry.rank),
          delta:
            index === 0
              ? 0
              : safeInt(entry.rating) - safeInt(arr[index - 1].rating),
          date: entry.end_date ? entry.end_date.slice(0, 10) : entry.getyear,
          platform: "CodeChef",
          url: entry.code ? `https://www.codechef.com/${entry.code}` : undefined,
        }))
        .reverse();
    } catch {
      contests = [];
    }
  }

  return {
    handle: CODECHEF_HANDLE,
    url: `https://www.codechef.com/users/${CODECHEF_HANDLE}`,
    rating: safeInt(ratingMatch?.[1]),
    solvedCount: safeInt(solvedMatch?.[1]),
    contests,
  };
}

// --- Aggregate ------------------------------------------------------------
export async function getLiveCodingStats() {
  const [github, leetcode, codeforces, codechef] = await Promise.all([
    fetchGithubStats().catch((error) => {
      console.error("GitHub stats failed:", error.message);
      return null;
    }),
    fetchLeetCodeStats().catch((error) => {
      console.error("LeetCode stats failed:", error.message);
      return null;
    }),
    fetchCodeforcesStats().catch((error) => {
      console.error("Codeforces stats failed:", error.message);
      return null;
    }),
    fetchCodeChefStats().catch((error) => {
      console.error("CodeChef stats failed:", error.message);
      return null;
    }),
  ]);

  const platformSolved = [
    { platform: "LeetCode", solved: leetcode?.solvedCount ?? null },
    { platform: "Codeforces", solved: codeforces?.solvedCount ?? null },
    { platform: "CodeChef", solved: codechef?.solvedCount ?? null },
  ];

  const problemsSolved = platformSolved
    .map((p) => p.solved)
    .filter(Number.isFinite)
    .reduce((sum, value) => sum + value, 0);

  const recentSolved = [
    ...(leetcode?.recentSolved ?? []),
    ...(codeforces?.recentSolved ?? []),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8);

  const totalContestCount =
    (codeforces?.contestCount ?? 0) +
    (leetcode?.attendedContestsCount ?? 0) +
    (codechef?.contests?.length ?? 0);

  return {
    github,
    leetcode,
    codeforces,
    codechef,
    platformSolved,
    problemsSolved: problemsSolved || null,
    contestCount: totalContestCount || null,
    currentStreak: leetcode?.streak ?? null,
    leetcodeHeatmap: leetcode?.contributions ?? [],
    codeforcesHeatmap: codeforces?.heatmap ?? [],
    githubHeatmap: github?.contributions ?? [],
    topics: mergeTopics(leetcode?.topics, codeforces?.topics),
    contests: mergeContests(
      codeforces?.contests,
      leetcode?.contests,
      codechef?.contests,
    ),
    recentSolved,
    codolioUrl: `https://codolio.com/profile/${CODOLIO_USERNAME}`,
  };
}