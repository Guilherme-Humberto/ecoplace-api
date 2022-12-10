import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";

class DeleteContributorService {
  async execute(id: string): Promise<IStatusResponse> {
    const deleteSql = `delete from tbl_contributor where id = ?`;
    await connection.query(deleteSql, [id]);
    return { status: "deleted" };
  }
}

export default new DeleteContributorService();
