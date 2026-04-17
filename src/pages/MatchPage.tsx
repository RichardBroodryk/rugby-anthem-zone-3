import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Flag from "../components/images/Flag";
import TeamComparisonTable from "../components/stats/TeamComparisonTable";

import type { MatchData } from "../data/matches/types";
import { matches2026 } from "../data/matches";
import { tournaments2026 } from "../data/tournamentMeta";
import { stadiums } from "../data/stadiums";
import { matchDetails2026 } from "../data/matchDetails2026";

import styles from "./MatchPage.module.css";

import { API_BASE_URL } from "../config/api";

import {
  fetchMatchLineups,
  MatchLineups,
} from "../services/playerService";

/* ================= HELPERS ================= */

function resolveState(match: MatchData): "final" | "upcoming" {
  if (match.score) return "final";
  return new Date(match.date) > new Date() ? "upcoming" : "final";
}

function buildMirrorRows(home: any[], away: any[]) {
  const max = Math.max(home.length, away.length);
  const rows = [];

  for (let i = 0; i < max; i++) {
    rows.push({
      home: home[i],
      away: away[i],
    });
  }

  return rows;
}

/* ================= PAGE ================= */

export default function MatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const matchId = id ? Number(id) : NaN;

  const [stats, setStats] = useState<any>(null);
  const [lineups, setLineups] = useState<MatchLineups | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  const match = matches2026.find((m) => m.id === matchId);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/stats/match/${matchId}`);
        if (res.ok) {
          setStats(await res.json());
          return;
        }
      } catch {}

      const local = matchDetails2026.find((m) => m.matchId === matchId);
      if (local) setStats(local);
    }

    if (!isNaN(matchId)) loadStats();
  }, [matchId]);

  useEffect(() => {
    if (!isNaN(matchId)) {
      fetchMatchLineups(matchId).then(setLineups);
    }
  }, [matchId]);

  useEffect(() => {
    async function loadComments() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/comments?match_id=${matchId}`);
        if (!res.ok) return;
        setComments(await res.json());
      } catch {}
    }

    if (!isNaN(matchId)) loadComments();
  }, [matchId]);

  async function postComment() {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in.");

    await fetch(`${API_BASE_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ match_id: matchId, content: text }),
    });

    setText("");
  }

  if (!match) {
    return <main className={styles.error}>Match not found</main>;
  }

  const instanceId = (match as any).tournamentInstanceId;

  const tournament = tournaments2026.find(
    (t) => t.instanceId === instanceId
  );

  const backToTournament = tournament ? tournament.route : "/tournaments";

  const { home, away, score, venue, date } = match;

  const stadium = stadiums.find((s) => s.name === venue);

  const status = (match as any).state || resolveState(match);

  /* ================= LINEUPS ================= */

  const homePlayers =
    lineups?.home.starting ||
    stats?.lineups?.homeStarting ||
    [];

  const awayPlayers =
    lineups?.away.starting ||
    stats?.lineups?.awayStarting ||
    [];

  const mirrorRows = buildMirrorRows(homePlayers, awayPlayers);

  /* ================= STATS ================= */

  const matchStats = stats
    ? [
        { label: "Possession", home: stats.possession?.home ?? "—", away: stats.possession?.away ?? "—" },
        { label: "Territory", home: stats.territory?.home ?? "—", away: stats.territory?.away ?? "—" },
        { label: "Tries", home: stats.tries?.home ?? score?.home ?? "—", away: stats.tries?.away ?? score?.away ?? "—" },
      ]
    : [];

  /* ================= RENDER ================= */

  return (
    <main className={styles.page}>
      {/* BACK */}
      <nav className={styles.backNav}>
        <button onClick={() => navigate(backToTournament)}>
          ← Back to {tournament ? `${tournament.name} ${tournament.year}` : "Tournaments"}
        </button>
      </nav>

      {/* HEADER */}
      <header className={styles.header}>
        <h1>{match.tournament}</h1>
        <span className={`${styles.status} ${styles[status]}`}>
          {status}
        </span>
      </header>

      {/* TEAMS */}
      <section className={styles.teams}>
        <div>
          <Flag country={home.country} size="large" />
          <h2>{home.name}</h2>
        </div>

        <div className={styles.score}>
          {score ? `${score.home} – ${score.away}` : "vs"}
        </div>

        <div>
          <Flag country={away.country} size="large" />
          <h2>{away.name}</h2>
        </div>
      </section>

      {/* META */}
      <section className={styles.meta}>
        <span>{date}</span>
        <span>{stadium?.name || "Venue TBC"}</span>
      </section>

      {/* LINEUPS — MIRROR */}
      <section className={styles.lineups}>
        <h2>Lineups</h2>

        <div className={styles.mirrorHeader}>
          <span>{home.name}</span>
          <span>vs</span>
          <span>{away.name}</span>
        </div>

        <div className={styles.mirrorGrid}>
          {mirrorRows.map((row, i) => (
            <div key={i} className={styles.mirrorRow}>
              <div className={styles.mirrorPlayerLeft}>
                {row.home && (
                  <>
                    <span className={styles.number}>{row.home.number}</span>
                    <span>{row.home.name}</span>
                  </>
                )}
              </div>

              <div className={styles.mirrorCenter}>vs</div>

              <div className={styles.mirrorPlayerRight}>
                {row.away && (
                  <>
                    <span>{row.away.name}</span>
                    <span className={styles.number}>{row.away.number}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className={styles.section}>
        <h2>Stats</h2>

        <TeamComparisonTable
          home={{ name: home.name, country: home.country }}
          away={{ name: away.name, country: away.country }}
          stats={matchStats}
        />
      </section>

      {/* COMMENTS */}
      <section className={styles.section}>
        <h2>Fan Reactions</h2>

        {comments.map((c) => (
          <p key={c.id}>{c.content}</p>
        ))}

        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={postComment}>Post</button>
      </section>
    </main>
  );
}