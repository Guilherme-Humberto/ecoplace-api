import app from "../../app";
import request from "supertest";
import { describe, expect, test } from "vitest";

describe("Test application in running", () => {
  test("should return ok true", async () => {
    const response = await request(app.express).get("/healthCheck");
    expect(response.body).toMatchObject({ ok: true });
  });
});
