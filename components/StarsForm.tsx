import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactSortable } from 'react-sortablejs';

import { StarList } from '@/types/placesType';

import Spinner from './Spinner';

interface IUploadImagesEvent extends ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

function StarsForm({
  _id,
  name: existingName,
  secondName: existingSecondName,
  description: existingDescription,
  subdescription: existingSubdescription,
  images: existingImages,
}: StarList) {
  const router: NextRouter = useRouter();
  const [goToStars, setGoToStars] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>(
    existingImages || ([] as string[]),
  );
  const [isUplouding, setIsUploading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StarList>();

  const onSubmit = async (data: StarList) => {
    if (_id) {
      await axios.put('/api/stars', { ...data, images, _id });
    } else {
      await axios.post('/api/stars', { ...data, images });
    }
    setGoToStars(true);
    setImages([]);
  };
  if (goToStars) {
    router.push('/stars');
  }

  const uploadImagesOrAfisha = async (
    ev: IUploadImagesEvent,
    setFiles: React.Dispatch<React.SetStateAction<string[]>>,
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
      setFiles((oldFiles) => [...oldFiles, ...res.data.links]);
      setIsUploading(false);
    }
  };

  const uploadImages = (ev: IUploadImagesEvent) => {
    uploadImagesOrAfisha(ev, setImages, setIsUploading);
  };

  const updateImagesOrder = (images: string[]) => {
    setImages(images);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="text-form flex flex-col gap-y-2 bg-nav-gray p-6 rounded-3xl">
          <label className="label-form" htmlFor="name">
            Имя
          </label>
          <input
            className="form-input"
            {...register('name', { required: true })}
            defaultValue={existingName || ''}
            id="name"
          />
          {errors?.name?.type === 'required' && (
            <div className="flex gap-1 text-[#bf1650]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <p>Это поле должно быть заполнено</p>
            </div>
          )}
          <label className="label-form" htmlFor="secondName">
            Фамилия
          </label>
          <input
            className="form-input"
            {...register('secondName', { required: true })}
            defaultValue={existingSecondName || ''}
            id="secondName"
          />
          {errors?.secondName?.type === 'required' && (
            <div className="flex gap-1 text-[#bf1650]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <p>Это поле должно быть заполнено</p>
            </div>
          )}
        </div>
        <div className="image-form flex gap-y-2 flex-col bg-nav-gray p-6 rounded-3xl">
          <label className="label-form">Фото</label>
          <div className="mb-4 flex flex-wrap gap-2">
            <ReactSortable
              list={images.map((link, index) => ({
                id: index.toString(),
                link,
              }))}
              setList={(newState) =>
                updateImagesOrder(newState.map((item) => item.link))
              }
              className="flex flex-wrap gap-2"
            >
              {!!images?.length &&
                images.map((link) => (
                  <div
                    key={link}
                    className="h-36 w-36 overflow-hidden flex items-center justify-center"
                  >
                    <img src={link} className="w-auto h-full" />
                  </div>
                ))}
            </ReactSortable>

            {isUplouding && (
              <div className="h-28 p-1 flex items-center">
                <Spinner />
              </div>
            )}
            <label className="text-gray-300 h-28 w-28 border-2 border-gray-300 rounded-2xl flex flex-col justify-center items-center text-center text-sm cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>Добавить фото</span>
              <input type="file" className="hidden" onChange={uploadImages} />
            </label>
          </div>
        </div>

        <div className="news-form flex gap-y-2 flex-col bg-amber-100 h-full ">
          <label className="text-2xl">Биография</label>

          <div className="bg-nav-gray p-6 rounded-3xl h-full">
            <label className="label-form" htmlFor="description">
              Введите текст
            </label>
            <textarea
              className="form-input"
              {...register('description', { required: true })}
              defaultValue={existingDescription || ''}
              id="description"
              cols={10}
              rows={8}
            />
            {errors?.description?.type === 'required' && (
              <div className="flex gap-1 text-[#bf1650]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                <p>Это поле должно быть заполнено</p>
              </div>
            )}
          </div>
        </div>
        <div className="afisha-form  flex gap-y-2 flex-col bg-amber-100 h-full ">
          <label className="text-2xl">Интервью</label>

          <div className="bg-nav-gray p-6 rounded-3xl h-full">
            <label className="label-form" htmlFor="subdescription">
              Введите текст
            </label>
            <textarea
              className="form-input"
              {...register('subdescription', { required: true })}
              defaultValue={existingSubdescription || ''}
              id="subdescription"
              cols={10}
              rows={8}
            />
            {errors?.subdescription?.type === 'required' && (
              <div className="flex gap-1 text-[#bf1650]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                <p>Это поле должно быть заполнено</p>
              </div>
            )}
          </div>
        </div>
        <div className="button-form flex justify-center items-center">
          <input className="submit-btn" type="submit" value="Отправить" />
        </div>
      </form>
    </>
  );
}

export default StarsForm;
