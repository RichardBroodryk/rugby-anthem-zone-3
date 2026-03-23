// src/data/domesticLeagues.ts

import urcImg from "../assets/images/domestic/urc-rugby.jpg";
import epcrImg from "../assets/images/domestic/epcr-challengecup.jpg";
import investecImg from "../assets/images/domestic/investec-cup.jpg";
import superImg from "../assets/images/domestic/super-rugby.jpg";
import premiershipImg from "../assets/images/domestic/premier-league.jpg";
import top14Img from "../assets/images/domestic/top-fourteen-france.jpg";
import japanImg from "../assets/images/domestic/japan-league.jpg";

export type DomesticLeague = {
  id: string;
  name: string;
  logo: string;
  season: string;
};

export const domesticLeagues: DomesticLeague[] = [
  {
    id: "urc",
    name: "United Rugby Championship",
    logo: urcImg,
    season: "2025–2026",
  },
  {
    id: "epcr",
    name: "EPCR Challenge Cup",
    logo: epcrImg,
    season: "2025–2026",
  },
  {
    id: "investec",
    name: "Investec Champions Cup",
    logo: investecImg,
    season: "2025–2026",
  },
  {
    id: "super",
    name: "Super Rugby Pacific",
    logo: superImg,
    season: "2025–2026",
  },
  {
    id: "premiership",
    name: "Gallagher Premiership",
    logo: premiershipImg,
    season: "2025–2026",
  },
  {
    id: "top14",
    name: "Top 14",
    logo: top14Img,
    season: "2025–2026",
  },
  {
    id: "japan",
    name: "Japan Rugby League One",
    logo: japanImg,
    season: "2025–2026",
  },
];