import { connection } from "@database/connection";
import { ICollectionItem } from "@interfaces/index";

class CollectionItemService {
  async list() {
    const query = `select id, title, slug, image from tbl_collection_item;`;
    return await connection.query(query)
  }
  
  async getById(id: string) {
    const query = `select title, slug from tbl_collection_item where id = ?;`;
    const [collectionItem] = await connection.query(query, [id])
    return collectionItem
  }
  
  async create(data: ICollectionItem) {
    const { id, title, slug, image, collection_center_id } = data

    const findBySlug = `select id from tbl_collection_item where slug = ?;`;
    const [collectionItem] = await connection.query(findBySlug, [slug]);

    if (collectionItem) throw Error('collection item already exists')

    const createQuery = `
        insert into tbl_collection_item (id, title, slug, image, collection_center_id) values (?, ?, ?, ?, ?);
    `;

    await connection.query(createQuery, [
      id,
      title,
      slug,
      image,
      collection_center_id,
    ]);
    
    return { message: `${slug} successfully created` }
  }
  
  async update(id: string, data: ICollectionItem) {
    const { title, slug } = data

    const findBySlug = `select id from tbl_collection_item where id = ?;`;
    const [collectionItem] = await connection.query(findBySlug, [id]);

    if (!collectionItem) throw Error('collection item not found')

    const updateQuery = `
        update tbl_collection_item set title = ?, slug = ? where id = ?;
    `;

    await connection.query(updateQuery, [title, slug, id]);
    return { message: `${slug} updated` }
  }
  
  async delete(id: string) {
    const query = `delete from tbl_collection_item where id = ?`
    await connection.query(query, [id])
    return { message: `${id} deleted` }
  }
  
}

export default new CollectionItemService()