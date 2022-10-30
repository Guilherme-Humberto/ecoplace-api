import { describe, expect, test } from "vitest";
import request from "supertest";
import { generateUUID } from "../../app/utils";
import { ICollectionCenter } from "@interfaces/index";
import app from "../../app";
import { collectionCenterMock } from "../../mocks";

describe("Collection Center", () => {
  const id = generateUUID();
  const data: ICollectionCenter = {
    id,
    name: collectionCenterMock.name,
    email: collectionCenterMock.email,
    image: collectionCenterMock.image,
    phone: collectionCenterMock.phone,
    description: collectionCenterMock.description,
  };

  test("should return success in create collection center", async () => {
    const response = await request(app.express)
      .post("/collectionCenter/create")
      .send(data);

    const errorText = JSON.parse(response.text);
    expect(errorText).not.toMatchObject({
      error: "collection center already exists",
    });
    expect(response.body).toMatchObject({
      message: `collection center successfully created`,
    });
  });

  test("should return success in update collection center", async () => {
    const query = { id };

    data["name"] = "Novo nome do ponto de coleta";

    const response = await request(app.express)
      .put("/collectionCenter/update")
      .query(query)
      .send(data);

    expect(response.body).toMatchObject({ message: `${id} updated` });
  });

  test("should return collectionCenter mock", async () => {
    const query = { id };

    const response = await request(app.express)
      .get("/collectionCenter/get")
      .query(query);

    expect(response.body).toMatchObject({
      name: "Novo nome do ponto de coleta",
      description: "Ponto de coleta teste",
      image: "url://imagem",
      phone: "(99) 99999-9999",
      email: "test@email.com",
    });
  });

  test("should return success in delete collectionCenter", async () => {
    const query = { id };

    const response = await request(app.express)
      .delete("/collectionCenter/delete")
      .query(query);

    expect(response.body).toMatchObject({ message: `${id} deleted` });
  });
});
