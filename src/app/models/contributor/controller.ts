import { Request, Response } from "express";
import service from "./service";
import { validateCreateContributor, validateGetEntityById } from "@app/validation";
import { generateUUID } from "@app/utils";

class ContributorController {
  async listAll(_request: Request, response: Response): Promise<Response> {
    try {
      const result = await service.listAll();
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { name, email } = request.body;
      validateCreateContributor(request.body);

      const id = generateUUID()

      const result = await service.create({ id, name, email });
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const contributorId = String(request.query.id)
      validateGetEntityById(contributorId);

      const result = await service.delete(contributorId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new ContributorController();
