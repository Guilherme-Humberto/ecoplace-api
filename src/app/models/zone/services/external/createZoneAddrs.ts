import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { CreateZoneAddrsDto } from "../../dto";

class CreateZoneAddrsService {
  async execute(data: CreateZoneAddrsDto): Promise<IStatusResponse> {
    const parametersBody = [
      data.mesoregion_id,
      data.microregion_id,
      data.addrs_id,
      data.zone_id,
    ];

    const insertZoneAddrsSQL = `
      insert into tbl_zone_addrs 
      (mesoregion_id, microregion_id, addrs_id, zone_id) values (?, ?, ?, ?);
    `;

    await connection.query(insertZoneAddrsSQL, parametersBody);
    return { status: "created" };
  }
}

export default new CreateZoneAddrsService();
