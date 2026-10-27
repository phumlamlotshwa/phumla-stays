"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks, site, whatsappLink } from "@/lib/site";
import MobileMenu from "@/components/MobileMenu";

// On the home page the header floats see-through over the house film,
// then turns into the usual cream bar once you scroll past it.
export default function Header({ overHero = false }: { overHero?: boolean }) {
  const [solid, setSolid] = useState(!overHero);

  useEffect(() => {
    if (!overHero) return;
    const hero = document.getElementById("hero-film");

    function check() {
      if (!hero) return setSolid(true);
      setSolid(hero.getBoundingClientRect().bottom <= 80);
    }

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [overHero]);

  const clear = overHero && !solid;

  return (
    <header
      className={`${overHero ? "fixed inset-x-0" : "sticky"} top-0 z-50 border-b transition-colors duration-500 ${
        clear
          ? "border-transparent bg-transparent text-white"
          : "border-charcoal/10 bg-cream/90 text-charcoal backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap font-serif text-xl">
          <Image
            src="/logo-icon.svg"
            alt=""
            width={52}
            height={34}
            unoptimized
            priority
          />
          {site.name}
        </Link>
        <nav className="hidden gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors ${clear ? "hover:text-gold" : "hover:text-sage-dark"}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
              className={`hidden rounded-full px-4 py-2 text-sm font-medium transition-colors sm:inline-block ${
              clear
                ? "bg-gold text-charcoal hover:bg-white"
                : "bg-sage-dark text-white hover:bg-charcoal"
            }`}
          >
            WhatsApp us
          </a>
          <MobileMenu light={clear} />
        </div>
      </div>
    </header>
  );
}