import Layout from '@/components/Layout';
import { setCategories, setEditedCategory, setParentCategory } from '@/redux/slices/categorySlice';
import { RootState } from '@/redux/store';
import { ICategorList, NewCategoryForm } from '@/types/placesType';
import axios from 'axios';
import Swal from 'sweetalert2';
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
  const parentCategory = useSelector((state: RootState) => state.categorySlice.parentCategory);
  const editedCategory = useSelector((state: RootState) => state.categorySlice.editedCategory);
  const [categoryName, setCategoryName] = useState('');

  const fetchCategories = () => {
    axios.get('/api/categories').then((response) => {
      dispatch(setCategories(response.data));
    });
  };
  const saveCategory = async () => {
    const data = { categoryName, parentCategory };
    if (editedCategory) {
      const idEditedCategory = typeof editedCategory === 'object' && editedCategory._id;
      await axios.put('/api/categories', { ...data, _id: idEditedCategory });
      dispatch(setEditedCategory(null));
    } else {
      await axios.post('/api/categories', data);
    }
    setCategoryName('');
    dispatch(setParentCategory(null));
    fetchCategories();
  };

  const editCategory = (category: ICategorList) => {
    dispatch(setEditedCategory(category));
    if (category.parent instanceof Object) {
      dispatch(setParentCategory(category.parent._id as string));
    } else {
      dispatch(setParentCategory(null));
    }
    setCategoryName(category.name);
  };

  const deleteCategory = (category: ICategorList) => {
    Swal.fire({
      title: 'Ты уверен?',
      text: `Удалить категорию ${category.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4ade80',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      confirmButtonText: 'Да, удалить',
      cancelButtonText: 'Отменить',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/categories?_id=${category._id}`);
        fetchCategories();
        Swal.fire('Категория удалена!', '', 'success');
      }
    });
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl text-neutral-800">Категории</h1>
      <form
        onSubmit={handleSubmit(saveCategory)}
        className="text-form flex flex-col gap-y-2 bg-nav-gray p-6 rounded-2xl mt-2">
        <label className="label-form" htmlFor="categoryname">
          {editedCategory && typeof editedCategory === 'object'
            ? `Редактировать категорию ${editedCategory.name}`
            : ' Название новой категории'}
        </label>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-4">
            <input
              className="form-input"
              type="text"
              {...register('categoryName', { required: true })}
              placeholder={'Название категории'}
              id="categoryname"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
            <select
              className="select-form"
              value={
                parentCategory
                  ? typeof parentCategory === 'object'
                    ? (parentCategory._id as string)
                    : (parentCategory as string)
                  : ''
              }
              onChange={(ev) => dispatch(setParentCategory(ev.target.value))}>
              <option value="">Нет родительской категории</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id || ''}>
                    {category.name}
                  </option>
                ))}
            </select>
            <button type="submit" className="button-edit">
              Сохранить
            </button>
          </div>

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
      </form>
      <div className="mt-4 flex flex-col bg-nav-gray rounded-2xl">
        <div className="text-gray-400 pt-4 pb-2 mx-4 flex border-b-2 border-gray-600">
          <span className="basis-1/3">Название категории</span>
          <span className="basis-1/3">Родиительская категория</span>
          <span className="basis-1/3">Редкатировать</span>
        </div>
        <div className="flex flex-col">
          {categories.map((category) => (
            <article className="flex pt-4 pb-2 mx-4 border-b-2 border-gray-600" key={category._id}>
              <span className="basis-1/3 text-orange-50">{category.name}</span>
              <span className="basis-1/3 text-orange-50">
                {category.parent
                  ? typeof category.parent === 'string'
                    ? category.parent // Если parent - это строка, значит, это ObjectId, который не использовался с populate
                    : category.parent.name // Если parent - это объект, содержащий документ категории
                  : 'Нет родительской категории'}
              </span>
              <div className="basis-1/3">
                <button className="edit__buttons" onClick={() => editCategory(category)}>
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
                </button>
                <button className="edit__buttons" onClick={() => deleteCategory(category)}>
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
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
