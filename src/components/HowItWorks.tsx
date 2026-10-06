const steps = [
  {
    title: "Free listing assessment",
    description:
      "Send us your property details on WhatsApp. We'll look at your area, pricing and listing, and tell you honestly what it could earn.",
  },
  {
    title: "We set everything up",
    description:
      "We write your listing, arrange photos, set your pricing, and get your cleaner and check-in system ready.",
  },
  {
    title: "We run it day to day",
    description:
      "Guest messages, check-ins, cleaning, restocking and reviews. We only contact you when a decision is yours to make.",
  },
  {
    title: "You get paid, with a clear report",
    description:
      "Payouts go straight to you. Each month you get a simple report showing bookings, earnings and costs.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl md:text-5xl">How it works</h2>
                    <p className="mt-4 text-lg text-charcoal/80">
            Here&apos;s what happens after you message us.
          </p>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl bg-white p-8 ring-1 ring-charcoal/10">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-dark font-serif text-lg text-white">
                {index + 1}
              </span>
              <h3 className="mt-6 font-serif text-xl">{step.title}</h3>
              <p className="mt-3 text-charcoal/80">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}