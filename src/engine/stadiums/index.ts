import { capetown } from "./capetown";
import { twickenham } from "./twickenham";
import { murrayfield } from "./murrayfield";
import { aviva } from "./aviva";
import { principality } from "./principality";
import { stadedefrance } from "./stadedefrance";
import { olimpico } from "./olimpico";
import { edenpark } from "./edenpark";
import { ellispark } from "./ellispark";
import { fnb } from "./fnb";

import { StadiumIntelligence } from "../stadiumEngine";

/* 🔥 THIS IS THE FIX */
export const stadiumRegistry: Record<string, StadiumIntelligence> = {
  capetown,
  twickenham,
  "murrayfield": murrayfield,
  "aviva-stadium": aviva,
  "principality-stadium": principality,
  "stade-de-france": stadedefrance,
  "stadio-olimpico": olimpico,
  "eden-park": edenpark,
  "ellis-park": ellispark,
  "fnb-stadium": fnb,
};