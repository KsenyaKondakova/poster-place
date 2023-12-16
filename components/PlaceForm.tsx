import React, { useEffect, useState, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import { IPlaceList, NewPlaceForm, NewsList } from '@/types/placesType';
import { link } from 'fs';
import Spinner from './Spinner';
import { ReactSortable } from 'react-sortablejs';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '@/redux/slices/categorySlice';
import { RootState } from '@/redux/store';
import {
  addNews,
  removeNews,
  setPlaceInfo,
  updateNewsName,
  updateNewsText,
} from '@/redux/slices/placeSlice';
interface IUploadImagesEvent extends ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

function PlaceForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  images: existingImages,
  category: existigCategory,
  news: existingNews,
}: IPlaceList) {
  const dispatch = useDispatch();
  const router: NextRouter = useRouter();
  const placeInfo = useSelector((state: RootState) => state.placeSlice.placeInfo);
  const categories = useSelector((state: RootState) => state.categorySlice.categoryList);
  const [goToPlaces, setGoToPlaces] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>(existingImages || ([] as string[]));
  const [isUplouding, setIsUploading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPlaceForm>();

  const onSubmit = async (data: NewPlaceForm) => {
    if (_id) {
      await axios.put('/api/places', { ...data, images, news: placeInfo.news, _id });
    } else {
      await axios.post('/api/places', { ...data, images, news: placeInfo.news });
    }
    setGoToPlaces(true);
    setImages([]);
    dispatch(setPlaceInfo({ _id: null, title: '', description: '', category: '', news: [] }));
  };
  if (goToPlaces) {
    router.push('/places');
  }
  console.log(images);
  const uploadImages = async (ev: IUploadImagesEvent) => {
    const files = ev.target?.files;
    if (files && files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.put('/api/upload', data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  };
  const updateImagesOrder = (images: string[]) => {
    setImages(images);
  };
  const handleAddNews = () => {
    dispatch(addNews());
  };
  const handleUpdateNewsName = (index: number, newsItem: NewsList, newName: string) => {
    dispatch(updateNewsName({ index, newsItem, newName }));
  };
  const handleUpdateNewsText = (index: number, newsItem: NewsList, newText: string) => {
    dispatch(updateNewsText({ index, newsItem, newText }));
  };
  const handleRemoveNews = (index: number) => {
    dispatch(removeNews({ index }));
  };
  useEffect(() => {
    axios.get('/api/categories').then((res) => {
      dispatch(setCategories(res.data));
    });
  }, []);
  useEffect(() => {
    console.log(placeInfo);
  }, [placeInfo]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="text-form flex flex-col gap-y-2 bg-nav-gray p-6 rounded-3xl">
          <label className="label-form" htmlFor="placename">
            Название заведения
          </label>
          <input
            className="form-input"
            {...register('placeName', { required: true })}
            defaultValue={existingTitle || ''}
            id="placename"
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
          <label className="label-form" htmlFor="category">
            Категория
          </label>
          <select
            className="select-form"
            {...register('category', { required: true })}
            id="category"
            defaultValue={existigCategory}>
            <option value="">Нет категории</option>
            {categories.map(
              (category) =>
                category.parent != null && (
                  <option key={category._id} value={category._id || ''}>
                    {category.name}
                  </option>
                ),
            )}
          </select>
          {errors?.category?.type === 'required' && (
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
          <label className="label-form" htmlFor="descriptionplace">
            Описание заведения
          </label>
          <textarea
            className="form-input"
            {...register('descriptionPlace', { required: true })}
            cols={10}
            rows={8}
            defaultValue={existingDescription || ''}
            id="descriptionplace"
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
        </div>
        <div className="image-form flex gap-y-2 flex-col bg-nav-gray p-6 rounded-3xl">
          <label className="label-form">Фото</label>
          <div className="mb-4 flex flex-wrap gap-2">
            <ReactSortable
              list={images.map((link, index) => ({ id: index.toString(), link }))}
              setList={(newState) => updateImagesOrder(newState.map((item) => item.link))}
              className="flex flex-wrap gap-2">
              {!!images?.length &&
                images.map((link) => (
                  <div
                    key={link}
                    className="h-28 w-28 overflow-hidden flex items-center justify-center">
                    <img src={link} className="min-h-full min-w-full shrink-0" />
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
                className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Добавить фото</span>
              <input type="file" className="hidden" onChange={uploadImages} />
            </label>
          </div>
        </div>
        <div className="news-form flex gap-y-2 flex-col bg-amber-100 ">
          {placeInfo.news.length > 0 &&
            placeInfo.news.map((newsItem, index) => (
              <div key={index} className="bg-nav-gray p-6 rounded-3xl relative">
                <button
                  className="absolute top-3 right-4"
                  type="button"
                  onClick={() => handleRemoveNews(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#ff6a6a"
                    className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <label className="label-form" htmlFor="newsName">
                  Название новости
                </label>
                <input
                  className="form-input"
                  id="newsName"
                  value={newsItem.newsName}
                  onChange={(ev) => handleUpdateNewsName(index, newsItem, ev.target.value)}
                />
                <label className="label-form" htmlFor="newsText">
                  Текст новости
                </label>
                <textarea
                  className="form-input"
                  cols={10}
                  rows={8}
                  id="newsText"
                  value={newsItem.newsText}
                  onChange={(ev) => handleUpdateNewsText(index, newsItem, ev.target.value)}
                />
              </div>
            ))}
          <div className="bg-nav-gray p-6 rounded-3xl">
            <button className="edit__buttons" type="button" onClick={handleAddNews}>
              Добавить новость
            </button>
          </div>
        </div>
        <div className="afisha-form flex gap-y-2 flex-col bg-nav-gray p-6 rounded-3xl"></div>
        <div className="button-form flex justify-center items-center">
          <input className="submit-btn" type="submit" value="Отправить" />
        </div>
      </form>
    </>
  );
}

export default PlaceForm;
