import type { MatchDetails } from "./types";

// ==================================================
// MATCH DETAILS 2026/27 — MEN'S DOMESTIC
// UNITED RUGBY CHAMPIONSHIP
// ==================================================

export const matchDetailsDomesticMen: MatchDetails[] = [

  // ==================================================
  // URC 2026/27 — ROUND 1
  // ==================================================

  {
    matchKey: "benetton-vs-dragons",
    highlightsUrl: "https://www.youtube.com/watch?v=64V9jWnjamo",
    timeline: [
      { minute: "0'", label: "Kick-off — Stadio Monigo, Treviso" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    performances: [
      { category: "Venue", player: "Stadio Monigo", value: "Treviso" },
      { category: "Referee", player: "Christopher Allison", value: "SARU" },
    ],
  },

  {
    matchKey: "connacht-vs-stormers",
    highlightsUrl: "https://www.youtube.com/watch?v=4ZDv2Y8On9g",
    timeline: [
      { minute: "0'", label: "Kick-off — Dexcom Stadium, Galway" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    performances: [
      { category: "Venue", player: "Dexcom Stadium", value: "Galway" },
      { category: "Referee", player: "Sam Grove-White", value: "SRU" },
    ],
  },

  {
    matchKey: "ulster-vs-edinburgh",
    highlightsUrl: "https://www.youtube.com/watch?v=REM9BUOJ1Vo",
    timeline: [
      { minute: "0'", label: "Kick-off — Affidea Stadium, Belfast" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    lineups: {
      homeStarting: [
        { number: 1, name: "Eric O'Sullivan" },
        { number: 2, name: "James McCormick" },
        { number: 3, name: "Eduardo Bello" },
        { number: 4, name: "Eli Snyman" },
        { number: 5, name: "Ben Donnell" },
        { number: 6, name: "David McCann" },
        { number: 7, name: "Martin Moloney" },
        { number: 8, name: "James McNabney" },
        { number: 9, name: "Conor McKee" },
        { number: 10, name: "Jack Murphy" },
        { number: 11, name: "Aitzol Arenzana-King" },
        { number: 12, name: "Jamie Benson" },
        { number: 13, name: "Ben Carson" },
        { number: 14, name: "Robert Baloucoune" },
        { number: 15, name: "Michael Lowry (C)" },
      ],
      homeBench: [
        { number: 16, name: "Henry Walker" },
        { number: 17, name: "Tom McAllister" },
        { number: 18, name: "Keynan Knox" },
        { number: 19, name: "Harry Sheridan" },
        { number: 20, name: "James McKillop" },
        { number: 21, name: "Matthew Devine" },
        { number: 22, name: "Jake Flannery" },
        { number: 23, name: "Zac Ward" },
      ],
      awayStarting: [],
      awayBench: [],
    },
    performances: [
      { category: "Coach", player: "Richie Murphy", value: "Ulster" },
      { category: "Captain", player: "Michael Lowry", value: "Ulster" },
      { category: "Venue", player: "Affidea Stadium", value: "Belfast" },
      { category: "Referee", player: "Federico Vedovelli", value: "FIR" },
      {
        category: "Note",
        player: "Eight Ulster debutants",
        value: "Included in matchday squad",
      },
    ],
  },

  {
    matchKey: "lions-vs-leinster",
    highlightsUrl: "https://www.youtube.com/watch?v=E1Y01d6DsH0",
    timeline: [
      { minute: "0'", label: "Kick-off — 10bet Ellis Park, Johannesburg" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    lineups: {
      homeStarting: [
        { number: 1, name: "Boan Venter" },
        { number: 2, name: "PJ Botha" },
        { number: 3, name: "Sebastian de Klerk" },
        { number: 4, name: "Etienne Oosthuizen" },
        { number: 5, name: "Ruan Delport" },
        { number: 6, name: "Siba Mahashe" },
        { number: 7, name: "Batho Hlekani" },
        { number: 8, name: "Francke Horne (C)" },
        { number: 9, name: "Nico Steyn" },
        { number: 10, name: "Chris Smith" },
        { number: 11, name: "Erich Cronje" },
        { number: 12, name: "Richard Kriel" },
        { number: 13, name: "Henco van Wyk" },
        { number: 14, name: "Kelly Mpeku" },
        { number: 15, name: "Boeta Chamberlain" },
      ],
      homeBench: [
        { number: 16, name: "Morne Brandon" },
        { number: 17, name: "SJ Kotze" },
        { number: 18, name: "RF Schoeman" },
        { number: 19, name: "Hyron Andrews" },
        { number: 20, name: "Siba Qoma" },
        { number: 21, name: "JC Pretorius" },
        { number: 22, name: "Zian Cilliers" },
        { number: 23, name: "Ethan Adams" },
      ],
      awayStarting: [
        { number: 1, name: "Alex Usanov" },
        { number: 2, name: "Gus McCarthy" },
        { number: 3, name: "Andrew Porter" },
        { number: 4, name: "Ryan Baird" },
        { number: 5, name: "Conor O'Tighearnaigh" },
        { number: 6, name: "Max Deegan (C)" },
        { number: 7, name: "Scott Penny" },
        { number: 8, name: "Josh Ericson" },
        { number: 9, name: "Fintan Gunne" },
        { number: 10, name: "Caspar Gabriel" },
        { number: 11, name: "Andrew Osborne" },
        { number: 12, name: "Charlie Tector" },
        { number: 13, name: "Hugh Cooney" },
        { number: 14, name: "Tommy O'Brien" },
        { number: 15, name: "Todd Lawlor" },
      ],
      awayBench: [
        { number: 16, name: "Stephen Smyth" },
        { number: 17, name: "Peter Dooley" },
        { number: 18, name: "Niall Smyth" },
        { number: 19, name: "Brian Deeney" },
        { number: 20, name: "Oliver Coffey" },
        { number: 21, name: "Harry Byrne" },
        { number: 22, name: "Ciarán Mangan" },
        { number: 23, name: "Dylan McNeice" },
      ],
    },
    performances: [
      { category: "Coach", player: "Ivan van Rooyen", value: "Lions" },
      { category: "Captain", player: "Francke Horne", value: "Lions" },
      { category: "Captain", player: "Max Deegan", value: "Leinster" },
      { category: "Venue", player: "10bet Ellis Park", value: "Johannesburg" },
      { category: "Referee", player: "Ben Breakspear", value: "WRU" },
      {
        category: "Note",
        player: "Todd Lawlor",
        value: "Uncapped Leinster start at fullback",
      },
    ],
  },

  {
    matchKey: "sharks-vs-ospreys",
    highlightsUrl: "https://www.youtube.com/watch?v=CpxAbDlAEtA",
    timeline: [
      { minute: "0'", label: "Kick-off — Hollywoodbets Kings Park, Durban" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    performances: [
      {
        category: "Venue",
        player: "Hollywoodbets Kings Park",
        value: "Durban",
      },
      { category: "Referee", player: "Gianluca Gnecchi", value: "FIR" },
    ],
  },

  {
    matchKey: "munster-vs-glasgow-warriors",
    highlightsUrl: "https://www.youtube.com/watch?v=ple50BaeYwM",
    timeline: [
      { minute: "0'", label: "Kick-off — Thomond Park, Limerick" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    lineups: {
      homeStarting: [
        { number: 1, name: "Michael Milne" },
        { number: 2, name: "Diarmuid Barron (C)" },
        { number: 3, name: "Kieran Brookes" },
        { number: 4, name: "Evan O'Connell" },
        { number: 5, name: "Fineen Wycherley" },
        { number: 6, name: "Jack O'Donoghue" },
        { number: 7, name: "Alex Kendellen" },
        { number: 8, name: "Gavin Coombes" },
        { number: 9, name: "Ben O'Donovan" },
        { number: 10, name: "JJ Hanrahan" },
        { number: 11, name: "Diarmuid Kilgallen" },
        { number: 12, name: "Alex Nankivell" },
        { number: 13, name: "Seán O'Brien" },
        { number: 14, name: "Ben O'Connor" },
        { number: 15, name: "Mike Haley" },
      ],
      homeBench: [
        { number: 16, name: "Marnus van der Merwe" },
        { number: 17, name: "Josh Wycherley" },
        { number: 18, name: "Michael Ala'alatoa" },
        { number: 19, name: "Brian Gleeson" },
        { number: 20, name: "John Hodnett" },
        { number: 21, name: "Jake O'Riordan" },
        { number: 22, name: "Charlie O'Shea" },
        { number: 23, name: "Dan Kelly" },
      ],
      awayStarting: [
        { number: 1, name: "Patrick Schickerling" },
        { number: 2, name: "Gregor Hiddleston" },
        { number: 3, name: "Murphy Walker" },
        { number: 4, name: "Gregor Brown" },
        { number: 5, name: "Max Williamson" },
        { number: 6, name: "Ally Miller" },
        { number: 7, name: "Rory Darge" },
        { number: 8, name: "Matt Fagerson" },
        { number: 9, name: "George Horne" },
        { number: 10, name: "Dan Lancaster" },
        { number: 11, name: "Ollie Smith" },
        { number: 12, name: "Stafford McDowall (C)" },
        { number: 13, name: "Kyle Rowe" },
        { number: 14, name: "Josh McKay" },
        { number: 15, name: "Seb Stephen" },
      ],
      awayBench: [
        { number: 16, name: "Nathan McBeth" },
        { number: 17, name: "Sam Talakai" },
        { number: 18, name: "Scott Cummings" },
        { number: 19, name: "Angus Fraser" },
        { number: 20, name: "Macenzzie Duncan" },
        { number: 21, name: "Callum Reidy" },
        { number: 22, name: "Bayley Kuenzle" },
        { number: 23, name: "Jamie Dobie" },
      ],
    },
    performances: [
      { category: "Coach", player: "Clayton McMillan", value: "Munster" },
      { category: "Captain", player: "Diarmuid Barron", value: "Munster" },
      {
        category: "Captain",
        player: "Stafford McDowall",
        value: "Glasgow Warriors",
      },
      { category: "Venue", player: "Thomond Park", value: "Limerick" },
      { category: "Referee", player: "Morné Ferreira", value: "SARU" },
      {
        category: "Note",
        player: "Kieran Brookes & Marnus van der Merwe",
        value: "Munster debuts",
      },
    ],
  },

  {
    matchKey: "zebre-parma-vs-bulls",
    highlightsUrl: "https://www.youtube.com/watch?v=fhjqsDpXBpQ",
    timeline: [
      { minute: "0'", label: "Kick-off — Stadio Sergio Lanfranchi, Parma" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    performances: [
      {
        category: "Venue",
        player: "Stadio Sergio Lanfranchi",
        value: "Parma",
      },
      { category: "Referee", player: "Andrew Brace", value: "IRFU" },
    ],
  },

  {
    matchKey: "scarlets-vs-cardiff",
    highlightsUrl: "https://www.youtube.com/watch?v=ZNVD0Apr088",
    timeline: [
      { minute: "0'", label: "Kick-off — Parc y Scarlets, Llanelli" },
      { minute: "40'", label: "Half Time" },
      { minute: "80'", label: "Full Time" },
    ],
    performances: [
      { category: "Venue", player: "Parc y Scarlets", value: "Llanelli" },
      { category: "Referee", player: "Adam Jones", value: "WRU" },
    ],
  },

  // ==================================================
  // URC 2026/27 — ROUND 2
  // ==================================================
{
  matchKey: "cardiff-vs-zebre-urc",
  timeline: [
    { minute: "0'", label: "Kick-off — Cardiff Arms Park, Cardiff" },
    { minute: "40'", label: "Half Time — Cardiff 26–8 Zebre" },
    { minute: "80'", label: "Full Time — Cardiff 40–27 Zebre" },
  ],
  highlightsUrl: "https://www.youtube.com/watch?v=f7-X_BAlUlw",
  matchStats: {
    home: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
    away: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
  },
  performances: [
    { category: "Result", player: "Cardiff 40–27 Zebre", value: "Bonus-point win" },
    { category: "Coach", player: "Corniel van Zyl", value: "Cardiff Rugby" },
    { category: "Coach", player: "TBD", value: "Zebre" },
    { category: "Captain", player: "TBD", value: "Cardiff Rugby" },
    { category: "Captain", player: "TBD", value: "Zebre" },
    { category: "Venue", player: "Cardiff Arms Park", value: "Cardiff" },
    { category: "Note", player: "Tom Bowen (2 tries), Teddy Williams, Javan Sebastian, Taine Basham, Alex Mann", value: "Cardiff try scorers" },
  ],
},

{
  matchKey: "benetton-vs-connacht-urc",
  timeline: [
    { minute: "0'", label: "Kick-off — Stadio Comunale di Monigo, Treviso" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time — Benetton 19–22 Connacht" },
  ],
  highlightsUrl: "https://www.youtube.com/watch?v=lPnMMO2qonU",
  matchStats: {
    home: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
    away: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
  },
  performances: [
    { category: "Result", player: "Benetton 19–22 Connacht", value: "Connacht bonus-point win" },
    { category: "Coach", player: "TBD", value: "Benetton" },
    { category: "Coach", player: "TBD", value: "Connacht" },
    { category: "Captain", player: "TBD", value: "Benetton" },
    { category: "Captain", player: "TBD", value: "Connacht" },
    { category: "Venue", player: "Stadio Comunale di Monigo", value: "Treviso" },
  ],
},

{
  matchKey: "dragons-vs-scarlets-urc",
  timeline: [
    { minute: "0'", label: "Kick-off — Rodney Parade, Newport" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time — Dragons 38–26 Scarlets" },
  ],
  highlightsUrl: "https://www.youtube.com/watch?v=4cagm_V_9Zc",
  matchStats: {
    home: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
    away: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
  },
  performances: [
    { category: "Result", player: "Dragons 38–26 Scarlets", value: "Both teams scored bonus points" },
    { category: "Coach", player: "TBD", value: "Dragons" },
    { category: "Coach", player: "TBD", value: "Scarlets" },
    { category: "Captain", player: "TBD", value: "Dragons" },
    { category: "Captain", player: "TBD", value: "Scarlets" },
    { category: "Venue", player: "Rodney Parade", value: "Newport" },
  ],
},

{
  matchKey: "glasgow-vs-ulster-urc",
  timeline: [
    { minute: "0'", label: "Kick-off — Scotstoun Stadium, Glasgow" },
    { minute: "40'", label: "Half Time" },
    { minute: "80'", label: "Full Time — Glasgow 33–33 Ulster" },
  ],
  highlightsUrl: "https://www.youtube.com/watch?v=3k-gB3Ch7To",
  matchStats: {
    home: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
    away: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
  },
  performances: [
    { category: "Result", player: "Glasgow 33–33 Ulster", value: "10-try draw, both teams bonus points" },
    { category: "Coach", player: "TBD", value: "Glasgow Warriors" },
    { category: "Coach", player: "TBD", value: "Ulster" },
    { category: "Captain", player: "TBD", value: "Glasgow Warriors" },
    { category: "Captain", player: "TBD", value: "Ulster" },
    { category: "Venue", player: "Scotstoun Stadium", value: "Glasgow" },
    { category: "Note", player: "Kyle Rowe (2 tries for Glasgow)", value: "Key performer" },
  ],
},

{
  matchKey: "lions-vs-ospreys-urc",
  timeline: [
    { minute: "0'", label: "Kick-off — Ellis Park, Johannesburg" },
    { minute: "40'", label: "Half Time — Lions 10–12 Ospreys" },
    { minute: "80'", label: "Full Time — Lions 35–19 Ospreys" },
  ],
  highlightsUrl: "https://www.youtube.com/watch?v=lRAHRN9ZYzk",
  matchStats: {
    home: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
    away: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
  },
  performances: [
    { category: "Result", player: "Lions 35–19 Ospreys", value: "Bonus-point win" },
    { category: "Coach", player: "TBD", value: "Lions" },
    { category: "Coach", player: "TBD", value: "Ospreys" },
    { category: "Captain", player: "Francke Horne", value: "Lions" },
    { category: "Captain", player: "TBD", value: "Ospreys" },
    { category: "Venue", player: "Ellis Park", value: "Johannesburg" },
    { category: "Note", player: "Kelly Mpeku (2 tries), Erich Cronjé, PJ Botha, Morné Brandon, Boeta Chamberlain", value: "Lions try scorers" },
  ],
},

{
  matchKey: "sharks-vs-leinster-urc",
  timeline: [
    { minute: "0'", label: "Kick-off — Hollywoodbets Kings Park, Durban" },
    { minute: "40'", label: "Half Time — Sharks 14–7 Leinster" },
    { minute: "80'", label: "Full Time — Sharks 26–20 Leinster" },
  ],
  highlightsUrl: "https://www.youtube.com/watch?v=zj8dQDMxcwo",
  matchStats: {
    home: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
    away: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
  },
  performances: [
    { category: "Result", player: "Sharks 26–20 Leinster", value: "Bonus-point win – Sharks top the table" },
    { category: "Coach", player: "TBD", value: "Sharks" },
    { category: "Coach", player: "TBD", value: "Leinster" },
    { category: "Captain", player: "TBD", value: "Sharks" },
    { category: "Captain", player: "TBD", value: "Leinster" },
    { category: "Venue", player: "Hollywoodbets Kings Park", value: "Durban" },
    { category: "Note", player: "Manu Tshituka, Litelihle Bester, André Esterhuizen, Edwill van der Merwe", value: "Sharks try scorers" },
  ],
},

{
  matchKey: "munster-vs-bulls-urc",
  timeline: [
    { minute: "0'", label: "Kick-off — Thomond Park, Limerick" },
    { minute: "40'", label: "Half Time — Munster 14–14 Bulls" },
    { minute: "80'", label: "Full Time — Munster 26–22 Bulls" },
  ],
  highlightsUrl: "https://www.youtube.com/watch?v=O4nTnSGdrvs",
  matchStats: {
    home: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
    away: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
  },
  performances: [
    { category: "Result", player: "Munster 26–22 Bulls", value: "Both teams bonus points" },
    { category: "Coach", player: "TBD", value: "Munster" },
    { category: "Coach", player: "Johan Ackermann", value: "Bulls" },
    { category: "Captain", player: "TBD", value: "Munster" },
    { category: "Captain", player: "TBD", value: "Bulls" },
    { category: "Venue", player: "Thomond Park", value: "Limerick" },
    { category: "Note", player: "Charlie O’Shea (2 tries) for Munster; Ruan Vermaak, Francois Klopper, Jeandré Rudolph for Bulls", value: "Key try scorers" },
  ],
},

{
  matchKey: "edinburgh-vs-stormers-urc",
  timeline: [
    { minute: "0'", label: "Kick-off — Hive Stadium, Edinburgh" },
    { minute: "40'", label: "Half Time — Edinburgh 3–0 Stormers" },
    { minute: "80'", label: "Full Time — Edinburgh 17–13 Stormers" },
  ],
  highlightsUrl: "https://www.youtube.com/watch?v=zi0QDoJhB7Q",
  matchStats: {
    home: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
    away: { metresMade: 0, carries: 0, defendersBeaten: 0, cleanBreaks: 0, offloads: 0, tacklesMade: 0, tacklesMissed: 0, turnoversWon: 0, penaltiesConceded: 0 },
  },
  performances: [
    { category: "Result", player: "Edinburgh 17–13 Stormers", value: "Stormers losing bonus point" },
    { category: "Coach", player: "Sean Everitt", value: "Edinburgh" },
    { category: "Coach", player: "John Dobson", value: "Stormers" },
    { category: "Captain", player: "Matt Currie / Magnus Bradbury", value: "Edinburgh" },
    { category: "Captain", player: "Ruhan Nel", value: "Stormers" },
    { category: "Venue", player: "Hive Stadium", value: "Edinburgh" },
    { category: "Note", player: "Hacjivah Dayimani try for Stormers", value: "Key moment" },
  ],
},

];