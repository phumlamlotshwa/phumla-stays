import { whatsappLink } from "@/lib/site";

const regions = [
  {
    province: "Gauteng",
    description: "City apartments and homes for business and weekend travellers.",
    areas: ["Johannesburg", "Sandton", "Rosebank", "Fourways", "Midrand", "Pretoria", "Centurion"],
  },
  {
    province: "Mpumalanga",
    description: "Holiday homes near Kruger, the Panorama Route and the Lowveld.",
    areas: ["Mbombela", "White River", "Hazyview", "Sabie", "Graskop", "Dullstroom"],
  },
];

export default function Areas() {
  return (
    <section id="areas" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <div className="mb-6 h-1 w-12 rounded-full bg-gold" />
          <h2 className="font-serif text-3xl md:text-5xl">Areas we cover</h2>
          <p className="mt-4 text-lg text-charcoal/80">
            From city apartments to bushveld getaways, we look after properties
            across two provinces.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {regions.map((region) => (
            <div key={region.province} className="rounded-3xl bg-cream p-8 ring-1 ring-charcoal/10">
              <h3 className="font-serif text-2xl">{region.province}</h3>
              <p className="mt-2 text-charcoal/70">{region.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {region.areas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-white px-4 py-2 text-sm ring-1 ring-charcoal/10"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-charcoal/80">
          Don&apos;t see your area?{" "}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sage-dark underline underline-offset-4 hover:text-charcoal"
          >
            Ask us
          </a>
          . We may still be able to help.
        </p>
      </div>
    </section>
  );
}