// ==================================================
// MATCHES ADAPTER — AUTHORITATIVE + INTELLIGENCE
// WITH CATEGORY CONTROL (INTERNATIONAL FIRST)
// ==================================================

import { matches2026, MatchData, MatchState } from "./matches2026";

/* ================= API BASE ================= */

const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://rugby-anthem-backend.fly.dev";

/* ================= TYPES ================= */

type MatchCategory = "international" | "domestic";

/* ================= LEAGUE MAP ================= */

const LEAGUE_MAP: Record<string, string[]> = {
  urc: ["united rugby championship", "urc"],
  premiership: ["gallagher premiership", "premiership"],
  top14: ["top 14"],
  super: ["super rugby", "super rugby pacific"],
  japan: ["japan rugby league one", "league one"],
  investec: ["investec champions cup", "champions cup"],
  epcr: ["epcr challenge cup", "challenge cup"],
};

/* ================= CATEGORY ================= */

function getMatchCategory(tournament: string): MatchCategory {
  const t = tournament.toLowerCase();

  if (
    t.includes("urc") ||
    t.includes("premiership") ||
    t.includes("top 14") ||
    t.includes("super rugby") ||
    t.includes("league one")
  ) {
    return "domestic";
  }

  return "international";
}

/* ================= NORMALIZER ================= */

function normalizeMatch(m: any): MatchData {
  return {
    id: m.id,
    tournament: m.tournament,
    date: m.date,
    venue: m.venue,

    home: {
      name: m.home?.name || m.homeTeam || "",
      country: m.home?.country || "",
    },

    away: {
      name: m.away?.name || m.awayTeam || "",
      country: m.away?.country || "",
    },

    score: m.score
      ? {
          home: m.score.home,
          away: m.score.away,
        }
      : undefined,
  };
}

/* ================= MATCH STATE ================= */

function getMatchState(match: MatchData): MatchState {
  const now = new Date();
  const matchDate = new Date(match.date);

  if (match.score) return "final";

  const diff = (matchDate.getTime() - now.getTime()) / (1000 * 60);

  if (diff < 0 && diff > -120) return "live";
  if (diff >= 0 && diff <= 60) return "starting";
  if (matchDate.toDateString() === now.toDateString())
    return "today";

  return "upcoming";
}

/* ================= IMPORTANCE ================= */

function getImportanceScore(
  match: MatchData,
  state: MatchState
): number {
  let score = 0;

  if (state === "live") score += 100;
  else if (state === "starting") score += 80;
  else if (state === "today") score += 60;
  else if (state === "final") score += 40;
  else score += 10;

  const t = match.tournament.toLowerCase();

  if (t.includes("six nations")) score += 30;
  if (t.includes("nations championship")) score += 30;
  if (t.includes("champions cup")) score += 25;

  return score;
}

/* ================= FILTERS ================= */

function filterByCategory(
  matches: MatchData[],
  category?: MatchCategory | "all"
): MatchData[] {
  if (!category || category === "international") {
    return matches.filter(
      (m) => getMatchCategory(m.tournament) === "international"
    );
  }

  if (category === "domestic") {
    return matches.filter(
      (m) => getMatchCategory(m.tournament) === "domestic"
    );
  }

  // "all"
  return matches;
}

function filterByLeague(
  matches: MatchData[],
  leagueId?: string
): MatchData[] {
  if (!leagueId) return matches;

  const competitions = LEAGUE_MAP[leagueId];
  if (!competitions) return matches;

  return matches.filter((m) =>
    competitions.some((c) =>
      m.tournament.toLowerCase().includes(c)
    )
  );
}

/* ================= MERGE ================= */

function mergeMatches(
  apiMatches: MatchData[],
  fallback: MatchData[]
): MatchData[] {
  const map = new Map<number, MatchData>();

  apiMatches.forEach((m) => map.set(m.id, m));

  fallback.forEach((m) => {
    if (!map.has(m.id)) {
      map.set(m.id, m);
    }
  });

  return Array.from(map.values());
}

/* ================= ENRICH ================= */

function enrichMatches(matches: MatchData[]): MatchData[] {
  return matches.map((m) => {
    const state = getMatchState(m);
    const importance = getImportanceScore(m, state);

    return {
      ...m,
      state,
      importance,
    };
  });
}

/* ================= SORT ================= */

function sortByImportance(matches: MatchData[]) {
  return [...matches].sort(
    (a, b) => (b.importance || 0) - (a.importance || 0)
  );
}

/* ================= FETCH ================= */

export async function getMatches(
  options?: {
    leagueId?: string;
    category?: MatchCategory | "all";
  }
): Promise<MatchData[]> {
  try {
    const res = await fetch(`${API_BASE}/api/stats/fixtures`);

    if (!res.ok) throw new Error("API failed");

    const apiMatches = await res.json();

    const normalized =
      Array.isArray(apiMatches) && apiMatches.length > 0
        ? apiMatches.map(normalizeMatch)
        : [];

    const base = mergeMatches(normalized, matches2026);

    const categoryFiltered = filterByCategory(
      base,
      options?.category
    );

    const leagueFiltered = filterByLeague(
      categoryFiltered,
      options?.leagueId
    );

    const enriched = enrichMatches(leagueFiltered);

    return sortByImportance(enriched);
  } catch {
    const categoryFiltered = filterByCategory(
      matches2026,
      options?.category
    );

    const leagueFiltered = filterByLeague(
      categoryFiltered,
      options?.leagueId
    );

    const enriched = enrichMatches(leagueFiltered);

    return sortByImportance(enriched);
  }
}