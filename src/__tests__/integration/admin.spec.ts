import { describe, expect, test } from "vitest";
import request from "supertest";
import app from "../../app";

describe("Admin", () => {
  test("should return data properties", async () => {
    const data = { email: "email@admin.com", password: "123" };

    expect(data).toHaveProperty("email");
    expect(data).toHaveProperty("password");
  });

  test("should return status 400 (login)", async () => {
    const data = { email: "email@email.com", password: "123" };

    const response = await request(app.express).post("/admin/login").send(data);
    const errorText = JSON.parse(response.text);

    expect(response.status).toBe(400);
    expect(errorText).toMatchObject({ error: "admin not found" });
  });

  test("should return admin test (login)", async () => {
    const dataInput = { email: "email@admin.com", password: "123" };

    const dataOutput = {
      name: "Guilherme",
      email: "email@admin.com",
      status: 0,
    };

    const response = await request(app.express)
      .post("/admin/login")
      .send(dataInput);

    expect(response.body).toMatchObject({
      status: 'returned', data: dataOutput
    });
  });
});
