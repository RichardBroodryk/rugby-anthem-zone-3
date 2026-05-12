// --------------------------------------------------
// RAZ SYSTEM — TABLES 2026 (MEN + WOMEN)
// Phase 4.4 — GENDER STRUCTURED (FIXED)
// --------------------------------------------------

export type LeagueTableRow = {
  position: number;
  team: string;
  coach: string;
  pointsFor: number;
  pointsAgainst: number;
  leaguePoints: number;
};

export const tables2026: Record<string, LeagueTableRow[]> = {
  // ==================================================
  // URC
  // ==================================================

  "urc-men": [
  {
    position: 1,
    team: "Glasgow Warriors",
    coach: "Franco Smith",
    pointsFor: 453,
    pointsAgainst: 316,
    leaguePoints: 60,
  },
  {
    position: 2,
    team: "Stormers",
    coach: "John Dobson",
    pointsFor: 488,
    pointsAgainst: 322,
    leaguePoints: 59,
  },
  {
    position: 3,
    team: "Leinster",
    coach: "Leo Cullen",
    pointsFor: 447,
    pointsAgainst: 356,
    leaguePoints: 58,
  },
  {
    position: 4,
    team: "Bulls",
    coach: "Johan Ackerman",
    pointsFor: 521,
    pointsAgainst: 387,
    leaguePoints: 54,
  },
  {
    position: 5,
    team: "Lions",
    coach: "Ivan van Rooyen",
    pointsFor: 515,
    pointsAgainst: 449,
    leaguePoints: 53,
  },
  {
    position: 6,
    team: "Munster",
    coach: "Graham Rowntree",
    pointsFor: 430,
    pointsAgainst: 380,
    leaguePoints: 51,
  },
  {
    position: 7,
    team: "Cardiff",
    coach: "Matt Sherratt",
    pointsFor: 0,
    pointsAgainst: 0,
    leaguePoints: 50,
  },
  {
    position: 8,
    team: "Ulster",
    coach: "Dan McFarland",
    pointsFor: 0,
    pointsAgainst: 0,
    leaguePoints: 50,
  },
],

  "urc-women": [
    { position: 1, team: "Leinster Women", coach: "Ben Gissing", pointsFor: 360, pointsAgainst: 210, leaguePoints: 56 },
    { position: 2, team: "Munster Women", coach: "Denis Fogarty", pointsFor: 340, pointsAgainst: 230, leaguePoints: 52 },
    { position: 3, team: "Ulster Women", coach: "Neal Doak", pointsFor: 320, pointsAgainst: 250, leaguePoints: 48 },
    { position: 4, team: "Connacht Women", coach: "Colin Boyle", pointsFor: 300, pointsAgainst: 260, leaguePoints: 46 },
    { position: 5, team: "Edinburgh Women", coach: "Claire Cruikshank", pointsFor: 290, pointsAgainst: 270, leaguePoints: 44 },
    { position: 6, team: "Glasgow Women", coach: "Chris Laidlaw", pointsFor: 280, pointsAgainst: 280, leaguePoints: 42 },
    { position: 7, team: "Stormers Women", coach: "Louis Koen", pointsFor: 260, pointsAgainst: 300, leaguePoints: 38 },
    { position: 8, team: "Bulls Women", coach: "Nollis Marais", pointsFor: 250, pointsAgainst: 310, leaguePoints: 36 },
  ],

  // ==================================================
  // PREMIERSHIP
  // ==================================================

  "premiership-men": [
    { position: 1, team: "Saracens", coach: "Mark McCall", pointsFor: 410, pointsAgainst: 260, leaguePoints: 62 },
    { position: 2, team: "Leicester Tigers", coach: "Dan McKellar", pointsFor: 390, pointsAgainst: 280, leaguePoints: 58 },
    { position: 3, team: "Bath", coach: "Johann van Graan", pointsFor: 370, pointsAgainst: 300, leaguePoints: 54 },
    { position: 4, team: "Sale Sharks", coach: "Alex Sanderson", pointsFor: 360, pointsAgainst: 310, leaguePoints: 52 },
    { position: 5, team: "Harlequins", coach: "Danny Wilson", pointsFor: 350, pointsAgainst: 320, leaguePoints: 50 },
    { position: 6, team: "Northampton Saints", coach: "Phil Dowson", pointsFor: 340, pointsAgainst: 330, leaguePoints: 48 },
    { position: 7, team: "Exeter Chiefs", coach: "Rob Baxter", pointsFor: 330, pointsAgainst: 340, leaguePoints: 46 },
    { position: 8, team: "Bristol Bears", coach: "Pat Lam", pointsFor: 320, pointsAgainst: 350, leaguePoints: 44 },
    { position: 9, team: "Gloucester Rugby", coach: "George Skivington", pointsFor: 300, pointsAgainst: 350, leaguePoints: 40 },
    { position: 10, team: "Newcastle Falcons", coach: "Alex Codling", pointsFor: 250, pointsAgainst: 400, leaguePoints: 30 },
  ],

  "premiership-women": [
    { position: 1, team: "Saracens Women", coach: "Alex Austerberry", pointsFor: 400, pointsAgainst: 200, leaguePoints: 60 },
    { position: 2, team: "Harlequins Women", coach: "Amy Turner", pointsFor: 380, pointsAgainst: 220, leaguePoints: 56 },
    { position: 3, team: "Exeter Chiefs Women", coach: "Susie Appleby", pointsFor: 360, pointsAgainst: 240, leaguePoints: 52 },
    { position: 4, team: "Bristol Bears Women", coach: "Dave Ward", pointsFor: 340, pointsAgainst: 260, leaguePoints: 50 },
    { position: 5, team: "Gloucester-Hartpury", coach: "Sean Lynn", pointsFor: 330, pointsAgainst: 270, leaguePoints: 48 },
    { position: 6, team: "Loughborough Lightning", coach: "Nathan Smith", pointsFor: 310, pointsAgainst: 290, leaguePoints: 44 },
    { position: 7, team: "Sale Sharks Women", coach: "Tom Hudson", pointsFor: 290, pointsAgainst: 310, leaguePoints: 40 },
    { position: 8, team: "Leicester Tigers Women", coach: "Tom Hudson", pointsFor: 270, pointsAgainst: 330, leaguePoints: 36 },
  ],

  // ==================================================
  // SUPER RUGBY
  // ==================================================

  "super-men": [
    { position: 1, team: "Crusaders", coach: "Rob Penney", pointsFor: 420, pointsAgainst: 250, leaguePoints: 60 },
    { position: 2, team: "Blues", coach: "Vern Cotter", pointsFor: 400, pointsAgainst: 270, leaguePoints: 56 },
    { position: 3, team: "Chiefs", coach: "Clayton McMillan", pointsFor: 390, pointsAgainst: 280, leaguePoints: 54 },
    { position: 4, team: "Brumbies", coach: "Stephen Larkham", pointsFor: 370, pointsAgainst: 300, leaguePoints: 50 },
    { position: 5, team: "Hurricanes", coach: "Clark Laidlaw", pointsFor: 360, pointsAgainst: 310, leaguePoints: 48 },
    { position: 6, team: "Reds", coach: "Les Kiss", pointsFor: 340, pointsAgainst: 320, leaguePoints: 44 },
    { position: 7, team: "Waratahs", coach: "Darren Coleman", pointsFor: 330, pointsAgainst: 330, leaguePoints: 42 },
    { position: 8, team: "Fijian Drua", coach: "Mick Byrne", pointsFor: 320, pointsAgainst: 340, leaguePoints: 40 },
  ],

  "super-women": [
    { position: 1, team: "Blues Women", coach: "Ruahei Demant", pointsFor: 300, pointsAgainst: 180, leaguePoints: 50 },
    { position: 2, team: "Chiefs Manawa", coach: "Crystal Kaua", pointsFor: 280, pointsAgainst: 200, leaguePoints: 46 },
    { position: 3, team: "Matatu", coach: "Whitney Hansen", pointsFor: 260, pointsAgainst: 210, leaguePoints: 44 },
    { position: 4, team: "Hurricanes Poua", coach: "Fusi Feaunati", pointsFor: 240, pointsAgainst: 230, leaguePoints: 40 },
    { position: 5, team: "Brumbies Women", coach: "Scott Fava", pointsFor: 220, pointsAgainst: 250, leaguePoints: 36 },
    { position: 6, team: "Waratahs Women", coach: "Mike Ruthven", pointsFor: 210, pointsAgainst: 260, leaguePoints: 34 },
    { position: 7, team: "Reds Women", coach: "Andrew Fraser", pointsFor: 200, pointsAgainst: 270, leaguePoints: 32 },
    { position: 8, team: "Fijiana Drua", coach: "Mosese Rauluni", pointsFor: 190, pointsAgainst: 280, leaguePoints: 30 },
  ],

  // ==================================================
  // TOP 14
  // ==================================================

 "top14-men": [
  { position: 1, team: "Stade Toulousain", coach: "Ugo Mola", pointsFor: 912, pointsAgainst: 517, leaguePoints: 82 },
  { position: 2, team: "Montpellier", coach: "Vincent Etcheto", pointsFor: 734, pointsAgainst: 511, leaguePoints: 70 },
  { position: 3, team: "Section Paloise", coach: "Sébastien Piqueronies", pointsFor: 704, pointsAgainst: 585, leaguePoints: 69 },
  { position: 4, team: "Stade Français Paris", coach: "Paul Gustard", pointsFor: 736, pointsAgainst: 591, leaguePoints: 68 },
  { position: 5, team: "RC Toulonnais", coach: "Pierre Mignoni", pointsFor: 440, pointsAgainst: 360, leaguePoints: 58 },
  { position: 6, team: "Stade Rochelais", coach: "Ronan O'Gara", pointsFor: 480, pointsAgainst: 320, leaguePoints: 66 },
  { position: 7, team: "Castres Olympique", coach: "Jeremy Davidson", pointsFor: 410, pointsAgainst: 390, leaguePoints: 52 },
  { position: 8, team: "Lyon OU", coach: "Fabien Gengenbacher", pointsFor: 380, pointsAgainst: 420, leaguePoints: 42 },
],

  "top14-women": [
    { position: 1, team: "Toulouse Women", coach: "Gaelle Mignot", pointsFor: 420, pointsAgainst: 210, leaguePoints: 62 },
    { position: 2, team: "Montpellier Women", coach: "Vincent Gomis", pointsFor: 400, pointsAgainst: 230, leaguePoints: 58 },
    { position: 3, team: "Bordeaux Women", coach: "David Ortiz", pointsFor: 380, pointsAgainst: 250, leaguePoints: 54 },
    { position: 4, team: "Lyon Women", coach: "Romain Buffin", pointsFor: 360, pointsAgainst: 260, leaguePoints: 52 },
    { position: 5, team: "Stade Français Women", coach: "Pauline Bourdon", pointsFor: 340, pointsAgainst: 280, leaguePoints: 48 },
    { position: 6, team: "Clermont Women", coach: "Fabrice Ribeyrolles", pointsFor: 320, pointsAgainst: 300, leaguePoints: 44 },
    { position: 7, team: "Grenoble Women", coach: "Nicolas Bach", pointsFor: 300, pointsAgainst: 320, leaguePoints: 40 },
    { position: 8, team: "Blagnac Women", coach: "Cedric Garcia", pointsFor: 280, pointsAgainst: 340, leaguePoints: 36 },
  ],

  // ==================================================
  // EPCR CHALLENGE CUP
  // ==================================================

  "epcr-men": [
    { position: 1, team: "Sharks", coach: "JP Pietersen", pointsFor: 180, pointsAgainst: 120, leaguePoints: 20 },
    { position: 2, team: "Gloucester", coach: "George Skivington", pointsFor: 170, pointsAgainst: 130, leaguePoints: 18 },
    { position: 3, team: "Montpellier", coach: "Richard Cockerill", pointsFor: 160, pointsAgainst: 140, leaguePoints: 16 },
    { position: 4, team: "Benetton", coach: "Marco Bortolami", pointsFor: 150, pointsAgainst: 145, leaguePoints: 14 },
  ],

  "epcr-women": [],

  // ==================================================
  // INVESTEC CHAMPIONS CUP
  // ==================================================

  "investec-men": [
    { position: 1, team: "Leinster", coach: "Leo Cullen", pointsFor: 200, pointsAgainst: 110, leaguePoints: 24 },
    { position: 2, team: "Toulouse", coach: "Ugo Mola", pointsFor: 190, pointsAgainst: 120, leaguePoints: 22 },
    { position: 3, team: "La Rochelle", coach: "Ronan O'Gara", pointsFor: 180, pointsAgainst: 130, leaguePoints: 20 },
    { position: 4, team: "Saracens", coach: "Mark McCall", pointsFor: 170, pointsAgainst: 140, leaguePoints: 18 },
  ],

  "investec-women": [],

/* ==================================================
   JAPAN LEAGUE ONE
   ================================================== */

"japan-men": [
  { position: 1, team: "Kobe Steel", coach: "Dave Rennie", pointsFor: 750, pointsAgainst: 456, leaguePoints: 75 },
  { position: 2, team: "Panasonic Wild Knights", coach: "Robbie Deans", pointsFor: 664, pointsAgainst: 336, leaguePoints: 74 },
  { position: 3, team: "Kubota Spears", coach: "Frans Ludeke", pointsFor: 709, pointsAgainst: 357, leaguePoints: 70 },
  { position: 4, team: "Black Rams Tokyo", coach: "Tabai Matson", pointsFor: 500, pointsAgainst: 549, leaguePoints: 36 },
  { position: 5, team: "Suntory Sungoliath", coach: "Kosei Ono", pointsFor: 600, pointsAgainst: 494, leaguePoints: 36 },
  { position: 6, team: "Toshiba Brave Lupus", coach: "Todd Blackadder", pointsFor: 550, pointsAgainst: 700, leaguePoints: 32 },
  { position: 7, team: "Toyota Verblitz", coach: "Steve Hansen", pointsFor: 500, pointsAgainst: 544, leaguePoints: 28 },
  { position: 8, team: "Canon Eagles", coach: "Shane Williams", pointsFor: 450, pointsAgainst: 593, leaguePoints: 24 },
],

"japan-women": [],

};