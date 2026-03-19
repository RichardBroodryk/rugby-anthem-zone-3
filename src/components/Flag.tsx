import "./Flag.css";

type FlagProps = {
  country: string;
  size?: "small" | "medium" | "large" | "xlarge";
};

export default function Flag({ country, size = "medium" }: FlagProps) {
  const fileName = country.toLowerCase().trim().replace(/\s+/g, "-");

  const flagPath = `/assets/images/flags/${fileName}.png`;

  const fallback = country
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <img
      src={flagPath}
      className={`flag flag-${size}`}
      alt={`${country} flag`}
      loading="lazy"
      onError={(e) => {
        const target = e.currentTarget;
        target.style.display = "none";
        const parent = target.parentElement;

        if (parent) {
          const fallbackEl = document.createElement("div");
          fallbackEl.className = `flag-fallback flag-${size}`;
          fallbackEl.innerText = fallback;
          parent.appendChild(fallbackEl);
        }
      }}
    />
  );
}