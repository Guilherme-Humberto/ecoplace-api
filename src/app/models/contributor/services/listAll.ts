import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { ContributorResponseDto } from "../dto";

class ListAllContributorService {
  async execute(): Promise<IStatusResponse & { data: ContributorResponseDto }> {
    const query = `select name, email from tbl_contributor;`;
    const response = await connection.query(query);
    return { status: "returned", data: response };
  }
}

export default new ListAllContributorService();
