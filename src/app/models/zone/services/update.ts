import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { UpdateZoneServiceDto } from "../dto";

class UpdateZoneService {
  async execute(
    id: string,
    data: UpdateZoneServiceDto
  ): Promise<IStatusResponse> {
    const selectByIdSQL = `select id from tbl_zone where id = ?;`;
    const [zone] = await connection.query(selectByIdSQL, [id]);
    if (!zone) throw Error("Zone not found");

    const updateSQL = `
      update tbl_zone set name = ?, 
      email = ?, image = ?, phone = ?, 
      description = ? where id = ?;
    `;

    const parametersBody = [
      data.name || zone.name,
      data.email || zone.email,
      data.image || zone.image,
      data.phone || zone.phone,
      data.description || zone.description,
    ];

    await connection.query(updateSQL, [...parametersBody, id]);
    return { status: "updated" };
  }
}

export default new UpdateZoneService();
