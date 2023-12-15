import { IPlaceList, IPlaceState } from '@/types/placesType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IPlaceState = {
  placeList: [],
  placeInfo: { _id: null, title: '', description: '', category: '' },
};

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setPlaces: (state, action: PayloadAction<IPlaceList[]>) => {
      state.placeList = action.payload;
    },
    setPlaceInfo: (state, action: PayloadAction<IPlaceList>) => {
      state.placeInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlaces, setPlaceInfo } = placeSlice.actions;

export default placeSlice.reducer;
