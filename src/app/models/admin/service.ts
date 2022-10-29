import { connection } from "@database/connection";

interface LoginInput {
  email: string;
  password: string;
}

class AdminService {
  async get(data: LoginInput) {
    const { email, password } = data;

    const query = `
      select name, email,  status 
      from admin where email = ? 
      and password = ?
    `;

    const [response] = await connection.query(query, [email, password]);
    if (!response) throw Error("admin not found");
    return response;
  }
}

export default new AdminService();
