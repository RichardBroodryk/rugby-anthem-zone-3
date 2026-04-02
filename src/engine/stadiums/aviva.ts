import aerial from "../../assets/images/stadiums/aviva/aviva-aerial.jpg";
import inside from "../../assets/images/stadiums/aviva/aviva-inside.jpg";
import outside from "../../assets/images/stadiums/aviva/aviva-outside.jpg";
import crowds from "../../assets/images/stadiums/aviva/aviva-crowds.jpg";
import seating from "../../assets/images/stadiums/aviva/aviva-seating.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

export const aviva: StadiumIntelligence = {
  hero: aerial,
  gallery: { aerial, inside, outside, crowds, seating },

  seating: [
    { name: "Premium Sideline", type: "premium", view: "sideline", atmosphere: 4 },
    { name: "Upper Tier", type: "standard", view: "sideline", atmosphere: 3 },
    { name: "Ends", type: "budget", view: "end", atmosphere: 4 },
  ],

  meta: {
    capacity: 51000,
    altitude: 10,
    pitch: "hybrid",
    roof: "open",
  },

  experience: {
    atmosphereScore: 4,
    homeAdvantage: 4,
    arrivalTip: "City access is easy — use public transport.",
  },
};