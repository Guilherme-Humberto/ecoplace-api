export interface IStatusResponse {
  status: "returned" | "created" | "updated" | "deleted";
}

export interface IRegionsIds {
  mesoregion_id: number;
  microregion_id: number;
}
