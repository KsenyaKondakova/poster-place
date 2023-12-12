import { ICategorList, ICategoryState } from '@/types/placesType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICategoryState = {
  categoryList: [],
  parentCategory: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategorList[]>) => {
      state.categoryList = action.payload;
    },
    setParentCategory: (state, action: PayloadAction<string | null>) => {
      state.parentCategory = action.payload;
    },
  },
});

export const { setCategories, setParentCategory } = categorySlice.actions;

export default categorySlice.reducer;
