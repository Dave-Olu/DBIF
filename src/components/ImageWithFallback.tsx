"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type SyntheticEvent } from "react";

function placeholderSvg(label: string) {
  const text = label.trim() || "DBIF";
  const safe = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" role="img" aria-label="${safe}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#EADFC6"/>
          <stop offset="100%" stop-color="#D3E2D8"/>
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill="#F8F3EA"/>
      <rect x="18" y="18" width="564" height="414" rx="28" fill="url(#g)"/>
      <circle cx="300" cy="180" r="92" fill="#0E2A3A" opacity="0.16"/>
      <path d="M250 273L300 122L350 273H250Z" fill="#0E2A3A" opacity="0.18"/>
      <text x="50%" y="58%" text-anchor="middle" font-family="Georgia, serif" font-size="86" fill="#0E2A3A" font-weight="700">${safe}</text>
    </svg>
  `)}`;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackText = "DBIF",
  onError,
  ...props
}: ImageProps & { fallbackText?: string }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasFailed, setHasFailed] = useState(false);

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    if (hasFailed) return;
    setHasFailed(true);
    setCurrentSrc(placeholderSvg(fallbackText));
    onError?.(event);
  };

  return <Image {...props} src={currentSrc} alt={alt} onError={handleError} />;
}
