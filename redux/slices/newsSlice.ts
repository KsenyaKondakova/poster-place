import { INewsState, NewsList } from '@/types/placesType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
const initialState: INewsState = {
  newsList: [],
  newsInfo: { _id: null, newsName: '', newsText: '', parent: null },
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
  },
});

export const { setNews, setNewsInfo } = newsSlice.actions;
export default newsSlice.reducer;
