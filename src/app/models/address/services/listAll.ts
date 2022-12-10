import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { AddressDto } from "../dto";

class ListAllAddressService {
  async execute(): Promise<IStatusResponse & { data: AddressDto }> {
    const selectAllSQL = `select * from tbl_addrs;`;
    const response = await connection.query(selectAllSQL);
    return { status: "returned", data: response };
  }
}

export default new ListAllAddressService();
