import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import service from "./service";
import { IResiduePoint } from "@interfaces/index";
import {
  validateCreateResiduePoint,
  validateGetEntityById,
} from "@app/validation/dataEntry";

class ResiduePointController {
  async listAllPoints(_request: Request, response: Response) {
    try {
      const result = await service.listAll();
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async getPontById(request: Request, response: Response) {
    try {
      const residueItemId = String(request.query.id);
      validateGetEntityById(residueItemId);

      const result = await service.getById(residueItemId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async getPontByResidueItem(request: Request, response: Response) {
    try {
      const residueItemId = String(request.query.id);
      validateGetEntityById(residueItemId);

      const result = await service.getByResidueItem(residueItemId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async createResiduePoint(request: Request, response: Response) {
    try {
      const data: IResiduePoint = {
        id: request.body.id ? request.body.id :uuidV4(),
        ...request.body
      };

      validateCreateResiduePoint(data);

      const result = await service.create(data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async deleteResiduePoint(request: Request, response: Response) {
    try {
      const residuePointId = String(request.query.id);
      validateGetEntityById(residuePointId);

      const result = await service.delete(residuePointId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async updateResiduePoint(request: Request, response: Response) {
    try {
      const residuePointId = String(request.query.id);

      const data: IResiduePoint = {
        id: request.body.id ? request.body.id : uuidV4(),
        ...request.body
      };

      validateGetEntityById(residuePointId);
      validateCreateResiduePoint(data);

      const result = await service.update(residuePointId, data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new ResiduePointController();
