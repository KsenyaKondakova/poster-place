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
export const useSalesData = () =>
  useSelector((state: RootState) => state.saleSlice.saleList);
export const useSalesAmount = () =>
  useSelector((state: RootState) => state.saleSlice.amount);
export const useSalesDate = () =>
  useSelector((state: RootState) => state.saleSlice.date);
export const useSalesEdited = () =>
  useSelector((state: RootState) => state.saleSlice.editedSale);
export const useSalesLimit = () =>
  useSelector((state: RootState) => state.saleSlice.limit);
export const useSalesOffset = () =>
  useSelector((state: RootState) => state.saleSlice.offset);
export const useSalesPage = () =>
  useSelector((state: RootState) => state.saleSlice.page);
export const useSalesPageQty = () =>
  useSelector((state: RootState) => state.saleSlice.pageQty);
