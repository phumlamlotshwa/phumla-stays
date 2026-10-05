export const site = {
  name: "Phumla Stays",
  serviceArea: "Gauteng & Mpumalanga",
  email: "hello@phumlastays.co.za",
  whatsappNumber: "27794257826",
  whatsappMessage: "Hi Phumla Stays, I'd like a free listing assessment.",
};

export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage
)}`;

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
   { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  {href: "/#contact", label: "Contact"},
];