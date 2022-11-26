import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { UpdateAddressDto } from "../dto";

class UpdateAddressService {
  async execute(id: string, data: UpdateAddressDto): Promise<IStatusResponse> {
    const selectByIdSQL = `select * from tbl_addrs where id = ?;`;

    const [addrsResponse] = await connection.query(selectByIdSQL, [id]);
    if (!addrsResponse) throw Error("Addrss not found");

    const parametersBody = [
      data.addrs_name || addrsResponse.addrs_name,
      data.addrs_number || addrsResponse.addrs_number,
      data.zip_code || addrsResponse.zip_code,
      data.district || addrsResponse.district,
    ];

    const updateAddrsSQL = `
      update tbl_addrs set addrs_name = ?, 
      addrs_number = ?, zip_code = ?, district = ? where id = ?;
    `;

    await connection.query(updateAddrsSQL, [...parametersBody, id]);
    return { status: "updated" };
  }
}

export default new UpdateAddressService();
