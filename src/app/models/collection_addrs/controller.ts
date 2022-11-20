import { validateGetEntityById } from "@app/validation";
import { Request, Response } from "express";
import service from "./service";

class CollectionAddrsController {
  async listAll(_request: Request, response: Response) {
    try {
      return await service.listAll();
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async updateCollectionAddrss(request: Request, response: Response) {
    try {
      const collectionAddrsId = String(request.query.collection_addrs_id);
      const collectionCenterId = String(request.query.collection_center_id);

      validateGetEntityById(collectionAddrsId);
      validateGetEntityById(collectionCenterId);

      const result = await service.update(collectionAddrsId, request.body);
      await service.updateRegions(
        collectionAddrsId,
        collectionCenterId,
        request.body
      );

      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new CollectionAddrsController();
