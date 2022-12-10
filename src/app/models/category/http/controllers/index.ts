import { Request, Response } from "express";
import { validateGetEntityById } from "@shared/validation";
import { ICategory } from "@interfaces/index";
import { generateSlug, generateUUID } from "@shared/utils";
import listAllService from "@app/models/category/services/listAll";
import getByIdService from "@app/models/category/services/getById";
import createService from "@app/models/category/services/create";
import updateService from "@app/models/category/services/update";
import deleteService from "@app/models/category/services/delete";

class CategoryController {
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
      const categoryId = String(request.query.id);
      validateGetEntityById(categoryId);

      const result = await getByIdService.execute(categoryId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const data: ICategory = {
        ...request.body,
        slug: generateSlug(request.body.title),
        id: request.body.id ? request.body.id : generateUUID(),
      };

      const result = await createService.execute(data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const categoryId = String(request.query.id);
      validateGetEntityById(categoryId);

      const data: ICategory = {
        slug: generateSlug(request.body.title),
        ...request.body,
      };

      const result = await updateService.execute(categoryId, data);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      console.log(error);
      return response.status(400).json({ error });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const categoryId = String(request.query.id);
      validateGetEntityById(categoryId);

      const result = await deleteService.execute(categoryId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new CategoryController();
