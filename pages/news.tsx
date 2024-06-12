import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PencilIcon from '@/assets/icons/PencilIcon';
import TrashIcon from '@/assets/icons/TrashIcon';

import Layout from '@/components/Layout';
import PaginationComp from '@/components/Pagination';

import { RootState } from '@/redux/store';

import {
  setNews,
  setOffset,
  setPage,
  setPageQty,
  setSortType,
} from '../redux/slices/newsSlice';

function News() {
  const dispatch = useDispatch();
  const news = useSelector((state: RootState) => state.newsSlice.newsList);
  const limit = useSelector((state: RootState) => state.newsSlice.limit);
  const offset = useSelector((state: RootState) => state.newsSlice.offset);
  const page = useSelector((state: RootState) => state.newsSlice.page);
  const pageQty = useSelector((state: RootState) => state.newsSlice.pageQty);
  const sortType = useSelector((state: RootState) => state.newsSlice.sortType);
  useEffect(() => {
    axios
      .get(`/api/news?limit=${limit}&offset=${offset}&sort=${sortType}`)
      .then((response) => {
        dispatch(setNews(response.data.news));
        dispatch(setPageQty(response.data.totalPages));
      });
  }, [page, sortType]);
  console.log(news);
  return (
    <Layout>
      <div className="flex items-center gap-x-4">
        <Link href={'/news/new'} className="submit-btn">
          Добавить новость
        </Link>
        <select
          name=""
          id=""
          value={sortType}
          className="p-2 bg-[#f5a54a] rounded-xl"
          onChange={(ev) => dispatch(setSortType(Number(ev.target.value)))}
        >
          <option value="1">По алфавиту А-Я</option>
          <option className="bg-white" value="-1">
            По алфавиту Я-А
          </option>
        </select>
      </div>

      <div className="mt-4 flex flex-col bg-nav-gray rounded-2xl">
        <div className="text-gray-400 pt-4 pb-2 mx-4 flex border-b-2 border-gray-600">
          <span className="basis-2/3">Название новости</span>
          <span className="basis-1/3">Инструменты</span>
        </div>
        <div className="flex flex-col">
          {news.map((newsItem) => (
            <article
              key={newsItem._id}
              className="flex pt-3 pb-3 mx-4 border-b-2 border-gray-600 items-center"
            >
              <span className="basis-2/3 text-orange-50">
                {newsItem.newsName}
              </span>
              <div className="basis-1/3 flex items-center">
                <Link
                  className="edit__buttons"
                  href={'/news/edit/' + newsItem._id}
                >
                  <PencilIcon />
                  <span className="hidden sm:block">Редактировать</span>
                </Link>
                <Link
                  className="edit__buttons"
                  href={'/news/delete/' + newsItem._id}
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
        setOffset={(offset: number) => dispatch(setOffset(offset))}
        setPage={(page: number) => dispatch(setPage(page))}
        page={page}
      />
    </Layout>
  );
}

export default News;
