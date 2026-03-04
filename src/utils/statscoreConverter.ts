// --------------------------------------------------
// Statscore → RAZ MatchData Converter
// --------------------------------------------------

import { MatchData } from "../data/matches2026";

/**
 * Convert a Statscore event object into the
 * RAZ canonical MatchData structure
 */
export function convertStatscoreEvent(event: any): MatchData {
  const home = event.participants?.[0];
  const away = event.participants?.[1];

  const homeScore = event.home_score;
  const awayScore = event.away_score;

  return {
    id: event.id,

    tournament:
      event.competition?.name ??
      event.tournament?.name ??
      "Six Nations",

    date:
      event.start_date ??
      event.date ??
      "",

    venue:
      event.venue?.name ??
      "TBC",

    home: {
      name: home?.name ?? "Unknown",
      country: (home?.name ?? "").toLowerCase(),
    },

    away: {
      name: away?.name ?? "Unknown",
      country: (away?.name ?? "").toLowerCase(),
    },

    score:
      homeScore != null && awayScore != null
        ? {
            home: homeScore,
            away: awayScore,
          }
        : undefined,
  };
}

/**
 * Convert multiple Statscore events
 * into an array of MatchData
 */
export function convertStatscoreEvents(events: any[]): MatchData[] {
  return events.map(convertStatscoreEvent);
}