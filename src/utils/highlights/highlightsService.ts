import { API_BASE_URL } from "../../config/api";

export interface MatchHighlight {
  id: number | null;

  type: string;

  title: string;

  description: string | null;

  imageUrl: string;

  url: string;

  embedUrl: string;

  channel: string;

  source: string;

  category: string;

  matchId: number | null;

  raw?: unknown;
}

export async function getMatchHighlights(
  matchId: string | number
): Promise<MatchHighlight[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/stats/highlights/${encodeURIComponent(
      String(matchId)
    )}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch match highlights (${response.status})`
    );
  }

  const data =
    await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(
    (highlight): MatchHighlight => ({
      id:
        highlight.id ??
        null,

      type:
        highlight.type ??
        "",

      title:
        highlight.title ??
        "",

      description:
        highlight.description ??
        null,

      imageUrl:
        highlight.imageUrl ??
        "",

      url:
        highlight.url ??
        "",

      embedUrl:
        highlight.embedUrl ??
        "",

      channel:
        highlight.channel ??
        "",

      source:
        highlight.source ??
        "",

      category:
        highlight.category ??
        "",

      matchId:
        highlight.matchId ??
        null,

      raw:
        highlight.raw,
    })
  );
}

const highlightsService = {
  getMatchHighlights,
};

export default highlightsService;