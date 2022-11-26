import { CreateAddressDto } from "../dto";
import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";

class CreateAddressService {
  async execute(data: CreateAddressDto): Promise<IStatusResponse> {
    const parametersBody = [
      data.id,
      data.addrs_name,
      data.addrs_number,
      data.zip_code,
      data.district,
    ];

    const insertAddrsSQL = `
      insert into tbl_addrs (id, addrs_name, addrs_number, zip_code, district) values (?, ?, ?, ?, ?);
    `;

    await connection.query(insertAddrsSQL, parametersBody);
    return { status: 'created' };
  }
}

export default new CreateAddressService();
