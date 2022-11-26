import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { CreateCategoryDto } from "../dto";

class CreateCategoryService {
  async execute(data: CreateCategoryDto): Promise<IStatusResponse> {
    const selectBySlugSQL = `
        select id from tbl_category where slug = ?;
    `;

    const [category] = await connection.query(selectBySlugSQL, [data.slug]);
    if (category) throw Error("Category already exists");

    const insertCategorySQL = `
      insert into tbl_category (id, title, slug, image) values (?, ?, ?, ?);
    `;

    const parametersBody = [data.id, data.title, data.slug, data.image];
    await connection.query(insertCategorySQL, parametersBody);

    return { status: 'created' };
  }
}

export default new CreateCategoryService()