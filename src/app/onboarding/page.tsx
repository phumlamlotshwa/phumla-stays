import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingForm from "@/components/OnboardingForm";

export const metadata: Metadata = {
  title: "List your property | Phumla Stays",
  description: "Tell us about your property and we'll be in touch within one working day.",
};

export default function OnboardingPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <div className="mb-10">
          <h1 className="font-serif text-4xl md:text-5xl">Tell us about your property</h1>
          <p className="mt-4 text-lg text-charcoal/80">
            It takes about two minutes. We&apos;ll review your details and get
            back to you within one working day.
          </p>
        </div>
        <OnboardingForm />
      </main>
      <Footer />
    </>
  );
}