import { describe, expect, test } from "vitest";
import request from "supertest";
import { generateUUID } from "../../app/utils";
import { ICollectionItem } from "@interfaces/index";
import app from "../../app";
import { collectionItemMock } from "../../mocks";

describe("Collection Item", () => {
  const id = generateUUID();
  const data: ICollectionItem = {
    id,
    title: collectionItemMock.title,
    slug: collectionItemMock.slug,
    image: collectionItemMock.image,
    collectionCenterId: collectionItemMock.collectionCenterId
  };

  test("should return success in create collection item", async () => {
    const response = await request(app.express)
      .post("/collectionItem/create")
      .send(data);

    const errorText = JSON.parse(response.text);
    expect(errorText).not.toMatchObject({
      error: `${data.slug} item already exists`,
    });
    expect(response.body).toMatchObject({
      message: `${data.slug} successfully created`,
    });
  });

  test("should return success in update collection item", async () => {
    const query = { id };

    data["title"] = "Novo nome do item de coleta";

    const response = await request(app.express)
      .put("/collectionItem/update")
      .query(query)
      .send(data);

    const errorText = JSON.parse(response.text);
    expect(errorText).not.toMatchObject({
      error: `${data.slug} item not found`,
    });
    expect(response.body).toMatchObject({ 
      message: `${data.slug} updated` 
    });
  });

  test("should return collectionItem mock", async () => {
    const query = { id };

    const response = await request(app.express)
      .get("/collectionItem/get")
      .query(query);

    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("slug");
  });

  test("should return success in delete collectionItem", async () => {
    const query = { id };

    const response = await request(app.express)
      .delete("/collectionItem/delete")
      .query(query);

    expect(response.body).toMatchObject({ message: `${id} deleted` });
  });
});
