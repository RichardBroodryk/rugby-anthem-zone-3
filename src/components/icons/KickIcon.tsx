type IconProps = {
  size?: number;
  className?: string;
};

export default function KickIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 20L20 4" />
      <circle cx="8" cy="16" r="2" />
    </svg>
  );
}