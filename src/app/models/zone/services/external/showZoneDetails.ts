import { connection } from "@database/connection";
import { formatedZoneDetails } from "@shared/utils";
import { ShowZoneDetailsServiceDto } from "../../dto";

const resultNotFound = (response: any) => !response || response.length == 0;
const joinIds = (idsArray: string[]) =>
  idsArray.map((id) => `"${id}"`).join(",");

class ZoneDetailsService {
  async execute(data: ShowZoneDetailsServiceDto) {
    const regionParameters = [data.mesoregion_id, data.microregion_id];

    let inItemsIds: string[] | string = [];
    let conditional = ";";

    if (data.categoriesIds && Array.isArray(data.categoriesIds)) {
      inItemsIds = joinIds(data.categoriesIds);
    }
    if (inItemsIds.length >= 1) {
      conditional = `and category_id in (${inItemsIds})`;
    }

    const selectZoneSQL = `
      select * from vw_zone_details
      where mesoregion_id = ? and microregion_id = ? ${conditional}
    `;

    const zones = await connection.query(selectZoneSQL, regionParameters);

    if (resultNotFound(zones)) return [];

    const selectZoneAddrsSQL = `
      select * from vw_zone_addrs
      where mesoregion_id = ? and microregion_id = ?;
    `;

    const zoneAddrs = await connection.query(
      selectZoneAddrsSQL,
      regionParameters
    );

    if (resultNotFound(zoneAddrs)) return [];

    const inZonesIds = joinIds(zones.map((item: { id: string }) => item.id));

    const selectZoneCategorySQL = `
      select * from vw_zone_category
      where zone_id in (${inZonesIds});
    `;

    const zoneCategories = await connection.query(selectZoneCategorySQL);
    if (resultNotFound(zoneCategories)) return [];

    return formatedZoneDetails({
      zones,
      zoneAddrs,
      zoneCategories,
    });
  }
}

export default new ZoneDetailsService();
