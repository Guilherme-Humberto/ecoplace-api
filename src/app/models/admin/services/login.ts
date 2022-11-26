import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { IAdminLoginResponse, LoginDto } from "../dto";

class LoginAdminService {
  async execute(data: LoginDto): Promise<IStatusResponse & { data: IAdminLoginResponse }> {
    const parametersBody = [data.email, data.password]

    const query = `
      select name, email, status from tbl_admin 
      where email = ? and password = ?
    `;

    const [response] = await connection.query(query, parametersBody);
    if (!response) throw Error("admin not found");

    return { status: 'returned',  data: response };
  }
}

export default new LoginAdminService()