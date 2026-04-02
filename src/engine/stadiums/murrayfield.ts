import aerial from "../../assets/images/stadiums/murrayfield/murrayfield-aerial.jpg";
import inside from "../../assets/images/stadiums/murrayfield/murrayfield-inside.jpg";
import outside from "../../assets/images/stadiums/murrayfield/murrayfield-outside.jpg";
import crowds from "../../assets/images/stadiums/murrayfield/murrayfield-crowds.jpg";
import seating from "../../assets/images/stadiums/murrayfield/murrayfield-seating.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

export const murrayfield: StadiumIntelligence = {
  hero: aerial,
  gallery: { aerial, inside, outside, crowds, seating },

  seating: [
    { name: "West Stand", type: "premium", view: "sideline", atmosphere: 4 },
    { name: "East Stand", type: "standard", view: "sideline", atmosphere: 4 },
    { name: "Ends", type: "budget", view: "end", atmosphere: 5 },
  ],

  meta: {
    capacity: 67000,
    altitude: 47,
    pitch: "grass",
    roof: "open",
  },

  experience: {
    atmosphereScore: 5,
    homeAdvantage: 4,
    arrivalTip: "Expect strong winds — dress for weather changes.",
  },
};