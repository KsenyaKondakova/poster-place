export interface IPlaceList {
  _id: number | null;
  title: string;
  description: string;
  images?: string[];
  category: string;
  news: NewsList[];
  afisha?: string[];
}

export interface IPlaceState {
  placeList: IPlaceList[];
  placeInfo: IPlaceList;
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
}
export interface NewsList {
  _id: number | string | null;
  newsName: string;
  newsText: string;
  parent: number | string | null;
}
export interface NewPlaceForm {
  placeName: string;
  descriptionPlace: string;
  images: string[];
  category: string;
  news: NewsList[];
}
export interface NewCategoryForm {
  categoryName: string;
}

export interface INewsState {
  newsList: NewsList[];
  newsInfo: NewsList;
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
}
export interface IStarState {
  starList: StarList[];
  starInfo: StarList;
}
