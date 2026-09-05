import { ImageResponse } from "next/og";

// Ícone do app/favicon gerado em código (sem depender de asset externo):
// quadrado preto arredondado, "C" branco, ponto laranja no canto —
// conforme o moodboard da marca Cria.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
        }}
      >
        <span
          style={{
            fontSize: 22,
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
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#ff8a00",
            right: 5,
            bottom: 6,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
