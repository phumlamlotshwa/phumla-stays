export default function RoofDivider() {
  return (
    <div aria-hidden="true" className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-10">
      <span className="h-px flex-1 bg-sage-dark/30" />
      <svg viewBox="0 0 40 22" className="h-6 w-11 shrink-0">
        <path
          d="M3 19 L20 6 L37 19"
          fill="none"
          stroke="#4F6B54"
          strokeWidth={3}
          strokeLinejoin="miter"
        />
        <rect x="17.5" y="12.5" width="5" height="5" rx="0.5" fill="#C9A227" />
      </svg>
      <span className="h-px flex-1 bg-sage-dark/30" />
    </div>
  );
}