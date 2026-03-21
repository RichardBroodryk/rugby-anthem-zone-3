import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotificationsPage.module.css";

import { loadMyTeams } from "../utils/myTeamsStorage";
import { teamsMeta, TeamMeta } from "../data/teamsMeta";

import { getMatches } from "../data/matchesAdapter";
import { MatchData } from "../data/matches2026";

/* ================= TYPES ================= */

type NotificationItem = {
  id: number;
  type: "match" | "fantasy" | "news" | "system";
  title: string;
  message: string;
  enabled: boolean;
};

type GeneratedNotification = {
  id: number;
  text: string;
  sub: string;
};

/* ================= STORAGE ================= */

const STORAGE_KEY = "raz_sent_notifications_v1";

function loadSent(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSent(ids: number[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

/* ================= LIVE DETECTION ================= */

function getMatchState(dateStr: string, hasScore: boolean) {
  const now = new Date();
  const matchDate = new Date(dateStr);

  if (hasScore) return "final";

  const diffMs = matchDate.getTime() - now.getTime();
  const diffMinutes = diffMs / (1000 * 60);

  if (diffMinutes < 0 && diffMinutes > -120) return "live"; // last 2h
  if (diffMinutes >= 0 && diffMinutes <= 60) return "starting";
  if (matchDate.toDateString() === now.toDateString()) return "today";

  return "upcoming";
}

/* ================= PAGE ================= */

export default function NotificationsPage() {
  const navigate = useNavigate();

  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  const [items, setItems] = useState<NotificationItem[]>([
    {
      id: 1,
      type: "match",
      title: "Match Alerts",
      message:
        "Kick-off reminders, live updates, and final scores.",
      enabled: true,
    },
    {
      id: 2,
      type: "fantasy",
      title: "Fantasy Updates",
      message: "Fantasy reminders and updates.",
      enabled: true,
    },
    {
      id: 3,
      type: "news",
      title: "Rugby News",
      message: "Major rugby news and announcements.",
      enabled: true,
    },
    {
      id: 4,
      type: "system",
      title: "Platform Messages",
      message: "System and account updates.",
      enabled: true,
    },
  ]);

  const [teams, setTeams] = useState<TeamMeta[]>([]);
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [sentIds, setSentIds] = useState<number[]>(loadSent());

  /* ================= PERMISSION ================= */

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  /* ================= LOAD TEAMS ================= */

  useEffect(() => {
    const stored = loadMyTeams();
    const selected = teamsMeta.filter(
      (t) =>
        stored.men.includes(t.id) || stored.women.includes(t.id)
    );
    setTeams(selected);
  }, []);

  /* ================= LOAD MATCHES ================= */

  useEffect(() => {
    getMatches().then(setMatches);
  }, []);

  /* ================= DERIVE ================= */

  const teamNames = useMemo(
    () => teams.map((t) => t.name),
    [teams]
  );

  const generatedNotifications: GeneratedNotification[] =
    useMemo(() => {
      return matches
        .filter(
          (m) =>
            teamNames.includes(m.home.name) ||
            teamNames.includes(m.away.name)
        )
        .map((m) => {
          const state = getMatchState(
            m.date,
            Boolean(m.score)
          );

          if (state === "final" && m.score) {
            return {
              id: m.id,
              text: `FINAL: ${m.home.name} ${m.score.home} - ${m.score.away} ${m.away.name}`,
              sub: m.tournament,
            };
          }

          if (state === "live") {
            return {
              id: m.id,
              text: `LIVE NOW: ${m.home.name} vs ${m.away.name}`,
              sub: m.tournament,
            };
          }

          if (state === "starting") {
            return {
              id: m.id,
              text: `Starting Soon: ${m.home.name} vs ${m.away.name}`,
              sub: m.tournament,
            };
          }

          if (state === "today") {
            return {
              id: m.id,
              text: `Today: ${m.home.name} vs ${m.away.name}`,
              sub: m.tournament,
            };
          }

          return null;
        })
        .filter(Boolean)
        .slice(0, 10) as GeneratedNotification[];
    }, [matches, teamNames]);

  /* ================= PUSH ================= */

  useEffect(() => {
    if (permission !== "granted") return;

    const matchAlertsEnabled =
      items.find((i) => i.type === "match")?.enabled;

    if (!matchAlertsEnabled) return;

    const updated = [...sentIds];

    generatedNotifications.forEach((n) => {
      if (updated.includes(n.id)) return;

      try {
        new Notification(n.text, { body: n.sub });
        updated.push(n.id);
      } catch {}
    });

    setSentIds(updated);
    saveSent(updated);
  }, [generatedNotifications, permission, items]);

  /* ================= TOGGLE ================= */

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, enabled: !item.enabled }
          : item
      )
    );
  };

  /* ================= UI ================= */

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Notifications</h1>
          <p>
            Live alerts powered by your selected teams and match timing.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.mainGrid}>
          <aside className={styles.leftColumn}>
            <div className={styles.statusBlock}>
              <h3>Status</h3>
              <p className={styles.statusValue}>
                {permission.toUpperCase()}
              </p>

              {permission === "default" && (
                <button
                  className={styles.primaryButton}
                  onClick={requestPermission}
                >
                  Enable Notifications
                </button>
              )}
            </div>
          </aside>

          <article className={styles.rightColumn}>
            <section className={styles.teamAlerts}>
              <h2>Live Alerts</h2>

              {generatedNotifications.length === 0 ? (
                <div className={styles.emptyState}>
                  No live alerts right now.
                </div>
              ) : (
                generatedNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={styles.notificationItem}
                  >
                    <strong>{n.text}</strong>
                    <p className={styles.message}>{n.sub}</p>
                  </div>
                ))
              )}
            </section>

            <section className={styles.globalAlerts}>
              <h2>Notification Categories</h2>

              {items.map((item) => (
                <div
                  key={item.id}
                  className={styles.notificationItem}
                >
                  <div className={styles.notificationHeader}>
                    <span className={styles.notificationTitle}>
                      {item.title}
                    </span>

                    <button
                      className={styles.primaryButton}
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.enabled ? "Active" : "Off"}
                    </button>
                  </div>

                  <p className={styles.message}>
                    {item.message}
                  </p>
                </div>
              ))}
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}