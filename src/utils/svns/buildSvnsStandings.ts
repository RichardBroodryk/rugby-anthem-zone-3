import type { MatchData } from "../../data/matches/types";

import { buildStandings } from "../standings/standingsEngine";

export function buildSvnsStandings(
  matches: MatchData[]
) {
  return buildStandings(
    matches
  );
}