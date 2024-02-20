import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import mongoose from 'mongoose';

import { IPlaceList, IPlaceState } from '@/types/placesType';

import { NewsList } from '../../types/placesType';

const initialState: IPlaceState = {
  placeList: [],
  placeInfo: {
    _id: null,
    title: '',
    description: '',
    category: '',
    news: [],
    dateImages: '',
  },
  limit: 12,
  offset: 0,
  page: 0,
  pageQty: 0,
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

    addNews: (state) => {
      const newNewsId = new mongoose.Types.ObjectId();

      state.placeInfo.news = [
        ...state.placeInfo.news,
        {
          _id: newNewsId.toString(),
          newsName: '',
          newsText: '',
          date: '',
        },
      ];
    },
    updateNewsName: (
      state,
      action: PayloadAction<{
        index: number;
        newsItem: NewsList;
        newName: string;
      }>,
    ) => {
      const { index, newsItem, newName } = action.payload;
      state.placeInfo.news[index].newsName = newName;
    },
    updateNewsText: (
      state,
      action: PayloadAction<{
        index: number;
        newsItem: NewsList;
        newText: string;
      }>,
    ) => {
      const { index, newsItem, newText } = action.payload;
      state.placeInfo.news[index].newsText = newText;
    },
    updateNewsDate: (
      state,
      action: PayloadAction<{
        index: number;
        newsItem: NewsList;
        newDate: string;
      }>,
    ) => {
      const { index, newsItem, newDate } = action.payload;
      state.placeInfo.news[index].date = newDate;
    },
    removeNews: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.placeInfo.news = state.placeInfo.news.filter(
        (_, indexEl) => index !== indexEl,
      );
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

// Action creators are generated for each case reducer function
export const {
  setPlaces,
  setPlaceInfo,
  addNews,
  updateNewsName,
  updateNewsText,
  updateNewsDate,
  removeNews,
  setLimit,
  setOffset,
  setPage,
  setPageQty,
} = placeSlice.actions;

export default placeSlice.reducer;
