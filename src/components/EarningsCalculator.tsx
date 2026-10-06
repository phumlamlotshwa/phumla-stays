"use client";

import { useState } from "react";
import Link from "next/link";

const packages = [
  { id: "full_management", name: "Full management", rate: 0.18 },
  { id: "listing_and_guest_care", name: "Listing and guest care", rate: 0.12 },
];

const formatRand = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

export default function EarningsCalculator() {
  const [payout, setPayout] = useState("15000");
  const [packageId, setPackageId] = useState(packages[0].id);

  const selected = packages.find((pkg) => pkg.id === packageId) ?? packages[0];
  const amount = Math.max(0, Number(payout) || 0);
  const fee = amount * selected.rate;
  const takeHome = amount - fee;

  return (
    <section id="calculator" className="scroll-mt-20 bg-sage/10 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl md:text-5xl">See what you&apos;d take home</h2>
                    <p className="mt-4 text-lg text-charcoal/80">
            Type in what Airbnb pays you in a normal month, and you&apos;ll see
            exactly what our fee would be before you sign anything.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 ring-1 ring-charcoal/10">
          <label htmlFor="payout" className="font-medium">
            Your monthly Airbnb payout
          </label>
          <div className="relative mt-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/60">
              R
            </span>
            <input
              id="payout"
              type="number"
              inputMode="numeric"
              min={0}
              step={500}
              value={payout}
              onChange={(event) => setPayout(event.target.value)}
              className="block w-full rounded-xl border border-charcoal/20 bg-white py-3 pl-9 pr-4 focus:border-sage-dark focus:outline-none focus:ring-2 focus:ring-sage-dark/20"
            />
          </div>
          <p className="mt-2 text-sm text-charcoal/60">
            You&apos;ll find this under Earnings in your Airbnb app.
          </p>

          <fieldset className="mt-6">
            <legend className="font-medium">Package</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {packages.map((pkg) => {
                const isActive = pkg.id === packageId;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setPackageId(pkg.id)}
                    aria-pressed={isActive}
                    className={`rounded-xl px-4 py-3 text-left text-sm ring-1 transition-colors ${
                      isActive
                        ? "bg-sage-dark text-white ring-sage-dark"
                        : "ring-charcoal/20 hover:ring-sage-dark"
                    }`}
                  >
                    <span className="block font-medium">{pkg.name}</span>
                    <span className={isActive ? "text-white/80" : "text-charcoal/60"}>
                      {Math.round(pkg.rate * 100)}% commission
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <dl aria-live="polite" className="mt-8 space-y-3 border-t border-charcoal/10 pt-6">
            <div className="flex justify-between">
              <dt className="text-charcoal/70">Our fee</dt>
              <dd>{formatRand.format(fee)}</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="font-medium">You take home</dt>
              <dd className="font-serif text-3xl text-sage-dark">{formatRand.format(takeHome)}</dd>
            </div>
          </dl>

          <p className="mt-4 text-xs text-charcoal/60">
            Estimate based on our starting rates.
          </p>

          <Link
            href="/onboarding"
            className="mt-6 block rounded-full bg-sage-dark px-6 py-3 text-center font-medium text-white transition-colors hover:bg-charcoal"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}