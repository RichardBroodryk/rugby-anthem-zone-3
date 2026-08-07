// src/data/womenDomesticLeagues.ts

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
    logo: "/logos/premier-15s.png",
    country: "England",
    teams: 10,
  },
  {
    id: "super-rugby-women",
    name: "Super Rugby Women",
    logo: "/logos/super-rugby-women.png",
    country: "Australia/New Zealand",
    teams: 6,
  },
  {
    id: "super-rugby-aupiki",
    name: "Super Rugby Aupiki",
    logo: "/logos/super-rugby-aupiki.png",
    country: "New Zealand",
    teams: 4,
  },
  {
    id: "elite-1-women",
    name: "Elite 1 Women",
    logo: "/logos/elite-1-women.png",
    country: "France",
    teams: 8,
  },
];