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
  lineups: {
    homeStarting: [
      { number: 1, name: "Ethan de Groot" },
      { number: 2, name: "Codie Taylor" },
      { number: 3, name: "Tyrel Lomax" },
      { number: 4, name: "Sam Darry" },
      { number: 5, name: "Tupou Vaa'i" },
      { number: 6, name: "Wallace Sititi" },
      { number: 7, name: "Luke Jacobson" },
      { number: 8, name: "Ardie Savea (C)" },
      { number: 9, name: "Cam Roigard" },
      { number: 10, name: "Ruben Love" },
      { number: 11, name: "Leroy Carter" },
      { number: 12, name: "Jordie Barrett" },
      { number: 13, name: "Billy Proctor" },
      { number: 14, name: "Will Jordan" },
      { number: 15, name: "Damian McKenzie" },
    ],
    homeBench: [
      { number: 16, name: "Samisoni Taukei'aho" },
      { number: 17, name: "George Bower" },
      { number: 18, name: "Pasilio Tosi" },
      { number: 19, name: "Josh Lord" },
      { number: 20, name: "Anton Segner" },
      { number: 21, name: "Cortez Ratima" },
      { number: 22, name: "Anton Lienert-Brown" },
      { number: 23, name: "Josh Moorby" },
    ],
    awayStarting: [
      { number: 1, name: "Danilo Fischetti" },
      { number: 2, name: "Tommaso Di Bartolomeo" },
      { number: 3, name: "Marco Riccioni" },
      { number: 4, name: "Niccolò Cannone" },
      { number: 5, name: "Andrea Zambonin" },
      { number: 6, name: "Ross Vintcent" },
      { number: 7, name: "Michele Lamaro (C)" },
      { number: 8, name: "Lorenzo Cannone" },
      { number: 9, name: "Stephen Varney" },
      { number: 10, name: "Paolo Garbisi" },
      { number: 11, name: "Louis Lynagh" },
      { number: 12, name: "Tommaso Menoncello" },
      { number: 13, name: "Juan Ignacio Brex" },
      { number: 14, name: "Malik Faissal" },
      { number: 15, name: "Tommaso Allan" },
    ],
    awayBench: [
      { number: 16, name: "Gianmarco Lucchesi" },
      { number: 17, name: "Mirco Spagnolo" },
      { number: 18, name: "Muhamed Hasa" },
      { number: 19, name: "Giulio Marini" },
      { number: 20, name: "Federico Ruzza" },
      { number: 21, name: "Riccardo Favretto" },
      { number: 22, name: "Alessandro Garbisi" },
      { number: 23, name: "Leonardo Marin" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Angus Bell" },
      { number: 2, name: "Josh Nasser" },
      { number: 3, name: "Allan Alaalatoa" },
      { number: 4, name: "Josh Canham" },
      { number: 5, name: "Jeremy Williams" },
      { number: 6, name: "Rob Valetini" },
      { number: 7, name: "Fraser McReight" },
      { number: 8, name: "Harry Wilson (C)" },
      { number: 9, name: "Ryan Lonergan" },
      { number: 10, name: "Declan Meredith" },
      { number: 11, name: "Dylan Pietsch" },
      { number: 12, name: "Len Ikitau" },
      { number: 13, name: "Joseph-Aukuso Suaalii" },
      { number: 14, name: "Max Jorgensen" },
      { number: 15, name: "Tom Wright" },
    ],
    homeBench: [
      { number: 16, name: "Brandon Paenga-Amosa" },
      { number: 17, name: "James Slipper" },
      { number: 18, name: "Taniela Tupou" },
      { number: 19, name: "Lachlan Shaw" },
      { number: 20, name: "Nick Champion de Crespigny" },
      { number: 21, name: "Tate McDermott" },
      { number: 22, name: "Jock Campbell" },
      { number: 23, name: "Filipo Daugunu" },
    ],
    awayStarting: [
      { number: 1, name: "Moses Alo-Emile" },
      { number: 2, name: "Peato Mauvaka" },
      { number: 3, name: "Demba Bamba" },
      { number: 4, name: "Florian Verhaeghe" },
      { number: 5, name: "Emmanuel Meafou" },
      { number: 6, name: "Lenni Nouchi" },
      { number: 7, name: "Oscar Jegou" },
      { number: 8, name: "Marko Gazzotti" },
      { number: 9, name: "Maxime Lucu (C)" },
      { number: 10, name: "Romain Ntamack" },
      { number: 11, name: "Aaron Grandidier-Nkanang" },
      { number: 12, name: "Yoram Moefana" },
      { number: 13, name: "Fabien Brau-Boirie" },
      { number: 14, name: "Theo Attissogbe" },
      { number: 15, name: "Matthieu Jalibert" },
    ],
    awayBench: [
      { number: 16, name: "Maxime Lamothe" },
      { number: 17, name: "Jefferson Poirot" },
      { number: 18, name: "Tevita Tatafu" },
      { number: 19, name: "Hugo Auradou" },
      { number: 20, name: "Thomas Staniforth" },
      { number: 21, name: "Killian Tixeront" },
      { number: 22, name: "Nolann Le Garrec" },
      { number: 23, name: "Kalvin Gourgues" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Takato Okabe" },
      { number: 2, name: "Mamoru Harada" },
      { number: 3, name: "Shuhei Takeuchi" },
      { number: 4, name: "Harry Hockings" },
      { number: 5, name: "Warner Dearns (C)" },
      { number: 6, name: "Ben Gunter" },
      { number: 7, name: "Kanji Shimokawa" },
      { number: 8, name: "Jack Cornelsen" },
      { number: 9, name: "Naoto Saito" },
      { number: 10, name: "Ryunosuke Ito" },
      { number: 11, name: "Taira Main" },
      { number: 12, name: "Yuya Hirose" },
      { number: 13, name: "Dylan Riley" },
      { number: 14, name: "Kazuma Ueda" },
      { number: 15, name: "Takuro Matsunaga" },
    ],
    homeBench: [
      { number: 16, name: "Hayate Era" },
      { number: 17, name: "Sojiro Otsuka" },
      { number: 18, name: "Keijiro Tamefusa" },
      { number: 19, name: "Michael Stolberg" },
      { number: 20, name: "Michael Leitch" },
      { number: 21, name: "Tiennan Costley" },
      { number: 22, name: "Itsuki Kamimura" },
      { number: 23, name: "Sam Greene" },
    ],
    awayStarting: [
      { number: 1, name: "Tom O'Toole" },
      { number: 2, name: "Ronan Kelleher" },
      { number: 3, name: "Thomas Clarkson" },
      { number: 4, name: "Tadhg Beirne (C)" },
      { number: 5, name: "James Ryan" },
      { number: 6, name: "Jack Conan" },
      { number: 7, name: "Nick Timoney" },
      { number: 8, name: "Sean Jansen" },
      { number: 9, name: "Craig Casey" },
      { number: 10, name: "Ciaran Frawley" },
      { number: 11, name: "Jacob Stockdale" },
      { number: 12, name: "Stuart McCloskey" },
      { number: 13, name: "Robbie Henshaw" },
      { number: 14, name: "Jimmy O'Brien" },
      { number: 15, name: "Jamie Osborne" },
    ],
    awayBench: [
      { number: 16, name: "Tom Stewart" },
      { number: 17, name: "Billy Bohan" },
      { number: 18, name: "Sam Illo" },
      { number: 19, name: "Cormac Izuchukwu" },
      { number: 20, name: "Bryn Ward" },
      { number: 21, name: "Nathan Doak" },
      { number: 22, name: "Harry Byrne" },
      { number: 23, name: "Bundee Aki" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Eroni Mawi" },
      { number: 2, name: "Tevita Ikanivere (C)" },
      { number: 3, name: "Mesake Doge" },
      { number: 4, name: "Tevita Ratuva" },
      { number: 5, name: "Isoa Nasilasila" },
      { number: 6, name: "Peceli Yato" },
      { number: 7, name: "Lekima Tagitagivalu" },
      { number: 8, name: "Levani Botia" },
      { number: 9, name: "Simione Kuruvoli" },
      { number: 10, name: "Caleb Muntz" },
      { number: 11, name: "Vuate Karawalevu" },
      { number: 12, name: "Josua Tuisova" },
      { number: 13, name: "Kalaveti Ravouvou" },
      { number: 14, name: "Jiuta Wainiqolo" },
      { number: 15, name: "Salesi Rayasi" },
    ],
    homeBench: [
      { number: 16, name: "Tevita Matavesi" },
      { number: 17, name: "Livai Matave" },
      { number: 18, name: "Peni Ravai" },
      { number: 19, name: "Temo Mayanavanua" },
      { number: 20, name: "Elia Canakaivata" },
      { number: 21, name: "Pita-Gus Sowakula" },
      { number: 22, name: "Frank Lomani" },
      { number: 23, name: "Isaiah Armstrong-Ravula" },
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
      { number: 11, name: "Tommy Freeman" },
      { number: 12, name: "Seb Atkinson" },
      { number: 13, name: "Henry Slade" },
      { number: 14, name: "Immanuel Feyi-Waboso" },
      { number: 15, name: "Marcus Smith" },
    ],
    awayBench: [
      { number: 16, name: "Luke Cowan-Dickie" },
      { number: 17, name: "Asher Opoku-Fordjour" },
      { number: 18, name: "George Kloska" },
      { number: 19, name: "Tom Curry" },
      { number: 20, name: "Henry Pollock" },
      { number: 21, name: "Alex Mitchell" },
      { number: 22, name: "Benhard Janse van Rensburg" },
      { number: 23, name: "Noah Caluori" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Boan Venter" },
      { number: 2, name: "Johan Grobbelaar" },
      { number: 3, name: "Wilco Louw" },
      { number: 4, name: "Cobus Wiese" },
      { number: 5, name: "Ruan Nortje" },
      { number: 6, name: "Paul de Villiers" },
      { number: 7, name: "Pieter-Steph du Toit (C)" },
      { number: 8, name: "Evan Roos" },
      { number: 9, name: "Embrose Papier" },
      { number: 10, name: "Handré Pollard" },
      { number: 11, name: "Canan Moodie" },
      { number: 12, name: "Damian Willemse" },
      { number: 13, name: "Jesse Kriel" },
      { number: 14, name: "Edwill van der Merwe" },
      { number: 15, name: "Aphelele Fassi" },
    ],
    homeBench: [
      { number: 16, name: "Jan-Hendrik Wessels" },
      { number: 17, name: "Ntuthuko Mchunu" },
      { number: 18, name: "Zach Porthen" },
      { number: 19, name: "Ben-Jason Dixon" },
      { number: 20, name: "Vincent Tshituka" },
      { number: 21, name: "Elrigh Louw" },
      { number: 22, name: "Grant Williams" },
      { number: 23, name: "Quan Horn" },
    ],
    awayStarting: [
      { number: 1, name: "Pierre Schoeman" },
      { number: 2, name: "Ewan Ashman" },
      { number: 3, name: "Zander Fagerson" },
      { number: 4, name: "Gregor Brown" },
      { number: 5, name: "Scott Cummings" },
      { number: 6, name: "Matt Fagerson" },
      { number: 7, name: "Rory Darge" },
      { number: 8, name: "Jack Dempsey" },
      { number: 9, name: "Ben White" },
      { number: 10, name: "Finn Russell" },
      { number: 11, name: "Jamie Dobie" },
      { number: 12, name: "Sione Tuipulotu (C)" },
      { number: 13, name: "Rory Hutchinson" },
      { number: 14, name: "Kyle Steyn" },
      { number: 15, name: "Kyle Rowe" },
    ],
    awayBench: [
      { number: 16, name: "Gregor Hiddleston" },
      { number: 17, name: "Rory Sutherland" },
      { number: 18, name: "Will Hurd" },
      { number: 19, name: "Alex Samuel" },
      { number: 20, name: "Josh Bayliss" },
      { number: 21, name: "Magnus Bradbury" },
      { number: 22, name: "Tom Jordan" },
      { number: 23, name: "Stafford McDowall" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Boris Wenger" },
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
      { number: 13, name: "Lucio Cinti" },
      { number: 14, name: "Bautista Delguy" },
      { number: 15, name: "Santiago Carreras" },
    ],
    homeBench: [
      { number: 16, name: "Ignacio Ruiz" },
      { number: 17, name: "Mayco Vivas" },
      { number: 18, name: "Francisco Coria Marchetti" },
      { number: 19, name: "Franco Molina" },
      { number: 20, name: "Pablo Matera" },
      { number: 21, name: "Simon Benitez Cruz" },
      { number: 22, name: "Matias Moroni" },
      { number: 23, name: "Ignacio Mendy" },
    ],
    awayStarting: [
      { number: 1, name: "Rhys Carre" },
      { number: 2, name: "Dewi Lake (C)" },
      { number: 3, name: "Dillon Lewis" },
      { number: 4, name: "Ben Carter" },
      { number: 5, name: "Adam Beard" },
      { number: 6, name: "James Botham" },
      { number: 7, name: "Jac Morgan" },
      { number: 8, name: "Aaron Wainwright" },
      { number: 9, name: "Tomos Williams" },
      { number: 10, name: "Sam Costelow" },
      { number: 11, name: "Josh Adams" },
      { number: 12, name: "Joe Hawkins" },
      { number: 13, name: "Eddie James" },
      { number: 14, name: "Ellis Mee" },
      { number: 15, name: "Blair Murray" },
    ],
    awayBench: [
      { number: 16, name: "Ryan Elias" },
      { number: 17, name: "Nicky Smith" },
      { number: 18, name: "Ben Warren" },
      { number: 19, name: "Teddy Williams" },
      { number: 20, name: "Kane James" },
      { number: 21, name: "Kieran Hardy" },
      { number: 22, name: "Max Llewellyn" },
      { number: 23, name: "Louis Rees-Zammit" },
    ],
  },
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
  lineups: {
    homeStarting: [
      { number: 1, name: "Babalwa Latsha" },
      { number: 2, name: "Micke Gunter" },
      { number: 3, name: "Sanelisiwe Charlie" },
      { number: 4, name: "Danelle Lochner" },
      { number: 5, name: "Nomsa Mokwai" },
      { number: 6, name: "Sizophila Solontsi" },
      { number: 7, name: "Lerato Makua" },
      { number: 8, name: "Catha Jacobs" },
      { number: 9, name: "Unam Tose" },
      { number: 10, name: "Libbie Janse van Rensburg" },
      { number: 11, name: "Ayanda Malinga" },
      { number: 12, name: "Aphiwe Ngwevu" },
      { number: 13, name: "Byrhandré Dolf" },
      { number: 14, name: "Jakkie Cilliers" },
      { number: 15, name: "Shaunique Alexander" },
    ],
    homeBench: [
      { number: 16, name: "Anushka Groenewald" },
      { number: 17, name: "Yonela Ngxingolo" },
      { number: 18, name: "Thandile Mazwi" },
      { number: 19, name: "Vainah Ubisi" },
      { number: 20, name: "Anathi Qolo" },
      { number: 21, name: "Sinelitha Noxeke" },
      { number: 22, name: "Eloise Webb" },
      { number: 23, name: "Alichia Arries" },
    ],
    awayStarting: [
      { number: 1, name: "Elizabeth Cook" },
      { number: 2, name: "Joanna Kitlinski" },
      { number: 3, name: "Tori Deters" },
      { number: 4, name: "Rachel Ehrecke" },
      { number: 5, name: "Hallie Taufoou" },
      { number: 6, name: "Hann Humphreys" },
      { number: 7, name: "Freda Tafuna" },
      { number: 8, name: "Georgie Perris-Redding (C)" },
      { number: 9, name: "Olivia Ortiz" },
      { number: 10, name: "Kristin Bitter" },
      { number: 11, name: "Eti Haungatau" },
      { number: 12, name: "Bella Vogel" },
      { number: 13, name: "Katana Howard" },
      { number: 14, name: "Tina-Marie Ioane" },
      { number: 15, name: "Ashley Cowdrey" },
    ],
    awayBench: [
      { number: 16, name: "Chloe Hill-Huse" },
      { number: 17, name: "Catherine Benson" },
      { number: 18, name: "Charli Jacoby" },
      { number: 19, name: "Erica Jarrell" },
      { number: 20, name: "Alycia Washington" },
      { number: 21, name: "Tess Feury" },
      { number: 22, name: "Megan Foster" },
      { number: 23, name: "Emily Henrich" },
    ],
  },
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
    { category: "Captain", player: "TBD", value: "Chile" },
    { category: "Captain", player: "TBD", value: "Hong Kong China" },
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
    { category: "Captain", player: "TBD", value: "Canada" },
    { category: "Captain", player: "TBD", value: "Portugal" },
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