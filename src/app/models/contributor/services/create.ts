import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { CreateContributorDto } from "../dto";

class CreateContributorService {
  async execute(data: CreateContributorDto): Promise<IStatusResponse> {
    const findOneQuery = `select * from tbl_contributor where email = ?`;
    const [findOneResponse] = await connection.query(findOneQuery, [
      data.email,
    ]);

    if (findOneResponse) throw Error("Contributor alreary exists");

    const createQuery = `insert into tbl_contributor (id, name, email) values (?, ?, ?)`;
    const parametersBody = [data.id, data.name, data.email];

    await connection.query(createQuery, parametersBody);
    return { status: "created" };
  }
}

export default new CreateContributorService();
