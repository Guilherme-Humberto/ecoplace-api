import { describe, expect, test } from "vitest";
import request from "supertest";
import { generateUUID } from "../../shared/utils";
import { IZone } from "@interfaces/index";
import app from "../../app";
import { zoneMock } from "../../mocks";

describe("Zone", () => {
  const id = generateUUID();
  const data: IZone = {
    id,
    name: zoneMock.name,
    email: zoneMock.email,
    image: zoneMock.image,
    phone: zoneMock.phone,
    description: zoneMock.description,
  };

  test("should return success in create zone", async () => {
    const response = await request(app.express).post("/zone/create").send(data);

    const errorText = JSON.parse(response.text);
    expect(errorText).not.toMatchObject({
      error: "Zone already exists",
    });
    expect(response.body).toMatchObject({
      status: `created`,
    });
  });

  test("should return success in update zone", async () => {
    const query = { id };

    data["name"] = "Novo nome do ponto de coleta";

    const response = await request(app.express)
      .put("/zone/update")
      .query(query)
      .send(data);

    expect(response.body).toMatchObject({ status: `updated` });
  });

  test("should return zone mock", async () => {
    const query = { id };

    const response = await request(app.express).get("/zone/get").query(query);

    const dataOutPut = {
      ...zoneMock,
      name: "Novo nome do ponto de coleta",
    };

    expect(response.body).toMatchObject({
      status: "returned",
      data: dataOutPut,
    });
  });

  test("should return success in delete zone", async () => {
    const query = { id };

    const response = await request(app.express)
      .delete("/zone/delete")
      .query(query);

    expect(response.body).toMatchObject({ status: `deleted` });
  });
});
