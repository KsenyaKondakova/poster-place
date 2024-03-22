import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  setAfisha,
  setPageQty as setAfishaPageQty,
} from '@/redux/slices/afishaSlice';
import {
  setSales,
  setPageQty as setSalesPageQty,
} from '@/redux/slices/saleSlice';

export const useAfishaDataFetch = (
  limit: number,
  offset: number,
  page: number,
) => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`/api/afisha?limit=${limit}&offset=${offset}`)
      .then((response) => {
        dispatch(setAfisha(response.data.afishas));
        dispatch(setAfishaPageQty(response.data.totalPages));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching afisha: ', error);
      });
  }, [dispatch, limit, offset, page]);
};
export const useSalesDataFetch = (
  limit: number,
  offset: number,
  page: number,
) => {
  const dispatch = useDispatch();
  const fetchSalesData = async () => {
    try {
      const response = await axios.get(
        `/api/sales?limit=${limit}&offset=${offset}`,
      );
      dispatch(setSales(response.data.formatSale));
      dispatch(setSalesPageQty(response.data.totalPages));
    } catch (error) {
      console.error('Error fetching sales: ', error);
    }
  };

  return fetchSalesData;
};
