// ======================================================
// RAZ — AdSlot (CONNECTOR)
// Phase 5 — Step 4
// ======================================================

import { AdSlot as AdSlotType } from "../../core/ads/adRegistry";
import { resolveAdsForSlot } from "../../core/ads/adResolver";

import AdCard from "./AdCard";

type Props = {
  slot: AdSlotType;
};

export default function AdSlot({ slot }: Props) {
  const ads = resolveAdsForSlot(slot);

  if (!ads.length) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 970,
          margin: "24px 0",
        }}
      >
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}