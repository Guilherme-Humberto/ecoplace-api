import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";

class DeleteAddressService {
  async execute(id: string): Promise<IStatusResponse> {
    const deleteSQL = `delete from tbl_addrs where id = ?;`;
    await connection.query(deleteSQL, [id]);
    return { status: "deleted", };
  }
}

export default new DeleteAddressService();
