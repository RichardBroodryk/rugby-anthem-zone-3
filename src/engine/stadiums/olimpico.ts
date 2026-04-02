import aerial from "../../assets/images/stadiums/olimpico/olimpico-aerial.jpg";
import inside from "../../assets/images/stadiums/olimpico/olimpico-inside.jpg";
import outside from "../../assets/images/stadiums/olimpico/olimpico-outside.jpg";
import crowds from "../../assets/images/stadiums/olimpico/olimpico-crowds.jpg";
import seating from "../../assets/images/stadiums/olimpico/olimpico-seating.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

export const olimpico: StadiumIntelligence = {
  hero: aerial,
  gallery: { aerial, inside, outside, crowds, seating },

  seating: [
    { name: "Tribuna", type: "premium", view: "sideline", atmosphere: 3 },
    { name: "Distinti", type: "standard", view: "sideline", atmosphere: 3 },
    { name: "Curva", type: "budget", view: "end", atmosphere: 5 },
  ],

  meta: {
    capacity: 70000,
    altitude: 20,
    pitch: "grass",
    roof: "open",
  },

  experience: {
    atmosphereScore: 4,
    homeAdvantage: 3,
    arrivalTip: "Arrive early — large queues at major fixtures.",
  },
};