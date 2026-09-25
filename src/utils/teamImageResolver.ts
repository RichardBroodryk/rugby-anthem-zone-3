import bullsLogo from "../assets/images/rivalry/bulls.jpg";

import lionsLogo from "../assets/images/rivalry/lions.jpg";

import sharksLogo from "../assets/images/rivalry/sharks.jpg";

import stormersLogo from "../assets/images/rivalry/stormers.jpg";

import splashLogo from "../assets/images/raz/splashlogo.png";

import argentinaFlag from "../assets/images/flags/argentina.jpg";

import australiaFlag from "../assets/images/flags/australia.jpg";

import englandFlag from "../assets/images/flags/england.png";

import fijiFlag from "../assets/images/flags/fiji.jpg";

import franceFlag from "../assets/images/flags/france.jpg";

import irelandFlag from "../assets/images/flags/ireland.jpg";

import italyFlag from "../assets/images/flags/italy.jpg";

import japanFlag from "../assets/images/flags/japan.jpg";

import nzFlag from "../assets/images/flags/new-zealand.jpg";

import portugalFlag from "../assets/images/flags/portugal.jpg";

import romaniaFlag from "../assets/images/flags/romania.jpg";

import samoaFlag from "../assets/images/flags/samoa.jpg";

import scotlandFlag from "../assets/images/flags/scotland.jpg";

import southAfricaFlag from "../assets/images/flags/south-africa.jpg";

import spainFlag from "../assets/images/flags/spain.jpg";

import tongaFlag from "../assets/images/flags/tonga.jpg";

import usaFlag from "../assets/images/flags/united-states-of-america.jpg";

import uruguayFlag from "../assets/images/flags/uruguay.jpg";

import walesFlag from "../assets/images/flags/wales.jpg";

import zimbabweFlag from "../assets/images/flags/zimbabwe.jpg";

import chileFlag from "../assets/images/flags/chile.jpg";

import canadaFlag from "../assets/images/flags/canada.jpg";

import georgiaFlag from "../assets/images/flags/georgia.jpg";

import hongKongFlag from "../assets/images/flags/hong-kong-china.jpg";

import polandFlag from "../assets/images/flags/poland.jpg";

import czechRepublicFlag from "../assets/images/flags/czech-republic.jpg";

/* ==================================================
   URC — MEN 2026/27
   ================================================== */

import urcBenetton from "../assets/images/teams/men/urc/benetton.jpg";

import urcBulls from "../assets/images/teams/men/urc/bulls.jpg";

import urcCardiff from "../assets/images/teams/men/urc/cardiff.jpg";

import urcConnacht from "../assets/images/teams/men/urc/connacht.jpg";

import urcDragons from "../assets/images/teams/men/urc/dragons.jpg";

import urcEdinburgh from "../assets/images/teams/men/urc/edinburgh.jpg";

import urcGlasgowWarriors from "../assets/images/teams/men/urc/glasgow-warriors.jpg";

import urcLeinster from "../assets/images/teams/men/urc/leinster.jpg";

import urcLions from "../assets/images/teams/men/urc/lions.jpg";

import urcMunster from "../assets/images/teams/men/urc/munster.jpg";

import urcOspreys from "../assets/images/teams/men/urc/ospreys.jpg";

import urcScarlets from "../assets/images/teams/men/urc/scarlets.jpg";

import urcSharks from "../assets/images/teams/men/urc/sharks.jpg";

import urcStormers from "../assets/images/teams/men/urc/stormers.jpg";

import urcUlster from "../assets/images/teams/men/urc/ulster.jpg";

import urcZebreParma from "../assets/images/teams/men/urc/zebre-parma.jpg";

/* ==================================================
   GENERAL TEAM IMAGE MAP
   ================================================== */

const TEAM_IMAGES: Record<string, string> = {
  // ==================================================
  // RAZ PLACEHOLDER
  // ==================================================

  tbd: splashLogo,

  unknown: splashLogo,

  // ==================================================
  // SOUTH AFRICAN FRANCHISES
  // Greatest Rivalry images preserved.
  // ==================================================

  stormers: stormersLogo,

  sharks: sharksLogo,

  bulls: bullsLogo,

  lions: lionsLogo,

  // ==================================================
  // INTERNATIONAL FLAGS
  // ==================================================

  "south africa": southAfricaFlag,

  "new zealand": nzFlag,

  australia: australiaFlag,

  argentina: argentinaFlag,

  japan: japanFlag,

  england: englandFlag,

  france: franceFlag,

  ireland: irelandFlag,

  italy: italyFlag,

  scotland: scotlandFlag,

  spain: spainFlag,

  wales: walesFlag,

  fiji: fijiFlag,

  samoa: samoaFlag,

  tonga: tongaFlag,

  portugal: portugalFlag,

  romania: romaniaFlag,

  uruguay: uruguayFlag,

  chile: chileFlag,

  georgia: georgiaFlag,

  canada: canadaFlag,

  zimbabwe: zimbabweFlag,

  "hong kong china": hongKongFlag,

  usa: usaFlag,

  "united states": usaFlag,

  polska: polandFlag,

  czechy: czechRepublicFlag,
};

/* ==================================================
   URC TEAM IMAGE MAP
   ================================================== */

const URC_TEAM_IMAGES: Record<string, string> = {
  benetton: urcBenetton,

  bulls: urcBulls,

  cardiff: urcCardiff,

  connacht: urcConnacht,

  dragons: urcDragons,

  edinburgh: urcEdinburgh,

  "glasgow warriors": urcGlasgowWarriors,

  leinster: urcLeinster,

  lions: urcLions,

  munster: urcMunster,

  ospreys: urcOspreys,

  scarlets: urcScarlets,

  sharks: urcSharks,

  stormers: urcStormers,

  ulster: urcUlster,

  "zebre parma": urcZebreParma,
};

/* ==================================================
   TEAM IMAGE RESOLVER
   ================================================== */

export function getTeamImage(
  teamName: string,
  competitionId?: string
): string {
  const key = teamName
    .trim()
    .toLowerCase()
    .replace(/\s+w$/, "");

  /* ==================================================
     URC
     ================================================== */

  if (competitionId === "urc") {
    return URC_TEAM_IMAGES[key] ?? splashLogo;
  }

  /* ==================================================
     EXISTING TEAM / INTERNATIONAL RESOLUTION
     ================================================== */

  return TEAM_IMAGES[key] ?? splashLogo;
}