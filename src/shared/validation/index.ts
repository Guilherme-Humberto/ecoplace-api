import { validate as validateUUID } from "uuid";
import { IContributor, IZone } from "@interfaces/index";
import { IbgeApi } from "@app/api";

export const validateCreateContributor = (data: IContributor) => {
  const isEmptyData = !data.email || !data.name;

  const isValidTypeData =
    typeof data.email !== "string" || typeof data.name !== "string";

  if (isEmptyData) throw Error("non-existent or invalid data");
  if (isValidTypeData) throw Error("Invalid contributor data");
};

export const validateCreateZone = (data: IZone) => {
  const isEmptyData =
    !data.id ||
    !data.name ||
    !data.email ||
    !data.image ||
    !data.phone ||
    !data.description;

  const isValidTypeData =
    typeof data.name !== "string" ||
    typeof data.email !== "string" ||
    typeof data.image !== "string" ||
    typeof data.phone !== "string" ||
    typeof data.description !== "string";

  if (!validateUUID(String(data.id))) throw Error("Invalid id format");
  if (isEmptyData) throw Error("Empty or invalid data");
  if (isValidTypeData) throw Error("Invalid collectionCenter data");
};

export const validateGetEntityById = (id: string) => {
  const isEmptyData = !id;
  const isValidTypeData = typeof id !== "string";

  if (!validateUUID(id)) throw Error("Invalid id format");
  if (isEmptyData) throw Error("Empty or invalid data");
  if (isValidTypeData) throw Error("Invalid collectionCenterById data");
};

export const validateRegionByIds = async (
  mesoRegionId: number,
  microRegionId?: number
) => {
  const { data: mesoRegion } = await IbgeApi.get(`/estados/${mesoRegionId}`);
  const mesoRegionExists = Array.isArray(mesoRegion) && mesoRegion.length == 0;

  if (!mesoRegion || mesoRegionExists) throw Error("state not found");

  let microRegion;

  if (microRegionId) {
    const { data: microRegionResponse } = await IbgeApi.get(
      `/microrregioes/${microRegionId}`
    );
    microRegion = microRegionResponse;
  }

  if (!microRegion) throw Error("city not found");
  return mesoRegion;
};
