import { describe, expect, test } from "vitest";
import { v4 as uuidV4 } from "uuid";
import { IContributor, IResiduePoint } from "@interfaces/index";
import {
  validateCreateContributor,
  validateCreateResiduePoint,
  validateGetEntityById,
} from "@app/validation";

describe("Validation data input", () => {
  test("should return error if data is empty (contributor)", () => {
    const data: IContributor = {} as IContributor;
    expect(() => validateCreateContributor(data)).toThrow();
  });

  test("should return error if data is empty (residuePoint)", () => {
    const data: IResiduePoint = {} as IResiduePoint;
    expect(() => validateCreateResiduePoint(data)).toThrow();
  });

  test("should return error in validation residueId", () => {
    const residueId = uuidV4();
    expect(() => validateGetEntityById(residueId)).not.toThrow();
  });
});
