import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { ZoneResponseDto } from "../dto";

class GetByIdZoneService {
  async execute(
    id: string
  ): Promise<IStatusResponse & { data: ZoneResponseDto }> {
    const selectByIdSQL = `
      select name, description, image, phone, email 
      from tbl_zone where id = ?;
    `;
    const [response] = await connection.query(selectByIdSQL, [id]);
    return { status: "returned", data: response };
  }
}

export default new GetByIdZoneService();
