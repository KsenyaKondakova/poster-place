import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

export const useAfishaData = () =>
  useSelector((state: RootState) => state.afishaSlice.afishaList);
export const useAfishaLimit = () =>
  useSelector((state: RootState) => state.afishaSlice.limit);
export const useAfishaOffset = () =>
  useSelector((state: RootState) => state.afishaSlice.offset);
export const useAfishaPage = () =>
  useSelector((state: RootState) => state.afishaSlice.page);
export const useAfishaPageQty = () =>
  useSelector((state: RootState) => state.afishaSlice.pageQty);
