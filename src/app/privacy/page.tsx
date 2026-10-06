import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Phumla Stays",
  description: "How Phumla Stays collects, uses and protects your personal information.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-charcoal/80">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <h1 className="font-serif text-4xl md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-charcoal/70">Last updated: 5 October 2026</p>
        <p className="mt-6 text-lg text-charcoal/80">
          Phumla Stays respects your privacy. This policy explains how we
          collect, use and protect your personal information, in line with the
          Protection of Personal Information Act 4 of 2013 (POPIA).
        </p>

        <Section title="1. Who we are">
          <p>
            Phumla Stays is a short-term rental co-hosting business operating in{" "}
            {site.serviceArea}. Phumla Mlotshwa is the responsible party and our
            Information Officer.
          </p>
          <p>
            Email: <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>
          </p>
        </Section>

        <Section title="2. What we collect">
          <p>When you fill in our property onboarding form, we collect:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>your name, email address and phone number</li>
            <li>your property address, type, and number of bedrooms and bathrooms</li>
            <li>your Airbnb listing link, if you have one</li>
            <li>the services you are interested in</li>
          </ul>
          <p>
            We also keep the messages you send us by WhatsApp or email. Once we
            work together, we hold the details needed to manage your property,
            such as booking and payout records.
          </p>
        </Section>

        <Section title="3. Why we use it">
          <p>We use your information only to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>respond to your enquiry and assess your property</li>
            <li>prepare and manage our co-hosting agreement with you</li>
            <li>manage your property listing and send you reports</li>
            <li>meet our legal and tax obligations</li>
          </ul>
          <p>
            We do not sell your information, and we do not send you marketing
            messages unless you have agreed to receive them.
          </p>
        </Section>

        <Section title="4. Who we share it with">
          <p>
            We share your information only with trusted service providers who
            help us run our business, and only as much as they need:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Supabase, which stores our onboarding form submissions</li>
            <li>Vercel, which hosts this website</li>
            <li>Resend, which sends us email notifications of new enquiries</li>
            <li>Zoho, which provides our business email</li>
            <li>WhatsApp (Meta), when you message us there</li>
            <li>booking platforms such as Airbnb, once we manage your listing</li>
          </ul>
          <p>
            We may also disclose information where the law requires it.
          </p>
        </Section>

        <Section title="5. Storage outside South Africa">
          <p>
            Some of these providers store information on servers outside South
            Africa. We use only providers that protect personal information to
            a standard comparable to POPIA.
          </p>
        </Section>

        <Section title="6. How long we keep it">
          <p>
            If we do not go on to work together, we delete your enquiry within
            12 months. If you become a client, we keep your information for as
            long as our agreement runs, and afterwards for up to 5 years where
            the law requires us to keep business and tax records.
          </p>
        </Section>

        <Section title="7. How we protect it">
          <p>
            Your information is stored in secured systems that only Phumla
            Stays can access, protected by passwords and two-factor
            authentication where available.
          </p>
        </Section>

        <Section title="8. Your rights">
          <p>Under POPIA, you have the right to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>ask what personal information we hold about you</li>
            <li>ask us to correct or delete it</li>
            <li>object to us using it</li>
            <li>withdraw your consent at any time</li>
          </ul>
          <p>
            To do any of these, email us at{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">{site.email}</a>.
          </p>
          <p>
            If you are unhappy with how we handle your information, you may
            complain to the Information Regulator at
            enquiries@inforegulator.org.za or 0800 017 160.
          </p>
        </Section>

        <Section title="9. Cookies">
          <p>
            This website does not use advertising or tracking cookies.
          </p>
        </Section>

        <Section title="10. Changes to this policy">
          <p>
            We may update this policy from time to time. The latest version will
            always be on this page, with the date it was last updated.
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}