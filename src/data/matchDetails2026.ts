/* ==================================================
   MATCH DETAILS 2026 — ROUND 1 + BENCH + PERFORMANCES
   ================================================== */

export type Player = {
  number: number;
  name: string;
};

export type TimelineEvent = {
  minute: string;
  label: string;
};

export type PerformanceStat = {
  category: string;
  player: string;
  value: string;
};

export type MatchTeamStats = {
  metresMade: number;
  carries: number;
  defendersBeaten: number;
  cleanBreaks: number;
  offloads: number;
  tacklesMade: number;
  tacklesMissed: number;
  turnoversWon: number;
  penaltiesConceded: number;
};

export type MatchStats = {
  home: MatchTeamStats;
  away: MatchTeamStats;
};

export type MatchDetails = {
  matchKey: string;
  highlightsUrl?: string;
  matchStats?: MatchStats;
  timeline?: TimelineEvent[];
  lineups?: {
    homeStarting: Player[];
    homeBench: Player[];
    awayStarting: Player[];
    awayBench: Player[];
  };
  performances?: PerformanceStat[];
};

export const matchDetails2026: MatchDetails[] = [
  {
    matchKey: "south-africa-vs-barbarians",

    timeline: [
      { minute: "0'", label: "Kick-off — Nelson Mandela Bay Stadium" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],

    performances: [
      {
        category: "Captain",
        player: "Siya Kolisi",
        value: "South Africa",
      },
      {
        category: "Captain",
        player: "TJ Perenara",
        value: "Barbarians",
      },
      {
        category: "Venue",
        player: "Nelson Mandela Bay Stadium",
        value: "Gqeberha",
      },
    ],
  },

    // ================= NATIONS CHAMPIONSHIP 2026 — ROUND 1 =================

  {
    matchKey: "south-africa-vs-england",
    timeline: [
      { minute: "0'", label: "Kick-off — Ellis Park, Johannesburg" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    
    performances: [
      {
        category: "Captain",
        player: "Siya Kolisi",
        value: "South Africa",
      },
      {
        category: "Captain",
        player: "Jamie George",
        value: "England",
      },
      {
        category: "Venue",
        player: "Ellis Park",
        value: "Johannesburg",
      },
    ],
  },

    {
    matchKey: "new-zealand-vs-france",
    timeline: [
      { minute: "0'", label: "Kick-off — One New Zealand Stadium, Christchurch" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
   
    performances: [
      {
        category: "Captain",
        player: "Ardie Savea",
        value: "New Zealand",
      },
      {
        category: "Captain",
        player: "Maxime Lucu",
        value: "France",
      },
      {
        category: "Venue",
        player: "One New Zealand Stadium",
        value: "Christchurch",
      },
    ],
  },

  {
    matchKey: "australia-vs-ireland",
    timeline: [
      { minute: "0'", label: "Kick-off — Allianz Stadium, Sydney" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
   
    performances: [
      {
        category: "Captain",
        player: "Harry Wilson",
        value: "Australia",
      },
      {
        category: "Captain",
        player: "Dan Sheehan",
        value: "Ireland",
      },
      {
        category: "Selection note",
        player: "Jock Campbell",
        value: "Returns at fullback",
      },
    ],
  },

    {
    matchKey: "japan-vs-italy",
    timeline: [
      { minute: "0'", label: "Kick-off — Chichibunomiya Rugby Stadium, Tokyo" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    
    performances: [
      {
        category: "Captain",
        player: "Warner Dearns",
        value: "Japan",
      },
      {
        category: "Captain",
        player: "Michele Lamaro",
        value: "Italy",
      },
      {
        category: "Venue",
        player: "Chichibunomiya Rugby Stadium",
        value: "Tokyo",
      },
    ],
  },

  {
    matchKey: "fiji-vs-wales",
    timeline: [
      { minute: "0'", label: "Kick-off — Cardiff City Stadium, Cardiff" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    
    performances: [
      {
        category: "Captain",
        player: "Tevita Ikanivere",
        value: "Fiji",
      },
      {
        category: "Captain",
        player: "Dewi Lake",
        value: "Wales",
      },
      {
        category: "Venue",
        player: "Cardiff City Stadium",
        value: "Cardiff",
      },
    ],
  },

    {
    matchKey: "argentina-vs-scotland",
    timeline: [
      { minute: "0'", label: "Kick-off — Estadio Mario Alberto Kempes, Cordoba" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    
    performances: [
      {
        category: "Captain",
        player: "Julian Montoya",
        value: "Argentina",
      },
      {
        category: "Captain",
        player: "Sione Tuipulotu",
        value: "Scotland",
      },
      {
        category: "Venue",
        player: "Estadio Mario Alberto Kempes",
        value: "Cordoba",
      },
    ],
  },

   // ================= NATIONS CHAMPIONSHIP 2026 — ROUND 2 =================

{
  matchKey: "new-zealand-vs-italy",
  timeline: [
    { minute: "0'", label: "Kick-off — Sky Stadium, Wellington" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  performances: [
    { category: "Captain", player: "Ardie Savea", value: "New Zealand" },
    { category: "Captain", player: "Michele Lamaro", value: "Italy" },
    { category: "Venue", player: "Sky Stadium", value: "Wellington" },
  ],
},
{
  matchKey: "australia-vs-france",
  timeline: [
    { minute: "0'", label: "Kick-off — Suncorp Stadium, Brisbane" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  performances: [
    { category: "Captain", player: "Harry Wilson", value: "Australia" },
    { category: "Captain", player: "Maxime Lucu", value: "France" },
    { category: "Venue", player: "Suncorp Stadium", value: "Brisbane" },
  ],
},
{
  matchKey: "japan-vs-ireland",
  timeline: [
    { minute: "0'", label: "Kick-off — McDonald Jones Stadium, Newcastle" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  performances: [
    { category: "Captain", player: "Warner Dearns", value: "Japan" },
    { category: "Captain", player: "Tadhg Beirne", value: "Ireland" },
    { category: "Venue", player: "McDonald Jones Stadium", value: "Newcastle" },
  ],
},
{
  matchKey: "fiji-vs-england",
  timeline: [
    { minute: "0'", label: "Kick-off — Hill Dickinson Stadium, Liverpool" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  performances: [
    { category: "Captain", player: "Tevita Ikanivere", value: "Fiji" },
    { category: "Captain", player: "Jamie George", value: "England" },
    { category: "Venue", player: "Hill Dickinson Stadium", value: "Liverpool" },
  ],
},
{
  matchKey: "south-africa-vs-scotland",
  timeline: [
    { minute: "0'", label: "Kick-off — Loftus Versfeld, Pretoria" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  performances: [
    { category: "Captain", player: "Pieter-Steph du Toit", value: "South Africa" },
    { category: "Captain", player: "Sione Tuipulotu", value: "Scotland" },
    { category: "Venue", player: "Loftus Versfeld", value: "Pretoria" },
  ],
},
{
  matchKey: "argentina-vs-wales",
  timeline: [
    { minute: "0'", label: "Kick-off — Estadio San Juan del Bicentenario, San Juan" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  performances: [
    { category: "Captain", player: "Julian Montoya", value: "Argentina" },
    { category: "Captain", player: "Dewi Lake", value: "Wales" },
    { category: "Venue", player: "Estadio San Juan del Bicentenario", value: "San Juan" },
  ],
},

// ================= WOMEN'S ROUND 2 =================

{
  matchKey: "south-africa-w-vs-usa-w",
  timeline: [
    { minute: "0'", label: "Kick-off — Loftus Versfeld, Pretoria" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  performances: [
    { category: "Captain", player: "Sizophila Solontsi", value: "South Africa W" },
    { category: "Captain", player: "Georgie Perris-Redding", value: "USA W" },
    { category: "Venue", player: "Loftus Versfeld", value: "Pretoria" },
  ],
},

// ================= WORLD RUGBY NATIONS CUP 2026 — ROUND 2 =================

{
  matchKey: "uruguay-vs-romania",
  timeline: [
    { minute: "0'", label: "Kick-off — Estadio Charrúa, Montevideo" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "Felipe Aliaga", value: "Uruguay" },
    { category: "Captain", player: "Cristi Boboc", value: "Romania" },
    { category: "Venue", player: "Estadio Charrúa", value: "Montevideo" },
  ],
},

{
  matchKey: "chile-vs-hong-kong-china",
  timeline: [
    { minute: "0'", label: "Kick-off — Estadio Sausalito, Viña del Mar" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "Martín Sigren", value: "Chile" },
    { category: "Captain", player: "Josh Hrstich", value: "Hong Kong China" },
    { category: "Venue", player: "Estadio Sausalito", value: "Viña del Mar" },
  ],
},
{
  matchKey: "canada-vs-portugal",
  timeline: [
    { minute: "0'", label: "Kick-off — Clarke Stadium, Edmonton" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "Andrew Quattrin", value: "Canada" },
    { category: "Captain", player: "José Madeira", value: "Portugal" },
    { category: "Venue", player: "Clarke Stadium", value: "Edmonton" },
  ],
},

{
  matchKey: "tonga-vs-spain",
  timeline: [
    { minute: "0'", label: "Kick-off — Clarke Stadium, Edmonton" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "Sonatane Takulua", value: "Tonga" },
    { category: "Captain", player: "TBD", value: "Spain" },
    { category: "Venue", player: "Clarke Stadium", value: "Edmonton" },
  ],
},

{
  matchKey: "samoa-vs-georgia",
  timeline: [
    { minute: "0'", label: "Kick-off — Estadio Sausalito, Viña del Mar" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "TBD", value: "Samoa" },
    { category: "Captain", player: "Davit Niniashvili", value: "Georgia" },
    { category: "Venue", player: "Estadio Sausalito", value: "Viña del Mar" },
  ],
},

{
  matchKey: "usa-vs-zimbabwe",
  timeline: [
    { minute: "0'", label: "Kick-off — American Legion Memorial Stadium, Charlotte" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "Jason Damm", value: "USA" },
    { category: "Captain", player: "Tino Mavesere", value: "Zimbabwe" },
    { category: "Venue", player: "American Legion Memorial Stadium", value: "Charlotte" },
  ],
},

// ================= WORLD RUGBY NATIONS CUP 2026 — ROUND 3 =================

{
  matchKey: "samoa-vs-romania",
  timeline: [
    { minute: "0'", label: "Kick-off — Estadio Charrúa, Montevideo" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],

  performances: [
    { category: "Captain", player: "TBD", value: "Samoa" },
    { category: "Captain", player: "Cristi Boboc", value: "Romania" },
    { category: "Venue", player: "Estadio Charrúa", value: "Montevideo" },
  ],
},

{
  matchKey: "uruguay-vs-hong-kong-china",
  timeline: [
    { minute: "0'", label: "Kick-off — Estadio Charrúa, Montevideo" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "Felipe Aliaga", value: "Uruguay" },
    { category: "Captain", player: "Joshua Hrstich", value: "Hong Kong China" },
    { category: "Venue", player: "Estadio Charrúa", value: "Montevideo" },
  ],
},

{
  matchKey: "tonga-vs-portugal",
  timeline: [
    { minute: "0'", label: "Kick-off — Princess Auto Stadium, Winnipeg" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "TBD", value: "Tonga" },
    { category: "Captain", player: "TBD", value: "Portugal" },
    { category: "Venue", player: "Princess Auto Stadium", value: "Winnipeg" },
  ],
},

{
  matchKey: "chile-vs-georgia",
  timeline: [
    { minute: "0'", label: "Kick-off — Estadio La Portada, La Serena" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "Martín Sigren", value: "Chile" },
    { category: "Captain", player: "Davit Niniashvili", value: "Georgia" },
    { category: "Venue", player: "Estadio La Portada", value: "La Serena" },
  ],
},

{
  matchKey: "usa-vs-spain",
  timeline: [
    { minute: "0'", label: "Kick-off — WakeMed Soccer Park, Cary" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
 
  performances: [
    { category: "Captain", player: "Jason Damm", value: "USA" },
    { category: "Captain", player: "TBD", value: "Spain" },
    { category: "Venue", player: "WakeMed Soccer Park", value: "Cary" },
  ],
},

{
  matchKey: "canada-vs-zimbabwe",
  timeline: [
    { minute: "0'", label: "Kick-off — Princess Auto Stadium, Winnipeg" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "Andrew Quattrin", value: "Canada" },
    { category: "Captain", player: "Tinotenda Mavesere", value: "Zimbabwe" },
    { category: "Venue", player: "Princess Auto Stadium", value: "Winnipeg" },
  ],
},

   // ================= NATIONS CHAMPIONSHIP 2026 — ROUND 3 =================

{
  matchKey: "new-zealand-vs-ireland",
  timeline: [
    { minute: "0'", label: "Kick-off — Eden Park, Auckland" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "Ardie Savea", value: "New Zealand" },
    { category: "Captain", player: "Dan Sheehan", value: "Ireland" },
    { category: "Venue", player: "Eden Park", value: "Auckland" },
  ],
},

{
  matchKey: "japan-vs-france",
  timeline: [
    { minute: "0'", label: "Kick-off — MUFG Stadium, Tokyo" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],

  performances: [
    { category: "Captain", player: "Warner Dearns", value: "Japan" },
    { category: "Captain", player: "Maxime Lucu", value: "France" },
    { category: "Venue", player: "MUFG Stadium", value: "Tokyo" },
  ],
},

{
  matchKey: "australia-vs-italy",
  timeline: [
    { minute: "0'", label: "Kick-off — HBF Park, Perth" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
 
  performances: [
    { category: "Captain", player: "Harry Wilson", value: "Australia" },
    { category: "Captain", player: "Michele Lamaro", value: "Italy" },
    { category: "Venue", player: "HBF Park", value: "Perth" },
  ],
},

{
  matchKey: "fiji-vs-scotland",
  timeline: [
    { minute: "0'", label: "Kick-off — Murrayfield, Edinburgh" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
 
  performances: [
    { category: "Captain", player: "Tevita Ikanivere", value: "Fiji" },
    { category: "Captain", player: "Stafford McDowall", value: "Scotland" },
    { category: "Venue", player: "Murrayfield", value: "Edinburgh" },
  ],
},

{
  matchKey: "south-africa-vs-wales",
  timeline: [
    { minute: "0'", label: "Kick-off — Hollywoodbets Kings Park, Durban" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "Pieter-Steph du Toit", value: "South Africa" },
    { category: "Captain", player: "Dewi Lake", value: "Wales" },
    { category: "Venue", player: "Hollywoodbets Kings Park", value: "Durban" },
  ],
},

{
  matchKey: "argentina-vs-england",
  timeline: [
    { minute: "0'", label: "Kick-off — Estadio Único Madre de Ciudades, Santiago del Estero" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  
  performances: [
    { category: "Captain", player: "Julian Montoya", value: "Argentina" },
    { category: "Captain", player: "Jamie George", value: "England" },
    { category: "Venue", player: "Estadio Único Madre de Ciudades", value: "Santiago del Estero" },
  ],
},

  // ================= WOMEN'S SIX NATIONS / OTHER EXISTING DATA =================

  {
    matchKey: "france-w-vs-italy-w",
    timeline: [
      { minute: "8'", label: "TRY: France W - M. Ménager" },
      { minute: "12'", label: "CON: France W" },
      { minute: "19'", label: "TRY: France W - B. Vernier" },
      { minute: "25'", label: "TRY: Italy W" },
      { minute: "38'", label: "TRY: France W - C. Castets" },
      { minute: "45'", label: "TRY: France W - M. Ménager (2nd)" },
      { minute: "52'", label: "PEN: France W" },
      { minute: "68'", label: "TRY: France W - A. Deshayes" },
    ],
    
    performances: [
      { category: "Most Meters", player: "M. Ménager (France)", value: "142m" },
      { category: "Most Tackles", player: "C. Gros (France)", value: "18 tackles" },
      { category: "Most Try Assists", player: "B. Vernier (France)", value: "3 assists" },
    ],
  },

  {
    matchKey: "england-w-vs-ireland-w",
    timeline: [
      { minute: "5'", label: "TRY: England W - A. Breach" },
      { minute: "15'", label: "TRY: England W - M. Rowland" },
      { minute: "28'", label: "TRY: Ireland W" },
      { minute: "42'", label: "TRY: England W - H. Aitchison" },
      { minute: "55'", label: "PEN: England W" },
      { minute: "67'", label: "TRY: England W - E. Scarratt" },
    ],
   
    performances: [
      { category: "Most Meters", player: "A. Breach (England)", value: "168m" },
      { category: "Most Tackles", player: "Z. Harrison (England)", value: "21 tackles" },
      { category: "Most Try Assists", player: "H. Aitchison (England)", value: "4 assists" },
    ],
  },

  {
    matchKey: "wales-w-vs-scotland-w",
    timeline: [
      { minute: "10'", label: "TRY: Scotland W" },
      { minute: "22'", label: "TRY: Wales W" },
      { minute: "35'", label: "TRY: Scotland W" },
      { minute: "48'", label: "PEN: Wales W" },
      { minute: "62'", label: "TRY: Scotland W" },
    ],
    
    performances: [
      { category: "Most Meters", player: "C. Rollie (Scotland)", value: "135m" },
      { category: "Most Tackles", player: "R. McCormick (Scotland)", value: "19 tackles" },
    ],
  },

  {
    matchKey: "scotland-w-vs-england-w",
    timeline: [
      { minute: "12'", label: "TRY: England W - A. Breach" },
      { minute: "18'", label: "CON: England W" },
      { minute: "25'", label: "TRY: England W - M. Rowland" },
      { minute: "32'", label: "TRY: England W - H. Aitchison" },
      { minute: "41'", label: "TRY: England W - E. Scarratt" },
      { minute: "55'", label: "TRY: England W - Z. Harrison" },
      { minute: "68'", label: "TRY: England W - L. Riley" },
    ],
    
    performances: [
      { category: "Most Meters", player: "A. Breach (England)", value: "178m" },
      { category: "Most Tackles", player: "Z. Harrison (England)", value: "24 tackles" },
    ],
  },

  {
    matchKey: "wales-w-vs-france-w",
    timeline: [
      { minute: "15'", label: "TRY: France W - M. Ménager" },
      { minute: "22'", label: "CON: France W" },
      { minute: "35'", label: "TRY: France W - B. Vernier" },
      { minute: "48'", label: "TRY: France W - C. Castets" },
      { minute: "62'", label: "TRY: France W - A. Deshayes" },
    ],
   
    performances: [
      { category: "Most Meters", player: "M. Ménager (France)", value: "155m" },
      { category: "Most Tackles", player: "C. Gros (France)", value: "22 tackles" },
    ],
  },

  {
    matchKey: "ireland-w-vs-italy-w",
    timeline: [
      { minute: "7'", label: "TRY: Ireland W" },
      { minute: "14'", label: "CON: Ireland W" },
      { minute: "21'", label: "TRY: Ireland W" },
      { minute: "35'", label: "TRY: Ireland W" },
      { minute: "48'", label: "TRY: Ireland W" },
      { minute: "62'", label: "TRY: Ireland W" },
    ],
   
    performances: [
      { category: "Most Meters", player: "A. Doyle (Ireland)", value: "152m" },
      { category: "Most Tackles", player: "B. McCormack (Ireland)", value: "20 tackles" },
    ],
  },

  {
    matchKey: "england-w-vs-wales-w",
    timeline: [
      { minute: "6'", label: "TRY: England W - A. Breach" },
      { minute: "18'", label: "TRY: Wales W" },
      { minute: "29'", label: "TRY: England W - E. Scarratt" },
      { minute: "41'", label: "TRY: England W - H. Aitchison" },
      { minute: "55'", label: "TRY: England W - M. Rowland" },
      { minute: "70'", label: "TRY: England W - L. Riley" },
    ],
   
    performances: [
      { category: "Most Meters", player: "A. Breach", value: "165m" },
      { category: "Most Tackles", player: "Z. Harrison", value: "20 tackles" },
    ],
  },

  {
    matchKey: "italy-w-vs-scotland-w",
    timeline: [
      { minute: "9'", label: "TRY: Italy W" },
      { minute: "22'", label: "TRY: Scotland W" },
      { minute: "34'", label: "TRY: Italy W" },
      { minute: "48'", label: "TRY: Italy W" },
      { minute: "60'", label: "TRY: Scotland W" },
      { minute: "72'", label: "TRY: Italy W" },
    ],
   
    performances: [
      { category: "Most Meters", player: "C. Rollie", value: "140m" },
    ],
  },

  {
    matchKey: "france-w-vs-ireland-w",
    timeline: [
      { minute: "6'", label: "TRY: France W" },
      { minute: "19'", label: "TRY: Ireland W" },
      { minute: "30'", label: "TRY: France W" },
      { minute: "47'", label: "TRY: France W" },
      { minute: "63'", label: "TRY: France W" },
    ],
   
    performances: [
      { category: "Most Tackles", player: "C. Gros", value: "21 tackles" },
    ],
  },

  {
    matchKey: "italy-w-vs-england-w",
    timeline: [
      { minute: "5'", label: "TRY: England W" },
      { minute: "20'", label: "TRY: Italy W" },
      { minute: "33'", label: "TRY: England W" },
      { minute: "48'", label: "TRY: England W" },
      { minute: "60'", label: "TRY: Italy W" },
      { minute: "72'", label: "TRY: England W" },
    ],
    
    performances: [
      { category: "Most Meters", player: "E. Kildunne", value: "172m" },
    ],
  },

  {
    matchKey: "scotland-w-vs-france-w",
    timeline: [
      { minute: "8'", label: "TRY: France W" },
      { minute: "16'", label: "TRY: Scotland W" },
      { minute: "29'", label: "TRY: France W" },
      { minute: "50'", label: "TRY: France W" },
      { minute: "65'", label: "TRY: France W" },
    ],
    
    performances: [
      { category: "Most Meters", player: "B. Vernier", value: "160m" },
    ],
  },

  {
    matchKey: "ireland-w-vs-wales-w",
    timeline: [
      { minute: "10'", label: "TRY: Ireland W" },
      { minute: "28'", label: "TRY: Wales W" },
      { minute: "40'", label: "TRY: Ireland W" },
      { minute: "55'", label: "TRY: Ireland W" },
      { minute: "70'", label: "TRY: Ireland W" },
    ],
    
    performances: [
      { category: "Most Tackles", player: "B. McCormack", value: "22 tackles" },
    ],
  },

// ================= THE RIVALRY TOUR 2026 — MIDWEEK MATCHES =================

{
  matchKey: "stormers-vs-new-zealand",
  timeline: [
    { minute: "0'", label: "Kick-off — Cape Town Stadium, Cape Town" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  lineups: {
    homeStarting: [
      { number: 1, name: "Vernon Matongo" },
      { number: 2, name: "André-Hugo Venter" },
      { number: 3, name: "Neethling Fouché" },
      { number: 4, name: "Adré Smith" },
      { number: 5, name: "Connor Evans" },
      { number: 6, name: "Deon Fourie" },
      { number: 7, name: "Hacjivah Dayimani" },
      { number: 8, name: "Evan Roos" },
      { number: 9, name: "Imad Khan" },
      { number: 10, name: "Yaqeen Ahmed" },
      { number: 11, name: "Leolin Zas" },
      { number: 12, name: "Jonathan Roche" },
      { number: 13, name: "Ruhan Nel (C)" },
      { number: 14, name: "Seabelo Senatla" },
      { number: 15, name: "Warrick Gelant" },
    ],
    homeBench: [
      { number: 16, name: "JJ Kotzé" },
      { number: 17, name: "Ntuthuko Mchunu" },
      { number: 18, name: "Sazi Sandi" },
      { number: 19, name: "Ruan Ackermann" },
      { number: 20, name: "Keke Morabe" },
      { number: 21, name: "Wandile Mlaba" },
      { number: 22, name: "Dewaldt Duvenage" },
      { number: 23, name: "Wandisile Simelane" },
    ],
    awayStarting: [
      { number: 1, name: "George Bower" },
      { number: 2, name: "Samisoni Taukei'aho" },
      { number: 3, name: "Pasilio Tosi" },
      { number: 4, name: "Fabian Holland" },
      { number: 5, name: "Patrick Tuipulotu (C)" },
      { number: 6, name: "Simon Parker" },
      { number: 7, name: "Peter Lakai" },
      { number: 8, name: "Wallace Sititi" },
      { number: 9, name: "Cortez Ratima" },
      { number: 10, name: "Beauden Barrett" },
      { number: 11, name: "Rieko Ioane" },
      { number: 12, name: "Anton Lienert-Brown" },
      { number: 13, name: "Billy Proctor" },
      { number: 14, name: "Leroy Carter" },
      { number: 15, name: "Josh Moorby" },
    ],
    awayBench: [
      { number: 16, name: "Asafo Aumua" },
      { number: 17, name: "Ollie Norris" },
      { number: 18, name: "Siale Lauaki" },
      { number: 19, name: "Sam Darry" },
      { number: 20, name: "Ethan Blackadder" },
      { number: 21, name: "Kyle Preston" },
      { number: 22, name: "Josh Jacomb" },
      { number: 23, name: "Caleb Clarke" },
    ],
  },
  performances: [
    { category: "Coach", player: "John Dobson", value: "Stormers" },
    { category: "Coach", player: "Dave Rennie", value: "New Zealand" },
    { category: "Captain", player: "Ruhan Nel", value: "Stormers" },
    { category: "Captain", player: "Patrick Tuipulotu", value: "New Zealand" },
    { category: "Venue", player: "Cape Town Stadium", value: "Cape Town" },
     { category: "Referee", player: "Karl Dickson", value: "RFU" },
    { category: "Assistant Referee 1", player: "Matthew Carley", value: "RFU" },
    { category: "Assistant Referee 2", player: "Hollie Davidson", value: "SRU" },
    { category: "TMO", player: "Andrew Jackson", value: "RFU" },
    { category: "FPRO", player: "Mike Adamson", value: "SRU" },
  ],
},

{
  matchKey: "sharks-vs-new-zealand",
  timeline: [
    { minute: "0'", label: "Kick-off — Kings Park, Durban" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
 lineups: {
    homeStarting: [
      { number: 1, name: "Nemo Roelofse" },
      { number: 2, name: "Eduan Swart" },
      { number: 3, name: "Vincent Koch" },
      { number: 4, name: "Hendre Stassen" },
      { number: 5, name: "Deon Slabbert" },
      { number: 6, name: "Phepsi Buthelezi" },
      { number: 7, name: "Manu Tshituka" },
      { number: 8, name: "Nick Hatton (C)" },
      { number: 9, name: "Bradley Davids" },
      { number: 10, name: "Vusi Moyo" },
      { number: 11, name: "Litelihle Bester" },
      { number: 12, name: "Murray Koster" },
      { number: 13, name: "Jurenzo Julius" },
      { number: 14, name: "Donovan Don" },
      { number: 15, name: "Zekhethelo Siyaya" },
    ],
    homeBench: [
      { number: 16, name: "Liam van Wyk" },
      { number: 17, name: "Rambo Kubekha" },
      { number: 18, name: "Simphiwe Ngobese" },
      { number: 19, name: "Corne Rahl" },
      { number: 20, name: "Matt Romao" },
      { number: 21, name: "Ivan van Zyl" },
      { number: 22, name: "Luan Giliomee" },
      { number: 23, name: "Ma'a Nonu" },
    ],
    awayStarting: [
      { number: 1, name: "Ethan de Groot" },
      { number: 2, name: "Asafo Aumua" },
      { number: 3, name: "Fletcher Newell" },
      { number: 4, name: "Josh Lord" },
      { number: 5, name: "Sam Darry" },
      { number: 6, name: "Tupou Vaa'i" },
      { number: 7, name: "Luke Jacobson (C)" },
      { number: 8, name: "Wallace Sititi" },
      { number: 9, name: "Kyle Preston" },
      { number: 10, name: "Ruben Love" },
      { number: 11, name: "Caleb Clarke" },
      { number: 12, name: "Jordie Barrett" },
      { number: 13, name: "Quinn Tupaea" },
      { number: 14, name: "Fehi Fineanganofo" },
      { number: 15, name: "Damian McKenzie" },
    ],
    awayBench: [
      { number: 16, name: "Bradley Slater" },
      { number: 17, name: "Ollie Norris" },
      { number: 18, name: "Pasilio Tosi" },
      { number: 19, name: "Ethan Blackadder" },
      { number: 20, name: "Semisi Ta'eiloa" },
      { number: 21, name: "Cortez Ratima" },
      { number: 22, name: "Timoci Tavatavanawai" },
      { number: 23, name: "Emoni Narawa" },
    ],
  },
  performances: [
    { category: "Coach", player: "JP Pietersen", value: "Sharks" },
    { category: "Coach", player: "Dave Rennie", value: "New Zealand" },
    { category: "Captain", player: "Nick Hatton", value: "Sharks" },
    { category: "Captain", player: "Luke Jacobson", value: "New Zealand" },
    { category: "Venue", player: "Kings Park", value: "Durban" },
    { category: "Referee", player: "Matthew Carley", value: "RFU" },
    { category: "Assistant Referee 1", player: "Karl Dickson", value: "RFU" },
    { category: "Assistant Referee 2", player: "Hollie Davidson", value: "SRU" },
    { category: "TMO", player: "Mike Adamson", value: "SRU" },
  ],
},

{
matchKey: "bulls-vs-new-zealand",
highlightsUrl: "https://www.youtube.com/watch?v=WaQkx8-PBdI",
matchStats: {
  home: { // Bulls
    metresMade: 312,
    carries: 98,
    defendersBeaten: 14,
    cleanBreaks: 5,
    offloads: 8,
    tacklesMade: 142,
    tacklesMissed: 28,
    turnoversWon: 6,
    penaltiesConceded: 12,
  },
  away: { // New Zealand
    metresMade: 548,
    carries: 126,
    defendersBeaten: 31,
    cleanBreaks: 12,
    offloads: 15,
    tacklesMade: 118,
    tacklesMissed: 11,
    turnoversWon: 11,
    penaltiesConceded: 8,
  },
},

  timeline: [
    { minute: "0'", label: "Kick-off — Loftus Versfeld, Pretoria" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  lineups: {
    homeStarting: [
      { number: 1, name: "Alulutho Tshakweni" },
      { number: 2, name: "Juann Else" },
      { number: 3, name: "Francois Klopper" },
      { number: 4, name: "Ruan Vermaak" },
      { number: 5, name: "JF van Heerden" },
      { number: 6, name: "Marcell Coetzee (C)" },
      { number: 7, name: "Hanro Liebenberg" },
      { number: 8, name: "Jeandré Rudolph" },
      { number: 9, name: "Embrose Papier" },
      { number: 10, name: "Curwin Bosch" },
      { number: 11, name: "Stravino Jacobs" },
      { number: 12, name: "Harold Vorster" },
      { number: 13, name: "Stedman Gans" },
      { number: 14, name: "Thaakir Abrahams" },
      { number: 15, name: "Willie le Roux" },
    ],
    homeBench: [
      { number: 16, name: "Johan Grobbelaar" },
      { number: 17, name: "Sti Sithole" },
      { number: 18, name: "Khuta Mchunu" },
      { number: 19, name: "Reinhardt Ludwig" },
      { number: 20, name: "Elrigh Louw" },
      { number: 21, name: "Paul de Wet" },
      { number: 22, name: "Katlego Letebele" },
      { number: 23, name: "Hakeem Kunene" },
    ],
    awayStarting: [
      { number: 1, name: "Xavier Numia" },
      { number: 2, name: "Codie Taylor (C)" },
      { number: 3, name: "Tyrel Lomax" },
      { number: 4, name: "Fabian Holland" },
      { number: 5, name: "Patrick Tuipulotu" },
      { number: 6, name: "Simon Parker" },
      { number: 7, name: "Anton Segner" },
      { number: 8, name: "Peter Lakai" },
      { number: 9, name: "Cortez Ratima" },
      { number: 10, name: "Josh Jacomb" },
      { number: 11, name: "Josh Moorby" },
      { number: 12, name: "Anton Lienert-Brown" },
      { number: 13, name: "Rieko Ioane" },
      { number: 14, name: "Leroy Carter" },
      { number: 15, name: "Beauden Barrett" },
    ],
    awayBench: [
      { number: 16, name: "Samisoni Taukei'aho" },
      { number: 17, name: "George Bower" },
      { number: 18, name: "Siale Lauaki" },
      { number: 19, name: "Josh Lord" },
      { number: 20, name: "Wallace Sititi" },
      { number: 21, name: "Kyle Preston" },
      { number: 22, name: "Timoci Tavatavanawai" },
      { number: 23, name: "Emoni Narawa" },
    ],
  },
  performances: [
    { category: "Coach", player: "Johan Ackermann", value: "Bulls" },
    { category: "Coach", player: "Dave Rennie", value: "New Zealand" },
    { category: "Captain", player: "Marcell Coetzee", value: "Bulls" },
    { category: "Captain", player: "Codie Taylor", value: "New Zealand" },
    { category: "Venue", player: "Loftus Versfeld", value: "Pretoria" },
    { category: "Referee", player: "Nika Amashukeli", value: "GRU" },
    { category: "Assistant Referee 1", player: "Karl Dickson", value: "RFU" },
    { category: "Assistant Referee 2", player: "Matthew Carley", value: "RFU" },
    { category: "TMO", player: "Eric Gauzins", value: "FFR" },
  ],
},
{
  matchKey: "lions-vs-new-zealand",
  timeline: [
    { minute: "0'", label: "Kick-off — Ellis Park, Johannesburg" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  lineups: {
    homeStarting: [
      { number: 1, name: "SJ Kotze" },
      { number: 2, name: "PJ Botha" },
      { number: 3, name: "Sebastian Lombard" },
      { number: 4, name: "Etienne Oosthuizen" },
      { number: 5, name: "Ruan Delport" },
      { number: 6, name: "Siba Mahashe" },
      { number: 7, name: "Batho Hlekani" },
      { number: 8, name: "Francke Horn (C)" },
      { number: 9, name: "Nico Steyn" },
      { number: 10, name: "Chris Smith" },
      { number: 11, name: "Erich Cronje" },
      { number: 12, name: "Richard Kriel" },
      { number: 13, name: "Henco van Wyk" },
      { number: 14, name: "Kelly Mpeku" },
      { number: 15, name: "Quan Horn" },
    ],
    homeBench: [
      { number: 16, name: "Morne Brandon" },
      { number: 17, name: "Boan Venter" },
      { number: 18, name: "RF Schoeman" },
      { number: 19, name: "Hyron Andrews" },
      { number: 20, name: "Sikhumbuzo Notshe" },
      { number: 21, name: "JC Pretorius" },
      { number: 22, name: "Haashim Pead" },
      { number: 23, name: "Boeta Chamberlain" },
    ],
    awayStarting: [
      { number: 1, name: "Siale Lauaki" },
      { number: 2, name: "Samisoni Taukei'aho" },
      { number: 3, name: "Pasilio Tosi" },
      { number: 4, name: "Sam Darry" },
      { number: 5, name: "Patrick Tuipulotu (C)" },
      { number: 6, name: "Wallace Sititi" },
      { number: 7, name: "Ethan Blackadder" },
      { number: 8, name: "Semisi Ta'eiloa" },
      { number: 9, name: "Noah Hotham" },
      { number: 10, name: "Richie Mo'unga" },
      { number: 11, name: "Emoni Narawa" },
      { number: 12, name: "Timoci Tavatavanawai" },
      { number: 13, name: "Rieko Ioane" },
      { number: 14, name: "Fehi Fineanganofo" },
      { number: 15, name: "Beauden Barrett" },
    ],
    awayBench: [
      { number: 16, name: "Bradley Slater" },
      { number: 17, name: "Ofa Tu'ungafasi" },
      { number: 18, name: "Saula Ma'u" },
      { number: 19, name: "Jamie Hannah" },
      { number: 20, name: "Peter Lakai" },
      { number: 21, name: "Kyle Preston" },
      { number: 22, name: "Josh Jacomb" },
      { number: 23, name: "Anton Lienert-Brown" },
    ],
  },
  performances: [
    { category: "Coach", player: "Ivan van Rooyen", value: "Lions" },
    { category: "Coach", player: "Dave Rennie", value: "New Zealand" },
    { category: "Captain", player: "Francke Horn", value: "Lions" },
    { category: "Captain", player: "Patrick Tuipulotu", value: "New Zealand" },
    { category: "Venue", player: "Ellis Park", value: "Johannesburg" },
    { category: "Referee", player: "Angus Gardner", value: "RA" },
    { category: "Assistant Referee 1", player: "Karl Dickson", value: "RFU" },
    { category: "Assistant Referee 2", player: "Nika Amashukeli", value: "GRU" },
    { category: "TMO", player: "Brett Cronan", value: "RA" },
  ],
},

{
 matchKey: "south-africa-vs-new-zealand-test-1",
highlightsUrl: "https://www.youtube.com/watch?v=zAbz3DiMcCw",
matchStats: {
  home: { // South Africa
    metresMade: 341,
    carries: 96,
    defendersBeaten: 21,
    cleanBreaks: 7,
    offloads: 2,
    tacklesMade: 89,
    tacklesMissed: 25,
    turnoversWon: 5,
    penaltiesConceded: 10,
  },
  away: { // New Zealand
    metresMade: 255,
    carries: 86,
    defendersBeaten: 25,
    cleanBreaks: 6,
    offloads: 4,
    tacklesMade: 129,
    tacklesMissed: 21,
    turnoversWon: 14,
    penaltiesConceded: 14,
  },
},
 timeline: [
    { minute: "0'", label: "Kick-off — Ellis Park, Johannesburg" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  lineups: {
    homeStarting: [
      { number: 1, name: "Ox Nche" },
      { number: 2, name: "Malcolm Marx" },
      { number: 3, name: "Wilco Louw" },
      { number: 4, name: "Eben Etzebeth" },
      { number: 5, name: "Ruan Nortje" },
      { number: 6, name: "Paul de Villiers" },
      { number: 7, name: "Pieter-Steph du Toit (C)" },
      { number: 8, name: "Jasper Wiese" },
      { number: 9, name: "Grant Williams" },
      { number: 10, name: "Sacha Feinberg-Mngomezulu" },
      { number: 11, name: "Kurt-Lee Arendse" },
      { number: 12, name: "Damian de Allende" },
      { number: 13, name: "Jesse Kriel" },
      { number: 14, name: "Cheslin Kolbe" },
      { number: 15, name: "Damian Willemse" },
    ],
    homeBench: [
      { number: 16, name: "Jan-Hendrik Wessels" },
      { number: 17, name: "Gerhard Steenekamp" },
      { number: 18, name: "Zachary Porthen" },
      { number: 19, name: "Cobus Wiese" },
      { number: 20, name: "Andre Esterhuizen" },
      { number: 21, name: "Marco van Staden" },
      { number: 22, name: "Cobus Reinach" },
      { number: 23, name: "Manie Libbok" },
    ],
    awayStarting: [
      { number: 1, name: "Ethan de Groot" },
      { number: 2, name: "Codie Taylor" },
      { number: 3, name: "Tyrel Lomax" },
      { number: 4, name: "Josh Lord" },
      { number: 5, name: "Fabian Holland" },
      { number: 6, name: "Tupou Vaa'i" },
      { number: 7, name: "Luke Jacobson" },
      { number: 8, name: "Ardie Savea (C)" },
      { number: 9, name: "Cam Roigard" },
      { number: 10, name: "Ruben Love" },
      { number: 11, name: "Josh Moorby" },
      { number: 12, name: "Jordie Barrett" },
      { number: 13, name: "Quinn Tupaea" },
      { number: 14, name: "Will Jordan" },
      { number: 15, name: "Damian McKenzie" },
    ],
    awayBench: [
      { number: 16, name: "Asafo Aumua" },
      { number: 17, name: "George Bower" },
      { number: 18, name: "Fletcher Newell" },
      { number: 19, name: "Anton Segner" },
      { number: 20, name: "Peter Lakai" },
      { number: 21, name: "Kyle Preston" },
      { number: 22, name: "Anton Lienert-Brown" },
      { number: 23, name: "Leroy Carter" },
    ],
  },
  performances: [
    { category: "Coach", player: "Rassie Erasmus", value: "South Africa" },
    { category: "Coach", player: "Dave Rennie", value: "New Zealand" },
    { category: "Captain", player: "Pieter-Steph du Toit", value: "South Africa" },
    { category: "Captain", player: "Ardie Savea", value: "New Zealand" },
    { category: "Venue", player: "Ellis Park", value: "Johannesburg" },
    { category: "Referee", player: "Matthew Carley", value: "RFU" },
    { category: "Assistant Referee 1", player: "Karl Dickson", value: "RFU" },
    { category: "Assistant Referee 2", player: "Nika Amashukeli", value: "GRU" },
    { category: "TMO", player: "Mike Adamson", value: "SRU" },
  ],
},


// ================= INTERNATIONAL TESTS 2026 =================

{
  "matchKey": "argentina-vs-south-africa",
  "timeline": [
    { "minute": "0'", "label": "Kick-off — Estadio José Amalfitani, Buenos Aires" },
    { "minute": "40'", "label": "Half Time" },
    { "minute": "80'", "label": "Full Time" }
  ],
  "lineups": {
    "homeStarting": [
      { "number": 1, "name": "Mayco Vivas" },
      { "number": 2, "name": "Ignacio Ruiz" },
      { "number": 3, "name": "Tomás Rapetti" },
      { "number": 4, "name": "Efraín Elías" },
      { "number": 5, "name": "Guido Petti" },
      { "number": 6, "name": "Pablo Matera" },
      { "number": 7, "name": "Benjamín Grondona" },
      { "number": 8, "name": "Joaquín Moro" },
      { "number": 9, "name": "Simón Benítez Cruz" },
      { "number": 10, "name": "Gerónimo Prisciantelli" },
      { "number": 11, "name": "Ignacio Mendy" },
      { "number": 12, "name": "Matías Moroni" },
      { "number": 13, "name": "Lucio Cinti" },
      { "number": 14, "name": "Rodrigo Isgró" },
      { "number": 15, "name": "Santiago Carreras" }
    ],
    "homeBench": [
      { "number": 16, "name": "Leonel Oviedo" },
      { "number": 17, "name": "Rodrigo Martínez" },
      { "number": 18, "name": "Pedro Delgado" },
      { "number": 19, "name": "Tomás Lavanini" },
      { "number": 20, "name": "Juan Martín Scelzo" },
      { "number": 21, "name": "Gonzalo Bertranou" },
      { "number": 22, "name": "Nicolás Roger" },
      { "number": 23, "name": "Mateo Soler" }
    ],
    "awayStarting": [
      { "number": 1, "name": "Thomas du Toit" },
      { "number": 2, "name": "Johan Grobbelaar" },
      { "number": 3, "name": "Wilco Louw" },
      { "number": 4, "name": "Eben Etzebeth" },
      { "number": 5, "name": "Lood de Jager" },
      { "number": 6, "name": "Marco van Staden" },
      { "number": 7, "name": "Elrigh Louw" },
      { "number": 8, "name": "Cameron Hanekom" },
      { "number": 9, "name": "Cobus Reinach" },
      { "number": 10, "name": "Handre Pollard" },
      { "number": 11, "name": "Canan Moodie" },
      { "number": 12, "name": "Andre Esterhuizen" },
      { "number": 13, "name": "Ethan Hooker" },
      { "number": 14, "name": "Aphelele Fassi" },
      { "number": 15, "name": "Sacha Feinberg-Mngomezulu" }
    ],
    "awayBench": [
      { "number": 16, "name": "Jan-Hendrik Wessels" },
      { "number": 17, "name": "Gerhard Steenekamp" },
      { "number": 18, "name": "Zachary Porthen" },
      { "number": 19, "name": "Cobus Wiese" },
      { "number": 20, "name": "Ben-Jason Dixon" },
      { "number": 21, "name": "Morne van den Berg" },
      { "number": 22, "name": "Herchel Jantjies" },
      { "number": 23, "name": "Quan Horn" }
    ]
  },
  "performances": [
    { "category": "Coach", "player": "Felipe Contepomi", "value": "Argentina" },
    { "category": "Coach", "player": "Rassie Erasmus", "value": "South Africa" },
    { "category": "Captain", "player": "Pablo Matera", "value": "Argentina" },
    { "category": "Captain", "player": "Siya Kolisi", "value": "South Africa" },
    { "category": "Venue", "player": "Estadio José Amalfitani", "value": "Buenos Aires" },
    { category: "Referee", player: "Pierre Brousset", value: "FFR" },
    { category: "Assistant Referee 1", player: "Luc Ramos", value: "FFR" },
    { category: "Assistant Referee 2", player: "Craig Evans", value: "WRU" },
    { category: "TMO", player: "Ben Whitehouse", value: "WRU" },
    { category: "FPRO", player: "Ian Tempest", value: "RFU" },
  ]
},

{
  matchKey: "japan-vs-australia",
  timeline: [
    { minute: "0'", label: "Kick-off — Hanazono Rugby Stadium, Osaka" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  lineups: {
    homeStarting: [
      { number: 1, name: "Takato Okabe" },
      { number: 2, name: "Hayate Era" },
      { number: 3, name: "Shuhei Takeuchi" },
      { number: 4, name: "Harry Hockings" },
      { number: 5, name: "Warner Dearns (C)" },
      { number: 6, name: "Ben Gunter" },
      { number: 7, name: "Kanji Shimokawa" },
      { number: 8, name: "Jack Cornelsen" },
      { number: 9, name: "Naoto Saito" },
      { number: 10, name: "Ryunosuke Ito" },
      { number: 11, name: "Kazuma Ueda" },
      { number: 12, name: "Samisoni Tua" },
      { number: 13, name: "Dylan Riley" },
      { number: 14, name: "Kippei Ishida" },
      { number: 15, name: "Yoshitaka Yazaki" },
    ],
    homeBench: [
      { number: 16, name: "Kenji Sato" },
      { number: 17, name: "Sojiro Otsuka" },
      { number: 18, name: "Keijiro Tamefusa" },
      { number: 19, name: "Michael Stolberg" },
      { number: 20, name: "Michael Leitch" },
      { number: 21, name: "Tiennan Costley" },
      { number: 22, name: "Itsuki Kamimura" },
      { number: 23, name: "Shunsuke Uenobo" },
    ],
    awayStarting: [
      { number: 1, name: "Aidan Ross" },
      { number: 2, name: "Josh Nasser" },
      { number: 3, name: "Allan Alaalatoa" },
      { number: 4, name: "Josh Canham" },
      { number: 5, name: "Miles Amatosero" },
      { number: 6, name: "Rob Valetini" },
      { number: 7, name: "Fraser McReight" },
      { number: 8, name: "Harry Wilson (C)" },
      { number: 9, name: "Ryan Lonergan" },
      { number: 10, name: "Declan Meredith" },
      { number: 11, name: "Harry Potter" },
      { number: 12, name: "Hunter Paisami" },
      { number: 13, name: "Joseph-Aukuso Suaalii" },
      { number: 14, name: "Max Jorgensen" },
      { number: 15, name: "Tom Wright" },
    ],
    awayBench: [
      { number: 16, name: "Billy Pollard" },
      { number: 17, name: "Angus Bell" },
      { number: 18, name: "Taniela Tupou" },
      { number: 19, name: "Jeremy Williams" },
      { number: 20, name: "Charlie Cale" },
      { number: 21, name: "Tate McDermott" },
      { number: 22, name: "Ben Donaldson" },
      { number: 23, name: "Isaac Henry" },
    ],
  },
  performances: [
    { category: "Coach", player: "Eddie Jones", value: "Japan" },
    { category: "Coach", player: "Les Kiss", value: "Australia" },
    { category: "Captain", player: "Warner Dearns", value: "Japan" },
    { category: "Captain", player: "Harry Wilson", value: "Australia" },
    { category: "Venue", player: "Hanazono Rugby Stadium", value: "Osaka" },
    { category: "Referee", player: "Eoghan Cross", value: "IRFU" },
    { category: "Assistant Referee 1", player: "Paul Williams", value: "NZR" },
    { category: "Assistant Referee 2", player: "Morgan White", value: "HKCR" },
    { category: "TMO", player: "Richard Kelly", value: "NZR" },
  ],
},

];

export const getMatchDetails = (match: any): MatchDetails | undefined => {
  if (!match) return undefined;

  const home = (match.home?.name || "").toLowerCase().replace(/\s+/g, "-");
  const away = (match.away?.name || "").toLowerCase().replace(/\s+/g, "-");
  const expectedKey = `${home}-vs-${away}`;

  return matchDetails2026.find((d) => d.matchKey === expectedKey);
};