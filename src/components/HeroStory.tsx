import { site, whatsappLink } from "@/lib/site";

type Scene = {
  start: number;
  end: number;
  eyebrow?: string;
  title: string;
  text?: string;
  buttons?: boolean;
};

// Where each line appears in the film, as a share of the scroll (0 = top, 1 = end).
const scenes: Scene[] = [
  {
    start: 0,
    end: 0.16,
    eyebrow: `Airbnb co-hosting across ${site.serviceArea}`,
    title: "Your property earns.",
  },
  { start: 0.19, end: 0.33, title: "You rest." },
  {
    start: 0.4,
    end: 0.64,
    title: "We look after everything inside.",
    text: "Pricing, guest messages, cleaning and a clear report every month.",
  },
  { start: 0.68, end: 0.82, title: "Apartments. Cottages. Guesthouses. Lodges." },
  {
    start: 0.86,
    end: 1,
    title: "Hosting, handled.",
    text: "Tell us about your place and we'll show you what it could earn.",
    buttons: true,
  },
];

const FADE = 0.04;

// 0 outside the scene, 1 in the middle, with a short fade at each edge.
// The first scene is already showing at the top, and the last one stays at the end.
function visibility(progress: number, scene: Scene) {
  const fadeIn = scene.start === 0 ? 1 : (progress - scene.start) / FADE;
  const fadeOut = scene.end === 1 ? 1 : (scene.end - progress) / FADE;
  return Math.min(Math.max(Math.min(fadeIn, fadeOut), 0), 1);
}

export default function HeroStory({ progress }: { progress: number }) {
  return (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="relative mx-auto h-full max-w-6xl">
        {scenes.map((scene, i) => {
          const amount = visibility(progress, scene);
          const Heading = i === 0 ? "h1" : "p";

          return (
            <div
              key={scene.title}
              aria-hidden={amount < 0.5}
            className="absolute inset-x-4 bottom-28 max-w-xl text-white [text-shadow:0_2px_16px_rgb(0_0_0/0.6)] md:bottom-16"
              style={{
                opacity: amount,
                transform: `translateY(${(1 - amount) * 24}px)`,
                pointerEvents: amount > 0.5 ? "auto" : "none",
              }}
            >
              {scene.eyebrow && (
                <p className="mb-2 text-xs uppercase tracking-widest text-white/75 md:text-sm">
                  {scene.eyebrow}
                </p>
              )}
              <Heading className="font-serif text-3xl leading-tight drop-shadow-lg md:text-5xl">
                {scene.title}
              </Heading>
              {scene.text && (
                <p className="mt-3 max-w-md text-sm text-white/85 md:text-base">{scene.text}</p>
              )}
              {scene.buttons && (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gold px-5 py-2.5 text-center text-sm font-medium text-charcoal transition-colors hover:bg-white"
                  >
                    Get a free listing assessment
                  </a>
                  <a
                    href="#how-it-works"
                    className="rounded-full border border-white/40 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:border-white"
                  >
                    See how it works
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}