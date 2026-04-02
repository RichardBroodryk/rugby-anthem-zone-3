import aerial from "../../assets/images/stadiums/edenpark/edenpark-aerial.jpg";
import inside from "../../assets/images/stadiums/edenpark/edenpark-inside.jpg";
import outside from "../../assets/images/stadiums/edenpark/edenpark-outside.jpg";
import crowds from "../../assets/images/stadiums/edenpark/edenpark-crowds.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

export const edenpark: StadiumIntelligence = {
  hero: aerial,

  gallery: {
    aerial,
    inside,
    outside,
    crowds,
  },

  seating: [
    { name: "Sideline Lower", type: "premium", view: "sideline", atmosphere: 5 },
    { name: "Upper Tier", type: "standard", view: "sideline", atmosphere: 4 },
    { name: "Ends", type: "budget", view: "end", atmosphere: 5 },
  ],

  meta: {
    capacity: 50000,
    altitude: 40,
    pitch: "grass",
    roof: "open",
  },

  experience: {
    atmosphereScore: 5,
    homeAdvantage: 5,
    arrivalTip: "Public transport is recommended — limited parking near the stadium.",
  },
};