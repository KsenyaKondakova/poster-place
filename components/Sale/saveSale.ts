import axios from 'axios';

import { setAmount, setDate, setEditedSale } from '@/redux/slices/saleSlice';

import { saveSaleFunction } from '@/types/componentsType';

export const saveSale: saveSaleFunction = async (
  date,
  amount,
  editedSale,
  fetchSalesData,
  dispatch,
) => {
  const data = { date, amount };
  if (editedSale) {
    console.log(2);
    await axios.put('/api/sales', { ...data, _id: editedSale });
    dispatch(setEditedSale(null));
  } else {
    await axios.post('/api/sales', data);
    console.log(3);
  }
  dispatch(setDate(''));
  dispatch(setAmount(null));
  fetchSalesData();
};
