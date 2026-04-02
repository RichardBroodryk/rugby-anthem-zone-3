import aerial from "../../assets/images/stadiums/ellispark/ellispark-aerial.jpg";
import inside from "../../assets/images/stadiums/ellispark/ellispark-inside.jpg";
import outside from "../../assets/images/stadiums/ellispark/ellispark-outside.jpg";
import crowds from "../../assets/images/stadiums/ellispark/ellispark-crowds.jpg";
import seating from "../../assets/images/stadiums/ellispark/ellispark-seating.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

export const ellispark: StadiumIntelligence = {
  hero: aerial,

  gallery: {
    aerial,
    inside,
    outside,
    crowds,
    seating,
  },

  seating: [
    { name: "Lower Bowl", type: "premium", view: "sideline", atmosphere: 5 },
    { name: "Upper Bowl", type: "standard", view: "sideline", atmosphere: 4 },
    { name: "Ends", type: "budget", view: "end", atmosphere: 5 },
  ],

  meta: {
    capacity: 62000,
    altitude: 1750,
    pitch: "grass",
    roof: "open",
  },

  experience: {
    atmosphereScore: 5,
    homeAdvantage: 5,
    arrivalTip: "High altitude conditions — matches are fast and physically demanding.",
  },
};