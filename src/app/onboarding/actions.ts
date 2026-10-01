"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase-admin";

const propertyTypes = ["apartment", "house", "townhouse", "cottage", "guesthouse", "other"] as const;
const serviceOptions = ["full_management", "listing_and_guest_care", "not_sure"] as const;

const ownerSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .transform((value) => value.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(/^(\+27|0)[0-9]{9}$/, "Please enter a valid South African phone number")),
  property_address: z.string().trim().min(5, "Please enter the property address"),
  property_type: z.enum(propertyTypes, { message: "Please choose a property type" }),
  bedrooms: z.coerce.number().int().min(0).max(50),
  bathrooms: z.coerce.number().int().min(0).max(50),
  airbnb_listing_url: z
    .string()
    .trim()
    .url("Please enter a valid link, starting with https://")
    .or(z.literal("")),
  services: z.array(z.enum(serviceOptions)).min(1, "Please choose at least one service"),
  popia_consent: z.literal("on", { message: "Please agree so we can contact you" }),
});

type FormValues = {
  full_name: string;
  email: string;
  phone: string;
  property_address: string;
  property_type: string;
  bedrooms: string;
  bathrooms: string;
  airbnb_listing_url: string;
  services: string[];
  popia_consent: string;
};

export type FormState = {
  success: boolean;
  errors?: Partial<Record<keyof z.infer<typeof ownerSchema>, string[]>>;
  message?: string;
  values?: FormValues;
};

export async function submitOwnerLead(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {

  const values: FormValues = {
    full_name: String(formData.get("full_name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    property_address: String(formData.get("property_address") ?? ""),
    property_type: String(formData.get("property_type") ?? ""),
    bedrooms: String(formData.get("bedrooms") ?? ""),
    bathrooms: String(formData.get("bathrooms") ?? ""),
    airbnb_listing_url: String(formData.get("airbnb_listing_url") ?? ""),
    services: formData.getAll("services").map(String),
    popia_consent: String(formData.get("popia_consent") ?? ""),
  };

  const parsed = ownerSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors, values };
  }
  const data = parsed.data;

  const { error } = await supabaseAdmin.from("owner_leads").insert({
    full_name: data.full_name,
    email: data.email,
    phone: data.phone,
    property_address: data.property_address,
    property_type: data.property_type,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    airbnb_listing_url: data.airbnb_listing_url || null,
    services: data.services,
    popia_consent: true,
  });

  if (error) {
    console.error("Failed to save owner lead:", error);
        return {
      success: false,
      message: "Something went wrong. Please try again, or WhatsApp us instead.",
      values,
    };
  }

  return { success: true };
}