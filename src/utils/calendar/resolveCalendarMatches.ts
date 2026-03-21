import { matches2026 } from "../../data/matches2026";
import { tournaments2026 } from "../../data/tournamentMeta";
import { stadiums } from "../../data/stadiums";
import { CalendarMatch } from "./calendarTypes";

type CalendarStatus = "upcoming" | "live" | "final";

function resolveStatus(
  date: Date,
  hasScore: boolean
): CalendarStatus {
  if (hasScore) return "final";
  if (date.getTime() < Date.now()) return "live";
  return "upcoming";
}

function normalize(value: string) {
  return value.toLowerCase().trim();
}

/* 🔥 UPDATED SIGNATURE */
export function resolveCalendarMatches(
  inputMatches = matches2026
): CalendarMatch[] {
  const resolved: CalendarMatch[] = [];

  for (const match of inputMatches) {
    try {
      const tournament = tournaments2026.find(
        (t) =>
          normalize(t.matchKey) ===
          normalize(match.tournament)
      );

      if (!tournament) {
        console.warn(
          `[Calendar] Skipped match ${match.id}: unknown tournament "${match.tournament}"`
        );
        continue;
      }

      const stadium = stadiums.find(
        (s) =>
          normalize(s.slug) === normalize(match.venue) ||
          normalize(s.name) === normalize(match.venue)
      );

      const dateObj = new Date(match.date);
      if (isNaN(dateObj.getTime())) {
        console.warn(
          `[Calendar] Skipped match ${match.id}: invalid date "${match.date}"`
        );
        continue;
      }

      resolved.push({
        id: match.id,
        date: dateObj,
        isoDate: match.date,

        tournamentId: tournament.instanceId,
        tournamentName: tournament.name,
        gender: tournament.gender,

        home: match.home,
        away: match.away,

        stadiumSlug: stadium?.slug ?? "unknown",
        stadiumName: stadium?.name ?? match.venue,
        city: stadium?.city,
        country: stadium?.country,

        status: resolveStatus(
          dateObj,
          Boolean(match.score)
        ),

        score: match.score,
      });
    } catch (err) {
      console.error(
        `[Calendar] Unexpected resolver error for match ${match.id}`,
        err
      );
    }
  }

  return resolved.sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
}