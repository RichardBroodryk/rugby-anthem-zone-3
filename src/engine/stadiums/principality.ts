import aerial from "../../assets/images/stadiums/principality/principality-aerial.jpg";
import inside from "../../assets/images/stadiums/principality/principality-inside.jpg";
import outside from "../../assets/images/stadiums/principality/principality-outside.jpg";
import crowds from "../../assets/images/stadiums/principality/principality-crowds.jpg";
import seating from "../../assets/images/stadiums/principality/principality-seating.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

export const principality: StadiumIntelligence = {
  hero: aerial,
  gallery: { aerial, inside, outside, crowds, seating },

  seating: [
    { name: "Lower Bowl", type: "premium", view: "sideline", atmosphere: 5 },
    { name: "Upper Bowl", type: "standard", view: "sideline", atmosphere: 5 },
    { name: "Ends", type: "budget", view: "end", atmosphere: 5 },
  ],

  meta: {
    capacity: 74000,
    altitude: 20,
    pitch: "hybrid",
    roof: "retractable",
  },

  experience: {
    atmosphereScore: 5,
    homeAdvantage: 5,
    arrivalTip: "Closed roof amplifies crowd noise dramatically.",
  },
};