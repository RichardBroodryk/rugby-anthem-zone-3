// ======================================================
// RAZ — AD REGISTRY (SOURCE OF TRUTH)
// Phase 5 — Step 1
// ======================================================

export type AdCategory =
  | "gear"
  | "travel"
  | "media"
  | "betting";

export type AdSlot =
  | "HOME_TOP"
  | "HOME_BOTTOM"
  | "MATCH_CENTER_TOP"
  | "MATCH_CENTER_BOTTOM"
  | "TOURNAMENTS_TOP"
  | "TOURNAMENTS_BOTTOM"
  | "MEDIA_TOP"
  | "MEDIA_BOTTOM"
  | "DATA_TOP"
  | "DATA_BOTTOM";

export type Advertiser = {
  id: string;
  name: string;

  category: AdCategory;

  image: string;     // banner asset
  link: string;      // destination URL

  allowedSlots: AdSlot[];

  countries: string[]; // ISO codes (e.g. "ZA", "UK", "AU")

  active: boolean;
};

// ======================================================
// 🔒 STATIC DATASET (INITIAL 4 ADVERTISERS)
// ======================================================

export const AD_REGISTRY: Advertiser[] = [
  {
    id: "nike-rugby",
    name: "Nike Rugby",
    category: "gear",

    image: "/ads/nike-rugby-banner.jpg",
    link: "https://www.nike.com/rugby",

    allowedSlots: [
      "HOME_TOP",
      "HOME_BOTTOM",
      "MATCH_CENTER_TOP",
      "TOURNAMENTS_TOP",
      "MEDIA_TOP",
    ],

    countries: ["ZA", "UK", "AU", "NZ"],
    active: true,
  },

  {
    id: "emirates-travel",
    name: "Emirates Travel",
    category: "travel",

    image: "/ads/emirates-banner.jpg",
    link: "https://www.emirates.com/",

    allowedSlots: [
      "HOME_BOTTOM",
      "MATCH_CENTER_BOTTOM",
      "TOURNAMENTS_BOTTOM",
      "MEDIA_BOTTOM",
      "DATA_BOTTOM",
    ],

    countries: ["ZA", "UK", "AU", "FR"],
    active: true,
  },

  {
    id: "dstv-streaming",
    name: "DStv Rugby",
    category: "media",

    image: "/ads/dstv-banner.jpg",
    link: "https://www.dstv.com/",

    allowedSlots: [
      "HOME_TOP",
      "MATCH_CENTER_TOP",
      "MEDIA_TOP",
      "DATA_TOP",
    ],

    countries: ["ZA"],
    active: true,
  },

  {
    id: "betway-rugby",
    name: "Betway Rugby",
    category: "betting",

    image: "/ads/betway-banner.jpg",
    link: "https://www.betway.com/",

    allowedSlots: [
      "HOME_BOTTOM",
      "MATCH_CENTER_BOTTOM",
      "MEDIA_BOTTOM",
    ],

    countries: ["ZA", "UK"],
    active: true,
  },
];