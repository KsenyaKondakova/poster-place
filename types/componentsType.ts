import type { AfishaList } from './placesType';

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
