"use client";

import { useState } from "react";
import { navLinks } from "@/lib/site";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-charcoal/15"
      >
        <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-charcoal/10 bg-cream px-4 py-4"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 font-medium hover:bg-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}