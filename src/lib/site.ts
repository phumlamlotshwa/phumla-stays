export const site = {
  name: "Phumla Stays",
  serviceArea: "Gauteng & Mpumalanga",
  whatsappNumber: "2770974440",
  whatsappMessage: "Hi Phumla Stays, I'd like a free listing assessment.",
};

export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage
)}`;

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];