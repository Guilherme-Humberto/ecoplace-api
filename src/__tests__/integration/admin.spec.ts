import app from "../../app";
import request from "supertest";
import { describe, expect, test } from "vitest";

describe("Admin", () => {
  test("should return data properties", async () => {
    const data = { email: "email@email.com", password: "123" };

    expect(data).toHaveProperty("email");
    expect(data).toHaveProperty("password");
  });

  test("should return status 400 (login)", async () => {
    const data = { email: "email@email.com", password: "123" };

    const response = await request(app.express).post("/admin/login").send(data);
    expect(response.status).toBe(400);
  });

  test("should return admin test (login)", async () => {
    const dataInput = { email: "test@email.com", password: "123" };

    const dataOutput = {
      first_name: "admin",
      second_name: "test",
      email: "test@email.com",
      status: 0,
    };

    const response = await request(app.express)
      .post("/admin/login")
      .send(dataInput);

    expect(response.body).toMatchObject(dataOutput);
  });
});
