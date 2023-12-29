import AlertIcon from '@/assets/icons/AlertIcon';
import PencilIcon from '@/assets/icons/PencilIcon';
import TrashIcon from '@/assets/icons/TrashIcon';
import Layout from '@/components/Layout';
import { setCategories, setEditedCategory, setParentCategory } from '@/redux/slices/categorySlice';
import { RootState } from '@/redux/store';
import { ICategorList, NewCategoryForm } from '@/types/placesType';
import axios from 'axios';
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

  const deleteCategoryFetch = async (category: number | string | null) => {
    await axios.delete(`/api/categories?_id=${category}`);
    fetchCategories();
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
          <div className="flex flex-col sm:flex-row gap-4">
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
            <button type="submit" className="button-edit w-full sm:w-fit">
              Сохранить
            </button>
          </div>

          {errors?.categoryName?.type === 'required' && (
            <div className="flex gap-1 text-[#bf1650]">
              <AlertIcon />
              <p>Это поле должно быть заполнено</p>
            </div>
          )}
        </div>
      </form>
      <div className="mt-4 flex flex-col bg-nav-gray rounded-2xl">
        <div className="text-gray-400 pt-4 pb-2 mx-4 flex border-b-2 border-gray-600">
          <span className="basis-1/3">Название категории</span>
          <span className="basis-1/3">Родительская категория</span>
          <span className="basis-1/3">Инструменты</span>
        </div>
        <div className="flex flex-col">
          {categories.map((category) => (
            <article
              className="flex pt-4 pb-4 mx-4 border-b-2 border-gray-600 items-center "
              key={category._id}>
              <span className="basis-1/3 text-orange-50 ">{category.name}</span>
              <span className="basis-1/3 text-orange-50 text-center sm:text-left">
                {category.parent
                  ? typeof category.parent === 'string'
                    ? category.parent
                    : category.parent.name
                  : 'Нет родительской категории'}
              </span>
              <div className="basis-1/3 flex flex-col sm:flex-row items-end gap-y-2">
                <button className="edit__buttons" onClick={() => editCategory(category)}>
                  <PencilIcon />
                  <span className="hidden sm:block">Редактировать</span>
                </button>
                <button className="edit__buttons" onClick={() => deleteCategoryFetch(category._id)}>
                  <TrashIcon />
                  <span className="hidden sm:block">Удалить</span>
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
