import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CalendarPage.module.css";

import PageWrapper from "../components/layout/PageWrapper";
import razLight from "../assets/images/raz/razlight2.png";

import calendarBg from "../assets/images/raz/calendar-hero2.jpg";

import { resolveCalendarMatches } from "../utils/calendar/resolveCalendarMatches";
import { groupMatchesByMonth } from "../utils/calendar/groupMatchesByMonth";

import CalendarMonth from "../components/calendar/CalendarMonth";

import { CalendarMatch } from "../utils/calendar/calendarTypes";

type GenderFilter = "all" | "men" | "women";

export default function CalendarPage() {
  const navigate = useNavigate();

  const [gender, setGender] = useState<GenderFilter>("all");
  const [tournamentId, setTournamentId] = useState<string>("all");

  const [calendarMatches, setCalendarMatches] = useState<CalendarMatch[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ================= */

  useEffect(() => {
    async function loadCalendar() {
      try {
        // ✅ CLEAN: resolver already returns flat data
        const data = await resolveCalendarMatches();

        setCalendarMatches(data);
      } catch {
        setCalendarMatches([]);
      }

      setLoading(false);
    }

    loadCalendar();
  }, []);

  /* ================= TOURNAMENT OPTIONS ================= */

  const tournamentOptions = useMemo(() => {
    const map = new Map<string, string>();

    calendarMatches.forEach((m) => {
      map.set(m.tournamentId, m.tournamentName);
    });

    return Array.from(map.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [calendarMatches]);

  /* ================= FILTER ================= */

  const filteredMatches = useMemo(() => {
    return calendarMatches.filter((m) => {
      if (gender !== "all" && m.gender !== gender) return false;

      if (tournamentId !== "all" && m.tournamentId !== tournamentId)
        return false;

      return true;
    });
  }, [calendarMatches, gender, tournamentId]);

  /* ================= GROUP ================= */

  const monthGroups = groupMatchesByMonth(filteredMatches);

  const goMatchFromCalendar = (id: number) => {
    navigate(`/match/${id}`);
  };

  /* ================= UI ================= */

  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        {/* ================= HERO ================= */}
        <header
          className={styles.hero}
          style={{ backgroundImage: `url(${calendarBg})` }}
        >
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <div className={styles.heroTextBlock}>
              <h1>Global Rugby Calendar</h1>
              <p>
                An authoritative view of confirmed international fixtures,
                <br />
                major tournaments, and key rugby dates across the season.
              </p>
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <section className={styles.section}>
          <h2>Confirmed Fixtures</h2>

          <p className={styles.subtext}>
            Officially released match dates appear here as they are confirmed.
            Fixtures not yet announced are clearly marked as{" "}
            <strong>Coming soon</strong>.
          </p>

          {/* ================= FILTERS ================= */}
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <button
                className={gender === "all" ? styles.active : ""}
                onClick={() => setGender("all")}
              >
                All
              </button>
              <button
                className={gender === "men" ? styles.active : ""}
                onClick={() => setGender("men")}
              >
                Men
              </button>
              <button
                className={gender === "women" ? styles.active : ""}
                onClick={() => setGender("women")}
              >
                Women
              </button>
            </div>

            <select
              className={styles.select}
              value={tournamentId}
              onChange={(e) => setTournamentId(e.target.value)}
            >
              <option value="all">All tournaments</option>
              {tournamentOptions.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* ================= STATES ================= */}
          {loading ? (
            <p>Loading calendar...</p>
          ) : monthGroups.length === 0 ? (
            <p>No fixtures match your filters — try another selection.</p>
          ) : (
            monthGroups.map((group) => (
              <CalendarMonth
                key={`${group.year}-${group.month}`}
                group={group}
                onMatchSelect={goMatchFromCalendar}
              />
            ))
          )}
        </section>
      </main>
    </PageWrapper>
  );
}