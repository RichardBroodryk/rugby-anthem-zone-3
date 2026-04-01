export const mockLoyaltyData = {
  tier: "silver" as "bronze" | "silver" | "gold" | "platinum",
  points: 1340,

  /* 🔥 NOW EXPLICIT — NOT RANDOM */
  breakdown: {
    matches: 6 * 50,
    videos: 12 * 10,
    purchases: 1 * 500,
    engagement: 40,
  },

  engagement: {
    matchesFollowedSeason: 6,
    tournaments: ["Six Nations", "Rugby Championship"],
    featuresUsed: ["Live Match Audio", "PPV Access"],
    merchPurchases: 1,
  },

  history: {
    seasonsActive: 2,
    lastActive: "15 January 2026",
  },
};