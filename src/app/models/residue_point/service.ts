import { connection } from "@database/connection";
import { IResiduePoint } from "@interfaces/index";

class ResiduePointService {
  async listAll() {
    const query = `
      select name, description, image, phone, email from residue_point;
    `;
    const [residuePoints] = await connection.query(query);
    return residuePoints;
  }

  async getById(id: string) {
    const query = `
      select name, description, image, phone, email 
      from residue_point where id = ?;
    `;
    const [residuePoint] = await connection.query(query, [id]);
    return residuePoint;
  }

  async getByResidueItem(id: string) {
    const query = `
      select a.name, a.description, a.image, a.phone, a.email 
      from residue_point as a inner join residue_item b on 
      a.id = b.id where b.id = ?;
    `;
    const [residuePoint] = await connection.query(query, [id]);
    return residuePoint;
  }

  async create(data: IResiduePoint) {
    const { id, name, email, image, phone, description } = data;
    const findByEmailQuery = `select id from residue_point where email = ?;`;

    const [findByEmailResponse] = await connection.query(findByEmailQuery, [
      data.email,
    ]);

    if (findByEmailResponse) throw Error("residue point already exists");

    const createQuery = `
      insert into residue_point (id, name, email, image, phone, description) values (?, ?, ?, ?, ?, ?);
    `;

    await connection.query(createQuery, [
      id,
      name,
      email,
      image,
      phone,
      description,
    ]);

    return { message: `residue point successfully created` }
  }
  
  async delete(id: string) {
    const deleteResidueItemQuery = `delete from residue_item where residue_point_id = ?;`;
    const deleteResiduePointQuery = `delete from residue_point where id = ?;`;

    await connection.query(deleteResidueItemQuery, [id]);
    await connection.query(deleteResiduePointQuery, [id]);

    return { message: `${id} deleted` };
  }

  async update(id: string, data: IResiduePoint) {
    const { name, email, image, phone, description } = data;
    const findByIdQuery = `select id from residue_point where id = ?;`;

    const [findByIdResponse] = await connection.query(findByIdQuery, [
      id,
    ]);

    if (!findByIdResponse) throw Error("Residue Point not found");
    const updateQuery = `
      update residue_point set name = ?, 
      email = ?, image = ?, phone = ?, 
      description = ? where id = ?;
    `;

    await connection.query(updateQuery, [
      name,
      email,
      image,
      phone,
      description,
      id
    ]);

    return { message: `${id} updated` }
  }
}

export default new ResiduePointService();
