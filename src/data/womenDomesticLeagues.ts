// src/data/womenDomesticLeagues.ts

import premier15Img from "../assets/images/domestic/premier-15.jpg";
import superRugbyWomenImg from "../assets/images/domestic/super-rugby-women.jpg";
import superAupikiImg from "../assets/images/domestic/super-aupiki.jpg";
import eliteWomenImg from "../assets/images/domestic/elite-women.jpg";

export interface DomesticLeague {
  id: string;
  name: string;
  logo: string;
  country?: string;
  season?: string;
  teams?: number;
}

export const womenDomesticLeagues: DomesticLeague[] = [
  {
    id: "premier-15s",
    name: "Premier 15s",
    logo: premier15Img,
    country: "England",
    teams: 10,
  },
  {
    id: "super-rugby-women",
    name: "Super Rugby Women",
    logo: superRugbyWomenImg,
    country: "Australia/New Zealand",
    teams: 6,
  },
  {
    id: "aupiki",
    name: "Super Rugby Aupiki",
    logo: superAupikiImg,
    country: "New Zealand",
    teams: 4,
  },
  {
    id: "elite-1-women",
    name: "Elite 1 Women",
    logo: eliteWomenImg,
    country: "France",
    teams: 8,
  },
];