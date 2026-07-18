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
  lineups: {
    homeStarting: [
      { number: 1, name: "TBD - Samoa squad not confirmed" },
      { number: 2, name: "TBD - Samoa squad not confirmed" },
      { number: 3, name: "TBD - Samoa squad not confirmed" },
      { number: 4, name: "TBD - Samoa squad not confirmed" },
      { number: 5, name: "TBD - Samoa squad not confirmed" },
      { number: 6, name: "TBD - Samoa squad not confirmed" },
      { number: 7, name: "TBD - Samoa squad not confirmed" },
      { number: 8, name: "TBD - Samoa squad not confirmed" },
      { number: 9, name: "TBD - Samoa squad not confirmed" },
      { number: 10, name: "TBD - Samoa squad not confirmed" },
      { number: 11, name: "TBD - Samoa squad not confirmed" },
      { number: 12, name: "TBD - Samoa squad not confirmed" },
      { number: 13, name: "TBD - Samoa squad not confirmed" },
      { number: 14, name: "TBD - Samoa squad not confirmed" },
      { number: 15, name: "TBD - Samoa squad not confirmed" },
    ],
    homeBench: [
      { number: 16, name: "TBD - Samoa squad not confirmed" },
      { number: 17, name: "TBD - Samoa squad not confirmed" },
      { number: 18, name: "TBD - Samoa squad not confirmed" },
      { number: 19, name: "TBD - Samoa squad not confirmed" },
      { number: 20, name: "TBD - Samoa squad not confirmed" },
      { number: 21, name: "TBD - Samoa squad not confirmed" },
      { number: 22, name: "TBD - Samoa squad not confirmed" },
      { number: 23, name: "TBD - Samoa squad not confirmed" },
    ],
    awayStarting: [
      { number: 1, name: "Iulian Hartig" },
      { number: 2, name: "Ștefan Marko Buruiană" },
      { number: 3, name: "Cosmin Manole" },
      { number: 4, name: "Nicolaas Immelman" },
      { number: 5, name: "Logan Weidner" },
      { number: 6, name: "Keanan Murray" },
      { number: 7, name: "Cristi Boboc (C)" },
      { number: 8, name: "Etienne Terblanche" },
      { number: 9, name: "Alin Conache" },
      { number: 10, name: "Hinckley Vaovasa" },
      { number: 11, name: "Iliesa Tiqe" },
      { number: 12, name: "Jason Tomane" },
      { number: 13, name: "Nicolas Onuțu" },
      { number: 14, name: "Tevita Manumua" },
      { number: 15, name: "Marius Simionescu" },
    ],
    awayBench: [
      { number: 16, name: "Tudor Butnariu" },
      { number: 17, name: "Alexandru Savin" },
      { number: 18, name: "Jean-Pierre Smith" },
      { number: 19, name: "Andrei Mahu" },
      { number: 20, name: "Iacopo Bianchi" },
      { number: 21, name: "Gabriel Rupanu" },
      { number: 22, name: "Mihai Graure" },
      { number: 23, name: "Alexandru Bucur" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Mateo Sanguinetti" },
      { number: 2, name: "Joaquín Myszka" },
      { number: 3, name: "Reinaldo Piussi" },
      { number: 4, name: "Ignacio Dotti" },
      { number: 5, name: "Felipe Aliaga (C)" },
      { number: 6, name: "Manuel Ardao" },
      { number: 7, name: "Lucas Bianchi" },
      { number: 8, name: "Manuel Diana" },
      { number: 9, name: "Joaquín Suárez" },
      { number: 10, name: "Jean Cotarmanac'h" },
      { number: 11, name: "Franco Scaldaferri" },
      { number: 12, name: "Juan Manuel Alonso" },
      { number: 13, name: "Felipe Arcos Pérez" },
      { number: 14, name: "Juan González" },
      { number: 15, name: "Francisco González Capdevila" },
    ],
    homeBench: [
      { number: 16, name: "Máximo Lamelas" },
      { number: 17, name: "Mateo Perillo" },
      { number: 18, name: "Santiago Cagnone" },
      { number: 19, name: "Manuel Rosmarino" },
      { number: 20, name: "Mateo Sosa" },
      { number: 21, name: "Ignacio Rodríguez" },
      { number: 22, name: "Francisco Landauer" },
      { number: 23, name: "Alfonso Vidal" },
    ],
    awayStarting: [
      { number: 1, name: "Rory Cinnamond" },
      { number: 2, name: "Alexander Post" },
      { number: 3, name: "Keelan Chapman" },
      { number: 4, name: "James Rivers" },
      { number: 5, name: "Kyle Sullivan" },
      { number: 6, name: "Lachlan Doheny" },
      { number: 7, name: "Pierce Mackinlay-West" },
      { number: 8, name: "Joshua Hrstich (C)" },
      { number: 9, name: "Jack Combes" },
      { number: 10, name: "Matteo Avitabile" },
      { number: 11, name: "Sebastian Brien" },
      { number: 12, name: "Tom Hill" },
      { number: 13, name: "Marcus Ramage" },
      { number: 14, name: "Paul Altier" },
      { number: 15, name: "Matt Worley" },
    ],
    awayBench: [
      { number: 16, name: "Ng Siu Lung" },
      { number: 17, name: "Sunia Fameitau" },
      { number: 18, name: "Zac Cinnamond" },
      { number: 19, name: "Max Murphy" },
      { number: 20, name: "Dana Fourie" },
      { number: 21, name: "Brendon Nell" },
      { number: 22, name: "Isaac Campbell-Wu" },
      { number: 23, name: "Max Threlkeld" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "TBD - Tonga squad not confirmed" },
      { number: 2, name: "TBD - Tonga squad not confirmed" },
      { number: 3, name: "TBD - Tonga squad not confirmed" },
      { number: 4, name: "TBD - Tonga squad not confirmed" },
      { number: 5, name: "TBD - Tonga squad not confirmed" },
      { number: 6, name: "TBD - Tonga squad not confirmed" },
      { number: 7, name: "TBD - Tonga squad not confirmed" },
      { number: 8, name: "TBD - Tonga squad not confirmed" },
      { number: 9, name: "TBD - Tonga squad not confirmed" },
      { number: 10, name: "TBD - Tonga squad not confirmed" },
      { number: 11, name: "TBD - Tonga squad not confirmed" },
      { number: 12, name: "TBD - Tonga squad not confirmed" },
      { number: 13, name: "TBD - Tonga squad not confirmed" },
      { number: 14, name: "TBD - Tonga squad not confirmed" },
      { number: 15, name: "TBD - Tonga squad not confirmed" },
    ],
    homeBench: [
      { number: 16, name: "TBD - Tonga squad not confirmed" },
      { number: 17, name: "TBD - Tonga squad not confirmed" },
      { number: 18, name: "TBD - Tonga squad not confirmed" },
      { number: 19, name: "TBD - Tonga squad not confirmed" },
      { number: 20, name: "TBD - Tonga squad not confirmed" },
      { number: 21, name: "TBD - Tonga squad not confirmed" },
      { number: 22, name: "TBD - Tonga squad not confirmed" },
      { number: 23, name: "TBD - Tonga squad not confirmed" },
    ],
    awayStarting: [
      { number: 1, name: "TBD - Portugal squad not confirmed" },
      { number: 2, name: "TBD - Portugal squad not confirmed" },
      { number: 3, name: "TBD - Portugal squad not confirmed" },
      { number: 4, name: "TBD - Portugal squad not confirmed" },
      { number: 5, name: "TBD - Portugal squad not confirmed" },
      { number: 6, name: "TBD - Portugal squad not confirmed" },
      { number: 7, name: "TBD - Portugal squad not confirmed" },
      { number: 8, name: "TBD - Portugal squad not confirmed" },
      { number: 9, name: "TBD - Portugal squad not confirmed" },
      { number: 10, name: "TBD - Portugal squad not confirmed" },
      { number: 11, name: "TBD - Portugal squad not confirmed" },
      { number: 12, name: "TBD - Portugal squad not confirmed" },
      { number: 13, name: "TBD - Portugal squad not confirmed" },
      { number: 14, name: "TBD - Portugal squad not confirmed" },
      { number: 15, name: "TBD - Portugal squad not confirmed" },
    ],
    awayBench: [
      { number: 16, name: "TBD - Portugal squad not confirmed" },
      { number: 17, name: "TBD - Portugal squad not confirmed" },
      { number: 18, name: "TBD - Portugal squad not confirmed" },
      { number: 19, name: "TBD - Portugal squad not confirmed" },
      { number: 20, name: "TBD - Portugal squad not confirmed" },
      { number: 21, name: "TBD - Portugal squad not confirmed" },
      { number: 22, name: "TBD - Portugal squad not confirmed" },
      { number: 23, name: "TBD - Portugal squad not confirmed" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Javier Carrasco" },
      { number: 2, name: "Diego Escobar" },
      { number: 3, name: "Iñaki Gurruchaga" },
      { number: 4, name: "Santiago Pedrero" },
      { number: 5, name: "Javier Eissmann" },
      { number: 6, name: "Martín Sigren (C)" },
      { number: 7, name: "Raimundo Martínez" },
      { number: 8, name: "Alfonso Escobar" },
      { number: 9, name: "Marcelo Torrealba" },
      { number: 10, name: "Rodrigo Fernández" },
      { number: 11, name: "Nicolás Saab" },
      { number: 12, name: "Santiago Videla" },
      { number: 13, name: "Domingo Saavedra" },
      { number: 14, name: "Manuel Bustamante" },
      { number: 15, name: "Matías Garafulic" },
    ],
    homeBench: [
      { number: 16, name: "Salvador Lues" },
      { number: 17, name: "Emilio Shea" },
      { number: 18, name: "Matías Dittus" },
      { number: 19, name: "Bruno Sáez" },
      { number: 20, name: "Clemente Saavedra" },
      { number: 21, name: "Juan Sebastián Bianchi" },
      { number: 22, name: "Iñaki Ayarza" },
      { number: 23, name: "Ernesto Tchimino" },
    ],
    awayStarting: [
      { number: 1, name: "Giorgi Akhaladze" },
      { number: 2, name: "Nika Sutidze" },
      { number: 3, name: "Bachuki Tchumbadze" },
      { number: 4, name: "Mikheil Babunashvili" },
      { number: 5, name: "Giorgi Javakhia" },
      { number: 6, name: "Beka Shvangiradze" },
      { number: 7, name: "Luka Ivanishvili" },
      { number: 8, name: "Tornike Jalagonia" },
      { number: 9, name: "Vasil Lobzhanidze" },
      { number: 10, name: "Luka Matkava" },
      { number: 11, name: "Giorgi Kveseladze" },
      { number: 12, name: "Tornike Kakhoidze" },
      { number: 13, name: "Georges Shvelidze" },
      { number: 14, name: "Aka Tabutsadze" },
      { number: 15, name: "Davit Niniashvili (C)" },
    ],
    awayBench: [
      { number: 16, name: "Vakhtang Jintcharadze" },
      { number: 17, name: "Nika Abuladze" },
      { number: 18, name: "Giorgi Pertaia" },
      { number: 19, name: "Konstantine Mikautadze" },
      { number: 20, name: "Ilia Spanderashvili" },
      { number: 21, name: "Ioane Iashagashvili" },
      { number: 22, name: "Mikheil Alania" },
      { number: 23, name: "Tedo Abzhandadze" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Jack Iscaro" },
      { number: 2, name: "Kapeli Pifeleti" },
      { number: 3, name: "Tonga Kofe" },
      { number: 4, name: "Nathan Den Hoedt" },
      { number: 5, name: "Brandon Harvey" },
      { number: 6, name: "Cory Daniel" },
      { number: 7, name: "Paddy Ryan" },
      { number: 8, name: "Jason Damm (C)" },
      { number: 9, name: "Ruben de Haas" },
      { number: 10, name: "Chris Hilsenbeck" },
      { number: 11, name: "Perry Mayo" },
      { number: 12, name: "Dominic Besag" },
      { number: 13, name: "Julian Roberts" },
      { number: 14, name: "Mark O'Keeffe" },
      { number: 15, name: "Mitch Wilson" },
    ],
    homeBench: [
      { number: 16, name: "Shilo Klein" },
      { number: 17, name: "Ezekiel Lindenmuth" },
      { number: 18, name: "Charlie Abel" },
      { number: 19, name: "Nafi Ma'afu" },
      { number: 20, name: "Benjamin Bonasso" },
      { number: 21, name: "Ethan McVeigh" },
      { number: 22, name: "Luke Carty" },
      { number: 23, name: "Tavite Lopeti" },
    ],
    awayStarting: [
      { number: 1, name: "Luca Tabarot" },
      { number: 2, name: "Álvaro García" },
      { number: 3, name: "Hugo Pirlet" },
      { number: 4, name: "Manex Ariceta" },
      { number: 5, name: "Antonio Suárez" },
      { number: 6, name: "Gabriel Vélez" },
      { number: 7, name: "Ignacio Piñeiro" },
      { number: 8, name: "Ekain Imaz" },
      { number: 9, name: "Tani Bay" },
      { number: 10, name: "Gonzalo López Bontempo" },
      { number: 11, name: "Alberto Carmona" },
      { number: 12, name: "Álvar Gimeno" },
      { number: 13, name: "Martiniano Cian" },
      { number: 14, name: "Gauthier Minguillon" },
      { number: 15, name: "John Wessel Bell" },
    ],
    awayBench: [
      { number: 16, name: "Santiago Ovejero" },
      { number: 17, name: "Thierry Futeu" },
      { number: 18, name: "Jon Zabala" },
      { number: 19, name: "Vicente Boronat" },
      { number: 20, name: "Diego González" },
      { number: 21, name: "Kerman Aurrekoetxea" },
      { number: 22, name: "Iñaki Mateu" },
      { number: 23, name: "Jaime Manteca" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Calixto Martinez" },
      { number: 2, name: "Andrew Quattrin (C)" },
      { number: 3, name: "Cole Keith" },
      { number: 4, name: "Piers von Dadelszen" },
      { number: 5, name: "Izzak Kelly" },
      { number: 6, name: "Mason Flesch" },
      { number: 7, name: "Evan Olmstead" },
      { number: 8, name: "Sion Parry" },
      { number: 9, name: "Jason Higgins" },
      { number: 10, name: "Cooper Coats" },
      { number: 11, name: "Noah Flesch" },
      { number: 12, name: "Josh McIndoe" },
      { number: 13, name: "Spencer Jones" },
      { number: 14, name: "Kyle Tremblay" },
      { number: 15, name: "Peter Nelson" },
    ],
    homeBench: [
      { number: 16, name: "TBD - Canada bench not confirmed" },
      { number: 17, name: "TBD - Canada bench not confirmed" },
      { number: 18, name: "TBD - Canada bench not confirmed" },
      { number: 19, name: "TBD - Canada bench not confirmed" },
      { number: 20, name: "TBD - Canada bench not confirmed" },
      { number: 21, name: "TBD - Canada bench not confirmed" },
      { number: 22, name: "TBD - Canada bench not confirmed" },
      { number: 23, name: "TBD - Canada bench not confirmed" },
    ],
    awayStarting: [
      { number: 1, name: "Tijde Visser" },
      { number: 2, name: "Bryan Chiang" },
      { number: 3, name: "Farai Mudariki" },
      { number: 4, name: "Gary Porter" },
      { number: 5, name: "Godfrey Muzanargwo" },
      { number: 6, name: "Tinotenda Mavesere (C)" },
      { number: 7, name: "Tadiwanashe Gwashu" },
      { number: 8, name: "Aiden Burnett" },
      { number: 9, name: "Tyrone Gombe" },
      { number: 10, name: "Bruce Houston" },
      { number: 11, name: "Edward Sigauke" },
      { number: 12, name: "Kudzai Mashawi" },
      { number: 13, name: "Brandon Mudzekenyedzi" },
      { number: 14, name: "Matthew McNab" },
      { number: 15, name: "Tapiwa Mafura" },
    ],
    awayBench: [
      { number: 16, name: "Liam Larkan" },
      { number: 17, name: "Victor Mupunga" },
      { number: 18, name: "Cleopas Kundiona" },
      { number: 19, name: "Jason Fraser" },
      { number: 20, name: "Simbarashe Siraha" },
      { number: 21, name: "Dion Khumalo" },
      { number: 22, name: "Keegan Joubert" },
      { number: 23, name: "Ian Prior" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Ethan de Groot" },
      { number: 2, name: "Codie Taylor" },
      { number: 3, name: "Tyrel Lomax" },
      { number: 4, name: "Josh Lord" },
      { number: 5, name: "Patrick Tuipulotu" },
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
    homeBench: [
      { number: 16, name: "Asafo Aumua" },
      { number: 17, name: "Xavier Numia" },
      { number: 18, name: "Fletcher Newell" },
      { number: 19, name: "Anton Segner" },
      { number: 20, name: "Peter Lakai" },
      { number: 21, name: "Cortez Ratima" },
      { number: 22, name: "Anton Lienert-Brown" },
      { number: 23, name: "Caleb Clarke" },
    ],
    awayStarting: [
      { number: 1, name: "Tom O'Toole" },
      { number: 2, name: "Dan Sheehan (C)" },
      { number: 3, name: "Tadhg Furlong" },
      { number: 4, name: "Joe McCarthy" },
      { number: 5, name: "James Ryan" },
      { number: 6, name: "Tadhg Beirne" },
      { number: 7, name: "Josh van der Flier" },
      { number: 8, name: "Jack Conan" },
      { number: 9, name: "Jamison Gibson-Park" },
      { number: 10, name: "Sam Prendergast" },
      { number: 11, name: "Jimmy O'Brien" },
      { number: 12, name: "Stuart McCloskey" },
      { number: 13, name: "Garry Ringrose" },
      { number: 14, name: "Robert Baloucoune" },
      { number: 15, name: "Hugo Keenan" },
    ],
    awayBench: [
      { number: 16, name: "Ronan Kelleher" },
      { number: 17, name: "Jeremy Loughman" },
      { number: 18, name: "Thomas Clarkson" },
      { number: 19, name: "Nick Timoney" },
      { number: 20, name: "Sean Jansen" },
      { number: 21, name: "Craig Casey" },
      { number: 22, name: "Ciaran Frawley" },
      { number: 23, name: "Bundee Aki" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Sojiro Otsuka" },
      { number: 2, name: "Hayate Era" },
      { number: 3, name: "Keijiro Tamefusa" },
      { number: 4, name: "Harry Hockings" },
      { number: 5, name: "Warner Dearns (C)" },
      { number: 6, name: "Esei Haangana" },
      { number: 7, name: "Ben Gunter" },
      { number: 8, name: "Jack Cornelsen" },
      { number: 9, name: "Naoto Saito" },
      { number: 10, name: "Ryunosuke Ito" },
      { number: 11, name: "Kippei Ishida" },
      { number: 12, name: "Samisoni Tua" },
      { number: 13, name: "Dylan Riley" },
      { number: 14, name: "Kazuma Ueda" },
      { number: 15, name: "Takuro Matsunaga" },
    ],
    homeBench: [
      { number: 16, name: "Kenji Sato" },
      { number: 17, name: "Takato Okabe" },
      { number: 18, name: "Izi Sword" },
      { number: 19, name: "Michael Stolberg" },
      { number: 20, name: "Michael Leitch" },
      { number: 21, name: "Tiennan Costley" },
      { number: 22, name: "Taira Main" },
      { number: 23, name: "Shunsuke Uenobo" },
    ],
    awayStarting: [
      { number: 1, name: "Jefferson Poirot" },
      { number: 2, name: "Maxime Lamothe" },
      { number: 3, name: "Regis Montagne" },
      { number: 4, name: "Florian Verhaeghe" },
      { number: 5, name: "Emmanuel Meafou" },
      { number: 6, name: "Lenni Nouchi" },
      { number: 7, name: "Marko Gazzotti" },
      { number: 8, name: "Alexandre Roumat" },
      { number: 9, name: "Maxime Lucu (C)" },
      { number: 10, name: "Romain Ntamack" },
      { number: 11, name: "Aaron Grandidier-Nkanang" },
      { number: 12, name: "Yoram Moefana" },
      { number: 13, name: "Fabien Brau-Boirie" },
      { number: 14, name: "Theo Attissogbe" },
      { number: 15, name: "Matthieu Jalibert" },
    ],
    awayBench: [
      { number: 16, name: "Peato Mauvaka" },
      { number: 17, name: "Reda Wardi" },
      { number: 18, name: "Sipili Falatea" },
      { number: 19, name: "Hugo Auradou" },
      { number: 20, name: "Thomas Staniforth" },
      { number: 21, name: "Killian Tixeront" },
      { number: 22, name: "Paul Graou" },
      { number: 23, name: "Kalvin Gourgues" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Angus Bell" },
      { number: 2, name: "Brandon Paenga-Amosa" },
      { number: 3, name: "Allan Alaalatoa" },
      { number: 4, name: "Josh Canham" },
      { number: 5, name: "Jeremy Williams" },
      { number: 6, name: "Rob Valetini" },
      { number: 7, name: "Carlo Tizzano" },
      { number: 8, name: "Harry Wilson (C)" },
      { number: 9, name: "Ryan Lonergan" },
      { number: 10, name: "Declan Meredith" },
      { number: 11, name: "Harry Potter" },
      { number: 12, name: "Len Ikitau" },
      { number: 13, name: "Joseph-Aukuso Suaalii" },
      { number: 14, name: "Max Jorgensen" },
      { number: 15, name: "Tom Wright" },
    ],
    homeBench: [
      { number: 16, name: "Billy Pollard" },
      { number: 17, name: "James Slipper" },
      { number: 18, name: "Zane Nonggorr" },
      { number: 19, name: "Miles Amatosero" },
      { number: 20, name: "Fraser McReight" },
      { number: 21, name: "Tate McDermott" },
      { number: 22, name: "Ben Donaldson" },
      { number: 23, name: "Filipo Daugunu" },
    ],
    awayStarting: [
      { number: 1, name: "Muhamed Hasa" },
      { number: 2, name: "Gianmarco Lucchesi" },
      { number: 3, name: "Marco Riccioni" },
      { number: 4, name: "Giulio Marini" },
      { number: 5, name: "Federico Ruzza" },
      { number: 6, name: "Riccardo Favretto" },
      { number: 7, name: "Michele Lamaro (C)" },
      { number: 8, name: "Ross Vintcent" },
      { number: 9, name: "Alessandro Garbisi" },
      { number: 10, name: "Paolo Garbisi" },
      { number: 11, name: "Monty Ioane" },
      { number: 12, name: "Paolo Odogwu" },
      { number: 13, name: "Nacho Brex" },
      { number: 14, name: "Louis Lynagh" },
      { number: 15, name: "Lorenzo Pani" },
    ],
    awayBench: [
      { number: 16, name: "Pablo Dimcheff" },
      { number: 17, name: "Danilo Fischetti" },
      { number: 18, name: "Ion Neculai" },
      { number: 19, name: "Andrea Zambonin" },
      { number: 20, name: "Alessandro Ortombina" },
      { number: 21, name: "Alessandro Fusco" },
      { number: 22, name: "Giacomo Da Re" },
      { number: 23, name: "Leonardo Marin" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Eroni Mawi" },
      { number: 2, name: "Tevita Ikanivere" },
      { number: 3, name: "Mesake Doge" },
      { number: 4, name: "Tevita Ratuva" },
      { number: 5, name: "Isoa Nasilasila" },
      { number: 6, name: "Peceli Yato" },
      { number: 7, name: "Lekima Tagitagivalu" },
      { number: 8, name: "Elia Canakaivata" },
      { number: 9, name: "Frank Lomani" },
      { number: 10, name: "Caleb Muntz" },
      { number: 11, name: "Jiuta Wainiqolo" },
      { number: 12, name: "Josua Tuisova" },
      { number: 13, name: "Kalaveti Ravouvou" },
      { number: 14, name: "Vuate Karawalevu" },
      { number: 15, name: "Salesi Rayasi" },
    ],
    homeBench: [
      { number: 16, name: "Sam Matavesi" },
      { number: 17, name: "Livai Natave" },
      { number: 18, name: "Peni Ravai" },
      { number: 19, name: "Temo Mayanavanua" },
      { number: 20, name: "Levani Botia" },
      { number: 21, name: "Pita-Gus Sowakula" },
      { number: 22, name: "Sam Wye" },
      { number: 23, name: "Isaiah Armstrong-Ravula" },
    ],
    awayStarting: [
      { number: 1, name: "Rory Sutherland" },
      { number: 2, name: "Gregor Hiddleston" },
      { number: 3, name: "D'Arcy Rae" },
      { number: 4, name: "Jonny Gray" },
      { number: 5, name: "Max Williamson" },
      { number: 6, name: "Josh Bayliss" },
      { number: 7, name: "Freddy Douglas" },
      { number: 8, name: "Gregor Brown" },
      { number: 9, name: "George Horne" },
      { number: 10, name: "Fergus Burke" },
      { number: 11, name: "Duhan van der Merwe" },
      { number: 12, name: "Stafford McDowall (C)" },
      { number: 13, name: "Ollie Smith" },
      { number: 14, name: "Darcy Graham" },
      { number: 15, name: "Tom Jordan" },
    ],
    awayBench: [
      { number: 16, name: "Seb Stephen" },
      { number: 17, name: "Pierre Schoeman" },
      { number: 18, name: "Zander Fagerson" },
      { number: 19, name: "Scott Cummings" },
      { number: 20, name: "Magnus Bradbury" },
      { number: 21, name: "Liam McConnell" },
      { number: 22, name: "Jamie Dobie" },
      { number: 23, name: "Sione Tuipulotu" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Gerhard Steenekamp" },
      { number: 2, name: "Malcolm Marx" },
      { number: 3, name: "Carlu Sadie" },
      { number: 4, name: "Cobus Wiese" },
      { number: 5, name: "Ruben van Heerden" },
      { number: 6, name: "Paul de Villiers" },
      { number: 7, name: "Pieter-Steph du Toit (C)" },
      { number: 8, name: "Jasper Wiese" },
      { number: 9, name: "Cobus Reinach" },
      { number: 10, name: "Vusi Moyo" },
      { number: 11, name: "Kurt-Lee Arendse" },
      { number: 12, name: "Damian de Allende" },
      { number: 13, name: "Jesse Kriel" },
      { number: 14, name: "Jaco Williams" },
      { number: 15, name: "Aphelele Fassi" },
    ],
    homeBench: [
      { number: 16, name: "Andre-Hugo Venter" },
      { number: 17, name: "Jan-Hendrik Wessels" },
      { number: 18, name: "Wilco Louw" },
      { number: 19, name: "Ben-Jason Dixon" },
      { number: 20, name: "Marco van Staden" },
      { number: 21, name: "Herschel Jantjies" },
      { number: 22, name: "Manie Libbok" },
      { number: 23, name: "Damian Willemse" },
    ],
    awayStarting: [
      { number: 1, name: "Rhys Carre" },
      { number: 2, name: "Dewi Lake (C)" },
      { number: 3, name: "Dillon Lewis" },
      { number: 4, name: "Teddy Williams" },
      { number: 5, name: "Adam Beard" },
      { number: 6, name: "Alex Mann" },
      { number: 7, name: "Jac Morgan" },
      { number: 8, name: "Aaron Wainwright" },
      { number: 9, name: "Tomos Williams" },
      { number: 10, name: "Dan Edwards" },
      { number: 11, name: "Josh Adams" },
      { number: 12, name: "Ben Thomas" },
      { number: 13, name: "Max Llewellyn" },
      { number: 14, name: "Louis Rees-Zammit" },
      { number: 15, name: "Blair Murray" },
    ],
    awayBench: [
      { number: 16, name: "Ryan Elias" },
      { number: 17, name: "Nicky Smith" },
      { number: 18, name: "Ben Warren" },
      { number: 19, name: "Freddie Thomas" },
      { number: 20, name: "Tommy Reffell" },
      { number: 21, name: "James Botham" },
      { number: 22, name: "Reuben Morgan-Williams" },
      { number: 23, name: "Joe Hawkins" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Mayco Vivas" },
      { number: 2, name: "Julian Montoya (C)" },
      { number: 3, name: "Tomas Rapetti" },
      { number: 4, name: "Guido Petti" },
      { number: 5, name: "Matias Alemanno" },
      { number: 6, name: "Santiago Grondona" },
      { number: 7, name: "Marcos Kremer" },
      { number: 8, name: "Joaquin Oviedo" },
      { number: 9, name: "Gonzalo Garcia" },
      { number: 10, name: "Tomas Albornoz" },
      { number: 11, name: "Mateo Carreras" },
      { number: 12, name: "Justo Piccardo" },
      { number: 13, name: "Matias Moroni" },
      { number: 14, name: "Bautista Delguy" },
      { number: 15, name: "Santiago Carreras" },
    ],
    homeBench: [
      { number: 16, name: "Ignacio Ruiz" },
      { number: 17, name: "Boris Wenger" },
      { number: 18, name: "Pedro Delgado" },
      { number: 19, name: "Efrain Elias" },
      { number: 20, name: "Pablo Matera" },
      { number: 21, name: "Joaquin Moro" },
      { number: 22, name: "Simon Benitez Cruz" },
      { number: 23, name: "Lucio Cinti" },
    ],
    awayStarting: [
      { number: 1, name: "Ellis Genge" },
      { number: 2, name: "Jamie George (C)" },
      { number: 3, name: "Joe Heyes" },
      { number: 4, name: "Alex Coles" },
      { number: 5, name: "George Martin" },
      { number: 6, name: "Ollie Chessum" },
      { number: 7, name: "Guy Pepper" },
      { number: 8, name: "Ben Earl" },
      { number: 9, name: "Jack van Poortvliet" },
      { number: 10, name: "Fin Smith" },
      { number: 11, name: "Immanuel Feyi-Waboso" },
      { number: 12, name: "Seb Atkinson" },
      { number: 13, name: "Henry Slade" },
      { number: 14, name: "Tommy Freeman" },
      { number: 15, name: "Marcus Smith" },
    ],
    awayBench: [
      { number: 16, name: "Luke Cowan-Dickie" },
      { number: 17, name: "Emmanuel Iyogun" },
      { number: 18, name: "Asher Opoku-Fordjour" },
      { number: 19, name: "Tom Curry" },
      { number: 20, name: "Henry Pollock" },
      { number: 21, name: "Ben Spencer" },
      { number: 22, name: "Benhard Janse van Rensburg" },
      { number: 23, name: "Noah Caluori" },
    ],
  },
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
];

export const getMatchDetails = (match: any): MatchDetails | undefined => {
  if (!match) return undefined;

  const home = (match.home?.name || "").toLowerCase().replace(/\s+/g, "-");
  const away = (match.away?.name || "").toLowerCase().replace(/\s+/g, "-");
  const expectedKey = `${home}-vs-${away}`;

  return matchDetails2026.find((d) => d.matchKey === expectedKey);
};