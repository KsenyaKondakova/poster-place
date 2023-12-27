import Layout from '@/components/Layout';
import { RootState } from '@/redux/store';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNews } from '../redux/slices/newsSlice';
import PencilIcon from '@/assets/icons/PencilIcon';
import TrashIcon from '@/assets/icons/TrashIcon';

function News() {
  const dispatch = useDispatch();
  const news = useSelector((state: RootState) => state.newsSlice.newsList);
  useEffect(() => {
    axios.get('/api/news').then((response) => {
      dispatch(setNews(response.data));
    });
  }, [dispatch]);
  return (
    <Layout>
      <Link href={'/news/new'} className="submit-btn">
        Добавить новость
      </Link>
      <div className="mt-4 flex flex-col bg-nav-gray rounded-2xl">
        <div className="text-gray-400 pt-4 pb-2 mx-4 flex border-b-2 border-gray-600">
          <span className="basis-2/3">Название новости</span>
          <span className="basis-1/3">Инструменты</span>
        </div>
        <div className="flex flex-col">
          {news.map((newsItem) => (
            <article
              key={newsItem._id}
              className="flex pt-4 pb-4 mx-4 border-b-2 border-gray-600 items-center">
              <span className="basis-2/3 text-orange-50">{newsItem.newsName}</span>
              <div className="basis-1/3 flex items-center">
                <Link className="edit__buttons" href={'/news/edit/' + newsItem._id}>
                  <PencilIcon />
                  <span>Редактировать</span>
                </Link>
                <Link className="edit__buttons" href={'/news/delete/' + newsItem._id}>
                  <TrashIcon />
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
