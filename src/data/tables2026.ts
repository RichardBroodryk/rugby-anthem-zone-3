// src/data/tables2026.ts

export type LeagueTableRow = {
  position: number;
  team: string;
  coach: string;
  pointsFor: number;
  pointsAgainst: number;
  leaguePoints: number;
};

export const tables2026: Record<string, LeagueTableRow[]> = {
  urc: [
    { position: 1, team: "Leinster", coach: "Leo Cullen", pointsFor: 410, pointsAgainst: 210, leaguePoints: 58 },
    { position: 2, team: "Stormers", coach: "John Dobson", pointsFor: 380, pointsAgainst: 250, leaguePoints: 52 },
    { position: 3, team: "Ulster", coach: "Dan McFarland", pointsFor: 360, pointsAgainst: 270, leaguePoints: 48 },
    { position: 4, team: "Bulls", coach: "Jake White", pointsFor: 350, pointsAgainst: 260, leaguePoints: 46 },
    { position: 5, team: "Glasgow Warriors", coach: "Franco Smith", pointsFor: 340, pointsAgainst: 280, leaguePoints: 44 },
    { position: 6, team: "Munster", coach: "Graham Rowntree", pointsFor: 330, pointsAgainst: 290, leaguePoints: 42 },
    { position: 7, team: "Sharks", coach: "John Plumtree", pointsFor: 320, pointsAgainst: 300, leaguePoints: 40 },
    { position: 8, team: "Edinburgh", coach: "Sean Everitt", pointsFor: 300, pointsAgainst: 310, leaguePoints: 38 },
  ],

  epcr: [
    { position: 1, team: "Toulon", coach: "Pierre Mignoni", pointsFor: 200, pointsAgainst: 120, leaguePoints: 20 },
    { position: 2, team: "Lyon", coach: "Karim Ghezal", pointsFor: 190, pointsAgainst: 130, leaguePoints: 18 },
    { position: 3, team: "Bath", coach: "Johann van Graan", pointsFor: 180, pointsAgainst: 140, leaguePoints: 16 },
    { position: 4, team: "Connacht", coach: "Pete Wilkins", pointsFor: 170, pointsAgainst: 150, leaguePoints: 14 },
    { position: 5, team: "Cardiff", coach: "Matt Sherratt", pointsFor: 160, pointsAgainst: 155, leaguePoints: 12 },
    { position: 6, team: "Zebre", coach: "Massimo Brunello", pointsFor: 150, pointsAgainst: 160, leaguePoints: 10 },
    { position: 7, team: "Newcastle Falcons", coach: "Alex Codling", pointsFor: 140, pointsAgainst: 170, leaguePoints: 8 },
    { position: 8, team: "Perpignan", coach: "Franck Azema", pointsFor: 130, pointsAgainst: 180, leaguePoints: 6 },
  ],

  investec: [
    { position: 1, team: "La Rochelle", coach: "Ronan O'Gara", pointsFor: 300, pointsAgainst: 200, leaguePoints: 28 },
    { position: 2, team: "Leinster", coach: "Leo Cullen", pointsFor: 290, pointsAgainst: 210, leaguePoints: 26 },
    { position: 3, team: "Saracens", coach: "Mark McCall", pointsFor: 280, pointsAgainst: 220, leaguePoints: 24 },
    { position: 4, team: "Toulouse", coach: "Ugo Mola", pointsFor: 270, pointsAgainst: 230, leaguePoints: 22 },
    { position: 5, team: "Exeter Chiefs", coach: "Rob Baxter", pointsFor: 260, pointsAgainst: 240, leaguePoints: 20 },
    { position: 6, team: "Munster", coach: "Graham Rowntree", pointsFor: 250, pointsAgainst: 250, leaguePoints: 18 },
    { position: 7, team: "Racing 92", coach: "Stuart Lancaster", pointsFor: 240, pointsAgainst: 260, leaguePoints: 16 },
    { position: 8, team: "Harlequins", coach: "Danny Wilson", pointsFor: 230, pointsAgainst: 270, leaguePoints: 14 },
  ],

  super: [
    { position: 1, team: "Crusaders", coach: "Rob Penney", pointsFor: 420, pointsAgainst: 250, leaguePoints: 60 },
    { position: 2, team: "Blues", coach: "Vern Cotter", pointsFor: 400, pointsAgainst: 270, leaguePoints: 56 },
    { position: 3, team: "Chiefs", coach: "Clayton McMillan", pointsFor: 390, pointsAgainst: 280, leaguePoints: 54 },
    { position: 4, team: "Brumbies", coach: "Stephen Larkham", pointsFor: 370, pointsAgainst: 300, leaguePoints: 50 },
    { position: 5, team: "Hurricanes", coach: "Clark Laidlaw", pointsFor: 360, pointsAgainst: 310, leaguePoints: 48 },
    { position: 6, team: "Reds", coach: "Les Kiss", pointsFor: 340, pointsAgainst: 320, leaguePoints: 44 },
    { position: 7, team: "Waratahs", coach: "Darren Coleman", pointsFor: 330, pointsAgainst: 330, leaguePoints: 42 },
    { position: 8, team: "Fijian Drua", coach: "Mick Byrne", pointsFor: 320, pointsAgainst: 340, leaguePoints: 40 },
  ],

  premiership: [
    { position: 1, team: "Saracens", coach: "Mark McCall", pointsFor: 410, pointsAgainst: 260, leaguePoints: 62 },
    { position: 2, team: "Leicester Tigers", coach: "Dan McKellar", pointsFor: 390, pointsAgainst: 280, leaguePoints: 58 },
    { position: 3, team: "Bath", coach: "Johann van Graan", pointsFor: 370, pointsAgainst: 300, leaguePoints: 54 },
    { position: 4, team: "Sale Sharks", coach: "Alex Sanderson", pointsFor: 360, pointsAgainst: 310, leaguePoints: 52 },
    { position: 5, team: "Harlequins", coach: "Danny Wilson", pointsFor: 350, pointsAgainst: 320, leaguePoints: 50 },
    { position: 6, team: "Northampton Saints", coach: "Phil Dowson", pointsFor: 340, pointsAgainst: 330, leaguePoints: 48 },
    { position: 7, team: "Exeter Chiefs", coach: "Rob Baxter", pointsFor: 330, pointsAgainst: 340, leaguePoints: 46 },
    { position: 8, team: "Bristol Bears", coach: "Pat Lam", pointsFor: 320, pointsAgainst: 350, leaguePoints: 44 },
  ],

  top14: [
    { position: 1, team: "Toulouse", coach: "Ugo Mola", pointsFor: 500, pointsAgainst: 300, leaguePoints: 70 },
    { position: 2, team: "La Rochelle", coach: "Ronan O'Gara", pointsFor: 480, pointsAgainst: 320, leaguePoints: 66 },
    { position: 3, team: "Clermont", coach: "Christophe Urios", pointsFor: 460, pointsAgainst: 340, leaguePoints: 62 },
    { position: 4, team: "Bordeaux", coach: "Yannick Bru", pointsFor: 450, pointsAgainst: 350, leaguePoints: 60 },
    { position: 5, team: "Toulon", coach: "Pierre Mignoni", pointsFor: 440, pointsAgainst: 360, leaguePoints: 58 },
    { position: 6, team: "Racing 92", coach: "Stuart Lancaster", pointsFor: 430, pointsAgainst: 370, leaguePoints: 56 },
    { position: 7, team: "Montpellier", coach: "Richard Cockerill", pointsFor: 420, pointsAgainst: 380, leaguePoints: 54 },
    { position: 8, team: "Castres", coach: "Jeremy Davidson", pointsFor: 410, pointsAgainst: 390, leaguePoints: 52 },
  ],

  japan: [
    { position: 1, team: "Panasonic Wild Knights", coach: "Robbie Deans", pointsFor: 420, pointsAgainst: 210, leaguePoints: 58 },
    { position: 2, team: "Kubota Spears", coach: "Frans Ludeke", pointsFor: 400, pointsAgainst: 230, leaguePoints: 54 },
    { position: 3, team: "Suntory Sungoliath", coach: "Kosei Ono", pointsFor: 380, pointsAgainst: 250, leaguePoints: 50 },
    { position: 4, team: "Toyota Verblitz", coach: "Ian Foster", pointsFor: 360, pointsAgainst: 270, leaguePoints: 48 },
    { position: 5, team: "Ricoh Black Rams", coach: "Tabai Matson", pointsFor: 340, pointsAgainst: 290, leaguePoints: 44 },
    { position: 6, team: "Kobelco Steelers", coach: "Dave Rennie", pointsFor: 330, pointsAgainst: 300, leaguePoints: 42 },
    { position: 7, team: "NEC Green Rockets", coach: "Wayne Pivac", pointsFor: 320, pointsAgainst: 310, leaguePoints: 40 },
    { position: 8, team: "Honda Heat", coach: "Kieran Crowley", pointsFor: 300, pointsAgainst: 330, leaguePoints: 36 },
  ],
};