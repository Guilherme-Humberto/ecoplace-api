import { describe, expect, test } from "vitest";
import request from "supertest";
import app from "../../app";
import ContributorService from '../../app/models/contributor/service'

describe("Contributor", () => {
  test("should return success in contributor register", async () => {
    const data = { name: "test", email: "test@email.com" };

    const response = await request(app.express)
      .post("/contributor/create")
      .send(data);

    const errorText = JSON.parse(response.text);

    expect(errorText).not.toMatchObject({
      error: "contributor alreary exists",
    });

    expect(errorText).not.toMatchObject({
      error: "non-existent or invalid data",
    });

    expect(response.body).toMatchObject({ message: "contributor created" });
  });

  test("should return success in contributor register", async () => {
    const data = { email: "test@email.com" };
    const result = await ContributorService.delete(data.email)

    expect(result).toMatchObject({ message: `${data.email} deleted` });
  });
});
