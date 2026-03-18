type IconProps = {
  size?: number;
  className?: string;
};

export default function YellowCardIcon({ size = 16, className }: IconProps) {
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
      <rect x="7" y="5" width="10" height="14" rx="1" />
    </svg>
  );
}