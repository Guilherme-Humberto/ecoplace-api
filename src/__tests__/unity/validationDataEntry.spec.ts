import { describe, expect, test } from "vitest";
import { IContributor, IResiduePoint } from "@interfaces/index";
import {
  validateCreateContributor,
  validateCreateResiduePoint,
  validateGetResiduePointById,
} from "@app/validation/dataEntry";

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
    const residueId = 1;
    expect(() => validateGetResiduePointById(residueId)).not.toThrow();
  });
});
