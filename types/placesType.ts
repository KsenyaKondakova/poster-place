export interface IPlaceList {
  _id: number | null;
  title: string;
  description: string;
  images?: string[];
}

export interface IPlaceState {
  placeList: IPlaceList[];
  placeInfo: IPlaceList;
}
export interface ICategorList {
  _id: number | null;
  name: string;
}
export interface ICategoryState {
  categoryList: ICategorList[];
}
export interface NewPlaceForm {
  placeName: string;
  descriptionPlace: string;
  images: string[];
}
export interface NewCategoryForm {
  categoryName: string;
}
