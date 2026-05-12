const fs = require("fs");

const API_KEY = "98844306cf41e6b4f567f722527415a2";
const BASE = "https://v1.rugby.api-sports.io";

/* ================================================== */

async function fetchGames(leagueId) {
  // --- TRY 2026 FIRST ---
  let res = await fetch(
    `${BASE}/games?league=${leagueId}&season=2026`,
    {
      headers: {
        "x-apisports-key": API_KEY,
      },
    }
  );

  let json = await res.json();
  let games = json.response || [];

  if (games.length > 0) {
    console.log("✅ 2026 data found");
    return games;
  }

  // --- FALLBACK TO 2025 ---
  console.log("⚠️ 2026 empty → trying 2025");

  res = await fetch(
    `${BASE}/games?league=${leagueId}&season=2025`,
    {
      headers: {
        "x-apisports-key": API_KEY,
      },
    }
  );

  json = await res.json();

  return json.response || [];
}

/* ================================================== */

function buildStandings(games) {
  const table = {};

  games.forEach((g) => {
    if (!g.scores) return;

    const home = g.teams.home.name;
    const away = g.teams.away.name;

    const hs = g.scores.home;
    const as = g.scores.away;

    if (hs == null || as == null) return;

    if (!table[home]) {
      table[home] = { team: home, played: 0, won: 0, drawn: 0, lost: 0, pf: 0, pa: 0, pts: 0 };
    }

    if (!table[away]) {
      table[away] = { team: away, played: 0, won: 0, drawn: 0, lost: 0, pf: 0, pa: 0, pts: 0 };
    }

    table[home].played++;
    table[away].played++;

    table[home].pf += hs;
    table[home].pa += as;

    table[away].pf += as;
    table[away].pa += hs;

    if (hs > as) {
      table[home].won++;
      table[away].lost++;
      table[home].pts += 4;
    } else if (as > hs) {
      table[away].won++;
      table[home].lost++;
      table[away].pts += 4;
    } else {
      table[home].drawn++;
      table[away].drawn++;
      table[home].pts += 2;
      table[away].pts += 2;
    }
  });

  return Object.values(table)
    .map((t) => ({
      ...t,
      pd: t.pf - t.pa,
    }))
    .sort((a, b) => b.pts - a.pts);
}

/* ================================================== */

const LEAGUES = {
  "urc-men": 76,
  "premiership-men": 10,
  "top14-men": 16,
  "japan-men": 27,
  "super-men": 71,
};

/* ================================================== */

async function run() {
  const output = {};

  for (const key in LEAGUES) {
    const leagueId = LEAGUES[key];

    console.log(`Fetching games for ${key}...`);

    const games = await fetchGames(leagueId);

    if (!games || games.length === 0) {
      console.warn(`⚠️ No games for ${key}`);
      continue;
    }

    const standings = buildStandings(games);

    output[key] = standings;

    console.log(`✅ ${key} computed (${standings.length} teams)`);
  }

  fs.writeFileSync(
    "src/data/standings/liveStandings.ts",
    `export const liveStandings = ${JSON.stringify(output, null, 2)};`
  );

  console.log("🔥 LIVE STANDINGS GENERATED");
}

run();