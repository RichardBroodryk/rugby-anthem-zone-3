export type EngagementInput = {
  matches?: any[];
  videos?: any[];
  purchases?: any[];
  comments?: any[];
};

export type EngagementOutput = {
  matchesFollowedSeason: number;
  tournaments: string[];
  featuresUsed: string[];
  merchPurchases: number;
};

export function buildEngagement(
  input: EngagementInput
): EngagementOutput | null {
  const matches = input.matches ?? [];
  const videos = input.videos ?? [];
  const purchases = input.purchases ?? [];
  const comments = input.comments ?? [];

  const hasActivity =
    matches.length ||
    videos.length ||
    purchases.length ||
    comments.length;

  if (!hasActivity) return null;

  return {
    matchesFollowedSeason: matches.length,

    tournaments: extractTournaments(matches),

    featuresUsed: extractFeatures(videos, purchases),

    merchPurchases: purchases.length,
  };
}

/* ================= HELPERS ================= */

function extractTournaments(matches: any[]) {
  const set = new Set<string>();

  matches.forEach((m) => {
    if (m.tournament) set.add(m.tournament);
  });

  return Array.from(set);
}

function extractFeatures(videos: any[], purchases: any[]) {
  const features: string[] = [];

  if (videos.length) features.push("Video Highlights");
  if (purchases.length) features.push("PPV Access");

  return features;
}