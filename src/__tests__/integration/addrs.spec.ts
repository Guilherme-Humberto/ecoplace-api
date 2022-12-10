import { describe, expect, test } from "vitest";
import request from "supertest";
import { addrsMock } from "@mocks/index";
import app from "../../app";
import { generateUUID } from "@shared/utils";
import deleteService from "../../app/models/address/services/delete";

describe("Address", () => {
  const id = generateUUID();
  const data = {
    id,
    ...addrsMock,
  };

  test("should return success in create address", async () => {
    const response = await request(app.express)
      .post("/address/create")
      .send(data);

    expect(response.body).toMatchObject({
      status: `created`,
    });
  });

  test("should return success in update address", async () => {
    const query = { addrsId: id };

    data["addrs_name"] = "Novo nome do endereço";

    const response = await request(app.express)
      .put("/address/update")
      .query(query)
      .send(data);

    const errorText = JSON.parse(response.text);
    expect(errorText).not.toMatchObject({
      error: `Addrss not found`,
    });
    expect(response.body).toMatchObject({
      status: `updated`,
    });
  });

  test("should return success in delete address", async () => {
    const result = await deleteService.execute(id);
    expect(result).toMatchObject({ status: `deleted` });
  });
});
