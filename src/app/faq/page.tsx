import type { Metadata } from "next";
import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ | Phumla Stays",
  description: "Answers to common questions from property owners.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main>
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}