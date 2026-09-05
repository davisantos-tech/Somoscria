import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#171310",
        }}
      >
        <span
          style={{
            fontSize: 120,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1,
          }}
        >
          C
        </span>
        <span
          style={{
            position: "absolute",
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#ff8a00",
            right: 32,
            bottom: 36,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
