import { ISaleList, ISaleState } from '@/types/placesType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';

const initialState: ISaleState = {
  saleList: [],
  editedSale: null,
  amount: null,
  date: '',
  limit: 10,
  offset: 0,
  page: 0,
  pageQty: 0,
};

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    setSales: (state, action: PayloadAction<ISaleList[]>) => {
      state.saleList = action.payload;
    },
    setEditedSale: (state, action: PayloadAction<ISaleList | string | null>) => {
      state.editedSale = action.payload;
    },
    setAmount: (state, action: PayloadAction<number | null>) => {
      state.amount = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
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
  setSales,
  setEditedSale,
  setAmount,
  setDate,
  setLimit,
  setOffset,
  setPage,
  setPageQty,
} = saleSlice.actions;

export default saleSlice.reducer;
