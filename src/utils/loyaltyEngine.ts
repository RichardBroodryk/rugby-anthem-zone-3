export type LoyaltyInput = {
  matchesWatched?: number;
  videosWatched?: number;
  ticketsBought?: number;
  commentsMade?: number;
};

export type LoyaltyOutput = {
  points: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
};

/* ================= POINT RULES ================= */

const POINTS = {
  match: 50,
  video: 10,
  ticket: 500,
  comment: 5,
};

/* ================= TIERS ================= */

const TIERS = [
  { key: "bronze", min: 0 },
  { key: "silver", min: 1000 },
  { key: "gold", min: 3000 },
  { key: "platinum", min: 7000 },
] as const;

/* ================= ENGINE ================= */

export function deriveLoyalty(input: LoyaltyInput): LoyaltyOutput {
  const matches = input.matchesWatched ?? 0;
  const videos = input.videosWatched ?? 0;
  const tickets = input.ticketsBought ?? 0;
  const comments = input.commentsMade ?? 0;

  const points =
    matches * POINTS.match +
    videos * POINTS.video +
    tickets * POINTS.ticket +
    comments * POINTS.comment;

  const tier =
    TIERS.slice()
      .reverse()
      .find((t) => points >= t.min)?.key || "bronze";

  return { points, tier };
}