import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: Airbnb co-hosting in ${site.serviceArea}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const sage = "#4F6B54";
const sageLight = "#7A9A7E";
const gold = "#C9A227";
const cream = "#F7F7F4";
const charcoal = "#2B2F2C";

function Logo() {
  return (
    <svg width={400} height={264} viewBox="0 0 200 132">
      <path d="M100 92 L130 30 L145 52 L160 36 L172 118 Z" fill={sageLight} />
      <circle cx="152" cy="16" r="7" fill={gold} />
      <rect x="34" y="72" width="15" height="50" fill={sage} />
      <rect x="53" y="44" width="15" height="78" fill={sage} />
      <rect x="72" y="26" width="12" height="96" fill={sage} />
      <rect x="76" y="4" width="4" height="22" fill={sage} />
      <ellipse cx="78" cy="26" rx="9" ry="4.5" fill={sage} />
      <rect x="88" y="48" width="11" height="70" fill={sage} />
      <path d="M14 124 L100 56 L186 124 V150 H14 Z" fill={cream} />
      <path d="M22 120 L100 60 L178 120" fill="none" stroke={cream} strokeWidth={20} />
      <path d="M22 120 L100 60 L178 120" fill="none" stroke={sage} strokeWidth={11} />
      <rect x="89" y="90" width="10" height="10" rx="1" fill={gold} />
      <rect x="101" y="90" width="10" height="10" rx="1" fill={gold} />
      <rect x="89" y="102" width="10" height="10" rx="1" fill={gold} />
      <rect x="101" y="102" width="10" height="10" rx="1" fill={gold} />
    </svg>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 80px",
          background: cream,
          color: charcoal,
          borderBottom: `24px solid ${sage}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 8, borderRadius: 999, background: gold, marginBottom: 36 }} />
          <div style={{ fontSize: 28, color: sage, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>
            {`Airbnb co-hosting · ${site.serviceArea}`}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.1 }}>Your property earns.</div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.1 }}>You rest.</div>
          <div style={{ marginTop: 48, fontSize: 32, color: sage }}>
            {`${site.name} · phumlastays.co.za`}
          </div>
        </div>
        <Logo />
      </div>
    ),
    { ...size }
  );
}