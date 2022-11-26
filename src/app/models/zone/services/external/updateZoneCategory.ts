import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";

class UpdateZoneCategoryService {
  async execute(id: string, data: string[]): Promise<IStatusResponse> {
    const deleteZoneCategories = data.map(async (itemId: string) => {
      const deleteQuery = `
        delete from tbl_zone_category 
        where zone_id = ? and category_id = ?
      `;
      return await connection.query(deleteQuery, [id, itemId]);
    });

    const insertZoneCategories = data.map(async (itemId: string) => {
      const insertQuery = `
        insert into tbl_zone_category 
        (zone_id, category_id) values (?, ?)
      `;
      return await connection.query(insertQuery, [id, itemId]);
    });

    await Promise.all(deleteZoneCategories);
    await Promise.all(insertZoneCategories);
    return { status: "updated" };
  }
}

export default new UpdateZoneCategoryService();
