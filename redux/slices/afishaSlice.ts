import { IAfishaState } from '@/types/placesType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AfishaList } from '../../types/placesType';
const initialState: IAfishaState = {
  afishaList: [],
  afishaInfo: { _id: null, image: '' },
  limit: 20,
  offset: 0,
  page: 0,
  pageQty: 0,
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
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageQty: (state, action: PayloadAction<number>) => {
      state.pageQty = action.payload;
    },
  },
});

export const {
  setAfisha,
  setAfishaInfo,
  setAfishaImage,
  setLimit,
  setOffset,
  setPage,
  setPageQty,
} = afishaSlice.actions;
export default afishaSlice.reducer;
