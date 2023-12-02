import { configureStore } from '@reduxjs/toolkit';
import placeSlice from './slices/placeSlice';

export const store = configureStore({
  reducer: { placeSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
