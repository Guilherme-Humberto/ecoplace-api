import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";

class DeleteCategoryService {
  async execute(id: string): Promise<IStatusResponse> {
    const deleteSQL = `delete from tbl_category where id = ?;`;
    await connection.query(deleteSQL, [id]);
    return { status: "deleted" };
  }
}

export default new DeleteCategoryService();
