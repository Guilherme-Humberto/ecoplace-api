import { Request, Response } from "express";
import service from "./service";
import { ICollectionCenter } from "@interfaces/index";
import { generateUUID } from "@app/utils";
import {
  validateCreateCollectionCenter,
  validateGetEntityById,
  validateRegionByIds,
} from "@app/validation";

class CollectionCenterController {
  async listAll(_request: Request, response: Response) {
    try {
      const result = await service.listAll();
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async getCollectionById(request: Request, response: Response) {
    try {
      const collectionItemId = String(request.query.id);
      validateGetEntityById(collectionItemId);

      const result = await service.getById(collectionItemId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async getCollectionCenter(request: Request, response: Response) {
    try {
      const { item_id, mesoregion_id, microregion_id } = request.body;

      await validateRegionByIds(mesoregion_id, microregion_id)

      const result = await service.getCollectionCenterByRegion({
        item_id,
        mesoregion_id,
        microregion_id,
      });

      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async createCollectionCenter(request: Request, response: Response) {
    try {
      const data: ICollectionCenter = {
        id: request.body.id ? request.body.id : generateUUID(),
        ...request.body
      };

      validateCreateCollectionCenter(data);

      const result = await service.create(data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async deleteCollectionCenter(request: Request, response: Response) {
    try {
      const collectionCenterId = String(request.query.id);
      validateGetEntityById(collectionCenterId);

      const result = await service.delete(collectionCenterId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async updateCollectionCenter(request: Request, response: Response) {
    try {
      const collectionCenterId = String(request.query.id);

      const data: ICollectionCenter = {
        id: request.body.id ? request.body.id : generateUUID(),
        ...request.body
      };

      validateGetEntityById(collectionCenterId);
      validateCreateCollectionCenter(data);

      const result = await service.update(collectionCenterId, data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new CollectionCenterController();
