import { connection } from "@database/connection";
import { IResidueItem } from "@interfaces/index";

class ResidueItemService {
  async list() {
    const query = `select name from residue_item;`;
    return await connection.query(query)
  }
  
  async getById(id: string) {
    const query = `select name from residue_item where id = ?;`;
    const [residueItem] = await connection.query(query, [id])
    return residueItem
  }
  
  async create(data: IResidueItem) {
    const { id, title, slug } = data

    const findBySlug = `select id from residue_item where slug = ?;`;
    const [residueItem] = await connection.query(findBySlug, [slug]);

    if (residueItem) throw Error('residue item already exists')

    const createQuery = `
        insert into residue_item (id, title, slug) values (?, ?);
    `;

    await connection.query(createQuery, [id, title, slug]);
    return { message: `${slug} created` }
  }
  
  async update(id: string, data: IResidueItem) {
    const { title, slug } = data

    const findBySlug = `select id from residue_item where id = ?;`;
    const [residueItem] = await connection.query(findBySlug, [id]);

    if (!residueItem) throw Error('residue item not found')

    const updateQuery = `
        update from residue_item set title = ?, slug = ? where id = ?;
    `;

    await connection.query(updateQuery, [title, slug]);
    return { message: `${slug} updated` }
  }
  
  async delete(id: string) {
    const query = `delete from residue_item where id = ?`
    await connection.query(query, [id])
    return { message: `${id} deleted` }
  }
  
}

export default new ResidueItemService()