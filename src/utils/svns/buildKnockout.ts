import type { MatchData } from "../../data/matches/types";

import { getPoolQualifiers } from "./getPoolQualifiers";

import { buildSvnsQuarterFinals } from "./buildSvnsQuarterFinals";

import {
  buildSvnsSemiFinals,
  buildSvnsBronzeFinal,
  buildSvnsFinal,
  buildSvnsFifthPlaceFinal,
  buildSvnsSeventhPlaceFinal,
} from "./buildSemiFinals";

/* ==================================================
   BUILD FULL SVNS KNOCKOUT
   ================================================== */

export function buildKnockout(
  matches: MatchData[]
) {
  const qualifiers =
    getPoolQualifiers(
      matches
    );

  const quarterFinals =
    buildSvnsQuarterFinals(
      qualifiers.winners,
      qualifiers.runnersUp,
      qualifiers.thirdPlace
    );

  const semiFinals =
    buildSvnsSemiFinals(
      quarterFinals
    );

  const bronzeFinal =
    buildSvnsBronzeFinal(
      semiFinals
    );

  const grandFinal =
    buildSvnsFinal(
      semiFinals
    );

  const fifthPlaceFinal =
    buildSvnsFifthPlaceFinal();

  const seventhPlaceFinal =
    buildSvnsSeventhPlaceFinal();

  return {
    quarterFinals,

    semiFinals,

    bronzeFinal,

    grandFinal,

    fifthPlaceFinal,

    seventhPlaceFinal,
  };
}