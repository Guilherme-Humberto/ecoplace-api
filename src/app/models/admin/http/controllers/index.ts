import { Request, Response } from "express";
import loginService from "@app/models/admin/services/login";

class AdminController {
  async login(request: Request, response: Response): Promise<Response> {
    try {
      const result = await loginService.execute(request.body);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new AdminController();
