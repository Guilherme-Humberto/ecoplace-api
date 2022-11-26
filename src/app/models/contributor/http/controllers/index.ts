import { Request, Response } from "express";
import createService from "@app/models/contributor/services/create";
import listAllService from "@app/models/contributor/services/listAll";
import deleteService from "@app/models/contributor/services/delete";

class ContributorController {
  async listAll(_request: Request, response: Response): Promise<Response> {
    try {
      const result = await listAllService.execute();
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const result = await createService.execute(request.body);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const contributorId = String(request.query.id);
      const result = await deleteService.execute(contributorId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new ContributorController();
