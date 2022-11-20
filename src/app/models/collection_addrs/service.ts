import { connection } from "@database/connection";
import { ICreateCollectionAddrs, IRegions } from "@interfaces/index";

class CollectionAddrsService {
  async listAll() {
    const selectAllSQL = `select * from tbl_collection_addrs;`;
    return await connection.query(selectAllSQL);
  }

  async create(data: ICreateCollectionAddrs) {
    const parametersBody = [
      data.id,
      data.addrs_name,
      data.addrs_number,
      data.zip_code,
      data.district,
    ];

    const insertAddrsSQL = `
      insert into tbl_collection_addrs 
      (id, addrs_name, addrs_number, zip_code, district) values (?, ?, ?, ?, ?);
    `;

    await connection.query(insertAddrsSQL, parametersBody);
    return { message: `address created` }

  }

  async update(id: string, data: ICreateCollectionAddrs) {
    const selectByIdSQL = `select * from tbl_collection_addrs where id = ?;`;

    const [addrsResponse] = await connection.query(selectByIdSQL, [id]);
    if (!addrsResponse) throw Error("Addrss not found");

    const parametersBody = [
      data.addrs_name || addrsResponse.addrs_name,
      data.addrs_number || addrsResponse.addrs_number,
      data.zip_code || addrsResponse.zip_code,
      data.district || addrsResponse.district,
    ];

    const updateAddrsSQL = `
      update tbl_collection_addrs set addrs_name = ?, 
      addrs_number = ?, zip_code = ?, district = ? where id = ?;
    `;

    await connection.query(updateAddrsSQL, [...parametersBody, id]);
    return { message: `${id} updated` };
  }

  async updateRegions(collectionAddrsId: string, collectionCenterId: string, data: IRegions) {
    const selectByIdSQL = `
      select * from tbl_collection_center_addrs 
      where collection_center_id = ? and collection_addrs_id = ?;
    `;

    const [addrsResponse] = await connection.query(selectByIdSQL, [
      collectionCenterId,
      collectionAddrsId,
    ]);
    
    if (!addrsResponse) throw Error("Record not found");

    const parametersBody = [
      data.mesoregion_id || addrsResponse.mesoregion_id,
      data.microregion_id || addrsResponse.microregion_id
    ];

    const updateAddrsSQL = `
      update tbl_collection_center_addrs set mesoregion_id = ?, 
      microregion_id = ? where collection_center_id = ? and collection_addrs_id = ?;
    `;

    await connection.query(updateAddrsSQL, [
      ...parametersBody,
      collectionCenterId,
      collectionAddrsId,
    ]);

    return { message: `${collectionAddrsId} - ${collectionCenterId} updated` };
  }
}

export default new CollectionAddrsService();
