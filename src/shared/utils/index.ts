import { v4 as uuidV4 } from "uuid";
import slugify from "slugify";
import { IFormatZoneDetails } from "@interfaces/index";

export const generateUUID = () => uuidV4();
export const generateSlug = (value: string) => {
  return slugify(value, {
    replacement: "-",
    lower: true,
    trim: false,
  });
};

export const formatedZoneDetails = ({
  zones,
  zoneAddrs,
  zoneCategories,
}: IFormatZoneDetails) => {
  const formatedCollections = zones.reduce((prev: any, item) => {
    prev[item.id] = prev[item.id] || [];

    const itemExists = prev[item.id].find(
      (itemData: { id: string }) => itemData.id == item.id
    );

    if (itemExists) return prev;

    const items = zoneCategories.filter((element) => {
      return element.zone_id == item.id;
    });

    const addresses = zoneAddrs.filter((addrs) => {
      return addrs.zone_id == item.id;
    });

    prev[item.id].push({ ...item, items, addresses });
    return prev;
  }, {});

  const keys = Object.keys(formatedCollections);
  return keys.map((item) => formatedCollections[item][0]);
};
