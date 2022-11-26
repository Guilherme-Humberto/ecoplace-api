import { describe, expect, it, test } from "vitest";
import { validateRegionByIds } from "@shared/validation";

describe("Validation get region by ids", () => {
  const spRegionId = {
    mesoRegion: 35,
    microRegion: 35061,
  };

  test("should return state not found", async () => {
    await expect(
      validateRegionByIds(0, spRegionId.microRegion)
    ).rejects.toThrow("state not found");
  });

  test("should return city not found", async () => {
    await expect(validateRegionByIds(spRegionId.mesoRegion, 0)).rejects.toThrow(
      "city not found"
    );
  });

  test("should return SP region id", async () => {
    await expect(
      validateRegionByIds(spRegionId.mesoRegion, spRegionId.microRegion)
    ).resolves.toContain({ id: spRegionId.mesoRegion });
  });
});
