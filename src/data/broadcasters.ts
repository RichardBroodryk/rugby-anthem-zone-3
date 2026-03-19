export type Broadcaster = {
  id: string;
  name: string;
  country: string;
  region: string;
  type: "tv" | "radio";
  url: string;
};

export const broadcasters: Broadcaster[] = [
  /* ================= SOUTH AFRICA ================= */

  {
    id: "supersport",
    name: "SuperSport",
    country: "South Africa",
    region: "ZA",
    type: "tv",
    url: "https://supersport.com/rugby",
  },

  {
    id: "radio2000",
    name: "Radio 2000",
    country: "South Africa",
    region: "ZA",
    type: "radio",
    url: "https://www.sabcsport.com/audio",
  },

  {
    id: "rsg",
    name: "RSG",
    country: "South Africa",
    region: "ZA",
    type: "radio",
    url: "https://www.sabcsport.com/audio",
  },

  /* ================= NEW ZEALAND ================= */

  {
    id: "skysportnz",
    name: "Sky Sport NZ",
    country: "New Zealand",
    region: "NZ",
    type: "tv",
    url: "https://www.skysport.co.nz/",
  },

  {
    id: "skysportnow",
    name: "Sky Sport Now",
    country: "New Zealand",
    region: "NZ",
    type: "tv",
    url: "https://www.skysportnow.co.nz/",
  },

  {
    id: "newstalkzb",
    name: "Newstalk ZB",
    country: "New Zealand",
    region: "NZ",
    type: "radio",
    url: "https://www.newstalkzb.co.nz/",
  },

  /* ================= AUSTRALIA ================= */

  {
    id: "stansport",
    name: "Stan Sport",
    country: "Australia",
    region: "AU",
    type: "tv",
    url: "https://www.stan.com.au/sport",
  },

  {
    id: "abc_sport",
    name: "ABC Sport",
    country: "Australia",
    region: "AU",
    type: "radio",
    url: "https://www.abc.net.au/sport",
  },

  /* ================= UNITED KINGDOM ================= */

  {
    id: "tntsports",
    name: "TNT Sports",
    country: "United Kingdom",
    region: "UK",
    type: "tv",
    url: "https://www.tntsports.co.uk/",
  },

  {
    id: "premiersports",
    name: "Premier Sports",
    country: "United Kingdom",
    region: "UK",
    type: "tv",
    url: "https://www.premiersports.com/",
  },

  {
    id: "bbc_radio5",
    name: "BBC Radio 5 Live",
    country: "United Kingdom",
    region: "UK",
    type: "radio",
    url: "https://www.bbc.co.uk/sounds/play/live:bbc_radio_five_live",
  },

  /* ================= FRANCE ================= */

  {
    id: "canalplus",
    name: "Canal+",
    country: "France",
    region: "FR",
    type: "tv",
    url: "https://www.canalplus.com/",
  },

  {
    id: "france_inter",
    name: "France Inter",
    country: "France",
    region: "FR",
    type: "radio",
    url: "https://www.radiofrance.fr/franceinter",
  },

  /* ================= IRELAND ================= */

  {
    id: "virgin_media",
    name: "Virgin Media Sport",
    country: "Ireland",
    region: "IE",
    type: "tv",
    url: "https://www.virginmediatelevision.ie/",
  },

  {
    id: "rte_radio",
    name: "RTÉ Radio 1",
    country: "Ireland",
    region: "IE",
    type: "radio",
    url: "https://www.rte.ie/radio/radio1/",
  },

  /* ================= ITALY ================= */

  {
    id: "skyitalia",
    name: "Sky Sport Italia",
    country: "Italy",
    region: "IT",
    type: "tv",
    url: "https://sport.sky.it/",
  },

  {
    id: "rai_radio",
    name: "RAI Radio",
    country: "Italy",
    region: "IT",
    type: "radio",
    url: "https://www.raiplaysound.it/",
  },

  /* ================= JAPAN ================= */

  {
    id: "dazn",
    name: "DAZN",
    country: "Japan",
    region: "JP",
    type: "tv",
    url: "https://www.dazn.com/",
  },

  {
    id: "wowow",
    name: "WOWOW",
    country: "Japan",
    region: "JP",
    type: "tv",
    url: "https://www.wowow.co.jp/",
  },

  {
    id: "nhk_radio",
    name: "NHK Radio",
    country: "Japan",
    region: "JP",
    type: "radio",
    url: "https://www.nhk.or.jp/radio/",
  },

  /* ================= ARGENTINA ================= */

  {
    id: "espn",
    name: "ESPN",
    country: "Argentina",
    region: "AR",
    type: "tv",
    url: "https://www.espn.com/",
  },

  {
    id: "radio_nacional",
    name: "Radio Nacional",
    country: "Argentina",
    region: "AR",
    type: "radio",
    url: "https://www.radionacional.com.ar/",
  },

  /* ================= FIJI ================= */

  {
    id: "skypacific",
    name: "Sky Pacific",
    country: "Fiji",
    region: "FJ",
    type: "tv",
    url: "https://www.skypacific.com.fj/",
  },

  {
    id: "fbc_radio",
    name: "FBC Radio",
    country: "Fiji",
    region: "FJ",
    type: "radio",
    url: "https://www.fbcnews.com.fj/",
  },

  /* ================= GLOBAL ================= */

  {
    id: "rugbypass",
    name: "RugbyPass TV",
    country: "Global",
    region: "GLOBAL",
    type: "tv",
    url: "https://rugbypass.tv/",
  },

  {
    id: "florugby",
    name: "FloRugby",
    country: "United States",
    region: "US",
    type: "tv",
    url: "https://www.florugby.com/",
  },

  {
    id: "peacock",
    name: "Peacock",
    country: "United States",
    region: "US",
    type: "tv",
    url: "https://www.peacocktv.com/",
  },
];