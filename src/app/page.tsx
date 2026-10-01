import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import EarningsCalculator from "@/components/EarningsCalculator";
import HowItWorks from "@/components/HowItWorks";
import MeetPhumla from "@/components/MeetPhumla";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <EarningsCalculator />
        <HowItWorks />
        <MeetPhumla />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}