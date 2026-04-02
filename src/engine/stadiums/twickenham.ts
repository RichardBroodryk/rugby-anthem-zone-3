import aerial from "../../assets/images/stadiums/twickenham/twickenham-aerial.jpg";
import inside from "../../assets/images/stadiums/twickenham/twickenham-inside.jpg";
import outside from "../../assets/images/stadiums/twickenham/twickenham-outside.jpg";
import crowds from "../../assets/images/stadiums/twickenham/twickenham-crowds.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

export const twickenham: StadiumIntelligence = {
  hero: aerial,

  gallery: {
    aerial,
    inside,
    outside,
    crowds,
  },

  seating: [
    { name: "Lower Tier", type: "premium", view: "sideline", atmosphere: 4 },
    { name: "Upper Tier", type: "standard", view: "sideline", atmosphere: 3 },
    { name: "Ends", type: "budget", view: "end", atmosphere: 4 },
  ],

  meta: {
    capacity: 82000,
    altitude: 25,
    pitch: "hybrid",
    roof: "open",
  },

  experience: {
    atmosphereScore: 4,
    homeAdvantage: 4,
    arrivalTip: "Arrive early — transport congestion builds quickly on matchdays.",
  },
};