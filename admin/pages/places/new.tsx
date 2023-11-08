import Layout from '@/components/Layout';
import React from 'react';
import { useForm } from 'react-hook-form';
import { json } from 'stream/consumers';

interface NewPlaceForm {
  placeName: string;
}
function NewPlace() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPlaceForm>();
  const onSubmit = (data: NewPlaceForm) => {
    console.log(JSON.stringify(data));
  };
  return (
    <Layout>
      <h1 className="text-2xl mb-4">Новое зведение</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl flex flex-col gap-y-2">
        <label className="label-form">Название заведения</label>
        <input className="form-input" {...register('placeName', { required: true })} />
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
        <input className="submit-btn" type="submit" value="Отправить" />
      </form>
    </Layout>
  );
}

export default NewPlace;
