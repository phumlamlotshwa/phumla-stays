import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import EarningsCalculator from "@/components/EarningsCalculator";
import HowItWorks from "@/components/HowItWorks";
import Areas from "@/components/Areas";
import RoofDivider from "@/components/RoofDivider";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <RoofDivider />
        <Services />
        <EarningsCalculator />
        <HowItWorks />
        <Areas />
        <RoofDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}