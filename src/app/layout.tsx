import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${site.name} | Airbnb Co-Hosting in ${site.serviceArea}`,
  description: "We manage your Airbnb so you earn more without the admin.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} font-sans bg-cream text-charcoal antialiased`}
      >
        {children}
      </body>
    </html>
  );
}