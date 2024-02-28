export interface IPlaceList {
  _id: number | null;
  title: string;
  description: string;
  images?: string[];
  category: string;
  news: NewsList[];
  afisha?: string[];
  dateImages?: string;
  logo?: string[];
}

export interface IPlaceState {
  placeList: IPlaceList[];
  placeInfo: IPlaceList;

  limit: number;
  offset: number;
  page: number;
  pageQty: number;
}
export interface ICategorList {
  _id: number | string | null;
  name: string;
  parent: ICategorList | string | null;
}
export interface ICategoryState {
  categoryList: ICategorList[];
  parentCategory: ICategorList | string | null;
  editedCategory: ICategorList | null | string;
  rootCategories: ICategorList[];
  limit: number;
  offset: number;
  page: number;
  pageQty: number;
}
export interface NewsList {
  _id: number | string | null;
  newsName: string;
  newsText: string;
  date: string;
}
export interface NewPlaceForm {
  placeName: string;
  descriptionPlace: string;
  images: string[];
  category: string;
  news: NewsList[];
  dateImages: string;
  logo: string[];
}
export interface NewCategoryForm {
  categoryName: string;
}

export interface INewsState {
  newsList: NewsList[];
  newsInfo: NewsList;
  limit: number;
  offset: number;
  page: number;
  pageQty: number;
  sortType: number;
}
export interface NewNewsForm {
  newsName: string;
  newsText: string;
}
export interface AfishaList {
  _id: number | string | null;
  image: string;
}
export interface IAfishaState {
  afishaList: AfishaList[];
  afishaInfo: AfishaList;
  limit: number;
  offset: number;
  page: number;
  pageQty: number;
}
export interface NewAfishaForm {
  image: string;
}
export interface StarList {
  _id: number | null;
  name: string;
  secondName: string;
  description: string;
  subdescription: string;
  images?: string[];
  orderStar: string;
}
export interface IStarState {
  starList: StarList[];
  starInfo: StarList;
  limit: number;
  offset: number;
  page: number;
  pageQty: number;
}

export interface ISaleList {
  _id: number | string | null;
  amount: number;
  date: string;
}
export interface ISaleState {
  saleList: ISaleList[];
  editedSale: ISaleList | string | null;
  amount: number | null;
  date: string | number | null;
  limit: number;
  offset: number;
  page: number;
  pageQty: number;
}
export interface NewSaleForm {
  amountForm: number;
  dateForm: string;
}
