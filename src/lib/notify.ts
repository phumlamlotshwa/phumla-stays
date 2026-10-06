import "server-only";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const serviceLabels: Record<string, string> = {
  full_management: "Full management",
  listing_and_guest_care: "Listing and guest care",
  not_sure: "Not sure yet",
};

type OwnerLead = {
  full_name: string;
  email: string;
  phone: string;
  property_address: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  airbnb_listing_url: string;
  services: string[];
};

function toWhatsAppLink(phone: string) {
  const number = phone.startsWith("0") ? `27${phone.slice(1)}` : phone.replace("+", "");
  return `https://wa.me/${number}`;
}

export async function notifyNewOwnerLead(lead: OwnerLead) {
  const lines = [
    `Name: ${lead.full_name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `WhatsApp them: ${toWhatsAppLink(lead.phone)}`,
    "",
    `Address: ${lead.property_address}`,
    `Type: ${lead.property_type}`,
    `Bedrooms: ${lead.bedrooms}`,
    `Bathrooms: ${lead.bathrooms}`,
    `Airbnb listing: ${lead.airbnb_listing_url || "None yet"}`,
    `Services: ${lead.services.map((service) => serviceLabels[service] ?? service).join(", ")}`,
  ];

  try {
    const { error } = await resend.emails.send({
      from: "Phumla Stays <alerts@phumlastays.co.za>",
      to: process.env.NOTIFY_EMAIL!,
      replyTo: lead.email,
      subject: `New property owner: ${lead.full_name} (${lead.bedrooms}-bed ${lead.property_type})`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Failed to send notification email:", error);
    }
  } catch (error) {
    console.error("Failed to send notification email:", error);
  }
}