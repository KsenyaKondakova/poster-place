import { IAfishaState } from '@/types/placesType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AfishaList } from '../../types/placesType';
const initialState: IAfishaState = {
  afishaList: [],
  afishaInfo: { _id: null, image: '' },
};
export const afishaSlice = createSlice({
  name: 'afisha',
  initialState,
  reducers: {
    setAfisha: (state, action: PayloadAction<AfishaList[]>) => {
      state.afishaList = action.payload;
    },
    setAfishaInfo: (state, action: PayloadAction<AfishaList>) => {
      state.afishaInfo = action.payload;
    },
    setAfishaImage: (state, action: PayloadAction<string>) => {
      state.afishaInfo.image = action.payload;
    },
  },
});

export const { setAfisha, setAfishaInfo, setAfishaImage } = afishaSlice.actions;
export default afishaSlice.reducer;
