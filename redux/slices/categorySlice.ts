import { ICategorList, ICategoryState } from '@/types/placesType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICategoryState = {
  categoryList: [],
  rootCategories: [],
  parentCategory: null,
  editedCategory: null,
  limit: 10,
  offset: 0,
  page: 0,
  pageQty: 0,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategorList[]>) => {
      state.categoryList = action.payload;
    },
    setRootCategories: (state, action: PayloadAction<ICategorList[]>) => {
      state.rootCategories = action.payload;
    },
    setParentCategory: (state, action: PayloadAction<string | null>) => {
      state.parentCategory = action.payload;
    },
    setEditedCategory: (state, action: PayloadAction<ICategorList | string | null>) => {
      state.editedCategory = action.payload;
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

export const {
  setCategories,
  setParentCategory,
  setEditedCategory,
  setLimit,
  setOffset,
  setPage,
  setPageQty,
  setRootCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
