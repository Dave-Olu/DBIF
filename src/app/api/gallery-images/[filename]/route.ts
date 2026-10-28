import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getDataDirectory } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FILE_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/;
const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export async function GET(_request: Request, { params }: { params: { filename: string } }) {
  const match = FILE_PATTERN.exec(params.filename);
  if (!match) return new NextResponse("Not found", { status: 404 });
  const extension = match[1];
  if (!extension) return new NextResponse("Not found", { status: 404 });
  const contentType = CONTENT_TYPES[extension];
  if (!contentType) return new NextResponse("Not found", { status: 404 });

  const bytes = await fs.readFile(path.join(getDataDirectory(), "uploads", params.filename));
  return new NextResponse(bytes, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
