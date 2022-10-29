import { validateContributorEntry } from "@app/validation/dataEntry";
import { Request, Response } from "express";
import service from "./service";

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
      validateContributorEntry(request.body);

      const result = await service.create(request.body);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new ContributorController();
