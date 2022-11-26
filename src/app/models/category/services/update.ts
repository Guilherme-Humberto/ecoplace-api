import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { UpdateCategoryDto } from "../dto";

class UpdateCategoryService {
  async execute(id: string, data: UpdateCategoryDto): Promise<IStatusResponse> {
    const selectByIdSQL = `select id from tbl_category where id = ?;`;
    const [category] = await connection.query(selectByIdSQL, [id]);
    if (!category) throw Error("Category not found");

    const parametersBody = [
      data.title || category.title,
      data.slug || category.slug,
      data.image || category.image,
    ];

    const updateSQL = `
      update tbl_category set title = ?, 
      slug = ?, image = ? where id = ?;
    `;

    await connection.query(updateSQL, [...parametersBody, id]);
    return { status: "updated" };
  }
}

export default new UpdateCategoryService();
