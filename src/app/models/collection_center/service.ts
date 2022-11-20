import { formatedCollectionsDetails } from "@app/utils";
import { connection } from "@database/connection";
import { ICollectionCenter, ICreateCollectionCenterAddrs, ICreateCollectionCenterItems } from "@interfaces/index";

const resultNotFound = (response: any) => !response || response.length == 0;

const joinIds = (idsArray: string[]) => {
  return idsArray.map((id) => `"${id}"`).join(",");
};

class CollectionCenterService {
  async listAll() {
    const selectCollectionCenterSQL = `select * from vw_collection_center_details;`;
    const selectCollectionAddrsSQL = `select * from vw_collection_addrs;`;
    const selectCollectionItemSQL = `select * from vw_collection_item_details;`;

    const collectionsItems = await connection.query(selectCollectionItemSQL);
    const collectionsCenter = await connection.query(selectCollectionCenterSQL);
    const collectionsAddrs = await connection.query(selectCollectionAddrsSQL);

    return formatedCollectionsDetails({
      collectionsAddrs,
      collectionsCenter,
      collectionsItems,
    });
  }

  async getById(id: string) {
    const selectByIdSQL = `
      select name, description, image, phone, email 
      from tbl_collection_center where id = ?;
    `;
    const [collectionCenter] = await connection.query(selectByIdSQL, [id]);
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

    const selectCollectionCenterSQL = `
      select * from vw_collection_center_details
      where mesoregion_id = ? and microregion_id = ? ${conditional}
    `;

    const collectionsCenter = await connection.query(
      selectCollectionCenterSQL,
      regionParameters
    );

    if (resultNotFound(collectionsCenter)) return [];

    const selectCollectionAddrsSQL = `
      select * from vw_collection_addrs
      where mesoregion_id = ? and microregion_id = ?;
    `;

    const collectionsAddrs = await connection.query(
      selectCollectionAddrsSQL,
      regionParameters
    );

    if (resultNotFound(collectionsAddrs)) return [];

    const inCollectionIds = joinIds(
      collectionsCenter.map((item: { id: string }) => item.id)
    );

    const selectCollectionItemSQL = `
      select * from vw_collection_item_details
      where collection_center_id in (${inCollectionIds});
    `;

    const collectionsItems = await connection.query(selectCollectionItemSQL);
    if (resultNotFound(collectionsItems)) return [];

    return formatedCollectionsDetails({
      collectionsAddrs,
      collectionsCenter,
      collectionsItems,
    });
  }

  async create(data: ICollectionCenter) {
    const parametersBody = [
      data.id,
      data.name,
      data.email,
      data.image,
      data.phone,
      data.description,
    ];
    
    const selectByEmailSQL = `
      select id from tbl_collection_center where email = ?;
    `;

    const [findByEmailResponse] = await connection.query(
      selectByEmailSQL, [data.email]
    );

    if (findByEmailResponse) throw Error("collection center already exists");

    const insertCollectionCenterSQL = `
      insert into tbl_collection_center 
      (id, name, email, image, phone, description)
      values (?, ?, ?, ?, ?, ?);
    `;

    await connection.query(insertCollectionCenterSQL, parametersBody);
    const [collectionCreated] =  await connection.query(
      selectByEmailSQL, [data.email]
    )

    return collectionCreated
  }

  async createCenterAddrss(data: ICreateCollectionCenterAddrs) {
    const parametersBody = [
      data.mesoregion_id,
      data.microregion_id,
      data.collection_addrs_id,
      data.collection_center_id
    ];
    
    const insertCenterAddrsSQL = `
      insert into tbl_collection_center_addrs 
      (mesoregion_id, microregion_id, collection_addrs_id, collection_center_id) values (?, ?, ?, ?);
    `;

    await connection.query(insertCenterAddrsSQL, parametersBody);
    return { message: `${data.collection_addrs_id} - ${data.collection_center_id} created` }
  }

  async createCollectionCenterItems(data: ICreateCollectionCenterItems) {
    const parametersBody = [
      data.collection_center_id,
      data.collection_item_id
    ];
    
    const insertCenterItemSQL = `
      insert into tbl_collection_center_item
      (collection_center_id, collection_item_id) values (?, ?);
    `;

    await connection.query(insertCenterItemSQL, parametersBody);
    return { message: `${data.collection_center_id} - ${data.collection_item_id} created` }
  }

  async delete(id: string) {
    const deleteSQL = `delete from tbl_collection_center where id = ?;`;
    await connection.query(deleteSQL, [id]);

    return { message: `${id} deleted` };
  }

  async update(id: string, data: ICollectionCenter) {
    const selectByIdSQL = `select id from tbl_collection_center where id = ?;`;
    const [findByIdResponse] = await connection.query(selectByIdSQL, [id]);
    if (!findByIdResponse) throw Error("collection center not found");
    
    const updateSQL = `
      update tbl_collection_center set name = ?, 
      email = ?, image = ?, phone = ?, 
      description = ? where id = ?;
    `;

    const parametersBody = [
      data.name || findByIdResponse.name,
      data.email || findByIdResponse.email,
      data.image || findByIdResponse.image,
      data.phone || findByIdResponse.phone,
      data.description || findByIdResponse.description
    ]

    await connection.query(updateSQL, [...parametersBody, id]);
    return { message: `${id} updated` };
  }

  async updateCollectionItems(id: string, data: string[]) {
    const deleItems = data.map(async (itemId: string) => {
      const deleteQuery = `
        delete from tbl_collection_center_item 
        where collection_center_id = ? and collection_item_id = ?
      `
      return await connection.query(deleteQuery, [id, itemId]);
    })
    
    const insertItems = data.map(async (itemId: string) => {
      const insertQuery = `
        insert into tbl_collection_center_item 
        (collection_center_id, collection_item_id) values (?, ?)
      `
      return await connection.query(insertQuery, [id, itemId]);
    })
    
    await Promise.all(deleItems)
    return await Promise.all(insertItems)
  }

  async removeCollectionItems(id: string, data: string[]) {
    const removeItems = data.map(async (itemId: string) => {
      const insertQuery = `
        delete from tbl_collection_center_item 
        where collection_center_id = ? and collection_item_id = ?
      `;
      return await connection.query(insertQuery, [id, itemId]);
    });

    return await Promise.all(removeItems);
  }
}

export default new CollectionCenterService();
