export interface IContributor {
  name: string;
  email: string;
}

export interface ICollectionCenter {
  id?: string;
  name: string;
  description: string;
  image: string;
  phone: string;
  email: string;
}

export interface ICollectionItem {
  id?: string
  title: string
  slug: string
  image: string
  collectionCenterId: string
}