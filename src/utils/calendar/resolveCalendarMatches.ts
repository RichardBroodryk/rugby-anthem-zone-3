// ==================================================
// CALENDAR RESOLVER — IDENTITY LOCKED (FINAL)
// ==================================================

import { getMatches } from "../../data/matchesAdapter";
import { CalendarMatch } from "./calendarTypes";

import { tournaments2026 } from "../../data/tournamentMeta";
import { stadiums } from "../../data/stadiums";

/* ================= TYPES ================= */

type ResolveOptions = {
  leagueId?: string;
};

/* ================= HELPERS ================= */

function getTournamentMeta(instanceId?: string) {
  if (!instanceId) return undefined;

  return tournaments2026.find(
    (t) => t.instanceId === instanceId
  );
}

function getStadiumMeta(venue: string) {
  return stadiums.find((s) => s.name === venue);
}

/* ================= RESOLVER ================= */

export async function resolveCalendarMatches(
  options?: ResolveOptions
): Promise<CalendarMatch[]> {
  try {
    const matches = await getMatches({
      type: "international",
      leagueId: options?.leagueId,
    });

    return matches.map((m) => {
      const dateObj = new Date(m.date);

      /* ================= TOURNAMENT ================= */

      const tournamentMeta = getTournamentMeta(
        (m as { tournamentInstanceId?: string })
          .tournamentInstanceId
      );

      const tournamentId =
        tournamentMeta?.instanceId ||
        (m as any).tournamentInstanceId ||
        "unknown";

      const tournamentName =
        tournamentMeta?.name
          ? `${tournamentMeta.name} ${tournamentMeta.year}`
          : m.tournament;

      const gender =
  tournamentMeta?.gender === "mixed"
    ? (
        (m as any).gender ||
        (m.tournament.toLowerCase().includes("women")
          ? "women"
          : "men")
      )
    : (
        tournamentMeta?.gender ||
        (m.tournament.toLowerCase().includes("women")
          ? "women"
          : "men")
      );

      /* ================= STADIUM ================= */

      const stadiumMeta = getStadiumMeta(m.venue);

      const stadiumSlug =
        stadiumMeta?.slug ||
        m.venue
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const stadiumName = stadiumMeta?.name || m.venue;

      const city = stadiumMeta?.city;
      const country = stadiumMeta?.country;

      /* ================= RETURN ================= */

      return {
        id: m.id,

        date: dateObj,
        isoDate: m.date,

        tournamentId,
        tournamentName,
        gender,

        home: {
          name: m.home.name,
          country: m.home.country,
        },

        away: {
          name: m.away.name,
          country: m.away.country,
        },

        stadiumSlug,
        stadiumName,
        city,
        country,

        /* 🔒 STATE (FROM ADAPTER — SINGLE SOURCE) */
        status: (m as any).state || "upcoming",

        score: m.score,

        /* 🔥 OPTIONAL INTELLIGENCE (SAFE) */
        importance: (m as any).importance,
        isFeatured:
          (m as any).state === "live" ||
          ((m as any).importance ?? 0) >= 80,
      };
    });
  } catch {
    return [];
  }
}