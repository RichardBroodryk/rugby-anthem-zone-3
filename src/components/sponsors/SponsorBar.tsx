import styles from "./SponsorBar.module.css";

export type Sponsor = {
  name: string;
  logo?: string;
  url?: string;
};

type SponsorBarProps = {
  sponsors: Sponsor[];
  fallbackText?: string;
};

export default function SponsorBar({
  sponsors,
  fallbackText = "Official Rugby Partner",
}: SponsorBarProps) {
  if (!sponsors || sponsors.length === 0) {
    return (
      <div className={styles.bar}>
        <span className={styles.fallback}>{fallbackText}</span>
      </div>
    );
  }

  return (
    <div className={styles.bar}>
      {sponsors.map((sponsor) => (
        <a
          key={sponsor.name}
          href={sponsor.url || "#"}
          className={styles.sponsor}
          target="_blank"
          rel="noopener noreferrer"
        >
          {sponsor.logo ? (
            <img src={sponsor.logo} alt={sponsor.name} />
          ) : (
            <span>{sponsor.name}</span>
          )}
        </a>
      ))}
    </div>
  );
}
