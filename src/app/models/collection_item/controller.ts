import { Request, Response } from "express";
import service from "./service";
import { validateGetEntityById } from "@app/validation";
import { ICollectionItem } from "@interfaces/index";
import { generateSlug, generateUUID } from "@app/utils";

class CollectionItemController {
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
      const collectionItemId = String(request.query.id);
      validateGetEntityById(collectionItemId)

      const result = await service.getById(collectionItemId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async createCollectionItem(request: Request, response: Response) {
    try {

      const data: ICollectionItem = {
        ...request.body,
        slug: generateSlug(request.body.title),
        id: request.body.id ? request.body.id : generateUUID(),
      };

      const result = await service.create(data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async updateCollectionItem(request: Request, response: Response) {
    try {
      const collectionItemId = String(request.query.id);
      validateGetEntityById(collectionItemId)

      const data: ICollectionItem = {
        slug: generateSlug(request.body.title),
        ...request.body,
      };

      const result = await service.update(collectionItemId, data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      console.log(error)
      return response.status(400).json({ error });
    }
  }

  async deleteCollectionItem(request: Request, response: Response) {
    try {
      const collectionItemId = String(request.query.id);
      validateGetEntityById(collectionItemId)

      const result = await service.delete(collectionItemId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new CollectionItemController();
