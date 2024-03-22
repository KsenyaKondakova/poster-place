import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setAfisha, setPageQty } from '@/redux/slices/afishaSlice';

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
        dispatch(setPageQty(response.data.totalPages));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching afisha: ', error);
      });
  }, [dispatch, limit, offset, page]);
};
