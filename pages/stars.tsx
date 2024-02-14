import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PencilIcon from '@/assets/icons/PencilIcon';
import TrashIcon from '@/assets/icons/TrashIcon';

import Layout from '@/components/Layout';
import PaginationComp from '@/components/Pagination';

import {
  setOffset,
  setPage,
  setPageQty,
  setStars,
} from '@/redux/slices/starSclice';
import { RootState } from '@/redux/store';

function Stars() {
  const dispatch = useDispatch();
  const stars = useSelector((state: RootState) => state.starSclice.starList);
  const limit = useSelector((state: RootState) => state.starSclice.limit);
  const offset = useSelector((state: RootState) => state.starSclice.offset);
  const page = useSelector((state: RootState) => state.starSclice.page);
  const pageQty = useSelector((state: RootState) => state.starSclice.pageQty);
  useEffect(() => {
    axios.get(`/api/stars?limit=${limit}&offset=${offset}`).then((response) => {
      dispatch(setStars(response.data.stars));
      dispatch(setPageQty(response.data.totalPages));
    });
  }, [page]);
  return (
    <Layout>
      <Link href={'/stars/new'} className="submit-btn">
        Добавить новую звезду
      </Link>
      <div className="mt-4 flex flex-col bg-nav-gray rounded-2xl">
        <div className="text-gray-400 pt-4 pb-2 mx-4 flex border-b-2 border-gray-600">
          <span className="basis-2/3">Имя звезды</span>
          <span className="basis-1/3">Инструменты</span>
        </div>
        <div className="flex flex-col">
          {stars.map((star) => (
            <article
              className="flex pt-3 pb-3 mx-4 border-b-2 border-gray-600 items-center"
              key={star._id}
            >
              <span className="basis-2/3 text-orange-50">{star.name}</span>
              <div className="basis-1/3 flex items-center">
                <Link
                  className="edit__buttons"
                  href={'/stars/edit/' + star._id}
                >
                  <PencilIcon />
                  <span className="hidden sm:block">Редактировать</span>
                </Link>
                <Link
                  className="edit__buttons"
                  href={'/stars/delete/' + star._id}
                >
                  <TrashIcon />
                  <span className="hidden sm:block">Удалить</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <PaginationComp
        pageQty={pageQty}
        limit={limit}
        setOffset={setOffset}
        setPage={setPage}
      />
    </Layout>
  );
}
export default Stars;
