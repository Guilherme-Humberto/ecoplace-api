import { Request, Response } from "express";
import { IZone } from "@interfaces/index";
import { generateUUID } from "@shared/utils";
import {
  validateCreateZone,
  validateGetEntityById,
  validateRegionByIds,
} from "@shared/validation";
import createService from "@app/models/zone/services/create";
import deleteService from "@app/models/zone/services/delete";
import getByIdService from "@app/models/zone/services/getById";
import listAllService from "@app/models/zone/services/listAll";
import updateService from "@app/models/zone/services/update";
import createZoneAddrsService from "@app/models/zone/services/external/createZoneAddrs";
import createZoneCategoryService from "@app/models/zone/services/external/createZoneCategory";
import updateZoneCategoryService from "@app/models/zone/services/external/updateZoneCategory";
import deleteZoneCategoryService from "@app/models/zone/services/external/deleteZoneCategory";
import showZoneDetailsService from "@app/models/zone/services/external/showZoneDetails";

class CollectionCenterController {
  async listAll(_request: Request, response: Response) {
    try {
      const result = await listAllService.execute();
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const zoneId = String(request.query.id);
      validateGetEntityById(zoneId);

      const result = await getByIdService.execute(zoneId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async getDetails(request: Request, response: Response) {
    try {
      const { mesoregion_id, microregion_id } = request.body;

      await validateRegionByIds(mesoregion_id, microregion_id);

      const result = await showZoneDetailsService.execute(request.body);

      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const data: IZone = {
        id: request.body.id ? request.body.id : generateUUID(),
        ...request.body,
      };

      validateCreateZone(data);
      const result = await createService.execute(data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async createZonerAddrs(request: Request, response: Response) {
    try {
      const result = await createZoneAddrsService.execute(request.body);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const zoneId = String(request.query.id);
      validateGetEntityById(zoneId);

      const result = await deleteService.execute(zoneId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const zoneId = String(request.query.id);

      const data: IZone = {
        id: request.body.id ? request.body.id : generateUUID(),
        ...request.body,
      };

      validateGetEntityById(zoneId);
      validateCreateZone(data);

      const result = await updateService.execute(zoneId, data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async updateZoneCategory(request: Request, response: Response) {
    try {
      const zoneId = String(request.query.id);
      const itemIdArray = request.body.data as string[];

      if (itemIdArray.length == 0) throw Error("Ids list is empty");
      itemIdArray.forEach((item: string) => validateGetEntityById(item));

      const result = await updateZoneCategoryService.execute(
        zoneId,
        itemIdArray
      );
      return response.status(200).json(result);
    } catch ({ message: error }) {
      console.log(error);
      return response.status(400).json({ error });
    }
  }

  async createZoneCategory(request: Request, response: Response) {
    try {
      const { zone_id, category_id } = request.body;

      validateGetEntityById(zone_id);
      validateGetEntityById(category_id);

      const result = await createZoneCategoryService.execute(request.body);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      console.log(error);
      return response.status(400).json({ error });
    }
  }

  async removeZoneCategory(request: Request, response: Response) {
    try {
      const zoneId = String(request.query.id);
      const itemIdArray = request.body.data as string[];

      if (itemIdArray.length == 0) throw Error("Ids list is empty");
      itemIdArray.forEach((item: string) => validateGetEntityById(item));

      const result = await deleteZoneCategoryService.execute(
        zoneId,
        itemIdArray
      );
      return response.status(200).json(result);
    } catch ({ message: error }) {
      console.log(error);
      return response.status(400).json({ error });
    }
  }
}

export default new CollectionCenterController();
