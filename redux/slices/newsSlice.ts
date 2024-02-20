import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { INewsState, NewsList } from '@/types/placesType';

const initialState: INewsState = {
  newsList: [],
  newsInfo: { _id: null, newsName: '', newsText: '', date: '' },
  limit: 12,
  offset: 0,
  page: 0,
  pageQty: 0,
  sortType: 1,
};
export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<NewsList[]>) => {
      state.newsList = action.payload;
    },
    setNewsInfo: (state, action: PayloadAction<NewsList>) => {
      state.newsInfo = action.payload;
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
    setSortType: (state, action: PayloadAction<number>) => {
      state.sortType = action.payload;
    },
  },
});

export const {
  setNews,
  setNewsInfo,
  setLimit,
  setOffset,
  setPage,
  setPageQty,
  setSortType,
} = newsSlice.actions;
export default newsSlice.reducer;
