import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";

class DeleteZoneCategoryService {
  async execute(id: string, data: string[]): Promise<IStatusResponse> {
    const removeItems = data.map(async (itemId: string) => {
      const insertQuery = `
        delete from tbl_zone_category
        where zone_id = ? and category_id = ?
      `;
      return await connection.query(insertQuery, [id, itemId]);
    });
    
    await Promise.all(removeItems);
    return { status: "deleted" };
  }
}

export default new DeleteZoneCategoryService();
