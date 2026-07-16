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
      { number: 11, name: "Ignacio Álvarez Akiki" },
      { number: 12, name: "Juan Manuel Alonso" },
      { number: 13, name: "Felipe Marcos Pérez" },
      { number: 14, name: "Francisco González Capdevila" },
      { number: 15, name: "Juan González" },
    ],
    homeBench: [
      { number: 16, name: "Germán Kigel" },
      { number: 17, name: "Mateo Perillo" },
      { number: 18, name: "Lucas Porcelli" },
      { number: 19, name: "Manuel Rosmarino" },
      { number: 20, name: "Arturo Ten Hoever" },
      { number: 21, name: "Ignacio Rodríguez" },
      { number: 22, name: "Francisco Landauer" },
      { number: 23, name: "Alfonso Vidal" },
    ],
    awayStarting: [
      { number: 1, name: "Iulian Hartig" },
      { number: 2, name: "Ștefan Marko Buruiană" },
      { number: 3, name: "Cosmin Manole" },
      { number: 4, name: "Logan Weidner" },
      { number: 5, name: "Andrei Mahu" },
      { number: 6, name: "Nicolaas Immelman" },
      { number: 7, name: "Cristi Boboc (C)" },
      { number: 8, name: "Adrian Mitu" },
      { number: 9, name: "Alin Conache" },
      { number: 10, name: "Hinckley Vaovasa" },
      { number: 11, name: "Iliesa Tige" },
      { number: 12, name: "Jason Tomane" },
      { number: 13, name: "Nicolas Onutu" },
      { number: 14, name: "Tevita Manumua" },
      { number: 15, name: "Marius Simionescu" },
    ],
    awayBench: [
      { number: 16, name: "Tudor Butnariu" },
      { number: 17, name: "Alexandru Savin" },
      { number: 18, name: "Jean-Pierre Smith" },
      { number: 19, name: "Vlad Neculau" },
      { number: 20, name: "Keanan Murray" },
      { number: 21, name: "Jacopo Bianchi" },
      { number: 22, name: "Gabriel Rupanu" },
      { number: 23, name: "Mihai Graure" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Salvador Lues" },
      { number: 2, name: "Diego Escobar" },
      { number: 3, name: "Matías Dittus" },
      { number: 4, name: "Santiago Pedrero" },
      { number: 5, name: "Javier Eissmann" },
      { number: 6, name: "Raimundo Martínez" },
      { number: 7, name: "Ignacio Silva" },
      { number: 8, name: "Alfonso Escobar" },
      { number: 9, name: "Benjamín Videla" },
      { number: 10, name: "Matías Garafulic" },
      { number: 11, name: "Nicolás Garafulic" },
      { number: 12, name: "Pablo Casas" },
      { number: 13, name: "Domingo Saavedra" },
      { number: 14, name: "Cristóbal Game" },
      { number: 15, name: "Iñaki Delguy" },
    ],
    homeBench: [
      { number: 16, name: "Augusto Böhme" },
      { number: 17, name: "Javier Carrasco" },
      { number: 18, name: "Juan Pablo Larenas" },
      { number: 19, name: "Clemente Saavedra" },
      { number: 20, name: "Martín Sigren" },
      { number: 21, name: "Marcelo Torrealba" },
      { number: 22, name: "Lucas Abogabir" },
      { number: 23, name: "Julio Blanc" },
    ],
    awayStarting: [
      { number: 1, name: "Zac Cinnamond" },
      { number: 2, name: "Rory Cinnamond" },
      { number: 3, name: "Alexander Post" },
      { number: 4, name: "Lachlan Doheny" },
      { number: 5, name: "Kyle Sullivan" },
      { number: 6, name: "Pierce Mackinlay-West" },
      { number: 7, name: "Tyler McNutt" },
      { number: 8, name: "Josh Hrstich (C)" },
      { number: 9, name: "Jack Combes" },
      { number: 10, name: "Joseph Barker" },
      { number: 11, name: "Harry Sayers" },
      { number: 12, name: "Isaac Campbell-Wu" },
      { number: 13, name: "Maxwell Threlkeld" },
      { number: 14, name: "Marcus Ramage" },
      { number: 15, name: "Paul Altier" },
    ],
    awayBench: [
      { number: 16, name: "Calum Scott" },
      { number: 17, name: "Sunia Fameitau" },
      { number: 18, name: "Keelan Chapman" },
      { number: 19, name: "James Rivers" },
      { number: 20, name: "James Sawyer" },
      { number: 21, name: "Brendon Nell" },
      { number: 22, name: "Matteo Avitabile" },
      { number: 23, name: "Matthew Worley" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Calixto Martinez" },
      { number: 2, name: "Andrew Quattrin" },
      { number: 3, name: "Cole Keith" },
      { number: 4, name: "Piers Von Dadelszen" },
      { number: 5, name: "Izzak Kelly" },
      { number: 6, name: "Mason Flesch" },
      { number: 7, name: "Evan Olmstead" },
      { number: 8, name: "Siôn Parry" },
      { number: 9, name: "Jason Higgins" },
      { number: 10, name: "Peter Nelson" },
      { number: 11, name: "Noah Flesch" },
      { number: 12, name: "Josh McIndoe" },
      { number: 13, name: "Spencer Jones" },
      { number: 14, name: "Kyle Tremblay" },
      { number: 15, name: "Takoda McMullin" },
    ],
    homeBench: [
      { number: 16, name: "Dewald Kotze" },
      { number: 17, name: "Sam Miller" },
      { number: 18, name: "Kyle Steeves" },
      { number: 19, name: "Daragh Doyle" },
      { number: 20, name: "Cody Nhanala" },
      { number: 21, name: "Brock Gallagher" },
      { number: 22, name: "Liam James" },
      { number: 23, name: "Jacob Ince" },
    ],
    awayStarting: [
      { number: 1, name: "Luís Lopes" },
      { number: 2, name: "Luke Begic" },
      { number: 3, name: "Cody Thomas" },
      { number: 4, name: "Martim Bello" },
      { number: 5, name: "Duarte Torgal" },
      { number: 6, name: "José Madeira (C)" },
      { number: 7, name: "João Granate" },
      { number: 8, name: "José Monteiro" },
      { number: 9, name: "Samuel Marques" },
      { number: 10, name: "Hugo Aubry" },
      { number: 11, name: "Manuel Cardoso Pinto" },
      { number: 12, name: "Tomás Appleton" },
      { number: 13, name: "Guilherme Vasconcelos" },
      { number: 14, name: "Raffaele Storti" },
      { number: 15, name: "Vincent Pinto" },
    ],
    awayBench: [
      { number: 16, name: "Abel Da Cunha" },
      { number: 17, name: "Nuno Mascarenhas" },
      { number: 18, name: "António Prim" },
      { number: 19, name: "Guilherme Costa" },
      { number: 20, name: "André Cunha" },
      { number: 21, name: "Hugo Camacho" },
      { number: 22, name: "Martim Faro" },
      { number: 23, name: "Alfredo Almeida" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Siegfried Fisi'ihoi" },
      { number: 2, name: "Sam Moli" },
      { number: 3, name: "Atu Moli" },
      { number: 4, name: "Semisi Paea" },
      { number: 5, name: "Jimmy Tupou" },
      { number: 6, name: "Sione Tau" },
      { number: 7, name: "Tupou" },
      { number: 8, name: "Solomone Kata" },
      { number: 9, name: "Sonatane Takulua" },
      { number: 10, name: "Pat Pellegrini" },
      { number: 11, name: "John Tapu Elelu" },
      { number: 12, name: "TBD" },
      { number: 13, name: "TBD" },
      { number: 14, name: "Daniela Filimone" },
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
      { number: 1, name: "Tití Futeu" },
      { number: 2, name: "Álvaro García" },
      { number: 3, name: "Hugo Pirlet" },
      { number: 4, name: "Manolo Urraza" },
      { number: 5, name: "Antonio Suárez" },
      { number: 6, name: "Gabriel Vélez" },
      { number: 7, name: "Nacho Piñeiro" },
      { number: 8, name: "Mánex Ariceta" },
      { number: 9, name: "Tanibay" },
      { number: 10, name: "Gonzalo López Bontempo" },
      { number: 11, name: "Alberto Carmona" },
      { number: 12, name: "Jaime Manteca" },
      { number: 13, name: "Álvar Gimeno" },
      { number: 14, name: "Martiniano Cian" },
      { number: 15, name: "John Besselbel" },
    ],
    awayBench: [
      { number: 16, name: "Santiago Vejero" },
      { number: 17, name: "Luca Tabarot" },
      { number: 18, name: "John Zavala" },
      { number: 19, name: "Mateo Triqui" },
      { number: 20, name: "Diego González" },
      { number: 21, name: "Kerman Ahorreco Echea" },
      { number: 22, name: "Iñaki Mateu" },
      { number: 23, name: "Jeremy Trevític" },
    ],
  },
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
      { number: 1, name: "Giorgi Akhaladze" },
      { number: 2, name: "Nikoloz Sutidze" },
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
      { number: 13, name: "Giorgi Shvelidze" },
      { number: 14, name: "Akaki Tabutsadze" },
      { number: 15, name: "Davit Niniashvili (C)" },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Jack Iscaro" },
      { number: 2, name: "Alex Maughan" },
      { number: 3, name: "Tonga Kofe" },
      { number: 4, name: "Nathan Den Hoedt" },
      { number: 5, name: "Jason Damm (C)" },
      { number: 6, name: "Lance Williams" },
      { number: 7, name: "Cory Daniel" },
      { number: 8, name: "Makeen Alikhan" },
      { number: 9, name: "Ruben de Haas" },
      { number: 10, name: "Chris Hilsenbeck" },
      { number: 11, name: "Perry Mayo" },
      { number: 12, name: "Dom Besag" },
      { number: 13, name: "Tavite Lopeti" },
      { number: 14, name: "Conner Mooneyham" },
      { number: 15, name: "Mitch Wilson" },
    ],
    homeBench: [
      { number: 16, name: "Shilo Klein" },
      { number: 17, name: "Ezekiel Lindenmuth" },
      { number: 18, name: "Mason Pedersen" },
      { number: 19, name: "Brandon Harvey" },
      { number: 20, name: "Nafi Ma'afu" },
      { number: 21, name: "Ethan McVeigh" },
      { number: 22, name: "Luke Carty" },
      { number: 23, name: "Julian Roberts" },
    ],
    awayStarting: [
      { number: 1, name: "Victor Mupunga" },
      { number: 2, name: "Liam Larkan" },
      { number: 3, name: "Cleopas Kundiona" },
      { number: 4, name: "Gary Porter" },
      { number: 5, name: "Godfrey Muzanargwo" },
      { number: 6, name: "Tino Mavesere (C)" },
      { number: 7, name: "Jason Fraser" },
      { number: 8, name: "Aiden Burnett" },
      { number: 9, name: "Keegan Joubert" },
      { number: 10, name: "Ian Prior" },
      { number: 11, name: "Edward Sigauke" },
      { number: 12, name: "Brandon Mudzekenyedzi" },
      { number: 13, name: "Dion Khumalo" },
      { number: 14, name: "Matthew McNab" },
      { number: 15, name: "Tapiwa Mafura" },
    ],
    awayBench: [
      { number: 16, name: "Simba Mandioma" },
      { number: 17, name: "Tijde Visser" },
      { number: 18, name: "Michael Kumbirai" },
      { number: 19, name: "Tadiwa Gwashu" },
      { number: 20, name: "Simba Siraha" },
      { number: 21, name: "Hilton Mudariki" },
      { number: 22, name: "Bruce Houston" },
      { number: 23, name: "Takudzwa Musingwini" },
    ],
  },
  performances: [
    { category: "Captain", player: "Jason Damm", value: "USA" },
    { category: "Captain", player: "Tino Mavesere", value: "Zimbabwe" },
    { category: "Venue", player: "American Legion Memorial Stadium", value: "Charlotte" },
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
    { category: "Captain", player: "TBD", value: "Japan" },
    { category: "Captain", player: "TBD", value: "France" },
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
    { category: "Captain", player: "TBD", value: "Australia" },
    { category: "Captain", player: "TBD", value: "Italy" },
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
    { category: "Captain", player: "TBD", value: "Fiji" },
    { category: "Captain", player: "TBD", value: "Scotland" },
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
    { category: "Captain", player: "Pieter-Steph du Toit", value: "South Africa" },
    { category: "Captain", player: "TBD", value: "Wales" },
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
    { category: "Captain", player: "TBD", value: "Argentina" },
    { category: "Captain", player: "TBD", value: "England" },
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