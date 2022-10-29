import { describe, expect, test } from "vitest";
import { IContributor, IResiduePoint } from "@interfaces/index";
import {
  validateContributorEntry,
  validateResiduePointEntry,
} from "@app/validation/dataEntry";

describe("Validation data input", () => {
  test("should return error if data is empty (contributor)", () => {
    const data: IContributor = {} as IContributor;
    expect(() => validateContributorEntry(data)).toThrow();
  });

  test("should return error if data is empty (residuePoint)", () => {
    const data: IResiduePoint = {} as IResiduePoint;
    expect(() => validateResiduePointEntry(data)).toThrow();
  });
});
