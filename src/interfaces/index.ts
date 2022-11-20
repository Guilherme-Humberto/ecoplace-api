export interface IContributor {
  name: string;
  email: string;
}

export interface ICollectionCenter {
  id: string;
  name: string;
  description: string;
  image: string;
  phone: string;
  email: string;
}

export interface ICollectionItem {
  id: string
  title: string
  slug: string
  image: string
  collection_center_id?: string
}

export interface ICollectionAddrs {
  id: string
  addrs_name: string
  addrs_number: number
  zip_code: string
  district: string
  collection_center_id?: string
}

export interface ICreateCollectionAddrs {
  id?: string
  addrs_name: string
  addrs_number: number
  zip_code: string
  district: string
}

export interface IRegions {
  mesoregion_id: number
  microregion_id: number
}

export interface ICreateCollectionCenterAddrs {
  mesoregion_id: number
  microregion_id: number
  collection_center_id: string
  collection_addrs_id: string
}

export interface ICreateCollectionCenterItems {
  collection_center_id: string
  collection_item_id: string
}

export interface IFormatCollectionDetails {
  collectionsCenter: ICollectionCenter[]
  collectionsItems: ICollectionItem[]
  collectionsAddrs: ICollectionAddrs[]
}