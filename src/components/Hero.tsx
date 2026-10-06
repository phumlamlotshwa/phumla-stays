import { site, whatsappLink } from "@/lib/site";

const included = [
  "Listing setup and photos",
  "Smart nightly pricing",
  "Guest messages, day and night",
  "Cleaning and restocking",
  "A clear monthly report",
];

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
      <div>
                <svg aria-hidden="true" viewBox="0 0 40 22" className="mb-6 h-6 w-11">
          <path
            d="M3 19 L20 6 L37 19"
            fill="none"
            stroke="#4F6B54"
            strokeWidth={3}
            strokeLinejoin="miter"
          />
          <rect x="17.5" y="12.5" width="5" height="5" rx="0.5" fill="#C9A227" />
        </svg>
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-sage-dark">
          Airbnb co-hosting in {site.serviceArea}
        </p>
        <h1 className="font-serif text-4xl leading-tight md:text-6xl">
          Your property earns.
          <br />
          You rest.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-charcoal/80">
          We manage your Airbnb from listing to checkout, so you earn more
          without the late-night guest messages, cleaner no-shows or pricing
          guesswork.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-sage-dark px-6 py-3 text-center font-medium text-white transition-colors hover:bg-charcoal"
          >
            Get a free listing assessment
          </a>
          <a
          
            href="#how-it-works"
            className="rounded-full border border-charcoal/20 px-6 py-3 text-center font-medium transition-colors hover:border-sage-dark hover:text-sage-dark"
          >
            See how it works
          </a>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-charcoal/5">
        <p className="font-serif text-2xl">What we handle for you</p>
        <ul className="mt-6 space-y-4">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/20 text-sm text-sage-dark">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}