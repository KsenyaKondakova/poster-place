import Layout from '@/components/Layout';
import { RootState } from '@/redux/store';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNews } from '../redux/slices/newsSlice';

//test
function News() {
  const dispatch = useDispatch();
  const news = useSelector((state: RootState) => state.newsSlice.newsList);
  useEffect(() => {
    axios.get('/api/news').then((response) => {
      dispatch(setNews(response.data));
    });
  }, []);
  return (
    <Layout>
      <Link href={'/news/new'} className="submit-btn">
        Добавить новость
      </Link>
      <div className="mt-4 flex flex-col bg-nav-gray rounded-2xl">
        <div className="text-gray-400 pt-4 pb-2 mx-4 flex border-b-2 border-gray-600">
          <span className="basis-2/3">Название категории</span>
          <span className="basis-1/3">Редактировать</span>
        </div>
        <div className="flex flex-col">
          {news.map((newsItem) => (
            <article
              key={newsItem._id}
              className="flex pt-4 pb-4 mx-4 border-b-2 border-gray-600 items-center">
              <span className="basis-2/3 text-orange-50">{newsItem.newsName}</span>
              <div className="basis-1/3 flex items-center">
                <Link className="edit__buttons" href={'/news/edit/' + newsItem._id}>
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
                <Link className="edit__buttons" href={'/news/delete/' + newsItem._id}>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default News;
