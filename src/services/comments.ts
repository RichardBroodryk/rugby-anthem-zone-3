const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://rugby-anthem-backend-production.up.railway.app";

export async function fetchTournamentComments(tournamentId: string) {
  const res = await fetch(
    `${API_BASE}/api/comments?tournament_id=${tournamentId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tournament comments");
  }

  return res.json();
}
