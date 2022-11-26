import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { CategoryListResponseDto } from "../dto";

class ListAllCategoryService {
  async execute(): Promise<IStatusResponse & { data: CategoryListResponseDto }> {
    const selectAllSQL = `
      select id, title, slug, image from tbl_category 
      order by created_at desc;
    `;

    const response = await connection.query(selectAllSQL);
    return { status: 'returned', data: response }
  }
}

export default new ListAllCategoryService()