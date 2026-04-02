import ct_aerial from "../../assets/images/stadiums/capetown/capetown-aerial.jpg";
import ct_inside from "../../assets/images/stadiums/capetown/capetown-inside.jpg";
import ct_outside from "../../assets/images/stadiums/capetown/capetown-outside.jpg";
import ct_crowds from "../../assets/images/stadiums/capetown/capetown-crowds.jpg";
import ct_seating from "../../assets/images/stadiums/capetown/capetown-seating.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

export const capetown: StadiumIntelligence = {
  hero: ct_aerial,

  gallery: {
    aerial: ct_aerial,
    inside: ct_inside,
    outside: ct_outside,
    crowds: ct_crowds,
    seating: ct_seating,
  },

  seating: [
    { name: "Lower Bowl", type: "premium", view: "sideline", atmosphere: 5 },
    { name: "Upper Tier", type: "standard", view: "sideline", atmosphere: 4 },
    { name: "Ends", type: "budget", view: "end", atmosphere: 5 },
  ],

  /* 🧠 META */
  meta: {
    capacity: 55000,
    altitude: 15,
    pitch: "grass",
    roof: "open",
  },

  /* 🧠 EXPERIENCE */
  experience: {
    atmosphereScore: 4,
    homeAdvantage: 4,
    arrivalTip: "Arrive early — coastal traffic builds quickly before kickoff.",
  },
};