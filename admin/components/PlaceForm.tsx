import React, { useEffect, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import { IPlaceList, NewPlaceForm } from '@/types/placesType';
import { link } from 'fs';
interface IUploadImagesEvent extends ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

function PlaceForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  images: existingImages,
}: IPlaceList) {
  const router: NextRouter = useRouter();
  const [goToPlaces, setGoToPlaces] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>(existingImages || []);
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
  const uploadImages = async (ev: IUploadImagesEvent) => {
    const files = ev.target?.files;
    if (files && files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.put('/api/upload', data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
  };
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

        <label>Фото</label>
        <div className="mb-4 flex flex-wrap gap-2">
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="h-28">
                <img src={link} className="w-28" />
              </div>
            ))}
          <label className="h-24 w-24 border-2 border-black rounded-2xl flex flex-col justify-center items-center text-center text-sm cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Добавить фото</span>
            <input type="file" className="hidden" onChange={uploadImages} />
          </label>
        </div>
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
