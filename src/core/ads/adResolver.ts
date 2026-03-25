// ======================================================
// RAZ — AD RESOLVER (INTELLIGENCE LAYER)
// Phase 5 — Step 3
// ======================================================

import { AD_REGISTRY, Advertiser, AdSlot } from "./adRegistry";
import { AD_SLOTS } from "./adSlots";

// ======================================================
// 🌍 COUNTRY DETECTION (BASIC — SAFE DEFAULT)
// ======================================================

function getUserCountry(): string {
  try {
    const locale = navigator.language || "en-ZA";
    const parts = locale.split("-");

    return parts[1] || "ZA";
  } catch {
    return "ZA";
  }
}

// ======================================================
// 🔁 DETERMINISTIC ROTATION (SESSION-BASED)
// ======================================================

function getRotationIndex(length: number): number {
  if (length === 0) return 0;

  try {
    const key = "raz_ad_cycle";
    const current = Number(sessionStorage.getItem(key) || "0");

    sessionStorage.setItem(key, String(current + 1));

    return current % length;
  } catch {
    return 0;
  }
}

// ======================================================
// 🧠 CORE RESOLVER
// ======================================================

export function resolveAdsForSlot(slot: AdSlot): Advertiser[] {
  const config = AD_SLOTS[slot];

  if (!config) return [];

  const country = getUserCountry();

  // 1. FILTER ACTIVE ADS
  let candidates = AD_REGISTRY.filter((ad) => ad.active);

  // 2. FILTER BY SLOT
  candidates = candidates.filter((ad) =>
    ad.allowedSlots.includes(slot)
  );

  // 3. FILTER BY COUNTRY
  candidates = candidates.filter((ad) =>
    ad.countries.includes(country)
  );

  // 4. ENFORCE MAX ADS
  if (candidates.length <= config.maxAds) {
    return candidates;
  }

  // 5. APPLY ROTATION (DETERMINISTIC)
  const index = getRotationIndex(candidates.length);

  return [candidates[index]];
}