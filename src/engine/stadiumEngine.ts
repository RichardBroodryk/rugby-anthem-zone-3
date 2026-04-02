/* ================= IMPORTS ================= */

import { stadiumRegistry } from "./stadiums";

/* ================= TYPES ================= */

export type StadiumGallery = {
  aerial?: string;
  inside?: string;
  outside?: string;
  crowds?: string;
  seating?: string;
};

export type SeatingZone = {
  name: string;
  type: "premium" | "standard" | "budget";
  view: "sideline" | "corner" | "end";
  atmosphere: number;
};

export type StadiumMeta = {
  capacity?: number;
  altitude?: number; // meters
  pitch?: "grass" | "hybrid";
  roof?: "open" | "closed" | "retractable";
};

export type StadiumExperience = {
  atmosphereScore?: number; // 1–5
  homeAdvantage?: number;   // 1–5
  arrivalTip?: string;
};

export type StadiumIntelligence = {
  hero?: string;
  gallery?: StadiumGallery;
  seating?: SeatingZone[];

  /* 🧠 NEW */
  meta?: StadiumMeta;
  experience?: StadiumExperience;
};

/* ================= RESOLVERS ================= */

export function getStadiumHero(slug: string, fallback?: string) {
  return stadiumRegistry[slug]?.hero || fallback;
}

export function getStadiumGallery(slug: string): StadiumGallery {
  return stadiumRegistry[slug]?.gallery || {};
}

export function getStadiumSeating(slug: string): SeatingZone[] {
  return stadiumRegistry[slug]?.seating || [];
}

/* 🧠 NEW */

export function getStadiumMeta(slug: string): StadiumMeta {
  return stadiumRegistry[slug]?.meta || {};
}

export function getStadiumExperience(slug: string): StadiumExperience {
  return stadiumRegistry[slug]?.experience || {};
}