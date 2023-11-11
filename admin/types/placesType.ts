export interface IPlaceList {
  _id: number | null;
  title: string;
  description: string;
  images: string[];
}

export interface IPlaceState {
  placeList: IPlaceList[];
  placeInfo: IPlaceList;
}
export interface NewPlaceForm {
  placeName: string;
  descriptionPlace: string;
}
