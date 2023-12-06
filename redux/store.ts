import { configureStore } from '@reduxjs/toolkit';
import placeSlice from './slices/placeSlice';
import categorySlice from './slices/categorySlice';

export const store = configureStore({
  reducer: { placeSlice, categorySlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
