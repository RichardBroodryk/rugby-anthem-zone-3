import aerial from "../../assets/images/stadiums/stadedefrance/stadedefrance-aerial.jpg";
import inside from "../../assets/images/stadiums/stadedefrance/stadedefrance-inside.jpg";
import outside from "../../assets/images/stadiums/stadedefrance/stadedefrance-outside.jpg";
import crowds from "../../assets/images/stadiums/stadedefrance/stadedefrance-crowds.jpg";
import seating from "../../assets/images/stadiums/stadedefrance/stadedefrance-seating.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

export const stadedefrance: StadiumIntelligence = {
  hero: aerial,
  gallery: { aerial, inside, outside, crowds, seating },

  seating: [
    { name: "Lower Tier", type: "premium", view: "sideline", atmosphere: 4 },
    { name: "Upper Tier", type: "standard", view: "sideline", atmosphere: 3 },
    { name: "Ends", type: "budget", view: "end", atmosphere: 4 },
  ],

  meta: {
    capacity: 80000,
    altitude: 30,
    pitch: "grass",
    roof: "open",
  },

  experience: {
    atmosphereScore: 4,
    homeAdvantage: 4,
    arrivalTip: "Large venue — allow extra time for entry.",
  },
};