// --------------------------------------------------
// RAZ SYSTEM — MASTER COMPETITION REGISTRY
// Phase 4.3.2 — GLOBAL RUGBY MAP (NORMALIZED)
// --------------------------------------------------

export type CompetitionCategory =
  | "international"
  | "domestic"
  | "sevens";

export type CompetitionTier =
  | "tier1"
  | "tier2"
  | "development";

export interface Competition {
  conceptId: string;
  name: string;
  category: CompetitionCategory;
  gender: "men" | "women" | "mixed";
  tier?: CompetitionTier;
  region?: string;
  
  // Optional display fields
  logo?: string;
  hero?: string;
  route?: string;
  season?: string;
  
  // Feature flags
  supportsStandings?: boolean;
  supportsStatistics?: boolean;
  supportsFixtures?: boolean;
  supportsResults?: boolean;
  supportsSquads?: boolean;
  supportsPlayers?: boolean;
}

// --------------------------------------------------
// 🌍 MASTER REGISTRY
// --------------------------------------------------

export const COMPETITIONS: Competition[] = [
  // ==================================================
  // 🌍 MEN — INTERNATIONAL (TIER 1)
  // ==================================================

  {
    conceptId: "six-nations",
    name: "Six Nations",
    category: "international",
    gender: "men",
    tier: "tier1",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "rugby-championship",
    name: "Rugby Championship",
    category: "international",
    gender: "men",
    tier: "tier1",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "world-cup",
    name: "Rugby World Cup",
    category: "international",
    gender: "men",
    tier: "tier1",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "autumn-nations",
    name: "Autumn Nations Series",
    category: "international",
    gender: "men",
    tier: "tier1",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "summer-internationals",
    name: "Summer Internationals",
    category: "international",
    gender: "men",
    tier: "tier1",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },

  // 🔥 RAZ CORE MEN'S INTERNATIONALS
  {
    conceptId: "international-tests",
    name: "International Tests",
    category: "international",
    gender: "men",
    tier: "tier1",
    supportsStandings: false,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "nations-championship",
    name: "Nations Championship",
    category: "international",
    gender: "men",
    tier: "tier1",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "bledisloe-cup",
    name: "Bledisloe Cup",
    category: "international",
    gender: "men",
    tier: "tier1",
    supportsStandings: false,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "sa-nz-rival-tour",
    name: "The Rivalry Tour",
    category: "international",
    gender: "men",
    tier: "tier1",
    supportsStandings: false,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
  conceptId: "lions-tour",
  name: "British & Irish Lions Tour",
  category: "international",
  gender: "men",
  tier: "tier1",
  supportsStandings: false,
  supportsStatistics: true,
  supportsFixtures: true,
  supportsResults: true,
  supportsSquads: true,
  supportsPlayers: true,
},

  // ==================================================
  // 🌍 MEN — INTERNATIONAL (TIER 2 / DEVELOPMENT)
  // ==================================================

  {
    conceptId: "world-rugby-nations-cup",
    name: "World Rugby Nations Cup",
    category: "international",
    gender: "men",
    tier: "tier2",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "pacific-nations",
    name: "Pacific Nations Cup",
    category: "international",
    gender: "men",
    tier: "tier2",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },

  // ==================================================
  // 🌍 WOMEN — INTERNATIONAL
  // ==================================================

  {
    conceptId: "six-nations-women",
    name: "Women's Six Nations",
    category: "international",
    gender: "women",
    tier: "tier1",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "world-cup-women",
    name: "Women's Rugby World Cup",
    category: "international",
    gender: "women",
    tier: "tier1",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "womens-internationals",
    name: "Women's International Tests",
    category: "international",
    gender: "women",
    tier: "tier1",
    supportsStandings: false,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "wxv1",
    name: "WXV 1",
    category: "international",
    gender: "women",
    tier: "tier1",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },

  // ==================================================
  // 🏉 DOMESTIC — MEN
  // ==================================================

  {
    conceptId: "urc",
    name: "United Rugby Championship",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "global",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "top-14",
    name: "Top 14",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "france",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "premiership",
    name: "Premiership Rugby",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "england",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "super-rugby",
    name: "Super Rugby",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "sanzaar",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "pro-d2",
    name: "Pro D2",
    category: "domestic",
    gender: "men",
    tier: "tier2",
    region: "france",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "japan-league-one",
    name: "Japan League One",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "japan",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "mlr",
    name: "Major League Rugby",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "usa",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "npc",
    name: "Bunnings NPC",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "new-zealand",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },

  // ==================================================
  // 🏉 DOMESTIC — WOMEN
  // ==================================================

  {
    conceptId: "premier-15s",
    name: "Premier 15s",
    category: "domestic",
    gender: "women",
    tier: "tier1",
    region: "england",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "super-rugby-women",
    name: "Super Rugby Women",
    category: "domestic",
    gender: "women",
    tier: "tier1",
    region: "sanzaar",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "aupiki",
    name: "Super Rugby Aupiki",
    category: "domestic",
    gender: "women",
    tier: "tier1",
    region: "new-zealand",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "elite-1-women",
    name: "Elite 1 Women",
    category: "domestic",
    gender: "women",
    tier: "tier1",
    region: "france",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },

  // ==================================================
  // 🌍 EUROPEAN CLUB
  // ==================================================

  {
    conceptId: "champions-cup",
    name: "Investec Champions Cup",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "europe",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "challenge-cup",
    name: "EPCR Challenge Cup",
    category: "domestic",
    gender: "men",
    tier: "tier1",
    region: "europe",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },

  // ==================================================
  // ⚡ SEVENS — GLOBAL SYSTEM
  // ==================================================

  {
    conceptId: "svns-series",
    name: "SVNS Series",
    category: "sevens",
    gender: "mixed",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "sevens-world-cup",
    name: "Sevens World Cup",
    category: "sevens",
    gender: "mixed",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
  {
    conceptId: "olymics-sevens",
    name: "Olympic Sevens",
    category: "sevens",
    gender: "mixed",
    supportsStandings: true,
    supportsStatistics: true,
    supportsFixtures: true,
    supportsResults: true,
    supportsSquads: true,
    supportsPlayers: true,
  },
];

// ==================================================
// 🛠️ HELPER FUNCTIONS
// ==================================================

export function getCompetition(conceptId: string): Competition | undefined {
  return COMPETITIONS.find((c) => c.conceptId === conceptId);
}

export function getCompetitionByRoute(route: string): Competition | undefined {
  return COMPETITIONS.find((c) => c.route === route);
}

export function getDomesticCompetitions(gender?: "men" | "women"): Competition[] {
  return COMPETITIONS.filter((c) => {
    if (c.category !== "domestic") return false;
    if (gender && c.gender !== gender) return false;
    return true;
  });
}

export function getInternationalCompetitions(gender?: "men" | "women"): Competition[] {
  return COMPETITIONS.filter((c) => {
    if (c.category !== "international") return false;
    if (gender && c.gender !== gender) return false;
    return true;
  });
}

export function getSevensCompetitions(): Competition[] {
  return COMPETITIONS.filter((c) => c.category === "sevens");
}

export function getCompetitionsWithStandings(): Competition[] {
  return COMPETITIONS.filter((c) => c.supportsStandings === true);
}

export function getCompetitionsByRegion(region: string): Competition[] {
  return COMPETITIONS.filter((c) => c.region === region);
}

export function getCompetitionsByTier(tier: CompetitionTier): Competition[] {
  return COMPETITIONS.filter((c) => c.tier === tier);
}

const competitionRegistry = {
  COMPETITIONS,
  getCompetition,
  getCompetitionByRoute,
  getDomesticCompetitions,
  getInternationalCompetitions,
  getSevensCompetitions,
  getCompetitionsWithStandings,
  getCompetitionsByRegion,
  getCompetitionsByTier,
};

export default competitionRegistry;