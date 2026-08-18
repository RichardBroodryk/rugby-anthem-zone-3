import { API_BASE_URL } from "../../config/api";
import { getToken } from "../../services/auth";

/* ==================================================
   RAZ MATCH CONTENT SERVICE
   ==================================================

   Purpose:

   Provides the frontend connection to the
   administrator-managed match_content backend.

   READ:
   Public match content retrieval.

   UPDATE:
   Authenticated administrator only.

   The backend performs the actual administrator
   authorization check using ADMIN_EMAIL.

   This service does NOT contain the administrator
   email and does NOT decide who is an admin.
   ==================================================
*/

export interface MatchContent {
  id: number | null;
  match_id: number;

  highlight_url: string | null;

  home_metres_made: number | null;
  home_carries: number | null;
  home_defenders_beaten: number | null;
  home_clean_breaks: number | null;
  home_offloads: number | null;
  home_tackles_made: number | null;
  home_tackles_missed: number | null;
  home_turnovers_won: number | null;
  home_penalties_conceded: number | null;

  away_metres_made: number | null;
  away_carries: number | null;
  away_defenders_beaten: number | null;
  away_clean_breaks: number | null;
  away_offloads: number | null;
  away_tackles_made: number | null;
  away_tackles_missed: number | null;
  away_turnovers_won: number | null;
  away_penalties_conceded: number | null;

  updated_at?: string;
}

/* ==================================================
   GET MATCH CONTENT
   ================================================== */

export async function getMatchContent(
  matchId: string | number
): Promise<MatchContent | null> {
  const response = await fetch(
    `${API_BASE_URL}/api/match-content/${encodeURIComponent(
      String(matchId)
    )}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch match content (${response.status})`
    );
  }

  const data = await response.json();

  if (!data) {
    return null;
  }

  return data as MatchContent;
}

/* ==================================================
   UPDATE MATCH CONTENT
   ================================================== */

export async function updateMatchContent(
  matchId: string | number,
  content: Omit<
    MatchContent,
    "id" | "match_id" | "updated_at"
  >
): Promise<MatchContent> {
  const token = getToken();

  if (!token) {
    throw new Error(
      "You must be logged in to update match content."
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/api/match-content/${encodeURIComponent(
      String(matchId)
    )}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      credentials: "include",

      body: JSON.stringify(content),
    }
  );

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data &&
      typeof data === "object" &&
      "error" in data
        ? String(
            (data as { error?: unknown }).error ||
              `Failed to update match content (${response.status})`
          )
        : `Failed to update match content (${response.status})`;

    throw new Error(message);
  }

  return data as MatchContent;
}

/* ==================================================
   SERVICE EXPORT
   ================================================== */

const matchContentService = {
  getMatchContent,
  updateMatchContent,
};

export default matchContentService;