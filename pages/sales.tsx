import { useSalesDataFetch } from '@/hooks/useDataFetching';
import {
  useSalesAmount,
  useSalesData,
  useSalesDate,
  useSalesEdited,
  useSalesLimit,
  useSalesOffset,
  useSalesPage,
  useSalesPageQty,
} from '@/hooks/useReduxSelectors';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import PencilIcon from '@/assets/icons/PencilIcon';
import TrashIcon from '@/assets/icons/TrashIcon';

import AirDatepickerReact from '@/components/DatePicker';
import Layout from '@/components/Layout';
import PaginationComp from '@/components/Pagination';
import { SaleForm } from '@/components/Sale/SaleForm';
import { SaleItem } from '@/components/Sale/SaleItem';

import {
  setAmount,
  setDate,
  setEditedSale,
  setOffset,
  setPage,
  setPageQty,
  setSales,
} from '@/redux/slices/saleSlice';

import { ISaleList, NewSaleForm } from '@/types/placesType';

function Sales() {
  const dispatch = useDispatch();
  const sales = useSalesData();
  const amount = useSalesAmount();
  const date = useSalesDate();
  const editedSale = useSalesEdited();
  const limit = useSalesLimit();
  const offset = useSalesOffset();
  const page = useSalesPage();
  const pageQty = useSalesPageQty();
  const fetchSalesData = useSalesDataFetch(limit, offset, page);

  useEffect(() => {
    if (editedSale && typeof editedSale === 'object') {
      dispatch(setDate(editedSale.date));
      dispatch(setAmount(editedSale.amount));
    }
  }, [editedSale]);
  useEffect(() => {
    fetchSalesData();
  }, [limit, offset, page]);

  return (
    <Layout>
      <h1 className="text-2xl text-neutral-800">Продажи</h1>
      <SaleForm
        date={date}
        amount={amount}
        editedSale={editedSale}
        fetchSalesData={fetchSalesData}
      />
      <div className="mt-4 flex flex-col bg-nav-gray rounded-2xl">
        <div className="text-gray-400 pt-4 pb-2 mx-4 flex border-b-2 border-gray-600">
          <span className="basis-1/3">Сумма продажи</span>
          <span className="basis-1/3">Дата продажи</span>
          <span className="basis-1/3">Инструменты</span>
        </div>
        <div className="flex flex-col">
          {sales.map((sale) => (
            <SaleItem
              key={sale._id}
              sale={sale}
              fetchSalesData={fetchSalesData}
            />
          ))}
        </div>
      </div>
      <PaginationComp
        pageQty={pageQty}
        limit={limit}
        setOffset={(offset: number) => dispatch(setOffset(offset))}
        setPage={(page: number) => dispatch(setPage(page))}
        page={page}
      />
    </Layout>
  );
}

export default Sales;
