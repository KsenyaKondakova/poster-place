export interface IPlaceList {
  _id: number;
  placeName: string;
  descriptionPlace: string;
}

export interface IPlaceState {
  placeList: IPlaceList[];
}
