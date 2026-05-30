import type { MatchData } from "../data/matches/types";

import { API_TO_CONCEPT_MAP } from "../contracts/competitionIdMap";

/* ==================================================
   NORMALIZERS
   ================================================== */

function normalizeKey(
  value?: string
): string {
  if (!value) {
    return "unknown";
  }

  return value
    .toLowerCase()
    .replace(
      /\b(women|w|7s|sevens)\b/g,
      ""
    )
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

function normalizeDate(
  date?: string
): string {
  if (!date) {
    return "";
  }

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return "";
  }

  return d
    .toISOString()
    .split("T")[0];
}

function normalizeCountry(
  name?: string
): string {
  if (!name) {
    return "unknown";
  }

  return name
    .toLowerCase()
    .replace(
      /\b(7s|sevens|women|w)\b/g,
      ""
    )
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/'/g, "")
    .trim();
}

/* ==================================================
   COUNTRY MAP
   ================================================== */

function mapCountry(
  name?: string
): string {
  if (!name) {
    return "unknown";
  }

  const n = name.toLowerCase();

  if (n.includes("england")) {
    return "england";
  }

  if (n.includes("france")) {
    return "france";
  }

  if (n.includes("italy")) {
    return "italy";
  }

  if (n.includes("scotland")) {
    return "scotland";
  }

  if (n.includes("wales")) {
    return "wales";
  }

  if (n.includes("ireland")) {
    return "ireland";
  }

  if (
    n.includes("south africa")
  ) {
    return "south-africa";
  }

  if (
    n.includes("new zealand")
  ) {
    return "new-zealand";
  }

  if (
    n.includes("australia")
  ) {
    return "australia";
  }

  if (
    n.includes("argentina")
  ) {
    return "argentina";
  }

  if (n.includes("japan")) {
    return "japan";
  }

  if (
    n.includes("usa") ||
    n.includes(
      "united states"
    )
  ) {
    return "united-states-of-america";
  }

  return normalizeCountry(name);
}

/* ==================================================
   API STATUS → INTERNAL STATE
   ================================================== */

function resolveMatchState(
  status?: string
): MatchData["state"] {
  if (!status) {
    return "upcoming";
  }

  const normalized =
    status.toUpperCase();

  /* ==========================================
     FINAL
     ========================================== */

  if (
    [
      "FT",
      "AET",
      "FT_PEN",
      "PEN",
    ].includes(normalized)
  ) {
    return "final";
  }

  /* ==========================================
     LIVE
     ========================================== */

  if (
    [
      "1H",
      "HT",
      "2H",
      "ET",
      "BT",
      "LIVE",
    ].includes(normalized)
  ) {
    return "live";
  }

  /* ==========================================
     POSTPONED
     ========================================== */

  if (
    [
      "PST",
      "SUSP",
      "INT",
      "ABD",
      "CANC",
    ].includes(normalized)
  ) {
    return "upcoming";
  }

  /* ==========================================
     NOT STARTED
     ========================================== */

  if (
    [
      "NS",
      "TBD",
    ].includes(normalized)
  ) {
    return "upcoming";
  }

  return "upcoming";
}

/* ==================================================
   CONVERTER
   ================================================== */

export function convertApiSportsFixture(
  fixture: any
): MatchData | null {
  const home =
    fixture.teams?.home;

  const away =
    fixture.teams?.away;

  const homeScore =
    fixture.scores?.home
      ?.total ??
    fixture.scores?.home ??
    null;

  const awayScore =
    fixture.scores?.away
      ?.total ??
    fixture.scores?.away ??
    null;

  const leagueId =
    fixture.league?.id;

  const competitionId =
    API_TO_CONCEPT_MAP[
      leagueId
    ];

  if (!competitionId) {
    console.warn(
      "UNKNOWN API LEAGUE:",
      leagueId
    );

    return null;
  }

  const status =
    fixture.fixture?.status
      ?.short;

  const state =
    resolveMatchState(
      status
    );

  const normalizedDate =
    normalizeDate(
      fixture.fixture?.date
    ) || "unknown";

  return {
    id:
      Number(
        fixture.fixture?.id
      ) ||
      Date.now() +
        Math.random(),

    matchKey: [
      competitionId,
      normalizedDate,
      normalizeKey(
        home?.name
      ),
      normalizeKey(
        away?.name
      ),
    ].join("_"),

    competitionId,

    tournament:
      fixture.league?.name ??
      "Unknown",

    stage:
      fixture.fixture?.stage ||
      fixture.fixture?.round ||
      fixture.league?.round ||
      "",

    date:
      fixture.fixture?.date ??
      "",

    venue:
      fixture.fixture?.venue
        ?.name || "",

    home: {
      name:
        home?.name ??
        "Unknown",

      country:
        mapCountry(
          home?.name
        ),
    },

    away: {
      name:
        away?.name ??
        "Unknown",

      country:
        mapCountry(
          away?.name
        ),
    },

    score:
      homeScore != null &&
      awayScore != null
        ? {
            home: homeScore,
            away: awayScore,
          }
        : undefined,

    state,

    importance: 50,
  };
}

/* ==================================================
   BATCH
   ================================================== */

export function convertApiSportsFixtures(
  fixtures: any[]
): MatchData[] {
  return fixtures
    .map(
      convertApiSportsFixture
    )
    .filter(
      (
        m
      ): m is MatchData =>
        m !== null
    );
}