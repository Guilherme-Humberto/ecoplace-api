export interface IContributor {
  name: string;
  email: string;
}

export interface IZone {
  id: string;
  name: string;
  description: string;
  image: string;
  phone: string;
  email: string;
}

export interface ICategory {
  id: string;
  title: string;
  slug: string;
  image: string;
  zone_id?: string;
}

export interface IZoneAddrs {
  id: string;
  addrs_name: string;
  addrs_number: number;
  zip_code: string;
  district: string;
  zone_id?: string;
}

export interface ICreateZoneAddrs {
  id?: string;
  addrs_name: string;
  addrs_number: number;
  zip_code: string;
  district: string;
}

export interface IRegions {
  mesoregion_id: number;
  microregion_id: number;
}

export interface ICreateZoneAddrs {
  mesoregion_id: number;
  microregion_id: number;
  zone_id: string;
  addrs_id: string;
}

export interface ICreateZoneCategories {
  zone_id: string;
  categoryId: string;
}

export interface IFormatZoneDetails {
  zones: IZone[];
  zoneAddrs: IZoneAddrs[];
  zoneCategories: ICategory[];
}
