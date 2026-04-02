import aerial from "../../assets/images/stadiums/fnb/fnb-aerial.jpg";
import inside from "../../assets/images/stadiums/fnb/fnb-inside.jpg";
import outside from "../../assets/images/stadiums/fnb/fnb-outside.jpg";
import crowds from "../../assets/images/stadiums/fnb/fnb-crowds.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

export const fnb: StadiumIntelligence = {
  hero: aerial,

  gallery: {
    aerial,
    inside,
    outside,
    crowds,
  },

  seating: [
    { name: "Lower Tier", type: "premium", view: "sideline", atmosphere: 5 },
    { name: "Middle Tier", type: "standard", view: "sideline", atmosphere: 4 },
    { name: "Upper Tier", type: "budget", view: "end", atmosphere: 4 },
  ],

  meta: {
    capacity: 94000,
    altitude: 1750,
    pitch: "grass",
    roof: "open",
  },

  experience: {
    atmosphereScore: 5,
    homeAdvantage: 5,
    arrivalTip: "Very large venue — allow extra time for entry and navigation.",
  },
};