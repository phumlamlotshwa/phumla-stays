import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: Airbnb co-hosting in ${site.serviceArea}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#F7F7F4",
          color: "#2B2F2C",
          borderBottom: "24px solid #4F6B54",
        }}
      >
        <div style={{ width: 96, height: 8, borderRadius: 999, background: "#C9A227", marginBottom: 40 }} />
        <div style={{ fontSize: 34, color: "#4F6B54", letterSpacing: 4, textTransform: "uppercase", marginBottom: 24 }}>
          {`Airbnb co-hosting · ${site.serviceArea}`}
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.1 }}>Your property earns.</div>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.1 }}>You rest.</div>
        <div style={{ marginTop: 56, fontSize: 36, color: "#4F6B54" }}>
          {`${site.name} · phumlastays.co.za`}
        </div>
      </div>
    ),
    { ...size }
  );
}