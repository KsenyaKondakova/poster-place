import { IPlaceList, IPlaceState } from '@/types/placesType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { NewsList } from '../../types/placesType';
import mongoose from 'mongoose';

const initialState: IPlaceState = {
  placeList: [],
  placeInfo: { _id: null, title: '', description: '', category: '', news: [] },
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
      const parentId = state.placeInfo._id;

      state.placeInfo.news = [
        ...state.placeInfo.news,
        { _id: newNewsId.toString(), newsName: '', newsText: '', parent: parentId },
      ];
    },
    updateNewsName: (
      state,
      action: PayloadAction<{ index: number; newsItem: NewsList; newName: string }>,
    ) => {
      const { index, newsItem, newName } = action.payload;
      state.placeInfo.news[index].newsName = newName;
    },
    updateNewsText: (
      state,
      action: PayloadAction<{ index: number; newsItem: NewsList; newText: string }>,
    ) => {
      const { index, newsItem, newText } = action.payload;
      state.placeInfo.news[index].newsText = newText;
    },
    removeNews: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.placeInfo.news = state.placeInfo.news.filter((_, indexEl) => index !== indexEl);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlaces, setPlaceInfo, addNews, updateNewsName, updateNewsText, removeNews } =
  placeSlice.actions;

export default placeSlice.reducer;
