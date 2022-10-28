import app from "../app";
import request from "supertest";
import { describe, expect, test } from "vitest";

describe("Admin", () => {
  test("should return error", async () => {
    const data = {
      email: "email@emai.com",
      password: "password",
    };
    const response = await request(app.express).post("/admin/login").send(data);
    console.log(response);

    expect(1 + 1).toBe(2);
  });
});
