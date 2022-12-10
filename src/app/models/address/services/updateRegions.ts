import { connection } from "@database/connection";
import { IStatusResponse } from "@shared/interfaces";
import { IRegionsIds } from "../dto";

class UpdateRegionsAddressService {
  async execute(
    addresId: string,
    zoneId: string,
    data: IRegionsIds
  ): Promise<IStatusResponse> {
    const regionsParameters = [zoneId, addresId];

    const selectByIdSQL = `
      select * from tbl_zone_addrs 
      where zone_id = ? and addrs_id = ?;
    `;

    const [addrsResponse] = await connection.query(
      selectByIdSQL,
      regionsParameters
    );
    if (!addrsResponse) throw Error("Address not found");

    const parametersBody = [
      data.mesoregion_id || addrsResponse.mesoregion_id,
      data.microregion_id || addrsResponse.microregion_id,
    ];

    const updateAddrsSQL = `
      update tbl_zone_addrs set mesoregion_id = ?, 
      microregion_id = ? where zone_id = ? and addrs_id = ?;
    `;

    await connection.query(updateAddrsSQL, [
      ...parametersBody,
      ...regionsParameters,
    ]);

    return { status: "updated" };
  }
}

export default new UpdateRegionsAddressService();
