// ==================================================
// CALENDAR RESOLVER — IDENTITY LOCKED (FULL FIXED)
// ==================================================

import { getMatches } from "../../data/matchesAdapter";
import { CalendarMatch } from "./calendarTypes";

import { tournaments2026 } from "../../data/tournamentMeta";
import { stadiums } from "../../data/stadiums";

/* ================= TYPES ================= */

type ResolveOptions = {
  leagueId?: string;
};

/* ================= NORMALIZATION MAP ================= */
/**
 * 🔒 CRITICAL: Maps inconsistent match instance IDs
 * to canonical tournamentMeta instanceIds
 *
 * DOES NOT affect other systems — resolver only
 */
const TOURNAMENT_INSTANCE_MAP: Record<string, string> = {
  // MEN FIXES
  "summer-internationals-2026": "international-tests-2026",
  "test-matches": "international-tests-2026",

  // SAFETY
  "six-nations": "six-nations-2026",
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
    /**
     * 🔥 CRITICAL FIX:
     * Force FULL dataset (bypass adapter competition filtering)
     */
    const matches = await getMatches({
      includeAll: true,
    });

    /**
     * 🔥 SAFETY:
     * De-duplicate matches by ID (protect against merge overlaps)
     */
    const uniqueMatchesMap = new Map<number, any>();
    matches.forEach((m) => {
      if (!uniqueMatchesMap.has(m.id)) {
        uniqueMatchesMap.set(m.id, m);
      }
    });

    const uniqueMatches = Array.from(uniqueMatchesMap.values());

    return uniqueMatches.map((m) => {
      /* ================= DATE ================= */

      // ✅ HARD GUARANTEE — no nulls, no type break
const dateObj = new Date(m.date);

// Optional safety (won’t break types)
if (isNaN(dateObj.getTime())) {
  console.warn("Invalid date detected in match:", m);
}

      /* ================= TOURNAMENT ================= */

      const rawInstanceId =
        (m as { tournamentInstanceId?: string })
          .tournamentInstanceId;

      const normalizedInstanceId =
        TOURNAMENT_INSTANCE_MAP[rawInstanceId || ""] ||
        rawInstanceId;

      const tournamentMeta = getTournamentMeta(
        normalizedInstanceId
      );

      /**
       * 🔥 CRITICAL FIX:
       * Never allow "unknown"
       * Always fallback safely
       */
      const tournamentId =
        tournamentMeta?.instanceId ||
        normalizedInstanceId ||
        m.competitionId ||
        `fallback-${m.id}`;

      const tournamentName =
        tournamentMeta?.name
          ? `${tournamentMeta.name} ${tournamentMeta.year}`
          : m.tournament ||
            m.competitionId ||
            "Unknown Tournament";

      /* ================= GENDER ================= */

      const inferredGender =
        (m as any).gender ||
        (tournamentMeta?.gender === "mixed"
          ? undefined
          : tournamentMeta?.gender) ||
        (m.tournament?.toLowerCase().includes("women")
          ? "women"
          : "men");

      const gender = inferredGender || "men";

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

      /* ================= TEAM CLEANUP ================= */

      const homeName =
        m.home.name === "TBD" ? "TBC" : m.home.name;

      const awayName =
        m.away.name === "TBD" ? "TBC" : m.away.name;

      /* ================= STATUS ================= */

      const status =
        (m as any).state ||
        (m.score ? "final" : "upcoming");

      /* ================= RETURN ================= */

      return {
        id: m.id,

        date: dateObj,
        isoDate: m.date,

        tournamentId,
        tournamentName,
        gender,

        home: {
          name: homeName,
          country: m.home.country,
        },

        away: {
          name: awayName,
          country: m.away.country,
        },

        stadiumSlug,
        stadiumName,
        city,
        country,

        status,
        score: m.score,

        importance: (m as any).importance,
        isFeatured:
          status === "live" ||
          ((m as any).importance ?? 0) >= 80,
      };
    });
  } catch {
    return [];
  }
}