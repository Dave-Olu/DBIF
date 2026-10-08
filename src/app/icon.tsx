export const size = { width: 32, height: 32 };
export const contentType = "image/svg+xml";

export default function Icon() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 18" role="img" aria-label="DBIF icon">
      <path d="M6 0H18L24 18H0L6 0Z" fill="#B8863B" />
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
