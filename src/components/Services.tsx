import { whatsappLink } from "@/lib/site";
import Link from "next/link";

const packages = [
  {
    name: "Full management",
    price: "From 18%",
    priceNote: "of booking revenue",
    description: "We run everything, so you don't have to lift a finger.",
    features: [
      "Listing setup, photos and description",
      "Smart nightly pricing",
      "All guest messages and check-ins",
      "Cleaning, laundry and restocking",
      "Reviews and problem-solving",
      "Monthly owner report",
    ],
    featured: true,
  },
  {
    name: "Listing and guest care",
    price: "From 12%",
    priceNote: "of booking revenue",
    description: "For owners who handle cleaning and keys themselves.",
    features: [
      "Listing setup and optimisation",
      "Smart nightly pricing",
      "All guest messages",
      "Monthly owner report",
    ],
    featured: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-5xl">Choose how hands-off you want to be</h2>
          <p className="mt-4 text-lg text-charcoal/80">
            Two simple packages. No setup fees, no long contracts.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col rounded-3xl bg-cream p-8 ${
                pkg.featured ? "ring-2 ring-sage-dark" : "ring-1 ring-charcoal/10"
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-charcoal">
                  Recommended
                </span>
              )}

              <h3 className="font-serif text-2xl">{pkg.name}</h3>
              <p className="mt-2 text-charcoal/70">{pkg.description}</p>

              <p className="mt-6">
                <span className="font-serif text-4xl">{pkg.price}</span>{" "}
                <span className="text-charcoal/70">{pkg.priceNote}</span>
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/20 text-sm text-sage-dark">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

                           <Link
                href="/onboarding"
                className={`mt-8 rounded-full px-6 py-3 text-center font-medium transition-colors ${
                  pkg.featured
                    ? "bg-sage-dark text-white hover:bg-charcoal"
                    : "border border-charcoal/20 hover:border-sage-dark hover:text-sage-dark"
                }`}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}