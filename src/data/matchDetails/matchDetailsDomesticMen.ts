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
    highlightsUrl: "",
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
    highlightsUrl: "",
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
    highlightsUrl: "",
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
    highlightsUrl: "",
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
    highlightsUrl: "",
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
    highlightsUrl: "",
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
    highlightsUrl: "",
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
];