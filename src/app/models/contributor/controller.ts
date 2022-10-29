import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import service from "./service";
import { validateCreateContributor } from "@app/validation/dataEntry";

class ContributorController {
  async listAll(_request: Request, response: Response): Promise<Response> {
    try {
      const result = await service.list();
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
  async register(request: Request, response: Response) {
    try {
      const { name, email } = request.body;
      validateCreateContributor(request.body);

      const result = await service.create({ id: uuidV4(), name, email });
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new ContributorController();
