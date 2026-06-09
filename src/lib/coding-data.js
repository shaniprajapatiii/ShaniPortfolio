const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "shaniprajapatiii";
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || "shaniprajapatiii";
const CODEFORCES_HANDLE = process.env.CODEFORCES_HANDLE || "shaniprajapati";
const CODECHEF_HANDLE = process.env.CODECHEF_HANDLE || "shani_6307";

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const parseContributionCells = (html) => {
  const matches = [
    ...html.matchAll(
      /<rect[^>]*data-count="(\d+)"[^>]*data-date="([^"]+)"[^>]*>/g,
    ),
  ];
  return matches.map((match) => ({
    date: match[2],
    count: Number(match[1]),
  }));
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

const mergeDailyCounts = (...arrays) => {
  const map = new Map();

  arrays.flat().forEach((entry) => {
    if (!entry?.date) return;
    const date = entry.date.slice(0, 10);
    const count = Number(entry.count || 0);
    map.set(date, (map.get(date) ?? 0) + count);
  });

  return Array.from(map.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

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

  const contributions = parseContributionCells(contributionsHtml);
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

export async function fetchLeetCodeStats() {
  const query = `query getUserContributions($username: String!) { matchedUser(username: $username) { username contributionsCalendar { totalActiveDays totalContributions weeks { contributionDays { date contributionCount color } } } submitStats { acSubmissionNum { difficulty count submissions count } } profile { ranking } } }`;

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
      Referer: `https://leetcode.com/${LEETCODE_USERNAME}`,
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({ query, variables: { username: LEETCODE_USERNAME } }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`LeetCode fetch failed: ${response.status}`);
  }

  const json = await response.json();
  const matchedUser = json?.data?.matchedUser;
  const calendar = matchedUser?.contributionsCalendar?.weeks?.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: Number(day.contributionCount || 0),
    })),
  );
  const allSubmissions = matchedUser?.submitStats?.acSubmissionNum ?? [];
  const solvedEntry = allSubmissions.find(
    (entry) => entry.difficulty === "All",
  );

  return {
    handle: LEETCODE_USERNAME,
    url: `https://leetcode.com/${LEETCODE_USERNAME}`,
    solvedCount: solvedEntry?.count ?? null,
    totalContributions:
      matchedUser?.contributionsCalendar?.totalContributions ?? null,
    streak: buildStreak(calendar),
    contributions: calendar ?? [],
    rating: matchedUser?.profile?.ranking ?? null,
  };
}

export async function fetchCodeforcesStats() {
  const [infoData, ratingData, statusData] = await Promise.all([
    fetchJson(
      `https://codeforces.com/api/user.info?handles=${CODEFORCES_HANDLE}`,
      {
        headers: { accept: "application/json" },
      },
    ),
    fetchJson(
      `https://codeforces.com/api/user.rating?handle=${CODEFORCES_HANDLE}`,
      {
        headers: { accept: "application/json" },
      },
    ),
    fetchJson(
      `https://codeforces.com/api/user.status?handle=${CODEFORCES_HANDLE}&from=1&count=1000`,
      {
        headers: { accept: "application/json" },
      },
    ).catch(() => ({ status: "FAILED", result: [] })),
  ]);

  const user = infoData?.result?.[0];
  const ratingHistory = ratingData?.result ?? [];
  const solvedProblems = new Set();
  (statusData?.result ?? []).forEach((submission) => {
    if (submission.verdict === "OK") {
      solvedProblems.add(
        `${submission.problem.contestId}-${submission.problem.index}`,
      );
    }
  });

  const submissionsByDate = (statusData?.result ?? []).reduce((map, submission) => {
    const date = new Date(submission.creationTimeSeconds * 1000)
      .toISOString()
      .slice(0, 10);
    map[date] = (map[date] ?? 0) + 1;
    return map;
  }, {});

  const contests = ratingHistory
    .slice(-5)
    .reverse()
    .map((item) => ({
      name: item.contestName,
      rank: item.rank,
      delta: item.newRating - item.oldRating,
      date: new Date(item.contestStartTimeSeconds * 1000)
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
    contests,
    submissionsByDate,
  };
}

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

  return {
    handle: CODECHEF_HANDLE,
    url: `https://www.codechef.com/users/${CODECHEF_HANDLE}`,
    rating: safeInt(ratingMatch?.[1]),
    solvedCount: safeInt(solvedMatch?.[1]),
  };
}

export async function getLiveCodingStats() {
  const [github, leetcode, codeforces, codechef] = await Promise.all([
    fetchGithubStats().catch(() => null),
    fetchLeetCodeStats().catch(() => null),
    fetchCodeforcesStats().catch(() => null),
    fetchCodeChefStats().catch(() => null),
  ]);

  const problemsSolved = [
    leetcode?.solvedCount,
    codeforces?.solvedCount,
    codechef?.solvedCount,
  ]
    .filter(Number.isFinite)
    .reduce((sum, value) => sum + value, 0);

  const codeforcesHeatmap = Object.entries(codeforces?.submissionsByDate ?? {}).map(
    ([date, count]) => ({ date, count }),
  );
  const combinedCodingHeatmap = mergeDailyCounts(
    leetcode?.contributions ?? [],
    codeforcesHeatmap,
  );

  return {
    github,
    leetcode,
    codeforces,
    codechef,
    problemsSolved: problemsSolved || null,
    contestCount: codeforces?.contestCount ?? null,
    currentStreak: leetcode?.streak ?? null,
    combinedCodingHeatmap,
    githubHeatmap: github?.contributions ?? [],
  };
}
