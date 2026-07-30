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

export type MatchDetails = {
  matchKey: string;
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
      // Stormers squad TBD - will be announced closer to match
      { number: 1, name: "TBD" },
      { number: 2, name: "TBD" },
      { number: 3, name: "TBD" },
      { number: 4, name: "TBD" },
      { number: 5, name: "TBD" },
      { number: 6, name: "TBD" },
      { number: 7, name: "TBD" },
      { number: 8, name: "TBD" },
      { number: 9, name: "TBD" },
      { number: 10, name: "TBD" },
      { number: 11, name: "TBD" },
      { number: 12, name: "TBD" },
      { number: 13, name: "TBD" },
      { number: 14, name: "TBD" },
      { number: 15, name: "TBD" },
    ],
    homeBench: [
      { number: 16, name: "TBD" },
      { number: 17, name: "TBD" },
      { number: 18, name: "TBD" },
      { number: 19, name: "TBD" },
      { number: 20, name: "TBD" },
      { number: 21, name: "TBD" },
      { number: 22, name: "TBD" },
      { number: 23, name: "TBD" },
    ],
    awayStarting: [
      // New Zealand squad TBD - 44-man squad named, specific matchday 23 to be confirmed
      { number: 1, name: "TBD" },
      { number: 2, name: "TBD" },
      { number: 3, name: "TBD" },
      { number: 4, name: "TBD" },
      { number: 5, name: "TBD" },
      { number: 6, name: "TBD" },
      { number: 7, name: "TBD" },
      { number: 8, name: "TBD" },
      { number: 9, name: "TBD" },
      { number: 10, name: "TBD" },
      { number: 11, name: "TBD" },
      { number: 12, name: "TBD" },
      { number: 13, name: "TBD" },
      { number: 14, name: "TBD" },
      { number: 15, name: "TBD" },
    ],
    awayBench: [
      { number: 16, name: "TBD" },
      { number: 17, name: "TBD" },
      { number: 18, name: "TBD" },
      { number: 19, name: "TBD" },
      { number: 20, name: "TBD" },
      { number: 21, name: "TBD" },
      { number: 22, name: "TBD" },
      { number: 23, name: "TBD" },
    ],
  },
  performances: [
    { category: "Coach", player: "John Dobson", value: "Stormers" },
    { category: "Coach", player: "Dave Rennie", value: "New Zealand" },
    { category: "Captain", player: "TBD", value: "Stormers" },
    { category: "Captain", player: "TBD", value: "New Zealand" },
    { category: "Venue", player: "Cape Town Stadium", value: "Cape Town" },
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
      { number: 1, name: "TBD" },
      { number: 2, name: "TBD" },
      { number: 3, name: "TBD" },
      { number: 4, name: "TBD" },
      { number: 5, name: "TBD" },
      { number: 6, name: "TBD" },
      { number: 7, name: "TBD" },
      { number: 8, name: "TBD" },
      { number: 9, name: "TBD" },
      { number: 10, name: "TBD" },
      { number: 11, name: "TBD" },
      { number: 12, name: "TBD" },
      { number: 13, name: "TBD" },
      { number: 14, name: "TBD" },
      { number: 15, name: "TBD" },
    ],
    homeBench: [
      { number: 16, name: "TBD" },
      { number: 17, name: "TBD" },
      { number: 18, name: "TBD" },
      { number: 19, name: "TBD" },
      { number: 20, name: "TBD" },
      { number: 21, name: "TBD" },
      { number: 22, name: "TBD" },
      { number: 23, name: "TBD" },
    ],
    awayStarting: [
      { number: 1, name: "TBD" },
      { number: 2, name: "TBD" },
      { number: 3, name: "TBD" },
      { number: 4, name: "TBD" },
      { number: 5, name: "TBD" },
      { number: 6, name: "TBD" },
      { number: 7, name: "TBD" },
      { number: 8, name: "TBD" },
      { number: 9, name: "TBD" },
      { number: 10, name: "TBD" },
      { number: 11, name: "TBD" },
      { number: 12, name: "TBD" },
      { number: 13, name: "TBD" },
      { number: 14, name: "TBD" },
      { number: 15, name: "TBD" },
    ],
    awayBench: [
      { number: 16, name: "TBD" },
      { number: 17, name: "TBD" },
      { number: 18, name: "TBD" },
      { number: 19, name: "TBD" },
      { number: 20, name: "TBD" },
      { number: 21, name: "TBD" },
      { number: 22, name: "TBD" },
      { number: 23, name: "TBD" },
    ],
  },
  performances: [
    { category: "Coach", player: "JP Pietersen", value: "Sharks" },
    { category: "Coach", player: "Dave Rennie", value: "New Zealand" },
    { category: "Captain", player: "TBD", value: "Sharks" },
    { category: "Captain", player: "TBD", value: "New Zealand" },
    { category: "Venue", player: "Kings Park", value: "Durban" },
  ],
},

{
  matchKey: "bulls-vs-new-zealand",
  timeline: [
    { minute: "0'", label: "Kick-off — Loftus Versfeld, Pretoria" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  lineups: {
    homeStarting: [
      { number: 1, name: "TBD" },
      { number: 2, name: "TBD" },
      { number: 3, name: "TBD" },
      { number: 4, name: "TBD" },
      { number: 5, name: "TBD" },
      { number: 6, name: "TBD" },
      { number: 7, name: "TBD" },
      { number: 8, name: "TBD" },
      { number: 9, name: "TBD" },
      { number: 10, name: "TBD" },
      { number: 11, name: "TBD" },
      { number: 12, name: "TBD" },
      { number: 13, name: "TBD" },
      { number: 14, name: "TBD" },
      { number: 15, name: "TBD" },
    ],
    homeBench: [
      { number: 16, name: "TBD" },
      { number: 17, name: "TBD" },
      { number: 18, name: "TBD" },
      { number: 19, name: "TBD" },
      { number: 20, name: "TBD" },
      { number: 21, name: "TBD" },
      { number: 22, name: "TBD" },
      { number: 23, name: "TBD" },
    ],
    awayStarting: [
      { number: 1, name: "TBD" },
      { number: 2, name: "TBD" },
      { number: 3, name: "TBD" },
      { number: 4, name: "TBD" },
      { number: 5, name: "TBD" },
      { number: 6, name: "TBD" },
      { number: 7, name: "TBD" },
      { number: 8, name: "TBD" },
      { number: 9, name: "TBD" },
      { number: 10, name: "TBD" },
      { number: 11, name: "TBD" },
      { number: 12, name: "TBD" },
      { number: 13, name: "TBD" },
      { number: 14, name: "TBD" },
      { number: 15, name: "TBD" },
    ],
    awayBench: [
      { number: 16, name: "TBD" },
      { number: 17, name: "TBD" },
      { number: 18, name: "TBD" },
      { number: 19, name: "TBD" },
      { number: 20, name: "TBD" },
      { number: 21, name: "TBD" },
      { number: 22, name: "TBD" },
      { number: 23, name: "TBD" },
    ],
  },
  performances: [
    { category: "Coach", player: "Johan Ackermann", value: "Bulls" },
    { category: "Coach", player: "Dave Rennie", value: "New Zealand" },
    { category: "Captain", player: "TBD", value: "Bulls" },
    { category: "Captain", player: "TBD", value: "New Zealand" },
    { category: "Venue", player: "Loftus Versfeld", value: "Pretoria" },
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
      { number: 1, name: "TBD" },
      { number: 2, name: "TBD" },
      { number: 3, name: "TBD" },
      { number: 4, name: "TBD" },
      { number: 5, name: "TBD" },
      { number: 6, name: "TBD" },
      { number: 7, name: "TBD" },
      { number: 8, name: "TBD" },
      { number: 9, name: "TBD" },
      { number: 10, name: "TBD" },
      { number: 11, name: "TBD" },
      { number: 12, name: "TBD" },
      { number: 13, name: "TBD" },
      { number: 14, name: "TBD" },
      { number: 15, name: "TBD" },
    ],
    homeBench: [
      { number: 16, name: "TBD" },
      { number: 17, name: "TBD" },
      { number: 18, name: "TBD" },
      { number: 19, name: "TBD" },
      { number: 20, name: "TBD" },
      { number: 21, name: "TBD" },
      { number: 22, name: "TBD" },
      { number: 23, name: "TBD" },
    ],
    awayStarting: [
      { number: 1, name: "TBD" },
      { number: 2, name: "TBD" },
      { number: 3, name: "TBD" },
      { number: 4, name: "TBD" },
      { number: 5, name: "TBD" },
      { number: 6, name: "TBD" },
      { number: 7, name: "TBD" },
      { number: 8, name: "TBD" },
      { number: 9, name: "TBD" },
      { number: 10, name: "TBD" },
      { number: 11, name: "TBD" },
      { number: 12, name: "TBD" },
      { number: 13, name: "TBD" },
      { number: 14, name: "TBD" },
      { number: 15, name: "TBD" },
    ],
    awayBench: [
      { number: 16, name: "TBD" },
      { number: 17, name: "TBD" },
      { number: 18, name: "TBD" },
      { number: 19, name: "TBD" },
      { number: 20, name: "TBD" },
      { number: 21, name: "TBD" },
      { number: 22, name: "TBD" },
      { number: 23, name: "TBD" },
    ],
  },
  performances: [
    { category: "Coach", player: "Ivan van Rooyen", value: "Lions" },
    { category: "Coach", player: "Dave Rennie", value: "New Zealand" },
    { category: "Captain", player: "TBD", value: "Lions" },
    { category: "Captain", player: "TBD", value: "New Zealand" },
    { category: "Venue", player: "Ellis Park", value: "Johannesburg" },
  ],
},

// ================= INTERNATIONAL TESTS 2026 =================

{
  matchKey: "argentina-vs-south-africa",
  timeline: [
    { minute: "0'", label: "Kick-off — Estadio José Amalfitani, Buenos Aires" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time" },
  ],
  lineups: {
    homeStarting: [
      // Argentina squad named, matchday 23 TBD [citation:4]
      { number: 1, name: "TBD" },
      { number: 2, name: "TBD" },
      { number: 3, name: "TBD" },
      { number: 4, name: "TBD" },
      { number: 5, name: "TBD" },
      { number: 6, name: "TBD" },
      { number: 7, name: "TBD" },
      { number: 8, name: "TBD" },
      { number: 9, name: "TBD" },
      { number: 10, name: "TBD" },
      { number: 11, name: "TBD" },
      { number: 12, name: "TBD" },
      { number: 13, name: "TBD" },
      { number: 14, name: "TBD" },
      { number: 15, name: "TBD" },
    ],
    homeBench: [
      { number: 16, name: "TBD" },
      { number: 17, name: "TBD" },
      { number: 18, name: "TBD" },
      { number: 19, name: "TBD" },
      { number: 20, name: "TBD" },
      { number: 21, name: "TBD" },
      { number: 22, name: "TBD" },
      { number: 23, name: "TBD" },
    ],
    awayStarting: [
      // Springboks squad named [citation:9], matchday 23 TBD
      { number: 1, name: "TBD" },
      { number: 2, name: "TBD" },
      { number: 3, name: "TBD" },
      { number: 4, name: "TBD" },
      { number: 5, name: "TBD" },
      { number: 6, name: "TBD" },
      { number: 7, name: "TBD" },
      { number: 8, name: "TBD" },
      { number: 9, name: "TBD" },
      { number: 10, name: "TBD" },
      { number: 11, name: "TBD" },
      { number: 12, name: "TBD" },
      { number: 13, name: "TBD" },
      { number: 14, name: "TBD" },
      { number: 15, name: "TBD" },
    ],
    awayBench: [
      { number: 16, name: "TBD" },
      { number: 17, name: "TBD" },
      { number: 18, name: "TBD" },
      { number: 19, name: "TBD" },
      { number: 20, name: "TBD" },
      { number: 21, name: "TBD" },
      { number: 22, name: "TBD" },
      { number: 23, name: "TBD" },
    ],
  },
  performances: [
    { category: "Coach", player: "Felipe Contepomi", value: "Argentina" },
    { category: "Coach", player: "Rassie Erasmus", value: "South Africa" },
    { category: "Captain", player: "TBD", value: "Argentina" },
    { category: "Captain", player: "TBD", value: "South Africa" },
    { category: "Venue", player: "Estadio José Amalfitani", value: "Buenos Aires" },
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