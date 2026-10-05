import Image from "next/image";
import { whatsappLink } from "@/lib/site";

export default function MeetPhumla() {
  return (
    <section id="about" className="scroll-mt-20 bg-sage/10 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-[2fr_3fr]">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl ring-1 ring-charcoal/10">
          <Image
            src="/phumla.jpeg"
            alt="Phumla, founder of Phumla Stays"
            fill
            sizes="384px"
            className="object-cover"
          />
        </div>

        <div>
          <div className="mb-6 h-1 w-12 rounded-full bg-gold" />
          <h2 className="font-serif text-3xl md:text-5xl">Hi, I&apos;m Phumla.</h2>
          <div className="mt-6 space-y-4 text-lg text-charcoal/80">
            <p>
              I&apos;m a software developer, and I started
              Phumla Stays to give property owners the kind of service I&apos;d
              want for my own home: fast replies, clear systems, and no surprises.
            </p>
            <p>
              I bring the same attention to detail I use when building software
              to running your listing, from pricing and guest messages to a
              monthly report you can actually understand.
            </p>
                       <p className="font-serif text-2xl text-charcoal">
              You rest. I handle the rest.
            </p>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block font-medium text-sage-dark underline underline-offset-4 hover:text-charcoal"
          >
            Say hello on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}