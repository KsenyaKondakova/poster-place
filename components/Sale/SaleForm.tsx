import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import AlertIcon from '@/assets/icons/AlertIcon';

import { setAmount, setDate } from '@/redux/slices/saleSlice';

import { salesFormProps } from '@/types/componentsType';
import { NewSaleForm } from '@/types/placesType';

import AirDatepickerReact from '../DatePicker';
import { saveSale } from './saveSale';

export const SaleForm: React.FC<salesFormProps> = ({
  date,
  amount,
  editedSale,
  fetchSalesData,
}) => {
  const {
    register,
    formState: { errors },
  } = useForm<NewSaleForm>();
  const dispatch = useDispatch();

  const handleSetDate = (date: string) => {
    dispatch(setDate(date));
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveSale(date, amount, editedSale, fetchSalesData, dispatch);
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
            {errors?.amountForm?.type === 'required' && (
              <div className="flex gap-1 text-[#bf1650]">
                <AlertIcon />
                <p>Это поле должно быть заполнено</p>
              </div>
            )}
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
  );
};
