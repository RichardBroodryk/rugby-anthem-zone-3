import bullsLogo from "../assets/images/rivalry/bulls.jpg";
import lionsLogo from "../assets/images/rivalry/lions.jpg";
import sharksLogo from "../assets/images/rivalry/sharks.jpg";
import stormersLogo from "../assets/images/rivalry/stormers.jpg";

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

const TEAM_IMAGES: Record<string, string> = {
  // ==================================================
  // SOUTH AFRICAN FRANCHISES
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
  spain:spainFlag,
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
};

export function getTeamImage(teamName: string): string {
  const key = teamName.trim().toLowerCase();

  return TEAM_IMAGES[key] ?? "";
}