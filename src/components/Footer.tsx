import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal py-10 text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-lg text-white">{site.name}</p>
          <p>Airbnb co-hosting in {site.serviceArea}</p>
        </div>
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}