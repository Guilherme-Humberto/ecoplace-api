import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { CreateZoneCategoryDto } from "../../dto";

class CreateZoneCategoryService {
  async execute(data: CreateZoneCategoryDto): Promise<IStatusResponse> {
    const parametersBody = [
      data.zone_id,
      data.category_id
    ];
    
    const insertZoneCategorySQL = `
      insert into tbl_zone_category
      (zone_id, category_id) values (?, ?);
    `;

    await connection.query(insertZoneCategorySQL, parametersBody);
    return { status: 'created' }
  }
}

export default new CreateZoneCategoryService();
