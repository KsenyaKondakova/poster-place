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
  _id: number | string | null;
  name: string;
  parent: ICategorList | string | null;
}
export interface ICategoryState {
  categoryList: ICategorList[];
  parentCategory: ICategorList | string | null;
  editedCategory: ICategorList | null | string;
}
export interface NewPlaceForm {
  placeName: string;
  descriptionPlace: string;
  images: string[];
}
export interface NewCategoryForm {
  categoryName: string;
}
