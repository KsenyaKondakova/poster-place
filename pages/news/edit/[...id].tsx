import Layout from '@/components/Layout';
import NewsForm from '@/components/NewsForm';
import { setNewsInfo } from '@/redux/slices/newsSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EditNewsPage() {
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();
  const newsInfo = useSelector((state: RootState) => state.newsSlice.newsInfo);
  const id: string | string[] | undefined = router.query.id;
  const [showForm, setShowForm] = useState<boolean>(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/news?id=' + id).then((response) => {
      dispatch(setNewsInfo(response.data));
      setShowForm(true);
    });
  }, [id]);

  return (
    <Layout>
      <h1 className="text-2xl mb-4">Редактировать новость</h1>
      {showForm && newsInfo && <NewsForm {...newsInfo} />}
    </Layout>
  );
}

export default EditNewsPage;
