import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";

class DeleteZoneService {
  async execute(id: string): Promise<IStatusResponse> {
    const deleteSQL = `delete from tbl_zone where id = ?;`;
    await connection.query(deleteSQL, [id]);

    return { status: "deleted" };
  }
}

export default new DeleteZoneService();
