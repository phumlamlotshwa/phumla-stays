import { whatsappLink } from "@/lib/site";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-sage-dark py-20 text-white md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-gold" />
        <h2 className="font-serif text-3xl md:text-5xl">
          Ready to earn more from your property?
        </h2>
        <p className="mt-4 text-lg text-white/85">
          Send us a message with your property&apos;s area and size. We&apos;ll
          come back with a free, honest assessment of what it could earn.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-medium text-sage-dark transition-colors hover:bg-cream"
        >
          Get your free assessment
        </a>
      </div>
    </section>
  );
}