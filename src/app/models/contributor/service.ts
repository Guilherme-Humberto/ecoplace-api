import { connection } from "@database/connection";

interface ContribuitorInput {
  first_name: string;
  second_name: string;
  email: string;
}

class ContribuitorService {
  async list() {
    const query = `select * from contributor`;
    return await connection.query(query);
  }
  async create(data: ContribuitorInput) {
    const { email, first_name } = data;
    const findOneQuery = `select * from contributor where email = ?`;
    const [findOneResponse] = await connection.query(findOneQuery, [email]);

    if (findOneResponse) throw Error("Contributor alreary exists");

    const createQuery = `insert into contributor (first_name, email) values (?, ?)`;
    return await connection.query(createQuery, [first_name, email]);
  }
}

export default new ContribuitorService();
