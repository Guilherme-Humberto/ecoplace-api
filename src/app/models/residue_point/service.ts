import { IResiduePoint } from "@interfaces/index";

class ResiduePointService {
  async listAll() {}
  async getByResidueItem(residueId: number) {}
  async getBySearchValue(residuePointName: string) {}
  async create(data: IResiduePoint) {}
  async delete(residueId: number) {}
  async update(residueId: number, data: IResiduePoint) {}
}

export default new ResiduePointService();
