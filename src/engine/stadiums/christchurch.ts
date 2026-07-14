import aerial from "../../assets/images/stadiums/christchurch/christchurch-stadium-aerial.jpg";
import inside from "../../assets/images/stadiums/christchurch/christchurch-stadium-inside.jpg";
import outside from "../../assets/images/stadiums/christchurch/christchurch-stadium-outside.jpg";
import crowds from "../../assets/images/stadiums/christchurch/christchurch-stadium-crowds.jpg";
import seating from "../../assets/images/stadiums/christchurch/christchurch-stadium-seating.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

/**
 * One NZ Stadium (Te Kaha)
 * Christchurch's new fully-roofed multi-purpose arena
 * Home of the Crusaders (Super Rugby Pacific)
 * Opened March 2026, replacing Lancaster Park [citation:2][citation:6]
 */
export const christchurch: StadiumIntelligence = {
  hero: aerial,
  gallery: { aerial, inside, outside, crowds, seating },

  seating: [
    { name: "Premium Sideline", type: "premium", view: "sideline", atmosphere: 4 },
    { name: "South Stand", type: "standard", view: "sideline", atmosphere: 4 },
    { name: "East & West Stands", type: "standard", view: "sideline", atmosphere: 3 },
    { name: "North Stand (Temporary)", type: "budget", view: "end", atmosphere: 3 },
  ],

  meta: {
    capacity: 30000, // 25,000 permanent + 5,000 temporary [citation:2][citation:6]
    altitude: 10,
    pitch: "grass",
    roof: "retractable", // fully enclosed with ETFE roof system [citation:2][citation:6]
  },

  experience: {
    atmosphereScore: 4, // Strong home advantage, but acoustics/design still being evaluated [citation:4]
    homeAdvantage: 4, // Crusaders' new fortress, record attendance 25,237 already [citation:6]
    arrivalTip: "Use public transport — the stadium is central on Madras Street with step-free access from bus routes.",
  },
};