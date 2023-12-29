import { configureStore } from '@reduxjs/toolkit';
import placeSlice from './slices/placeSlice';
import categorySlice from './slices/categorySlice';
import newsSlice from './slices/newsSlice';
import afishaSlice from './slices/afishaSlice';
import starSclice from './slices/starSclice';

export const store = configureStore({
  reducer: { placeSlice, categorySlice, newsSlice, afishaSlice, starSclice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
