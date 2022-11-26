import { describe, expect, test } from "vitest";
import request from "supertest";
import { generateUUID } from "../../shared/utils";
import { ICategory } from "@interfaces/index";
import app from "../../app";
import { categoryMock } from "../../mocks";

describe("Category", () => {
  const id = generateUUID();
  const data: ICategory = {
    id,
    title: categoryMock.title,
    slug: categoryMock.slug,
    image: categoryMock.image,
  };

  test("should return success in create category", async () => {
    const response = await request(app.express)
      .post("/category/create")
      .send(data);

    const errorText = JSON.parse(response.text);
    expect(errorText).not.toMatchObject({
      error: `Category already exists`,
    });
    expect(response.body).toMatchObject({
      status: `created`,
    });
  });

  test("should return success in update category", async () => {
    const query = { id };

    data["title"] = "Novo nome do item de coleta";

    const response = await request(app.express)
      .put("/category/update")
      .query(query)
      .send(data);

    const errorText = JSON.parse(response.text);
    expect(errorText).not.toMatchObject({
      error: `Category not found`,
    });
    expect(response.body).toMatchObject({
      status: `updated`,
    });
  });

  test("should return category mock", async () => {
    const query = { id };

    const response = await request(app.express)
      .get("/category/get")
      .query(query);

    expect(response.body).toMatchObject({
      status: `returned`,
      data,
    });
  });

  test("should return success in delete category", async () => {
    const query = { id };

    const response = await request(app.express)
      .delete("/category/delete")
      .query(query);

    expect(response.body).toMatchObject({ status: `deleted` });
  });
});
