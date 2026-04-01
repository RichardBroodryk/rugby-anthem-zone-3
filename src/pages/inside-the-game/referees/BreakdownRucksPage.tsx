import { useNavigate } from "react-router-dom";
import styles from "./BreakdownRucksPage.module.css";

import rulesHero from "../../../assets/images/referee/rules-hero.jpg";

// 🔥 NEW IMAGES
import breakdownImg from "../../../assets/images/referee/breakdown.jpg";
import ruckImg from "../../../assets/images/referee/ruck.jpg";
import cleanImg from "../../../assets/images/referee/inside-outside-clean.jpg";

export default function BreakdownRucksPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${rulesHero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Breakdown &amp; Rucks</h1>
          <p>Where most refereeing decisions — and controversies — are made.</p>
        </div>
      </header>

      {/* ================= BACK ================= */}
      <div className={styles.backWrap}>
        <button onClick={() => navigate("/inside-the-game/referees")}>
          ← Back to Referee Hub
        </button>
      </div>

      {/* ================= WHY IT MATTERS ================= */}
      <section className={styles.section}>
        <h2>Why the Breakdown Matters</h2>
        <p>
          The breakdown is rugby’s most complex contest. It is where possession,
          momentum, and discipline intersect — often within fractions of a
          second.
        </p>
        <p>
          Referees must judge player intent, body position, entry angles, and
          timing in real time, all while managing player safety and game flow.
        </p>
      </section>

      {/* ================= BREAKDOWN VS RUCK ================= */}
      <section className={styles.section}>
        <h2>Breakdown vs Ruck</h2>

        <div className={styles.imageWrap}>
          <img src={breakdownImg} alt="Breakdown contest in rugby" />
        </div>

        <p>
          The <strong>breakdown</strong> is the moment immediately after a tackle
          — when both teams compete for the ball. It is still “open,” meaning a
          defender can legally contest possession with their hands.
        </p>

        <div className={styles.imageWrap}>
          <img src={ruckImg} alt="Ruck formation in rugby" />
        </div>

        <p>
          A <strong>ruck</strong> forms once players from both teams are on their
          feet, bound over the ball. From that moment, the contest changes — no
          hands are allowed, and possession must be won with body position and
          drive.
        </p>
      </section>

      {/* ================= LAW FOUNDATION ================= */}
      <section className={styles.section}>
        <h2>What Defines a Ruck (Law)</h2>
        <ul>
          <li>Players from both teams must be on their feet</li>
          <li>They must be in contact and over the ball</li>
          <li>Entry must be through the “gate” (from behind)</li>
          <li>No hands allowed once the ruck has formed</li>
          <li>Players must support their own body weight</li>
        </ul>
      </section>

      {/* ================= ROLES ================= */}
      <section className={styles.section}>
        <h2>Roles at the Breakdown</h2>

        <p>
          Every breakdown is shaped by four key roles, each with specific
          responsibilities and legal requirements.
        </p>

        <ul>
          <li>
            <strong>Ball Carrier</strong> — Must present the ball immediately and
            cleanly after the tackle.
          </li>
          <li>
            <strong>Tackler</strong> — Must release, roll away, and re-enter from
            an onside position.
          </li>
          <li>
            <strong>Jackler</strong> — First defender competing for the ball,
            must be on feet and supporting body weight.
          </li>
          <li>
            <strong>Cleaners</strong> — Attacking support players who remove
            defenders and secure possession.
          </li>
        </ul>

        <div className={styles.imageWrap}>
          <img src={cleanImg} alt="Rugby cleanout technique" />
        </div>

        <p>
          Modern cleanouts focus on strong body position and legal entry,
          targeting the opponent’s torso while staying on feet — not diving or
          collapsing.
        </p>
      </section>

      {/* ================= JACKAL ================= */}
<section className={styles.section}>
  <h2>The Jackal — Rugby’s Turnover Specialist</h2>
  <p>
    The jackal is the first defender to arrive at the breakdown and attempt to
    win the ball. It is one of the most difficult and valuable skills in rugby.
  </p>
  <p>
    To be legal, the jackler must arrive on their feet, get hands on the ball
    before a ruck forms, and support their own body weight throughout the
    contest. Any collapse, loss of balance, or delay turns a potential turnover
    into a penalty.
  </p>
  <p>
    At elite level, the difference between a turnover and a penalty often comes
    down to fractions of a second — who arrives first, who is stable, and who
    shows clear control to the referee.
  </p>
</section>

{/* ================= ELITE PLAYERS ================= */}
<section className={styles.section}>
  <h2>Elite Breakdown Specialists</h2>
  <p>
    Some players have defined the breakdown through their ability to win or slow
    possession under pressure.
  </p>

  <ul>
    <li>
      <strong>Richie McCaw</strong> — Master of timing and positioning, known for
      slowing opposition ball and winning crucial turnovers.
    </li>
    <li>
      <strong>David Pocock</strong> — One of the purest jacklers in the modern
      game, combining strength with perfect body height.
    </li>
    <li>
      <strong>Michael Hooper</strong> — Relentless work rate and speed to the
      breakdown.
    </li>
    <li>
      <strong>Sam Underhill</strong> — Defensive dominance and physical presence
      at contact.
    </li>
    <li>
      <strong>Kwagga Smith</strong> — Modern hybrid player, exceptional over the
      ball and in open play.
    </li>
    <li>
      <strong>Pieter-Steph du Toit</strong> — Combines power and endurance to
      influence multiple phases.
    </li>
  </ul>

  <p>
    These players turn single moments at the breakdown into match-defining
    events — penalties, turnovers, or disrupted attacking flow.
  </p>
</section>

{/* ================= IMPACT ================= */}
<section className={styles.section}>
  <h2>What Winning the Breakdown Does</h2>
  <p>
    Control of the breakdown directly shapes the tempo of a match. Quick,
    clean ball allows attacking teams to build pressure, while slow or disrupted
    ball gives defenders time to reset.
  </p>
  <p>
    Turnovers often lead to immediate attacking opportunities, while repeated
    penalties at the breakdown can decide territory, scoreboard pressure, and
    ultimately the result.
  </p>
</section>

      {/* ================= REFEREE FOCUS ================= */}
      <section className={styles.section}>
        <h2>What Referees Look For</h2>
        <ul>
          <li>Entry through the gate</li>
          <li>Clear release by the tackler</li>
          <li>Players staying on their feet</li>
          <li>Legal timing of hands on the ball</li>
          <li>Dangerous or illegal cleanouts</li>
        </ul>
      </section>

      {/* ================= REFEREE SNAPSHOTS ================= */}
<section className={styles.section}>
  <h2>Referee Decision Snapshots</h2>

  <p>
    At the breakdown, referees are not judging one action — they are reading a
    sequence. These are common real-match decisions and what drives them.
  </p>

  <div className={styles.callBox}>
    <h3>Turnover Won</h3>
    <p>
      Defender arrives first, stays on feet, clamps onto the ball before the
      ruck forms, and clearly supports body weight.
    </p>
    <span className={styles.callOutcome}>Outcome: Play on</span>
  </div>

  <div className={styles.callBox}>
    <h3>Holding On (Penalty)</h3>
    <p>
      Ball carrier fails to release or place the ball immediately, preventing a
      fair contest.
    </p>
    <span className={styles.callOutcome}>Outcome: Penalty</span>
  </div>

  <div className={styles.callBox}>
    <h3>Not Supporting Body Weight</h3>
    <p>
      Jackler gets hands on the ball but collapses or leans on the tackled
      player.
    </p>
    <span className={styles.callOutcome}>Outcome: Penalty</span>
  </div>

  <div className={styles.callBox}>
    <h3>Side Entry</h3>
    <p>
      Support player enters the breakdown from the side instead of through the
      gate.
    </p>
    <span className={styles.callOutcome}>Outcome: Penalty</span>
  </div>
</section>

{/* ================= LIVE FLOW ================= */}
<section className={styles.section}>
  <h2>What Happens in 3 Seconds</h2>

  <p>
    Most breakdown decisions happen within three seconds of the tackle. This is
    the sequence referees are reading in real time:
  </p>

  <ol className={styles.flowList}>
    <li>
      <strong>Tackle</strong> — Ball carrier goes to ground, tackler must release
      immediately.
    </li>
    <li>
      <strong>First Arrival</strong> — Defender or support player reaches the
      ball first.
    </li>
    <li>
      <strong>Contest or Clear</strong> — Jackler attempts steal OR attackers
      clean out.
    </li>
    <li>
      <strong>Ruck Forms</strong> — Once players bind, hands are no longer
      allowed.
    </li>
    <li>
      <strong>Ball Played</strong> — Scrum-half clears or referee calls “Use it”.
    </li>
  </ol>

  <p>
    The referee’s role is to reward the player who wins this race legally — not
    the one who arrives later or more aggressively.
  </p>
</section>

      {/* ================= FAN PERCEPTION ================= */}
      <section className={styles.section}>
        <h2>Why Fans Disagree</h2>
        <p>
          Breakdown decisions happen in real time, often within seconds. What
          referees judge live can look very different on slow-motion replay.
        </p>
        <p>
          Camera angles, timing, and interpretation all influence perception —
          which is why understanding the laws and roles helps explain decisions
          that may initially seem inconsistent.
        </p>
      </section>

      {/* ================= COMMON PENALTIES ================= */}
      <section className={styles.section}>
        <h2>Common Penalties</h2>
        <ul>
          <li>Side entry (not through the gate)</li>
          <li>Hands in the ruck</li>
          <li>Not releasing (tackler or ball carrier)</li>
          <li>Off feet / not supporting body weight</li>
          <li>Dangerous cleanout</li>
        </ul>
      </section>
    </main>
  );
}