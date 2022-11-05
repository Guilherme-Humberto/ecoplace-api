import { formatedCollectionsDetails } from "@app/utils";
import { connection } from "@database/connection";
import { ICollectionCenter } from "@interfaces/index";

class CollectionCenterService {
  async listAll() {
    const query = `select name, description, image, phone, email from tbl_collection_center;`;
    return await connection.query(query);
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
    let idArray: string[] | string = []
    let conditional = ";"

    if (item_id && Array.isArray(item_id)) {
      idArray = item_id.map(id => `"${id}"`).join(',')
    }

    if (idArray.length >= 1) {
      conditional = `and item_id in (${idArray})`
    }

    const queryCollectionCenter = `
      select * from vw_collection_center_details
      where mesoregion_id = ? and microregion_id = ?${conditional}
    `;

    const queryCollectionAddrs = `
      select * from vw_collection_addrs
      where mesoregion_id = ? and microregion_id = ?;
    `

    const collectionsCenter = await connection.query(
      queryCollectionCenter, [mesoregion_id, microregion_id]
    );

    if (!collectionsCenter || collectionsCenter.length == 0) return []

    const collectionCenterIds = collectionsCenter
      .map((item: { id: string }) => `'${item.id}'`)
      .join(",");

    const queryCollectionItem = `
      select * from vw_collection_item_details
      where collection_center_id in (${collectionCenterIds});
    `

    const collectionsAddrs = await connection.query(
      queryCollectionAddrs, [mesoregion_id, microregion_id]
    );

    const collectionsItems = await connection.query(queryCollectionItem);

    return formatedCollectionsDetails({
      collectionsAddrs,
      collectionsCenter,
      collectionsItems,
    });
  }

  async create(data: ICollectionCenter) {
    const { id, name, email, image, phone, description } = data;
    const findByEmailQuery = `select id from tbl_collection_center where email = ?;`;

    const [findByEmailResponse] = await connection.query(findByEmailQuery, [
      data.email,
    ]);

    if (findByEmailResponse) throw Error("collection center already exists");

    const createQuery = `
      insert into tbl_collection_center 
      (id, name, email, image, phone, description)
      values (?, ?, ?, ?, ?, ?);
    `;

    await connection.query(createQuery, [
      id,
      name,
      email,
      image,
      phone,
      description,
    ]);

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
