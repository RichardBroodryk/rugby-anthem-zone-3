/* =========================================================
   RUGBY ANTHEM ZONE
   HOTELS BY STADIUM — CANONICAL DATASET (v1.3 COMPLETE)
   Status: Global supporter dataset (LOCKED)
   Rule: Stadium-centric · No booking simulation
   ========================================================= */

export type HotelCategory =
  | "walkable"
  | "short-commute"
  | "city-supporter-hub";

export type Hotel = {
  name: string;
  category: HotelCategory;
  distanceNote: string;
  features: string[];
  bookingUrl: string;
  affiliate?: boolean;
  fanNote?: string;
};

export type StadiumHotels = {
  stadiumSlug: string;
  stadiumName: string;
  city: string;
  country: string;
  tier: 1;
  hotels: Hotel[];
  notes?: string;
};

export const hotelsByStadium: StadiumHotels[] = [
  /* ================= ENGLAND ================= */
  {
    stadiumSlug: "twickenham",
    stadiumName: "Twickenham Stadium",
    city: "London",
    country: "England",
    tier: 1,
    hotels: [
      {
        name: "London Twickenham Stadium Hotel",
        category: "walkable",
        distanceNote: "5–10 min walk",
        features: ["Matchday proximity", "Bar & dining"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
        fanNote: "Closest possible stay — fills first.",
      },
      {
        name: "Travelodge London Twickenham",
        category: "walkable",
        distanceNote: "10–15 min walk",
        features: ["Budget", "Reliable"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Richmond Hill Hotel",
        category: "short-commute",
        distanceNote: "10 min taxi",
        features: ["Premium area", "Pubs"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Central London (Paddington / Waterloo)",
        category: "city-supporter-hub",
        distanceNote: "25–35 min train",
        features: ["Transport hubs", "Nightlife"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= IRELAND ================= */
  {
    stadiumSlug: "aviva-stadium",
    stadiumName: "Aviva Stadium",
    city: "Dublin",
    country: "Ireland",
    tier: 1,
    hotels: [
      {
        name: "Clayton Hotel Ballsbridge",
        category: "walkable",
        distanceNote: "5–10 min walk",
        features: ["Closest hotel"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Sandymount Hotel",
        category: "walkable",
        distanceNote: "10 min walk",
        features: ["Rugby heritage"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Temple Bar Area Hotels",
        category: "city-supporter-hub",
        distanceNote: "10–15 min taxi",
        features: ["Nightlife"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= SCOTLAND ================= */
  {
    stadiumSlug: "murrayfield",
    stadiumName: "Scottish Gas Murrayfield Stadium",
    city: "Edinburgh",
    country: "Scotland",
    tier: 1,
    hotels: [
      {
        name: "Holiday Inn Edinburgh Zoo",
        category: "walkable",
        distanceNote: "10–15 min walk",
        features: ["Reliable"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Leonardo Hotel Murrayfield",
        category: "walkable",
        distanceNote: "10 min walk",
        features: ["Fan favourite"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Old Town Hotels",
        category: "city-supporter-hub",
        distanceNote: "15 min tram",
        features: ["Atmosphere"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= WALES ================= */
  {
    stadiumSlug: "principality-stadium",
    stadiumName: "Principality Stadium",
    city: "Cardiff",
    country: "Wales",
    tier: 1,
    hotels: [
      {
        name: "The Angel Hotel",
        category: "walkable",
        distanceNote: "Opposite stadium",
        features: ["Historic"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Park Plaza Cardiff",
        category: "walkable",
        distanceNote: "10 min walk",
        features: ["Central"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= FRANCE ================= */
  {
    stadiumSlug: "stade-de-france",
    stadiumName: "Stade de France",
    city: "Paris",
    country: "France",
    tier: 1,
    hotels: [
      {
        name: "Novotel Suites Stade de France",
        category: "walkable",
        distanceNote: "10 min walk",
        features: ["Closest"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Ibis Saint-Denis",
        category: "walkable",
        distanceNote: "10–15 min walk",
        features: ["Budget"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Central Paris Hotels",
        category: "city-supporter-hub",
        distanceNote: "20 min RER",
        features: ["Tourism"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= ITALY ================= */
  {
    stadiumSlug: "stadio-olimpico-rome",
    stadiumName: "Stadio Olimpico",
    city: "Rome",
    country: "Italy",
    tier: 1,
    hotels: [
      {
        name: "Hotel Ponte Milvio",
        category: "short-commute",
        distanceNote: "10–15 min walk",
        features: ["Bars nearby"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Central Rome Hotels",
        category: "city-supporter-hub",
        distanceNote: "20 min taxi",
        features: ["Tourism"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= AUSTRALIA ================= */
  {
    stadiumSlug: "stadium-australia",
    stadiumName: "Stadium Australia",
    city: "Sydney",
    country: "Australia",
    tier: 1,
    hotels: [
      {
        name: "Pullman Sydney Olympic Park",
        category: "walkable",
        distanceNote: "5 min walk",
        features: ["Closest premium"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Sydney CBD Hotels",
        category: "city-supporter-hub",
        distanceNote: "30 min train",
        features: ["Harbour"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= NEW ZEALAND ================= */
  {
    stadiumSlug: "eden-park",
    stadiumName: "Eden Park",
    city: "Auckland",
    country: "New Zealand",
    tier: 1,
    hotels: [
      {
        name: "Quest Kingsland",
        category: "walkable",
        distanceNote: "2–5 min walk",
        features: ["Closest"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
      {
        name: "Auckland CBD Hotels",
        category: "city-supporter-hub",
        distanceNote: "10–15 min train",
        features: ["Nightlife"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= ARGENTINA ================= */
  {
    stadiumSlug: "jose-amalfitani",
    stadiumName: "Estadio José Amalfitani",
    city: "Buenos Aires",
    country: "Argentina",
    tier: 1,
    hotels: [
      {
        name: "Palermo District Hotels",
        category: "city-supporter-hub",
        distanceNote: "20–30 min taxi",
        features: ["Nightlife"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= JAPAN ================= */
  {
    stadiumSlug: "japan-national-stadium",
    stadiumName: "Japan National Stadium",
    city: "Tokyo",
    country: "Japan",
    tier: 1,
    hotels: [
      {
        name: "Shinjuku Hotels",
        category: "city-supporter-hub",
        distanceNote: "15 min train",
        features: ["Transport hub"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },

  /* ================= FIJI ================= */
  {
    stadiumSlug: "hfc-bank-stadium",
    stadiumName: "HFC Bank Stadium",
    city: "Suva",
    country: "Fiji",
    tier: 1,
    hotels: [
      {
        name: "Holiday Inn Suva",
        category: "short-commute",
        distanceNote: "5–10 min drive",
        features: ["Reliable", "Waterfront"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
        fanNote: "Primary choice for international supporters.",
      },
      {
        name: "Grand Pacific Hotel",
        category: "short-commute",
        distanceNote: "5–10 min drive",
        features: ["Luxury", "Historic"],
        bookingUrl: "https://www.booking.com/",
        affiliate: true,
      },
    ],
  },
];