/* ==================================================
   MATCH DETAILS 2026 — FALLBACK DATASET
   Used when stats API is unavailable
   ================================================== */

export type Player = {
  number: number;
  name: string;
  position?: string;
};

export type TimelineEvent = {
  minute: string;
  label: string;
};

export type MatchStats = {
  matchId: number;

  timeline: TimelineEvent[];

  lineups: {
    homeStarting: Player[];
    homeBench: Player[];
    awayStarting: Player[];
    awayBench: Player[];
  };
};

export const matchDetails2026: MatchStats[] = [
  {
    matchId: 101,

    timeline: [
      { minute: "12'", label: "TRY — Dupont" },
      { minute: "21'", label: "Penalty — Sexton" },
      { minute: "39'", label: "TRY — Penaud" },
      { minute: "62'", label: "TRY — Ringrose" },
      { minute: "74'", label: "Penalty — Ramos" }
    ],

    lineups: {
      homeStarting: [
        { number: 1, name: "Baille", position: "Prop" },
        { number: 2, name: "Marchand", position: "Hooker" },
        { number: 3, name: "Atonio", position: "Prop" },
        { number: 4, name: "Flament", position: "Lock" },
        { number: 5, name: "Woki", position: "Lock" },
        { number: 6, name: "Cros", position: "Flanker" },
        { number: 7, name: "Ollivon", position: "Flanker" },
        { number: 8, name: "Alldritt", position: "No.8" },
        { number: 9, name: "Dupont", position: "Scrum-half" },
        { number: 10, name: "Ramos", position: "Fly-half" },
        { number: 11, name: "Penaud", position: "Wing" },
        { number: 12, name: "Danty", position: "Centre" },
        { number: 13, name: "Fickou", position: "Centre" },
        { number: 14, name: "Villière", position: "Wing" },
        { number: 15, name: "Jaminet", position: "Fullback" }
      ],

      homeBench: [
        { number: 16, name: "Mauvaka" },
        { number: 17, name: "Gros" },
        { number: 18, name: "Falatea" },
        { number: 19, name: "Taofifenua" },
        { number: 20, name: "Jelonch" },
        { number: 21, name: "Lucu" },
        { number: 22, name: "Moefana" },
        { number: 23, name: "Bielle-Biarrey" }
      ],

      awayStarting: [
        { number: 1, name: "Porter", position: "Prop" },
        { number: 2, name: "Sheehan", position: "Hooker" },
        { number: 3, name: "Furlong", position: "Prop" },
        { number: 4, name: "Beirne", position: "Lock" },
        { number: 5, name: "Ryan", position: "Lock" },
        { number: 6, name: "O'Mahony", position: "Flanker" },
        { number: 7, name: "Van der Flier", position: "Flanker" },
        { number: 8, name: "Doris", position: "No.8" },
        { number: 9, name: "Gibson-Park", position: "Scrum-half" },
        { number: 10, name: "Sexton", position: "Fly-half" },
        { number: 11, name: "Lowe", position: "Wing" },
        { number: 12, name: "Aki", position: "Centre" },
        { number: 13, name: "Ringrose", position: "Centre" },
        { number: 14, name: "Hansen", position: "Wing" },
        { number: 15, name: "Keenan", position: "Fullback" }
      ],

      awayBench: [
        { number: 16, name: "Kelleher" },
        { number: 17, name: "Healy" },
        { number: 18, name: "Bealham" },
        { number: 19, name: "Henderson" },
        { number: 20, name: "Conan" },
        { number: 21, name: "Casey" },
        { number: 22, name: "Crowley" },
        { number: 23, name: "Henshaw" }
      ]
    }
  }
];