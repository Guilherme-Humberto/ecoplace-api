import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { CreateZoneDto } from "../dto";

class CreateZoneService {
  async execute(data: CreateZoneDto): Promise<IStatusResponse> {
    const parametersBody = [
      data.id,
      data.name,
      data.email,
      data.image,
      data.phone,
      data.description,
    ];

    const selectByEmailSQL = `
      select id from tbl_zone where email = ?;
    `;

    const [findByEmailResponse] = await connection.query(selectByEmailSQL, [
      data.email,
    ]);

    if (findByEmailResponse) throw Error("Zone already exists");

    const insertZoneSQL = `
      insert into tbl_zone 
      (id, name, email, image, phone, description)
      values (?, ?, ?, ?, ?, ?);
    `;

    await connection.query(insertZoneSQL, parametersBody);
    return { status: "created" };
  }
}
export default new CreateZoneService();
