import type { Metadata } from "next";
import { site } from "@/lib/site";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.phumlastays.co.za"),
  title: `${site.name} | Airbnb Co-Hosting in ${site.serviceArea}`,
  description: "We manage your Airbnb so you earn more without the admin.",
  openGraph: {
    title: `${site.name} | Airbnb Co-Hosting in ${site.serviceArea}`,
    description: "We manage your Airbnb so you earn more without the admin.",
    siteName: site.name,
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      
      <body
        className={`${fraunces.variable} ${inter.variable} font-sans bg-cream text-charcoal antialiased`}
      >
        {children}
         <FloatingWhatsApp />
      </body>
    </html>
  );
}