import { connection } from "@database/connection";

interface ContribuitorInput {
  id: string
  name: string;
  email: string;
}

class ContribuitorService {
  async listAll() {
    const query = `select * from tbl_contributor`;
    return await connection.query(query);
  }
  
  async create(data: ContribuitorInput) {
    const { id, email, name } = data;
    const findOneQuery = `select * from tbl_contributor where email = ?`;
    const [findOneResponse] = await connection.query(findOneQuery, [email]);

    if (findOneResponse) throw Error("contributor alreary exists");

    const createQuery = `insert into tbl_contributor (id, name, email) values (?, ?, ?)`;
    await connection.query(createQuery, [id, name, email]);
    return { message: 'contributor created' }
  }

  async delete(email: string) {
    const query = `delete from tbl_contributor where email = ?`;
    await connection.query(query, [email]);
    return { message: `${email} deleted` }
  }
}

export default new ContribuitorService();
