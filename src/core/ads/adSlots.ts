// ======================================================
// RAZ — AD SLOTS (CONTROL LAYER)
// Phase 5 — Step 2
// ======================================================

import { AdSlot } from "./adRegistry";

export type PageType = "hub" | "data" | "editorial";

export type SlotConfig = {
  slot: AdSlot;

  pageType: PageType;

  position: "top" | "bottom";

  maxAds: number;
};

// ======================================================
// 🔒 SLOT DEFINITIONS (LOCKED)
// ======================================================

export const AD_SLOTS: Record<AdSlot, SlotConfig> = {
  // ================= HOME =================
  HOME_TOP: {
    slot: "HOME_TOP",
    pageType: "hub",
    position: "top",
    maxAds: 1,
  },

  HOME_BOTTOM: {
    slot: "HOME_BOTTOM",
    pageType: "hub",
    position: "bottom",
    maxAds: 1,
  },

  // ================= MATCH CENTER =================
  MATCH_CENTER_TOP: {
    slot: "MATCH_CENTER_TOP",
    pageType: "hub",
    position: "top",
    maxAds: 1,
  },

  MATCH_CENTER_BOTTOM: {
    slot: "MATCH_CENTER_BOTTOM",
    pageType: "hub",
    position: "bottom",
    maxAds: 1,
  },

  // ================= TOURNAMENTS =================
  TOURNAMENTS_TOP: {
    slot: "TOURNAMENTS_TOP",
    pageType: "hub",
    position: "top",
    maxAds: 1,
  },

  TOURNAMENTS_BOTTOM: {
    slot: "TOURNAMENTS_BOTTOM",
    pageType: "hub",
    position: "bottom",
    maxAds: 1,
  },

  // ================= MEDIA =================
  MEDIA_TOP: {
    slot: "MEDIA_TOP",
    pageType: "hub",
    position: "top",
    maxAds: 1,
  },

  MEDIA_BOTTOM: {
    slot: "MEDIA_BOTTOM",
    pageType: "hub",
    position: "bottom",
    maxAds: 1,
  },

  // ================= DATA PAGES =================
  DATA_TOP: {
    slot: "DATA_TOP",
    pageType: "data",
    position: "top",
    maxAds: 1,
  },

  DATA_BOTTOM: {
    slot: "DATA_BOTTOM",
    pageType: "data",
    position: "bottom",
    maxAds: 1,
  },
};