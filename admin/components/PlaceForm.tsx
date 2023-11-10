import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import { IPlaceList, NewPlaceForm } from '@/types/placesType';
function PlaceForm({ _id, title: existingTitle, description: existingDescription }: IPlaceList) {
  const router: NextRouter = useRouter();
  const [goToPlaces, setGoToPlaces] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPlaceForm>();

  const onSubmit = async (data: NewPlaceForm) => {
    if (_id) {
      await axios.put('/api/places', { ...data, _id });
    } else {
      await axios.post('/api/places', data);
    }
    setGoToPlaces(true);
  };
  if (goToPlaces) {
    router.push('/places');
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl flex flex-col gap-y-2">
        <label className="label-form">Название заведения</label>
        <input
          className="form-input"
          {...register('placeName', { required: true })}
          defaultValue={existingTitle || ''}
        />
        {errors?.placeName?.type === 'required' && (
          <div className="flex gap-1 text-[#bf1650]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <p>Это поле должно быть заполнено</p>
          </div>
        )}
        <label className="label-form">Описание заведения</label>

        <textarea
          className="form-input"
          {...register('descriptionPlace', { required: true })}
          cols={10}
          rows={8}
          defaultValue={existingDescription || ''}
        />
        {errors?.descriptionPlace?.type === 'required' && (
          <div className="flex gap-1 text-[#bf1650]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <p>Это поле должно быть заполнено</p>
          </div>
        )}
        <input className="submit-btn" type="submit" value="Отправить" />
      </form>
    </>
  );
}

export default PlaceForm;
