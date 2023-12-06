import { ICategorList, ICategoryState } from '@/types/placesType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICategoryState = {
  categoryList: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategorList[]>) => {
      state.categoryList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
