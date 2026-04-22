import { stadiums } from "../data/stadiums";

function normalize(input: string) {
  return input.toLowerCase().trim();
}

/* ================= ALIAS RESOLVER ================= */

function resolveAlias(stadium: any) {
  if (stadium?.aliasOf) {
    const base = stadiums.find(
      (s) => s.slug === stadium.aliasOf
    );
    return base || stadium;
  }
  return stadium;
}

/* ================= MAIN ================= */

export function getStadiumByName(name?: string) {
  if (!name) return null;

  const n = normalize(name);

  /* ================= 1. EXACT NAME ================= */

  const exact = stadiums.find(
    (s) => normalize(s.name) === n
  );
  if (exact) return resolveAlias(exact);

  /* ================= 2. CITY MATCH ================= */

  const byCity = stadiums.find(
    (s) => normalize(s.city || "") === n
  );
  if (byCity) return resolveAlias(byCity);

  /* ================= 3. CONTROLLED MAP ================= */

  const map: Record<string, string> = {
    paris: "stade-de-france",
    london: "twickenham", // 🔥 ensures Allianz resolves correctly via alias
    cardiff: "principality-stadium",
    rome: "stadio-olimpico",
    dublin: "aviva-stadium",
    edinburgh: "murrayfield",
    grenoble: "stade-des-alpes",

    // 🔥 NEW SAFE MAPPINGS
    galway: "dexcom",
    "allianz stadium": "twickenham", // 🔥 CRITICAL FIX
  };

  const slug = map[n];
  if (slug) {
    const mapped = stadiums.find((s) => s.slug === slug);
    if (mapped) return resolveAlias(mapped);
  }

  return null;
}