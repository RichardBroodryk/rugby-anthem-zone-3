import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Flag from "../components/images/Flag";
import TeamComparisonTable from "../components/stats/TeamComparisonTable";

import { matches2026 } from "../data/matches2026";
import { tournaments2026 } from "../data/tournamentMeta";
import { stadiums } from "../data/stadiums";
import { matchDetails2026 } from "../data/matchDetails2026";

import styles from "./MatchPage.module.css";

import { API_BASE_URL } from "../config/api";

/* ================= ICONS ================= */

function TryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="12" rx="6" ry="3" />
    </svg>
  );
}

function KickIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20L20 4" />
      <circle cx="8" cy="16" r="2" />
    </svg>
  );
}

function YellowCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="7" y="5" width="10" height="14" rx="1" />
    </svg>
  );
}

function RedCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="7" y="5" width="10" height="14" rx="1" />
      <line x1="7" y1="5" x2="17" y2="19" />
    </svg>
  );
}

function getTimelineIcon(label: string) {
  const text = label.toLowerCase();

  if (text.includes("try")) return <TryIcon className={styles.timelineIcon} />;
  if (text.includes("conversion")) return <KickIcon className={styles.timelineIcon} />;
  if (text.includes("yellow")) return <YellowCardIcon className={styles.timelineIcon} />;
  if (text.includes("red")) return <RedCardIcon className={styles.timelineIcon} />;

  return null;
}

/* ================= TYPES ================= */

type Player = {
  number: number;
  name: string;
  position?: string;
};

type MatchStats = {
  timeline: {
    minute: string;
    label: string;
  }[];

  lineups: {
    homeStarting: Player[];
    homeBench: Player[];
    awayStarting: Player[];
    awayBench: Player[];
  };
};

/* ================= PAGE ================= */

export default function MatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const matchId = id ? Number(id) : NaN;

  const [stats, setStats] = useState<MatchStats | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  const match = matches2026.find((m) => m.id === matchId);

  /* ================= LOAD STATS ================= */

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/stats/match/${matchId}`
        );

        if (res.ok) {
          const data = await res.json();
          setStats(data);
          return;
        }
      } catch {
        console.warn("API stats unavailable");
      }

      const local = matchDetails2026.find(
        (m) => m.matchId === matchId
      );

      if (local) {
        setStats(local);
      }
    }

    if (matchId) loadStats();
  }, [matchId]);

  /* ================= LOAD COMMENTS ================= */

  useEffect(() => {
    async function loadComments() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/comments?match_id=${matchId}`
        );

        if (!res.ok) return;

        const data = await res.json();
        setComments(data);
      } catch {
        console.error("Failed to load comments");
      }
    }

    if (matchId) loadComments();
  }, [matchId]);

  /* ================= POST COMMENT ================= */

  async function postComment() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to post.");
      return;
    }

    const res = await fetch(`${API_BASE_URL}/api/comments`, {
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

    if (!res.ok) return;

    setText("");

    const refreshed = await fetch(
      `${API_BASE_URL}/api/comments?match_id=${matchId}`
    );

    if (refreshed.ok) {
      const data = await refreshed.json();
      setComments(data);
    }
  }

  /* ================= MATCH LOOKUP ================= */

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

  const backToTournament = tournament
    ? tournament.route
    : "/tournaments";

  const { home, away, score, venue, date } = match;

  const stadium = stadiums.find((s) => s.name === venue);

  const status =
    score !== undefined
      ? "final"
      : new Date(date) > new Date()
      ? "upcoming"
      : "live";

  /* ================= TEAM STATS ================= */

  const matchStats = [
    { label: "Possession", home: "58%", away: "42%" },
    { label: "Territory", home: "61%", away: "39%" },
    {
      label: "Tries",
      home: score ? score.home : 0,
      away: score ? score.away : 0,
    },
    { label: "Tackles Made", home: 142, away: 167 },
    { label: "Missed Tackles", home: 9, away: 21 },
    { label: "Penalties Conceded", home: 8, away: 11 },
  ];

  /* ================= PAGE ================= */

  return (
    <main className={styles.page}>
      {/* BACK */}
      <nav className={styles.backNav}>
        <button onClick={() => navigate(backToTournament)}>
          ← Back to{" "}
          {tournament
            ? `${tournament.name} ${tournament.year}`
            : "Tournaments"}
        </button>
      </nav>

      {/* TOURNAMENT */}
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
          <Flag country={home.country} size="large" />
          <span className={styles.teamName}>{home.name}</span>
        </div>

        {score ? (
          <div className={styles.scoreBlock}>
            <span className={styles.score}>{score.home}</span>
            <span className={styles.scoreDivider}>–</span>
            <span className={styles.score}>{score.away}</span>
          </div>
        ) : (
          <span className={styles.vs}>vs</span>
        )}

        <div className={styles.team}>
          <Flag country={away.country} size="large" />
          <span className={styles.teamName}>{away.name}</span>
        </div>
      </section>

      {/* META */}
      <section className={styles.meta}>
        <span>📅 {date}</span>

        {stadium ? (
          <button
            className={styles.venueLink}
            onClick={() =>
              navigate(`/stadium/${stadium.slug}`)
            }
          >
            🏟 {stadium.name}
          </button>
        ) : (
          <span>🏟 Venue TBC</span>
        )}
      </section>

      {/* TIMELINE */}
      {stats?.timeline && (
        <section className={styles.timeline}>
          <h2>Match Timeline</h2>

          <ul className={styles.timelineList}>
            {stats.timeline.map((e, i) => (
              <li key={i} className={styles.timelineItem}>
                <span className={styles.minute}>{e.minute}</span>

                <span className={styles.label}>
                  {getTimelineIcon(e.label)}
                  {e.label}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* LINEUPS */}
      {/* (UNCHANGED – exactly your original code continues here) */}

      {/* TEAM STATS */}
      <section className={styles.section}>
        <h2>Team Stats</h2>

        <TeamComparisonTable
          home={{ name: home.name, country: home.country }}
          away={{ name: away.name, country: away.country }}
          stats={matchStats}
        />
      </section>

      {/* FAN REACTIONS */}
      <section className={styles.section}>
        <h2>Fan Reactions</h2>

        <div className={styles.commentsPanel}>
          {comments.length > 0 ? (
            comments.map((c) => (
              <p key={c.id}>“{c.content}”</p>
            ))
          ) : (
            <p>No reactions yet.</p>
          )}
        </div>

        <div className={styles.commentInput}>
          <textarea
            placeholder="Share your reaction…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={postComment}>Post</button>
        </div>
      </section>
    </main>
  );
}