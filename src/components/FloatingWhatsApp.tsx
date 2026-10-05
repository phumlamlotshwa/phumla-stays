import { whatsappLink } from "@/lib/site";

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Phumla Stays on WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2 rounded-full bg-sage-dark px-5 py-3 font-medium text-white shadow-lg shadow-charcoal/20 transition-colors hover:bg-charcoal md:hidden"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5Z" />
      </svg>
      WhatsApp us
    </a>
  );
}