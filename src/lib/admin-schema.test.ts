import test from "node:test";
import assert from "node:assert/strict";
import { collections, isUploadedFile, parseItem } from "./admin-schema";

test("event poster uploads are recognized without a global File constructor", () => {
  const form = new FormData();
  form.set("title", "Community gathering");
  form.set("date", "2026-12-01");
  form.set("time", "9:00 AM");
  form.set("venue", "Main hall");
  form.set("description", "A community gathering.");
  form.set("posterUrl", new File(["poster"], "poster.png", { type: "image/png" }));

  const fileDescriptor = Object.getOwnPropertyDescriptor(globalThis, "File");
  assert.ok(fileDescriptor?.configurable);
  Object.defineProperty(globalThis, "File", { configurable: true, value: undefined });
  try {
    assert.equal(isUploadedFile(form.get("posterUrl")), true);
    const result = parseItem(collections.events, form, [], null);
    assert.equal(result.ok, true);
    if (result.ok) assert.equal(result.item.posterUrl, null);
  } finally {
    Object.defineProperty(globalThis, "File", fileDescriptor);
  }
});
