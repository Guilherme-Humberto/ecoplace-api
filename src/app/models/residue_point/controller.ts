import { validateGetResiduePointById } from "@app/validation/dataEntry";
import { Request, Response } from "express";
import service from "./service";

class ResiduePointController {
  async listAllPoints(_request: Request, response: Response) {
    try {
      const result = await service.listAll();
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async getPontByResidueItem(request: Request, response: Response) {
    try {
      const residueId = Number(request.query.residueId);
      validateGetResiduePointById(residueId);

      const result = await service.getByResidueItem(residueId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async getPontBySearchValue(request: Request, response: Response) {
    try {
      const residuePointName = String(request.query.residuePointName);

      const result = await service.getBySearchValue(residuePointName);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async createResidue(request: Request, response: Response) {
    try {
      const { name, description, image, phone, email } = request.body;
      const result = await service.create({
        name,
        description,
        image,
        phone,
        email,
      });
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async deleteResidue(request: Request, response: Response) {
    try {
      const residueId = Number(request.query.residueId);
      validateGetResiduePointById(residueId);

      const result = await service.delete(residueId);
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }

  async updateResidue(request: Request, response: Response) {
    try {
      const residueId = Number(request.query.residueId);
      validateGetResiduePointById(residueId);
      const { name, description, image, phone, email } = request.body;

      const result = await service.update(residueId, {
        name,
        description,
        image,
        phone,
        email,
      });
      return response.status(200).json(result);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export default new ResiduePointController();
