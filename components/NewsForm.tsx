import axios from 'axios';
import { setNewsInfo } from '@/redux/slices/newsSlice';
import { NewNewsForm, NewsList } from '@/types/placesType';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

function NewsForm({ _id, newsName: existingNewsName, newsText: existingNewsText }: NewsList) {
  const dispatch = useDispatch();
  const router: NextRouter = useRouter();
  const [goToNews, setGoToNews] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewNewsForm>();

  const onSubmit = async (data: NewNewsForm) => {
    if (_id) {
      await axios.put('/api/news', { ...data, _id });
    } else {
      await axios.post('/api/news', { ...data });
    }
    setGoToNews(true);
    dispatch(setNewsInfo({ _id: null, newsName: '', newsText: '', parent: null }));
  };
  if (goToNews) {
    router.push('/news');
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <div className="text-form flex flex-col gap-y-2 bg-nav-gray p-6 rounded-3xl">
        <label className="label-form" htmlFor="newsName">
          Название новости
        </label>
        <input
          className="form-input"
          id="newsName"
          defaultValue={existingNewsName || ''}
          {...register('newsName', { required: true })}
        />
        {errors?.newsName?.type === 'required' && (
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
        <label className="label-form" htmlFor="newsText">
          Текст новости
        </label>
        <textarea
          className="form-input"
          cols={10}
          rows={8}
          id="newsText"
          defaultValue={existingNewsText || ''}
          {...register('newsText', { required: true })}
        />
        {errors?.newsText?.type === 'required' && (
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
      <div className="button-form flex justify-center items-center">
        <input className="submit-btn" type="submit" value="Отправить" />
      </div>
    </form>
  );
}

export default NewsForm;
