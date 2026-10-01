import Link from "next/link";
import { navLinks, site, whatsappLink } from "@/lib/site";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-serif text-xl">
          {site.name}
        </Link>

        <nav className="hidden gap-8 text-sm md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-sage-dark"
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
            className="rounded-full bg-sage-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-charcoal"
          >
            WhatsApp us
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}