// src/services/statscoreApi.ts

const BASE_URL = "https://api.statscore.com/v2";

const CLIENT_ID = "2693";
const SECRET_KEY = "7WVjRGn3PMsDHtUQa7ySnqmv3vOWS3b6vrY";

/* ================= TOKEN ================= */

let cachedToken: string | null = null;

async function getToken(): Promise<string> {
  if (cachedToken) return cachedToken;

  const response = await fetch(
    `${BASE_URL}/oauth?client_id=${CLIENT_ID}&secret_key=${SECRET_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to authenticate with Statscore API");
  }

  const data = await response.json();

  cachedToken = data.token;

  return cachedToken!;
}

/* ================= GENERIC FETCH ================= */

async function statscoreFetch(resource: string) {
  const token = await getToken();

  const response = await fetch(
    `${BASE_URL}/${resource}?token=${token}`
  );

  if (!response.ok) {
    throw new Error(`Statscore request failed: ${response.status}`);
  }

  const data = await response.json();

  return data.data;
}

/* ================= EXPORTS ================= */

export async function fetchCompetitions() {
  return statscoreFetch("competitions");
}

export async function fetchEvents() {
  return statscoreFetch("events");
}

export async function fetchParticipants() {
  return statscoreFetch("participants");
}

export async function fetchStandings() {
  return statscoreFetch("standings");
}