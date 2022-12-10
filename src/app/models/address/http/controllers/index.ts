import { Request, Response } from "express";
import { generateUUID } from "@shared/utils";
import { validateGetEntityById } from "@shared/validation";
import listAllService from "@app/models/address/services/listAll";
import createService from "@app/models/address/services/create";
import updateService from "@app/models/address/services/update";
import updateRegionsService from "@app/models/address/services/updateRegions";

class AddrsController {
  async listAll(_request: Request, response: Response) {
    try {
      return await listAllService.execute();
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const data = {
        id: request.body.id ? request.body.id : generateUUID(),
        ...request.body,
      };

      const result = await createService.execute(data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { addrs_id, zone_id } = request.query;

      validateGetEntityById(String(addrs_id));
      if (zone_id && zone_id !== "") validateGetEntityById(String(zone_id));

      const result = await updateService.execute(
        String(addrs_id),
        request.body
      );

      if (zone_id && zone_id !== "") {
        await updateRegionsService.execute(
          String(addrs_id),
          String(zone_id),
          request.body
        );
      }

      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new AddrsController();
