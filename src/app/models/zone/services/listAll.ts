import { connection } from "@database/connection";
import { formatedZoneDetails } from "@shared/utils";

class ListAllZonesService {
  async execute() {
    const selectZoneDetailsSQL = `select * from vw_zone_details;`;
    const selectZoneAddrsSQL = `select * from vw_zone_addrs;`;
    const selectZoneCategoriesSQL = `select * from vw_zone_category;`;

    const zones = await connection.query(selectZoneDetailsSQL);
    const zoneAddrs = await connection.query(selectZoneAddrsSQL);
    const zoneCategories = await connection.query(selectZoneCategoriesSQL);

    return formatedZoneDetails({
      zones,
      zoneAddrs,
      zoneCategories,
    });
  }
}

export default new ListAllZonesService();
