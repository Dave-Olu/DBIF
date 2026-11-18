import test from "node:test";
import assert from "node:assert/strict";
import { checkCredentials } from "./auth";

const adminUsers = [{ email: "admin@example.com", password: "super-secret", role: "super" as const }];

test("checkCredentials accepts a valid password", () => {
  process.env.ADMIN_USERS = JSON.stringify(adminUsers);
  const result = checkCredentials("admin@example.com", "super-secret");
  assert.ok(result);
  assert.equal(result?.email, "admin@example.com");
  assert.equal(result?.role, "super");
});

test("checkCredentials safely rejects a wrong password with a different length", () => {
  process.env.ADMIN_USERS = JSON.stringify(adminUsers);
  assert.equal(checkCredentials("admin@example.com", "short"), null);
  assert.equal(checkCredentials("admin@example.com", "wrong-password"), null);
});
