import { IContributor, IResiduePoint } from "@interfaces/index";

export const validateContributorEntry = (data: IContributor) => {
  if (!data.email || !data.first_name) {
    throw Error("email and first_name is required");
  }

  if (typeof data.email !== "string") {
    throw Error("Email must be a string");
  }

  if (typeof data.first_name !== "string") {
    throw Error("First name must be a string");
  }
};

export const validateResiduePointEntry = (data: IResiduePoint) => {
  const isEmptyData =
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

  if (isEmptyData) {
    throw Error("Empty or invalid data");
  }

  if (isValidTypeData) {
    throw Error("Invalid data");
  }
};

export const validateGetResiduePointById = (residueId: number) => {
  const isEmptyData = !residueId;
  const isValidTypeData = typeof residueId !== "number";

  if (isEmptyData) throw Error("Empty or invalid data");
  if (isValidTypeData) throw Error("Invalid data");
};
