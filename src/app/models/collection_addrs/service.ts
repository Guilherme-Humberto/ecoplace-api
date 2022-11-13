import { connection } from "@database/connection";
import { ICreateCollectionAddrs } from "@interfaces/index";

class CollectionAddrsService {
  async listAll() {
    const selectAllSQL = `select * from tbl_collection_addrs;`;
    return await connection.query(selectAllSQL);
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
}

export default new CollectionAddrsService();
