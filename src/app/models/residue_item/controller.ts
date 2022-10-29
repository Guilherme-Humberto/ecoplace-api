import { validateGetEntityById } from "@app/validation/dataEntry";
import { IResidueItem } from "@interfaces/index";
import { Request, Response } from "express";
import slugify from "slugify";
import service from "./service";

class ResidueItemController {
  async listAll(_request: Request, response: Response) {
    try {
      const result = await service.list();
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async getOneById(request: Request, response: Response) {
    try {
      const residueItemId = String(request.query.id);
      validateGetEntityById(residueItemId)

      const result = await service.getById(residueItemId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async createResidueItem(request: Request, response: Response) {
    try {
      const data: IResidueItem = {
        slug: slugify(request.body.title),
        ...request.body,
      };

      const result = await service.create(data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async updateResidueItem(request: Request, response: Response) {
    try {
      const residueItemId = String(request.query.id);
      validateGetEntityById(residueItemId)

      const data: IResidueItem = {
        slug: slugify(request.body.title),
        ...request.body,
      };

      const result = await service.update(residueItemId, data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async deleteResidueItem(request: Request, response: Response) {
    try {
      const residueItemId = String(request.query.id);
      validateGetEntityById(residueItemId)

      const result = await service.delete(residueItemId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new ResidueItemController();
