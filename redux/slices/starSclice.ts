import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IStarState, StarList } from '@/types/placesType';

const initialState: IStarState = {
  starList: [],
  starInfo: {
    _id: null,
    name: '',
    secondName: '',
    description: '',
    subdescription: '',
    images: [],
    orderStar: '',
  },
  limit: 12,
  offset: 0,
  page: 0,
  pageQty: 0,
};

export const starSlice = createSlice({
  name: 'star',
  initialState,
  reducers: {
    setStars: (state, action: PayloadAction<StarList[]>) => {
      state.starList = action.payload;
    },
    setStarInfo: (state, action: PayloadAction<StarList>) => {
      state.starInfo = action.payload;
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
  setStars,
  setStarInfo,
  setLimit,
  setOffset,
  setPage,
  setPageQty,
} = starSlice.actions;

export default starSlice.reducer;
