import React, { useEffect, useState, ChangeEvent } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { NextRouter, useRouter } from 'next/router';
import Spinner from './Spinner';
import { setAfisha, setAfishaImage, setAfishaInfo } from '@/redux/slices/afishaSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { AfishaList, NewAfishaForm } from '@/types/placesType';
import { useForm } from 'react-hook-form';

interface IUploadImagesEvent extends ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}
function AfishaForm({ _id, image: existingImage }: AfishaList) {
  const dispatch = useDispatch();
  const afishaInfo = useSelector((state: RootState) => state.afishaSlice.afishaInfo);
  const router: NextRouter = useRouter();
  const [goToAfisha, setGoToAfisha] = useState<boolean>(false);
  const [isUplouding, setIsUploading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewAfishaForm>();
  const uploadImagesOrAfisha = async (
    ev: IUploadImagesEvent,
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const files = ev.target?.files;
    if (files && files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.put('/api/upload', data);
      dispatch(setAfishaImage(res.data.links[0]));
      setIsUploading(false);
    }
  };
  const uploadImages = (ev: IUploadImagesEvent) => {
    uploadImagesOrAfisha(ev, setIsUploading);
  };
  const onSubmit = async () => {
    if (_id) {
      await axios.put('/api/afisha', { afishaInfo, _id });
    } else {
      await axios.post('/api/afisha', { afishaInfo });
    }
    setGoToAfisha(true);

    dispatch(setAfishaInfo({ _id: null, image: '' }));
  };
  if (goToAfisha) {
    router.push('/afisha');
  }
  useEffect(() => {
    console.log(afishaInfo);
  }, [afishaInfo]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <div className="flex flex-col bg-nav-gray p-6 rounded-3xl">
        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          {afishaInfo.image && (
            <div className=" overflow-hidden flex items-center justify-center">
              <img src={afishaInfo.image} className="w-auto h-full" />
            </div>
          )}
          {isUplouding && (
            <div className="h-28 p-1 flex items-center">
              <Spinner />
            </div>
          )}
          {!afishaInfo.image && (
            <label className="text-gray-300 h-28 w-28 border-2 border-gray-300 rounded-2xl flex flex-col justify-center items-center text-center text-sm cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Добавить фото</span>
              <input type="file" className="hidden" onChange={uploadImages} />
            </label>
          )}
        </div>
      </div>
      <div className="button-form flex justify-center items-center">
        <input className="submit-btn" type="submit" value="Отправить" />
      </div>
    </form>
  );
}

export default AfishaForm;
