import Layout from '@/components/Layout';
import NewsForm from '@/components/NewsForm';
import { setNewsInfo } from '@/redux/slices/newsSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EditNewsPage() {
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();
  const newsInfo = useSelector((state: RootState) => state.newsSlice.newsInfo);
  const id: string | string[] | undefined = router.query.id;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/news?id=' + id).then((response) => {
      dispatch(setNewsInfo(response.data));
    });
  }, [id]);
  const goBack = () => {
    router.push('/news');
  };
  const deleteNews = async () => {
    await axios.delete(`/api/news?id=${id}`);
    goBack();
  };
  return (
    <Layout>
      <h1 className="text-2xl mb-4 text-center">Вы действительно хотите удалить новость?</h1>
      <p className="text-xl mb-4 text-center">Название новости:{newsInfo?.newsName}</p>
      <div className="flex gap-8 justify-center">
        <button className="button-red" onClick={deleteNews}>
          Да
        </button>
        <button className="button-default" onClick={goBack}>
          Нет
        </button>
      </div>
    </Layout>
  );
}

export default EditNewsPage;
