import type { Metadata } from "next";
import Header from "@/components/Header";
import MeetPhumla from "@/components/MeetPhumla";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Phumla Stays",
  description: "Meet Phumla, the person behind Phumla Stays.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <MeetPhumla />
        <Contact />
      </main>
      <Footer />
    </>
  );
}