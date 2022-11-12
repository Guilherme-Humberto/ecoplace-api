import { formatedCollectionsDetails } from "@app/utils";
import { connection } from "@database/connection";
import { ICollectionCenter } from "@interfaces/index";

const resultNotFound = (response: any) => !response || response.length == 0;

const joinIds = (idsArray: string[]) => {
  return idsArray.map((id) => `"${id}"`).join(",");
};

class CollectionCenterService {
  async listAll() {
    const collectionCenterQuery = `select * from vw_collection_center_details;`;
    const collectionAddrsQuery = `select * from vw_collection_addrs;`;
    const queryCollectionItemQuery = `select * from vw_collection_item_details;`;

    const collectionsItems = await connection.query(queryCollectionItemQuery);
    const collectionsCenter = await connection.query(collectionCenterQuery);
    const collectionsAddrs = await connection.query(collectionAddrsQuery);

    return formatedCollectionsDetails({
      collectionsAddrs,
      collectionsCenter,
      collectionsItems,
    });
  }

  async getById(id: string) {
    const query = `
      select name, description, image, phone, email 
      from tbl_collection_center where id = ?;
    `;
    const [collectionCenter] = await connection.query(query, [id]);
    return collectionCenter;
  }

  async getCollectionCenterDetails({
    item_id,
    mesoregion_id,
    microregion_id,
  }: any) {
    const regionParameters = [mesoregion_id, microregion_id];

    let inItemsIds: string[] | string = [];
    let conditional = ";";

    if (item_id && Array.isArray(item_id)) inItemsIds = joinIds(item_id);
    if (inItemsIds.length >= 1) conditional = `and item_id in (${inItemsIds})`;

    const collectionCenterQuery = `
      select * from vw_collection_center_details
      where mesoregion_id = ? and microregion_id = ? ${conditional}
    `;

    const collectionsCenter = await connection.query(
      collectionCenterQuery,
      regionParameters
    );

    if (resultNotFound(collectionsCenter)) return [];

    const collectionAddrsQuery = `
      select * from vw_collection_addrs
      where mesoregion_id = ? and microregion_id = ?;
    `;

    const collectionsAddrs = await connection.query(
      collectionAddrsQuery,
      regionParameters
    );

    if (resultNotFound(collectionsAddrs)) return [];

    const inCollectionIds = joinIds(
      collectionsCenter.map((item: { id: string }) => item.id)
    );

    const queryCollectionItemQuery = `
      select * from vw_collection_item_details
      where collection_center_id in (${inCollectionIds});
    `;

    const collectionsItems = await connection.query(queryCollectionItemQuery);
    if (resultNotFound(collectionsItems)) return [];

    return formatedCollectionsDetails({
      collectionsAddrs,
      collectionsCenter,
      collectionsItems,
    });
  }

  async create({ id, name, email, image, phone, description }: ICollectionCenter) {
    const insertData = [id, name, email, image, phone, description];
    
    const findByEmailQuery = `
      select id from tbl_collection_center where email = ?;
    `;

    const [findByEmailResponse] = await connection.query(
      findByEmailQuery, [email]
    );

    if (findByEmailResponse) throw Error("collection center already exists");

    const createQuery = `
      insert into tbl_collection_center 
      (id, name, email, image, phone, description)
      values (?, ?, ?, ?, ?, ?);
    `;

    await connection.query(createQuery, insertData);

    return { message: `collection center successfully created` };
  }

  async delete(id: string) {
    const query = `delete from tbl_collection_center where id = ?;`;
    await connection.query(query, [id]);

    return { message: `${id} deleted` };
  }

  async update(id: string, data: ICollectionCenter) {
    const { name, email, image, phone, description } = data;
    const findByIdQuery = `select id from tbl_collection_center where id = ?;`;

    const [findByIdResponse] = await connection.query(findByIdQuery, [id]);

    if (!findByIdResponse) throw Error("collection center not found");
    const updateQuery = `
      update tbl_collection_center set name = ?, 
      email = ?, image = ?, phone = ?, 
      description = ? where id = ?;
    `;

    await connection.query(updateQuery, [
      name,
      email,
      image,
      phone,
      description,
      id,
    ]);

    return { message: `${id} updated` };
  }
}

export default new CollectionCenterService();
