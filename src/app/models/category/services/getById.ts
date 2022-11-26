import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { CategoryListResponseDto } from "../dto";

class GetByIdCategoryService {
  async execute(
    id: string
  ): Promise<IStatusResponse & { data: CategoryListResponseDto }> {
    const selectByIdSQL = `
      select id, title, slug, image 
      from tbl_category where id = ?;
    `;
    const [response] = await connection.query(selectByIdSQL, [id]);
    return { status: 'returned', data: response };
  }
}

export default new GetByIdCategoryService();
