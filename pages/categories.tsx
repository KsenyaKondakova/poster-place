import Layout from '@/components/Layout';
import { setCategories } from '@/redux/slices/categorySlice';
import { RootState } from '@/redux/store';
import { NewCategoryForm } from '@/types/placesType';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function Categories() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewCategoryForm>();
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categorySlice.categoryList);
  const [categoryName, setCategoryName] = useState('');

  const saveCategory = async () => {
    await axios.post('/api/categories', { categoryName });
    setCategoryName('');
  };

  useEffect(() => {
    axios.get('/api/categories').then((response) => {
      dispatch(setCategories(response.data));
    });
  }, []);
  return (
    <Layout>
      <h1 className="text-2xl text-neutral-800 mb-4">Категории</h1>
      <form
        onSubmit={handleSubmit(saveCategory)}
        className="text-form flex flex-col gap-y-2 bg-nav-gray p-6 rounded-3xl">
        <label className="label-form" htmlFor="categoryname">
          Название новой категории
        </label>
        <div className=" flex gap-x-4 items-start">
          <div className="w-full flex flex-col gap-y-2">
            <input
              className="form-input"
              type="text"
              {...register('categoryName', { required: true })}
              placeholder={'Название категории'}
              id="categoryname"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
            {errors?.categoryName?.type === 'required' && (
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
          <button type="submit" className="button-edit">
            Сохранить
          </button>
        </div>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Название заведения</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <Link href={'/categories/edit/' + category._id}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                  <span>Редактировать</span>
                </Link>
                <Link href={'/categories/delete/' + category._id}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>

                  <span>Удалить</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Categories;
