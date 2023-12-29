import { IStarState, StarList } from '@/types/placesType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IStarState = {
  starList: [],
  starInfo: {
    _id: null,
    name: '',
    secondName: '',
    description: '',
    subdescription: '',
    images: [],
  },
};

export const starSlice = createSlice({
  name: 'star',
  initialState,
  reducers: {
    setStars: (state, action: PayloadAction<StarList[]>) => {
      state.starList = action.payload;
    },
    setStarInfo: (state, action: PayloadAction<StarList>) => {
      state.starInfo = action.payload;
    },
  },
});

export const { setStars, setStarInfo } = starSlice.actions;

export default starSlice.reducer;
