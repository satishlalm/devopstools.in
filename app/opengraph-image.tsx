import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "DevOpsTools.in — free browser-based tools for DevOps, SRE and cloud engineers";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0F172A",
          color: "#E2E8F0",
          padding: 80,
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#2563EB",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              color: "white",
            }}
          >
            {">_"}
          </div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>
            devopstools<span style={{ color: "#10B981" }}>.in</span>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 64, fontSize: 56, fontWeight: 800, lineHeight: 1.15, maxWidth: 920 }}>
          The toolbox your terminal wishes it had
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 26, color: "#94A3B8", maxWidth: 820 }}>
          Free, private, browser-based tools for DevOps, SRE and cloud engineers.
        </div>
      </div>
    ),
    { ...size }
  );
}
