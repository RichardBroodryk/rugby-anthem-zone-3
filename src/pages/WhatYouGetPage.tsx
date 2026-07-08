import { useNavigate, useLocation } from "react-router-dom";
import styles from "./WhatYouGetPage.module.css";

/**
 * WHAT YOU GET — WAVE 1
 * Single paid access overview.
 * No freemium / premium / super branching.
 */

type FlowState = {
  country?: string;
};

export default function WhatYouGetPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as FlowState | null;

  const country = state?.country;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>What You Get</h1>
        <p className={styles.subtitle}>
          A clear overview of what is included with Rugby Anthem Zone access.
        </p>
      </header>

      <div className={styles.tierLabel}>
        Viewing: <strong>RAZ Access</strong>
      </div>

      <section className={styles.content}>
        <Section title="Included Access">
          <Item
            title="Anthems"
            description="Full sing-along anthem experience designed for stadium and matchday atmosphere."
          />
          <Item
            title="Tournaments"
            description="Men’s and women’s competitions with access to all games and stadiums."
          />
          <Item
            title="Notifications"
            description="Opt-in alerts for matches, tournaments, and key rugby moments."
          />
          <Item
            title="Match Centre"
            description="Live scores, fixtures, results, and statistical coverage."
          />
          <Item
            title="Matchday Journeys"
            description="Match planning tools including tickets, flights, hotels, and local transport."
          />
          <Item
            title="The Rugby Studio"
            description="Classic tests, match highlights, podcasts, greatest hits, and fan commentary."
          />
          <Item
            title="Fanzone"
            description="Loyalty card program, live match audio, pay-per-view access, and personal team tracking."
          />
          <Item
            title="News"
            description="Breaking stories, transfers, injuries, interviews, press, and rumours."
          />
          <Item
            title="Inside the Game"
            description="Referees, laws, fantasy participation, and broader game understanding."
          />
          <Item
            title="Global Calendar"
            description="Worldwide fixtures, tournaments, and key rugby dates."
          />
          <Item
            title="Stadiums"
            description="Stadium access linked to matches and tournaments."
          />
          <Item
            title="Merch"
            description="Official team and rugby merchandise."
          />
          <Item
            title="Heritage"
            description="Legends, squads, champions, coaches and support staff, officials, and match governance."
          />
          <Item
            title="Defining Rugby Moments"
            description="World Cup turning points, tactical shifts, law changes, calls and decisions, rivalries, and cultural moments."
          />
        </Section>

        <Section title="Access Model">
          <Boundary label="Membership" value="Single paid RAZ access" />
          <Boundary label="Advertising" value="Contextual platform advertising may appear during Wave 1 transition" />
          <Boundary label="Platform billing" value="Web checkout now, Google-ready structure being prepared" />
        </Section>

        <Note>
          Continue to account creation and terms to activate Rugby Anthem Zone access.
        </Note>
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={() =>
            navigate("/signup", {
              state: {
                country,
              },
            })
          }
        >
          Continue
        </button>

        <button className={styles.backLink} onClick={() => navigate("/welcome")}>
          Back to Welcome
        </button>
      </footer>
    </section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.list}>{children}</div>
    </section>
  );
}

function Item({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.item}>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}

function Boundary({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.boundary}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className={styles.note}>{children}</p>;
}