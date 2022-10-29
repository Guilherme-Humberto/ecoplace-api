import app from "../../app";
import request from "supertest";
import { describe, expect, test } from "vitest";

interface IContributor {
  first_name: string;
}

describe("Contributor", () => {
  test("should return contributor test", async () => {
    const response = await request(app.express).get("/contributor/list");
    const findContributor = response.body.find(
      (contributor: IContributor) => contributor.first_name == "test"
    );

    const contributorTest = {
      first_name: "test",
      email: "test@email.com",
    };

    expect(findContributor).toMatchObject(contributorTest);
  });

  test("should return error in contributor register", async () => {
    const dataInput = {
      first_name: "test",
      email: "test@email.com",
    };

    const response = await request(app.express)
      .post("/contributor/create")
      .send(dataInput);

    const errorText = JSON.parse(response.text);
    expect(errorText).toMatchObject({ error: "Contributor alreary exists" });
  });

  test("should return error in validation input data", async () => {
    let dataInput = {};

    const response = await request(app.express)
      .post("/contributor/create")
      .send(dataInput);

    const errorText = JSON.parse(response.text);
    expect(errorText).toMatchObject({
      error: "email and first_name is required",
    });
  });
});
