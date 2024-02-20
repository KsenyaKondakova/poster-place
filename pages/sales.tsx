import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import AlertIcon from '@/assets/icons/AlertIcon';
import PencilIcon from '@/assets/icons/PencilIcon';
import TrashIcon from '@/assets/icons/TrashIcon';

import AirDatepickerReact from '@/components/DatePicker';
import Layout from '@/components/Layout';
import PaginationComp from '@/components/Pagination';

import saleSlice, {
  setAmount,
  setDate,
  setEditedSale,
  setOffset,
  setPage,
  setPageQty,
  setSales,
} from '@/redux/slices/saleSlice';
import { RootState } from '@/redux/store';

import { ISaleList, NewSaleForm } from '@/types/placesType';

function Sales() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewSaleForm>();
  const dispatch = useDispatch();
  const sales = useSelector((state: RootState) => state.saleSlice.saleList);
  const amount = useSelector((state: RootState) => state.saleSlice.amount);
  const date = useSelector((state: RootState) => state.saleSlice.date);
  const editedSale = useSelector(
    (state: RootState) => state.saleSlice.editedSale,
  );
  const limit = useSelector((state: RootState) => state.saleSlice.limit);
  const offset = useSelector((state: RootState) => state.saleSlice.offset);
  const page = useSelector((state: RootState) => state.saleSlice.page);
  const pageQty = useSelector((state: RootState) => state.saleSlice.pageQty);
  const fetchSales = () => {
    axios.get(`/api/sales?limit=${limit}&offset=${offset}`).then((response) => {
      dispatch(setSales(response.data.formatSale));
      dispatch(setPageQty(response.data.totalPages));
    });
  };
  const saveSale = async () => {
    const data = { date, amount };
    if (editedSale) {
      const idEditedSale = typeof editedSale === 'object' && editedSale._id;
      await axios.put('/api/sales', { ...data, _id: idEditedSale });
      dispatch(setEditedSale(null));
    } else {
      await axios.post('/api/sales', data);
    }
    dispatch(setDate(''));
    dispatch(setAmount(null));
    fetchSales();
  };
  const editSale = (sale: ISaleList) => {
    dispatch(setEditedSale(sale));
  };
  const handleSetDate = (date: string) => {
    dispatch(setDate(date));
  };
  const deleteSaleFetch = async (sale: number | string | null) => {
    await axios.delete(`/api/sales?_id=${sale}`);
    fetchSales();
  };
  useEffect(() => {
    if (editedSale && typeof editedSale === 'object') {
      dispatch(setDate(editedSale.date));
      dispatch(setAmount(editedSale.amount));
    }
  }, [editedSale]);
  useEffect(() => {
    fetchSales();
  }, [page]);

  return (
    <Layout>
      <h1 className="text-2xl text-neutral-800">Продажи</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveSale();
        }}
        className="text-form flex flex-col gap-y-2 bg-nav-gray p-6 rounded-2xl mt-2"
      >
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-4 items-end">
            <div className="flex flex-col flex-1 gap-y-2">
              <label className="label-form" htmlFor="amountForm">
                {editedSale && typeof editedSale === 'object'
                  ? `Редактировать продажу ${editedSale.amount}`
                  : ' Сумма новой продажи'}
              </label>
              <input
                className="form-input"
                type="number"
                {...register('amountForm', { required: true })}
                placeholder={'Введите сумму продажи'}
                id="amountForm"
                value={String(amount)}
                onChange={(ev) => dispatch(setAmount(Number(ev.target.value)))}
              />
            </div>
            <div className="flex flex-col flex-1 gap-y-2">
              <label className="label-form" htmlFor="dateForm">
                {editedSale && typeof editedSale === 'object'
                  ? `Редактировать дату ${editedSale.date}`
                  : 'Дата новой продажи'}
              </label>
              <AirDatepickerReact
                className="form-input"
                type="text"
                {...register('dateForm', { required: true })}
                placeholder="Выберите дату"
                id="dateForm"
                valueDate={String(date)}
                setDate={handleSetDate}
              />
            </div>

            <button type="submit" className="button-edit w-full sm:w-fit h-fit">
              Сохранить
            </button>
          </div>
        </div>
      </form>
      <div className="mt-4 flex flex-col bg-nav-gray rounded-2xl">
        <div className="text-gray-400 pt-4 pb-2 mx-4 flex border-b-2 border-gray-600">
          <span className="basis-1/3">Сумма продажи</span>
          <span className="basis-1/3">Дата продажи</span>
          <span className="basis-1/3">Инструменты</span>
        </div>
        <div className="flex flex-col">
          {sales.map((sale: any) => (
            <article
              className="flex pt-3 pb-3 mx-4 border-b-2 border-gray-600 items-center "
              key={sale._id}
            >
              <span className="basis-1/3 text-orange-50 ">{sale.amount}</span>
              <span className="basis-1/3 text-orange-50 text-center sm:text-left">
                {sale.date}
              </span>
              <div className="basis-1/3 flex flex-col sm:flex-row items-end gap-y-2">
                <button
                  className="edit__buttons"
                  onClick={() => editSale(sale)}
                >
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
          ))}
        </div>
      </div>
      <PaginationComp
        pageQty={pageQty}
        limit={limit}
        setOffset={setOffset}
        setPage={setPage}
        page={page}
      />
    </Layout>
  );
}

export default Sales;
