import "./Flag.css";
import { FLAG_MAP } from "../../utils/flagMap"; // adjust path if needed

type FlagProps = {
  country: string;
  size?: "small" | "medium" | "large" | "xlarge";
};

export default function Flag({ country, size = "medium" }: FlagProps) {
  const key = country.toLowerCase().replace(/\s+/g, "-");

  const src = FLAG_MAP[key];

  const fallback = country
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (!src) {
    return (
      <div className={`flag-fallback flag-${size}`}>
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      className={`flag flag-${size}`}
      alt={`${country} flag`}
      loading="lazy"
    />
  );
}