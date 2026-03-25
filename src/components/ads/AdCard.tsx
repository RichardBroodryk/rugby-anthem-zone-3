// ======================================================
// RAZ — AdCard (UI ONLY)
// Phase 5 — Step 4
// ======================================================

import { Advertiser } from "../../core/ads/adRegistry";

type Props = {
  ad: Advertiser;
};

export default function AdCard({ ad }: Props) {
  return (
    <a
      href={ad.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        width: "100%",
        maxWidth: 970,
      }}
    >
      <img
        src={ad.image}
        alt={ad.name}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: 6,
        }}
      />
    </a>
  );
}