import { configureStore } from '@reduxjs/toolkit';
import placeSlice from './slices/placeSlice';
import categorySlice from './slices/categorySlice';
import newsSlice from './slices/newsSlice';

export const store = configureStore({
  reducer: { placeSlice, categorySlice, newsSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
