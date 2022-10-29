import { Request, Response } from "express";
import service from "./service";

class AdminController {
  async login(request: Request, response: Response): Promise<Response> {
    try {
      const result = await service.get(request.body);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new AdminController();
