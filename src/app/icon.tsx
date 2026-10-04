import { ImageResponse } from "next/og";

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
          background: "#1B2333",
        }}
      >
        <svg width="18" height="14" viewBox="0 0 24 18">
          <path d="M6 0H18L24 18H0L6 0Z" fill="#B8863B" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
