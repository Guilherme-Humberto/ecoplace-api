import { connection } from "@database/connection";

interface LoginInput {
  email: string;
  password: string;
}

class AdminService {
  async get(data: LoginInput) {
    const { email, password } = data;

    const query = `
      select 
        first_name, 
        second_name,
        email, 
        status 
      from admin where email = ? 
      and password = ?
    `;

    const [response] = await connection.query(query, [email, password]);
    return response;
  }
}

export default new AdminService();
