import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';

import PencilIcon from '@/assets/icons/PencilIcon';
import TrashIcon from '@/assets/icons/TrashIcon';

import { setEditedSale } from '@/redux/slices/saleSlice';

import { saleItemProps } from '@/types/componentsType';
import { ISaleList } from '@/types/placesType';

export const SaleItem: React.FC<saleItemProps> = ({ sale, fetchSalesData }) => {
  const dispatch = useDispatch();
  const editSale = (sale: ISaleList) => {
    dispatch(setEditedSale(sale));
  };

  const deleteSaleFetch = async (sale: number | string | null) => {
    await axios.delete(`/api/sales?_id=${sale}`);
    fetchSalesData();
  };
  return (
    <article
      className="flex pt-3 pb-3 mx-4 border-b-2 border-gray-600 items-center "
      key={sale._id}
    >
      <span className="basis-1/3 text-orange-50 ">{sale.amount}</span>
      <span className="basis-1/3 text-orange-50 text-center sm:text-left">
        {sale.date}
      </span>
      <div className="basis-1/3 flex flex-col sm:flex-row items-end gap-y-2">
        <button className="edit__buttons" onClick={() => editSale(sale)}>
          <PencilIcon />
          <span className="hidden sm:block">Редактировать</span>
        </button>
        <button
          className="edit__buttons"
          onClick={() => deleteSaleFetch(sale._id)}
        >
          <TrashIcon />
          <span className="hidden sm:block">Удалить</span>
        </button>
      </div>
    </article>
  );
};
