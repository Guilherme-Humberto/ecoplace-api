import { connection } from "@database/connection";

interface ContribuitorInput {
  id: string
  name: string;
  email: string;
}

class ContribuitorService {
  async listAll() {
    const query = `select * from contributor`;
    return await connection.query(query);
  }
  
  async create(data: ContribuitorInput) {
    const { id, email, name } = data;
    const findOneQuery = `select * from contributor where email = ?`;
    const [findOneResponse] = await connection.query(findOneQuery, [email]);

    if (findOneResponse) throw Error("contributor alreary exists");

    const createQuery = `insert into contributor (id, name, email) values (?, ?, ?)`;
    await connection.query(createQuery, [id, name, email]);
    return { message: 'contributor created' }
  }

  async delete(email: string) {
    const query = `delete from contributor where email = ?`;
    await connection.query(query, [email]);
    return { message: `${email} deleted` }
  }
}

export default new ContribuitorService();
