import aerial from "../../assets/images/stadiums/wellington/wellington-hnrystadium-aerial.jpg";
import inside from "../../assets/images/stadiums/wellington/wellington-hnrystadium-inside.jpg";
import outside from "../../assets/images/stadiums/wellington/wellington-hnrystadium-outside.jpg";
import crowds from "../../assets/images/stadiums/wellington/wellington-hnrystadium-crowds.jpg";
import seating from "../../assets/images/stadiums/wellington/wellington-hnrystadium-seating.jpg";

import { StadiumIntelligence } from "../stadiumEngine";

/**
 * Hnry Stadium (Wellington Regional Stadium)
 * Also known as "The Cake Tin"
 * Home of the Hurricanes (Super Rugby) and Wellington Phoenix (A-League)
 */
export const wellington: StadiumIntelligence = {
  hero: aerial,
  gallery: { aerial, inside, outside, crowds, seating },

  seating: [
    { name: "Premium Sideline", type: "premium", view: "sideline", atmosphere: 5 },
    { name: "West Stand", type: "standard", view: "sideline", atmosphere: 4 },
    { name: "East Stand", type: "standard", view: "sideline", atmosphere: 4 },
    { name: "North & South Ends", type: "budget", view: "end", atmosphere: 4 },
  ],

  meta: {
    capacity: 34500,
    altitude: 10,
    pitch: "grass",
    roof: "open",
  },

  experience: {
    atmosphereScore: 5, // Perfect 5/5 from A-League Women player surveys [citation:3][citation:10]
    homeAdvantage: 4, // Strong home record, known for rocking atmosphere [citation:7]
    arrivalTip: "Close to Wellington railway station and CBD — use public transport or walk from the city centre.",
  },
};