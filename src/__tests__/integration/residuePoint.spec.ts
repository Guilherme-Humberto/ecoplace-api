import { IResiduePoint } from "@interfaces/index";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { describe, expect, test } from "vitest";
import app from "../../app";
import { residuePointTest } from "../../mocks";

describe("ResiduePoint", () => {
  const id = uuidV4();
  const data: IResiduePoint = {
    id,
    name: residuePointTest.name,
    email: residuePointTest.email,
    image: residuePointTest.image,
    phone: residuePointTest.phone,
    description: residuePointTest.description,
  };

  test("should return success in create residue point", async () => {
    const response = await request(app.express)
      .post("/residuePoint/create")
      .send(data);

    const errorText = JSON.parse(response.text);
    expect(errorText).not.toMatchObject({
      error: "residue point already exists",
    });
    expect(response.body).toMatchObject({
      message: `residue point successfully created`,
    });
  });

  test("should return success in update residue point", async () => {
    const query = { id };

    data["name"] = "Novo nome do ponto de coleta";

    const response = await request(app.express)
      .put("/residuePoint/update")
      .query(query)
      .send(data);

    expect(response.body).toMatchObject({ message: `${id} updated` });
  });

  test("should return residuePoint mock", async () => {
    const query = { id };

    const response = await request(app.express)
      .get("/residuePoint/get")
      .query(query);

    expect(response.body).toMatchObject({
      name: "Novo nome do ponto de coleta",
      description: "Ponto de coleta teste",
      image: "url://imagem",
      phone: "(99) 99999-9999",
      email: "test@email.com",
    });
  });

  test("should return success in delete residuePoint", async () => {
    const query = { id };

    const response = await request(app.express)
      .delete("/residuePoint/delete")
      .query(query);

    expect(response.body).toMatchObject({ message: `${id} deleted` });
  });
});
