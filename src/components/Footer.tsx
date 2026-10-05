import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal py-10 text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-lg text-white">{site.name}</p>
          <p>Airbnb co-hosting in {site.serviceArea}</p>
            <a        
            href={`mailto:${site.email}`}
            aria-label={`Email us at ${site.email}`}
            className="group relative mt-3 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/30 transition-colors hover:bg-white hover:text-charcoal"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs text-charcoal opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {site.email}
            </span>
          </a>
        </div>
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}