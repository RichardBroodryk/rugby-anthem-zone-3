import { useNavigate, useLocation } from "react-router-dom";
import styles from "./WhatYouGetPage.module.css";

/**
 * WHAT YOU GET — POLISH PASS
 * One paid access overview.
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
      <div className={styles.backgroundGlowTop} />
      <div className={styles.backgroundGlowBottom} />

      <div className={styles.contentWrap}>
        <section className={styles.heroFrame}>
          <div className={styles.heroInner}>
            <div className={styles.heroImagePanel}>
              <div className={styles.heroImage} />
              <div className={styles.heroImageOverlay} />

              <div className={styles.heroText}>
                <span className={styles.kicker}>
                  RAZ ACCESS • MEMBERSHIP OVERVIEW • INTERNATIONAL RUGBY
                </span>

                <h1>What You Get</h1>

                <p className={styles.subtitle}>
                  A clear overview of what is included with Rugby Anthem Zone
                  access — from anthems and match centre coverage to tournaments,
                  heritage, matchday tools, and the wider international game.
                </p>

                <div className={styles.tierLabel}>
                  Viewing: <strong>RAZ Access</strong>
                </div>
              </div>
            </div>

            <div className={styles.summaryCardWrap}>
              <section className={styles.summaryCard}>
                <div className={styles.summaryHeader}>
                  <span className={styles.summaryEyebrow}>
                    Monthly Membership
                  </span>
                  <h2>RAZ Access</h2>
                  <p className={styles.summaryTagline}>
                    One monthly paid membership for the full Rugby Anthem Zone
                    experience.
                  </p>
                </div>

                <p className={styles.summaryDescription}>
                  Access Rugby Anthem Zone through a monthly paid membership
                  built around matchdays, tournaments, rugby media, heritage,
                  stadium atmosphere, and the broader international game
                  experience.
                </p>

                <div className={styles.summaryMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Access Model</span>
                    <span className={styles.metaValue}>Monthly paid RAZ access</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Coverage</span>
                    <span className={styles.metaValue}>
                      Anthems, tournaments, match centre, heritage, media, travel
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <section className={styles.lowerPanel}>
              <div className={styles.sectionGrid}>
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
                  <Boundary label="Membership" value="Monthly paid RAZ access" />
                  <Boundary
                    label="Advertising"
                    value="Contextual platform advertising may appear during Wave 1 transition"
                  />
                  <Boundary
                    label="Platform billing"
                    value="Web checkout now, Google-ready structure being prepared"
                  />
                </Section>
              </div>

              <Note>
                Continue to account creation and terms to activate Rugby Anthem
                Zone access.
              </Note>

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

                <button
                  className={styles.backLink}
                  onClick={() => navigate("/welcome")}
                >
                  Back to Welcome
                </button>
              </footer>
            </section>
          </div>
        </section>
      </div>
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
      <div className={styles.sectionHeading}>
        <h2>{title}</h2>
      </div>
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
      <span className={styles.boundaryLabel}>{label}</span>
      <span className={styles.boundaryValue}>{value}</span>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className={styles.note}>{children}</p>;
}