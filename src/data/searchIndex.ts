// --------------------------------------------------
// RAZ SYSTEM — GLOBAL SEARCH INDEX (TIER-AWARE)
// --------------------------------------------------

import { tournaments2026 } from "./tournamentMeta";
import type { TournamentMeta } from "./tournamentMeta";

/* ==================================================
   TYPES
   ================================================== */

export type SearchEntityType =
  | "tournament"
  | "nation"
  | "hub";

export interface SearchEntity {
  id: string;
  type: SearchEntityType;
  title: string;
  subtitle?: string;
  keywords: string[];
  route: string;
}

/* ==================================================
   HELPERS
   ================================================== */

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function buildKeywords(...values: (string | undefined)[]) {
  return values
    .filter(Boolean)
    .flatMap((v) => normalize(v as string).split(" "));
}

/* ==================================================
   TOURNAMENT INDEX
   ================================================== */

function buildTournamentIndex(): SearchEntity[] {
  return tournaments2026.map((t: TournamentMeta) => ({
    id: t.instanceId,
    type: "tournament",
    title: `${t.name} ${t.year}`,
    subtitle:
      t.gender === "men"
        ? "Men's Tournament"
        : "Women's Tournament",
    keywords: buildKeywords(
      t.name,
      t.matchKey,
      t.gender,
      t.type,
      t.heroSubtitle
    ),
    route: t.route,
  }));
}

/* ==================================================
   NATION INDEX
   ================================================== */

const nations = [
  "south-africa",
  "new-zealand",
  "england",
  "france",
  "wales",
  "ireland",
  "scotland",
  "italy",
  "australia",
  "japan",
  "fiji",
  "argentina",
];

function formatNationName(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildNationIndex(): SearchEntity[] {
  return nations.map((n) => ({
    id: n,
    type: "nation",
    title: formatNationName(n),
    keywords: buildKeywords(n),
    route: `/anthems/${n}`,
  }));
}

/* ==================================================
   HUB INDEX (TIER-AWARE)
   ================================================== */

function buildHubIndex(
  tier: "premium" | "super"
): SearchEntity[] {
  const hubs: SearchEntity[] = [
    {
      id: "tournaments",
      type: "hub",
      title: "Tournaments",
      route: "/tournaments",
      keywords: ["tournaments", "competitions"],
    },
    {
      id: "match-center",
      type: "hub",
      title: "Match Center",
      route: "/match-center",
      keywords: ["matches", "scores", "fixtures"],
    },
    {
      id: "calendar",
      type: "hub",
      title: "Calendar",
      route: "/calendar",
      keywords: ["schedule", "calendar"],
    },
    {
      id: "stadiums",
      type: "hub",
      title: "Stadiums",
      route: "/stadiums",
      keywords: ["venues", "stadiums"],
    },
    {
      id: "media",
      type: "hub",
      title: "Media",
      route: "/media",
      keywords: ["videos", "podcasts"],
    },
    {
      id: "fanzone",
      type: "hub",
      title: "Fanzone",
      route: "/fanzone",
      keywords: ["fans", "community"],
    },
    {
      id: "news",
      type: "hub",
      title: "News",
      route: "/news",
      keywords: ["updates", "articles"],
    },
  ];

  if (tier === "super") {
    hubs.push(
      {
        id: "heritage",
        type: "hub",
        title: "Heritage",
        route: "/heritage",
        keywords: ["history", "legends"],
      },
      {
        id: "defining-moments",
        type: "hub",
        title: "Defining Moments",
        route: "/defining-moments",
        keywords: ["moments", "history", "turning points"],
      }
    );
  }

  return hubs;
}

/* ==================================================
   BUILD INDEX
   ================================================== */

export function buildSearchIndex(
  tier: "premium" | "super"
): SearchEntity[] {
  return [
    ...buildTournamentIndex(),
    ...buildNationIndex(),
    ...buildHubIndex(tier),
  ];
}

/* ==================================================
   SEARCH ENGINE
   ================================================== */

export function searchEntities(
  query: string,
  index: SearchEntity[]
): SearchEntity[] {
  const q = normalize(query);

  if (!q) return [];

  return index.filter((item) => {
    const haystack = [
      item.title,
      item.subtitle,
      ...item.keywords,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}