import Layout from '@/components/Layout';
import NewsForm from '@/components/NewsForm';
import { setAfishaInfo } from '@/redux/slices/afishaSlice';
import { setNewsInfo } from '@/redux/slices/newsSlice';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EditNewsPage() {
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();
  const afishaInfo = useSelector((state: RootState) => state.afishaSlice.afishaInfo);
  const id: string | string[] | undefined = router.query.id;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/afisha?id=' + id).then((response) => {
      dispatch(setAfishaInfo(response.data));
    });
  }, [id]);
  const goBack = () => {
    router.push('/afisha');
  };
  const deleteImage = async () => {
    await axios.delete(`/api/afisha?id=${id}`);
    goBack();
  };
  return (
    <Layout>
      <h1 className="text-2xl mb-4 text-center">Вы действительно хотите удалить новость?</h1>
      <p className="text-xl mb-4 text-center">Название новости:{afishaInfo?.image}</p>
      <div className="flex gap-8 justify-center">
        <button className="button-red" onClick={deleteImage}>
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
