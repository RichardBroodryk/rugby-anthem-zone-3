import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import Flag from "../components/images/Flag";
import TeamComparisonTable from "../components/stats/TeamComparisonTable";

import { getMatches } from "../data/matchesAdapter";
import { MatchData } from "../data/matches2026";

import { tournaments2026 } from "../data/tournamentMeta";
import { stadiums } from "../data/stadiums";
import { matchDetails2026 } from "../data/matchDetails2026";

import styles from "./MatchPage.module.css";
import { API_BASE_URL } from "../config/api";

/* ================= MATCH STATE ================= */

function getMatchState(dateStr: string, hasScore?: boolean) {
  const now = new Date();
  const matchDate = new Date(dateStr);

  if (hasScore) return "final";

  const diff = (matchDate.getTime() - now.getTime()) / (1000 * 60);

  if (diff < 0 && diff > -120) return "live";
  if (diff >= 0 && diff <= 60) return "starting";
  if (matchDate.toDateString() === now.toDateString()) return "today";

  return "upcoming";
}

/* ================= PAGE ================= */

export default function MatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const matchId = id ? Number(id) : NaN;

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= LOAD MATCHES ================= */

  useEffect(() => {
    async function load() {
      const data = await getMatches();
      setMatches(data);
      setLoading(false);
    }
    load();
  }, []);

  const match = useMemo(
    () => matches.find((m) => m.id === matchId),
    [matches, matchId]
  );

  /* ================= LOAD STATS ================= */

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/stats/match/${matchId}`
        );

        if (res.ok) {
          setStats(await res.json());
          return;
        }
      } catch {}

      const local = matchDetails2026.find(
        (m) => m.matchId === matchId
      );

      if (local) setStats(local);
    }

    if (matchId) loadStats();
  }, [matchId]);

  /* ================= COMMENTS ================= */

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/comments?match_id=${matchId}`)
      .then((r) => r.json())
      .then(setComments)
      .catch(() => {});
  }, [matchId]);

  async function postComment() {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    await fetch(`${API_BASE_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        match_id: matchId,
        content: text,
      }),
    });

    setText("");
  }

  /* ================= STATES ================= */

  if (loading) {
    return (
      <main className={styles.page}>
        <p style={{ textAlign: "center", padding: 40 }}>
          Loading match...
        </p>
      </main>
    );
  }

  if (!match) {
    return (
      <main className={styles.error}>
        <h2>Match not found</h2>
      </main>
    );
  }

  const tournament = tournaments2026.find(
    (t) => t.matchKey === match.tournament
  );

  const stadium = stadiums.find(
    (s) => s.name === match.venue
  );

  const status = getMatchState(match.date, !!match.score);

  /* ================= PAGE ================= */

  return (
    <main className={styles.page}>
      {/* BACK */}
      <nav className={styles.backNav}>
        <button onClick={() => navigate("/match-center")}>
          ← Back to Match Center
        </button>
      </nav>

      {/* HEADER */}
      <header className={styles.tournamentHeader}>
        <h1>{match.tournament}</h1>
      </header>

      {/* STATUS */}
      <section className={styles.statusBar}>
        <span className={`${styles.status} ${styles[status]}`}>
          {status}
        </span>
      </section>

      {/* TEAMS */}
      <section className={styles.vsSection}>
        <div className={styles.team}>
          <Flag country={match.home.country} size="large" />
          <span>{match.home.name}</span>
        </div>

        {match.score ? (
          <div className={styles.scoreBlock}>
            {match.score.home} – {match.score.away}
          </div>
        ) : (
          <span className={styles.vs}>vs</span>
        )}

        <div className={styles.team}>
          <Flag country={match.away.country} size="large" />
          <span>{match.away.name}</span>
        </div>
      </section>

      {/* META */}
      <section className={styles.meta}>
        <span>{match.date}</span>

        {stadium && (
          <button
            onClick={() =>
              navigate(`/stadium/${stadium.slug}`)
            }
          >
            {stadium.name}
          </button>
        )}
      </section>

      {/* TIMELINE */}
      {stats?.timeline && (
        <section className={styles.timeline}>
          <h2>Match Timeline</h2>

          {stats.timeline.map((e: any, i: number) => (
            <p key={i}>
              {e.minute} — {e.label}
            </p>
          ))}
        </section>
      )}

      {/* STATS */}
      <section className={styles.section}>
        <h2>Team Stats</h2>

        <TeamComparisonTable
          home={match.home}
          away={match.away}
          stats={[
            { label: "Tries", home: 4, away: 2 },
            { label: "Possession", home: "60%", away: "40%" },
          ]}
        />
      </section>

      {/* COMMENTS */}
      <section className={styles.section}>
        <h2>Fan Reactions</h2>

        {comments.map((c) => (
          <p key={c.id}>{c.content}</p>
        ))}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={postComment}>Post</button>
      </section>
    </main>
  );
}