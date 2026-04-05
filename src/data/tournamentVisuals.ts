/* ==================================================
   TOURNAMENT VISUALS — AUTHORITATIVE (ABSOLUTE FINAL)
   ================================================== */

import sixNationsMen from "../assets/images/tournaments/six-nations-men-2026.jpg";
import sixNationsWomen from "../assets/images/tournaments/six-nations-women-2026.jpg";

import nationsChampionship from "../assets/images/tournaments/nations-championship-2026.jpg";

import pacificMen from "../assets/images/tournaments/pacific-men.jpg";
import pacificFour from "../assets/images/tournaments/pacific-four.jpg";

import bledisloe from "../assets/images/tournaments/bledisloe.jpg";

import svns from "../assets/images/tournaments/svns-2026.jpg";
import greatestRivalry from "../assets/images/tournaments/greatest-rivalry-2026.jpg";

import internationalTestsMen from "../assets/images/tournaments/international-tests-men-hero.jpg";
import internationalTestsWomen from "../assets/images/tournaments/international-tests-women-hero.jpg";

/* 🔥 ADD WXV (YOU CALLED THIS OUT) */
import wxvHero from "../assets/images/tournaments/nations-championship-2026.jpg";

import fallbackHero from "../assets/images/tournaments/default-tournament.jpg";

/* ================= TYPES ================= */

export type HeroLayout =
  | "default"
  | "contained"
  | "top";

export type AnthemMode =
  | "standard"
  | "global"
  | "six-nations"
  | "rivalry";

export interface TournamentVisual {
  conceptId: string;

  heroImageMen?: string;
  heroImageWomen?: string;
  heroLayout?: HeroLayout;

  logo?: string;

  anthemMode?: AnthemMode;
}

/* ==================================================
   VISUAL MAP — COMPLETE
   ================================================== */

export const tournamentVisuals: TournamentVisual[] = [

  // ================= SIX NATIONS =================
  {
    conceptId: "six-nations",
    heroImageMen: sixNationsMen,
    heroImageWomen: sixNationsWomen, // ✅ EXPLICIT
    logo: sixNationsMen,
    anthemMode: "six-nations",
  },

  // ================= WOMEN SIX NATIONS (FIX) =================
{
  conceptId: "six-nations-women",
  heroImageWomen: sixNationsWomen,
  logo: sixNationsWomen,
  anthemMode: "six-nations",
},

  // ================= NATIONS CHAMPIONSHIP =================
  {
    conceptId: "nations-championship",
    heroImageMen: nationsChampionship,
    heroImageWomen: nationsChampionship,
    logo: nationsChampionship,
    heroLayout: "contained",
    anthemMode: "global",
  },

  // ================= PACIFIC (MEN) =================
  {
    conceptId: "pacific-nations",
    heroImageMen: pacificMen,
    logo: pacificMen,
    heroLayout: "contained",
    anthemMode: "global",
  },

  // ================= PACIFIC FOUR (WOMEN) =================
  {
    conceptId: "pacific-four",
    heroImageWomen: pacificFour,
    logo: pacificFour,
    heroLayout: "contained",
    anthemMode: "global",
  },

  // ================= BLEDISLOE =================
  {
    conceptId: "bledisloe-cup",
    heroImageMen: bledisloe,
    logo: bledisloe,
    heroLayout: "contained",
    anthemMode: "rivalry",
  },

  // ================= SVNS =================
  {
    conceptId: "svns-series",
    heroImageMen: svns,
    heroImageWomen: svns,
    logo: svns,
    heroLayout: "contained",
    anthemMode: "global",
  },

  // ================= RIVALRY TOUR =================
  {
    conceptId: "sa-nz-rival-tour",
    heroImageMen: greatestRivalry,
    heroImageWomen: greatestRivalry,
    logo: greatestRivalry,
    heroLayout: "contained",
    anthemMode: "rivalry",
  },

  // ================= INTERNATIONAL TESTS =================
  {
    conceptId: "international-tests",
    heroImageMen: internationalTestsMen,
    heroImageWomen: internationalTestsWomen,
    heroLayout: "contained",
    anthemMode: "global",
  },

  // ================= WOMEN TESTS (EXPLICIT) =================
  {
    conceptId: "womens-tests",
    heroImageWomen: internationalTestsWomen,
    logo: internationalTestsWomen,
    heroLayout: "contained",
    anthemMode: "global",
  },

  // ================= WXV (FIXED — YOU CALLED THIS OUT) =================
  {
    conceptId: "wxv1",
    heroImageWomen: wxvHero, // ✅ YOUR INSTRUCTION (reuse nations image)
    logo: wxvHero,
    heroLayout: "contained",
    anthemMode: "global",
  },
];

/* ==================================================
   RESOLVER
   ================================================== */

export function getTournamentVisual(conceptId: string): TournamentVisual {
  const visual = tournamentVisuals.find(
    (v) => v.conceptId === conceptId
  );

  if (visual) return visual;

  return {
    conceptId: "fallback",
    heroImageMen: fallbackHero,
    heroImageWomen: fallbackHero,
    logo: fallbackHero,
    heroLayout: "default",
    anthemMode: "standard",
  };
}