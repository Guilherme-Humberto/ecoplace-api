import { describe, expect, test } from "vitest";
import request from "supertest";
import app from "../../app";
import deleteService from "../../app/models/contributor/services/delete";
import { generateUUID } from "@shared/utils";

describe("Contributor", () => {
  const id = generateUUID();

  test("should return success in contributor register", async () => {
    const data = { id, name: "test", email: "test@email.com" };

    const response = await request(app.express)
      .post("/contributor/create")
      .send(data);

    const errorText = JSON.parse(response.text);

    expect(errorText).not.toMatchObject({
      error: "Contributor alreary exists",
    });

    expect(response.body).toMatchObject({ status: "created" });
  });

  test("should return success in contributor delete service", async () => {
    const result = await deleteService.execute(id);
    expect(result).toMatchObject({ status: `deleted` });
  });
});
