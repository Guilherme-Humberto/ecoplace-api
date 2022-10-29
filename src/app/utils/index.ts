import { v4 as uuidV4 } from "uuid";
import slugify from "slugify";

export const generateUUID = () => uuidV4();
export const generateSlug = (value: string) => {
  return slugify(value, {
    replacement: "-",
    lower: true,
    trim: false,
  });
};
