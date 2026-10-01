export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="h-1 w-12 rounded-full bg-gold" />
      <h1 className="font-serif text-5xl">Phumla Stays</h1>
      <p className="max-w-md text-lg text-charcoal/80">
        We manage your Airbnb so you earn more without the admin.
      </p>
     < a
        href="#"
        className="rounded-full bg-sage-dark px-6 py-3 font-medium text-white transition-colors hover:bg-charcoal"
      >
        Get a free listing assessment
      </a>
    </main>
  );
}