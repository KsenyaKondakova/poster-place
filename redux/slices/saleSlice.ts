import { ISaleList, ISaleState } from '@/types/placesType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ISaleState = {
  saleList: [],
  editedSale: null,
  amount: null,
  date: '',
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
  },
});

export const { setSales, setEditedSale, setAmount, setDate } = saleSlice.actions;

export default saleSlice.reducer;
