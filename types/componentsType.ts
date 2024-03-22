import { Dispatch } from 'redux';

import type { AfishaList, ISaleList } from './placesType';

type FetchSalesDataFunction = () => Promise<void>;
type DispatchFunction = Dispatch<any>;
export interface afishaItemProps {
  afishaItem: AfishaList;
}
export interface paginationCompProps {
  pageQty: number;
  limit: number;
  // eslint-disable-next-line no-unused-vars
  setOffset: (offset: number) => void;
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number) => void;
  page: number;
}

export interface salesFormProps {
  date: string | number | null;
  amount: number | null;
  editedSale: ISaleList | string | null;
  fetchSalesData: FetchSalesDataFunction;
}

export interface saveSaleFunction {
  (
    // eslint-disable-next-line no-unused-vars
    date: string | number | null,
    // eslint-disable-next-line no-unused-vars
    amount: number | null,
    // eslint-disable-next-line no-unused-vars
    editedSale: string | ISaleList | null,
    // eslint-disable-next-line no-unused-vars
    fetchSalesData: () => void,
    // eslint-disable-next-line no-unused-vars
    dispatch: DispatchFunction,
  ): Promise<void>;
}
export interface saleItemProps {
  sale: ISaleList;
  fetchSalesData: () => void;
}
