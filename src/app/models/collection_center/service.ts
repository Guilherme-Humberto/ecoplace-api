import { connection } from "@database/connection";
import { ICollectionCenter } from "@interfaces/index";

class CollectionCenterService {
  async listAll() {
    const query = `select name, description, image, phone, email from collection_center;`;
    return await connection.query(query);
  }

  async getById(id: string) {
    const query = `
      select name, description, image, phone, email 
      from collection_center where id = ?;
    `;
    const [collectionCenter] = await connection.query(query, [id]);
    return collectionCenter;
  }

  async getByCollectionItem(id: string) {
    const query = `
      select a.name, a.description, a.image, a.phone, a.email 
      from collection_center as a inner join collection_item b on 
      a.id = b.id where b.id = ?;
    `;
    const [collectionCenter] = await connection.query(query, [id]);
    return collectionCenter;
  }

  async getByCollectionCenterByIdAddrs(mesoRegionId: number, microRegionId: number) {
    const query = `
      select cd.* from collection_center cd inner join 
      collection_center_addrs cda on cd.id = cda.collection_center_id 
      where cda.mesoregion_id = ? and cda.microregion_id = ?;
    `

    const [collectionCenter] = await connection.query(query, [mesoRegionId, microRegionId])
    return collectionCenter
  }

  async create(data: ICollectionCenter) {
    const { id, name, email, image, phone, description } = data;
    const findByEmailQuery = `select id from collection_center where email = ?;`;

    const [findByEmailResponse] = await connection.query(findByEmailQuery, [
      data.email,
    ]);

    if (findByEmailResponse) throw Error("collection center already exists");

    const createQuery = `
      insert into collection_center (id, name, email, image, phone, description) values (?, ?, ?, ?, ?, ?);
    `;

    await connection.query(createQuery, [
      id,
      name,
      email,
      image,
      phone,
      description,
    ]);

    return { message: `collection center successfully created` }
  }
  
  async delete(id: string) {
    const deleteCollectionItemQuery = `delete from collection_item where collection_center_id = ?;`;
    const deleteCollectionCenterQuery = `delete from collection_center where id = ?;`;

    await connection.query(deleteCollectionItemQuery, [id]);
    await connection.query(deleteCollectionCenterQuery, [id]);

    return { message: `${id} deleted` };
  }

  async update(id: string, data: ICollectionCenter) {
    const { name, email, image, phone, description } = data;
    const findByIdQuery = `select id from collection_center where id = ?;`;

    const [findByIdResponse] = await connection.query(findByIdQuery, [
      id,
    ]);

    if (!findByIdResponse) throw Error("collection center not found");
    const updateQuery = `
      update collection_center set name = ?, 
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

export default new CollectionCenterService();
