import { describe, expect, test } from "vitest";
import request from "supertest";
import { generateUUID } from "../../app/utils";
import { IResidueItem } from "@interfaces/index";
import app from "../../app";
import { residueItemTest } from "../../mocks";

describe("ResidueItem", () => {
  const id = generateUUID();
  const data: IResidueItem = {
    id,
    title: residueItemTest.title,
    slug: residueItemTest.slug,
    residuePointId: residueItemTest.residuePointId
  };

  test("should return success in create residue item", async () => {
    const response = await request(app.express)
      .post("/residueItem/create")
      .send(data);

    const errorText = JSON.parse(response.text);
    expect(errorText).not.toMatchObject({
      error: `${data.slug} item already exists`,
    });
    expect(response.body).toMatchObject({
      message: `${data.slug} successfully created`,
    });
  });

  test("should return success in update residue item", async () => {
    const query = { id };

    data["title"] = "Novo nome do item de coleta";

    const response = await request(app.express)
      .put("/residueItem/update")
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

  test("should return residueItem mock", async () => {
    const query = { id };

    const response = await request(app.express)
      .get("/residueItem/get")
      .query(query);

    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("slug");
  });

  test("should return success in delete residueItem", async () => {
    const query = { id };

    const response = await request(app.express)
      .delete("/residueItem/delete")
      .query(query);

    expect(response.body).toMatchObject({ message: `${id} deleted` });
  });
});
