import { connection } from "@database/connection";
import { ICollectionItem } from "@interfaces/index";

class CollectionItemService {
  async list() {
    const selectAllSQL = `
      select id, title, slug, image from tbl_collection_item 
      order by created_at desc;`
    ;
    return await connection.query(selectAllSQL)
  }
  
  async getById(id: string) {
    const selectByIdSQL = `select title, slug from tbl_collection_item where id = ?;`;
    const [collectionItem] = await connection.query(selectByIdSQL, [id])
    return collectionItem
  }
  
  async create(data: ICollectionItem) {
    const selectBySlugSQL = `select id from tbl_collection_item where slug = ?;`;
    const [collectionItem] = await connection.query(selectBySlugSQL, [data.slug]);
    if (collectionItem) throw Error('collection item already exists')

    const insertCollectionItemSQL = `
      insert into tbl_collection_item 
      (id, title, slug, image) values (?, ?, ?, ?);
    `;

    const parametersBody = [
      data.id,
      data.title,
      data.slug,
      data.image
    ]

    await connection.query(insertCollectionItemSQL, parametersBody);
    return { message: `${data.slug} successfully created` }
  }
  
  async update(id: string, data: ICollectionItem) {
    const selectByIdSQL = `select id from tbl_collection_item where id = ?;`;
    const [collectionItem] = await connection.query(selectByIdSQL, [id]);
    if (!collectionItem) throw Error('collection item not found')

    const updateSQL = `
      update tbl_collection_item set title = ?, slug = ?, image = ? where id = ?;
    `;

    const parametersBody = [
      data.title || collectionItem.title,
      data.slug || collectionItem.slug,
      data.image || collectionItem.image
    ]

    await connection.query(updateSQL, [...parametersBody, id]);
    return { message: `${data.slug} updated` }
  }
  
  async delete(id: string) {
    const deleteSQL = `delete from tbl_collection_item where id = ?;`;
    await connection.query(deleteSQL, [id])
    return { message: `${id} deleted` }
  }
  
}

export default new CollectionItemService()