import { site, whatsappLink } from "@/lib/site";

const faqs = [
  {
    question: "Which areas do you cover?",
    answer: `We currently manage properties across ${site.serviceArea}, from city apartments to holiday homes.`,
  },
  {
    question: "Who pays for cleaning?",
    answer:
      "Guests pay a cleaning fee with every booking, and that covers the cleaner. It doesn't come out of your earnings or our commission.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Airbnb pays you directly. Our commission is either split automatically through Airbnb or invoiced monthly, whichever you prefer.",
  },
  {
    question: "What happens if a guest damages something?",
    answer:
      "We document it with photos straight away and handle the damage claim through the platform on your behalf, keeping you updated throughout.",
  },
  {
    question: "Do I need permission from my body corporate?",
    answer:
      "If your property is in a sectional title complex, its rules must allow short-term letting. We'll help you check this before we list anything.",
  },
  {
    question: "Can I still use my property myself?",
    answer:
      "Of course. Just tell us which dates you need and we'll block them off on the calendar.",
  },
  {
    question: "What if I want to stop?",
    answer:
      "Give us 30 days' written notice. There are no cancellation fees, and we'll hand everything back to you in good order.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[1fr_2fr]">
        <div>
          <div className="mb-6 h-1 w-12 rounded-full bg-gold" />
          <h2 className="font-serif text-3xl md:text-5xl">Questions owners ask</h2>
          <p className="mt-4 text-lg text-charcoal/80">
            Can&apos;t find your answer?{" "}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sage-dark underline underline-offset-4 hover:text-charcoal"
            >
              WhatsApp us
            </a>
            .
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl bg-cream p-6 ring-1 ring-charcoal/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="text-2xl leading-none text-sage-dark transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-charcoal/80">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}