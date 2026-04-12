export default function Logo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Outer circle */}
      <circle cx="24" cy="24" r="22" stroke="#f9a926" strokeWidth="2" fill="none" />

      {/* Motorcycle-inspired symbol */}
      {/* Front wheel */}
      <circle cx="14" cy="28" r="5" stroke="#f9a926" strokeWidth="1.5" fill="none" />

      {/* Rear wheel */}
      <circle cx="34" cy="28" r="5" stroke="#f9a926" strokeWidth="1.5" fill="none" />

      {/* Chassis line */}
      <path d="M 14 28 L 34 28" stroke="#f9a926" strokeWidth="2" strokeLinecap="round" />

      {/* Handlebar */}
      <path d="M 16 22 L 14 16" stroke="#f9a926" strokeWidth="2" strokeLinecap="round" />

      {/* Engine block */}
      <rect x="20" y="22" width="8" height="6" stroke="#f9a926" strokeWidth="1.5" fill="none" />

      {/* Speed lines (motion) */}
      <path d="M 8 20 L 12 20" stroke="#f9a926" strokeWidth="1" opacity="0.7" strokeLinecap="round" />
      <path d="M 8 24 L 12 24" stroke="#f9a926" strokeWidth="1" opacity="0.7" strokeLinecap="round" />
      <path d="M 36 20 L 40 20" stroke="#f9a926" strokeWidth="1" opacity="0.7" strokeLinecap="round" />
      <path d="M 36 24 L 40 24" stroke="#f9a926" strokeWidth="1" opacity="0.7" strokeLinecap="round" />
    </svg>
  )
}
