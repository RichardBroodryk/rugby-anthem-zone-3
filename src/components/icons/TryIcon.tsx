type IconProps = {
  size?: number;
  className?: string;
};

export default function TryIcon({ size = 16, className }: IconProps) {
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
      <ellipse cx="12" cy="12" rx="6" ry="3" />
    </svg>
  );
}