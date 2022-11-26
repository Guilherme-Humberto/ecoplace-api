import { describe, expect, test } from "vitest";
import { v4 as uuidV4 } from "uuid";
import { IContributor, ICollectionCenter } from "@interfaces/index";
import {
  validateCreateContributor,
  validateCreateCollectionCenter,
  validateGetEntityById,
} from "@shared/validation";

describe("Validation data input", () => {
  test("should return error if data is empty (contributor)", () => {
    const data: IContributor = {} as IContributor;
    expect(() => validateCreateContributor(data)).toThrow();
  });

  test("should return error if data is empty (collectionCenter)", () => {
    const data: ICollectionCenter = {} as ICollectionCenter;
    expect(() => validateCreateCollectionCenter(data)).toThrow();
  });

  test("should return error in validation collectionId", () => {
    const collectionId = uuidV4();
    expect(() => validateGetEntityById(collectionId)).not.toThrow();
  });
});
