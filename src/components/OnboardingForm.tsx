"use client";

import { useActionState } from "react";
import { submitOwnerLead, type FormState } from "@/app/onboarding/actions";

const initialState: FormState = { success: false };

const inputClass =
  "mt-1 block w-full rounded-xl border border-charcoal/20 bg-white px-4 py-3 focus:border-sage-dark focus:outline-none focus:ring-2 focus:ring-sage-dark/20";

const serviceOptions = [
  { value: "full_management", label: "Full management" },
  { value: "listing_and_guest_care", label: "Listing and guest care" },
  { value: "not_sure", label: "Not sure yet, I'd like advice" },
];

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="mt-1 text-sm text-red-700">{messages[0]}</p>;
}

export default function OnboardingForm() {
  const [state, formAction, isPending] = useActionState(submitOwnerLead, initialState);

  if (state.success) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-charcoal/10">
        <h2 className="font-serif text-3xl">Thank you!</h2>
        <p className="mt-4 text-charcoal/80">
          We&apos;ve received your property details and will be in touch within
          one working day.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8 rounded-3xl bg-white p-8 ring-1 ring-charcoal/10">
      <fieldset className="space-y-4">
        <legend className="font-serif text-2xl">About you</legend>

        <div>
          <label htmlFor="full_name" className="font-medium">Full name</label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            required
            defaultValue={state.values?.full_name}
            className={inputClass}
          />
          <FieldError messages={state.errors?.full_name} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              defaultValue={state.values?.email}
              className={inputClass}
            />
            <FieldError messages={state.errors?.email} />
          </div>
          <div>
            <label htmlFor="phone" className="font-medium">Phone / WhatsApp</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="082 123 4567"
              required
              defaultValue={state.values?.phone}
              className={inputClass}
            />
            <FieldError messages={state.errors?.phone} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-serif text-2xl">Your property</legend>

        <div>
          <label htmlFor="property_address" className="font-medium">Property address</label>
          <input
            id="property_address"
            name="property_address"
            type="text"
            autoComplete="street-address"
            required
            defaultValue={state.values?.property_address}
            className={inputClass}
          />
          <FieldError messages={state.errors?.property_address} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="property_type" className="font-medium">Property type</label>
            <select
              id="property_type"
              name="property_type"
              required
              defaultValue={state.values?.property_type ?? ""}
              className={inputClass}
            >
              <option value="" disabled>Choose one</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="townhouse">Townhouse</option>
              <option value="cottage">Cottage</option>
              <option value="guesthouse">Guesthouse</option>
              <option value="other">Other</option>
            </select>
            <FieldError messages={state.errors?.property_type} />
          </div>
          <div>
            <label htmlFor="bedrooms" className="font-medium">Bedrooms</label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              min={0}
              max={50}
              required
              defaultValue={state.values?.bedrooms}
              className={inputClass}
            />
            <FieldError messages={state.errors?.bedrooms} />
          </div>
          <div>
            <label htmlFor="bathrooms" className="font-medium">Bathrooms</label>
            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              min={0}
              max={50}
              required
              defaultValue={state.values?.bathrooms}
              className={inputClass}
            />
            <FieldError messages={state.errors?.bathrooms} />
          </div>
        </div>

        <div>
          <label htmlFor="airbnb_listing_url" className="font-medium">
            Current Airbnb listing <span className="font-normal text-charcoal/60">(optional)</span>
          </label>
          <input
            id="airbnb_listing_url"
            name="airbnb_listing_url"
            type="url"
            placeholder="https://www.airbnb.co.za/rooms/..."
            defaultValue={state.values?.airbnb_listing_url}
            className={inputClass}
          />
          <FieldError messages={state.errors?.airbnb_listing_url} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-serif text-2xl">Services you&apos;re interested in</legend>
        <div className="mt-4 space-y-3">
          {serviceOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-3">
              <input
                type="checkbox"
                name="services"
                value={option.value}
                defaultChecked={state.values?.services.includes(option.value)}
                className="h-5 w-5 accent-sage-dark"
              />
              {option.label}
            </label>
          ))}
        </div>
        <FieldError messages={state.errors?.services} />
      </fieldset>

      <div>
        <label className="flex items-start gap-3 text-sm text-charcoal/80">
          <input
            type="checkbox"
            name="popia_consent"
            required
            defaultChecked={state.values?.popia_consent === "on"}
            className="mt-0.5 h-5 w-5 shrink-0 accent-sage-dark"
          />
                   I agree that Phumla Stays may use these details to contact me about
          managing my property, as described in the{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-charcoal"
          >
            Privacy Policy
          </a>
          .
        </label>
        <FieldError messages={state.errors?.popia_consent} />
      </div>

      {state.message && <p className="text-red-700">{state.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-sage-dark px-6 py-4 font-medium text-white transition-colors hover:bg-charcoal disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send my property details"}
      </button>
    </form>
  );
}