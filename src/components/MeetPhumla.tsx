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
          <h1 className="font-serif text-3xl md:text-5xl">Hi, I&apos;m Phumla.</h1>
          <div className="mt-6 space-y-4 text-lg text-charcoal/80">
                       <p>
              I&apos;m a software developer based in Johannesburg. I started
              Phumla Stays because I&apos;d want my own place looked after
              properly, with quick replies and a monthly report that actually
              tells you what&apos;s going on.
            </p>
            <p>
              My work is all about getting the small details right, and I run
              every listing the same way. Your pricing, guest messages and
              cleaning get checked properly, not rushed.
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